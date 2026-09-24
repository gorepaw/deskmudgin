// =============================================================================
// Settle rows by hand, on the record.
//
//   node tools/lang-settle.mjs content/zh/hsk1.words.tsv w046 w072 --by human --note "synonyms"
//   node tools/lang-settle.mjs content/zh/overrides.tsv o001 o002 --by human
//   node tools/lang-settle.mjs content/zh/hsk1.tsv p012 --reject --by human --note "unnatural"
//
// The two-key loop cannot settle everything and is not meant to. Its blind
// comparison is crude on purpose, so "pretty" against "beautiful" comes back as
// a conflict, and it takes a judgement — not a looser threshold — to say they
// mean the same. This is where that judgement is exercised.
//
// Settling is **additive**: the adjudicator is appended to the row's existing
// `checks` rather than replacing them, so a row verified by a person after two
// machines still says so. `--by` is required, because a settled row with no
// name on it is exactly the unaccountable promotion this pipeline exists to
// prevent.
// =============================================================================

import { readTsv, writeTsv } from './lang/tsv.mjs'

const args = process.argv.slice(2)
const corpusPath = args[0]
const flagAt = n => args.indexOf(n)
const flagVal = n => (flagAt(n) >= 0 ? args[flagAt(n) + 1] : null)

const by = flagVal('--by')
const note = flagVal('--note') ?? ''
const reject = args.includes('--reject')
const valued = new Set(['--by', '--note'])
const ids = args.slice(1).filter((a, i, all) =>
  !a.startsWith('--') && !valued.has(all[i - 1]))

if (!corpusPath || !ids.length || !by) {
  console.error('usage: node tools/lang-settle.mjs <corpus.tsv> <id...> --by <human|claude-adjudicated> [--note "..."] [--reject]')
  process.exit(2)
}

const rows = readTsv(corpusPath)
const missing = ids.filter(id => !rows.some(r => r.id === id))
if (missing.length) {
  console.error(`no such id(s): ${missing.join(' ')} — nothing changed`)
  process.exit(1)
}

// A person's verdict carries both keys at once; a machine adjudicator's only
// counts once the row already has a blind and a review key behind it.
for (const row of rows.filter(r => ids.includes(r.id))) {
  const checks = new Set(row.checks.split(',').filter(Boolean))
  for (const k of by.split(',')) checks.add(k)
  row.checks = [...checks].join(',')
  row.status = reject ? 'rejected' : 'verified'
  row.note = note ? `settled by ${by}: ${note}` : `settled by ${by}`
  console.log(`  ${row.status.padEnd(8)} ${row.id}  ${row.script}  ${row.english}   [${row.checks}]`)
}
writeTsv(corpusPath, rows)
