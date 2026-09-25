These are **Spanish translations** of Chinese lines from a beginner Chinese learning app (small cartoon creatures on a desktop say them). The Chinese has already been verified and is not under review. What is under review is the `gloss` column: the Spanish meaning shown under the Chinese to a learner who reads Spanish. An English gloss is included only so you can see the intended sense.

The Spanish should be neutral Latin American Spanish: `tú` for "you", `ustedes` for the plural, no `vosotros`, no regionalisms. Lines of a conversation are separated by " | " and must keep the same number of parts as the Chinese (separated by ｜).

For every row, check:
1. Does the Spanish mean what the **Chinese** says — not a translation of the English, which can be looser?
2. Is it natural Spanish, the way a native speaker would actually put it, with correct accents and ¿¡ punctuation?
3. For a single word, is it the dictionary sense a learner needs (verbs as infinitives, "(partícula …)" for particles)?
4. For a creature's name, does the Spanish say what the name means, the way a nickname is glossed ("Frijolito"), rather than transliterating it?

If it needs changing, give the whole corrected Spanish in `fix_gloss`.

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_gloss	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the `fix_` column(s) empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	english	gloss
n001	泥泥	Muddy	Lodito
n002	小泥	Little Mud	Lodín
n003	泥球	Mudball	Bola de Lodo
n004	泥巴	Mud	Barrito
n005	土豆	Potato	Papita
n006	豆豆	Beanie	Frijolito
n007	小豆	Little Bean	Frijolín
n008	包子	Bun	Panecito
n009	馒头	Steamed Bun	Bollito
n010	石头	Rocky	Piedrita
n011	小石	Pebble	Piedrín
n012	墩墩	Chunky	Rechonchito
n013	胖胖	Chubby	Gordito
n014	呱呱	Croaky	Croaquito
n015	团子	Dumpling Ball	Bolita de Masa
n016	糯米	Sticky Rice	Pegajosito
n017	蘑菇	Mushroom	Hongito
n018	小菇	Little Mushroom	Setita
n019	木头	Woody	Maderita
n020	小树	Sapling	Arbolito
n021	苔苔	Mossy	Musguito
n022	青青	Greenie	Verdecito
n023	草草	Grassy	Pastito
n024	小草	Little Grass	Hierbita
n025	叶子	Leafy	Hojita
n026	芽芽	Sprout	Brotecito
n027	小芽	Little Sprout	Brotín
n028	花生	Peanut	Manicito
n029	核桃	Walnut	Nuecita
n030	栗子	Chestnut	Castañita
n031	红薯	Sweet Potato	Camotito
n032	山药	Yam	Ñamito
n033	芋头	Taro	Tarito
n034	芋圆	Taro Ball	Bolita de Taro
n035	饺子	Dumpling	Empanadita
n036	窝头	Cornbread	Panecito de Maíz
n037	煤球	Coal Ball	Carboncito
n038	黑豆	Black Bean	Frijolito Negro
n039	绿豆	Mung Bean	Frijolito Verde
n040	红豆	Red Bean	Frijolito Rojo
n041	毛豆	Edamame	Habita
n042	土土	Earthy	Tierrita
n043	小土	Little Dirt	Tierrín
n044	坑洼	Pothole	Bachecito
n045	疙瘩	Lumpy	Grumito
n046	憨憨	Dopey	Bobito
n047	笨笨	Silly	Tontito
n048	呆呆	Dozy	Sonsito
n049	懒懒	Lazy	Flojito
n050	咕咕	Gurgle	Gorgorito
n051	咚咚	Thump	Golpecito
n052	牛牛	Bull	Torito
n053	虎子	Tiger Cub	Tigrito
n054	铁蛋	Iron Egg	Huevito de Hierro
n055	石蛋	Stone Egg	Huevito de Piedra
n056	二狗	Doggo	Perrito
n057	大壮	Sturdy	Fortachón
n058	小黑	Shadow	Sombrita
n059	阿土	Dusty	Polvito
n060	泡泡	Bubbles	Burbujita
```
