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
p001	你好！	Hello!	¡Hola!
p002	你好吗？	How are you?	¿Cómo estás?
p003	喂！	Hey! / Hello!	¡Oye!
p004	喂，你好！	Hey, hello!	¡Oye, hola!
p005	我在这儿！	I'm here!	¡Estoy aquí!
p006	你在哪儿？	Where are you?	¿Dónde estás?
p007	你去哪儿？	Where are you going?	¿Adónde vas?
p008	你回来了！	You're back!	¡Ya volviste!
p009	你来了！	You came!	¡Viniste!
p010	我很好，谢谢。你呢？	I'm fine, thanks. And you?	Estoy bien, gracias. ¿Y tú?
p011	你叫什么名字？	What's your name?	¿Cómo te llamas?
p012	我认识你！	I know you!	¡Te conozco!
p013	你是谁？	Who are you?	¿Quién eres?
p014	下午好！	Good afternoon!	¡Buenas tardes!
p015	你今天怎么样？	How are you today?	¿Cómo estás hoy?
p016	你在做什么？	What are you doing?	¿Qué estás haciendo?
p017	你在看什么？	What are you looking at?	¿Qué estás mirando?
p018	你是我的朋友。	You are my friend.	Eres mi amigo.
p019	我们是朋友。	We are friends.	Somos amigos.
p020	再见！	Goodbye!	¡Adiós!
p021	明天见！	See you tomorrow!	¡Nos vemos mañana!
p022	下午见！	See you this afternoon!	¡Nos vemos esta tarde!
p023	我回家了。	I'm going home.	Me voy a casa.
p024	我去睡觉了。	I'm going to sleep.	Me voy a dormir.
p025	我想吃东西。	I want to eat something.	Quiero comer algo.
p026	我想吃饭。	I want to eat.	Quiero comer.
p027	我想吃米饭。	I want to eat rice.	Quiero comer arroz.
p028	我想吃苹果。	I want to eat an apple.	Quiero comer una manzana.
p029	我想吃水果。	I want to eat fruit.	Quiero comer fruta.
p030	我没有吃饭。	I haven't eaten.	No he comido.
p031	我今天没有吃饭。	I haven't eaten today.	Hoy no he comido.
p032	什么时候吃饭？	When do we eat?	¿Cuándo comemos?
p033	中午吃什么？	What's for lunch?	¿Qué comemos al mediodía?
p034	你有苹果吗？	Do you have an apple?	¿Tienes una manzana?
p035	你有米饭吗？	Do you have rice?	¿Tienes arroz?
p036	我想喝水。	I want to drink water.	Quiero tomar agua.
p037	我想喝茶。	I want to drink tea.	Quiero tomar té.
p038	我很想吃东西。	I really want to eat something.	Tengo muchas ganas de comer algo.
p039	我想吃很多东西。	I want to eat lots of things.	Quiero comer muchas cosas.
p040	这个能吃吗？	Can this be eaten?	¿Esto se puede comer?
p041	我能吃这个吗？	May I eat this?	¿Puedo comer esto?
p042	你吃饭了吗？	Have you eaten?	¿Ya comiste?
p043	我们去饭店吃饭。	We're going to a restaurant to eat.	Vamos a un restaurante a comer.
p044	我想睡觉。	I want to sleep.	Quiero dormir.
p045	我很想睡觉。	I really want to sleep.	Tengo muchas ganas de dormir.
p046	我不想工作。	I don't want to work.	No quiero trabajar.
p047	现在几点了？	What time is it now?	¿Qué hora es ahora?
p048	我今天做了很多工作。	I worked a lot today.	Hoy trabajé mucho.
p049	我想回家睡觉。	I want to go home and sleep.	Quiero ir a casa a dormir.
p050	我不想读书。	I don't want to study.	No quiero estudiar.
p051	我想坐一下。	I want to sit for a bit.	Quiero sentarme un rato.
p052	我睡觉了。	I'm going to bed.	Me voy a la cama.
p053	现在几点？	What time is it?	¿Qué hora es?
p054	今天是星期几？	What day is it today?	¿Qué día es hoy?
p055	你好！我在这儿。	Hello! I'm here.	¡Hola! Estoy aquí.
p056	我很高兴！	I'm very happy!	¡Estoy muy feliz!
p057	太好了！	Great!	¡Qué bien!
p058	很好！	Very good!	¡Muy bien!
p059	我很好。	I'm fine.	Estoy bien.
p060	我喜欢你。	I like you.	Me gustas.
p061	我爱你。	I love you.	Te amo.
p062	我喜欢这儿。	I like it here.	Me gusta aquí.
p063	今天我很高兴。	I'm happy today.	Hoy estoy feliz.
p064	我们都很高兴。	We're all happy.	Todos estamos felices.
p065	谢谢你！	Thank you!	¡Muchas gracias!
p066	谢谢！	Thanks!	¡Gracias!
p067	我喜欢这个。	I like this.	Me gusta esto.
p068	你很好。	You're very nice.	Eres muy bueno.
p069	你是我的朋友！	You're my friend!	¡Eres mi amigo!
p070	我爱你！	I love you!	¡Te amo!
p071	好吃！	Tasty!	¡Qué rico!
p072	很好吃！	Very tasty!	¡Muy rico!
p073	太好吃了！	So tasty!	¡Está riquísimo!
p074	谢谢，很好吃！	Thanks, it's very tasty!	Gracias, ¡está muy rico!
p075	我喜欢吃这个。	I like eating this.	Me gusta comer esto.
p076	我吃了很多。	I ate a lot.	Comí mucho.
```
