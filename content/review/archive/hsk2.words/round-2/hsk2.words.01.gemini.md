These are drafted entries for the **HSK 2 (2.0) vocabulary list** — the words HSK 2 adds on top of the levels below it, not the cumulative list.

For every row, check:
1. Is the Chinese actually on the official HSK 2 list? (A word that belongs to a lower level is wrong here — say which level in `note` and `drop` it.)
2. Does the English gloss match the word?
3. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically, so treat it as a claim to check, not as given. Pay attention to neutral-tone second syllables such as 谢谢 and to 一/不 tone sandhi.)
4. Is it Simplified, not Traditional?

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_script	fix_reading	fix_english	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the three `fix_` columns empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	reading	english
h2w019	得	de	(structural particle after a verb)
h2w029	告诉	gào su	to tell
h2w035	过	guo	(particle for past experience)
h2w082	妻子	qī zi	wife
h2w095	事情	shì qing	matter; thing
h2w108	晚上	wǎn shang	evening
h2w123	眼睛	yǎn jing	eye
h2w131	意思	yì si	meaning
h2w135	右边	yòu bian	right side
h2w140	早上	zǎo shang	morning
h2w150	左边	zuǒ bian	left side
```

## One extra question

After the TSV block, list any HSK 2 words that are **missing** from this batch, and any listed here that are **not** HSK 2. Put that after the TSV, under a heading `## Missing`.
