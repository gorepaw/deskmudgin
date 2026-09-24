// Drive the visitor state machine through a full cycle, with no GUI.
//
//   npm run build:main && node tools/wild-cycle.mjs
//
// WildWatch is deliberately free of Electron — it takes a roller, a change
// callback and a source of randomness — so the schedule that decides when
// strangers arrive, how long they wait and what happens when one is taken can
// be checked here instead of by sitting in front of the desktop for half an
// hour hoping nobody clicks anything.
//
// The clock is compressed to 1/1000, so a ten-minute stay passes in six tenths
// of a second. That is the same `slow()` the app uses under DESKMUDGIN_FAST,
// turned up as far as it goes — `setTimeScale` clamps at 0.001, so asking for
// less is silently the same thing.

import { createRequire } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const out = resolve(dirname(fileURLToPath(import.meta.url)), '../out')
const { WildWatch } = require(`${out}/main/wild.js`)
const clock = require(`${out}/shared/clock.js`)
const G = require(`${out}/shared/genome.js`)

clock.setTimeScale(1 / 1000)

const r = G.sampler(0xbeef)
let n = 0
const events = []
const t0 = Date.now()
const stamp = () => `${String(Date.now() - t0).padStart(5)}ms`

const roll = () => ({
  id: `wild-${++n}`,
  species: r.chance(0.5) ? 'mudgin' : 'sephin',
  name: `Stranger${n}`,
  genes: G.roll('mudgin', r),
  layer: 'overlay', out: true, wild: true,
  needs: { fullness: 0.7, energy: 0.9, social: 0.6 }, mood: 0.6,
  x: 4, y: 1032,
  stats: { iconsChewed: 0, stepsHopped: 0, naps: 0, pets: 0 },
  bornAt: Date.now(), adoptedAt: Date.now(), lastSeenAt: Date.now(),
})

const watch = new WildWatch(
  roll,
  () => {
    const v = watch.all[0]
    const state = !v ? 'nobody here' : v.leaving ? `${v.id} is leaving` : `${v.id} arrived`
    events.push(state)
    console.log(`${stamp()}  ${state}`)
  },
  (lo, hi) => r.range(lo, hi),
  m => console.log(`${stamp()}  log: ${m}`),
)

console.log('--- left alone: it should arrive, wait, leave, and be replaced ---')
watch.start()

setTimeout(() => {
  console.log('\n--- taken: adopting should hand it over and schedule the next ---')
  const v = watch.all[0]
  if (!v) return console.log('  (nothing visiting right now — rerun)')
  const taken = watch.take(v.id)
  console.log(`${stamp()}  took ${taken?.id}, wild flag was ${taken?.wild}`)
  console.log(`${stamp()}  visiting now: ${watch.all.length}`)
  // Taking a stranger that has already gone must not produce a second copy.
  console.log(`${stamp()}  taking it twice returns ${watch.take(v.id)}`)
}, 2600)

setTimeout(() => {
  watch.stop()
  const arrivals = events.filter(e => e.endsWith('arrived')).length
  const departures = events.filter(e => e.endsWith('is leaving')).length
  console.log(`\n${arrivals} arrivals, ${departures} departures, `
    + `${new Set(events.filter(e => e.endsWith('arrived'))).size} distinct strangers`)
  console.log(arrivals >= 2 && departures >= 1
    ? 'OK — the loop runs on its own and does not repeat a stranger'
    : 'UNEXPECTED — see the sequence above')
}, 4200)
