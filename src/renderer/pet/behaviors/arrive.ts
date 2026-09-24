// =============================================================================
// Walking on.
//
// A visitor is spawned at the very edge of the screen and its first act is to
// come inside. That entrance is the *only* thing that distinguishes a stranger
// from a pet you own — same art, same brain, same everything else — so it is
// worth a behaviour rather than a spawn offset. If you happen to be looking, you
// see something walk in from the side; if you are not, you find it later
// standing about as though it had always been there.
//
// It runs once per creature and then retires. Nothing resets it, because nothing
// should: a pet that keeps re-entering from the edge has stopped being a pet.
// =============================================================================

import type { Behavior } from '../brain'

/** How far in from the edge counts as "arrived". */
const INSIDE = [110, 300] as const

export function createArrive(): Behavior {
  let target = 0
  let done = false

  return {
    id: 'arrive',
    layers: ['overlay', 'underlay'],
    // Long enough to cross the distance at a waddle, which is the slower of the
    // two gaits — a Mudgin hops it in well under this.
    minHold: 1,
    maxHold: 14,

    score(ctx) {
      // Not `wild` — `held`. A visitor picked up mid-entrance should stay
      // picked up, and one that is leaving has already had its turn.
      if (done || !ctx.pet.wild || ctx.pet.leaving) return 0
      if (ctx.pet.held || ctx.pet.asleep) return 0
      return 0.94
    },

    enter(ctx) {
      const { pet, world, rng } = ctx
      // Inward from whichever edge it was put down on. Measured against the
      // ledge it is standing on rather than the screen, so a visitor that
      // arrives on a second monitor walks into *that* monitor.
      const fromLeft = pet.x - pet.surface.x0 < pet.surface.x1 - pet.x
      const reach = rng.range(...INSIDE)
      target = world.clampToSurface(pet.surface, pet.x + (fromLeft ? reach : -reach))
    },

    tick(ctx) {
      const { pet } = ctx
      if (Math.abs(target - pet.x) < 14) { done = true; return 'done' }
      pet.lookAt(target, pet.y - 20)
      // Sliding on arrival would be a very odd first impression. Sephins walk in.
      pet.moveToward(target)
    },

    exit() {
      // Whether it got there or merely ran out of hold, the entrance is over.
      done = true
    },
  }
}
