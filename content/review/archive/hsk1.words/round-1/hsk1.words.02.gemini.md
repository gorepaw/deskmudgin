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
w051	看见	kàn jiàn	to see
w052	块	kuài	(measure word for money)
w053	来	lái	to come
w054	老师	lǎo shī	teacher
w055	了	liǎo	(aspect particle)
w056	冷	lěng	cold
w057	里	lǐ	inside
w058	六	liù	six
w059	妈妈	mā ma	mum
w060	吗	ma	(question particle)
w061	买	mǎi	to buy
w062	猫	māo	cat
w063	没关系	méi guān xì	it doesn't matter
w064	没有	méi yǒu	to not have
w065	米饭	mǐ fàn	cooked rice
w066	名字	míng zì	name
w067	明天	míng tiān	tomorrow
w068	哪	nǎ	which
w069	哪儿	nǎ ér	where
w070	那	nà	that
w071	呢	ne	(question particle)
w072	能	néng	to be able to
w073	你	nǐ	you
w074	年	nián	year
w075	女儿	nǚ ér	daughter
w076	朋友	péng yǒu	friend
w077	漂亮	piào liang	pretty
w078	苹果	píng guǒ	apple
w079	七	qī	seven
w080	前面	qián miàn	in front
w081	钱	qián	money
w082	请	qǐng	please
w083	去	qù	to go
w084	热	rè	hot
w085	人	rén	person
w086	认识	rèn shi	to know (someone)
w087	三	sān	three
w088	商店	shāng diàn	shop
w089	上	shàng	up; on
w090	上午	shàng wǔ	morning
w091	少	shǎo	few; little
w092	谁	shuí	who
w093	什么	shén me	what
w094	十	shí	ten
w095	时候	shí hòu	time; moment
w096	是	shì	to be
w097	书	shū	book
w098	水	shuǐ	water
w099	水果	shuǐ guǒ	fruit
w100	睡觉	shuì jiào	to sleep
```

## One extra question

After the TSV block, list any HSK 1 words that are **missing** from this batch, and any listed here that are **not** HSK 1. Put that after the TSV, under a heading `## Missing`.
