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
h3w121	结婚	jié hūn	to get married
h3w122	结束	jié shù	to end
h3w123	解决	jiě jué	to solve
h3w124	借	jiè	to borrow; to lend
h3w125	经常	jīng cháng	often
h3w126	经过	jīng guo	to pass through
h3w127	经理	jīng lǐ	manager
h3w128	久	jiǔ	for a long time
h3w129	旧	jiù	old (of things)
h3w130	句子	jù zi	sentence
h3w131	决定	jué dìng	to decide
h3w132	可爱	kě ài	lovely
h3w133	渴	kě	thirsty
h3w134	刻	kè	quarter of an hour
h3w135	客人	kè rén	guest
h3w136	空调	kōng tiáo	air conditioning
h3w137	口	kǒu	mouth; (measure word for family members)
h3w138	哭	kū	to cry
h3w139	裤子	kù zǐ	trousers
h3w140	筷子	kuài zi	chopsticks
h3w141	蓝	lán	blue
h3w142	老	lǎo	old
h3w143	离开	lí kāi	to leave
h3w144	力气	lì qi	strength
h3w145	厉害	lì hài	formidable; impressive
h3w146	例如	lì rú	for example
h3w147	脸	liǎn	face
h3w148	练习	liàn xí	to practise
h3w149	辆	liàng	(measure word for vehicles)
h3w150	了解	le jiě	to understand
h3w151	邻居	lín jū	neighbour
h3w152	另外	lìng wài	in addition
h3w153	留	liú	to stay; to keep
h3w154	楼	lóu	building; floor
h3w155	绿	lǜ	green
h3w156	马上	mǎ shàng	immediately
h3w157	满意	mǎn yì	satisfied
h3w158	帽子	mào zi	hat
h3w159	米	mǐ	metre; rice
h3w160	面包	miàn bāo	bread
h3w161	明白	míng bái	to understand
h3w162	拿	ná	to take; to hold
h3w163	奶奶	nǎi nai	grandmother (father's mother)
h3w164	南	nán	south
h3w165	难过	nán guo	sad
h3w166	年级	nián jí	school year; grade
h3w167	年轻	nián qīng	young
h3w168	鸟	niǎo	bird
h3w169	努力	nǔ lì	hard-working; to strive
h3w170	爬山	pá shān	to climb a mountain
h3w171	盘子	pán zi	plate
h3w172	胖	pàng	fat; plump
h3w173	皮鞋	pí xié	leather shoes
h3w174	啤酒	pí jiǔ	beer
h3w175	瓶子	píng zi	bottle
h3w176	其实	qí shí	in fact
h3w177	其他	qí tā	other
h3w178	起飞	qǐ fēi	to take off
h3w179	清楚	qīng chǔ	clear
h3w180	请假	qǐng jià	to ask for leave
```

## One extra question

After the TSV block, list any HSK 3 words that are **missing** from this batch, and any listed here that are **not** HSK 3. Put that after the TSV, under a heading `## Missing`.
