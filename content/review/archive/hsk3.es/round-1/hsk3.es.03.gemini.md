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
h3p121	天阴了，我担心会下雨。	The sky has clouded over. I'm worried it will rain.	El cielo se nubló y me preocupa que llueva.
h3p122	我想跟你一起去公园。	I want to go to the park with you.	Quiero ir contigo al parque.
h3p123	我最喜欢你的手，很舒服。	I like your hands best. They feel nice.	Tus manos son lo que más me gusta, se sienten muy bien.
h3p124	公园里的花开了，好看极了！	The flowers in the park are out. They're so pretty!	¡Las flores del parque ya se abrieron, están preciosas!
h3p125	给我讲一个故事吧。	Tell me a story.	Cuéntame un cuento.
h3p126	外面在刮风，我不想出去。	It's windy outside. I don't want to go out.	Afuera hay viento y no quiero salir.
h3p127	请把灯关了，我想睡觉。	Please turn off the light. I want to sleep.	Por favor, apaga la luz, quiero dormir.
h3p128	你和我的关系最好了！	You and I are the best of friends!	¡Tú y yo somos los mejores amigos!
h3p129	谢谢你这么关心我。	Thank you for caring about me so much.	Gracias por preocuparte tanto por mí.
h3p130	关于明天，你有什么打算？	What are your plans for tomorrow?	Sobre mañana, ¿qué planes tienes?
h3p131	你去过几个国家？	How many countries have you been to?	¿A cuántos países has ido?
h3p132	过去我住在水里。	I used to live in the water.	Antes yo vivía en el agua.
h3p133	你想吃蛋糕还是面包？	Would you like cake or bread?	¿Quieres pastel o pan?
h3p134	外面下大雨，我好害怕。	It is pouring outside. I am so scared.	Afuera llueve muy fuerte, tengo mucho miedo.
h3p135	黑板上写的字，我看不懂。	I can't read what's written on the blackboard.	No entiendo lo que está escrito en el pizarrón.
h3p136	后来我又睡着了。	Afterwards I fell asleep again.	Después me volví a dormir.
h3p137	你的护照在哪儿？	Where's your passport?	¿Dónde está tu pasaporte?
h3p138	我想把钱花在好吃的东西上。	I want to spend my money on tasty things.	Quiero gastar mi dinero en cosas ricas.
h3p139	我想画一只大鱼。	I want to draw a big fish.	Quiero dibujar un pez grande.
h3p140	我的东西坏了，你能帮我吗？	Something of mine is broken. Can you help me?	Se me descompuso una cosa, ¿puedes ayudarme?
h3p141	这里的环境真好，很安静。	It's lovely here. So quiet.	El ambiente de aquí es muy bueno, muy tranquilo.
h3p142	我想换一个新的家。	I want to switch to a new home.	Quiero cambiarme a una casa nueva.
h3p143	你去过黄河吗？	Have you ever been to the Yellow River?	¿Has ido al río Amarillo?
h3p144	你今天有会议吗？别忘了我！	Do you have a meeting today? Don't forget about me!	¿Tienes una reunión hoy? ¡No te olvides de mí!
h3p145	茶或者果汁，我都可以喝。	Tea or juice, either is fine with me.	Té o jugo, cualquiera de los dos me parece bien.
h3p146	我几乎每天都想你。	I think of you almost every day.	Casi todos los días pienso en ti.
h3p147	这是个好机会，我们出去玩吧！	This is a great chance. Let's go out and play!	Es una buena oportunidad, ¡salgamos a jugar!
h3p148	今天出太阳了，我高兴极了！	The sun is out today. I'm so happy!	Hoy salió el sol, ¡estoy contentísimo!
h3p149	你还记得我的名字吗？	Do you still remember my name?	¿Todavía te acuerdas de mi nombre?
h3p150	我最喜欢的季节是春天。	Spring is my favorite season.	Mi estación favorita es la primavera.
h3p151	让我检查一下你的包里有没有吃的。	Let me check whether there's any food in your bag.	Déjame revisar si hay algo de comer en tu bolsa.
h3p152	这个很简单，我也会！	This is easy. Even I can do it!	Esto es fácil, ¡hasta yo puedo hacerlo!
h3p153	多吃水果，身体才健康。	Eat more fruit and you'll be healthy.	Come más fruta y así tendrás buena salud.
h3p154	明天见面时，我有东西要给你看。	When we meet tomorrow, I have something to show you.	Cuando nos veamos mañana, tengo algo que mostrarte.
h3p155	我给你讲讲今天的事情吧。	Let me tell you what happened today.	Te voy a contar lo que pasó hoy.
h3p156	你教我说话，好不好？	Will you teach me to talk?	¿Me enseñas a hablar, sí?
h3p157	我喜欢坐在桌子的一角。	I like sitting on the corner of the table.	Me gusta sentarme en una esquina de la mesa.
h3p158	我的脚好冷。	My feet are so cold.	Tengo los pies muy fríos.
h3p159	你能来接我吗？	Can you come and pick me up?	¿Puedes venir a recogerme?
h3p160	电视里有一个好看的节目。	There's a good show on TV.	En la televisión hay un programa muy bueno.
h3p161	今天是节日，我们吃好吃的吧！	It's a holiday today. Let's eat something yummy!	Hoy es fiesta, ¡comamos algo rico!
h3p162	两只小鱼要结婚了！	Two little fish are getting married!	¡Dos pececitos se van a casar!
h3p163	会议什么时候结束？	When does the meeting end?	¿Cuándo termina la reunión?
h3p164	我不会做这个，你能帮我解决吗？	I can't do this. Can you sort it out for me?	No sé hacer esto, ¿puedes ayudarme a resolverlo?
h3p165	我可以借你的椅子坐一下吗？	Can I borrow your chair for a bit?	¿Puedo tomar prestada tu silla para sentarme un rato?
h3p166	你为什么经常不理我？	Why do you so often ignore me?	¿Por qué me ignoras tan seguido?
h3p167	我看到一只猫经过门口。	I saw a cat pass by the door.	Vi un gato pasar por la puerta.
h3p168	你的经理今天不高兴吗？	Is your manager in a bad mood today?	¿Tu gerente no está contento hoy?
h3p169	你走了好久，我一个人好难过。	You have been gone so long. I am so sad on my own.	Llevas mucho tiempo fuera y estoy muy triste solo.
h3p170	这本旧书是我最爱的。	This old book is my favorite.	Este libro viejo es mi favorito.
h3p171	你能教我说这个句子吗？	Can you teach me to say this sentence?	¿Puedes enseñarme a decir esta oración?
h3p172	我决定了，今天不睡觉！	I've decided. I'm not sleeping today!	¡Ya lo decidí, hoy no voy a dormir!
h3p173	你的脸好可爱！	Your face is so cute!	¡Qué linda es tu cara!
h3p174	我渴了，想喝水。	I'm thirsty. I want some water.	Tengo sed, quiero agua.
h3p175	现在是三点一刻。	It's a quarter past three.	Son las tres y cuarto.
h3p176	有客人来了，快去开门！	A guest is here. Go and open the door!	Llegó una visita, ¡ve rápido a abrir la puerta!
h3p177	空调太冷了，我要感冒了。	The air conditioning is too cold. I'm going to catch a cold.	El aire acondicionado está demasiado frío, me voy a resfriar.
h3p178	我想吃一口你的蛋糕。	I'd like a bite of your cake.	Quiero un bocado de tu pastel.
h3p179	你走了，我想哭。	You're leaving, and I want to cry.	Te vas y me dan ganas de llorar.
h3p180	你的裤子真好看。	Your trousers look really nice.	Tu pantalón te queda muy bien.
```
