// =============================================================================
// Owns the current LayerStrategy and the switch between them. The rest of the
// app calls set() and reads mode(); it never touches a strategy directly.
//
// Registering a new layer is the two lines in STRATEGIES.
// =============================================================================

import type { BrowserWindow } from 'electron'
import { screen } from 'electron'
import type { LayerMode } from '../../shared/types'
import type { LayerContext, LayerStrategy } from './LayerStrategy'
import { OverlayLayer } from './overlay'
import { UnderlayLayer } from './underlay'

const STRATEGIES: Record<LayerMode, () => LayerStrategy> = {
  overlay: () => new OverlayLayer(),
  underlay: () => new UnderlayLayer(),
}

/** Union of every display, in DIP — the window is always exactly this. */
export function virtualBounds() {
  const ds = screen.getAllDisplays()
  const x = Math.min(...ds.map(d => d.bounds.x))
  const y = Math.min(...ds.map(d => d.bounds.y))
  const r = Math.max(...ds.map(d => d.bounds.x + d.bounds.width))
  const b = Math.max(...ds.map(d => d.bounds.y + d.bounds.height))
  return { x, y, width: r - x, height: b - y }
}

export class LayerManager {
  private current: LayerStrategy
  private ctx: LayerContext
  private watchdog: NodeJS.Timeout | null = null

  constructor(win: BrowserWindow, initial: LayerMode, log: (m: string) => void) {
    // Decoded once. Electron hands back the HWND as raw bytes; on x64 that is
    // a little-endian u64, and it is stable for the window's lifetime.
    const hwnd = win.getNativeWindowHandle().readBigUInt64LE(0)
    this.ctx = { win, hwnd, virtualBounds: virtualBounds(), log }
    this.current = STRATEGIES[initial]()
    this.current.enter(this.ctx)

    // 1Hz is fast enough that an explorer restart is invisible and slow enough
    // to not show up in a profile.
    this.watchdog = setInterval(() => this.current.tick?.(this.ctx), 1000)
  }

  mode(): LayerMode { return this.current.mode }

  set(mode: LayerMode): LayerMode {
    if (mode === this.current.mode) return mode
    this.current.exit(this.ctx)
    this.current = STRATEGIES[mode]()
    this.ctx.virtualBounds = virtualBounds()
    this.current.enter(this.ctx)
    return mode
  }

  /** Displays were added, removed or rescaled. */
  relayout(): void {
    this.ctx.virtualBounds = virtualBounds()
    this.current.layout(this.ctx)
  }

  dispose(): void {
    if (this.watchdog) clearInterval(this.watchdog)
    this.watchdog = null
    // Unparent on the way out, or the window outlives us inside explorer's tree.
    this.current.exit(this.ctx)
  }
}
