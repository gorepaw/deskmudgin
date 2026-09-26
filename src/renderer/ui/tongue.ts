// =============================================================================
// Drawing text in a language: which face, how big, which way.
//
// Every panel that shows a line — the bubble, the dictionary, the ledger, a
// pet's name — draws text in whatever languages the learner has chosen, so any
// of them may be asked for Arabic at any moment. This is the one place that
// knows what that takes, so none of them has to.
// =============================================================================

import { languageOf, type LanguageId } from '../../shared/lang'
import { nameIn, nameMeaning } from '../../shared/names'
import type { Called } from '../../shared/types'
import { lessonLang, meaningLangs, speaking } from '../pet/lines'

export interface LangText { size: number; font?: string; dir: CanvasDirection }

/**
 * Text options for `lang` at a nominal size. Arabic is drawn larger, because
 * its vowel marks are the lesson and they vanish first; a non-Latin script is
 * never drawn below `floor`, the smallest size at which 汉字 stay legible.
 */
export function inLang(lang: LanguageId, size: number, floor = 11): LangText {
  const l = languageOf(lang)
  const scaled = size * l.scale
  return { size: l.font ? Math.max(scaled, floor) : scaled, font: l.font, dir: l.dir }
}

/**
 * A pet's name as it is shown right now: its course name in the language being
 * learned, with that name's reading, or — grunting, or before its name is
 * translated — the English name that is its identity underneath.
 */
export function petName(p: { name: string; called?: Called }): { text: string; lang: LanguageId; reading?: string } {
  const r = speaking() && p.called ? nameIn(p.called, lessonLang()) : null
  return r ? { text: r.text, lang: lessonLang(), reading: r.reading } : { text: p.name, lang: 'en' }
}

/** What a pet's shown name means, in the learner's own language(s) — empty
 *  when the name shown is the English one, which means only itself. */
export function petNameMeaning(p: { called?: Called }): string {
  if (!speaking() || !p.called || !nameIn(p.called, lessonLang())) return ''
  return nameMeaning(p.called, meaningLangs(), lessonLang())
}
