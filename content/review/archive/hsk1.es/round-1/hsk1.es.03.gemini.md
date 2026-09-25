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
p154	这个多少钱？	How much is this?	¿Cuánto cuesta esto?
p155	三块钱。	Three yuan.	Tres yuanes.
p156	太多了！	That's too much!	¡Es demasiado!
p157	我没有钱。	I don't have money.	No tengo dinero.
p158	我有一点儿钱。	I have a little money.	Tengo un poco de dinero.
p159	我喜欢猫。	I like cats.	Me gustan los gatos.
p160	我喜欢狗。	I like dogs.	Me gustan los perros.
p161	猫在桌子下面。	The cat is under the table.	El gato está debajo de la mesa.
p162	狗在椅子上。	The dog is on the chair.	El perro está en la silla.
p163	书在桌子上。	The book is on the table.	El libro está en la mesa.
p164	你看见我的书了吗？	Have you seen my book?	¿Has visto mi libro?
p165	我在看书。	I'm reading a book.	Estoy leyendo un libro.
p166	我喜欢看书。	I like reading.	Me gusta leer.
p167	我喜欢看电影。	I like watching films.	Me gusta ver películas.
p168	我们去看电影。	We're going to see a film.	Vamos a ver una película.
p169	你喜欢看电视吗？	Do you like watching TV?	¿Te gusta ver televisión?
p170	我在看电视。	I'm watching TV.	Estoy viendo televisión.
p171	电脑在哪儿？	Where is the computer?	¿Dónde está la computadora?
p172	我想打电话。	I want to make a phone call.	Quiero hacer una llamada.
p173	请坐。	Please sit.	Siéntate, por favor.
p174	请喝茶。	Please have some tea.	Toma un poco de té, por favor.
p175	你喝什么？	What would you like to drink?	¿Qué quieres tomar?
p176	我喝水。	I'll drink water.	Voy a tomar agua.
p177	我喜欢喝茶。	I like drinking tea.	Me gusta tomar té.
p178	我想回家。	I want to go home.	Quiero ir a casa.
p179	他去医院了。	He went to the hospital.	Él fue al hospital.
p180	她是医生。	She is a doctor.	Ella es médica.
p181	我不认识他。	I don't know him.	No lo conozco.
p182	你认识她吗？	Do you know her?	¿La conoces?
p183	明天我去学校。	Tomorrow I'm going to school.	Mañana voy a la escuela.
p184	我们都是朋友。	We are all friends.	Todos somos amigos.
p185	我们都很好。	We are all fine.	Todos estamos bien.
p186	昨天我很高兴。	I was very happy yesterday.	Ayer estaba muy feliz.
p187	我在家。	I'm at home.	Estoy en casa.
p188	我在学校。	I'm at school.	Estoy en la escuela.
p189	一，二，三！	One, two, three!	¡Uno, dos, tres!
p190	四，五，六！	Four, five, six!	¡Cuatro, cinco, seis!
p191	七，八，九，十！	Seven, eight, nine, ten!	¡Siete, ocho, nueve, diez!
p192	我有十个苹果。	I have ten apples.	Tengo diez manzanas.
p193	我想吃八个苹果。	I want to eat eight apples.	Quiero comer ocho manzanas.
p194	你有几个苹果？	How many apples do you have?	¿Cuántas manzanas tienes?
p195	这是我的桌子。	This is my table.	Esta es mi mesa.
p196	那是你的椅子。	That is your chair.	Esa es tu silla.
p197	这些是什么？	What are these?	¿Qué son estos?
p198	那些是我的书。	Those are my books.	Esos son mis libros.
p199	你喜欢什么？	What do you like?	¿Qué te gusta?
p200	我喜欢水果。	I like fruit.	Me gusta la fruta.
p201	这个很大。	This is very big.	Esto es muy grande.
p202	那个很小。	That one is very small.	Eso es muy pequeño.
p203	我很小。	I'm very small.	Soy muy pequeño.
p204	你很大。	You're very big.	Eres muy grande.
p205	这是一个杯子。	This is a cup.	Esto es una taza.
p206	请喝一杯茶。	Please have a cup of tea.	Toma una taza de té, por favor.
p207	我想喝一杯水。	I want a glass of water.	Quiero un vaso de agua.
p208	他在工作。	He is working.	Él está trabajando.
p209	她在学习。	She is studying.	Ella está estudiando.
p210	我妈妈在做饭。	My mom is cooking.	Mi mamá está cocinando.
p211	我下午工作。	I work in the afternoon.	Trabajo en la tarde.
p212	中午我在家吃饭。	I eat at home at noon.	Al mediodía como en casa.
p213	他们是谁？	Who are they?	¿Quiénes son ellos?
p214	他们是我的朋友。	They are my friends.	Ellos son mis amigos.
p215	我有一个女儿。	I have a daughter.	Tengo una hija.
p216	他有一个儿子。	He has a son.	Él tiene un hijo.
p217	先生，你好！	Hello, sir!	¡Hola, señor!
p218	小姐，你好！	Hello, miss!	¡Hola, señorita!
p219	你们好！	Hello, everyone!	¡Hola a todos!
p220	我喜欢你的衣服。	I like your clothes.	Me gusta tu ropa.
p221	你的衣服很漂亮。	Your clothes are very pretty.	Tu ropa es muy bonita.
p222	这个星期我很高兴。	I'm very happy this week.	Esta semana estoy muy feliz.
p223	我明天不工作。	I'm not working tomorrow.	Mañana no trabajo.
p224	我能看电视吗？	Can I watch TV?	¿Puedo ver televisión?
p225	你能看见我吗？	Can you see me?	¿Puedes verme?
p226	我看见你了！	I see you!	¡Te veo!
p227	我想看看。	I want to have a look.	Quiero mirar.
p228	我不会写这个字。	I can't write this character.	No sé escribir este carácter.
p229	你会做饭吗？	Can you cook?	¿Sabes cocinar?
```
