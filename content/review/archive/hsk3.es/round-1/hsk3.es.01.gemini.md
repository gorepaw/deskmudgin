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
h3p001	阿姨，你今天来得真早！	Auntie, you're here so early today!	¡Tía, hoy llegaste muy temprano!
h3p002	啊，你回来了！	Ah, you're back!	¡Ah, ya volviste!
h3p003	我个子太矮，拿不到桌上的包。	I'm too short to get the bag on the table.	Soy demasiado bajito y no alcanzo la bolsa que está sobre la mesa.
h3p004	你的爱好是什么？	What's your hobby?	¿Cuál es tu pasatiempo?
h3p005	我的爱好是睡觉。	My hobby is sleeping.	Mi pasatiempo es dormir.
h3p006	这里好安静，我想睡觉了。	It's so quiet here. I feel like sleeping.	Qué tranquilo está esto. Me dan ganas de dormir.
h3p007	请你把我放在灯下面。	Please put me under the light.	Por favor, ponme debajo de la lámpara.
h3p008	你今天几点上班？	What time do you start work today?	¿A qué hora empiezas a trabajar hoy?
h3p009	我们班的同学都很好。	Everyone in our class is nice.	Todos los compañeros de nuestra clase son muy buenos.
h3p010	别搬我，我很重！	Don't move me, I'm heavy!	¡No me muevas, soy muy pesado!
h3p011	我只吃了半个蛋糕。	I only ate half a cake.	Solo comí medio pastel.
h3p012	我没有办法，只好等你。	I have no choice but to wait for you.	No tengo otra opción, tendré que esperarte.
h3p013	你的办公室大不大？	Is your office big?	¿Es grande tu oficina?
h3p014	你能帮忙拿一下这个吗？	Can you help me carry this?	¿Me ayudas a llevar esto?
h3p015	你的包里有好吃的吗？	Is there anything tasty in your bag?	¿Tienes algo rico en tu bolsa?
h3p016	我吃饱了，想睡觉。	I'm full and I want to sleep.	Ya me llené y quiero dormir.
h3p017	我吃得好饱啊！	I'm so full!	¡Qué lleno estoy!
h3p018	我想去北方看雪。	I want to go to the north to see snow.	Quiero ir al norte a ver la nieve.
h3p019	你把我拿起来了！	You picked me up!	¡Me levantaste!
h3p020	我的鼻子有点儿冷。	My nose is a bit cold.	Tengo la nariz un poco fría.
h3p021	今天比较冷，你多穿点儿。	It's rather cold today, so wear more.	Hoy hace bastante frío, abrígate más.
h3p022	你的比赛什么时候开始？	When does your match start?	¿Cuándo empieza tu competencia?
h3p023	你的笔记本可以借我吗？	Can I borrow your notebook?	¿Me prestas tu cuaderno?
h3p024	你必须早点儿睡觉。	You must go to bed early.	Tienes que acostarte temprano.
h3p025	天气有变化，要下雨了。	The weather is changing. It's going to rain.	El tiempo está cambiando y va a llover.
h3p026	别人都走了，只有我在这儿。	Everyone else has gone. Only I'm here.	Los demás ya se fueron, solo estoy yo aquí.
h3p027	冰箱里有蛋糕吗？	Is there any cake in the fridge?	¿Hay pastel en el refrigerador?
h3p028	我不但饿，而且很累。	I'm not only hungry, I'm tired too.	No solo tengo hambre, además estoy muy cansado.
h3p029	把菜单给我看看吧。	Let me see the menu.	Enséñame el menú, por favor.
h3p030	你怎么才回来？	Why are you only just back?	¿Por qué llegas tan tarde?
h3p031	我想参加你的比赛。	I want to take part in your match.	Quiero participar en tu competencia.
h3p032	外面的草绿了。	The grass outside has turned green.	El pasto de afuera se puso verde.
h3p033	你住在几层？	Which floor do you live on?	¿En qué piso vives?
h3p034	我的成绩比上次差。	My grade is worse than last time.	Mi calificación es peor que la de la vez pasada.
h3p035	你带我去超市，好吗？	Will you take me to the supermarket?	¿Me llevas al supermercado, sí?
h3p036	你的衬衫真好看。	Your shirt looks really nice.	Tu camisa te queda muy bien.
h3p037	我今天的成绩不错！	My grade today is pretty good!	¡Mi calificación de hoy está bastante bien!
h3p038	这个城市很大，也很漂亮。	This city is big and pretty.	Esta ciudad es grande y también muy bonita.
h3p039	我快迟到了，你快点儿！	I'm going to be late, hurry up!	¡Ya casi llego tarde, apúrate!
h3p040	你怎么又迟到了？	Why are you late again?	¿Por qué llegas tarde otra vez?
h3p041	你终于出现了！	You finally showed up!	¡Por fin apareces!
h3p042	除了你，我谁也不想见。	I don't want to see anyone but you.	Aparte de ti, no quiero ver a nadie.
h3p043	厨房里有好吃的东西。	There's something tasty in the kitchen.	Hay algo rico en la cocina.
h3p044	春天到了，我好高兴！	Spring is here, I'm so happy!	¡Llegó la primavera, qué contento estoy!
h3p045	这个词语是什么意思？	What does this word mean?	¿Qué significa esta palabra?
h3p046	你真聪明！	You're so clever!	¡Qué inteligente eres!
h3p047	我打扫得很干净吧？	I cleaned it really well, didn't I?	Limpié muy bien, ¿verdad?
h3p048	你今天打算做什么？	What do you plan to do today?	¿Qué piensas hacer hoy?
h3p049	我打算去公园玩儿。	I plan to go and play in the park.	Pienso ir a jugar al parque.
h3p050	你出门要带手机。	Take your phone when you go out.	Lleva tu teléfono cuando salgas.
h3p051	我很担心你。	I'm worried about you.	Estoy preocupado por ti.
h3p052	我想吃蛋糕，想吃很多。	I want cake, a lot of it.	Quiero pastel, mucho pastel.
h3p053	你饿了吗？当然要吃饭！	Are you hungry? Of course you need to eat!	¿Tienes hambre? ¡Claro que tienes que comer!
h3p054	我慢慢地走过去。	I walk over slowly.	Camino hacia allá despacito.
h3p055	把灯关了吧，我要睡觉了。	Turn off the light, I'm going to sleep.	Apaga la luz, que me voy a dormir.
h3p056	这个地方真漂亮。	This place is really pretty.	Este lugar es muy bonito.
h3p057	你坐地铁去上班吗？	Do you take the subway to work?	¿Vas al trabajo en metro?
h3p058	你看得懂这张地图吗？	Can you read this map?	¿Entiendes este mapa?
h3p059	电梯坏了，只能走楼梯。	The elevator is broken, so we have to take the stairs.	El ascensor está descompuesto, solo se puede ir por las escaleras.
h3p060	你有新的电子邮件！	You've got a new email!	¡Tienes un correo electrónico nuevo!
```
