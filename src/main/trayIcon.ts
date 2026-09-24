// =============================================================================
// The tray icon, rasterised rather than shipped.
//
// The Mudgin is procedural everywhere else in this app — there is no sprite
// sheet to crop a 32×32 out of — so the tray gets the same treatment: a handful
// of circle tests into a BGRA buffer. It also means the icon can never fall out
// of sync with the palette, and the build has no image assets to resolve.
//
// Windows tray bitmaps are BGRA with premultiplied alpha. Both details matter:
// swap the channels and he comes out teal, skip the premultiply and his edges
// halo white.
// =============================================================================

import { nativeImage, type NativeImage } from 'electron'

const SIZE = 32

/** Palette lifted from galanova's Mudgin Gobble, so he matches himself. */
const BODY = [0x5c, 0x43, 0x4e] as const      // bruised bog-purple
const EYE_WHITE = [0xf0, 0xee, 0xe2] as const
const EYE = [0xb8, 0xcc, 0x50] as const       // the one great glowing eye
const DARK = [0x2d, 0x20, 0x26] as const

interface Blob { x: number; y: number; r: number; rgb: readonly [number, number, number] }

/** Painted back to front, exactly like drawMudgin does on the canvas. */
const BLOBS: Blob[] = [
  { x: 16, y: 20, r: 10.5, rgb: BODY },   // lumpy body
  { x: 10, y: 13, r: 5.5, rgb: BODY },    // crown lump
  { x: 23, y: 15, r: 4, rgb: BODY },      // second lump
  { x: 19, y: 15, r: 5, rgb: EYE_WHITE },
  { x: 20, y: 15, r: 2.6, rgb: EYE },
  { x: 20.5, y: 15, r: 1.1, rgb: DARK },
]

export function trayImage(): NativeImage {
  const buf = Buffer.alloc(SIZE * SIZE * 4)

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let rgb: readonly [number, number, number] | null = null
      let cover = 0
      for (const b of BLOBS) {
        const d = Math.hypot(x + 0.5 - b.x, y + 0.5 - b.y)
        // One pixel of falloff at the rim. Without it a 32px frog is a
        // staircase, and the tray renders it at whatever size it likes.
        const a = Math.max(0, Math.min(1, b.r - d))
        if (a > 0) { rgb = b.rgb; cover = Math.max(cover, a) }
      }
      if (!rgb) continue

      const i = (y * SIZE + x) * 4
      const a = Math.round(cover * 255)
      buf[i] = Math.round((rgb[2] * a) / 255)      // B
      buf[i + 1] = Math.round((rgb[1] * a) / 255)  // G
      buf[i + 2] = Math.round((rgb[0] * a) / 255)  // R
      buf[i + 3] = a
    }
  }

  return nativeImage.createFromBitmap(buf, { width: SIZE, height: SIZE })
}
