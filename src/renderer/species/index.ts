// =============================================================================
// The species registry. Everything that differs between a Mudgin and a Sephin
// lives behind this interface, so the colony, the brain, the world and the
// input layer never learn what a Sephin is.
//
// Adding a third species is one file plus one entry in SPECIES — the same
// contract the layers and the behaviours already use.
//
// Locomotion is the interesting field. A Mudgin has one leg and can only hop;
// a Sephin has two feet and a belly, so it walks and, over distance, flops onto
// its front and lets the floor do the work. That is a difference in *how a
// destination is reached*, not in *what destinations are wanted* — so it lives
// here, and every behaviour keeps working for both by asking the species to
// move rather than moving anything itself.
// =============================================================================

import type { Painter } from '../engine/painter'
import type { Genes, SpeciesId } from '../../shared/genome'
import type { Pose } from '../art/pose'
import type { Box } from '../engine/stage'
import { drawMudgin, poseBounds as mudginBounds, R as MUDGIN_R, HEIGHT as MUDGIN_H } from '../art/mudgin'
import { drawSephin, poseBounds as sephinBounds, R as SEPHIN_R, HEIGHT as SEPHIN_H } from '../art/sephin'

/** How a species gets from A to B. Implemented by Pet, chosen by the species. */
export type Locomotion = 'hop' | 'waddle'

export interface Species {
  readonly id: SpeciesId
  /** Shown in the popup and the roster. */
  readonly label: string
  /** Body radius at scale 1 — the unit all its art is drawn in. */
  readonly r: number
  /** Feet to crown at scale 1. The world places ledges they fit under. */
  readonly height: number
  readonly locomotion: Locomotion
  /**
   * Behaviour ids this species uses. Anything not listed is filtered out of its
   * brain, which is how `chewIcon` stays a Mudgin habit without `chewIcon`
   * itself having to know a Sephin exists.
   */
  readonly behaviors: readonly string[]
  draw(g: Painter, pose: Pose, genes: Genes): void
  bounds(pose: Pose): Box
}

/**
 * Shared by both: the things any desktop creature does.
 *
 * `arrive` and `depart` are here rather than being a wild-pet-only set, because
 * every species can turn up as a stranger — and both score 0 unless the pet is
 * actually one, so an owned creature carries them inert.
 */
const COMMON = [
  'idle', 'wander', 'sleep', 'followCursor', 'held', 'cuddle', 'arrive', 'depart',
  'tumble',
  'converse',
] as const

const MUDGIN: Species = {
  id: 'mudgin',
  label: 'Mudgin',
  r: MUDGIN_R,
  height: MUDGIN_H,
  locomotion: 'hop',
  behaviors: [...COMMON, 'chewIcon'],
  draw: (g, pose, genes) => {
    if (genes.species !== 'mudgin') return
    drawMudgin(g, pose, genes)
  },
  bounds: mudginBounds,
}

const SEPHIN: Species = {
  id: 'sephin',
  label: 'Sephin',
  r: SEPHIN_R,
  height: SEPHIN_H,
  locomotion: 'waddle',
  behaviors: [...COMMON, 'slide'],
  draw: (g, pose, genes) => {
    if (genes.species !== 'sephin') return
    drawSephin(g, pose, genes)
  },
  bounds: sephinBounds,
}

const REGISTRY: Record<SpeciesId, Species> = { mudgin: MUDGIN, sephin: SEPHIN }

export const speciesOf = (id: SpeciesId): Species => REGISTRY[id] ?? MUDGIN

export const ALL_SPECIES: readonly Species[] = [MUDGIN, SEPHIN]

/**
 * The tallest creature that can exist, for the world's ledge placement.
 *
 * The world nudges top-row icon ledges down so nobody standing behind one is
 * decapitated by the screen edge, and it has to do that before it knows who
 * will stand there — so it budgets for the worst case rather than per-species.
 */
export const MAX_HEIGHT = Math.max(...ALL_SPECIES.map(s => s.height))
