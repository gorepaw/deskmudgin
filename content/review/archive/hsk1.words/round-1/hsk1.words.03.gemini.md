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
w101	说	shuō	to speak
w102	四	sì	four
w103	岁	suì	years of age
w104	他	tā	he; him
w105	她	tā	she; her
w106	太	tài	too
w107	天气	tiān qì	weather
w108	听	tīng	to listen
w109	同学	tóng xué	classmate
w110	喂	wèi	hello (on the phone)
w111	我	wǒ	I; me
w112	我们	wǒ men	we; us
w113	五	wǔ	five
w114	喜欢	xǐ huan	to like
w115	下	xià	down; under
w116	下午	xià wǔ	afternoon
w117	下雨	xià yǔ	to rain
w118	先生	xiān shēng	mister
w119	现在	xiàn zài	now
w120	想	xiǎng	to want; to think
w121	小	xiǎo	small
w122	小姐	xiǎo jiě	miss
w123	些	xiē	some
w124	写	xiě	to write
w125	谢谢	xiè xiè	thanks
w126	星期	xīng qī	week
w127	学生	xué shēng	student
w128	学习	xué xí	to study
w129	学校	xué xiào	school
w130	一	yī	one
w131	一点儿	yì diǎn ér	a little
w132	衣服	yī fu	clothes
w133	医生	yī shēng	doctor
w134	医院	yī yuàn	hospital
w135	椅子	yǐ zi	chair
w136	有	yǒu	to have
w137	月	yuè	month
w138	在	zài	at; in
w139	再见	zài jiàn	goodbye
w140	怎么	zěn me	how
w141	怎么样	zěn me yàng	how about
w142	这	zhè	this
w143	中国	zhōng guó	China
w144	中午	zhōng wǔ	noon
w145	住	zhù	to live; to stay
w146	桌子	zhuō zi	table
w147	字	zì	character; word
w148	昨天	zuó tiān	yesterday
w149	坐	zuò	to sit
w150	做	zuò	to do; to make
```

## One extra question

After the TSV block, list any HSK 1 words that are **missing** from this batch, and any listed here that are **not** HSK 1. Put that after the TSV, under a heading `## Missing`.
