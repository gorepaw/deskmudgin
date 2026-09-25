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
n061	小泡	Little Bubble	Burbujín
n062	圆圆	Roundy	Redondito
n063	团团	Roly	Bolita
n064	珍珠	Pearl	Perlita
n065	珠珠	Beady	Cuentita
n066	贝贝	Shelly	Conchita
n067	小贝	Little Shell	Conchín
n068	浪浪	Wavy	Olitas
n069	小浪	Little Wave	Ondita
n070	海海	Sea	Marito
n071	小海	Little Sea	Marcito
n072	水水	Watery	Aguita
n073	滴滴	Droplet	Goterita
n074	露露	Dewy	Rocío
n075	月月	Moony	Lunita
n076	小月	Little Moon	Lunín
n077	星星	Starry	Estrellita
n078	小星	Little Star	Estrellín
n079	汤圆	Sweet Dumpling	Bolita Dulce
n080	雪球	Snowball	Bola de Nieve
n081	冰冰	Icy	Heladito
n082	小冰	Little Ice	Hielito
n083	云朵	Cloud	Nubecita
n084	朵朵	Fluffy	Esponjita
n085	银银	Silvery	Platita
n086	小银	Little Silver	Platín
n087	潮潮	Tidey	Costerita
n088	泡芙	Cream Puff	Cremosito
n089	布丁	Pudding	Pudincito
n090	果冻	Jelly	Gelatinita
n091	糖糖	Sugar	Azucarita
n092	甜甜	Sweetie	Dulcecito
n093	奶糖	Toffee	Caramelito
n094	棉花	Cotton	Algodoncito
n095	丸子	Meatball	Albondiguita
n096	球球	Ballie	Pelotita
n098	滚滚	Rolly	Ruedita
n099	嘟嘟	Pouty	Mofletito
n100	乐乐	Cheery	Alegrito
n101	笑笑	Smiley	Sonrisita
n102	静静	Quiet	Calladito
n103	安安	Peaceful	Tranquilito
n104	宝宝	Baby	Bebito
n105	贝壳	Seashell	Conchuela
n106	海星	Starfish	Estrellamar
n107	海螺	Conch	Caracolita
n108	浪花	Sea Spray	Espumita
n109	水母	Jellyfish	Medusita
n110	小鲸	Little Whale	Ballenita
n111	鲸鲸	Whaley	Ballenín
n112	企鹅	Penguin	Pingüinito
n113	豆腐	Tofu	Tofito
n114	年糕	Rice Cake	Pastelito de Arroz
n115	元宵	Lantern Dumpling	Farolito
n116	米米	Rice Grain	Arrocito
n117	月饼	Mooncake	Pastelito de Luna
n118	小雨	Drizzle	Lluvita
n119	雨滴	Raindrop	Gotita
```
