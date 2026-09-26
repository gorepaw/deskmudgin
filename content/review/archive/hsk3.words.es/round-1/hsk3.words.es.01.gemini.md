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
h3w001	阿姨	aunt	tía (hermana de un progenitor); señora
h3w002	啊	(particle of surprise or emphasis)	(partícula de sorpresa o énfasis)
h3w003	矮	short (of height)	bajo (de estatura)
h3w004	爱好	hobby	pasatiempo
h3w005	安静	quiet	tranquilo
h3w006	把	(marks the object before the verb)	(marca el objeto antes del verbo)
h3w007	班	class	clase
h3w008	搬	to move (something heavy)	mover (algo pesado)
h3w009	半	half	mitad
h3w010	办法	way; method	manera; método
h3w011	办公室	office	oficina
h3w012	帮忙	to help	ayudar
h3w013	包	bag	bolsa
h3w014	饱	full (after eating)	lleno (después de comer)
h3w015	北方	the north	norte
h3w016	被	(passive marker) by	(marca de pasiva) por
h3w017	鼻子	nose	nariz
h3w018	比较	rather; relatively	bastante; relativamente
h3w019	比赛	match; competition	partido; competencia
h3w020	笔记本	notebook	cuaderno
h3w021	必须	must	deber
h3w022	变化	change	cambio
h3w023	别人	other people	otras personas
h3w024	冰箱	refrigerator	refrigerador
h3w025	不但…而且	not only… but also	no solo… sino también
h3w026	菜单	menu	menú
h3w027	才	only then; not until	hasta entonces; no antes de
h3w028	参加	to take part in	participar en
h3w029	草	grass	césped
h3w030	层	floor; layer	piso; capa
h3w031	差	to be short of; poor	faltar; malo
h3w032	超市	supermarket	supermercado
h3w033	衬衫	shirt	camisa
h3w034	成绩	result; grade	resultado; calificación
h3w035	城市	city	ciudad
h3w036	迟到	to be late	llegar tarde
h3w037	出现	to appear	aparecer
h3w038	除了	besides; except	además de; excepto
h3w039	厨房	kitchen	cocina
h3w041	春	spring	primavera
h3w042	词语	word; phrase	palabra; expresión
h3w043	聪明	clever	listo
h3w044	打扫	to clean	limpiar
h3w045	打算	to plan	planear
h3w046	带	to bring; to take	traer; llevar
h3w047	担心	to worry	preocuparse
h3w048	蛋糕	cake	pastel
h3w049	当然	of course	por supuesto
h3w050	地	(adverbial particle)	(partícula adverbial)
h3w051	灯	lamp; light	lámpara; luz
h3w052	地方	place	lugar
h3w053	地铁	subway	metro
h3w054	地图	map	mapa
h3w055	电梯	elevator	ascensor
h3w056	电子邮件	email	correo electrónico
h3w057	东	east	este
h3w058	冬	winter	invierno
h3w059	动物	animal	animal
h3w060	短	short (of length)	corto (de longitud)
h3w061	段	(measure word for sections)	(clasificador para secciones)
```
