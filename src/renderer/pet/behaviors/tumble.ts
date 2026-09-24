// =============================================================================
// Being in the air, having been thrown.
//
// The flight itself is physics and lives in Pet.ballistic — this is only what
// the creature is *doing* while it happens, plus what it has to say about it on
// landing. It exists as a behaviour rather than as a flag inside Pet so that
// nothing else tries to drive a creature that is currently a projectile: it
// outranks everything except a hand catching it again.
// =============================================================================

import type { Behavior } from '../brain'
import { say } from '../lines'

export function createTumble(): Behavior {
  let peak = 0

  return {
    id: 'tumble',
    // Both layers. A desktop-layer pet cannot be picked up, but it can still be
    // knocked off an icon by a ledge disappearing, and falling is falling.
    layers: ['overlay', 'underlay'],
    minHold: 0,
    maxHold: 30,

    // Under `held`, which scores 1: catching one out of the air should work.
    score: ctx => (ctx.pet.flying ? 0.99 : 0),

    enter(ctx) {
      peak = ctx.pet.y
      ctx.pet.pose.arms = 'flail'
      ctx.pet.pose.mouth = 0.6
    },

    tick(ctx) {
      const { pet } = ctx
      if (!pet.flying) return 'done'
      peak = Math.min(peak, pet.y)
      pet.pose.arms = 'flail'
      // Eyes forward along the arc rather than at the cursor — it has other
      // things on its mind.
      pet.lookAt(pet.x + pet.pose.face * 120, pet.y)
    },

    exit(ctx) {
      const { pet, fx, rng } = ctx
      pet.pose.arms = 'none'
      pet.pose.mouth = 0.12
      fx.emit('dust', pet.x, pet.y, 6, { color: 0x9a8a90, size: 5, life: 0.5, vy: -20 })
      // Only complains if it actually went somewhere. Being set down gently is
      // not an outrage, and having it say "ow" every time you reposition it is
      // exactly the nagging this app is supposed to avoid.
      if (pet.y - peak > 60) {
        ctx.say(say(rng, 'dropped'), 1.4)
        ctx.sfx.croak()
      }
    },
  }
}
