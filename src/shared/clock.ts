// =============================================================================
// Compressed time, for testing anything that is supposed to take a while.
//
// Most of what makes this app feel like a pet rather than a toy happens on
// timescales nobody can sit through: a cuddle every few minutes, a wild pet
// every ten, a Mudgin maturing over days. Those numbers are the design — they
// are not padding — which means they cannot be shortened for release and they
// cannot be verified at full length either.
//
// So every long wait is written as `slow(seconds)`. Normally that is the
// identity; under DESKMUDGIN_FAST it divides by twenty-five, turning ten
// minutes into twenty-four seconds and a week into about seven hours. Short
// timings — a hop, a bite, a blink, the walk to the edge of the screen — are
// never routed through this, because a creature moving twenty-five times too
// fast is not a faster test, it is a different creature.
//
// Shared rather than renderer-only because both sides own long waits: the
// visitor schedule lives in main, the cuddle cooldown in the renderer. They are
// separate processes, so each sets its own scale at startup.
// =============================================================================

/** Divisor applied to every long wait. 1 in normal use. */
let scale = 1

export function setTimeScale(s: number): void {
  scale = Math.max(0.001, s)
}

export const FAST_SCALE = 1 / 25

/** A duration in seconds that is meant to feel like a wait. */
export const slow = (seconds: number): number => seconds * scale

/** Same, in milliseconds — the unit main's timers and the maturity clock use. */
export const slowMs = (ms: number): number => ms * scale
