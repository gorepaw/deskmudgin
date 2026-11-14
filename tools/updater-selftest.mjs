#!/usr/bin/env node
// =============================================================================
// The self-update, end to end, against a local feed — no Cloudflare, no
// installed copy, no window.
//
//   npm run dist && npm run update:selftest
//
// Runs the real main/updater.ts (as built in out/) inside Electron, as a fake
// app at version 0.1.0 pointed through dev-app-update.yml at a feed served from
// 127.0.0.1. The feed offers release/'s installer as 9.9.9. Checked:
//
//   - the SigV4 signer reproduces AWS's published signatures
//   - a check offers 9.9.9 and does NOT start downloading (ask first)
//   - a download reports progress, verifies the sha512 and ends `ready`
//   - an installer that does not match its sha512 ends `error`, not `ready`
//   - a feed whose version is the running one says `none`
//   - a feed that cannot be reached says `error` when asked, nothing when not
//
// It never calls install. It cleans up its temp app and updater cache.
// =============================================================================

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { sign, sha256hex } from './sigv4.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
let failed = 0
const ok = (cond, what) => { console.log(`${cond ? 'ok  ' : 'FAIL'}  ${what}`); if (!cond) failed++ }

// ── the signer ───────────────────────────────────────────────────────────────
{
  const cred = {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE', secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region: 'us-east-1', now: new Date(Date.UTC(2013, 4, 24)),
  }
  const g = sign({ ...cred, method: 'GET', url: 'https://examplebucket.s3.amazonaws.com/test.txt',
    headers: { range: 'bytes=0-9' }, payloadHash: sha256hex('') })
  ok(g.signature === 'f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41', 'SigV4: AWS GET example')
  const p = sign({ ...cred, method: 'PUT', url: 'https://examplebucket.s3.amazonaws.com/test$file.text',
    headers: { date: 'Fri, 24 May 2013 00:00:00 GMT', 'x-amz-storage-class': 'REDUCED_REDUNDANCY' },
    payloadHash: sha256hex('Welcome to Amazon S3.') })
  ok(p.signature === '98ad721746da40c64f1a55b78f14c238d841ea1380cd77a1b5971af0ece108bd', 'SigV4: AWS PUT example')
}

// ── the updater, in Electron ─────────────────────────────────────────────────

const release = path.join(ROOT, 'release')
const yml = path.join(release, 'latest.yml')
const updaterJs = path.join(ROOT, 'out', 'main', 'updater.js')
if (!fs.existsSync(yml) || !fs.existsSync(updaterJs)) {
  console.error('needs release/latest.yml and out/main/updater.js — run npm run dist first')
  process.exit(1)
}

const app = fs.mkdtempSync(path.join(os.tmpdir(), 'deskmudgin-updtest-'))
const cacheName = `deskmudgin-updtest-${path.basename(app).slice(-6)}`
fs.writeFileSync(path.join(app, 'package.json'),
  JSON.stringify({ name: 'deskmudgin-updtest', version: '0.1.0', main: 'main.cjs' }))
fs.writeFileSync(path.join(app, 'main.cjs'), `
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const { app } = require('electron')
const release = ${JSON.stringify(release)}
const real = fs.readFileSync(path.join(release, 'latest.yml'), 'utf8')
const file = /^path:\\s*(.+)$/m.exec(real)[1].trim()
let mode = 'offer'
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split('?')[0].slice(1))
  if (name === 'latest.yml') {
    if (mode === 'down') { res.writeHead(503); return res.end() }
    let y = real.replace(/^version: .*$/m, mode === 'same' ? 'version: 0.1.0' : 'version: 9.9.9')
    if (mode === 'corrupt') y = y.replace(/sha512: [A-Za-z0-9+/=]+/g, 'sha512: ' + 'A'.repeat(86) + '==')
    res.writeHead(200, { 'content-type': 'text/yaml' }); return res.end(y)
  }
  const p = path.join(release, name)
  if (!name.startsWith(file) || !fs.existsSync(p)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { 'content-length': fs.statSync(p).size })
  fs.createReadStream(p).pipe(res)
})
const out = (o) => process.stdout.write('@@' + JSON.stringify(o) + '\\n')
app.whenReady().then(() => server.listen(0, '127.0.0.1', async () => {
  fs.writeFileSync(path.join(app.getAppPath(), 'dev-app-update.yml'),
    'provider: generic\\nurl: http://127.0.0.1:' + server.address().port + '/\\nupdaterCacheDirName: ${cacheName}\\n')
  process.env.DESKMUDGIN_DEV_UPDATE = '1'
  const { Updater } = require(${JSON.stringify(updaterJs)})
  const seen = []
  const settled = (x) => new Promise(r => { const t = setInterval(() => { if (['ready', 'error'].includes(x.state.status)) { clearInterval(t); r() } }, 50) })
  const u = new Updater(s => seen.push({ ...s }), () => {})
  out({ step: 'start', state: u.state })
  out({ step: 'check', state: await u.check(true) })
  await new Promise(r => setTimeout(r, 1500))
  out({ step: 'idle-after-check', state: u.state })
  u.download()
  await settled(u)
  out({ step: 'download', state: u.state, progress: seen.filter(s => s.status === 'downloading').map(s => s.percent) })

  // A second copy of the app, so the first one's verified download is not
  // simply reused from the cache.
  fs.rmSync(path.join(process.env.LOCALAPPDATA, ${JSON.stringify(cacheName)}), { recursive: true, force: true })
  mode = 'corrupt'
  const v = new Updater(() => {}, () => {})
  await v.check(true); v.download(); await settled(v)
  out({ step: 'corrupt', state: v.state })

  mode = 'same'
  out({ step: 'same', state: await new Updater(() => {}, () => {}).check(true) })
  mode = 'down'
  out({ step: 'down-manual', state: await new Updater(() => {}, () => {}).check(true) })
  out({ step: 'down-background', state: await new Updater(() => {}, () => {}).check(false) })
  server.close(); app.quit()
}))
`)

const electron = require('electron')                       // the binary's path
// ELECTRON_RUN_AS_NODE is set inside VS Code's terminals, and would run the
// binary as plain Node with no `app` at all.
const env = { ...process.env }
delete env.ELECTRON_RUN_AS_NODE
const r = spawnSync(electron, [app], { encoding: 'utf8', timeout: 300_000, env })
const steps = Object.fromEntries((r.stdout ?? '').split('\n').filter(l => l.startsWith('@@'))
  .map(l => JSON.parse(l.slice(2))).map(o => [o.step, o]))

ok(steps.start?.state.status === 'idle' && steps.start.state.current === '0.1.0', 'starts idle at the running version')
ok(steps.check?.state.status === 'available' && steps.check.state.version === '9.9.9', 'a check offers the newer build')
ok(steps['idle-after-check']?.state.status === 'available', 'and does not download it unasked')
ok(steps.download?.state.status === 'ready' && steps.download.state.version === '9.9.9', 'a download verifies and ends ready')
const prog = steps.download?.progress ?? []
ok(prog.length > 1 && prog.every((p, i) => i === 0 || p > prog[i - 1]), `progress climbs in whole percents (${prog.length} steps)`)
ok(steps.corrupt?.state.status === 'error', 'an installer that fails its sha512 is an error, not ready')
ok(steps.same?.state.status === 'none', 'the same version is "up to date"')
ok(steps['down-manual']?.state.status === 'error', 'an unreachable feed is an error when asked')
ok(steps['down-background']?.state.status === 'idle', 'and nothing at all in the background')

if (Object.keys(steps).length < 7) console.log(r.stdout, r.stderr)

// Clean up the fake app and what the updater downloaded into its cache.
fs.rmSync(app, { recursive: true, force: true })
const cache = path.join(process.env.LOCALAPPDATA ?? path.join(os.homedir(), 'AppData', 'Local'), cacheName)
fs.rmSync(cache, { recursive: true, force: true })

console.log(failed ? `\n${failed} failed` : '\nall passed')
process.exit(failed ? 1 : 0)
