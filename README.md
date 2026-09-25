# DeskMudgin

A Mudgin lives on your desktop.

> *Small misshapen frog-folk of purple-brown hide — one eye, one leg, few
> thoughts. Dim, ugly, and doggedly enduring; the Republic's least-regarded
> citizens.*
> — `Data/races.json`, Galanova Adventure

A **Mudgin** is a one-eyed, one-legged frog-thing that hops. A **Sephin** is a
six-eyed penguin-alien that waddles and belly-slides. Every one of them is a
unique continuous genome — no two alike, ever — and collecting them is the game.

They live on two planes. In the **front layer** they sit on top of everything,
follow your cursor, and can be picked up and patted. In the **desktop layer**
they are reparented into the shell, *behind* your icons, where Mudgins leap up
and chew on them. Each pet is assigned to a layer individually.

There is no limit on how many are out at once, and each has its own name, brain
and history. See *How many* below for what a crowd costs.

A **Ganorok Matron** stands in the bottom-right corner — the app's front door.
Click her for the menu; pets wander over and lean on her, and she warms up when
they do.

> **Build state:** the collection update and the language update are both
> complete — they speak Chinese (HSK 1 and 2), hold conversations, carry Chinese
> names, and the Matron keeps a dictionary. See [DEVLOG.md](DEVLOG.md).

## Running

```
npm install
npm run dev      # vite + tsc --watch + electron, restarts on change
npm start        # build once and run
npm run dist     # NSIS installer into release/
```

Windows x64 only, by construction — the desktop layer is Win32 shell
integration and there is no cross-platform equivalent of it.

> If Electron exits immediately with `Cannot read properties of undefined
> (reading 'app')`, something exported `ELECTRON_RUN_AS_NODE=1` into your
> shell — VS Code does this to every child process. `scripts/electron.mjs`
> strips it; launch through the npm scripts rather than calling `electron`
> directly.

## Reaching them

| | Front layer | Desktop layer |
| --- | --- | --- |
| Click to pat | yes | yes |
| Click a stranger to keep it | yes | yes |
| Right-click for its card | yes | yes |
| Pick up and drag | yes | **no** |
| Sees your cursor, comes over | yes | yes |
| The Matron's menu | yes | yes |
| Tray menu, hotkeys | yes | yes |

**In the desktop layer they never receive a mouse event.** Explorer's icon view
sits above them and consumes every button press; being behind your icons and
being in the input path are the same question with opposite answers.

What works anyway is *observation*. The main process already polls the OS for
the cursor, so it polls both mouse buttons alongside it and reports presses —
the renderer hit-tests them itself. Left pats; right opens that pet's card, in
the front layer, because a panel cannot be drawn in a plane that cannot take
input. It cannot buy dragging, because a drag means holding the button down on
the desktop, which is how you start explorer's selection rectangle. This watches
the buttons; it does not hook or intercept anything, and the desktop receives
exactly the same click it always would — so patting a Mudgin also deselects your
icons, and right-clicking one also opens explorer's own menu behind the card.

The tray menu and these hotkeys work in both layers:

| | |
| --- | --- |
| `Ctrl+Alt+M` | swap layers |
| `Ctrl+Alt+Shift+M` | bring him to the cursor |
| `Ctrl+Alt+F` | feed him |

If a combination is already taken by something else, registration fails, a line
goes to the log, and the tray menu still does everything.

## Variety

Genes are **floats**, not entries in a table. Colour is HSL sampled from
weighted continuous distributions; positions, sizes and rates are continuous
too. The only integers are counts that physically must be — you cannot have 3.7
lumps. There is no variant list, so there is nothing to enumerate and nothing to
complete.

Names — "burning gold eye · umber hide · five-lumped" — are a **lossy lens**
computed on demand, never stored. That is what lets duplicates mean something in
a system where no two pets are alike: two Mudgins can both read *ember-eyed,
five-lumped* and still be visibly different animals. A ledger line is never
proof you have seen everything it covers.

Rarity is the tail of a distribution, not a rarity table, and **nothing in the
app ever rates a pet**. A description says what a creature has and stops; you
work out what is uncommon by how seldom you see it.

A Mudgin's hide runs the purple-brown-grey spectrum and its eye is usually
muted, with a thin tail across the whole wheel — so the canonical glowing
yellow-green is a rare roll rather than the default. A Sephin has a body colour,
an eye colour and a foot colour; the highlight, outline and the four-step eye
ramp are all derived from those, exactly as galanova's `SephinSlide` derives its
constants.

## Handling them

In the front layer they can be picked up and thrown, and it is real ballistics
rather than an animation: they carry the velocity your hand had, arc under
gravity, tumble as they go, bounce when they land and skid to a stop. Throw one
hard enough and it will bounce off the side of the screen, or land on a desktop
icon on the way past.

A press is not a grab. Nothing happens to a creature until the pointer has
actually travelled a few pixels, so a click is a pat and only a drag is a drag.
Setting one down gently is silent; throwing one across the desk is not.

A Sephin held off the ground flaps its flippers as hard as it can. It does not
help.

## How many

As many as you like. Nothing caps how many are out; the only limit is what your
machine will do.

Measured with `DESKMUDGIN_DEBUG=1`, which prints a `[frame]` line every two
seconds giving the rate actually achieved and where the time went:

| out | frame rate | thinking | drawing |
| --- | --- | --- | --- |
| 13 | 30 / 30 fps | 0.02 ms | 0.9 ms |
| 167 | 29 / 30 fps | 0.16 ms | 4.4 ms |
| 250 | 19 / 30 fps | 0.3 ms | 12 ms |
| 350 | 14 / 30 fps | 0.4 ms | 16 ms |
| 500 | 10 / 30 fps | 0.6 ms | 29 ms |

**Around two hundred is the comfortable ceiling** and five hundred is a
slideshow. Dropping `fps` is the lever if you want the swarm without the fan.

Thinking is not what costs — deciding for a hundred and sixty-seven creatures
takes a sixth of a millisecond, because every question a behaviour asks about
its neighbours goes through an index over x rather than a walk over everybody.
It is the drawing, at roughly 0.05 ms per creature in the renderer and about as
much again behind it in the GPU process: they are drawn from paths every frame,
because they breathe and blink every frame.

## Themes

Eleven, chosen from the Matron's **Settings**:

| | |
| --- | --- |
| **Pewter** | cold iron and grey light — the default |
| **Bog** | galanova gold on navy, where this started |
| **Ganorok** | the Matron's own stone and amber |
| **Bogwater** | wet peat, to match the Mudgins rather than the app |
| **Parchment** | a field notebook, for daylight |
| **Terminal** | phosphor green, square corners |
| **Amber CRT** | amber phosphor, with the scanlines |
| **Windows XP** | Luna: beige dialog, blue title bar, raised buttons, Tahoma |
| **Windows 95** | flat grey, square bevels, a navy caption block |
| **Aqua** | Mac OS X: pinstripes and glassy blue lozenges |
| **High contrast** | black, white and yellow, heavy borders |

A theme is a palette plus a handful of switches — corner radius, bevelled
buttons, glossy lozenges, a filled title bar, pinstripes, scanlines, border
weight, font. Each is one branch in `Panel`, and each earns its place by being
the thing that makes some real interface recognisable: Aqua without stripes is
not Aqua. Most themes use none of them and are palettes only, which is the
point — adding one stays a data entry. See `renderer/ui/theme.ts`.

## Growing up

Mudgins age. Over somewhere between twelve hours and a week — rolled per
creature, and **never shown as a number anywhere** — a Mudgin takes on a green
that starts at the crown and fades to nothing by the belly, so the hide it was
born with survives fully intact along the bottom of it. The green deepens but
never takes over.

The last third of that is a flower opening on its head. Its colour is its own,
usually near its eye colour and sometimes nothing like it, and you do not get
told what it is until it is fully open — you can watch it come in, which is the
point.

The only reading you ever get is a small bar in the pet's card, marked with the
three stages and carrying no numbers at all. How long one has left is something
you judge by looking at it.

Sephins are what they are from the day you meet them.

## Strangers

Every so often something wanders onto the screen that is not yours. It looks
exactly like a pet you own — same art, same brain, same everything — because
**noticing it is the game**. There is no badge, no notification and no sound.
Click it and it is yours; a card opens telling you what you caught, which is the
first time you learn its name.

If you never notice, it waits a while, gives up, walks off the side of the
screen, and something else turns up later. Nothing is lost when that happens
except the one you did not see, and there are always more: species and genome
are rolled **fresh every time**, with no pool and no comparison against what you
already own. Duplicates are expected and are the point — a space you can exhaust
is a space you can measure.

Every interval is rolled per occurrence and never shown as a number. Whether one
is due is something you have to guess.

You can set whether they arrive in front or behind your icons. Behind is harder
to spot, which is rather the point.

> On a first run you are shown two live creatures — an actual Mudgin and an
> actual Sephin, not illustrations — and you take one. The other is discarded
> outright; it does not go back into a pool, because there is no pool.

## The Matron

A Ganorok Matron — pachyderm giant of "stone" flesh, ported path-for-path from
Galanova Adventure's speaker portraits — stands in the bottom-right corner of
your primary monitor. She is the app's front door and its one fixture.

Click her for the menu:

- **Who is out** — three buckets, *In front* / *On the desktop* / *Resting*.
  Drag a pet between them; click one for its card. This is how anybody gets back
  out of the desktop layer.
- **What we have seen** — the names you have met so far. It has **no total, no
  percentage, and never shows what is missing**, because there is nothing to
  complete: the genome is continuous, so "orchid hide" is a reading of a region
  of a colour wheel rather than a card in a set. Hover a name for the day it
  first turned up.
- **Settings** — where everyone lives, where she stands, one-window mode.

Every so often a pet in her layer walks over and leans on her; she warms, her
ears lift and her eye-glow steadies. She can be dragged, if you turn that on.

A pet's card names its traits and stops. Nothing in the app rates a creature.
Sending one away is the only destructive action, takes two clicks, and never
costs you a name — the ledger keeps what it learned.

## Teaching Chinese

The creatures are learning to speak Chinese at you — 汉字, tone-marked pinyin and
an English gloss. None of that content is written by the app's author on their
own authority: every line is drafted, sent out to be checked by **Google
Translate and Gemini independently**, and only ships when both agree. The app
imports only generated, verified content, so unchecked Chinese cannot reach a
speech bubble by anyone forgetting a step.

Three rules hold it up: nobody types a tone mark (pinyin is derived from the
hanzi mechanically); unverified rows cannot ship (it is a build boundary, not a
habit); and a row needs two independent sources to agree before it is trusted.

See [content/README.md](content/README.md) for the loop, and run
`npm run lang:selftest` to exercise it against deliberately broken replies.

What there is, HSK 1 and HSK 2 (2.0):

| | HSK 1 | HSK 2 |
| --- | --- | --- |
| **Words** | 152 | 150 |
| **Sentences** | 302 | 449 |
| **Conversations** | 60 | 58 |

Sentences are chosen by moment (hungry, sleepy, picked up) and at random while
idle; nearby pets start conversations and answer each other. Settings → *They
speak* → **level** picks HSK 1 or 2. Levels are cumulative: at HSK 2, seven lines
in ten are HSK 2 and the rest keep HSK 1 in use.

| | |
| --- | --- |
| **Names** | 118, per species; every pet has one, with pinyin and meaning on its card |
| **Ledger** | *what they said to you* — every line you have been shown, pinyin on hover |
| **Dictionary** | the Matron's menu → *The dictionary*: words, phrases and conversations by level, with a ✓ on what you have been shown |

Speech bubbles take the look of the chosen theme — XP's caption band, Aqua's
stripes, the CRTs' scanlines. Six premium themes bring their own frames:
Illuminated, Stained glass, Brass & rivets, Bog shrine, Holographic and Ink
wash.

Settings has two sliders, **Bubbles stay** and **Conversations stay** (0.5×–4×,
1.5× by default), so a sentence you are still reading does not vanish.

Settings → *They speak* switches back to the English grunts. The current content
was verified by Claude; see *Who verified what* in content/README.md for how to
find and re-check it.

## Debugging

`DESKMUDGIN_DEBUG=1` prints one line every two seconds per window saying which
behaviour is running, where each creature is and what it is standing on —
forwarded to the main process's stdout, prefixed with the window's layer.

```
overlay: [brain] n=2 Mudgin(mudgin):idle@137,1032/floor  Sephin(sephin):slide@227,1032/floor
overlay: [frame] 28.6/30fps n=167 think=0.16ms paint=4.40ms rects=168
```

The roster is sampled past twenty-four — a line naming five hundred creatures
costs more to build and ship than everything it was written to observe.

The `[frame]` line is the one to read when a crowd feels heavy: it gives the
rate actually achieved against the cap, and splits the frame into deciding and
drawing, which fail for entirely different reasons. Task Manager can tell you a
core is busy; only this can tell you the loop is behind and which half is late.

`DESKMUDGIN_CONTACT=1` replaces the app's output with a **contact sheet**: a
grid of freshly rolled genomes, each labelled with its trait names, on an opaque
backdrop. Add `?seed=N` to re-roll the population.

Use it after any change to the genome or the art. It is not a nicety — it
caught lumps being drawn inside the body silhouette (making a five-lumped Mudgin
pixel-identical to a twin-lumped one), an iris too small to show the eye colour,
and Mudgins visibly undersized beside Sephins. None of those were visible in the
code.

`DESKMUDGIN_CONTACT=growth` draws the maturity sheet instead: one Mudgin per
row, aged across the columns. It is the only way to see whether the green ever
overpowers the hide underneath it, because that is a question about a
comparison rather than about any one creature.

`DESKMUDGIN_CARD=<name>` opens that pet's card at startup, without a mouse.

`DESKMUDGIN_FAST=1` divides every long wait by 25, so behaviour that is meant to
happen on the scale of minutes or days can be watched in one sitting. Only
durations written as `slow(seconds)` are affected — hops, bites and blinks are
never routed through it, because a creature moving 25× too fast is a different
creature rather than a faster test.

All of these are separate from `--dev` on purpose. The bugs worth chasing here are
behavioural or visual, they take minutes of watching to show up, and they need a
production build running against the real shell — which is exactly when devtools
are closed and `console.log` goes nowhere.

## Stack, and why

| Choice | Reason |
| --- | --- |
| **Electron 33** | Needs a real HWND to reparent into the shell, plus mature transparent/topmost windows. Tauri gives neither cheaply. |
| **Canvas2D, not Pixi** | An always-on-top window the size of your desktop should not hold a WebGL context for one 40px frog. The art ports anyway — see `engine/painter.ts`. |
| **koffi** | Win32 FFI with prebuilt binaries and no node-gyp. `ffi-napi` is unmaintained on modern Node. |
| **Vite + tsc** | Vite bundles the renderer; plain tsc builds main, because koffi is native and must stay external. |
| **No runtime deps but koffi** | The art is procedural, the sounds are oscillators, the save is JSON. Nothing to load, nothing to license, ~28 kB of renderer. |

## Architecture

```
src/
  shared/          the contract, compiled by all three processes
    genome.ts      continuous genes + the sampling distributions
    describe.ts    genes → trait names (lossy, derived, never stored)
    ledger.ts      the set of names seen — no denominator, by construction
    maturity.ts    how a Mudgin greens, and how far along it is
    clock.ts       slow() — every long wait, compressible for testing
    types.ts ipc.ts names.ts
  main/
    stage/host.ts  owns 1–2 windows; partitions pets  ← dual vs single lives here
    layers/        LayerStrategy: overlay | underlay
    win32/         api (koffi bindings) · shell (desktop windows) · desktopIcons
    world.ts       physical pixels → DIP, icon polling
    store.ts       atomic JSON persistence + save migration
  preload/         typed contextBridge, no logic
  renderer/
    species/       the Species registry  ← everything species-specific hides here
    engine/        painter (Pixi-shaped Canvas2D) · stage (dirty rects) · math
    world/         surfaces, cursor, coordinate conversion
    pet/           colony (this window's share) · creature (one of them) · pet (body)
                   needs · brain (scoring) · behaviors/*
    ui/            panel (the base) · matron · menu · manager · ledger · petcard
    art/           pose · mudgin · sephin · matron · palette · fx
    debug/         contact (the genome sheet) · clock (compressed time)
```

**A window is the unit of simulation.** Each one holds only the pets main
assigned it and simulates them independently — two windows share no state and
need none, because every cross-pet rule is a within-layer concern and only the
underlay sees icons. That is what makes dual-vs-single a partition function
rather than a fork, and why `Use one window only` in the tray costs nothing but
a renderer process.

Four extension points, each of which is one file plus one line:

- **A new thing they do** → a `Behavior` factory in `pet/behaviors/`, added to
  `FACTORIES`. Behaviors score themselves 0–1 and the brain runs the winner;
  there is no state machine to rewire. They declare which layers they work in,
  so they never check the mode themselves, and they ask `world.caps` rather than
  the mode name — `caps.click` and `caps.cursor` are deliberately separate,
  because the desktop layer has one and not the other.
- **A new species** → a file in `art/`, plus an entry in `species/index.ts`
  listing which behaviours it uses. `chewIcon` stays a Mudgin habit without
  `chewIcon` ever knowing a Sephin exists.
- **A new layer** → a `LayerStrategy` in `main/layers/`, added to `STRATEGIES`.
- **A new panel** → a subclass of `ui/panel.ts`'s `Panel` implementing `body()`
  and `onDown()`, opened with `host.open(new MyPanel())`. Widget helpers draw
  and register their hit rectangle in the same call, so there is no second
  layout pass to fall out of step with.
- **A new particle** → a row in `art/fx.ts`'s `KINDS`.
- **A new sound** → a method on `audio/sfx.ts`'s `sfx`.

Behaviours are **factories, one set per creature**. They were singletons while
there could only be one of him; two creatures sharing one wander target and one
chew victim do not read as two creatures, they read as one animal with a
rendering bug.

### The art is copied, not redrawn

`engine/painter.ts` is Canvas2D wearing Pixi's `Graphics` API — `g.circle(x, y,
r).fill({ color, alpha })` and so on. That means art from Galanova Adventure
ports over by changing the import line. `art/mudgin.ts` is
`BombaMudgins/look.ts`'s `drawMudginInto` with a pose struct in place of the
game's projectile state; the palette in `art/palette.ts` is Mudgin Gobble's
`PAL` verbatim, so this is the same creature down to the hex.

The Matron went further: her six SVG paths are copied into `art/matron.ts` as
**strings** and parsed by `Path2D` rather than translated into drawing calls.
Thirty bezier control points retyped by hand is thirty chances to make her
subtly not-her, and it would have to happen again for the next portrait. Only
the animation is invented — Galanova's portraits are completely static.

### Cost

The window spans the whole virtual desktop — 3.5 million pixels on a dual
monitor setup, more on 4K. `engine/stage.ts` repaints only the union of what
changed last frame and what changes this one, and the loop is paced to 30 fps.
Everything outside that rect keeps its pixels.

## The desktop layer

This is the part with teeth. What the app does:

1. Sends the undocumented `0x052C` to `Progman`, asking the shell to split the
   desktop into wallpaper and icon layers.
2. Finds the layer between them and `SetParent`s the window into it.
3. Reads the icon rectangles out of `explorer.exe` with cross-process
   `LVM_GETITEMRECT` / `LVM_GETITEMTEXTW`.

Windows has **two** desktop shapes and which one you get is a property of the
build, not a choice:

- **A** — `SHELLDLL_DefView` gets moved into a `WorkerW`, and a second,
  desktop-sized `WorkerW` below it paints the wallpaper. Parent into that one.
- **B** — *the usual Windows 11 shape.* `0x052C` creates nothing at top level,
  `DefView` stays a child of `Progman`, and the wallpaper is painted by a
  `WorkerW` that is itself a **child** of `Progman`, directly beneath the icons.

Shape B has two traps, both of which this code hit before it worked:

- A live Win11 desktop has ~17 top-level `WorkerW` windows and all but at most
  one are 136×39 shell helpers. Matching on class name alone parents the pet
  into a 136×39 box in a corner. `win32/shell.ts` requires the candidate to
  cover most of what `Progman` covers.
- `Progman`'s children run `[icons, wallpaper, …]`, and a newly parented child
  goes to the **top**. Sinking to `HWND_BOTTOM` lands *underneath the
  wallpaper*, where the Mudgin is present, correctly animated, and completely
  invisible. `underlay.ts` inserts directly below `SHELLDLL_DefView` instead.

### Consequences, by design

- **They cannot be dragged in the desktop layer.** See *Reaching them* above.
- **Nothing touches your files.** Icon rectangles are read; nothing is moved,
  renamed or deleted. The chewing is animation and crumbs.
- **Explorer restarts are handled.** The layer watchdog re-attaches, and
  re-sinks every second so an F5 on the desktop cannot lift him in front of the
  icons.
- **If the shell has no usable layer** — icons switched off, a shell
  replacement — he falls back to `Progman` and, failing that, keeps retrying.
  Icon reading degrades to `[]` and `chewIcon` scores 0, so he just wanders.

Known interaction: live-wallpaper apps (Wallpaper Engine, Lively) occupy the
same layer. Both will work, but Z-order between them is first-come.

## The colony

`Colony` owns the list; `Creature` is one of them — a `Pet` (body), a `Brain`, a
`Speech` and its own seeded RNG. Everything per-creature is owned there and
nothing per-creature lives above it.

Behaviours are **factories, one set per creature**. They were singletons while
there could only be one of him, which was fine and is documented as such in
`behaviors/index.ts` — but two Mudgins sharing one `victim`, one wander target
and one rest timer do not read as two creatures, they read as one animal with a
rendering bug. Closure state per instance is the fix and it costs nothing.

Each one gets `ctx.others` — everyone else, read-only. A behaviour may look at
the others to decide what to do, and four of them now do: `wander` gives people
room, `chewIcon` avoids an icon somebody is already up, `followCursor` lets
whoever is nearest have the pointer instead of all of them converging into a
heap, and `cuddle` takes the Matron's other shoulder if one is taken. Nothing
may *move* anybody but its own creature; that rule is what keeps a colony
tractable. `ctx.matron` is read-only in the same sense, and is null in whichever
window she is not standing in.

Rendering scales with the number of them, not their spread — `Stage.paint` takes
one dirty rect per creature and clips to all of them at once, because two on
opposite monitors would union into the entire virtual desktop.

The cap is eight, and it is taste rather than performance: past that they stop
being individuals you recognise. `pet.json` is versioned; a v1 save (one bare
creature, from before any of this) migrates on read.

## The pet

Three needs — fullness, energy, social — decay against wall clock, including
time the app was closed, capped at 24 hours so a holiday cannot kill him. Mood
follows the worst of them with inertia. Everything persists to
`%APPDATA%/deskmudgin/pet.json`, which is plain JSON and hand-editable (a BOM is
tolerated).

Rates are deliberately slow: hungry over an afternoon, not over a coffee break.
The failure mode of every desktop pet is becoming a chore.
