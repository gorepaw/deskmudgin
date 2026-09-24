// =============================================================================
// Particles. One flat array, one update, one draw — the pool never exceeds a
// few dozen because a desktop pet that costs measurable GPU is a desktop pet
// you uninstall.
//
// Each kind is a row in KINDS: how it moves, how it draws, how long it lives.
// Adding "he sneezed spores" is one entry, not a new system.
// =============================================================================

import type { Painter } from '../engine/painter'
import { PAL } from './palette'
import { clamp, type Rng } from '../engine/math'

export type FxKind = 'crumb' | 'zzz' | 'heart' | 'spark' | 'dust'

interface Particle {
  kind: FxKind
  x: number; y: number
  vx: number; vy: number
  life: number      // seconds remaining
  max: number       // seconds it started with
  size: number
  spin: number
  color: number
}

interface KindSpec {
  /** Gravity in px/s². Zero floats. */
  g: number
  /** Velocity retained per second — 1 is frictionless. */
  drag: number
  draw(p: Painter, q: Particle, k: number): void
}

const KINDS: Record<FxKind, KindSpec> = {
  // Chips off a desktop icon. They fall, because they have mass and he is
  // chewing something solid.
  crumb: {
    g: 620, drag: 0.98,
    draw: (p, q, k) => {
      p.save().translate(q.x, q.y).rotate(q.spin * q.max * (1 - k))
      p.rect(-q.size / 2, -q.size / 2, q.size, q.size).fill({ color: q.color, alpha: clamp(k * 1.6) })
      p.restore()
    },
  },
  // Sleep. Rises, drifts, fades — and grows, which is what stops three of them
  // reading as one blinking dot.
  zzz: {
    g: -26, drag: 0.995,
    draw: (p, q, k) => {
      const s = q.size * (1.4 - k * 0.5)
      p.text('z', q.x, q.y, { size: s, color: PAL.zzz, alpha: clamp(k) * 0.75 })
    },
  },
  heart: {
    g: -55, drag: 0.99,
    draw: (p, q, k) => {
      const s = q.size * (0.7 + (1 - k) * 0.4)
      const a = clamp(k) * 0.85
      // Two lobes and a point. Cheaper and rounder than a bezier at this size.
      p.circle(q.x - s * 0.3, q.y - s * 0.2, s * 0.42).fill({ color: PAL.heart, alpha: a })
      p.circle(q.x + s * 0.3, q.y - s * 0.2, s * 0.42).fill({ color: PAL.heart, alpha: a })
      p.poly([q.x - s * 0.7, q.y - s * 0.05, q.x + s * 0.7, q.y - s * 0.05, q.x, q.y + s * 0.8])
        .fill({ color: PAL.heart, alpha: a })
    },
  },
  spark: {
    g: 120, drag: 0.94,
    draw: (p, q, k) => {
      const s = q.size * k
      p.moveTo(q.x - s, q.y).lineTo(q.x + s, q.y)
        .moveTo(q.x, q.y - s).lineTo(q.x, q.y + s)
        .stroke({ width: 1.5, color: q.color, alpha: clamp(k) })
    },
  },
  // Landing puff. Spreads outward and dies fast.
  dust: {
    g: -10, drag: 0.9,
    draw: (p, q, k) => {
      p.circle(q.x, q.y, q.size * (1.6 - k))
        .fill({ color: q.color, alpha: clamp(k) * 0.22 })
    },
  },
}

const CAP = 96

export class Fx {
  private pool: Particle[] = []

  constructor(private rng: Rng) {}

  get count(): number { return this.pool.length }

  emit(kind: FxKind, x: number, y: number, n = 1, o: Partial<Particle> = {}): void {
    for (let i = 0; i < n; i++) {
      // Oldest-first eviction. A burst arriving at the cap should push out the
      // fading tail of the last one, not be silently dropped.
      if (this.pool.length >= CAP) this.pool.shift()
      const max = o.life ?? this.rng.range(0.5, 1.1)
      this.pool.push({
        kind, x, y,
        vx: o.vx ?? this.rng.range(-40, 40),
        vy: o.vy ?? this.rng.range(-90, -20),
        life: max, max,
        size: o.size ?? this.rng.range(2, 4),
        spin: o.spin ?? this.rng.range(-8, 8),
        color: o.color ?? PAL.crumb,
      })
    }
  }

  update(dt: number): void {
    for (let i = this.pool.length - 1; i >= 0; i--) {
      const q = this.pool[i]
      const spec = KINDS[q.kind]
      q.life -= dt
      if (q.life <= 0) { this.pool.splice(i, 1); continue }
      const d = Math.pow(spec.drag, dt * 60)
      q.vx *= d
      q.vy = q.vy * d + spec.g * dt
      q.x += q.vx * dt
      q.y += q.vy * dt
    }
  }

  draw(p: Painter): void {
    for (const q of this.pool) KINDS[q.kind].draw(p, q, q.life / q.max)
  }

  /** Union of every live particle, for the dirty rect. */
  bounds(): { x: number; y: number; width: number; height: number } | null {
    if (!this.pool.length) return null
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity
    for (const q of this.pool) {
      const s = q.size * 3
      l = Math.min(l, q.x - s); t = Math.min(t, q.y - s)
      r = Math.max(r, q.x + s); b = Math.max(b, q.y + s)
    }
    return { x: l, y: t, width: r - l, height: b - t }
  }

  clear(): void { this.pool.length = 0 }
}
