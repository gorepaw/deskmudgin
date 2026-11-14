// =============================================================================
// Where the floor is, taskbar or no taskbar.
//
// They stand on the bottom of the work area, which is the top of the taskbar —
// until the taskbar auto-hides, when Windows hands its strip back to the work
// area and the floor drops to the very bottom of the screen. The user liked
// them sitting just above the taskbar and wants them to stay at that height
// while it is hidden, so the floor is measured from the taskbar window itself:
// a hidden taskbar is moved off the bottom edge (two pixels still showing) but
// keeps its size.
//
// Only a bottom taskbar counts. One on the side or top is already handled by
// the work area while it shows, and a pet standing at the screen's bottom edge
// while it hides is exactly right there.
// =============================================================================

import { screen, type Display, type Rectangle } from 'electron'
import { FindWindowExW, GetWindowRect, NULL_HWND, asHandle, type Win32Rect } from './api'

/** Every taskbar: the primary one and one per extra monitor if shown there. */
function taskbars(): Rectangle[] {
  const out: Rectangle[] = []
  for (const cls of ['Shell_TrayWnd', 'Shell_SecondaryTrayWnd']) {
    let h = NULL_HWND
    // Bounded: there is one taskbar per monitor, and a loop over window
    // handles is not something to leave unbounded on a changing desktop.
    for (let i = 0; i < 16; i++) {
      h = asHandle(FindWindowExW(NULL_HWND, h, cls, null))
      if (h === NULL_HWND) break
      const r = {} as Win32Rect
      if (!GetWindowRect(h, r)) continue
      // Physical pixels in, DIPs out — the display rects are in DIPs.
      out.push(screen.screenToDipRect(null, {
        x: r.left, y: r.top, width: r.right - r.left, height: r.bottom - r.top,
      }))
    }
  }
  return out
}

/**
 * A display's work area, with its floor raised to the top of a bottom taskbar
 * even while that taskbar is hidden. Identical to `workArea` whenever the
 * taskbar is showing.
 */
export function floorAreas(displays: readonly Display[]): Map<number, Rectangle> {
  let bars: Rectangle[] = []
  try { bars = taskbars() } catch { /* no shell (or no koffi): work areas as given */ }
  const out = new Map<number, Rectangle>()
  for (const d of displays) {
    const b = d.bounds
    const wa = d.workArea
    const bar = bars.find(t => {
      const cx = t.x + t.width / 2
      return cx >= b.x && cx < b.x + b.width
        && t.width > t.height                    // horizontal
        && t.y + t.height / 2 > b.y + b.height / 2 // on the bottom half: bottom-docked
    })
    const floor = bar ? Math.min(wa.y + wa.height, b.y + b.height - bar.height) : wa.y + wa.height
    out.set(d.id, { ...wa, height: Math.max(0, floor - wa.y) })
  }
  return out
}

/** `floorAreas` for one display. */
export const floorArea = (d: Display): Rectangle => floorAreas([d]).get(d.id) ?? d.workArea
