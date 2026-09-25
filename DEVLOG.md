# DeskMudgin — build state

Working notes for whoever picks this up next. The user-facing docs are in
[README.md](README.md). The current approved design is
[docs/plan-language-update.md](docs/plan-language-update.md); the Collection
Update's plan predates source control and survives only as this log.

**Status: Collection Update and Language Update both complete and verified.**
Source: [github.com/gorepaw/deskmudgin](https://github.com/gorepaw/deskmudgin).

---

## Where things stand

| Work | State |
| --- | --- |
| Collection 1–4 — layers, species, genome, Matron, panels, wild pets, maturity | **done, verified on the real desktop** |
| Post-plan — throwing, eleven themes, no cap, neighbour index | **done** |
| Language 0 — verification pipeline (`tools/lang-*`, `content/`) | **done, self-tested** |
| Language 1 — Chinese speech bubbles, ledger vocabulary | **done, verified live** |
| Language 2 — two-creature conversations (`converse`) | **done, verified live** |
| Language 3 — Chinese names for every pet | **done, verified live** |
| Bubble-duration sliders; the dictionary panel | **done, verified live** |

Content, all HSK 1 (2.0), all verified by Claude agents and marked `claude-*`
in `checks` for a later human pass: 152 words, 302 sentences, 60 conversations,
118 names, 74 pinyin overrides.

Everything typechecks (`npm run typecheck`) and builds. ~13,000 lines across 86
TS/MJS files, excluding generated courses. Checks: `npm run lang:selftest`,
`tools/wild-cycle.mjs`, `tools/neighbors-check.mjs`.

**Open with the user:** I offered to clear the ledger's `said` entries from
2026-09-24 — 369 lines were "shown" in an hour only because I woke 13 pets and
made them lonely for a conversation test, which ticked 149/152 words in the
dictionary. Not done unless they say so.

---

## The three ideas the codebase is built on

Understand these and the rest reads itself.

**1. A window is the unit of simulation.** Each window runs its own renderer
process with its own `Colony` holding only the pets assigned to it. Two windows
share no state and need none — every cross-pet rule (`ctx.near(x, radius)`:
personal space, icon claims, nearest-to-cursor, the Matron's shoulder,
conversation partners) is a within-layer concern, and only the underlay can see
desktop icons.

This is what makes `stageMode` a **partition function, not a fork**
(`main/stage/host.ts` → `rosterFor`):

- `dual` — windows `[overlay, underlay]`, partitioned by `pet.layer`
- `single` — one window at `settings.layer`, holding everybody

`pet.layer` is persisted in both modes and merely unhonoured in `single`, so
flipping is lossless in both directions. Verified: dual = 6 processes with the
roster split; single = 5 processes with everyone together and `layer` intact on
disk.

**2. The genome is continuous; names are a lossy lens.** `shared/genome.ts`
holds floats only (HSL triples from weighted distributions; positions, sizes and
rates). The sole integers are counts that physically must be. `shared/describe.ts`
derives display names on demand and **never stores them**.

Two consequences are load-bearing and must survive any edit:
- A name is not an identity. Two "ember-eyed" pets have different ember eyes,
  so a ledger line is never proof you have seen everything it covers — which is
  why the ledger can have no total. There isn't one.
- Nothing rates a pet. No rarity score, tier or stars. Rarity is the tail of a
  distribution and is learned by playing.

**3. Species and behaviours are registries.** `renderer/species/index.ts` holds
the `Species` interface; a species declares which behaviour ids it uses, and
`createBehaviors(species)` filters. `chewIcon` stays a Mudgin habit without ever
knowing a Sephin exists. Behaviours are **factories, one set per creature** —
they were singletons until a second creature could exist.

**4. All chrome is painted on the canvas, and panels live in an overlay.**
There is no DOM UI: the window is a transparent click-through canvas, and adding
HTML would mean a second input model and a second z-order. `ui/panel.ts` is
immediate-mode with a **retained hit list** — a widget helper draws *and*
registers its rectangle in one call, so layout exists once and cannot drift from
what is on screen; hit tests read the list the previous frame built.

Panels can only render in an **overlay** window, because explorer eats input in
the underlay. So opening one is always a round trip: renderer → `ui:open` →
main finds or creates an overlay → pushes `ui:open` back. In `single`+`underlay`
that overlay is created on demand and marked `uiOnly`, which is what makes
`rosterFor` hand it an empty roster — otherwise `single` mode would give it the
same colony the underlay is already animating and you would see everyone twice.
`ui:closed` releases it again.

---

## Verification tooling (use it, it earns its keep)

**Look at sheets offscreen: `npm run build:web && npm run snap -- <sheet> <out.png>`.**
It renders into a hidden offscreen window, writes a PNG and exits on its own,
with a 20s hard timeout behind it. It has no single-instance lock and saves
nothing, so it runs beside a live colony. Do not launch the visible
`DESKMUDGIN_CONTACT` sheets on someone's desktop: one was once left full-screen
and always-on-top when a session ended, and the only way out was a reboot.
`themes` draws every bubble in every theme, on a dark and a light wallpaper.

**`DESKMUDGIN_CONTACT=1`** — the overlay window draws a grid of freshly rolled
genomes with their trait names on an opaque backdrop
(`renderer/debug/contact.ts`). Add `?seed=N` to re-roll the population.

This caught three defects that reading the code did not: lumps drawn *inside*
the body silhouette (a five-lumped Mudgin was pixel-identical to a twin-lumped
one), an iris too small to see the eye colour, and Mudgins visibly undersized
next to Sephins. **Look at a sheet after any genome or art change.**

**`DESKMUDGIN_CONTACT=growth`** — the maturity sheet: one Mudgin per row, aged
across the columns. The only thing that can answer whether the green ever
overpowers the hide it is washed over, because both questions are about a
*comparison* no single screenshot contains. It immediately showed the first
wash was far too weak to read as three stages.

**`DESKMUDGIN_CARD=<name>`** — opens that pet's card at startup, no mouse
needed. The card is the busiest panel there is and the only one no other
instrument can show; reaching it by hand means synthesising three clicks onto a
live desktop, and pets move between reading a position and clicking it.

**`DESKMUDGIN_DEBUG=1`** — one line every two seconds per window naming the
active behaviour, position, surface and species, forwarded to main's stdout and
prefixed with the window's layer.

**`DESKMUDGIN_FAST=1`** — divides every long wait by 25
(`renderer/debug/clock.ts`). A cuddle cooldown of 110–400s becomes 4–16s, so the
thing you are trying to watch happens while you are watching. **Only durations
written as `slow(seconds)` are affected** — hops, bites and blinks are never
routed through it, because a creature moving 25× too fast is a different
creature, not a faster test. Phases 3 and 4 should put their wild-pet and
maturity timers through the same helper.

**Distribution histogram** — `tools/genome-histogram.mjs [n] [seed]` rolls a
population and tallies derived trait names. Current shape: `umber hide` leads at
~14%, a specific burning eye ~0.4%, maturity spans 12h–7d.

**Seeding a test colony** — `tools/seed-colony.mjs` writes a v3 `pet.json`
directly. Kill the app first (see below).

**The visitor schedule** — `tools/wild-cycle.mjs` drives `WildWatch` through
arrive → wait → leave → replace and through adoption, with no GUI at all.
`WildWatch` is deliberately free of Electron (it takes a roller, a callback and
a source of randomness) precisely so this is possible: the alternative is
sitting in front of the desktop for half an hour hoping nothing interferes.

**Do not assume you have the desktop to yourself.** A Phase 3 test run logged
thirty mouse-down events nobody had scripted, adopted three strangers, and
ended with the Matron dragged onto a second monitor — all of it the person
using the machine while the test ran. Anything that can be verified from the
log, or headlessly like `wild-cycle.mjs`, should be.

**Driving the UI from a script.** Synthetic input has one trap worth knowing:
Electron forwards mouse-move to a click-through window through a **low-level
mouse hook**, and `SetCursorPos` does not raise one. Warping the pointer with it
moves the cursor while the overlay never learns anything of ours is under it, so
it never turns solid and the click that follows sails through to the desktop —
which looks exactly like a broken click handler. Inject moves with
`mouse_event(MOUSEEVENTF_MOVE | ABSOLUTE | VIRTUALDESK, …)` instead, a few of
them, and pause before clicking.

---

## Hard-won gotchas

- **Kill the app before writing `pet.json`.** A running instance autosaves every
  20s and on quit, and will overwrite a seeded file. Kill *only ours*:
  `Get-Process electron | Where-Object { $_.Path -like '*deskmudgin*' }` — an
  unfiltered kill also takes out galanova_aquarium's Electron.
- **`ELECTRON_RUN_AS_NODE=1` leaks from VS Code** into every child process and
  makes Electron boot as bare Node (`app` is undefined). `scripts/electron.mjs`
  strips it; always launch through the npm scripts.
- **Bash heredocs eat Windows path backslashes.** `'\\deskmudgin\\pet.json'`
  became `Roamingdeskmudginpet.json` and cost a long debugging detour where the
  app looked broken and was not. Use `path.join`, or write scratch files with
  the Write tool.
- **Two desktop shapes on Windows** — see the README's desktop-layer section.
  Win11 has no wallpaper `WorkerW`; the wallpaper is painted by a `WorkerW` that
  is a *child* of Progman, and `HWND_BOTTOM` lands underneath it.

---

## Deviations from the approved plan

- Genome went **fully continuous** (the user's choice mid-planning), not the
  two-tier families+shade model first proposed. Duplicates are therefore
  perceptual, never literal.
- `MAX_MUDGINS` now bounds **how many are out**, not how many are owned. The
  roster is unbounded; resting pets are saved but not simulated. Applied in
  `host.rosterFor`, not in the store.
- Spawn/cull moved from renderer to main, because main owns the roster.
- Added `shared/names.ts` (main hands out names now) and `art/pose.ts` (shared
  by both species).
- Renamed `pet/mudgin.ts` → `pet/creature.ts`, class `Mudgin` → `Creature`.
  "Mudgin" is a species now, not the app's only animal.

## Bugs fixed in passing

- **Single-instance guard did nothing.** `app.quit()` is async, so a losing
  second instance still opened windows and autosaved, overwriting the winner's
  colony. Now throws to stop module execution.
- **Colony saves must merge by id.** With two windows plus resting pets, no
  renderer sees the whole roster, so a wholesale replace deleted everyone the
  sender could not see (`main.ts` → `mergeColony`).

---

## What Phase 2 added

- **`ui/panel.ts`** — `Panel`, `Hits`, `UiLayer`, the widget helpers and the
  shared `UI` palette. Read this first; the four panels are thin on top of it.
- **`art/matron.ts`** — the six SVG paths from `SpeakerSilhouette.tsx:559-573`,
  **verbatim strings** parsed by `Path2D` rather than redrawn. The reaction is
  invented (galanova's portraits are static) and every moving part shares one
  decaying oscillation, `ring()`, so the squash, ears and trunk read as one
  event.
- **`ui/matron.ts`** — position, warmth, blink, hit-testing, drag. She is
  deliberately **not** a Creature: no needs, no brain, no genome, one instance.
- **`ui/menu.ts`** (menu + settings), **`ui/manager.ts`**, **`ui/ledger.ts`**,
  **`ui/petcard.ts`**.
- **`shared/ledger.ts`** + `ledger.json` — a set with no denominator. Kept in
  its own file because it must outlive the colony: releasing a pet does not
  unlearn it, which is the whole reason sending duplicates away is safe.
- **`pet/behaviors/cuddle.ts`** and `BehaviorCtx.matron`.
- **Right-click in the desktop layer.** `main.ts` now polls `VK_RBUTTON`
  alongside `VK_LBUTTON`, so a pet living behind your icons can be right-clicked
  to open its card in the overlay. This was the layer's only real limitation.

### Things that were decided along the way

- **The native context menu is gone.** It could not be shown from the underlay
  at all and could never have drawn a hide colour. The tray menu stays as the
  escape hatch and gained "Open the Matron's menu" for when she is behind a
  maximised window.
- **The settings panel's layer controls are buttons, not radios.** Pets carry
  their own layer, so any pair of radios would sit checked while the colony was
  in fact split — the normal state. They are actions plus a one-line summary;
  per-pet truth lives in the manager.
- **Ledger keys carry the species** (`body:mudgin:indigo`). Without it a
  Mudgin's `indigo hide` and a Sephin's `indigo back` collide on one key and the
  ledger shows whichever was written last — claiming a hide you have never seen.
  Caught by reading `ledger.json`, not by reading the code.
- **Panels are clamped to one monitor's work area**, not to the canvas. The
  canvas is the whole virtual desktop, and she lives at the right-hand edge of
  one screen, so clamping to the canvas let her menu straddle the bezel. That is
  the normal case here, not an exotic one.

## What Phase 3 added

- **`main/wild.ts`** — the whole visitor schedule, in main because main owns the
  roster and a stranger is a roster entry that has not been earned. It rides to
  the windows inside `roster:changed`, so nothing downstream learns what "wild"
  means beyond deciding what a click does.
- **`PetSave.wild` / `.leaving`** — never on disk. `adopt()` `delete`s both
  rather than setting them false.
- **`behaviors/arrive.ts` / `depart.ts`** — walking on, and walking off.
- **`ui/starter.ts`** — the first run's one decision, and the only panel with
  `closable = false`.
- **Adoption** funnelled through `pat()` in `renderer/main.ts`, so it works
  identically in both layers without either input path knowing about it.
- **`shared/clock.ts`** moved out of `renderer/debug/` — main owns long waits
  too now, and they are separate processes, so each sets its own scale.

### Things that were decided along the way

- **Visitors sit outside `MAX_MUDGINS`.** `rosterFor` appends them *after* the
  slice. The cap is a taste limit on your own colony; withholding a stranger
  because you already have eight out would quietly switch the game off.
- **Adopting at the cap adopts to *resting*, never refuses.** The one action the
  whole loop is built around must not silently fail at the moment a player is
  most invested in it. The card that opens straight afterwards says where it
  went.
- **"Add a Mudgin" is now dev-only.** A tray button that hands you a pet for
  free makes "catching them all" a chore rather than a hunt.
- **The ledger records on adoption, never on sighting.** A stranger that walks
  past unnoticed leaves no trace — otherwise the notebook fills with names the
  player never actually saw.
- **A departing visitor walks to the edge of its own ledge and no further.**
  Overshooting looks right and is not: nothing can stand off-world, so on a
  multi-monitor desktop the overshoot carries them across the bezel and they
  stop dead in the middle of the next screen. Measured at x=1960 on a 1920-wide
  primary before the fix.

## What Phase 4 added

- **`shared/maturity.ts`** — `ageOf` / `stageOf` / `bloomOf` / `stageLabel`, one
  definition read by main, the art and the card. Age counts from `adoptedAt`,
  runs through `slowMs` so `DESKMUDGIN_FAST` compresses it, and returns 1 for
  anything that does not age so Sephins need no special case anywhere.
- **`Pose.age`** — beside `scale`, for the same reason: a per-creature number
  the art needs and the behaviours do not.
- **`drawMoss`** and **`drawFlower`** in `art/mudgin.ts`.
- **The growth bar** in the pet card, and `describeFlower` folded into both the
  card's trait list and the ledger — but **only once fully grown**.
- **`DESKMUDGIN_CONTACT=growth`** — the maturity sheet.
- **`DESKMUDGIN_CARD=<name>`** — opens one pet's card at startup.

### Things that were decided along the way

- **The wash is a gradient in alpha, never a fade to `transparent`.** Canvas2D
  interpolates gradients in premultiplied colour, so `transparent` is
  transparent *black* and the middle of the ramp comes out darker — on a body
  this size that reads as a bruise. Every stop is the same green at a falling
  alpha.
- **The ramp starts just above the crown, not well above it.** At `1.5ry` a
  fifth of the gradient was spent on empty air, so the strongest stop landed
  where there was nothing to tint. Measured over a whole lifetime, a crimson
  hide moved from rgb(141,66,73) to rgb(129,86,68) — "slightly less red", not
  green. At `1.05ry` and 0.62 alpha the crown reaches rgb(130,95,70) while the
  belly stays within five points of the original. Neither number was guessable
  from the code; both came off a screenshot.
- **The bloom is the third stage, not a prize at the end of it.** `bloomOf`
  opens the flower across the whole last third, so it can be caught halfway.
- **The flower's *name* is withheld until fully grown**, in the card and in the
  ledger both. You can see the colour opening; you cannot file it yet. Half the
  point of maturity is not knowing what you have.

## After the plan — handling, and themes

- **`Pet.fling` / `Pet.ballistic`** — velocity, gravity, decaying bounces, wall
  bounces, spin. `pose.spin` and `pose.flap` joined `pose.age` beside `scale`:
  per-creature numbers the art needs and the behaviours do not.
- **`behaviors/tumble.ts`** — what a creature does while it is a projectile,
  and the landing complaint. `held.exit` no longer teleports anyone onto a
  ledge; gravity does it.
- **A press is not a grab.** The input layer keeps a `press` candidate and only
  sets `held` once the pointer has travelled `CLICK_SLOP`. This was a reported
  bug: every pat made them yelp about being picked up, because `held` was set on
  mousedown and `held.enter` says the `grabbed` line.
- **`ui/theme.ts`** — eleven themes; `UI` is the live one, mutated in place so
  every panel picks it up on the next frame with nothing to invalidate. The
  switches are radius, bevel, gloss, titleBar, pinstripe, scanlines, border and
  font; each is one branch in `Panel`, and most themes use none of them.
- **`Painter.setDefaultFont`** — a theme's font has to reach `measure` as well
  as `text`, or every `fit()` truncation is computed against the wrong metrics.

### Things that were decided along the way

- **Hover is a change of colour, never of opacity.** Buttons were drawn at 63%
  alpha, which reads fine on a dark theme — a dark row over a dark body still
  separates — and fails completely on a light one, where the row is a shade off
  the body and the transparency finishes the job. Parchment's buttons were
  invisible until this changed.
- **The shadow does not rotate with the body.** Spin is applied about the middle
  of the body mass, inside the draw, after the contact shadow is down.
- **A held creature rights itself.** Catching one mid-tumble otherwise leaves it
  dangling at whatever angle it was spinning through.
- **`DESKMUDGIN_CARD` became `DESKMUDGIN_PANEL`**, which opens any panel by name
  (`settings`, `manager`, `ledger`, `menu`, `starter`, `pet:Grub`). Six themes
  cannot be reviewed by clicking through a menu on somebody's live desktop.
- **`[fly]` trace.** A whole throw is shorter than one tick of the brain log, so
  the arc is unobservable without it. Only emits while something is airborne.

## The cap is gone

`MAX_MUDGINS` (8) is deleted, along with every refusal built on it: spawn,
`pet:setOut`, adoption-to-resting, the manager's "no room out there", and the
slice in `rosterFor`. Everyone marked `out` is drawn.

Measured on a 3280×1080 desktop at 30 fps, renderer process only:

| out | CPU | RSS |
| --- | --- | --- |
| 40 | ~40% of one core | ~150 MB |
| 120 | ~95% of one core | ~295 MB |

Two things changed to make the top end survivable, and both are worth keeping:

- **`Stage.paint` falls back to a full repaint above ~48 rects.** Each creature
  contributes a rect inflated 90px past its body, so a hundred of them are two
  hundred overlapping rectangles covering most of the screen anyway; building
  that clip path cost more than the repaint it was avoiding. Measured 124% → 95%
  of a core at 120 pets. Below the threshold the rects are still a large win.
- **`Colony.tick` reuses one scratch array** for `ctx.others` instead of
  allocating one per creature per frame.

What is left is inherent: `ctx.others` is genuinely all-pairs (personal space,
icon claims, nearest-to-cursor), so the tick is O(n²), and 120 procedural
creatures is 120 × ~30 canvas ops a frame. If this ever needs to go further, the
all-pairs pass is the term to attack — a coarse x-bucket would cut it to
near-linear, since every rule that reads `others` only cares about neighbours.

## Taking the all-pairs term out, and finding it was not the problem

The paragraph above was the standing next step, so it was taken. It works, and
it turned out to be aimed at the wrong thing — which is the more useful half of
this entry.

**`ctx.others` is gone; `ctx.near(x, radius)` replaced it.** Behind it,
`pet/neighbors.ts` indexes everybody into 256px cells of x, rebuilt once per
tick, and a query walks only the cells it overlaps. The colony no longer
assembles a list of everyone-else per creature per frame — n² pushes 30 times a
second, paid whether or not a single behaviour asked anything.

A query rather than a list, because **every rule that reads the others is asking
about a place**, not about the colony:

| | asks around | radius |
| --- | --- | --- |
| `wander` | where he is *going* | personal space, 46 |
| `chewIcon` | himself | how far he'll travel for an icon, +an icon |
| `followCursor` | the *cursor*, at his own distance from it | that distance |
| `cuddle` | the spot beside *her* | how close he'd nestle, 30 |

Two of the four ask about somewhere other than where they are standing, which a
plain "who is near me" would have got wrong — cuddle especially, since a pet
decides to go and lean on the Matron from right across the desktop and needs to
know whether her shoulder is free before it sets off. Naming the radius at the
call site also puts the distance a rule cares about next to the rule, where it
can be checked; each one was derived from a bound already in that code.

`tools/neighbors-check.mjs` checks the index against the loop it replaced over
1800 queries — random populations from 0 to 500, every radius any behaviour
actually asks for, and the shapes a desktop really produces: everyone in one
heap, everyone on one ledge, pets at negative x on a monitor left of the
primary, and every pet at *identical* x. A wrong answer here does not crash
anything, it shows up as one pet quietly ignoring another, which is invisible on
a live desktop. It also times the two: at 2000 pets, building the lists cost
20.6 ms a tick and the index costs 1.8 ms.

While there, `wander` was changed to dodge the **closest** other rather than the
first one found. Order used to come from the roster and now comes from cell
layout; both are arbitrary, and position is not.

### Then the measurement said it was the drawing all along

Removing an O(n²) term feels like the win, so it is worth writing down that it
mostly was not. A new `[frame]` trace under `DESKMUDGIN_DEBUG` reports the rate
actually achieved against the cap, split into thinking and drawing:

| out | frame rate | think | paint |
| --- | --- | --- | --- |
| 167 | 28.6 / 30 | 0.16 ms | 4.4 ms |
| 250 | 19.4 / 30 | 0.3 ms | 11.7 ms |
| 350 | 14.0 / 30 | 0.4 ms | 16.3 ms |
| 500 | 10.1 / 30 | 0.6 ms | 29.0 ms |

Thinking for 167 creatures costs a sixth of a millisecond. It is drawing —
~0.05 ms per creature here, and about as much again behind this function, since
the frame period is consistently two to three times what the renderer spends in
it. They are drawn from paths every frame because they breathe and blink every
frame, and there is no obvious way around that short of caching bodies that
change on every one.

So the ceiling is about **200 out at a steady 30 fps**, and 500 is a slideshow.

Two things follow, both worth keeping:

- **The crowded fallback now merges to the union of the rects rather than the
  whole window.** They live on the floor, so that union is a couple of hundred
  rows of a thousand-row surface. Measured, it changed nothing — 250 ran at 19.2
  fps whole-window and 19.5 unioned, 500 at 10.0 and 10.1 — so the comment in
  `Stage.paint` says so, because the next person looking there for speed should
  be sent to the per-creature draw instead. It is kept for doing less work for
  the same result, not for a number.
- **The brain log samples past 24 creatures.** A line naming five hundred of
  them costs more to build and ship over IPC every two seconds than everything
  it was written to observe. An instrument that changes the measurement is worse
  than no instrument, and this one was doing it in the very runs meant to find
  the ceiling.

## Nobody's word for it

The app is going to teach Chinese, and the person building it does not read
Chinese. That is the whole design problem — the features are easy and the trust
is not.

Chinese written by someone who cannot read it is wrong in ways that are
invisible from inside the repo. A tone mark that changes the word. A sentence
that parses and that no person would say. A creature's name that means something
unfortunate. None of those look like bugs; they look like content, and they ship.
So the first thing built is not a feature at all, it is a pipeline whose job is
to make my confidence irrelevant.

### Three rules, in the order they matter

**1. Nobody types a tone mark.** `reading` is derived from `script`
mechanically and never authored. This is the single biggest lever in the design,
because it deletes an entire error class *before* the human step rather than
asking a human to catch it: what you are left checking is only whether the
Chinese means the English.

`pinyin-pro` is very good — it gets 长大 zhǎng, 银行 háng, 了不起 liǎo, 妈妈 mā
ma, and 一/不 sandhi. It is not perfect: 谢谢 comes out `xiè xiè` where the
second syllable is neutral, and 东西 meaning "thing" as `dōng xī`. So there is an
override layer — and the important part is that **an override is content**. It
goes through the same verification as everything else. The alternative, letting
a correction be hand-typed into the corpus, reintroduces exactly the hand-written
tone marks the rule exists to forbid.

**2. Unverified content cannot ship.** The app imports only
`src/shared/lang/generated/`, and `lang-build.mjs` writes verified rows there and
nothing else. A build boundary rather than a discipline — the difference between
a rule that holds and a rule that holds until a Friday.

**3. Two keys.** A row reaches `verified` only when two independent sources
agree: Google Translate's blind back-translation, which knows nothing of what was
intended and is therefore a genuinely separate reading of the characters, and
Gemini's judgement, which does know and can answer "would a person say this".
Where they disagree the row becomes `conflict` with both opinions written into
it, and a human settles it. Nothing in the tooling promotes a row on its own
reasoning.

### The part that makes it survivable

A verification loop that requires retyping does not survive three hundred rows.
So the return trip is as mechanical as the outbound one: the Gemini prompt is
generated with the questions already in it and **demands a fixed TSV reply**,
because "is this right?" gets an essay and an essay cannot be ingested. Google
Translate gets bare lines and is joined by position — and a line count that
comes back different is refused outright rather than matched off by one, which is
the only way that join can silently go wrong.

TSV throughout, and the format was chosen for the human step rather than the
machine one: it pastes into Google Sheets, it pastes into Gemini, it diffs
readably, and it survives being edited by hand. No quoting and no escaping — a
tab inside a field is rejected at write time, because the moment this needs a
parser with state it stops being something you can fix in a spreadsheet, which
was the only reason to choose it.

### What the self-test is for

Every failure mode here is a silent one. A row promoted on one source's word. A
hand-typed tone mark surviving into the build. A short paste matched off by one.
None of them announce themselves; they just produce an app that teaches
something wrong to someone who cannot tell.

So `tools/lang-selftest.mjs` drives the whole loop against replies with defects
planted in them — one source agreeing alone, a fabricated pinyin correction, a
dropped row, a missing verdict, a desynced reading, a short paste — and asserts
each one is caught. It snapshots and restores the real overrides file, because
the first version of it left invented Chinese sitting in `content/` looking like
somebody had meant it.

It found a real bug immediately, and a instructive one: building a phrase course
before the wordlist was verified failed with `「爱」is not in the wordlist — a
traditional form, or a typo`. True, and useless — it sends you to inspect
perfectly good content when the actual problem is that you have not verified the
wordlist yet. The check now names the real cause, and the wordlist/phrase
distinction is an explicit `--kind` flag rather than a filename sniff, because a
heuristic that guesses wrong produces an error blaming the content for the tool.

### Shaped for Spanish, on purpose

The unit is a **course** — `(language, level, entries)` — not "Chinese". The row
model is `script` / `reading` / `english`, where `reading` is simply empty for a
language that does not need one. Everything actually Chinese is in one adapter
(`tools/lang/zh.mjs`) and one runtime descriptor. The runtime knows only which
font can draw a script and whether there is a middle line.

Adding HSK 2 is a corpus. Adding Spanish is an adapter and a corpus. Neither is a
refactor, and that was worth paying for now rather than later — the cost of
generality here was one indirection, and the cost of retrofitting it would have
been every row already verified.

### Where it stands

The pipeline is built and proven; **no Chinese is verified yet, so the app has
nothing to say.** That is the boundary working. The HSK 1 (2.0) wordlist is
drafted at 150 words and is the first thing through the loop — I should not pull
the wordlist out of thin air any more than the phrases, so the export asks Gemini
explicitly what is missing from it and what does not belong.

## They speak Chinese

The user chose momentum over a manual gate: Claude verifies, and a person goes
over it later for their own learning. So the loop ran with agents in the two
seats — a blind back-translator that saw only the hanzi, a reviewer answering
the Gemini prompt — and every row records `claude-blind` / `claude-review` /
`claude-adjudicated` rather than `gt` / `gemini`. Provenance is the one thing
that could not be allowed to blur: the later human pass depends on being able
to find exactly these rows.

**Content:** the HSK 1 (2.0) wordlist, 152 verified (the reviewer replaced my
饭馆 with the list's actual 饭店 and added 这儿/那儿); 302 of 304 sentences
verified, 2 rejected; 23 verified pinyin overrides.

**What the reviewers caught that I got wrong** — which is the argument for the
loop in one list: 我睡觉了 glossed as "I was asleep" and tagged for *waking up*
(it means "I'm going to bed"); 汉字 and 开车 used despite not being HSK 1;
我想看见你, which no one says; "Let's…" for sentences with no 吧. And in the
deriver: 了 as `liǎo`, erhua as a separate syllable (哪儿 `nǎ ér`), and a
dozen neutral tones (东西, 朋友, 下面, locative 上, reduplicated 看看).

**What running it for real caught in the tools:**
- *Off-by-one, silently.* Ingest joined Google Translate lines by position but
  `filter(Boolean)`-ed rows it could no longer find — and a row is unfindable
  precisely when an earlier fix changed its script. One dropped row shifted
  every later row against the wrong answer; 狗 was reported as disagreeing
  with "dog". Now the index is always the index of the line sent. Rounds are
  also archived after ingest, so a second round cannot reuse the first's files.
- *Identical strings scored as disagreement.* "(measure word for books)" vs
  itself: normalising strips parentheticals and stopwords, both sides came out
  empty, and empty scored 0. Whole strings are compared first now. A tiny
  dialect table (mum/mom, film/movie) went in with them; genuine synonyms
  ("pretty"/"beautiful") deliberately did not — those are for an adjudicator.
- *Batch prefixes collided.* Batch `hsk1` claimed `hsk1.words.01.*`.
- *Sentence-level overrides* would have fixed one sentence and left the word
  wrong everywhere else; they were rewritten as word overrides (看看, 下面, 椅子上).
- Python heredocs on this machine read source in the system code page, which
  silently broke every edit containing `è`. Use the edit tool for non-ASCII.

**Runtime:** `say(rng, kind)` returns an `Utterance` — a grunt string or a course
`Entry` — so all eighteen call sites were untouched. Each moment maps to course
tags; idle mostly reaches for `random`, the whole breadth of HSK 1. The bubble
draws 汉字 / pinyin / English, lays itself out once, and reports its own rect:
the old fixed 236×52 allowance would have smeared the lower two lines, in both
the creature's and the Matron's dirty rects. The Matron speaks the verified
line closest to each of her English ones, and English where there is none.

**`DESKMUDGIN_CONTACT=speech`** draws every verified line as a bubble, paged.
It caught the one rendering bug that mattered: at 10px in the monospace UI font
a caron rendered as a macron, so 我 read as `wō` — a wrong tone, on the line that
exists to teach tones. Pinyin is now 12px Segoe UI. The planned boot-time tofu
probe was not built: Chromium falls back per-glyph to any installed CJK face, so
a missing YaHei degrades rather than boxes; the sheet is the check instead.

## The rest of the Language Update

**Ledger vocabulary.** A `said` category files each course line the first time
a bubble shows it, with pinyin and English on hover — no count, as with traits.
Main re-reads heard lines' wording from the course at startup, because a line
corrected after being filed (p255 lost a wrong "Let's") would otherwise teach
the old gloss forever.

**Conversations.** 60 verified two-creature exchanges, each one corpus row with
turns joined by ｜ so it is verified as a unit. `turnsOf` splits one into
ordinary entries, so the bubble and the ledger needed no changes. The
`converse` behaviour keeps the one-brain rule: a speaker publishes
`pet.utterance` about itself; a listener's own brain reads it through
`ctx.near` and chooses to answer. Nobody tells anybody what to say. Verified
live: 我想吃东西。→ 这儿有苹果。→ 谢谢！ passed between a Mudgin and a Sephin,
each on its own cue.

**Names.** 118 verified, per species. `PetSave.zh` holds 汉字/pinyin/gloss;
`name` stays as the identity underneath. Duplicates are composed as 豆豆二号,
"Beanie No. 2", from verified parts. Three things found on the way:
- *Every name would have vanished within 20 seconds.* `mergeColony` replaced
  each pet wholesale with what a window sent, and windows never see `zh`. It now
  lays the window's fields over main's record, which protects any future
  main-owned field too.
- *The visible pets got the numbered names.* Naming ran in file order, where the
  resting pets come first; everyone on the desktop was 红豆四号. Now: out first,
  then longest-kept.
- *蛋蛋 ("Egg")* is child-speak for testicles. The reviewer renamed it 小蛋; a
  second judge heard the same slang in that, so it was dropped. A contested name
  is not worth keeping.

**Reviewer disagreements** are now a recurring fact, not an accident. One
exchange reviewer rejected compounds of HSK 1 words (吃饭, 好吃, 明天见) that the
phrase reviewers had accepted, and another said 这儿 is off the list where the
wordlist reviewer said it is on. The course rule is written down here so it
stays one rule: **compounds built from HSK 1 words are accepted.** Where
reviewers genuinely disagree about naturalness, the line is dropped rather than
a side picked.

## Reading time, and the dictionary

Two sliders: ordinary bubbles and conversations, separately. `speechSeconds` is
the single rule for how long a bubble stays; a conversation paces itself by
`talkSeconds` and hands the bubble an exact duration, so its partner waits
precisely as long as the line is on screen and the everyday slider does not
stretch conversations twice. The panel kit gained a slider that previews while
dragged and saves once on release.

The dictionary reads the ledger: a phrase is seen once a bubble showed it, a
conversation once every turn has, a word once it appeared inside anything said.
Unseen entries stay readable — it is a reference first. Its first draft marked
seen and unseen with a filled dot and a hollow ring, and in the Windows 95 theme
both came out navy at 4px: every entry looked seen. It is a tick or nothing now.
The words course (`zh-hsk1-words`) is built for the first time for it; until now
the wordlist only ever validated phrases.

## Source control

There was none until 2026-09-24: the whole project was a directory. It is now
[github.com/gorepaw/deskmudgin](https://github.com/gorepaw/deskmudgin), public.
`.gitattributes` forces LF — the content pipeline writes LF TSVs on purpose and
Windows' CRLF conversion would show every row as changed.

## HSK 2, and bubbles in the theme

**Themed bubbles.** Panels and bubbles now draw through one module,
`ui/chrome.ts` (body, edge, sheen, band, glass), each call taking a `trace` that
lays the outline — a rounded rect for a panel, a box with its tail folded in for
a bubble. The border runs round the tail instead of across its base. A
one-character grunt is given a minimum width, or its tail had no flat edge to
hang from between two rounded corners.

**Levels.** `shared/lang/levels.ts` is the one list of levels; lines, the
dictionary, the ledger's re-reading and the speech sheet all walk it. Settings
stores `level`; at HSK 2 a creature reaches for HSK 2 seven times in ten and
HSK 1 otherwise (`FOCUS` in lines.ts), falling back to whichever level has a
line for the moment. A level appears in Settings once it has verified sentences.

**Tooling** went level-aware without touching HSK 1 (every HSK 1 course rebuilt
byte-identical apart from the override count in its header): the level comes
from the file name, vocabulary is cumulative, ids are prefixed per level
(`h2w`, `h2p`, `h2x` — they are the ledger's keys), and two new refusals — an
HSK 2 wordlist entry already taught in HSK 1, and an HSK 2 sentence that uses
no HSK 2 word (`早点儿` uses the character of 早上, not the word).

**Content:** 150 words, 449 of 449 sentences, 58 of 60 conversations, 18 new
pinyin overrides. What the loop caught:
- a dozen neutral tones (晚上, 眼睛, 意思, 妻子 *qī zǐ* was the wrong syllable
  outright), erhua split into two syllables (点儿 *diǎn ér*), and 外面/里面/上边
  toned where the course already has 下面/后面 neutral;
- 一个公司 → 一家公司, and a gloss that added a word the Chinese lacked.
- The reviewers filed their pinyin fixes as whole-sentence overrides — the same
  mistake HSK 1 made. They were rejected and refiled as words, which then
  corrected a sentence nobody had flagged. Two needed a longer entry because
  the deriver segments them first: 有点儿 is one word to it, and the existing
  桌子上 (neutral locative) was matching inside 桌子上边.
- The first-round reviewers passed nearly everything. Reading the conversations
  myself dropped two they passed: 我可以介绍一下吗？｜可以，请介绍！, which no
  one says, and weather called 漂亮, a calque of "beautiful".

**Looking at renders.** A full-screen `DESKMUDGIN_CONTACT` window was left on
the user's desktop when a session ended, and they had to reboot to get rid of
it. `npm run snap` now renders any sheet offscreen and exits by itself; see
*Verification tooling*. `DESKMUDGIN_CONTACT=themes` is the sheet for bubbles
across every theme.

## Premium themes: frames

A theme used to be a palette plus a few switches. A **frame** (`ui/frames.ts`)
is the layer for looks that need more than colour: it owns the edge, and
optionally a surface texture, corner ornaments, the panel title, the close
control and its mark on the Settings swatch. Panels and bubbles draw through
`chrome.ts`, which asks the current theme's frame, so a frame dresses both at
once. Plain themes use the plain frame, which is the old keyline-and-accent
edge moved as-is.

Two numbers every frame declares: `inset` (how far inside a panel its border is
traced, so a thick stroke lands on the panel instead of half off it) and `reach`
(how far a border traced on a bubble's outline extends past it, which the
bubble's dirty rect must allow). Ornaments stay inside the shape for the same
reason — a panel repaints only its own rectangle, and the first draft's corner
fleurons hung 2px past it, which would have smeared on every drag.

**Illuminated** is the first: vellum with foxed edges, a gilded double rule
(one banded-gradient stroke split by a line of vellum, so it follows any trace
including a bubble's tail), gilt fleurons with vermilion hearts at the corners,
a rubricated initial on every title, and a wax-seal close button. Palatino
Linotype for type. The Painter gained gradient fills and strokes for it.

Five more followed, one file each under `ui/frames/` (`kit.ts` holds the
interface and helpers, `index.ts` the registry):
- **Stained glass**: dark glass lit from above, a border of jewel panes cut by
  lead, amber roundels, a ruby to close.
- **Brass & rivets**: walnut grain, a banded brass moulding with a raised bead,
  rivets every ~70px, an engraved nameplate title, a gear to close.
- **Bog shrine**: mottled stone, moss and drips along the top, an inner glow in
  `PAL.eye` that breathes, and the eye itself to close (its pupil is the ✕).
- **Holographic**: a conic foil border turning once per ~30s, red/blue fringes,
  a drifting sheen, crop-mark corners.
- **Ink wash**: rice-paper fibres, washed hills at the foot of panels, a brush
  border built from four offset dashed passes (overlap makes the weight vary;
  no two gaps coincide so it never breaks), and a red seal cut with 泥 "mud".
  That seal is the one piece of Chinese in the app that did not go through the
  verification loop — it is decoration, one character, and flagged here for
  the human pass.

Irregular detail is seeded from the shape's size (`seeded()` in kit.ts), so it
holds still frame to frame. Motion reads `clock()`; panels are in the dirty
list every frame anyway, so animation costs nothing extra. Settings' height
now follows the swatch rows (17 themes, three rows).

Found on the way: the first stained-glass and brass palettes made an
unchecked radio's ring invisible (`edge` too close to `fill`); and a shell
loop that wrote `"$SP\$t.png"` escaped the variable and saved every render
to one file literally named `proof$t.png`.

`DESKMUDGIN_CONTACT=chrome` with `theme=<id>` draws the real Settings and
Dictionary panels (on a stub host) and bubbles in one theme — render it with
`npm run snap -- chrome out.png 1520 860 theme=manuscript`.

## Spanish glosses

Settings → *they speak* → **meaning**: English, Español, or Both. It changes the
meaning line under the Chinese — bubbles, the dictionary, the ledger footer and
pet names — and nothing else; the interface stays English.

**Shape.** A Spanish gloss is a claim of its own, so it lives in its own file
beside each course (`hsk1.es.tsv`: id, the line's script/reading/English as
context, `gloss`, status, checks) and a verified Chinese row is never touched
by adding one. `gloss-sync` lays the file out from the verified course and
sends a gloss back to draft if its line changes; `gloss-fill` takes plain
`id<TAB>spanish` drafts and only ever fills drafts; export/ingest recognise a
`.es.tsv` by name and check `gloss` instead of `english` (blind key: Chinese →
Spanish; accent-folding, Spanish stopwords); the build joins verified glosses
by id and ships `spanish` on each entry. `Entry.spanish` is optional and read
only through `glossesOf`, which falls back to English — an unverified gloss
shows English, never a blank line. Neutral Latin American Spanish throughout.

**Content:** all 1,289 lines (words, sentences, conversations, names) verified
by the same two keys, `claude-*` provenance as ever. Four rounds.

**What the checks caught:** 明天 and 上午 both glossed *mañana*; 字 as *palabra*
(that is 词); *amo* for things (*me encanta*); *súper* for 非常; *yuanes es*;
and in the names, the most important: *Concha/Conchín* (vulgar in the Río de la
Plata), *Almejita* (vulgar in the Caribbean — the replacement for the
replacement), *Barrito* (a pimple), *Platita* (money), *Negrito* (a racial
reading), and three exact duplicates between creatures. The reviewers then
cycled 滴滴 between *Gotín* and alternatives for three rounds; it was ended
by adjudication, on the course rule that reviewers are not asked forever.

**Tooling found wanting, and fixed:**
- `writeTsv` wrote a fixed column list — it would have silently dropped the
  `gloss` column of every file it rewrote. It now writes the columns the file
  was read with.
- Ingest applied a reviewer's one-turn fix to a two-turn conversation. The
  build refused it, but ingest now refuses it first and keeps the old gloss.
- A blind reply came back numbered (`1<TAB>…`) and crashed the writer with a
  message about a field; ingest now names the chunk and line instead.
- Nothing stopped two creatures sharing a Spanish name. The build now refuses
  a duplicate name gloss.

## What is not built

Nothing from either plan. Deferred: breeding, Sephin maturity, Spanish, HSK 3
and above, and interactive exercises built on the course.

From the Collection Update, nothing. Ideas that were explicitly deferred:

- **Breeding.** The user ruled it out for now ("not feeding, care, friendship,
  nor even breeding (yet)").
- **Sephin maturity.** No ageing was specified for them; `ageOf` already returns
  1 for anything that does not age, so adding it is a species-side change.
- The care system stays behaviour fuel rather than an obligation: nothing nags,
  starves or dies, and that is deliberate.
