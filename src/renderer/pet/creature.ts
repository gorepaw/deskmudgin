// =============================================================================
// One creature: a body, a brain, a voice, and its own private dice.
//
// This is the unit a colony is made of. Everything per-creature is owned here
// and nothing per-creature lives above it — which is exactly why behaviours had
// to become factories: a second creature sharing one wander target and one chew
// victim does not read as two creatures, it reads as one animal with a
// rendering bug.
//
// What is deliberately *not* here: the Fx pool, the sound, the world.
// Particles are a shared surface, sounds are gated globally so five of them
// chewing is a chorus rather than a wall of noise, and there is only one
// desktop.
// =============================================================================

import type { LayerMode, PetSave } from '../../shared/types'
import { hashSeed } from '../../shared/genome'
import type { Fx } from '../art/fx'
import type { Painter } from '../engine/painter'
import { rng as makeRng, type Rng } from '../engine/math'
import { inflate, union, type Box } from '../engine/stage'
import { Speech } from '../ui/speech'
import type { Sfx } from '../audio/sfx'
import type { World } from '../world/world'
import type { MatronRef } from '../ui/matron'
import { speciesOf, type Species } from '../species'
import { Brain, type BehaviorCtx } from './brain'
import { createBehaviors } from './behaviors'
import { NOBODY, type Neighborhood } from './neighbors'
import { Pet } from './pet'

export class Creature {
  readonly id: string
  readonly species: Species
  readonly pet: Pet
  readonly speech = new Speech()
  /** Owned by main; carried so a save round-trips without losing them. */
  layer: LayerMode
  out: boolean

  private readonly brain: Brain
  private readonly rng: Rng
  private readonly ctx: BehaviorCtx
  /** Set each tick by the colony; null only before the first one. */
  private hood: Neighborhood | null = null
  /** Kept from the last tick so `bounds` can place the bubble the same way
   *  `draw` will, edge-clamp included. */
  private worldW = Infinity

  constructor(save: PetSave, world: World, fx: Fx, sfx: Sfx, uiScale = 1) {
    this.id = save.id
    this.layer = save.layer
    this.out = save.out
    this.species = speciesOf(save.species)
    // Seeded off its own birthday mixed with its id, so a given creature
    // twitches the same way every session — and two born a millisecond apart
    // still diverge, which is most of what stops a colony moving in lockstep.
    this.rng = makeRng((save.bornAt ^ hashSeed(save.id)) >>> 0 || 1)
    this.pet = new Pet(save, this.species, world, this.rng, uiScale)

    const { all, fallback } = createBehaviors(this.species)
    this.brain = new Brain(all, fallback)

    this.ctx = {
      pet: this.pet,
      // Bound once, not per frame. The index itself is swapped in each tick;
      // this closure only has to know where to look.
      near: (x, r) => this.hood?.near(this.pet, x, r) ?? NOBODY,
      matron: null,
      world, fx, rng: this.rng, dt: 0, now: 0,
      say: (t, s) => this.speech.say(t, s),
      sfx,
    }
  }

  get name(): string { return this.pet.name }
  get activeId(): string { return this.brain.activeId }
  /** On screen but not owned. Decides whether a click pats or adopts. */
  get wild(): boolean { return this.pet.wild }

  /** Advance one frame. The colony re-indexes everybody before calling this,
   *  and hands the same index to all of them. */
  tick(
    dt: number, now: number, world: World, hood: Neighborhood,
    matron: MatronRef | null, onLand: () => void,
  ): void {
    this.ctx.dt = dt
    this.ctx.now = now
    this.hood = hood
    this.ctx.matron = matron
    this.ctx.world = world
    this.worldW = world.width

    this.pet.needs.advance(dt, this.pet.asleep)
    this.brain.tick(this.ctx)
    this.pet.tick(dt, world, onLand)
    this.speech.update(dt)

    if (!world.cursor.inside && !this.pet.asleep) this.pet.lookAt(null)
  }

  force(behaviorId: string): void { this.brain.force(behaviorId, this.ctx) }

  draw(g: Painter, worldWidth: number): void {
    this.brain.drawUnder(this.ctx, g)
    this.species.draw(g, this.pet.pose, this.pet.genes)
    this.speech.draw(g, this.pet.x, this.pet.bounds.y, worldWidth)
  }

  /**
   * What to repaint for it.
   *
   * Inflated well past its own bounds because behaviours draw around it, plus
   * the speech bubble's own rect. That used to be a fixed 236×52 — right for a
   * one-line grunt and wrong the moment a bubble grew three lines of Chinese,
   * which would have left its lower lines smeared across the desktop. The
   * bubble now reports exactly the rect its draw will use.
   */
  bounds(): Box {
    const b: Box = inflate(this.pet.bounds, 90)
    const said = this.speech.rect(this.pet.x, this.pet.bounds.y, this.worldW)
    return said ? union(b, said) ?? b : b
  }

  toSave(world: World): PetSave {
    return { ...this.pet.toSave(world), id: this.id, layer: this.layer, out: this.out }
  }
}
