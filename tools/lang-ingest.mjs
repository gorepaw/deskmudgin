// =============================================================================
// Take the two replies back in, and decide nothing on my own.
//
//   node tools/lang-ingest.mjs content/zh/hsk1.words.tsv
//
// The **two-key rule**: a row becomes `verified` only when two independent
// sources agree it is right — Google Translate's blind back-translation, which
// knows nothing of what we intended, and Gemini's judgement, which does. Either
// alone is one opinion. Where they disagree the row lands in `conflict` with
// both opinions written into it, and a human settles it. Nothing here promotes
// a row on its own reasoning, because the entire point of this pipeline is that
// my reasoning about Chinese is not evidence.
//
// One rule is enforced harder than the rest: **a proposed pinyin correction
// never edits a row.** `reading` is derived, so a correction to it is a claim
// about the *deriver*, and it is filed as a draft override in overrides.tsv to
// be verified in its own right. Otherwise the corpus quietly accumulates
// hand-typed tone marks, which is the exact thing this design exists to stop.
// =============================================================================

import { readFileSync, existsSync, readdirSync, mkdirSync, renameSync } from 'node:fs'
import { basename } from 'node:path'
import { readTsv, writeTsv } from './lang/tsv.mjs'
import { derive, OVERRIDES_PATH } from './lang/zh.mjs'
import { TRANSLATIONS, translationOf } from './lang/languages.mjs'

const corpusPath = process.argv[2]
if (!corpusPath) {
  console.error('usage: node tools/lang-ingest.mjs <corpus.tsv>')
  process.exit(2)
}
const batch = basename(corpusPath).replace(/\.tsv$/, '')
const rows = readTsv(corpusPath)

// Who turned the two keys. Recorded in every row's `checks` so provenance
// survives: a row Claude verified must stay findable as one, because the plan
// is for a person to go back over exactly those later. The defaults are the
// outside sources; `--by claude` names the blind back-translator and reviewer
// agents that stand in for them.
const by = process.argv.includes('--by') ? process.argv[process.argv.indexOf('--by') + 1] : 'outside'
const [BLIND, JUDGE] = by === 'claude' ? ['claude-blind', 'claude-review'] : ['gt', 'gemini']

/**
 * A translation file (`hsk1.es.tsv`, `hsk1.ar.tsv`) is checked for its
 * translation, and a reviewer's fix arrives in `fix_gloss`. The Chinese itself
 * is not under review there, so nothing about scripts or pinyin is touched.
 *
 * Which column the blind reading is compared with depends on which way the
 * blind translator worked (tools/lang/languages.mjs): Chinese into Spanish is
 * compared with the Spanish, Arabic back into English with the English.
 */
const glossLang = translationOf(corpusPath)
const spec = glossLang ? TRANSLATIONS[glossLang] : null
const backwards = spec?.blind === 'to-english'
const field = glossLang && !backwards ? 'gloss' : 'english'
/** The column to show when listing what needs attention. */
const shown = glossLang ? 'gloss' : 'english'

/** Words too common to count as agreement, per language. */
const STOP = {
  en: ['a', 'an', 'the', 'to', 'of', 'is', 'are', 'some'],
  es: ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'a', 'que', 'y', 'o',
    'es', 'son', 'lo', 'se', 'me', 'te', 'le', 'les', 'mi', 'tu', 'su', 'por', 'para', 'con', 'en', 'muy', 'ya'],
}
const stop = new Set(STOP[field === 'gloss' ? glossLang : 'en'] ?? [])

/** Accents folded away, so "está" and "esta" — which a hurried back-
 *  translation will confuse — do not score as different words. */
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Strip everything that is style rather than meaning, so "to eat" and "Eat"
 *  and "eat; to consume" all compare as the same claim. */
const norm = s => fold(s)
  .replace(/\(.*?\)/g, ' ')
  .replace(/[^a-z0-9\s]/g, ' ')
  .split(/\s+/).filter(t => t && !stop.has(t))

/**
 * Words that mean the same thing and differ only by dialect or register.
 *
 * Kept tiny and literal on purpose. Each pair here is a case where a
 * back-translation came out in the other variety of English — mum/mom,
 * film/movie — and was flagged as a disagreement about meaning when it was a
 * disagreement about spelling. Anything that is a real judgement ("pretty" vs
 * "beautiful", "can" vs "be able to") does not belong here: that is for the
 * reviewer or a person, not a lookup table.
 */
const VARIANTS = {
  mum: 'mom', aeroplane: 'airplane', film: 'movie', films: 'movies',
  shop: 'store', shops: 'stores', colour: 'color', thanks: 'thank',
}
const canon = t => VARIANTS[t] ?? t

/** Token overlap, 0..1. Crude on purpose: this is a screen for gross errors,
 *  not a semantic judge, and anything cleverer would invite trusting it. */
function agree(mine, theirs) {
  // Normalising can strip a gloss to nothing — "(measure word for books)" is
  // all parenthetical and "some" is all stopword — and two empties used to
  // score 0, so identical strings were reported as disagreeing. Compare them
  // whole before comparing them as tokens.
  const flat = s => fold(s).replace(/[^a-z0-9]+/g, ' ').trim()
  if (flat(mine) === flat(theirs)) return 1
  const a = new Set(norm(mine).map(canon))
  const b = new Set(norm(theirs).map(canon))
  if (!a.size || !b.size) return 0
  let hit = 0
  for (const t of a) if (b.has(t)) hit++
  return hit / Math.min(a.size, b.size)
}
const AGREES = 0.5

/**
 * Read a reply file, or null if it is still the stub the export left.
 *
 * The export writes both answer files up front with their instructions inside,
 * so a file existing is not the same as a file being filled in. Comment lines
 * carry those instructions and are stripped; a file with nothing left is a
 * chunk you have not got to yet, which should read as a quiet "not yet" rather
 * than as an empty reply to be acted on.
 */
const content = path => existsSync(path)
  ? readFileSync(path, 'utf8').split(/\r?\n/)
      .filter(l => l.trim() !== '' && !l.startsWith('#'))
  : null

function parseGeminiTsv(lines) {
  // Tolerant of a fenced block and of prose around it, because that is what
  // actually comes back however firmly the prompt asks.
  const trimmed = lines.map(l => l.replace(/^\s+|\s+$/g, ''))
  const start = trimmed.findIndex(l => /^id\tverdict/.test(l))
  if (start < 0) return null
  const header = trimmed[start].split('\t')
  const out = []
  for (const line of trimmed.slice(start + 1)) {
    if (!line || line.startsWith('```') || line.startsWith('#')) break
    const cells = line.split('\t')
    if (cells.length < 2) break
    out.push(Object.fromEntries(header.map((h, i) => [h, (cells[i] ?? '').trim()])))
  }
  return out
}

// Exact pattern, not a prefix: batch `hsk1` must not claim `hsk1.words.01.*`,
// which a prefix match does — and then reads chunk 01 twice, from two batches.
const chunkFile = new RegExp(`^${batch.replace(/[.]/g, '[.]')}[.](\\d+)[.]gt[.]txt$`)
const chunks = readdirSync('content/review')
  .map(f => f.match(chunkFile)?.[1])
  .filter(Boolean)
  .sort()

if (!chunks.length) {
  console.error('no exported chunks found for ' + batch + ' — run lang-export.mjs first')
  process.exit(1)
}

const overrides = readTsv(OVERRIDES_PATH)
const newOverrides = []
const report = { verified: 0, conflict: 0, rejected: 0, missing: [] }
/** Chunks fully read this run, to be moved out of the way once the corpus is
 *  safely written — never before, or a crash mid-run would lose the answers. */
const finished = []
const detail = []

for (const tag of chunks) {
  const sent = readFileSync(`content/review/${batch}.${tag}.gt.txt`, 'utf8')
    .split(/\r?\n/).filter(l => l.trim() !== '')

  const gt = content(`content/review/${batch}.${tag}.gt.out.txt`)
  const gmLines = content(`content/review/${batch}.${tag}.gemini.out.tsv`)
  if (!gt?.length || !gmLines?.length) {
    report.missing.push(tag)
    continue
  }

  if (gt.length !== sent.length) {
    console.error(`chunk ${tag}: Google Translate returned ${gt.length} lines for ${sent.length} sent.`)
    console.error('  Matching is by line position, so this cannot be reconciled safely. Re-paste that chunk.')
    process.exit(1)
  }

  // A blind reply is one plain line per entry. A tab in one means the paste
  // brought numbering or columns with it — the translation would land in the
  // corpus with "12<tab>" in front of it — so it is refused here, by name,
  // rather than failing later in the writer with a message about a field.
  const tabbed = gt.findIndex(l => l.includes('	'))
  if (tabbed >= 0) {
    console.error(`chunk ${tag}: line ${tabbed + 1} of the blind reply contains a tab ("${gt[tabbed]}").`)
    console.error('  Replies are plain text, one translation per line — paste again without numbers or columns.')
    process.exit(1)
  }

  const gemini = parseGeminiTsv(gmLines)
  if (!gemini) {
    console.error(`chunk ${tag}: no TSV block found in the Gemini reply (expected a line starting "id<tab>verdict")`)
    process.exit(1)
  }
  const verdicts = new Map(gemini.map(g => [g.id, g]))
  finished.push(tag)

  // Line position is the join for Google Translate; ids are the join for Gemini.
  //
  // The index must stay the index of the line *sent*. This used to map and then
  // filter out rows it could no longer find — and a row is unfindable exactly
  // when an earlier round's fix changed its script — so one dropped row shifted
  // every later row against the wrong answer, and 狗 was reported as
  // disagreeing with "dog". Unmatched lines are skipped in place, never removed.
  //
  // Where the export recorded which row each line was, that is the join: a
  // translation file can hold the same text twice. Older exports without the
  // record fall back to finding the row by its Chinese.
  const idsFile = `content/review/${batch}.${tag}.ids.txt`
  const ids = existsSync(idsFile) ? readFileSync(idsFile, 'utf8').split(/\r?\n/).filter(Boolean) : null
  if (ids && ids.length !== sent.length) {
    console.error(`chunk ${tag}: ${ids.length} ids recorded for ${sent.length} lines sent — the export is damaged; export again.`)
    process.exit(1)
  }
  sent.forEach((script, i) => {
    const row = ids ? rows.find(r => r.id === ids[i]) : rows.find(r => r.script === script)
    if (!row) return
    const back = gt[i]
    const g = verdicts.get(row.id)
    const score = agree(row[field], back)
    const gtOk = score >= AGREES

    if (!g) {
      row.status = 'conflict'
      row.note = `gemini returned no verdict for this row; google said "${back}"`
      report.conflict++
      detail.push(['?', row, `no gemini verdict · gt "${back}"`])
      return
    }

    if (g.verdict === 'drop') {
      row.status = 'rejected'
      row.checks = JUDGE
      row.note = g.note || `dropped by ${JUDGE}`
      report.rejected++
      detail.push(['x', row, g.note || 'dropped'])
      return
    }

    if (g.verdict === 'fix' && glossLang) {
      // Only the gloss is under review in a gloss file; the Chinese beside it
      // was verified elsewhere and is left alone whatever the reviewer says.
      // A fix that changes a conversation's number of turns is refused and the
      // row keeps its gloss: HSK 1's first Spanish round took a one-turn fix to
      // a two-turn exchange and would have shipped it half-translated had the
      // build not stopped it. The reviewer's note still goes on the row.
      const turns = s => s.split(' | ').length
      if (g.fix_gloss && turns(g.fix_gloss) !== row.script.split('｜').length) {
        row.status = 'conflict'
        row.checks = ''
        row.note = `reviewer's fix had ${turns(g.fix_gloss)} turn(s) for ${row.script.split('｜').length} — not applied ("${g.fix_gloss}"; ${g.note || 'no reason given'})`
        report.conflict++
        detail.push(['~', row, 'fix refused: wrong number of turns'])
        return
      }
      if (g.fix_gloss) {
        row.gloss = g.fix_gloss
        // A derived reading follows its text, as pinyin follows its script.
        if (spec.reading) row.gloss_reading = spec.reading(g.fix_gloss)
      }
      const complaints = spec.validate?.(row.gloss) ?? []
      row.status = 'conflict'
      row.checks = ''
      row.note = `reviewer proposed a fix (${g.note || 'no reason given'}); blind reading was "${back}" · re-check next round`
        + (complaints.length ? ` · the fix does not validate: ${complaints.join('; ')}` : '')
      report.conflict++
      detail.push(['~', row, g.note || 'fixed, needs re-check'])
      return
    }

    if (g.verdict === 'fix') {
      // A proposed reading correction is a claim about the deriver, not about
      // this row. File it as a draft override; leave `reading` alone.
      const script = g.fix_script || row.script
      if (g.fix_reading && g.fix_reading !== derive(script)) {
        const known = overrides.some(o => o.script === script)
          || newOverrides.some(o => o.script === script)
        if (!known) {
          newOverrides.push({
            id: `o${String(overrides.length + newOverrides.length + 1).padStart(3, '0')}`,
            script,
            reading: g.fix_reading,
            english: '',
            tags: 'from-gemini',
            status: 'draft',
            checks: '',
            note: `proposed while checking ${row.id}; deriver said "${derive(script)}"`,
          })
        }
      }
      if (g.fix_script) { row.script = g.fix_script; row.reading = derive(g.fix_script) }
      if (g.fix_english) row.english = g.fix_english
      row.status = 'conflict'
      row.checks = ''
      row.note = `gemini proposed a fix (${g.note || 'no reason given'}); google read it as "${back}" · re-check next round`
      report.conflict++
      detail.push(['~', row, g.note || 'fixed, needs re-check'])
      return
    }

    // verdict ok — now the second key has to turn too. And a translation that
    // does not pass its language's own checks (unvowelled Arabic) is not ok
    // whatever anyone said about its meaning.
    const complaints = spec?.validate?.(row.gloss) ?? []
    if (complaints.length) {
      row.status = 'conflict'
      row.checks = ''
      row.note = `does not validate: ${complaints.join('; ')}`
      report.conflict++
      detail.push(['!', row, row.note])
    } else if (gtOk) {
      row.status = 'verified'
      row.checks = `${BLIND},${JUDGE}`
      row.note = ''
      report.verified++
    } else {
      row.status = 'conflict'
      row.checks = JUDGE
      row.note = `gemini says ok but google read it as "${back}" (overlap ${score.toFixed(2)}) · decide by hand`
      report.conflict++
      detail.push(['!', row, `gt disagrees: "${back}"`])
    }
  })
}

writeTsv(corpusPath, rows)

// Archive what was just read. The review folder holds only what is still
// outstanding, so the next round's export — the fixes and conflicts going back
// for a second look — can reuse chunk numbers without overwriting this round's
// answers. Kept rather than deleted: it is the record of who said what.
let archivedTo = null
if (finished.length) {
  const base = `content/review/archive/${batch}`
  mkdirSync(base, { recursive: true })
  const round = readdirSync(base).filter(d => d.startsWith('round-')).length + 1
  archivedTo = `${base}/round-${round}`
  mkdirSync(archivedTo, { recursive: true })
  for (const tag of finished) {
    for (const ext of ['gt.txt', 'ids.txt', 'gt.out.txt', 'gemini.md', 'gemini.out.tsv']) {
      const f = `${batch}.${tag}.${ext}`
      if (existsSync(`content/review/${f}`)) renameSync(`content/review/${f}`, `${archivedTo}/${f}`)
    }
  }
}
if (newOverrides.length) writeTsv(OVERRIDES_PATH, [...overrides, ...newOverrides])

console.log(batch)
console.log(`  verified  ${report.verified}   (both sources agree)`)
console.log(`  conflict  ${report.conflict}   (needs you)`)
console.log(`  rejected  ${report.rejected}`)
if (newOverrides.length) {
  console.log(`\n  ${newOverrides.length} pinyin override(s) proposed → ${OVERRIDES_PATH}`)
  console.log('  These are drafts. Verify them and re-run; nothing uses them until you do.')
}
if (report.missing.length) {
  console.log(`\n  not filled in yet: chunk(s) ${report.missing.join(', ')}`)
}
if (archivedTo) {
  console.log(`\n  answers archived to ${archivedTo}`)
}
if (detail.length) {
  console.log('\nneeding attention:')
  for (const [mark, row, why] of detail.slice(0, 40)) {
    console.log(`  ${mark} ${row.id}  ${row.script}  ${row[shown]}`)
    console.log(`      ${why}`)
  }
  if (detail.length > 40) console.log(`  …and ${detail.length - 40} more, in the corpus`)
}
