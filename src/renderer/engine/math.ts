// Small numeric helpers shared by the sim and the art. Ported from galanova's
// arcade/pixi/math so behaviour matches the game it came from.

export const clamp = (v: number, lo = 0, hi = 1): number => v < lo ? lo : v > hi ? hi : v
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/** Move `a` toward `b` by at most `max`. The workhorse of every eased value. */
export const approach = (a: number, b: number, max: number): number =>
  Math.abs(b - a) <= max ? b : a + Math.sign(b - a) * max

/** Smooth 0→1 with zero derivative at both ends. */
export const smooth = (t: number): number => { const k = clamp(t); return k * k * (3 - 2 * k) }

/**
 * Deterministic 0..1 from two integers. Used anywhere art has to look random
 * but must be identical every time it is drawn — the same reason galanova's
 * bog dressing uses it: a value that reshuffled on resize would make the world
 * twitch. Math.imul keeps the mixing in 32-bit where the constants belong.
 */
export function hash01(x: number, y: number): number {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

/** A tiny seeded PRNG (mulberry32) so a run can be replayed when debugging. */
export function rng(seed: number) {
  let a = seed >>> 0
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next,
    range: (lo: number, hi: number) => lo + next() * (hi - lo),
    int: (lo: number, hi: number) => Math.floor(lo + next() * (hi - lo + 1)),
    pick: <T>(xs: readonly T[]): T => xs[Math.floor(next() * xs.length)],
    chance: (p: number) => next() < p,
  }
}

export type Rng = ReturnType<typeof rng>

export const dist = (ax: number, ay: number, bx: number, by: number): number =>
  Math.hypot(bx - ax, by - ay)
