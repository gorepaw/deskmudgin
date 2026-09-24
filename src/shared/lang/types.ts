// =============================================================================
// What a language course is, independent of which language it is.
//
// The app teaches Chinese first, but nothing here knows that. A course is
// (language, level, entries), and the only thing Chinese-specific in the whole
// runtime is which font can draw it and whether it needs a pronunciation line
// at all — Spanish will not. Adding a language is a descriptor plus a corpus.
//
// Entries are deliberately not welded to speech bubbles. A bubble is one reader
// of a course; a name is another; a future quiz would be a third. Anything that
// wants to know "what could this creature say about being hungry" asks the
// course, not the speech system.
// =============================================================================

export type LanguageId = 'en' | 'zh'

/** One thing that can be said, in one language. */
export interface Entry {
  /** Stable across builds. It is the join key for the whole verification
   *  pipeline, and the ledger files vocabulary under it. */
  readonly id: string
  /** The written form — 汉字, or Spanish text. */
  readonly script: string
  /** Pronunciation aid. Tone-marked pinyin for Chinese; empty where the
   *  language does not need one. **Always derived, never authored.** */
  readonly reading: string
  readonly english: string
  /** Which moments this suits: `idle`, `hungry`, `greet`, `random`… A creature
   *  asks for a tag, not for a specific line. */
  readonly tags: readonly string[]
}

export interface Course {
  /** `zh-hsk1`. */
  readonly id: string
  readonly language: LanguageId
  /** `hsk1`, `hsk2`, `a1` — the course's own name for its level. */
  readonly level: string
  readonly entries: readonly Entry[]
}

/** Everything the renderer needs to know about a language to draw it. */
export interface Language {
  readonly id: LanguageId
  readonly label: string
  /** Whether the middle line exists at all. Chinese yes; Spanish no. */
  readonly hasReading: boolean
  /**
   * Font stack for the script line.
   *
   * The UI font is a theme's business, but the script line is not: a theme
   * whose font cannot draw 汉字 would render tofu boxes, and a themed app must
   * not be able to break the thing it is teaching. So the script line carries
   * its own stack and ignores the theme.
   */
  readonly font: string
  /** A glyph the font stack must be able to draw, for the boot-time check —
   *  a missing CJK font fails silently as □, so it is probed rather than hoped. */
  readonly probe: string
}

/**
 * Anything a creature can say: a plain grunt, or a line from a course.
 *
 * The union is what lets the English grunts and the Chinese lessons share one
 * speech system — `say()` hands back whichever the current language calls for,
 * and only the bubble has to care which it got.
 */
export type Utterance = string | Entry

export const isEntry = (u: Utterance): u is Entry => typeof u !== 'string'

/**
 * How long a line stays up, in seconds: long enough to read three lines. The
 * speech bubble uses it as a floor, and a conversation uses it to know when
 * the other creature has had its say.
 */
export const dwellSeconds = (e: Entry): number => 3 + [...e.script].length * 0.25

/**
 * Split an exchange into its turns, each an ordinary Entry.
 *
 * An exchange is stored and verified as one row — turns joined by ｜ in the
 * Chinese and " | " in the pinyin and English — and taken apart only here, so
 * a turn is exactly what a bubble already knows how to draw and the ledger
 * already knows how to file (`x012.1`). The build refuses a row whose turn
 * counts disagree, so the three splits line up by construction.
 */
export function turnsOf(e: Entry): Entry[] {
  const zh = e.script.split('｜')
  const py = e.reading ? e.reading.split(' | ') : []
  const en = e.english.split(' | ')
  return zh.map((script, i) => ({
    id: `${e.id}.${i}`, script, reading: py[i] ?? '', english: en[i] ?? '', tags: e.tags,
  }))
}
