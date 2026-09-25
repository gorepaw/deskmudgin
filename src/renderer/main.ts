// =============================================================================
// Renderer entry point. One of these runs per window.
//
// A window is the unit of simulation: it holds only the creatures main assigned
// to it and simulates them independently. In dual mode there are two of these
// running the same bundle over disjoint rosters; in single mode there is one
// holding everybody. Neither knows about the other, and neither needs to —
// every cross-creature rule is a within-layer concern.
//
// Which window this is comes from the URL, because it has to be known before
// the first IPC call. Everything else is assembly; the interesting decisions
// live in brain.ts, colony.ts, world.ts, ui/panel.ts and the art.
// =============================================================================

import type { MudginBridge, UiRequest } from '../shared/ipc'
import type { LayerMode, Settings } from '../shared/types'
import { Painter } from './engine/painter'
import { Stage, pacedLoop } from './engine/stage'
import { rng } from './engine/math'
import { World } from './world/world'
import { Colony } from './pet/colony'
import type { Creature } from './pet/creature'
import { Fx } from './art/fx'
import { sfx, setVolume } from './audio/sfx'
import { say, setGloss, setLanguage, setLevel } from './pet/lines'
import type { GlossMode } from '../shared/lang/types'
import { DictionaryPanel, type Tab } from './ui/dictionary'
import { setOnShown, setSpeechScale } from './ui/speech'
import type { HeardLine } from '../shared/ledger'
import { setTimeScale, FAST_SCALE } from '../shared/clock'
import { Matron } from './ui/matron'
import { UiLayer, applyTheme } from './ui/panel'
import { MenuPanel, SettingsPanel } from './ui/menu'
import { ManagerPanel } from './ui/manager'
import { LedgerPanel } from './ui/ledger'
import { PetCardPanel } from './ui/petcard'
import { StarterPanel } from './ui/starter'

declare global {
  interface Window { mudgin: MudginBridge }
}

const bridge = window.mudgin
const params = new URLSearchParams(location.search)

/** Which window this renderer is. Set by petWindow.ts as a query parameter. */
const MY_LAYER: LayerMode = params.get('layer') === 'underlay' ? 'underlay' : 'overlay'
/** Opened purely to host panels — see StageWindow.uiOnly. Draws nobody. */
const UI_ONLY = params.get('ui') === '1'

/** Pointer movement under this, between press and release, is a click. */
const CLICK_SLOP = 3

async function boot(): Promise<void> {
  // Development instrument: replaces the app's entire output with a grid of
  // rolled genomes. Checked before anything else so it needs no world, no
  // roster and no IPC beyond settings.
  if (bridge.isContact && MY_LAYER === 'overlay') return contactSheet()

  const [snap, settings, roster] = await Promise.all([
    bridge.invoke('world:get'),
    bridge.invoke('settings:get'),
    bridge.invoke('roster:get'),
  ])

  let cfg: Settings = settings
  setVolume(cfg.volume)
  // Before the first frame: every panel reads the live theme at draw time, so
  // this only has to happen once here and again on every settings change.
  applyTheme(cfg.theme)
  setLanguage(cfg.language)
  setLevel(cfg.level)
  setGloss(cfg.gloss)
  setSpeechScale(cfg.speechScale, cfg.talkScale)
  // Before anything constructs a behaviour: the scale is read at the moment a
  // wait is rolled, and the first rolls happen on the first tick.
  if (bridge.isFast) setTimeScale(FAST_SCALE)

  const stage = new Stage(document.getElementById('stage') as HTMLCanvasElement)
  const g = new Painter(stage.ctx)
  const world = new World(snap)
  // The Fx pool is shared across this window's creatures. Particles have no
  // owner — a crumb does not care who spat it out — and one capped pool is what
  // stops eight of them chewing at once becoming eight hundred particles.
  const fx = new Fx(rng(0x5eed))

  const colony = new Colony(world, fx, sfx, c => {
    // Landing: a puff of dust and a hop. Gated inside sfx, so a synchronised
    // landing by several creatures is one sound rather than a slap.
    fx.emit('dust', c.pet.x, c.pet.y, 2, { color: 0x9a8a90, size: 4, life: 0.35, vy: -14 })
    sfx.hop()
  })
  colony.setScale(cfg.scale)
  colony.sync(roster)

  // Time passed while the app was closed, applied once before the first frame
  // so they arrive already hungry rather than getting hungry in fast-forward.
  colony.each(c => {
    const away = Math.max(0, (Date.now() - c.pet.lastSeenAt) / 1000)
    if (away > 60) c.pet.needs.advance(away)
  })

  // ── The Matron ─────────────────────────────────────────────────────────────
  // Constructed unconditionally and shown conditionally. Recreating her on
  // every settings change would reset her blink clock and her warmth, so the
  // object outlives any particular reason to be looking at her.
  const matron = new Matron(rng(0x9a7a04))
  let showMatron = false

  function syncMatron(): void {
    // She may only be drawn by a window that is simulating something: in single
    // mode there is exactly one, and in dual it is the one matching her layer.
    // A ui-only overlay never shows her, or she would appear twice.
    showMatron = !UI_ONLY && (cfg.stageMode === 'single' || cfg.matronLayer === MY_LAYER)
    matron.configure(cfg, world)
    // Only reachable where she is drawn. A pet on the desktop layer cannot
    // cuddle a Matron standing in front of your icons.
    colony.setMatron(showMatron ? matron : null)
    stage.invalidate()
  }
  syncMatron()

  // ── Panels ─────────────────────────────────────────────────────────────────
  const ui = new UiLayer(
    bridge,
    () => cfg,
    // Panels are confined to one monitor's work area — the one under the point
    // they were asked for, or the primary. See UiLayer's `viewport` docs.
    near => {
      const d = near
        ? world.displayAt(near.x, near.y)
        : world.snapshot.displays.find(x => x.primary) ?? world.snapshot.displays[0]
      const o = world.snapshot.virtualBounds
      return {
        x: d.workArea.x - o.x, y: d.workArea.y - o.y,
        width: d.workArea.width, height: d.workArea.height,
      }
    },
    // The last panel closed. In single+underlay mode this window exists only to
    // have held it, and main can now let it go.
    () => { void bridge.invoke('ui:closed') },
  )

  /** Show a panel here, from a request in screen coordinates. */
  function openPanel(req: UiRequest): void {
    const at = world.toCanvas({ x: req.x, y: req.y })
    switch (req.panel) {
      case 'menu': ui.open(new MenuPanel(), at); break
      case 'manager': ui.open(new ManagerPanel()); break
      case 'ledger': ui.open(new LedgerPanel()); break
      case 'dictionary': ui.open(new DictionaryPanel((req.id as Tab | undefined) ?? 'words')); break
      case 'settings': ui.open(new SettingsPanel()); break
      case 'starter': ui.open(new StarterPanel()); break
      case 'pet': if (req.id) ui.open(new PetCardPanel(req.id), at); break
    }
  }

  /**
   * Ask for a panel, wherever it can actually live.
   *
   * A window that can receive a click can host its own panels, which is every
   * overlay. The underlay cannot — explorer owns the mouse down there — so it
   * hands the request to main, which finds or creates an overlay and pushes it
   * back. Same rule for the Matron's menu and a pet's card.
   */
  function requestPanel(panel: UiRequest['panel'], sx: number, sy: number, id?: string): void {
    const req: UiRequest = { panel, x: sx, y: sy, id }
    if (world.caps.click) openPanel(req)
    else void bridge.invoke('ui:open', req)
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  // The overlay window is click-through by default and becomes solid only while
  // the pointer is genuinely on something of ours. That flip is the entire
  // contract that makes a full-screen topmost window acceptable to live with.
  // The underlay window never receives input at all — see world.caps.click.
  let solid = false
  const setSolid = (v: boolean) => {
    if (v === solid) return
    solid = v
    if (bridge.isDebug) console.log(`[input] solid=${v}`)
    void bridge.invoke('input:setHitRegion', v)
  }

  /**
   * Should the window be solid right now?
   *
   * True while the pointer is on something of ours — panels, then her, then
   * them — and unconditionally while a drag is in progress. The second half
   * matters: a click-through window is forwarded mouse *moves* but not mouse
   * *ups*, so anything dragged off its own rectangle would never be let go.
   */
  const wantSolid = (x: number, y: number): boolean =>
    ui.grabbing || !!dragging || !!press || !!matronGrab
    || !!ui.hitAny(x, y) || (showMatron && matron.hit(x, y)) || !!colony.hit(x, y)

  /**
   * A press on a creature that has not yet become a grab.
   *
   * The distinction is the whole fix for a long-standing annoyance: pressing
   * used to set `held` immediately, so every single pat made them yelp about
   * being picked up before the button had even come back up. Nothing touches
   * the creature until the pointer has actually travelled — below that, it is a
   * pat and it always was.
   */
  let press: { c: Creature; x: number; y: number; dx: number; dy: number } | null = null
  let dragging: Creature | null = null
  let dragDx = 0
  let dragDy = 0
  /** Recent pointer velocity, in DIP/s, smoothed. This is what gets thrown. */
  let velX = 0
  let velY = 0
  let velAt = 0
  let velX0 = 0
  let velY0 = 0
  /** Where a press on the Matron began, so a drag can be told from a click. */
  let matronGrab: { x: number; y: number; dx: number; dy: number } | null = null

  /** Track how fast the hand is moving, so releasing can hand it to physics. */
  function sampleVelocity(x: number, y: number): void {
    const now = performance.now()
    const dt = (now - velAt) / 1000
    velAt = now
    // A stale sample means the pointer stopped and started again; the old
    // velocity is not evidence of anything.
    if (dt <= 0 || dt > 0.12) { velX = 0; velY = 0; velX0 = x; velY0 = y; return }
    // Smoothed, because a single mousemove can straddle a frame and one noisy
    // sample at release is the difference between a lob and a rocket.
    velX = velX * 0.4 + ((x - velX0) / dt) * 0.6
    velY = velY * 0.4 + ((y - velY0) / dt) * 0.6
    velX0 = x
    velY0 = y
  }

  const canvas = stage.canvas
  canvas.addEventListener('mousemove', e => {
    world.cursor.x = e.clientX
    world.cursor.y = e.clientY
    world.cursor.idle = 0
    world.cursor.inside = true

    if (dragging) {
      sampleVelocity(e.clientX, e.clientY)
      dragging.pet.pose.x = e.clientX + dragDx
      dragging.pet.pose.y = e.clientY + dragDy
      return
    }
    if (press) {
      // Far enough to mean it. Only now does the creature know it has been
      // picked up, which is what stops a pat reading as a grab.
      if (Math.hypot(e.clientX - press.x, e.clientY - press.y) < CLICK_SLOP) return
      dragging = press.c
      dragDx = press.dx
      dragDy = press.dy
      press = null
      dragging.pet.held = true
      // held scores 1, so this takes effect on the next brain tick without any
      // input code needing to know which behaviours exist.
      dragging.force('held')
      if (bridge.isDebug) console.log(`[input] grab ${dragging.name}`)
      velAt = performance.now()
      velX0 = e.clientX
      velY0 = e.clientY
      velX = 0
      velY = 0
      return
    }
    if (matronGrab) {
      matron.dragging = true
      matron.dragTo(e.clientX + matronGrab.dx, e.clientY + matronGrab.dy, world)
      stage.invalidate()
      return
    }
    if (!world.caps.click) return
    ui.move(e.clientX, e.clientY)
    setSolid(wantSolid(e.clientX, e.clientY))
  })

  // Leaving the canvas only means nobody should be solid. It does not mean the
  // pointer is unknown — the cursor pump below still knows exactly where it is,
  // and clearing `inside` here would make them lose interest in you every time
  // the pointer crossed onto a fullscreen window.
  canvas.addEventListener('mouseleave', () => setSolid(false))

  canvas.addEventListener('mousedown', e => {
    if (bridge.isDebug) {
      console.log(`[input] down b=${e.button} ${e.clientX},${e.clientY}`
        + ` panel=${!!ui.hitAny(e.clientX, e.clientY)} matron=${showMatron && matron.hit(e.clientX, e.clientY)}`)
    }
    if (e.button !== 0) return
    // Panels are on top of everything and swallow what lands on them.
    if (ui.down(e.clientX, e.clientY)) return

    if (showMatron && matron.hit(e.clientX, e.clientY)) {
      matron.dragging = false
      matronGrab = cfg.matronDraggable
        ? {
          x: e.clientX, y: e.clientY,
          dx: matron.x - e.clientX, dy: matron.y - e.clientY,
        }
        // Not draggable: still record the press, so the release can tell a
        // click from a stray drag across her, but with no offset to follow.
        : { x: e.clientX, y: e.clientY, dx: 0, dy: 0 }
      return
    }

    const c = colony.hit(e.clientX, e.clientY)
    if (!c) return
    // Recorded, not grabbed. See `press`.
    press = {
      c, x: e.clientX, y: e.clientY,
      dx: c.pet.pose.x - e.clientX, dy: c.pet.pose.y - e.clientY,
    }
  })

  window.addEventListener('mouseup', e => {
    ui.up(e.clientX, e.clientY)

    const grab = matronGrab
    matronGrab = null
    if (grab) {
      const moved = Math.hypot(e.clientX - grab.x, e.clientY - grab.y) >= CLICK_SLOP
      matron.dragging = false
      if (moved && cfg.matronDraggable) {
        void bridge.invoke('matron:move', world.toScreen({ x: matron.x, y: matron.y }))
      } else {
        matron.react()
        sfx.happy()
        const s = world.toScreen({ x: matron.x, y: matron.y })
        requestPanel('menu', s.x, s.y)
      }
      return
    }

    // A press that never travelled. This is a pat, and it always was — the
    // creature was never told it had been picked up.
    if (press) {
      const c = press.c
      press = null
      pat(c)
      return
    }

    const c = dragging
    dragging = null
    if (!c) return
    c.pet.held = false
    // Let go with whatever speed the hand had. A gentle set-down passes a
    // near-zero velocity and simply falls, so there is no separate "drop".
    sampleVelocity(e.clientX, e.clientY)
    if (bridge.isDebug) {
      console.log(`[input] release ${c.name} v=${velX.toFixed(0)},${velY.toFixed(0)}`)
    }
    c.pet.fling(velX, velY)
    velX = 0
    velY = 0
  })

  canvas.addEventListener('wheel', e => {
    if (ui.wheel(e.clientX, e.clientY, e.deltaY)) e.preventDefault()
  }, { passive: false })

  canvas.addEventListener('contextmenu', e => {
    e.preventDefault()
    // A right-click only reaches this window while it is solid, which means the
    // pointer is already on something of ours — so there is no "empty desktop"
    // case to worry about here. A panel handles its own; everything else opens
    // the card for whoever was hit, or her menu.
    if (ui.hitAny(e.clientX, e.clientY)) return
    const s = world.toScreen({ x: e.clientX, y: e.clientY })
    const c = colony.hit(e.clientX, e.clientY, 10)
    if (c) requestPanel('pet', s.x, s.y, c.id)
    else requestPanel('menu', s.x, s.y)
  })

  function pat(c: Creature): void {
    // A stranger has not agreed to be patted. Clicking one is the whole of the
    // acquisition loop, so it takes precedence over every other meaning a click
    // could have — in both layers, which is why this lives in `pat` rather than
    // in one of the two input paths that call it.
    if (c.wild) { take(c); return }
    if (bridge.isDebug) console.log(`[input] pat ${c.name}`)
    c.pet.needs.socialise(0.12)
    c.pet.stats.pets++
    fx.emit('heart', c.pet.x, c.pet.y - 44, 2, { size: 7, vy: -46 })
    c.speech.say(say(c.pet.rng, 'pet'), 1.5)
    sfx.happy()
  }

  /**
   * Take a stranger in.
   *
   * The card that follows is the payoff: you clicked something you knew nothing
   * about, and now you find out what you caught — including, if you were at the
   * out-cap, that it went straight to resting.
   */
  function take(c: Creature): void {
    const at = world.toScreen({ x: c.pet.x, y: c.pet.y })
    fx.emit('heart', c.pet.x, c.pet.y - 44, 4, { size: 8, vy: -52 })
    fx.emit('spark', c.pet.x, c.pet.y - 30, 6, { size: 4 })
    sfx.happy()
    // Sequenced, not fired in parallel: the card asks main for a pet that only
    // exists once the adoption has been recorded.
    void bridge.invoke('pet:adopt', c.id, at).then(taken => {
      if (!taken) return                    // it left a moment before the click
      c.speech.say(say(c.pet.rng, 'happy'), 2)
      requestPanel('pet', at.x, at.y, c.id)
    })
  }

  // ── Pushes from main ───────────────────────────────────────────────────────
  bridge.on('roster:changed', list => {
    // Somebody joined, left, moved layer or went to rest. A departure has to be
    // erased from wherever it was standing, so a membership change invalidates
    // the whole surface rather than trusting last frame's dirty rects.
    if (colony.sync(list)) stage.invalidate()
  })

  // Panels show the whole collection, not this window's share, so they refresh
  // on their own channel.
  bridge.on('colony:changed', () => ui.refreshAll())
  bridge.on('ledger:changed', () => ui.refreshAll())
  bridge.on('ui:open', req => openPanel(req))

  bridge.on('world:changed', s => {
    world.apply(s)
    stage.resize()
    // The ledges they were standing on may not exist any more.
    colony.each(c => { c.pet.surface = world.groundAt(c.pet.x, c.pet.y) })
    matron.relocate(world)
  })

  bridge.on('settings:changed', s => {
    const wasTheme = cfg.theme
    cfg = s
    setVolume(cfg.volume)
    colony.setScale(cfg.scale)
    setLanguage(cfg.language)
    setLevel(cfg.level)
    setGloss(cfg.gloss)
    setSpeechScale(cfg.speechScale, cfg.talkScale)
    if (cfg.theme !== wasTheme) {
      applyTheme(cfg.theme)
      // A theme changes every pixel of every open panel, including the parts
      // outside this frame's dirty rects.
      ui.invalidate()
    }
    syncMatron()
  })

  bridge.on('layer:changed', () => {
    stage.invalidate()
    fx.clear()
    void bridge.invoke('world:get').then(s => {
      world.apply(s)
      colony.each(c => { c.pet.surface = world.groundAt(c.pet.x, c.pet.y) })
      matron.relocate(world)
    })
    setSolid(false)
  })

  // Where the pointer is, straight from the OS. This is the only source in the
  // desktop layer, and it keeps working in the overlay during the moments the
  // window is click-through and mousemove is not being forwarded.
  bridge.on('cursor', p => {
    const c = world.toCanvas(p)
    if (c.x !== world.cursor.x || c.y !== world.cursor.y) world.cursor.idle = 0
    world.cursor.x = c.x
    world.cursor.y = c.y
    world.cursor.inside = true
  })

  // A click main saw happen while we could not. Only sent to the underlay
  // window — see the 'click' channel docs. Pat, never drag: the button is
  // already down and explorer is already drawing a selection rectangle.
  bridge.on('click', p => {
    const c = world.toCanvas(p)
    // Generous. This is the one interaction with no hover feedback, so aiming
    // is done blind and the target should forgive a few pixels.
    const hit = colony.hit(c.x, c.y, 12)
    const onMatron = showMatron && matron.hit(c.x, c.y, 10)
    if (bridge.isDebug) {
      const near = colony.nearest(c.x)
      console.log(`[click:${p.button}] ${c.x},${c.y} -> ${hit ? hit.name : onMatron ? 'matron' : 'nobody'}`
        + `${near ? ` (nearest ${near.name} at ${near.pet.x.toFixed(0)},${near.pet.y.toFixed(0)})` : ''}`)
    }

    if (p.button === 'right') {
      // The desktop layer's only route to a panel. Explorer shows its own menu
      // as well — we observe the press, we do not intercept it — so this is
      // deliberately narrow: it fires on a pet or on her, and never on bare
      // wallpaper, where it would fight a menu the user actually asked for.
      if (hit) requestPanel('pet', p.x, p.y, hit.id)
      else if (onMatron) requestPanel('menu', p.x, p.y)
      return
    }

    if (hit) pat(hit)
    else if (onMatron) {
      matron.react()
      requestPanel('menu', p.x, p.y)
    }
  })

  bridge.on('command', c => {
    switch (c.kind) {
      case 'feed':
        colony.each(m => {
          m.pet.needs.feed(0.35)
          fx.emit('spark', m.pet.x, m.pet.y - 40, 6, { size: 4 })
          m.speech.say(say(m.pet.rng, 'fed'), 2)
        })
        sfx.happy()
        break
      case 'pet':
        colony.each(pat)
        break
      case 'sleep':
        colony.each(m => m.force('sleep'))
        break
      case 'wake':
        colony.each(m => { m.pet.asleep = false; m.force('idle') })
        break
      case 'summon':
        // Everyone in this window comes. Fanned out around the cursor rather
        // than stacked on it, or they arrive as a single overlapping blob.
        colony.all.forEach((m, i) => {
          const spread = (i - (colony.size - 1) / 2) * 56
          const x = world.cursor.x + spread
          m.pet.surface = world.groundAt(x, world.cursor.y)
          m.pet.pose.x = world.clampToSurface(m.pet.surface, x)
          m.pet.pose.y = m.pet.surface.y
          m.pet.asleep = false
          fx.emit('dust', m.pet.x, m.pet.y, 5, { color: 0x9a8a90, size: 5, life: 0.5 })
          m.speech.say(say(m.pet.rng, 'summon'), 1.5)
        })
        stage.invalidate()
        break
    }
  })

  window.addEventListener('resize', () => stage.resize())

  // ── Autosave ───────────────────────────────────────────────────────────────
  // Every 20s plus on unload. The interval is what actually saves them — an app
  // killed from Task Manager never sees a beforeunload. Main merges by id, so
  // sending only this window's share is correct and expected.
  //
  // Skipped entirely when this window holds nobody: a ui-only overlay has an
  // empty roster, and an empty merge is a pointless rewrite of pet.json every
  // twenty seconds.
  const persist = () => {
    if (colony.size) void bridge.invoke('colony:save', colony.toSave())
  }
  setInterval(persist, 20_000)
  window.addEventListener('beforeunload', persist)

  // ── What they said to you ──────────────────────────────────────────────────
  // Every course line a bubble shows goes into the ledger the first time.
  // Filtered here against what is already filed, and batched, so a colony
  // repeating itself costs nothing and a new line costs one IPC call rather
  // than one per bubble.
  const filed = new Set((await bridge.invoke('ledger:get'))
    .filter(e => e.category === 'said').map(e => e.key.slice('said:'.length)))
  let heard: HeardLine[] = []
  setOnShown(e => {
    if (filed.has(e.id)) return
    filed.add(e.id)
    heard.push({ id: e.id, script: e.script, reading: e.reading, english: e.english })
  })
  setInterval(() => {
    if (!heard.length) return
    void bridge.invoke('ledger:heard', heard)
    heard = []
  }, 2000)

  // One line every two seconds describing what they are doing. Off unless
  // DESKMUDGIN_DEBUG is set; see MudginBridge.isDebug for why it is not folded
  // into isDev. Main prefixes each line with the window's layer.
  //
  // Sampled past a couple of dozen. A line naming five hundred creatures is
  // unreadable, and building and shipping it over IPC every two seconds costs
  // more than everything it was written to observe — an instrument that
  // changes the measurement is worse than no instrument.
  const LOG_ROSTER = 24
  if (bridge.isDebug) {
    setInterval(() => {
      const shown = colony.all.slice(0, LOG_ROSTER)
      const who = shown.map(c => {
        const s = c.pet.surface
        // A visitor is marked, because it is deliberately invisible as one on
        // screen — this log is the only place the distinction shows.
        const tag = c.wild ? (c.pet.leaving ? '*leaving' : '*wild') : ''
        const said = c.speech.current
        return `${c.name}(${c.species.id}${tag}):${c.activeId}`
          + `@${c.pet.x.toFixed(0)},${c.pet.y.toFixed(0)}`
          + `/${s.kind}${s.icon ? `(${s.icon.name})` : ''}`
          // What they are saying, so the Chinese can be read from the log
          // rather than chased around the desktop.
          + (said ? ` "${typeof said === 'string' ? said : said.script}"` : '')
      }).join('  ')
      const more = colony.size > shown.length ? ` …and ${colony.size - shown.length} more` : ''
      console.log(`[brain] n=${colony.size} fx=${fx.count} matron=${showMatron ? 'here' : 'no'}`
        + ` panels=${ui.open_.length} ${who || '(empty)'}${more}`)
    }, 2000)
  }

  // ── Frame ──────────────────────────────────────────────────────────────────
  //
  // `[frame]` answers the one question a crowd raises that nothing else can:
  // is it still keeping up, and if not, which half is late. CPU in Task Manager
  // says a core is busy but not whether the loop is hitting its cap, and the
  // two halves fail for completely different reasons — thinking scales with how
  // many are out, painting with how much of the screen they cover. Reported
  // once every two seconds alongside the brain log, and only under DEBUG.
  let frames = 0
  let tickMs = 0
  let paintMs = 0
  let sinceReport = 0

  pacedLoop(() => cfg.fps, (dt, now) => {
    const t0 = bridge.isDebug ? performance.now() : 0
    world.cursor.idle += dt
    colony.tick(dt, now)
    if (showMatron) matron.tick(dt, world)
    fx.update(dt)

    // A thrown creature's whole flight is shorter than one tick of the brain
    // log, so it needs its own trace or the arc is unobservable. Only ever
    // emits while something is genuinely in the air, which is rare and brief.
    if (bridge.isDebug) {
      for (const c of colony.all) {
        if (!c.pet.flying) continue
        console.log(`[fly] ${c.name} ${c.pet.x.toFixed(0)},${c.pet.y.toFixed(0)}`
          + ` spin=${c.pet.pose.spin.toFixed(2)}`)
      }
    }

    // A panel that opened, closed or moved cannot be described by a rect that
    // only covers where it is now.
    if (ui.takeDirty()) stage.invalidate()

    // One rect per creature plus one for the particles — never a union of all
    // of them. See Stage.paint.
    const dirty = colony.bounds()
    if (showMatron) dirty.push(matron.bounds())
    dirty.push(...ui.bounds())
    const fxBox = fx.bounds()
    if (fxBox) dirty.push(fxBox)

    const t1 = bridge.isDebug ? performance.now() : 0
    stage.paint(dirty, () => {
      // Painted back to front: she is scenery, the pets stand in front of her,
      // the particles are over both, and the panels are over everything.
      if (showMatron) matron.draw(g, world.width)
      colony.draw(g)
      fx.draw(g)
      ui.draw(g, now)
    })

    if (bridge.isDebug) {
      const t2 = performance.now()
      tickMs += t1 - t0
      paintMs += t2 - t1
      frames++
      sinceReport += dt
      if (sinceReport >= 2) {
        // Achieved rate against the cap, so a saturated loop is visible as a
        // number rather than inferred from a fan.
        const fps = frames / sinceReport
        console.log(`[frame] ${fps.toFixed(1)}/${cfg.fps}fps n=${colony.size}`
          + ` think=${(tickMs / frames).toFixed(2)}ms`
          + ` paint=${(paintMs / frames).toFixed(2)}ms`
          + ` rects=${dirty.length}`)
        frames = 0; tickMs = 0; paintMs = 0; sinceReport = 0
      }
    }
  })

  colony.each(c => c.speech.say(say(c.pet.rng, 'idle'), 2.5))
}

/** The contact sheet takes over the window: opaque, solid to input, no colony. */
async function contactSheet(): Promise<void> {
  const { ContactSheet } = await import('./debug/contact')
  const stage = new Stage(document.getElementById('stage') as HTMLCanvasElement)
  const g = new Painter(stage.ctx)
  const seed = Number(params.get('seed') ?? 1)
  // DESKMUDGIN_CONTACT=growth swaps the population sheet for the maturity one:
  // one Mudgin per row, aged across the columns.
  const growth = bridge.isContact === 'growth'
  // DESKMUDGIN_CONTACT=speech draws every verified course line as a bubble.
  // DESKMUDGIN_CONTACT=themes draws the same bubbles in every theme.
  const { SpeechSheet, ThemeSheet } = await import('./debug/speechsheet')
  // DESKMUDGIN_CONTACT=chrome&theme=<id>: real panels and bubbles in one theme.
  const chromeSheet = bridge.isContact === 'chrome' ? await import('./debug/chromesheet') : null
  const page = params.get('page')
  const build = () => bridge.isContact === 'speech'
    ? new SpeechSheet(window.innerWidth, window.innerHeight, page === null ? null : Number(page))
    : bridge.isContact === 'themes' ? new ThemeSheet(window.innerWidth, window.innerHeight)
    : bridge.isContact === 'chrome' && chromeSheet
      ? new chromeSheet.ChromeSheet(window.innerWidth, window.innerHeight, params.get('theme') ?? 'pewter',
        (params.get('gloss') ?? 'en') as GlossMode)
    : new ContactSheet(window.innerWidth, window.innerHeight, seed, growth)
  let sheet = build()
  window.addEventListener('resize', () => { stage.resize(); sheet = build() })
  // Solid, so the sheet can actually be read against the desktop behind it.
  void bridge.invoke('input:setHitRegion', true)
  pacedLoop(() => 20, (_dt, now) => {
    stage.invalidate()
    stage.paint([], () => sheet.draw(g, now))
  })
}

void boot().catch(err => {
  // Nothing to show a dialog on — the window is a transparent overlay. The dev
  // console is the only useful place for this to land.
  console.error(`[deskmudgin ${MY_LAYER}] boot failed:`, err)
})
