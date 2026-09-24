// =============================================================================
// Who is out, and where.
//
// This is the answer to the oldest bug in the app: send a pet to the desktop
// layer and there was no way to bring it back, because the layer that could
// show you a menu was not the layer the pet was in. Three buckets and a drag
// solve it in the one place that can see all of them at once.
//
// It is also the roster, and it has to stay usable at a hundred pets: the
// collection is unbounded and duplicates are expected, so every column scrolls,
// the sort can be changed, and releasing is always two clicks away rather than
// one.
// =============================================================================

import type { LayerMode, PetSave } from '../../shared/types'
import { describe, summarise } from '../../shared/describe'
import { hslHex } from '../../shared/genome'
import type { Painter } from '../engine/painter'
import { Panel, PAD, HEADER, UI } from './panel'
import { PetCardPanel } from './petcard'
import { shownName } from '../../shared/names'
import { LANGUAGES } from '../../shared/lang'
import { currentLanguage } from '../pet/lines'

const COL_GAP = 8
const COL_HEAD = 26
const ROW = 34
const DRAG_SLOP = 5

/** The three places a pet can be. `null` layer means resting — not out at all. */
type Bucket = { id: string; label: string; layer: LayerMode | null }

const BUCKETS: readonly Bucket[] = [
  { id: 'overlay', label: 'In front', layer: 'overlay' },
  { id: 'underlay', label: 'On the desktop', layer: 'underlay' },
  { id: 'resting', label: 'Resting', layer: null },
]

type SortKey = 'newest' | 'kind' | 'trait'
const SORTS: readonly SortKey[] = ['newest', 'kind', 'trait']
const SORT_LABEL: Record<SortKey, string> = {
  newest: 'newest first', kind: 'by kind', trait: 'by hide',
}

export class ManagerPanel extends Panel {
  readonly id = 'manager'
  readonly title = 'Who is out'

  private colony: PetSave[] = []
  private scroll = [0, 0, 0]
  private sort: SortKey = 'newest'

  /** The row the pointer went down on, before we know if it is a drag. */
  private candidate: { pet: PetSave; x: number; y: number } | null = null
  private drag: PetSave | null = null
  private dragX = 0
  private dragY = 0

  constructor() { super(576, 392) }

  override async mount(): Promise<void> {
    this.colony = await this.host.bridge.invoke('colony:get')
  }

  override refresh(): void { void this.mount() }

  // ── Layout ─────────────────────────────────────────────────────────────────
  // Computed rather than stored, so a panel resize or a font change cannot
  // leave the hit boxes behind.

  private get colW(): number {
    return (this.w - PAD * 2 - COL_GAP * 2) / 3
  }

  private colX(i: number): number { return PAD + i * (this.colW + COL_GAP) }

  private membersOf(b: Bucket): PetSave[] {
    const list = this.colony.filter(p => b.layer === null ? !p.out : p.out && p.layer === b.layer)
    return this.sorted(list)
  }

  private sorted(list: PetSave[]): PetSave[] {
    const by = [...list]
    if (this.sort === 'newest') by.sort((a, b) => b.adoptedAt - a.adoptedAt)
    else if (this.sort === 'kind') by.sort((a, b) => a.species.localeCompare(b.species)
      || a.name.localeCompare(b.name))
    // Sorting by hide groups the look-alikes together, which is the only way to
    // spot that you have four of nearly the same animal.
    else by.sort((a, b) => a.genes.body.h - b.genes.body.h)
    return by
  }

  private get listTop(): number { return HEADER + 8 + COL_HEAD + 26 }
  private get listH(): number { return this.h - this.listTop - 34 }

  // ── Drawing ────────────────────────────────────────────────────────────────

  protected override body(g: Painter, _now: number, top: number): void {
    g.text(`${this.colony.length} in the collection`, PAD, top + 4,
      { size: 10, color: UI.dim, align: 'left' })
    this.button(g, 'sort', this.w - PAD - 108, top - 4, 108, 20, SORT_LABEL[this.sort], { size: 10 })

    const y0 = this.listTop
    for (let i = 0; i < BUCKETS.length; i++) {
      const b = BUCKETS[i]
      const x = this.colX(i)
      const members = this.membersOf(b)
      const hovering = this.drag && this.pointerCol() === i && !this.inBucket(this.drag, b)

      // Column head. Counting who is in a bucket is a fact about your desktop,
      // not a score, so it stays — but it is no longer counting toward
      // anything, because nothing is capped.
      g.roundRect(x, y0 - COL_HEAD, this.colW, COL_HEAD, 5)
        .fill({ color: hovering ? UI.rowSel : UI.fillDeep, alpha: 0.9 })
      g.text(this.fit(g, b.label, 11, this.colW - 34), x + 9, y0 - COL_HEAD / 2 + 1,
        { size: 11, color: hovering ? UI.highlight : UI.accent, align: 'left' })
      g.text(String(members.length), x + this.colW - 9, y0 - COL_HEAD / 2 + 1,
        { size: 11, color: UI.dim, align: 'right' })

      // The column body is a drop target across its whole height, so a drag
      // aimed at an empty column still lands.
      this.hits.add(`drop:${b.id}`, x, y0 - COL_HEAD, this.colW, this.listH + COL_HEAD)
      g.roundRect(x, y0, this.colW, this.listH, 5)
        .fill({ color: UI.fillDeep, alpha: hovering ? 0.85 : 0.55 })

      this.column(g, i, b, members, x, y0)
    }

    if (this.drag) this.ghost(g)
    this.drawNote(g, this.h - 14)
    if (!this.colony.length) {
      g.text('nobody yet', this.w / 2, this.h / 2, { size: 12, color: UI.dim })
    }
  }

  private column(
    g: Painter, i: number, b: Bucket, members: PetSave[], x: number, y0: number,
  ): void {
    const maxScroll = Math.max(0, members.length * ROW - this.listH)
    this.scroll[i] = Math.min(this.scroll[i], maxScroll)
    const off = this.scroll[i]

    g.save()
    g.ctx.beginPath()
    g.ctx.rect(x, y0, this.colW, this.listH)
    g.ctx.clip()

    for (let n = 0; n < members.length; n++) {
      const y = y0 + n * ROW - off
      if (y + ROW < y0 || y > y0 + this.listH) continue     // scrolled out of view
      this.row(g, members[n], x + 2, y + 1, this.colW - 4)
    }
    g.restore()

    // A scrollbar only when it means something. A permanent one on a column
    // holding two pets is noise.
    if (maxScroll > 0) {
      const trackH = this.listH
      const thumb = Math.max(24, trackH * (trackH / (members.length * ROW)))
      const t = off / maxScroll
      g.roundRect(x + this.colW - 4, y0 + (trackH - thumb) * t, 3, thumb, 1.5)
        .fill({ color: UI.edge, alpha: 0.9 })
    }
  }

  private row(g: Painter, p: PetSave, x: number, y: number, w: number): void {
    const id = `pet:${p.id}`
    this.hits.add(id, x, y, w, ROW - 2)
    const hot = this.hits.at(this.px, this.py) === id
    const being = this.drag?.id === p.id

    g.roundRect(x, y, w, ROW - 2, 4)
      .fill({ color: hot ? UI.rowHot : UI.row, alpha: being ? 0.3 : 0.95 })

    // The body colour, straight off the genome. At this size it is the single
    // most useful thing on the row — names blur together, a hide does not.
    const swatch = hslHex(p.genes.body)
    g.circle(x + 12, y + ROW / 2 - 1, 6.5).fill({ color: swatch, alpha: being ? 0.3 : 1 })
    g.circle(x + 12, y + ROW / 2 - 1, 6.5)
      .stroke({ width: 1, color: hslHex(p.genes.eye), alpha: being ? 0.3 : 0.9 })

    const tx = x + 24
    const tw = w - 28
    const a = being ? 0.3 : 1
    // In Chinese: the name in characters, its pinyin after it in the space
    // left over — a roster of a hundred is a hundred small reading drills.
    const zh = currentLanguage() === 'zh' ? p.zh : undefined
    const nameFont = zh ? LANGUAGES.zh.font : undefined
    const shown = shownName(p, currentLanguage())
    g.text(this.fit(g, shown, 12, tw), tx, y + 10,
      { size: 12, color: UI.text, align: 'left', alpha: a, font: nameFont })
    if (zh) {
      const nx = tx + g.measure(shown, 12, nameFont) + 6
      g.text(this.fit(g, zh.reading, 9, tx + tw - nx), nx, y + 10,
        { size: 9, color: UI.dim, align: 'left', alpha: a, font: '"Segoe UI", sans-serif' })
    }
    g.text(this.fit(g, summarise(describe(p.genes)), 9, tw), tx, y + 22,
      { size: 9, color: UI.dim, align: 'left', alpha: a })
  }

  /** The row travelling with the pointer. Drawn last, outside every clip. */
  private ghost(g: Painter): void {
    const p = this.drag!
    const w = this.colW - 4
    g.save().alpha(0.9)
    g.roundRect(this.dragX - w / 2, this.dragY - ROW / 2, w, ROW - 2, 4)
      .fill({ color: UI.rowSel, alpha: 0.96 })
    g.roundRect(this.dragX - w / 2, this.dragY - ROW / 2, w, ROW - 2, 4)
      .stroke({ width: 1, color: UI.highlight, alpha: 0.9 })
    g.circle(this.dragX - w / 2 + 12, this.dragY - 1, 6.5).fill({ color: hslHex(p.genes.body) })
    g.text(this.fit(g, shownName(p, currentLanguage()), 11, w - 28), this.dragX - w / 2 + 24, this.dragY - 4,
      { size: 11, color: UI.text, align: 'left' })
    g.restore()
  }

  // ── Input ──────────────────────────────────────────────────────────────────

  private inBucket(p: PetSave, b: Bucket): boolean {
    return b.layer === null ? !p.out : p.out && p.layer === b.layer
  }

  /** Which column the pointer is over, or -1. */
  private pointerCol(): number {
    for (let i = 0; i < 3; i++) {
      const x = this.colX(i)
      if (this.px >= x && this.px <= x + this.colW) return i
    }
    return -1
  }

  protected override onDown(x: number, y: number, id: string | null): void {
    if (id === 'sort') {
      this.sort = SORTS[(SORTS.indexOf(this.sort) + 1) % SORTS.length]
      return
    }
    if (!id?.startsWith('pet:')) return
    const pet = this.colony.find(p => p.id === id.slice(4))
    // Held, not yet dragged. A press that never moves is a click, and a click
    // opens the pet — which is the discoverable half of this panel.
    if (pet) this.candidate = { pet, x, y }
  }

  protected override onMove(x: number, y: number): void {
    this.dragX = x
    this.dragY = y
    if (this.drag || !this.candidate) return
    if (Math.hypot(x - this.candidate.x, y - this.candidate.y) < DRAG_SLOP) return
    this.drag = this.candidate.pet
  }

  protected override onUp(x: number, y: number, id: string | null): void {
    const dragged = this.drag
    const cand = this.candidate
    this.drag = null
    this.candidate = null

    if (!dragged) {
      // A click. Open the card for whoever was under it, if the pointer is
      // still on the same row.
      if (cand && id === `pet:${cand.pet.id}`) {
        this.host.open(new PetCardPanel(cand.pet.id), { x: this.x + x, y: this.y + y })
      }
      return
    }

    const col = this.pointerCol()
    const target = col >= 0 ? BUCKETS[col] : null
    if (!target || this.inBucket(dragged, target)) return

    const b = this.host.bridge
    if (target.layer === null) {
      void b.invoke('pet:setOut', dragged.id, false)
    } else {
      // Layer first, then out. The other order flashes them onto the desktop in
      // whichever layer they were last in before moving them again.
      if (dragged.layer !== target.layer) void b.invoke('pet:setLayer', dragged.id, target.layer)
      if (!dragged.out) void b.invoke('pet:setOut', dragged.id, true)
    }
  }

  protected override onWheel(_x: number, _y: number, dy: number): void {
    const col = this.pointerCol()
    if (col < 0) return
    const members = this.membersOf(BUCKETS[col]).length
    const maxScroll = Math.max(0, members * ROW - this.listH)
    this.scroll[col] = Math.max(0, Math.min(maxScroll, this.scroll[col] + dy))
  }
}
