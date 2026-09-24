// =============================================================================
// The canvas, and the reason this app does not cost you a GPU.
//
// The window is the whole virtual desktop — on a two-monitor 4K setup that is
// north of 16 million pixels. Clearing and repainting all of them 30 times a
// second to move a 40px frog would be indefensible, so the stage repaints only
// the union of what changed last frame and what changes this one. Everything
// outside that rect keeps last frame's pixels.
//
// The union with the *previous* rect is the part that is easy to get wrong: he
// has to be erased from where he was, not just drawn where he is, or he smears.
// =============================================================================

export interface Box { x: number; y: number; width: number; height: number }

/**
 * Rect count above which one merged rect beats clipping to all of them.
 *
 * Counts this frame's rects plus last frame's, since both go into the clip. At
 * the old eight-creature cap this was unreachable; with the cap gone it is the
 * thing that keeps a hundred-strong swarm from spending its whole frame budget
 * assembling a clip path.
 */
const MERGE_ABOVE = 48

export const box = (x: number, y: number, w: number, h: number): Box =>
  ({ x, y, width: w, height: h })

export function union(a: Box | null, b: Box | null): Box | null {
  if (!a) return b
  if (!b) return a
  const x = Math.min(a.x, b.x)
  const y = Math.min(a.y, b.y)
  const r = Math.max(a.x + a.width, b.x + b.width)
  const t = Math.max(a.y + a.height, b.y + b.height)
  return { x, y, width: r - x, height: t - y }
}

export const inflate = (b: Box, n: number): Box =>
  ({ x: b.x - n, y: b.y - n, width: b.width + n * 2, height: b.height + n * 2 })

export class Stage {
  readonly ctx: CanvasRenderingContext2D
  private prev: Box[] = []
  /** Set when something global changed and the whole surface must be repainted. */
  private fullNext = true

  constructor(readonly canvas: HTMLCanvasElement) {
    const c = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!c) throw new Error('2d context unavailable')
    this.ctx = c
    this.resize()
  }

  get width(): number { return this.canvas.clientWidth }
  get height(): number { return this.canvas.clientHeight }

  /** Match the backing store to the display. Called on boot and on resize. */
  resize(): void {
    const dpr = window.devicePixelRatio || 1
    const w = Math.max(1, Math.round(window.innerWidth * dpr))
    const h = Math.max(1, Math.round(window.innerHeight * dpr))
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w
      this.canvas.height = h
      this.canvas.style.width = `${window.innerWidth}px`
      this.canvas.style.height = `${window.innerHeight}px`
    }
    // One transform for the lifetime of the surface: everything above draws in
    // CSS pixels and never thinks about device ratio again.
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.invalidate()
  }

  /** Force a full repaint next frame. */
  invalidate(): void { this.fullNext = true }

  /**
   * Clip and clear the regions about to be drawn, run `draw`, and remember them.
   *
   * Takes a list rather than one rect, and does NOT union them. With several
   * Mudgins out, two on opposite monitors would union into the whole virtual
   * desktop — precisely the full-surface repaint this class exists to avoid.
   * A clip path may hold many rectangles, so the cost stays proportional to how
   * many creatures there are, not how far apart they wandered.
   *
   * Last frame's rects are always included: they have to be erased from where
   * they were, or everyone smears.
   */
  paint(current: readonly Box[], draw: () => void): void {
    // Past a certain crowd, individual dirty rects stop paying for themselves.
    //
    // Each creature contributes a rect inflated well past its own body (room
    // for the behaviours that draw around it and for a speech bubble), so a
    // hundred of them produce two hundred heavily overlapping rectangles that
    // between them cover most of the width anyway. Building that clip path and
    // issuing that many clearRects costs more than repainting the lot in one
    // go. Below the threshold the separate rects are still a large win, which
    // is why this is a fallback and not a replacement.
    //
    // What it falls back *to* is their union, not the whole window. Horizontally
    // that union does spread across every monitor, which is exactly what the
    // separate rects exist to avoid — but they live on the floor, so vertically
    // it is a couple of hundred pixels of a thousand-pixel surface, and
    // repainting the whole window throws that four-fifths away.
    //
    // Measured, it changes nothing: 250 out ran at 19.2 fps whole-window and
    // 19.5 fps unioned, 500 at 10.0 and 10.1. At that point the frame is bound
    // behind this function — rasterising and compositing what was drawn — not
    // by how many pixels were cleared, so clearing fewer buys nothing. It is
    // kept because it is less work for the same result and the smaller region
    // is the honest description of what changed; it is documented because the
    // next person to look here for speed should be told this is not where it
    // is, and go and look at the per-creature draw instead.
    const crowded = current.length + this.prev.length > MERGE_ABOVE
    let regions: readonly Box[]
    if (this.fullNext) {
      regions = [box(0, 0, window.innerWidth, window.innerHeight)]
    } else if (crowded) {
      let all: Box | null = null
      for (const r of this.prev) all = union(all, r)
      for (const r of current) all = union(all, r)
      regions = all ? [all] : []
    } else {
      regions = [...this.prev, ...current]
    }
    this.fullNext = false
    this.prev = [...current]
    if (!regions.length) return

    const { ctx } = this
    const clipped: Box[] = []
    for (const r of regions) {
      // Clamp to the surface. A Mudgin dragged past the edge produces a rect
      // partly off-canvas; clipping costs nothing and keeps the numbers sane.
      const x = Math.max(0, Math.floor(r.x))
      const y = Math.max(0, Math.floor(r.y))
      const w = Math.min(window.innerWidth - x, Math.ceil(r.width + (r.x - x)) + 1)
      const h = Math.min(window.innerHeight - y, Math.ceil(r.height + (r.y - y)) + 1)
      if (w > 0 && h > 0) clipped.push({ x, y, width: w, height: h })
    }
    if (!clipped.length) return

    ctx.save()
    ctx.beginPath()
    for (const r of clipped) ctx.rect(r.x, r.y, r.width, r.height)
    ctx.clip()
    // Cleared separately. clearRect ignores the clip path, so clearing one
    // bounding box here would wipe everything between two distant Mudgins.
    for (const r of clipped) ctx.clearRect(r.x, r.y, r.width, r.height)
    draw()
    ctx.restore()
  }
}

/**
 * A frame pacer. requestAnimationFrame runs at the display's rate; a desktop
 * pet has no business rendering at 165Hz, so frames are skipped down to the
 * configured cap. Skipping inside rAF rather than using setInterval keeps the
 * paint aligned to vsync, which is what stops the hop from tearing.
 */
export function pacedLoop(getFps: () => number, frame: (dt: number, now: number) => void): () => void {
  let raf = 0
  let last = performance.now()
  let acc = 0
  let running = true
  const start = last

  const step = (t: number) => {
    if (!running) return
    raf = requestAnimationFrame(step)
    const real = (t - last) / 1000
    last = t
    acc += real
    const target = 1 / Math.max(1, getFps())
    if (acc < target) return
    // A dt clamp, not a catch-up loop. If the machine slept or a game hogged
    // the GPU for ten seconds, he should carry on from here rather than
    // simulate ten seconds of hopping in one frame.
    const dt = Math.min(acc, 0.1)
    acc = 0
    frame(dt, (t - start) / 1000)
  }

  raf = requestAnimationFrame(step)
  return () => { running = false; cancelAnimationFrame(raf) }
}
