// =============================================================================
// Send a batch out to be checked.
//
//   node tools/lang-export.mjs content/zh/hsk1.words.tsv --kind words
//
// Writes two things per chunk, because the two checks are different in kind and
// asking one tool to do both wastes them:
//
//   • <batch>.NN.gt.txt   — bare Chinese, one line each, for Google Translate.
//     A blunt bulk screen. It has no idea what we intended, which is exactly
//     what makes it useful: it is an independent reading of the characters.
//
//   • <batch>.NN.gemini.md — a complete prompt. It asks *specific answerable
//     questions* and demands a fixed TSV reply, because "is this right?" gets
//     an essay and an essay cannot be ingested. The reply format is the whole
//     reason this loop survives three hundred rows.
//
// Chunked, so no single paste is unreasonable and a bad reply costs one chunk
// rather than the batch.
// =============================================================================

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { basename } from 'node:path'
import { readTsv } from './lang/tsv.mjs'
import { levelOf } from './lang/zh.mjs'
import { TRANSLATIONS, translationOf } from './lang/languages.mjs'

const [corpusPath, ...flags] = process.argv.slice(2)
if (!corpusPath) {
  console.error('usage: node tools/lang-export.mjs <corpus.tsv> [--kind words|phrases|names] [--chunk N] [--all]')
  process.exit(2)
}
const flag = (name, fallback) => {
  const i = flags.indexOf(`--${name}`)
  return i >= 0 ? flags[i + 1] : fallback
}
/**
 * A gloss file — `hsk1.es.tsv` — is checked for its gloss, not its Chinese:
 * the Chinese in it is already verified and is only there as the thing the
 * gloss has to mean. Recognised by name so the loop is the same five commands.
 */
const glossLang = translationOf(corpusPath)
const spec = glossLang ? TRANSLATIONS[glossLang] : null
/** Which way the blind translator works — see tools/lang/languages.mjs. */
const backwards = spec?.blind === 'to-english'
/** The language the blind translator translates into, and from. */
const target = spec && !backwards ? spec.name : 'English'
const from = backwards ? spec.name : 'Chinese'
/** What kind of lines a translation file holds, from the course it belongs to. */
const glossKind = /words/.test(corpusPath) ? 'words' : /names/.test(corpusPath) ? 'names'
  : /exchanges/.test(corpusPath) ? 'exchanges' : 'phrases'
const kind = glossLang ? 'gloss' : flag('kind', 'phrases')
const chunkSize = Number(flag('chunk', 60))
const all = flags.includes('--all')

const batch = basename(corpusPath).replace(/\.tsv$/, '')
/** Line separator for the stub files. Named because these are files a person
 *  opens and pastes into, so what they look like matters. */
const NL = String.fromCharCode(10)
const rows = readTsv(corpusPath)
// Drafts and conflicts by default: a verified row has been through this once
// and re-asking wastes your time, not mine.
const pending = all ? rows : rows.filter(r => r.status === 'draft' || r.status === 'conflict')
// A gloss row nobody has written yet has nothing to check; it goes out once it
// has a translation in it.
const todo = glossLang ? pending.filter(r => r.gloss) : pending
if (glossLang && todo.length < pending.length) {
  console.log(`${pending.length - todo.length} row(s) have no gloss written yet and are not sent`)
}

if (!todo.length) {
  console.log(`nothing to check in ${batch} — every row is already settled (use --all to re-check)`)
  process.exit(0)
}

mkdirSync('content/review', { recursive: true })

// The level the prompt names. HSK is cumulative, so a phrase at level N may use
// every word up to N, while a wordlist at level N is only what N adds.
const level = levelOf(corpusPath) ?? 'hsk1'
const rank = Number(level.slice(3))
const HSK = `HSK ${rank}`
const SCOPE = rank === 1 ? '**HSK 1 vocabulary**' : `**HSK 1–${rank} vocabulary** (the levels are cumulative)`
const WORDLIST = rank === 1
  ? `the **HSK 1 (2.0) vocabulary list** — the classic 150-word list`
  : `the **${HSK} (2.0) vocabulary list** — the words ${HSK} adds on top of the levels below it, not the cumulative list`

/**
 * The review prompt for a translation file. Built from the language's entry in
 * tools/lang/languages.mjs, so a new language brings its own style rules and
 * the questions follow from what it has — a vowelling question only for a
 * language whose reading is derived from its vowel marks.
 */
function glossPrompt() {
  const what = {
    words: 'This batch is single **words** from the HSK Chinese vocabulary list.',
    names: 'This batch is **names** for the creatures — small, ugly, endearing frog-like animals and round sea creatures.',
    exchanges: 'This batch is short **conversations** between two creatures; turns are separated by ｜ in the Chinese and " | " everywhere else.',
    phrases: 'This batch is **sentences** a creature says on its own.',
  }[glossKind]
  const n = spec.name
  const checks = [
    `Does the ${n} mean what the **Chinese** says? The English shows the intended sense but can be looser.`,
    `Is it natural ${n}, the way a native speaker would actually put it?`,
  ]
  if (spec.reading) {
    checks.push(`**Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.`)
    checks.push(`Does \`gloss_reading\` read the way the ${n} is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the ${n}, never the romanization.`)
  }
  if (glossKind === 'words') checks.push(`For a word: ${spec.words}.`)
  if (glossKind === 'names') checks.push(`For a name: it should ${spec.names}. Two creatures must not share a name. Say plainly if it carries any unintended or unfortunate meaning.`)
  if (glossKind === 'exchanges') checks.push(`Does each reply answer the turn before it? There must be exactly as many " | "-separated parts as the Chinese has ｜-separated turns.`)
  return `These are **${n} translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. ${what} The Chinese and English have already been verified and are not under review. What is under review is the \`gloss\` column, the ${n}${spec.reading ? ', and its romanization in `gloss_reading`' : ''}. It is shown two ways: to someone learning ${n}, as the line to learn, and to someone who reads ${n}, as the meaning of a line in another language — so it must be both correct and natural.

${spec.style}

For every row, check:
${checks.map((c, i) => `${i + 1}. ${c}`).join('\n')}

If it needs changing, give the whole corrected ${n} in \`fix_gloss\`${spec.reading ? ', fully vowelled' : ''}.`
}

const ASK = {
  words: `These are drafted entries for ${WORDLIST}.

For every row, check:
1. Is the Chinese actually on the official ${HSK} list?${rank > 1 ? ` (A word that belongs to a lower level is wrong here — say which level in \`note\` and \`drop\` it.)` : ''}
2. Does the English gloss match the word?
3. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically, so treat it as a claim to check, not as given. Pay attention to neutral-tone second syllables such as 谢谢 and to 一/不 tone sandhi.)
4. Is it Simplified, not Traditional?`,

  phrases: `These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use only ${SCOPE}.

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within ${HSK} vocabulary, counting every level below it?
5. Is it Simplified, not Traditional?`,

  exchanges: `These are drafted **short conversations** for a beginner Chinese learning app, held between two small cartoon creatures on the user's desktop. Each row is one whole exchange; turns are separated by ｜ in the Chinese and by " | " in the pinyin and English, and the speakers alternate (turn 1 is creature A, turn 2 is creature B, and so on). Only ${SCOPE} may be used.

For every row, check the exchange **as a whole**:
1. Does each turn mean its English, turn for turn?
2. Is each reply a natural answer to what was just said — would two native speakers actually have this exchange? A correct sentence that does not answer the previous turn makes the row wrong.
3. Is the pinyin correct, **including tone marks and neutral tones**? (Generated mechanically — treat it as a claim. Syllable-by-syllable spacing is the house style; do not fix spacing.)
4. Is it within ${HSK} vocabulary (counting every level below), and Simplified?

If you fix a row, give the **whole** corrected exchange in each fix column you use, keeping the ｜ and " | " separators and the same number of turns in every column.`,

  gloss: spec ? glossPrompt() : '',

  names: `These are drafted **names for cartoon creatures** in a learning app — small, ugly, endearing frog-like animals and round sea creatures. They are shown to a learner alongside an English gloss.

For every row, check:
1. Does the Chinese read as a plausible *name* for a small creature or pet — not as a literal noun awkwardly used as a name?
2. Is the English gloss accurate?
3. Is the pinyin correct, including tones?
4. **Connotation**: does it carry any unintended, crude, offensive, or unfortunate meaning? Does it sound like a real name, or like a foreigner guessing? Say so plainly — this is the most important question here.`,
}

const chunks = []
for (let i = 0; i < todo.length; i += chunkSize) chunks.push(todo.slice(i, i + chunkSize))

for (const [n, chunk] of chunks.entries()) {
  const tag = String(n + 1).padStart(2, '0')

  // ── For Google Translate ──────────────────────────────────────────────────
  // Bare lines, no ids: anything else is text it will try to translate, and a
  // mangled id is worse than no id. Ingest matches by line position and refuses
  // outright if the count came back different, which is the only way this can
  // silently go wrong.
  writeFileSync(`content/review/${batch}.${tag}.gt.txt`,
    chunk.map(r => (backwards ? r.gloss : r.script)).join('\n') + '\n', 'utf8')
  // Which row each of those lines is. Ingest joins by this rather than by
  // looking the text up again, because two rows can share a text — 你好 and
  // 您好 are both مَرْحَبًا — and a lookup would hand both answers to the first.
  writeFileSync(`content/review/${batch}.${tag}.ids.txt`, chunk.map(r => r.id).join('\n') + '\n', 'utf8')

  // ── Somewhere to put the answers ──────────────────────────────────
  //
  // Written as stubs rather than left to be created by hand, because the file
  // name is load-bearing — ingest finds replies by an exact path, so a typo
  // there reads as "no reply yet" rather than as a mistake, and you would be
  // left wondering why a chunk you just checked did not count.
  //
  // The instructions live inside the file they apply to, on `#` lines that
  // ingest strips, so they cannot drift away from the thing they describe. A
  // stub is never mistaken for an answer: a file with no content lines is
  // treated as not yet filled in.
  const gtOut = `content/review/${batch}.${tag}.gt.out.txt`
  const gmOut = `content/review/${batch}.${tag}.gemini.out.tsv`
  if (!existsSync(gtOut)) {
    writeFileSync(gtOut, [
      `# Google Translate's ${target} for ${batch}, chunk ${tag} — ${chunk.length} entries.`,
      '#',
      `# 1. Open ${batch}.${tag}.gt.txt and copy all of it.`,
      `# 2. Paste into Google Translate, ${from} → ${target}.`,
      `# 3. Copy the ${target} side and paste it below, replacing nothing above.`,
      '#',
      '# One line per entry, in the order sent, and nothing else. Lines starting',
      '# with # are ignored. The join is line position, so a different number of',
      '# lines is refused rather than guessed at — if that happens, paste again',
      '# rather than trying to patch it up by hand.',
      '',
    ].join(NL), 'utf8')
  }
  if (!existsSync(gmOut)) {
    writeFileSync(gmOut, [
      `# Gemini's reply for ${batch}, chunk ${tag} — ${chunk.length} entries.`,
      '#',
      `# Paste the whole of ${batch}.${tag}.gemini.md into Gemini, then paste its`,
      '# reply below. Prose around the TSV block is ignored, so pasting the whole',
      '# answer is fine — but the block must still begin with a line reading',
      `# exactly:  ${glossLang ? 'id<tab>verdict<tab>fix_gloss<tab>note' : 'id<tab>verdict<tab>fix_script<tab>fix_reading<tab>fix_english<tab>note'}`,
      '#',
      '# If it came back with spaces instead of tabs, paste it into a spreadsheet',
      '# and copy it back out — that turns the columns into real tabs.',
      '',
    ].join(NL), 'utf8')
  }

  // ── For Gemini ────────────────────────────────────────────────────────────
  const table = chunk.map(r => glossLang
    ? `${r.id}\t${r.script}\t${r.english}\t${r.gloss}${spec.reading ? `\t${r.gloss_reading}` : ''}`
    : `${r.id}\t${r.script}\t${r.reading}\t${r.english}`).join('\n')
  const replyHeader = glossLang
    ? 'id\tverdict\tfix_gloss\tnote'
    : 'id\tverdict\tfix_script\tfix_reading\tfix_english\tnote'
  const entryHeader = glossLang
    ? `id\tscript\tenglish\tgloss${spec.reading ? '\tgloss_reading' : ''}`
    : 'id\tscript\treading\tenglish'
  writeFileSync(`content/review/${batch}.${tag}.gemini.md`, `${ASK[kind] ?? ASK.phrases}

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

\`\`\`
${replyHeader}
\`\`\`

- \`verdict\` is exactly one of \`ok\`, \`fix\`, or \`drop\`.
- For \`ok\`, leave the \`fix_\` column(s) empty.
- For \`fix\`, fill in **only** the columns that need to change; leave the rest empty.
- For \`drop\`, explain why in \`note\` — use this when the entry is not salvageable.
- \`note\` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

\`\`\`
${entryHeader}
${table}
\`\`\`
${kind === 'words' ? `
## One extra question

After the TSV block, list any ${HSK} words that are **missing** from this batch, and any listed here that are **not** ${HSK}. Put that after the TSV, under a heading \`## Missing\`.
` : ''}`, 'utf8')
}

console.log(`${todo.length} rows to check, in ${chunks.length} chunk(s), as ${kind}`)
console.log(`\nwritten to content/review/:`)
for (const [n] of chunks.entries()) {
  const tag = String(n + 1).padStart(2, '0')
  console.log(`  ${batch}.${tag}.gt.txt      → paste into Google Translate (${from} → ${target})`)
  console.log(`  ${batch}.${tag}.gemini.md   → paste the whole file into Gemini`)
}
console.log(`\nempty answer files are waiting beside them — paste into these:`)
console.log(`  ${batch}.NN.gt.out.txt        (Google Translate's ${target}, one line per entry)`)
console.log(`  ${batch}.NN.gemini.out.tsv    (Gemini's reply, TSV block included)`)
console.log(`\nthen: node tools/lang-ingest.mjs ${corpusPath}`)
