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
h2p001	我想吃面条。	I want to eat noodles.	Quiero comer fideos.
h2p002	我想吃鸡蛋。	I want to eat eggs.	Quiero comer huevos.
h2p003	我想喝牛奶。	I want to drink milk.	Quiero tomar leche.
h2p004	你有西瓜吗？	Do you have any watermelon?	¿Tienes sandía?
h2p005	我想吃羊肉。	I want to eat lamb.	Quiero comer cordero.
h2p006	我要吃饭！	I want to eat!	¡Quiero comer!
h2p007	我们什么时候吃饭？还要等吗？	When do we eat? Do we still have to wait?	¿Cuándo comemos? ¿Todavía hay que esperar?
h2p008	有没有好吃的？	Is there anything tasty?	¿Hay algo rico?
h2p009	给我一点儿吃的吧。	Give me a little something to eat.	Dame algo de comer.
h2p010	这儿有鱼吗？	Is there any fish here?	¿Hay pescado aquí?
h2p011	我已经一天没吃东西了。	I haven't eaten anything all day.	Ya llevo un día sin comer nada.
h2p012	快给我吃的！	Quick, give me something to eat!	¡Dame de comer, rápido!
h2p013	我可以吃这个吗？	Can I eat this?	¿Puedo comer esto?
h2p014	还有牛奶吗？	Is there any milk left?	¿Queda leche?
h2p015	饭准备好了吗？	Is the food ready?	¿Ya está lista la comida?
h2p016	我想吃苹果和西瓜。	I want to eat apples and watermelon.	Quiero comer manzanas y sandía.
h2p017	我最喜欢吃鱼。	I like eating fish the most.	Lo que más me gusta es comer pescado.
h2p018	我要喝咖啡。	I want coffee.	Quiero tomar café.
h2p019	我等了很长时间了。	I've been waiting a long time.	Llevo mucho tiempo esperando.
h2p020	中午我们吃面条吧。	Let's have noodles for lunch.	Comamos fideos al mediodía.
h2p021	您好！	Hello! (polite)	¡Hola! (cortés)
h2p022	欢迎！	Welcome!	¡Bienvenido!
h2p023	欢迎你来！	Glad you came!	¡Qué bueno que viniste!
h2p024	欢迎回来！	Welcome back!	¡Bienvenido de vuelta!
h2p025	早上好！	Good morning!	¡Buenos días!
h2p026	晚上好！	Good evening!	¡Buenas noches!
h2p027	你身体好吗？	How is your health?	¿Cómo está tu salud?
h2p028	你最近怎么样？	How have you been lately?	¿Cómo has estado últimamente?
h2p029	大家好！	Hello, everyone!	¡Hola a todos!
h2p030	你也在这儿！	You're here too!	¡Tú también estás aquí!
h2p031	你今天忙吗？	Are you busy today?	¿Estás ocupado hoy?
h2p032	您贵姓？	What is your surname? (polite)	¿Cuál es su apellido? (cortés)
h2p033	你睡得好吗？	Did you sleep well?	¿Dormiste bien?
h2p034	你还在吗？	Are you still there?	¿Sigues ahí?
h2p035	我到了！	I've arrived!	¡Ya llegué!
h2p036	这个真好吃！	This is really tasty!	¡Esto está muy rico!
h2p037	这个没有鱼好吃。	This isn't as tasty as fish.	Esto no es tan rico como el pescado.
h2p038	我吃完了！	I've finished eating!	¡Ya terminé de comer!
h2p039	我还要吃。	I want to eat more.	Quiero comer más.
h2p040	真好吃！	So tasty!	¡Qué rico!
h2p041	我正在吃东西呢。	I'm eating right now.	Estoy comiendo ahora mismo.
h2p042	别看我，我在吃。	Don't look at me, I'm eating.	No me mires, estoy comiendo.
h2p043	这个比苹果好吃。	This is tastier than apples.	Esto es más rico que las manzanas.
h2p044	我吃了两个。	I ate two.	Comí dos.
h2p045	别吃那个！	Don't eat that!	¡No comas eso!
h2p046	我累了。	I'm tired.	Estoy cansado.
h2p047	我太累了。	I'm too tired.	Estoy demasiado cansado.
h2p048	我想休息一下。	I want to rest for a bit.	Quiero descansar un rato.
h2p049	我要去睡觉了。	I'm going to bed.	Me voy a dormir.
h2p050	我已经很累了。	I'm already very tired.	Ya estoy muy cansado.
h2p051	我今天想早点儿休息。	I want to rest early today.	Hoy quiero descansar más temprano.
h2p052	让我休息一下吧。	Let me rest for a bit.	Déjame descansar un rato.
h2p053	我今天非常累。	I'm extremely tired today.	Hoy estoy súper cansado.
h2p054	我不想起床。	I don't want to get up.	No quiero levantarme.
h2p055	别说话，我想睡觉。	Don't talk, I want to sleep.	No hables, quiero dormir.
h2p056	我走不动了。	I can't walk any further.	Ya no puedo caminar más.
h2p057	我们休息一下吧。	Let's take a break.	Descansemos un rato.
h2p058	我很快乐！	I'm very happy!	¡Estoy muy feliz!
h2p059	今天真好！	Today is really great!	¡Hoy es un día genial!
h2p060	我非常高兴！	I'm extremely happy!	¡Estoy súper feliz!
h2p061	我最喜欢你了！	I like you the most!	¡Me gustas más que nada!
h2p062	你真好！	You're really nice!	¡Eres muy bueno!
h2p063	我觉得很好。	I feel great.	Me siento muy bien.
h2p064	我想唱歌！	I want to sing!	¡Quiero cantar!
h2p065	我们一起跳舞吧！	Let's dance together!	¡Bailemos juntos!
h2p066	你看，我在笑！	Look, I'm smiling!	¡Mira, estoy sonriendo!
h2p067	我每天都很快乐。	I'm happy every day.	Soy feliz todos los días.
h2p068	生日快乐！	Happy birthday!	¡Feliz cumpleaños!
h2p069	大家都去哪儿了？	Where did everyone go?	¿Adónde se fueron todos?
h2p070	没有人和我玩。	Nobody plays with me.	Nadie juega conmigo.
h2p071	谁来和我玩？	Who will come and play with me?	¿Quién viene a jugar conmigo?
h2p072	我等你很长时间了。	I've been waiting for you for a long time.	Llevo mucho tiempo esperándote.
h2p073	你什么时候回来？我等你。	When are you coming back? I'll wait for you.	¿Cuándo vuelves? Te espero.
h2p074	我一个人，真没意思。	On my own, it's really boring.	Estoy solo, qué aburrido.
h2p075	你们都很忙吗？	Are you all busy?	¿Están todos ocupados?
```
