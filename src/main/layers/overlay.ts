// =============================================================================
// Overlay: the Mudgin in front of everything.
//
// One transparent window stretched across the whole virtual desktop, pinned
// above other applications, and click-through everywhere he is not standing.
// That last part is the entire difficulty of this mode — a topmost window the
// size of your screens that ate clicks would be spyware, not a pet.
//
// The hit region is computed in the renderer (it is the only place that knows
// where he is drawn) and pushed down through `input:setHitRegion`, which flips
// setIgnoreMouseEvents. `forward: true` keeps mousemove events flowing while
// ignoring is on, so the renderer can still see the cursor approach and decide
// to become solid before the click arrives.
// =============================================================================

import type { LayerStrategy, LayerContext } from './LayerStrategy'
import {
  SetParent, GetParent, SetWindowLongPtrW, GetWindowLongPtrW,
  GWL_EXSTYLE, WS_EX_TOOLWINDOW, WS_EX_NOACTIVATE, NULL_HWND, asHandle,
} from '../win32/api'

export class OverlayLayer implements LayerStrategy {
  readonly mode = 'overlay' as const

  enter(ctx: LayerContext): void {
    // Undo any parenting a previous layer did. Doing this before the Electron
    // calls matters: setAlwaysOnTop on a child window is silently ignored.
    if (asHandle(GetParent(ctx.hwnd)) !== NULL_HWND) SetParent(ctx.hwnd, NULL_HWND)

    // WS_EX_NOACTIVATE so clicking him never steals focus from what you were
    // typing in; WS_EX_TOOLWINDOW so he stays out of Alt-Tab. Electron's
    // skipTaskbar covers the taskbar but not the switcher.
    const ex = BigInt(GetWindowLongPtrW(ctx.hwnd, GWL_EXSTYLE))
    SetWindowLongPtrW(ctx.hwnd, GWL_EXSTYLE,
      ex | BigInt(WS_EX_NOACTIVATE) | BigInt(WS_EX_TOOLWINDOW))

    ctx.win.setIgnoreMouseEvents(true, { forward: true })
    // 'screen-saver' is the highest level Electron exposes and the only one
    // that stays above other apps' own topmost windows.
    ctx.win.setAlwaysOnTop(true, 'screen-saver')
    ctx.win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
    this.layout(ctx)
    ctx.win.showInactive()
    ctx.log('overlay: topmost, click-through')
  }

  exit(ctx: LayerContext): void {
    ctx.win.setAlwaysOnTop(false)
    ctx.win.setIgnoreMouseEvents(false)
  }

  layout(ctx: LayerContext): void {
    ctx.win.setBounds(ctx.virtualBounds)
  }
}
