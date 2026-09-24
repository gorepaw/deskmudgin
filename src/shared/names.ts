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
import { COURSE as ZH_NAMES } from './lang/generated/zh-names'
import type { ZhName } from './types'

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

// ── Chinese names ────────────────────────────────────────────────────────────


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
 * A Chinese name not already in use, or a numbered one once the list runs dry.
 *
 * Draws only from verified names for the creature's own species, so a Mudgin
 * is never called 珍珠. Returns null when no names are verified yet — the
 * caller keeps showing the English name rather than inventing one.
 */
export function pickZhName(
  species: SpeciesId, taken: Iterable<string>, pick: (n: number) => number,
): ZhName | null {
  const pool = ZH_NAMES.entries.filter(e => e.tags.includes(species))
  if (!pool.length) return null
  const used = new Set(taken)
  const free = pool.filter(e => !used.has(e.script))
  const base = free.length ? free[pick(free.length)] : pool[pick(pool.length)]
  const name = (s: string, r: string, g: string): ZhName => ({ script: s, reading: r, gloss: g })
  if (!used.has(base.script)) return name(base.script, base.reading, base.english)
  for (let i = 2; i < 20; i++) {
    const [s, r] = numeral(i)
    const script = `${base.script}${s}号`
    if (!used.has(script)) return name(script, `${base.reading} ${r} hào`, `${base.english} No. ${i}`)
  }
  return name(base.script, base.reading, base.english)
}

/**
 * The name to put in front of the player: the Chinese one while they speak
 * Chinese and have one, the English one otherwise. The English name remains
 * the identity underneath either way.
 */
export function shownName(p: { name: string; zh?: ZhName }, language: string): string {
  return language === 'zh' && p.zh ? p.zh.script : p.name
}
