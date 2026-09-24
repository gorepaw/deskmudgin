// =============================================================================
// The body: where a creature is, where it is going, and how it is holding
// itself. Species-agnostic — the differences live behind `Species`.
//
// Locomotion is the interesting part. A Mudgin has one leg, so hopping is the
// only thing it can do: movement is discrete, committed, and slightly
// overshooting, which is most of its charm. A Sephin has two feet and a belly,
// so it walks continuously and, over distance, flops onto its front. Behaviours
// do not know or care which: they declare an intent each frame with
// `moveToward`, and the body resolves it however its species moves.
//
// Intent is per-frame and reset at the end of tick(). A behaviour that stops
// asking stops the creature, with no explicit "stop" call to forget.
// =============================================================================

import { defaultPose, type Pose } from '../art/pose'
import { approach, clamp, lerp, type Rng } from '../engine/math'
import type { Surface, World } from '../world/world'
import type { Entry } from '../../shared/lang/types'
import type { Species } from '../species'
import { NeedsModel } from './needs'
import type { Genes } from '../../shared/genome'
import { ageOf } from '../../shared/maturity'
import type { PetSave } from '../../shared/types'

/** One turn of a conversation, as the creature who said it announces it. */
export interface Utterance {
  /** The whole exchange, so the listener knows what comes next. */
  exchange: Entry
  /** Which turn this was, from 0. The speaker of turn n+1 is the other one. */
  turn: number
  /** Who it was said to. */
  toward: Pet
  /** Brain clock (seconds) when it was said, and how long it stays up. */
  at: number
  dwell: number
}

/** Peak height of an ordinary hop, in DIP. */
const HOP_H = 26
/** Seconds an ordinary hop takes, ground to ground. */
const HOP_T = 0.42
/** How far one hop covers when he has somewhere to be. */
const HOP_D = 34
/** Clearance a leap arcs above the higher of its two ends. */
const LEAP_CLEAR = 44
/** Nothing is worth crossing more of the desktop than this in one go. */
const LEAP_MAX = 900
/** How far from a ledge's ends anyone is willing to stand. */
const EDGE_PAD = 8
/** Waddle and belly-slide speeds, DIP/second. */
const WADDLE_SPEED = 52
const SLIDE_SPEED = 190

// ── Thrown-object physics ────────────────────────────────────────────────────
// Not a simulation of anything; a set of numbers tuned so that letting go feels
// like letting go of something with weight. The tuning that matters:
//
//   • Gravity is roughly three times real-world scale. At 1g a creature thrown
//     across a 4K desktop hangs in the air for well over a second and reads as
//     a balloon.
//   • Restitution is low and horizontal friction is high, so they land near
//     where you threw them rather than skittering off the far edge. A pet you
//     cannot put down where you meant to is annoying rather than fun.
//   • The rest thresholds are generous. Chasing a bounce down to zero produces
//     a creature that jitters on the floor for a second after every drop.
/** Downward acceleration, DIP/s². */
const GRAVITY = 2400
/** Fraction of vertical speed kept through a bounce. */
const BOUNCE = 0.42
/** Fraction of horizontal speed kept through a bounce. */
const SKID = 0.62
/** Below this vertical speed, a landing is a landing rather than a bounce. */
const SETTLE_V = 210
/** Air drag per second, applied to both axes. */
const DRAG = 0.72
/** Nothing may be thrown faster than this, however hard the mouse was flicked. */
const MAX_THROW = 2600
/** Spin, in radians per second, per DIP/s of horizontal speed. */
const SPIN_PER_VX = 0.011

export class Pet {
  pose: Pose
  needs: NeedsModel
  stats: PetSave['stats']
  name: string
  bornAt: number
  lastSeenAt: number
  adoptedAt: number
  readonly species: Species
  readonly genes: Genes

  /** The ledge it is standing on. Behaviours read it; movement maintains it. */
  surface: Surface

  /** 0..1 through the current hop or leap, or -1 when grounded. */
  private hopT = -1
  private hopFrom = 0
  private hopTo = 0
  private hopFromY = 0
  private hopToY = 0
  private hopArc = HOP_H
  private hopDur = HOP_T
  /** Where a behaviour asked to go this frame, or null for "stay put". */
  private intentX: number | null = null
  /** Waddlers only: are we belly-down this frame? */
  private intentSlide = false
  /** Velocity while thrown or falling, DIP/s. Meaningless unless `flying`. */
  private vx = 0
  private vy = 0
  private spinRate = 0
  /** In the air under gravity, as opposed to on a committed hop arc. */
  flying = false
  private blinkIn = 2
  private blinkT = 0

  held = false
  asleep = false
  /**
   * A visitor: on screen, simulated, and not owned. Read by `arrive`, by
   * `depart` and by whatever decides what a click does — nothing else in the
   * body or the brain treats it differently, which is exactly the point.
   */
  wild = false
  /** A visitor main has decided is going. Drives `depart`. */
  leaving = false

  /**
   * What this creature has just said to another, in a conversation.
   *
   * Published by the speaker about *itself*, and read by everyone else — never
   * written by anyone else. That is how two brains hold one exchange without
   * breaking the one-brain-per-creature rule: nobody tells the listener to
   * reply; its own `converse` notices it has been spoken to and chooses to.
   */
  utterance: Utterance | null = null

  constructor(
    save: PetSave, species: Species, world: World, readonly rng: Rng, uiScale = 1,
  ) {
    this.species = species
    this.genes = save.genes
    this.name = save.name
    this.stats = { ...save.stats }
    this.bornAt = save.bornAt
    this.adoptedAt = save.adoptedAt
    this.lastSeenAt = save.lastSeenAt
    this.needs = new NeedsModel({ ...save.needs }, save.mood)
    this.wild = !!save.wild
    this.leaving = !!save.leaving

    const p = world.toCanvas({ x: save.x, y: save.y })
    this.surface = world.groundAt(p.x, p.y)
    this.pose = defaultPose(world.clampToSurface(this.surface, p.x), this.surface.y)
    // The size gene is folded in here, once. Art and bounds read pose.scale and
    // never apply it again — two places applying it is two chances to disagree
    // about how big a hit box is.
    this.pose.scale = uiScale * save.genes.size
  }

  get x(): number { return this.pose.x }
  get y(): number { return this.pose.y }
  /** Standing on something and able to act. False mid-hop and mid-flight, which
   *  is what stops a behaviour trying to leap out of a throw. */
  get grounded(): boolean { return this.hopT < 0 && !this.flying }
  get bounds() { return this.species.bounds(this.pose) }

  /** Is the point on it? Generous by design — they are small, the pointer is
   *  imprecise, and a pet you cannot click is a bug. */
  hit(x: number, y: number, pad = 6): boolean {
    const b = this.bounds
    return x >= b.x - pad && x <= b.x + b.width + pad
      && y >= b.y - pad && y <= b.y + b.height + pad
  }

  toSave(world: World): Omit<PetSave, 'id' | 'layer' | 'out'> {
    const s = world.toScreen({ x: this.pose.x, y: this.pose.y })
    return {
      name: this.name,
      species: this.species.id,
      genes: this.genes,
      needs: { ...this.needs.needs },
      mood: this.needs.mood,
      x: s.x, y: s.y,
      stats: { ...this.stats },
      bornAt: this.bornAt,
      adoptedAt: this.adoptedAt,
      lastSeenAt: Date.now(),
    }
  }

  // ── Intent ─────────────────────────────────────────────────────────────────

  /** "I want to be over there." Resolved in tick() by whatever this species
   *  does instead of walking. Declared per frame; stop asking and it stops. */
  moveToward(x: number, slide = false): void {
    this.intentX = x
    this.intentSlide = slide
  }

  /**
   * Let go of it, with whatever speed the hand had.
   *
   * Called on mouse-up rather than on release-of-`held`, because a drop and a
   * throw are the same gesture at different speeds and the difference is
   * entirely in these two numbers. A drop passes near-zero velocity and simply
   * falls, which is why there is no separate code path for one.
   */
  fling(vx: number, vy: number): void {
    const speed = Math.hypot(vx, vy)
    const k = speed > MAX_THROW ? MAX_THROW / speed : 1
    this.vx = vx * k
    this.vy = vy * k
    this.spinRate = this.vx * SPIN_PER_VX
    this.flying = true
    // A throw cancels any hop it interrupted; the arc is now gravity's.
    this.hopT = -1
    this.held = false
    this.asleep = false
  }

  /**
   * The big one. Reaches a surface ordinary movement cannot — which on the
   * desktop layer is nearly all of them: icons sit in columns a hundred pixels
   * apart.
   *
   * `probeFrom` is the height the search for a landing starts at, and it is the
   * difference between climbing and getting down. groundAt takes the highest
   * ledge at or below the probe, so the default — the top of the world — finds
   * the topmost icon in the column, while passing its own height finds the next
   * ledge beneath it.
   */
  leapTo(x: number, world: World, probeFrom?: number): void {
    if (!this.grounded || this.held || this.asleep) return
    const nx = this.pose.x + clamp(x - this.pose.x, -LEAP_MAX, LEAP_MAX)
    this.begin(nx, world.groundAt(nx, probeFrom ?? -1e6), true)
  }

  private hopToward(x: number, world: World): void {
    if (!this.grounded || this.held || this.asleep) return
    const dx = clamp(x - this.pose.x, -HOP_D, HOP_D)
    if (Math.abs(dx) < 1.5) return
    const nx = this.pose.x + dx
    // Probe from just above the current ledge, so a short hop can step up a low
    // kerb without being able to reach anything far overhead.
    this.begin(nx, world.groundAt(nx, this.pose.y - HOP_H * 0.6))
  }

  private begin(nx: number, landing: Surface, leap = false): void {
    // Clamp the destination onto the ledge before committing to it. Callers
    // pass a target they merely fancy; clamping only on landing means a
    // creature can spend the whole flight outside the world and be snapped back
    // on arrival.
    const lo = landing.x0 + EDGE_PAD
    const hi = landing.x1 - EDGE_PAD
    const to = lo <= hi ? Math.max(lo, Math.min(hi, nx)) : (landing.x0 + landing.x1) / 2

    const dx = to - this.pose.x
    const rise = Math.max(0, this.pose.y - landing.y)
    this.hopFrom = this.pose.x
    this.hopTo = to
    this.hopFromY = this.pose.y
    this.hopToY = landing.y
    this.hopArc = leap ? rise + LEAP_CLEAR : HOP_H
    this.hopDur = leap
      ? clamp(0.34 + Math.hypot(dx, rise) / 900, 0.34, 1.1)
      : HOP_T
    this.surface = landing
    this.hopT = 0
    this.pose.face = Math.sign(dx) || this.pose.face
    this.stats.stepsHopped++
  }

  // ── Frame ──────────────────────────────────────────────────────────────────

  tick(dt: number, world: World, onLand?: (s: Surface) => void): void {
    this.pose.t += dt
    // Recomputed per frame rather than cached: it changes over hours, so the
    // arithmetic is free, and anything cached would need invalidating on
    // adoption, on a save reload and on the debug clock changing scale.
    this.pose.age = ageOf(this.genes, this.adoptedAt)

    if (this.held) {
      this.hopT = -1
      this.flying = false
      this.pose.hop = 0.6
      this.pose.walk = 0
      this.pose.slide = 0
      // Dangling from a hand: whatever has flippers uses them.
      this.pose.flap = approach(this.pose.flap, 1, dt * 6)
      // And it rights itself. Catching one out of a tumble would otherwise
      // leave it hanging off the cursor at whatever angle it was spinning
      // through, which reads as a broken sprite rather than as a held animal.
      this.pose.spin = approach(this.pose.spin, 0, dt * 10)
      this.pose.squash = lerp(this.pose.squash, 1.12, 1 - Math.pow(0.001, dt))
    } else if (this.flying) {
      this.ballistic(dt, world, onLand)
    } else if (this.hopT >= 0) {
      this.airborne(dt, onLand)
    } else {
      // Left standing in mid-air — dropped by something that did not throw it,
      // or the ledge it was on disappeared. Fall rather than teleport.
      if (this.pose.y < this.surface.y - 2) {
        this.flying = true
        this.vx = 0
        this.vy = 0
        this.spinRate = 0
      }
      this.pose.flap = approach(this.pose.flap, 0, dt * 4)
      this.pose.spin = approach(this.pose.spin, 0, dt * 14)
      if (this.species.locomotion === 'waddle') this.waddle(dt, world)
      else this.hopStep(world)
    }

    this.tickBlink(dt)

    // Keep it on its ledge. Displays get unplugged and icons get rearranged
    // underneath them; without this they end up standing in the void.
    //
    // Not while flying: a thrown creature is deliberately allowed to cross the
    // gap between two ledges, and clamping mid-arc would drag it back to the
    // edge of the one it left.
    if (this.grounded && !this.held) {
      this.pose.x = world.clampToSurface(this.surface, this.pose.x)
    }

    this.intentX = null
    this.intentSlide = false
  }

  /**
   * Under gravity, after being thrown or dropped.
   *
   * Landing is tested against whatever ledge is under the creature *this*
   * frame, not the one it set off from — so a Mudgin flung sideways in the
   * desktop layer lands on the icon it happens to be over, which is the whole
   * reason this is worth having over a scripted arc.
   */
  private ballistic(dt: number, world: World, onLand?: (s: Surface) => void): void {
    this.vy += GRAVITY * dt
    const drag = Math.pow(DRAG, dt)
    this.vx *= drag
    this.pose.x += this.vx * dt
    this.pose.y += this.vy * dt
    this.pose.spin += this.spinRate * dt
    this.pose.walk = 0
    this.pose.slide = 0
    this.pose.flap = approach(this.pose.flap, 0.35, dt * 3)

    // Walls. The world's own edges, not the ledge's — bouncing off the side of
    // an icon would be absurd, but bouncing off the side of the screen is what
    // stops a hard flick putting somebody outside the canvas for good.
    const pad = 12
    if (this.pose.x < pad && this.vx < 0) { this.pose.x = pad; this.vx = -this.vx * BOUNCE }
    const right = world.width - pad
    if (this.pose.x > right && this.vx > 0) { this.pose.x = right; this.vx = -this.vx * BOUNCE }

    const landing = world.groundAt(this.pose.x, this.pose.y)
    if (this.pose.y < landing.y || this.vy < 0) {
      // Still rising, or still above the floor. Facing follows the throw, and
      // the stretch is along the direction of travel.
      if (Math.abs(this.vx) > 40) this.pose.face = Math.sign(this.vx)
      this.pose.hop = clamp((landing.y - this.pose.y) / 140)
      this.pose.squash = 1 + clamp(Math.abs(this.vy) / 1800) * 0.22
      return
    }

    // Down.
    this.surface = landing
    this.pose.y = landing.y
    if (Math.abs(this.vy) > SETTLE_V) {
      this.vy = -Math.abs(this.vy) * BOUNCE
      this.vx *= SKID
      this.spinRate *= SKID
      this.pose.squash = 0.74
      onLand?.(landing)
      return
    }
    this.flying = false
    this.vx = 0
    this.vy = 0
    this.spinRate = 0
    this.pose.hop = 0
    this.pose.squash = 0.7
    // Snapped upright on landing rather than eased: a creature that comes to
    // rest at nine degrees off vertical looks broken, not stylish.
    this.pose.spin = 0
    this.pose.x = world.clampToSurface(landing, this.pose.x)
    onLand?.(landing)
  }

  private airborne(dt: number, onLand?: (s: Surface) => void): void {
    this.hopT += dt / this.hopDur
    if (this.hopT >= 1) {
      this.hopT = -1
      this.pose.x = this.hopTo
      this.pose.y = this.hopToY
      this.pose.hop = 0
      this.pose.squash = 0.78          // landing squash; eased back below
      onLand?.(this.surface)
      return
    }
    const k = this.hopT
    this.pose.x = lerp(this.hopFrom, this.hopTo, k)
    // Height is a parabola over the arc; the ledge change is linear under it.
    // Separating them is what lets a creature hop *up* onto an icon instead of
    // teleporting to its height at the apex.
    const arc = 4 * k * (1 - k)
    this.pose.y = lerp(this.hopFromY, this.hopToY, k) - arc * this.hopArc
    this.pose.hop = arc
    this.pose.squash = 1 + arc * 0.18
  }

  /** One leg: movement is discrete, committed, and cannot be changed midair. */
  private hopStep(world: World): void {
    if (this.intentX !== null) this.hopToward(this.intentX, world)
    // Grounded: breathe, and recover from the landing squash.
    this.pose.squash = approach(
      this.pose.squash, 1 + Math.sin(this.pose.t * 1.7 + this.genes.bobPhase) * 0.025, 0.06)
    this.pose.y = this.surface.y
    this.pose.walk = 0
  }

  /** Two feet and a belly: movement is continuous, and long trips go flat. */
  private waddle(dt: number, world: World): void {
    this.pose.y = this.surface.y
    if (this.intentX === null || this.asleep) {
      this.pose.walk = approach(this.pose.walk, 0, dt * 4)
      this.pose.slide = approach(this.pose.slide, 0, dt * 3)
      this.pose.squash = approach(
        this.pose.squash, 1 + Math.sin(this.pose.t * 1.7 + this.genes.bobPhase) * 0.03, 0.06)
      return
    }

    const dx = this.intentX - this.pose.x
    if (Math.abs(dx) < 2) { this.pose.walk = approach(this.pose.walk, 0, dt * 4); return }

    const dir = Math.sign(dx)
    this.pose.face = dir
    // A slide has to commit before it means anything, so `slide` eases rather
    // than snapping — the art switches pose at 0.5 and the ease is what makes
    // the flop read as a flop instead of a substitution.
    this.pose.slide = approach(this.pose.slide, this.intentSlide ? 1 : 0, dt * 3)
    const speed = lerp(WADDLE_SPEED, SLIDE_SPEED, this.pose.slide)
    const step = Math.min(Math.abs(dx), speed * dt)
    this.pose.x += dir * step
    this.pose.walk = approach(this.pose.walk, 1, dt * 5)
    this.stats.stepsHopped += step / 40
  }

  private tickBlink(dt: number): void {
    if (this.asleep) { this.pose.eyeOpen = 0; return }
    // The Sephin blinks inside its own art (the six eyes share one clock), so
    // this only drives species with a lid to close.
    if (this.species.locomotion === 'waddle') { this.pose.eyeOpen = 1; return }
    if (this.blinkT > 0) {
      this.blinkT -= dt
      // Triangle: shut fast, open fast. A sine here reads as sleepy, not blinky.
      this.pose.eyeOpen = clamp(Math.abs(this.blinkT - 0.06) / 0.06)
      if (this.blinkT <= 0) this.pose.eyeOpen = 1
      return
    }
    this.blinkIn -= dt * this.genes.blinkRate
    if (this.blinkIn <= 0) {
      this.blinkT = 0.12
      // Blinks cluster — a fixed interval is uncanny in a way people notice
      // without being able to say why.
      this.blinkIn = this.rng.chance(0.25) ? this.rng.range(0.2, 0.5) : this.rng.range(2.5, 6)
    }
  }

  /** Point the gaze at a canvas position, or straight ahead when given null. */
  lookAt(x: number | null, y = 0): void {
    if (x === null) {
      this.pose.gaze.x = approach(this.pose.gaze.x, this.pose.face * 0.25, 0.06)
      this.pose.gaze.y = approach(this.pose.gaze.y, 0, 0.06)
      return
    }
    const dx = clamp((x - this.pose.x) / 220, -1, 1)
    const dy = clamp((y - (this.pose.y - 24)) / 180, -1, 1)
    this.pose.gaze.x = approach(this.pose.gaze.x, dx, 0.12)
    this.pose.gaze.y = approach(this.pose.gaze.y, dy, 0.12)
  }
}
