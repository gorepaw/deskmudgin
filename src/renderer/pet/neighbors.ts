// =============================================================================
// Who is standing near whom.
//
// Every rule that reads the other pets reads them for the same reason: to give
// way to somebody close by. Personal space, an already-claimed icon, the spot
// beside the Matron, letting the nearest one take the cursor — all of them are
// questions about a neighbourhood, and none of them is a question about the pet
// two monitors away.
//
// The colony used to answer them by handing every creature a list of everybody
// else, rebuilt each frame. That is n² pushes 30 times a second whether or not
// anything asks, and with the cap gone it is the term that decides how large a
// crowd this app can hold. This replaces it with a coarse index over x: one
// O(n) rebuild per frame, and a query that touches only the cells it overlaps.
//
// **x only, deliberately.** They live on a desktop — a few ledges wide and one
// creature tall — so buckets in y would sort almost everybody into the same
// row and cost a dimension of arithmetic for nothing. Every existing rule
// already measures in x alone.
// =============================================================================

import type { Pet } from './pet'

/**
 * Cell width, in world pixels.
 *
 * Wide enough that the common query (personal space, ~46px) reads two cells
 * rather than a dozen, and narrow enough that a 700px cursor query does not
 * degenerate into a scan of the whole desktop. A three-monitor surface is about
 * thirteen cells across.
 */
const CELL = 256

/** Shared empty result. Frozen, because a behaviour that pushed onto it would
 *  poison every future query that came up empty. */
export const NOBODY: readonly Pet[] = Object.freeze([])

const cellOf = (x: number): number => Math.floor(x / CELL)

export class Neighborhood {
  /** Cell index → pets standing in it. Cells are kept and emptied rather than
   *  deleted, because the same dozen recur every frame for the life of the app. */
  private cells = new Map<number, Pet[]>()
  private count = 0

  /**
   * Re-index everybody. Called once per tick, before any creature thinks.
   *
   * Rebuilt wholesale rather than updated incrementally: a pet can be flung
   * across three monitors in one frame, and a moved-out-of-date index is the
   * kind of bug that shows up as one creature ignoring another for no visible
   * reason. n pushes is cheap; being subtly wrong is not.
   */
  rebuild(pets: readonly Pet[]): void {
    for (const list of this.cells.values()) list.length = 0
    this.count = pets.length
    for (const p of pets) {
      const key = cellOf(p.x)
      const list = this.cells.get(key)
      if (list) list.push(p)
      else this.cells.set(key, [p])
    }
  }

  /**
   * Everyone within `radius` of `x`, except `self`.
   *
   * The caller names its own radius, which is the point: the distance a rule
   * cares about is part of the rule, and stating it here is what makes it
   * checkable. A radius too small is a behaviour that stops noticing its
   * neighbours; there is no radius too large except in cost.
   *
   * Note `x` is not necessarily `self.x` — cuddle asks about the ground beside
   * the Matron, which may be nowhere near the pet doing the asking.
   *
   * Returns a fresh array. Queries only run when a brain re-decides (4 Hz, and
   * most of them bail before asking), so this is a handful of small short-lived
   * arrays a second, not the per-creature-per-frame allocation it replaces.
   */
  near(self: Pet, x: number, radius: number): readonly Pet[] {
    if (this.count < 2) return NOBODY
    const lo = cellOf(x - radius)
    const hi = cellOf(x + radius)
    let found: Pet[] | null = null
    for (let c = lo; c <= hi; c++) {
      const list = this.cells.get(c)
      if (!list) continue
      for (const p of list) {
        if (p === self || Math.abs(p.x - x) > radius) continue
        if (found) found.push(p)
        else found = [p]
      }
    }
    return found ?? NOBODY
  }
}
