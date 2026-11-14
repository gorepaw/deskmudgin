// =============================================================================
// The tamagotchi half. Three needs decay, mood follows them with inertia, and
// the brain scores behaviours against all four.
//
// Decay is per real second and is applied against wall-clock time, not frames —
// including the hours the app was closed. A pet that only gets hungry while you
// are watching is a screensaver.
//
// The rates are slow on purpose. He should get hungry over an afternoon, not
// over a coffee break: the failure mode of every desktop pet is becoming a
// chore, and a creature that needs feeding twice an hour gets muted and then
// uninstalled.
// =============================================================================

import type { PetSave } from '../../shared/types'
import { clamp } from '../engine/math'
import { hashSeed, sampler } from '../../shared/genome'

/** Per second. 1/(hours × 3600) — read the comment, not the decimal. */
const DECAY = {
  fullness: 1 / (6 * 3600),   // peckish after ~6h awake
  energy: 1 / (9 * 3600),     // ready for a nap after ~9h
  social: 1 / (4 * 3600),     // lonely after ~4h ignored
} as const

/** Mood chases the worst need, but slowly — he sulks and recovers over minutes,
 *  not instantly, so a single feed does not flip him from miserable to elated. */
const MOOD_RATE = 1 / 120

export type Needs = PetSave['needs']

/**
 * A pet's own sleep rhythm. Without one every pet tires at the same rate and
 * dozes at the same energy, so a colony that woke together falls asleep
 * together, hours later, all at once.
 *
 * Seeded from the pet's id, so it is the same animal's rhythm every session —
 * a light sleeper stays one — and nothing new needs saving.
 */
export interface Chronotype {
  /** Multiplies how fast energy drains awake and refills asleep. */
  readonly drain: number
  /** Energy below which a nap starts to appeal. */
  readonly dozeAt: number
  /** Energy around which he wakes up; each nap jitters it. */
  readonly wakeAt: number
}

export function chronotypeOf(id: string): Chronotype {
  // A salt of its own, so this is not the genome's or the brain's sequence.
  const r = sampler(hashSeed(`sleep:${id}`))
  return { drain: r.range(0.75, 1.3), dozeAt: r.range(0.22, 0.4), wakeAt: r.range(0.82, 0.97) }
}

export class NeedsModel {
  constructor(
    public needs: Needs, public mood: number,
    readonly chronotype: Chronotype = { drain: 1, dozeAt: 0.3, wakeAt: 0.92 },
  ) {}

  /**
   * Advance by `seconds` of wall clock. Called once at boot with the time since
   * lastSeenAt, then every frame with dt.
   *
   * Offline time is capped at a day. Come back from a fortnight's holiday and
   * he should be hungry and sulking, not dead — this is a pet, and there is no
   * version of "you killed him by going on holiday" that is fun.
   */
  advance(seconds: number, sleeping = false): void {
    const s = Math.min(seconds, 24 * 3600)
    // Sleep is what energy is for: it refills roughly six times faster than it
    // drains, so a nap is minutes rather than the whole afternoon.
    const eRate = (sleeping ? -DECAY.energy * 6 : DECAY.energy) * this.chronotype.drain
    this.needs.fullness = clamp(this.needs.fullness - DECAY.fullness * s)
    this.needs.energy = clamp(this.needs.energy - eRate * s)
    this.needs.social = clamp(this.needs.social - DECAY.social * s)

    const target = this.contentment()
    const k = Math.min(1, MOOD_RATE * s)
    this.mood = clamp(this.mood + (target - this.mood) * k)
  }

  /** What his mood is heading toward. Weighted to the worst need rather than
   *  averaged: one thing being badly wrong should dominate, the way it does. */
  contentment(): number {
    const { fullness, energy, social } = this.needs
    const worst = Math.min(fullness, energy, social)
    const mean = (fullness + energy + social) / 3
    return clamp(worst * 0.6 + mean * 0.4)
  }

  feed(amount = 0.25): void {
    this.needs.fullness = clamp(this.needs.fullness + amount)
    this.mood = clamp(this.mood + amount * 0.4)
  }

  socialise(amount = 0.2): void {
    this.needs.social = clamp(this.needs.social + amount)
    this.mood = clamp(this.mood + amount * 0.5)
  }

  /** The single most pressing thing, or null if he is fine. Drives what he says
   *  and which behaviours the brain will even consider. */
  urgent(): keyof Needs | null {
    const { fullness, energy, social } = this.needs
    const worst = Math.min(fullness, energy, social)
    if (worst > 0.35) return null
    if (worst === energy) return 'energy'
    if (worst === fullness) return 'fullness'
    return 'social'
  }
}
