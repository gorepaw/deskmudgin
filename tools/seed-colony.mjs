// Write a test colony straight into userData, bypassing the app.
//
//   npm run build:main && node tools/seed-colony.mjs
//
// KILL THE APP FIRST. A running instance autosaves every 20 seconds and on
// quit, and will cheerfully overwrite whatever this writes:
//
//   Get-Process electron | Where-Object { $_.Path -like '*deskmudgin*' } | Stop-Process -Force
//
// (Filter on the path — an unfiltered kill takes out every other Electron app
// on the machine too.)
//
// Edit SPEC to change the cast. Paths are built with path.join deliberately:
// a Windows path written into a bash heredoc loses its backslashes, which once
// sent this file to `AppData\Roamingdeskmudginpet.json` and made a working app
// look thoroughly broken.

import { createRequire } from 'node:module'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSync, readFileSync } from 'node:fs'

const require = createRequire(import.meta.url)
const out = resolve(dirname(fileURLToPath(import.meta.url)), '../out/shared')
const G = require(`${out}/genome.js`)
const D = require(`${out}/describe.js`)

/** [name, species, layer, x] */
const SPEC = [
  ['Mudgin', 'mudgin', 'overlay', 420],
  ['Grub', 'mudgin', 'underlay', 700],
  ['Sephin', 'sephin', 'overlay', 980],
  ['Tolo', 'sephin', 'underlay', 1260],
]

const now = Date.now()
const mudgins = SPEC.map(([name, species, layer, x], i) => {
  const r = G.sampler(0xc0ffee + i * 7919)
  return {
    id: `seed-${i}`, species, name, layer, out: true,
    genes: G.roll(species, r),
    needs: { fullness: 0.5, energy: 0.95, social: 0.7 }, mood: 0.7,
    x, y: 1032,
    stats: { iconsChewed: 0, stepsHopped: 0, naps: 0, pets: 0 },
    bornAt: now - i * 1013, adoptedAt: now, lastSeenAt: now,
  }
})

const file = join(process.env.APPDATA, 'deskmudgin', 'pet.json')
writeFileSync(file, JSON.stringify({ version: 3, mudgins }, null, 2))

for (const m of mudgins) {
  console.log(`${m.name.padEnd(7)} ${m.layer.padEnd(9)} ${D.summarise(D.describe(m.genes))}`)
}
// Read back, so a write that silently went somewhere else is caught here rather
// than three debugging steps later.
const back = JSON.parse(readFileSync(file, 'utf8'))
console.log(`\nwrote ${file}`)
console.log('ids on disk:', back.mudgins.map(m => m.id).join(', '))
