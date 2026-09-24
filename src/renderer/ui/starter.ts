// =============================================================================
// The first one.
//
// Two live creatures, side by side, and you take one. They are the actual
// animals — rolled by main and held there until the choice is made — not
// illustrations of a species, so the Mudgin you are looking at is the Mudgin
// you get, lumps and all.
//
// The one you leave behind is discarded outright. It is not put back in a pool
// and it does not turn up later as a stranger, because there is no pool: it was
// one roll out of an unbounded space, and the space does not run out.
//
// This is the one panel with no close button. Two options and one decision is
// not a dialog anybody needs to escape from, and an app whose first act is to
// leave you with nothing on the desktop is indistinguishable from one that
// crashed.
// =============================================================================

import type { PetSave } from '../../shared/types'
import { describe } from '../../shared/describe'
import type { Painter } from '../engine/painter'
import { speciesOf } from '../species'
import { defaultPose } from '../art/pose'
import { shownName } from '../../shared/names'
import { LANGUAGES } from '../../shared/lang'
import { currentLanguage } from '../pet/lines'
import { Panel, PAD, UI } from './panel'

const CARD_W = 168
const CARD_H = 196

export class StarterPanel extends Panel {
  readonly id = 'starter'
  readonly title = 'Someone to start with'
  override readonly subtitle = 'the other one goes its own way'
  // The first run's one decision. See the file header.
  override readonly closable = false

  private offer: PetSave[] = []

  constructor() { super(PAD * 3 + CARD_W * 2, CARD_H + 106) }

  override async mount(): Promise<void> {
    this.offer = await this.host.bridge.invoke('starter:offer')
  }

  protected override body(g: Painter, now: number, top: number): void {
    if (!this.offer.length) {
      g.text('…', this.w / 2, this.h / 2, { size: 14, color: UI.dim })
      return
    }

    for (let i = 0; i < this.offer.length && i < 2; i++) {
      this.card(g, this.offer[i], PAD + i * (CARD_W + PAD), top + 2, now)
    }

    g.text('they are both this specific — nothing here comes in a standard model',
      this.w / 2, this.h - 16, { size: 9, color: UI.dim })
  }

  private card(g: Painter, p: PetSave, x: number, y: number, now: number): void {
    const id = `take:${p.id}`
    this.hits.add(id, x, y, CARD_W, CARD_H)
    const hot = this.hits.at(this.px, this.py) === id
    const species = speciesOf(p.species)

    g.roundRect(x, y, CARD_W, CARD_H, 6)
      .fill({ color: hot ? UI.rowHot : UI.row, alpha: 0.95 })
    g.roundRect(x + 0.5, y + 0.5, CARD_W - 1, CARD_H - 1, 6)
      .stroke({ width: 1, color: hot ? UI.highlight : UI.edge, alpha: 0.9 })

    // Live, and animating. A still would hide the half of each species that is
    // motion — a Mudgin's hop and a Sephin's waddle are most of their character.
    g.save()
    g.ctx.beginPath()
    g.ctx.rect(x + 6, y + 6, CARD_W - 12, 104)
    g.ctx.clip()
    const pose = defaultPose(x + CARD_W / 2, y + 104)
    pose.scale = p.genes.size * 1.15
    pose.t = now
    // A slow idle bob apiece, out of phase, so the pair does not move in step.
    pose.squash = 1 + Math.sin(now * 1.7 + p.genes.bobPhase) * 0.03
    pose.face = 1
    species.draw(g, pose, p.genes)
    g.restore()

    let ty = y + 124
    g.text(shownName(p, currentLanguage()), x + CARD_W / 2, ty,
      { size: 13, color: UI.accent, font: currentLanguage() === 'zh' && p.zh ? LANGUAGES.zh.font : undefined })
    ty += 15
    g.text(species.label, x + CARD_W / 2, ty, { size: 10, color: UI.highlight })
    ty += 15
    for (const t of describe(p.genes)) {
      if (t.category === 'species') continue
      g.text(this.fit(g, t.label, 10, CARD_W - 16), x + CARD_W / 2, ty,
        { size: 10, color: UI.text })
      ty += 13
    }
  }

  protected override onDown(_x: number, _y: number, id: string | null): void {
    if (!id?.startsWith('take:')) return
    void this.host.bridge.invoke('starter:choose', id.slice(5))
    this.host.close(this)
  }
}
