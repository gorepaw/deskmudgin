These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use **only HSK 1 vocabulary**.

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 1 vocabulary?
5. Is it Simplified, not Traditional?

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
p048	我今天做了很多工作。	Wǒ jīn tiān zuò le hěn duō gōng zuò.	I worked a lot today.
p105	我想看看你。	Wǒ xiǎng kàn kan nǐ.	I want to see you.
p228	我不会写这个字。	Wǒ bú huì xiě zhè ge zì.	I can't write this character.
p229	你会做饭吗？	Nǐ huì zuò fàn ma?	Can you cook?
p230	请打开电脑。	Qǐng dǎ kāi diàn nǎo.	Please turn on the computer.
```
