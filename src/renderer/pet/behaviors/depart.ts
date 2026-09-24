// =============================================================================
// Walking off.
//
// A visitor that has waited long enough to be noticed and has not been gives up
// and leaves. Main flips `leaving` and takes it away a few seconds later; this
// is what happens in between, and it is the reason the flag exists at all — the
// alternative was having strangers blink out of existence, which reads as a
// crash rather than as a decision.
//
// It outranks everything except being held. Once it has decided to go, nothing
// short of a hand on it is going to interest it in an icon.
// =============================================================================

import type { Behavior } from '../brain'
import { say } from '../lines'

export function createDepart(): Behavior {
  let target = 0
  let grumbled = false

  return {
    id: 'depart',
    layers: ['overlay', 'underlay'],
    minHold: 2,
    // Longer than the seconds main allows for the walk, so this is never the
    // thing that ends the exit — main removing it is.
    maxHold: 30,

    score(ctx) {
      if (!ctx.pet.leaving) return 0
      // Under `held`, which scores 1. Picking one up as it goes should still
      // work, and releasing it lets this take over again — which is the correct
      // outcome, since it is still not yours until you click it.
      return ctx.pet.held ? 0 : 0.98
    },

    enter(ctx) {
      const { pet } = ctx
      // The nearer end of the ledge it is standing on, and **not one pixel
      // past it**.
      //
      // Overshooting looks like the right idea and is not: nothing can stand
      // off-world (Pet.tick clamps every frame), so the overshoot is either
      // ignored or — on a multi-monitor desktop — carries them across the bezel
      // onto the next screen, where they stop dead in the middle of it looking
      // like something that crashed. Measured: a visitor asked to leave from
      // the primary walked to x=1960 and parked there, 40px into the second
      // monitor. Walking to the edge and being taken away is the whole effect.
      const left = pet.x - pet.surface.x0 < pet.surface.x1 - pet.x
      target = left ? pet.surface.x0 : pet.surface.x1
      grumbled = false
    },

    tick(ctx) {
      const { pet } = ctx
      pet.pose.arms = 'none'
      // One quiet remark on the way out, and only sometimes. It is a goodbye
      // nobody was supposed to hear.
      if (!grumbled && ctx.rng.chance(0.35)) {
        grumbled = true
        ctx.say(say(ctx.rng, 'idle'), 2)
      }
      pet.lookAt(target, pet.y - 20)
      // Sephins flop onto their belly for it, which makes the exit read as
      // purposeful rather than as wandering that happens to end at the edge.
      pet.moveToward(target, true)
    },
  }
}
