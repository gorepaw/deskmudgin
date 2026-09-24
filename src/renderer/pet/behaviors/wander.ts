// Going somewhere for no reason. The default activity of a creature with
// energy and nothing pressing, and the thing that makes him feel alive rather
// than parked.

import type { Behavior } from '../brain'
import type { Surface } from '../../world/world'
import type { Pet } from '../pet'

export function createWander(): Behavior {
  let target = 0
  let surface: Surface | null = null
  /** This trip is a climb down off an icon rather than a stroll along a floor. */
  let descend = false
  /** Clock time (BehaviorCtx.now) before which he has no interest in going anywhere. */
  let restUntil = 0

  return {
    id: 'wander',
    layers: ['overlay', 'underlay'],
    minHold: 1.5,
    maxHold: 10,

    score(ctx) {
      const { energy } = ctx.pet.needs.needs
      if (ctx.pet.asleep) return 0

      // Standing on an icon with nothing left to chew. Getting down is the only
      // way off — chewIcon leaps him up there but nothing brings him back — so
      // this outranks idle and a sated chewIcon, and deliberately ignores the
      // rest timer below. A resting wander plus a finished chew used to mean
      // nobody wanted to move at all, and he would sit on the same icon
      // indefinitely.
      if (ctx.pet.surface.kind === 'icon') return 0.55

      // A rest between trips. Without it wander outscores idle permanently while
      // he has any energy at all, and he hops without pause from launch to
      // shutdown — which measures as ~2.4 hops a second, and reads as a creature
      // in distress rather than one pottering about. The pauses are what make the
      // movement mean anything.
      if (ctx.now < restUntil) return 0
      // Wants energy to spare and a decent mood. A miserable exhausted Mudgin
      // does not go for a walk.
      return 0.2 + energy * 0.25 + ctx.pet.needs.mood * 0.1
    },

    enter(ctx) {
      const { pet, world, rng } = ctx
      surface = pet.surface
      descend = surface.kind === 'icon'
      if (descend) {
        // Jump toward open floor. Icons live in columns at the left edge, so a
        // blind coin-flip sends him into the wall half the time — where he lands
        // clamped against x=8 having visibly gone nowhere.
        const dir = pet.x < 300 ? 1 : pet.x > world.width - 300 ? -1 : (rng.chance(0.5) ? 1 : -1)
        target = pet.x + rng.range(90, 260) * dir
        return
      }
      // Bias toward a real journey rather than a shuffle: short trips look like
      // indecision, and he already has idle for that.
      const reach = rng.range(120, 460) * (rng.chance(0.5) ? 1 : -1)
      target = world.clampToSurface(surface, pet.x + reach)

      // Give anyone already standing there a wide berth. Without this several
      // Mudgins converge on the same stretch of floor and overlap into one
      // purple smear — they read as a crowd only if they keep their distance.
      //
      // Asked around the target, not around him: the crowding that matters is
      // where he is going. Of whoever is there he dodges the *closest*, which
      // is both the one he would actually land on and the only choice that does
      // not depend on what order the colony happens to be stored in — in a heap
      // there are several to pick from, and picking by position keeps two pets
      // making the same decision from making it differently.
      let closest: Pet | null = null
      for (const other of ctx.near(target, PERSONAL_SPACE)) {
        if (!closest || Math.abs(other.x - target) < Math.abs(closest.x - target)) closest = other
      }
      if (closest) {
        target = world.clampToSurface(
          surface,
          closest.x + PERSONAL_SPACE * 1.5 * Math.sign(target - closest.x || 1),
        )
      }
    },

    tick(ctx) {
      const { pet, world } = ctx
      pet.pose.arms = 'none'
      pet.pose.mouth = 0.12

      if (descend) {
        if (!pet.grounded) return
        // Test for arrival BEFORE leaping again. The other order cannot ever
        // succeed: leapTo puts him in the air, so a `grounded` check on the next
        // line is false by construction and he re-leaps on every landing,
        // forever. Down is down — anything that is not another icon will do.
        if (pet.surface.kind !== 'icon') return 'done'
        // Probe from just below his feet, so this always finds a ledge *under*
        // him — otherwise "get off the icon" can pick the top of the column.
        pet.leapTo(target, world, pet.y + 4)
        return
      }

      const dx = target - pet.x
      if (Math.abs(dx) < 12) return 'done'

      pet.lookAt(target, pet.y - 20)
      pet.moveToward(target)

      // The ledge moved out from under him — an icon was dragged away, or a
      // monitor was unplugged. Re-pick rather than hopping at a target that is
      // no longer reachable.
      if (surface && pet.surface !== surface && pet.grounded) return 'done'
    },

    exit(ctx) {
      surface = null
      // A climb down is a means, not an outing — it should not buy him a sit.
      if (!descend) restUntil = ctx.now + ctx.rng.range(3, 14)
      descend = false
    },
  }
}

/** How much room a Mudgin likes to have to himself, in DIP. */
const PERSONAL_SPACE = 46
