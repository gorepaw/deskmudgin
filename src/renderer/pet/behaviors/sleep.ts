// A nap. Wins on low energy, and is the only behaviour that refills it — which
// is what makes the energy need a loop rather than a slow slide into nothing.

import type { Behavior } from '../brain'
import { PAL } from '../../art/palette'
import { say } from '../lines'

export function createSleep(): Behavior {
  let zzzT = 0

  return {
    id: 'sleep',
    layers: ['overlay', 'underlay'],
    minHold: 8,
    // Long, but not unbounded: he should wake on his own eventually even if
    // nothing disturbs him, or a forced nap becomes a permanent one.
    maxHold: 240,

    score(ctx) {
      const { energy } = ctx.pet.needs.needs
      if (ctx.pet.held) return 0
      // Already asleep: score high so nothing casually outbids a sleeping frog.
      if (ctx.pet.asleep) return energy < 0.85 ? 0.95 : 0
      return energy < 0.3 ? 0.4 + (0.3 - energy) * 2.2 : 0
    },

    enter(ctx) {
      ctx.pet.asleep = true
      ctx.pet.pose.arms = 'tuck'
      ctx.pet.stats.naps++
      zzzT = 0
      ctx.say(say(ctx.rng, 'tired'), 2)
    },

    tick(ctx) {
      const { pet, fx } = ctx
      pet.pose.mouth = 0.06 + Math.sin(pet.pose.t * 1.1) * 0.05
      pet.pose.squash = 0.9 + Math.sin(pet.pose.t * 1.1) * 0.05
      // Energy comes back through NeedsModel.advance(sleeping = true); the main
      // loop reads pet.asleep, so there is nothing to do here but breathe.
      zzzT += ctx.dt
      if (zzzT > 1.1) {
        zzzT = 0
        fx.emit('zzz', pet.x + pet.pose.face * 12, pet.y - 40, 1,
          { color: PAL.zzz, size: 13, vx: pet.pose.face * 12, vy: -18, life: 2.4 })
      }
      if (pet.needs.needs.energy > 0.92) return 'done'
    },

    exit(ctx) {
      ctx.pet.asleep = false
      ctx.pet.pose.arms = 'none'
      ctx.pet.pose.eyeOpen = 1
      ctx.say(say(ctx.rng, 'wake'), 1.4)
    },
  }
}
