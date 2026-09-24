// =============================================================================
// Normalise and check a hand-authored draft, before it costs anyone an evening.
//
//   node tools/zh-draft.mjs content/zh/hsk1.tsv
//
// The authoring step is: write `script` and `english` into the TSV, leave every
// other column empty. This fills in the rest — mints stable ids, derives the
// reading, and refuses anything that would waste a verification round: a
// character outside the course, half-width punctuation, a duplicate, an empty
// gloss. None of that needs a human to notice it, so none of it should reach one.
//
// It never touches `english` and never invents a `script`. Everything it writes
// is either mechanical or a copy.
// =============================================================================

import { readTsv, writeTsv } from './lang/tsv.mjs'
import { derive, allowedChars, loadOverrides, isPunct } from './lang/zh.mjs'

const corpusPath = process.argv[2]
if (!corpusPath) {
  console.error('usage: node tools/zh-draft.mjs <corpus.tsv> [--prefix p]')
  process.exit(2)
}
const pi = process.argv.indexOf('--prefix')
const prefix = pi >= 0 ? process.argv[pi + 1] : 'p'
const isWordlist = corpusPath.includes('.words.')
// Names are exempt from the vocabulary check for the same reason as in
// lang-build: they are names. Explicit, like the build's --kind.
const isNames = process.argv.includes('--names')

loadOverrides()
const rows = readTsv(corpusPath)
const chars = isWordlist || isNames ? null : allowedChars()

if (chars && chars.size === 0) {
  console.error('the wordlist has no verified rows yet — verify content/zh/hsk1.words.tsv first,')
  console.error('or there is nothing to check a phrase\'s vocabulary against.')
  process.exit(1)
}

const problems = []
const used = new Set(rows.map(r => r.id).filter(Boolean))
let next = 1
const mintId = () => {
  let id
  do { id = `${prefix}${String(next++).padStart(3, '0')}` } while (used.has(id))
  used.add(id)
  return id
}

const seenScript = new Map()
let minted = 0
let rederived = 0

for (const row of rows) {
  const where = `line ${row._line}`
  if (!row.script) { problems.push(`${where}: no script`); continue }
  if (!row.english) problems.push(`${where} (${row.script}): no english gloss`)

  if (seenScript.has(row.script)) {
    problems.push(`${where}: "${row.script}" already appears on line ${seenScript.get(row.script)}`)
  }
  seenScript.set(row.script, row._line)

  if (/[,.!?;:]/.test(row.script)) {
    problems.push(`${where} (${row.script}): half-width punctuation — use ，。！？`)
  }
  if (chars) {
    for (const ch of row.script) {
      if (isPunct(ch)) continue
      if (!chars.has(ch)) {
        problems.push(`${where} (${row.script}): 「${ch}」is outside this course's vocabulary`)
      }
    }
  }

  if (!row.id) { row.id = mintId(); minted++ }
  // The reading is always rewritten, never accepted. If someone typed one in,
  // this is where it quietly stops mattering — which is the intent.
  const want = derive(row.script)
  if (row.reading !== want) { row.reading = want; rederived++ }
  if (!row.status) row.status = 'draft'
  if (!row.tags) row.tags = isWordlist ? 'hsk1' : 'random'
}

if (problems.length) {
  console.error(`${problems.length} problem(s) — nothing written:\n`)
  for (const p of problems.slice(0, 30)) console.error('  ' + p)
  if (problems.length > 30) console.error(`  …and ${problems.length - 30} more`)
  process.exit(1)
}

writeTsv(corpusPath, rows)
console.log(`${rows.length} rows in ${corpusPath}`)
if (minted) console.log(`  ${minted} id(s) minted`)
console.log(`  ${rederived} reading(s) derived`)
const counts = rows.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] ?? 0) + 1 }), {})
console.log('  ' + Object.entries(counts).map(([k, v]) => `${k} ${v}`).join('   '))
console.log(`\nnext: node tools/lang-export.mjs ${corpusPath} --kind ${isWordlist ? 'words' : 'phrases'}`)
