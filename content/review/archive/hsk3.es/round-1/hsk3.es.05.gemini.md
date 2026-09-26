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
h3p246	我马上就好，等我一下。	I'll be ready in a moment, wait for me.	Ya casi estoy listo, espérame un momento.
h3p247	我对今天很满意。	I'm very happy with today.	Estoy muy satisfecho con el día de hoy.
h3p248	你的帽子真好看！	Your hat looks great!	¡Tu sombrero te queda muy bien!
h3p249	我只有一米高，很小吧？	I'm only one metre tall. Pretty small, right?	Solo mido un metro, soy muy pequeño, ¿verdad?
h3p250	我饿了，想吃面包。	I'm hungry. I want some bread.	Tengo hambre, quiero pan.
h3p251	面包真香！	The bread smells so good!	¡Qué rico huele el pan!
h3p252	我明白了，你是想让我安静一点儿。	I get it. You want me to be quiet.	Ya entendí, quieres que me quede callado un poco.
h3p253	我想拿那个苹果，可是拿不到。	I want to grab that apple, but I can't reach it.	Quiero agarrar esa manzana, pero no la alcanzo.
h3p254	别拿走我的东西！	Don't take my things!	¡No te lleves mis cosas!
h3p255	你奶奶今天会来吗？	Is your grandmother coming today?	¿Tu abuela vendrá hoy?
h3p256	小鸟往南飞了。	The birds flew south.	Los pajaritos volaron hacia el sur.
h3p257	你要走了，我有点儿难过。	You're leaving, and I feel a bit sad.	Te vas a ir y me pongo un poco triste.
h3p258	我今天很难过，你和我玩吧。	I'm sad today. Play with me, please.	Hoy estoy triste, juega conmigo.
h3p259	你现在是几年级？	What grade are you in now?	¿En qué año escolar estás ahora?
h3p260	你看起来很年轻！	You look so young!	¡Te ves muy joven!
h3p261	有一只鸟在树上唱歌。	A bird is singing in the tree.	Hay un pájaro cantando en el árbol.
h3p262	我会努力的！	I'll try hard!	¡Me esforzaré!
h3p263	我每天都很努力地练习。	I work hard at practising every day.	Practico con mucho esfuerzo todos los días.
h3p264	周末我们去爬山吧。	Let's go climbing on the weekend.	El fin de semana vamos a escalar la montaña.
h3p265	爬山太累了，我想睡觉。	Climbing was so tiring. I want to sleep.	Escalar la montaña cansa mucho, quiero dormir.
h3p266	盘子里还有一块蛋糕。	There's still a piece of cake on the plate.	Todavía queda un pedazo de pastel en el plato.
h3p267	我是不是变胖了？	Have I gotten fat?	¿Me habré puesto gordo?
h3p268	你的皮鞋好亮啊！	Your leather shoes are so shiny!	¡Tus zapatos de cuero están muy brillantes!
h3p269	我不喝啤酒，我喜欢喝水。	I don't drink beer. I like water.	No tomo cerveza, me gusta tomar agua.
h3p270	瓶子里没有水了。	There's no water left in the bottle.	Ya no queda agua en la botella.
h3p271	其实我不太饿。	Actually, I'm not that hungry.	En realidad no tengo tanta hambre.
h3p272	其实我很想你。	Actually, I really miss you.	En realidad te extraño mucho.
h3p273	其他人都去哪儿了？	Where did everybody else go?	¿Adónde se fueron todos los demás?
h3p274	飞机马上就要起飞了。	The plane is about to take off.	El avión está a punto de despegar.
h3p275	我没听清楚，你再说一遍吧。	I did not catch that. Say it again.	No oí bien, dilo otra vez.
h3p276	今天我想请假，不想学习。	I want to take the day off today. I don't feel like studying.	Hoy quiero pedir permiso para faltar, no tengo ganas de estudiar.
h3p277	秋天到了，天气很好。	Autumn is here and the weather is lovely.	Llegó el otoño y hace buen tiempo.
h3p278	我喜欢秋天的太阳。	I like the autumn sun.	Me gusta el sol del otoño.
h3p279	你的裙子真漂亮！	Your skirt is so pretty!	¡Tu falda es muy bonita!
h3p280	先吃饭，然后再玩。	Eat first, then play.	Primero comemos y luego jugamos.
h3p281	我先睡一会儿，然后再找你玩。	I'll take a nap first and then come play with you.	Primero duermo un ratito y luego voy a jugar contigo.
h3p282	你好热情啊，我喜欢你！	You're so warm and friendly. I like you!	¡Eres muy cariñoso, me caes muy bien!
h3p283	我认为今天会下雨。	I think it's going to rain today.	Creo que hoy va a llover.
h3p284	你认为我可爱吗？	Do you think I'm cute?	¿Crees que soy lindo?
h3p286	你认真地看着我，我有点儿不好意思。	You're looking at me so intently, and I'm a little shy.	Me miras con tanta atención que me da un poco de vergüenza.
h3p287	这个问题很容易。	This question is easy.	Esta pregunta es muy fácil.
h3p288	如果你不在，我会很想你。	If you're not here, I'll miss you a lot.	Si no estás, te voy a extrañar mucho.
h3p289	如果明天下雨，我们就在家玩。	If it rains tomorrow, we'll play at home.	Si mañana llueve, jugaremos en casa.
h3p290	外面下雨了，你带伞了吗？	It's raining out. Did you bring an umbrella?	Está lloviendo afuera, ¿trajiste paraguas?
h3p291	那把伞是谁的？	Whose umbrella is that?	¿De quién es ese paraguas?
h3p292	你在上网吗？	Are you online?	¿Estás conectado a internet?
h3p293	你又上网了，不和我玩吗？	You're online again. Aren't you going to play with me?	Otra vez estás en internet, ¿no vas a jugar conmigo?
h3p294	你别生气，我不是故意的。	Don't be angry. I didn't mean to.	No te enojes, no lo hice a propósito.
h3p295	我生气了！你为什么把我放下？	I'm angry! Why did you put me down?	¡Estoy enojado! ¿Por qué me bajaste?
h3p296	外面有很大的声音，我有点儿怕。	There's a loud noise outside. I'm a little scared.	Afuera hay un ruido muy fuerte, tengo un poco de miedo.
h3p297	你的声音真好听。	Your voice is really nice.	Tu voz es muy bonita.
h3p298	这个世界真大啊！	This world is so big!	¡Qué grande es este mundo!
h3p299	我想看看外面的世界。	I want to see the world outside.	Quiero ver el mundo de afuera.
h3p300	我想试一试，可以吗？	I'd like to give it a try. May I?	Quiero intentarlo, ¿puedo?
h3p301	这个我能试吗？	Can I try this?	¿Puedo probar esto?
h3p302	你最近是不是瘦了？	Have you lost weight lately?	¿Has adelgazado últimamente?
h3p303	叔叔今天来看你了吗？	Did your uncle come to see you today?	¿Hoy vino tu tío a verte?
h3p305	这里好舒服，我想睡了。	It's so comfortable here. I feel sleepy.	Qué cómodo se está aquí, me está dando sueño.
h3p306	这么高的树，我上不去。	I can't climb a tree that tall.	No puedo subir a un árbol tan alto.
h3p307	树下面有很多小鸟。	There are lots of little birds under the tree.	Debajo del árbol hay muchos pajaritos.
```
