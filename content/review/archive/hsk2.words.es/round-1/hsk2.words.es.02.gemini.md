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
h2w081	票	ticket	boleto
h2w082	妻子	wife	esposa
h2w083	起床	to get up	levantarse
h2w084	千	thousand	mil
h2w085	铅笔	pencil	lápiz
h2w086	晴	sunny	soleado
h2w087	去年	last year	el año pasado
h2w088	让	to let; to make (someone do)	dejar; hacer (que alguien haga algo)
h2w089	日	day; date	día; fecha
h2w090	上班	to go to work	ir al trabajo
h2w091	身体	body; health	cuerpo; salud
h2w092	生病	to get sick	enfermarse
h2w093	生日	birthday	cumpleaños
h2w094	时间	time	tiempo
h2w095	事情	matter; thing	asunto; cosa
h2w096	手表	wristwatch	reloj de pulsera
h2w097	手机	mobile phone	celular
h2w098	说话	to speak; to talk	hablar
h2w099	送	to give (as a gift); to see off	regalar; despedir
h2w100	虽然…但是	although… (but)	aunque… (pero)
h2w101	它	it	ello
h2w102	踢足球	to play football	jugar fútbol
h2w103	题	question (on a test)	pregunta (de examen)
h2w104	跳舞	to dance	bailar
h2w105	外	outside	afuera
h2w106	完	to finish	terminar
h2w107	玩	to play	jugar
h2w108	晚上	evening	noche
h2w109	往	towards	hacia
h2w110	为什么	why	por qué
h2w111	问	to ask	preguntar
h2w112	问题	question; problem	pregunta; problema
h2w113	西瓜	watermelon	sandía
h2w114	希望	to hope	esperar; desear
h2w115	洗	to wash	lavar
h2w116	小时	hour	hora
h2w117	笑	to laugh; to smile	reír; sonreír
h2w118	新	new	nuevo
h2w119	姓	surname; to be surnamed	apellido; apellidarse
h2w120	休息	to rest	descansar
h2w121	雪	snow	nieve
h2w122	颜色	colour	color
h2w123	眼睛	eye	ojo
h2w124	羊肉	mutton; lamb	carne de cordero
h2w125	药	medicine	medicina
h2w126	要	to want; will	querer; ir a (auxiliar de futuro)
h2w127	也	also; too	también
h2w128	一起	together	juntos
h2w129	一下	(a quick) once; a bit	(brevemente) una vez; un poco
h2w130	已经	already	ya
h2w131	意思	meaning	significado
h2w132	因为…所以	because… (so)	porque… (así que)
h2w133	阴	cloudy; overcast	nublado
h2w134	游泳	to swim	nadar
h2w135	右边	right side	derecha
h2w136	鱼	fish	pescado
h2w137	远	far	lejos
h2w138	运动	sport; to exercise	deporte; hacer ejercicio
h2w139	再	again	otra vez
h2w140	早上	morning	mañana
h2w141	丈夫	husband	esposo
h2w142	找	to look for	buscar
h2w143	着	(particle for a continuing state)	(partícula de estado continuo)
h2w144	真	really; truly	realmente; verdaderamente
h2w145	正在	in the middle of (doing)	en este momento (indica una acción en curso)
h2w146	知道	to know	saber
h2w147	准备	to prepare	preparar
h2w148	走	to walk; to leave	caminar; irse
h2w149	最	most	más
h2w150	左边	left side	izquierda
```
