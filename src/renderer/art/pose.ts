// =============================================================================
// How a creature is currently holding itself. Species-agnostic: behaviours set
// these, and each species' art reads whichever fields mean something to it.
//
// Fields a species has no use for are simply ignored — a Mudgin has no belly to
// slide on and a Sephin has no snaggletooth to bare — which is what lets one
// pose struct serve both without a discriminated union that every behaviour
// would then have to branch on.
// =============================================================================

export interface Pose {
  /** Where the feet meet the ground, in canvas space. */
  x: number
  y: number
  /** Includes the genome's size gene; art never applies that separately. */
  scale: number
  /** -1 looks left, +1 looks right. Fractional values turn mid-step. */
  face: number
  /** 0 grounded, 1 at the top of a hop or jump. */
  hop: number
  /** 0 standing still, 1 moving at a lick. Drives the Sephin's waddle. */
  walk: number
  /** 0 upright, 1 flat on the belly. Sephin only. */
  slide: number
  /** <1 squashed, >1 stretched. */
  squash: number
  /** 0 shut, 1 gaping. Mudgin only — the Sephin has no beak. */
  mouth: number
  /** 0 blinked, 1 wide. */
  eyeOpen: number
  /** Where the gaze is directed, in unit offsets from centre. */
  gaze: { x: number; y: number }
  arms: 'none' | 'wave' | 'reach' | 'flail' | 'tuck'
  /**
   * Body rotation in radians, about the middle of the body mass.
   *
   * Only ever non-zero while a creature is tumbling through the air after being
   * thrown. A thrown thing that stays bolt upright reads as a sprite being
   * moved rather than as an object with mass, and that is the whole difference
   * between a drag and a fling.
   */
  spin: number
  /**
   * 0..1, how hard the limbs are working. A Sephin held off the ground flaps
   * its flippers flat out; a Mudgin has none and ignores it.
   */
  flap: number
  asleep: boolean
  /**
   * 0 newly adopted, 1 fully grown. Mudgin art greens with it and puts out a
   * flower at the end; Sephin art ignores it entirely, the same way a Mudgin
   * ignores `slide`.
   *
   * Here rather than as a `draw` parameter for the same reason `scale` is: it
   * is a per-creature number the art needs and the behaviours do not, and Pose
   * is already where those live.
   */
  age: number
  /** Animation clock in seconds. */
  t: number
}

export function defaultPose(x = 0, y = 0): Pose {
  return {
    x, y, scale: 1, face: 1, hop: 0, walk: 0, slide: 0, squash: 1,
    mouth: 0.12, eyeOpen: 1, gaze: { x: 0, y: 0 },
    // Newly adopted. Anything showing a specific creature — a card, the starter
    // panel — sets the real age; a bare pose is a creature you have just met.
    arms: 'none', spin: 0, flap: 0, asleep: false, age: 0, t: 0,
  }
}

/** Blend two 0xRRGGBB colours. The Sephin's ramps are built with this, exactly
 *  as galanova's arcade/pixi/colors.ts lerpColor does. */
export function mix(a: number, b: number, t: number): number {
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255
  return (Math.round(ar + (br - ar) * t) << 16)
    | (Math.round(ag + (bg - ag) * t) << 8)
    | Math.round(ab + (bb - ab) * t)
}
