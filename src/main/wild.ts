// =============================================================================
// Strangers.
//
// Every so often something wanders onto the screen that is not yours. It looks
// exactly like a pet you own — same art, same brain, same everything — because
// **noticing it is the game**. There is no badge, no notification and no sound;
// if you are not looking at your desktop, it comes, waits, and goes again, and
// you never know. Clicking it is the only thing that makes it yours.
//
// The whole schedule lives here, in main, because main owns the roster and a
// visitor is a roster entry that has not been earned yet. The renderers are told
// about it exactly the way they are told about anybody else — it rides along in
// `roster:changed` — so nothing downstream has to learn what "wild" means beyond
// deciding what a click does.
//
// Every interval is rolled per occurrence and never shown as a number. A player
// should have to guess whether one is due, in the same way they have to guess
// how long a Mudgin takes to mature.
// =============================================================================

import type { PetSave } from '../shared/types'
import { slow } from '../shared/clock'

/** Seconds after launch before the first one turns up. */
const FIRST = [60, 600] as const
/** Seconds it will wait around to be noticed before giving up. */
const STAY = [600, 1800] as const
/** Seconds between one leaving and the next arriving. */
const GAP = [30, 180] as const
/**
 * Seconds a departing visitor is left on screen to walk off.
 *
 * Deliberately NOT run through `slow` — it is a walk, not a wait. Compressing
 * it would make them vanish rather than leave, which is the one part of this
 * that is meant to be watchable.
 */
const WALK_OFF = 12

type Roll = (leavingFrom?: undefined) => PetSave

export class WildWatch {
  private current: PetSave | null = null
  private timer: ReturnType<typeof setTimeout> | null = null

  constructor(
    /** Rolls a brand-new stranger, positioned at a screen edge. */
    private roll: Roll,
    /** Something changed; re-roster every window. */
    private onChange: () => void,
    private rand: (lo: number, hi: number) => number,
    private log: (m: string) => void,
  ) {}

  /** Whoever is visiting, as a list — the shape `rosterFor` wants. */
  get all(): PetSave[] { return this.current ? [this.current] : [] }

  start(): void {
    this.after(slow(this.rand(...FIRST)), () => this.arrive())
  }

  /**
   * The player clicked it. Hands the visitor over and starts the wait for the
   * next one — the same gap as an ordinary departure, so adopting one does not
   * conjure a replacement any faster than ignoring one.
   */
  take(id: string): PetSave | null {
    if (!this.current || this.current.id !== id) return null
    const taken = this.current
    this.current = null
    this.after(slow(this.rand(...GAP)), () => this.arrive())
    return taken
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer)
    this.timer = null
  }

  private arrive(): void {
    this.current = this.roll()
    this.log(`a wild ${this.current.species} wandered on`)
    this.onChange()
    this.after(slow(this.rand(...STAY)), () => this.leave())
  }

  private leave(): void {
    if (!this.current) return
    // Flagged rather than removed, so the renderer's `depart` behaviour can walk
    // it off the edge it came in from. Main takes it away once the walk has had
    // time to finish; nothing here waits for the renderer to report back,
    // because a window that closed mid-walk would strand the visitor forever.
    this.current = { ...this.current, leaving: true }
    this.onChange()
    this.after(WALK_OFF, () => this.gone())
  }

  private gone(): void {
    if (this.current) this.log(`the wild ${this.current.species} left`)
    this.current = null
    this.onChange()
    this.after(slow(this.rand(...GAP)), () => this.arrive())
  }

  private after(seconds: number, fn: () => void): void {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(fn, Math.max(50, seconds * 1000))
  }
}
