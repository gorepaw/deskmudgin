// =============================================================================
// What he says.
//
// Two voices. In English he is what he always was: "few thoughts" is canon
// (Data/races.json), so the grunts are a creature with two ideas rather than a
// mascot with a joke book. In Chinese he says real sentences from the verified
// course at the level you chose — simple, a little childlike, and the same few
// ideas: hungry, sleepy, pleased to see you. Nothing in this file writes Chinese. It only
// chooses from what the course already contains, and the course only contains
// what passed verification (tools/lang-build.mjs).
// =============================================================================

import type { Rng } from '../engine/math'
import type { Entry, GlossMode, LanguageId, Utterance } from '../../shared/lang/types'
import { DEFAULT_LEVEL, ZH_LEVELS, upTo } from '../../shared/lang/levels'

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

let gloss: GlossMode = 'en'
/** Which meaning shows under the Chinese. Global like the language, and read
 *  at draw time by everything that shows a line. */
export const setGloss = (m: GlossMode): void => { gloss = m }
export const currentGloss = (): GlossMode => gloss

/**
 * How often a creature reaches for the chosen level rather than one below it.
 * Most of what you hear is what you are learning; the rest keeps the earlier
 * levels in use, because a level you have moved past and never hear again is
 * a level you forget. At HSK 1 there is nothing below, so it is always HSK 1.
 */
const FOCUS = 0.7

/** Course lines by tag. `focus` is the chosen level, `review` every level
 *  below it. Rebuilt when the level changes, not on every line said. */
let focus = new Map<string, Entry[]>()
let review = new Map<string, Entry[]>()
let talkFocus: readonly Entry[] = []
let talkReview: readonly Entry[] = []

function byTag(entries: readonly Entry[]): Map<string, Entry[]> {
  const m = new Map<string, Entry[]>()
  for (const e of entries) {
    for (const t of e.tags) {
      const list = m.get(t)
      if (list) list.push(e)
      else m.set(t, [e])
    }
  }
  return m
}

/** Set from settings at boot and on every change. Global, like the language. */
export function setLevel(id: string): void {
  const levels = upTo(id)
  const top = levels[levels.length - 1]
  const below = levels.slice(0, -1)
  focus = byTag(top.phrases.entries)
  review = byTag(below.flatMap(l => l.phrases.entries))
  talkFocus = top.exchanges.entries
  talkReview = below.flatMap(l => l.exchanges.entries)
}
setLevel(DEFAULT_LEVEL)

/** From the chosen level most of the time, from below it otherwise, and from
 *  whichever has anything when only one does. Null when neither has. */
function choose<T>(rng: Rng, top: readonly T[] | undefined, low: readonly T[] | undefined): T | null {
  const f = top?.length ? top : null
  const r = low?.length ? low : null
  const pool = f && (!r || rng.chance(FOCUS)) ? f : r
  return pool ? rng.pick(pool) : null
}

export function say(rng: Rng, kind: LineKind): Utterance {
  if (language === 'zh') {
    const tag = rng.pick(TAGS[kind])
    // A tag the course has nothing for (none verified yet) falls back to
    // English for that moment rather than to silence.
    const line = choose(rng, focus.get(tag), review.get(tag))
    if (line) return line
  }
  return rng.pick(LINES[kind])
}

/** A specific course line by its Chinese, from any level, or null if it is not
 *  (yet) verified. For callers with a fixed repertoire, like the Matron. */
export function line(script: string): Entry | null {
  for (const l of ZH_LEVELS) {
    const e = l.phrases.entries.find(x => x.script === script)
    if (e) return e
  }
  return null
}

/** Whether there is anything to talk about: Chinese on, and at least one
 *  exchange verified at or below the chosen level. */
export const canConverse = (): boolean =>
  language === 'zh' && (talkFocus.length > 0 || talkReview.length > 0)

/**
 * A verified conversation to start, or null when there is none to have — the
 * English setting, or a course with no exchanges verified yet.
 *
 * `mood` prefers exchanges tagged for it (a hungry creature opens with food)
 * without insisting: most of the time the talk is about anything at all.
 */
export function pickExchange(rng: Rng, mood?: string): Entry | null {
  if (!canConverse()) return null
  if (mood && rng.chance(0.6)) {
    const fits = (e: Entry): boolean => e.tags.includes(mood)
    const x = choose(rng, talkFocus.filter(fits), talkReview.filter(fits))
    if (x) return x
  }
  return choose(rng, talkFocus, talkReview)
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
