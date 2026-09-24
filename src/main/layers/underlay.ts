// =============================================================================
// Underlay: the Mudgin behind your desktop icons, chewing on them.
//
// The window is reparented into the shell's wallpaper-level WorkerW. Above the
// wallpaper, below the icons — so he is genuinely occluded by them, which is
// what sells the mode. It is the same mechanism live-wallpaper apps use.
//
// Three consequences fall out of that, and all three are handled here rather
// than papered over:
//
//   1. The window is now a child. Its coordinates are relative to WorkerW's
//      client area, so Electron's setBounds is wrong from this moment on and
//      every move goes through SetWindowPos with the offset applied.
//   2. Explorer owns the mouse down there. Clicks land on the icon ListView,
//      never on us. LAYER_CAPS.underlay.pointer is false for this reason and
//      interactive behaviours opt out — he is watch-only in this mode.
//   3. Explorer restarts. When it does, WorkerW is destroyed and the window is
//      orphaned or hidden. tick() notices and re-attaches; without it the mode
//      silently dies the first time the shell hiccups.
// =============================================================================

import { screen } from 'electron'
import type { LayerStrategy, LayerContext } from './LayerStrategy'
import {
  SetParent, SetWindowPos, SetWindowLongPtrW, GetWindowLongPtrW, windowRect,
  GWL_EXSTYLE, WS_EX_TOPMOST, WS_EX_TOOLWINDOW, WS_EX_NOACTIVATE,
  SWP_NOACTIVATE, SWP_NOZORDER, SWP_SHOWWINDOW, SWP_FRAMECHANGED,
  SWP_NOMOVE, SWP_NOSIZE, HWND_BOTTOM, GetParent, asHandle,
  NULL_HWND, type Hwnd,
} from '../win32/api'
import { wallpaperWorkerW, progman, defView, alive } from '../win32/shell'

export class UnderlayLayer implements LayerStrategy {
  readonly mode = 'underlay' as const

  private host: Hwnd = NULL_HWND
  /** True once we have warned about the fallback, so the log stays readable. */
  private warned = false

  enter(ctx: LayerContext): void {
    // A topmost child is a contradiction Windows resolves badly — drop the flag
    // before parenting, not after.
    ctx.win.setAlwaysOnTop(false)
    ctx.win.setVisibleOnAllWorkspaces(false)

    const ex = BigInt(GetWindowLongPtrW(ctx.hwnd, GWL_EXSTYLE))
    SetWindowLongPtrW(ctx.hwnd, GWL_EXSTYLE,
      (ex & ~BigInt(WS_EX_TOPMOST)) | BigInt(WS_EX_TOOLWINDOW) | BigInt(WS_EX_NOACTIVATE))

    this.attach(ctx)
    ctx.win.showInactive()
  }

  exit(ctx: LayerContext): void {
    if (this.host !== NULL_HWND) {
      SetParent(ctx.hwnd, NULL_HWND)
      this.host = NULL_HWND
    }
    this.warned = false
  }

  /**
   * Re-establish the parenting if it has lapsed. Idempotent and cheap when
   * nothing is wrong, which is what lets tick() just call it every second.
   */
  private attach(ctx: LayerContext): void {
    if (alive(this.host)) return

    // Two desktop shapes, and which one you get is a property of the Windows
    // build, not something we choose. See win32/shell.ts.
    //   A — a wallpaper-level WorkerW exists. Parenting into it puts us under
    //       the icons automatically, because the icon view is in a different
    //       window entirely.
    //   B — Windows 11's usual shape: no such WorkerW, and the icon view is a
    //       child of Progman. Parenting into Progman makes us a *sibling* of
    //       the icons, and a freshly parented child goes to the top of the
    //       sibling Z-order — i.e. in front of them, which is the opposite of
    //       this whole mode. Hence the explicit push to the bottom below.
    let host = wallpaperWorkerW()
    if (host === NULL_HWND) {
      host = progman()
      if (!this.warned) {
        // ASCII only: this lands in a Windows console, where the code page is
        // usually 437/1252 and an em dash arrives as mojibake.
        ctx.log('underlay: no wallpaper WorkerW (normal on Win11), hosting under Progman')
        this.warned = true
      }
    }
    if (host === NULL_HWND) {
      ctx.log('underlay: shell not ready, will retry')
      return
    }

    SetParent(ctx.hwnd, host)
    this.host = host
    this.layout(ctx)
    this.sink(ctx)
    ctx.log(`underlay: attached to shell window 0x${host.toString(16)}`)
  }

  /**
   * Slot into the one gap in the desktop's Z-order that this mode lives in:
   * below the icons, above the wallpaper.
   *
   * "Bottom" is not that gap. On Windows 11 the wallpaper is painted by a
   * WorkerW that is itself a *child* of Progman, sitting directly beneath
   * SHELLDLL_DefView — so Progman's children run [icons, wallpaper, …]. Sinking
   * to HWND_BOTTOM lands underneath the wallpaper, where the Mudgin is
   * perfectly present, correctly animated, and completely invisible.
   *
   * SetWindowPos's insert-after argument means "place directly below this
   * window", so passing the icon view puts us in exactly the right slot.
   * HWND_BOTTOM stays correct for the other desktop shape, where the icons
   * live in a different top-level window and our host paints nothing itself.
   *
   * Idempotent, which is what lets the watchdog re-assert it every second
   * rather than having to detect being raised.
   */
  private sink(ctx: LayerContext): void {
    const dv = defView()
    const sibling = dv !== NULL_HWND && asHandle(GetParent(dv)) === this.host
    SetWindowPos(ctx.hwnd, sibling ? dv : HWND_BOTTOM, 0, 0, 0, 0,
      SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)
  }

  tick(ctx: LayerContext): void {
    // Explorer restarted, or the shell rebuilt its layers: both show up as a
    // dead host handle.
    if (!alive(this.host)) {
      this.host = NULL_HWND
      this.attach(ctx)
      return
    }
    // Refreshing the desktop (F5, or an icon added) re-orders Progman's
    // children and can lift us in front of the icons. Re-sinking every second
    // costs one no-op call and is the difference between the mode working and
    // the mode working until you press F5.
    this.sink(ctx)
  }

  /**
   * Position in WorkerW client coordinates.
   *
   * Two conversions stack here. The virtual desktop origin is negative whenever
   * a monitor sits left of or above the primary, and WorkerW is positioned at
   * that origin — so the offset is usually zero but is not reliably zero, and
   * assuming it is puts the Mudgin one monitor-width off on exactly the
   * multi-monitor setups this mode is most fun on. And Electron talks DIP while
   * SetWindowPos talks physical pixels, so the bounds have to be converted
   * before they are offset.
   */
  layout(ctx: LayerContext): void {
    if (this.host === NULL_HWND) return
    const b = ctx.virtualBounds
    const tl = screen.dipToScreenPoint({ x: b.x, y: b.y })
    const br = screen.dipToScreenPoint({ x: b.x + b.width, y: b.y + b.height })

    const hostRect = windowRect(this.host)
    const ox = hostRect ? hostRect.left : 0
    const oy = hostRect ? hostRect.top : 0

    const x = tl.x - ox, y = tl.y - oy, w = br.x - tl.x, h = br.y - tl.y
    SetWindowPos(ctx.hwnd, 0n, x, y, w, h,
      SWP_NOACTIVATE | SWP_NOZORDER | SWP_SHOWWINDOW | SWP_FRAMECHANGED)
    ctx.log(`underlay: laid out at ${x},${y} ${w}x${h} (host origin ${ox},${oy})`)
  }
}
