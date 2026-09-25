// =============================================================================
// How the panels look.
//
// A theme is a palette plus a handful of switches that change how the chrome is
// drawn: corner radius, bevelled buttons, glossy lozenges, a filled title bar,
// pinstripes, scanlines, border weight and a font. Every one of them is a
// single branch in Panel, and every one earns its place by being the thing that
// makes some real interface recognisable — Aqua without stripes is not Aqua.
//
// Most new themes need none of them. Bogwater and Ganorok are palettes and
// nothing else, which is the point: the vocabulary is there so that adding a
// theme stays a data entry rather than a rendering project.
//
// `UI` is the *current* theme and is mutated in place by `applyTheme`. Every
// panel reads `UI.fill` at draw time, so a theme change takes effect on the
// next frame with nothing to invalidate and no panel needing to know it
// happened. Reassigning the binding instead would leave every existing import
// pointing at the old object.
// =============================================================================

import { setDefaultFont } from '../engine/painter'

export interface Theme {
  readonly id: string
  /** Shown under the swatches in settings. */
  readonly label: string
  /** One short line. What kind of thing this is, not what colour it is. */
  readonly note: string

  /** Panel body. */
  fill: number
  /** Wells, list backgrounds, portrait frames — deeper than the body. */
  fillDeep: number
  /** Hairlines and borders. */
  edge: number
  text: number
  /** Secondary text: notes, counts, trait summaries. */
  dim: number
  /** Titles, section labels, primary fills. Gold in Bog, silver in Pewter. */
  accent: number
  /** Hover and focus. Always brighter than `accent`. */
  highlight: number
  row: number
  rowHot: number
  rowSel: number
  danger: number
  good: number
  /** Text drawn *on* an accent or danger fill. */
  ink: number
  /** Title text. Differs from `accent` only when there is a filled title bar. */
  titleInk: number

  /** Corner radius. 0 is square, which is most of what makes Terminal look
   *  like a terminal. */
  radius: number
  /** Raised 3D buttons with a light and a dark edge, instead of flat ones. */
  bevel: boolean
  /** Glossy lozenge buttons: pill-shaped, lit along the top. Aqua. */
  gloss: boolean
  /** A filled bar across the top of the panel, rather than a title and a rule. */
  titleBar: boolean
  /** Fine horizontal lines through the panel body. Aqua's brushed stripes. */
  pinstripe: boolean
  /** Dark scanlines over everything, drawn last. A phosphor tube. */
  scanlines: boolean
  /** Border weight on the panel and its controls. High contrast wants more. */
  border: number
  /** Panel opacity. Light themes need to be more solid or the desktop bleeds
   *  through the text. */
  bodyAlpha: number
  font: string
  /**
   * The frame this theme draws its edges with — an id from ui/frames.ts. Absent
   * for every palette-only theme, which get the plain keyline-and-accent frame.
   * A premium theme is one whose look needs more than colour: gilding, corner
   * ornaments, a title treatment.
   */
  frame?: string
}

const MONO = '"IBM Plex Mono", Consolas, monospace'

export const THEMES: readonly Theme[] = [
  {
    id: 'pewter',
    label: 'Pewter',
    note: 'cold iron and grey light',
    fill: 0x1a1c26, fillDeep: 0x12141c, edge: 0x3d4252,
    text: 0xd0d4dc, dim: 0x878d9c,
    accent: 0xb8bec9, highlight: 0xe6ebf2,
    row: 0x232734, rowHot: 0x2f3442, rowSel: 0x3b4152,
    danger: 0xb85c5c, good: 0x6f9c74,
    ink: 0x14161e, titleInk: 0xb8bec9,
    radius: 8, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.95, pinstripe: false, scanlines: false, border: 1, font: MONO,
  },
  {
    id: 'bog',
    label: 'Bog',
    note: 'galanova gold, where this started',
    fill: 0x14142a, fillDeep: 0x0e0e1e, edge: 0x3a3a5e,
    text: 0xc8c8d8, dim: 0x7e7e9c,
    accent: 0xc8a951, highlight: 0xe0b070,
    row: 0x1b1b34, rowHot: 0x272747, rowSel: 0x33334f,
    danger: 0xc05a5a, good: 0x6aa96a,
    ink: 0x101020, titleInk: 0xc8a951,
    radius: 8, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.95, pinstripe: false, scanlines: false, border: 1, font: MONO,
  },
  {
    id: 'ganorok',
    label: 'Ganorok',
    note: 'the Matron\'s own stone and amber',
    fill: 0x2b2822, fillDeep: 0x1e1c17, edge: 0x554e40,
    text: 0xd8d0c0, dim: 0x968c78,
    accent: 0xe0b070, highlight: 0xf5d9a8,
    row: 0x38342b, rowHot: 0x454034, rowSel: 0x524c3e,
    danger: 0xc06848, good: 0x8a9a58,
    ink: 0x241f18, titleInk: 0xe0b070,
    radius: 6, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.96, pinstripe: false, scanlines: false, border: 1, font: MONO,
  },
  {
    id: 'parchment',
    label: 'Parchment',
    note: 'a field notebook, for daylight',
    fill: 0xefe7d5, fillDeep: 0xfdf8ec, edge: 0xb3a68a,
    text: 0x3a3226, dim: 0x7d7160,
    accent: 0x8a6a3a, highlight: 0xb0873f,
    // A full step darker than the body, not half a one. On a light theme the
    // row *is* the only thing separating a button from the panel behind it.
    row: 0xdfd2b4, rowHot: 0xd0bf99, rowSel: 0xc0ab80,
    danger: 0xa04a3a, good: 0x5c7a44,
    ink: 0xfdf8ec, titleInk: 0x54432a,
    radius: 5, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.99, pinstripe: false, scanlines: false, border: 1, font: MONO,
  },
  {
    id: 'terminal',
    label: 'Terminal',
    note: 'phosphor green, square corners',
    fill: 0x080c08, fillDeep: 0x040704, edge: 0x1f4a24,
    text: 0x76e07a, dim: 0x3f8a45,
    accent: 0x9dff9d, highlight: 0xdaffda,
    row: 0x0e160e, rowHot: 0x16260f, rowSel: 0x1e3316,
    danger: 0xe06a5a, good: 0x9dff9d,
    ink: 0x041004, titleInk: 0x9dff9d,
    radius: 0, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.94, pinstripe: false, scanlines: false, border: 1, font: MONO,
  },
  {
    // Luna is the name of the XP visual style. Beige dialog, blue title bar,
    // raised grey buttons, Tahoma — the four things that make a screenshot of
    // it recognisable from across a room.
    id: 'luna',
    label: 'Windows XP',
    note: 'Luna: beige dialog, blue bar, raised buttons',
    fill: 0xece9d8, fillDeep: 0xffffff, edge: 0x919b9c,
    text: 0x000000, dim: 0x5a5a5a,
    accent: 0x1c5fd0, highlight: 0x316ac5,
    row: 0xece9d8, rowHot: 0xd6e5f5, rowSel: 0x316ac5,
    danger: 0xa02020, good: 0x1a7a1a,
    ink: 0xffffff, titleInk: 0xffffff,
    radius: 3, bevel: true, gloss: false, titleBar: true, bodyAlpha: 1, pinstripe: false, scanlines: false, border: 1,
    font: 'Tahoma, "Segoe UI", Verdana, sans-serif',
  },
  {
    // XP's predecessor, and a different thing entirely: no gradient anywhere,
    // one flat #c0c0c0, hard square bevels, and a title bar that is a solid
    // block of navy. Sharper and meaner than Luna.
    id: 'chicago',
    label: 'Windows 95',
    note: 'flat grey, square bevels, navy caption',
    fill: 0xc0c0c0, fillDeep: 0xffffff, edge: 0x808080,
    text: 0x000000, dim: 0x505050,
    accent: 0x000080, highlight: 0x0a246a,
    row: 0xc0c0c0, rowHot: 0xd4d0c8, rowSel: 0x000080,
    danger: 0x800000, good: 0x008000,
    ink: 0xffffff, titleInk: 0xffffff,
    radius: 0, bevel: true, gloss: false, titleBar: true, bodyAlpha: 1,
    pinstripe: false, scanlines: false, border: 1,
    font: '"MS Sans Serif", Tahoma, Verdana, sans-serif',
  },
  {
    // Mac OS X, 2001. Pinstriped brushed panel, lozenge buttons lit from above,
    // and that specific blue. The stripes are what nothing else has.
    id: 'aqua',
    label: 'Aqua',
    note: 'pinstripes and glassy blue lozenges',
    fill: 0xe8ecf2, fillDeep: 0xffffff, edge: 0x9aa3b0,
    text: 0x101418, dim: 0x5f6a78,
    accent: 0x2f7fe0, highlight: 0x5aa0f0,
    row: 0xdae0e8, rowHot: 0xc9d3e0, rowSel: 0x2f7fe0,
    danger: 0xc0392b, good: 0x2e8b45,
    ink: 0xffffff, titleInk: 0x2c3440,
    radius: 10, bevel: false, gloss: true, titleBar: false, bodyAlpha: 0.98,
    pinstripe: true, scanlines: false, border: 1,
    font: '"Lucida Grande", "Segoe UI", Helvetica, sans-serif',
  },
  {
    // Terminal's older sibling. Amber was the other phosphor, and it wants the
    // scanlines that green did not — the warmer colour reads as a tube.
    id: 'amber',
    label: 'Amber CRT',
    note: 'amber phosphor, and you can see the lines',
    fill: 0x120c04, fillDeep: 0x0a0602, edge: 0x5a3a08,
    text: 0xffb437, dim: 0x9a6a18,
    accent: 0xffd479, highlight: 0xfff0c0,
    row: 0x1c1206, rowHot: 0x2a1c08, rowSel: 0x3a2608,
    danger: 0xff7a4a, good: 0xffd479,
    ink: 0x120c04, titleInk: 0xffd479,
    radius: 0, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.95,
    pinstripe: false, scanlines: true, border: 1,
    font: MONO,
  },
  {
    // The one that matches the animals rather than the app. Wet peat and
    // standing water — a Mudgin dropped on this panel disappears into it,
    // which is either the point or the objection depending on taste.
    id: 'bogwater',
    label: 'Bogwater',
    note: 'wet peat, to match the Mudgins',
    fill: 0x1c2418, fillDeep: 0x121810, edge: 0x3d4a32,
    text: 0xc3cdb0, dim: 0x7d8a6a,
    accent: 0x8fae5c, highlight: 0xc2dd8a,
    row: 0x25301e, rowHot: 0x2f3d26, rowSel: 0x3b4a30,
    danger: 0xb06a4a, good: 0x8fae5c,
    ink: 0x151c11, titleInk: 0x8fae5c,
    radius: 7, bevel: false, gloss: false, titleBar: false, bodyAlpha: 0.96,
    pinstripe: false, scanlines: false, border: 1, font: MONO,
  },
  {
    // Not a style — an accessibility floor. Pure black, pure white, one yellow,
    // and borders heavy enough to find without reading them. Everything here is
    // maximum contrast on purpose; it is meant to be legible, not tasteful.
    id: 'contrast',
    label: 'High contrast',
    note: 'black, white and yellow, heavy borders',
    fill: 0x000000, fillDeep: 0x000000, edge: 0xffffff,
    text: 0xffffff, dim: 0xd0d0d0,
    accent: 0xffff00, highlight: 0x00ffff,
    row: 0x000000, rowHot: 0x303030, rowSel: 0x0000c0,
    danger: 0xff6060, good: 0x00ff00,
    ink: 0x000000, titleInk: 0xffff00,
    radius: 0, bevel: false, gloss: false, titleBar: false, bodyAlpha: 1,
    pinstripe: false, scanlines: false, border: 2,
    font: '"Segoe UI", Tahoma, sans-serif',
  },
  {
    // The first premium theme. Vellum and iron-gall ink, a gilded double rule
    // with fleurons at the corners, a rubricated initial on every title, and a
    // wax seal to close. The palette alone is a pleasant parchment; the frame
    // is what makes it a manuscript.
    id: 'manuscript',
    label: 'Illuminated',
    note: 'vellum, gilt rules and a wax seal',
    fill: 0xf3e5c4, fillDeep: 0xfaf1dc, edge: 0xa88a52,
    text: 0x2a1c0e, dim: 0x6f5b3e,
    // Deep gold for type, which must read at 12px on vellum; the bright gold is
    // the frame's, in its gilding.
    accent: 0x86591a, highlight: 0xa3301c,
    row: 0xeadbb6, rowHot: 0xe0ca9c, rowSel: 0xd3b47d,
    danger: 0x9e2a1e, good: 0x4f6b2e,
    ink: 0xfaf1dc, titleInk: 0x8e2416,
    radius: 3, bevel: false, gloss: false, titleBar: false, bodyAlpha: 1,
    pinstripe: false, scanlines: false, border: 1,
    font: '"Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif',
    frame: 'manuscript',
  },
]

export const DEFAULT_THEME = THEMES[0].id

/**
 * The theme in force. Mutated in place — see the file header.
 *
 * Spread from the default rather than aliasing it, or `applyTheme` would edit
 * the entry in THEMES and the first switch away would be unrecoverable.
 */
export const UI: Theme = { ...THEMES[0] }

export const themeById = (id: string): Theme =>
  THEMES.find(t => t.id === id) ?? THEMES[0]

export function applyTheme(id: string): void {
  Object.assign(UI, themeById(id))
  // The font is the one part that cannot be read per-shape: Painter sets it on
  // the context before measuring and again before drawing, and the two have to
  // agree or every `fit()` truncation is computed against the wrong metrics.
  setDefaultFont(UI.font)
}
