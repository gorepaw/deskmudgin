// =============================================================================
// The IPC surface, declared once as a type. main/ipc.ts implements Invoke,
// preload re-exposes it, and the renderer consumes it — all three against this
// file, so a renamed channel is a compile error rather than a silent undefined.
//
// Two directions, deliberately different in kind:
//   Invoke  — renderer asks main for something and waits (request/response).
//   Push    — main tells the renderer something changed (fire and forget).
// Nothing goes renderer→main fire-and-forget; if it is worth sending it is worth
// knowing it arrived.
// =============================================================================

import type { HeardLine, LedgerEntry } from './ledger'
import type { LayerMode, PetSave, Settings, WorldSnapshot } from './types'

/**
 * A request to show a panel.
 *
 * Panels can only exist in an overlay window, and the click that asks for one
 * often happens in the other window — the Matron may be behind your icons while
 * the UI has to be in front of them. So opening is always a round trip through
 * main, which finds or creates an overlay and pushes the request there. One
 * rule for every mode, rather than a fast path that only works when the windows
 * happen to line up.
 */
export interface UiRequest {
  panel: 'menu' | 'manager' | 'ledger' | 'settings' | 'pet' | 'starter'
  /** Roughly where it was asked for, in DIP screen coordinates. */
  x: number
  y: number
  /** For `pet`: which one. */
  id?: string
}

export interface Invoke {
  /** Full world model. Called on boot and after any display/layer change. */
  'world:get': () => WorldSnapshot
  /** Re-probe the shell for desktop icons. Cheap enough to call every few seconds. */
  'world:icons': () => WorldSnapshot['icons']

  'settings:get': () => Settings
  'settings:patch': (patch: Partial<Settings>) => Settings

  /**
   * The pets this window is responsible for. Which window is asking is taken
   * from the IPC sender, not from an argument — with two windows running the
   * same bundle, a self-reported layer is one refresh away from being wrong.
   */
  'roster:get': () => PetSave[]

  /**
   * Autosave. A window sends back only the pets it owns, and main **merges by
   * id** rather than replacing the colony — in dual mode the other window owns
   * the rest, and the resting pets are owned by nobody. A replace here would
   * quietly delete everyone the sender could not see.
   */
  'colony:save': (mudgins: PetSave[]) => void

  /**
   * The **whole** collection: out, resting, both layers.
   *
   * Separate from `roster:get` because the two answer different questions. A
   * window is handed the pets it must simulate; a roster panel has to show
   * everyone, including the ones nobody is simulating and the ones belonging to
   * the other window.
   */
  'colony:get': () => PetSave[]

  /**
   * One creature by id, whether it is owned or merely visiting.
   *
   * Separate from `colony:get` because a visitor is deliberately **not** in the
   * colony — the roster panel must never list one — but its card still has to
   * be openable, so that looking before you commit is possible.
   */
  'pet:get': (id: string) => PetSave | null

  /**
   * Take a stranger in. Returns it as an owned pet, or null if it had already
   * left — a click can lose that race by a few milliseconds.
   *
   * The position comes from the renderer because main's copy is the one it was
   * spawned at, several minutes and a whole screen ago; without it an adopted
   * pet teleports back to the edge it walked in from.
   */
  'pet:adopt': (id: string, pos: { x: number; y: number }) => PetSave | null

  /** The two candidates offered on a first run. Stable across calls, so what
   *  the panel shows is what the player actually gets. */
  'starter:offer': () => PetSave[]
  'starter:choose': (id: string) => void

  /** Move one pet between layers. Repartitions and re-rosters both windows. */
  'pet:setLayer': (id: string, layer: LayerMode) => void
  /** Out on the desktop, or resting in the roster and not simulated. */
  'pet:setOut': (id: string, out: boolean) => void
  /**
   * Send one away for good — the only destructive action in the app, and the
   * pressure valve that makes duplicates bearable. The ledger deliberately does
   * not forget them.
   */
  'pet:release': (id: string) => void

  /** Every trait name encountered so far. No totals; see shared/ledger.ts. */
  'ledger:get': () => LedgerEntry[]
  /** Course lines a bubble has just shown for the first time. Batched by the
   *  renderer and de-duplicated again here, since two windows both report. */
  'ledger:heard': (lines: HeardLine[]) => void

  /**
   * Show a panel. Routed through main because panels live in an overlay window
   * and the asking window may not be one — see UiRequest.
   */
  'ui:open': (req: UiRequest) => void
  /** The last panel closed. Lets an on-demand overlay be released. */
  'ui:closed': () => void

  /** Drag the Matron, in DIP screen coordinates. Persists her position. */
  'matron:move': (p: { x: number; y: number }) => void

  /** Run a colony-wide command from the UI. The same commands the tray and the
   *  hotkeys send; this is just the third way to ask. */
  'command:run': (kind: Push['command']['kind']) => void

  'layer:set': (mode: LayerMode) => LayerMode
  'layer:get': () => LayerMode

  /**
   * Overlay only. The renderer knows where he is; main only needs to know
   * whether the pointer is currently over something solid, so the window can go
   * click-through everywhere else. Sent on change, not per frame.
   */
  'input:setHitRegion': (over: boolean) => void

  'app:quit': () => void
  'app:openDevTools': () => void
}

export interface Push {
  /** Displays changed, icons moved, or the layer flipped underneath us. */
  'world:changed': WorldSnapshot
  'settings:changed': Settings
  /**
   * This window's pets changed — someone was adopted, moved between layers, set
   * to rest, or released. Sent per-window with only that window's share.
   */
  'roster:changed': PetSave[]
  /**
   * The whole collection changed. Broadcast to every window, because an open
   * roster panel has to redraw whether or not the pet that moved was one this
   * window simulates.
   */
  'colony:changed': PetSave[]
  'ledger:changed': LedgerEntry[]
  /** Open a panel here. Only ever sent to an overlay window. */
  'ui:open': UiRequest
  /**
   * The tray or a hotkey asked for something the renderer has to act out.
   *
   * These address the whole colony, not one member. Picking a target would mean
   * main knowing where everyone is, and "feed him" with five of them out should
   * feed all five anyway — nobody wants to aim.
   */
  'command': { kind: 'feed' | 'pet' | 'wake' | 'sleep' | 'summon' }
  'layer:changed': LayerMode
  /**
   * Global cursor position in DIP screen coordinates, pushed only when it
   * actually moves.
   *
   * The renderer sees mousemove for itself in the overlay layer, but in the
   * desktop layer the window is behind explorer's icon view and receives no
   * input at all. Main can always ask the OS, so it does — which is what lets
   * him watch your pointer, and be summoned to it, in a layer where he cannot
   * be touched.
   */
  'cursor': { x: number; y: number }
  /**
   * A mouse button went down somewhere, in DIP screen coordinates.
   *
   * Only sent in the desktop layer, where the window is behind explorer's icon
   * view and receives no input of its own. Main polls the button state
   * alongside the cursor and reports the press; the renderer decides whether it
   * landed on anybody.
   *
   * This observes, it does not intercept — the desktop still gets the same
   * click, which is why this can pat a Mudgin but can never drag one (holding
   * the button down on the desktop starts explorer's selection rectangle).
   * `right` is what makes the desktop layer reachable at all: a right-click on
   * a pet or on the Matron opens a panel, in the overlay, where panels can live.
   */
  'click': { x: number; y: number; button: 'left' | 'right' }
}

export type InvokeChannel = keyof Invoke
export type PushChannel = keyof Push

/** Typed handle the preload script hangs on `window.mudgin`. */
export interface MudginBridge {
  invoke<K extends InvokeChannel>(
    channel: K,
    ...args: Parameters<Invoke[K]>
  ): Promise<ReturnType<Invoke[K]>>
  on<K extends PushChannel>(channel: K, fn: (payload: Push[K]) => void): () => void
  /** Build info, so the renderer can behave differently in dev without env vars. */
  readonly isDev: boolean
  /**
   * DESKMUDGIN_DEBUG was set. Turns on a periodic one-line dump of what the
   * brain is doing, forwarded to the main process log.
   *
   * Worth having as its own flag rather than folding into isDev: the bugs worth
   * chasing here are behavioural, they take minutes of watching to show up, and
   * they need a production build running against the real shell — which is
   * exactly the situation where devtools are not open and console.log goes
   * nowhere.
   */
  readonly isDebug: boolean
  /**
   * DESKMUDGIN_CONTACT's value, or '' when unset — draw a contact sheet instead
   * of the colony. A development instrument; see renderer/debug/contact.ts.
   *
   * The raw string rather than a boolean, so the variable can also pick which
   * sheet: `growth` gives the maturity one (a Mudgin per row, aged across the
   * columns), anything else truthy gives the population one. The alternative
   * was a query parameter, which means hand-editing a URL on a frameless
   * click-through window with no address bar.
   */
  readonly isContact: string
  /**
   * DESKMUDGIN_FAST was set — divide every long wait, so behaviour that is
   * supposed to take minutes or days can be watched in one sitting. See
   * shared/clock.ts for what does and does not get compressed.
   */
  readonly isFast: boolean
}
