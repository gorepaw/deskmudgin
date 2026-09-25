// =============================================================================
// The levels of a course, lowest first, and the one place that lists them.
//
// A level is three courses — its words, the sentences built on them, and the
// conversations — and everything that reads the course (what a creature says,
// the dictionary, the ledger's re-reading of heard lines) walks this list
// rather than importing a level by name. Adding HSK 3 is building its three
// files and adding one row here.
//
// Levels are cumulative, the way HSK is: a learner at HSK 2 still hears HSK 1,
// because the point of the second level is that the first keeps being used.
// =============================================================================

import type { Course, Entry } from './types'
import { turnsOf } from './types'
import { COURSE as HSK1_WORDS } from './generated/zh-hsk1-words'
import { COURSE as HSK1 } from './generated/zh-hsk1'
import { COURSE as HSK1_TALK } from './generated/zh-hsk1-exchanges'
import { COURSE as HSK2_WORDS } from './generated/zh-hsk2-words'
import { COURSE as HSK2 } from './generated/zh-hsk2'
import { COURSE as HSK2_TALK } from './generated/zh-hsk2-exchanges'

export interface Level {
  /** `hsk1` — what the setting stores and the course files are named by. */
  readonly id: string
  /** `HSK 1`, as a button says it. */
  readonly label: string
  readonly words: Course
  readonly phrases: Course
  readonly exchanges: Course
}

export const ZH_LEVELS: readonly Level[] = [
  { id: 'hsk1', label: 'HSK 1', words: HSK1_WORDS, phrases: HSK1, exchanges: HSK1_TALK },
  { id: 'hsk2', label: 'HSK 2', words: HSK2_WORDS, phrases: HSK2, exchanges: HSK2_TALK },
]

export const DEFAULT_LEVEL = 'hsk1'

/**
 * Whether a level has anything to say yet. A level exists in the list from the
 * moment its files do, which is before any of its content has been verified —
 * the setting offers it only once there are sentences behind it.
 */
export const isReady = (l: Level): boolean => l.phrases.entries.length > 0

/** A level by id, falling back to the lowest — a save from a build with more
 *  levels than this one degrades to HSK 1 instead of to silence. */
export function levelById(id: string): Level {
  return ZH_LEVELS.find(l => l.id === id && isReady(l)) ?? ZH_LEVELS[0]
}

/** The chosen level and every one below it, lowest first. */
export function upTo(id: string): readonly Level[] {
  return ZH_LEVELS.slice(0, ZH_LEVELS.indexOf(levelById(id)) + 1)
}

/**
 * Every line a bubble can show, from every level: phrases, and each turn of
 * every conversation. For finding a line by the id the ledger filed it under.
 */
export function everyLine(): Entry[] {
  return ZH_LEVELS.flatMap(l => [...l.phrases.entries, ...l.exchanges.entries.flatMap(turnsOf)])
}
