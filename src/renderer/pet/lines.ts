// =============================================================================
// What he says.
//
// Two voices. In English he is what he always was: "few thoughts" is canon
// (Data/races.json), so the grunts are a creature with two ideas rather than a
// mascot with a joke book. In Chinese he says real sentences from the verified
// HSK 1 course — simple, a little childlike, and the same few ideas: hungry,
// sleepy, pleased to see you. Nothing in this file writes Chinese. It only
// chooses from what the course already contains, and the course only contains
// what passed verification (tools/lang-build.mjs).
// =============================================================================

import type { Rng } from '../engine/math'
import type { Entry, LanguageId, Utterance } from '../../shared/lang/types'
import { COURSE as ZH_HSK1 } from '../../shared/lang/generated/zh-hsk1'
import { COURSE as ZH_EXCHANGES } from '../../shared/lang/generated/zh-hsk1-exchanges'

export const LINES = {
  idle: ['...', 'hrm.', 'mrp', '*blink*', 'hup', 'is fine'],
  happy: ['hrrr!', 'good', 'yes', 'mudgin happy'],
  hungry: ['hungy', 'belly empty', 'need chew', 'mrrrf'],
  tired: ['sleepy', 'eye heavy', 'lie down now', 'nnn'],
  lonely: ['?', 'hello', 'nobody here', 'is quiet'],
  chew: ['nom', 'crunch', 'chewy', 'tastes grey', 'more'],
  pet: ['hrrr', 'good hand', 'again', 'nice'],
  fed: ['MMM', 'full now', 'good', 'thank'],
  dropped: ['oof', 'ow', 'why', 'rude'],
  grabbed: ['?!', 'hey', 'put down', 'aaa'],
  wake: ['huh', 'was sleep', 'wha'],
  summon: ['hup', 'coming', 'hm?'],
} as const

export type LineKind = keyof typeof LINES

/**
 * Which course tags answer each moment.
 *
 * Idle reaches for `random` — the "they don't always have to act like pets"
 * half of the brief — so most of what you hear while nothing is happening is
 * the whole breadth of HSK 1 rather than the same five complaints. The rest are
 * the moment itself first, with a neighbouring mood where it fits.
 */
const TAGS: Record<LineKind, readonly string[]> = {
  idle: ['random', 'random', 'random', 'happy', 'greet'],
  happy: ['happy', 'pet'],
  hungry: ['hungry'],
  tired: ['tired'],
  lonely: ['lonely', 'greet'],
  chew: ['chew'],
  pet: ['pet', 'happy'],
  fed: ['fed'],
  dropped: ['dropped'],
  grabbed: ['grabbed'],
  wake: ['wake', 'greet'],
  summon: ['greet'],
}

let language: LanguageId = 'zh'

/** Set from settings at boot and on every change. Global, like the theme and
 *  the default font: every creature speaks the same language. */
export const setLanguage = (id: LanguageId): void => { language = id }
export const currentLanguage = (): LanguageId => language

/** Course lines by tag, built once. A tag the course has nothing for (none
 *  verified yet) is simply absent, and `say` falls back to English for it. */
const byTag = new Map<string, Entry[]>()
for (const e of ZH_HSK1.entries) {
  for (const t of e.tags) {
    const list = byTag.get(t)
    if (list) list.push(e)
    else byTag.set(t, [e])
  }
}

export function say(rng: Rng, kind: LineKind): Utterance {
  if (language === 'zh') {
    const tag = rng.pick(TAGS[kind])
    const pool = byTag.get(tag)
    if (pool?.length) return rng.pick(pool)
  }
  return rng.pick(LINES[kind])
}

/** A specific course line by its Chinese, or null if it is not (yet) verified.
 *  For callers with a fixed repertoire, like the Matron. */
export function line(script: string): Entry | null {
  return ZH_HSK1.entries.find(e => e.script === script) ?? null
}

/**
 * A verified conversation to start, or null when there is none to have — the
 * English setting, or a course with no exchanges verified yet.
 *
 * `mood` prefers exchanges tagged for it (a hungry creature opens with food)
 * without insisting: most of the time the talk is about anything at all.
 */
/** Whether there is anything to talk about: Chinese on, and at least one
 *  exchange verified. */
export const canConverse = (): boolean => language === 'zh' && ZH_EXCHANGES.entries.length > 0

export function pickExchange(rng: Rng, mood?: string): Entry | null {
  if (language !== 'zh' || !ZH_EXCHANGES.entries.length) return null
  const fitting = mood ? ZH_EXCHANGES.entries.filter(e => e.tags.includes(mood)) : []
  return rng.pick(fitting.length && rng.chance(0.6) ? fitting : ZH_EXCHANGES.entries)
}

/**
 * A remark about a specific icon. Names come off the shell, so anything can be
 * in there — the templates keep it to one short clause and truncate, because a
 * folder named after a whole sentence should not produce a speech bubble wider
 * than the monitor.
 *
 * In Chinese he does not name the icon: there is no verified way to put an
 * arbitrary file name into a sentence, so he says something about eating it.
 */
export function aboutIcon(rng: Rng, name: string): Utterance {
  if (language === 'zh') return say(rng, 'chew')
  const short = name.length > 14 ? `${name.slice(0, 13)}…` : name
  if (!short) return say(rng, 'chew')
  return rng.pick([
    `${short}?`,
    `eat ${short}`,
    `${short} is chewy`,
    `mine now`,
    `nom ${short}`,
  ])
}
