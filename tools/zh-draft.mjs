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
import { derive, allowedChars, loadOverrides, isPunct, levelOf, LEVELS, wordsPath } from './lang/zh.mjs'

const corpusPath = process.argv[2]
if (!corpusPath) {
  console.error('usage: node tools/zh-draft.mjs <corpus.tsv> [--prefix p]')
  process.exit(2)
}
const isWordlist = corpusPath.includes('.words.')
const pi = process.argv.indexOf('--prefix')
// Ids are the ledger's keys, so they must be unique across every level: HSK 1
// kept its bare w/p/x, and each level above is marked — h2w001, h2p001, h2x001.
const kindLetter = isWordlist ? 'w' : corpusPath.includes('.exchanges.') ? 'x' : 'p'
const level = levelOf(corpusPath) ?? 'hsk1'
const prefix = pi >= 0 ? process.argv[pi + 1]
  : level !== 'hsk1' ? `h${level.slice(3)}${kindLetter}` : kindLetter
// Names are exempt from the vocabulary check for the same reason as in
// lang-build: they are names. Explicit, like the build's --kind.
const isNames = process.argv.includes('--names')

loadOverrides()
const rows = readTsv(corpusPath)
const chars = isWordlist || isNames ? null : allowedChars(level)

if (chars && chars.size === 0) {
  console.error(`the wordlist has no verified rows yet — verify ${wordsPath(level)} first,`)
  console.error('or there is nothing to check a phrase\'s vocabulary against.')
  process.exit(1)
}

// A level's wordlist is what that level *adds*. A word already taught lower
// down would be listed twice in the dictionary and filed at the wrong level.
const lower = new Map()
if (isWordlist) {
  for (const lv of LEVELS.slice(0, LEVELS.indexOf(level))) {
    for (const w of readTsv(wordsPath(lv))) lower.set(w.script, lv)
  }
}

// Above HSK 1, a sentence must use something from its own level: one built only
// from HSK 1 words is an HSK 1 sentence filed in the wrong place, and a level
// that is mostly the level below teaches nothing new.
const own = isWordlist || isNames || level === 'hsk1' ? []
  : readTsv(wordsPath(level)).filter(r => r.status === 'verified')
      .flatMap(r => [r.script.split('…').filter(Boolean)])

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
  if (lower.has(row.script)) {
    problems.push(`${where}: "${row.script}" is already in ${lower.get(row.script)}`)
  }
  if (chars) {
    for (const ch of row.script) {
      if (isPunct(ch)) continue
      if (!chars.has(ch)) {
        problems.push(`${where} (${row.script}): 「${ch}」is outside this course's vocabulary`)
      }
    }
  }

  if (own.length && !own.some(parts => parts.every(p => row.script.includes(p)))) {
    problems.push(`${where} (${row.script}): uses no ${level} word — it belongs in a lower level`)
  }

  if (!row.id) { row.id = mintId(); minted++ }
  // The reading is always rewritten, never accepted. If someone typed one in,
  // this is where it quietly stops mattering — which is the intent.
  const want = derive(row.script)
  if (row.reading !== want) { row.reading = want; rederived++ }
  if (!row.status) row.status = 'draft'
  if (!row.tags) row.tags = isWordlist ? level : 'random'
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
console.log(`\nnext: node tools/lang-export.mjs ${corpusPath} --kind ${isWordlist ? 'words' : kindLetter === 'x' ? 'exchanges' : 'phrases'}`)
