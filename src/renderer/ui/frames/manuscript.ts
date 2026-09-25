// =============================================================================
// Illuminated manuscript.
//
// Vellum, a gilded double rule, fleurons at the corners, a rubricated initial
// on every title and a wax seal to close. The gold is the whole effect: flat
// yellow reads as a highlighter, so the gilding is a gradient with bright and
// dark bands, which is what makes leaf look like leaf rather than paint.
// =============================================================================

import type { Painter } from '../../engine/painter'
import { UI } from '../theme'
import { cornersOf, lozenge, weight, type Area, type Frame } from './kit'

/** Burnished gold, banded so it catches light at more than one place along a
 *  rule. Laid diagonally across the area it gilds, so no two edges match. */
function gilt(g: Painter, a: Area): CanvasGradient {
  const s = g.ctx.createLinearGradient(a.x, a.y, a.x + a.w, a.y + a.h)
  s.addColorStop(0, '#7a5212')
  s.addColorStop(0.16, '#e9c865')
  s.addColorStop(0.34, '#a47418')
  s.addColorStop(0.52, '#f5dc86')
  s.addColorStop(0.72, '#99691a')
  s.addColorStop(0.88, '#e2bd5c')
  s.addColorStop(1, '#7f5714')
  return s
}

/** Vermilion — the rubricator's red, for initials, centre points and seals. */
const RUBRIC = 0x9a2a18
const SEPIA = 0x3b2610

export const MANUSCRIPT: Frame = {
  inset: 4,
  reach: 3.5,

  // Foxing: the edges of old vellum darken where hands held it. A radial fall-
  // off rather than a flat tint, so the middle of a panel — where the text is —
  // stays the lightest part of it.
  surface(g, trace, a, alpha) {
    g.save()
    trace(g)
    g.clip()
    const { ctx } = g
    const cx = a.x + a.w / 2
    const cy = a.y + a.h / 2
    const v = ctx.createRadialGradient(cx, cy, Math.min(a.w, a.h) * 0.3, cx, cy, Math.hypot(a.w, a.h) / 2)
    v.addColorStop(0, 'rgba(120,80,20,0)')
    v.addColorStop(1, `rgba(120,80,20,${0.2 * alpha})`)
    ctx.fillStyle = v
    ctx.fillRect(a.x, a.y, a.w, a.h)
    g.restore()
  },

  // The double rule: a dark keyline, a broad band of gilt, and a thin line of
  // vellum down the middle of the band that splits it into two gold rules.
  // Drawn this way — rather than as two traced outlines at different insets —
  // it follows any shape the trace describes, a bubble's tail included.
  edge(g, trace, a, alpha) {
    const s = weight(a)
    trace(g)
    g.stroke({ width: 7 * s, color: SEPIA, alpha: 0.6 * alpha })
    trace(g)
    g.stroke({ width: 5 * s, color: 0, gradient: gilt(g, a), alpha })
    trace(g)
    g.stroke({ width: 1.4 * s, color: UI.fill, alpha })
  },

  // A fleuron on each corner: a gilt lozenge with a vermilion heart, flanked by
  // two points of gold running along the rules.
  corners(g, a, scale, alpha) {
    // Centred far enough in that the whole lozenge is inside the shape.
    const pts = cornersOf(a, 7 * scale)
    const gold = gilt(g, a)
    for (const [cx, cy, dx, dy] of pts) {
      lozenge(g, cx, cy, 6.5 * scale).fill({ color: 0, gradient: gold, alpha })
      lozenge(g, cx, cy, 6.5 * scale).stroke({ width: 1, color: SEPIA, alpha: 0.8 * alpha })
      g.circle(cx, cy, 1.8 * scale).fill({ color: RUBRIC, alpha })
      for (const d of [11, 16]) {
        const r = (d === 11 ? 1.9 : 1.3) * scale
        g.circle(cx + dx * d * scale, cy, r).fill({ color: 0, gradient: gold, alpha })
        g.circle(cx, cy + dy * d * scale, r).fill({ color: 0, gradient: gold, alpha })
      }
    }
  },

  // A rubricated initial: the first letter set in vellum on a vermilion square
  // with a gilt edge, and the rest of the title in the rubric's red beside it.
  // Under the header, a gilt rule broken by a lozenge.
  title(g, text, w, header) {
    // Clear of the border, which runs seven pixels in from the edge.
    const box = 18
    const x = 12
    const y = 8
    const a = { x, y, w: box, h: box }
    g.rect(x, y, box, box).fill(RUBRIC)
    g.rect(x + 0.75, y + 0.75, box - 1.5, box - 1.5).stroke({ width: 1.5, color: 0, gradient: gilt(g, a) })
    g.text(text[0], x + box / 2, y + box / 2 + 1, { size: 15, color: 0xfaf1dc })
    g.text(text.slice(1), x + box + 1, y + box / 2 + 1, { size: 14, color: UI.titleInk, align: 'left' })

    const ry = header + 4
    const rule = { x: 14, y: ry - 2, w: w - 28, h: 4 }
    const gold = gilt(g, rule)
    g.moveTo(14, ry).lineTo(w / 2 - 9, ry).stroke({ width: 1.5, color: 0, gradient: gold })
    g.moveTo(w / 2 + 9, ry).lineTo(w - 14, ry).stroke({ width: 1.5, color: 0, gradient: gold })
    lozenge(g, w / 2, ry, 4).fill({ color: 0, gradient: gold })
    g.circle(w / 2, ry, 1.3).fill(RUBRIC)
  },

  // A wax seal. The edge wobbles because wax pressed by hand does; a perfect
  // circle reads as a button with a red skin.
  close(g, x, y, hot) {
    // Nudged in and down, off the gilt rule it would otherwise sit on.
    const cx = x - 3
    const cy = y + 4
    const pts: number[] = []
    for (let k = 0; k < 18; k++) {
      const t = (k / 18) * Math.PI * 2
      const r = 8.5 - (k % 2) * 0.9 - (k % 5 === 0 ? 0.5 : 0)
      pts.push(cx + Math.cos(t) * r, cy + Math.sin(t) * r)
    }
    g.poly(pts).fill(hot ? 0xb3301c : 0x8e2214)
    g.poly(pts).stroke({ width: 1, color: 0x5a120a, alpha: 0.8 })
    g.circle(cx, cy, 5.4).stroke({ width: 1, color: 0x5a120a, alpha: 0.55 })
    g.circle(cx - 2.5, cy - 3, 2.2).fill({ color: 0xffffff, alpha: 0.18 })
    g.text('✕', cx + 0.5, cy + 1.5, { size: 8, color: 0x4a0e08 })
    g.text('✕', cx, cy + 1, { size: 8, color: 0xe6a58f })
  },

  swatch(g, _t, x, y, w, h) {
    const a = { x, y, w, h }
    g.rect(x + 2.5, y + 2.5, w - 5, h - 5).stroke({ width: 3, color: 0, gradient: gilt(g, a) })
    g.rect(x + 2.5, y + 2.5, w - 5, h - 5).stroke({ width: 0.8, color: _t.fill })
    g.rect(x + 6, y + 6, 6, 6).fill(RUBRIC)
  },
}
