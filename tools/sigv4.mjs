// =============================================================================
// AWS Signature Version 4, for one thing: a PUT of a whole object to R2's S3
// API. A dependency-free signer rather than the AWS SDK, which is megabytes of
// code to sign one header.
//
// Checked against AWS's own published examples by `npm run update:selftest`.
// =============================================================================

import { createHash, createHmac } from 'node:crypto'

export const sha256hex = (data) => createHash('sha256').update(data).digest('hex')
const hmac = (key, data) => createHmac('sha256', key).update(data).digest()

/** S3's URI encoding: everything but unreserved characters, and '/' kept. */
const encodePath = (p) =>
  p.split('/').map(seg => encodeURIComponent(seg).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)).join('/')

/**
 * Headers for a signed request, Authorization included.
 *
 * `headers` are the ones to sign and send (lowercase names); `host` and
 * `x-amz-date` are added. `payloadHash` is the hex SHA-256 of the body, which
 * also goes out as x-amz-content-sha256 unless already given.
 */
export function sign({ method, url, headers = {}, payloadHash, accessKeyId, secretAccessKey,
  region = 'auto', service = 's3', now = new Date() }) {
  const u = new URL(url)
  const amzDate = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const day = amzDate.slice(0, 8)
  const all = {
    ...Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), String(v).trim()])),
    host: u.host,
    'x-amz-date': amzDate,
  }
  if (!all['x-amz-content-sha256']) all['x-amz-content-sha256'] = payloadHash
  const names = Object.keys(all).sort()
  const query = [...u.searchParams].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
  const canonical = [
    method,
    encodePath(decodeURIComponent(u.pathname)),
    query,
    names.map(n => `${n}:${all[n]}\n`).join(''),
    names.join(';'),
    payloadHash,
  ].join('\n')
  const scope = `${day}/${region}/${service}/aws4_request`
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256hex(canonical)].join('\n')
  let key = hmac(`AWS4${secretAccessKey}`, day)
  key = hmac(key, region)
  key = hmac(key, service)
  key = hmac(key, 'aws4_request')
  const signature = createHmac('sha256', key).update(toSign).digest('hex')
  const out = { ...all }
  delete out.host                          // fetch sets it, from the same URL
  out.authorization =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${scope}, SignedHeaders=${names.join(';')}, Signature=${signature}`
  return { headers: out, signature }
}
