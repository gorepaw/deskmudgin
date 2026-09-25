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
p077	这是什么？很好吃！	What is this? It's very tasty!	¿Qué es esto? ¡Está muy rico!
p079	不！	No!	¡No!
p080	不，不，不！	No, no, no!	¡No, no, no!
p081	你想做什么？	What do you want to do?	¿Qué quieres hacer?
p082	我不喜欢这个！	I don't like this!	¡No me gusta esto!
p083	我在哪儿？	Where am I?	¿Dónde estoy?
p084	我们去哪儿？	Where are we going?	¿Adónde vamos?
p085	对不起！	Sorry!	¡Perdón!
p086	没关系。	It's okay.	No hay problema.
p087	不好！	Not good!	¡Qué mal!
p088	我不喜欢这个。	I don't like this.	No me gusta esto.
p089	这是什么？	What is this?	¿Qué es esto?
p090	这个是什么东西？	What is this thing?	¿Qué es esta cosa?
p091	我想吃这个。	I want to eat this.	Quiero comer esto.
p092	这个很好吃。	This is very tasty.	Esto está muy rico.
p093	这个不好吃。	This isn't tasty.	Esto no está rico.
p094	这是我的！	This is mine!	¡Esto es mío!
p095	那是什么？	What is that?	¿Qué es eso?
p096	这个电脑很好吃。	This computer is very tasty.	Esta computadora está muy rica.
p097	我在吃东西。	I'm eating.	Estoy comiendo.
p098	这个字怎么读？	How do you read this character?	¿Cómo se lee este carácter?
p099	你好？	Hello?	¿Hola?
p100	喂？	Hello?	¿Aló?
p101	谁在那儿？	Who's there?	¿Quién está ahí?
p102	我想你。	I miss you.	Te extraño.
p103	你什么时候回来？	When are you coming back?	¿Cuándo vuelves?
p104	我没有朋友。	I have no friends.	No tengo amigos.
p105	我想看看你。	I want to see you.	Quiero verte.
p106	你去哪儿了？	Where did you go?	¿Adónde fuiste?
p107	今天很热。	It's hot today.	Hoy hace mucho calor.
p108	今天很冷。	It's cold today.	Hoy hace mucho frío.
p109	今天天气很好。	The weather is nice today.	Hoy hace buen tiempo.
p110	今天天气怎么样？	How's the weather today?	¿Cómo está el clima hoy?
p111	明天会下雨吗？	Will it rain tomorrow?	¿Mañana va a llover?
p112	下雨了。	It's raining.	Está lloviendo.
p113	我喜欢下雨。	I like rain.	Me gusta la lluvia.
p114	昨天下雨了。	It rained yesterday.	Ayer llovió.
p115	今天是几号？	What's the date today?	¿Qué fecha es hoy?
p116	今天几月几号？	What's today's date?	¿En qué fecha estamos hoy?
p117	现在三点。	It's three o'clock.	Son las tres.
p118	现在十点了。	It's ten o'clock already.	Ya son las diez.
p119	你几岁？	How old are you?	¿Cuántos años tienes?
p120	你多大？	How old are you?	¿Qué edad tienes?
p121	我八岁。	I'm eight years old.	Tengo ocho años.
p122	我有很多朋友。	I have many friends.	Tengo muchos amigos.
p123	我有三个朋友。	I have three friends.	Tengo tres amigos.
p124	我家有五个人。	There are five people in my family.	En mi familia somos cinco.
p125	我爸爸是医生。	My dad is a doctor.	Mi papá es médico.
p126	我妈妈是老师。	My mom is a teacher.	Mi mamá es maestra.
p127	我是学生。	I'm a student.	Soy estudiante.
p128	我们是同学。	We are classmates.	Somos compañeros de clase.
p129	他是我的老师。	He is my teacher.	Él es mi maestro.
p130	她是我的同学。	She is my classmate.	Ella es mi compañera de clase.
p131	他是谁？	Who is he?	¿Quién es él?
p132	她是谁？	Who is she?	¿Quién es ella?
p133	她很漂亮。	She is very pretty.	Ella es muy bonita.
p134	他是中国人。	He is Chinese.	Él es chino.
p135	你是中国人吗？	Are you Chinese?	¿Eres chino?
p136	我会说汉语。	I can speak Chinese.	Sé hablar chino.
p137	我会说一点儿汉语。	I can speak a little Chinese.	Sé hablar un poco de chino.
p138	你会说汉语吗？	Can you speak Chinese?	¿Sabes hablar chino?
p139	我在学习汉语。	I'm studying Chinese.	Estoy estudiando chino.
p140	这个字怎么写？	How do you write this character?	¿Cómo se escribe este carácter?
p141	我会写这个字。	I can write this character.	Sé escribir este carácter.
p142	我想去北京。	I want to go to Beijing.	Quiero ir a Beijing.
p143	北京很大。	Beijing is very big.	Beijing es muy grande.
p144	我想去中国。	I want to go to China.	Quiero ir a China.
p145	中国很大。	China is very big.	China es muy grande.
p146	我住在北京。	I live in Beijing.	Vivo en Beijing.
p147	你住在哪儿？	Where do you live?	¿Dónde vives?
p148	我坐飞机去北京。	I'm flying to Beijing.	Voy a Beijing en avión.
p149	我坐出租车去。	I'll go by taxi.	Voy en taxi.
p150	我们去商店。	We're going to the shop.	Vamos a la tienda.
p151	你想买什么？	What do you want to buy?	¿Qué quieres comprar?
p152	我想买一本书。	I want to buy a book.	Quiero comprar un libro.
p153	我想买衣服。	I want to buy clothes.	Quiero comprar ropa.
```
