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
h2p301	我要这个。	I want this one.	Quiero este.
h2p302	我什么都不要。	I don't want anything.	No quiero nada.
h2p303	我们一起去吧！	Let's go together!	¡Vamos juntos!
h2p304	我们一起吃饭吧。	Let's eat together.	Comamos juntos.
h2p305	我也想去。	I want to go too.	Yo también quiero ir.
h2p306	你也喜欢猫吗？	Do you like cats too?	¿A ti también te gustan los gatos?
h2p307	他也是学生。	He's a student too.	Él también es estudiante.
h2p308	就是这个！	This is the one!	¡Es este!
h2p309	我就在这儿。	I'm right here.	Estoy justo aquí.
h2p310	我就来！	I'm coming right away!	¡Ya voy!
h2p311	他还没来。	He hasn't come yet.	Él todavía no ha llegado.
h2p312	还有问题吗？	Any more questions?	¿Hay más preguntas?
h2p313	我还是学生。	I'm still a student.	Todavía soy estudiante.
h2p314	对不起，我错了。	Sorry, I was wrong.	Lo siento, me equivoqué.
h2p315	你错了。	You're wrong.	Estás equivocado.
h2p316	没错！	That's right!	¡Así es!
h2p317	这个对吗？	Is this right?	¿Esto está bien?
h2p318	你到哪儿了？	Where are you now?	¿Dónde estás ahora?
h2p319	我们到家了。	We're home.	Ya llegamos a casa.
h2p320	我从学校回来了。	I'm back from school.	Ya volví de la escuela.
h2p321	你往左边看。	Look to the left.	Mira hacia la izquierda.
h2p322	左边是我家。	My home is on the left.	Mi casa está a la izquierda.
h2p323	你说话太快了。	You talk too fast.	Hablas demasiado rápido.
h2p324	请说慢一点儿。	Please speak a bit more slowly.	Habla más despacio, por favor.
h2p325	别说话！	Don't talk!	¡No hables!
h2p326	他不想说话。	He doesn't want to talk.	No quiere hablar.
h2p327	我没听懂。	I didn't understand what I heard.	No entendí lo que oí.
h2p328	你听懂了吗？	Did you understand?	¿Entendiste lo que oíste?
h2p329	我听不懂。	I can't understand.	No entiendo lo que dices.
h2p330	我唱得不好。	I don't sing well.	No canto bien.
h2p331	你唱歌唱得真好！	You sing really well!	¡Cantas muy bien!
h2p332	小猫正在睡觉。	The kitten is sleeping.	El gatito está durmiendo.
h2p333	狗在外面跑。	The dog is running around outside.	El perro está corriendo afuera.
h2p334	送你一个苹果。	Here, an apple for you.	Toma, una manzana para ti.
h2p335	这是我送你的。	This is a gift from me to you.	Esto es un regalo mío para ti.
h2p336	谢谢你送我这个。	Thank you for giving me this.	Gracias por regalarme esto.
h2p337	妈妈不让我出去玩。	Mum won't let me go out to play.	Mamá no me deja salir a jugar.
h2p338	让我看看！	Let me see!	¡Déjame ver!
h2p339	让我想想。	Let me think.	Déjame pensar.
h2p340	我们玩得很高兴。	We had a great time.	La pasamos muy bien.
h2p341	你想玩什么？	What do you want to play?	¿Qué quieres jugar?
h2p342	别玩手机了！	Stop playing on your phone!	¡Deja de jugar con el celular!
h2p343	你每天几点睡觉？	What time do you go to bed every day?	¿A qué hora te duermes todos los días?
h2p344	我今天起得很早。	I got up very early today.	Hoy me levanté muy temprano.
h2p345	你起床了吗？	Are you up?	¿Ya te levantaste?
h2p346	快起床！	Get up!	¡Levántate ya!
h2p347	他还在睡觉。	He's still sleeping.	Todavía está durmiendo.
h2p348	今天晚上你做什么？	What are you doing tonight?	¿Qué vas a hacer esta noche?
h2p349	我晚上要学习。	I have to study tonight.	Tengo que estudiar esta noche.
h2p350	下午我们去跑步吧。	Let's go running this afternoon.	Vamos a correr esta tarde.
h2p351	每个星期我都去游泳。	I go swimming every week.	Voy a nadar todas las semanas.
h2p352	我们学校有很多教室。	Our school has a lot of classrooms.	Nuestra escuela tiene muchos salones.
h2p353	我的房间很小。	My room is very small.	Mi habitación es muy pequeña.
h2p354	你的房间真大！	Your room is really big!	¡Tu habitación es enorme!
h2p355	我没见过雪。	I've never seen snow.	Nunca he visto nieve.
h2p356	雪是白的。	Snow is white.	La nieve es blanca.
h2p357	西瓜里面是红的。	Watermelon is red inside.	Por dentro, la sandía es roja.
h2p358	你的眼睛是什么颜色？	What colour are your eyes?	¿De qué color son tus ojos?
h2p359	他穿着红衣服。	He's wearing red clothes.	Él lleva puesta ropa roja.
h2p360	我今天穿什么？	What shall I wear today?	¿Qué me pongo hoy?
h2p361	这件衣服太长了。	This piece of clothing is too long.	Esta prenda es demasiado larga.
h2p362	他很高。	He is tall.	Él es alto.
h2p363	我不高，但是我很快。	I'm not tall, but I'm fast.	No soy alto, pero soy rápido.
h2p364	虽然我很小，但是我吃得很多。	Although I'm small, I eat a lot.	Aunque soy pequeño, como mucho.
h2p365	因为今天下雪，所以我们不去学校。	Because it's snowing today, we're not going to school.	Como hoy nieva, no vamos a la escuela.
h2p366	你为什么不高兴？	Why aren't you happy?	¿Por qué no estás feliz?
h2p367	你为什么在这儿？	Why are you here?	¿Por qué estás aquí?
h2p368	他为什么还没来？	Why hasn't he come yet?	¿Por qué todavía no ha llegado?
h2p369	你怎么知道？	How do you know?	¿Cómo lo sabes?
h2p370	我知道你是谁。	I know who you are.	Sé quién eres.
h2p371	你知道他在哪儿吗？	Do you know where he is?	¿Sabes dónde está él?
h2p372	我不知道怎么说。	I don't know how to say it.	No sé cómo decirlo.
h2p373	你觉得怎么样？	What do you think?	¿Qué te parece?
h2p374	我觉得有点儿冷。	I feel a little cold.	Siento un poco de frío.
h2p375	这个问题很好。	That's a good question.	Esta es una buena pregunta.
```
