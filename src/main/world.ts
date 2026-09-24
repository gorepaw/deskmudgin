// =============================================================================
// The world model, assembled in main and handed to the renderer whole.
//
// This is where physical pixels become DIP. Every number that comes out of
// Win32 is in real device pixels; every number Electron and the renderer deal
// in is device-independent. Mixing them is the classic desktop-pet bug — it
// looks perfect on a 100% display and puts the pet at two-thirds scale, in the
// wrong place, on a 150% one. The conversion happens exactly here and nowhere
// else.
// =============================================================================

import { screen } from 'electron'
import type { DesktopIcon, DisplayInfo, LayerMode, Rect, WorldSnapshot } from '../shared/types'
import { readDesktopIcons, type RawIcon } from './win32/desktopIcons'
import { virtualBounds } from './layers/manager'

const toDipRect = (r: RawIcon['icon']): Rect => {
  const tl = screen.screenToDipPoint({ x: r.left, y: r.top })
  const br = screen.screenToDipPoint({ x: r.right, y: r.bottom })
  return { x: tl.x, y: tl.y, width: br.x - tl.x, height: br.y - tl.y }
}

const displays = (): DisplayInfo[] => screen.getAllDisplays().map(d => ({
  id: d.id,
  bounds: d.bounds,
  workArea: d.workArea,
  scaleFactor: d.scaleFactor,
  primary: d.id === screen.getPrimaryDisplay().id,
}))

export function readIcons(): DesktopIcon[] {
  return readDesktopIcons().map(i => ({
    index: i.index,
    name: i.name,
    icon: toDipRect(i.icon),
    bounds: toDipRect(i.bounds),
  }))
}

export function snapshot(layer: LayerMode, icons: DesktopIcon[]): WorldSnapshot {
  return { virtualBounds: virtualBounds(), displays: displays(), icons, layer }
}

/**
 * Polls the shell for icon movement and only reports when something changed.
 *
 * Two rates, because the probe is not free (three cross-process messages per
 * icon) and its value is asymmetric: in underlay mode he is standing on these
 * things and a stale grid means he chews thin air, so poll briskly. In overlay
 * he cannot see them at all, so poll rarely — just often enough that flipping
 * modes finds a warm cache rather than an empty desktop.
 */
export class IconWatcher {
  private timer: NodeJS.Timeout | null = null
  private last: DesktopIcon[] = []
  private lastKey = ''

  constructor(private onChange: (icons: DesktopIcon[]) => void) {}

  current(): DesktopIcon[] { return this.last }

  /** Force a read now, e.g. immediately after switching into underlay. */
  refresh(): DesktopIcon[] {
    const icons = readIcons()
    const key = icons.map(i => `${i.index}:${i.icon.x},${i.icon.y}`).join('|')
    if (key !== this.lastKey) {
      this.lastKey = key
      this.last = icons
      this.onChange(icons)
    }
    return this.last
  }

  setRate(layer: LayerMode): void {
    this.stop()
    const ms = layer === 'underlay' ? 3000 : 20000
    this.timer = setInterval(() => this.refresh(), ms)
    this.refresh()
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
  }
}
