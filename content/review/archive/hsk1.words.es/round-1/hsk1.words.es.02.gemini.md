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
w081	钱	money	dinero
w082	请	please	por favor
w083	去	to go	ir
w084	热	hot	caliente
w085	人	person	persona
w086	认识	to know (someone)	conocer (a alguien)
w087	三	three	tres
w088	商店	shop	tienda
w089	上	up; on	arriba; sobre
w090	上午	morning	mañana
w091	少	few; little	poco
w092	谁	who	quién
w093	什么	what	qué
w094	十	ten	diez
w095	时候	time; moment	tiempo; momento
w096	是	to be	ser
w097	书	book	libro
w098	水	water	agua
w099	水果	fruit	fruta
w100	睡觉	to sleep	dormir
w101	说	to speak	hablar
w102	四	four	cuatro
w103	岁	years of age	años (de edad)
w104	他	he; him	él
w105	她	she; her	ella
w106	太	too	demasiado
w107	天气	weather	clima
w108	听	to listen	escuchar
w109	同学	classmate	compañero de clase
w110	喂	hello (on the phone)	aló (al teléfono)
w111	我	I; me	yo
w112	我们	we; us	nosotros
w113	五	five	cinco
w114	喜欢	to like	gustar
w115	下	down; under	abajo; debajo
w116	下午	afternoon	tarde
w117	下雨	to rain	llover
w118	先生	mister	señor
w119	现在	now	ahora
w120	想	to want; to think	querer; pensar
w121	小	small	pequeño
w122	小姐	miss	señorita
w123	些	some	algunos
w124	写	to write	escribir
w125	谢谢	thanks	gracias
w126	星期	week	semana
w127	学生	student	estudiante
w128	学习	to study	estudiar
w129	学校	school	escuela
w130	一	one	uno
w131	一点儿	a little	un poco
w132	衣服	clothes	ropa
w133	医生	doctor	médico
w134	医院	hospital	hospital
w135	椅子	chair	silla
w136	有	to have	tener
w137	月	month	mes
w138	在	at; in	en
w139	再见	goodbye	adiós
w140	怎么	how	cómo
w141	怎么样	how about	qué tal
w142	这	this	este
w143	中国	China	China
w144	中午	noon	mediodía
w145	住	to live; to stay	vivir; alojarse
w146	桌子	table	mesa
w147	字	character; word	carácter; palabra
w148	昨天	yesterday	ayer
w149	坐	to sit	sentarse
w150	做	to do; to make	hacer
w151	这儿	here	aquí
w152	那儿	there	allí
```
