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
h3w182	裙子	skirt	falda
h3w183	然后	then; afterwards	luego; después
h3w184	热情	warm; enthusiastic	cálido; entusiasta
h3w185	认为	to think; to consider	pensar; considerar
h3w186	认真	serious; conscientious	serio; concienzudo
h3w187	容易	easy	fácil
h3w188	如果	if	si
h3w189	伞	umbrella	paraguas
h3w190	上网	to go online	conectarse a internet
h3w191	生气	to be angry	estar enojado
h3w192	声音	sound; voice	sonido; voz
h3w193	世界	world	mundo
h3w194	试	to try	probar
h3w195	瘦	thin	delgado
h3w196	叔叔	uncle	tío
h3w197	舒服	comfortable	cómodo
h3w198	树	tree	árbol
h3w199	数学	maths	matemáticas
h3w200	刷牙	to brush one's teeth	cepillarse los dientes
h3w201	双	pair	par
h3w202	水平	level; standard	nivel
h3w203	司机	driver	conductor
h3w204	太阳	sun	sol
h3w205	特别	special; especially	especial; especialmente
h3w206	疼	to hurt; painful	doler; doloroso
h3w207	提高	to improve	mejorar
h3w208	体育	sports; physical education	deportes; educación física
h3w209	甜	sweet	dulce
h3w210	条	(measure word for long things)	(clasificador para cosas largas)
h3w211	同事	colleague	colega
h3w212	同意	to agree	estar de acuerdo
h3w213	头发	hair	cabello
h3w214	突然	suddenly	de repente
h3w215	图书馆	library	biblioteca
h3w216	腿	leg	pierna
h3w217	完成	to complete	completar
h3w218	碗	bowl	tazón
h3w219	万	ten thousand	diez mil
h3w220	忘记	to forget	olvidar
h3w221	为	for; to	para; a
h3w222	为了	in order to	para
h3w223	位	(polite measure word for people)	(clasificador cortés para personas)
h3w224	文化	culture	cultura
h3w225	西	west	oeste
h3w226	习惯	habit; to be used to	costumbre; estar acostumbrado
h3w227	洗手间	restroom	baño
h3w228	洗澡	to take a bath or shower	bañarse
h3w229	夏	summer	verano
h3w230	先	first	primero
h3w231	相信	to believe	creer
h3w232	香蕉	banana	plátano
h3w233	向	towards	hacia
h3w234	像	to resemble; like	parecerse; como
h3w235	小心	careful	cuidadoso
h3w236	校长	principal	director
h3w237	新闻	news	noticias
h3w238	新鲜	fresh	fresco
h3w239	信	letter	carta
h3w241	行李箱	suitcase	maleta
h3w242	熊猫	panda	panda
```
