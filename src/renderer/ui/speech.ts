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
import { PAL } from '../art/palette'
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

/** Where the bubble sits, relative to the anchor at his head. */
interface Layout { w: number; h: number; x: number; y: number }

export class Speech {
  private said: Utterance | null = null
  private life = 0
  private max = 0
  /** Measured width of the current utterance, 0 until the first draw. */
  private measured = 0

  say(u: Utterance, seconds = 2): void {
    // No queue on purpose. He has few thoughts; the newest one replaces the
    // last, and a backlog of croaks would keep talking long after the moment.
    this.said = u
    // A lesson stays up long enough to read three lines: a floor that grows
    // with the sentence, whatever the caller asked for.
    const floor = isEntry(u) ? dwellSeconds(u) : 0
    this.life = this.max = Math.max(seconds, floor)
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

  private layout(ax: number, ay: number, worldW: number, w: number): Layout {
    const h = this.height
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

    g.roundRect(x, y, w, h, 6).fill({ color: PAL.bubbleFill, alpha: 0.9 * a })
    g.roundRect(x, y, w, h, 6).stroke({ width: 1, color: PAL.bubbleEdge, alpha: 0.9 * a })
    // Tail, clamped to stay attached when the bubble slid away from him.
    const tx = clamp(ax, x + 10, x + w - 10)
    g.poly([tx - 5, y + h - 1, tx + 5, y + h - 1, tx, y + h + 6])
      .fill({ color: PAL.bubbleFill, alpha: 0.9 * a })

    const cx = x + w / 2
    if (!isEntry(u)) {
      g.text(u, cx, y + h / 2, { size: GRUNT, color: PAL.text, alpha: a })
    } else {
      let ly = y + PAD + SCRIPT / 2 + 1
      g.text(u.script, cx, ly, { size: SCRIPT, color: PAL.text, alpha: a, font: script })
      ly += SCRIPT / 2 + GAP
      if (u.reading) {
        g.text(u.reading, cx, ly + READING / 2, { size: READING, color: PAL.reading, alpha: a, font: READING_FONT })
        ly += READING + GAP
      }
      g.text(u.english, cx, ly + GLOSS / 2, { size: GLOSS, color: PAL.gloss, alpha: 0.85 * a })
    }
    return { x: x - 2, y: y - 2, width: w + 4, height: h + 12 }
  }
}
