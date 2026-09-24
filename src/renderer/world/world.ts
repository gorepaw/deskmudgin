// =============================================================================
// The renderer's model of the machine he lives on.
//
// Coordinates: the window is exactly the virtual desktop, so canvas space is
// screen space minus the virtual origin. That origin is negative whenever a
// monitor sits left of or above the primary, so it is never safe to assume it
// is zero — every conversion goes through toCanvas/toScreen.
//
// The world also answers the one question every behaviour asks: "what can I
// stand on near here?" Surfaces are derived per layer — in overlay there is
// only the floor of each monitor, in underlay every desktop icon is also a
// ledge. That derivation is the only place the two modes differ physically;
// behaviours ask for surfaces and stay mode-agnostic.
// =============================================================================

import type { DesktopIcon, LayerCaps, LayerMode, Rect, WorldSnapshot } from '../../shared/types'
import { LAYER_CAPS } from '../../shared/types'
import { MAX_HEIGHT } from '../species'

export interface Surface {
  x0: number
  x1: number
  y: number
  kind: 'floor' | 'icon'
  /** Set on 'icon' surfaces — what he is standing on, and what he can chew. */
  icon?: DesktopIcon
}

export interface Cursor {
  x: number
  y: number
  /** Seconds since the pointer last moved. Large means "nobody is here". */
  idle: number
  inside: boolean
}

export class World {
  snapshot: WorldSnapshot
  /** Icons in canvas space, recomputed whenever the snapshot changes. */
  icons: DesktopIcon[] = []
  cursor: Cursor = { x: 0, y: 0, idle: 999, inside: false }

  private surfaceCache: Surface[] | null = null

  constructor(snap: WorldSnapshot) {
    this.snapshot = snap
    this.apply(snap)
  }

  get layer(): LayerMode { return this.snapshot.layer }
  get caps(): LayerCaps { return LAYER_CAPS[this.snapshot.layer] }
  get width(): number { return this.snapshot.virtualBounds.width }
  get height(): number { return this.snapshot.virtualBounds.height }

  apply(snap: WorldSnapshot): void {
    this.snapshot = snap
    const o = snap.virtualBounds
    this.icons = snap.icons.map(i => ({
      ...i,
      icon: shiftRect(i.icon, -o.x, -o.y),
      bounds: shiftRect(i.bounds, -o.x, -o.y),
    }))
    this.surfaceCache = null
  }

  setIcons(icons: DesktopIcon[]): void {
    this.apply({ ...this.snapshot, icons })
  }

  toCanvas(p: { x: number; y: number }) {
    const o = this.snapshot.virtualBounds
    return { x: p.x - o.x, y: p.y - o.y }
  }

  toScreen(p: { x: number; y: number }) {
    const o = this.snapshot.virtualBounds
    return { x: p.x + o.x, y: p.y + o.y }
  }

  /** The monitor a canvas point falls on, or the primary if it falls off. */
  displayAt(x: number, y: number) {
    const o = this.snapshot.virtualBounds
    const sx = x + o.x, sy = y + o.y
    return this.snapshot.displays.find(d =>
      sx >= d.bounds.x && sx < d.bounds.x + d.bounds.width &&
      sy >= d.bounds.y && sy < d.bounds.y + d.bounds.height)
      ?? this.snapshot.displays.find(d => d.primary)
      ?? this.snapshot.displays[0]
  }

  /**
   * Everything he can stand on. Floors always; icon tops only where the layer
   * can actually see icons, so a behaviour that hops onto one is automatically
   * inert in overlay rather than needing to check the mode itself.
   *
   * Cached because it is asked for several times a frame and only changes when
   * the snapshot does.
   */
  surfaces(): Surface[] {
    if (this.surfaceCache) return this.surfaceCache
    const o = this.snapshot.virtualBounds
    const out: Surface[] = []

    for (const d of this.snapshot.displays) {
      const wa = shiftRect(d.workArea, -o.x, -o.y)
      out.push({ x0: wa.x, x1: wa.x + wa.width, y: wa.y + wa.height, kind: 'floor' })
    }

    if (this.caps.icons) {
      for (const i of this.icons) {
        // The ledge is the icon's *bottom* edge, not its top — he stands behind
        // the icon, not on it. Standing on top would leave him fully visible
        // above the thing he is supposedly chewing; standing behind it puts the
        // icon over his body, so what you see is one eye and a snaggle tooth
        // peering over the top of your Recycle Bin. The occlusion is the joke,
        // and it comes free from being in the layer below.
        //
        // Pushed down far enough that a crown clears the top of the canvas. The
        // first icon row starts a few pixels below the screen edge, and they
        // are taller than an icon is — so behind a top-row icon a head would be
        // sliced off by the screen. Standing a handful of pixels lower is
        // invisible; a decapitated Mudgin is not.
        //
        // Budgeted for the tallest species there is, because the ledge is built
        // before anyone has decided to stand on it.
        out.push({
          x0: i.icon.x, x1: i.icon.x + i.icon.width,
          y: Math.max(i.icon.y + i.icon.height, MAX_HEIGHT + 3), kind: 'icon', icon: i,
        })
      }
    }

    this.surfaceCache = out
    return out
  }

  /**
   * The surface he would land on standing at x, at or below y.
   *
   * Ties break toward the highest candidate, which is what makes a stack of
   * icons behave like steps rather than like one tall wall.
   */
  groundAt(x: number, y: number): Surface {
    let best: Surface | null = null
    for (const s of this.surfaces()) {
      if (x < s.x0 || x > s.x1) continue
      if (s.y < y - 2) continue          // above him: not something he lands on
      if (!best || s.y < best.y) best = s
    }
    return best ?? this.floorFallback(x)
  }

  /** Off the side of every monitor — put him on the primary's floor so a bad
   *  drag or a monitor unplugged mid-hop cannot lose him off-world. */
  private floorFallback(x: number): Surface {
    const d = this.displayAt(x, 0)
    const o = this.snapshot.virtualBounds
    const wa = shiftRect(d.workArea, -o.x, -o.y)
    return { x0: wa.x, x1: wa.x + wa.width, y: wa.y + wa.height, kind: 'floor' }
  }

  /** Horizontal limits of the surface he is currently on, so wander does not
   *  walk him off a ledge he chose to stand on. */
  clampToSurface(s: Surface, x: number, pad = 8): number {
    return Math.max(s.x0 + pad, Math.min(s.x1 - pad, x))
  }

  iconAt(x: number, y: number): DesktopIcon | null {
    for (const i of this.icons) {
      const r = i.icon
      if (x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height) return i
    }
    return null
  }
}

const shiftRect = (r: Rect, dx: number, dy: number): Rect =>
  ({ x: r.x + dx, y: r.y + dy, width: r.width, height: r.height })
