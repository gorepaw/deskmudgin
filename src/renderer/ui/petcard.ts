// =============================================================================
// One pet, at length. What the right-click menu used to be, except that this
// one can draw a colour, and can be opened from the desktop layer.
//
// It names traits and stops. There is no rating, no rarity, no "3 of 40 hides"
// — the player learns what is uncommon by how seldom they meet it, and a badge
// saying so would hand them the size of a space that does not have one.
// =============================================================================

import type { PetSave } from '../../shared/types'
import { describe, describeFlower } from '../../shared/describe'
import { ageOf, stageLabel, STAGES } from '../../shared/maturity'
import type { Painter } from '../engine/painter'
import { speciesOf } from '../species'
import { defaultPose } from '../art/pose'
import { Panel, PAD, UI } from './panel'
import { inLang, petName, petNameMeaning } from './tongue'

/** How long the release button stays armed before it disarms itself. */
const CONFIRM_T = 4

export class PetCardPanel extends Panel {
  readonly id: string
  readonly title = ''

  private pet: PetSave | null = null
  private armedAt = -99

  constructor(private petId: string) {
    // Unique per pet, so two cards can be open at once — which is exactly what
    // you want when comparing two animals that look the same.
    super(288, 328)
    this.id = `pet:${petId}`
  }

  override async mount(): Promise<void> {
    // `pet:get` rather than `colony:get`, because this is also how you look at a
    // stranger — and a stranger is deliberately not in the colony.
    this.pet = await this.host.bridge.invoke('pet:get', this.petId)
    // Released, adopted away, or wandered off while the card was open.
    if (!this.pet) this.host.close(this)
  }

  override refresh(): void { void this.mount() }

  protected override body(g: Painter, now: number, top: number): void {
    const p = this.pet
    if (!p) return
    const species = speciesOf(p.species)

    // A stranger has a name — it has had one since it was rolled — but you do
    // not get to know it until you take it in. That is most of the reason
    // adoption feels like anything.
    const name = p.wild ? { text: 'a stranger', lang: 'en' as const } : petName(p)
    const t = inLang(name.lang, 15)
    const title = this.fit(g, name.text, t.size, this.w - 90, t.font)
    g.text(title, PAD, 14, { ...t, color: p.wild ? UI.highlight : UI.accent, align: 'left' })
    // A course name is a small lesson of its own: how to say it, and what it
    // means, beside it in the header.
    const meaning = p.wild ? '' : petNameMeaning(p)
    if (meaning) {
      const after = PAD + g.measure(title, t.size, t.font) + 10
      const said = [('reading' in name ? name.reading : ''), meaning].filter(Boolean).join(' · ')
      g.text(this.fit(g, said, 10, this.w - after - 40, '"Segoe UI", sans-serif'), after, 15,
        { size: 10, color: UI.dim, align: 'left', font: '"Segoe UI", "Microsoft YaHei", sans-serif' })
    }

    let y = top

    // A live portrait, drawn by the species' own art at a fixed idle pose. The
    // alternative — a swatch and a word — cannot show you a lopsided lump.
    const px = PAD + 44
    const py = y + 78
    g.roundRect(PAD, y, 88, 88, 6).fill({ color: UI.fillDeep, alpha: 0.8 })
    g.save()
    g.ctx.beginPath()
    g.ctx.rect(PAD, y, 88, 88)
    g.ctx.clip()
    const pose = defaultPose(px, py - 6)
    pose.scale = p.genes.size
    pose.t = now
    pose.face = 1
    pose.age = ageOf(p.genes, p.adoptedAt)
    species.draw(g, pose, p.genes)
    g.restore()

    // Traits, one to a line, beside the portrait.
    const tx = PAD + 100
    const tw = this.w - tx - PAD
    let ty = y + 12
    g.text(species.label, tx, ty, { size: 11, color: UI.highlight, align: 'left' })
    ty += 17
    const traits = describe(p.genes)
    // The bloom is named only once it is fully open. Listing it earlier would
    // hand the player the answer to the one question maturity is asking.
    const bloom = describeFlower(p.genes)
    if (bloom && ageOf(p.genes, p.adoptedAt) >= 1) traits.push(bloom)
    for (const t of traits) {
      if (t.category === 'species') continue
      g.text(this.fit(g, t.label, 11, tw), tx, ty, { size: 11, color: UI.text, align: 'left' })
      ty += 16
    }

    y += 96
    this.rule(g, y, this.w)
    y += 12

    if (p.wild) {
      // Nothing to report about a creature that has never been yours: no age,
      // no counters, and no layer to put it in. One decision, and it is the
      // only one on offer.
      g.text(p.leaving ? 'it is already walking off' : 'it wandered on from somewhere',
        this.w / 2, y, { size: 10, color: UI.dim })
      y += 18
      this.button(g, 'adopt', PAD, y, this.w - PAD * 2, 30, 'Take it in',
        { primary: true, size: 12 })
      this.drawNote(g, this.h - 12)
      return
    }

    // Facts, not achievements. A lifetime chew count is a story about a
    // creature; it is not a target and nothing in the app compares two of them.
    const days = Math.max(0, Math.floor((Date.now() - p.adoptedAt) / 86_400_000))
    const withYou = days === 0 ? 'here since today' : days === 1 ? 'here a day' : `here ${days} days`
    const bits = [withYou]
    if (p.stats.iconsChewed > 0) bits.push(`${p.stats.iconsChewed} bites`)
    if (p.stats.pets > 0) bits.push(`${p.stats.pets} pats`)
    g.text(this.fit(g, bits.join(' · '), 10, this.w - PAD * 2), PAD, y,
      { size: 10, color: UI.dim, align: 'left' })
    y += 16

    if (p.species === 'mudgin') {
      this.growth(g, PAD, y, this.w - PAD * 2, ageOf(p.genes, p.adoptedAt))
      y += 26
    }

    // Where it is.
    const half = (this.w - PAD * 2 - 6) / 2
    this.button(g, 'layer:overlay', PAD, y, half, 26, 'In front',
      { on: true, primary: p.out && p.layer === 'overlay', size: 11 })
    this.button(g, 'layer:underlay', PAD + half + 6, y, half, 26, 'On the desktop',
      { primary: p.out && p.layer === 'underlay', size: 11 })
    y += 32
    this.button(g, 'out:toggle', PAD, y, half, 26, p.out ? 'Send home' : 'Bring out',
      { size: 11 })

    // Release, armed by a first press. Two clicks and a change of colour is the
    // whole ceremony — the ledger keeps what it learned either way, which is
    // what makes this safe enough not to need a modal.
    const armed = now - this.armedAt < CONFIRM_T && this.armedAt > 0
    this.button(g, 'release', PAD + half + 6, y, half, 26,
      armed ? 'Really?' : 'Send away', { danger: armed, size: 11 })

    this.drawNote(g, this.h - 12)
  }

  protected override onDown(_x: number, _y: number, id: string | null): void {
    const p = this.pet
    if (!p) return
    const b = this.host.bridge
    const now = performance.now() / 1000
    switch (id) {
      case 'adopt':
        // Adopted where it is standing, from main's copy — this card may be on
        // the other window from the one drawing it, so it has no live position
        // of its own to offer.
        void b.invoke('pet:adopt', p.id, { x: p.x, y: p.y }).then(taken => {
          if (taken) this.refresh()
          else this.host.close(this)
        })
        break
      case 'layer:overlay':
      case 'layer:underlay': {
        const layer = id === 'layer:overlay' ? 'overlay' : 'underlay'
        void b.invoke('pet:setLayer', p.id, layer)
        if (!p.out) void b.invoke('pet:setOut', p.id, true)
        break
      }
      case 'out:toggle':
        void b.invoke('pet:setOut', p.id, !p.out)
        break
      case 'release':
        if (now - this.armedAt < CONFIRM_T && this.armedAt > 0) {
          void b.invoke('pet:release', p.id)
          this.host.close(this)
        } else {
          this.armedAt = now
          this.flash('press again to send them away for good')
        }
        break
    }
  }

  /**
   * The growing-up bar. The only reading of maturity the app ever gives.
   *
   * No number, no time remaining, no percentage — `matureAt` is rolled between
   * twelve hours and a week per creature and is never shown anywhere, so how
   * long one has left is something you judge by looking at this and at the
   * animal. The three ticks are the three stages of the green; the word below
   * says what you can already see on it rather than how far through it is.
   */
  private growth(g: Painter, x: number, y: number, w: number, age: number): void {
    const h = 7
    g.roundRect(x, y, w, h, 3.5).fill({ color: UI.fillDeep, alpha: 0.9 })
    if (age > 0) {
      g.roundRect(x, y, Math.max(h, w * age), h, 3.5)
        .fill({ color: age >= 1 ? UI.good : UI.accent, alpha: 0.85 })
    }
    // Stage boundaries, drawn over the fill so they read as marks on a ruler
    // rather than as segments of the bar.
    for (let i = 1; i < STAGES; i++) {
      const tx = x + (w * i) / STAGES
      g.moveTo(tx, y).lineTo(tx, y + h).stroke({ width: 1, color: UI.fill, alpha: 0.9 })
    }
    g.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, 3.5)
      .stroke({ width: 1, color: UI.edge, alpha: 0.8 })
    g.text(stageLabel(age), x, y + h + 9, { size: 9, color: UI.dim, align: 'left' })
  }

  /** The card's own clock has to match the one `flash` uses, or "Really?"
   *  would disarm on a different schedule than the message that explains it. */
  override draw(g: Painter, _now: number): void {
    super.draw(g, performance.now() / 1000)
  }
}
