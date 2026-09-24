// =============================================================================
// Canvas-drawn panels: the app's only chrome.
//
// There is no HTML here. The window is a transparent, click-through, desktop-
// sized canvas, and adding DOM to it would mean a second input model, a second
// z-order and a second theme — so the UI is painted with the same Painter the
// creatures are, and hit-tested against the same pointer.
//
// The pattern is immediate-mode with a **retained hit list**: a panel's widget
// helpers draw *and* register a rectangle in the same call, so layout exists in
// exactly one place and cannot drift from what is on screen. Hit tests read the
// list built by the previous frame — at 30fps that is a third of a frame stale,
// and panels only move when you drag them, so nothing is ever tested against a
// rectangle that has moved out from under the pointer.
//
// Solidity is the other half of the contract. The overlay window ignores the
// mouse everywhere except where something wants it, so a panel that is open but
// not under the pointer costs the user nothing — see `hitAny`.
// =============================================================================

import type { MudginBridge } from '../../shared/ipc'
import type { Settings } from '../../shared/types'
import type { Painter } from '../engine/painter'
import { box, union, type Box } from '../engine/stage'

// The live theme. Panels read it at draw time, so switching one takes effect on
// the next frame — see ui/theme.ts.
export { UI, THEMES, applyTheme, DEFAULT_THEME, themeById } from './theme'
import { UI } from './theme'

export const PAD = 12
export const HEADER = 26
export const ROW_H = 30

/** A registered, clickable rectangle. */
interface Hit { id: string; x: number; y: number; w: number; h: number }

/**
 * The hit list for one panel, rebuilt every frame by the widget helpers.
 *
 * Later entries win, which matches painting order: a button drawn on top of a
 * row is the thing you clicked, not the row underneath it.
 */
export class Hits {
  private list: Hit[] = []
  private next: Hit[] = []

  /** Start a fresh frame. The previous frame's list stays queryable until the
   *  new one is complete, so a click arriving mid-draw is never tested against
   *  a half-built layout. */
  begin(): void { this.next = [] }
  end(): void { this.list = this.next }

  add(id: string, x: number, y: number, w: number, h: number): void {
    this.next.push({ id, x, y, w, h })
  }

  at(x: number, y: number): string | null {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const h = this.list[i]
      if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) return h.id
    }
    return null
  }
}

/** What a panel is allowed to do to the world outside itself. */
export interface PanelHost {
  open(p: Panel, at?: { x: number; y: number }): void
  close(p: Panel): void
  closeAll(): void
  readonly bridge: MudginBridge
  /** The live settings. Read on every draw rather than cached in a panel, so a
   *  change made in one panel is visible in another without a refresh path. */
  settings(): Settings
  /** Repaint everything next frame — for changes that move more than a panel. */
  invalidate(): void
}

export interface ButtonOpts {
  disabled?: boolean
  /** Gold fill: the one action a panel is really for. */
  primary?: boolean
  /** Red: releases a pet, and nothing else. */
  danger?: boolean
  /** Drawn checked, for radio and checkbox rows. */
  on?: boolean
  align?: CanvasTextAlign
  size?: number
}

export abstract class Panel {
  /** Stable, and unique per panel *kind*: opening a second Ledger replaces the
   *  first rather than stacking two identical windows. */
  abstract readonly id: string
  abstract readonly title: string
  /** Shown under the title, in dim text. One short line or nothing. */
  readonly subtitle: string = ''
  /**
   * Whether the header carries a close button.
   *
   * Only the first-run starter says no. A panel that cannot be dismissed is
   * usually a bug; a first run with exactly one decision and two answers is the
   * exception, and letting it be closed would leave a new player looking at an
   * empty desktop wondering whether the app had crashed.
   */
  readonly closable: boolean = true

  x = 0
  y = 0
  host!: PanelHost

  protected readonly hits = new Hits()
  /** Pointer in panel-local coordinates, or -1,-1 when it is elsewhere. */
  protected px = -1
  protected py = -1
  private dragDx = 0
  private dragDy = 0
  private dragging = false

  constructor(readonly w: number, readonly h: number) {}

  /** Fetch whatever the panel needs to show. Awaited by the host on open. */
  mount?(): Promise<void> | void
  /** The colony changed under an open panel. */
  refresh?(): void

  bounds(): Box { return box(this.x - 6, this.y - 6, this.w + 12, this.h + 12) }

  contains(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
  }

  // ── Events, in screen/canvas coordinates ───────────────────────────────────

  down(x: number, y: number): void {
    const id = this.hits.at(x - this.x, y - this.y)
    if (id === 'panel:close') { this.host.close(this); return }
    if (id === 'panel:header') {
      this.dragging = true
      this.dragDx = this.x - x
      this.dragDy = this.y - y
      return
    }
    this.onDown(x - this.x, y - this.y, id)
  }

  move(x: number, y: number): void {
    this.px = x - this.x
    this.py = y - this.y
    if (this.dragging) {
      this.x = x + this.dragDx
      this.y = y + this.dragDy
      this.host.invalidate()
      return
    }
    this.onMove(this.px, this.py)
  }

  up(x: number, y: number): void {
    this.dragging = false
    this.onUp(x - this.x, y - this.y, this.hits.at(x - this.x, y - this.y))
  }

  wheel(x: number, y: number, dy: number): void {
    this.onWheel(x - this.x, y - this.y, dy)
  }

  /** The pointer left the panel. */
  blur(): void { this.px = -1; this.py = -1 }

  protected onDown(_x: number, _y: number, _id: string | null): void {}
  protected onMove(_x: number, _y: number): void {}
  protected onUp(_x: number, _y: number, _id: string | null): void {}
  protected onWheel(_x: number, _y: number, _dy: number): void {}

  // ── Drawing ────────────────────────────────────────────────────────────────

  draw(g: Painter, now: number): void {
    this.hits.begin()
    const rad = UI.radius
    g.save().translate(this.x, this.y)

    // Body. Two strokes: a dark one to separate the panel from a light
    // wallpaper, and the accent inside it. On a bright desktop a single accent
    // outline reads as a smudge.
    g.roundRect(0, 0, this.w, this.h, rad).fill({ color: UI.fill, alpha: UI.bodyAlpha })
    if (UI.pinstripe) this.pinstripes(g, rad)
    g.roundRect(0.5, 0.5, this.w - 1, this.h - 1, rad)
      .stroke({ width: 2, color: 0x000000, alpha: 0.5 })
    g.roundRect(0.5, 0.5, this.w - 1, this.h - 1, rad)
      .stroke({ width: UI.border, color: UI.accent, alpha: UI.titleBar ? 0.9 : 0.55 })

    // Header. The whole bar is the drag handle, in every theme.
    this.hits.add('panel:header', 0, 0, this.w - HEADER, HEADER)
    if (UI.titleBar) {
      // A filled caption bar. Drawn as a plain rect over the panel's rounded
      // top: at this radius the corner it clips is a pixel or two, and the
      // alternative is a second rounded-only-at-the-top path.
      g.rect(1, 1, this.w - 2, HEADER - 1).fill(UI.accent)
      g.text(this.title, PAD - 4, HEADER / 2 + 1,
        { size: 12, color: UI.titleInk, align: 'left' })
    } else {
      g.text(this.title, PAD, HEADER / 2 + 1, { size: 13, color: UI.titleInk, align: 'left' })
      g.moveTo(PAD, HEADER).lineTo(this.w - PAD, HEADER)
        .stroke({ width: 1, color: UI.edge, alpha: 0.8 })
    }

    if (this.closable) {
      const cx = this.w - HEADER / 2 - 2
      const hot = this.hits.at(this.px, this.py) === 'panel:close'
      this.hits.add('panel:close', this.w - HEADER - 2, 0, HEADER + 2, HEADER)
      if (UI.titleBar) {
        // The little red box, which is the other half of recognising an XP
        // dialog at a glance.
        g.roundRect(this.w - HEADER + 2, 4, HEADER - 8, HEADER - 9, 2)
          .fill({ color: UI.danger, alpha: hot ? 1 : 0.85 })
        g.text('✕', cx - 1, HEADER / 2, { size: 10, color: 0xffffff })
      } else {
        g.text('✕', cx, HEADER / 2 + 1, { size: 12, color: hot ? UI.highlight : UI.dim })
      }
    }

    let top = HEADER + 8
    if (this.subtitle) {
      g.text(this.subtitle, PAD, top + 6, { size: 10, color: UI.dim, align: 'left' })
      top += 16
    }

    this.body(g, now, top)
    // Over the content, because a tube's lines are on the glass rather than in
    // the picture.
    if (UI.scanlines) this.scanlines(g, rad)
    g.restore()
    this.hits.end()
  }

  /** Aqua's brushed stripes: a hairline every four pixels, barely there. Any
   *  stronger and text sitting on them becomes hard to read. */
  private pinstripes(g: Painter, rad: number): void {
    g.save()
    g.ctx.beginPath()
    g.ctx.roundRect(0, 0, this.w, this.h, rad)
    g.ctx.clip()
    for (let y = 2; y < this.h; y += 4) {
      g.moveTo(0, y + 0.5).lineTo(this.w, y + 0.5)
        .stroke({ width: 1, color: 0x000000, alpha: 0.045 })
    }
    g.restore()
  }

  /** A phosphor tube, seen close up. Every third row, dark, and drawn last. */
  private scanlines(g: Painter, rad: number): void {
    g.save()
    g.ctx.beginPath()
    g.ctx.roundRect(0, 0, this.w, this.h, rad)
    g.ctx.clip()
    for (let y = 0; y < this.h; y += 3) {
      g.moveTo(0, y + 0.5).lineTo(this.w, y + 0.5)
        .stroke({ width: 1, color: 0x000000, alpha: 0.3 })
    }
    g.restore()
  }

  /** Panel contents. `top` is the first free y below the header and subtitle. */
  protected abstract body(g: Painter, now: number, top: number): void

  // ── Widgets ────────────────────────────────────────────────────────────────
  // Each one draws and registers its rectangle in the same call. That is the
  // whole point: there is no second layout pass to fall out of step with.

  protected button(
    g: Painter, id: string, x: number, y: number, w: number, h: number,
    label: string, o: ButtonOpts = {},
  ): void {
    this.hits.add(o.disabled ? `disabled:${id}` : id, x, y, w, h)
    const hot = !o.disabled && this.hits.at(this.px, this.py) === id
    const rad = Math.min(UI.radius, 5)
    const align = o.align ?? 'center'
    const tx = align === 'left' ? x + 10 : x + w / 2

    if (UI.bevel) {
      // A raised control: one grey face, a light edge along the top and left, a
      // dark one along the bottom and right. Colour never carries meaning here
      // — a bevelled theme says "primary" with a heavier border and "danger"
      // with red lettering, because that is what those dialogs actually did.
      g.roundRect(x, y, w, h, rad).fill({ color: hot ? UI.rowHot : UI.row, alpha: o.disabled ? 0.5 : 1 })
      g.moveTo(x + 1, y + h - 1).lineTo(x + 1, y + 1).lineTo(x + w - 1, y + 1)
        .stroke({ width: 1, color: 0xffffff, alpha: o.disabled ? 0.3 : 0.9 })
      g.moveTo(x + 1, y + h - 1).lineTo(x + w - 1, y + h - 1).lineTo(x + w - 1, y + 1)
        .stroke({ width: 1, color: 0x808080, alpha: o.disabled ? 0.3 : 0.9 })
      g.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, rad)
        .stroke({ width: o.primary ? 1.6 : 1, color: o.primary ? UI.accent : UI.edge, alpha: 0.95 })
      g.text(label, tx, y + h / 2 + 1, {
        size: o.size ?? 12, align, alpha: o.disabled ? 0.5 : 1,
        color: o.danger ? UI.danger : UI.text,
      })
      return
    }

    if (UI.gloss) {
      // A lozenge: pill-shaped, lit from above, with a hard highlight across
      // the top half. The gradient is the whole effect — Aqua's buttons are
      // recognisable entirely because light appears to be falling on them.
      const { ctx } = g
      const pill = h / 2
      const base = o.danger ? UI.danger : o.primary ? UI.accent : hot ? UI.rowHot : UI.row
      g.roundRect(x, y, w, h, pill).fill({ color: base, alpha: o.disabled ? 0.4 : 1 })
      g.save()
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, pill)
      ctx.clip()
      const sheen = ctx.createLinearGradient(0, y, 0, y + h)
      sheen.addColorStop(0, `rgba(255,255,255,${o.disabled ? 0.25 : 0.62})`)
      sheen.addColorStop(0.48, 'rgba(255,255,255,0.14)')
      sheen.addColorStop(0.52, 'rgba(0,0,0,0.04)')
      sheen.addColorStop(1, 'rgba(0,0,0,0.14)')
      ctx.fillStyle = sheen
      ctx.fillRect(x, y, w, h)
      g.restore()
      g.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, pill)
        .stroke({ width: UI.border, color: hot ? UI.highlight : UI.edge, alpha: 0.8 })
      g.text(label, tx, y + h / 2 + 1, {
        size: o.size ?? 12, align, alpha: o.disabled ? 0.5 : 1,
        color: o.primary || o.danger ? UI.ink : UI.text,
      })
      return
    }

    // Hover is a change of *colour*, never of opacity.
    //
    // The face used to be drawn at 63% alpha, which works on a dark theme — a
    // dark row over a dark body still reads — and fails completely on a light
    // one, where the row is a shade off the body and the transparency finishes
    // the job. Parchment's buttons were very nearly invisible.
    const face = o.danger ? UI.danger : o.primary ? UI.accent : hot ? UI.rowHot : UI.row
    g.roundRect(x, y, w, h, rad).fill({ color: face, alpha: o.disabled ? 0.35 : 1 })
    g.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, rad)
      .stroke({ width: 1, color: hot ? UI.highlight : UI.edge, alpha: o.disabled ? 0.3 : 0.9 })

    const ink = o.primary || o.danger ? UI.ink : o.disabled ? UI.dim : UI.text
    g.text(label, tx, y + h / 2 + 1,
      { size: o.size ?? 12, color: ink, align, alpha: o.disabled ? 0.6 : 1 })
  }

  /** A full-width option line with a state pip on the left. Radio and checkbox
   *  are the same widget — what differs is who turns the others off. */
  protected option(
    g: Painter, id: string, x: number, y: number, w: number,
    label: string, on: boolean, o: { disabled?: boolean; note?: string } = {},
  ): void {
    this.hits.add(o.disabled ? `disabled:${id}` : id, x, y, w, ROW_H)
    const hot = !o.disabled && this.hits.at(this.px, this.py) === id
    if (hot) g.roundRect(x, y, w, ROW_H, 5).fill({ color: UI.rowHot, alpha: 0.9 })

    const cy = y + ROW_H / 2
    g.circle(x + 13, cy, 6).stroke({ width: 1, color: on ? UI.highlight : UI.edge, alpha: 0.9 })
    if (on) g.circle(x + 13, cy, 3.2).fill({ color: UI.highlight })

    g.text(label, x + 26, cy + 1,
      { size: 12, color: o.disabled ? UI.dim : UI.text, align: 'left', alpha: o.disabled ? 0.6 : 1 })
    if (o.note) g.text(o.note, x + w - 8, cy + 1, { size: 10, color: UI.dim, align: 'right' })
  }

  /** Section rule with a label. */
  protected rule(g: Painter, y: number, w: number, label?: string): void {
    if (label) {
      g.text(label, PAD, y, { size: 10, color: UI.dim, align: 'left' })
      const lx = PAD + g.measure(label, 10) + 8
      g.moveTo(lx, y).lineTo(w - PAD, y).stroke({ width: 1, color: UI.edge, alpha: 0.5 })
    } else {
      g.moveTo(PAD, y).lineTo(w - PAD, y).stroke({ width: 1, color: UI.edge, alpha: 0.5 })
    }
  }

  /**
   * Say something briefly at the foot of the panel — a refusal, usually.
   *
   * Clocked off performance.now() rather than the frame time it is drawn with,
   * because it is set from an event handler that has no frame clock to hand and
   * "two seconds" should mean two seconds regardless of the fps cap.
   */
  protected flash(msg: string): void {
    this.noteMsg = msg
    this.noteAt = performance.now() / 1000
  }

  private noteMsg = ''
  private noteAt = -99

  protected drawNote(g: Painter, y: number): void {
    const age = performance.now() / 1000 - this.noteAt
    if (!this.noteMsg || age > 2.4) return
    g.text(this.noteMsg, this.w / 2, y,
      { size: 10, color: UI.highlight, alpha: Math.min(1, (2.4 - age) / 0.5) })
  }

  /** Trim a string to fit, with an ellipsis. Panels are narrow and pet names
   *  are user-supplied; anything that can overflow is run through this. */
  protected fit(g: Painter, s: string, size: number, maxW: number): string {
    if (g.measure(s, size) <= maxW) return s
    let lo = 0
    let hi = s.length
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (g.measure(`${s.slice(0, mid)}…`, size) <= maxW) lo = mid
      else hi = mid - 1
    }
    return `${s.slice(0, lo)}…`
  }
}

/**
 * The stack of open panels, and the only thing that talks to them.
 *
 * Panels are unique by `id`, so opening the Ledger twice moves the existing one
 * to the front instead of stacking a duplicate. The topmost panel under the
 * pointer gets every event; anything below it is inert, which is the whole of
 * the focus model and is enough for a stack that is never more than two deep.
 */
export class UiLayer implements PanelHost {
  private stack: Panel[] = []
  private grabbed: Panel | null = null
  private dirty = false

  constructor(
    readonly bridge: MudginBridge,
    readonly settings: () => Settings,
    /**
     * The rectangle a panel must stay inside, given roughly where it wants to
     * be: the work area of the monitor under that point, in canvas coordinates.
     *
     * Per-monitor rather than the whole canvas. The canvas is the entire
     * virtual desktop, so clamping to it lets a menu opened at the right-hand
     * edge of one screen straddle the bezel onto the next one — which is where
     * the Matron lives, so it is the normal case rather than the exotic one.
     */
    private viewport: (near?: { x: number; y: number }) => Box,
    /** Told whenever the last panel closes, so an on-demand overlay can go. */
    private onEmpty: () => void,
  ) {}

  get open_(): readonly Panel[] { return this.stack }
  get any(): boolean { return this.stack.length > 0 }
  get top(): Panel | undefined { return this.stack[this.stack.length - 1] }

  /**
   * A button is down on a panel.
   *
   * The window must stay solid for as long as this is true, even once the
   * pointer has left the panel. Only move events are forwarded to a
   * click-through window — a mouseup is not — so a panel dragged faster than it
   * follows would never be released and would stay glued to the pointer.
   */
  get grabbing(): boolean { return this.grabbed !== null }

  invalidate(): void { this.dirty = true }
  /** Read and clear — the frame loop uses it to force a full repaint. */
  takeDirty(): boolean { const d = this.dirty; this.dirty = false; return d }

  open(p: Panel, at?: { x: number; y: number }): void {
    const existing = this.stack.find(o => o.id === p.id)
    if (existing) {
      // Same kind already open: raise it rather than stacking a twin. Its data
      // may be stale if the colony moved on, so it re-mounts.
      this.stack = [...this.stack.filter(o => o !== existing), existing]
      void existing.mount?.()
      this.dirty = true
      return
    }
    p.host = this
    this.place(p, at)
    this.stack.push(p)
    void Promise.resolve(p.mount?.()).then(() => this.invalidate())
    this.dirty = true
  }

  /**
   * Keep a panel wholly on one monitor, near where it was asked for.
   *
   * With an anchor it sits above the point — a menu should rise out of the
   * thing that opened it — and drops below only when there is no room above.
   * Without one it lands in the middle of whichever monitor the conversation
   * is already happening on: the panel that opened it, or the primary.
   */
  private place(p: Panel, at?: { x: number; y: number }): void {
    const top = this.top
    const near = at ?? (top ? { x: top.x + top.w / 2, y: top.y + top.h / 2 } : undefined)
    const v = this.viewport(near)
    const loX = v.x + 8
    const hiX = Math.max(loX, v.x + v.width - p.w - 8)
    const loY = v.y + 8
    const hiY = Math.max(loY, v.y + v.height - p.h - 8)

    const wantX = at ? at.x - p.w / 2 : v.x + (v.width - p.w) / 2
    let wantY = at ? at.y - p.h - 16 : v.y + (v.height - p.h) / 2
    if (at && wantY < loY) wantY = at.y + 16

    p.x = Math.max(loX, Math.min(hiX, wantX))
    p.y = Math.max(loY, Math.min(hiY, wantY))
  }

  close(p: Panel): void {
    this.stack = this.stack.filter(o => o !== p)
    if (this.grabbed === p) this.grabbed = null
    this.dirty = true
    if (!this.stack.length) this.onEmpty()
  }

  closeAll(): void {
    if (!this.stack.length) return
    this.stack = []
    this.grabbed = null
    this.dirty = true
    this.onEmpty()
  }

  /** Everyone should re-read the colony. */
  refreshAll(): void {
    for (const p of this.stack) p.refresh?.()
    this.dirty = true
  }

  /** The panel under this point, topmost first. */
  hitAny(x: number, y: number): Panel | null {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (this.stack[i].contains(x, y)) return this.stack[i]
    }
    return null
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  // Returns true when the event was consumed, so the caller knows not to give
  // it to a creature underneath.

  down(x: number, y: number): boolean {
    const p = this.hitAny(x, y)
    if (!p) return false
    // Raise on click, so a panel opened from another is the one you interact
    // with even if it landed underneath.
    if (p !== this.top) {
      this.stack = [...this.stack.filter(o => o !== p), p]
      this.dirty = true
    }
    this.grabbed = p
    p.down(x, y)
    return true
  }

  move(x: number, y: number): void {
    // A drag keeps the panel it started on, even once the pointer runs off it —
    // otherwise dragging a panel by its header stops the moment you move faster
    // than the panel follows.
    if (this.grabbed) { this.grabbed.move(x, y); return }
    const p = this.hitAny(x, y)
    for (const o of this.stack) if (o !== p) o.blur()
    p?.move(x, y)
  }

  up(x: number, y: number): void {
    const p = this.grabbed
    this.grabbed = null
    p?.up(x, y)
  }

  wheel(x: number, y: number, dy: number): boolean {
    const p = this.hitAny(x, y)
    if (!p) return false
    p.wheel(x, y, dy)
    this.dirty = true
    return true
  }

  draw(g: Painter, now: number): void {
    for (const p of this.stack) p.draw(g, now)
  }

  bounds(): Box[] { return this.stack.map(p => p.bounds()) }

  /** One rect covering every panel — for the invalidate-on-close case, where
   *  what has to be erased is where a panel *was*. */
  hull(): Box | null {
    let b: Box | null = null
    for (const p of this.stack) b = union(b, p.bounds())
    return b
  }
}
