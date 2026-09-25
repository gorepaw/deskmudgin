// =============================================================================
// Holographic.
//
// Dark glass, a border of foil whose colours turn slowly round the panel, the
// red and blue fringes of a lens that is not quite aligned, a sheen that drifts
// across the body, and bracket marks in the corners like a display's crop
// guides. Everything moves, and all of it slowly: at speed it is a screensaver.
// =============================================================================

import type { Painter } from '../../engine/painter'
import { UI } from '../theme'
import { clock, cornersOf, isSmall, weight, within, type Area, type Frame } from './kit'

const CYAN = 0x39e0ff
const MAGENTA = 0xff3fbf

/** Foil: a conic sweep of pastel spectrum, turning once every half minute. */
function foil(g: Painter, a: Area): CanvasGradient {
  const s = g.ctx.createConicGradient(clock() * 0.2, a.x + a.w / 2, a.y + a.h / 2)
  s.addColorStop(0, '#ff8ad8')
  s.addColorStop(0.2, '#8fe3ff')
  s.addColorStop(0.4, '#b8ffcf')
  s.addColorStop(0.6, '#fff29a')
  s.addColorStop(0.8, '#c7a0ff')
  s.addColorStop(1, '#ff8ad8')
  return s
}

export const HOLO: Frame = {
  inset: 4.5,
  reach: 5,

  // A band of iridescence drifting diagonally across the body, and the glass's
  // own highlight along the top.
  surface(g, trace, a, alpha) {
    within(g, trace, () => {
      const { ctx } = g
      const p = (clock() * 0.04) % 1
      const x0 = a.x - a.w + p * a.w * 3
      const s = ctx.createLinearGradient(x0, a.y, x0 + a.w, a.y + a.h)
      s.addColorStop(0, 'rgba(255,120,220,0)')
      s.addColorStop(0.4, `rgba(255,120,220,${0.07 * alpha})`)
      s.addColorStop(0.5, `rgba(120,220,255,${0.09 * alpha})`)
      s.addColorStop(0.6, `rgba(180,255,200,${0.06 * alpha})`)
      s.addColorStop(1, 'rgba(180,255,200,0)')
      ctx.fillStyle = s
      ctx.fillRect(a.x, a.y, a.w, a.h)
      const top = ctx.createLinearGradient(0, a.y, 0, a.y + Math.min(a.h, 80) * 0.5)
      top.addColorStop(0, `rgba(255,255,255,${0.07 * alpha})`)
      top.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = top
      ctx.fillRect(a.x, a.y, a.w, a.h)
    })
  },

  // Glow, then the two misaligned fringes, then the foil line itself.
  edge(g, trace, a, alpha) {
    const s = weight(a)
    const f = foil(g, a)
    trace(g)
    g.stroke({ width: 7 * s, color: 0, gradient: f, alpha: 0.16 * alpha })
    for (const [dx, col] of [[-1.2, CYAN], [1.2, MAGENTA]] as const) {
      g.save().translate(dx, 0)
      trace(g)
      g.stroke({ width: 1.3, color: col, alpha: 0.6 * alpha })
      g.restore()
    }
    trace(g)
    g.stroke({ width: 2 * s, color: 0, gradient: f, alpha })
  },

  // Crop brackets, inside each corner.
  corners(g, a, scale, alpha) {
    const len = (isSmall(a) ? 5 : 11) * Math.max(scale, 0.6)
    for (const [cx, cy, dx, dy] of cornersOf(a, (isSmall(a) ? 3 : 8) * scale)) {
      g.moveTo(cx + dx * len, cy).lineTo(cx, cy).lineTo(cx, cy + dy * len)
      g.stroke({ width: 1.4, color: CYAN, alpha: 0.85 * alpha, cap: 'square' })
      g.rect(cx + dx * 2.5 - 1, cy + dy * 2.5 - 1, 2, 2).fill({ color: MAGENTA, alpha: 0.9 * alpha })
    }
  },

  // The title with its own fringes, and a foil rule.
  title(g, text, w, header) {
    const y = header / 2 + 4
    g.text(text, 17, y, { size: 13, color: MAGENTA, align: 'left', alpha: 0.55 })
    g.text(text, 15, y, { size: 13, color: CYAN, align: 'left', alpha: 0.55 })
    g.text(text, 16, y, { size: 13, color: UI.titleInk, align: 'left' })
    g.moveTo(12, header + 4).lineTo(w - 12, header + 4)
      .stroke({ width: 1, color: 0, gradient: foil(g, { x: 0, y: 0, w, h: header * 2 }) })
  },

  close(g, x, y, hot) {
    const cx = x - 4
    const cy = y + 5
    if (hot) g.circle(cx, cy, 7.5).fill({ color: MAGENTA, alpha: 0.2 })
    g.circle(cx, cy, 7.5).stroke({ width: 1.5, color: 0, gradient: foil(g, { x: cx - 8, y: cy - 8, w: 16, h: 16 }) })
    g.text('✕', cx, cy + 1, { size: 8, color: hot ? 0xffffff : CYAN })
  },

  swatch(g, _t, x, y, w, h) {
    g.roundRect(x + 1.5, y + 1.5, w - 3, h - 3, 5)
      .stroke({ width: 2, color: 0, gradient: foil(g, { x, y, w, h }) })
  },
}
