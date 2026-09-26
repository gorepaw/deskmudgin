// =============================================================================
// The frames, by id, and which one is drawn.
//
// A border is chosen independently of the theme. A theme names the border it
// comes with in `frame` (none named: the plain one), and the player's `border`
// setting either follows that (`theme`, the default), switches borders off
// (`none`), or names any frame — so any palette can wear any border. See kit.ts
// for what a frame is.
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

/**
 * No border at all: the body fill and nothing round it. `inset` and `reach`
 * are zero — there is no stroke for either to make room for.
 */
const NONE: Frame = { inset: 0, reach: 0, edge() {} }

/** What Settings offers, in order. `theme` and `none` are not frames in the
 *  registry: the first defers to the theme, the second is `NONE` above. */
export interface Border { readonly id: string; readonly label: string; readonly note: string }
export const BORDERS: readonly Border[] = [
  { id: 'theme', label: "Theme's own", note: 'the border that comes with the theme' },
  { id: 'none', label: 'None', note: 'no border at all' },
  { id: 'plain', label: 'Plain', note: 'a dark keyline and an accent rule' },
  { id: 'manuscript', label: 'Illuminated', note: 'gilt rules, corner fleurons, a wax seal' },
  { id: 'glass', label: 'Stained glass', note: 'leaded panes and jewel light' },
  { id: 'brass', label: 'Brass & rivets', note: 'riveted brass and an engraved plate' },
  { id: 'shrine', label: 'Bog shrine', note: 'mossy stone, drips, and the eye' },
  { id: 'holo', label: 'Holographic', note: 'turning foil and split light' },
  { id: 'ink', label: 'Ink wash', note: 'brush strokes and a red seal' },
]

let border = 'theme'

/** Set from settings at boot and on every change. Global, like the theme. An
 *  id this build does not know follows the theme rather than failing. */
export function setBorder(id: string): void {
  border = BORDERS.some(b => b.id === id) ? id : 'theme'
}
export const currentBorder = (): string => border

/** The theme's own frame; the plain one for a theme that names none. */
export const themeFrame = (t: Theme): Frame => FRAMES[t.frame ?? 'plain'] ?? PLAIN

/** The frame to draw with `t`: the chosen border, or the theme's own. */
export function frameOf(t: Theme): Frame {
  if (border === 'none') return NONE
  if (border === 'theme') return themeFrame(t)
  return FRAMES[border] ?? themeFrame(t)
}
