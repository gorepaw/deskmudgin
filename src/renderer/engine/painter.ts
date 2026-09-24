// =============================================================================
// A Canvas2D surface wearing Pixi's Graphics API.
//
// This exists for one reason: the Mudgin's art already exists, in galanova, as
// chained Pixi calls — `g.circle(x, y, r).fill({ color, alpha })`. Rewriting
// that into Canvas2D's stateful begin/fill idiom by hand would be a hundred
// chances to get a shape subtly wrong, and it would have to happen again for
// every piece of art borrowed from the game later.
//
// So the shim goes the other way: Canvas2D pretends to be Pixi, and the art
// files are copies with the import line changed. It also leaves the door open —
// if he ever needs a real GPU (a hundred particles, a shader), the art does not
// move, only this file does.
//
// The semantics being matched: shape calls accumulate into one path, and
// fill()/stroke() consume it and start fresh. Colours are 0xRRGGBB numbers, as
// in Pixi, not CSS strings.
// =============================================================================

const TAU = Math.PI * 2

export type Paint = number | { color: number; alpha?: number }
export interface StrokeStyle { width: number; color: number; alpha?: number; cap?: CanvasLineCap }

/**
 * The typeface every `text` and `measure` call uses unless told otherwise.
 *
 * Global rather than a parameter because the two must never disagree: `measure`
 * is what `fit()` truncates against, and a mismatch there silently produces
 * labels that overflow or get cut short. One setting, both readers.
 */
let defaultFont = '"IBM Plex Mono", Consolas, monospace'
export const setDefaultFont = (f: string): void => { defaultFont = f }

// Hex→CSS conversion is called several times per shape per frame and always
// with the same handful of palette values.
const cssCache = new Map<number, string>()
export function css(hex: number): string {
  let s = cssCache.get(hex)
  if (s === undefined) {
    s = `#${(hex & 0xffffff).toString(16).padStart(6, '0')}`
    cssCache.set(hex, s)
  }
  return s
}

export class Painter {
  /** Whether a path is currently open and unconsumed. */
  private open = false

  constructor(public ctx: CanvasRenderingContext2D) {}

  private begin(): void {
    if (!this.open) { this.ctx.beginPath(); this.open = true }
  }

  // ── Shapes ─────────────────────────────────────────────────────────────────
  // Every closed shape starts with an explicit moveTo. Canvas connects a new
  // arc to the previous subpath with a straight line otherwise, which is
  // invisible on a fill and a stray hairline on a stroke.

  circle(x: number, y: number, r: number): this {
    this.begin()
    this.ctx.moveTo(x + r, y)
    this.ctx.arc(x, y, Math.max(0, r), 0, TAU)
    return this
  }

  ellipse(x: number, y: number, rx: number, ry: number, rot = 0): this {
    this.begin()
    this.ctx.moveTo(x + rx, y)
    this.ctx.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), rot, 0, TAU)
    return this
  }

  rect(x: number, y: number, w: number, h: number): this {
    this.begin()
    this.ctx.rect(x, y, w, h)
    return this
  }

  roundRect(x: number, y: number, w: number, h: number, r: number): this {
    this.begin()
    this.ctx.roundRect(x, y, w, h, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2))
    return this
  }

  /** Flat [x0,y0, x1,y1, …], auto-closed — Pixi's poly(), not a polyline. */
  poly(pts: readonly number[]): this {
    if (pts.length < 4) return this
    this.begin()
    this.ctx.moveTo(pts[0], pts[1])
    for (let i = 2; i < pts.length - 1; i += 2) this.ctx.lineTo(pts[i], pts[i + 1])
    this.ctx.closePath()
    return this
  }

  moveTo(x: number, y: number): this { this.begin(); this.ctx.moveTo(x, y); return this }
  lineTo(x: number, y: number): this { this.begin(); this.ctx.lineTo(x, y); return this }
  quadTo(cx: number, cy: number, x: number, y: number): this {
    this.begin(); this.ctx.quadraticCurveTo(cx, cy, x, y); return this
  }

  // ── Consumers ──────────────────────────────────────────────────────────────
  fill(paint: Paint): this {
    if (!this.open) return this
    const color = typeof paint === 'number' ? paint : paint.color
    const alpha = typeof paint === 'number' ? 1 : paint.alpha ?? 1
    this.ctx.globalAlpha = alpha
    this.ctx.fillStyle = css(color)
    this.ctx.fill()
    this.ctx.globalAlpha = 1
    this.open = false
    return this
  }

  stroke(s: StrokeStyle): this {
    if (!this.open) return this
    this.ctx.globalAlpha = s.alpha ?? 1
    this.ctx.strokeStyle = css(s.color)
    this.ctx.lineWidth = s.width
    this.ctx.lineCap = s.cap ?? 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.stroke()
    this.ctx.globalAlpha = 1
    this.open = false
    return this
  }

  // ── Transform ──────────────────────────────────────────────────────────────
  // Discipline: save() always pairs with restore(), and neither is allowed while
  // a path is open — a transform applied mid-path would move half a shape.

  save(): this { this.ctx.save(); return this }
  restore(): this { this.ctx.restore(); return this }
  translate(x: number, y: number): this { this.ctx.translate(x, y); return this }
  scale(x: number, y = x): this { this.ctx.scale(x, y); return this }
  rotate(a: number): this { this.ctx.rotate(a); return this }
  alpha(a: number): this { this.ctx.globalAlpha = a; return this }

  // ── Text ───────────────────────────────────────────────────────────────────
  text(
    str: string, x: number, y: number,
    o: { size?: number; color?: number; alpha?: number; align?: CanvasTextAlign; font?: string } = {},
  ): this {
    const { ctx } = this
    ctx.font = `${o.size ?? 12}px ${o.font ?? defaultFont}`
    ctx.textAlign = o.align ?? 'center'
    ctx.textBaseline = 'middle'
    ctx.globalAlpha = o.alpha ?? 1
    ctx.fillStyle = css(o.color ?? 0xe8e8f8)
    ctx.fillText(str, x, y)
    ctx.globalAlpha = 1
    return this
  }

  /** `font` only for text drawn in a font other than the default — the
   *  Chinese line of a speech bubble — so its width is measured in the face it
   *  will actually be drawn in. */
  measure(str: string, size = 12, font?: string): number {
    this.ctx.font = `${size}px ${font ?? defaultFont}`
    return this.ctx.measureText(str).width
  }
}
