These are **Spanish translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is single **words** from the HSK Chinese vocabulary list. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Spanish. It is shown two ways: to someone learning Spanish, as the line to learn, and to someone who reads Spanish, as the meaning of a line in another language — so it must be both correct and natural.

The Spanish should be neutral Latin American Spanish: `tú` for "you", `ustedes` for the plural, no `vosotros`, no regionalisms, with correct accents and ¿¡ punctuation.

For every row, check:
1. Does the Spanish mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Spanish, the way a native speaker would actually put it?
3. For a word: verbs as infinitives, "(partícula …)" for particles.

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
h3w243	需要	to need	necesitar
h3w244	选择	to choose	elegir
h3w245	要求	to demand; requirement	exigir; requisito
h3w246	爷爷	grandfather (father's father)	abuelo (padre del padre)
h3w247	一定	certainly	sin duda
h3w248	一共	altogether	en total
h3w249	一会儿	a moment	un momento
h3w250	一样	the same	igual
h3w251	一直	always; all along	siempre; todo el tiempo
h3w252	以前	before; previously	antes; anteriormente
h3w253	一般	generally	en general
h3w254	音乐	music	música
h3w255	银行	bank	banco
h3w256	饮料	drink; beverage	bebida
h3w257	应该	should	deber
h3w258	影响	to influence; influence	influir; influencia
h3w259	用	to use	usar
h3w260	游戏	game	juego
h3w261	有名	famous	famoso
h3w262	又	again	otra vez
h3w263	遇到	to meet; to run into	encontrar; toparse con
h3w264	愿意	to be willing	estar dispuesto
h3w265	月亮	moon	luna
h3w266	越	the more…	cuanto más…
h3w267	站	station; to stand	estación; estar de pie
h3w268	张	(measure word for flat things)	(clasificador para cosas planas)
h3w269	着急	anxious	ansioso
h3w270	照顾	to take care of	cuidar
h3w271	照片	photo	foto
h3w272	照相机	camera	cámara
h3w273	只	(measure word for animals)	(clasificador para animales)
h3w274	只有	only; only if	solo; solo si
h3w275	中间	middle	medio
h3w276	中文	the Chinese language	idioma chino
h3w277	终于	finally	por fin
h3w278	种	kind; type	tipo; clase
h3w279	重	heavy	pesado
h3w280	重要	important	importante
h3w281	周末	weekend	fin de semana
h3w282	主要	main	principal
h3w283	注意	to pay attention to	prestar atención a
h3w284	自己	oneself	uno mismo
h3w285	自行车	bicycle	bicicleta
h3w286	总是	always	siempre
h3w287	最后	finally; last	por último; último
h3w288	最近	recently	recientemente
h3w289	作业	homework	tarea
h3w290	遍	(measure word for times)	(clasificador para veces)
h3w291	对面	opposite	enfrente
h3w292	礼物	gift	regalo
h3w293	历史	history	historia
h3w294	附近	nearby	cercano
h3w295	骑	to ride (a bike or horse)	montar (una bicicleta o un caballo)
h3w296	果汁	fruit juice	jugo de frutas
h3w297	一边	at the same time; on one side	al mismo tiempo; por un lado
h3w298	嘴	mouth	boca
h3w299	起来	(direction: up); to begin to	(dirección: hacia arriba); empezar a
h3w300	难	difficult	difícil
```
