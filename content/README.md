# Content, and why none of it is trusted

Everything the creatures say in a language other than English lives here, and
**none of it reaches the app on anyone's say-so.** A row is drafted, sent out to
be checked by two independent sources, and only ships when both agree.

This is not process for its own sake. Chinese written by someone who does not
read Chinese is confidently wrong in ways that are invisible from inside the
repo — a tone mark that changes the word, a phrase that parses but no person
would say, a name that means something unfortunate. The pipeline exists so that
being wrong is caught by something that actually knows, before it is taught to
anyone.

## The three rules

1. **Nobody types a tone mark.** `reading` is derived from `script`
   mechanically (`pinyin-pro`), never authored. That removes the entire class of
   tone errors before verification starts, so what you check is only *"does the
   Chinese mean the English"*.
2. **Unverified content cannot ship.** The app imports only
   `src/shared/lang/generated/`, and `lang:build` writes verified rows there and
   nothing else. It is a build boundary, not a habit.
3. **Two keys.** A row is `verified` only when Google Translate's blind
   back-translation *and* Gemini's judgement both agree. One source is an
   opinion.

## The files

| | |
| --- | --- |
| `zh/hsk1.words.tsv` | the course vocabulary — every phrase is validated against it |
| `zh/hsk1.tsv` | the phrase corpus |
| `zh/overrides.tsv` | pinyin corrections, where the deriver is wrong |
| `zh/*.es.tsv`, `zh/*.ar.tsv` | each course in Spanish and in Arabic, one file per course (see *Other languages*) |
| `review/` | what goes out and what comes back — the audit trail |

Statuses: `draft` → `verified` / `rejected`, or `conflict` when the two sources
disagree and it needs you.

## The loop

```
npm run zh:draft    content/zh/hsk1.words.tsv
npm run lang:export content/zh/hsk1.words.tsv -- --kind words
        ...you do the checking...
npm run lang:ingest content/zh/hsk1.words.tsv
npm run lang:build  content/zh/hsk1.words.tsv -- --course zh-hsk1-words --kind words
```

**The checking step** is two pastes per chunk, and nothing to name or create —
`lang:export` writes the two answer files for you, empty, with their instructions
inside them on `#` lines that are stripped on the way back in. Open them and
paste:

1. Copy `review/<batch>.NN.gt.txt` into **Google Translate** (Chinese → English).
   Paste the English into `review/<batch>.NN.gt.out.txt` — *one line per entry,
   same order, nothing added*. Line position is the join, so a line count that
   does not match is refused rather than guessed at.
2. Paste the whole of `review/<batch>.NN.gemini.md` into **Gemini**. It already
   contains the questions and demands a TSV reply. Paste the answer into
   `review/<batch>.NN.gemini.out.tsv` — prose around the TSV block is ignored,
   so the whole reply is fine.

An untouched template reads as *not filled in yet*, never as an empty reply, so
you can ingest at any point and it will only act on the chunks you have done.

Then `lang:ingest` reconciles the two and tells you what it could not settle.

## Fixing things

- **Gemini proposes a better translation** → ingest applies it and marks the row
  `conflict`, because a fix has only one source behind it. Export again; it gets
  a fresh pair of checks.
- **Gemini says the pinyin is wrong** → it is *not* written into the row. It is
  filed as a draft in `zh/overrides.tsv`, because a wrong reading is a claim
  about the deriver, not about that one phrase. Verify the override and every
  phrase using that word is corrected at once.
- **You disagree with both** → `node tools/lang-settle.mjs <corpus> <id> --by
  human` (add `--reject` to drop it). It is your call to make; the tools only
  refuse to make it *for* you, and the row records that it was yours.
- **Never edit `reading` directly.** `lang:build` refuses a reading that does not
  derive from its script, which is how a hand-edit that drifted gets caught.

## Who verified what

The current content was verified by **Claude, not by a person**. The two keys
were turned by separate agents standing in for the outside tools: a blind
back-translator that saw only the hanzi (for Google Translate) and a reviewer
answering the same prompt (for Gemini). That is `lang:ingest ... --by claude`.
Anything neither could settle was ruled on and recorded as `claude-adjudicated`.

Every row says so in its `checks` column — `claude-blind`, `claude-review`,
`claude-adjudicated` — and never `gt` or `gemini`. That is so a manual pass can
find exactly these rows later:

```
grep claude content/zh/hsk1.tsv
node tools/lang-settle.mjs content/zh/hsk1.tsv p012 p013 --by human
node tools/lang-settle.mjs content/zh/hsk1.tsv p040 --reject --by human --note "unnatural"
```

`lang-settle` appends to `checks` rather than replacing it, so a row confirmed
by hand still records that two agents saw it first. Each finished round's
replies are archived under `review/archive/<batch>/round-N/`, which is the
record of who said what.

## Checking the pipeline itself

```
npm run lang:selftest
```

Runs the whole loop on a scratch corpus with defects planted in the replies —
one source agreeing alone, a fabricated tone correction, a dropped row, a
missing verdict, a short Google Translate paste, a desynced reading. All of those
failure modes are silent in real use, so they are made loud here. It restores
anything it touched.


It also runs the Arabic deriver against `tools/lang/ar.cases.json` — vowelled
lines and the romanization a learner should see — and checks that unvowelled
Arabic, a missing dagger alif and a Persian letter are all refused.

## Other languages

The courses were written in Chinese, against HSK wordlists, with English
checked alongside. Every other language is a **translation of the course**:
a file beside each course (`hsk1.es.tsv`, `hsk1.ar.tsv`) holding that
language's version of every line, verified on its own. A line verified in
Chinese says nothing about a translation of it.

In the app, any language a line has can be the one being learned (L2, shown
on top with its reading) or the one it is explained in (L1, the meaning
underneath). Settings → *they speak*: **learn**, **meaning**, and **also** for
a second meaning. So the Arabic here is read both ways: by someone learning
Arabic, as the lesson, and by an Arabic speaker learning Chinese, as the
meaning.

```
node tools/gloss-sync.mjs content/zh/hsk1.tsv --lang ar                 # lay out hsk1.ar.tsv
node tools/gloss-fill.mjs content/zh/hsk1.ar.tsv drafts.tsv --check     # validate drafts, write nothing
node tools/gloss-fill.mjs content/zh/hsk1.ar.tsv drafts.tsv             # drafts: id<TAB>text
npm run lang:export content/zh/hsk1.ar.tsv
npm run lang:ingest content/zh/hsk1.ar.tsv
npm run lang:build-all                                                   # every course, translations joined by id
```

- Each translation file carries copies of the line's Chinese and English. If
  the line is corrected later, `gloss-sync` sends the translation back to
  `draft`, and the build will not ship one checked against a different
  sentence.
- The blind key runs whichever way suits the language
  (`tools/lang/languages.mjs`): Chinese → Spanish, compared with the Spanish;
  Arabic → English, compared with the verified English. The reviewer judges
  the translation against the Chinese either way.
- Anything not verified falls back to English in the app, line by line, so a
  half-finished language never leaves a blank. A language cannot be chosen as
  the one to *learn* until it has a verified level.
- The HSK wordlists are Chinese vocabulary, so their translations are only
  ever meanings: the dictionary's Words tab appears only while learning
  Chinese. Outside Chinese the levels are called "Level 1", "Level 2" — they
  are HSK's sentences, not that language's syllabus.

### Spanish

Neutral Latin American: *tú*, *ustedes*, no *vosotros*. No reading line.

### Arabic

**Modern Standard Arabic, fully vowelled.** Its reading line is a
romanization, and the rule that nobody types a tone mark carries over as
nobody types a romanization: `tools/lang/ar.mjs` reads it off the vowel marks,
into `gloss_reading`, and the build refuses a row where the two differ. That
moves what has to be checked from the Latin to the vowelling — which is where
the mistakes would really be — and it is why the vowelling must be complete:
`gloss-fill`, `ingest` and the build all refuse a letter left bare.

- Every word carries its case ending, the last word too, as a textbook prints
  it. The romanization says what is *spoken*, so the deriver applies the pause
  itself — الْبَيْتِ. reads "al-bayt" — rather than trusting anyone to.
- الْ before a moon letter; ال plus shadda before a sun letter (الشَّمْس →
  ash-shams). هٰذَا, ذٰلِكَ, لٰكِنْ with the dagger alif. Arabic punctuation.
- A creature speaks of itself in the masculine; "you" is أَنْتَ.
- As a meaning for an Arabic reader, the vowel marks are stripped, the way
  Arabic is printed for adults.

## Adding a language

1. `src/shared/lang/index.ts` — a descriptor: its name, a font stack if the
   theme fonts cannot draw it, a size scale, its direction, reading pace.
2. `tools/lang/languages.mjs` — which way its blind check runs, its style
   rules for the prompts, and a reading deriver and validator if its script
   needs them (as `ar.mjs` does for Arabic).
3. `gloss-sync` each course with `--lang <id>`, and put the files through the
   loop.

Nothing that draws text changes: the bubble, the dictionary, the ledger and
the pet cards all ask for "the lesson" and "the meaning" and are handed
whatever languages the learner chose.
