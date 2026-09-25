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
h2w001	吧	(suggestion particle) let's…; …right?	(partícula de sugerencia) vamos a…; ¿verdad?
h2w002	白	white	blanco
h2w003	百	hundred	cien
h2w004	帮助	to help	ayudar
h2w005	报纸	newspaper	periódico
h2w006	比	than; compared with	que; comparado con
h2w007	别	don't	no
h2w008	宾馆	hotel	hotel
h2w009	长	long	largo
h2w010	唱歌	to sing	cantar
h2w011	出	to go out; to come out	salir
h2w012	穿	to wear; to put on	vestir; ponerse
h2w013	次	(measure word for times)	(clasificador para veces)
h2w014	从	from	desde
h2w015	错	wrong	incorrecto
h2w016	打篮球	to play basketball	jugar baloncesto
h2w017	大家	everyone	todos
h2w018	到	to arrive; to	llegar; a
h2w019	得	(structural particle after a verb)	(partícula estructural después de un verbo)
h2w020	等	to wait	esperar
h2w021	弟弟	younger brother	hermano menor
h2w022	第一	first	primero
h2w023	懂	to understand	entender
h2w024	对	correct; towards	correcto; hacia
h2w025	房间	room	habitación
h2w026	非常	very; extremely	muy; sumamente
h2w027	服务员	waiter; attendant	mesero; encargado
h2w028	高	tall; high	alto
h2w029	告诉	to tell	decir; contar
h2w030	哥哥	older brother	hermano mayor
h2w031	给	to give; for	dar; para
h2w032	公共汽车	bus	autobús
h2w033	公司	company	empresa
h2w034	贵	expensive	caro
h2w035	过	(particle for past experience)	(partícula de experiencia pasada)
h2w036	还	still; also	todavía; también
h2w037	孩子	child	niño
h2w038	好吃	tasty	sabroso
h2w039	黑	black	negro
h2w040	红	red	rojo
h2w041	欢迎	welcome	bienvenido
h2w042	回答	to answer	responder
h2w043	机场	airport	aeropuerto
h2w044	鸡蛋	egg	huevo
h2w045	件	(measure word for clothes and matters)	(clasificador para ropa y asuntos)
h2w046	教室	classroom	salón de clases
h2w047	姐姐	older sister	hermana mayor
h2w048	介绍	to introduce	presentar
h2w049	进	to enter	entrar
h2w050	近	near	cerca
h2w051	就	just; right away	justo; enseguida
h2w052	觉得	to feel; to think	sentir; pensar
h2w053	咖啡	coffee	café
h2w054	开始	to begin	empezar
h2w055	考试	exam	examen
h2w056	可能	maybe; possible	quizás; posible
h2w057	可以	can; may	poder
h2w058	课	class; lesson	clase; lección
h2w059	快	fast	rápido
h2w060	快乐	happy	feliz
h2w061	累	tired	cansado
h2w062	离	away from	lejos de
h2w063	两	two (of something)	dos
h2w064	零	zero	cero
h2w065	路	road	camino
h2w066	旅游	to travel	viajar
h2w067	卖	to sell	vender
h2w068	慢	slow	lento
h2w069	忙	busy	ocupado
h2w070	每	every	cada
h2w071	妹妹	younger sister	hermana menor
h2w072	门	door	puerta
h2w073	面条	noodles	fideos
h2w074	男	male	masculino
h2w075	您	you (polite)	usted
h2w076	牛奶	milk	leche
h2w077	女	female	femenino
h2w078	旁边	beside	al lado
h2w079	跑步	to run; to jog	correr
h2w080	便宜	cheap	barato
```
