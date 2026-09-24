// The floor of the scoring system: always available, in every layer, and always
// beatable. Its score is what every other behaviour is implicitly measured
// against — nothing scoring below "stand there doing nothing" should run.

import type { Behavior } from '../brain'
import { say } from '../lines'

export function createIdle(): Behavior {
  /** Clock time until which it is shuffling on the spot. */
  let fidget = 0

  return {
    id: 'idle',
    layers: ['overlay', 'underlay'],
    minHold: 1.2,
    maxHold: 6,

    score: () => 0.18,

    tick(ctx) {
      const { pet, rng } = ctx
      pet.pose.arms = 'none'
      pet.pose.mouth = 0.1 + Math.sin(pet.pose.t * 0.8) * 0.04

      // Look around now and then. Nothing to look at in particular — he just has
      // the one eye and keeps checking with it.
      if (rng.chance(ctx.dt * 0.4)) {
        pet.pose.gaze.x = rng.range(-0.8, 0.8)
        pet.pose.gaze.y = rng.range(-0.4, 0.3)
      }
      if (rng.chance(ctx.dt * 0.06)) ctx.say(say(rng, 'idle'), 1.6)
      // A shuffle on the spot, because a completely still pet reads as frozen.
      // Held for a moment so a waddler actually takes a step — a single frame
      // of intent moves a hopper a whole hop and a walker about a pixel.
      if (rng.chance(ctx.dt * 0.12)) fidget = ctx.now + rng.range(0.3, 0.9)
      if (ctx.now < fidget) pet.moveToward(pet.x + pet.pose.face * 16)
    },
  }
}
