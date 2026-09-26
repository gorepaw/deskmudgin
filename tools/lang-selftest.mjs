// =============================================================================
// Drive the whole verification loop with fabricated replies.
//
//   node tools/lang-selftest.mjs
//
// The loop's failure modes are all silent ones: a row promoted on one source's
// word, a hand-typed tone mark surviving into the build, a Google Translate
// paste that came back short and got matched off by one. None of those announce
// themselves — they just produce an app that teaches something wrong.
//
// So the plumbing is exercised here against replies with **known defects
// planted in them**, on a scratch corpus, before anyone spends an evening
// verifying real content. This proves the pipeline, not the Chinese.
// =============================================================================

import { execFileSync } from 'node:child_process'
import { writeFileSync, readFileSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { readTsv, writeTsv } from './lang/tsv.mjs'
import { OVERRIDES_PATH } from './lang/zh.mjs'

const CORPUS = 'content/zh/_selftest.tsv'
// The loop writes proposed overrides into the real overrides file, and this
// test feeds it a fabricated one. Snapshot and restore, or running the test
// leaves invented Chinese sitting in content as though somebody meant it.
const overridesBefore = existsSync(OVERRIDES_PATH)
  ? readFileSync(OVERRIDES_PATH, 'utf8') : null
const node = (args) => execFileSync(process.execPath, args, { encoding: 'utf8' })
const clean = () => {
  if (existsSync(CORPUS)) rmSync(CORPUS)
  if (overridesBefore === null) { if (existsSync(OVERRIDES_PATH)) rmSync(OVERRIDES_PATH) }
  else writeFileSync(OVERRIDES_PATH, overridesBefore, 'utf8')
  for (const f of readdirSync('content/review')) {
    if (f.startsWith('_selftest.')) rmSync(`content/review/${f}`)
  }
  if (existsSync('content/review/archive/_selftest')) {
    rmSync('content/review/archive/_selftest', { recursive: true })
  }
  if (existsSync('src/shared/lang/generated/_selftest.ts')) {
    rmSync('src/shared/lang/generated/_selftest.ts')
  }
}

let failures = 0
const check = (label, cond, detail = '') => {
  console.log(`  ${cond ? 'ok  ' : 'FAIL'}  ${label}${detail && !cond ? ` — ${detail}` : ''}`)
  if (!cond) failures++
}

clean()

// ── A scratch corpus with six rows, drawn from the real wordlist ─────────────
const source = readTsv('content/zh/hsk1.words.tsv')
// 喝 for the planted tone correction: it must be a word with no real override,
// or the real one masks what is being tested.
const pick = ['爱', '八', '吃', '喝', '猫', '水'].map(s => source.find(r => r.script === s))
writeTsv(CORPUS, pick.map((r, i) => ({ ...r, id: `t${i + 1}`, status: 'draft', checks: '', note: '' })))

console.log('1. export')
node(['tools/lang-export.mjs', CORPUS, '--kind', 'words', '--chunk', '10'])
const sent = readFileSync('content/review/_selftest.01.gt.txt', 'utf8')
  .split('\n').filter(Boolean)
check('exported one chunk of six', sent.length === 6, `got ${sent.length}`)
check('gemini prompt demands a fixed TSV header',
  readFileSync('content/review/_selftest.01.gemini.md', 'utf8').includes('id\tverdict'))
check('an answer template is written for Google Translate',
  existsSync('content/review/_selftest.01.gt.out.txt'))
check('an answer template is written for Gemini',
  existsSync('content/review/_selftest.01.gemini.out.tsv'))

// A template is a file that exists and says nothing. If that read as an empty
// reply it would either error or silently settle rows against nothing, so the
// distinction gets its own check: untouched templates must simply not count yet.
let stubOk = true
try {
  const said = node(['tools/lang-ingest.mjs', CORPUS])
  stubOk = said.includes('not filled in yet')
} catch { stubOk = false }
check('untouched templates read as "not yet", not as an empty reply', stubOk)
check('nothing was settled from templates alone',
  readTsv(CORPUS).every(r => r.status === 'draft'))

// ── Fabricated replies, with four defects planted ───────────────────────────
// t1 爱   both agree            → must end verified
// t2 八   both agree            → must end verified
// t3 吃   gemini ok, GT reads it as something else → one key only, must conflict
// t4 喝   gemini proposes a (deliberately wrong) pinyin fix → must NOT edit the row; must file an override
// t5 猫   gemini drops it       → must end rejected
// t6 水   gemini returns no verdict at all → must conflict, not silently pass
const rows = readTsv(CORPUS)
const english = Object.fromEntries(rows.map(r => [r.id, r.english]))
writeFileSync('content/review/_selftest.01.gt.out.txt', [
  english.t1, english.t2,
  'to hold a meeting',            // t3: blatant disagreement
  english.t4, english.t5, english.t6,
].join('\n') + '\n', 'utf8')

writeFileSync('content/review/_selftest.01.gemini.out.tsv', [
  'Here is the review you asked for.', '', '```',
  'id\tverdict\tfix_script\tfix_reading\tfix_english\tnote',
  't1\tok\t\t\t\t',
  't2\tok\t\t\t\t',
  't3\tok\t\t\t\t',
  't4\tfix\t\thé\t\tplanted: a tone correction that must not be applied',
  't5\tdrop\t\t\t\tnot on the HSK 1 list',
  '```',
].join('\n'), 'utf8')

console.log('\n2. ingest')
const out = node(['tools/lang-ingest.mjs', CORPUS])
const after = Object.fromEntries(readTsv(CORPUS).map(r => [r.id, r]))

check('two sources agreeing → verified', after.t1.status === 'verified', after.t1.status)
check('a verified row records both keys', after.t1.checks === 'gt,gemini', after.t1.checks)
check('gemini alone is not enough → conflict', after.t3.status === 'conflict', after.t3.status)
check('the disagreement is written into the row', after.t3.note.includes('meeting'), after.t3.note)
check('gemini drop → rejected', after.t5.status === 'rejected', after.t5.status)
check('a missing verdict is not a pass', after.t6.status === 'conflict', after.t6.status)

// The one that matters most: a proposed tone correction must not be typed into
// the corpus. It is a claim about the deriver and belongs in overrides.
check('a proposed reading did NOT edit the row', after.t4.reading !== 'hé', after.t4.reading)
check('a proposed reading is held for re-check', after.t4.status === 'conflict', after.t4.status)
const overrides = readTsv('content/zh/overrides.tsv')
const filed = overrides.find(o => o.script === '喝')
check('a proposed reading was filed as an override', !!filed)
check('the filed override is a draft, not applied', filed?.status === 'draft', filed?.status)

console.log('\n3. build refuses what is not verified')
writeFileSync('content/review/_probe', '', 'utf8'); rmSync('content/review/_probe')
let built = ''
try {
  built = node(['tools/lang-build.mjs', CORPUS, '--course', '_selftest', '--kind', 'words'])
} catch (e) { built = e.stdout ?? '' }
const generated = existsSync('src/shared/lang/generated/_selftest.ts')
  ? readFileSync('src/shared/lang/generated/_selftest.ts', 'utf8') : ''
check('only verified rows reach the generated file',
  generated.includes('"t1"') && !generated.includes('"t3"') && !generated.includes('"t5"'))
check('a rejected row is not shipped', !generated.includes('"t5"'))

console.log('\n4. build refuses a hand-edited reading')
const tampered = readTsv(CORPUS)
tampered.find(r => r.id === 't1').reading = 'ai4'      // desynced from its script
writeTsv(CORPUS, tampered)
let refused = false
try { node(['tools/lang-build.mjs', CORPUS, '--course', '_selftest', '--kind', 'words']) }
catch { refused = true }
check('a reading out of step with its script is refused', refused)

console.log('\n5. Google Translate line-count mismatch is refused, not guessed')
// Round one was archived by ingest, so this needs a round of its own — the
// conflicts going back out — or ingest fails for "no chunks" and the check
// passes for the wrong reason.
node(['tools/lang-export.mjs', CORPUS, '--kind', 'words', '--chunk', '10'])
check('ingest archived round one', existsSync('content/review/archive/_selftest/round-1/_selftest.01.gt.out.txt'))
const round2 = readFileSync('content/review/_selftest.01.gt.txt', 'utf8').split('\n').filter(Boolean)
check('round two carries only the unsettled rows', round2.length === 3, `got ${round2.length}`)
writeFileSync('content/review/_selftest.01.gt.out.txt', 'eat\n', 'utf8')
writeFileSync('content/review/_selftest.01.gemini.out.tsv',
  'id\tverdict\tfix_script\tfix_reading\tfix_english\tnote\nt3\tok\t\t\t\t\n', 'utf8')
let refusedCount = false
try { node(['tools/lang-ingest.mjs', CORPUS]) } catch { refusedCount = true }
check('a short paste cannot be matched off by one', refusedCount)

// ── The Arabic deriver ────────────────────────────────────────────────────
// Arabic readings are derived from the vowel marks, the way pinyin is derived
// from characters, so the deriver is the thing to test: each case is a vowelled
// line and the romanization a learner should be shown.
console.log('\n6. Arabic readings derive from the vowel marks')
const { analyse, validate: arValidate } = await import('./lang/ar.mjs')
for (const [arabic, want] of JSON.parse(readFileSync('tools/lang/ar.cases.json', 'utf8'))) {
  const { reading, problems } = analyse(arabic)
  check(`${arabic} → ${want}`, reading === want && !problems.length, `got "${reading}" ${problems.join('; ')}`)
}
check('unvowelled Arabic is refused', arValidate('مرحبا').length > 0)
check('هذا without its dagger alif is refused', arValidate('هَذَا كِتَابٌ.').some(c => c.includes('dagger')))
check('a Persian letter is refused', arValidate('کِتَابٌ').some(c => c.includes('Persian')))

clean()
console.log(`\n${failures ? `${failures} FAILED` : 'all good — the loop holds'}`)
process.exit(failures ? 1 : 0)
