// Check the neighbourhood index against brute force, and time it.
//
//   node tools/neighbors-check.mjs
//
// The index is what replaced handing every creature a list of everyone else,
// and a wrong answer from it does not crash anything — it shows up as a pet
// quietly ignoring a neighbour it should have given way to, which is exactly
// the class of bug that is invisible on a live desktop. So it is checked here
// against the loop it replaced, over random populations, including the corners
// that a real desktop produces: everyone in one heap, everyone on one ledge,
// negative x on a monitor left of the primary.
//
// `neighbors.ts` is renderer code and the renderer builds to a Vite bundle, so
// it is compiled here on its own. It carries no value imports at all, which is
// what lets the emitted file stand alone — worth keeping true.

import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = mkdtempSync(join(tmpdir(), 'hood-'))
// rootDir pinned to src: the type-only import still makes tsc walk the graph,
// and without it the emitted path moves depending on what those types touch.
execFileSync('npx', ['tsc', join(root, 'src/renderer/pet/neighbors.ts'),
  '--outDir', outDir, '--rootDir', join(root, 'src'),
  '--module', 'commonjs', '--target', 'es2020'],
  { stdio: 'inherit', shell: process.platform === 'win32' })

const { Neighborhood } = createRequire(import.meta.url)(
  join(outDir, 'renderer/pet/neighbors.js'))

// A deterministic generator, so a failure can be re-run.
let seed = 0x9e3779b9
const rnd = () => {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5
  return ((seed >>> 0) / 4294967296)
}
const range = (a, b) => a + rnd() * (b - a)

const brute = (pets, self, x, r) =>
  pets.filter(p => p !== self && Math.abs(p.x - x) <= r)

/** The shapes a desktop actually produces, not just a uniform spread. */
const SPREADS = {
  spread: n => Array.from({ length: n }, () => ({ x: range(-1920, 3280) })),
  heap: n => Array.from({ length: n }, () => ({ x: range(600, 640) })),
  ledge: n => Array.from({ length: n }, () => ({ x: range(0, 260) })),
  edges: n => Array.from({ length: n }, () => ({ x: rnd() < 0.5 ? range(-1930, -1900) : range(3260, 3290) })),
  identical: n => Array.from({ length: n }, () => ({ x: 1024 })),
}

// Every radius any behaviour actually asks for, plus the degenerate ends.
const RADII = [0, 30, 46, 120, 700, 1020, 5000]

let checks = 0
let bad = 0
for (const [name, make] of Object.entries(SPREADS)) {
  for (const n of [0, 1, 2, 9, 120, 500]) {
    const pets = make(n)
    const hood = new Neighborhood()
    hood.rebuild(pets)
    for (let t = 0; t < 60; t++) {
      const self = n ? pets[Math.floor(rnd() * n)] : { x: 0 }
      const x = rnd() < 0.5 && n ? self.x : range(-2000, 3400)
      const r = RADII[Math.floor(rnd() * RADII.length)]
      const got = [...hood.near(self, x, r)].sort((a, b) => a.x - b.x)
      const want = brute(pets, self, x, r).sort((a, b) => a.x - b.x)
      checks++
      // Compared as sets: the index walks cell by cell, so the order it
      // returns is its own business and nothing downstream reads it.
      const same = got.length === want.length && got.every((p, i) => p === want[i])
      if (!same) {
        bad++
        if (bad <= 3) {
          console.log(`  MISMATCH ${name} n=${n} x=${x.toFixed(1)} r=${r}`)
          console.log(`    got ${got.length}, want ${want.length}`)
        }
      }
    }
  }
}
console.log(`${checks} queries across ${Object.keys(SPREADS).length} spreads — ${bad} wrong`)

// ── What it saves ────────────────────────────────────────────────────────────
// Not a benchmark of the app: the app queries at 4Hz per creature, not per
// frame. This measures the thing that used to happen every frame regardless —
// assembling everyone-else — against re-indexing everybody instead.

console.log('\nper tick, n pets:')
console.log('    n   old: build n lists   new: reindex + one query each')
for (const n of [8, 40, 120, 500, 2000]) {
  const pets = SPREADS.spread(n)
  const hood = new Neighborhood()

  const t0 = process.hrtime.bigint()
  for (let f = 0; f < 30; f++) {
    const scratch = []
    for (const c of pets) {
      scratch.length = 0
      for (const o of pets) if (o !== c) scratch.push(o)
    }
  }
  const oldMs = Number(process.hrtime.bigint() - t0) / 1e6 / 30

  const t1 = process.hrtime.bigint()
  for (let f = 0; f < 30; f++) {
    hood.rebuild(pets)
    for (const c of pets) hood.near(c, c.x, 46)
  }
  const newMs = Number(process.hrtime.bigint() - t1) / 1e6 / 30

  console.log(`${String(n).padStart(5)}   ${oldMs.toFixed(3).padStart(14)} ms   ${newMs.toFixed(3).padStart(24)} ms`)
}

process.exit(bad ? 1 : 0)
