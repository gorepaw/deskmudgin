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
h2w076	牛奶	niú nǎi	milk
h2w077	女	nǚ	female
h2w078	旁边	páng biān	beside
h2w079	跑步	pǎo bù	to run; to jog
h2w080	便宜	pián yi	cheap
h2w081	票	piào	ticket
h2w082	妻子	qī zǐ	wife
h2w083	起床	qǐ chuáng	to get up
h2w084	千	qiān	thousand
h2w085	铅笔	qiān bǐ	pencil
h2w086	晴	qíng	sunny
h2w087	去年	qù nián	last year
h2w088	让	ràng	to let; to make (someone do)
h2w089	日	rì	day; date
h2w090	上班	shàng bān	to go to work
h2w091	身体	shēn tǐ	body; health
h2w092	生病	shēng bìng	to get sick
h2w093	生日	shēng rì	birthday
h2w094	时间	shí jiān	time
h2w095	事情	shì qíng	matter; thing
h2w096	手表	shǒu biǎo	wristwatch
h2w097	手机	shǒu jī	mobile phone
h2w098	说话	shuō huà	to speak; to talk
h2w099	送	sòng	to give (as a gift); to see off
h2w100	虽然…但是	suī rán … dàn shì	although… (but)
h2w101	它	tā	it
h2w102	踢足球	tī zú qiú	to play football
h2w103	题	tí	question (on a test)
h2w104	跳舞	tiào wǔ	to dance
h2w105	外	wài	outside
h2w106	完	wán	to finish
h2w107	玩	wán	to play
h2w108	晚上	wǎn shàng	evening
h2w109	往	wǎng	towards
h2w110	为什么	wèi shén me	why
h2w111	问	wèn	to ask
h2w112	问题	wèn tí	question; problem
h2w113	西瓜	xī guā	watermelon
h2w114	希望	xī wàng	to hope
h2w115	洗	xǐ	to wash
h2w116	小时	xiǎo shí	hour
h2w117	笑	xiào	to laugh; to smile
h2w118	新	xīn	new
h2w119	姓	xìng	surname; to be surnamed
h2w120	休息	xiū xi	to rest
h2w121	雪	xuě	snow
h2w122	颜色	yán sè	colour
h2w123	眼睛	yǎn jīng	eye
h2w124	羊肉	yáng ròu	mutton; lamb
h2w125	药	yào	medicine
h2w126	要	yào	to want; will
h2w127	也	yě	also; too
h2w128	一起	yì qǐ	together
h2w129	一下	yí xià	(a quick) once; a bit
h2w130	已经	yǐ jīng	already
h2w131	意思	yì sī	meaning
h2w132	因为…所以	yīn wèi … suǒ yǐ	because… (so)
h2w133	阴	yīn	cloudy; overcast
h2w134	游泳	yóu yǒng	to swim
h2w135	右边	yòu biān	right side
h2w136	鱼	yú	fish
h2w137	远	yuǎn	far
h2w138	运动	yùn dòng	sport; to exercise
h2w139	再	zài	again
h2w140	早上	zǎo shàng	morning
h2w141	丈夫	zhàng fu	husband
h2w142	找	zhǎo	to look for
h2w143	着	zhe	(particle for a continuing state)
h2w144	真	zhēn	really; truly
h2w145	正在	zhèng zài	in the middle of (doing)
h2w146	知道	zhī dào	to know
h2w147	准备	zhǔn bèi	to prepare
h2w148	走	zǒu	to walk; to leave
h2w149	最	zuì	most
h2w150	左边	zuǒ biān	left side
```

## One extra question

After the TSV block, list any HSK 2 words that are **missing** from this batch, and any listed here that are **not** HSK 2. Put that after the TSV, under a heading `## Missing`.
