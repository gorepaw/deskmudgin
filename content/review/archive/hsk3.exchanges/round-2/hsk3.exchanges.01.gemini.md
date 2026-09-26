These are drafted **short conversations** for a beginner Chinese learning app, held between two small cartoon creatures on the user's desktop. Each row is one whole exchange; turns are separated by ｜ in the Chinese and by " | " in the pinyin and English, and the speakers alternate (turn 1 is creature A, turn 2 is creature B, and so on). Only **HSK 1–3 vocabulary** (the levels are cumulative) may be used.

For every row, check the exchange **as a whole**:
1. Does each turn mean its English, turn for turn?
2. Is each reply a natural answer to what was just said — would two native speakers actually have this exchange? A correct sentence that does not answer the previous turn makes the row wrong.
3. Is the pinyin correct, **including tone marks and neutral tones**? (Generated mechanically — treat it as a claim. Syllable-by-syllable spacing is the house style; do not fix spacing.)
4. Is it within HSK 3 vocabulary (counting every level below), and Simplified?

If you fix a row, give the **whole** corrected exchange in each fix column you use, keeping the ｜ and " | " separators and the same number of turns in every column.

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_script	fix_reading	fix_english	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the `fix_` column(s) empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	reading	english
h3x027	你怎么感冒了？｜昨天很冷，我忘了多穿衣服。	Nǐ zěn me gǎn mào le? | Zuó tiān hěn lěng, wǒ wàng le duō chuān yī fu.	Why did you catch a cold? | It was cold yesterday and I forgot to wear more clothes.
h3x055	你怎么了？｜我的腿走不动了。	Nǐ zěn me le? | Wǒ de tuǐ zǒu bú dòng le.	What's wrong? | My legs can't walk any more.
h3x058	我突然想起一件事。｜什么事？｜今天是妹妹的生日！	Wǒ tū rán xiǎng qǐ yí jiàn shì. | Shén me shì? | Jīn tiān shì mèi mei de shēng rì!	I suddenly remembered something. | What is it? | Today is my little sister's birthday!
```
