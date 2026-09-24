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
import { COURSE } from '../../shared/lang/generated/zh-hsk1'
import { setLanguage } from '../pet/lines'

const CELL_W = 360
const CELL_H = 96
const PAGE_SECONDS = 6

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
    this.pages = Math.ceil(COURSE.entries.length / this.perPage)
  }

  draw(g: Painter, now: number): void {
    g.rect(0, 0, this.w, this.h).fill(0x0b0c12)
    const page = this.pinned ?? Math.floor(now / PAGE_SECONDS) % this.pages
    const start = page * this.perPage
    const slice = COURSE.entries.slice(start, start + this.perPage)

    g.text(`${COURSE.id} · ${COURSE.entries.length} verified lines · page ${page + 1}/${this.pages}`,
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
