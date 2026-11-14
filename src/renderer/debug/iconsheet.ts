// =============================================================================
// Icon sheet. With DESKMUDGIN_CONTACT=icon, one Mudgin drawn large on a clear
// background — the source of the app's .ico (see tools/make-icon.mjs).
//
// Drawn by the real art rather than painted separately, for the same reason the
// tray icon is rasterised from circles: there is no sprite sheet, and an icon
// that is a separate drawing can drift from the creature it stands for.
//
//   npm run snap -- icon out.png 256 256 seed=<n> [scale=<s> ground=<0..1+>]
//   npm run snap -- icon out.png 1200 800 grid=1 [seed=<first>]   (pick a seed)
// =============================================================================

import type { Painter } from '../engine/painter'
import { roll, sampler, type Genes } from '../../shared/genome'
import { defaultPose } from '../art/pose'
import { speciesOf } from '../species'

export class IconSheet {
  private readonly cells: { seed: number; genes: Genes }[] = []

  constructor(
    private readonly w: number, private readonly h: number,
    seed: number, private readonly grid: boolean,
    private readonly scale: number, private readonly ground = 0.78,
  ) {
    const n = grid ? Math.floor(w / 150) * Math.floor(h / 150) : 1
    for (let i = 0; i < n; i++) {
      this.cells.push({ seed: seed + i, genes: roll('mudgin', sampler(seed + i)) })
    }
  }

  draw(g: Painter, _now: number): void {
    const mudgin = speciesOf('mudgin')
    if (!this.grid) {
      // Still, facing right, feet on a ground line low in the square: an icon
      // is looked at, not watched, so no bob and no blink mid-frame.
      const c = this.cells[0]
      const pose = defaultPose(this.w / 2, this.h * this.ground)
      pose.scale = this.scale * (this.w / 64)
      pose.t = 0
      pose.face = 1
      mudgin.draw(g, pose, c.genes)
      return
    }
    g.ctx.fillStyle = '#2a2f38'
    g.ctx.fillRect(0, 0, this.w, this.h)
    const cols = Math.floor(this.w / 150)
    this.cells.forEach((c, i) => {
      const x = (i % cols) * 150
      const y = Math.floor(i / cols) * 150
      const pose = defaultPose(x + 75, y + 120)
      pose.scale = 1.6
      pose.t = 0
      pose.face = 1
      mudgin.draw(g, pose, c.genes)
      g.text(String(c.seed), x + 75, y + 140, { size: 11, color: 0xffffff })
    })
  }
}
