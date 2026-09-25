// A speech bubble that knows which way it is allowed to point. He lives at the
// edges of the screen more often than not, and a bubble that runs off the side
// of the monitor is worse than no bubble.
//
// Two shapes. A grunt is one line. A lesson is three — 汉字, then pinyin, then
// the English — and the characters are the largest thing in it, because they
// are the thing being learned; the gloss is there to be glanced at, not read
// first.

import type { Painter } from '../engine/painter'
import type { Box } from '../engine/stage'
import { UI } from './theme'
import * as chrome from './chrome'
import type { Trace } from './chrome'
import { clamp } from '../engine/math'
import { dwellSeconds, isEntry, type Entry, type Utterance } from '../../shared/lang/types'
import { LANGUAGES } from '../../shared/lang'
import { currentLanguage } from '../pet/lines'

const PAD = 7
const GRUNT = 12
const SCRIPT = 17
const READING = 12
/**
 * Pinyin gets its own face, and a size above the gloss's, because tone marks
 * are the one thing on that line that must survive. At 10px in the monospace
 * UI font a caron (ǒ, third tone) rendered identically to a macron (ō, first
 * tone) — found on the speech sheet, where 我 read as "wō". Segoe UI ships with
 * Windows and draws the four diacritics distinctly at this size.
 */
const READING_FONT = '"Segoe UI", "Microsoft YaHei", sans-serif'
const GLOSS = 10
const GAP = 3
/** Half the tail's width at its base, and how far it reaches below. */
const TAIL = 5
const TAIL_H = 6
const MIN_W = 2 * (10 + TAIL + 2) + 4
/** Wider than a grunt's cap: a sentence and its pinyin need the room, and
 *  wrapping three parallel lines would break the line-for-line correspondence
 *  that makes them readable together. */
const MAX_W = 340

/**
 * Told whenever a bubble starts showing a course line, so the ledger can file
 * what you have been shown. Module-level and unset by default: the speech
 * sheet draws hundreds of bubbles and must not fill anyone's ledger with them,
 * so only the real app wires this up.
 */
let onShown: ((e: Entry) => void) | null = null
export const setOnShown = (fn: ((e: Entry) => void) | null): void => { onShown = fn }

/** The player's "how long bubbles stay" settings, as multipliers: one for
 *  everything a creature says on its own, one for conversations. Separate
 *  because a conversation is read as a sequence — someone may want remarks to
 *  flash past but exchanges to linger, or the other way round. */
let scale = 1
let talkScale = 1
export const setSpeechScale = (s: number, talk: number): void => { scale = s; talkScale = talk }

/** How long one turn of a conversation stays up. The conversation paces
 *  itself by this, and hands it to the bubble as an exact duration. */
export const talkSeconds = (e: Entry): number => dwellSeconds(e) * talkScale

/**
 * How long a bubble saying `u` stays up, in seconds.
 *
 * The one place that decides it, so everything that has to wait on a bubble —
 * a conversation waiting for the other creature to finish — waits exactly as
 * long as the bubble is actually shown. A course line gets at least long enough
 * to read its three lines; then the player's setting stretches everything.
 */
export function speechSeconds(u: Utterance, requested = 2): number {
  return Math.max(requested, isEntry(u) ? dwellSeconds(u) : 0) * scale
}

/**
 * A rounded box with the tail folded into its bottom edge at `tx`, as one path.
 * `arcTo` with a radius of 0 is a square corner, so square themes need no
 * second shape.
 */
function outline(g: Painter, x: number, y: number, w: number, h: number, r: number, tx: number): void {
  const b = y + h
  g.moveTo(x + r, y)
    .arcTo(x + w, y, x + w, b, r)
    .arcTo(x + w, b, x, b, r)
    .lineTo(tx + TAIL, b).lineTo(tx, b + TAIL_H).lineTo(tx - TAIL, b)
    .arcTo(x, b, x, y, r)
    .arcTo(x, y, x + w, y, r)
    .close()
}

/** Where the bubble sits, relative to the anchor at his head. */
interface Layout { w: number; h: number; x: number; y: number }

export class Speech {
  private said: Utterance | null = null
  private life = 0
  private max = 0
  /** Measured width of the current utterance, 0 until the first draw. */
  private measured = 0

  /** `exact` takes `seconds` as given — for a caller, like a conversation,
   *  that has already decided precisely how long its line should stay. */
  say(u: Utterance, seconds = 2, exact = false): void {
    // No queue on purpose. He has few thoughts; the newest one replaces the
    // last, and a backlog of croaks would keep talking long after the moment.
    this.said = u
    this.life = this.max = exact ? seconds : speechSeconds(u, seconds)
    this.measured = 0
    if (isEntry(u)) onShown?.(u)
  }

  clear(): void { this.life = 0; this.said = null }
  get active(): boolean { return this.life > 0 && !!this.said }
  /** What is being said right now, for the debug log. */
  get current(): Utterance | null { return this.active ? this.said : null }

  update(dt: number): void { if (this.life > 0) this.life -= dt }

  private get height(): number {
    if (!this.said || !isEntry(this.said)) return GRUNT + PAD * 2
    return PAD * 2 + SCRIPT + GAP + READING + GAP + GLOSS + (this.said.reading ? 0 : -READING - GAP)
  }

  /**
   * A conservative width before the first draw has measured anything.
   *
   * The dirty rect is asked for before the frame is painted, so on the very
   * first frame of a new bubble nothing has been measured yet. Overestimating
   * costs a few repainted pixels; underestimating clips the bubble's edges for
   * a frame, so this errs wide: a CJK glyph is roughly its font size across.
   */
  private get estimate(): number {
    const u = this.said
    if (!u) return 0
    if (!isEntry(u)) return Math.min(220, u.length * 7.5 + PAD * 2)
    return Math.min(MAX_W, Math.max(u.script.length * SCRIPT, u.reading.length * 6.5,
      u.english.length * 6.5) + PAD * 2 + 4)
  }

  private layout(ax: number, ay: number, worldW: number, measured: number): Layout {
    const h = this.height
    // Never narrower than two rounded corners with the tail between them, or a
    // one-character grunt has nowhere flat to hang its tail from.
    const w = Math.max(measured, MIN_W)
    const x = clamp(ax - w / 2, 4, Math.max(4, worldW - w - 4))
    return { w, h, x, y: ay - h - 10 }
  }

  /** The rect this bubble will occupy, for the dirty region. Uses exactly the
   *  layout `draw` uses, so what is repainted is what is drawn. */
  rect(ax: number, ay: number, worldW: number): Box | null {
    if (!this.active) return null
    const l = this.layout(ax, ay, worldW, this.measured || this.estimate)
    return { x: l.x - 2, y: l.y - 2, width: l.w + 4, height: l.h + 12 }
  }

  /** Anchor is his head. Returns the rect drawn. */
  draw(g: Painter, ax: number, ay: number, worldW: number): Box | null {
    const u = this.said
    if (this.life <= 0 || !u) return null

    const script = isEntry(u) ? LANGUAGES[currentLanguage()].font : undefined
    if (!this.measured) {
      this.measured = isEntry(u)
        ? Math.min(MAX_W, Math.max(
            g.measure(u.script, SCRIPT, script),
            u.reading ? g.measure(u.reading, READING, READING_FONT) : 0,
            g.measure(u.english, GLOSS)) + PAD * 2 + 4)
        : Math.min(220, g.measure(u, GRUNT) + PAD * 2)
    }
    const { w, h, x, y } = this.layout(ax, ay, worldW, this.measured)

    // Fade in over the first 120ms and out over the last 300, so it never
    // pops. `max` guards against a bubble shorter than its own fades.
    const a = Math.min(clamp((this.max - this.life) / 0.12), clamp(this.life / 0.3))

    // Drawn through the theme's own chrome, so a bubble belongs to the same
    // interface as the menus: an XP bubble has the blue caption band, an Aqua
    // one its stripes and sheen, an amber one its scanlines. One outline runs
    // round the tail as well, so the border is continuous instead of a rounded
    // box with a triangle pressed against it.
    const r = Math.min(UI.radius, 10, h / 2)
    // The tail stays on the flat part of the bottom edge, clear of the corners,
    // even when the bubble has slid sideways away from him at a screen edge.
    const tx = clamp(ax, x + r + TAIL + 2, x + w - r - TAIL - 2)
    const trace: Trace = p => outline(p, x, y, w, h, r, tx)
    const area = { x, y, w, h: h + TAIL_H }
    chrome.body(g, trace, area, a)
    chrome.band(g, trace, area, 3, a)
    chrome.sheen(g, trace, { x, y, w, h }, a)
    chrome.edge(g, trace, a)

    const cx = x + w / 2
    if (!isEntry(u)) {
      g.text(u, cx, y + h / 2, { size: GRUNT, color: UI.text, alpha: a })
    } else {
      let ly = y + PAD + SCRIPT / 2 + 1
      g.text(u.script, cx, ly, { size: SCRIPT, color: UI.text, alpha: a, font: script })
      ly += SCRIPT / 2 + GAP
      if (u.reading) {
        g.text(u.reading, cx, ly + READING / 2, { size: READING, color: UI.accent, alpha: a, font: READING_FONT })
        ly += READING + GAP
      }
      g.text(u.english, cx, ly + GLOSS / 2, { size: GLOSS, color: UI.dim, alpha: a })
    }
    chrome.glass(g, trace, area, a)
    return { x: x - 2, y: y - 2, width: w + 4, height: h + 12 }
  }
}
