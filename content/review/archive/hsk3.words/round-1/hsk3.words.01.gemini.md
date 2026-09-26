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
h3w001	阿姨	ā yí	aunt
h3w002	啊	a	(particle of surprise or emphasis)
h3w003	矮	ǎi	short (of height)
h3w004	爱好	ài hào	hobby
h3w005	安静	ān jìng	quiet
h3w006	把	bǎ	(marks the object before the verb)
h3w007	班	bān	class
h3w008	搬	bān	to move (something heavy)
h3w009	半	bàn	half
h3w010	办法	bàn fǎ	way; method
h3w011	办公室	bàn gōng shì	office
h3w012	帮忙	bāng máng	to help
h3w013	包	bāo	bag
h3w014	饱	bǎo	full (after eating)
h3w015	北方	běi fāng	the north
h3w016	被	bèi	(passive marker) by
h3w017	鼻子	bí zi	nose
h3w018	比较	bǐ jiào	rather; relatively
h3w019	比赛	bǐ sài	match; competition
h3w020	笔记本	bǐ jì běn	notebook
h3w021	必须	bì xū	must
h3w022	变化	biàn huà	change
h3w023	别人	bié rén	other people
h3w024	冰箱	bīng xiāng	refrigerator
h3w025	不但…而且	bú dàn … ér qiě	not only… but also
h3w026	菜单	cài dān	menu
h3w027	才	cái	only then; not until
h3w028	参加	cān jiā	to take part in
h3w029	草	cǎo	grass
h3w030	层	céng	floor; layer
h3w031	差	chà	to be short of; poor
h3w032	超市	chāo shì	supermarket
h3w033	衬衫	chèn shān	shirt
h3w034	成绩	chéng jì	result; grade
h3w035	城市	chéng shì	city
h3w036	迟到	chí dào	to be late
h3w037	出现	chū xiàn	to appear
h3w038	除了	chú le	besides; except
h3w039	厨房	chú fáng	kitchen
h3w040	传真	chuán zhēn	fax
h3w041	春	chūn	spring
h3w042	词语	cí yǔ	word; phrase
h3w043	聪明	cōng ming	clever
h3w044	打扫	dǎ sǎo	to clean
h3w045	打算	dǎ suàn	to plan
h3w046	带	dài	to bring; to take
h3w047	担心	dān xīn	to worry
h3w048	蛋糕	dàn gāo	cake
h3w049	当然	dāng rán	of course
h3w050	地	dì	(adverbial particle)
h3w051	灯	dēng	lamp; light
h3w052	地方	dì fāng	place
h3w053	地铁	dì tiě	subway
h3w054	地图	dì tú	map
h3w055	电梯	diàn tī	elevator
h3w056	电子邮件	diàn zǐ yóu jiàn	email
h3w057	东	dōng	east
h3w058	冬	dōng	winter
h3w059	动物	dòng wù	animal
h3w060	短	duǎn	short (of length)
```

## One extra question

After the TSV block, list any HSK 3 words that are **missing** from this batch, and any listed here that are **not** HSK 3. Put that after the TSV, under a heading `## Missing`.
