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
w001	爱	love	amar
w002	八	eight	ocho
w003	爸爸	dad	papá
w004	杯子	cup	taza
w005	北京	Beijing	Pekín
w006	本	(measure word for books)	(clasificador para libros)
w007	不客气	you're welcome	de nada
w008	不	not; no	no
w009	菜	dish; vegetable	platillo; verdura
w010	茶	tea	té
w011	吃	to eat	comer
w012	出租车	taxi	taxi
w013	打电话	to make a phone call	llamar por teléfono
w014	大	big	grande
w015	的	(possessive particle)	(partícula posesiva)
w016	点	o'clock; a little	en punto; un poco
w017	电脑	computer	computadora
w018	电视	television	televisión
w019	电影	film	película
w020	东西	thing	cosa
w021	都	all; both	todos; ambos
w022	读	to read	leer
w023	对不起	sorry	lo siento
w024	多	many; much	mucho
w025	多少	how many; how much	cuánto
w026	儿子	son	hijo
w027	二	two	dos
w028	饭店	restaurant; hotel	restaurante; hotel
w029	飞机	aeroplane	avión
w030	分钟	minute	minuto
w031	高兴	happy	feliz; contento
w032	个	(general measure word)	(clasificador general)
w033	工作	work; to work	trabajo; trabajar
w034	狗	dog	perro
w035	汉语	Chinese language	idioma chino
w036	好	good	bueno
w037	号	number; day of the month	número; día del mes
w038	喝	to drink	beber
w039	和	and	y
w040	很	very	muy
w041	后面	behind	detrás
w042	回	to return	regresar
w043	会	can; to know how to	poder; saber (hacer algo)
w044	几	how many; several	cuántos; varios
w045	家	home; family	casa; familia
w046	叫	to be called	llamarse
w047	今天	today	hoy
w048	九	nine	nueve
w049	开	to open; to drive	abrir; conducir
w050	看	to look; to watch	mirar; ver
w051	看见	to see	ver
w052	块	(measure word for money)	(clasificador para dinero)
w053	来	to come	venir
w054	老师	teacher	maestro
w055	了	(aspect particle)	(partícula de aspecto)
w056	冷	cold	frío
w057	里	inside	dentro
w058	六	six	seis
w059	妈妈	mum	mamá
w060	吗	(question particle)	(partícula interrogativa)
w061	买	to buy	comprar
w062	猫	cat	gato
w063	没关系	it doesn't matter	no importa
w064	没有	to not have	no tener
w065	米饭	cooked rice	arroz cocido
w066	名字	name	nombre
w067	明天	tomorrow	mañana
w068	哪	which	cuál
w069	哪儿	where	dónde
w070	那	that	ese; aquel
w071	呢	(question particle)	(partícula interrogativa)
w072	能	to be able to	poder
w073	你	you	tú
w074	年	year	año
w075	女儿	daughter	hija
w076	朋友	friend	amigo
w077	漂亮	pretty	bonito
w078	苹果	apple	manzana
w079	七	seven	siete
w080	前面	in front	delante
```
