// =============================================================================
// The Ganorok Matron: a pachyderm giant of "stone" flesh, and the app's front
// door. Ported from galanova's SpeakerSilhouette.tsx (`ganorok_matron`, lines
// 559-573) — the six path strings below are **verbatim**, parsed by Path2D
// rather than redrawn, so she is the same portrait down to the control points.
//
// Redrawing her by hand into Painter calls was the obvious alternative and the
// wrong one: it is thirty-odd bezier control points, every one of them a chance
// to make her subtly not-her, and it would have to happen again for the next
// portrait borrowed from the game. A path string copies exactly.
//
// The animation is invented — galanova's portraits are completely static, so
// there was nothing to port. It is deliberately mild: a squash-and-settle with
// the ears flaring and the trunk swinging, over about half a second. She is a
// fixture you will have on screen for hours, and a fixture that capers is one
// you turn off.
// =============================================================================

import type { Painter } from '../engine/painter'
import { clamp } from '../engine/math'
import { box, type Box } from '../engine/stage'

/** The source viewBox. Every number in this file is in these units. */
export const VB_W = 100
export const VB_H = 130

/** Drawn size relative to the viewBox. She is a landmark, not a widget. */
export const MATRON_SCALE = 1

// The SKIN map's `ganorok_matron` entry: soft pale stone, top to bottom.
const SKIN_TOP = '#5f5952'
const SKIN_BOT = '#302c26'
/** galanova gold, the outline colour on every silhouette. */
const GOLD = '#c8a951'
/** The matron speakers' accent in Data/speakers.json — Ola, Ommo, Marga, the
 *  Lastwarm Matron all share it. It drives the eye-glow. */
const ACCENT = '#e0b070'
const ACCENT_HEX = 0xe0b070
/** The bright core inside each eye, from the source's Eyes component. */
const CORE = '#eaf4ff'

const SHOULDERS = 'M0 130 C0 92 22 82 50 82 C78 82 100 92 100 130 Z'
const EAR_L = 'M20 44 C1 35 0 62 9 79 C25 88 35 72 34 57 Z'
const EAR_R = 'M80 44 C99 35 100 62 91 79 C75 88 65 72 66 57 Z'
const SKULL = 'M50 4 C75 4 85 22 85 48 C85 76 70 97 50 99 C30 97 15 76 15 48 C15 22 25 4 50 4 Z'
const SKULL_RIM = 'M50 4 C75 4 85 22 85 48 C85 74 71 94 58 98'
const TRUNK = 'M50 46 Q60 74 56 104 Q50 114 44 104 Q40 74 50 46 Z'

/** Path2D objects are immutable and reusable — built once, drawn under
 *  whatever transform the frame wants. */
const P = {
  shoulders: new Path2D(SHOULDERS),
  earL: new Path2D(EAR_L),
  earR: new Path2D(EAR_R),
  skull: new Path2D(SKULL),
  rim: new Path2D(SKULL_RIM),
  trunk: new Path2D(TRUNK),
}

/** Eye centres and radii, from the source's `<Eyes … rx={3.2} ry={2.1} />`. */
const EYES: readonly [number, number][] = [[34, 56], [66, 56]]
const EYE_RX = 3.2
const EYE_RY = 2.1

/**
 * The gradient is created against a specific context and cached against it.
 * Canvas gradients are user-space objects resolved through the current
 * transform at fill time, so one built in viewBox coordinates works at any
 * scale and position — it only has to be rebuilt if the context is.
 */
const skinCache = new WeakMap<CanvasRenderingContext2D, CanvasGradient>()
function skin(ctx: CanvasRenderingContext2D): CanvasGradient {
  let grad = skinCache.get(ctx)
  if (!grad) {
    grad = ctx.createLinearGradient(0, 0, 0, VB_H)
    grad.addColorStop(0, SKIN_TOP)
    grad.addColorStop(1, SKIN_BOT)
    skinCache.set(ctx, grad)
  }
  return grad
}

export interface MatronPose {
  /** Centre-bottom of the portrait, in canvas coordinates. */
  x: number
  y: number
  scale: number
  /** Seconds since she was last clicked, or -1 when she is at rest. */
  reactT: number
  /** 0..1, someone is nestled against her. Rises and falls slowly. */
  warm: number
  /** Which way she is looking, in unit offsets from centre. */
  gaze: { x: number; y: number }
  /** Animation clock, seconds. */
  t: number
  /** 1 open, 0 shut. */
  eyeOpen: number
}

export function defaultMatronPose(): MatronPose {
  return { x: 0, y: 0, scale: MATRON_SCALE, reactT: -1, warm: 0, gaze: { x: 0, y: 0 }, t: 0, eyeOpen: 1 }
}

/** How long the click reaction runs. */
export const REACT_T = 0.55

export function matronBounds(p: MatronPose): Box {
  const w = VB_W * p.scale
  const h = VB_H * p.scale
  // Generous on all sides: the ears swing outside the viewBox when they flare,
  // and the eye bloom reaches well past the eyes themselves.
  return box(p.x - w / 2 - 10, p.y - h - 12, w + 20, h + 20)
}

/**
 * The reaction envelope: one decaying oscillation shared by every moving part,
 * so the squash, the ears and the trunk are obviously the same event rather
 * than three animations that happen to overlap.
 *
 * Returns 0 at rest, 1 at the instant of the click, and rings through zero
 * twice on the way down.
 */
function ring(reactT: number): number {
  if (reactT < 0 || reactT > REACT_T) return 0
  const k = reactT / REACT_T
  return (1 - k) * (1 - k) * Math.cos(k * Math.PI * 2.6)
}

export function drawMatron(g: Painter, p: MatronPose): void {
  const { ctx } = g
  const s = ring(p.reactT)
  const env = Math.abs(s)
  const warm = clamp(p.warm)

  // Idle breathing, plus a deeper, slower swell while she is being cuddled.
  const breath = Math.sin(p.t * 0.9) * 0.012 + Math.sin(p.t * 1.6) * 0.02 * warm

  g.save()
  g.translate(p.x - (VB_W / 2) * p.scale, p.y - VB_H * p.scale).scale(p.scale)

  ctx.fillStyle = skin(ctx)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  // ── Shoulders ──────────────────────────────────────────────────────────────
  // Outside the head group: a bust's shoulders do not bounce when it nods.
  ctx.fill(P.shoulders)
  strokePath(ctx, P.shoulders, GOLD, 0.3, 1)

  // ── Head group ─────────────────────────────────────────────────────────────
  // Squashed about the base of the skull, where it meets the shoulders, so the
  // motion reads as the head settling into her rather than the whole bust
  // changing size.
  ctx.save()
  ctx.translate(50, 99)
  ctx.scale(1 + 0.07 * s + breath * 0.4, 1 - 0.09 * s + breath)
  ctx.translate(-50, -99)

  // Ears flare outward and lift. Pivoted on their inner edge where they meet
  // the skull, which is the only pivot that does not tear them off her head.
  const flare = 0.2 * env + 0.05 * warm
  ear(ctx, P.earL, 34, 57, -flare)
  ear(ctx, P.earR, 66, 57, flare)

  ctx.fillStyle = skin(ctx)
  ctx.fill(P.skull)
  strokePath(ctx, P.skull, GOLD, 0.42, 1)
  strokePath(ctx, P.rim, ACCENT, 0.18 + 0.22 * env + 0.12 * warm, 1.4)

  // The trunk swings from where it leaves the face. Its own beat is faster than
  // the body's — it is the loose part, and it keeps moving after she settles.
  ctx.save()
  ctx.translate(50, 46)
  ctx.rotate(0.15 * env * Math.sin(p.reactT * 16) + 0.03 * Math.sin(p.t * 1.1) + p.gaze.x * 0.06)
  ctx.translate(-50, -46)
  ctx.fillStyle = skin(ctx)
  ctx.fill(P.trunk)
  strokePath(ctx, P.trunk, '#000000', 0.16, 0.6)
  ctx.restore()

  eyes(ctx, p, env, warm)
  ctx.restore()

  g.restore()
  // Painter tracks its own path state and knows nothing about the raw ctx work
  // above; resetting alpha is enough to hand it back a clean surface.
  ctx.globalAlpha = 1
}

function ear(
  ctx: CanvasRenderingContext2D, path: Path2D, px: number, py: number, angle: number,
): void {
  ctx.save()
  ctx.translate(px, py)
  ctx.rotate(angle)
  ctx.translate(-px, -py)
  ctx.fill(path)
  strokePath(ctx, path, GOLD, 0.22, 1)
  ctx.restore()
}

/**
 * Six stacked translucent ellipses per eye, the same bloom construction the
 * Sephin's eyes use — an SVG gaussian blur has no cheap Canvas2D equivalent,
 * and `shadowBlur` costs a full-surface composite per shape.
 */
function eyes(ctx: CanvasRenderingContext2D, p: MatronPose, env: number, warm: number): void {
  const open = clamp(p.eyeOpen)
  if (open <= 0.02) {
    // Shut: a lid line, or the face loses its focal point entirely for 140ms
    // and reads as a rock.
    for (const [cx, cy] of EYES) {
      ctx.strokeStyle = '#241f1a'
      ctx.globalAlpha = 0.7
      ctx.lineWidth = 1.1
      ctx.beginPath()
      ctx.moveTo(cx - EYE_RX, cy)
      ctx.lineTo(cx + EYE_RX, cy)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return
  }

  // A click flares the glow; being cuddled keeps it warm and a little wider.
  const boost = 1 + env * 0.9 + warm * 0.35
  const ry = EYE_RY * open

  for (const [cx, cy] of EYES) {
    ctx.fillStyle = ACCENT
    for (const [k, a] of [[2.1, 0.14], [1.5, 0.22], [1.0, 0.34]] as const) {
      ctx.globalAlpha = Math.min(1, a * boost)
      ellipse(ctx, cx, cy, EYE_RX * k, ry * k)
    }
    ctx.globalAlpha = 1
    ellipse(ctx, cx, cy, EYE_RX, ry)

    // The bright core, offset by the gaze. Nothing else on this face can point
    // anywhere — no pupil, no brow — so this is the whole of where she looks.
    ctx.fillStyle = CORE
    ctx.globalAlpha = 0.85
    ellipse(ctx, cx + p.gaze.x * 1.2, cy + p.gaze.y * 0.8, EYE_RX * 0.43, ry * 0.46)
    ctx.globalAlpha = 1
  }
}

function ellipse(
  ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number,
): void {
  ctx.beginPath()
  ctx.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), 0, 0, Math.PI * 2)
  ctx.fill()
}

function strokePath(
  ctx: CanvasRenderingContext2D, path: Path2D, color: string, alpha: number, width: number,
): void {
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = width
  ctx.stroke(path)
  ctx.globalAlpha = 1
}

/** Her glow colour, for particles thrown by whatever she is reacting to. */
export const MATRON_ACCENT = ACCENT_HEX
