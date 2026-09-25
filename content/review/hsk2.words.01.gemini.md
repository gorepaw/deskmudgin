These are drafted entries for the **HSK 2 (2.0) vocabulary list** — the words HSK 2 adds on top of the levels below it, not the cumulative list.

For every row, check:
1. Is the Chinese actually on the official HSK 2 list? (A word that belongs to a lower level is wrong here — say which level in `note` and `drop` it.)
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
h2w001	吧	ba	(suggestion particle) let's…; …right?
h2w002	白	bái	white
h2w003	百	bǎi	hundred
h2w004	帮助	bāng zhù	to help
h2w005	报纸	bào zhǐ	newspaper
h2w006	比	bǐ	than; compared with
h2w007	别	bié	don't
h2w008	宾馆	bīn guǎn	hotel
h2w009	长	cháng	long
h2w010	唱歌	chàng gē	to sing
h2w011	出	chū	to go out; to come out
h2w012	穿	chuān	to wear; to put on
h2w013	次	cì	(measure word for times)
h2w014	从	cóng	from
h2w015	错	cuò	wrong
h2w016	打篮球	dǎ lán qiú	to play basketball
h2w017	大家	dà jiā	everyone
h2w018	到	dào	to arrive; to
h2w019	得	dé	(structural particle after a verb)
h2w020	等	děng	to wait
h2w021	弟弟	dì di	younger brother
h2w022	第一	dì yī	first
h2w023	懂	dǒng	to understand
h2w024	对	duì	correct; towards
h2w025	房间	fáng jiān	room
h2w026	非常	fēi cháng	very; extremely
h2w027	服务员	fú wù yuán	waiter; attendant
h2w028	高	gāo	tall; high
h2w029	告诉	gào sù	to tell
h2w030	哥哥	gē ge	older brother
h2w031	给	gěi	to give; for
h2w032	公共汽车	gōng gòng qì chē	bus
h2w033	公司	gōng sī	company
h2w034	贵	guì	expensive
h2w035	过	guò	(particle for past experience)
h2w036	还	hái	still; also
h2w037	孩子	hái zi	child
h2w038	好吃	hǎo chī	tasty
h2w039	黑	hēi	black
h2w040	红	hóng	red
h2w041	欢迎	huān yíng	welcome
h2w042	回答	huí dá	to answer
h2w043	机场	jī chǎng	airport
h2w044	鸡蛋	jī dàn	egg
h2w045	件	jiàn	(measure word for clothes and matters)
h2w046	教室	jiào shì	classroom
h2w047	姐姐	jiě jie	older sister
h2w048	介绍	jiè shào	to introduce
h2w049	进	jìn	to enter
h2w050	近	jìn	near
h2w051	就	jiù	just; right away
h2w052	觉得	jué de	to feel; to think
h2w053	咖啡	kā fēi	coffee
h2w054	开始	kāi shǐ	to begin
h2w055	考试	kǎo shì	exam
h2w056	可能	kě néng	maybe; possible
h2w057	可以	kě yǐ	can; may
h2w058	课	kè	class; lesson
h2w059	快	kuài	fast
h2w060	快乐	kuài lè	happy
h2w061	累	lèi	tired
h2w062	离	lí	away from
h2w063	两	liǎng	two (of something)
h2w064	零	líng	zero
h2w065	路	lù	road
h2w066	旅游	lǚ yóu	to travel
h2w067	卖	mài	to sell
h2w068	慢	màn	slow
h2w069	忙	máng	busy
h2w070	每	měi	every
h2w071	妹妹	mèi mei	younger sister
h2w072	门	mén	door
h2w073	面条	miàn tiáo	noodles
h2w074	男	nán	male
h2w075	您	nín	you (polite)
```

## One extra question

After the TSV block, list any HSK 2 words that are **missing** from this batch, and any listed here that are **not** HSK 2. Put that after the TSV, under a heading `## Missing`.
