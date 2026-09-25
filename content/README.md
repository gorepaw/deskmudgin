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
| `zh/*.es.tsv` | Spanish glosses, one file per course (see *Glosses*) |
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

## Glosses in other languages

A learner can read the meaning in Spanish instead of English, or both
(Settings → *they speak* → **meaning**). A Spanish gloss is a claim of its own
— the Chinese being verified says nothing about a translation of it — so it
has its own file beside each course and goes through the same loop:

```
node tools/gloss-sync.mjs content/zh/hsk1.tsv --lang es     # lay out hsk1.es.tsv
node tools/gloss-fill.mjs content/zh/hsk1.es.tsv drafts.tsv  # drafts: id<TAB>spanish
npm run lang:export content/zh/hsk1.es.tsv                   # Chinese → Spanish blind, plus a review
npm run lang:ingest content/zh/hsk1.es.tsv
npm run lang:build  content/zh/hsk1.tsv -- --course zh-hsk1   # joins verified Spanish by id
```

- The gloss file carries copies of each line's Chinese and English. If the
  line is corrected later, `gloss-sync` sends its Spanish back to `draft`, and
  the build will not ship a gloss checked against a different sentence.
- The blind key translates the **Chinese** into Spanish; the reviewer judges
  the Spanish against the Chinese, with the English only as a hint of intent.
- Neutral Latin American Spanish: *tú*, *ustedes*, no *vosotros*.
- Anything not verified shows as English in the app, so a half-finished
  language never leaves a blank line.

## Adding a language

The row model is language-shaped, not Chinese-shaped: `script` / `reading` /
`english`, where `reading` is simply empty for a language that does not need one.
Adding Spanish is a `tools/lang/es.mjs` adapter and a corpus under `content/es/`.
Nothing in the runtime knows which language it is drawing beyond a font and
whether there is a middle line.
