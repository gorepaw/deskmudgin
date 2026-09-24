// =============================================================================
// His voice. A few oscillators — no samples, nothing to load, and the same
// tone/burst primitives galanova's arcade uses, so the croaks are recognisably
// the same creature.
//
// The AudioContext is created lazily on the first sound and never at boot. A
// background app that grabs the audio device on login shows up in the volume
// mixer forever and is the sort of thing people notice and resent. At volume 0
// no context is created at all.
// =============================================================================

let ctx: AudioContext | null = null
let master: GainNode | null = null
let volume = 0.5

function ensure(): AudioContext | null {
  if (volume <= 0) return null
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.connect(ctx.destination)
  }
  if (master) master.gain.value = volume
  // Chrome suspends contexts created without a gesture. A pet nobody clicks
  // would stay silent forever otherwise, so nudge it every time.
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function setVolume(v: number): void {
  volume = Math.max(0, Math.min(1, v))
  if (master) master.gain.value = volume
}

interface ToneOpts {
  type?: OscillatorType
  /** Glide to this frequency across the duration. */
  to?: number
  vol?: number
  /** Delay before it starts, seconds. */
  at?: number
}

function tone(freq: number, dur: number, o: ToneOpts = {}): void {
  const c = ensure()
  if (!c || !master) return
  const t0 = c.currentTime + (o.at ?? 0)
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = o.type ?? 'sine'
  osc.frequency.setValueAtTime(freq, t0)
  if (o.to) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.to), t0 + dur)
  // A 4ms attack instead of an instant one. Square-edged gain changes click,
  // and a clicking frog is a bug report.
  g.gain.setValueAtTime(0, t0)
  g.gain.linearRampToValueAtTime(o.vol ?? 0.2, t0 + 0.004)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(master)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

/** Filtered noise — the wet part of a chomp. */
function burst(dur: number, o: { lp?: number; vol?: number; at?: number } = {}): void {
  const c = ensure()
  if (!c || !master) return
  const t0 = c.currentTime + (o.at ?? 0)
  const n = Math.max(1, Math.floor(c.sampleRate * dur))
  const buf = c.createBuffer(1, n, c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n)
  const src = c.createBufferSource()
  src.buffer = buf
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = o.lp ?? 3000
  const g = c.createGain()
  g.gain.value = o.vol ?? 0.15
  src.connect(lp).connect(g).connect(master)
  src.start(t0)
}

/**
 * Gate. Chewing fires on a 0.42s beat and a monitor unplug can retrigger a
 * dozen things in three frames; twelve copies of one croak is a smear, not
 * twelve croaks. Same rule as galanova's sound.ts.
 */
const lastAt = new Map<string, number>()
function gate(key: string, ms: number): boolean {
  const now = performance.now()
  const prev = lastAt.get(key) ?? -Infinity
  if (now - prev < ms) return false
  lastAt.set(key, now)
  return true
}

export const sfx = {
  hop() {
    if (!gate('hop', 90)) return
    tone(180, 0.09, { type: 'triangle', to: 320, vol: 0.06 })
  },
  chomp() {
    if (!gate('chomp', 110)) return
    tone(110, 0.1, { type: 'square', to: 60, vol: 0.09 })
    burst(0.07, { lp: 2200, vol: 0.09 })
  },
  croak() {
    if (!gate('croak', 200)) return
    // Two close tones with a glide between them. The wobble is the frog.
    tone(150, 0.16, { type: 'sawtooth', to: 96, vol: 0.1 })
    tone(302, 0.14, { type: 'sine', to: 190, vol: 0.04, at: 0.03 })
  },
  happy() {
    if (!gate('happy', 400)) return
    tone(330, 0.1, { type: 'triangle', vol: 0.07 })
    tone(494, 0.14, { type: 'triangle', vol: 0.07, at: 0.08 })
  },
  grumble() {
    if (!gate('grumble', 400)) return
    tone(90, 0.3, { type: 'sawtooth', to: 62, vol: 0.07 })
  },
}

export type Sfx = typeof sfx
