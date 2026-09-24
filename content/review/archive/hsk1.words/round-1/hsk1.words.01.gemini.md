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
w001	爱	ài	love
w002	八	bā	eight
w003	爸爸	bà ba	dad
w004	杯子	bēi zi	cup
w005	北京	běi jīng	Beijing
w006	本	běn	(measure word for books)
w007	不客气	bú kè qì	you're welcome
w008	不	bù	not; no
w009	菜	cài	dish; vegetable
w010	茶	chá	tea
w011	吃	chī	to eat
w012	出租车	chū zū chē	taxi
w013	打电话	dǎ diàn huà	to make a phone call
w014	大	dà	big
w015	的	de	(possessive particle)
w016	点	diǎn	o'clock; a little
w017	电脑	diàn nǎo	computer
w018	电视	diàn shì	television
w019	电影	diàn yǐng	film
w020	东西	dōng xī	thing
w021	都	dōu	all; both
w022	读	dú	to read
w023	对不起	duì bù qǐ	sorry
w024	多	duō	many; much
w025	多少	duō shǎo	how many; how much
w026	儿子	ér zi	son
w027	二	èr	two
w028	饭馆	fàn guǎn	restaurant
w029	飞机	fēi jī	aeroplane
w030	分钟	fēn zhōng	minute
w031	高兴	gāo xìng	happy
w032	个	gè	(general measure word)
w033	工作	gōng zuò	work; to work
w034	狗	gǒu	dog
w035	汉语	hàn yǔ	Chinese language
w036	好	hǎo	good
w037	号	hào	number; day of the month
w038	喝	hē	to drink
w039	和	hé	and
w040	很	hěn	very
w041	后面	hòu miàn	behind
w042	回	huí	to return
w043	会	huì	can; to know how to
w044	几	jǐ	how many; several
w045	家	jiā	home; family
w046	叫	jiào	to be called
w047	今天	jīn tiān	today
w048	九	jiǔ	nine
w049	开	kāi	to open; to drive
w050	看	kàn	to look; to watch
```

## One extra question

After the TSV block, list any HSK 1 words that are **missing** from this batch, and any listed here that are **not** HSK 1. Put that after the TSV, under a heading `## Missing`.
