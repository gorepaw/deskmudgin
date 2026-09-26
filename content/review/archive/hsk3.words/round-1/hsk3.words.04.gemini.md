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
h3w181	秋	qiū	autumn
h3w182	裙子	qún zǐ	skirt
h3w183	然后	rán hòu	then; afterwards
h3w184	热情	rè qíng	warm; enthusiastic
h3w185	认为	rèn wéi	to think; to consider
h3w186	认真	rèn zhēn	serious; conscientious
h3w187	容易	róng yì	easy
h3w188	如果	rú guǒ	if
h3w189	伞	sǎn	umbrella
h3w190	上网	shàng wǎng	to go online
h3w191	生气	shēng qì	to be angry
h3w192	声音	shēng yīn	sound; voice
h3w193	世界	shì jiè	world
h3w194	试	shì	to try
h3w195	瘦	shòu	thin
h3w196	叔叔	shū shu	uncle
h3w197	舒服	shū fú	comfortable
h3w198	树	shù	tree
h3w199	数学	shù xué	maths
h3w200	刷牙	shuā yá	to brush one's teeth
h3w201	双	shuāng	pair
h3w202	水平	shuǐ píng	level; standard
h3w203	司机	sī jī	driver
h3w204	太阳	tài yáng	sun
h3w205	特别	tè bié	special; especially
h3w206	疼	téng	to hurt; painful
h3w207	提高	tí gāo	to improve
h3w208	体育	tǐ yù	sports; physical education
h3w209	甜	tián	sweet
h3w210	条	tiáo	(measure word for long things)
h3w211	同事	tóng shì	colleague
h3w212	同意	tóng yì	to agree
h3w213	头发	tóu fa	hair
h3w214	突然	tū rán	suddenly
h3w215	图书馆	tú shū guǎn	library
h3w216	腿	tuǐ	leg
h3w217	完成	wán chéng	to complete
h3w218	碗	wǎn	bowl
h3w219	万	wàn	ten thousand
h3w220	忘记	wàng jì	to forget
h3w221	为	wèi	for; to
h3w222	为了	wèi le	in order to
h3w223	位	wèi	(polite measure word for people)
h3w224	文化	wén huà	culture
h3w225	西	xī	west
h3w226	习惯	xí guàn	habit; to be used to
h3w227	洗手间	xǐ shǒu jiān	restroom
h3w228	洗澡	xǐ zǎo	to take a bath or shower
h3w229	夏	xià	summer
h3w230	先	xiān	first
h3w231	相信	xiāng xìn	to believe
h3w232	香蕉	xiāng jiāo	banana
h3w233	向	xiàng	towards
h3w234	像	xiàng	to resemble; like
h3w235	小心	xiǎo xīn	careful
h3w236	校长	xiào zhǎng	principal
h3w237	新闻	xīn wén	news
h3w238	新鲜	xīn xiān	fresh
h3w239	信	xìn	letter
h3w240	信用卡	xìn yòng kǎ	credit card
```

## One extra question

After the TSV block, list any HSK 3 words that are **missing** from this batch, and any listed here that are **not** HSK 3. Put that after the TSV, under a heading `## Missing`.
