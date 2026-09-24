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
n001	泥泥	ní ní	Muddy
n002	小泥	xiǎo ní	Little Mud
n003	泥球	ní qiú	Mudball
n004	泥巴	ní bā	Mud
n005	土豆	tǔ dòu	Potato
n006	豆豆	dòu dòu	Beanie
n007	小豆	xiǎo dòu	Little Bean
n008	包子	bāo zǐ	Bun
n009	馒头	mán tou	Steamed Bun
n010	石头	shí tou	Rocky
n011	小石	xiǎo shí	Pebble
n012	墩墩	dūn dūn	Chunky
n013	胖胖	pàng pàng	Chubby
n014	呱呱	guā guā	Croaky
n015	团子	tuán zǐ	Dumpling Ball
n016	糯米	nuò mǐ	Sticky Rice
n017	蘑菇	mó gu	Mushroom
n018	小菇	xiǎo gū	Little Mushroom
n019	木头	mù tou	Woody
n020	小树	xiǎo shù	Sapling
n021	苔苔	tái tái	Mossy
n022	青青	qīng qīng	Greenie
n023	草草	cǎo cǎo	Grassy
n024	小草	xiǎo cǎo	Little Grass
n025	叶子	yè zi	Leafy
n026	芽芽	yá yá	Sprout
n027	小芽	xiǎo yá	Little Sprout
n028	花生	huā shēng	Peanut
n029	核桃	hé táo	Walnut
n030	栗子	lì zǐ	Chestnut
n031	红薯	hóng shǔ	Sweet Potato
n032	山药	shān yào	Yam
n033	芋头	yù tou	Taro
n034	芋圆	yù yuán	Taro Ball
n035	饺子	jiǎo zǐ	Dumpling
n036	窝头	wō tóu	Cornbread
n037	煤球	méi qiú	Coal Ball
n038	黑豆	hēi dòu	Black Bean
n039	绿豆	lǜ dòu	Mung Bean
n040	红豆	hóng dòu	Red Bean
n041	毛豆	máo dòu	Edamame
n042	土土	tǔ tǔ	Earthy
n043	小土	xiǎo tǔ	Little Dirt
n044	坑坑	kēng kēng	Pothole
n045	疙瘩	gē da	Lumpy
n046	憨憨	hān hān	Dopey
n047	笨笨	bèn bèn	Silly
n048	呆呆	dāi dāi	Dozy
n049	懒懒	lǎn lǎn	Lazy
n050	咕咕	gū gū	Gurgle
n051	咚咚	dōng dōng	Thump
n052	牛牛	niú niú	Bull
n053	虎子	hǔ zǐ	Tiger Cub
n054	铁蛋	tiě dàn	Iron Egg
n055	石蛋	shí dàn	Stone Egg
n056	二狗	èr gǒu	Doggo
n057	大壮	dà zhuàng	Big Sturdy
n058	小黑	xiǎo hēi	Blackie
n059	阿土	ā tǔ	Dusty
n060	泡泡	pào pào	Bubbles
```
