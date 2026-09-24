These are drafted entries for the **HSK 1 (2.0) vocabulary list** — the classic 150-word list.

For every row, check:
1. Is the Chinese actually on the official HSK 1 list?
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
w028	饭店	fàn diàn	restaurant; hotel
w151	这儿	zhèr	here
w152	那儿	nàr	there
```

## One extra question

After the TSV block, list any HSK 1 words that are **missing** from this batch, and any listed here that are **not** HSK 1. Put that after the TSV, under a heading `## Missing`.
