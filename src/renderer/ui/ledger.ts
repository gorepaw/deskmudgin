// =============================================================================
// What we have seen.
//
// A field notebook, not a checklist. It lists the names encountered so far,
// grouped by feature, and it shows **no total, no percentage, no count and no
// gaps** — see shared/ledger.ts for why that is structural rather than a
// stylistic choice. There is no denominator to divide by: the genome is
// continuous, so "orchid hide" is a reading of a region of a colour wheel, not
// a card in a set, and two pets that both earn the name are still different
// animals.
//
// The one thing it does add is *when* — hovering a name gives the day it first
// turned up. That reads as a diary rather than a score.
// =============================================================================

import type { LedgerEntry } from '../../shared/ledger'
import { CATEGORY_LABEL, CATEGORY_ORDER } from '../../shared/ledger'
import type { Painter } from '../engine/painter'
import { Panel, PAD, HEADER, UI } from './panel'
import { LANGUAGES } from '../../shared/lang'

const CHIP_H = 22
const CHIP_GAP = 5
const CHIP_PAD = 9

export class LedgerPanel extends Panel {
  readonly id = 'ledger'
  readonly title = 'What we have seen'
  override readonly subtitle = 'names, as they turned up'

  private seen: LedgerEntry[] = []
  private scroll = 0
  private contentH = 0

  constructor() { super(400, 400) }

  override async mount(): Promise<void> {
    this.seen = await this.host.bridge.invoke('ledger:get')
  }

  override refresh(): void { void this.mount() }

  private get viewTop(): number { return HEADER + 8 + 16 }
  private get viewH(): number { return this.h - this.viewTop - 40 }

  protected override body(g: Painter, _now: number, _top: number): void {
    const top = this.viewTop
    const viewH = this.viewH
    const w = this.w - PAD * 2

    if (!this.seen.length) {
      g.text('nothing yet', this.w / 2, this.h / 2, { size: 12, color: UI.dim })
      return
    }

    // Clip before laying out: the chips are wrapped into rows and scrolled as
    // one block, so anything above or below the window has to be cut rather
    // than skipped — a group's heading and its chips must not part company.
    g.save()
    g.ctx.beginPath()
    g.ctx.rect(PAD - 4, top, w + 8, viewH)
    g.ctx.clip()

    let y = top - this.scroll
    let hovered: LedgerEntry | null = null

    for (const category of CATEGORY_ORDER) {
      const rows = this.seen
        .filter(e => e.category === category)
        .sort((a, b) => a.label.localeCompare(b.label))
      if (!rows.length) continue

      g.text(CATEGORY_LABEL[category], PAD, y + 6, { size: 10, color: UI.accent, align: 'left' })
      y += 18

      let x = PAD
      for (const e of rows) {
        // A spoken line is drawn in the face that can draw it, and a size up:
        // the characters are the thing to recognise.
        const font = e.category === 'said' ? LANGUAGES.zh.font : undefined
        const size = e.category === 'said' ? 13 : 11
        const cw = g.measure(e.label, size, font) + CHIP_PAD * 2
        if (x + cw > PAD + w) { x = PAD; y += CHIP_H + CHIP_GAP }

        // Registered even while scrolled out of view; the clip below the panel
        // body stops it being drawn, and the hit list is only consulted for
        // points inside the panel anyway.
        const id = `chip:${e.key}`
        this.hits.add(id, x, y, cw, CHIP_H)
        const hot = this.hits.at(this.px, this.py) === id
        if (hot) hovered = e

        g.roundRect(x, y, cw, CHIP_H, 4).fill({ color: hot ? UI.rowHot : UI.row, alpha: 0.95 })
        g.roundRect(x + 0.5, y + 0.5, cw - 1, CHIP_H - 1, 4)
          .stroke({ width: 1, color: hot ? UI.highlight : UI.edge, alpha: 0.8 })
        g.text(e.label, x + CHIP_PAD, y + CHIP_H / 2 + 1,
          { size, color: UI.text, align: 'left', font })
        x += cw + CHIP_GAP
      }
      y += CHIP_H + 14
    }

    g.restore()
    this.contentH = y + this.scroll - top

    if (this.contentH > viewH) {
      const maxScroll = this.contentH - viewH
      const thumb = Math.max(24, viewH * (viewH / this.contentH))
      const t = Math.min(1, this.scroll / maxScroll)
      g.roundRect(this.w - PAD + 2, top + (viewH - thumb) * t, 3, thumb, 1.5)
        .fill({ color: UI.edge, alpha: 0.9 })
    }

    // The footer is the only place a date appears. Deliberately one at a time
    // and only on hover: a column of dates would turn the page into a log.
    if (hovered) {
      const d = new Date(hovered.first)
      if (hovered.category === 'said') {
        // The lesson again, in the footer: pinyin and meaning on demand, so
        // the chips themselves can be read as a test of what you remember.
        g.text(`${hovered.reading ?? ''} — ${hovered.gloss ?? ''}`, this.w / 2, this.h - 24,
          { size: 11, color: UI.text, font: '"Segoe UI", sans-serif' })
        g.text(`first heard ${d.toLocaleDateString()}`, this.w / 2, this.h - 10,
          { size: 9, color: UI.dim })
      } else {
        g.text(`first seen ${d.toLocaleDateString()}`, this.w / 2, this.h - 14,
          { size: 10, color: UI.dim })
      }
    }
  }

  protected override onWheel(_x: number, _y: number, dy: number): void {
    const maxScroll = Math.max(0, this.contentH - this.viewH)
    this.scroll = Math.max(0, Math.min(maxScroll, this.scroll + dy))
  }
}
