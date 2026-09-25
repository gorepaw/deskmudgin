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
x001	你好！｜你好！	Hello! | Hello!	¡Hola! | ¡Hola!
x002	你好吗？｜我很好，谢谢。你呢？｜我很好。	How are you? | I'm fine, thanks. And you? | I'm fine.	¿Cómo estás? | Estoy bien, gracias. ¿Y tú? | Estoy bien.
x003	你们好！｜你好！	Hello, everyone! | Hello!	¡Hola a todos! | ¡Hola!
x004	你在哪儿？｜我在这儿！	Where are you? | I'm here!	¿Dónde estás? | ¡Estoy aquí!
x005	谁在那儿？｜是我！	Who's there? | It's me!	¿Quién está ahí? | ¡Soy yo!
x006	你在做什么？｜我在吃东西。	What are you doing? | I'm eating.	¿Qué estás haciendo? | Estoy comiendo.
x007	你在看什么？｜我在看你。	What are you looking at? | I'm looking at you.	¿Qué estás mirando? | Te estoy mirando.
x008	你认识他吗？｜我不认识他。	Do you know him? | I don't know him.	¿Lo conoces? | No lo conozco.
x009	他是谁？｜他是我的朋友。	Who is he? | He is my friend.	¿Quién es él? | Es mi amigo.
x010	我们是朋友吗？｜是的！我们是朋友。	Are we friends? | Yes! We are friends.	¿Somos amigos? | ¡Sí! Somos amigos.
x011	你有朋友吗？｜有，你是我的朋友。	Do you have friends? | Yes, you're my friend.	¿Tienes amigos? | Sí, tú eres mi amigo.
x012	再见！｜明天见！	Goodbye! | See you tomorrow!	¡Adiós! | ¡Nos vemos mañana!
x013	谢谢你！｜不客气。	Thank you! | You're welcome.	¡Gracias! | De nada.
x014	对不起！｜没关系。	Sorry! | It's okay.	¡Perdón! | No hay problema.
x015	你好漂亮！｜谢谢！	You're so pretty! | Thanks!	¡Qué bonita eres! | ¡Gracias!
x016	你的衣服很漂亮。｜谢谢你！	Your clothes are very pretty. | Thank you!	Tu ropa es muy bonita. | ¡Gracias!
x017	我爱你。｜谢谢！我很高兴。	I love you. | Thanks! I'm very happy.	Te amo. | ¡Gracias! Estoy muy feliz.
x018	你喜欢这儿吗？｜我很喜欢这儿。	Do you like it here? | I like it here very much.	¿Te gusta aquí? | Me gusta mucho aquí.
x019	你想吃什么？｜我想吃米饭。	What do you want to eat? | I want to eat rice.	¿Qué quieres comer? | Quiero comer arroz.
x020	你吃饭了吗？｜我没有吃饭。｜我们去吃饭。	Have you eaten? | I haven't eaten. | Let's go and eat.	¿Ya comiste? | No he comido. | Vamos a comer.
x021	我想吃东西。｜这儿有苹果。｜谢谢！	I want to eat something. | There are apples here. | Thanks!	Quiero comer algo. | Aquí hay manzanas. | ¡Gracias!
x022	这是什么？｜这是苹果。｜我能吃吗？｜能！	What is this? | This is an apple. | Can I eat it? | Yes!	¿Qué es esto? | Es una manzana. | ¿Puedo comerla? | ¡Sí!
x023	这个好吃吗？｜很好吃！	Is this tasty? | Very tasty!	¿Esto está rico? | ¡Muy rico!
x024	你喜欢什么水果？｜我喜欢苹果。	What fruit do you like? | I like apples.	¿Qué fruta te gusta? | Me gustan las manzanas.
x025	你想喝什么？｜我想喝茶。｜好的。	What would you like to drink? | I'd like tea. | Okay.	¿Qué quieres tomar? | Quiero tomar té. | Está bien.
x026	请喝茶。｜谢谢，我很喜欢喝茶。	Please have some tea. | Thanks, I really like tea.	Toma té, por favor. | Gracias, me gusta mucho el té.
x027	你喜欢吃中国菜吗？｜很喜欢！	Do you like Chinese food? | Very much!	¿Te gusta la comida china? | ¡Mucho!
x028	中午吃什么？｜吃米饭。	What's for lunch? | Rice.	¿Qué comemos al mediodía? | Arroz.
x029	你想睡觉吗？｜我很想睡觉。	Do you want to sleep? | I really want to sleep.	¿Quieres dormir? | Tengo muchas ganas de dormir.
x030	你睡觉了吗？｜没有。	Have you gone to bed? | No.	¿Ya te dormiste? | No.
x031	现在几点？｜现在三点。｜我想睡觉了。	What time is it? | It's three o'clock. | I want to sleep now.	¿Qué hora es? | Son las tres. | Ya quiero dormir.
x032	你想回家吗？｜想，我想睡觉。	Do you want to go home? | Yes, I want to sleep.	¿Quieres ir a casa? | Sí, quiero dormir.
x033	今天天气怎么样？｜今天很热。	How's the weather today? | It's hot today.	¿Cómo está el clima hoy? | Hoy hace mucho calor.
x034	今天很冷。｜是的，太冷了！	It's cold today. | Yes, it's too cold!	Hoy hace mucho frío. | Sí, ¡hace demasiado frío!
x035	明天会下雨吗？｜会。	Will it rain tomorrow? | It will.	¿Mañana va a llover? | Sí.
x036	下雨了！｜我们回家。	It's raining! | We're going home.	¡Está lloviendo! | Vamos a casa.
x037	你冷吗？｜我很冷。	Are you cold? | I'm very cold.	¿Tienes frío? | Tengo mucho frío.
x038	你热吗？｜不热。	Are you hot? | No.	¿Tienes calor? | No.
x039	你去哪儿？｜我去商店。｜你想买什么？｜我想买苹果。	Where are you going? | I'm going to the shop. | What do you want to buy? | I want to buy apples.	¿Adónde vas? | Voy a la tienda. | ¿Qué quieres comprar? | Quiero comprar manzanas.
x040	这个多少钱？｜三块钱。｜太多了！	How much is this? | Three yuan. | That's too much!	¿Cuánto cuesta esto? | Tres yuanes. | ¡Es demasiado!
x041	你几岁？｜我八岁。你呢？｜我九岁。	How old are you? | I'm eight. And you? | I'm nine.	¿Cuántos años tienes? | Tengo ocho años. ¿Y tú? | Tengo nueve.
x042	你家有几个人？｜我家有五个人。	How many people are in your family? | There are five people in my family.	¿Cuántas personas hay en tu familia? | En mi familia somos cinco.
x043	你会说汉语吗？｜我会说一点儿。	Can you speak Chinese? | I can speak a little.	¿Sabes hablar chino? | Sé hablar un poco.
x044	你在学习汉语吗？｜是的，汉语很好。	Are you studying Chinese? | Yes, Chinese is great.	¿Estás estudiando chino? | Sí, el chino es genial.
x045	你会写这个字吗？｜我不会。	Can you write this character? | I can't.	¿Sabes escribir este carácter? | No sé.
x046	你是老师吗？｜不是，我是学生。	Are you a teacher? | No, I'm a student.	¿Eres maestro? | No, soy estudiante.
x047	今天是星期几？｜今天星期六。｜太好了！	What day is it today? | Today is Saturday. | Great!	¿Qué día es hoy? | Hoy es sábado. | ¡Qué bien!
x048	这是你的吗？｜不是，是他的。	Is this yours? | No, it's his.	¿Esto es tuyo? | No, es de él.
x049	你喜欢猫吗？｜我很喜欢猫。	Do you like cats? | I really like cats.	¿Te gustan los gatos? | Me gustan mucho los gatos.
x050	你喜欢狗吗？｜不喜欢。	Do you like dogs? | No.	¿Te gustan los perros? | No.
x051	你喜欢看书吗？｜喜欢，我爱看书。	Do you like reading? | Yes, I love reading.	¿Te gusta leer? | Sí, amo leer.
x052	你想看电影吗？｜好！我们去看电影。	Do you want to see a film? | Okay! We'll go see a film.	¿Quieres ver una película? | ¡Bueno! Vamos a ver una película.
x053	你想去北京吗？｜想！北京很大。	Do you want to go to Beijing? | Yes! Beijing is very big.	¿Quieres ir a Beijing? | ¡Sí! Beijing es muy grande.
x054	你能来我家吗？｜能！什么时候？｜明天上午。	Can you come to my home? | Yes! When? | Tomorrow morning.	¿Puedes venir a mi casa? | ¡Sí! ¿Cuándo? | Mañana por la mañana.
x055	你的猫在哪儿？｜在桌子下面。	Where is your cat? | Under the table.	¿Dónde está tu gato? | Debajo de la mesa.
x056	我没有钱。｜没关系，我有。	I don't have money. | It's okay, I do.	No tengo dinero. | No hay problema, yo tengo.
x057	你想坐这个椅子吗？｜好的，谢谢。	Do you want to sit in this chair? | Okay, thanks.	¿Quieres sentarte en esta silla? | Está bien, gracias.
x058	请坐！｜谢谢。	Please sit! | Thanks.	¡Siéntate! | Gracias.
x059	你去医院吗？｜不去。	Are you going to the hospital? | No.	¿Vas al hospital? | No.
x060	我看见你了！｜你好！	I see you! | Hello!	¡Te veo! | ¡Hola!
```
