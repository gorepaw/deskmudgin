// =============================================================================
// The one window. Transparent, frameless, no shadow, sized to the whole virtual
// desktop and never resized by the user.
//
// `transparent: true` plus `backgroundColor: '#00000000'` is the combination
// that actually composites on Windows — either one alone leaves a black plate
// behind the canvas. `hasShadow: false` matters as much: a frameless window
// still draws a drop shadow, and a shadow around an invisible rectangle the
// size of your screens is very visible indeed.
// =============================================================================

import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import { virtualBounds } from './layers/manager'
import type { LayerMode } from '../shared/types'

/**
 * `layer` is passed through to the renderer as a query parameter rather than
 * over IPC, because the renderer needs to know which window it is *before* it
 * asks for anything — its first act is to request its own roster, and with two
 * windows running the same bundle there is otherwise no way to tell them apart.
 *
 * `ui` marks a window that exists only to host panels — the on-demand overlay
 * created when the app is in single+underlay mode and something needs a surface
 * that can take input. It draws no creatures and no Matron, so it must know
 * before its first frame, for the same reason.
 */
export function createPetWindow(
  devServer: string | undefined, layer: LayerMode, uiOnly = false,
): BrowserWindow {
  const win = new BrowserWindow({
    ...virtualBounds(),
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    // Resizable, despite nothing being able to resize it: the window is
    // frameless and click-through, so there is no grip to drag. `resizable:
    // false` makes Chromium clamp the window to the work area of one display,
    // which silently cuts a multi-monitor overlay down to the primary monitor
    // and strands the Mudgin the moment he crosses a screen edge.
    resizable: true,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    focusable: false,
    show: false,
    // Nothing here is user-controlled and the renderer holds no secrets, but
    // the defaults are still the right ones: no node in the renderer, context
    // isolation on, everything crossing the boundary goes through preload.
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      backgroundThrottling: false,
    },
  })

  // He is scenery, not an app. Nothing about him should ever take focus.
  win.setMenu(null)
  win.on('focus', () => win.blur())

  const query = { layer, ...(uiOnly ? { ui: '1' } : {}) }
  if (devServer) {
    void win.loadURL(`${devServer}?${new URLSearchParams(query).toString()}`)
  } else {
    void win.loadFile(join(__dirname, '../renderer/index.html'), { query })
  }

  return win
}
