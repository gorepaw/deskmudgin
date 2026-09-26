// =============================================================================
// What to call them. Lives in shared because main hands out names now — it owns
// the roster, so it is the thing that knows what is already taken.
//
// Two registers, because they are two animals. Mudgin names are short, blunt
// and slightly damp — a species the Republic regards as its least is not called
// Aurelius. Sephin names are rounder and colder, for something that lives in a
// quicksilver sea.
// =============================================================================

import type { SpeciesId } from './genome'
import { COURSE as NAMES } from './lang/generated/zh-names'
import type { Called } from './types'
import { meaningsOf, type Entry, type LanguageId, type Rendition } from './lang'

const MUDGIN_NAMES: readonly string[] = [
  'Mudgin', 'Grub', 'Nub', 'Blort', 'Sog', 'Pib', 'Hodge', 'Munt',
  'Klot', 'Skiv', 'Dreg', 'Wad', 'Gorm', 'Plok', 'Snub', 'Bugg',
  'Tosh', 'Glum', 'Wick', 'Purl', 'Squit', 'Fen', 'Blib', 'Murk',
]

const SEPHIN_NAMES: readonly string[] = [
  'Sephin', 'Tolo', 'Beck', 'Orrin', 'Pell', 'Vane', 'Coble', 'Rill',
  'Sable', 'Wren', 'Ossi', 'Lune', 'Prow', 'Kip', 'Marl', 'Fathom',
  'Quill', 'Brine', 'Vesk', 'Halo', 'Nim', 'Tarn', 'Skerry', 'Floe',
]

const LISTS: Record<SpeciesId, readonly string[]> = {
  mudgin: MUDGIN_NAMES,
  sephin: SEPHIN_NAMES,
}

/**
 * A name not already in use, or a numbered one once the list runs dry.
 *
 * The collection is unbounded and duplicates are expected, so running out is a
 * matter of when rather than if — "Grub II" is a better answer than two Grubs,
 * and a better answer than refusing to name the twenty-fifth.
 */
export function pickName(
  species: SpeciesId, taken: Iterable<string>, pick: (n: number) => number,
): string {
  const used = new Set(taken)
  const list = LISTS[species] ?? MUDGIN_NAMES
  const free = list.filter(n => !used.has(n))
  if (free.length) return free[pick(free.length)]

  const base = list[pick(list.length)]
  for (let i = 2; ; i++) {
    const candidate = `${base} ${roman(i)}`
    if (!used.has(candidate)) return candidate
  }
}

const NUMERALS: readonly [number, string][] = [
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function roman(n: number): string {
  let out = ''
  let left = n
  for (const [value, sym] of NUMERALS) {
    while (left >= value) { out += sym; left -= value }
  }
  return out
}

// ── Course names ─────────────────────────────────────────────────────────────


/**
 * Chinese numerals 2–19, with readings, for telling duplicates apart:
 * 豆豆二号, "Beanie No. 2". Composed rather than looked up in the course
 * because a name plus a number is not something anyone verifies one at a time
 * — but every part is verified: 二…十 and 号 are all HSK 1 words from the
 * wordlist, with the readings it gives them.
 */
const DIGITS: readonly [string, string][] = [
  ['', ''], ['一', 'yī'], ['二', 'èr'], ['三', 'sān'], ['四', 'sì'], ['五', 'wǔ'],
  ['六', 'liù'], ['七', 'qī'], ['八', 'bā'], ['九', 'jiǔ'],
]
function numeral(n: number): [string, string] {
  if (n < 10) return DIGITS[n]
  const [s, r] = DIGITS[n - 10]
  return [`十${s}`, r ? `shí ${r}` : 'shí']
}

/**
 * How each language tells the second of a name from the first. Chinese says
 * 二号 with its numeral; Spanish and English write the number as a nickname
 * would be numbered; Arabic writes the digit in its own numerals and says it in
 * the romanization. A language with no rule here numbers the English way.
 */
const NUMBERED: Partial<Record<LanguageId, (r: Rendition, n: number) => Rendition>> = {
  zh: (r, n) => {
    const [s, py] = numeral(n)
    return { text: `${r.text}${s}号`, reading: `${r.reading} ${py} hào` }
  },
  en: (r, n) => ({ text: `${r.text} No. ${n}` }),
  es: (r, n) => ({ text: `${r.text} n.º ${n}` }),
  ar: (r, n) => ({
    text: `${r.text} ${String(n).replace(/\d/g, d => String.fromCharCode(0x660 + Number(d)))}`,
    reading: `${r.reading} ${n}`,
  }),
}

/** How many of one name there can be before a newcomer shares a number. */
const MAX_NUMBERED = 19

export const calledKey = (c: Called): string => `${c.id}#${c.n}`
const nameEntry = (id: string): Entry | undefined => NAMES.entries.find(e => e.id === id)

/**
 * A course name not already in use, or a numbered one once the list runs dry.
 *
 * Draws only from verified names for the creature's own species, so a Mudgin
 * is never called 珍珠. Returns null when no names are verified yet — the
 * caller keeps showing the English name rather than inventing one.
 */
export function pickCalled(
  species: SpeciesId, taken: Iterable<string>, pick: (n: number) => number,
): Called | null {
  const pool = NAMES.entries.filter(e => e.tags.includes(species))
  if (!pool.length) return null
  const used = new Set(taken)
  const free = pool.filter(e => !used.has(calledKey({ id: e.id, n: 1 })))
  const base = free.length ? free[pick(free.length)] : pool[pick(pool.length)]
  for (let n = 1; n <= MAX_NUMBERED; n++) {
    if (!used.has(calledKey({ id: base.id, n }))) return { id: base.id, n }
  }
  return { id: base.id, n: 1 }
}

/**
 * Which name a pet stored before names were per-language — its Chinese text,
 * 豆豆二号 — so a collection named then keeps every name it had. Null when the
 * name is no longer in the course.
 */
export function calledFromChinese(zh: { script: string; gloss: string }): Called | null {
  const numbered = zh.gloss.match(/^(.*) No\. (\d+)$/)
  const english = numbered ? numbered[1] : zh.gloss
  const base = NAMES.entries.find(e => e.in.en?.text === english && !!e.in.zh && zh.script.startsWith(e.in.zh.text))
  return base ? { id: base.id, n: numbered ? Number(numbered[2]) : 1 } : null
}

/** The name in one language, numbered if it needs to be, or null when the
 *  name has no verified translation in that language yet. */
export function nameIn(c: Called, lang: LanguageId): Rendition | null {
  const r = nameEntry(c.id)?.in[lang]
  if (!r) return null
  return c.n > 1 ? (NUMBERED[lang] ?? NUMBERED.en!)(r, c.n) : r
}

/**
 * What a name means, in the learner's own language(s): "Frijolito n.º 2".
 * Falls back as every meaning does — see `meaningsOf` — and is numbered the
 * way that language numbers.
 */
export function nameMeaning(c: Called, l1: readonly LanguageId[], l2: LanguageId): string {
  const e = nameEntry(c.id)
  if (!e) return ''
  return meaningsOf(e, l1, l2)
    .map(m => (c.n > 1 ? (NUMBERED[m.lang] ?? NUMBERED.en!)({ text: m.text, reading: '' }, c.n).text : m.text))
    .join(' · ')
}

/**
 * The name to put in front of the player: the course name in the language
 * being learned, while they speak one and it has one, and the English name
 * otherwise. The English name remains the identity underneath either way.
 */
export function shownName(p: { name: string; called?: Called }, voice: string, l2: LanguageId): string {
  if (voice !== 'course' || !p.called) return p.name
  return nameIn(p.called, l2)?.text ?? p.name
}
