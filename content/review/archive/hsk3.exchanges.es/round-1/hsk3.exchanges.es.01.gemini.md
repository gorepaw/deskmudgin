These are **Spanish translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is short **conversations** between two creatures; turns are separated by ｜ in the Chinese and " | " everywhere else. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Spanish. It is shown two ways: to someone learning Spanish, as the line to learn, and to someone who reads Spanish, as the meaning of a line in another language — so it must be both correct and natural.

The Spanish should be neutral Latin American Spanish: `tú` for "you", `ustedes` for the plural, no `vosotros`, no regionalisms, with correct accents and ¿¡ punctuation.

For every row, check:
1. Does the Spanish mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Spanish, the way a native speaker would actually put it?
3. Does each reply answer the turn before it? There must be exactly as many " | "-separated parts as the Chinese has ｜-separated turns.

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
h3x001	你饿了吗？｜饿了，我想吃蛋糕。｜厨房里有一个。	Are you hungry? | Yes, I want some cake. | There's one in the kitchen.	¿Tienes hambre? | Sí, quiero pastel. | Hay uno en la cocina.
h3x002	你吃饱了吗？｜还没有，我还想吃香蕉。	Are you full? | Not yet, I still want a banana.	¿Ya estás lleno? | Todavía no, quiero también un plátano.
h3x003	这个面包很新鲜。｜真的吗？我也想吃一个。	This bread is really fresh. | Really? I want one too.	Este pan está muy fresco. | ¿De verdad? Yo también quiero uno.
h3x004	你想喝什么饮料？｜我想喝一点儿甜的。	What drink would you like? | Something sweet, please.	¿Qué bebida quieres? | Quiero algo dulce.
h3x005	这个碗里是什么？｜是面条，你要吃吗？｜要！	What's in this bowl? | Noodles. Do you want some? | Yes!	¿Qué hay en este tazón? | Son fideos, ¿quieres? | ¡Sí!
h3x006	冰箱里还有蛋糕吗？｜没有了，被我吃了。	Is there any cake left in the fridge? | No, I ate it.	¿Todavía hay pastel en el refrigerador? | Ya no, me lo comí yo.
h3x007	你会用筷子吗？｜会，可是我还不习惯。	Can you use chopsticks? | Yes, but I'm not used to it yet.	¿Sabes usar palillos? | Sí, pero todavía no estoy acostumbrado.
h3x008	这个菜单我看不懂。｜别着急，我给你讲一下。	I can't understand this menu. | Don't worry, I'll explain it to you.	No entiendo este menú. | No te preocupes, te lo explico.
h3x009	盘子里的鱼你不吃吗？｜不吃，我不饿。你吃吧。	Aren't you going to eat the fish on the plate? | No, I'm not hungry. You have it.	¿No vas a comer el pescado del plato? | No, no tengo hambre. Cómetelo tú.
h3x010	你一共买了几个苹果？｜一共五个，都给你。	How many apples did you buy in all? | Five altogether, and they're all for you.	¿Cuántas manzanas compraste en total? | Cinco en total, son todas para ti.
h3x011	这个瓶子里是什么？｜是饮料，很甜。	What's in this bottle? | It's a drink, and it's very sweet.	¿Qué hay en esta botella? | Es una bebida, muy dulce.
h3x012	你想吃面条还是面包？｜我想吃面包，然后喝牛奶。	Do you want noodles or bread? | Bread, and then I'll have some milk.	¿Quieres fideos o pan? | Quiero pan, y luego tomo leche.
h3x013	好久不见！｜是啊，你最近好吗？｜我很好，谢谢。	Long time no see! | I know! How have you been lately? | I'm good, thanks.	¡Cuánto tiempo sin verte! | ¡Sí! ¿Cómo has estado últimamente? | Muy bien, gracias.
h3x014	早上好！你今天来得真早。｜我一直起得很早。	Good morning! You came so early today. | I always get up early.	¡Buenos días! Hoy llegaste muy temprano. | Siempre me levanto muy temprano.
h3x015	你好，我是你的新邻居。｜欢迎！我们做朋友吧。	Hello, I'm your new neighbor. | Welcome! Let's be friends.	Hola, soy tu nuevo vecino. | ¡Bienvenido! Seamos amigos.
h3x016	你好！我们是第一次见面吧？｜对，很高兴认识你。	Hi! This is our first time meeting, right? | Yes, nice to meet you.	¡Hola! Es la primera vez que nos vemos, ¿verdad? | Sí, mucho gusto en conocerte.
h3x017	你好，你是校长吗？｜不是，我是新来的。	Hello, are you the principal? | No, I'm new here.	Hola, ¿eres el director? | No, soy nuevo aquí.
h3x018	你去哪儿了？我等了你一会儿。｜对不起，我遇到朋友了。	Where did you go? I waited for you a while. | Sorry, I ran into a friend.	¿Adónde fuiste? Te esperé un rato. | Perdón, me encontré con un amigo.
h3x019	你的帽子真可爱！｜谢谢，是奶奶给我的。	Your hat is so cute! | Thanks, my grandma gave it to me.	¡Tu sombrero es muy lindo! | Gracias, me lo dio mi abuela.
h3x020	再见，我要回家了。｜好，路上小心！	Bye, I'm going home. | Okay, be careful on the way!	Adiós, ya me voy a casa. | Bien, ¡ten cuidado en el camino!
h3x021	今天刮风了。｜是啊，我的帽子飞走了！	It's windy today. | Yeah, my hat blew away!	Hoy hace viento. | Sí, ¡mi sombrero salió volando!
h3x022	今天太阳很大。｜是啊，我想去树下休息。	The sun is strong today. | Yeah, I want to rest under a tree.	Hoy hay mucho sol. | Sí, quiero ir a descansar bajo un árbol.
h3x023	外面下雨了，你带伞了吗？｜带了，我的伞是蓝的。	It's raining outside, did you bring an umbrella? | I did, mine is blue.	Está lloviendo afuera, ¿trajiste paraguas? | Sí, mi paraguas es azul.
h3x024	现在是什么季节？｜是秋天，天气很舒服。	What season is it now? | Autumn, and the weather is nice.	¿En qué estación estamos ahora? | En otoño, y el clima es agradable.
h3x025	今天真热，我想开空调。｜好，我马上去开。	It's so hot today, I want to turn on the air conditioner. | Okay, I'll go do it right now.	Hoy hace mucho calor, quiero encender el aire acondicionado. | Bien, voy a encenderlo ahora mismo.
h3x026	今天天气怎么样？｜不冷也不热，很舒服。	How's the weather today? | Not cold, not hot, very pleasant.	¿Cómo está el clima hoy? | Ni frío ni calor, muy agradable.
h3x027	你怎么感冒了？｜昨天很冷，我忘了多穿衣服。	Why did you catch a cold? | It was cold yesterday and I forgot to wear more clothes.	¿Cómo te resfriaste? | Ayer hizo frío y olvidé ponerme más ropa.
h3x028	明天会下雪吗？｜可能会，冬天快到了。｜太好了，我想玩雪！	Will it snow tomorrow? | Maybe, winter is almost here. | Great, I want to play in the snow!	¿Mañana va a nevar? | Quizás, el invierno ya casi llega. | ¡Qué bien, quiero jugar en la nieve!
h3x029	你怎么还不睡觉？｜我睡不着，我有点儿害怕。｜别怕，我在这儿。	Why aren't you asleep yet? | I can't sleep, I'm a little scared. | Don't be scared, I'm here.	¿Por qué todavía no duermes? | No puedo dormir, tengo un poco de miedo. | No tengas miedo, yo estoy aquí.
h3x030	你几点睡觉？｜我一般十点睡。｜我也是。	What time do you go to bed? | Usually at ten. | Me too.	¿A qué hora te duermes? | Normalmente me duermo a las diez. | Yo también.
h3x031	你看起来很累。｜是啊，今天我练习了很久。	You look tired. | Yeah, I practiced for a long time today.	Te ves muy cansado. | Sí, hoy practiqué mucho tiempo.
h3x032	月亮出来了，我们睡觉吧。｜好，晚安。	The moon is out, let's go to sleep. | Okay, good night.	Salió la luna, vamos a dormir. | Bien, buenas noches.
h3x033	我想睡觉了。｜再玩一会儿，好吗？｜不行，明天还要爬山。	I'm sleepy. | Play a little longer, okay? | No, we have to climb the mountain tomorrow.	Tengo sueño. | ¿Jugamos un ratito más, sí? | No, mañana todavía tenemos que escalar la montaña.
h3x034	你怎么这么累？｜我昨天做作业做到很晚。	Why are you so tired? | I did my homework until very late yesterday.	¿Por qué estás tan cansado? | Ayer hice la tarea hasta muy tarde.
h3x035	你在看什么？｜我在看照片，是我小时候的。	What are you looking at? | A photo from when I was little.	¿Qué estás mirando? | Estoy mirando una foto de cuando yo era pequeño.
h3x036	你喜欢音乐吗？｜喜欢，我特别喜欢唱歌。	Do you like music? | Yes, I especially love singing.	¿Te gusta la música? | Sí, me gusta muchísimo cantar.
h3x037	你的脚疼吗？｜有一点儿疼，我想休息。	Does your foot hurt? | A little, I want to rest.	¿Te duele el pie? | Me duele un poco, quiero descansar.
h3x038	周末你想做什么？｜我想去公园玩。｜好，我也去！	What do you want to do this weekend? | I want to go play in the park. | Okay, I'm coming too!	¿Qué quieres hacer el fin de semana? | Quiero ir a jugar al parque. | ¡Bien, yo también voy!
h3x039	你会游泳吗？｜会一点儿，我在努力学。	Can you swim? | A little, I'm working hard to learn.	¿Sabes nadar? | Un poco, me estoy esforzando por aprender.
h3x040	你为什么哭了？｜我的球坏了。｜别难过，我们再买一个。	Why are you crying? | My ball is broken. | Don't be sad, we'll buy another one.	¿Por qué lloras? | Mi pelota se descompuso. | No estés triste, compramos otra.
h3x041	你看，天上有一只鸟！｜它飞得真高！	Look, there's a bird in the sky! | It flies so high!	¡Mira, hay un pájaro en el cielo! | ¡Vuela muy alto!
h3x042	你能帮忙吗？｜当然可以，你要我做什么？	Can you help? | Of course, what do you need me to do?	¿Puedes ayudarme? | Claro que sí, ¿qué quieres que haga?
h3x043	你会说中文吗？｜会一点儿，我在学。｜你说得很清楚！	Can you speak Chinese? | A little, I'm learning. | You speak very clearly!	¿Hablas chino? | Un poco, estoy aprendiendo. | ¡Hablas muy claro!
h3x044	这只熊猫真胖！｜是啊，它每天吃很多东西。	This panda is so chubby! | Yeah, it eats a lot every day.	¡Este panda está muy gordito! | Sí, todos los días come muchas cosas.
h3x045	你的照相机在哪儿？｜在我的包里。｜借我用一下，好吗？	Where's your camera? | In my bag. | Can I borrow it for a bit?	¿Dónde está tu cámara? | En mi bolsa. | Préstamela un momento, ¿sí?
h3x046	我可以借你的书吗？｜可以，你要记得还我。｜一定！	Can I borrow your book? | Sure, remember to give it back. | I will!	¿Puedo pedirte prestado tu libro? | Sí, pero acuérdate de devolvérmelo. | ¡Sin duda!
h3x047	你今天为什么这么高兴？｜因为我的成绩很好！	Why are you so happy today? | Because my grades are great!	¿Por qué estás tan contento hoy? | ¡Porque mis calificaciones son muy buenas!
h3x049	你在玩什么游戏？｜一个新游戏，很难。｜我可以试一下吗？	What game are you playing? | A new one, it's hard. | Can I try it?	¿Qué juego estás jugando? | Un juego nuevo, es difícil. | ¿Puedo probarlo?
h3x050	你为什么不说话？｜我在想办法，怎么才能爬上去。	Why aren't you talking? | I'm figuring out how to climb up there.	¿Por qué no hablas? | Estoy pensando cómo puedo subir hasta allá.
h3x051	你的自行车真漂亮！｜谢谢，我每天都骑它。	Your bike is so pretty! | Thanks, I ride it every day.	¡Tu bicicleta es muy bonita! | Gracias, la monto todos los días.
h3x052	这本书是关于什么的？｜是关于一只熊猫的故事。	What is this book about? | It's a story about a panda.	¿De qué trata este libro? | Es un cuento sobre un panda.
h3x053	你在写什么？｜我在给爷爷写信。	What are you writing? | I'm writing a letter to my grandpa.	¿Qué estás escribiendo? | Le estoy escribiendo una carta a mi abuelo.
h3x054	你的裙子是新的吗？｜不是，是我以前买的。	Is your skirt new? | No, I bought it a while ago.	¿Tu falda es nueva? | No, la compré hace tiempo.
h3x055	你怎么了？｜我的腿走不动了。	What's wrong? | My legs can't walk any more.	¿Qué te pasa? | Mis piernas ya no pueden caminar.
h3x056	你听到声音了吗？｜听到了，是有人在唱歌。	Did you hear that sound? | I did, someone is singing.	¿Oíste ese sonido? | Sí, alguien está cantando.
h3x057	你想不想去爬山？｜想是想，可是我有点儿担心。｜别担心，我会照顾你。	Do you want to go hiking? | I do, but I'm a bit worried. | Don't worry, I'll take care of you.	¿Quieres ir a escalar la montaña? | Sí quiero, pero estoy un poco preocupado. | No te preocupes, yo te cuidaré.
h3x058	我突然想起一件事。｜什么事？｜今天是妹妹的生日！	I suddenly remembered something. | What is it? | Today is my little sister's birthday!	De repente me acordé de algo. | ¿De qué? | ¡Hoy es el cumpleaños de mi hermana menor!
h3x059	你喜欢哪个季节？｜我喜欢夏天，可以游泳。	Which season do you like? | Summer, because I can swim.	¿Qué estación te gusta? | Me gusta el verano, porque puedo nadar.
h3x060	这个问题你明白了吗？｜还没有，你再讲一遍吧。	Do you understand this problem? | Not yet, please explain it once more.	¿Ya entendiste este problema? | Todavía no, explícamelo otra vez.
```
