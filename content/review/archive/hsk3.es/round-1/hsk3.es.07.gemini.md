These are **Spanish translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is **sentences** a creature says on its own. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Spanish. It is shown two ways: to someone learning Spanish, as the line to learn, and to someone who reads Spanish, as the meaning of a line in another language — so it must be both correct and natural.

The Spanish should be neutral Latin American Spanish: `tú` for "you", `ustedes` for the plural, no `vosotros`, no regionalisms, with correct accents and ¿¡ punctuation.

For every row, check:
1. Does the Spanish mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Spanish, the way a native speaker would actually put it?

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
h3p369	这个苹果很新鲜，快来吃。	This apple is really fresh, come and eat.	Esta manzana está muy fresca, ven a comer.
h3p370	你有新的信吗？我在等。	Do you have a new letter? I'm waiting.	¿Tienes alguna carta nueva? Estoy esperando.
h3p371	你的行李箱好大啊。	Your suitcase is so big.	¡Qué grande es tu maleta!
h3p372	我想变成一只大熊猫。	I want to turn into a giant panda.	Quiero convertirme en un oso panda gigante.
h3p373	我需要你在我旁边。	I need you next to me.	Te necesito a mi lado.
h3p374	你想选择哪一个？	Which one do you want to choose?	¿Cuál quieres elegir?
h3p375	我有一个小小的要求：别走。	I have one small request: don't go.	Tengo una pequeña petición: no te vayas.
h3p376	我爷爷也喜欢听音乐。	My grandpa likes listening to music too.	A mi abuelo también le gusta escuchar música.
h3p377	明天一定是个好天气。	Tomorrow will surely be nice weather.	Mañana seguro hará buen tiempo.
h3p378	今天一共有五个人来看我。	Altogether five people came to see me today.	Hoy vinieron a verme cinco personas en total.
h3p379	我睡一会儿，别叫我。	I'll sleep for a bit, don't wake me.	Voy a dormir un ratito, no me llames.
h3p380	你和我一样喜欢吃蛋糕。	You like cake just like I do.	Igual que yo, a ti te gusta comer pastel.
h3p381	我一直在等你回家。	I've been waiting for you to come home all along.	Te he estado esperando todo el tiempo para que vuelvas a casa.
h3p382	以前我住在水里。	I used to live in the water.	Antes yo vivía en el agua.
h3p383	我一般晚上不睡觉。	I generally don't sleep at night.	Normalmente no duermo por la noche.
h3p384	这个音乐真好听。	This music sounds really nice.	Esta música suena muy bonita.
h3p385	你去银行做什么？	What are you going to the bank for?	¿Qué vas a hacer al banco?
h3p386	我想喝一杯冷的饮料。	I want a cold drink.	Quiero una bebida fría.
h3p387	你应该早点睡觉。	You should go to bed earlier.	Deberías acostarte más temprano.
h3p388	天气会影响我的心情。	The weather affects my mood.	El clima afecta mi estado de ánimo.
h3p389	我可以用一下你的笔吗？	Can I use your pen for a moment?	¿Puedo usar tu pluma un momento?
h3p390	我喜欢这个游戏，再玩一次。	I like this game, let's play once more.	Me gusta este juego, juguemos una vez más.
h3p391	你的朋友很有名吧？	Your friend is quite famous, isn't he?	Tu amigo es muy famoso, ¿verdad?
h3p392	你终于来了，太好了！	You're finally here, how wonderful!	¡Por fin llegaste, qué bueno!
h3p393	我今天在路上遇到一只猫。	I ran into a cat on the road today.	Hoy me encontré con un gato en el camino.
h3p394	你愿意和我一起玩吗？	Are you willing to play with me?	¿Quieres jugar conmigo?
h3p395	今晚的月亮又大又亮。	Tonight's moon is big and bright.	La luna de esta noche es grande y brillante.
h3p396	天越来越冷了。	It's getting colder and colder.	Cada vez hace más frío.
h3p397	我在车站等你。	I'll wait for you at the station.	Te espero en la estación.
h3p398	请给我一张纸。	Please give me a sheet of paper.	Por favor, dame una hoja de papel.
h3p399	你怎么还不回来，我好着急。	Why aren't you back yet? I'm so worried.	¿Por qué todavía no vuelves? Estoy muy preocupado.
h3p400	请你照顾我，好吗？	Please take care of me, okay?	Por favor, cuídame, ¿sí?
h3p401	这张照片是谁给你的？	Who gave you this photo?	¿Quién te dio esta foto?
h3p402	我想用照相机给你照张相。	I want to take your picture with the camera.	Quiero tomarte una foto con la cámara.
h3p403	桌子上有一只小鸟。	There's a little bird on the table.	Hay un pajarito sobre la mesa.
h3p404	我只有你一个朋友。	You're my only friend.	Solo tengo un amigo, y eres tú.
h3p405	我坐在桌子中间。	I'm sitting in the middle of the table.	Estoy sentado en medio de la mesa.
h3p406	我在学中文，你教教我吧。	I'm learning Chinese, so teach me.	Estoy aprendiendo chino, enséñame.
h3p407	你终于回来了！	You're finally back!	¡Por fin volviste!
h3p408	你喜欢哪一种水果？	Which kind of fruit do you like?	¿Qué clase de fruta te gusta?
h3p409	今天的书包好重啊。	Today's school bag is so heavy.	La mochila de hoy pesa mucho.
h3p410	你最重要，别走。	You're the most important, don't go.	Tú eres lo más importante, no te vayas.
h3p411	这个周末你有空吗？	Are you free this weekend?	¿Estás libre este fin de semana?
h3p412	我主要吃蛋糕和水果。	I mainly eat cake and fruit.	Como sobre todo pastel y fruta.
h3p413	过马路要注意车。	Pay attention to cars when crossing the road.	Al cruzar la calle hay que fijarse en los coches.
h3p414	我想自己试一试。	I want to try it myself.	Quiero intentarlo yo solo.
h3p415	我想骑自行车去玩。	I want to ride a bike and play.	Quiero ir a jugar en bicicleta.
h3p416	你总是这么早起来。	You always get up this early.	Siempre te levantas así de temprano.
h3p417	最后一块蛋糕给我吧。	Give me the last piece of cake.	Dame el último pedazo de pastel.
h3p418	你最近好吗？我想你了。	How have you been lately? I missed you.	¿Cómo has estado últimamente? Te extrañé.
h3p419	你的作业做完了吗？	Have you finished your homework?	¿Ya terminaste tu tarea?
h3p420	请再说一遍。	Please say it once more.	Por favor, repítelo una vez más.
h3p421	我家对面有一个大商店。	There's a big shop across from my home.	Frente a mi casa hay una tienda grande.
h3p422	别忘了，明天我一定要吃鱼。	Don't forget, tomorrow I absolutely want fish.	No te olvides, mañana sí o sí quiero comer pescado.
h3p423	为了吃蛋糕，我一直在等。	I've been waiting just to have cake.	Estoy esperando solo para comer pastel.
h3p424	我们这里有三位小朋友。	There are three little kids here.	Aquí tenemos a tres niños pequeños.
h3p425	我想去看看别的文化。	I want to go see other cultures.	Quiero ir a conocer otras culturas.
h3p426	你往西走，我往东走。	You go west, and I'll go east.	Tú vas hacia el oeste y yo voy hacia el este.
h3p427	你的新习惯是什么？	What's your new habit?	¿Cuál es tu nuevo hábito?
h3p428	我一个人不想去洗手间。	I don't want to go to the restroom alone.	No quiero ir solo al baño.
```
