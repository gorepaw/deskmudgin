// =============================================================================
// Ink wash (水墨).
//
// Rice paper with its fibres showing, a border laid down with a dry brush —
// uneven, broken where the brush ran out — distant mountains washed into the
// foot of a panel, a brush stroke under the title, and a red seal. The seal is
// cut with 泥, "mud", which is what a Mudgin is made of; it is decoration, not
// course content, and is the only Chinese in the app that did not come through
// the verification loop (DEVLOG, "Premium themes").
// =============================================================================

import type { Painter } from '../../engine/painter'
import { LANGUAGES } from '../../../shared/lang'
import { UI } from '../theme'
import { isSmall, seeded, weight, within, type Area, type Frame, type Trace } from './kit'

const INK = 0x1d1b18
const SEAL = 0xb3261e
const PAPER = 0xf8f5ec

/** A brush pass: the trace stroked with gaps where the bristles went dry. */
function brush(g: Painter, trace: Trace, width: number, alpha: number, dash: number[], offset: number): void {
  g.ctx.setLineDash(dash)
  g.ctx.lineDashOffset = offset
  trace(g)
  g.stroke({ width, color: INK, alpha })
  g.ctx.setLineDash([])
}

/** A square seal, its edge slightly broken as a stone seal's is. */
function seal(g: Painter, cx: number, cy: number, size: number, glyph: string, color: number, alpha = 1): void {
  const h = size / 2
  const j = size * 0.05
  g.poly([cx - h, cy - h + j, cx - h * 0.2, cy - h, cx + h, cy - h + j * 0.5, cx + h - j, cy + h * 0.3,
    cx + h, cy + h, cx + h * 0.1, cy + h - j, cx - h + j, cy + h, cx - h, cy + h * 0.2])
    .fill({ color, alpha: 0.92 * alpha })
  g.text(glyph, cx, cy + 1, { size: size * 0.66, color: PAPER, alpha, font: glyph === '✕' ? undefined : LANGUAGES.zh.font })
}

/** A ridge line across `a` at `base`, from a few slow waves — the same hills
 *  for as long as the panel keeps its size. */
function ridge(a: Area, base: number, amp: number, salt: number): (x: number) => number {
  const rnd = seeded(a, salt)
  const waves = [0, 1, 2].map(() => ({ f: 0.004 + rnd() * 0.02, p: rnd() * 6.28, m: 0.4 + rnd() }))
  return x => base - amp * waves.reduce((s, w) => s + w.m * (0.5 + 0.5 * Math.sin(x * w.f + w.p)), 0) / waves.length
}

export const INKWASH: Frame = {
  inset: 3.5,
  reach: 3.5,

  // Paper fibres everywhere; on a panel, two ranges of hills washed into the
  // foot of it, faint enough to read text over.
  surface(g, trace, a, alpha) {
    within(g, trace, () => {
      const rnd = seeded(a, 17)
      const n = isSmall(a) ? 6 : Math.round((a.w * a.h) / 2500)
      for (let k = 0; k < n; k++) {
        const x = a.x + rnd() * a.w
        const y = a.y + rnd() * a.h
        const l = 4 + rnd() * 9
        const t = rnd() * Math.PI
        g.moveTo(x, y).quadTo(x + Math.cos(t) * l * 0.5 + 1.5, y + Math.sin(t) * l * 0.5, x + Math.cos(t) * l, y + Math.sin(t) * l)
      }
      g.stroke({ width: 0.6, color: 0x8a7a60, alpha: 0.18 * alpha })
      if (isSmall(a)) return

      const { ctx } = g
      for (const [depth, salt] of [[0.55, 2], [1, 4]] as const) {
        const base = a.y + a.h
        const top = ridge(a, base - a.h * (0.1 + 0.08 * depth), a.h * 0.16, salt)
        g.moveTo(a.x, base)
        for (let x = a.x; x <= a.x + a.w; x += 6) g.lineTo(x, top(x))
        g.lineTo(a.x + a.w, base).close()
        const wash = ctx.createLinearGradient(0, base - a.h * 0.3, 0, base)
        wash.addColorStop(0, `rgba(40,38,34,${0.09 * depth * alpha})`)
        wash.addColorStop(1, 'rgba(40,38,34,0)')
        g.fill({ color: 0, gradient: wash })
      }
    })
  },

  // A soft bleed into the paper, then four passes of a loaded brush, each
  // broken in different places and laid a hair off the last. Where the passes
  // overlap the line is heavy; where only one runs it thins; and because no
  // two gaps coincide the stroke never breaks outright — which is how one line
  // of ink comes to vary in weight along its length.
  edge(g, trace, a, alpha) {
    const s = weight(a)
    const rnd = seeded(a, 23)
    trace(g)
    g.stroke({ width: 7 * s, color: INK, alpha: 0.07 * alpha })
    for (const w of [4.2, 3, 2, 1.2]) {
      const dash = [25 + rnd() * 70, 3 + rnd() * 18, 10 + rnd() * 40, 2 + rnd() * 10]
      g.save().translate((rnd() - 0.5) * 1.2, (rnd() - 0.5) * 1.2)
      brush(g, trace, w * s, (0.45 + rnd() * 0.3) * alpha, dash, rnd() * 100)
      g.restore()
    }
  },

  // The seal, pressed into the foot of a panel. Bubbles are too small for one.
  corners(g, a, scale, alpha) {
    if (scale < 1) return
    seal(g, a.x + a.w - 17, a.y + a.h - 17, 17, '泥', SEAL, alpha)
  },

  // A brush stroke under the title, heavy where the brush landed and trailing
  // off to nothing.
  title(g, text, w, header) {
    g.text(text, 14, header / 2 + 4, { size: 15, color: UI.titleInk, align: 'left' })
    const y = header + 4
    const end = Math.min(w - 14, 14 + w * 0.7)
    g.moveTo(12, y - 1.2)
      .quadTo(12 + (end - 12) * 0.3, y - 2.4, end, y - 0.2)
      .quadTo(12 + (end - 12) * 0.35, y + 1.6, 13, y + 1.8)
      .close().fill({ color: INK, alpha: 0.85 })
  },

  close(g, x, y, hot) {
    seal(g, x - 3, y + 4, 14, '✕', hot ? 0xd8322a : SEAL)
  },

  swatch(g, _t, x, y, w, h) {
    g.rect(x + 2, y + 2, w - 4, h - 4).stroke({ width: 1.8, color: INK, alpha: 0.85 })
    g.rect(x + w - 10, y + h - 10, 6, 6).fill(SEAL)
  },
}
