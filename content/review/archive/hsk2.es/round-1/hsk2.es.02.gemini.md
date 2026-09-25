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
h2p076	我想和大家一起玩。	I want to play with everyone.	Quiero jugar con todos.
h2p077	我想坐你旁边。	I want to sit next to you.	Quiero sentarme a tu lado.
h2p078	别这样！	Don't do that!	¡No hagas eso!
h2p079	你要做什么？	What are you going to do?	¿Qué vas a hacer?
h2p080	我们要去哪儿？	Where are we going?	¿Adónde vamos?
h2p081	太高了！	Too high!	¡Está demasiado alto!
h2p082	让我下去！	Let me down!	¡Déjame bajar!
h2p083	快让我下来！	Quick, let me down!	¡Rápido, déjame bajar!
h2p084	我不要！	I don't want to!	¡No quiero!
h2p085	慢一点儿！	Slow down!	¡Más despacio!
h2p086	你为什么这样做？	Why did you do that?	¿Por qué hiciste eso?
h2p087	别再这样了！	Don't do that again!	¡No lo vuelvas a hacer!
h2p088	这不对！	That's not right!	¡Esto está mal!
h2p089	你做错了。	You did it wrong.	Lo hiciste mal.
h2p090	谢谢您！	Thank you! (polite)	¡Gracias! (cortés)
h2p091	真好吃，谢谢！	Really tasty, thanks!	¡Qué rico, gracias!
h2p092	我最喜欢吃这个。	This is my favourite thing to eat.	Esto es lo que más me gusta comer.
h2p093	我还想吃！	I want more!	¡Quiero comer más!
h2p094	我吃得很好。	I ate well.	Comí muy bien.
h2p095	你给我的菜很好吃。	The food you gave me is very tasty.	La comida que me diste está muy rica.
h2p096	再来一次！	Once more!	¡Otra vez!
h2p097	别走！	Don't go!	¡No te vayas!
h2p098	我最喜欢这样了。	I like this the most.	Esto es lo que más me gusta.
h2p099	你可以再来一次吗？	Can you do it once more?	¿Puedes hacerlo otra vez?
h2p100	真好！	That's really nice!	¡Qué bueno!
h2p101	你对我真好。	You're really good to me.	Eres muy bueno conmigo.
h2p102	我要走了。	I'm going to go.	Ya me voy.
h2p103	晚上见！	See you tonight!	¡Nos vemos esta noche!
h2p104	我先走了，再见！	I'll go first, bye!	Me voy primero, ¡adiós!
h2p105	慢走！	Take care! (to someone leaving)	¡Que te vaya bien! (a alguien que se va)
h2p106	您慢走。	Take care. (polite, to someone leaving)	Que le vaya bien. (cortés, a alguien que se va)
h2p107	明天早上见。	See you tomorrow morning.	Nos vemos mañana por la mañana.
h2p108	我起床了！	I'm up!	¡Ya me levanté!
h2p109	现在几点了？我睡了多长时间？	What time is it? How long did I sleep?	¿Qué hora es? ¿Cuánto tiempo dormí?
h2p110	我还想睡。	I still want to sleep.	Todavía quiero dormir.
h2p111	我睡得很好。	I slept well.	Dormí muy bien.
h2p112	已经晚上了吗？	Is it already evening?	¿Ya es de noche?
h2p113	我睡了十个小时。	I slept for ten hours.	Dormí diez horas.
h2p114	今天是晴天。	It's sunny today.	Hoy está soleado.
h2p115	今天是阴天。	It's overcast today.	Hoy está nublado.
h2p116	外面下雪了！	It's snowing outside!	¡Está nevando afuera!
h2p117	明天可能下雨。	It might rain tomorrow.	Puede que llueva mañana.
h2p118	今天比昨天冷。	Today is colder than yesterday.	Hoy hace más frío que ayer.
h2p119	今天天气非常好。	The weather is extremely good today.	Hoy el clima está excelente.
h2p120	下雪了，我们出去玩吧！	It's snowing, let's go out and play!	¡Está nevando, salgamos a jugar!
h2p121	我喜欢下雪。	I like it when it snows.	Me gusta cuando nieva.
h2p122	外面很冷，多穿点儿衣服。	It's cold outside, put on more clothes.	Afuera hace mucho frío, abrígate más.
h2p123	今天太热了，我想去游泳。	It's too hot today, I want to go swimming.	Hoy hace demasiado calor, quiero ir a nadar.
h2p124	明天是晴天吗？	Will it be sunny tomorrow?	¿Estará soleado mañana?
h2p125	天阴了，可能要下雨。	The sky has clouded over; it might rain.	El cielo se nubló, puede que llueva.
h2p126	我有一个哥哥。	I have an older brother.	Tengo un hermano mayor.
h2p127	我姐姐是医生。	My older sister is a doctor.	Mi hermana mayor es doctora.
h2p128	我弟弟六岁。	My younger brother is six.	Mi hermano menor tiene seis años.
h2p129	我妹妹很漂亮。	My younger sister is very pretty.	Mi hermana menor es muy bonita.
h2p130	他是我丈夫。	He is my husband.	Él es mi esposo.
h2p131	她是我妻子。	She is my wife.	Ella es mi esposa.
h2p132	你有孩子吗？	Do you have children?	¿Tienes hijos?
h2p133	我哥哥比我高。	My older brother is taller than me.	Mi hermano mayor es más alto que yo.
h2p134	你有几个姐姐？	How many older sisters do you have?	¿Cuántas hermanas mayores tienes?
h2p135	我的孩子喜欢踢足球。	My child likes playing football.	A mi hijo le gusta jugar fútbol.
h2p136	我们几点上课？	What time is our class?	¿A qué hora es la clase?
h2p137	今天有考试。	There's an exam today.	Hoy hay examen.
h2p138	这个题我不会。	I can't do this question.	No sé resolver este problema.
h2p139	我不懂这个问题。	I don't understand this question.	No entiendo esta pregunta.
h2p140	你懂了吗？	Do you understand?	¿Entendiste?
h2p141	我懂了！	I get it!	¡Ya entendí!
h2p142	老师在教室里。	The teacher is in the classroom.	El profesor está en el salón.
h2p143	我要准备考试。	I need to prepare for the exam.	Tengo que prepararme para el examen.
h2p144	考试开始了！	The exam has started!	¡El examen comenzó!
h2p145	你考得怎么样？	How did your exam go?	¿Cómo te fue en el examen?
h2p146	我可以问你一个问题吗？	Can I ask you a question?	¿Puedo hacerte una pregunta?
h2p147	请回答我的问题。	Please answer my question.	Por favor, responde mi pregunta.
h2p148	我学习汉语已经一年了。	I've been studying Chinese for a year now.	Ya llevo un año estudiando chino.
h2p149	这个字是什么意思？	What does this character mean?	¿Qué significa este carácter?
h2p150	你说的是什么意思？	What do you mean?	¿Qué quieres decir?
```
