// =============================================================================
// Owns the app's windows, and decides who is drawn in which one.
//
// The load-bearing idea: **a window is the unit of simulation.** Each window
// runs its own renderer process, with its own Colony containing only the pets
// assigned to it, and simulates them independently. Two windows share no state
// and need none — every cross-pet rule in the renderer (personal space, icon
// claims, nearest-to-cursor) is a within-layer concern, and only the underlay
// can see desktop icons at all.
//
// That is what makes dual-vs-single a **partition function, not a fork**:
//
//   dual   → windows [overlay, underlay], partition by pet.layer
//   single → window  [settings.layer],    partition is everyone
//
// The same renderer runs either way. `pet.layer` is persisted in both modes and
// merely unhonoured in `single`, so flipping the setting is lossless in both
// directions — send someone to the background, switch to single, switch back,
// and they are still in the background.
// =============================================================================

import type { BrowserWindow } from 'electron'
import type { LayerMode, PetSave, Settings } from '../../shared/types'
import { createPetWindow } from '../petWindow'
import { LayerManager } from '../layers/manager'

export interface StageWindow {
  readonly layer: LayerMode
  readonly win: BrowserWindow
  readonly layers: LayerManager
  /**
   * Opened only to host panels, and simulating nobody.
   *
   * This exists because `single` mode partitions everyone into one window: an
   * on-demand overlay asking for its roster would be handed the same colony the
   * underlay is already animating, and you would see every pet twice — once
   * behind your icons and once in front of them.
   */
  readonly uiOnly: boolean
}

export class StageHost {
  private windows = new Map<LayerMode, StageWindow>()

  constructor(
    private settings: Settings,
    private devServer: string | undefined,
    private log: (m: string) => void,
    private hooks: {
      /** The moment the window object exists, before it has loaded anything.
       *  Attach listeners here — anything deferred misses the first events. */
      onOpen(w: StageWindow): void
      /** Its renderer is up and ready for a roster. */
      onReady(w: StageWindow): void
    },
  ) {}

  get all(): StageWindow[] { return [...this.windows.values()] }

  /** The window that can host interactive UI. See `ensureOverlay`. */
  get overlay(): StageWindow | undefined { return this.windows.get('overlay') }

  /** Which layers should exist right now, given the settings. */
  private wanted(): LayerMode[] {
    return this.settings.stageMode === 'dual'
      ? ['overlay', 'underlay']
      : [this.settings.layer]
  }

  /** Bring the set of live windows in line with the settings. */
  sync(settings: Settings): void {
    this.settings = settings
    const want = new Set(this.wanted())

    for (const [layer, w] of this.windows) {
      if (want.has(layer)) continue
      w.layers.dispose()
      if (!w.win.isDestroyed()) w.win.destroy()
      this.windows.delete(layer)
      this.log(`stage: closed ${layer} window`)
    }
    for (const layer of want) if (!this.windows.has(layer)) this.open(layer)
  }

  /**
   * Interactive UI cannot live in the underlay — explorer eats the input — so
   * panels always render in an overlay window. In single+underlay mode there
   * isn't one, and rather than keep an empty topmost window alive for the whole
   * session (which is exactly the cost `single` exists to avoid) it is created
   * on demand and closed again by `releaseOverlay`.
   */
  ensureOverlay(): StageWindow {
    const existing = this.windows.get('overlay')
    if (existing) return existing
    this.log('stage: opening overlay window to host UI')
    return this.open('overlay', true)
  }

  /** Drop an on-demand overlay once nothing needs it. No-op if the settings
   *  say there should be one anyway. */
  releaseOverlay(): void {
    if (this.wanted().includes('overlay')) return
    const w = this.windows.get('overlay')
    // Never close a window that is simulating anybody, whatever the settings
    // currently say — that is a window full of live pets, not a panel host.
    if (!w || !w.uiOnly) return
    w.layers.dispose()
    if (!w.win.isDestroyed()) w.win.destroy()
    this.windows.delete('overlay')
    this.log('stage: released on-demand overlay')
  }

  private open(layer: LayerMode, uiOnly = false): StageWindow {
    const win = createPetWindow(this.devServer, layer, uiOnly)
    const layers = new LayerManager(win, layer, m => this.log(m))
    const w: StageWindow = { layer, win, layers, uiOnly }
    this.windows.set(layer, w)
    // Before the load starts, so a listener attached in onOpen sees everything
    // the page emits — a console forwarder wired up afterwards misses boot.
    this.hooks.onOpen(w)
    win.webContents.on('did-finish-load', () => this.hooks.onReady(w))
    this.log(`stage: opened ${layer} window`)
    return w
  }

  /**
   * Who this window draws.
   *
   * In `single` everybody out goes to the one window regardless of their own
   * layer — that is the whole of the performance mode. In `dual` they are
   * partitioned by it.
   *
   * Everyone marked `out` is drawn — there is no cap here or anywhere else.
   * See the note where MAX_MUDGINS used to be for what that costs.
   */
  rosterFor(w: StageWindow, colony: PetSave[], wild: readonly PetSave[] = []): PetSave[] {
    if (w.uiOnly) return []
    const single = this.settings.stageMode === 'single'
    const out = colony.filter(p => p.out)
    const mine = single ? out : out.filter(p => p.layer === w.layer)
    const visitors = wild.filter(p => single || p.layer === w.layer)
    return [...mine, ...visitors]
  }

  relayout(): void { for (const w of this.windows.values()) w.layers.relayout() }

  dispose(): void {
    for (const w of this.windows.values()) w.layers.dispose()
    this.windows.clear()
  }
}
