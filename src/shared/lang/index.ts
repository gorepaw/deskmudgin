// =============================================================================
// The language registry, and the rules every reader of a course follows.
//
// One place knows what languages exist and how to draw them. Everything that
// shows a line — the bubble, the dictionary, the ledger, a pet's card — asks
// here for the lesson (the line in the language being learned) and the meaning
// (in the language the learner already reads), so that none of them can
// disagree about fallbacks or about which language goes where.
// =============================================================================

import type { Entry, Language, LanguageId, Rendition } from './types'

export * from './types'

/** Arabic's vowel marks, shadda, sukun and dagger alif. */
const HARAKAT = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g

export const LANGUAGES: Record<LanguageId, Language> = {
  en: {
    id: 'en', label: 'English', name: 'English', hasReading: false,
    scale: 1, dir: 'ltr', pace: 0.07, probe: 'A',
  },
  es: {
    id: 'es', label: 'Español', name: 'Spanish', hasReading: false,
    scale: 1, dir: 'ltr', pace: 0.07, probe: 'ñ',
  },
  zh: {
    id: 'zh', label: '中文', name: 'Chinese', hasReading: true,
    // Both ship with Windows; the app is Windows-only by construction, so
    // nothing is bundled. sans-serif last so a stripped install degrades to
    // something rather than to nothing.
    font: '"Microsoft YaHei", "Microsoft YaHei UI", SimSun, sans-serif',
    scale: 1, dir: 'ltr', pace: 0.25, probe: '好',
  },
  ar: {
    id: 'ar', label: 'العربية', name: 'Arabic', hasReading: true,
    // Segoe UI's Arabic stacks vowel marks cleanly at small sizes, and Tahoma
    // and Arial ship with every Windows. The Naskh faces that draw marks best
    // are an optional Windows feature, so they cannot be counted on.
    font: '"Segoe UI", Tahoma, Arial, sans-serif',
    scale: 1.15, dir: 'rtl', pace: 0.08, probe: 'ع',
    plain: s => s.replace(HARAKAT, ''),
  },
}

/** In the order Settings offers them. */
export const LANGUAGE_IDS = Object.keys(LANGUAGES) as LanguageId[]

export const languageOf = (id: LanguageId): Language => LANGUAGES[id] ?? LANGUAGES.en

/**
 * A line as it is said, rather than as it is glossed.
 *
 * The English column was written as a meaning to read beside Chinese, so a
 * few lines carry notes that only make sense there — "Hello! (polite)",
 * "Hey! / Hello!". Shown as the thing being learned, a note is not part of
 * what was said, so it goes: parentheses and all, and every alternative after
 * the first.
 */
export function spoken(text: string): string {
  return text.split(' / ')[0].replace(/\s*\([^)]*\)/g, '').trim() || text
}

/** The line in the language being learned, or null if it has none verified. */
export function lessonOf(e: Entry, l2: LanguageId): Rendition | null {
  const r = e.in[l2]
  return r ? { ...r, text: spoken(r.text) } : null
}

/** One meaning line, and which language it is in so it is drawn in a face
 *  that can draw it. */
export interface Meaning { readonly lang: LanguageId; readonly text: string }

/**
 * The meaning lines to show for an entry, in order: one per language asked
 * for. The one rule every reader follows, so the bubble, the dictionary and a
 * pet's card never disagree:
 *
 * - a language the line has no verified translation in falls back — to
 *   English, or to the course's own language when English is the lesson — so
 *   a half-finished translation never leaves a blank line;
 * - never the lesson's own language, which would only repeat it;
 * - never the same line twice, which a fallback could otherwise produce.
 */
export function meaningsOf(e: Entry, l1: readonly LanguageId[], l2: LanguageId): Meaning[] {
  const out: Meaning[] = []
  for (const want of l1) {
    if (want === l2) continue
    const lang = e.in[want] ? want : l2 !== 'en' && e.in.en ? 'en' : (Object.keys(e.in) as LanguageId[]).find(k => k !== l2)
    if (!lang || out.some(m => m.lang === lang)) continue
    const text = e.in[lang]!.text
    out.push({ lang, text: LANGUAGES[lang].plain?.(text) ?? text })
  }
  return out
}

/** Letters only, for timing: Arabic's vowel marks are not extra reading. */
const letters = (s: string): number => [...s.replace(HARAKAT, '')].length

/**
 * How long a line stays up, in seconds: long enough to read the lesson, its
 * reading and its meaning. The speech bubble uses it as a floor, and a
 * conversation uses it to know when the other creature has had its say.
 */
export function dwellSeconds(e: Entry, l2: LanguageId): number {
  const text = e.in[l2]?.text ?? e.in.en?.text ?? ''
  return 3 + letters(text) * languageOf(l2).pace
}
