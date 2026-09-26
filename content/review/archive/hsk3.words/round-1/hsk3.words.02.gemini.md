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
h3w061	段	duàn	(measure word for sections)
h3w062	锻炼	duàn liàn	to exercise
h3w063	多么	duō me	how (in exclamations)
h3w064	饿	è	hungry
h3w065	而	ér	and yet; but
h3w066	耳朵	ěr duo	ear
h3w067	发	fā	to send
h3w068	发烧	fā shāo	to have a fever
h3w069	发现	fā xiàn	to discover
h3w070	方便	fāng biàn	convenient
h3w071	放	fàng	to put
h3w072	放心	fàng xīn	to rest assured
h3w073	分	fēn	to divide; minute
h3w074	复习	fù xí	to review
h3w075	干净	gān jìng	clean
h3w076	感冒	gǎn mào	a cold; to catch a cold
h3w077	感兴趣	gǎn xìng qù	to be interested
h3w078	刚才	gāng cái	just now
h3w079	根据	gēn jù	according to
h3w080	跟	gēn	with; to follow
h3w081	更	gèng	even more
h3w082	公园	gōng yuán	park
h3w083	故事	gù shì	story
h3w084	刮风	guā fēng	to be windy
h3w085	关	guān	to close; to turn off
h3w086	关系	guān xì	relationship
h3w087	关心	guān xīn	to care about
h3w088	关于	guān yú	about
h3w089	国家	guó jiā	country
h3w090	过去	guo qù	the past
h3w091	还是	hái shì	or; still
h3w092	害怕	hài pà	to be afraid
h3w093	黑板	hēi bǎn	blackboard
h3w094	后来	hòu lái	afterwards
h3w095	护照	hù zhào	passport
h3w096	花	huā	flower; to spend
h3w097	画	huà	to draw; painting
h3w098	坏	huài	bad; broken
h3w099	环境	huán jìng	environment
h3w100	换	huàn	to change
h3w101	黄河	huáng hé	the Yellow River
h3w102	会议	huì yì	meeting
h3w103	或者	huò zhě	or
h3w104	几乎	jī hū	almost
h3w105	机会	jī huì	opportunity
h3w106	极	jí	extremely
h3w107	记得	jì de	to remember
h3w108	季节	jì jié	season
h3w109	检查	jiǎn chá	to check
h3w110	简单	jiǎn dān	simple
h3w111	健康	jiàn kāng	healthy
h3w112	见面	jiàn miàn	to meet
h3w113	讲	jiǎng	to speak; to tell
h3w114	教	jiào	to teach
h3w115	角	jiǎo	corner; (a tenth of a yuan)
h3w116	脚	jiǎo	foot
h3w117	接	jiē	to receive; to pick up
h3w118	街道	jiē dào	street
h3w119	节目	jié mù	programme
h3w120	节日	jié rì	festival
```

## One extra question

After the TSV block, list any HSK 3 words that are **missing** from this batch, and any listed here that are **not** HSK 3. Put that after the TSV, under a heading `## Missing`.
