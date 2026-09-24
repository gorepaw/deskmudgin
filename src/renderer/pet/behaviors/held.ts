// Being picked up. Scores 1 whenever `pet.held` is set, which the input layer
// sets on drag — so a user's hand always outranks whatever he had planned,
// without input code needing to know the brain exists.

import type { Behavior } from '../brain'
import { say } from '../lines'

export function createHeld(): Behavior {
  return {
    id: 'held',
    // Overlay only, and this one really is a layer limit rather than a choice:
    // dragging needs the button held down, and holding the button down on the
    // desktop is how you start explorer's selection rectangle. See caps.click.
    layers: ['overlay'],
    minHold: 0,
    maxHold: 3600,

    score: ctx => (ctx.pet.held ? 1 : 0),

    enter(ctx) {
      ctx.pet.asleep = false
      ctx.say(say(ctx.rng, 'grabbed'), 1.2)
      ctx.sfx.croak()
    },

    tick(ctx) {
      const { pet, world } = ctx
      if (!pet.held) return 'done'
      // Dangling: legs down, arms flailing, eye on the cursor that has him.
      pet.pose.arms = 'flail'
      pet.pose.mouth = 0.55
      pet.lookAt(world.cursor.x, world.cursor.y)
      pet.needs.socialise(ctx.dt * 0.02)
    },

    exit(ctx) {
      ctx.pet.pose.arms = 'none'
      ctx.pet.pose.mouth = 0.12
      // Nothing else. Letting go used to teleport him onto the nearest ledge and
      // announce that he had been dropped — before he had fallen anywhere. The
      // input layer now hands the release velocity to `Pet.fling`, gravity takes
      // it from there, and `tumble` does the landing and the complaining, so a
      // gentle set-down is silent and a throw across the desk is not.
    },
  }
}
