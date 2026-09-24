// =============================================================================
// What a creature is made of.
//
// Every gene is a float. Colours are HSL triples sampled from weighted
// continuous distributions, not picked from a table; positions, sizes and rates
// are floats too. The only integers are counts that physically have to be — you
// cannot have 3.7 lumps.
//
// That is the whole design constraint, and it is deliberate: there is no variant
// list, so there is nothing to enumerate, nothing to complete, and nothing for
// the app to accidentally leak. Two pets are never identical. What makes
// "duplicates" still mean something is describe.ts, which puts a lossy set of
// names over these numbers — two mudgins can both read as *ember-eyed,
// five-lumped* and still be visibly different animals.
//
// Rarity here is the tail of a distribution, never a rarity table. Nothing in
// this file knows what "rare" means and nothing in the app rates a pet.
// =============================================================================

/** Hue 0..360, saturation 0..1, lightness 0..1. */
export interface Hsl { h: number; s: number; l: number }

export type SpeciesId = 'mudgin' | 'sephin'

/** A bump on a Mudgin's body. Polar, around the body centre. */
export interface Lump { angle: number; dist: number; r: number }

/** A snaggletooth. `offset` is along the mouth, -1..1. */
export interface Tooth { offset: number; size: number; lean: number }

export interface Wart { angle: number; dist: number; r: number }

export interface MudginGenes {
  species: 'mudgin'
  /** Purple-brown-grey spectrum. */
  body: Hsl
  /** Mostly the same muted band; a long thin tail across the rest of the wheel. */
  eye: Hsl
  lumps: Lump[]
  teeth: Tooth[]
  warts: Wart[]
  /** Rolled at birth, only ever drawn once he is fully mature. */
  flower: Hsl
  /** Milliseconds from adoption to full maturity. Stored, never shown. */
  matureAt: number
  /** Per-individual animation offsets, so a crowd never moves as one animal. */
  bobPhase: number
  blinkRate: number
  /** 0.85..1.15 — some are just bigger. */
  size: number
}

export interface SephinGenes {
  species: 'sephin'
  /** Base body colour; the highlight and outline are lerped from it, exactly as
   *  SephinSlide does with S_BODY_HI / S_BODY_LO. */
  body: Hsl
  /** Base eye light; the rim/mid/hot ramp is derived from it the same way. */
  eye: Hsl
  foot: Hsl
  /** Slight variation in how the six eyes are spaced. */
  eyeCols: number
  eyeRows: number
  bobPhase: number
  blinkRate: number
  size: number
}

export type Genes = MudginGenes | SephinGenes

// ── Colour ───────────────────────────────────────────────────────────────────

/** HSL to a 0xRRGGBB number, which is what Painter takes. */
export function hslHex({ h, s, l }: Hsl): number {
  const hue = ((h % 360) + 360) % 360
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (hue < 60) { r = c; g = x } else if (hue < 120) { r = x; g = c }
  else if (hue < 180) { g = c; b = x } else if (hue < 240) { g = x; b = c }
  else if (hue < 300) { r = x; b = c } else { r = c; b = x }
  const q = (v: number) => Math.max(0, Math.min(255, Math.round((v + m) * 255)))
  return (q(r) << 16) | (q(g) << 8) | q(b)
}

/** Nudge a colour without leaving its identity — used for highlights, rims and
 *  the maturity wash, where the base has to stay recognisable. */
export const shift = (c: Hsl, dh: number, ds: number, dl: number): Hsl => ({
  h: c.h + dh,
  s: Math.max(0, Math.min(1, c.s + ds)),
  l: Math.max(0, Math.min(1, c.l + dl)),
})

// ── Sampling ─────────────────────────────────────────────────────────────────

/** The minimum a sampler needs. Matches engine/math.ts's rng(). */
export interface Sampler {
  next(): number
  range(lo: number, hi: number): number
  int(lo: number, hi: number): number
  chance(p: number): boolean
}

/**
 * A standalone seeded sampler (mulberry32), so the main process can roll a
 * genome — during save migration, say — without importing renderer code.
 * Identical algorithm to engine/math.ts's rng(), deliberately: a given seed
 * produces the same creature on either side of the process boundary.
 */
export function sampler(seed: number): Sampler {
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
    range: (lo, hi) => lo + next() * (hi - lo),
    int: (lo, hi) => Math.floor(lo + next() * (hi - lo + 1)),
    chance: p => next() < p,
  }
}

/** Stable 32-bit hash of a string, for seeding a sampler off a pet id. */
export function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * Sum of two uniforms, normalised. Gives a triangular distribution — values
 * near the middle of the range are common and the ends are genuinely uncommon,
 * without the unbounded tails (and occasional absurdities) of a gaussian.
 */
const tri = (r: Sampler, lo: number, hi: number): number =>
  lo + ((r.next() + r.next()) / 2) * (hi - lo)

/**
 * The muted band every Mudgin's hide sits in: violet through magenta, wrapping
 * round to the browns. Expressed as 250..405 and taken mod 360, because the
 * band crosses zero and a wrapped range is much easier to reason about than two
 * disjoint ones.
 *
 * Canon check: the original Mudgin Gobble hide (#5c434e) is h≈334 s≈0.16
 * l≈0.31, which lands comfortably inside this.
 *
 * Hue is sampled UNIFORMLY across the band, unlike saturation and lightness.
 * A triangular pull here concentrates mass at the band's midpoint — which is
 * ~327°, i.e. orchid — and a first pass at this produced a population that was
 * three-quarters purple-pink with browns almost absent. "Purple-brown-grey" has
 * to mean all three, so the hue spreads evenly and the greys come from the
 * saturation floor instead.
 */
const MUTED_LO = 250
const MUTED_HI = 405

export function rollMudgin(r: Sampler): MudginGenes {
  const body: Hsl = {
    h: r.range(MUTED_LO, MUTED_HI) % 360,
    // Low saturation is what reads as "grey-brown" rather than "purple"; the
    // triangular pull keeps most of them drab and makes a saturated one notable.
    s: tri(r, 0.04, 0.38),
    l: tri(r, 0.18, 0.46),
  }

  // The eye is a mixture. Four times in five it stays in the family — dull, and
  // the reason a bright one is worth noticing. The rest of the time it is drawn
  // from the entire wheel, which is where greens, golds and blues come from.
  //
  // The canonical glowing yellow-green (#b8cc50, h≈70 s≈0.55 l≈0.56) is a roll
  // from the tail, not the default. See the plan's assumption 1.
  //
  // Both branches keep the lightness up. The eye is the one part of a Mudgin
  // that emits light — the art draws a glow under it — so even the drabbest
  // roll has to read as lit. An early version let it reach l=0.34, and a deep
  // violet eye on a deep violet hide looked like a hole rather than an eye.
  const wild = r.chance(0.22)
  const eye: Hsl = wild
    ? { h: r.range(0, 360), s: tri(r, 0.35, 0.85), l: tri(r, 0.48, 0.74) }
    : { h: r.range(MUTED_LO, MUTED_HI) % 360, s: tri(r, 0.2, 0.5), l: tri(r, 0.44, 0.66) }

  const lumpCount = r.int(2, 5)
  const lumps: Lump[] = []
  for (let i = 0; i < lumpCount; i++) {
    lumps.push({
      // Biased to the upper half — they read as a lumpy skull, not a lumpy
      // bottom. Spread around the circle so two lumps rarely sit on each other.
      angle: r.range(-Math.PI * 0.95, 0.15) + (i / lumpCount) * 0.6,
      // Far enough out, and big enough, to break the silhouette. An earlier
      // version kept them at 0.45–0.72 with radius 0.2–0.46, which put every
      // lump entirely inside the body: they were all drawn, all invisible, and
      // a five-lumped Mudgin was pixel-identical to a twin-lumped one. If the
      // count is going to be a trait you can read across a room, the lumps have
      // to stick out.
      dist: r.range(0.62, 0.98),
      r: r.range(0.3, 0.56),
    })
  }

  // Weighted to one. A single snaggletooth is the canonical Mudgin, so a
  // three-toothed one should feel like a find rather than a third of the field.
  const toothCount = r.chance(0.55) ? 1 : r.chance(0.66) ? 2 : 3
  const teeth: Tooth[] = []
  for (let i = 0; i < toothCount; i++) {
    teeth.push({
      // Spread across the mouth rather than clustered, so two teeth read as
      // two teeth and not as one wide one.
      offset: toothCount === 1 ? r.range(-0.4, 0.35) : -0.5 + (i / (toothCount - 1)) * 0.95,
      size: r.range(0.95, 1.9),
      lean: r.range(-0.35, 0.35),
    })
  }

  const wartCount = r.int(3, 7)
  const warts: Wart[] = []
  for (let i = 0; i < wartCount; i++) {
    warts.push({
      angle: r.range(-Math.PI, Math.PI),
      dist: r.range(0.15, 0.62),
      r: r.range(0.045, 0.1),
    })
  }

  return {
    species: 'mudgin',
    body,
    eye,
    lumps,
    teeth,
    warts,
    // Bloom colour. Usually near the eye — see describe/flower notes — and
    // otherwise anything at all.
    flower: r.chance(0.6)
      ? { h: eye.h + r.range(-22, 22), s: tri(r, 0.4, 0.9), l: tri(r, 0.5, 0.78) }
      : { h: r.range(0, 360), s: tri(r, 0.4, 0.9), l: tri(r, 0.5, 0.78) },
    // 12 hours to 7 days. Rolled continuously so no two mature together and no
    // amount of watching yields a number.
    matureAt: r.range(12 * 3600e3, 7 * 24 * 3600e3),
    bobPhase: r.range(0, Math.PI * 2),
    blinkRate: r.range(0.75, 1.35),
    size: tri(r, 0.85, 1.15),
  }
}

export function rollSephin(r: Sampler): SephinGenes {
  // The shipped Sephin is #4a90d9 — h≈209 s≈0.65 l≈0.57. Blues and teals are
  // the family; the tail reaches round to violets, greens and the odd warm one.
  // Uniform across the band for the same reason the Mudgin's hide is — a
  // triangular pull put 42% of the population in one family and made the
  // species look like one animal in five shades.
  const cold = r.chance(0.7)
  const body: Hsl = cold
    ? { h: r.range(160, 285), s: tri(r, 0.3, 0.78), l: tri(r, 0.38, 0.66) }
    : { h: r.range(0, 360), s: tri(r, 0.25, 0.8), l: tri(r, 0.36, 0.68) }

  // Eyes are solid light — no sclera, no pupil — so they want to be bright
  // whatever the hue. Amber (h≈37) is the shipped one and stays the commonest.
  const amber = r.chance(0.4)
  const eye: Hsl = amber
    ? { h: r.range(18, 55), s: tri(r, 0.7, 1), l: tri(r, 0.6, 0.78) }
    : { h: r.range(0, 360), s: tri(r, 0.55, 1), l: tri(r, 0.55, 0.8) }

  return {
    species: 'sephin',
    body,
    eye,
    // Feet are warm by default (the shipped #ffb347) and often not.
    foot: r.chance(0.5)
      ? { h: r.range(18, 52), s: tri(r, 0.6, 1), l: tri(r, 0.52, 0.74) }
      : { h: r.range(0, 360), s: tri(r, 0.4, 0.9), l: tri(r, 0.45, 0.7) },
    // The design study settled on 1.40 / 2.30; vary gently around it. Wider and
    // the six halos merge into one haze, per sephin-eyes.html.
    eyeCols: r.range(1.28, 1.5),
    eyeRows: r.range(2.1, 2.5),
    bobPhase: r.range(0, Math.PI * 2),
    blinkRate: r.range(0.8, 1.3),
    size: tri(r, 0.85, 1.15),
  }
}

export function roll(species: SpeciesId, r: Sampler): Genes {
  return species === 'mudgin' ? rollMudgin(r) : rollSephin(r)
}

/** Every species that can be rolled, in the order the starter choice shows them. */
export const SPECIES: readonly SpeciesId[] = ['mudgin', 'sephin']
