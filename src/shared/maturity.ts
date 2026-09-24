// =============================================================================
// Growing up. Mudgins only.
//
// A Mudgin greens as it ages and, at the end, puts out a flower. How long that
// takes is `genes.matureAt` — somewhere between twelve hours and a week, rolled
// continuously per creature and **never shown**. Not in the card, not in a
// tooltip, not in the log. The only reading a player ever gets is a bar with no
// numbers on it, so "how long has this one got" stays a thing you estimate by
// looking at it rather than a countdown you wait out.
//
// That is also why the stage boundaries are plain thirds. Anything cleverer
// would be a curve nobody can see, and the bar has to be honest about the one
// thing it does report: how far along the animal is.
//
// Age counts from `adoptedAt`, not `bornAt`. A stranger that wandered the
// desktop for twenty minutes before you noticed it has not been growing up in
// your care, and the clock starting when you take it in is what makes the bar a
// record of your time with it.
// =============================================================================

import type { Genes } from './genome'
import { slowMs } from './clock'

/** How many stages the green passes through. The third is the one that blooms. */
export const STAGES = 3

/**
 * 0 at adoption, 1 fully grown, and it stops there.
 *
 * Returns 1 for anything that does not age — a Sephin is what it is from the
 * day you meet it, so "fully grown" is the honest answer rather than a special
 * case every caller has to remember.
 */
export function ageOf(genes: Genes, adoptedAt: number, now = Date.now()): number {
  if (genes.species !== 'mudgin') return 1
  // Run through the compressed clock so DESKMUDGIN_FAST can turn a week into
  // about seven hours. Guarded because a hand-edited save can carry a zero.
  const span = slowMs(genes.matureAt)
  if (!(span > 0)) return 1
  const k = (now - adoptedAt) / span
  return k < 0 ? 0 : k > 1 ? 1 : k
}

/** 1, 2 or 3. Three is the stage that blooms, and the one it ends in. */
export const stageOf = (age: number): number =>
  Math.min(STAGES, Math.floor(age * STAGES) + 1)

/**
 * How far the flower has opened, 0 until the third stage begins.
 *
 * The bloom *is* the third stage rather than an event at the end of it: it
 * starts as a bud the moment the last third begins and is fully open at
 * maturity, so the thing the player is watching for arrives gradually and can
 * be caught halfway.
 */
export const bloomOf = (age: number): number => {
  const k = (age - (STAGES - 1) / STAGES) * STAGES
  return k < 0 ? 0 : k > 1 ? 1 : k
}

/**
 * What the bar says. Words, never a number — see the file header.
 *
 * Deliberately describes what you can see on the creature rather than how far
 * through it is, so the label and the animal agree and neither one is a clock.
 */
export function stageLabel(age: number): string {
  if (age >= 1) return 'grown'
  if (age >= 2 / 3) return 'in bloom'
  if (age >= 1 / 3) return 'going green'
  return 'still pale'
}
