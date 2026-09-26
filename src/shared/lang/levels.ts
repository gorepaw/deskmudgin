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
//
// The levels are HSK's, because the lines were written and graded in Chinese,
// against HSK wordlists. Learning another language from them reads the same
// lines in that language — HSK 1's sentences in Arabic are still the simplest
// sentences, but they are not an Arabic syllabus, so they are called "Level 1"
// there rather than borrowing a name that would promise one.
// =============================================================================

import type { Course, Entry, LanguageId } from './types'
import { turnsOf } from './types'
import { COURSE as HSK1_WORDS } from './generated/zh-hsk1-words'
import { COURSE as HSK1 } from './generated/zh-hsk1'
import { COURSE as HSK1_TALK } from './generated/zh-hsk1-exchanges'
import { COURSE as HSK2_WORDS } from './generated/zh-hsk2-words'
import { COURSE as HSK2 } from './generated/zh-hsk2'
import { COURSE as HSK2_TALK } from './generated/zh-hsk2-exchanges'
import { COURSE as HSK3_WORDS } from './generated/zh-hsk3-words'
import { COURSE as HSK3 } from './generated/zh-hsk3'
import { COURSE as HSK3_TALK } from './generated/zh-hsk3-exchanges'

export interface Level {
  /** `hsk1` — what the setting stores and the course files are named by. */
  readonly id: string
  /** `HSK 1`, as a button says it while learning Chinese. See `levelLabel`. */
  readonly label: string
  readonly words: Course
  readonly phrases: Course
  readonly exchanges: Course
}

export const LEVELS: readonly Level[] = [
  { id: 'hsk1', label: 'HSK 1', words: HSK1_WORDS, phrases: HSK1, exchanges: HSK1_TALK },
  { id: 'hsk2', label: 'HSK 2', words: HSK2_WORDS, phrases: HSK2, exchanges: HSK2_TALK },
  { id: 'hsk3', label: 'HSK 3', words: HSK3_WORDS, phrases: HSK3, exchanges: HSK3_TALK },
]

export const DEFAULT_LEVEL = 'hsk1'

/** What a level is called while learning `l2`: `HSK 2` in Chinese, where it
 *  is one, and `Level 2` in any other language, where it is not. */
export function levelLabel(l: Level, l2: LanguageId): string {
  return l2 === l.phrases.source ? l.label : `Level ${LEVELS.indexOf(l) + 1}`
}

/**
 * Whether a level has anything to say yet in `l2`. A level exists in the list
 * from the moment its files do, which is before any of its content has been
 * verified — and a level verified in Chinese has nothing to say in Arabic until
 * its Arabic has been verified too. The setting offers only what is ready.
 */
export const isReady = (l: Level, l2: LanguageId): boolean =>
  l.phrases.entries.some(e => e.in[l2])

/** Whether anything at all can be learned in `l2` yet. */
export const canLearn = (l2: LanguageId): boolean => LEVELS.some(l => isReady(l, l2))

/** A level by id, falling back to the lowest — a save from a build with more
 *  levels than this one degrades to the first instead of to silence. */
export function levelById(id: string, l2: LanguageId): Level {
  return LEVELS.find(l => l.id === id && isReady(l, l2)) ?? LEVELS[0]
}

/** The chosen level and every one below it, lowest first. */
export function upTo(id: string, l2: LanguageId): readonly Level[] {
  return LEVELS.slice(0, LEVELS.indexOf(levelById(id, l2)) + 1)
}

/**
 * Every line a bubble can show, from every level: phrases, and each turn of
 * every conversation. For finding a line by the id the ledger filed it under.
 */
export function everyLine(): Entry[] {
  return LEVELS.flatMap(l => [...l.phrases.entries, ...l.exchanges.entries.flatMap(turnsOf)])
}
