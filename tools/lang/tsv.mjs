// =============================================================================
// The exchange format.
//
// TSV, and the choice is about the human step rather than the machine one.
// Every row in this project has to leave the repo, get pasted into Google
// Sheets and into Gemini by hand, and come back. TSV survives that trip in both
// directions; JSON does not survive a paste into a spreadsheet, and CSV does
// not survive a comma inside an English gloss.
//
// There is no quoting and there is no escaping. A tab or a newline inside a
// field is rejected at write time rather than encoded, because the moment this
// format needs a parser with state it stops being something you can fix in a
// spreadsheet — which is the only reason it was chosen.
// =============================================================================

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

/** Column order, fixed. Readers key by header name, so adding a column at the
 *  end is safe; this is what a fresh file gets written with. */
export const COLUMNS = [
  'id', 'script', 'reading', 'english', 'tags', 'status', 'checks', 'note',
]

/**
 * A gloss file (`hsk1.es.tsv`): another language's meaning for each line of a
 * course, beside copies of the line it glosses — so a reviewer sees the
 * Chinese, and so a later change to the line is noticed and the gloss sent
 * back for checking. `gloss` is the translation being verified.
 */
export const GLOSS_COLUMNS = [
  'id', 'script', 'reading', 'english', 'gloss', 'status', 'checks', 'note',
]

/** The same, for a language with a reading of its own (Arabic's romanization).
 *  `gloss_reading` is derived from `gloss`, never typed — as `reading` is. */
export const GLOSS_READING_COLUMNS = [
  'id', 'script', 'reading', 'english', 'gloss', 'gloss_reading', 'status', 'checks', 'note',
]

export function readTsv(path) {
  if (!existsSync(path)) return []
  const text = readFileSync(path, 'utf8').replace(/^﻿/, '')
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== '')
  if (!lines.length) return []
  const header = lines[0].split('\t').map(h => h.trim())
  const rows = lines.slice(1).map((line, i) => {
    const cells = line.split('\t')
    const row = {}
    header.forEach((h, c) => { row[h] = (cells[c] ?? '').trim() })
    // Kept so an error can name the line you would actually scroll to, not a
    // row index that is off by the header.
    Object.defineProperty(row, '_line', { value: i + 2, enumerable: false })
    return row
  })
  // The file's own column order travels with its rows, so writing them back
  // keeps every column — a gloss file's included — rather than quietly
  // narrowing the file to the default set.
  Object.defineProperty(rows, 'columns', { value: header, enumerable: false })
  return rows
}

export function writeTsv(path, rows, columns = rows.columns ?? COLUMNS) {
  const out = [columns.join('\t')]
  for (const row of rows) {
    const cells = columns.map(c => {
      const v = String(row[c] ?? '')
      if (v.includes('\t') || v.includes('\n')) {
        throw new Error(`row ${row.id}: field "${c}" contains a tab or newline, which this format cannot carry`)
      }
      return v
    })
    out.push(cells.join('\t'))
  }
  // Trailing newline, LF: the file is read by scripts, opened in Sheets and
  // diffed in git, and only git cares — but it cares every time.
  writeFileSync(path, out.join('\n') + '\n', 'utf8')
}
