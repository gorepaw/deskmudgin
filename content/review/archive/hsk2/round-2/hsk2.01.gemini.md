These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use only **HSK 1–2 vocabulary** (the levels are cumulative).

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 2 vocabulary, counting every level below it?
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
h2p051	我今天想早点儿休息。	Wǒ jīn tiān xiǎng zǎo diǎnr xiū xi.	I want to rest early today.
h2p122	外面很冷，多穿点儿衣服。	Wài mian hěn lěng, duō chuān diǎnr yī fu.	It's cold outside, put on more clothes.
h2p192	我们快点儿走吧！	Wǒ men kuài diǎnr zǒu ba!	Let's hurry up and go!
h2p217	猫在门外面。	Māo zài mén wài mian.	The cat is outside the door.
h2p231	虽然外面很冷，但是我想出去玩。	Suī rán wài mian hěn lěng, dàn shì wǒ xiǎng chū qù wán.	Although it's cold outside, I want to go out and play.
h2p245	我来介绍一下。	Wǒ lái jiè shào yí xià.	Let me make the introductions.
h2p267	你在外面吗？	Nǐ zài wài mian ma?	Are you outside?
h2p268	外面有人。	Wài mian yǒu rén.	There's someone outside.
h2p333	狗在外面跑。	Gǒu zài wài mian pǎo.	The dog is running around outside.
h2p339	让我想想。	Ràng wǒ xiǎng xiang.	Let me think.
h2p357	西瓜里面是红的。	Xī guā lǐ mian shì hóng de.	Watermelon is red inside.
h2p374	我觉得有点儿冷。	Wǒ jué de yǒu diǎnr lěng.	I feel a little cold.
h2p406	我们去外面吃饭吧。	Wǒ men qù wài mian chī fàn ba.	Let's eat out.
```
