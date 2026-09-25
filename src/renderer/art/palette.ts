// Lifted from galanova (Mudgin Gobble's PAL and SpeakerSilhouette's SKIN map)
// so the desktop Mudgin is the same creature as the one in the game, down to
// the hex. Do not "improve" these — they are canon.

export const PAL = {
  body: 0x5c434e,       // bruised bog-purple hide
  bodyLit: 0x6d5060,    // rim where the one eye's glow spills onto him
  dark: 0x2d2026,
  eye: 0xb8cc50,        // the one great glowing eye
  eyeWhite: 0xf0eee2,
  pupil: 0x2a2018,
  tooth: 0xf2ecd8,      // the snaggle
  mouth: 0x241418,
  wart: 0x4a3540,

  crumb: 0xc8c8d8,      // what comes off a desktop icon
  zzz: 0x9fb8d8,
  heart: 0xff6fd0,
  spark: 0xc8a951,      // galanova gold
} as const

/** Mood tints the hide slightly: sulking goes grey, delighted goes warm. */
export function bodyTint(mood: number): number {
  const grey = 0x4a4048
  const warm = 0x6a4a52
  const t = mood
  const mix = (a: number, b: number, k: number) => {
    const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255
    const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255
    return (Math.round(ar + (br - ar) * k) << 16)
      | (Math.round(ag + (bg - ag) * k) << 8)
      | Math.round(ab + (bb - ab) * k)
  }
  return t < 0.5 ? mix(grey, PAL.body, t * 2) : mix(PAL.body, warm, (t - 0.5) * 2)
}
