These are drafted entries for the **HSK 3 (2.0) vocabulary list** — the words HSK 3 adds on top of the levels below it, not the cumulative list.

For every row, check:
1. Is the Chinese actually on the official HSK 3 list? (A word that belongs to a lower level is wrong here — say which level in `note` and `drop` it.)
2. Does the English gloss match the word?
3. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically, so treat it as a claim to check, not as given. Pay attention to neutral-tone second syllables such as 谢谢 and to 一/不 tone sandhi.)
4. Is it Simplified, not Traditional?

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
h3w241	行李箱	xíng li xiāng	suitcase
h3w242	熊猫	xióng māo	panda
h3w243	需要	xū yào	to need
h3w244	选择	xuǎn zé	to choose
h3w245	要求	yāo qiú	to demand; requirement
h3w246	爷爷	yé ye	grandfather (father's father)
h3w247	一定	yí dìng	certainly
h3w248	一共	yí gòng	altogether
h3w249	一会儿	yí huì er	a moment
h3w250	一样	yí yàng	the same
h3w251	一直	yì zhí	always; all along
h3w252	以前	yǐ qián	before; previously
h3w253	一般	yì bān	generally
h3w254	音乐	yīn yuè	music
h3w255	银行	yín háng	bank
h3w256	饮料	yǐn liào	drink; beverage
h3w257	应该	yīng gāi	should
h3w258	影响	yǐng xiǎng	to influence; influence
h3w259	用	yòng	to use
h3w260	游戏	yóu xì	game
h3w261	有名	yǒu míng	famous
h3w262	又	yòu	again
h3w263	遇到	yù dào	to meet; to run into
h3w264	愿意	yuàn yì	to be willing
h3w265	月亮	yuè liàng	moon
h3w266	越	yuè	the more…
h3w267	站	zhàn	station; to stand
h3w268	张	zhāng	(measure word for flat things)
h3w269	着急	zháo jí	anxious
h3w270	照顾	zhào gù	to take care of
h3w271	照片	zhào piàn	photo
h3w272	照相机	zhào xiàng jī	camera
h3w273	只	zhī	(measure word for animals)
h3w274	只有	zhǐ yǒu	only; only if
h3w275	中间	zhōng jiān	middle
h3w276	中文	zhōng wén	the Chinese language
h3w277	终于	zhōng yú	finally
h3w278	种	zhǒng	kind; type
h3w279	重	zhòng	heavy
h3w280	重要	zhòng yào	important
h3w281	周末	zhōu mò	weekend
h3w282	主要	zhǔ yào	main
h3w283	注意	zhù yì	to pay attention to
h3w284	自己	zì jǐ	oneself
h3w285	自行车	zì xíng chē	bicycle
h3w286	总是	zǒng shì	always
h3w287	最后	zuì hòu	finally; last
h3w288	最近	zuì jìn	recently
h3w289	作业	zuò yè	homework
h3w290	遍	biàn	(measure word for times)
h3w291	对面	duì miàn	opposite
```

## One extra question

After the TSV block, list any HSK 3 words that are **missing** from this batch, and any listed here that are **not** HSK 3. Put that after the TSV, under a heading `## Missing`.
