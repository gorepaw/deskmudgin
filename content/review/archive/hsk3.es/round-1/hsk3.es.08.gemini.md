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
h3p429	洗完澡，我觉得很舒服。	After a bath I feel really comfortable.	Después de bañarme me siento muy a gusto.
h3p430	夏天的晚上很舒服。	Summer nights are really pleasant.	Las noches de verano son muy agradables.
h3p431	我想先睡，你也早点睡。	I want to sleep first, and you sleep early too.	Quiero dormir primero, y tú también duerme temprano.
h3p432	我喜欢这个小故事。	I like this little story.	Me gusta este cuentito.
h3p433	香蕉是我最爱的水果。	Bananas are my favorite fruit.	El plátano es mi fruta favorita.
h3p434	我向你跑过去了。	I ran over toward you.	Corrí hacia ti.
h3p435	你像我的哥哥一样。	You're like a big brother to me.	Eres como un hermano mayor para mí.
h3p436	小心，别把我放在地上。	Careful, don't put me on the floor.	Cuidado, no me pongas en el suelo.
h3p437	校长今天没有来学校。	The principal didn't come to school today.	Hoy el director no vino a la escuela.
h3p438	我在电视上看新闻。	I'm watching the news on TV.	Estoy viendo las noticias en la televisión.
h3p439	我要新鲜的鱼，不要旧的。	I want fresh fish, not old.	Quiero pescado fresco, no viejo.
h3p440	我给爷爷写了信。	I wrote a letter to my grandpa.	Le escribí una carta a mi abuelo.
h3p441	你的行李箱里有什么？	What is in your suitcase?	¿Qué hay en tu maleta?
h3p442	熊猫也喜欢吃东西。	Pandas like eating too.	A los pandas también les gusta comer.
h3p443	我需要休息一下。	I need to rest for a bit.	Necesito descansar un ratito.
h3p444	选择太多了，我不知道吃什么。	There are too many choices, and I don't know what to eat.	Hay demasiado para elegir y no sé qué comer.
h3p445	你的要求我都记住了。	I've remembered all your requests.	Ya me acordé de todo lo que me pediste.
h3p446	爷爷的家很大。	Grandpa's home is very big.	La casa de mi abuelo es muy grande.
h3p447	我一定会好好听话。	I'll definitely be good and listen.	Seguro voy a portarme bien y a obedecer.
h3p448	我们一共有几个人？	How many of us are there altogether?	¿Cuántas personas somos en total?
h3p449	你等我一会儿，好吗？	Wait for me a moment, okay?	Espérame un momento, ¿sí?
h3p450	你是我的家人，我很放心。	You're my family, so I feel at ease.	Eres parte de mi familia, así que estoy tranquilo.
h3p451	我一直想有个朋友。	I've always wanted a friend.	Siempre he querido tener un amigo.
h3p452	以前的日子也很好。	The days before were nice too.	Los días de antes también eran buenos.
h3p453	我们一般什么时候吃饭？	When do we usually eat?	¿A qué hora comemos normalmente?
h3p454	我在听音乐，别说话。	I'm listening to music, so don't talk.	Estoy escuchando música, no hables.
h3p455	我们去银行旁边玩吧。	Let's go play next to the bank.	Vamos a jugar junto al banco.
h3p456	这杯饮料是谁的？	Whose drink is this?	¿De quién es esta bebida?
h3p457	我应该去睡觉了。	I should go to sleep now.	Ya debería irme a dormir.
h3p458	天气会影响我睡觉。	The weather affects my sleep.	El clima afecta mi sueño.
h3p459	你用什么听音乐？	What do you use to listen to music?	¿Con qué escuchas música?
h3p460	我们再玩一个游戏吧。	Let's play another game.	Juguemos otro juego.
h3p461	这里最有名的是什么？	What's the most famous thing here?	¿Qué es lo más famoso de aquí?
h3p462	你又忘记吃饭了吗？	Did you forget to eat again?	¿Otra vez se te olvidó comer?
h3p463	我今天遇到很多朋友。	I ran into lots of friends today.	Hoy me encontré con muchos amigos.
h3p464	我愿意一直和你在一起。	I'm willing to stay with you always.	Quiero estar contigo siempre.
h3p465	月亮出来了，晚安。	The moon is out, good night.	Salió la luna, buenas noches.
h3p466	我越吃越想吃。	The more I eat, the more I want.	Mientras más como, más quiero comer.
h3p467	车站的人很多，我有点怕。	There are lots of people at the station, and I'm a bit scared.	Hay mucha gente en la estación y me da un poco de miedo.
h3p468	我想要一个礼物，你能送我吗？	I want a present. Can you give me one?	Quiero un regalo, ¿me lo puedes dar?
h3p469	我喜欢听历史故事。	I like listening to history stories.	Me gusta escuchar cuentos de historia.
h3p470	附近有一个公园，我们去玩吧！	There is a park nearby. Let's go and play!	Hay un parque cerca, ¡vamos a jugar!
h3p471	我一边吃饭，一边看电视。	I am eating and watching TV at the same time.	Como y veo la televisión al mismo tiempo.
h3p472	我的嘴好干，想喝水。	My mouth is so dry. I want some water.	Tengo la boca muy seca, quiero agua.
```
