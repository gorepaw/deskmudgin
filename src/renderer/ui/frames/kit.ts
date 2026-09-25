// =============================================================================
// What a frame is, and the small tools every frame is drawn with.
//
// A frame is how a theme draws its edges when a palette and a few switches are
// not enough. Most themes are the plain frame — a dark keyline and an accent
// rule — and differ only in colour. A premium theme brings its own: a border
// with real structure, ornaments at the corners, a title treatment, a close
// control. Every part is optional except the edge, so a frame is only as
// elaborate as its idea needs, and everything that draws chrome (panels, speech
// bubbles, the swatches in Settings) asks the frame rather than knowing any
// theme by name.
// =============================================================================

import type { Painter } from '../../engine/painter'
import type { Theme } from '../theme'
import type { Area, Trace } from '../chrome'

export type { Area, Trace }

export interface Frame {
  /**
   * How far inside a panel's rectangle its border is traced, so the whole
   * stroke lands on the panel. A stroke is centred on its path; traced on the
   * panel's very edge, half of a thick border would be outside and never drawn.
   */
  readonly inset: number
  /** How far a border traced on a shape's outline reaches beyond it — the room
   *  a speech bubble's dirty rect has to leave around itself. */
  readonly reach: number
  /** Texture over the body fill, inside the shape. */
  surface?(g: Painter, trace: Trace, a: Area, alpha: number): void
  edge(g: Painter, trace: Trace, a: Area, alpha: number): void
  /** Ornaments at the four corners of `a`. `scale` is 1 on a panel and smaller
   *  on a bubble, which is a sixth of the size. Ornaments must stay inside `a`:
   *  a panel repaints only its own rectangle, so anything hanging past its edge
   *  would be left behind as a smear when it is dragged. */
  corners?(g: Painter, a: Area, scale: number, alpha: number): void
  /** A panel's title and the rule beneath the header, in panel coordinates. */
  title?(g: Painter, text: string, w: number, header: number): void
  /** The close control, centred on (cx, cy). */
  close?(g: Painter, cx: number, cy: number, hot: boolean): void
  /** The frame's mark on a forty-pixel swatch in Settings. */
  swatch?(g: Painter, t: Theme, x: number, y: number, w: number, h: number): void
}

/** Paint inside the traced shape only, without leaving the clip behind. */
export function within(g: Painter, trace: Trace, paint: () => void): void {
  g.save()
  trace(g)
  g.clip()
  paint()
  g.restore()
}

/**
 * A random sequence fixed by the shape it decorates.
 *
 * Irregular things — stones, drips, a dry brush — have to be the same on every
 * frame or they crawl. Seeding from the area's size means a panel keeps its
 * look for as long as it keeps its size, and two panels of different sizes do
 * not look stamped from one mould. (mulberry32.)
 */
export function seeded(a: Area, salt = 0): () => number {
  let s = (Math.round(a.w) * 7919 + Math.round(a.h) * 104729 + salt * 1299709) >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Seconds, for the few frames that move. Panels are repainted every frame
 * already (their bounds are always in the dirty list), so a slow shimmer costs
 * nothing extra; anything that moves here moves slowly, because a border that
 * draws the eye away from what it frames has failed at being a border.
 */
export const clock = (): number => performance.now() / 1000

/** Whether an area is a speech bubble rather than a panel — small things get
 *  lighter treatment, or a bubble would be mostly decoration. */
export const isSmall = (a: Area): boolean => a.h < 110

/** A border on something small should not be as heavy as one on a panel; a
 *  speech bubble in a six-pixel frame would be mostly frame. */
export const weight = (a: Area): number => Math.max(0.55, Math.min(1, Math.min(a.w, a.h) / 90))

/** A lozenge — a diamond on its points. */
export function lozenge(g: Painter, cx: number, cy: number, r: number): Painter {
  return g.poly([cx, cy - r, cx + r, cy, cx, cy + r, cx - r, cy])
}

/** The four corners of `a`, pulled in by `i`, with the direction pointing back
 *  into the shape along each axis. */
export function cornersOf(a: Area, i: number): [number, number, number, number][] {
  return [
    [a.x + i, a.y + i, 1, 1], [a.x + a.w - i, a.y + i, -1, 1],
    [a.x + i, a.y + a.h - i, 1, -1], [a.x + a.w - i, a.y + a.h - i, -1, -1],
  ]
}

/** `rgba()` from a 0xRRGGBB colour, for gradients — which take CSS strings. */
export function rgba(hex: number, alpha: number): string {
  return `rgba(${(hex >> 16) & 255},${(hex >> 8) & 255},${hex & 255},${alpha})`
}
