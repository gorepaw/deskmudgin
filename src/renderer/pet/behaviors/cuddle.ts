// =============================================================================
// Every so often, a pet goes and leans on the Matron.
//
// This is the only behaviour that involves anything other than the desktop and
// the pointer, and it is the reason she is worth having on screen rather than
// in a tray icon: she is a place things happen, not a button.
//
// Reach is layer-bound and that is deliberate. `ctx.matron` is only populated
// in the window she is drawn in, so a pet on the desktop layer cannot cuddle a
// Matron standing in front — she is on the other side of your icons, and
// pretending otherwise would have them nuzzling empty air.
// =============================================================================

import type { Behavior } from '../brain'
import { clamp } from '../../engine/math'
import { slow } from '../../../shared/clock'
import { MATRON_ACCENT } from '../../art/matron'

/** How close beside her a pet settles. Just inside her shoulder. */
const NESTLE = 30
/** Arrived, for the purposes of stopping and leaning. */
const ARRIVED = 14
/** How far above a standable surface she may be and still be worth walking to. */
const REACH_DROP = 60
/** Seconds spent leaning before wandering off again. */
const LEAN_MIN = 6
const LEAN_MAX = 16

export function createCuddle(): Behavior {
  /** Clock time before which nobody is interested. Rolled per episode, and
   *  once lazily on the first score so a colony that just booted does not all
   *  troop over to her at the same moment. */
  let waitUntil = -1
  /** 0 travelling, 1 settled. */
  let phase: 0 | 1 = 0
  let leanFor = 0
  let leaned = 0
  /** Which side of her to sit on, so two pets do not stack. */
  let side: -1 | 1 = -1
  let heartAt = 0

  return {
    id: 'cuddle',
    layers: ['overlay', 'underlay'],
    minHold: 4,
    maxHold: 40,

    score(ctx) {
      const m = ctx.matron
      if (!m || ctx.pet.asleep || ctx.pet.held) return 0
      // Each creature has its own dice, so this staggers them by construction.
      if (waitUntil < 0) waitUntil = ctx.now + slow(ctx.rng.range(25, 240))
      if (ctx.now < waitUntil) return 0
      // Not from up an icon. Getting down is wander's job, and two behaviours
      // trying to move him off the same ledge stalls him — the same collision
      // followCursor already sidesteps.
      if (ctx.pet.surface.kind === 'icon') return 0
      // She can be dragged anywhere, including the middle of the screen, and
      // nothing here can climb. Without this a pet walks to the floor directly
      // beneath a Matron parked halfway up the monitor and nuzzles the air.
      if (Math.abs(ctx.world.groundAt(m.x, m.y + 4).y - m.y) > REACH_DROP) return 0
      // She is a comfort, so loneliness is what sends them. Above a resting
      // wander and a sated chew, below the cursor: if you are actually here,
      // you are more interesting than she is.
      const { social } = ctx.pet.needs.needs
      return clamp(0.34 + (1 - social) * 0.34)
    },

    enter(ctx) {
      const m = ctx.matron!
      phase = 0
      leaned = 0
      leanFor = ctx.rng.range(LEAN_MIN, LEAN_MAX)
      // Prefer the side he is already on, then give way to anyone already
      // sitting there — she has two shoulders and there can be eight of them.
      let want: -1 | 1 = ctx.pet.x < m.x ? -1 : 1
      const spotX = (s: number) => m.x + s * (m.halfWidth * 0.55 + NESTLE)
      // Asked about the ground beside *her*, not beside him: he may be right
      // across the desktop and still need to know whether her shoulder is free.
      const taken = (s: number) => ctx.near(spotX(s), NESTLE).length > 0
      if (taken(want) && !taken(-want)) want = -want as -1 | 1
      side = want
    },

    tick(ctx) {
      const m = ctx.matron
      // She can vanish mid-episode: moved to the other layer from a settings
      // panel, or her window released. Nothing to lean on any more.
      if (!m) return 'done'

      const { pet, world } = ctx
      const spot = m.x + side * (m.halfWidth * 0.55 + NESTLE)
      const dx = spot - pet.x

      if (phase === 0) {
        pet.pose.arms = 'none'
        pet.lookAt(m.x, m.y - 70)
        if (Math.abs(dx) > ARRIVED) {
          // Waddlers flop onto their belly for the long half of the trip; a
          // hopper ignores the flag entirely. Either way it is one call.
          pet.moveToward(spot, Math.abs(dx) > 240)
          // She may be on a different ledge than the one he set off from.
          if (pet.grounded && pet.surface.y < m.y - 4 && Math.abs(dx) < 120) {
            pet.leapTo(spot, world, pet.y + 4)
          }
          return
        }
        phase = 1
      }

      // ── Leaning ────────────────────────────────────────────────────────────
      leaned += ctx.dt
      pet.pose.arms = 'tuck'
      // Turned toward her and tipped in, which is the whole of the pose: they
      // have no arms to put round anybody.
      pet.pose.face = -side
      pet.lookAt(m.x, m.y - 84)
      pet.pose.squash = 1 + Math.sin(ctx.now * 1.4) * 0.03
      pet.needs.socialise(ctx.dt * 0.05)
      m.nuzzle(pet.x, pet.y)

      if (ctx.now - heartAt > 2.4 && ctx.rng.chance(ctx.dt * 0.9)) {
        heartAt = ctx.now
        ctx.fx.emit('heart', pet.x, pet.y - 40, 1,
          { color: MATRON_ACCENT, size: 6, vy: -38, life: 1.1 })
      }

      if (leaned >= leanFor) return 'done'
    },

    exit(ctx) {
      ctx.pet.pose.arms = 'none'
      phase = 0
      // A long wait, rolled per episode and never shown. They should be a thing
      // that happens while you are not looking, not a metronome.
      waitUntil = ctx.now + slow(ctx.rng.range(110, 400))
    },
  }
}
