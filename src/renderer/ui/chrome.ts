// =============================================================================
// The chrome a theme puts around things: body, border, surface and glass.
//
// Panels and speech bubbles are drawn through the same few calls, so a theme is
// one look rather than a look for menus and an afterthought for everything
// else — an Aqua bubble has pinstripes because an Aqua panel does, and a new
// kind of border lands on both at once.
//
// Every call takes a `trace`: a function that lays the outline onto the open
// path. A panel's is a rounded rect; a bubble's runs round its tail. The chrome
// never needs to know which, so the shape and the look vary independently.
// =============================================================================

import type { Painter } from '../engine/painter'
import { UI } from './theme'
import { frameOf, type Frame } from './frames'

/** The current theme's frame. Read per call, like everything else in UI, so a
 *  theme change needs nothing invalidated. */
export const frame = (): Frame => frameOf(UI)

/** Lays an outline onto the painter's open path, and nothing else. */
export type Trace = (g: Painter) => void

/** The area a texture has to cover; the trace clips it to the real shape. */
export interface Area { x: number; y: number; w: number; h: number }

/** Paint inside the shape only, without leaving the clip behind. */
function within(g: Painter, trace: Trace, paint: () => void): void {
  g.save()
  trace(g)
  g.clip()
  paint()
  g.restore()
}

/** Hairlines every `step` pixels, as one path: a texture of forty separate
 *  strokes per panel per frame is forty times the work for the same pixels. */
function lines(g: Painter, a: Area, step: number, from: number, alpha: number): void {
  for (let y = a.y + from; y < a.y + a.h; y += step) {
    g.moveTo(a.x, y + 0.5).lineTo(a.x + a.w, y + 0.5)
  }
  g.stroke({ width: 1, color: 0x000000, alpha })
}

/**
 * The body: the theme's fill, and whatever texture its surface has.
 *
 * `alpha` scales everything, so a bubble can fade in and out through its own
 * chrome instead of drawing it at full strength and hoping.
 */
export function body(g: Painter, trace: Trace, a: Area, alpha = 1): void {
  trace(g)
  g.fill({ color: UI.fill, alpha: UI.bodyAlpha * alpha })
  // Aqua's brushed stripes: a hairline every four pixels, barely there. Any
  // stronger and text sitting on them becomes hard to read.
  if (UI.pinstripe) within(g, trace, () => lines(g, a, 4, 2, 0.045 * alpha))
  frame().surface?.(g, trace, a, alpha)
}

/** The border, in whatever form the theme's frame gives it. `a` is the area
 *  the border surrounds, for frames whose strokes are gradients across it. */
export function edge(g: Painter, trace: Trace, a: Area, alpha = 1): void {
  frame().edge(g, trace, a, alpha)
}

/** Ornaments at the corners of `a`, for frames that have them. */
export function corners(g: Painter, a: Area, scale = 1, alpha = 1): void {
  frame().corners?.(g, a, scale, alpha)
}

/**
 * Light falling on the top half, for themes whose surfaces are glossy. The
 * same sheen Aqua's lozenge buttons carry, gentler, since here it lies under
 * text rather than beside it.
 */
export function sheen(g: Painter, trace: Trace, a: Area, alpha = 1): void {
  if (!UI.gloss) return
  within(g, trace, () => {
    const { ctx } = g
    const s = ctx.createLinearGradient(0, a.y, 0, a.y + a.h)
    s.addColorStop(0, `rgba(255,255,255,${0.5 * alpha})`)
    s.addColorStop(0.45, `rgba(255,255,255,${0.1 * alpha})`)
    s.addColorStop(0.5, 'rgba(255,255,255,0)')
    ctx.fillStyle = s
    ctx.fillRect(a.x, a.y, a.w, a.h)
  })
}

/** A band of accent across the top — the caption bar, for a shape too small
 *  to carry a title. Clipped to the outline, so rounded corners stay rounded. */
export function band(g: Painter, trace: Trace, a: Area, height: number, alpha = 1): void {
  if (!UI.titleBar) return
  within(g, trace, () => g.rect(a.x, a.y, a.w, height).fill({ color: UI.accent, alpha }))
}

/**
 * Anything that sits on the glass rather than in the picture, drawn last:
 * a phosphor tube's scanlines, every third row.
 */
export function glass(g: Painter, trace: Trace, a: Area, alpha = 1): void {
  if (UI.scanlines) within(g, trace, () => lines(g, a, 3, 0, 0.3 * alpha))
}
