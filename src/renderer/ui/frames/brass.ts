// =============================================================================
// Brass and rivets.
//
// A walnut panel in a banded brass frame, riveted at the corners and along the
// sides, an engraved nameplate for a title and a gear to close. Brass is a
// gradient running top to bottom — light caught on the upper lip, shadow in the
// channel — with a raised bead down its middle, which is what makes it read as
// a moulding rather than a yellow line.
// =============================================================================

import type { Painter } from '../../engine/painter'
import { cornersOf, isSmall, seeded, weight, type Frame } from './kit'

const SHADOW = 0x140b04

function brass(g: Painter, y0: number, y1: number, bright = 1): CanvasGradient {
  const s = g.ctx.createLinearGradient(0, y0, 0, y1)
  const k = bright
  s.addColorStop(0, `rgba(${240 * k | 0},${207 * k | 0},${122 * k | 0},1)`)
  s.addColorStop(0.3, '#b8862f')
  s.addColorStop(0.5, '#7a5418')
  s.addColorStop(0.72, '#c99a42')
  s.addColorStop(1, '#6a4612')
  return s
}

function rivet(g: Painter, cx: number, cy: number, r: number, alpha: number): void {
  const lit = g.ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.4, 0, cx, cy, r)
  lit.addColorStop(0, `rgba(255,242,192,${alpha})`)
  lit.addColorStop(0.45, `rgba(168,122,42,${alpha})`)
  lit.addColorStop(1, `rgba(74,48,12,${alpha})`)
  g.circle(cx, cy, r).fill({ color: 0, gradient: lit, alpha })
  g.circle(cx, cy, r).stroke({ width: 0.7, color: SHADOW, alpha: 0.8 * alpha })
}

/** Where rivets go along a side: evenly, about every seventy pixels, never
 *  crowding a corner rivet. */
function along(len: number): number[] {
  const n = Math.max(0, Math.round(len / 70) - 1)
  return Array.from({ length: n }, (_, k) => (len * (k + 1)) / (n + 1))
}

export const BRASS: Frame = {
  inset: 5,
  reach: 4.5,

  // Walnut grain: long, slightly wandering lines, darker than the wood with a
  // few lighter ones between.
  surface(g, trace, a, alpha) {
    g.save()
    trace(g)
    g.clip()
    const rnd = seeded(a, 11)
    const gap = isSmall(a) ? 6 : 9
    for (let y = a.y + rnd() * gap; y < a.y + a.h; y += gap * (0.7 + rnd() * 0.6)) {
      g.moveTo(a.x, y)
      for (let x = a.x; x < a.x + a.w; x += 60) {
        g.quadTo(x + 30, y + (rnd() - 0.5) * 3, x + 60, y + (rnd() - 0.5) * 2)
      }
      const light = rnd() < 0.25
      g.stroke({ width: 1, color: light ? 0xffe0b0 : 0x000000, alpha: (light ? 0.05 : 0.14) * alpha })
    }
    g.restore()
  },

  edge(g, trace, a, alpha) {
    const s = weight(a)
    trace(g)
    g.stroke({ width: 9 * s, color: SHADOW, alpha: 0.75 * alpha })
    trace(g)
    g.stroke({ width: 7 * s, color: 0, gradient: brass(g, a.y, a.y + Math.min(a.h, 40)), alpha })
    trace(g)
    g.stroke({ width: 1.1 * s, color: 0xffeec0, alpha: 0.45 * alpha })
  },

  // Rivets on the band: at every corner, and along the sides of a panel.
  corners(g, a, scale, alpha) {
    const small = scale < 1
    const i = small ? 1.5 : 5
    const r = small ? 1.7 : 2.8
    for (const [cx, cy] of cornersOf(a, i)) rivet(g, cx, cy, r, alpha)
    if (small) return
    for (const d of along(a.w - i * 2)) {
      rivet(g, a.x + i + d, a.y + i, r * 0.85, alpha)
      rivet(g, a.x + i + d, a.y + a.h - i, r * 0.85, alpha)
    }
    for (const d of along(a.h - i * 2)) {
      rivet(g, a.x + i, a.y + i + d, r * 0.85, alpha)
      rivet(g, a.x + a.w - i, a.y + i + d, r * 0.85, alpha)
    }
  },

  // An engraved nameplate: brass, riveted at both ends, the title cut into it.
  title(g, text, w, header) {
    const tw = g.measure(text, 13)
    const x = 14
    const y = 8
    const pw = tw + 26
    const ph = header - 7
    g.roundRect(x, y, pw, ph, 2).fill({ color: 0, gradient: brass(g, y, y + ph, 1.05) })
    g.roundRect(x + 0.5, y + 0.5, pw - 1, ph - 1, 2).stroke({ width: 1, color: SHADOW, alpha: 0.8 })
    rivet(g, x + 6, y + ph / 2, 1.8, 1)
    rivet(g, x + pw - 6, y + ph / 2, 1.8, 1)
    g.text(text, x + 13, y + ph / 2 + 2, { size: 13, color: 0xffe8b0, align: 'left', alpha: 0.45 })
    g.text(text, x + 13, y + ph / 2 + 1, { size: 13, color: 0x2a1a08, align: 'left' })
    g.moveTo(10, header + 5).lineTo(w - 10, header + 5)
      .stroke({ width: 2, color: 0, gradient: brass(g, header + 4, header + 6) })
  },

  // A gear, with the cross engraved at its hub.
  close(g, x, y, hot) {
    const cx = x - 4
    const cy = y + 5
    const teeth = 10
    const pts: number[] = []
    for (let k = 0; k < teeth * 2; k++) {
      const r = k % 2 ? 6.4 : 8.4
      const t0 = (k / (teeth * 2)) * Math.PI * 2
      for (const dt of [-0.12, 0.12]) pts.push(cx + Math.cos(t0 + dt) * r, cy + Math.sin(t0 + dt) * r)
    }
    g.poly(pts).fill({ color: 0, gradient: brass(g, cy - 8, cy + 8, hot ? 1.1 : 1) })
    g.poly(pts).stroke({ width: 0.8, color: SHADOW, alpha: 0.9 })
    g.circle(cx, cy, 3.6).fill({ color: SHADOW, alpha: 0.35 })
    g.text('✕', cx, cy + 1, { size: 7, color: hot ? 0x000000 : 0x2a1a08 })
  },

  swatch(g, _t, x, y, w, h) {
    g.rect(x + 2, y + 2, w - 4, h - 4).stroke({ width: 3.5, color: 0, gradient: brass(g, y, y + 10) })
    for (const [cx, cy] of cornersOf({ x, y, w, h }, 2.5)) g.circle(cx, cy, 1.6).fill(0xf0cf7a)
  },
}
