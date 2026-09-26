// =============================================================================
// The boundary. Verified content on one side, the app on the other.
//
//   node tools/lang-build.mjs content/zh/hsk1.tsv --course zh-hsk1
//
// This is the load-bearing piece of the whole design. The app imports only
// `src/shared/lang/generated/`, and only verified rows are ever written there,
// so draft Chinese cannot reach a speech bubble by anyone forgetting a step. It
// is a build boundary rather than a discipline, which is the difference between
// a rule that holds and a rule that holds until a Friday.
//
// It refuses rather than warns. Everything checked here is something that would
// otherwise ship silently: a reading hand-edited out of step with its script, a
// character outside the course, a duplicate id. A warning at the bottom of a
// build log is not a check.
// =============================================================================

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { readTsv } from './lang/tsv.mjs'
import { derive, allowedChars, loadOverrides, validate, wordsPath, LEVELS } from './lang/zh.mjs'
import { TRANSLATIONS, translationPath } from './lang/languages.mjs'

const [corpusPath, ...flags] = process.argv.slice(2)
if (!corpusPath) {
  console.error('usage: node tools/lang-build.mjs <corpus.tsv> --course <id> [--language zh] [--level hsk1]')
  process.exit(2)
}
const flag = (name, fallback) => {
  const i = flags.indexOf(`--${name}`)
  return i >= 0 ? flags[i + 1] : fallback
}
const course = flag('course', 'zh-hsk1')
// Explicit rather than sniffed from the filename. A wordlist is a course's own
// vocabulary and cannot be validated against itself; getting that wrong by
// filename heuristic produces an error blaming the content for the tool.
const kind = flag('kind', 'phrases')
const language = flag('language', 'zh')
const level = flag('level', course.split('-')[1] ?? 'hsk1')
const outPath = `src/shared/lang/generated/${course}.ts`

const rows = readTsv(corpusPath)
const overrideCount = loadOverrides()
if (kind !== 'names' && !LEVELS.includes(level)) {
  console.error(`unknown level "${level}" — pass --level, one of ${LEVELS.join(' ')}`)
  process.exit(2)
}
// Names are not held to the course vocabulary: a name is a name, glossed, and a
// learner meets 珍珠 as what it is called rather than as a word to use.
const chars = kind === 'words' || kind === 'names' ? null : allowedChars(level)

// The wordlist gates everything built on top of it, so an empty one is a
// sequencing mistake rather than a content mistake, and it gets its own message
// — "「爱」is not in the wordlist" is true but sends you looking in the wrong file.
// A course with nothing verified in it has nothing to check, and is written out
// empty — that is how a level exists in the app before its content does.
if (chars && chars.size === 0 && rows.some(r => r.status === 'verified')) {
  console.error(`refusing to build ${course}: the wordlist has no verified rows yet.`)
  console.error('  A phrase course is validated against its course vocabulary, so')
  console.error(`  ${wordsPath(level)} has to go through the loop first.`)
  process.exit(1)
}

const fatal = []
const seen = new Set()
for (const row of rows) {
  if (seen.has(row.id)) fatal.push(`line ${row._line}: duplicate id "${row.id}"`)
  seen.add(row.id)
}

const verified = rows.filter(r => r.status === 'verified')

// Every verified row is re-checked at the boundary, not trusted because it was
// checked once. A corpus is a text file people edit by hand; a status column is
// a claim about the past, and this is the moment the claim is tested.
for (const row of verified) {
  for (const complaint of validate(row, chars)) {
    fatal.push(`line ${row._line} (${row.id} ${row.script}): ${complaint}`)
  }
  // Two keys of different kinds: a blind back-translation and a judgement.
  // Either family of source will do — outside tools or Claude's stand-ins —
  // and which one it was stays written in the row.
  const keys = row.checks.split(',')
  // An adjudicator counts as the blind key: it is only ever called on to rule
  // that a blind back-translation which *looked* different meant the same.
  const blind = keys.some(k => ['gt', 'claude-blind', 'human', 'claude-adjudicated'].includes(k))
  const judge = keys.some(k => k === 'gemini' || k === 'claude-review' || k === 'human')
  if (!blind || !judge) {
    fatal.push(`line ${row._line} (${row.id}): marked verified but checks="${row.checks}" — the two-key rule was not satisfied`)
  }
}

// ── Translations ───────────────────────────────────────────────────────────
// A course's lines in other languages live beside it (`hsk1.es.tsv`,
// `hsk1.ar.tsv`) and are joined here by id. A translation ships only if it is
// verified by two keys itself AND was checked against the line as it stands
// now — a translation of a sentence since corrected is a translation of a
// different sentence. Anything else simply is not there, and the app falls
// back to English for that line in that language.
const glossed = new Map()
const glossCounts = []
for (const [lang, spec] of Object.entries(TRANSLATIONS)) {
  const path = translationPath(corpusPath, lang)
  const glossRows = readTsv(path)
  if (!glossRows.length) continue
  let used = 0
  for (const gRow of glossRows.filter(r => r.status === 'verified')) {
    const line = verified.find(r => r.id === gRow.id)
    if (!line || line.script !== gRow.script || line.english !== gRow.english) continue
    const keys = gRow.checks.split(',')
    const blind = keys.some(k => ['gt', 'claude-blind', 'human', 'claude-adjudicated'].includes(k))
    const judge = keys.some(k => k === 'gemini' || k === 'claude-review' || k === 'human')
    if (!blind || !judge) {
      fatal.push(`${path} line ${gRow._line} (${gRow.id}): marked verified but checks="${gRow.checks}" — the two-key rule was not satisfied`)
      continue
    }
    const want = line.script.split('｜').length
    if (gRow.gloss.split(' | ').length !== want) {
      fatal.push(`${path} line ${gRow._line} (${gRow.id}): ${want} turn(s) in the Chinese but the gloss has ${gRow.gloss.split(' | ').length} — separate turns with " | "`)
      continue
    }
    // Two creatures must never share a name in any language: a pet list with
    // two "Perlita"s is a bug the learner sees. Names only — two sentences
    // may well mean the same thing.
    if (kind === 'names') {
      const twin = [...glossed.entries()].find(([, g]) => g[lang]?.text === gRow.gloss)
      if (twin) {
        fatal.push(`${path} line ${gRow._line} (${gRow.id}): "${gRow.gloss}" is already ${twin[0]}'s name`)
        continue
      }
    }
    // The same rules as the Chinese: the text is re-validated here rather than
    // trusted, and its reading must be exactly what the deriver makes of it —
    // a hand-edited romanization is caught the way a hand-edited pinyin is.
    const complaints = spec.validate?.(gRow.gloss) ?? []
    if (complaints.length) {
      fatal.push(`${path} line ${gRow._line} (${gRow.id}): ${complaints.join('; ')}`)
      continue
    }
    if (spec.reading && gRow.gloss_reading !== spec.reading(gRow.gloss)) {
      fatal.push(`${path} line ${gRow._line} (${gRow.id}): gloss_reading "${gRow.gloss_reading}" is not what the text derives to ("${spec.reading(gRow.gloss)}") — never edit it by hand; run gloss-sync`)
      continue
    }
    if (!glossed.has(gRow.id)) glossed.set(gRow.id, {})
    glossed.get(gRow.id)[lang] = spec.reading ? { text: gRow.gloss, reading: gRow.gloss_reading } : { text: gRow.gloss }
    used++
  }
  glossCounts.push(`${used} ${lang}`)
}

if (fatal.length) {
  console.error(`refusing to build ${course} — ${fatal.length} problem(s):\n`)
  for (const f of fatal.slice(0, 30)) console.error('  ' + f)
  if (fatal.length > 30) console.error(`  …and ${fatal.length - 30} more`)
  console.error('\nNothing was written. Fix the corpus and run again.')
  process.exit(1)
}

// One line per entry, every language on it, the course's own first:
//   { id: "p001", tags: ["greet"], in: { zh: {…}, en: {…}, es: {…}, ar: {…} } },
const cell = s => JSON.stringify(s)
const rendition = r => `{ text: ${cell(r.text)}${r.reading ? `, reading: ${cell(r.reading)}` : ''} }`
const body = verified.map(r => {
  const tags = r.tags.split(',').map(t => t.trim()).filter(Boolean)
  const langs = { [language]: { text: r.script, reading: r.reading }, en: { text: r.english }, ...glossed.get(r.id) }
  const inner = Object.entries(langs).map(([k, v]) => `${k}: ${rendition(v)}`).join(', ')
  return `  { id: ${cell(r.id)}, tags: [${tags.map(cell).join(', ')}], in: { ${inner} } },`
}).join('\n')

const claudeOnly = verified.filter(r => r.checks.includes('claude') && !r.checks.includes('human')).length
const provenance = claudeOnly
  ? `${claudeOnly} by Claude alone, awaiting a human pass`
  : 'all by outside sources or a human'
const out = `// GENERATED by tools/lang-build.mjs from ${corpusPath} — do not edit.
//
// Only rows that passed two independent checks — a blind back-translation and
// a review — are here; see DEVLOG.md, "Nobody's word for it". To change a line, change the corpus and
// send it back through the loop — editing this file skips the verification
// that is the entire point of it existing.
//
// ${verified.length} of ${rows.length} rows verified (${provenance})${overrideCount ? `, with ${overrideCount} pinyin override(s) applied` : ''}.

import type { Course } from '../types'

export const COURSE: Course = {
  id: '${course}',
  source: '${language}',
  level: '${level}',
  entries: [
${body}
  ],
}
`

mkdirSync('src/shared/lang/generated', { recursive: true })
// Written only when it actually changed, so a no-op rebuild leaves no diff.
const changed = !existsSync(outPath) || readFileSync(outPath, 'utf8') !== out
if (changed) writeFileSync(outPath, out, 'utf8')

const counts = rows.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] ?? 0) + 1 }), {})
console.log(`${course}: ${verified.length} verified of ${rows.length}${glossCounts.length ? ` · glosses: ${glossCounts.join(", ")}` : ""}`)
console.log('  ' + Object.entries(counts).map(([k, v]) => `${k} ${v}`).join('   '))
console.log(`  ${changed ? 'written to' : 'unchanged'} ${outPath}`)
if (!verified.length) {
  console.log('\n  Nothing is verified yet, so the app has nothing to say. That is the')
  console.log('  boundary working, not a failure — run the export/ingest loop first.')
}
