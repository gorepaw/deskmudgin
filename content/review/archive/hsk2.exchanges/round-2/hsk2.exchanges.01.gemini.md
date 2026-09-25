These are drafted **short conversations** for a beginner Chinese learning app, held between two small cartoon creatures on the user's desktop. Each row is one whole exchange; turns are separated by ｜ in the Chinese and by " | " in the pinyin and English, and the speakers alternate (turn 1 is creature A, turn 2 is creature B, and so on). Only **HSK 1–2 vocabulary** (the levels are cumulative) may be used.

For every row, check the exchange **as a whole**:
1. Does each turn mean its English, turn for turn?
2. Is each reply a natural answer to what was just said — would two native speakers actually have this exchange? A correct sentence that does not answer the previous turn makes the row wrong.
3. Is the pinyin correct, **including tone marks and neutral tones**? (Generated mechanically — treat it as a claim. Syllable-by-syllable spacing is the house style; do not fix spacing.)
4. Is it within HSK 2 vocabulary (counting every level below), and Simplified?

If you fix a row, give the **whole** corrected exchange in each fix column you use, keeping the ｜ and " | " separators and the same number of turns in every column.

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
h2x012	这个面条好吃吗？｜非常好吃！你也吃一点儿吧。	Zhè ge miàn tiáo hǎo chī ma? | Fēi cháng hǎo chī! Nǐ yě chī yì diǎnr ba.	Are these noodles tasty? | Very tasty! You have some too.
h2x021	你吃过羊肉吗？｜吃过，很好吃，但是有点儿贵。	Nǐ chī guo yáng ròu ma? | Chī guo, hěn hǎo chī, dàn shì yǒu diǎnr guì.	Have you had mutton before? | Yes, it's tasty, but a bit expensive.
h2x026	外面在下雪！｜真的吗？我们出去玩吧！	Wài mian zài xià xuě! | Zhēn de ma? Wǒ men chū qù wán ba!	It's snowing outside! | Really? Let's go out and play!
h2x030	今天天气真好！｜是的，我们一起去外面玩吧。	Jīn tiān tiān qì zhēn hǎo! | Shì de, wǒ men yì qǐ qù wài mian wán ba.	The weather's really nice today! | Yeah, let's go outside and play together.
h2x037	你姐姐做什么工作？｜她在一家公司上班。	Nǐ jiě jie zuò shén me gōng zuò? | Tā zài yì jiā gōng sī shàng bān.	What does your older sister do for work? | She works at a company.
h2x040	明天有考试吗？｜有，是汉语考试，我有点儿忙。	Míng tiān yǒu kǎo shì ma? | Yǒu, shì hàn yǔ kǎo shì, wǒ yǒu diǎnr máng.	Is there an exam tomorrow? | Yes, a Chinese exam, I'm a bit busy.
h2x043	你的手机在哪儿？｜在桌子上边。	Nǐ de shǒu jī zài nǎr? | Zài zhuō zi shàng bian.	Where's your phone? | It's on the table.
```
