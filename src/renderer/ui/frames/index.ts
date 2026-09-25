// =============================================================================
// The frames, by id. A theme names one in `frame`; a theme that names none is
// drawn with the plain frame. See kit.ts for what a frame is.
// =============================================================================

import type { Theme } from '../theme'
import { UI } from '../theme'
import type { Frame } from './kit'
import { MANUSCRIPT } from './manuscript'
import { GLASS } from './glass'
import { BRASS } from './brass'
import { SHRINE } from './shrine'
import { HOLO } from './holo'
import { INKWASH } from './ink'

export type { Frame } from './kit'

/**
 * The frame every palette-only theme uses. Two strokes: a dark one to separate
 * the shape from a light wallpaper, and the accent inside it. On a bright
 * desktop a single accent outline reads as a smudge.
 */
const PLAIN: Frame = {
  inset: 0.5,
  reach: 1,
  edge(g, trace, _a, alpha) {
    trace(g)
    g.stroke({ width: 2, color: 0x000000, alpha: 0.5 * alpha })
    trace(g)
    g.stroke({ width: UI.border, color: UI.accent, alpha: (UI.titleBar ? 0.9 : 0.55) * alpha })
  },
}

export const FRAMES: Readonly<Record<string, Frame>> = {
  plain: PLAIN,
  manuscript: MANUSCRIPT,
  glass: GLASS,
  brass: BRASS,
  shrine: SHRINE,
  holo: HOLO,
  ink: INKWASH,
}

/** A theme's frame; the plain one for any theme that names none. */
export const frameOf = (t: Theme): Frame => FRAMES[t.frame ?? 'plain'] ?? PLAIN
