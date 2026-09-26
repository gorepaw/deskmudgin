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
h3p061	太阳从东边出来了。	The sun is rising from the east.	El sol sale por el este.
h3p062	冬天太冷了，我不想出门。	Winter is too cold, I don't want to go out.	El invierno es muy frío y no quiero salir.
h3p063	我最喜欢的动物是猫。	My favorite animal is the cat.	Mi animal favorito es el gato.
h3p064	我的腿很短。	My legs are short.	Mis piernas son cortas.
h3p065	这段路不太远。	This stretch of road isn't far.	Este tramo del camino no queda muy lejos.
h3p066	你每天锻炼吗？	Do you exercise every day?	¿Haces ejercicio todos los días?
h3p067	今天天气多么好啊！	What lovely weather today!	¡Qué buen tiempo hace hoy!
h3p068	我好饿啊，想吃面包。	I'm so hungry. I want bread.	Tengo mucha hambre, quiero pan.
h3p069	我想去，而你不想去。	I want to go, but you don't.	Yo quiero ir, pero tú no.
h3p070	我有两只大耳朵。	I have two big ears.	Tengo dos orejas grandes.
h3p071	你发烧了吗？	Do you have a fever?	¿Tienes fiebre?
h3p072	我好像发烧了，头很疼。	I think I have a fever. My head hurts.	Creo que tengo fiebre, me duele mucho la cabeza.
h3p073	你发现了什么？	What did you find?	¿Qué descubriste?
h3p074	在家很方便，什么都有。	It's convenient at home, there's everything.	En casa es cómodo, hay de todo.
h3p075	你把杯子放在哪儿了？	Where did you put the cup?	¿Dónde pusiste el vaso?
h3p076	你放心，我会在家等你。	Rest assured, I'll wait for you at home.	Quédate tranquilo, te esperaré en casa.
h3p077	现在几点了？还差五分十二点。	What time is it? Five to twelve.	¿Qué hora es? Faltan cinco para las doce.
h3p078	你发给我的邮件我看到了。	I saw the email you sent me.	Vi el correo que me enviaste.
h3p079	你在办公室累不累？	Are you tired at the office?	¿Te cansas en la oficina?
h3p080	好舒服啊，再来一下！	That feels great, do it again!	¡Qué rico se siente, hazlo otra vez!
h3p081	啊，你把我放下来了！	Ah, you put me down!	¡Ah, me bajaste!
h3p082	我一个人在家，好安静啊。	I'm home alone. It's so quiet.	Estoy solo en casa, qué tranquilo está todo.
h3p083	你怎么才来？我等了好久。	Why did you only just come? I've waited so long.	¿Por qué llegas hasta ahora? Te esperé mucho tiempo.
h3p084	我好像迟到了，快跑！	I think I'm late, run!	Creo que llego tarde, ¡corre!
h3p085	啊，天亮了吗？	Ah, is it morning already?	Ah, ¿ya amaneció?
h3p086	别把我放在冰箱里！	Don't put me in the fridge!	¡No me pongas en el refrigerador!
h3p087	你带我去参加比赛吧！	Take me to the match!	¡Llévame a la competencia!
h3p088	你的成绩怎么样？	How were your grades?	¿Cómo te fue en tus calificaciones?
h3p089	我想搬到北方去住。	I want to move to the north.	Quiero mudarme a vivir al norte.
h3p090	这个包又大又重。	This bag is big and heavy.	Esta bolsa es grande y pesada.
h3p091	超市里有很多吃的。	There's a lot to eat at the supermarket.	En el supermercado hay mucho para comer.
h3p092	你的鼻子和耳朵都红了。	Your nose and ears are both red.	Tienes la nariz y las orejas rojas.
h3p093	你打算几点睡觉？	When do you plan to go to bed?	¿A qué hora piensas dormir?
h3p094	我的爱好是看地上的草。	My hobby is watching the grass on the ground.	Mi pasatiempo es mirar el pasto del suelo.
h3p095	这里比较安静，我喜欢。	It's fairly quiet here, I like it.	Aquí es bastante tranquilo, me gusta.
h3p096	别人都说我很矮。	Everyone says I'm short.	Todos dicen que soy bajito.
h3p097	下班了，你快回家吧。	Work's over, come home soon.	Ya terminó el trabajo, vuelve pronto a casa.
h3p098	我在家里等你，你别担心。	I'll wait at home, don't worry.	Te espero en casa, no te preocupes.
h3p099	再见，路上要小心。	Bye, be careful on the way.	Adiós, ten cuidado en el camino.
h3p100	你才走了半个小时，我就想你了。	You've only been gone half an hour and I miss you already.	Solo llevas media hora fuera y ya te extraño.
h3p101	厨房的灯还亮着。	The kitchen light is still on.	La luz de la cocina todavía está encendida.
h3p102	我想变得更聪明。	I want to become smarter.	Quiero volverme más inteligente.
h3p103	今天我必须锻炼一下。	Today I have to exercise.	Hoy tengo que hacer ejercicio.
h3p104	我们一起打扫房间吧。	Let's clean the room together.	Limpiemos juntos el cuarto.
h3p105	春天到了，外面有很多小动物。	Spring is here, and there are lots of little animals outside.	Llegó la primavera y afuera hay muchos animalitos.
h3p106	我把蛋糕吃完了，真好吃！	I finished the cake, it was so yummy!	¡Me acabé el pastel, estaba muy rico!
h3p107	这个菜单上的词语我都不懂。	I don't understand any of the words on this menu.	No entiendo ninguna de las palabras de este menú.
h3p108	你的电子邮件写得太短了。	The email you wrote is too short.	Tu correo electrónico quedó demasiado corto.
h3p109	我的成绩进步了，你看！	My grades have improved, look!	¡Mis calificaciones mejoraron, mira!
h3p110	今天的比赛我很开心！	I had so much fun at the match today!	¡Me divertí mucho en la competencia de hoy!
h3p111	你的办法真好！	Your idea is really good!	¡Qué buena idea tienes!
h3p112	你要去哪个地方？	Which place are you going to?	¿A qué lugar vas a ir?
h3p113	这个地铁站人真多。	There are so many people at this subway station.	¡Cuánta gente hay en esta estación de metro!
h3p114	我在冰箱里发现了蛋糕！	I found cake in the fridge!	¡Encontré pastel en el refrigerador!
h3p115	我一个人，好想有人帮忙。	I'm all alone, I wish someone would help.	Estoy solo, ojalá alguien me ayudara.
h3p116	我想复习一下昨天的故事。	I want to go over yesterday's story again.	Quiero repasar el cuento de ayer.
h3p117	我刚才洗了脚，现在很干净！	I just washed my feet, and now they're so clean!	Me lavé los pies hace un momento, ¡y ahora están muy limpios!
h3p118	我好像感冒了，头有点儿疼。	I think I've caught a cold. My head hurts a little.	Creo que me resfrié, me duele un poco la cabeza.
h3p119	我对你的手机很感兴趣。	I'm really curious about your phone.	Tu teléfono me interesa mucho.
h3p120	刚才有一只鸟从我头上飞过去。	A bird just flew over my head.	Hace un momento un pájaro pasó volando sobre mi cabeza.
```
