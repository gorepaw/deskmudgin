// =============================================================================
// The Sephin: a chubby six-eyed penguin-alien from the liquimetal seas of
// Meyn-Sephir. Ported from galanova's SephinSlide.tsx (drawSephin / drawEyes /
// drawGlow, lines 1644-1764), with the fixed palette replaced by a genome.
//
// The eyes are the whole character and the port keeps their geometry exactly:
// three rows of two, no sclera, no pupil, no highlight dot — each one is solid
// light, built as a rim / body / mid / hot stack over a bloom of three
// translucent discs. The design study that settled this
// (Docs/design/sephin-eyes.html) is worth reading before changing any number
// here; in particular the bloom stops at 2.1× the eye radius because past ~2.8×
// the six halos merge into one haze and take the silhouette with them.
//
// Two cues carry facing, since nothing inside the face points anywhere: the
// block LEANS toward the facing direction, and the leading column burns
// brighter than the trailing one. Both are deliberately small — the study
// halved them from their first values because a wide bloom turned the
// difference in halo size into a permanent lopsided squint.
// =============================================================================

import type { Painter } from '../engine/painter'
import { clamp } from '../engine/math'
import { hslHex, shift, type SephinGenes } from '../../shared/genome'
import { mix, type Pose } from './pose'

/** Body radius at scale 1, in DIP. */
export const R = 21
/** Feet to crown at scale 1 — body height is 2.3R, plus headroom for the bob. */
export const HEIGHT = R * 2.5

export function poseBounds(p: Pose) {
  const r = R * p.scale
  return {
    x: p.x - r * 1.5, y: p.y - r * 2.7 - p.hop * r * 1.4,
    width: r * 3, height: r * 3 + p.hop * r * 1.4,
  }
}

interface Skin {
  body: number
  hi: number
  lo: number
  belly: number
  foot: number
  /** The four steps of the eye light, brightest last. */
  glow: number
  rim: number
  mid: number
  hot: number
}

/**
 * Derived exactly the way the source derives its constants, so a Sephin rolled
 * on the shipped blue comes out the shipped colour. The deltas below are those
 * constants read back as HSL offsets: #4a90d9 → lo #3674ba is s-0.11 l-0.10,
 * → hi #6aa8e7 is s+0.06 l+0.09.
 */
function skinOf(g: SephinGenes): Skin {
  const glow = hslHex(g.eye)
  return {
    body: hslHex(g.body),
    hi: hslHex(shift(g.body, 0, 0.06, 0.09)),
    lo: hslHex(shift(g.body, 0, -0.11, -0.1)),
    belly: hslHex(shift(g.body, 0, -0.45, 0.32)),
    foot: hslHex(g.foot),
    glow,
    // 0x101a33 is the source's deepening target — a near-black navy, not pure
    // black, which is what keeps the rim from reading as a hole.
    rim: mix(glow, 0x101a33, 0.3),
    mid: mix(glow, 0xffffff, 0.22),
    hot: mix(glow, 0xffffff, 0.4),
  }
}

export function drawSephin(g: Painter, p: Pose, genes: SephinGenes): void {
  const r = R * p.scale
  const f = p.face >= 0 ? 1 : -1
  const s = skinOf(genes)
  const slide = clamp(p.slide)

  // The shadow stays on the floor while the body tumbles above it.
  drawShadow(g, p, r, slide)
  const spun = Math.abs(p.spin) > 0.002
  if (spun) {
    // Rotated about the middle of the body, not the feet: a thrown thing turns
    // around its own mass, and spinning it about the soles looks like a hinge.
    g.save().translate(p.x, p.y - r * 1.15).rotate(p.spin).translate(-p.x, -(p.y - r * 1.15))
  }
  if (slide > 0.5) drawSliding(g, p, genes, s, r, f)
  else drawStanding(g, p, genes, s, r, f)
  if (spun) g.restore()
}

function drawShadow(g: Painter, p: Pose, r: number, slide: number): void {
  const k = 1 - p.hop * 0.55
  g.ellipse(p.x, p.y + r * 0.06, r * (0.7 + slide * 0.6) * k, r * 0.18 * k)
    .fill({ color: 0x000000, alpha: 0.22 * k })
}

// ── Standing / airborne ──────────────────────────────────────────────────────
function drawStanding(
  g: Painter, p: Pose, genes: SephinGenes, s: Skin, r: number, f: number,
): void {
  const sq = clamp(p.squash, 0.6, 1.4)
  const bw = r * (2 - (sq - 1) * 0.6)
  const bh = r * 2.3 * sq
  const ox = p.x
  const oy = p.y

  // The waddle. It is the one thing that stopped the original reading as a prop
  // standing still rather than as something alive: 15 rad/s, body bobbing, feet
  // in counter-phase, flippers flapping.
  const walk = clamp(p.walk) * (p.asleep ? 0 : 1)
  const wob = walk * Math.sin(p.t * 15 + genes.bobPhase)
  const cy = oy - bh * 0.5 + wob * r * 0.05

  // Feet.
  g.ellipse(ox - r * 0.55, oy - r * 0.05 + wob * r * 0.05, r * 0.42, r * 0.24).fill(s.foot)
  g.ellipse(ox + r * 0.55, oy - r * 0.05 - wob * r * 0.05, r * 0.42, r * 0.24).fill(s.foot)

  // Flippers. Three speeds: a small counter-swing while walking, a wider flail
  // while airborne, and — held off the ground by something with fingers — a
  // full-blown panic flap. It cannot fly and the flapping does nothing, which
  // is the joke.
  const panic = clamp(p.flap)
  const beat = 18 + panic * 12
  const flap = (p.hop > 0.05 || panic > 0.02)
    ? Math.sin(p.t * beat + genes.bobPhase) * r * (0.25 + panic * 0.5)
    : wob * r * 0.12
  const wave = p.arms === 'wave' ? Math.abs(Math.sin(p.t * 7)) * r * 0.5 : 0
  // The whole flipper tilts as it beats, rather than only sliding up and down;
  // at full panic a purely vertical wobble reads as a glitch.
  const tilt = panic * 0.5
  g.save().translate(ox - bw * 0.52, cy + r * 0.1 - flap).rotate(-flap / r * tilt)
  g.ellipse(0, 0, r * 0.3, r * 0.7).fill(s.lo)
  g.restore()
  g.save().translate(ox + bw * 0.52, cy + r * 0.1 + flap - wave).rotate(flap / r * tilt)
  g.ellipse(0, 0, r * 0.3, r * 0.7).fill(s.lo)
  g.restore()

  // Body.
  g.ellipse(ox, cy, bw * 0.5, bh * 0.5).fill(s.body)
  g.ellipse(ox, cy, bw * 0.5, bh * 0.5).stroke({ width: Math.max(1.4, 2 * p.scale), color: s.lo })
  g.ellipse(ox - bw * 0.16, cy - bh * 0.14, bw * 0.22, bh * 0.24)
    .fill({ color: s.hi, alpha: 0.7 })
  // No belly patch on this pose and no beak: six big orbs occupy the front, and
  // a pale ellipse under them only muddied the glow. The highlight above is the
  // only shading left, and it is enough to keep the body round.

  drawEyes(g, p, genes, s, ox, cy - bh * 0.1, r, f, eyeOpen(p, genes))
}

// ── Belly-slide ──────────────────────────────────────────────────────────────
function drawSliding(
  g: Painter, p: Pose, genes: SephinGenes, s: Skin, r: number, f: number,
): void {
  const ox = p.x
  const by = p.y - r * 0.62
  // Stretched by speed, so top speed looks like top speed.
  const st = 1 + clamp(p.walk) * 0.24

  // Whoosh lines behind, in his own body colour rather than a sea's trail.
  for (let i = 0; i < 3; i++) {
    const lx = ox - f * (r * 1.6 + i * r * 0.7)
    g.moveTo(lx, by - r * 0.3 + i * r * 0.3)
      .lineTo(lx - f * r * 0.8, by - r * 0.3 + i * r * 0.3)
      .stroke({ width: 2, color: s.hi, alpha: 0.45 - i * 0.12 })
  }
  // Swept-back flippers, flattened body, tummy down.
  g.ellipse(ox - f * r * 0.9 * st, by + r * 0.1, r * 0.6, r * 0.28).fill(s.lo)
  g.ellipse(ox, by, r * 1.5 * st, r * 0.78).fill(s.body)
  g.ellipse(ox, by, r * 1.5 * st, r * 0.78).stroke({ width: Math.max(1.4, 2 * p.scale), color: s.lo })
  g.ellipse(ox + f * r * 0.3, by + r * 0.34, r * 1.15 * st, r * 0.42).fill(s.belly)
  g.ellipse(ox - f * r * 0.5, by - r * 0.28, r * 0.8, r * 0.28).fill({ color: s.hi, alpha: 0.6 })
  // Little feet trailing.
  g.ellipse(ox - f * r * 1.35 * st, by + r * 0.45, r * 0.3, r * 0.18).fill(s.foot)

  // Face at the front, squinting from speed. The face draws at 0.64 rather than
  // the body's full radius: three rows this far apart would otherwise push the
  // top pair off a body that is only 0.78 tall while flattened.
  const squint = Math.min(0.42, eyeOpen(p, genes))
  drawEyes(g, p, genes, s, ox + f * r * 1.02 * st, by - r * 0.22, r * 0.64, f, squint)
}

/** A real blink is fast; a slow one reads as a wink. 140 ms every 4.2 s, with
 *  the rate and phase varied per individual so a crowd never blinks together. */
function eyeOpen(p: Pose, genes: SephinGenes): number {
  if (p.asleep) return 0
  const period = 4.2 / genes.blinkRate
  const blink = ((p.t + genes.bobPhase) % period) < 0.14 ? 0.15 : 1
  return Math.min(clamp(p.eyeOpen), blink)
}

function drawEyes(
  g: Painter, p: Pose, genes: SephinGenes, s: Skin,
  ex: number, ey: number, scale: number, f: number, open: number,
): void {
  const er = scale * 0.24
  const cols = [-genes.eyeCols, genes.eyeCols]
  const rows = [-genes.eyeRows, 0, genes.eyeRows]
  // Breathe, so a Sephin standing still still looks powered on.
  const pulse = 0.84 + 0.16 * Math.sin(p.t * 2.1 + genes.bobPhase)
  // The gaze has nowhere to go on a pupil-less eye, so it leans the whole
  // cluster instead — which is the same cue the source uses for facing, just
  // driven by where he is looking rather than where he is going.
  const lean = f * er * 0.17 + clamp(p.gaze.x, -1, 1) * er * 0.5
  const rise = clamp(p.gaze.y, -1, 1) * er * 0.35

  if (open <= 0.04) return   // shut emits nothing, which is what sells the blink

  for (const row of rows) {
    for (const col of cols) {
      const px = ex + col * er + lean
      const py = ey + row * er + rise
      const k = pulse * (col * f > 0 ? 1.07 : 0.93)

      // Bloom as three stacked discs rather than a filter — this stays one
      // path-per-shape and costs nothing beyond the draws it already made.
      const br = er * 2.1
      const a = k * 0.46 * Math.min(1, open + 0.35)
      g.circle(px, py, br).fill({ color: s.glow, alpha: a * 0.14 })
      g.circle(px, py, br * 0.7).fill({ color: s.glow, alpha: a * 0.22 })
      g.circle(px, py, br * 0.46).fill({ color: s.glow, alpha: a * 0.32 })

      g.ellipse(px, py, er, er * open).fill(s.rim)
      g.ellipse(px, py, er * 0.84, er * 0.84 * open).fill({ color: s.glow, alpha: 0.96 })
      g.ellipse(px, py, er * 0.54, er * 0.54 * open).fill({ color: s.mid, alpha: 0.92 })
      g.ellipse(px, py, er * 0.25, er * 0.25 * open).fill({ color: s.hot, alpha: 0.88 })
    }
  }
}
