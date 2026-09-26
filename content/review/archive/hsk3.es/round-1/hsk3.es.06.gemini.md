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
h3p308	你喜欢数学吗？我不太喜欢。	Do you like maths? I don't really.	¿Te gustan las matemáticas? A mí no mucho.
h3p309	我不会做数学题。	I can't do maths problems.	No sé hacer los problemas de matemáticas.
h3p310	你刷牙了吗？	Did you brush your teeth?	¿Te cepillaste los dientes?
h3p311	我今天还没刷牙。	I haven't brushed my teeth yet today.	Hoy todavía no me he cepillado los dientes.
h3p312	你有两双新鞋，真好！	You have two new pairs of shoes. How nice!	Tienes dos pares de zapatos nuevos, ¡qué bien!
h3p313	我的水平还不高，要多练习。	My level isn't high yet. I need to practise more.	Mi nivel todavía no es alto, tengo que practicar más.
h3p314	那位司机开车很快。	That driver drives fast.	Ese conductor maneja rápido.
h3p315	太阳出来了，好热！	The sun is out. So hot!	Salió el sol, ¡qué calor!
h3p316	我喜欢在太阳下睡觉。	I like sleeping in the sun.	Me gusta dormir bajo el sol.
h3p317	今天特别开心！	I'm especially happy today!	¡Hoy estoy especialmente contento!
h3p318	我特别想吃面条。	I really want some noodles.	Tengo muchas ganas de comer fideos.
h3p319	你今天特别好看。	You look extra nice today.	Hoy te ves especialmente bien.
h3p320	我的头有点儿疼。	My head hurts a little.	Me duele un poco la cabeza.
h3p321	别放手！我会疼的！	Don't let go! It'll hurt!	¡No me sueltes! ¡Me va a doler!
h3p322	你想提高汉语水平吗？	Do you want to improve your Chinese?	¿Quieres mejorar tu nivel de chino?
h3p323	我想提高我的水平。	I want to improve my level.	Quiero mejorar mi nivel.
h3p324	你喜欢上体育课吗？	Do you like PE class?	¿Te gusta la clase de educación física?
h3p325	你喜欢体育吗？我们一起运动吧。	Do you like sports? Let us exercise together.	¿Te gustan los deportes? Hagamos ejercicio juntos.
h3p326	这个苹果真甜！	This apple is so sweet!	¡Esta manzana está muy dulce!
h3p327	好甜啊，我还想吃！	So sweet. I want more!	¡Qué dulce, quiero más!
h3p328	你有没有一条新裙子？	Do you have a new skirt?	¿Tienes una falda nueva?
h3p329	有一条小鱼在水里游。	There is a little fish swimming in the water.	Hay un pececito nadando en el agua.
h3p330	你的同事对你好吗？	Are your colleagues good to you?	¿Tus compañeros de trabajo te tratan bien?
h3p331	你同事今天来了吗？	Did your colleague come in today?	¿Vino hoy tu compañero de trabajo?
h3p332	我同意你说的。	I agree with what you said.	Estoy de acuerdo con lo que dijiste.
h3p333	你同意我出去玩吗？	Do you agree to let me go out and play?	¿Estás de acuerdo en que salga a jugar?
h3p334	你的头发好长啊！	Your hair is so long!	¡Qué largo tienes el cabello!
h3p335	我的头发是绿色的，好看吗？	My hair is green. Is it nice?	Mi cabello es verde, ¿se ve bonito?
h3p336	外面突然黑了。	It suddenly got dark outside.	De repente oscureció afuera.
h3p337	我突然想睡觉了。	I suddenly feel like sleeping.	De repente me dieron ganas de dormir.
h3p338	突然有人拿起了我！	Suddenly somebody picked me up!	¡De repente alguien me levantó!
h3p339	你要去图书馆吗？	Are you going to the library?	¿Vas a ir a la biblioteca?
h3p340	图书馆里很安静。	It's very quiet in the library.	En la biblioteca hay mucha tranquilidad.
h3p341	我的腿好累。	My legs are so tired.	Tengo las piernas muy cansadas.
h3p342	我的腿太短了，跑不快。	My legs are too short. I can't run fast.	Mis piernas son demasiado cortas, no puedo correr rápido.
h3p343	你完成作业了吗？	Did you finish your homework?	¿Terminaste la tarea?
h3p344	我完成了今天的练习！	I finished today's practice!	¡Terminé la práctica de hoy!
h3p345	我要一碗热的面条。	I'd like a bowl of hot noodles.	Quiero un tazón de fideos calientes.
h3p346	这碗饭真好吃！	This bowl of rice is so tasty!	¡Este tazón de arroz está muy rico!
h3p348	我等了你一万年！	I've waited ten thousand years for you!	¡Te esperé diez mil años!
h3p349	我的裙子是绿色的，你喜欢吗？	My skirt is green. Do you like it?	Mi falda es verde, ¿te gusta?
h3p350	我又忘记你的名字了，对不起。	I forgot your name again, sorry.	Otra vez olvidé tu nombre, perdón.
h3p351	别忘记给我吃的。	Don't forget to give me something to eat!	No te olvides de darme de comer.
h3p352	为了你，我什么都愿意做。	I'd do anything for you.	Por ti, estoy dispuesto a hacer lo que sea.
h3p353	今天有三位客人来看我。	Three guests came to see me today.	Hoy vinieron tres visitas a verme.
h3p354	我喜欢别的地方的文化。	I like the culture of other places.	Me gusta la cultura de otros lugares.
h3p355	太阳从东边起来，从西边下去。	The sun comes up in the east and goes down in the west.	El sol sale por el este y se pone por el oeste.
h3p356	我已经习惯一个人在这里了。	I'm used to being here by myself now.	Ya me acostumbré a estar aquí solo.
h3p357	早起是个好习惯。	Getting up early is a good habit.	Levantarse temprano es un buen hábito.
h3p358	洗手间在哪里？我想去。	Where's the restroom? I want to go.	¿Dónde está el baño? Quiero ir.
h3p359	你什么时候洗澡？我也想洗。	When do you take a bath? I want one too.	¿Cuándo te bañas? Yo también quiero bañarme.
h3p360	夏天到了，我想去游泳。	Summer is here, and I want to go swimming.	Llegó el verano y quiero ir a nadar.
h3p361	你先吃，我等一会儿。	You eat first, and I'll wait a bit.	Come tú primero, yo espero un ratito.
h3p362	我相信你会回来的。	I believe you'll come back.	Creo que vas a volver.
h3p363	我最爱吃的是香蕉。	What I love to eat most is bananas.	Lo que más me gusta comer son los plátanos.
h3p364	你为什么一直向我笑？	Why do you keep smiling at me?	¿Por qué me sonríes todo el tiempo?
h3p365	我像一条小小的鱼。	I look like a tiny fish.	Me parezco a un pececito.
h3p366	路上小心，早点回来。	Be careful on the road, and come back early.	Ten cuidado en el camino y vuelve temprano.
h3p367	你们的校长今天来了吗？	Did your principal come today?	¿Vino hoy el director de tu escuela?
h3p368	今天的新闻你看了吗？	Did you see today's news?	¿Viste las noticias de hoy?
```
