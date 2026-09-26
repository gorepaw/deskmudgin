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
h3w122	结束	to end	terminar
h3w123	解决	to solve	resolver
h3w124	借	to borrow; to lend	pedir prestado; prestar
h3w125	经常	often	a menudo
h3w126	经过	to pass through	pasar por
h3w127	经理	manager	gerente
h3w128	久	for a long time	mucho tiempo
h3w129	旧	old (of things)	viejo (de cosas)
h3w130	句子	sentence	oración
h3w131	决定	to decide	decidir
h3w132	可爱	lovely	adorable
h3w133	渴	thirsty	sediento
h3w134	刻	quarter of an hour	cuarto de hora
h3w135	客人	guest	invitado
h3w136	空调	air conditioning	aire acondicionado
h3w137	口	mouth; (measure word for family members)	boca; (clasificador para miembros de la familia)
h3w138	哭	to cry	llorar
h3w139	裤子	trousers	pantalones
h3w140	筷子	chopsticks	palillos
h3w141	蓝	blue	azul
h3w142	老	old	viejo
h3w143	离开	to leave	irse
h3w144	力气	strength	fuerza
h3w145	厉害	formidable; impressive	formidable; impresionante
h3w146	例如	for example	por ejemplo
h3w147	脸	face	cara
h3w148	练习	to practise	practicar
h3w149	辆	(measure word for vehicles)	(clasificador para vehículos)
h3w150	了解	to understand	comprender
h3w151	邻居	neighbour	vecino
h3w152	另外	in addition	además
h3w153	留	to stay; to keep	quedarse; guardar
h3w154	楼	building; floor	edificio; piso
h3w155	绿	green	verde
h3w156	马上	immediately	enseguida
h3w157	满意	satisfied	satisfecho
h3w158	帽子	hat	sombrero
h3w159	米	metre; rice	metro; arroz
h3w160	面包	bread	pan
h3w161	明白	to understand	entender
h3w162	拿	to take; to hold	tomar; sostener
h3w163	奶奶	grandmother (father's mother)	abuela (madre del padre)
h3w164	南	south	sur
h3w165	难过	sad	triste
h3w166	年级	school year; grade	grado escolar; curso
h3w167	年轻	young	joven
h3w168	鸟	bird	pájaro
h3w169	努力	hard-working; to strive	trabajador; esforzarse
h3w170	爬山	to climb a mountain	escalar montañas
h3w171	盘子	plate	plato
h3w172	胖	fat; plump	gordo; regordete
h3w173	皮鞋	leather shoes	zapatos de cuero
h3w174	啤酒	beer	cerveza
h3w175	瓶子	bottle	botella
h3w176	其实	in fact	en realidad
h3w177	其他	other	otro
h3w178	起飞	to take off	despegar
h3w179	清楚	clear	claro
h3w180	请假	to ask for leave	pedir permiso
h3w181	秋	autumn	otoño
```
