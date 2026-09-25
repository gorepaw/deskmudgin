// =============================================================================
// Fill a gloss file from a plain list of translations.
//
//   node tools/gloss-fill.mjs content/zh/hsk1.es.tsv drafts.tsv
//
// `drafts.tsv` is `id<TAB>gloss`, one per line, no header — the simplest shape
// a person or a drafting tool can produce, and one that cannot disturb any
// other column. Only rows still in `draft` are filled: a gloss that has been
// through a round of checking is never overwritten by a fresh draft, because
// that would quietly discard the check.
//
// It refuses the whole file rather than filling part of it when an id is
// unknown or a conversation's turn count is wrong: a partial fill from a list
// that has drifted out of step is exactly how glosses end up on the wrong rows.
// =============================================================================

import { readFileSync } from 'node:fs'
import { readTsv, writeTsv, GLOSS_COLUMNS } from './lang/tsv.mjs'

const [glossPath, draftsPath] = process.argv.slice(2)
if (!glossPath || !draftsPath) {
  console.error('usage: node tools/gloss-fill.mjs <course.xx.tsv> <id-tab-gloss.tsv>')
  process.exit(2)
}

const rows = readTsv(glossPath)
const byId = new Map(rows.map(r => [r.id, r]))
const lines = readFileSync(draftsPath, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim())

const problems = []
const fills = []
for (const [i, line] of lines.entries()) {
  const tab = line.indexOf('\t')
  const id = (tab < 0 ? line : line.slice(0, tab)).trim()
  const gloss = tab < 0 ? '' : line.slice(tab + 1).trim()
  const row = byId.get(id)
  if (!row) { problems.push(`line ${i + 1}: unknown id "${id}"`); continue }
  if (!gloss) { problems.push(`line ${i + 1} (${id}): empty gloss`); continue }
  if (gloss.includes('\t')) { problems.push(`line ${i + 1} (${id}): more than one tab`); continue }
  const want = row.script.split('｜').length
  const got = gloss.split(' | ').length
  if (want !== got) problems.push(`line ${i + 1} (${id}): ${want} turn(s) in the Chinese, ${got} in the gloss`)
  fills.push([row, gloss])
}

if (problems.length) {
  console.error(`${problems.length} problem(s) — nothing written:\n`)
  for (const p of problems.slice(0, 30)) console.error('  ' + p)
  process.exit(1)
}

let filled = 0
let kept = 0
for (const [row, gloss] of fills) {
  if (row.status !== 'draft') { kept++; continue }
  row.gloss = gloss
  filled++
}
writeTsv(glossPath, rows, GLOSS_COLUMNS)

const missing = rows.filter(r => !r.gloss).length
console.log(`${glossPath}: ${filled} filled${kept ? `, ${kept} left alone (already past draft)` : ''}`)
if (missing) console.log(`  ${missing} row(s) still have no gloss`)
