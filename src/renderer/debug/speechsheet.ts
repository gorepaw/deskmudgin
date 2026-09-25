// =============================================================================
// Speech sheet. With DESKMUDGIN_CONTACT=speech, the window draws every verified
// line of the course as a real speech bubble, in a grid, on an opaque backdrop.
//
// Same reason the creature contact sheet exists: some failures cannot be seen
// by reading code or data. A missing CJK font draws boxes. A long sentence runs
// off the bubble. Pinyin and gloss drift out of line with each other. The only
// way to know is to look at all of them at once — and waiting on the desktop
// for a sleeping frog to say something is not that.
//
// Paged: three hundred bubbles do not fit one screen at a readable size, so the
// sheet steps a page every few seconds, and `?page=N` pins one.
// =============================================================================

import type { Painter } from '../engine/painter'
import { Speech } from '../ui/speech'
import { ZH_LEVELS } from '../../shared/lang/levels'
import { setLanguage } from '../pet/lines'
import { UI, THEMES, applyTheme } from '../ui/theme'
import type { Utterance } from '../../shared/lang/types'

const CELL_W = 360
const CELL_H = 96
const PAGE_SECONDS = 6

/** Every level's sentences, lowest first, so a new level is on the sheet the
 *  moment it has anything verified. */
const ENTRIES = ZH_LEVELS.flatMap(l => l.phrases.entries)

export class SpeechSheet {
  private readonly cols: number
  private readonly rows: number
  private readonly perPage: number
  private readonly pages: number

  constructor(private w: number, private h: number, private pinned: number | null) {
    setLanguage('zh')
    this.cols = Math.max(1, Math.floor((w - 20) / CELL_W))
    this.rows = Math.max(1, Math.floor((h - 60) / CELL_H))
    this.perPage = this.cols * this.rows
    this.pages = Math.ceil(ENTRIES.length / this.perPage)
  }

  draw(g: Painter, now: number): void {
    g.rect(0, 0, this.w, this.h).fill(0x0b0c12)
    const page = this.pinned ?? Math.floor(now / PAGE_SECONDS) % this.pages
    const start = page * this.perPage
    const slice = ENTRIES.slice(start, start + this.perPage)

    g.text(`${ENTRIES.length} verified lines · page ${page + 1}/${this.pages}`,
      20, 22, { size: 13, color: 0x8f8fa8, align: 'left' })

    slice.forEach((e, i) => {
      const col = i % this.cols
      const row = Math.floor(i / this.cols)
      const cx = 20 + col * CELL_W + CELL_W / 2
      // The anchor is where a head would be: the bubble sits above it.
      const ay = 60 + row * CELL_H + CELL_H - 12
      // A fresh bubble each frame, said with a long life so it is fully faded
      // in and not fading out — the sheet shows the steady state.
      const s = new Speech()
      s.say(e, 60)
      s.update(1)
      s.draw(g, cx, ay, this.w)
      g.text(e.id, cx - CELL_W / 2 + 6, ay + 4, { size: 9, color: 0x55556a, align: 'left' })
    })
  }
}

/**
 * Theme sheet. With DESKMUDGIN_CONTACT=themes: one row per theme, the same
 * bubbles in each, over a dark wallpaper and a light one.
 *
 * Bubbles are drawn straight onto the desktop, so a theme has to hold up on
 * whatever is behind it — a light theme's bubble can vanish on a pale
 * wallpaper just as a dark one can on a night sky, and only a side-by-side
 * shows it. The row order is THEMES order, so a new theme appears here with
 * nothing to add.
 */
export class ThemeSheet {
  constructor(private w: number, private h: number) { setLanguage('zh') }

  draw(g: Painter, now: number): void {
    // Fixed, not half the window: the overlay spans the whole virtual desktop,
    // which on two monitors puts the light half off the edge of the first.
    const half = Math.min(this.w / 2, 760)
    g.rect(0, 0, half, this.h).fill(0x1d2430)
    g.rect(half, 0, this.w - half, this.h).fill(0xd9dde3)
    const lines = [ENTRIES[0], ENTRIES.find(e => e.script.length > 9) ?? ENTRIES[1]]
    const was = UI.id
    const rowH = Math.max(64, Math.floor((this.h - 20) / THEMES.length))
    THEMES.forEach((t, i) => {
      applyTheme(t.id)
      const ay = 20 + i * rowH + rowH - 8
      for (const side of [0, 1]) {
        const x0 = side * half
        g.text(t.label, x0 + 10, ay - 20, { size: 11, color: side ? 0x333333 : 0xcccccc, align: 'left' })
        const cells: Utterance[] = ['hrrr!', ...lines]
        cells.forEach((u, j) => {
          const s = new Speech()
          s.say(u, 60)
          s.update(1)
          s.draw(g, x0 + 150 + j * (j === 2 ? 190 : 120) + (j === 2 ? 60 : 0), ay, this.w)
        })
      }
    })
    applyTheme(was)
    void now
  }
}
