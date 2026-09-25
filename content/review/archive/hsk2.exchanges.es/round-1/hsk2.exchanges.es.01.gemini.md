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
h2x001	你好！｜你好！你今天忙吗？｜不忙，我很高兴。	Hello! | Hello! Are you busy today? | Not busy, I'm very happy.	¡Hola! | ¡Hola! ¿Estás ocupado hoy? | No estoy ocupado, estoy muy contento.
h2x002	你好吗？｜我很好，你呢？｜我也很好。	How are you? | I'm well, and you? | I'm well too.	¿Cómo estás? | Estoy muy bien, ¿y tú? | Yo también estoy muy bien.
h2x003	你是新同学吗？欢迎你！｜谢谢！我们做朋友吧！	Are you the new student? Welcome! | Thanks! Let's be friends!	¿Eres el nuevo compañero? ¡Bienvenido! | ¡Gracias! ¡Seamos amigos!
h2x004	你好，你姓什么？｜我姓高，你呢？｜我姓白。	Hello, what's your surname? | My surname is Gao, and yours? | My surname is Bai.	Hola, ¿cuál es tu apellido? | Mi apellido es Gao, ¿y el tuyo? | Mi apellido es Bai.
h2x005	你今天很高兴，为什么？｜因为今天是我的生日！	You're very happy today, why? | Because today is my birthday!	Hoy estás muy contento, ¿por qué? | ¡Porque hoy es mi cumpleaños!
h2x006	我们明天一起玩，好吗？｜好，太好了！	Let's play together tomorrow, okay? | Great, sounds good!	¿Jugamos juntos mañana, está bien? | ¡Sí, qué bueno!
h2x008	早上好！｜早上好！你几点起床的？｜我七点起床。	Good morning! | Good morning! What time did you get up? | I got up at seven.	¡Buenos días! | ¡Buenos días! ¿A qué hora te levantaste? | Me levanté a las siete.
h2x009	你好，你今天要去哪儿？｜我要去学校，你呢？｜我要去商店。	Hello, where are you going today? | I'm going to school, and you? | I'm going to the store.	Hola, ¿adónde vas hoy? | Voy a la escuela, ¿y tú? | Voy a la tienda.
h2x010	你好！你今天想做什么？｜我想去游泳，你呢？｜我想休息。	Hello! What do you want to do today? | I want to go swimming, and you? | I want to rest.	¡Hola! ¿Qué quieres hacer hoy? | Quiero ir a nadar, ¿y tú? | Quiero descansar.
h2x011	你想吃什么？｜我想吃面条，你呢？｜我想吃鸡蛋。	What do you want to eat? | I want to eat noodles, and you? | I want to eat eggs.	¿Qué quieres comer? | Quiero comer fideos, ¿y tú? | Quiero comer huevo.
h2x012	这个面条好吃吗？｜非常好吃！你也吃一点儿吧。	Are these noodles tasty? | Very tasty! You have some too.	¿Están ricos estos fideos? | ¡Están riquísimos! Come un poco también.
h2x013	你想喝咖啡还是牛奶？｜我想喝咖啡，谢谢。	Do you want coffee or milk? | I'd like coffee, thanks.	¿Quieres tomar café o leche? | Quiero café, gracias.
h2x014	你觉得这个西瓜怎么样？｜很好吃，我很喜欢。	What do you think of this watermelon? | It's tasty, I like it a lot.	¿Qué te parece esta sandía? | Está muy rica, me encanta.
h2x015	服务员，我要一个鸡蛋面。｜好的，请等一下。	Waiter, I'd like an egg noodle dish. | Sure, please wait a moment.	Mesero, quiero un fideo con huevo. | Claro, espera un momento.
h2x016	这个多少钱？｜很便宜，三块钱。｜太好了，我买一个。	How much is this? | It's cheap, three yuan. | Great, I'll buy one.	¿Cuánto cuesta esto? | Es muy barato, tres yuanes. | ¡Qué bien, compro uno!
h2x017	这个苹果很贵。｜是的，但是很好吃。	This apple is quite expensive. | Yeah, but it's very tasty.	Esta manzana es muy cara. | Sí, pero está muy rica.
h2x018	你在准备晚饭吗？｜是，我在做鸡蛋面。	Are you preparing dinner? | Yes, I'm making egg noodles.	¿Estás preparando la cena? | Sí, estoy haciendo fideos con huevo.
h2x019	你已经吃饭了吗？｜还没有，我想现在吃。	Have you already eaten? | Not yet, I want to eat now.	¿Ya comiste? | Todavía no, quiero comer ahora.
h2x020	我们一起去饭店吃饭吧！｜好，我也想吃鱼。	Let's go eat at a restaurant together! | Sure, I want to eat fish too.	¡Vamos a comer juntos a un restaurante! | Bien, yo también quiero comer pescado.
h2x021	你吃过羊肉吗？｜吃过，很好吃，但是有点儿贵。	Have you had mutton before? | Yes, it's tasty, but a bit expensive.	¿Has comido carne de cordero? | Sí, es muy rica, pero es un poco cara.
h2x022	你觉得咖啡好喝吗？｜好喝，我很喜欢咖啡。	Do you think coffee tastes good? | It does, I really like coffee.	¿Crees que el café está rico? | Sí, está rico, me gusta mucho el café.
h2x024	明天会下雪吗？｜可能会，天气很冷。	Will it snow tomorrow? | Maybe, it's very cold.	¿Nevará mañana? | Puede que sí, hace mucho frío.
h2x025	今天是晴天还是阴天？｜是阴天，可能要下雨。	Is it sunny or cloudy today? | It's cloudy, it might rain.	¿Hoy está soleado o nublado? | Está nublado, puede que llueva.
h2x026	外面在下雪！｜真的吗？我们出去玩吧！	It's snowing outside! | Really? Let's go out and play!	¡Está nevando afuera! | ¿De verdad? ¡Vamos a jugar afuera!
h2x027	今天非常热，你热吗？｜我也很热，想去游泳。	It's extremely hot today, are you hot? | I'm hot too, I want to go swimming.	Hoy hace mucho calor, ¿tienes calor? | Yo también tengo calor, quiero ir a nadar.
h2x028	现在天气怎么样？｜现在很冷，但是明天会晴。	What's the weather like now? | It's cold now, but tomorrow will be sunny.	¿Cómo está el clima ahora? | Ahora hace frío, pero mañana estará soleado.
h2x029	下雨了，我们回家吧。｜好，我们等一下再走。	It's raining, let's go home. | Okay, let's wait a bit and then go.	Está lloviendo, vamos a casa. | Bien, esperemos un poco y luego nos vamos.
h2x030	今天天气真好！｜是的，我们一起去外面玩吧。	The weather's really nice today! | Yeah, let's go outside and play together.	¡Qué buen clima hace hoy! | Sí, vamos a jugar afuera juntos.
h2x031	你几点睡觉？｜我晚上十点睡觉，你呢？｜我十一点睡觉。	What time do you go to sleep? | I go to sleep at ten in the evening, and you? | I go to sleep at eleven.	¿A qué hora te duermes? | Me duermo a las diez de la noche, ¿y tú? | Yo me duermo a las once.
h2x032	你今天很累吗？｜非常累，我想早点休息。	Are you very tired today? | Extremely tired, I want to rest a bit early.	¿Estás muy cansado hoy? | Muy cansado, quiero descansar temprano.
h2x033	你几点起床？｜我早上七点起床。	What time do you get up? | I get up at seven in the morning.	¿A qué hora te levantas? | Me levanto a las siete de la mañana.
h2x034	你昨天晚上睡得好吗？｜睡得很好，我现在不累。	Did you sleep well last night? | I slept really well, I'm not tired now.	¿Dormiste bien anoche? | Dormí muy bien, ahora no estoy cansado.
h2x035	你昨天睡了几个小时？｜我睡了八个小时。	How many hours did you sleep yesterday? | I slept for eight hours.	¿Cuántas horas dormiste ayer? | Dormí ocho horas.
h2x036	你有哥哥吗？｜没有，但是我有一个弟弟和一个妹妹。	Do you have an older brother? | No, but I have a younger brother and a younger sister.	¿Tienes hermano mayor? | No, pero tengo un hermano menor y una hermana menor.
h2x037	你姐姐做什么工作？｜她在一家公司上班。	What does your older sister do for work? | She works at a company.	¿En qué trabaja tu hermana mayor? | Trabaja en una empresa.
h2x038	你喜欢什么运动？｜我喜欢踢足球，你呢？｜我喜欢打篮球。	What sport do you like? | I like playing football, and you? | I like playing basketball.	¿Qué deporte te gusta? | Me gusta jugar fútbol, ¿y a ti? | Me gusta jugar básquetbol.
h2x039	你每天跑步吗？｜是，我每天跑步，身体很好。	Do you jog every day? | Yes, I jog every day, I'm very healthy.	¿Corres todos los días? | Sí, corro todos los días, estoy muy sano.
h2x040	明天有考试吗？｜有，是汉语考试，我有点儿忙。	Is there an exam tomorrow? | Yes, a Chinese exam, I'm a bit busy.	¿Hay examen mañana? | Sí, es de chino, estoy un poco ocupado.
h2x041	这个问题你懂吗？｜不懂，你可以告诉我吗？｜可以，我来帮助你。	Do you understand this problem? | I don't, can you tell me? | Sure, I'll help you.	¿Entiendes esta pregunta? | No, ¿puedes decirme? | Claro, te ayudo.
h2x042	老师问了一个问题，你回答了吗？｜回答了，但是我觉得我错了。	The teacher asked a question, did you answer it? | I did, but I think I got it wrong.	La maestra hizo una pregunta, ¿la respondiste? | Sí, pero creo que me equivoqué.
h2x043	你的手机在哪儿？｜在桌子上边。	Where's your phone? | It's on the table.	¿Dónde está tu celular? | Está sobre la mesa.
h2x044	宾馆在哪儿？离这儿远吗？｜不远，很近，在你的右边。	Where's the hotel? Is it far from here? | Not far, it's close, on your right.	¿Dónde está el hotel? ¿Está lejos de aquí? | No está lejos, está cerca, a tu derecha.
h2x045	机场怎么走？｜往前走，机场就在左边。	How do I get to the airport? | Go straight ahead, the airport is right on the left.	¿Cómo se llega al aeropuerto? | Sigue derecho, el aeropuerto está a la izquierda.
h2x046	这件衣服多少钱？｜不贵，很便宜。｜太好了，我买了。	How much is this piece of clothing? | Not expensive, it's cheap. | Great, I'll buy it.	¿Cuánto cuesta esta ropa? | No es cara, es muy barata. | ¡Qué bien, la compro!
h2x047	你想买铅笔吗？｜想，我也要买报纸。	Do you want to buy a pencil? | Yes, I also want to buy a newspaper.	¿Quieres comprar un lápiz? | Sí, también quiero comprar un periódico.
h2x048	你去年去哪儿旅游了？｜我去年去了北京，非常漂亮。	Where did you travel last year? | I went to Beijing last year, it's very beautiful.	¿Adónde viajaste el año pasado? | Fui a Beijing el año pasado, es muy hermosa.
h2x049	飞机快到机场了吗？｜快到了，我们准备下飞机吧。	Is the plane about to reach the airport? | Almost there, let's get ready to get off.	¿El avión ya casi llega al aeropuerto? | Ya casi llegamos, preparémonos para bajar.
h2x050	你最喜欢什么颜色？｜我最喜欢红色，你呢？｜我喜欢黑色。	What's your favorite color? | I like red the most, and you? | I like black.	¿Cuál es tu color favorito? | Mi favorito es el rojo, ¿y el tuyo? | Me gusta el negro.
h2x051	你今天为什么不快乐？｜因为我的手表不见了。	Why aren't you happy today? | Because my watch is missing.	¿Por qué no estás feliz hoy? | Porque se me perdió el reloj.
h2x052	你笑什么？｜我觉得今天很快乐。	What are you smiling about? | I just feel happy today.	¿De qué te ríes? | Es que hoy me siento muy feliz.
h2x053	你怎么了？｜我可能生病了，身体不太好。	What's wrong? | I might be sick, I'm not feeling well.	¿Qué te pasa? | Creo que estoy enfermo, no me siento muy bien.
h2x054	你要去医院吗？｜要，我想买一点儿药。	Are you going to the hospital? | Yes, I want to buy some medicine.	¿Vas a ir al hospital? | Sí, quiero comprar un poco de medicina.
h2x055	你会跳舞吗？｜会一点儿，我也喜欢唱歌。	Can you dance? | A little, I also like singing.	¿Sabes bailar? | Un poco, también me gusta cantar.
h2x056	公共汽车什么时候到？｜可能五分钟就到。	When will the bus arrive? | It'll probably arrive in five minutes.	¿Cuándo llega el autobús? | Probablemente llegue en cinco minutos.
h2x057	他是你的丈夫吗？｜是，我们已经认识十年了。	Is he your husband? | Yes, we've known each other for ten years already.	¿Él es tu esposo? | Sí, ya nos conocemos desde hace diez años.
h2x058	她是你的妻子吗？｜是，她是一个很好的老师。	Is she your wife? | Yes, she's a very good teacher.	¿Ella es tu esposa? | Sí, es una muy buena maestra.
h2x059	你在找什么？｜我在找我的手机，你看见了吗？｜没看见。	What are you looking for? | I'm looking for my phone, have you seen it? | No, I haven't.	¿Qué estás buscando? | Estoy buscando mi celular, ¿lo has visto? | No lo he visto.
h2x060	你正在做什么？｜我正在洗衣服，你呢？｜我在看报纸。	What are you doing right now? | I'm washing clothes, and you? | I'm reading the newspaper.	¿Qué estás haciendo? | Estoy lavando ropa, ¿y tú? | Estoy leyendo el periódico.
```
