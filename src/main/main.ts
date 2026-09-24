// =============================================================================
// DeskMudgin — entry point. Wires the stage host, the world watcher and the IPC
// surface together, and owns nothing else.
//
// Main holds the colony (everyone the player owns, out or resting) and is the
// only writer of it. The renderers own the *live* state of their own pets and
// push it back on autosave, where it is merged by id — with two windows and a
// set of resting pets nobody simulates, no single renderer can see the whole
// roster, so a replace would delete whatever the sender could not see.
//
// The app is deliberately headless-feeling: no dock, no taskbar button, no
// window in Alt-Tab.
// =============================================================================

import { app, globalShortcut, ipcMain, Menu, Tray, screen, type WebContents } from 'electron'
import { randomUUID } from 'node:crypto'
import type { LayerMode, PetSave, Settings } from '../shared/types'
import { newPetSave } from '../shared/types'
import { SPECIES, hashSeed, roll, sampler, type SpeciesId } from '../shared/genome'
import { pickName, pickZhName } from '../shared/names'
import type { Invoke, InvokeChannel, Push, PushChannel, UiRequest } from '../shared/ipc'
import { describe, describeFlower } from '../shared/describe'
import { ageOf } from '../shared/maturity'
import { record, recordHeard, type LedgerEntry } from '../shared/ledger'
import { COURSE as ZH_HSK1 } from '../shared/lang/generated/zh-hsk1'
import { setTimeScale, FAST_SCALE } from '../shared/clock'
import { StageHost, type StageWindow } from './stage/host'
import { WildWatch } from './wild'
import { IconWatcher, snapshot } from './world'
import {
  loadColony, loadLedger, loadSettings, saveColony, saveLedger, saveSettings,
} from './store'
import { trayImage } from './trayIcon'
import { GetAsyncKeyState, VK_LBUTTON, VK_RBUTTON } from './win32/api'

const isDev = process.argv.includes('--dev')
const devServer = isDev ? (process.env.DESKMUDGIN_DEV_SERVER ?? 'http://localhost:5273') : undefined

const log = (m: string) => console.log(`[deskmudgin] ${m}`)

// Main and the renderers are separate processes, so each sets its own scale.
// See shared/clock.ts for what is and is not compressed.
if (process.env.DESKMUDGIN_FAST) setTimeScale(FAST_SCALE)

/**
 * A second instance would fight the first for the shell parenting, and — worse
 * — both would autosave, so whichever quit last would silently overwrite the
 * other's colony with its own stale copy.
 *
 * `app.quit()` on its own is not enough: it is asynchronous, so the rest of
 * this module keeps running, whenReady still fires, and the doomed instance
 * opens its windows and starts saving before it goes. The guard has to actually
 * stop execution.
 */
const primary = app.requestSingleInstanceLock()
if (!primary) {
  app.quit()
  // Nothing below this point may run in a losing instance.
  throw new Error('another DeskMudgin is already running')
}

// Transparent windows need the compositor left alone. Without this, some driver
// + GPU combinations composite the window onto black instead of onto the
// desktop — the single most common "my overlay has a black background" cause.
app.commandLine.appendSwitch('enable-transparent-visuals')

let stage: StageHost | null = null
let watcher: IconWatcher | null = null
let tray: Tray | null = null
let settings: Settings = { ...loadSettings() }
/** The whole roster: out and resting, both layers. Main is its only writer. */
let colony: PetSave[] = loadColony()
/** Every trait name ever encountered. Grows only — see shared/ledger.ts. */
let ledger: LedgerEntry[] = loadLedger()
// Re-read the wording of every line already heard from the current course.
// A line can be corrected after it was filed — p255 lost a wrong "Let's" — and
// the renderer never re-reports a line it has filed, so without this the
// ledger would teach the old gloss forever. `recordHeard` keeps first-heard
// dates, and nothing is ever removed.
{
  const heardIds = new Set(ledger.filter(e => e.category === 'said').map(e => e.key.slice(5)))
  const fresh = ZH_HSK1.entries.filter(e => heardIds.has(e.id))
    .map(e => ({ id: e.id, script: e.script, reading: e.reading, english: e.english }))
  const next = recordHeard(ledger, fresh, Date.now())
  if (next) { ledger = next; saveLedger(ledger) }
}
/** Whoever is visiting. Never saved: a stranger is not part of the collection,
 *  and one wandering about at shutdown has simply wandered off. */
let wild: WildWatch | null = null
/** The two candidates a first-run player picks between. Held so the panel shows
 *  the animal that is actually going to be handed over. */
let starterOffer: PetSave[] | null = null

/**
 * Main's dice, for everything that is not a genome.
 *
 * Genomes are seeded from their own pet's id so they can be reproduced; the
 * schedule behind a visitor is the opposite — it must not be predictable, and
 * it must differ between two copies of the app started together.
 */
const dice = sampler((Date.now() ^ (process.pid << 16)) >>> 0)

/** Broadcast to every live window. */
function push<K extends PushChannel>(channel: K, payload: Push[K]): void {
  for (const w of stage?.all ?? []) {
    if (!w.win.isDestroyed()) w.win.webContents.send(channel, payload)
  }
}

/** Send to one window only — rosters differ per window, so most pushes can't
 *  be broadcast. */
function pushTo<K extends PushChannel>(w: StageWindow, channel: K, payload: Push[K]): void {
  if (!w.win.isDestroyed()) w.win.webContents.send(channel, payload)
}

/** Which window an IPC call came from. Taken from the sender rather than an
 *  argument: two windows run the same bundle, and a self-reported identity is
 *  one reload away from being wrong. */
const senderOf = (wc: WebContents): StageWindow | undefined =>
  stage?.all.find(w => w.win.webContents.id === wc.id)

// A tiny helper so every handler below is written as its typed signature and
// the registration stays honest about which channel it implements.
function handle<K extends InvokeChannel>(
  channel: K,
  fn: (sender: WebContents, ...args: Parameters<Invoke[K]>) => ReturnType<Invoke[K]>,
): void {
  ipcMain.handle(channel, (e, ...args) => fn(e.sender, ...(args as Parameters<Invoke[K]>)))
}

/** Hand every window its share of the colony. Called after anything that can
 *  change who belongs where. */
function reroster(): void {
  for (const w of stage?.all ?? []) {
    pushTo(w, 'roster:changed', stage!.rosterFor(w, colony, wild?.all ?? []))
  }
  // Panels show the whole collection, including the pets this window does not
  // simulate, so they need their own broadcast rather than a roster.
  push('colony:changed', colony)
  buildTray()
}

/**
 * File a pet's traits in the ledger.
 *
 * Called on adoption and once for everyone at startup — the second is what
 * backfills a colony collected before the ledger existed, and it is cheap
 * because `record` returns null when nothing is new, which is almost always.
 */
function remember(pets: readonly PetSave[]): void {
  let next: LedgerEntry[] | null = null
  const at = Date.now()
  for (const p of pets) {
    const traits = describe(p.genes)
    // A bloom is filed the day it opens, not the day the pet was taken in —
    // the flower does not exist to be seen until then, and recording it early
    // would let the ledger answer the one question maturity is asking.
    const bloom = describeFlower(p.genes)
    if (bloom && ageOf(p.genes, p.adoptedAt, at) >= 1) traits.push(bloom)
    const updated = record(next ?? ledger, traits, at)
    if (updated) next = updated
  }
  if (!next) return
  ledger = next
  saveLedger(ledger)
  push('ledger:changed', ledger)
}

/**
 * Fold a window's view of its own pets back into the colony.
 *
 * By id, and only for ids the sender actually holds. The alternative — trusting
 * the array wholesale — deletes the other window's pets and every resting pet
 * the moment one window autosaves.
 */
function mergeColony(incoming: PetSave[]): void {
  const byId = new Map(incoming.map(p => [p.id, p]))
  // Laid over the existing record, not substituted for it. A window only sends
  // what it simulates — position, needs, stats — and anything main owns that
  // the window never sees would otherwise be erased on every autosave. The
  // Chinese name is the first such field: replaced wholesale, every pet lost
  // its name twenty seconds after being given one.
  colony = colony.map(p => {
    const mine = byId.get(p.id)
    return mine ? { ...p, ...mine } : p
  })
  saveColony(colony)
}

/**
 * Pushes the global cursor position to the renderer whenever it moves.
 *
 * ~12Hz, and silent while the mouse is still, so an idle machine sends nothing.
 * This is the renderer's only source of pointer position in the desktop layer,
 * where the window sits behind explorer's icon view and never sees an input
 * event of its own.
 */
function startCursorPump(): void {
  let last = { x: NaN, y: NaN }
  let sentAt = 0
  const wasDown: Record<'left' | 'right', boolean> = { left: false, right: false }
  /** False until the first poll after entering the desktop layer has run. */
  let armed = false

  setInterval(() => {
    if (!stage?.all.length) return
    const p = screen.getCursorScreenPoint()
    const now = Date.now()
    // Heartbeat as well as on-change. The very first push can be sent before
    // the renderer has finished loading and subscribed, and if the mouse then
    // sits still nothing else ever fires — so they would not know where the
    // pointer is until you happened to move it. Half a message a second while
    // idle is nothing, and it makes the channel self-healing.
    if (p.x !== last.x || p.y !== last.y || now - sentAt >= 2000) {
      last = p
      sentAt = now
      push('cursor', p)
    }

    // Clicks, but only in the layer that cannot see them for itself.
    //
    // In the overlay the renderer gets real mousedown events and this would
    // double-fire; in the desktop layer explorer consumes the press and the
    // renderer would otherwise never know a click happened at all. Polling the
    // button state is the whole mechanism — no hook, nothing intercepted, and
    // the desktop still receives the click exactly as before. That is also the
    // limit: this can pat a Mudgin, never drag one, because the button is
    // already down and explorer is already drawing a selection rectangle.
    // Polled whenever an underlay window exists — in dual mode that is
    // alongside an overlay, and the two do not conflict: the overlay window
    // gets real mousedown events for its own pets, and the pushed click is only
    // hit-tested against the pets the underlay window holds.
    // Both buttons: left pats whoever is under it, right opens that pet's card
    // (in the overlay, where panels can live). The right button is what makes
    // the desktop layer navigable at all rather than merely watchable.
    const underlay = stage.all.find(w => w.layer === 'underlay')
    const buttons = [['left', VK_LBUTTON], ['right', VK_RBUTTON]] as const
    if (underlay) {
      for (const [name, vk] of buttons) {
        const state = GetAsyncKeyState(vk)
        if (!armed) {
          // First poll in this layer. The since-last-call bit may have been set
          // by a click from before the app started — or by the very click on
          // the tray menu that switched layers — and firing on it pats somebody
          // at a stale cursor position the instant the mode changes.
          wasDown[name] = (state & 0x8000) !== 0
          continue
        }
        const down = (state & 0x8000) !== 0
        // Bit 0 is "pressed at some point since this thread last asked". It is
        // what makes this reliable: a brisk click can begin and end inside one
        // 40ms poll, and an edge test on the down bit alone misses it entirely
        // — which is precisely how the first version of this managed to detect
        // no clicks at all while the underlying call worked perfectly.
        const pressedSince = (state & 1) !== 0
        if (pressedSince || (down && !wasDown[name])) {
          pushTo(underlay, 'click', { ...p, button: name })
        }
        wasDown[name] = down
      }
      armed = true
    } else {
      // Keep draining the since-last-call bits while in the overlay, so they do
      // not accumulate a press to report on the way back in.
      for (const [name, vk] of buttons) {
        GetAsyncKeyState(vk)
        wasDown[name] = false
      }
      armed = false
    }
  }, 40)
}

/**
 * Hotkeys, because the desktop layer cannot be clicked.
 *
 * Explorer owns the mouse down there — there is no arrangement in which he is
 * both behind your icons and touchable. That is a real limit, but "no way to
 * reach him at all" was a choice, and the wrong one: these plus the tray menu
 * are the interaction surface for that layer.
 *
 * Registration can fail if another app already owns the combination, which is
 * worth a log line and nothing more — the tray still works.
 */
function registerHotkeys(): void {
  const keys: [string, () => void][] = [
    ['Control+Alt+M', () => moveEveryone(settings.layer === 'overlay' ? 'underlay' : 'overlay')],
    ['Control+Alt+Shift+M', () => push('command', { kind: 'summon' })],
    ['Control+Alt+F', () => push('command', { kind: 'feed' })],
  ]
  for (const [accel, fn] of keys) {
    if (!globalShortcut.register(accel, fn)) log(`hotkey ${accel} unavailable (already taken)`)
  }
}

/**
 * Roll one brand-new creature. Does not add it to anything.
 *
 * Seeded from a fresh uuid rather than a clock, so two rolled in the same
 * millisecond are still different animals — and so the genome is reproducible
 * from the id alone, which is what the legacy-save migration relies on.
 *
 * Species and genome are rolled **fresh every time**, with no pool and no
 * comparison against what the player already owns. Duplicates are expected and
 * are the point: a space you can exhaust is a space you can measure.
 */
function rollPet(
  species: SpeciesId | undefined, x: number, y: number, layer: LayerMode,
): PetSave {
  const id = randomUUID()
  const r = sampler(Number.parseInt(id.slice(0, 8), 16) >>> 0)
  const kind = species ?? SPECIES[r.int(0, SPECIES.length - 1)]
  const save = newPetSave(
    id,
    pickName(kind, colony.map(p => p.name), n => r.int(0, n - 1)),
    kind, roll(kind, r), x, y, layer,
  )
  const zh = pickZhName(kind, takenZh(), n => r.int(0, n - 1))
  return zh ? { ...save, zh } : save
}

/** Chinese names already in use, so a newcomer is not a second 豆豆 while any
 *  name is still free. */
const takenZh = (): string[] => colony.flatMap(p => (p.zh ? [p.zh.script] : []))

/**
 * Give every pet without one a Chinese name.
 *
 * Runs on load, which is how a collection from before Chinese names existed
 * gets them all at once — and again after a names course update, for anyone
 * still waiting. Seeded by the pet's own id, so which name each creature gets
 * does not depend on the order of the file or the time of day.
 *
 * Never renames anyone who already has a name: a pet you know as 泥泥 stays 泥泥.
 */
function nameEveryone(): void {
  let changed = false
  // Who gets named first decides who gets the plain names and who gets 二号.
  // File order handed the resting pets the plain ones and every pet actually
  // on the desktop a number — 红豆四号 for the one you look at every day. So:
  // the ones out on the desktop first, then the longest-kept.
  const order = [...colony].sort((a, b) =>
    Number(b.out) - Number(a.out) || a.adoptedAt - b.adoptedAt)
  for (const p of order) {
    if (p.zh) continue
    const r = sampler(hashSeed(p.id) || 1)
    const zh = pickZhName(p.species, takenZh(), n => r.int(0, n - 1))
    if (!zh) return // no names verified yet; try again next launch
    p.zh = zh
    changed = true
  }
  if (changed) saveColony(colony)
}

/** Roll a creature straight into the roster. Dev and first-run only now that
 *  strangers are the way pets are actually acquired. */
function spawn(species?: SpeciesId, layer: LayerMode = settings.layer): PetSave | null {
  // Near somebody already out, so a new arrival is not stranded on a monitor
  // nobody is looking at.
  const anchor = colony.find(p => p.out)
  const born = rollPet(
    species, (anchor?.x ?? 400) + dice.range(-90, 90), anchor?.y ?? 400, layer)
  colony = [...colony, born]
  saveColony(colony)
  remember([born])
  reroster()
  log(`spawned ${born.name} the ${born.species}`)
  return born
}

/** Where a stranger walks on from: the very edge of the primary monitor's
 *  floor, either side. `arrive` takes it inward from there. */
function edgeSpot(): { x: number; y: number } {
  const wa = screen.getPrimaryDisplay().workArea
  return {
    x: dice.chance(0.5) ? wa.x + 4 : wa.x + wa.width - 4,
    y: wa.y + wa.height,
  }
}

/** Take a stranger in. It joins the colony out on the desktop, always — there
 *  is no cap to be turned away by. */
function adopt(id: string, pos: { x: number; y: number }): PetSave | null {
  const taken = wild?.take(id)
  if (!taken) return null
  const pet: PetSave = { ...taken, out: true, x: pos.x, y: pos.y, adoptedAt: Date.now() }
  // Not merely false — gone. These two never belong in a save file.
  delete pet.wild
  delete pet.leaving
  colony = [...colony, pet]
  saveColony(colony)
  // A name is learned by taking one in, never by watching one walk past. A
  // stranger that leaves unnoticed leaves no trace, which is what stops the
  // ledger filling up with things the player never actually saw.
  remember([pet])
  reroster()
  log(`adopted ${pet.name} the ${pet.species}`)
  return pet
}

/** The two candidates a first-run player picks between. Rolled once and kept,
 *  so the animal on screen is the animal handed over. */
function starterCandidates(): PetSave[] {
  if (starterOffer) return starterOffer
  const wa = screen.getPrimaryDisplay().workArea
  starterOffer = SPECIES.map((kind, i) =>
    rollPet(kind, wa.x + wa.width * (i ? 0.62 : 0.38), wa.y + wa.height, settings.layer))
  return starterOffer
}

function chooseStarter(id: string): void {
  const pick = starterOffer?.find(p => p.id === id)
  if (!pick) return
  // The one not chosen is discarded outright, not kept in a pool. It was never
  // an entry in a list of things to collect — it was one roll out of an
  // unbounded space, and the space does not run out.
  starterOffer = null
  colony = [...colony, pick]
  saveColony(colony)
  remember([pick])
  reroster()
  log(`starter: ${pick.name} the ${pick.species}`)
  // Strangers only start turning up once there is somebody to notice them.
  wild?.start()
}

/**
 * Show a panel.
 *
 * Panels can only render in an overlay window, and the window that asked may be
 * the underlay — she can stand behind your icons while her menu cannot. So the
 * request is always routed here, an overlay is found or created, and the
 * request is pushed to it. One path for every mode; nothing has a fast case.
 *
 * The renderer converts to canvas coordinates itself, so the point travels as
 * screen DIP and stays meaningful whichever window opens it.
 */
function openPanel(req: UiRequest): void {
  if (!stage) return
  const w = stage.ensureOverlay()
  const send = () => pushTo(w, 'ui:open', req)
  // A freshly created overlay has not loaded yet. did-finish-load is the same
  // signal the roster push waits for; queueing behind it is what stops the very
  // click that creates the window from being swallowed by it.
  if (w.win.webContents.isLoading()) w.win.webContents.once('did-finish-load', send)
  else send()
}

/** "Send one home" — resting, not deleted. The collection is the point; nothing
 *  is ever thrown away by a menu item that sounds this gentle. */
function rest(): void {
  const out = colony.filter(p => p.out)
  if (out.length <= 1) return
  const last = out[out.length - 1]
  colony = colony.map(p => (p.id === last.id ? { ...p, out: false } : p))
  saveColony(colony)
  reroster()
}

/**
 * Put everybody in one layer — what the tray's layer radio and the hotkey mean
 * now that pets can be in either.
 *
 * In `single` this also moves the one window. In `dual` both windows already
 * exist and this is purely a repartition: nobody's window is created or
 * destroyed, the pets just change hands.
 */
function moveEveryone(layer: LayerMode): void {
  settings = { ...settings, layer }
  colony = colony.map(p => ({ ...p, layer }))
  saveSettings(settings)
  saveColony(colony)
  stage?.sync(settings)
  watcher?.setRate(layer)
  push('settings:changed', settings)
  reroster()
}

function registerIpc(): void {
  handle('world:get', s =>
    snapshot(senderOf(s)?.layer ?? settings.layer, watcher?.current() ?? []))
  handle('world:icons', () => watcher?.refresh() ?? [])

  handle('settings:get', () => settings)
  handle('settings:patch', (_s, patch) => {
    const wasMode = settings.stageMode
    const wasLayer = settings.layer
    const wasStartup = settings.launchOnStartup
    settings = { ...settings, ...patch }
    saveSettings(settings)
    // Either of these changes which windows should exist and who belongs in
    // them, so the host has to be re-synced before anyone is re-rostered.
    if (settings.stageMode !== wasMode || settings.layer !== wasLayer) {
      stage?.sync(settings)
      watcher?.setRate(settings.layer)
    }
    // Applied here rather than only in the tray, so the settings panel and the
    // tray checkbox cannot disagree about what the registry says.
    if (settings.launchOnStartup !== wasStartup) {
      app.setLoginItemSettings({ openAtLogin: settings.launchOnStartup, args: [] })
    }
    push('settings:changed', settings)
    reroster()
    return settings
  })

  handle('roster:get', s => {
    const w = senderOf(s)
    return w && stage ? stage.rosterFor(w, colony) : []
  })

  handle('colony:get', () => colony)
  handle('colony:save', (_s, mudgins) => mergeColony(mudgins))

  handle('pet:get', (_s, id) =>
    colony.find(p => p.id === id)
    ?? wild?.all.find(p => p.id === id)
    ?? starterOffer?.find(p => p.id === id)
    ?? null)

  handle('pet:adopt', (_s, id, pos) => adopt(id, pos))

  handle('starter:offer', () => starterCandidates())
  handle('starter:choose', (_s, id) => chooseStarter(id))

  handle('pet:setLayer', (_s, id, layer) => {
    colony = colony.map(p => (p.id === id ? { ...p, layer } : p))
    saveColony(colony)
    reroster()
  })

  handle('pet:setOut', (_s, id, out) => {
    colony = colony.map(p => (p.id === id ? { ...p, out } : p))
    saveColony(colony)
    reroster()
  })

  handle('pet:release', (_s, id) => {
    const gone = colony.find(p => p.id === id)
    if (!gone) return
    colony = colony.filter(p => p.id !== id)
    saveColony(colony)
    // The ledger is deliberately not touched. Sending duplicates away has to be
    // safe, and it stops being safe the moment it can cost you what you learned.
    reroster()
    log(`released ${gone.name} the ${gone.species}`)
  })

  handle('ledger:get', () => ledger)
  handle('ledger:heard', (_s, lines) => {
    const next = recordHeard(ledger, lines, Date.now())
    if (!next) return
    ledger = next
    saveLedger(ledger)
    push('ledger:changed', ledger)
  })

  handle('ui:open', (_s, req) => openPanel(req))
  handle('ui:closed', () => stage?.releaseOverlay())

  handle('matron:move', (_s, pos) => {
    settings = { ...settings, matronPos: pos }
    saveSettings(settings)
    // Pushed to everyone but the sender's own drag is already ahead of this —
    // the renderer moves her locally and reports afterwards, so the round trip
    // never has to keep up with the pointer.
    push('settings:changed', settings)
  })

  handle('command:run', (_s, kind) => push('command', { kind }))

  handle('layer:set', (_s, mode) => { moveEveryone(mode); return mode })
  handle('layer:get', s => senderOf(s)?.layer ?? settings.layer)

  handle('input:setHitRegion', (s, over) => {
    // Only meaningful in an overlay; an underlay window never receives input
    // either way, and asking Electron to stop ignoring the mouse on a shell
    // child is a no-op that would leave the flag wrong on the way back out.
    const w = senderOf(s)
    if (w?.layer !== 'overlay') return
    w.win.setIgnoreMouseEvents(!over, { forward: true })
  })

  handle('app:quit', () => app.quit())
  handle('app:openDevTools', s => senderOf(s)?.win.webContents.openDevTools({ mode: 'detach' }))
}

function contextMenu(): Menu {
  const out = colony.filter(p => p.out)
  const fore = out.filter(p => p.layer === 'overlay').length
  const back = out.length - fore
  const roll = colony.length === 1
    ? `${colony[0]?.name ?? 'Mudgin'}`
    : `${colony.length} collected — ${out.length} out`
  return Menu.buildFromTemplate([
    { label: roll, enabled: false },
    ...(settings.stageMode === 'dual' && out.length
      ? [{ label: `   ${fore} in front, ${back} on the desktop`, enabled: false }] as const
      : []),
    { type: 'separator' },
    {
      // The way back in when she has been dragged somewhere unhelpful or is
      // sitting behind a maximised window. Everything below is reachable from
      // her menu too; this stays because a tray icon cannot be lost.
      label: 'Open the Matron\'s menu',
      click: () => {
        const d = screen.getPrimaryDisplay().workArea
        openPanel({ panel: 'menu', x: d.x + d.width / 2, y: d.y + d.height / 2 })
      },
    },
    { type: 'separator' },
    // Conjuring a pet on demand is a cheat now that strangers are how they are
    // actually acquired — a button that hands you one for free makes "catching
    // them all" a chore rather than a hunt. Kept for development only.
    ...(isDev
      ? [
        { label: 'Add a Mudgin', click: () => spawn('mudgin') },
        { label: 'Add a Sephin', click: () => spawn('sephin') },
        { label: 'Add ten of them', click: () => { for (let i = 0; i < 10; i++) spawn() } },
      ] as const
      : []),
    {
      // Never the last one. An empty desktop is indistinguishable from the app
      // having crashed. Rests rather than deletes — see rest().
      label: 'Send one home', enabled: out.length > 1,
      click: () => rest(),
    },
    { type: 'separator' },
    {
      label: 'Everyone in front\tCtrl+Alt+M', type: 'radio',
      checked: out.length > 0 && back === 0,
      click: () => moveEveryone('overlay'),
    },
    {
      // Named for what you give up, not just what you get. Losing the ability
      // to drag them is the first thing anyone notices about this mode.
      label: 'Everyone on the desktop — chews icons, no dragging', type: 'radio',
      checked: out.length > 0 && fore === 0,
      click: () => moveEveryone('underlay'),
    },
    {
      label: 'Split between both', type: 'radio',
      checked: fore > 0 && back > 0,
      enabled: settings.stageMode === 'dual',
    },
    { type: 'separator' },
    {
      // The performance switch. Dual runs a second renderer process and a
      // second canvas; single runs one and ignores per-pet layers.
      label: 'Use one window only (lower memory)', type: 'checkbox',
      checked: settings.stageMode === 'single',
      click: mi => {
        settings = { ...settings, stageMode: mi.checked ? 'single' : 'dual' }
        saveSettings(settings)
        stage?.sync(settings)
        push('settings:changed', settings)
        reroster()
      },
    },
    { type: 'separator' },
    { label: 'Feed him\tCtrl+Alt+F', click: () => push('command', { kind: 'feed' }) },
    { label: 'Pet him', click: () => push('command', { kind: 'pet' }) },
    { label: 'Send him to bed', click: () => push('command', { kind: 'sleep' }) },
    { label: 'Bring him here\tCtrl+Alt+Shift+M', click: () => push('command', { kind: 'summon' }) },
    { type: 'separator' },
    {
      label: 'Start with Windows', type: 'checkbox', checked: settings.launchOnStartup,
      click: mi => {
        settings = { ...settings, launchOnStartup: mi.checked }
        saveSettings(settings)
        app.setLoginItemSettings({ openAtLogin: mi.checked, args: [] })
      },
    },
    ...(isDev
      ? [{
        label: 'DevTools',
        click: () => {
          for (const w of stage?.all ?? []) w.win.webContents.openDevTools({ mode: 'detach' })
        },
      }] as const
      : []),
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ])
}

function buildTray(): void {
  if (!tray) {
    tray = new Tray(trayImage())
    tray.on('click', () => tray?.popUpContextMenu())
  }
  const n = colony.filter(p => p.out).length
  tray.setToolTip(`DeskMudgin — ${colony.length} collected, ${n} out`)
  tray.setContextMenu(contextMenu())
}

/** Renderer console → main stdout, for DESKMUDGIN_DEBUG. Attached per window
 *  and prefixed with the layer, because with two of them running the same code
 *  an unlabelled line tells you nothing about who logged it. */
function forwardConsole(w: StageWindow): void {
  if (!process.env.DESKMUDGIN_DEBUG) return
  w.win.webContents.on('console-message', (...args: unknown[]) => {
    // The signature changed across Electron majors: (event, level, message) in
    // 33 and earlier, (event) with a details object after. Pick out the first
    // string that is not a source URL and print that.
    const msg = args.find(a => typeof a === 'string' && !a.startsWith('http') && !a.startsWith('file'))
      ?? (args[0] as { message?: string })?.message
    if (msg) log(`${w.layer}: ${msg}`)
  })
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.galanova.deskmudgin')

  stage = new StageHost(settings, devServer, log, {
    onOpen: forwardConsole,
    onReady: w => {
      // The renderer is up: hand it its share and show the window.
      pushTo(w, 'roster:changed', stage!.rosterFor(w, colony, wild?.all ?? []))
      pushTo(w, 'colony:changed', colony)
      watcher?.setRate(settings.layer)
      w.win.showInactive()
    },
  })
  stage.sync(settings)

  watcher = new IconWatcher(icons => {
    for (const w of stage?.all ?? []) {
      pushTo(w, 'world:changed', snapshot(w.layer, icons))
    }
  })

  registerIpc()
  registerHotkeys()
  startCursorPump()

  wild = new WildWatch(
    () => ({ ...rollPet(undefined, 0, 0, settings.newcomerLayer), ...edgeSpot(), wild: true }),
    () => reroster(),
    (lo, hi) => dice.range(lo, hi),
    log,
  )

  // A first run has nobody, and picks its own first pet. Everyone else has the
  // visitor loop running from launch.
  if (colony.length === 0) {
    const wa = screen.getPrimaryDisplay().workArea
    openPanel({ panel: 'starter', x: wa.x + wa.width / 2, y: wa.y + wa.height / 2 })
  } else {
    wild.start()
  }
  // Backfill the notebook for a colony collected before it existed, and for
  // anyone hand-edited into pet.json.
  nameEveryone()
  remember(colony)

  // Development instrument: open a panel on startup, without a mouse.
  //
  //   DESKMUDGIN_PANEL=settings        the panel by name
  //   DESKMUDGIN_PANEL=pet:Grub        that pet's card, or the first pet
  //
  // Reaching a panel by hand means synthesising two or three clicks onto
  // somebody's live desktop, which is disruptive and unreliable — pets move
  // between reading a position and clicking it, and the person using the
  // machine is moving the mouse too.
  const wantPanel = process.env.DESKMUDGIN_PANEL
  if (wantPanel) {
    const wa = screen.getPrimaryDisplay().workArea
    const at = { x: wa.x + wa.width / 2, y: wa.y + wa.height / 2 }
    if (wantPanel.startsWith('pet')) {
      const name = wantPanel.slice(4).toLowerCase()
      const p = colony.find(m => m.name.toLowerCase() === name) ?? colony[0]
      if (p) openPanel({ panel: 'pet', id: p.id, ...at })
    } else {
      openPanel({ panel: wantPanel as UiRequest['panel'], ...at })
    }
  }
  // Mudgins bloom while the app is running, and nothing else notices. Once a
  // minute is far more often than needed against a clock measured in hours, and
  // `record` returns null when nothing is new, so the usual case costs a walk
  // over a short array and no write.
  setInterval(() => remember(colony), 60_000)
  buildTray()

  // Displays change: a laptop docks, a monitor sleeps, someone changes scaling.
  // Every window is sized to the union of all of them, so all three matter.
  const relayout = () => {
    stage?.relayout()
    for (const w of stage?.all ?? []) {
      pushTo(w, 'world:changed', snapshot(w.layer, watcher?.current() ?? []))
    }
  }
  screen.on('display-added', relayout)
  screen.on('display-removed', relayout)
  screen.on('display-metrics-changed', relayout)
})

app.on('second-instance', () => push('command', { kind: 'summon' }))

// He has no windows to close and closing them should not end him anyway.
app.on('window-all-closed', () => app.quit())

app.on('before-quit', () => {
  const now = Date.now()
  saveColony(colony.map(m => ({ ...m, lastSeenAt: now })))
  saveSettings(settings)
  wild?.stop()
  watcher?.stop()
  stage?.dispose()
  globalShortcut.unregisterAll()
})
