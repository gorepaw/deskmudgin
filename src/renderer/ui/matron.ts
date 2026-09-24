// =============================================================================
// The Matron as a thing on the desktop: where she stands, what she is doing,
// and what happens when you touch her.
//
// She is the app's front door, and she is deliberately *not* a Creature. She
// has no needs, no brain and no genome, she never moves on her own, and she
// exists in exactly one copy. Making her a species would have meant teaching
// every behaviour, every save migration and the whole roster about an animal
// that does none of the things the roster is for.
//
// What she does share with a Creature is the pose-plus-art split: this file
// owns state and hit-testing, art/matron.ts owns every pixel.
// =============================================================================

import type { LayerMode, Settings } from '../../shared/types'
import type { Painter } from '../engine/painter'
import { approach, clamp, type Rng } from '../engine/math'
import { union, type Box } from '../engine/stage'
import type { World } from '../world/world'
import { Speech } from './speech'
import { currentLanguage, line } from '../pet/lines'
import {
  drawMatron, matronBounds, defaultMatronPose, MATRON_SCALE, REACT_T, VB_H, VB_W,
  type MatronPose,
} from '../art/matron'

/** How far off the corner of the work area she sits. */
const MARGIN = 16
/** Seconds a cuddle keeps her warm after the pet has wandered off. */
const WARM_FADE = 6

/**
 * What she says to a pet leaning on her, as [English, Chinese] pairs.
 *
 * The Chinese is the same sentiment from the verified course, not a
 * translation of the English: "sit, then" becomes 请坐。 because that is a
 * verified line that means it. A pair whose Chinese is not in the course is
 * spoken in English rather than invented here.
 */
const LINES: readonly [string, string][] = [
  ['there you are', '你来了！'],
  ['small one', '你好！'],
  ['hm.', '很好！'],
  ['warm today', '今天很热。'],
  ['sit, then', '请坐。'],
  ['good, good', '我很高兴。'],
]

/**
 * What a cuddling behaviour is allowed to know about her.
 *
 * Narrow on purpose. A pet may find her, stand beside her and nestle; it may
 * not move her, read her settings or open her menu. Same rule as `ctx.others`:
 * a behaviour drives one creature and nothing else.
 */
export interface MatronRef {
  readonly x: number
  readonly y: number
  /** Roughly her width, so a pet can pick a spot beside rather than inside her. */
  readonly halfWidth: number
  /** Called every frame a pet is nestled against her. */
  nuzzle(petX: number, petY: number): void
}

export class Matron implements MatronRef {
  readonly pose: MatronPose = defaultMatronPose()
  readonly speech = new Speech()

  /** Her own layer, so she can be in front while the pets are behind. */
  layer: LayerMode = 'overlay'
  draggable = false
  /** Set while the pointer is dragging her, which suppresses the click. */
  dragging = false

  /** Screen-space position, or null while she sits at her anchor. */
  private pinned: { x: number; y: number } | null = null
  private warmT = -99
  private blinkIn = 4
  private blinkT = 0
  private lastSpoke = -99

  constructor(private rng: Rng) {}

  get x(): number { return this.pose.x }
  get y(): number { return this.pose.y }
  get halfWidth(): number { return (VB_W * this.pose.scale) / 2 }

  /** Pull position and permissions out of the settings. Called on boot and on
   *  every settings change, so all three stay in step with one code path. */
  configure(cfg: Settings, world: World): void {
    this.layer = cfg.matronLayer
    this.draggable = cfg.matronDraggable
    this.pinned = cfg.matronPos ? { ...cfg.matronPos } : null
    this.relocate(world)
  }

  /**
   * Put her where she belongs: her pinned spot if she has one, otherwise the
   * bottom-right corner of the **primary** monitor's work area.
   *
   * Primary rather than "wherever she was", because she is a fixture — the
   * point of a front door is that it is always in the same place. A pinned
   * position is clamped back into the desktop on every call, so unplugging the
   * monitor she was dragged to does not lose her.
   */
  relocate(world: World): void {
    const wa = this.primaryWorkArea(world)
    const half = this.halfWidth
    const h = VB_H * this.pose.scale
    if (this.pinned) {
      const p = world.toCanvas(this.pinned)
      this.pose.x = clamp(p.x, half + 2, world.width - half - 2)
      this.pose.y = clamp(p.y, h + 2, world.height - 2)
      return
    }
    this.pose.x = wa.x + wa.width - MARGIN - half
    // Flush with the floor the pets stand on, not floating above it. She is a
    // bust rising out of the bottom of the screen; a gap under her would read
    // as a sprite that failed to land.
    this.pose.y = wa.y + wa.height
  }

  private primaryWorkArea(world: World) {
    const snap = world.snapshot
    const d = snap.displays.find(x => x.primary) ?? snap.displays[0]
    const o = snap.virtualBounds
    return {
      x: d.workArea.x - o.x, y: d.workArea.y - o.y,
      width: d.workArea.width, height: d.workArea.height,
    }
  }

  // ── Interaction ────────────────────────────────────────────────────────────

  hit(x: number, y: number, pad = 4): boolean {
    // Tested against the portrait's own box rather than the (inflated) drawing
    // bounds — those are padded for the ear swing and the eye bloom, and using
    // them would make her grabbable from a finger's width of empty air.
    const w = VB_W * this.pose.scale
    const h = VB_H * this.pose.scale
    return x >= this.pose.x - w / 2 - pad && x <= this.pose.x + w / 2 + pad
      && y >= this.pose.y - h - pad && y <= this.pose.y + pad
  }

  /** She was clicked. Restarts the reaction even if one is already running —
   *  clicking her twice should feel like two clicks. */
  react(): void {
    this.pose.reactT = 0
  }

  /** Move her, in canvas coordinates, and remember it. Returns her new screen
   *  position for persisting. */
  dragTo(x: number, y: number, world: World): { x: number; y: number } {
    const half = this.halfWidth
    const h = VB_H * this.pose.scale
    this.pose.x = clamp(x, half + 2, world.width - half - 2)
    this.pose.y = clamp(y, h + 2, world.height - 2)
    this.pinned = world.toScreen({ x: this.pose.x, y: this.pose.y })
    return this.pinned
  }

  // ── MatronRef ──────────────────────────────────────────────────────────────

  nuzzle(petX: number, petY: number): void {
    this.warmT = 0
    // Look down at whoever is leaning on her.
    this.pose.gaze.x = approach(this.pose.gaze.x, clamp((petX - this.pose.x) / 90, -1, 1), 0.05)
    this.pose.gaze.y = approach(this.pose.gaze.y, clamp((petY - (this.pose.y - 60)) / 90, -1, 1), 0.05)
  }

  // ── Frame ──────────────────────────────────────────────────────────────────

  tick(dt: number, world: World): void {
    const p = this.pose
    p.t += dt
    if (p.reactT >= 0) {
      p.reactT += dt
      if (p.reactT > REACT_T) p.reactT = -1
    }

    // Warmth is a slow rise and a slower fall, so a pet that shuffles a pixel
    // out of range for one frame does not switch her expression off and on.
    this.warmT += dt
    const cuddled = this.warmT < 0.25
    p.warm = approach(p.warm, cuddled ? 1 : 0, dt * (cuddled ? 1.4 : 1 / WARM_FADE))

    if (cuddled && p.t - this.lastSpoke > 14 && this.rng.chance(dt * 0.5)) {
      this.lastSpoke = p.t
      const [en, zh] = this.rng.pick(LINES)
      this.speech.say(currentLanguage() === 'zh' ? line(zh) ?? en : en, 2.6)
    }

    // She watches the pointer when it is nearby and she is not otherwise
    // occupied. Nothing on this face can point anywhere except the eye cores,
    // so this is her only way of noticing you at all.
    if (!cuddled) {
      const c = world.cursor
      const near = c.inside && Math.hypot(c.x - p.x, c.y - (p.y - 70)) < 460
      const gx = near ? clamp((c.x - p.x) / 300, -1, 1) : 0
      const gy = near ? clamp((c.y - (p.y - 70)) / 260, -1, 1) : 0
      p.gaze.x = approach(p.gaze.x, gx, dt * 1.6)
      p.gaze.y = approach(p.gaze.y, gy, dt * 1.6)
    }

    this.blink(dt)
    this.speech.update(dt)
  }

  private blink(dt: number): void {
    if (this.blinkT > 0) {
      this.blinkT -= dt
      this.pose.eyeOpen = clamp(Math.abs(this.blinkT - 0.07) / 0.07)
      if (this.blinkT <= 0) this.pose.eyeOpen = 1
      return
    }
    this.blinkIn -= dt
    if (this.blinkIn <= 0) {
      this.blinkT = 0.14
      // Slow and irregular. She is ancient and mostly still; a brisk blink rate
      // would make her look nervous.
      this.blinkIn = this.rng.range(5, 11)
    }
  }

  draw(g: Painter, worldWidth: number): void {
    drawMatron(g, this.pose)
    this.worldW = worldWidth
    this.speech.draw(g, this.pose.x, this.pose.y - VB_H * this.pose.scale, worldWidth)
  }

  bounds(): Box {
    const b = matronBounds(this.pose)
    // The bubble's own rect, laid out exactly as its draw will be — a fixed
    // allowance sized for one line of English cannot hold three of Chinese.
    const said = this.speech.rect(this.pose.x, this.pose.y - VB_H * this.pose.scale, this.worldW)
    return said ? union(b, said) ?? b : b
  }

  /** From the last draw, so `bounds` clamps the bubble at the screen edge the
   *  same way the draw does. */
  private worldW = Infinity
}

export { MATRON_SCALE, VB_H as MATRON_H, VB_W as MATRON_W }
