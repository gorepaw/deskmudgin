These are drafted **names for cartoon creatures** in a learning app — small, ugly, endearing frog-like animals and round sea creatures. They are shown to a learner alongside an English gloss.

For every row, check:
1. Does the Chinese read as a plausible *name* for a small creature or pet — not as a literal noun awkwardly used as a name?
2. Is the English gloss accurate?
3. Is the pinyin correct, including tones?
4. **Connotation**: does it carry any unintended, crude, offensive, or unfortunate meaning? Does it sound like a real name, or like a foreigner guessing? Say so plainly — this is the most important question here.

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
n061	小泡	xiǎo pào	Little Bubble
n062	圆圆	yuán yuán	Roundy
n063	团团	tuán tuán	Roly
n064	珍珠	zhēn zhū	Pearl
n065	珠珠	zhū zhū	Beady
n066	贝贝	bèi bèi	Shelly
n067	小贝	xiǎo bèi	Little Shell
n068	浪浪	làng làng	Wavy
n069	小浪	xiǎo làng	Little Wave
n070	海海	hǎi hǎi	Sea
n071	小海	xiǎo hǎi	Little Sea
n072	水水	shuǐ shuǐ	Watery
n073	滴滴	dī dī	Droplet
n074	露露	lù lù	Dewy
n075	月月	yuè yuè	Moony
n076	小月	xiǎo yuè	Little Moon
n077	星星	xīng xīng	Starry
n078	小星	xiǎo xīng	Little Star
n079	汤圆	tāng yuán	Sweet Dumpling
n080	雪球	xuě qiú	Snowball
n081	冰冰	bīng bīng	Icy
n082	小冰	xiǎo bīng	Little Ice
n083	云朵	yún duǒ	Cloud
n084	朵朵	duǒ duǒ	Fluffy
n085	银银	yín yín	Silvery
n086	小银	xiǎo yín	Little Silver
n087	潮潮	cháo cháo	Tidey
n088	泡芙	pào fú	Cream Puff
n089	布丁	bù dīng	Pudding
n090	果冻	guǒ dòng	Jelly
n091	糖糖	táng táng	Sugar
n092	甜甜	tián tián	Sweetie
n093	奶糖	nǎi táng	Toffee
n094	棉花	mián huā	Cotton
n095	丸子	wán zi	Meatball
n096	球球	qiú qiú	Ballie
n097	蛋蛋	dàn dàn	Egg
n098	滚滚	gǔn gǔn	Rolly
n099	嘟嘟	dū dū	Pouty
n100	乐乐	lè lè	Cheery
n101	笑笑	xiào xiào	Smiley
n102	静静	jìng jìng	Quiet
n103	安安	ān ān	Peaceful
n104	宝宝	bǎo bao	Baby
n105	贝壳	bèi ké	Seashell
n106	海星	hǎi xīng	Starfish
n107	海螺	hǎi luó	Conch
n108	浪花	làng huā	Sea Spray
n109	水母	shuǐ mǔ	Jellyfish
n110	小鲸	xiǎo jīng	Little Whale
n111	鲸鲸	jīng jīng	Whaley
n112	企鹅	qǐ é	Penguin
n113	豆腐	dòu fu	Tofu
n114	年糕	nián gāo	Rice Cake
n115	元宵	yuán xiāo	Lantern Dumpling
n116	米米	mǐ mǐ	Rice Grain
n117	月饼	yuè bǐng	Mooncake
n118	小雨	xiǎo yǔ	Drizzle
n119	雨滴	yǔ dī	Raindrop
```
