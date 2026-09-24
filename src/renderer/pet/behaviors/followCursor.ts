// He noticed you.
//
// Runs in both layers, which is worth a note: he cannot be *clicked* behind
// your icons, but he can still see where your pointer is (main polls the OS and
// pushes it), and a creature that comes over to watch what you are doing is
// most of what makes the desktop layer feel inhabited rather than decorative.
// The distinction is `caps.cursor` versus `caps.click` — this needs only the
// former, so it never has to know what a WorkerW is.

import type { Behavior } from '../brain'
import { clamp } from '../../engine/math'
import { say } from '../lines'

/** Past this he gives up rather than chasing across three monitors. */
const GIVE_UP = 700
/** Closer than this and he stops and looks up instead of shuffling. */
const PERSONAL = 46

export function createFollowCursor(): Behavior {
  return {
    id: 'followCursor',
    layers: ['overlay', 'underlay'],
    minHold: 1.5,
    maxHold: 14,

    score(ctx) {
      const { pet, world } = ctx
      if (pet.asleep || pet.held) return 0
      if (!world.caps.cursor || !world.cursor.inside) return 0
      // Not while he is up an icon — wander's climb-down owns that, and two
      // behaviours competing to move him off the same ledge just stalls him.
      if (pet.surface.kind === 'icon') return 0
      // A pointer that has not moved for a while is somebody who walked away.
      if (world.cursor.idle > 2.5) return 0
      const d = Math.abs(world.cursor.x - pet.x)
      if (d > GIVE_UP) return 0

      // Let whoever is nearest have the cursor. Otherwise every Mudgin on the
      // desktop converges on your pointer at once and they pile into a heap —
      // and the one that was already there gets shoved out of his own moment.
      // Centred on the cursor at his own distance from it: anyone who beats him
      // to it is by definition inside that circle, and nobody outside it can.
      const nearer = ctx.near(world.cursor.x, d).some(o =>
        !o.asleep && Math.abs(world.cursor.x - o.x) < d - 8)
      if (nearer) return 0

      const { social } = pet.needs.needs
      // Lonelier means he comes further and commits harder.
      return clamp(0.3 + (1 - social) * 0.5 + (1 - d / GIVE_UP) * 0.25)
    },

    enter(ctx) {
      if (ctx.rng.chance(0.4)) ctx.say(say(ctx.rng, 'lonely'), 1.6)
    },

    tick(ctx) {
      const { pet, world } = ctx
      const c = world.cursor
      pet.lookAt(c.x, c.y)

      const d = Math.abs(c.x - pet.x)
      if (d > GIVE_UP) return 'done'

      if (d > PERSONAL) {
        pet.pose.arms = 'none'
        pet.pose.mouth = 0.3
        pet.moveToward(c.x)
      } else {
        // Arrived. Looks up, waves, and is topped up socially just by being near
        // you — the need is for company, not for clicks.
        pet.pose.arms = 'wave'
        pet.pose.mouth = 0.45 + Math.sin(pet.pose.t * 5) * 0.2
        pet.needs.socialise(ctx.dt * 0.03)
      }
    },

    exit(ctx) { ctx.pet.pose.arms = 'none' },
  }
}
