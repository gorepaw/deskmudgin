// =============================================================================
// The Chinese adapter. Everything in this project that is actually about
// Chinese rather than about language lives here, so that adding Spanish is a
// sibling file and not a refactor.
//
// Its central job is the one rule the whole pipeline is built on: **nobody
// types a tone mark by hand.** `reading` is derived from `script`, never
// authored, so the entire class of tone errors is out of the loop before the
// human verification step begins — and what you are asked to check shrinks to
// whether the Chinese means the English.
//
// Derivation is very good and not perfect. pinyin-pro gets the hard heteronyms
// right (长大 zhǎng, 银行 háng, 了不起 liǎo) and the ordinary neutral tones
// (妈妈 mā ma, 我们 wǒ men), but it renders 谢谢 as `xiè xiè` where the second
// syllable is neutral, and 东西 meaning "thing" as `dōng xī`. So there is an
// override layer — and, importantly, an override is *content*: it goes through
// the same verification as everything else rather than being a hand-edit.
// =============================================================================

import { pinyin, customPinyin } from 'pinyin-pro'
import { readTsv } from './tsv.mjs'

export const OVERRIDES_PATH = 'content/zh/overrides.tsv'
export const WORDS_PATH = 'content/zh/hsk1.words.tsv'

/** Punctuation a phrase may contain besides Han characters. Full-width, because
 *  half-width commas in Chinese text are a tell that it was written by someone
 *  who does not read it. */
const PUNCT = new Set([...'，。！？、：；“”‘’…—（）｜'])

/**
 * Separates the turns of an exchange: 你好吗？｜我很好。 An exchange is one
 * row so it is verified as a unit — a correct line in a nonsense conversation
 * is still wrong — and full-width so it can never be mistaken for text.
 */
export const TURN = '｜'
export const isPunct = ch => PUNCT.has(ch)

let loaded = false

/**
 * Teach the deriver every override we have verified.
 *
 * Only `verified` rows are applied. A draft override is somebody's opinion, and
 * the point of this pipeline is that opinions do not reach the output.
 */
export function loadOverrides() {
  if (loaded) return
  const rows = readTsv(OVERRIDES_PATH).filter(r => r.status === 'verified')
  if (rows.length) {
    customPinyin(Object.fromEntries(rows.map(r => [r.script, r.reading])))
  }
  loaded = true
  return rows.length
}

/** Hanzi → tone-marked pinyin. The only place a reading is ever produced. */
export function derive(script) {
  loadOverrides()
  return tidy(script, pinyin(script))
}

/** Chinese punctuation as it is written in pinyin: Western marks, attached. */
const PINYIN_PUNCT = { '，': ',', '。': '.', '！': '!', '？': '?', '、': ',', '：': ':', '；': ';', '｜': ' | ' }

/**
 * Make the reading look like pinyin a textbook would print.
 *
 * The deriver emits full-width punctuation as a free-standing token and leaves
 * a doubled space wherever an override replaced a word (你在哪儿？ came out as
 * `nǐ zài nǎr  ？`). Pinyin is written with Western punctuation attached to the
 * syllable before it, and a sentence starts with a capital — `Nǐ zài nǎr?`.
 *
 * Still mechanical: this touches spacing, punctuation and case only, never a
 * syllable or a tone, so it cannot reintroduce anything the rule forbids. A
 * bare word (no sentence punctuation) is left lower-case, since a vocabulary
 * entry is not a sentence.
 */
function tidy(script, raw) {
  let s = raw
  for (const [zh, en] of Object.entries(PINYIN_PUNCT)) s = s.split(zh).join(en)
  s = s.replace(/\s+([,.!?:;])/g, '$1').replace(/\s{2,}/g, ' ').trim()
  const sentence = /[。！？]$/.test(script)
  if (sentence) {
    // A turn separator after the punctuation still starts a new sentence.
    s = s.replace(/(^|[.!?]\s+(?:\|\s+)?)(\S)/g, (_, pre, ch) => pre + ch.toUpperCase())
  }
  return s
}

/** The characters this course is allowed to use, from the verified wordlist. */
export function allowedChars() {
  const words = readTsv(WORDS_PATH).filter(r => r.status === 'verified')
  const set = new Set()
  for (const w of words) for (const ch of w.script) set.add(ch)
  return set
}

/**
 * What makes a row unusable, as a list of complaints.
 *
 * Returns [] for a good row. Every check here is one the human step should not
 * have to perform: whether it parses, whether it is in scope, whether the
 * reading matches the script. Judgement — does it *mean* the English, would a
 * person say it — is deliberately not attempted, because that is the part
 * being sent out to be checked by something that actually knows.
 */
export function validate(row, chars) {
  const bad = []
  if (!row.script) bad.push('no script')
  if (!row.english) bad.push('no english')

  // `chars` is null when the corpus *is* the wordlist: a course's own
  // vocabulary cannot be checked against itself.
  for (const ch of chars ? row.script ?? '' : '') {
    if (PUNCT.has(ch)) continue
    if (!chars.has(ch)) {
      // The usual causes, in the order they actually happen.
      bad.push(`「${ch}」is not in the wordlist — out of scope for this course, a traditional form, or a typo`)
    }
  }
  // An exchange is split turn by turn at runtime, and each turn's gloss is
  // found by position. A count mismatch would pair every later line with the
  // wrong English, silently.
  const zhTurns = (row.script ?? '').split(TURN).length
  const enTurns = (row.english ?? '').split(' | ').length
  if (zhTurns !== enTurns) {
    bad.push(`${zhTurns} turn(s) in the Chinese but ${enTurns} in the English — separate English turns with " | "`)
  }
  if (/[,.!?;:]/.test(row.script ?? '')) {
    bad.push('half-width punctuation in Chinese text — use ，。！？')
  }

  // The load-bearing one. A hand-edited reading that drifted from its script is
  // exactly the silent corruption this pipeline exists to make impossible.
  if (row.script && row.reading) {
    const want = derive(row.script)
    if (want !== row.reading) {
      bad.push(`reading is "${row.reading}" but derives as "${want}" — if the derivation is wrong, add an override rather than editing this`)
    }
  }
  return bad
}

export const ZH = {
  id: 'zh',
  label: 'Chinese',
  /** Chinese needs a pronunciation line; Spanish will not. */
  hasReading: true,
  derive,
  validate,
  allowedChars,
}
