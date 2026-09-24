// =============================================================================
// The behaviour registry. This list is the entire extension point of the pet:
// a new thing he can do is a new file here plus a line below, and nothing else
// in the app changes.
//
// Behaviours are factories, one set per Mudgin. They were singletons while
// there was only ever one creature — per-behaviour state lived in module-level
// `let`s — and that stopped working the moment a second one could be out: two
// Mudgins would have shared one `victim`, one wander target and one rest timer,
// so they would have moved as a single confused animal. Closure state per
// instance is the fix, and it costs nothing.
//
// Order does not matter; the brain scores all of them. `idle` is the fallback
// and must stay registered for every layer.
// =============================================================================

import type { Behavior } from '../brain'
import type { Species } from '../../species'
import { createIdle } from './idle'
import { createWander } from './wander'
import { createSleep } from './sleep'
import { createFollowCursor } from './followCursor'
import { createChewIcon } from './chewIcon'
import { createHeld } from './held'
import { createSlide } from './slide'
import { createCuddle } from './cuddle'
import { createArrive } from './arrive'
import { createDepart } from './depart'
import { createTumble } from './tumble'
import { createConverse } from './converse'

export type BehaviorFactory = () => Behavior

const FACTORIES: readonly BehaviorFactory[] = [
  createIdle,
  createWander,
  createSleep,
  createFollowCursor,
  createChewIcon,
  createHeld,
  createSlide,
  createCuddle,
  createArrive,
  createDepart,
  createTumble,
  createConverse,
]

/**
 * One private set of behaviours, for one creature, filtered to what its species
 * actually does.
 *
 * The filter is the species' business, not the behaviour's: `chewIcon` stays a
 * Mudgin habit without `chewIcon` ever having to know a Sephin exists, and a
 * third species is a list in species/index.ts rather than a condition added to
 * every file in here.
 */
export function createBehaviors(species: Species): { all: Behavior[]; fallback: Behavior } {
  const allowed = new Set(species.behaviors)
  const all = FACTORIES.map(f => f()).filter(b => allowed.has(b.id))
  const fallback = all.find(b => b.id === 'idle')
  // Not a defensive nicety: the brain has to have something to fall back to in
  // every layer, and idle is the only behaviour that promises to be available
  // in all of them. A species that omits it would strand its creatures silently.
  if (!fallback) throw new Error(`${species.id} must list 'idle' — it is the brain's fallback`)
  return { all, fallback }
}
