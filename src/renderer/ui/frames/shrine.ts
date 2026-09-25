// =============================================================================
// Bog shrine.
//
// The one frame that belongs to the animals rather than to some other
// interface. Mottled stone in a rough stone rim, moss growing along the top and
// dripping from it, a glow round the inside the colour of a Mudgin's eye that
// breathes slowly, and the eye itself to close — its pupil is the cross.
// =============================================================================

import type { Painter } from '../../engine/painter'
import { PAL } from '../../art/palette'
import { UI } from '../theme'
import { clock, cornersOf, isSmall, rgba, seeded, weight, within, type Area, type Frame } from './kit'

const DARK = 0x0f120d
const MOSS = [0x3d5520, 0x4f6b2a, 0x6a8a34]

function stone(g: Painter, a: Area): CanvasGradient {
  const s = g.ctx.createLinearGradient(a.x, a.y, a.x + a.w, a.y + a.h)
  s.addColorStop(0, '#6b7361')
  s.addColorStop(0.3, '#454c3e')
  s.addColorStop(0.55, '#5f6755')
  s.addColorStop(0.8, '#3f463a')
  s.addColorStop(1, '#5a6250')
  return s
}

/** The breath: a slow swell and fade, about five seconds round. */
const breath = (): number => 0.5 + 0.5 * Math.sin(clock() * 1.25)

export const SHRINE: Frame = {
  inset: 4,
  reach: 4,

  // Stone mottling, then the eye-glow breathing round the inside of the rim.
  surface(g, trace, a, alpha) {
    within(g, trace, () => {
      const { ctx } = g
      const rnd = seeded(a, 5)
      const n = isSmall(a) ? 3 : 9
      for (let k = 0; k < n; k++) {
        const cx = a.x + rnd() * a.w
        const cy = a.y + rnd() * a.h
        const r = (isSmall(a) ? 10 : 30) + rnd() * (isSmall(a) ? 14 : 60)
        const dark = rnd() < 0.6
        const m = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        m.addColorStop(0, dark ? `rgba(0,0,0,${0.16 * alpha})` : `rgba(230,240,200,${0.05 * alpha})`)
        m.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = m
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
      }
      trace(g)
      g.stroke({ width: (isSmall(a) ? 8 : 16) * weight(a), color: PAL.eye, alpha: (0.05 + 0.07 * breath()) * alpha })
    })
  },

  // A rough stone rim, moss along the top, and drips hanging from it.
  edge(g, trace, a, alpha) {
    const s = weight(a)
    trace(g)
    g.stroke({ width: 8 * s, color: DARK, alpha: 0.8 * alpha })
    trace(g)
    g.stroke({ width: 5 * s, color: 0, gradient: stone(g, a), alpha })

    const rnd = seeded(a, 9)
    const small = isSmall(a)
    const top = small ? a.y : a.y + 4
    // Moss in patches, not a hedge: most of the rim is bare stone.
    for (let x = a.x + 10; x < a.x + a.w - 10; x += 4 + rnd() * 5) {
      if (Math.sin(x * 0.045 + a.w) < 0.1) continue
      const r = (small ? 1 : 1.6) + rnd() * (small ? 1.2 : 1.8)
      g.circle(x, top + (rnd() - 0.4) * 2.5, r).fill({ color: MOSS[Math.floor(rnd() * 3)], alpha: 0.95 * alpha })
    }
    // Drips: on a panel, clear of the title on the left; on a bubble, one or two.
    const drips = small ? 1 + Math.floor(rnd() * 2) : 3 + Math.floor(rnd() * 3)
    for (let k = 0; k < drips; k++) {
      const x = small ? a.x + a.w * (0.25 + rnd() * 0.5) : a.x + a.w * (0.45 + rnd() * 0.42)
      const len = small ? 3 + rnd() * 3 : 7 + rnd() * 11
      const w = small ? 1.4 : 2.2
      const col = MOSS[1 + Math.floor(rnd() * 2)]
      g.moveTo(x - w, top).quadTo(x - w * 0.4, top + len * 0.6, x, top + len)
        .quadTo(x + w * 0.4, top + len * 0.6, x + w, top).close()
        .fill({ color: col, alpha: 0.9 * alpha })
      g.circle(x, top + len, w * 0.95).fill({ color: col, alpha: 0.9 * alpha })
      g.circle(x - w * 0.3, top + len - w * 0.3, w * 0.3).fill({ color: 0xe8f0c0, alpha: 0.5 * alpha })
    }
  },

  // Tufts of moss in the corners, clear of the rim.
  corners(g, a, scale, alpha) {
    const rnd = seeded(a, 13)
    for (const [cx, cy, dx, dy] of cornersOf(a, 6 * scale)) {
      for (let k = 0; k < 6; k++) {
        const r = (1.2 + rnd() * 1.8) * scale
        g.circle(cx + dx * rnd() * 5 * scale, cy + dy * rnd() * 5 * scale, r)
          .fill({ color: MOSS[Math.floor(rnd() * 3)], alpha })
      }
    }
  },

  // Cut into the stone: the title with a shadow above it, and a groove below.
  title(g, text, w, header) {
    g.text(text, 16, header / 2 + 3, { size: 14, color: DARK, align: 'left', alpha: 0.9 })
    g.text(text, 16, header / 2 + 4, { size: 14, color: UI.titleInk, align: 'left' })
    g.moveTo(10, header + 3).lineTo(w - 10, header + 3).stroke({ width: 2, color: DARK, alpha: 0.7 })
    g.moveTo(10, header + 4.5).lineTo(w - 10, header + 4.5).stroke({ width: 1, color: 0x6b7361, alpha: 0.7 })
  },

  // The eye. It glows brighter when you are about to close it.
  close(g, x, y, hot) {
    const cx = x - 3
    const cy = y + 5
    const glow = g.ctx.createRadialGradient(cx, cy, 3, cx, cy, 11)
    glow.addColorStop(0, rgba(PAL.eye, (hot ? 0.6 : 0.3) + 0.15 * breath()))
    glow.addColorStop(1, rgba(PAL.eye, 0))
    g.circle(cx, cy, 11).fill({ color: 0, gradient: glow })
    const iris = g.ctx.createRadialGradient(cx - 1.5, cy - 1.5, 0.5, cx, cy, 6.5)
    iris.addColorStop(0, '#f0ffb0')
    iris.addColorStop(0.5, rgba(PAL.eye, 1))
    iris.addColorStop(1, '#6f7e22')
    g.circle(cx, cy, 6.5).fill({ color: 0, gradient: iris })
    g.circle(cx, cy, 6.5).stroke({ width: 1, color: DARK, alpha: 0.8 })
    g.text('✕', cx, cy + 1, { size: 8, color: PAL.pupil })
    g.circle(cx + 2.4, cy - 2.6, 1.1).fill({ color: 0xffffff, alpha: 0.8 })
  },

  swatch(g, _t, x, y, w, h) {
    g.roundRect(x + 2, y + 2, w - 4, h - 4, 4).stroke({ width: 3, color: 0x5a6250 })
    for (let k = 0; k < 5; k++) g.circle(x + 6 + k * 5, y + 3, 1.6).fill(MOSS[k % 3])
    g.circle(x + w - 8, y + h - 8, 3).fill(PAL.eye)
  },
}
