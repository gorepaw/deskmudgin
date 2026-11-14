// =============================================================================
// Where the floor is.
//
// They stand on the bottom of the work area, which is the top of the taskbar —
// a Mudgin's foot and toes hang about half a body-radius below the line he
// stands on, so with a taskbar there they overlap its top edge a little, which
// reads as sitting on it.
//
// With no taskbar there (auto-hidden, or on a monitor without one) the work
// area runs to the screen's very edge, and that same overhang put the bottom of
// their feet off the screen. So a floor that *is* the screen edge is raised by
// enough to clear the biggest foot with a few pixels to spare. Raising it all
// the way to where a hidden taskbar would be was tried, and left them floating
// a taskbar's height up for no visible reason.
// =============================================================================

import type { Display, Rectangle } from 'electron'

/**
 * How far above the screen edge the floor sits when nothing is below it.
 * The largest Mudgin (size 1.9, R 20) hangs 0.52r ≈ 20px below his ground
 * line; four more keeps a gap under the biggest foot.
 */
const EDGE_CLEARANCE = 24

/** A display's work area, with a floor at the screen edge lifted clear of it. */
export function floorArea(d: Display): Rectangle {
  const wa = d.workArea
  const atEdge = wa.y + wa.height >= d.bounds.y + d.bounds.height - 1
  return atEdge ? { ...wa, height: wa.height - EDGE_CLEARANCE } : wa
}
