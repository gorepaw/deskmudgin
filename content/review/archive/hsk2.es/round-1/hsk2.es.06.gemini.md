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
h2p376	没问题！	No problem!	¡No hay problema!
h2p377	我有一个问题。	I have a question.	Tengo una pregunta.
h2p378	这是什么意思？	What does this mean?	¿Qué significa esto?
h2p379	有意思！	Interesting!	¡Qué interesante!
h2p380	这本书很有意思。	This book is very interesting.	Este libro es muy interesante.
h2p381	那个电影有意思吗？	Is that movie interesting?	¿Es interesante esa película?
h2p382	你来一下。	Come here a moment.	Ven un momento.
h2p383	我看一下。	Let me take a look.	Déjame ver.
h2p384	我想一下。	Let me think for a moment.	Déjame pensar un momento.
h2p385	我的手表很贵。	My watch is expensive.	Mi reloj es caro.
h2p386	我的手机没电了。	My phone is out of battery.	Mi celular se quedó sin batería.
h2p387	这是今天的报纸。	This is today's newspaper.	Este es el periódico de hoy.
h2p388	我在机场等你。	I'll wait for you at the airport.	Te espero en el aeropuerto.
h2p389	飞机几点到？	What time does the plane arrive?	¿A qué hora llega el avión?
h2p390	我坐飞机去旅游。	I'm flying off on a trip.	Viajo en avión.
h2p391	你住在几号房间？	Which room are you staying in?	¿En qué habitación te quedas?
h2p392	他坐公共汽车上班。	He takes the bus to work.	Va al trabajo en autobús.
h2p393	公共汽车来了！	The bus is here!	¡Ya llegó el autobús!
h2p394	公司离我家很远。	The company is far from my home.	La empresa está muy lejos de mi casa.
h2p395	走路去要多长时间？	How long does it take to walk there?	¿Cuánto tiempo se tarda caminando?
h2p396	学校离我家不远。	The school isn't far from my home.	La escuela no está lejos de mi casa.
h2p397	我们走路去吧。	Let's walk there.	Vamos caminando.
h2p398	我家旁边有个商店。	There's a shop next to my home.	Hay una tienda al lado de mi casa.
h2p399	你坐我旁边吧。	Sit next to me.	Siéntate a mi lado.
h2p400	她是我们的新同学。	She's our new classmate.	Ella es nuestra nueva compañera de clase.
h2p401	大家都来了吗？	Is everyone here?	¿Ya llegaron todos?
h2p402	大家一起唱吧！	Everyone, sing together!	¡Cantemos todos juntos!
h2p403	我给你打电话。	I'll call you.	Te voy a llamar.
h2p404	我给你买了一个西瓜。	I bought you a watermelon.	Te compré una sandía.
h2p405	这是给你的。	This is for you.	Esto es para ti.
h2p406	我们去外面吃饭吧。	Let's eat out.	Vamos a comer afuera.
h2p407	你想吃米饭还是面条？	Do you want rice or noodles?	¿Quieres arroz o fideos?
h2p408	鸡蛋很便宜。	Eggs are cheap.	Los huevos son baratos.
h2p409	茶比咖啡好喝。	Tea tastes better than coffee.	El té sabe mejor que el café.
h2p410	西瓜是我最喜欢的水果。	Watermelon is my favourite fruit.	La sandía es mi fruta favorita.
h2p411	你吃过羊肉吗？	Have you ever eaten lamb?	¿Has comido cordero alguna vez?
h2p412	我没去过北京。	I've never been to Beijing.	Nunca he estado en Beijing.
h2p413	今天是几月几日？	What's the date today?	¿Qué fecha es hoy?
h2p414	一年有三百六十五天。	A year has three hundred and sixty-five days.	Un año tiene trescientos sesenta y cinco días.
h2p415	我有一千个问题！	I have a thousand questions!	¡Tengo mil preguntas!
h2p416	我们两个人一起去。	The two of us will go together.	Los dos vamos juntos.
h2p417	那个男人是谁？	Who is that man?	¿Quién es ese hombre?
h2p418	您请坐。	Please have a seat.	Siéntese, por favor. (cortés)
h2p419	您想喝什么？	What would you like to drink?	¿Qué quiere tomar? (cortés)
h2p420	它在哪儿？	Where is it?	¿Dónde está?
h2p421	我喜欢它。	I like it.	Me gusta.
h2p422	别看！	Don't look!	¡No mires!
h2p423	你真的要走吗？	Are you really leaving?	¿De verdad te vas?
h2p424	我真的不知道。	I really don't know.	De verdad no sé.
h2p425	这个真大！	This is really big!	¡Esto es enorme!
h2p426	你真高！	You're really tall!	¡Qué alto eres!
h2p427	今天真冷！	It's really cold today!	¡Qué frío hace hoy!
h2p428	你是我最好的朋友。	You're my best friend.	Eres mi mejor amigo.
h2p429	我最不喜欢考试。	I like exams least of all.	Lo que menos me gusta son los exámenes.
h2p430	我准备了很多吃的。	I've prepared lots of food.	Preparé mucha comida.
h2p431	我希望能去中国。	I hope I can go to China.	Espero poder ir a China.
h2p432	他可能不来了。	He might not come.	Puede que no venga.
h2p433	我可能错了。	I might be wrong.	Puede que esté equivocado.
h2p434	我已经知道了。	I already know.	Ya lo sé.
h2p435	已经十点了！	It's already ten o'clock!	¡Ya son las diez!
h2p436	你在等谁？	Who are you waiting for?	¿A quién esperas?
h2p437	你等我一下。	Wait for me a moment.	Espérame un momento.
h2p438	他在找你。	He's looking for you.	Te está buscando.
h2p439	我找到了！	I found it!	¡Lo encontré!
h2p440	你找什么？	What are you looking for?	¿Qué buscas?
h2p441	这儿的东西都很便宜。	Everything here is cheap.	Todo aquí es barato.
h2p442	西瓜怎么卖？	How much is the watermelon?	¿A cuánto está la sandía?
h2p443	这个卖完了。	This is sold out.	Esto ya se agotó.
h2p444	你会打篮球吗？	Can you play basketball?	¿Sabes jugar baloncesto?
h2p445	我不会跳舞。	I can't dance.	No sé bailar.
h2p446	我身体很好。	I'm in good health.	Tengo muy buena salud.
h2p447	你要多运动。	You should exercise more.	Debes hacer más ejercicio.
h2p448	跑步很累。	Running is tiring.	Correr cansa mucho.
h2p449	游泳很有意思。	Swimming is fun.	Nadar es muy divertido.
```
