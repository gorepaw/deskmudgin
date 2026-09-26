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
h3p181	我不会用筷子。	I can't use chopsticks.	No sé usar palillos.
h3p182	天是蓝的，草是绿的。	The sky is blue and the grass is green.	El cielo es azul y el pasto es verde.
h3p183	我们的房子已经很旧了。	Our house is very old now.	Nuestra casa ya está muy vieja.
h3p184	别离开我，好吗？	Don't leave me, okay?	No me dejes, ¿sí?
h3p185	我今天没有力气。	I have no strength today.	Hoy no tengo fuerzas.
h3p186	你真厉害！	You're amazing!	¡Qué increíble eres!
h3p187	我饿得没有力气了。	I'm so hungry I have no strength left.	Tengo tanta hambre que no me quedan fuerzas.
h3p188	我渴极了，快给我水！	I am parched. Quick, get me some water!	¡Me muero de sed, dame agua rápido!
h3p189	我好害怕，别放开我！	I'm so scared. Don't let go!	Tengo mucho miedo, ¡no me sueltes!
h3p191	我的脚好疼，是不是坏了？	My foot really hurts. Is it broken?	Me duele mucho el pie, ¿será que se me rompió?
h3p192	我刚才睡着了，现在有力气了。	I was just asleep, and now I have some energy.	Acabo de dormir y ahora ya tengo energía.
h3p193	早上好，今天有什么好节目？	Good morning! Any good shows on today?	¡Buenos días! ¿Hay algún programa bueno hoy?
h3p194	又见面了，我好高兴！	We meet again. I'm so happy!	¡Nos vemos otra vez, qué alegría!
h3p195	我先走了，明天见！	I'm heading off first. See you tomorrow!	Me voy primero, ¡hasta mañana!
h3p196	别关电脑，我还想玩。	Don't turn off the computer. I still want to play.	No apagues la computadora, todavía quiero jugar.
h3p197	没有你，我一个人好难过，想哭。	Without you I'm all alone and so sad I want to cry.	Sin ti estoy muy triste solo, me dan ganas de llorar.
h3p198	谢谢你的蛋糕，好吃极了！	Thanks for the cake. It's delicious!	Gracias por tu pastel, ¡estaba riquísimo!
h3p199	再给我一口，好不好？	Give me one more bite, okay?	Dame otro bocado, ¿sí?
h3p201	我更饿了，你有吃的吗？	I'm even hungrier now. Have you got anything to eat?	Ahora tengo más hambre, ¿tienes algo de comer?
h3p202	谢谢你关心我，我好高兴。	Thanks for caring about me. I am so happy.	Gracias por preocuparte por mí, estoy muy contento.
h3p203	我们经常一起玩，我最开心了！	We often play together, and it makes me so happy!	Jugamos juntos muy seguido, ¡y eso me hace muy feliz!
h3p204	你刚才去哪儿了？我想你了。	Where did you go just now? I missed you.	¿Adónde fuiste hace un rato? Te extrañé.
h3p205	天气太热，我想开空调。	It's too hot. I want to turn on the air conditioning.	Hace demasiado calor, quiero prender el aire acondicionado.
h3p206	门没关，风进来了。	The door is not shut and the wind is coming in.	La puerta no está cerrada y entra el viento.
h3p207	你换了新裤子，真好看！	You changed into new trousers. They look great!	¡Te pusiste un pantalón nuevo, te ves muy bien!
h3p208	我画了你，你看像不像？	I drew you. Does it look like you?	Te dibujé, ¿a que me quedó parecido?
h3p209	我对做饭很感兴趣，教教我吧。	I'm interested in cooking. Teach me!	Me interesa mucho cocinar, ¡enséñame!
h3p210	你是晚上回来，还是明天早上回来？	Are you coming back tonight or tomorrow morning?	¿Vuelves esta noche o mañana por la mañana?
h3p211	你决定去哪个公园了吗？	Have you decided which park to go to?	¿Ya decidiste a qué parque vas a ir?
h3p212	这个季节，公园里的花最多。	In this season the park has the most flowers.	En esta estación es cuando el parque tiene más flores.
h3p213	我不想让今天结束，再玩一会儿吧。	I don't want today to end. Let's play a little longer.	No quiero que se acabe el día de hoy, juguemos un ratito más.
h3p214	快到节日了，我想吃好吃的。	The festival is nearly here. I want something yummy.	Ya casi es la fiesta, quiero comer algo rico.
h3p215	你的声音真好听，再讲一个故事吧。	Your voice is lovely. Tell me another story.	Tu voz es preciosa, cuéntame otro cuento.
h3p216	我几乎什么都记得，就是忘了你的生日。	I remember almost everything, except I forgot your birthday.	Me acuerdo de casi todo, solo que olvidé tu cumpleaños.
h3p218	我想借你的书看看。	I'd like to borrow your book.	Quiero tomar prestado tu libro para leerlo.
h3p219	会议开完了吗？我想找你玩。	Is the meeting over? I want to play with you.	¿Ya terminó la reunión? Quiero ir a jugar contigo.
h3p220	我们一起检查一下冰箱吧。	Let us check the fridge together.	Revisemos juntos el refrigerador.
h3p221	蓝色的东西，我都喜欢。	I like anything blue.	Todo lo azul me gusta.
h3p222	我怕黑，你别关灯。	I'm afraid of the dark. Don't turn off the light.	Le tengo miedo a la oscuridad, no apagues la luz.
h3p223	你为什么哭了？谁让你不高兴？	Why are you crying? Who upset you?	¿Por qué lloraste? ¿Quién te hizo enojar?
h3p226	后来你去哪儿了？我等了你很久。	Where did you go afterwards? I waited for you a long time.	¿Adónde fuiste después? Te esperé mucho tiempo.
h3p227	你们国家有什么节日？	What festivals does your country have?	¿Qué fiestas hay en tu país?
h3p228	我想学怎么解决问题。	I want to learn how to solve problems.	Quiero aprender a resolver problemas.
h3p229	我不想换衣服，我喜欢这件。	I do not want to change clothes. I like this one.	No quiero cambiarme de ropa, me gusta esta.
h3p230	你今天检查作业了吗？	Did you check your homework today?	¿Revisaste hoy la tarea?
h3p231	我画的花好看吗？	Does the flower I drew look nice?	¿Te gusta la flor que dibujé?
h3p232	你每天都很忙，我很关心你。	You are busy every day. I care about you.	Estás ocupado todos los días, y me preocupo por ti.
h3p233	今天刮风，我们别去公园了。	It is windy today. Let us not go to the park.	Hoy hace viento, mejor no vayamos al parque.
h3p234	你的老朋友今天会来吗？	Is your old friend coming today?	¿Hoy vendrá tu viejo amigo?
h3p235	我喜欢甜的东西，例如蛋糕和苹果。	I like sweet things, like cake and apples.	Me gustan las cosas dulces, por ejemplo el pastel y las manzanas.
h3p236	我的脸有点儿绿，你看到了吗？	My face is a little green. Did you notice?	Tengo la cara un poco verde, ¿lo notaste?
h3p237	我每天都练习跳舞。	I practise dancing every day.	Practico baile todos los días.
h3p238	一辆红色的车开过去了。	A red car just drove past.	Pasó un coche rojo.
h3p239	我想多了解你一点儿。	I want to get to know you a little better.	Quiero conocerte un poco mejor.
h3p240	邻居家的猫今天又来了。	The neighbour's cat came over again today.	El gato de los vecinos volvió a venir hoy.
h3p241	另外，我还想吃一片面包。	Also, I would like a slice of bread.	Además, quiero una rebanada de pan.
h3p242	你走的时候，能不能给我留着灯？	When you go, could you leave the light on for me?	Cuando te vayas, ¿podrías dejarme la luz encendida?
h3p243	你留下来，好不好？	Will you stay, please?	Quédate, ¿sí?
h3p244	这里的楼好高啊！	The buildings here are so tall!	¡Los edificios de aquí son muy altos!
h3p245	我是绿色的，你喜欢吗？	I'm green. Do you like it?	Soy verde, ¿te gusta?
```
