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
h3w062	锻炼	to exercise	hacer ejercicio
h3w063	多么	how (in exclamations)	qué (en exclamaciones)
h3w064	饿	hungry	hambriento
h3w065	而	and yet; but	y sin embargo; pero
h3w066	耳朵	ear	oreja
h3w067	发	to send	enviar
h3w068	发烧	to have a fever	tener fiebre
h3w069	发现	to discover	descubrir
h3w070	方便	convenient	conveniente
h3w071	放	to put	poner
h3w072	放心	to rest assured	estar tranquilo
h3w073	分	to divide; minute	dividir; minuto
h3w074	复习	to review	repasar
h3w075	干净	clean	limpio
h3w076	感冒	a cold; to catch a cold	resfriado; resfriarse
h3w077	感兴趣	to be interested	estar interesado
h3w078	刚才	just now	hace un momento
h3w079	根据	according to	según
h3w080	跟	with; to follow	con; seguir
h3w081	更	even more	aún más
h3w082	公园	park	parque
h3w083	故事	story	cuento
h3w084	刮风	to be windy	hacer viento
h3w085	关	to close; to turn off	cerrar; apagar
h3w086	关系	relationship	relación
h3w087	关心	to care about	preocuparse por
h3w088	关于	about	sobre
h3w089	国家	country	país
h3w090	过去	the past; to go over	el pasado; pasar por
h3w091	还是	or; still	o; todavía
h3w092	害怕	to be afraid	tener miedo
h3w093	黑板	blackboard	pizarra
h3w094	后来	afterwards	después
h3w095	护照	passport	pasaporte
h3w096	花	flower; to spend	flor; gastar
h3w097	画	to draw; painting	dibujar; dibujo
h3w098	坏	bad; broken	malo; descompuesto
h3w099	环境	environment	medio ambiente
h3w100	换	to change	cambiar
h3w101	黄河	the Yellow River	el río Amarillo
h3w102	会议	meeting	reunión
h3w103	或者	or	o
h3w104	几乎	almost	casi
h3w105	机会	opportunity	oportunidad
h3w106	极	extremely	sumamente
h3w107	记得	to remember	recordar
h3w108	季节	season	estación del año
h3w109	检查	to check	revisar
h3w110	简单	simple	sencillo
h3w111	健康	healthy	sano
h3w112	见面	to meet	encontrarse
h3w113	讲	to speak; to tell	hablar; contar
h3w114	教	to teach	enseñar
h3w115	角	corner; (a tenth of a yuan)	esquina; (una décima de yuan)
h3w116	脚	foot	pie
h3w117	接	to receive; to pick up	recibir; recoger
h3w118	街道	street	calle
h3w119	节目	programme	programa
h3w120	节日	festival	fiesta
h3w121	结婚	to get married	casarse
```
