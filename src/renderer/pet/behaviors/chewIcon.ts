// =============================================================================
// The reason the desktop layer exists: he finds a desktop icon, climbs onto it,
// and gnaws.
//
// Nothing is actually harmed. The shell owns those icons and we only ever read
// their rectangles — the chewing is a Mudgin-shaped animation standing in front
// of (well, behind) them, plus crumbs. Deliberately so: a desktop pet that could
// move or delete your files would be a very different program, and not one
// anybody should install.
//
// He is *behind* the icons in this layer, which does most of the work for free:
// his head disappears under the icon he is biting, which reads exactly right.
// =============================================================================

import type { Behavior } from '../brain'
import type { DesktopIcon } from '../../../shared/types'
import { PAL } from '../../art/palette'
import { clamp } from '../../engine/math'
import { aboutIcon, say } from '../lines'

/** Seconds of gnawing per bite. */
const BITE_T = 0.42
/** Bites before he loses interest in one icon. */
const BITES_PER_ICON = 6

/**
 * How far off the icon's centre he stands.
 *
 * Dead centre hides him almost completely — his body is narrower than a desktop
 * icon, so the icon covers everything but a sliver of scalp, and the mode reads
 * as "something is wrong with my wallpaper". Half a body-width to one side puts
 * the icon across his middle while leaving the eye and the snaggle tooth in
 * clear air: still obviously behind your icons, and still obviously a frog.
 */
const GNAW_OFFSET = 20
/** How far he will travel for an icon. Crossing three monitors to reach one is
 *  technically fine and reads as a bug. */
const REACH = 900
/** A generous desktop icon cell, used to widen the who-has-claimed-what query
 *  past the icons themselves. */
const ICON_W = 120

export function createChewIcon(): Behavior {
  let victim: DesktopIcon | null = null
  /** 0 travelling, 1 arrived and chewing. */
  let phase: 0 | 1 = 0
  let chewT = 0
  let bites = 0
  /** Which side of the icon he gnaws from: -1 left, +1 right. */
  let side: -1 | 1 = -1
  /** Clock time (BehaviorCtx.now) before which he has had enough of icons. */
  let restUntil = 0

  return {
    id: 'chewIcon',
    layers: ['underlay'],
    minHold: 3,
    maxHold: 26,

    score(ctx) {
      if (ctx.pet.asleep) return 0
      if (!ctx.world.caps.icons) return 0
      if (ctx.world.icons.length === 0) return 0
      // A pause between icons. Without it he finishes one and immediately scores
      // highest again, so he chews icon after icon without ever doing anything
      // else — and since every icon is in the left couple of columns, "without
      // ever doing anything else" looks exactly like being stuck in the corner.
      if (ctx.now < restUntil) return 0
      const { fullness, energy } = ctx.pet.needs.needs
      // Hunger drives it, but chewing is a pastime as much as a meal — a full
      // Mudgin still gnaws things, he is just less single-minded about it.
      //
      // The numbers matter more than they look. Full, this is 0.22: above idle's
      // 0.18 but well under a wandering 0.53, so he only goes for an icon while
      // wander is resting, which with both cooldowns lands around every twenty or
      // thirty seconds. Hungry it reaches 0.77 and beats everything, so he
      // beelines. Gating it on real hunger instead would fire the headline
      // behaviour about twice a day, because fullness takes six hours to run
      // down. Energy gates it too — chewing is work.
      return clamp(0.22 + (1 - fullness) * 0.55) * clamp(0.3 + energy)
    },

    enter(ctx) {
      const { world, rng, pet } = ctx
      // Picked with a real random index. This used to be `.sort(() => rng.next()
      // - 0.5)`, which is not a shuffle: the comparator is inconsistent, so the
      // sort's own ordering decisions leak through and the result is heavily
      // biased toward the input order. He kept choosing the same icon.
      const near = world.icons.filter(i => Math.abs(i.icon.x - pet.x) < REACH)
      // Leave alone whatever somebody else is already up on. Two Mudgins behind
      // one icon is one Mudgin as far as anyone can see.
      //
      // Only the pets close enough to be standing on one of those icons can
      // have claimed one, and a pet on an icon is over it — so the reach plus
      // an icon's width is the whole of who could matter here.
      const rivals = ctx.near(pet.x, REACH + ICON_W)
      const taken = new Set(rivals.map(o => o.surface.icon?.index).filter(i => i !== undefined))
      const free = near.filter(i => !taken.has(i.index))
      const pool = free.length ? free : near.length ? near : world.icons
      victim = rng.pick(pool)
      // Approach from whichever side he is already on, so the leap does not cross
      // over the icon and land him facing back at it.
      side = pet.x < victim.icon.x + victim.icon.width / 2 ? -1 : 1
      phase = 0
      chewT = 0
      bites = 0
    },

    tick(ctx) {
      const { pet, world, fx, rng } = ctx
      if (!victim) return 'done'

      // The grid moved under him — icons rearranged, or auto-arrange snapped.
      const still = world.icons.find(i => i.index === victim!.index)
      if (!still) return 'done'
      victim = still

      const cx = victim.icon.x + victim.icon.width / 2
      /** Where he actually stands: beside the icon's centre, not behind it. */
      const standX = cx + side * GNAW_OFFSET
      // Taken from the world's own surface list rather than recomputed off the
      // icon rect: the world nudges top-row ledges down so he is not decapitated
      // by the screen edge, and a second copy of that rule here would drift.
      const standY = world.surfaces()
        .find(s => s.kind === 'icon' && s.icon?.index === victim!.index)?.y
        ?? victim.icon.y + victim.icon.height

      if (phase === 0) {
        pet.lookAt(cx, victim.icon.y + victim.icon.height / 2)
        pet.pose.arms = 'reach'
        pet.pose.mouth = 0.25
        // One leap, not a walk. Icon columns are ~100px apart vertically and the
        // nearest is usually most of a screen away, so hopping there would take
        // the whole maxHold and arrive at nothing.
        const arrived = pet.surface.kind === 'icon'
          && pet.surface.icon?.index === victim.index
          && Math.abs(pet.x - standX) < 14
        if (!arrived) {
          if (pet.grounded) pet.leapTo(standX, world, standY)
          return
        }
        phase = 1
        // Face the icon he is about to bite, not the way the leap left him.
        pet.pose.face = -side
        ctx.say(aboutIcon(rng, victim.name), 2)
      }

      // ── Chewing ────────────────────────────────────────────────────────────
      pet.pose.arms = 'reach'
      pet.pose.face = -side
      pet.lookAt(cx, victim.icon.y + victim.icon.height * 0.4)
      chewT += ctx.dt

      // Mouth on a sawtooth rather than a sine: a bite is a fast close and a slow
      // open, and a sine gives you a fish.
      const k = (chewT % BITE_T) / BITE_T
      pet.pose.mouth = k < 0.3 ? 1 - k / 0.3 : (k - 0.3) / 0.7
      // He leans into it.
      pet.pose.squash = 1 + Math.sin(k * Math.PI * 2) * 0.06

      if (chewT >= BITE_T * (bites + 1)) {
        bites++
        ctx.sfx.chomp()
        // Crumbs fall from the icon's bottom edge. Anywhere higher and they spawn
        // behind the icon, where they are drawn and then covered — the one place
        // on screen that is guaranteed invisible in this layer.
        fx.emit('crumb', standX - side * rng.range(2, 18), standY + 2,
          rng.int(2, 4), { color: PAL.crumb, vy: rng.range(-40, 30) })
        // Small. A desktop icon is a snack, not a meal — at 0.05 a bite he went
        // from peckish to stuffed in three icons and then had nothing to do for
        // half an hour.
        pet.needs.feed(0.02)
        pet.stats.iconsChewed++
        if (rng.chance(0.3)) ctx.say(say(rng, 'chew'), 1.2)
        if (bites >= BITES_PER_ICON) return 'done'
      }
    },

    // No drawUnder. An earlier version drew tooth marks onto the icon, which was
    // the whole of its problem: in this layer everything we draw inside an icon's
    // rectangle is painted and then covered by the icon itself. The bite has to
    // read through crumbs and sound, and it does.

    exit(ctx) {
      if (victim && bites > 0) ctx.sfx.happy()
      restUntil = ctx.now + ctx.rng.range(9, 26)
      victim = null
      phase = 0
      ctx.pet.pose.arms = 'none'
      ctx.pet.pose.mouth = 0.12
    },
  }
}
