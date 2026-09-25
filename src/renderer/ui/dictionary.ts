// =============================================================================
// The dictionary: everything they can say, and what they have said to you.
//
// Three tabs — words, by HSK level; the sentences they say on their own; the
// conversations they have with each other. Every entry is readable whether or
// not you have met it, because this is a reference and hiding the course would
// make it useless as one. What it adds is a mark for what you have actually
// been shown, taken from the ledger, so it is a record of real exposure rather
// than a guess: a line counts once a bubble put it on your screen, and nothing
// before the ledger started recording counts at all.
//
// A word counts as seen once it has appeared inside something they said. That
// is the honest sense of "seen" for vocabulary — you met 苹果 in 我想吃苹果。,
// not in a list.
// =============================================================================

import type { LedgerEntry } from '../../shared/ledger'
import type { Entry } from '../../shared/lang/types'
import { turnsOf } from '../../shared/lang/types'
import { LANGUAGES } from '../../shared/lang'
import { ZH_LEVELS, type Level } from '../../shared/lang/levels'
import type { Painter } from '../engine/painter'
import { Panel, PAD, HEADER, UI } from './panel'

export type Tab = 'words' | 'phrases' | 'talk'
type Filter = 'all' | 'seen' | 'unseen'

const TABS: readonly [Tab, string][] = [['words', 'Words'], ['phrases', 'Phrases'], ['talk', 'Conversations']]
const FILTERS: readonly Filter[] = ['all', 'seen', 'unseen']
const FILTER_LABEL: Record<Filter, string> = { all: 'showing all', seen: 'seen only', unseen: 'not yet seen' }

const ZH = LANGUAGES.zh.font
const PY = '"Segoe UI", sans-serif'

/** The levels with anything in them, lowest first — a level whose content is
 *  not verified yet has nothing to list and no heading either. */
const levels = (pick: (l: Level) => readonly Entry[]): Level[] =>
  ZH_LEVELS.filter(l => pick(l).length > 0)

/** Pinyin with the tone marks taken off, for alphabetical order. */
const plain = (s: string): string => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** A drawable row: its height, and how to draw it at a given y. */
interface Row { h: number; draw: (g: Painter, y: number) => void; heading?: boolean }

export class DictionaryPanel extends Panel {
  readonly id = 'dictionary'
  readonly title = 'The dictionary'
  override readonly subtitle = 'everything they can say'

  private tab: Tab = 'words'
  private filter: Filter = 'all'
  private scroll = 0
  private contentH = 0
  /** Course line ids shown to you so far — `p052`, `x012.1`. */
  private heard = new Set<string>()
  /** Everything those lines said, joined, for finding words inside them. */
  private heardText = ''
  private heardLines: string[] = []

  constructor(tab: Tab = 'words') {
    super(480, 560)
    this.tab = tab
  }

  override async mount(): Promise<void> {
    const ledger: LedgerEntry[] = await this.host.bridge.invoke('ledger:get')
    const said = ledger.filter(e => e.category === 'said')
    this.heard = new Set(said.map(e => e.key.slice('said:'.length)))
    this.heardLines = said.map(e => e.label)
    this.heardText = this.heardLines.join('｜')
  }

  override refresh(): void { void this.mount() }

  /** Set from the body's own layout each frame, so the list always starts
   *  below the controls instead of at a guessed offset that ran into them. */
  private listTop = HEADER + 90
  private get listH(): number { return this.h - this.listTop - 12 }

  /** Met in something they said. A paired word — 虽然…但是 — counts once both
   *  halves have turned up in the same line, since that is how it is used. */
  private met(script: string): boolean {
    const parts = script.split('…').filter(Boolean)
    if (parts.length < 2) return this.heardText.includes(script)
    return this.heardLines.some(line => parts.every(p => line.includes(p)))
  }

  private keep(seen: boolean): boolean {
    return this.filter === 'all' || (this.filter === 'seen') === seen
  }

  // ── Rows ───────────────────────────────────────────────────────────────────

  /**
   * A tick for what you have been shown, nothing for what you have not.
   *
   * A shape rather than a shade: the first version used a filled dot against a
   * hollow ring, and in the Windows 95 theme both came out navy at 4px — every
   * entry looked seen. Present-or-absent survives every theme.
   */
  private mark(g: Painter, x: number, cy: number, seen: boolean): void {
    if (!seen) return
    g.moveTo(x - 4, cy).lineTo(x - 1, cy + 3).lineTo(x + 5, cy - 4)
      .stroke({ width: 2, color: UI.good, cap: 'round' })
  }

  /** A level's heading: its name and how many entries follow. */
  private heading(label: string, n: number, what: string): Row {
    return {
      h: 26,
      heading: true,
      draw: (g, y) => g.text(`${label} · ${n} ${what}`, PAD, y + 15,
        { size: 11, color: UI.accent, align: 'left' }),
    }
  }

  private wordRows(w: number): Row[] {
    const rows: Row[] = []
    for (const level of levels(l => l.words.entries)) {
      const words = [...level.words.entries]
        .sort((a, b) => plain(a.reading).localeCompare(plain(b.reading)) || a.script.localeCompare(b.script))
        .filter(e => this.keep(this.met(e.script)))
      rows.push(this.heading(level.label, words.length, 'words'))
      for (const e of words) {
        const seen = this.met(e.script)
        rows.push({
          h: 24,
          draw: (g, y) => {
            this.mark(g, PAD + 5, y + 12, seen)
            g.text(e.script, PAD + 18, y + 12, { size: 15, color: UI.text, align: 'left', font: ZH })
            g.text(e.reading, PAD + 96, y + 12, { size: 12, color: UI.highlight, align: 'left', font: PY })
            g.text(this.fit(g, e.english, 11, w - 190), PAD + 186, y + 12,
              { size: 11, color: UI.dim, align: 'left' })
          },
        })
      }
    }
    return rows
  }

  private lineRow(e: Entry, seen: boolean, x: number, w: number, lead = ''): Row {
    return {
      h: 50,
      draw: (g, y) => {
        this.mark(g, x + 5, y + 12, seen)
        const sx = x + 18
        if (lead) g.text(lead, sx, y + 12, { size: 10, color: UI.dim, align: 'left' })
        const lx = lead ? sx + 16 : sx
        g.text(this.fit(g, e.script, 15, w - (lx - PAD), ZH), lx, y + 12,
          { size: 15, color: UI.text, align: 'left', font: ZH })
        g.text(this.fit(g, e.reading, 12, w - (lx - PAD), PY), lx, y + 29,
          { size: 12, color: UI.highlight, align: 'left', font: PY })
        g.text(this.fit(g, e.english, 11, w - (lx - PAD)), lx, y + 43,
          { size: 11, color: UI.dim, align: 'left' })
      },
    }
  }

  private phraseRows(w: number): Row[] {
    return levels(l => l.phrases.entries).flatMap(level => {
      const shown = level.phrases.entries.filter(e => this.keep(this.heard.has(e.id)))
      return [
        this.heading(level.label, shown.length, 'sentences'),
        ...shown.map(e => this.lineRow(e, this.heard.has(e.id), PAD, w)),
      ]
    })
  }

  private talkRows(w: number): Row[] {
    const rows: Row[] = []
    for (const level of levels(l => l.exchanges.entries)) {
      const start = rows.length
      let n = 0
      for (const x of level.exchanges.entries) {
        const turns = turnsOf(x)
        // Seen as a whole once every turn has been on your screen; each turn is
        // marked on its own, since a conversation cut short shows you half of it.
        const all = turns.every(t => this.heard.has(t.id))
        if (!this.keep(all)) continue
        n++
        turns.forEach((t, i) => {
          const r = this.lineRow(t, this.heard.has(t.id), PAD + 8, w - 8, i % 2 ? 'B' : 'A')
          rows.push(i === 0 ? { h: r.h + 6, draw: (g, y) => r.draw(g, y + 6) } : r)
        })
        rows.push({
          h: 10,
          draw: (g, y) => g.moveTo(PAD, y + 5).lineTo(PAD + w, y + 5)
            .stroke({ width: 1, color: UI.edge, alpha: 0.35 }),
        })
      }
      rows.splice(start, 0, this.heading(level.label, n, 'conversations'))
    }
    return rows
  }

  // ── Drawing ────────────────────────────────────────────────────────────────

  protected override body(g: Painter, _now: number, top: number): void {
    const w = this.w - PAD * 2
    // Tabs, then the filter.
    const tw = (w - 12) / 3
    TABS.forEach(([id, label], i) => {
      this.button(g, `tab:${id}`, PAD + i * (tw + 6), top, tw, 26, label,
        { primary: this.tab === id, size: 12 })
    })
    this.button(g, 'filter', this.w - PAD - 120, top + 32, 120, 20, FILTER_LABEL[this.filter], { size: 10 })
    g.text(this.tab === 'words' ? '✓ = met in something they said to you' : '✓ = shown to you',
      PAD, top + 42, { size: 10, color: UI.dim, align: 'left' })
    this.listTop = top + 60

    const rows = this.tab === 'words' ? this.wordRows(w)
      : this.tab === 'phrases' ? this.phraseRows(w) : this.talkRows(w)
    this.contentH = rows.reduce((n, r) => n + r.h, 0)
    this.scroll = Math.max(0, Math.min(this.scroll, this.contentH - this.listH))

    const y0 = this.listTop
    g.save()
    g.ctx.beginPath()
    g.ctx.rect(0, y0, this.w, this.listH)
    g.ctx.clip()
    let y = y0 - this.scroll
    for (const r of rows) {
      // Only what is in view is drawn: three hundred sentences at three lines
      // each is too much text to lay out every frame for nothing.
      if (y + r.h >= y0 && y <= y0 + this.listH) r.draw(g, y)
      y += r.h
    }
    if (rows.every(r => r.heading)) {
      g.text(this.filter === 'seen' ? 'nothing here yet — they will get to it' : 'you have seen all of these',
        this.w / 2, y0 + 40, { size: 11, color: UI.dim })
    }
    g.restore()

    if (this.contentH > this.listH) {
      const thumb = Math.max(24, this.listH * (this.listH / this.contentH))
      const t = this.scroll / (this.contentH - this.listH)
      g.roundRect(this.w - PAD + 3, y0 + (this.listH - thumb) * t, 3, thumb, 1.5)
        .fill({ color: UI.edge, alpha: 0.9 })
    }
  }

  protected override onDown(_x: number, _y: number, id: string | null): void {
    if (id?.startsWith('tab:')) { this.tab = id.slice(4) as Tab; this.scroll = 0 }
    if (id === 'filter') {
      this.filter = FILTERS[(FILTERS.indexOf(this.filter) + 1) % FILTERS.length]
      this.scroll = 0
    }
  }

  protected override onWheel(_x: number, _y: number, dy: number): void {
    this.scroll = Math.max(0, Math.min(Math.max(0, this.contentH - this.listH), this.scroll + dy))
  }
}
