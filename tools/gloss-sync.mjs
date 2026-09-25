// =============================================================================
// Keep a course's gloss file in step with the course.
//
//   node tools/gloss-sync.mjs content/zh/hsk1.tsv --lang es
//
// A gloss is a second meaning for a line that is already verified — Spanish
// beside the English — and it lives in its own file (`hsk1.es.tsv`) so that
// adding one never touches a verified Chinese row. It is checked on its own,
// through the same loop, with the gloss in the place the English had.
//
// This writes one gloss row per verified course row, carrying copies of the
// line's script, reading and English: context for whoever drafts and checks
// the gloss, and the evidence that the line has not changed since. When it
// has — a script or an English gloss corrected upstream — the translation is
// kept but sent back to `draft`, because a gloss checked against a different
// sentence has not been checked. Rows whose line is no longer verified are
// dropped, since nothing can show them.
//
// It never writes a gloss. It only lays out the rows a gloss goes into.
// =============================================================================

import { existsSync } from 'node:fs'
import { readTsv, writeTsv, GLOSS_COLUMNS } from './lang/tsv.mjs'

const [coursePath, ...flags] = process.argv.slice(2)
const li = flags.indexOf('--lang')
const lang = li >= 0 ? flags[li + 1] : null
if (!coursePath || !lang) {
  console.error('usage: node tools/gloss-sync.mjs <course.tsv> --lang es')
  process.exit(2)
}

export const glossPath = (course, l) => course.replace(/\.tsv$/, `.${l}.tsv`)
const path = glossPath(coursePath, lang)
const isNew = !existsSync(path)

const course = readTsv(coursePath).filter(r => r.status === 'verified')
const before = new Map(readTsv(path).map(r => [r.id, r]))

let added = 0
let stale = 0
const rows = course.map(c => {
  const old = before.get(c.id)
  if (!old) {
    added++
    return { id: c.id, script: c.script, reading: c.reading, english: c.english, gloss: '', status: 'draft', checks: '', note: '' }
  }
  const changed = old.script !== c.script || old.english !== c.english
  if (changed && old.status !== 'draft') {
    stale++
    return { ...old, script: c.script, reading: c.reading, english: c.english, status: 'draft', checks: '',
      note: `the line changed since this was checked (was "${old.script}" / "${old.english}")` }
  }
  return { ...old, script: c.script, reading: c.reading, english: c.english }
})
const dropped = [...before.keys()].filter(id => !course.some(c => c.id === id)).length

writeTsv(path, rows, GLOSS_COLUMNS)

const empty = rows.filter(r => !r.gloss).length
const counts = rows.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] ?? 0) + 1 }), {})
console.log(`${path}${isNew ? ' (new)' : ''}: ${rows.length} rows`)
console.log('  ' + Object.entries(counts).map(([k, v]) => `${k} ${v}`).join('   '))
if (added) console.log(`  ${added} new row(s)`)
if (stale) console.log(`  ${stale} sent back to draft — the line they gloss has changed`)
if (dropped) console.log(`  ${dropped} dropped — their line is no longer verified`)
if (empty) console.log(`  ${empty} still need a gloss written in the \`gloss\` column`)
