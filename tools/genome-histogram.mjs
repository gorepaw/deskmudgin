// Roll a large population and tally the trait names it produces.
//
// The distributions in shared/genome.ts cannot be checked by reading them: a
// perfectly sensible-looking set of ranges can produce a population that is all
// one muddy purple, or whose "rare" tail is 40% of the field. This prints the
// shape so it can be argued with.
//
//   npm run build:main && node tools/genome-histogram.mjs [n] [seed]
//
// Pair it with the visual check — `DESKMUDGIN_CONTACT=1` (see README) — because
// a distribution can be numerically fine and still look wrong.

import { createRequire } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const out = resolve(dirname(fileURLToPath(import.meta.url)), '../out/shared')
const G = require(`${out}/genome.js`)
const D = require(`${out}/describe.js`)

const N = Number(process.argv[2] ?? 4000)
const r = G.sampler(Number(process.argv[3] ?? 12345))

function tally(label, rollFn) {
  const cats = {}
  const seen = new Set()
  for (let i = 0; i < N; i++) {
    for (const t of D.describe(rollFn(r))) {
      if (t.category === 'species') continue
      cats[t.category] ??= {}
      cats[t.category][t.label] = (cats[t.category][t.label] || 0) + 1
      seen.add(t.key)
    }
  }
  console.log(`\n===== ${label}  (n=${N}, ${seen.size} distinct trait names) =====`)
  for (const [cat, counts] of Object.entries(cats)) {
    const rows = Object.entries(counts).sort((a, b) => b[1] - a[1])
    console.log(`\n  ${cat}  (${rows.length} names)`)
    for (const [name, c] of rows) {
      const pct = (c / N) * 100
      console.log(`    ${name.padEnd(24)} ${pct.toFixed(2).padStart(6)}%  ${'#'.repeat(Math.round(pct / 1.2))}`)
    }
  }
}

tally('MUDGIN', G.rollMudgin)
tally('SEPHIN', G.rollSephin)

const hours = []
for (let i = 0; i < 2000; i++) hours.push(G.rollMudgin(r).matureAt / 3600e3)
hours.sort((a, b) => a - b)
const at = k => hours[Math.floor(hours.length * k)].toFixed(1)
console.log(`\nmaturity hours: min=${hours[0].toFixed(1)} p25=${at(0.25)} med=${at(0.5)} `
  + `p75=${at(0.75)} max=${hours[hours.length - 1].toFixed(1)}`)
