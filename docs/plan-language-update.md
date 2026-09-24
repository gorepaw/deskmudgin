# DeskMudgin — Language Update (Chinese)

## Context

The Collection Update is finished and documented (see DEVLOG.md). The next thing
DeskMudgin should do is **teach Chinese**: pets speak in 汉字 + tone-marked pinyin
+ English, they hold exchanges with each other in it, and eventually they all
carry Chinese names.

The binding constraint is not the code, it is **trust**. Neither of us should be
generating Chinese that ships on my say-so. So this plan is mostly a *content
pipeline* designed around manual verification outside VS Code (Gemini + Google
Translate), and only secondarily a set of features. Three rules drive every
decision below:

1. **I never author a tone mark.** Pinyin is derived mechanically from the hanzi.
2. **Unverified content structurally cannot reach the app** — not by discipline,
   by build boundary.
3. **The return trip is as mechanical as the outbound one.** A verification loop
   that requires retyping will not survive 300 rows.

Confirmed decisions: mechanical pinyin; whole HSK 1; Chinese names **replace**
English ones; pets speak Chinese **always** by default. Architecture must stay
modular for HSK 2 and, long-horizon, **Spanish** — so nothing here is allowed to
be Chinese-specific where it could be language-shaped instead.

---

## Architecture: courses, not "Chinese"

The unit is a **course** — `(language, level, entries)`. `zh/hsk1` today,
`zh/hsk2` and `es/a1` later, with no code change to add them.

**One row model, language-agnostic:**

| column | who writes it | notes |
| --- | --- | --- |
| `id` | tool | stable forever; the join key for every round trip |
| `script` | me | the written form — 汉字, or Spanish text |
| `reading` | **tool** | pronunciation aid — pinyin for zh, empty for es |
| `english` | me | gloss |
| `tags` | me | `idle`, `hungry`, `greet`, `random`… which moments it suits |
| `status` | tool | `draft` → `conflict` → `verified` / `rejected` |
| `checks` | tool | which sources signed off: `gt`, `gemini`, `human` |
| `note` | either | why it was rejected, or what Gemini said |

`reading` being a *generated column* is the whole point of decision 1. Spanish
simply leaves it empty; the row model does not change.

**TSV, not JSON.** The format is chosen for the human step: TSV pastes cleanly
into Google Sheets and Gemini, diffs readably in git, and survives hand-editing.

**Language adapters** isolate everything that is actually Chinese:
- `tools/lang/zh.mjs` — derives pinyin (`pinyin-pro`, **devDependency only** —
  the app ships static strings), rejects traditional-only characters, validates
  rows against the HSK 1 wordlist.
- `src/shared/lang/zh.ts` — runtime descriptor: label, font stack, whether there
  is a reading line, how the three lines lay out.

Adding Spanish is a new adapter plus a new corpus. Nothing else moves.

---

## Phase 0 — The pipeline (no visible change)

**The wordlist is content too.** I should not pull the HSK 1 list out of thin air
any more than the phrases. `content/zh/hsk1.words.tsv` is the *first* artifact
through the loop — verified once against a public list, then used to validate
every phrase row thereafter.

> **HSK 1 has two definitions:** HSK 2.0 (150 words) and HSK 3.0/2021 (500).
> Starting with the 150, because 3.0's level 1 is essentially a superset —
> extending later is a corpus append, not a code change.

Five commands:

- **`npm run zh:draft`** — I author `script` + `english`; the tool assigns ids,
  derives `reading`, and validates (simplified-only, in-wordlist, no duplicates).
- **`npm run lang:export`** — writes two files to `content/review/`:
  - `<batch>.gt.txt` — numbered hanzi, one per line. Paste into Google Translate
    zh→en. A cheap bulk screen that catches gross errors fast.
  - `<batch>.gemini.md` — a ready prompt asking *specific answerable questions*
    (does the hanzi mean the English; is the pinyin right; is it natural for a
    beginner; is it simplified; would a person actually say it) and demanding a
    **TSV reply in a fixed shape**. Not "is this right?"
- **You do the outside work**, saving the two replies back into `content/review/`.
- **`npm run lang:ingest`** — reads both. Compares Google Translate's
  back-translation against my English (normalised, with a similarity score),
  reads Gemini's verdict, and applies a **two-key rule**: a row reaches
  `verified` only when *both* independent sources agree. Any disagreement
  becomes `status: conflict` with both opinions recorded in the row for you to
  settle. Prints a summary.
- **`npm run lang:build`** — compiles **verified rows only** into
  `src/shared/lang/generated/zh-hsk1.ts`. The app imports nothing else, so draft
  content cannot ship. Refuses to emit if any row's `reading` disagrees with what
  the deriver produces from its `script` — catching a hand-edit that desynced them.

**Prove the loop on ~30 rows before I generate 300.** You run the full round trip
once and tell me whether it is tolerable; format problems found at 30 rows are
cheap, and found at 300 they cost you an evening of re-verification.

*Files:* `content/zh/`, `tools/lang/`, `tools/zh-draft.mjs`, `lang-export.mjs`,
`lang-ingest.mjs`, `lang-build.mjs`, `src/shared/lang/`.

## Phase 1 — They speak it

- **`ui/speech.ts` gains a three-line mode**: script large, reading small,
  English smallest. Bubble sizes to the widest line, keeps the existing
  edge-clamp and tail logic, and dwells longer — three lines need ~4s, not 2.
- **CJK font stack.** `Microsoft YaHei` and `SimSun` are both present on this
  machine and ship with Windows, so nothing is bundled. But a missing CJK font
  renders as silent tofu boxes, so a **one-time boot probe** measures a known
  glyph and warns rather than showing □□□ forever.
- **`pet/lines.ts`**: `say(rng, kind)` becomes a lexicon lookup by tag against
  the generated course. The eleven existing `LineKind`s map onto tags; `random`
  covers "not always acting like pets" — any HSK 1 row is fair game for idle.
- **Settings**: `language` (`en` | `zh`, default `zh`) and `speech` frequency,
  both in the existing Settings panel next to the theme swatches.
- **The ledger gains a vocabulary section.** `shared/ledger.ts` is already a set
  with no denominator, no total and no percentage — exactly right for words
  you have been exposed to. This reuses `record()` and the existing category
  machinery rather than adding a second store.

*Files:* `src/renderer/ui/speech.ts`, `src/renderer/pet/lines.ts`,
`src/shared/ledger.ts`, `src/renderer/ui/menu.ts`, `src/shared/types.ts`.

## Phase 2 — They talk to each other

- Corpus gains **exchanges**: ordered 2–4 turn dialogues, through the same
  verification pipeline (an exchange verifies as a unit — a correct line in a
  nonsense conversation is still wrong).
- New **`converse` behaviour**, and it must not break the one-brain-per-creature
  rule the brain is built on. It does not: the speaker publishes *its own* state
  (`pet.utterance = { exchangeId, turn, toward }`), and the listener's own
  `converse` scores high when it **reads** a neighbour addressing it. Reading is
  allowed; writing to another pet is not.
- Partner lookup uses `ctx.near(x, radius)` — the index built last session, whose
  whole design was that a rule asks about a *place*. Conversation range is one
  more radius named at its call site.

*Files:* `src/renderer/pet/behaviors/converse.ts`, `behaviors/index.ts`,
`src/renderer/pet/pet.ts`.

## Phase 3 — Chinese names

- `content/zh/names.tsv`, same pipeline **plus an extra check** — names are the
  highest-embarrassment content in the project (unintended meaning, wrong
  register, names that read as a foreigner's guess), so the Gemini prompt for
  this batch asks explicitly about connotation and whether it reads as a real
  name.
- `PetSave` gains `zh: { script, reading, gloss }`. `name` is **retained in the
  save** as the stable key for logs and history but no longer displayed — you get
  the replacement you asked for, with a safety net that keeps 167 pets' records
  intact and the change reversible.
- Migration assigns names to all existing pets **deterministically from pet id**,
  so a re-run is stable and two runs cannot disagree.
- `shared/names.ts` `pickName()` becomes language-aware; the English lists stay
  as the `en` course.

*Files:* `src/shared/names.ts`, `src/shared/types.ts`, `src/main/store.ts`,
`src/renderer/ui/petcard.ts`, `manager.ts`, `starter.ts`.

---

## Verification

**Phase 0 is verified by you, not by me** — that is its purpose. The tooling is
checked by:

- `npm run lang:build` on a corpus with deliberately broken rows: a desynced
  `reading`, a traditional character, a word outside the wordlist, a duplicate
  id, an unverified row. Each must be refused with a message naming the row.
- A round-trip test: export → hand-edit a reply to disagree → ingest → confirm
  the row lands in `conflict` and **not** in the generated file.
- `git diff` on `src/shared/lang/generated/` must be empty after a no-op rebuild.

Then, in the real app:

- `DESKMUDGIN_DEBUG=1` — the `[brain]` line already prints what each creature is
  doing; the speech text goes alongside it, so exchanges can be read from the log
  instead of chased around the desktop.
- `DESKMUDGIN_PANEL=ledger` to check the vocabulary section without clicking.
- A contact-sheet mode for bubbles (`DESKMUDGIN_CONTACT=speech`) rendering many
  three-line bubbles at once — the same instrument that caught the invisible
  maturity wash, pointed at line breaking, tofu glyphs and overflow.
- `npm run typecheck && npm run build`, and the existing `tools/wild-cycle.mjs`
  and `tools/neighbors-check.mjs` still passing.

## Open, deliberately

- **HSK 3.0 vs 2.0** — starting at 150 words; extending to 500 is a corpus append.
- **Spanish** — the row model, adapters and course structure are built for it now;
  no Spanish content until Chinese is proven end to end.
- **Interactive elements** (quizzes, recall prompts) — the lexicon is deliberately
  not welded to speech bubbles, so these become new readers of the same course.
