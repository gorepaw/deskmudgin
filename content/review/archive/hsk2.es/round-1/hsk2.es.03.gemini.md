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
h2p151	我不知道。	I don't know.	No sé.
h2p152	你知道吗？	Do you know?	¿Lo sabes?
h2p153	我知道了！	Got it!	¡Ya lo sé!
h2p154	铅笔在桌子上。	The pencil is on the table.	El lápiz está sobre la mesa.
h2p155	我找不到我的铅笔了。	I can't find my pencil.	No encuentro mi lápiz.
h2p156	这是我第一次来北京。	This is my first time in Beijing.	Esta es mi primera vez en Beijing.
h2p157	我哥哥在公司工作。	My older brother works at a company.	Mi hermano mayor trabaja en una empresa.
h2p158	我要去上班了。	I'm off to work.	Ya me voy a trabajar.
h2p159	你每天几点上班？	What time do you start work every day?	¿A qué hora entras a trabajar todos los días?
h2p160	他工作很忙。	He's very busy with work.	Está muy ocupado con el trabajo.
h2p161	我今天不上班。	I'm not working today.	Hoy no trabajo.
h2p162	我喜欢打篮球。	I like playing basketball.	Me gusta jugar baloncesto.
h2p163	我们一起去踢足球吧！	Let's go play football together!	¡Vamos a jugar fútbol juntos!
h2p164	我每天早上跑步。	I run every morning.	Corro todas las mañanas.
h2p165	你会游泳吗？	Can you swim?	¿Sabes nadar?
h2p166	我游得很快。	I swim fast.	Nado muy rápido.
h2p167	运动对身体好。	Exercise is good for your health.	El ejercicio es bueno para la salud.
h2p168	他跑得非常快。	He runs extremely fast.	Él corre rapidísimo.
h2p169	你喜欢什么运动？	What sport do you like?	¿Qué deporte te gusta?
h2p170	我们去唱歌吧！	Let's go singing!	¡Vamos a cantar!
h2p171	她跳舞跳得很好。	She dances very well.	Ella baila muy bien.
h2p172	太贵了！	Too expensive!	¡Está muy caro!
h2p173	这个很便宜。	This is very cheap.	Esto es muy barato.
h2p174	有没有便宜一点儿的？	Is there a cheaper one?	¿Hay algo más barato?
h2p175	我想买一件衣服。	I want to buy a piece of clothing.	Quiero comprar ropa.
h2p176	你喜欢什么颜色？	What colour do you like?	¿Qué color te gusta?
h2p177	我最喜欢红色。	My favourite colour is red.	Mi color favorito es el rojo.
h2p178	我觉得白的好看。	I think the white one looks nicer.	Creo que el blanco se ve mejor.
h2p179	他穿着一件黑衣服。	He's wearing black clothes.	Él lleva puesta ropa negra.
h2p180	这儿卖西瓜吗？	Do they sell watermelon here?	¿Aquí venden sandía?
h2p181	商店几点开门？	What time does the shop open?	¿A qué hora abre la tienda?
h2p182	这个比那个贵。	This one is more expensive than that one.	Esto es más caro que eso.
h2p183	我没有时间。	I don't have time.	No tengo tiempo.
h2p184	你有时间吗？	Do you have time?	¿Tienes tiempo?
h2p185	你的生日是几月几号？	When is your birthday?	¿Cuándo es tu cumpleaños?
h2p186	今天是我的生日！	Today is my birthday!	¡Hoy es mi cumpleaños!
h2p187	我去年去了北京。	I went to Beijing last year.	El año pasado fui a Beijing.
h2p188	我已经吃饭了。	I've already eaten.	Ya comí.
h2p189	他已经走了。	He's already gone.	Él ya se fue.
h2p190	我等了一个小时。	I waited for an hour.	Esperé una hora.
h2p191	还有十分钟。	There are still ten minutes.	Quedan diez minutos.
h2p192	我们快点儿走吧！	Let's hurry up and go!	¡Vámonos rápido!
h2p193	时间到了！	Time's up!	¡Se acabó el tiempo!
h2p194	每天都很忙。	Every day is busy.	Cada día es muy ajetreado.
h2p195	我每天八点起床。	I get up at eight every day.	Me levanto a las ocho todos los días.
h2p196	晚上我们去看电影吧。	Let's go see a movie tonight.	Vamos a ver una película esta noche.
h2p197	我想去旅游。	I want to go travelling.	Quiero ir de viaje.
h2p198	机场离这儿远吗？	Is the airport far from here?	¿El aeropuerto está lejos de aquí?
h2p199	医院离这儿很近。	The hospital is very close to here.	El hospital está muy cerca de aquí.
h2p200	我们坐公共汽车去吧。	Let's take the bus.	Vamos en autobús.
h2p201	我们住在宾馆。	We're staying at a hotel.	Nos quedamos en un hotel.
h2p202	你的房间在哪儿？	Where is your room?	¿Dónde está tu habitación?
h2p203	往左边走。	Go to the left.	Ve hacia la izquierda.
h2p204	往右边走。	Go to the right.	Ve hacia la derecha.
h2p205	学校在医院旁边。	The school is next to the hospital.	La escuela está al lado del hospital.
h2p206	商店在右边。	The shop is on the right.	La tienda está a la derecha.
h2p207	我从北京来。	I come from Beijing.	Vengo de Beijing.
h2p208	你从哪儿来？	Where do you come from?	¿De dónde vienes?
h2p209	北京离这儿很远。	Beijing is far from here.	Beijing está muy lejos de aquí.
h2p210	路上车很多。	There are lots of cars on the road.	Hay muchos autos en el camino.
h2p211	飞机票很贵。	Plane tickets are expensive.	Los boletos de avión son caros.
h2p212	我买到票了！	I got the tickets!	¡Conseguí los boletos!
h2p213	你去过中国吗？	Have you been to China?	¿Has estado en China?
h2p214	我去过北京。	I've been to Beijing.	He estado en Beijing.
h2p215	你的眼睛很漂亮。	Your eyes are very pretty.	Tus ojos son muy bonitos.
h2p216	我有一个很大的眼睛。	I have one very big eye.	Tengo un ojo muy grande.
h2p217	猫在门外面。	The cat is outside the door.	El gato está afuera de la puerta.
h2p218	它是我的猫。	It's my cat.	Es mi gato.
h2p219	它叫什么名字？	What's its name?	¿Cómo se llama?
h2p220	你说得对。	You're right.	Tienes razón.
h2p221	我觉得你说得对。	I think you're right.	Creo que tienes razón.
h2p222	我也是！	Me too!	¡Yo también!
h2p223	我也不知道。	I don't know either.	Yo tampoco lo sé.
h2p224	真的吗？	Really?	¿De verdad?
h2p225	真的！	Really!	¡De verdad!
```
