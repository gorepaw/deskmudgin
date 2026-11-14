// A nap. Wins on low energy, and is the only behaviour that refills it — which
// is what makes the energy need a loop rather than a slow slide into nothing.
//
// When he gets sleepy and when he wakes come from his chronotype (needs.ts), so
// a colony does not nod off in unison; each nap also wakes at its own point.

import type { Behavior } from '../brain'
import { PAL } from '../../art/palette'
import { say } from '../lines'

export function createSleep(): Behavior {
  let zzzT = 0
  /** Energy this nap ends at: his usual, give or take, so naps vary. */
  let wakeAt = 0.92

  return {
    id: 'sleep',
    layers: ['overlay', 'underlay'],
    minHold: 8,
    // A backstop only: a nap ends when he is rested ('done' below), which from
    // empty takes about an hour and a half. It was 240s, and a nap that hit it
    // was "woken" and put straight back to bed — a wake line and a tired line
    // every four minutes from a pet that never opened its eyes.
    maxHold: 3 * 3600,

    score(ctx) {
      const { energy } = ctx.pet.needs.needs
      const { dozeAt } = ctx.pet.needs.chronotype
      if (ctx.pet.held) return 0
      // Already asleep: score high so nothing casually outbids a sleeping frog.
      if (ctx.pet.asleep) return energy < wakeAt ? 0.95 : 0
      return energy < dozeAt ? 0.4 + (dozeAt - energy) * 2.2 : 0
    },

    enter(ctx) {
      const pet = ctx.pet
      pet.asleep = true
      pet.pose.arms = 'tuck'
      pet.stats.naps++
      zzzT = 0
      wakeAt = Math.min(0.99, pet.needs.chronotype.wakeAt + ctx.rng.range(-0.06, 0.04))
      // Sent to bed while already rested: a short lie-down, not a no-op.
      if (pet.needs.needs.energy >= wakeAt) wakeAt = Math.min(1, pet.needs.needs.energy + 0.05)
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
      if (pet.needs.needs.energy >= wakeAt) return 'done'
    },

    exit(ctx) {
      ctx.pet.asleep = false
      ctx.pet.pose.arms = 'none'
      ctx.pet.pose.eyeOpen = 1
      ctx.say(say(ctx.rng, 'wake'), 1.4)
    },
  }
}
