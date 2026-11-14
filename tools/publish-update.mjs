#!/usr/bin/env node
// =============================================================================
// Put a finished build on the update feed, where installed copies look for it.
//
//   npm run dist                          build release/ (installer, blockmap, latest.yml)
//   npm run publish:update -- --dry-run   say what would go up, upload nothing
//   npm run publish:update                upload it
//
// WHERE — package.json `build.publish.url` is the one place the feed lives
// (https://updates.enriacindustries.com/deskmudgin/win/). electron-builder bakes
// it into every installer, and this script takes the bucket prefix from its
// path, so the two cannot drift apart.
//
// WHAT — the installer, its .blockmap (lets an update download only the
// changed blocks), then latest.yml LAST. latest.yml is the pointer every
// install reads, so no client can ever see it name bytes that are not up yet.
// It goes up with cache-control no-cache so Cloudflare's edge never holds a
// stale pointer; the installer is immutable by name and needs no such care.
//
// GUARDS — refuses a release/ whose latest.yml, installer and package.json
// disagree, an installer whose sha512 is not the one latest.yml promises, and
// a version that is not newer than the one already live (installs would
// ignore it, or worse, it is the wrong build). --force overrides that last one.
//
// CREDENTIALS — an R2 API token with Object Read & Write on the updates
// bucket, in .env (gitignored) or the environment:
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_UPDATES_BUCKET
// =============================================================================

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { sign, sha256hex } from './sigv4.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const force = args.includes('--force')
const releaseDir = path.resolve(ROOT, args.find(a => !a.startsWith('--')) ?? 'release')

const human = (n) => n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`

function die(msg) {
  console.error(`publish-update: ${msg}`)
  process.exit(1)
}

/** 1.2.10 > 1.2.9. Pre-release tags are not used here and are not ordered. */
function newer(a, b) {
  const pa = a.split(/[.-]/).map(Number), pb = b.split(/[.-]/).map(Number)
  for (let i = 0; i < 3; i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0)
  return false
}

/** Column-0 keys of electron-builder's latest.yml; the per-file list is indented. */
function parseLatest(text) {
  const key = (k) => new RegExp(`^${k}:\\s*'?([^'\\n]+)'?\\s*$`, 'm').exec(text)?.[1]?.trim()
  return { version: key('version'), file: key('path'), sha512: key('sha512') }
}

// ── the feed ─────────────────────────────────────────────────────────────────

const feedUrl = pkg.build?.publish?.url
if (!feedUrl || pkg.build.publish.provider !== 'generic') die('package.json build.publish must be a generic feed with a url')
const feed = new URL(feedUrl.endsWith('/') ? feedUrl : `${feedUrl}/`)
if (feed.hostname.endsWith('.invalid')) die(`the feed is switched off (${feed.hostname}) — nothing to publish to`)
const prefix = decodeURIComponent(feed.pathname).replace(/^\/+/, '')    // "deskmudgin/win/"

// ── the build ────────────────────────────────────────────────────────────────

const ymlPath = path.join(releaseDir, 'latest.yml')
if (!fs.existsSync(ymlPath)) die(`no ${path.relative(ROOT, ymlPath)} — run npm run dist first`)
const yml = fs.readFileSync(ymlPath, 'utf8')
const { version, file, sha512 } = parseLatest(yml)
if (!version || !file || !sha512) die('latest.yml is missing version/path/sha512 — unexpected format')
if (version !== pkg.version) die(`latest.yml says ${version} but package.json says ${pkg.version} — rebuild first`)

const exePath = path.join(releaseDir, file)
const mapPath = `${exePath}.blockmap`
if (!fs.existsSync(exePath)) die(`latest.yml names ${file}, which is not in ${path.relative(ROOT, releaseDir)}`)
if (!fs.existsSync(mapPath)) die(`${file}.blockmap is missing — differential updates need it`)
const exe = fs.readFileSync(exePath)
if (createHash('sha512').update(exe).digest('base64') !== sha512) {
  die(`${file} does not match latest.yml's sha512 — a stale or half-written build`)
}

// ── what is live now ─────────────────────────────────────────────────────────

async function liveVersion() {
  try {
    const res = await fetch(new URL(`latest.yml?t=${Date.now()}`, feed), { cache: 'no-store' })
    if (!res.ok) return null
    return parseLatest(await res.text()).version ?? null
  } catch {
    return null                           // not reachable yet: nothing is live
  }
}

const live = await liveVersion()
console.log(`feed      ${feed.href}`)
console.log(`live      ${live ?? '(nothing yet)'}`)
console.log(`this      ${version}  ${file}  ${human(exe.length)}`)
if (live && !newer(version, live)) {
  if (!force) die(`${version} is not newer than the live ${live} — installs would ignore it. Bump the version, or --force`)
  console.log(`--force: publishing ${version} over ${live}`)
}

const uploads = [
  [`${prefix}${file}`, exe, 'application/octet-stream', null],
  [`${prefix}${file}.blockmap`, fs.readFileSync(mapPath), 'application/octet-stream', null],
  [`${prefix}latest.yml`, Buffer.from(yml), 'text/yaml', 'no-cache'],
]

if (dryRun) {
  for (const [key, body] of uploads) console.log(`would put ${key}  (${human(body.length)})`)
  process.exit(0)
}

// ── upload ───────────────────────────────────────────────────────────────────

const env = (k) => (process.env[k] ?? '').trim()
const r2 = {
  accountId: env('R2_ACCOUNT_ID'), accessKeyId: env('R2_ACCESS_KEY_ID'),
  secretAccessKey: env('R2_SECRET_ACCESS_KEY'), bucket: env('R2_UPDATES_BUCKET'),
}
if (Object.values(r2).some(v => !v)) {
  die('set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_UPDATES_BUCKET (in .env, which is gitignored)')
}

async function put(key, body, contentType, cacheControl) {
  const url = `https://${r2.accountId}.r2.cloudflarestorage.com/${r2.bucket}/${key}`
  const { headers } = sign({
    method: 'PUT', url, payloadHash: sha256hex(body),
    accessKeyId: r2.accessKeyId, secretAccessKey: r2.secretAccessKey,
    headers: { 'content-type': contentType, ...(cacheControl ? { 'cache-control': cacheControl } : {}) },
  })
  const res = await fetch(url, { method: 'PUT', headers, body })
  if (!res.ok) throw new Error(`PUT ${key}: ${res.status} ${res.statusText} ${(await res.text()).slice(0, 300)}`)
  // A single PUT's ETag is the body's MD5: an end-to-end check, not a trusted 200.
  const etag = (res.headers.get('etag') ?? '').replace(/"/g, '')
  if (etag !== createHash('md5').update(body).digest('hex')) throw new Error(`PUT ${key}: ETag does not match what was sent`)
}

try {
  for (const [key, body, type, cache] of uploads) {
    process.stdout.write(`putting   ${key}  (${human(body.length)}) … `)
    await put(key, body, type, cache)
    console.log('ok')
  }
} catch (err) {
  die(`upload failed, latest.yml ${err.message.includes('latest.yml') ? 'may not have' : 'has not'} changed: ${err.message}`)
}

// ── check it from where installs will ────────────────────────────────────────

const now = await liveVersion()
const head = await fetch(new URL(encodeURIComponent(file), feed), { method: 'HEAD' }).catch(() => null)
if (now === version && head?.ok && Number(head.headers.get('content-length')) === exe.length) {
  console.log(`\nlive at ${feed.href} — installed copies will offer ${version} at their next check`)
} else {
  console.log(`\nuploaded, but ${feed.host} does not serve it yet (latest.yml: ${now ?? 'unreachable'}, installer: ${head?.status ?? 'unreachable'}).`)
  console.log('Check that the bucket has the custom domain connected and public access on.')
  process.exitCode = 1
}
