// =============================================================================
// A layer is a strategy object, not a branch. Everything that differs between
// "in front of your work" and "behind your icons" — window styles, parenting,
// how the window is positioned, whether the mouse can reach it, what has to be
// watched for — lives inside one of these.
//
// The point is the third one. A taskbar dweller, a per-window tenant, a
// screensaver mode: each is a new file implementing this interface plus one
// entry in the registry. Nothing above the manager, and nothing at all in the
// renderer, learns a new branch.
// =============================================================================

import type { BrowserWindow } from 'electron'
import type { LayerMode } from '../../shared/types'

export interface LayerContext {
  win: BrowserWindow
  /** Native HWND of `win`, decoded once at startup. */
  hwnd: bigint
  /** Union of every display, in DIP. The window is sized to this. */
  virtualBounds: { x: number; y: number; width: number; height: number }
  log(msg: string): void
}

export interface LayerStrategy {
  readonly mode: LayerMode

  /** Take the window into this layer. Called once per switch. */
  enter(ctx: LayerContext): void

  /** Hand the window back in a neutral state the next layer can take over. */
  exit(ctx: LayerContext): void

  /**
   * Watchdog, ~1Hz. Layers that depend on windows owned by other processes use
   * this to notice they went away and re-establish themselves. Overlay does
   * nothing here; underlay does the real work, because explorer.exe restarts
   * and takes the WorkerW with it.
   */
  tick?(ctx: LayerContext): void

  /**
   * Reposition/resize to the virtual desktop. Separate from enter() because
   * displays change while a layer is live, and because underlay cannot use
   * Electron's own setBounds — its coordinates are parent-relative once it has
   * been reparented into the shell.
   */
  layout(ctx: LayerContext): void
}
