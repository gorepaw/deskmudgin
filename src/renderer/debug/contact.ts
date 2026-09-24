// =============================================================================
// Contact sheet. With DESKMUDGIN_CONTACT set, a window draws a grid of freshly
// rolled creatures instead of the colony, on an opaque backdrop, each labelled
// with its derived trait names.
//
// This exists because the genome is the one part of the app that cannot be
// checked by reading it. A distribution can look perfectly sensible as numbers
// and still produce a population that is all the same muddy purple, or whose
// "rare" tail is visibly indistinguishable from its common case. The only way
// to know is to put five dozen of them side by side and look — and hunting for
// individuals in desktop screenshots is not that.
//
// Deliberately not wired to any UI: it is a development instrument, it replaces
// the app's entire output while active, and it should be impossible to reach by
// accident.
// =============================================================================

import type { Painter } from '../engine/painter'
import { roll, sampler, type Genes, type SpeciesId } from '../../shared/genome'
import { describe, summarise } from '../../shared/describe'
import { stageLabel } from '../../shared/maturity'
import { defaultPose } from '../art/pose'
import { speciesOf } from '../species'

interface Cell {
  genes: Genes
  species: SpeciesId
  label: string
  /** 0..1. Only meaningful on a growth sheet; the population sheet leaves it at
   *  0, which is every creature as freshly rolled. */
  age: number
}

/**
 * The ages a growth sheet steps through: newly adopted, then the boundary of
 * each stage, then fully grown.
 *
 * A row is one genome at all five, which is the only way to answer the two
 * questions maturity raises — does the green ever overpower the hide it is
 * washed over, and does the original colour survive somewhere — since both are
 * about a *comparison* that no single screenshot contains.
 */
const AGES = [0, 1 / 3, 2 / 3, 0.85, 1]

export class ContactSheet {
  private cells: Cell[] = []
  private cols = 0
  private cellW = 0
  private cellH = 0

  /** `seed` shifts the whole population, so a suspicious-looking sheet can be
   *  re-rolled without changing any tuning. `growth` swaps the population sheet
   *  for one Mudgin per row, aged across the columns. */
  constructor(
    private width: number, private height: number, seed = 1,
    private growth = false,
  ) {
    if (growth) { this.buildGrowth(seed); return }
    // Wide enough for a two-line trait summary; at 150 the longer ones ran into
    // the neighbouring cell and the sheet became unreadable exactly where the
    // interesting rolls were.
    this.cellW = 186
    this.cellH = 156
    this.cols = Math.max(1, Math.floor(width / this.cellW))
    const rows = Math.max(1, Math.floor((height - 40) / this.cellH))
    const n = this.cols * rows

    const r = sampler(seed)
    for (let i = 0; i < n; i++) {
      // Alternating rather than random, so both species are always well
      // represented — a random split wastes half a sheet on a bad draw.
      const species: SpeciesId = Math.floor(i / this.cols) % 2 === 0 ? 'mudgin' : 'sephin'
      const genes = roll(species, r)
      this.cells.push({ genes, species, label: summarise(describe(genes)), age: 0 })
    }
  }

  /** One Mudgin per row, at every age in AGES. Sephins are absent because
   *  Sephins do not age — a row of five identical ones proves nothing. */
  private buildGrowth(seed: number): void {
    // Capped rather than "the screen divided by five". The window is the whole
    // virtual desktop, so dividing it puts 650px between two creatures that are
    // 40px wide and exist to be compared with each other — the one thing the
    // sheet is for becomes the one thing it makes hard.
    this.cellW = Math.min(210, Math.floor(this.width / AGES.length))
    this.cellH = 150
    this.cols = AGES.length
    const rows = Math.max(1, Math.floor((this.height - 40) / this.cellH))

    const r = sampler(seed)
    for (let row = 0; row < rows; row++) {
      const genes = roll('mudgin', r)
      const label = summarise(describe(genes))
      for (const age of AGES) this.cells.push({ genes, species: 'mudgin', label, age })
    }
  }

  draw(g: Painter, t: number): void {
    g.rect(0, 0, this.width, this.height).fill(0x0e0e1a)
    g.text(
      this.growth
        ? 'one Mudgin per row, aged left to right — the hide must survive at the bottom of every one'
        : `${this.cells.length} rolled genomes — rows alternate species`,
      this.width / 2, 18, { size: 13, color: 0x8a8aa8 },
    )
    if (this.growth) {
      AGES.forEach((age, i) => {
        g.text(stageLabel(age), (i + 0.5) * this.cellW, 34, { size: 10, color: 0xc8a951 })
      })
    }

    this.cells.forEach((cell, i) => {
      const cx = (i % this.cols) * this.cellW + this.cellW / 2
      const cy = Math.floor(i / this.cols) * this.cellH + (this.growth ? 52 : 40)

      const spec = speciesOf(cell.species)
      const pose = defaultPose(cx, cy + this.cellH - 46)
      pose.scale = 0.9 * cell.genes.size
      pose.age = cell.age
      pose.t = t + cell.genes.bobPhase
      // A shallow idle bob so blinks and eye pulses are visible on the sheet —
      // a still frame hides exactly the things most likely to be broken.
      pose.squash = 1 + Math.sin(pose.t * 1.7) * 0.03
      pose.face = i % 2 === 0 ? 1 : -1

      g.rect(cx - this.cellW / 2 + 2, cy - 8, this.cellW - 4, this.cellH - 6)
        .fill({ color: 0x14142a, alpha: 0.6 })
      spec.draw(g, pose, cell.genes)

      // Wrapped onto two lines: the summaries run to about forty characters and
      // a single line would either overflow the cell or be unreadably small.
      const words = cell.label.split(' · ')
      const half = Math.ceil(words.length / 2)
      g.text(words.slice(0, half).join(' · '), cx, cy + this.cellH - 32,
        { size: 9, color: 0xc8c8d8 })
      g.text(words.slice(half).join(' · '), cx, cy + this.cellH - 21,
        { size: 9, color: 0x8a8aa8 })
    })
  }
}
