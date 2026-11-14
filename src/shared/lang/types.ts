// =============================================================================
// What a course is, independent of which language anyone is learning.
//
// A course is a set of lines, and a line exists in several languages at once:
// the language it was written in (Chinese, for the HSK courses), English, and
// whatever else has been verified for it — Spanish, Arabic. Which of those is
// the one being learned (L2) and which is the one it is explained in (L1) is
// the learner's choice, made at draw time, and the course does not know or
// care. Learning Arabic from Spanish and learning Chinese from English read
// the same entries.
//
// Entries are deliberately not welded to speech bubbles. A bubble is one reader
// of a course; a name is another; a future quiz would be a third. Anything that
// wants to know "what could this creature say about being hungry" asks the
// course, not the speech system.
// =============================================================================

/**
 * Every language the app can show. Adding one is a descriptor in
 * `languages.ts`, a tools descriptor in `tools/lang/languages.mjs`, and its
 * translation files beside each course — nothing that draws text changes.
 */
export type LanguageId = 'en' | 'es' | 'zh' | 'ar'

/** A line in one language. */
export interface Rendition {
  /** What is written: 汉字, Spanish, fully vowel-marked Arabic. */
  readonly text: string
  /**
   * How to say it, where the script does not tell you: tone-marked pinyin,
   * an Arabic romanization. Absent for languages that need none. **Always
   * derived from `text` by a tool, never authored** — see content/README.md.
   */
  readonly reading?: string
}

/** One thing that can be said, in every language it has been verified in. */
export interface Entry {
  /** Stable across builds. It is the join key for the whole verification
   *  pipeline, and the ledger files what you have heard under it. */
  readonly id: string
  /** Which moments this suits: `idle`, `hungry`, `greet`, `random`… A creature
   *  asks for a tag, not for a specific line. */
  readonly tags: readonly string[]
  /**
   * The line in each language. The course's own language and English are
   * always here — a line is not verified without them. Any other language
   * appears only once its translation has passed its own two checks; a line
   * verified in Chinese says nothing about a translation of it.
   */
  readonly in: Readonly<Partial<Record<LanguageId, Rendition>>>
}

export interface Course {
  /** `zh-hsk1`. */
  readonly id: string
  /** The language the lines were written in and graded by — Chinese for HSK. */
  readonly source: LanguageId
  /** `hsk1`, `hsk2`, `names` — the course's own name for its level. */
  readonly level: string
  readonly entries: readonly Entry[]
}

/** Everything the renderer needs to know about a language to draw it. */
export interface Language {
  readonly id: LanguageId
  /** In its own words, as a button offers it: `Español`, `中文`, `العربية`. */
  readonly label: string
  /** In English, for tools and logs. */
  readonly name: string
  /** Whether it has a reading line at all. Chinese and Arabic yes. */
  readonly hasReading: boolean
  /**
   * Font stack for text in this language; absent for the theme's own font.
   *
   * The UI font is a theme's business, but a script it cannot draw is not: a
   * theme whose font has no 汉字 would render tofu boxes, and a themed app must
   * not be able to break the thing it is teaching. So a script outside Latin
   * carries its own stack and ignores the theme.
   */
  readonly font?: string
  /** Size relative to Latin text at the same nominal size — vowel-marked
   *  Arabic needs more height than a Latin line for its marks to be legible. */
  readonly scale: number
  readonly dir: 'ltr' | 'rtl'
  /** Seconds per character to read it: a 汉字 carries a word, a letter does not. */
  readonly pace: number
  /** A glyph the font stack must be able to draw, for the boot-time check —
   *  a missing font fails silently as □, so it is probed rather than hoped. */
  readonly probe: string
  /**
   * How a native reader sees it, for when it is the meaning rather than the
   * lesson: Arabic without its vowel marks, the way it is printed for adults.
   * Absent where the lesson text is already the everyday form.
   */
  readonly plain?: (text: string) => string
}

/**
 * Anything a creature can say: a plain grunt, or a line from a course.
 *
 * The union is what lets the English grunts and the lessons share one speech
 * system — `say()` hands back whichever the setting calls for, and only the
 * bubble has to care which it got.
 */
export type Utterance = string | Entry

export const isEntry = (u: Utterance): u is Entry => typeof u !== 'string'

/** The turn separator in any language's text: ｜ in Chinese, " | " elsewhere. */
const TURN = /\s*[｜|]\s*/

/**
 * Split an exchange into its turns, each an ordinary Entry.
 *
 * An exchange is stored and verified as one row — turns joined by ｜ in the
 * Chinese and " | " everywhere else — and taken apart only here, so a turn is
 * exactly what a bubble already knows how to draw and the ledger already knows
 * how to file (`x012.1`). The build refuses any translation whose turn count
 * differs from the line's, so the splits line up by construction.
 */
export function turnsOf(e: Entry): Entry[] {
  const split = Object.entries(e.in).map(([lang, r]) => [lang, {
    text: r.text.split(TURN),
    reading: r.reading?.split(' | '),
  }] as const)
  const n = split.find(([lang]) => lang === 'en')?.[1].text.length ?? 1
  return Array.from({ length: n }, (_, i) => ({
    id: `${e.id}.${i}`,
    tags: e.tags,
    in: Object.fromEntries(split.map(([lang, s]) => [lang, {
      text: s.text[i] ?? '',
      ...(s.reading?.[i] ? { reading: s.reading[i] } : {}),
    }])),
  }))
}
