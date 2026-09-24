// Belly-sliding. A Sephin crossing open ground does not walk it — it flops onto
// its front and lets the floor do the work, which is the animal's whole
// identity in the game it comes from.
//
// Sits alongside wander rather than replacing it: a short trip is a waddle, and
// only a real distance is worth going flat for. That contrast is the point — a
// creature that always slid would just be a fast creature.

import type { Behavior } from '../brain'
import type { Surface } from '../../world/world'

/** Below this, waddling is faster than the flop is worth. */
const WORTH_IT = 260

export function createSlide(): Behavior {
  let target = 0
  let surface: Surface | null = null
  let restUntil = 0

  return {
    id: 'slide',
    layers: ['overlay', 'underlay'],
    minHold: 1.5,
    maxHold: 12,

    score(ctx) {
      const { pet } = ctx
      if (pet.asleep || pet.held) return 0
      if (ctx.now < restUntil) return 0
      // Needs somewhere to go. A ledge narrower than the flop is worth is an
      // icon, and a Sephin sliding along a desktop icon is a comedy of one.
      if (pet.surface.x1 - pet.surface.x0 < WORTH_IT) return 0
      const { energy } = pet.needs.needs
      // Beats wander when it has the room and the energy, loses to anything
      // that actually wants something.
      return 0.3 + energy * 0.25
    },

    enter(ctx) {
      const { pet, world, rng } = ctx
      surface = pet.surface
      const reach = rng.range(WORTH_IT, 620) * (rng.chance(0.5) ? 1 : -1)
      target = world.clampToSurface(surface, pet.x + reach)
      // Turn away from a wall rather than flopping into it.
      if (Math.abs(target - pet.x) < WORTH_IT) {
        target = world.clampToSurface(surface, pet.x - reach)
      }
    },

    tick(ctx) {
      const { pet } = ctx
      pet.pose.arms = 'none'
      const dx = target - pet.x
      if (Math.abs(dx) < 14) return 'done'
      if (surface && pet.surface !== surface && pet.grounded) return 'done'
      pet.lookAt(target, pet.y - 20)
      pet.moveToward(target, true)
    },

    exit(ctx) {
      surface = null
      restUntil = ctx.now + ctx.rng.range(6, 20)
    },
  }
}
