// =============================================================================
// Stained glass.
//
// Dark glass with light coming through it from above, a border of jewel-toned
// panes cut by lead, roundels at the corners, and a ruby to close. The lead is
// what sells it: coloured rectangles without black between them are a colour
// chart, and with it they are a window.
// =============================================================================

import type { Painter } from '../../engine/painter'
import { UI } from '../theme'
import { cornersOf, isSmall, rgba, seeded, weight, within, type Area, type Frame } from './kit'

const LEAD = 0x141318
/** Ruby, sapphire, emerald, amber, amethyst — the five glasses a small window
 *  would actually have been glazed with. */
const JEWELS = [0x9b1b30, 0x1f4fa8, 0x1f7a4a, 0xd08f1c, 0x6a2c8a]

/** Width of the border of panes. */
const band = (a: Area): number => (isSmall(a) ? 5 : 8)

/**
 * The border of panes: runs of coloured glass along each side, each pane lit a
 * little brighter on its inner half, and the lead between them.
 */
function panes(g: Painter, a: Area, alpha: number): void {
  const b = band(a)
  const rnd = seeded(a, 3)
  const min = isSmall(a) ? 9 : 18
  const span = isSmall(a) ? 9 : 16
  const cuts: number[] = []
  // One pass round the perimeter, clockwise, so the colours never repeat at a
  // corner where two sides meet.
  const side = (x0: number, y0: number, len: number, horiz: boolean): void => {
    let at = 0
    while (at < len) {
      const run = Math.min(len - at, min + rnd() * span)
      const col = JEWELS[Math.floor(rnd() * JEWELS.length)]
      const [x, y, w, h] = horiz ? [x0 + at, y0, run, b] : [x0, y0 + at, b, run]
      g.rect(x, y, w, h).fill({ color: col, alpha: 0.9 * alpha })
      g.rect(x + (horiz ? 0 : b / 2), y + (horiz ? b / 2 : 0), horiz ? w : b / 2, horiz ? b / 2 : h)
        .fill({ color: 0xffffff, alpha: 0.12 * alpha })
      at += run
      if (at < len) cuts.push(...(horiz ? [x0 + at, y0, x0 + at, y0 + b] : [x0, y0 + at, x0 + b, y0 + at]))
    }
  }
  side(a.x, a.y, a.w, true)
  side(a.x, a.y + a.h - b, a.w, true)
  side(a.x, a.y + b, a.h - b * 2, false)
  side(a.x + a.w - b, a.y + b, a.h - b * 2, false)
  for (let k = 0; k < cuts.length; k += 4) g.moveTo(cuts[k], cuts[k + 1]).lineTo(cuts[k + 2], cuts[k + 3])
  g.stroke({ width: isSmall(a) ? 1.2 : 2, color: LEAD, alpha })
  // The came between the border and the body.
  g.rect(a.x + b, a.y + b, a.w - b * 2, a.h - b * 2).stroke({ width: isSmall(a) ? 1.4 : 2.2, color: LEAD, alpha })
}

function roundel(g: Painter, cx: number, cy: number, r: number, color: number, alpha: number): void {
  const lit = g.ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r)
  lit.addColorStop(0, rgba(0xffffff, 0.75 * alpha))
  lit.addColorStop(0.35, rgba(color, alpha))
  lit.addColorStop(1, rgba(color, 0.85 * alpha))
  g.circle(cx, cy, r).fill({ color, gradient: lit, alpha })
  g.circle(cx, cy, r).stroke({ width: 1.4, color: LEAD, alpha })
}

export const GLASS: Frame = {
  inset: 1.5,
  reach: 2.5,

  // Light falling through from above, then the border of panes.
  surface(g, trace, a, alpha) {
    within(g, trace, () => {
      const { ctx } = g
      const light = ctx.createRadialGradient(a.x + a.w / 2, a.y, 0, a.x + a.w / 2, a.y, Math.max(a.w, a.h) * 0.9)
      light.addColorStop(0, `rgba(255,228,170,${0.16 * alpha})`)
      light.addColorStop(1, 'rgba(255,228,170,0)')
      ctx.fillStyle = light
      ctx.fillRect(a.x, a.y, a.w, a.h)
      panes(g, a, alpha)
    })
  },

  // Lead round the outside, with a dull sheen along it.
  edge(g, trace, a, alpha) {
    const s = weight(a)
    trace(g)
    g.stroke({ width: 4 * s, color: LEAD, alpha })
    trace(g)
    g.stroke({ width: 1, color: 0x8a8898, alpha: 0.45 * alpha })
  },

  corners(g, a, scale, alpha) {
    const b = band(a)
    for (const [cx, cy] of cornersOf(a, b / 2)) roundel(g, cx, cy, (b / 2 + 1.5) * Math.min(1, scale * 1.6), 0xd08f1c, alpha)
  },

  title(g, text, w, header) {
    g.text(text, 16, header / 2 + 4, { size: 13, color: UI.titleInk, align: 'left' })
    g.moveTo(8, header + 3).lineTo(w - 8, header + 3).stroke({ width: 2.2, color: LEAD })
  },

  close(g, x, y, hot) {
    roundel(g, x - 3, y + 4, 7.5, hot ? 0xc42640 : 0x9b1b30, 1)
    g.text('✕', x - 3, y + 5, { size: 8, color: 0xffe6ea })
  },

  swatch(g, _t, x, y, w, h) {
    const cols = JEWELS
    const step = w / 5
    for (let k = 0; k < 5; k++) {
      g.rect(x + k * step, y, step, 3).fill(cols[k])
      g.rect(x + k * step, y + h - 3, step, 3).fill(cols[(k + 2) % 5])
    }
    g.rect(x + 1, y + 1, w - 2, h - 2).stroke({ width: 2, color: LEAD })
  },
}
