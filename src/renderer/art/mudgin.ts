// =============================================================================
// The Mudgin. Originally ported from galanova's BombaMudgins/look.ts
// drawMudginInto, now driven by a genome instead of a fixed palette.
//
// Three rules carried over from the original, and worth keeping:
//   • He draws around his own origin — foot at (0,0), body above it. Position,
//     facing and scale are the caller's transform. That is what lets him face
//     left without every shape below growing a sign.
//   • Nothing here reads game state. A pose and a genome in, ink out. Every
//     behaviour produces a pose, and this file cannot tell them apart.
//   • Canon, from Data/races.json: "one eye, one leg, few thoughts." One eye
//     and one leg are not stylisation; the genome varies everything except
//     those.
//
// Every colour is derived from the two genome colours rather than named in a
// palette, so an individual is harmonised with itself — his warts, his rim
// light and the inside of his mouth are all his own hide, moved. A shared
// palette would make every Mudgin's shadows the same colour and quietly undo
// half the variety.
// =============================================================================

import type { Painter } from '../engine/painter'
import { PAL } from './palette'
import { clamp } from '../engine/math'
import { hslHex, shift, type MudginGenes } from '../../shared/genome'
import { bloomOf } from '../../shared/maturity'
import type { Pose } from './pose'

export type { Pose } from './pose'
export { defaultPose } from './pose'

/** Body radius at scale 1, in DIP. Everything else is a fraction of it.
 *
 *  Sized against the Sephin rather than in isolation: side by side at 17 the
 *  Mudgin read as a different, smaller kind of thing, when they are supposed to
 *  be two animals of roughly a size. */
export const R = 20

/** Foot to crown at scale 1. The world needs it to place ledges he fits under
 *  — kept next to poseBounds, which is the thing it has to agree with. */
export const HEIGHT = R * 3.6

/** How much canvas he covers, for dirty-rect bookkeeping and hit testing. */
export function poseBounds(p: Pose) {
  const r = R * p.scale
  return {
    x: p.x - r * 2.2, y: p.y - r * 3.6 - p.hop * r * 1.4,
    width: r * 4.4, height: r * 4.4 + p.hop * r * 1.4,
  }
}

/** Everything the art needs, resolved once per draw rather than per shape. */
interface Skin {
  body: number
  lit: number
  dark: number
  wart: number
  eye: number
  sclera: number
  pupil: number
}

function skinOf(g: MudginGenes): Skin {
  return {
    body: hslHex(g.body),
    // The rim where the eye's glow spills onto him.
    lit: hslHex(shift(g.body, 0, -0.04, 0.11)),
    // Outline, mouth interior, the underside of everything.
    dark: hslHex(shift(g.body, 0, 0.06, -0.19)),
    wart: hslHex(shift(g.body, 0, 0.04, -0.07)),
    eye: hslHex(g.eye),
    // Not white — a cream that carries a trace of his own eye colour, so a
    // violet-eyed Mudgin does not have a stark white sclera bolted on.
    sclera: hslHex(shift(g.eye, 0, -0.58, 0.36)),
    pupil: hslHex(shift(g.eye, 0, 0.12, -0.44)),
  }
}

export function drawMudgin(g: Painter, p: Pose, genes: MudginGenes): void {
  const r = R * p.scale
  const f = p.face >= 0 ? 1 : -1
  const s = skinOf(genes)

  // Centre of the body mass. The hop lifts it; squash trades height for width
  // around it so he keeps his volume.
  const sq = clamp(p.squash, 0.55, 1.45)
  const cx = p.x
  const cy = p.y - r * 1.15 - p.hop * r * 1.3
  const rx = r / Math.sqrt(sq)
  const ry = r * sq

  // The shadow stays flat on the floor while the body tumbles above it.
  drawShadow(g, p, r)
  const spun = Math.abs(p.spin) > 0.002
  if (spun) {
    // About the middle of the body mass, not the foot — a thrown thing turns
    // around its own centre, and pivoting on the sole looks like a hinge.
    g.save().translate(cx, cy).rotate(p.spin).translate(-cx, -cy)
  }

  // ── The one leg ────────────────────────────────────────────────────────────
  // Straight down when grounded, tucked up under him at the top of a hop —
  // which is the whole read on a creature that has only got the one.
  if (!p.asleep) {
    const tuck = p.hop
    const legTop = cy + ry * 0.55
    const legLen = r * 0.95 * (1 - tuck * 0.55)
    const footY = legTop + legLen
    g.roundRect(cx - r * 0.13, legTop, r * 0.26, legLen, r * 0.12).fill(s.body)
    g.ellipse(cx + f * r * 0.12, footY, r * 0.5 * (1 - tuck * 0.2), r * 0.17).fill(s.body)
    // Webbed toes. Three lines is all it takes to read as frog rather than blob.
    for (let i = -1; i <= 1; i++) {
      g.moveTo(cx + f * r * 0.12, footY)
        .lineTo(cx + f * r * (0.12 + 0.42) + i * r * 0.14, footY + r * 0.1)
        .stroke({ width: Math.max(1, 1.2 * p.scale), color: s.dark, alpha: 0.45 })
    }
  }

  // ── Lumpy lopsided body ────────────────────────────────────────────────────
  // The main mass, then his own lumps on top of it. "Misshapen" is the
  // character, and the lump set is the most legible thing the genome varies —
  // you can count them across a room.
  g.ellipse(cx, cy, rx, ry).fill(s.body)
  for (const lump of genes.lumps) {
    // Mirrored with facing so a lump on his blind side stays on his blind side.
    g.circle(cx + f * Math.cos(lump.angle) * rx * lump.dist,
      cy + Math.sin(lump.angle) * ry * lump.dist,
      r * lump.r).fill(s.body)
  }
  // A lit rim on the eye side — the eye is a light source and it should behave
  // like one, or the glow reads as a sticker.
  g.ellipse(cx + f * rx * 0.35, cy - ry * 0.15, rx * 0.5, ry * 0.55)
    .fill({ color: s.lit, alpha: 0.28 })

  // Age, laid over the hide he was born with rather than replacing it.
  drawMoss(g, genes, cx, cy, rx, ry, r, f, clamp(p.age))

  for (const w of genes.warts) {
    g.circle(cx + f * Math.cos(w.angle) * rx * w.dist,
      cy + Math.sin(w.angle) * ry * w.dist,
      r * w.r).fill({ color: s.wart, alpha: 0.55 })
  }

  // Frog tympanum where an ear would be — carried over from the portrait art.
  g.circle(cx - f * rx * 0.62, cy - ry * 0.05, r * 0.19)
    .stroke({ width: Math.max(1, 1.1 * p.scale), color: s.dark, alpha: 0.35 })

  drawArms(g, p, cx, cy, r, rx, f, s.body)
  drawFace(g, p, genes, s, cx, cy, r, rx, ry, f)
  drawFlower(g, p, genes, cx, cy, r, ry, f)
  if (spun) g.restore()
}

/**
 * The green of age, as a vertical wash over the body he already has.
 *
 * Two rules from the brief, and they are the whole design:
 *
 *   • **The green never overpowers the base colour.** It is an overlay at well
 *     under half alpha even at its strongest, so an orchid Mudgin ages into a
 *     mossy orchid rather than into a green one.
 *   • **A gradient, so the original is still fully intact somewhere.** It is
 *     strongest at the crown and reaches nothing by the belly, which leaves the
 *     lower third of every Mudgin exactly the colour it was born. Growing down
 *     from the top is also simply what moss does.
 *
 * Traced over the body *and* its lumps as one path, so the silhouette greens as
 * a whole. Filling them separately would let the overlaps double up and print
 * every lump as a darker patch.
 *
 * `rgba(111,122,60)` is one lichen green for every Mudgin, on purpose: age is
 * not another trait to collect, it is the same thing happening to all of them.
 */
function drawMoss(
  g: Painter, genes: MudginGenes,
  cx: number, cy: number, rx: number, ry: number, r: number, f: number, age: number,
): void {
  if (age <= 0.02) return
  const { ctx } = g
  ctx.save()

  // Every stop is the same green at a falling alpha, never a fade to
  // `transparent`. Canvas2D interpolates gradients in premultiplied colour, so
  // a stop of `transparent` is transparent *black* and the midpoint of the ramp
  // comes out visibly darker — which on a body this size reads as a bruise.
  //
  // The ramp starts just above the crown, not well above it. Starting at 1.5ry
  // spent a fifth of the gradient on empty air, so the strongest stop landed
  // where there was nothing to tint and the creature only ever got the tail of
  // it: measured across a whole lifetime, a crimson hide moved from
  // rgb(141,66,73) to rgb(129,86,68), which reads as "slightly less red" rather
  // than as green. Lumps that poke out above the start clamp to the first stop,
  // which is right — they are the part the moss would reach first.
  const fade = ctx.createLinearGradient(0, cy - ry * 1.05, 0, cy + ry * 0.85)
  fade.addColorStop(0, `rgba(111,122,60,${(0.62 * age).toFixed(3)})`)
  fade.addColorStop(0.62, `rgba(111,122,60,${(0.24 * age).toFixed(3)})`)
  fade.addColorStop(1, 'rgba(111,122,60,0)')
  ctx.fillStyle = fade

  ctx.beginPath()
  ctx.moveTo(cx + rx, cy)
  ctx.ellipse(cx, cy, Math.max(0, rx), Math.max(0, ry), 0, 0, Math.PI * 2)
  for (const lump of genes.lumps) {
    const lx = cx + f * Math.cos(lump.angle) * rx * lump.dist
    const ly = cy + Math.sin(lump.angle) * ry * lump.dist
    ctx.moveTo(lx + r * lump.r, ly)
    ctx.arc(lx, ly, Math.max(0, r * lump.r), 0, Math.PI * 2)
  }
  ctx.fill()
  ctx.restore()
}

/**
 * The flower, which is the last third of growing up rather than a reward at the
 * end of it: a bud the moment the third stage begins, fully open at maturity.
 *
 * Sprouts from the crown, which on a creature that is one lopsided blob is
 * simply the top of the body mass — it moves with the squash and the hop for
 * free, so it nods when he lands without anything here knowing what a hop is.
 */
function drawFlower(
  g: Painter, p: Pose, genes: MudginGenes,
  cx: number, cy: number, r: number, ry: number, f: number,
): void {
  const bloom = bloomOf(clamp(p.age))
  if (bloom <= 0.01 || p.asleep) return

  const petalCol = hslHex(genes.flower)
  const heart = hslHex(shift(genes.flower, 0, 0.1, -0.3))
  const stem = hslHex({ h: 96, s: 0.34, l: 0.3 })

  // Rooted just off centre, on the far side from the eye, so it never grows out
  // of his face.
  const rootX = cx - f * r * 0.22
  const rootY = cy - ry * 0.92
  const len = r * 0.5 * bloom
  // A slow independent sway, so the flower is not welded rigid to a body that
  // is breathing under it.
  const lean = Math.sin(p.t * 1.3 + genes.bobPhase) * r * 0.07 * bloom
  const tipX = rootX + lean
  const tipY = rootY - len

  const w = Math.max(1, 1.5 * p.scale)
  g.moveTo(rootX, rootY).quadTo(rootX + lean * 0.4, rootY - len * 0.6, tipX, tipY)
    .stroke({ width: w, color: stem })

  // One leaf, once it is worth seeing.
  if (bloom > 0.45) {
    const ly = rootY - len * 0.45
    g.moveTo(rootX + lean * 0.25, ly)
      .quadTo(rootX - f * r * 0.22, ly - r * 0.1, rootX - f * r * 0.26, ly + r * 0.04)
      .stroke({ width: w * 0.9, color: stem })
  }

  const pr = r * 0.16 * bloom
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + p.t * 0.12
    g.circle(tipX + Math.cos(a) * pr * 1.05, tipY + Math.sin(a) * pr * 1.05, pr)
      .fill(petalCol)
  }
  g.circle(tipX, tipY, pr * 0.72).fill(heart)
}

/** Contact shadow. Sells him as standing on something rather than floating in
 *  front of it — which on a transparent window is otherwise genuinely
 *  ambiguous. Shrinks and fades as he leaves the ground. */
function drawShadow(g: Painter, p: Pose, r: number): void {
  const k = 1 - p.hop * 0.55
  g.ellipse(p.x, p.y + r * 0.08, r * 0.85 * k, r * 0.22 * k)
    .fill({ color: 0x000000, alpha: 0.22 * k })
}

function drawArms(
  g: Painter, p: Pose, cx: number, cy: number, r: number, rx: number, f: number, body: number,
): void {
  if (p.arms === 'none' || p.asleep) return
  const w = Math.max(1.5, 2.2 * p.scale)
  const sy = cy - r * 0.1
  const near = cx + f * rx * 0.75
  const far = cx - f * rx * 0.75

  if (p.arms === 'tuck') {
    g.moveTo(near, sy).quadTo(near + f * r * 0.3, sy + r * 0.3, cx + f * rx * 0.2, cy + r * 0.45)
      .stroke({ width: w, color: body })
    return
  }
  if (p.arms === 'reach') {
    // Both arms forward, at whatever he has decided to put in his mouth.
    for (const k of [0.12, -0.12]) {
      g.moveTo(near, sy + r * k)
        .quadTo(near + f * r * 0.7, sy + r * (k - 0.1), near + f * r * 1.05, sy + r * (k + 0.05))
        .stroke({ width: w, color: body })
    }
    return
  }
  if (p.arms === 'wave') {
    const swing = Math.sin(p.t * 7) * 0.5
    g.moveTo(near, sy).lineTo(near + f * r * 0.55, sy - r * (0.7 + swing * 0.3))
      .stroke({ width: w, color: body })
    g.moveTo(far, sy).lineTo(far - f * r * 0.35, sy + r * 0.25)
      .stroke({ width: w, color: body })
    return
  }
  // flail — both arms windmilling, out of phase. Ported from the game's
  // 'stumble' send-off, which is exactly the read wanted here.
  const w1 = Math.sin(p.t * 13) * 0.6
  g.moveTo(near, sy).lineTo(near + f * r * 0.6, sy - r * (0.2 + w1)).stroke({ width: w, color: body })
  g.moveTo(far, sy).lineTo(far - f * r * 0.6, sy - r * (0.2 - w1)).stroke({ width: w, color: body })
}

function drawFace(
  g: Painter, p: Pose, genes: MudginGenes, s: Skin,
  cx: number, cy: number, r: number, rx: number, ry: number, f: number,
): void {
  // ── The wide crooked mouth ─────────────────────────────────────────────────
  const mx = cx + f * rx * 0.15
  const my = cy + ry * 0.42
  const open = clamp(p.mouth)
  const halfW = r * 0.42

  if (open > 0.06) {
    g.ellipse(mx, my, halfW, r * 0.3 * open).fill(s.dark)
  } else {
    // Shut: a crooked line, higher on the far side. Never symmetrical.
    g.moveTo(mx - f * r * 0.45, my - r * 0.06)
      .quadTo(mx, my + r * 0.14, mx + f * r * 0.42, my - r * 0.14)
      .stroke({ width: Math.max(1, 1.6 * p.scale), color: s.dark })
  }

  // Snaggleteeth, hanging into the gap. Always visible — a shut mouth still
  // shows them poking over the lip, because that is the whole face.
  for (const tooth of genes.teeth) {
    const tx = mx + f * tooth.offset * halfW
    // A tooth is longer when the mouth is open, but never retracts entirely.
    const len = r * (0.16 + 0.2 * open) * tooth.size
    const top = open > 0.06 ? my - r * 0.24 * open : my + r * 0.02
    const wide = r * 0.07 * tooth.size
    g.poly([
      tx - wide, top,
      tx + wide, top,
      tx + tooth.lean * wide, top + len,
    ]).fill(PAL.tooth)
  }

  // ── The one great glowing eye ──────────────────────────────────────────────
  const ex = cx + f * rx * 0.28
  const ey = cy - ry * 0.28
  const er = r * 0.42
  const lid = clamp(p.eyeOpen)

  if (p.asleep || lid < 0.06) {
    // A closed lid is a curve, not a line — a straight dash reads as dead.
    g.moveTo(ex - er * 0.9, ey).quadTo(ex, ey + er * 0.55, ex + er * 0.9, ey)
      .stroke({ width: Math.max(1.2, 1.8 * p.scale), color: s.dark })
    return
  }

  // Glow first, underneath everything, breathing slightly. This is the only
  // part of him that emits light and it is what makes him readable at a glance
  // on a dark wallpaper. It is his own eye colour, so a rare eye glows rare.
  const pulse = 0.85 + 0.15 * Math.sin(p.t * 2.2 + genes.bobPhase)
  g.circle(ex, ey, er * 1.5 * pulse).fill({ color: s.eye, alpha: 0.13 })
  g.circle(ex, ey, er * 1.1 * pulse).fill({ color: s.eye, alpha: 0.16 })

  // Sclera squeezed vertically by the blink rather than scaled, so a half-blink
  // looks like a lid coming down and not like the eye shrinking.
  g.ellipse(ex, ey, er, er * lid).fill(s.sclera)
  const gx = ex + clamp(p.gaze.x, -1, 1) * er * 0.3
  const gy = ey + clamp(p.gaze.y, -1, 1) * er * 0.26 * lid
  // A big iris. Eye colour is one of the two headline traits a Mudgin is
  // identified by, and at 0.48 of the sclera it was a dot — every creature read
  // as "white eye" with the colour only findable by squinting.
  g.ellipse(gx, gy, er * 0.66, er * 0.66 * lid).fill(s.eye)
  g.ellipse(gx + f * er * 0.06, gy, er * 0.26, er * 0.26 * lid).fill(s.pupil)
  // Catchlight, opposite the facing — it is what makes the eye look wet.
  g.circle(gx - f * er * 0.2, gy - er * 0.25 * lid, er * 0.12)
    .fill({ color: 0xffffff, alpha: 0.7 * lid })

  // Heavy brow ridge above it. Dim, ugly, doggedly enduring.
  g.moveTo(ex - er * 1.15, ey - er * (0.85 + (1 - lid) * 0.3))
    .quadTo(ex, ey - er * (1.45 + (1 - lid) * 0.3), ex + er * 1.05, ey - er * 0.95)
    .stroke({ width: Math.max(1.2, 2 * p.scale), color: s.dark, alpha: 0.5 })
}
