// Build build/icon.ico — the exe's and the installer's icon — from the real
// Mudgin art. Each size is rendered at that size by the icon sheet rather than
// shrunk from one big picture, so the small ones stay crisp. electron-builder
// picks build/icon.ico up on its own.
//
//   npm run build:web && node tools/make-icon.mjs [seed]
//
// Seed 24 is the bog-purple one with the green glowing eye, the palette the
// tray icon was drawn from. `npm run snap -- icon out.png 1200 750 grid=1`
// shows a page of candidates with their seeds.

import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const seed = process.argv[2] ?? '24'
const SIZES = [16, 24, 32, 48, 64, 128, 256]
// At taskbar sizes the whole animal is mostly stalk and shadow and the eye is
// two pixels, so the small ones are cropped to the head: bigger, and the foot
// falls off the bottom edge.
const framing = size => size <= 32 ? ['scale=1.25', 'ground=1.08']
  : size <= 48 ? ['scale=1.05', 'ground=0.95'] : []

const tmp = mkdtempSync(join(tmpdir(), 'deskmudgin-icon-'))
const pngs = []
try {
  for (const size of SIZES) {
    const out = join(tmp, `${size}.png`)
    const r = spawnSync(process.execPath,
      [join(root, 'tools/snap.mjs'), 'icon', out, String(size), String(size), `seed=${seed}`, ...framing(size)],
      { cwd: root, stdio: 'inherit' })
    if (r.status !== 0) throw new Error(`snap failed at ${size}px`)
    const png = readFileSync(out)
    // Offscreen windows can come back at a device-scale multiple; an ICO entry
    // must be exactly the size its directory says.
    const w = png.readUInt32BE(16), h = png.readUInt32BE(20)
    if (w !== size || h !== size) throw new Error(`${size}px came back ${w}×${h}`)
    pngs.push({ size, png })
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

// ICO: a 6-byte header, a 16-byte directory entry per image, then the images.
// PNG-compressed entries have been valid since Vista.
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(pngs.length, 4)
let offset = 6 + 16 * pngs.length
const dir = pngs.map(({ size, png }) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(size >= 256 ? 0 : size, 0)
  e.writeUInt8(size >= 256 ? 0 : size, 1)
  e.writeUInt8(0, 2)
  e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  return e
})
mkdirSync(join(root, 'build'), { recursive: true })
writeFileSync(join(root, 'build/icon.ico'), Buffer.concat([header, ...dir, ...pngs.map(p => p.png)]))
writeFileSync(join(root, 'build/icon.png'), pngs.at(-1).png)
console.log(`build/icon.ico: ${SIZES.join(', ')}px, seed ${seed}`)
