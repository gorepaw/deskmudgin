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
h2p226	为什么？	Why?	¿Por qué?
h2p227	为什么不呢？	Why not?	¿Por qué no?
h2p228	因为我喜欢你，所以我来了。	Because I like you, I came.	Como me gustas, vine.
h2p229	因为下雨，所以我没去。	Because it rained, I didn't go.	Como llovía, no fui.
h2p230	虽然很累，但是我很高兴。	Although I'm tired, I'm happy.	Aunque estoy cansado, estoy feliz.
h2p231	虽然外面很冷，但是我想出去玩。	Although it's cold outside, I want to go out and play.	Aunque hace frío afuera, quiero salir a jugar.
h2p232	你别笑！	Don't laugh!	¡No te rías!
h2p233	他笑了。	He laughed.	Se rió.
h2p234	你在笑什么？	What are you laughing at?	¿De qué te ríes?
h2p235	我正在看书。	I'm reading right now.	Estoy leyendo.
h2p236	他正在打电话。	He's on the phone right now.	Está hablando por teléfono.
h2p237	我在找我的手机。	I'm looking for my phone.	Estoy buscando mi celular.
h2p238	你看见我的手表了吗？	Have you seen my watch?	¿Has visto mi reloj?
h2p239	我的手机在哪儿？	Where's my phone?	¿Dónde está mi celular?
h2p240	给我打电话吧。	Give me a call.	Llámame.
h2p241	我告诉你一件事情。	Let me tell you something.	Te voy a contar algo.
h2p242	别告诉他！	Don't tell him!	¡No le digas!
h2p243	你能帮助我吗？	Can you help me?	¿Puedes ayudarme?
h2p244	谢谢你的帮助。	Thank you for your help.	Gracias por tu ayuda.
h2p245	我来介绍一下。	Let me make the introductions.	Deja que te presente.
h2p246	请进！	Please come in!	¡Pasa, por favor!
h2p247	请等一下。	Please wait a moment.	Espera un momento, por favor.
h2p248	等等我！	Wait for me!	¡Espérame!
h2p249	我们一起走吧。	Let's go together.	Vamos juntos.
h2p250	你走得太快了！	You're walking too fast!	¡Caminas demasiado rápido!
h2p251	我不想洗衣服。	I don't want to do the laundry.	No quiero lavar la ropa.
h2p252	我去洗手。	I'm going to wash my hands.	Voy a lavarme las manos.
h2p253	他在看报纸。	He's reading the newspaper.	Está leyendo el periódico.
h2p254	我喜欢喝咖啡。	I like drinking coffee.	Me gusta tomar café.
h2p255	咖啡太热了。	The coffee is too hot.	El café está demasiado caliente.
h2p256	我每天早上喝牛奶。	I drink milk every morning.	Tomo leche todas las mañanas.
h2p257	我不吃羊肉。	I don't eat lamb.	No como cordero.
h2p258	这家饭店的菜很好吃。	The food at this restaurant is very tasty.	La comida de este restaurante está muy rica.
h2p259	服务员，我们要两杯茶。	Waiter, we'd like two cups of tea.	Mesero, queremos dos tazas de té.
h2p260	我生病了。	I'm sick.	Estoy enfermo.
h2p261	你要吃药。	You need to take medicine.	Tienes que tomar medicina.
h2p262	你身体怎么样？	How are you feeling?	¿Cómo te sientes?
h2p263	我明天要去医院。	I have to go to the hospital tomorrow.	Mañana tengo que ir al hospital.
h2p264	多喝水，多休息。	Drink lots of water and get lots of rest.	Toma mucha agua y descansa mucho.
h2p265	门开着。	The door is open.	La puerta está abierta.
h2p266	请开门！	Please open the door!	¡Abre la puerta, por favor!
h2p267	你在外面吗？	Are you outside?	¿Estás afuera?
h2p268	外面有人。	There's someone outside.	Hay alguien afuera.
h2p269	我们进去吧。	Let's go in.	Entremos.
h2p270	你出来！	Come out!	¡Sal!
h2p271	我不想出去。	I don't want to go out.	No quiero salir.
h2p272	我可以进来吗？	May I come in?	¿Puedo entrar?
h2p273	他出去了。	He's gone out.	Él salió.
h2p274	那个人是男的还是女的？	Is that person a man or a woman?	¿Esa persona es hombre o mujer?
h2p275	你姓什么？	What's your surname?	¿Cuál es tu apellido?
h2p276	我有两百块钱。	I have two hundred yuan.	Tengo doscientos yuanes.
h2p277	一千块太贵了！	A thousand yuan is too expensive!	¡Mil yuanes es demasiado caro!
h2p278	我是第一！	I'm number one!	¡Soy el primero!
h2p279	我最高！	I'm the tallest!	¡Soy el más alto!
h2p280	你比我快。	You're faster than me.	Eres más rápido que yo.
h2p281	他比我大两岁。	He's two years older than me.	Él es dos años mayor que yo.
h2p282	这个比那个好。	This one is better than that one.	Esto es mejor que eso.
h2p283	我没有你高。	I'm not as tall as you.	No soy tan alto como tú.
h2p284	这是新的吗？	Is this new?	¿Esto es nuevo?
h2p285	我有一个新手机。	I have a new phone.	Tengo un celular nuevo.
h2p286	我喜欢你的新衣服。	I like your new clothes.	Me gusta tu ropa nueva.
h2p287	这本书我看完了。	I've finished reading this book.	Ya terminé de leer este libro.
h2p288	你做完了吗？	Are you done?	¿Ya terminaste?
h2p289	我还没做完。	I haven't finished yet.	Todavía no termino.
h2p290	我们开始吧！	Let's begin!	¡Empecemos!
h2p291	我们什么时候开始？	When do we start?	¿Cuándo empezamos?
h2p292	你准备好了吗？	Are you ready?	¿Ya estás listo?
h2p293	我准备好了！	I'm ready!	¡Ya estoy listo!
h2p294	我希望明天是晴天。	I hope it's sunny tomorrow.	Espero que mañana esté soleado.
h2p295	我希望你快乐。	I hope you're happy.	Espero que seas feliz.
h2p296	可能吧。	Maybe.	Puede ser.
h2p297	这样可以吗？	Is this OK?	¿Así está bien?
h2p298	不可以！	No, you can't!	¡No se puede!
h2p299	我可以坐这儿吗？	May I sit here?	¿Puedo sentarme aquí?
h2p300	你要去哪儿？	Where are you going?	¿Adónde vas?
```
