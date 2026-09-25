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
p231	他什么时候回来？	When is he coming back?	¿Cuándo vuelve él?
p232	我想和你说汉语。	I want to speak Chinese with you.	Quiero hablar chino contigo.
p233	我和我的朋友去商店。	My friend and I are going to the shop.	Mi amigo y yo vamos a la tienda.
p234	猫和狗都很好。	Cats and dogs are both nice.	Los gatos y los perros son buenos.
p235	我不太喜欢这个。	I don't really like this.	No me gusta mucho esto.
p236	太热了！	It's too hot!	¡Hace demasiado calor!
p237	太冷了！	It's too cold!	¡Hace demasiado frío!
p238	太大了！	It's too big!	¡Es demasiado grande!
p239	太小了！	It's too small!	¡Es demasiado pequeño!
p240	太少了！	That's too little!	¡Es muy poco!
p241	我很爱我的家。	I love my family very much.	Amo mucho a mi familia.
p242	你喜欢北京吗？	Do you like Beijing?	¿Te gusta Beijing?
p243	那个商店很大。	That shop is very big.	Esa tienda es muy grande.
p244	医院在学校后面。	The hospital is behind the school.	El hospital está detrás de la escuela.
p245	商店在前面。	The shop is up ahead.	La tienda está más adelante.
p246	你家在哪儿？	Where is your home?	¿Dónde está tu casa?
p247	我的家很小。	My home is very small.	Mi casa es muy pequeña.
p248	我想认识你。	I'd like to get to know you.	Me gustaría conocerte.
p249	你说什么？	What did you say?	¿Qué dijiste?
p250	你听！	Listen!	¡Escucha!
p251	我在听。	I'm listening.	Estoy escuchando.
p252	你想去哪儿？	Where do you want to go?	¿Adónde quieres ir?
p253	我们去哪儿吃饭？	Where shall we eat?	¿Adónde vamos a comer?
p254	这个饭店很好。	This restaurant is very good.	Este restaurante es muy bueno.
p255	我们去那个饭店。	We're going to that restaurant.	Vamos a ese restaurante.
p256	我想吃中国菜。	I want to eat Chinese food.	Quiero comer comida china.
p257	中国菜很好吃。	Chinese food is very tasty.	La comida china es muy rica.
p258	你喜欢吃什么菜？	What dishes do you like?	¿Qué platos te gustan?
p259	我不喜欢吃苹果。	I don't like eating apples.	No me gusta comer manzanas.
p260	这是谁的书？	Whose book is this?	¿De quién es este libro?
p261	这是我的书。	This is my book.	Este es mi libro.
p262	那不是我的。	That's not mine.	Eso no es mío.
p263	这是你的吗？	Is this yours?	¿Esto es tuyo?
p264	我是你的朋友吗？	Am I your friend?	¿Soy tu amigo?
p265	你是老师吗？	Are you a teacher?	¿Eres maestro?
p266	我不是老师。	I'm not a teacher.	No soy maestro.
p267	今天星期一。	Today is Monday.	Hoy es lunes.
p268	明天星期六。	Tomorrow is Saturday.	Mañana es sábado.
p269	九月很热。	September is very hot.	Septiembre es muy caluroso.
p270	十二月很冷。	December is very cold.	Diciembre es muy frío.
p271	我明年去中国。	I'm going to China next year.	El próximo año voy a China.
p272	我去年在北京。	I was in Beijing last year.	El año pasado estuve en Beijing.
p273	我很喜欢我的老师。	I really like my teacher.	Me gusta mucho mi maestro.
p274	我们的老师很好。	Our teacher is very good.	Nuestro maestro es muy bueno.
p275	我在写字。	I'm writing characters.	Estoy escribiendo caracteres.
p276	多少个？	How many?	¿Cuántos?
p277	多少人？	How many people?	¿Cuántas personas?
p278	有很多人。	There are lots of people.	Hay mucha gente.
p279	没有人。	There's nobody.	No hay nadie.
p280	我什么都没有。	I don't have anything.	No tengo nada.
p281	你什么时候来？	When are you coming?	¿Cuándo vienes?
p282	我现在来。	I'm coming now.	Ya voy.
p283	我明天来。	I'll come tomorrow.	Vengo mañana.
p284	他没有来。	He didn't come.	Él no vino.
p285	请来我家。	Please come to my home.	Ven a mi casa, por favor.
p286	我能坐这儿吗？	Can I sit here?	¿Puedo sentarme aquí?
p287	请坐这儿。	Please sit here.	Siéntate aquí, por favor.
p288	我坐在椅子上。	I'm sitting on the chair.	Estoy sentado en la silla.
p289	他坐在我后面。	He's sitting behind me.	Él está sentado detrás de mí.
p290	这个苹果很大。	This apple is very big.	Esta manzana es muy grande.
p291	那个苹果很小。	That apple is very small.	Esa manzana es muy pequeña.
p292	我不想说。	I'd rather not say.	Prefiero no decir.
p293	你能来吗？	Can you come?	¿Puedes venir?
p294	我不能来。	I can't come.	No puedo venir.
p295	没有了。	There's none left.	Ya no hay.
p296	好的。	Okay.	Está bien.
p297	是的。	Yes.	Sí.
p298	不是。	No, it isn't.	No.
p299	对不起，我不认识你。	Sorry, I don't know you.	Perdón, no te conozco.
p300	我爱中国菜。	I love Chinese food.	Amo la comida china.
p301	我爱喝茶。	I love drinking tea.	Amo tomar té.
p302	我爱看书。	I love reading.	Amo leer.
p303	我爱睡觉。	I love sleeping.	Amo dormir.
p304	我爱吃东西。	I love eating.	Amo comer.
```
