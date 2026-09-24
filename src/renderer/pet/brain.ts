// =============================================================================
// What he decides to do, and the shape every new idea plugs into.
//
// Behaviours are scored, not sequenced. Each one answers "how much do I want to
// run right now" as a number, the brain runs the winner, and adding a
// behaviour is one file plus one line in the registry — no state machine to
// re-wire, no existing behaviour to edit. That is the whole extensibility
// story of this app and it is worth keeping strict: a behaviour that reaches
// into another behaviour has broken it.
//
// Two guards stop scoring from producing a twitching creature:
//   • minHold — once chosen, a behaviour is safe for a moment even if
//     something else scores higher. Without it, two behaviours within a
//     rounding error of each other alternate every tick and he vibrates.
//   • a switching margin — a challenger has to be meaningfully better, not
//     merely better.
// =============================================================================

import type { LayerMode } from '../../shared/types'
import type { Fx } from '../art/fx'
import type { Rng } from '../engine/math'
import type { World } from '../world/world'
import type { MatronRef } from '../ui/matron'
import type { Pet } from './pet'
import type { Utterance } from '../../shared/lang/types'

export interface BehaviorCtx {
  pet: Pet
  /**
   * Everyone within `radius` of `x`, excluding `pet` itself. Empty when he is
   * alone, or when nobody else is that close.
   *
   * A query rather than a list, because every rule that reads the others reads
   * them about a *place* — give way near where I am headed, leave alone the
   * icon somebody is already up, take the spot beside her only if it is free.
   * Handing each creature the whole colony instead made the tick O(n²) whether
   * or not anyone asked, which is what capped how large a crowd could be out.
   * Naming the radius at the call site also puts the distance a rule cares
   * about next to the rule.
   *
   * `x` need not be `pet.x`: ask about wherever the answer matters.
   *
   * Read-only on purpose: a behaviour may look at the others to decide what to
   * do, but it drives exactly one Mudgin, its own. Anything that reaches over
   * and moves someone else has broken the one-brain-per-creature rule that
   * makes a colony tractable.
   */
  near(x: number, radius: number): readonly Pet[]
  /**
   * The Matron, if she is standing in **this** window's layer.
   *
   * Null is the normal case, not an error: in dual mode she is only in one of
   * the two windows, and a behaviour that wants her has to cope with her not
   * being reachable. Read-only in the same sense as `others` — a pet may lean
   * on her, it may not move her.
   */
  matron: MatronRef | null
  world: World
  fx: Fx
  rng: Rng
  dt: number
  /** Seconds since the app started. */
  now: number
  say(text: Utterance, seconds?: number): void
  sfx: {
    hop(): void
    chomp(): void
    croak(): void
    happy(): void
    grumble(): void
  }
}

export interface Behavior {
  readonly id: string
  /** Layers this can run in. The brain filters on it, so behaviours never
   *  check the mode themselves. */
  readonly layers: readonly LayerMode[]
  /**
   * Desire to run, 0..1. Return 0 to opt out entirely — that is the normal way
   * a behaviour says "not applicable", e.g. chewIcon when there are no icons.
   */
  score(ctx: BehaviorCtx): number
  /** Seconds it is protected from being replaced. */
  readonly minHold?: number
  /** Seconds after which the brain re-decides regardless. */
  readonly maxHold?: number
  enter?(ctx: BehaviorCtx): void
  /** Return 'done' to release the hold early. */
  tick(ctx: BehaviorCtx): void | 'done'
  exit?(ctx: BehaviorCtx): void
  /** Optional art drawn behind him — chew marks, a nest, a target reticle. */
  drawUnder?(ctx: BehaviorCtx, g: import('../engine/painter').Painter): void
}

/** A challenger must beat the incumbent by this much to take over. */
const MARGIN = 0.08

export class Brain {
  private current: Behavior
  private held = 0
  private sinceDecision = 0

  constructor(private behaviors: readonly Behavior[], private fallback: Behavior) {
    this.current = fallback
  }

  get activeId(): string { return this.current.id }

  tick(ctx: BehaviorCtx): void {
    this.held += ctx.dt
    this.sinceDecision += ctx.dt

    const result = this.current.tick(ctx)
    const expired = this.held >= (this.current.maxHold ?? 12)

    if (result === 'done' || expired) {
      this.decide(ctx, true)
      return
    }
    // Re-score at 4Hz rather than every frame. Scoring is cheap, but a decision
    // that can change 60 times a second is not a decision.
    if (this.sinceDecision >= 0.25 && this.held >= (this.current.minHold ?? 1.2)) {
      this.sinceDecision = 0
      this.decide(ctx, false)
    }
  }

  /** Force a specific behaviour — the tray commands and drag interaction use
   *  this, so a user request always wins over whatever he had planned. */
  force(id: string, ctx: BehaviorCtx): void {
    const b = this.behaviors.find(x => x.id === id)
    if (!b || b === this.current) return
    this.switchTo(b, ctx)
  }

  private decide(ctx: BehaviorCtx, forced: boolean): void {
    const layer = ctx.world.layer
    let best: Behavior | null = null
    let bestScore = forced ? -1 : this.current.score(ctx) + MARGIN

    for (const b of this.behaviors) {
      if (!b.layers.includes(layer)) continue
      const s = b.score(ctx)
      if (s <= 0) continue
      if (s > bestScore) { bestScore = s; best = b }
    }

    const next = best ?? (forced ? this.pickFallback(ctx, layer) : null)
    if (!next) {
      if (forced) this.held = 0
      return
    }
    if (next !== this.current) {
      this.switchTo(next, ctx)
    } else if (forced) {
      // Same behaviour, fresh episode.
      //
      // A forced decision means the last episode is over — it either said
      // 'done' or ran out its maxHold. Merely resetting the hold clock leaves
      // the behaviour's per-episode state from the *previous* episode intact,
      // and anything it decided in enter() is now stale. wander kept a target
      // it had already reached and a climb-down flag for a climb it had already
      // made, so it re-leapt at the same unreachable point forever and pinned
      // him against the left edge of the screen.
      //
      // Every behaviour with enter() state would hit this, so it is fixed here
      // rather than in the one that happened to expose it.
      this.current.exit?.(ctx)
      this.held = 0
      this.sinceDecision = 0
      this.current.enter?.(ctx)
    }
  }

  private pickFallback(ctx: BehaviorCtx, layer: LayerMode): Behavior {
    // The fallback must be able to run in the current layer or the brain has
    // nothing to fall back to. `idle` is registered for every layer for this
    // exact reason; the check is here so a future layer cannot quietly break it.
    return this.fallback.layers.includes(layer)
      ? this.fallback
      : this.behaviors.find(b => b.layers.includes(layer)) ?? this.fallback
  }

  private switchTo(next: Behavior, ctx: BehaviorCtx): void {
    this.current.exit?.(ctx)
    this.current = next
    this.held = 0
    this.sinceDecision = 0
    next.enter?.(ctx)
  }

  drawUnder(ctx: BehaviorCtx, g: import('../engine/painter').Painter): void {
    this.current.drawUnder?.(ctx, g)
  }
}
