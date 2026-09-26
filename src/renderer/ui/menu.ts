// =============================================================================
// The Matron's menu, and the settings behind it.
//
// This replaces the native context menu, which could not survive the desktop
// layer: an Electron popup needs a window to attach to, and the underlay window
// receives no input at all. Drawing the menu ourselves is what makes the front
// door work identically whichever plane she is standing in.
// =============================================================================

import type { Painter } from '../engine/painter'
import { Panel, PAD, ROW_H, UI, THEMES, themeById } from './panel'
import { ManagerPanel } from './manager'
import { LedgerPanel } from './ledger'
import { DictionaryPanel } from './dictionary'
import { LEVELS, canLearn, isReady, levelById, levelLabel } from '../../shared/lang/levels'
import { LANGUAGES, LANGUAGE_IDS, type LanguageId } from '../../shared/lang'
import { BORDERS, FRAMES, frameOf, themeFrame } from './frames'

const BTN_H = 32
const GAP = 7
/** Height of one theme swatch. Tall enough to show a title bar, a button and a
 *  line of body text as three distinct bands. */
const SWATCH_H = 32
/** Swatches per row. The grid wraps; eleven in one row would be 24px each,
 *  which is too narrow to tell a bevel from a gradient. */
const SWATCH_COLS = 6

/** The bubble-duration sliders run from half as long to four times as long,
 *  in steps of a tenth — fine enough to tune, coarse enough to land on 1.5×. */
const SCALE_MIN = 0.5
const SCALE_MAX = 4
const toT = (v: number): number => (v - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)
const fromT = (t: number): number =>
  Math.round((SCALE_MIN + t * (SCALE_MAX - SCALE_MIN)) * 10) / 10
const times = (v: number): string => `${v.toFixed(1)}×`

export class MenuPanel extends Panel {
  readonly id = 'menu'
  readonly title = 'The Matron'
  override readonly subtitle = 'she keeps the count'

  // Tall enough for five buttons and the rule between them. It was 250, which
  // clipped "Close DeskMudgin" off the bottom edge — the content runs to 256
  // and nothing here is scrollable.
  constructor() { super(238, 321) }

  protected override body(g: Painter, _now: number, top: number): void {
    const w = this.w - PAD * 2
    let y = top + 4

    const item = (id: string, label: string, primary = false) => {
      this.button(g, id, PAD, y, w, BTN_H, label, { align: 'left', primary })
      y += BTN_H + GAP
    }

    item('open:manager', 'Who is out', true)
    item('open:ledger', 'What we have seen')
    item('open:dictionary', 'The dictionary')
    item('open:settings', 'Settings')

    y += 4
    this.rule(g, y, this.w)
    y += 10

    item('cmd:summon', 'Call them over')
    item('app:quit', 'Close DeskMudgin')
  }

  protected override onDown(_x: number, _y: number, id: string | null): void {
    const b = this.host.bridge
    switch (id) {
      case 'open:manager': this.host.open(new ManagerPanel()); break
      case 'open:ledger': this.host.open(new LedgerPanel()); break
      case 'open:dictionary': this.host.open(new DictionaryPanel()); break
      case 'open:settings': this.host.open(new SettingsPanel()); break
      case 'cmd:summon':
        void b.invoke('command:run', 'summon')
        this.host.close(this)
        break
      case 'app:quit': void b.invoke('app:quit'); break
    }
  }
}

export class SettingsPanel extends Panel {
  readonly id = 'settings'
  readonly title = 'Settings'

  /** Only ever read for the one-line summary below. Who is where per pet is the
   *  manager's job, and duplicating it here would be a second thing to keep
   *  right. */
  private fore = 0
  private back = 0

  // Tall enough for the swatch grid, which gains a row every six themes.
  constructor() { super(320, 794 + SettingsPanel.swatchBlock() + SettingsPanel.borderBlock()) }

  override async mount(): Promise<void> {
    const colony = await this.host.bridge.invoke('colony:get')
    const out = colony.filter(p => p.out)
    this.fore = out.filter(p => p.layer === 'overlay').length
    this.back = out.length - this.fore
  }

  override refresh(): void { void this.mount() }

  protected override body(g: Painter, _now: number, top: number): void {
    const cfg = this.host.settings()
    const w = this.w - PAD * 2
    let y = top

    this.rule(g, y + 4, this.w, 'send everyone')
    y += 14

    const single = cfg.stageMode === 'single'
    // Buttons, not radios.
    //
    // These are actions — "move all of them there" — and there is no single
    // setting they reflect: pets carry their own layer, so any pair of radios
    // here would sit checked while the colony was in fact split, which is the
    // normal state and exactly what the manager exists to arrange.
    const half = (w - 6) / 2
    this.button(g, 'set:front', PAD, y, half, 26, 'In front', { size: 11 })
    this.button(g, 'set:back', PAD + half + 6, y, half, 26, 'To the desktop', { size: 11 })
    y += 32
    g.text(this.summary(), this.w / 2, y + 2, { size: 9, color: UI.dim })
    y += 12
    g.text('on the desktop they chew icons and cannot be dragged',
      this.w / 2, y + 4, { size: 9, color: UI.dim })
    y += 18

    this.rule(g, y + 6, this.w, 'strangers')
    y += 16

    this.option(g, 'new:front', PAD, y, w, 'They wander on in front',
      cfg.newcomerLayer === 'overlay')
    y += ROW_H
    this.option(g, 'new:back', PAD, y, w, 'They wander on behind the icons',
      cfg.newcomerLayer === 'underlay')
    y += ROW_H + 2
    g.text('harder to spot back there, which is rather the point',
      this.w / 2, y + 2, { size: 9, color: UI.dim })
    y += 16

    this.rule(g, y + 6, this.w, 'the Matron')
    y += 16

    this.option(g, 'matron:front', PAD, y, w, 'She stands in front',
      cfg.matronLayer === 'overlay', { disabled: single })
    y += ROW_H
    this.option(g, 'matron:back', PAD, y, w, 'She stands on the desktop',
      cfg.matronLayer === 'underlay', { disabled: single })
    y += ROW_H
    this.option(g, 'matron:drag', PAD, y, w, 'Let me move her',
      cfg.matronDraggable, { note: cfg.matronDraggable ? 'drag her about' : '' })
    y += ROW_H + 4

    this.button(g, 'matron:reset', PAD + 26, y, 130, 24, 'Send her home',
      { disabled: !cfg.matronPos, size: 11 })
    y += 24 + 10

    this.rule(g, y + 4, this.w, 'this machine')
    y += 14

    this.option(g, 'mode:single', PAD, y, w, 'One window only', single,
      { note: 'lower memory' })
    y += ROW_H
    this.option(g, 'app:startup', PAD, y, w, 'Start with Windows', cfg.launchOnStartup)
    y += ROW_H + 6

    this.rule(g, y, this.w, 'they speak')
    y += 12
    const course = cfg.voice === 'course'
    const level = levelById(cfg.level, cfg.l2)
    this.option(g, 'voice:course', PAD, y, w, 'A language to learn', course,
      { note: `${LANGUAGES[cfg.l2].name} · ${levelLabel(level, cfg.l2)}` })
    y += ROW_H
    // Four rows of buttons under the option they belong to. Every language
    // can be learned or be the meaning: pick as the lesson the language you
    // read the meaning in and the two swap, which is what that almost always
    // means. A language with nothing verified in it yet is shown but cannot
    // be learned; as a meaning it falls back to English line by line, so it
    // is always safe to choose.
    const bw = (w - 70 - 6 * (LANGUAGE_IDS.length - 1)) / LANGUAGE_IDS.length
    const row = (label: string, draw: (x: (i: number) => number) => void): void => {
      g.text(label, PAD + 26, y + 11, { size: 10, color: UI.dim, align: 'left' })
      draw(i => PAD + 70 + i * (bw + 6))
      y += 30
    }
    row('learn', x => LANGUAGE_IDS.forEach((id, i) => {
      this.button(g, `l2:${id}`, x(i), y, bw, 22, LANGUAGES[id].label,
        { primary: cfg.l2 === id, disabled: !course || !canLearn(id), size: 11, font: LANGUAGES[id].font })
    }))
    // A level whose sentences are not verified in this language yet is shown
    // but not offered: choosing it would only fall back to the one below.
    row('level', x => LEVELS.forEach((l, i) => {
      this.button(g, `level:${l.id}`, x(i), y, bw, 22, levelLabel(l, cfg.l2),
        { primary: l === level, disabled: !course || !isReady(l, cfg.l2), size: 11 })
    }))
    row('meaning', x => LANGUAGE_IDS.forEach((id, i) => {
      this.button(g, `l1:${id}`, x(i), y, bw, 22, LANGUAGES[id].label,
        { primary: cfg.l1 === id, disabled: !course, size: 11, font: LANGUAGES[id].font })
    }))
    // A second meaning line, in a third language — tap it again to drop it.
    row('also', x => LANGUAGE_IDS.forEach((id, i) => {
      this.button(g, `also:${id}`, x(i), y, bw, 22, LANGUAGES[id].label,
        { primary: cfg.l1Also === id, disabled: !course || id === cfg.l1 || id === cfg.l2, size: 11, font: LANGUAGES[id].font })
    }))
    this.option(g, 'voice:grunts', PAD, y, w, 'Grunts, in English', !course)
    y += ROW_H + 8
    const speech = this.drafts.get('speech') ?? cfg.speechScale
    const talk = this.drafts.get('talk') ?? cfg.talkScale
    this.slider(g, 'speech', PAD, y, w, toT(speech), 'Bubbles stay', times(speech))
    y += 38
    this.slider(g, 'talk', PAD, y, w, toT(talk), 'Conversations stay', times(talk))
    y += 38

    this.rule(g, y, this.w, 'look')
    y += 12
    this.swatches(g, PAD, y, w, cfg.theme)
    y += SettingsPanel.swatchBlock()

    // The border, on its own: any theme can wear any of them.
    this.rule(g, y, this.w, 'border')
    y += 12
    this.borders(g, PAD, y, w, cfg.border)
    y += SettingsPanel.borderBlock()

    if (single) {
      // In `single` the per-pet and per-Matron layers are stored but not
      // honoured, so saying so beats leaving three dead controls above.
      g.text('one window cannot hold two planes — she goes where they go',
        this.w / 2, y + 6, { size: 9, color: UI.dim })
    }

    this.drawNote(g, this.h - 12)
  }

  /**
   * The theme picker: one small mock panel per theme, in that theme's own
   * colours.
   *
   * Swatches rather than a list of names, because the thing being chosen is
   * entirely visual — "Pewter" and "Ganorok" tell a player nothing, and a
   * six-row radio list would be taller than everything above it put together.
   * Each swatch is a miniature of what it does: body fill, title bar, a button.
   */
  private swatches(g: Painter, x: number, y: number, w: number, current: string): void {
    const gap = 6
    const cw = (w - gap * (SWATCH_COLS - 1)) / SWATCH_COLS
    THEMES.forEach((t, i) => {
      const sx = x + (i % SWATCH_COLS) * (cw + gap)
      const sy = y + Math.floor(i / SWATCH_COLS) * (SWATCH_H + gap)
      const id = `theme:${t.id}`
      this.hits.add(id, sx, sy, cw, SWATCH_H)
      const on = t.id === current
      const hot = this.hits.at(this.px, this.py) === id
      const rad = Math.min(t.radius, 4)

      g.roundRect(sx, sy, cw, SWATCH_H, rad).fill(t.fill)
      // Each swatch is drawn with its own switches, so a bevelled theme looks
      // bevelled and a striped one looks striped at forty pixels across. That
      // is the entire reason these are swatches and not a list of names.
      if (t.pinstripe) {
        for (let ly = sy + 2; ly < sy + SWATCH_H - 1; ly += 3) {
          g.moveTo(sx + 1, ly + 0.5).lineTo(sx + cw - 1, ly + 0.5)
            .stroke({ width: 1, color: 0x000000, alpha: 0.07 })
        }
      }
      if (t.titleBar) g.rect(sx + 1, sy + 1, cw - 2, 7).fill(t.accent)
      else g.rect(sx + 4, sy + 4, cw - 8, 2).fill(t.accent)
      const bh = 9
      const by = sy + 12
      g.roundRect(sx + 4, by, cw - 8, bh, t.gloss ? bh / 2 : Math.min(t.radius, 3))
        .fill(t.gloss ? t.accent : t.row)
      if (t.gloss) {
        g.roundRect(sx + 5, by + 1, cw - 10, bh / 2 - 1, bh / 4)
          .fill({ color: 0xffffff, alpha: 0.45 })
      }
      if (t.bevel) {
        g.moveTo(sx + 4, by + bh).lineTo(sx + 4, by).lineTo(sx + cw - 4, by)
          .stroke({ width: 1, color: 0xffffff, alpha: 0.8 })
      }
      g.rect(sx + 6, sy + 24, cw - 12, 2).fill(t.text)
      if (t.scanlines) {
        for (let ly = sy + 1; ly < sy + SWATCH_H - 1; ly += 3) {
          g.moveTo(sx + 1, ly + 0.5).lineTo(sx + cw - 1, ly + 0.5)
            .stroke({ width: 1, color: 0x000000, alpha: 0.3 })
        }
      }

      frameOf(t).swatch?.(g, t, sx, sy, cw, SWATCH_H)

      g.roundRect(sx + 0.5, sy + 0.5, cw - 1, SWATCH_H - 1, rad)
        .stroke({ width: on ? 2 : 1, color: on || hot ? UI.highlight : UI.edge, alpha: on ? 1 : 0.7 })
    })

    const rows = Math.ceil(THEMES.length / SWATCH_COLS)
    const t = themeById(current)
    g.text(`${t.label} — ${t.note}`, x + w / 2, y + rows * (SWATCH_H + gap) + 4,
      { size: 9, color: UI.dim })
  }

  /**
   * The border picker: one swatch per border, each drawn in the colours of the
   * theme in force, so what you see is the combination you would get.
   * `Theme's own` shows the theme's default border and is marked so it can be
   * told from choosing that same border by name.
   */
  private borders(g: Painter, x: number, y: number, w: number, current: string): void {
    // One row: nine narrow chips read fine, and a second row would push the
    // panel past the height of a small laptop screen.
    const gap = 4
    const cw = (w - gap * (BORDERS.length - 1)) / BORDERS.length
    const on0 = BORDERS.some(b => b.id === current) ? current : 'theme'
    BORDERS.forEach((b, i) => {
      const sx = x + i * (cw + gap)
      const sy = y
      const id = `border:${b.id}`
      this.hits.add(id, sx, sy, cw, SWATCH_H)
      const on = b.id === on0
      const hot = this.hits.at(this.px, this.py) === id
      const rad = Math.min(UI.radius, 4)

      g.roundRect(sx, sy, cw, SWATCH_H, rad).fill(UI.fill)
      g.rect(sx + 6, sy + 12, cw - 12, 2).fill({ color: UI.text, alpha: 0.5 })
      g.rect(sx + 6, sy + 18, cw - 18, 2).fill({ color: UI.text, alpha: 0.3 })

      const frame = b.id === 'theme' ? themeFrame(UI) : FRAMES[b.id]
      if (b.id === 'none') {
        // Nothing to draw, so say so: a faint strike through the empty edge.
        g.moveTo(sx + 5, sy + SWATCH_H - 5).lineTo(sx + cw - 5, sy + 5)
          .stroke({ width: 1, color: UI.dim, alpha: 0.7 })
      } else if (frame?.swatch) {
        frame.swatch(g, UI, sx, sy, cw, SWATCH_H)
      } else if (frame) {
        // The plain frame has no ornament to show, only its keyline and rule.
        g.roundRect(sx + 1.5, sy + 1.5, cw - 3, SWATCH_H - 3, Math.max(0, rad - 1))
          .stroke({ width: 2, color: 0x000000, alpha: 0.5 })
        g.roundRect(sx + 1.5, sy + 1.5, cw - 3, SWATCH_H - 3, Math.max(0, rad - 1))
          .stroke({ width: 1, color: UI.accent, alpha: 0.9 })
      }
      if (b.id === 'theme') g.text('own', sx + cw / 2, sy + SWATCH_H - 6, { size: 7, color: UI.dim })


      g.roundRect(sx + 0.5, sy + 0.5, cw - 1, SWATCH_H - 1, rad)
        .stroke({ width: on ? 2 : 1, color: on || hot ? UI.highlight : UI.edge, alpha: on ? 1 : 0.7 })
    })
    const b = BORDERS.find(x => x.id === on0)!
    g.text(`${b.label} — ${b.note}`, x + w / 2, y + SWATCH_H + 10, { size: 9, color: UI.dim })
  }

  /** Height of the border picker, its caption included. */
  static borderBlock(): number {
    return SWATCH_H + 20
  }

  /** Total height the swatch grid occupies, including its caption. */
  static swatchBlock(): number {
    return Math.ceil(THEMES.length / SWATCH_COLS) * (SWATCH_H + 6) + 14
  }

  /** A slider's value while it is being dragged, before it is saved. */
  private drafts = new Map<string, number>()

  protected override onSlide(id: string, t: number, done: boolean): void {
    const v = fromT(t)
    if (!done) { this.drafts.set(id, v); return }
    this.drafts.delete(id)
    const key = id === 'talk' ? 'talkScale' : 'speechScale'
    void this.host.bridge.invoke('settings:patch', { [key]: v })
  }

  /** Where they are right now, in words rather than a pair of lying radios. */
  private summary(): string {
    if (!this.fore && !this.back) return 'nobody is out'
    if (!this.back) return this.fore === 1 ? 'one of them, in front' : `all ${this.fore}, in front`
    if (!this.fore) return this.back === 1 ? 'one of them, on the desktop' : `all ${this.back}, on the desktop`
    return `${this.fore} in front, ${this.back} on the desktop`
  }

  protected override onDown(_x: number, _y: number, id: string | null): void {
    const b = this.host.bridge
    switch (id) {
      case 'set:front': void b.invoke('layer:set', 'overlay'); break
      case 'set:back': void b.invoke('layer:set', 'underlay'); break
      case 'new:front': void b.invoke('settings:patch', { newcomerLayer: 'overlay' }); break
      case 'new:back': void b.invoke('settings:patch', { newcomerLayer: 'underlay' }); break
      case 'matron:front': void b.invoke('settings:patch', { matronLayer: 'overlay' }); break
      case 'matron:back': void b.invoke('settings:patch', { matronLayer: 'underlay' }); break
      case 'matron:drag':
        void b.invoke('settings:patch', { matronDraggable: !this.host.settings().matronDraggable })
        break
      case 'matron:reset':
        void b.invoke('settings:patch', { matronPos: null })
        this.flash('back to her corner')
        break
      case 'voice:course': void b.invoke('settings:patch', { voice: 'course' }); break
      case 'voice:grunts': void b.invoke('settings:patch', { voice: 'grunts' }); break
      case 'mode:single':
        void b.invoke('settings:patch', {
          stageMode: this.host.settings().stageMode === 'single' ? 'dual' : 'single',
        })
        break
      case 'app:startup':
        void b.invoke('settings:patch', { launchOnStartup: !this.host.settings().launchOnStartup })
        break
      case 'disabled:matron:front':
      case 'disabled:matron:back':
        this.flash('not while one window holds everyone')
        break
      default:
        if (id?.startsWith('theme:')) void b.invoke('settings:patch', { theme: id.slice(6) })
        else if (id?.startsWith('border:')) void b.invoke('settings:patch', { border: id.slice(7) })
        else if (id?.startsWith('level:')) void b.invoke('settings:patch', { level: id.slice(6) })
        else if (id?.startsWith('l2:')) void b.invoke('settings:patch', { l2: id.slice(3) as LanguageId })
        else if (id?.startsWith('l1:')) void b.invoke('settings:patch', { l1: id.slice(3) as LanguageId })
        else if (id?.startsWith('also:')) {
          const lang = id.slice(5) as LanguageId
          void b.invoke('settings:patch', { l1Also: this.host.settings().l1Also === lang ? null : lang })
        } else if (id?.startsWith('disabled:')) {
          const s = this.host.settings()
          const what = id.slice('disabled:'.length)
          if (s.voice !== 'course') this.flash('for when they speak a language')
          else if (what.startsWith('also:')) this.flash('already shown')
          else if (what.startsWith('l2:') || what.startsWith('level:')) this.flash('not verified yet')
        }
    }
  }
}
