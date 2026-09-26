// =============================================================================
// The vocabulary all three processes share. Nothing in here imports Electron or
// the DOM — it is the contract, and both sides compile against it, so a channel
// that changes shape fails at build time instead of at 3am on someone's desktop.
// =============================================================================

import { rollMudgin, sampler, hashSeed, type Genes, type SpeciesId } from './genome'
import type { LanguageId } from './lang/types'

/**
 * Which plane the Mudgin lives on. This is the axis the whole app is built
 * around: a layer decides what he can see, what he can touch, and what can
 * touch him.
 *
 *  • overlay  — a topmost transparent window over everything. He is in front of
 *               your work, he can be clicked, dragged and fed.
 *  • underlay — the window is reparented into the shell's WorkerW, the strip
 *               between the wallpaper and the desktop icons. He is behind your
 *               icons, chewing on them. Explorer owns the mouse down there, so
 *               this layer is watch-only by construction — see LAYER_CAPS.
 *
 * Adding a third (a taskbar dweller, a per-window tenant) is a LayerStrategy in
 * src/main/layers and one entry here; nothing in the renderer needs to know.
 */
export type LayerMode = 'overlay' | 'underlay'

/**
 * What a layer can actually do, so behaviours can ask instead of hardcoding.
 *
 * `click` and `cursor` are separate on purpose. Being clickable and knowing
 * where the pointer is are different powers, and the desktop layer has exactly
 * one of them: explorer's icon view sits above us and swallows every button
 * press, but the main process can read the global cursor position whenever it
 * likes. So he cannot be grabbed down there, yet he can still notice you and
 * come over — which is most of what makes him feel alive.
 */
export interface LayerCaps {
  /** Can the window receive mouse buttons — can he be grabbed and dragged? */
  click: boolean
  /** Do we know where the pointer is? */
  cursor: boolean
  /** Can we enumerate desktop icons to interact with? */
  icons: boolean
  /** Is he drawn above other applications? */
  topmost: boolean
}

export const LAYER_CAPS: Record<LayerMode, LayerCaps> = {
  overlay: { click: true, cursor: true, icons: false, topmost: true },
  underlay: { click: false, cursor: true, icons: true, topmost: false },
}

/** A rectangle in Electron DIP screen coordinates. */
export interface Rect { x: number; y: number; width: number; height: number }

/** One desktop icon as the shell reports it, converted to DIP. */
export interface DesktopIcon {
  /** The shell's list-view index. Stable while explorer lives; not across restarts. */
  index: number
  /** Display name, e.g. "Recycle Bin". Used for his commentary. */
  name: string
  /** The icon image itself — what he actually gnaws on. */
  icon: Rect
  /** Icon plus label. Used for overlap tests so he never stands on the text. */
  bounds: Rect
}

/** A monitor, as the pet's world model wants it. */
export interface DisplayInfo {
  id: number
  bounds: Rect
  /** Bounds minus taskbar and other appbars — the floor he stands on. */
  workArea: Rect
  scaleFactor: number
  primary: boolean
}

/** Everything the renderer needs to know about the machine it is drawn on. */
export interface WorldSnapshot {
  /** Union of all displays. The window is exactly this rect. */
  virtualBounds: Rect
  displays: DisplayInfo[]
  icons: DesktopIcon[]
  layer: LayerMode
}

/**
 * A name from the names course: which one, and which of its bearers this is —
 * 1 for the first 豆豆, 2 for 豆豆二号. Stored as a reference rather than as
 * text so a creature is called by the same name in every language: learning
 * Arabic, it is the Arabic of the name it already had.
 */
export interface Called {
  id: string
  n: number
}

/** The persisted creature. Times are epoch ms so decay survives a reboot. */
export interface PetSave {
  /** Stable across sessions. Identity, not position in the array. */
  id: string
  species: SpeciesId
  /** Rolled once at birth and never changed. This *is* the creature. */
  genes: Genes
  /**
   * The English name. Kept as the creature's stable identity — logs, the tray
   * and the debug tools key on it — even though, in Chinese, it is no longer
   * what you see.
   */
  name: string
  /**
   * The name shown in its place whenever they are speaking a course language,
   * in that language. Optional only for saves from before names existed; main
   * fills it in on load.
   */
  called?: Called
  /**
   * How a name was stored before names were per-language: the Chinese text of
   * it. Read once on load, turned into `called`, and dropped.
   */
  zh?: { script: string; reading: string; gloss: string }
  /**
   * Which plane he lives on. Persisted in both stage modes — `single` ignores
   * it for placement but keeps it, so switching modes is lossless both ways.
   */
  layer: LayerMode
  /** Out on the desktop, or resting in the roster and not simulated. */
  out: boolean
  /**
   * A visitor: one that has wandered on and is **not owned**.
   *
   * Never true on disk. A wild pet is held separately in main, handed to a
   * window alongside the roster so it is drawn and simulated exactly like
   * anyone else — which is the point, since being indistinguishable is what
   * makes noticing it the game. It becomes a real pet only when clicked.
   */
  wild?: boolean
  /** A visitor that has waited long enough and is walking off the screen. */
  leaving?: boolean
  /** When the player took him in. Maturity counts from here, not from bornAt. */
  adoptedAt: number
  /** 0..1 each. Low is bad. */
  needs: { fullness: number; energy: number; social: number }
  /** 0..1. Emerges from the needs but has its own inertia. */
  mood: number
  /** Where he was standing, in DIP screen coords. */
  x: number
  y: number
  /** Lifetime counters — the bragging rights half of a tamagotchi. */
  stats: { iconsChewed: number; stepsHopped: number; naps: number; pets: number }
  bornAt: number
  lastSeenAt: number
}

/**
 * How many windows the app runs.
 *
 *  • dual   — an overlay window and an underlay window, pets partitioned by
 *             their own `layer`. Full per-pet control.
 *  • single — one window at `settings.layer`, holding everybody regardless of
 *             their `layer`. One less renderer process and one less canvas,
 *             which is a real saving on a modest machine.
 *
 * Both modes run the same code; the only difference is how many windows exist
 * and how pets are partitioned among them.
 */
export type StageMode = 'dual' | 'single'

export interface Settings {
  stageMode: StageMode
  /** In `single`, the layer everyone lives in. In `dual`, the default for new
   *  arrivals that have no opinion. */
  layer: LayerMode
  /** Render cap. 30 is plenty for a hopping frog and it halves the GPU cost. */
  fps: number
  /** 0..1, and 0 means genuinely silent — no context is even created. */
  volume: number
  scale: number
  launchOnStartup: boolean
  /** Let him wander across every monitor, or pin him to the one he is on. */
  roamAllDisplays: boolean

  /**
   * Which layer the Matron stands in — independent of the pets, so she can be
   * a reachable front door in front while the colony chews icons behind.
   */
  matronLayer: LayerMode
  /** Off by default. She is a landmark; a landmark you can knock over by
   *  accident while reaching for a window is not one. */
  matronDraggable: boolean
  /** Where she was dragged to, in **screen** coordinates, or null while she
   *  sits at her anchor. Screen rather than canvas so the virtual desktop's
   *  origin moving (a monitor added to the left) does not teleport her. */
  matronPos: { x: number; y: number } | null

  /**
   * Which plane a wandering stranger arrives in.
   *
   * In front is easier to notice and easier to click; on the desktop it has to
   * be spotted between your icons, which some people will prefer and which is
   * the only reason this is a setting rather than a rule.
   */
  newcomerLayer: LayerMode

  /** Which panel theme is in force — an id from renderer/ui/theme.ts. A string
   *  rather than a union so a save from a build with more themes than this one
   *  degrades to the default instead of failing to load. */
  theme: string

  /**
   * What they speak: `course` is lines from the verified course, in the
   * language being learned, with its meaning; `grunts` is the original English
   * grunts, and no lesson at all. The course is the default because teaching
   * is the point.
   */
  voice: Voice
  /**
   * The language being learned — L2. It is what they say, on top, with its
   * reading (pinyin, a romanization) where it has one. Any language can be
   * either this or `l1`, never both; see `tongues`.
   */
  l2: LanguageId
  /** The language the learner already reads — L1. The meaning line under the
   *  lesson is in this; a line not translated into it yet shows English. */
  l1: LanguageId
  /** A second meaning line, in a third language, or null for one line only. */
  l1Also: LanguageId | null
  /**
   * How long speech bubbles stay up, as a multiple of the natural time — long
   * enough to read three lines. More than 1 by default: a sentence you are
   * trying to learn should not vanish while you are still on the pinyin.
   */
  speechScale: number
  /** The same, for conversations between two creatures, set separately. */
  talkScale: number
  /**
   * Which level they speak at — `hsk1`, `hsk2`. Cumulative: at HSK 2 they
   * still say HSK 1 things, less often. A string rather than a union, like
   * `theme`, so a save naming a level this build lacks falls back to HSK 1.
   */
  level: string
}

export type Voice = 'course' | 'grunts'

/**
 * Settings with the languages made consistent: L1 is never L2, and the second
 * meaning is neither. Whatever collides gives way to the choice just made —
 * pick your L1 as the language to learn and the two swap, which is what
 * someone doing that almost always means.
 *
 * Also carries a save from before L1 and L2 existed, when the settings were
 * `language` (`zh` or `en`, the grunts) and `gloss` (`en`, `es` or `both`).
 */
export function tongues(s: Settings & { language?: string; gloss?: string }, prev?: Settings): Settings {
  const out: Settings & { language?: string; gloss?: string } = { ...s }
  if (out.language !== undefined) {
    if (out.language === 'en') out.voice = 'grunts'
    if (out.gloss === 'es') out.l1 = 'es'
    if (out.gloss === 'both') { out.l1 = 'en'; out.l1Also = 'es' }
    delete out.language
    delete out.gloss
  }
  if (out.l1 === out.l2) {
    // One of the two just moved onto the other: swap them. With nothing to
    // swap from — a hand-edited save — keep L2 and explain it in English, or
    // in Spanish when English is what is being learned.
    if (prev && prev.l2 !== out.l2) out.l1 = prev.l2
    else if (prev && prev.l1 !== out.l1) out.l2 = prev.l1
    else out.l1 = out.l2 === 'en' ? 'es' : 'en'
  }
  if (out.l1Also === out.l1 || out.l1Also === out.l2) out.l1Also = null
  return out
}

export const DEFAULT_SETTINGS: Settings = {
  stageMode: 'dual',
  layer: 'overlay',
  fps: 30,
  volume: 0.5,
  scale: 1,
  launchOnStartup: false,
  roamAllDisplays: true,
  matronLayer: 'overlay',
  matronDraggable: false,
  matronPos: null,
  newcomerLayer: 'overlay',
  theme: 'pewter',
  voice: 'course',
  l2: 'zh',
  l1: 'en',
  l1Also: null,
  speechScale: 1.5,
  talkScale: 1.5,
  level: 'hsk1',
}

/**
 * Everything that is not identity, appearance or position. Used to backfill
 * hand-edited and older saves; `genes` is deliberately absent, because there is
 * no such thing as a default genome — one has to be rolled.
 */
export const DEFAULT_SAVE = {
  name: 'Mudgin',
  species: 'mudgin' as SpeciesId,
  layer: 'overlay' as LayerMode,
  out: true,
  needs: { fullness: 0.7, energy: 0.9, social: 0.6 },
  mood: 0.6,
  x: 200,
  y: 200,
  stats: { iconsChewed: 0, stepsHopped: 0, naps: 0, pets: 0 },
}

/**
 * Everyone the player owns, out or resting.
 *
 * Versioned because the shape has changed twice: v1 was a bare PetSave (one
 * creature, no wrapper), v2 added the array, v3 added species and genomes.
 * `loadColony` migrates on read; see store.ts.
 */
export interface ColonySave {
  version: 3
  mudgins: PetSave[]
}

/**
 * There is no cap, on the roster or on how many are out at once.
 *
 * There used to be one, at eight, and it was a taste limit rather than a
 * technical one — past about that many they stop being individuals you
 * recognise and start being a swarm. That turns out to be somebody else's call
 * to make, so the swarm is now available on request.
 *
 * What it costs, so a future change knows what it is trading: each creature out
 * is a Brain, a Speech, a dirty rect and a body to draw — all linear in how
 * many are out. Neighbour questions used to add an all-pairs term on top of
 * that; they now go through the x-index in `pet/neighbors.ts`, so what is left
 * is drawing.
 */

export function newPetSave(
  id: string, name: string, species: SpeciesId, genes: Genes,
  x: number, y: number, layer: LayerMode,
): PetSave {
  const now = Date.now()
  return {
    ...DEFAULT_SAVE,
    id, name, species, genes, x, y, layer,
    out: true, bornAt: now, adoptedAt: now, lastSeenAt: now,
  }
}

/**
 * A genome for a save that predates genomes.
 *
 * Seeded off the pet's own id, so the Mudgin you have had for a week gets one
 * specific appearance and keeps it — a fresh roll on every load would give him
 * a new body every time the app started.
 */
export const legacyGenes = (id: string): Genes => rollMudgin(sampler(hashSeed(id)))
