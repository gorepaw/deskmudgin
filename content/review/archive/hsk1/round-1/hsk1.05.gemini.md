These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use **only HSK 1 vocabulary**.

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 1 vocabulary?
5. Is it Simplified, not Traditional?

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_script	fix_reading	fix_english	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the three `fix_` columns empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	reading	english
p245	商店在前面。	Shāng diàn zài qián miàn.	The shop is up ahead.
p246	你家在哪儿？	Nǐ jiā zài nǎr?	Where is your home?
p247	我的家很小。	Wǒ de jiā hěn xiǎo.	My home is very small.
p248	我想认识你。	Wǒ xiǎng rèn shi nǐ.	I'd like to get to know you.
p249	你说什么？	Nǐ shuō shén me?	What did you say?
p250	你听！	Nǐ tīng!	Listen!
p251	我在听。	Wǒ zài tīng.	I'm listening.
p252	你想去哪儿？	Nǐ xiǎng qù nǎr?	Where do you want to go?
p253	我们去哪儿吃饭？	Wǒ men qù nǎr chī fàn?	Where shall we eat?
p254	这个饭店很好。	Zhè ge fàn diàn hěn hǎo.	This restaurant is very good.
p255	我们去那个饭店。	Wǒ men qù nà ge fàn diàn.	Let's go to that restaurant.
p256	我想吃中国菜。	Wǒ xiǎng chī zhōng guó cài.	I want to eat Chinese food.
p257	中国菜很好吃。	Zhōng guó cài hěn hǎo chī.	Chinese food is very tasty.
p258	你喜欢吃什么菜？	Nǐ xǐ huan chī shén me cài?	What dishes do you like?
p259	我不喜欢吃苹果。	Wǒ bù xǐ huan chī píng guǒ.	I don't like eating apples.
p260	这是谁的书？	Zhè shì shéi de shū?	Whose book is this?
p261	这是我的书。	Zhè shì wǒ de shū.	This is my book.
p262	那不是我的。	Nà bú shì wǒ de.	That's not mine.
p263	这是你的吗？	Zhè shì nǐ de ma?	Is this yours?
p264	我是你的朋友吗？	Wǒ shì nǐ de péng you ma?	Am I your friend?
p265	你是老师吗？	Nǐ shì lǎo shī ma?	Are you a teacher?
p266	我不是老师。	Wǒ bú shì lǎo shī.	I'm not a teacher.
p267	今天星期一。	Jīn tiān xīng qī yī.	Today is Monday.
p268	明天星期六。	Míng tiān xīng qī liù.	Tomorrow is Saturday.
p269	九月很热。	Jiǔ yuè hěn rè.	September is very hot.
p270	十二月很冷。	Shí èr yuè hěn lěng.	December is very cold.
p271	我明年去中国。	Wǒ míng nián qù zhōng guó.	I'm going to China next year.
p272	我去年在北京。	Wǒ qù nián zài běi jīng.	I was in Beijing last year.
p273	我很喜欢我的老师。	Wǒ hěn xǐ huan wǒ de lǎo shī.	I really like my teacher.
p274	我们的老师很好。	Wǒ men de lǎo shī hěn hǎo.	Our teacher is very good.
p275	我在写字。	Wǒ zài xiě zì.	I'm writing characters.
p276	多少个？	Duō shao gè?	How many?
p277	多少人？	Duō shao rén?	How many people?
p278	有很多人。	Yǒu hěn duō rén.	There are lots of people.
p279	没有人。	Méi yǒu rén.	There's nobody.
p280	我什么都没有。	Wǒ shén me dōu méi yǒu.	I don't have anything.
p281	你什么时候来？	Nǐ shén me shí hou lái?	When are you coming?
p282	我现在来。	Wǒ xiàn zài lái.	I'm coming now.
p283	我明天来。	Wǒ míng tiān lái.	I'll come tomorrow.
p284	他没有来。	Tā méi yǒu lái.	He didn't come.
p285	请来我家。	Qǐng lái wǒ jiā.	Please come to my home.
p286	我能坐这儿吗？	Wǒ néng zuò zhèr ma?	Can I sit here?
p287	请坐这儿。	Qǐng zuò zhèr.	Please sit here.
p288	我坐在椅子上。	Wǒ zuò zài yǐ zi shàng.	I'm sitting on the chair.
p289	他坐在我后面。	Tā zuò zài wǒ hòu miàn.	He's sitting behind me.
p290	这个苹果很大。	Zhè ge píng guǒ hěn dà.	This apple is very big.
p291	那个苹果很小。	Nà ge píng guǒ hěn xiǎo.	That apple is very small.
p292	我不想说。	Wǒ bù xiǎng shuō.	I don't want to say.
p293	你能来吗？	Nǐ néng lái ma?	Can you come?
p294	我不能来。	Wǒ bù néng lái.	I can't come.
p295	没有了。	Méi yǒu le.	There's none left.
p296	好的。	Hǎo de.	Okay.
p297	是的。	Shì de.	Yes.
p298	不是。	Bú shì.	No, it isn't.
p299	对不起，我不认识你。	Duì bu qǐ, wǒ bú rèn shi nǐ.	Sorry, I don't know you.
p300	我爱中国菜。	Wǒ ài zhōng guó cài.	I love Chinese food.
p301	我爱喝茶。	Wǒ ài hē chá.	I love drinking tea.
p302	我爱看书。	Wǒ ài kàn shū.	I love reading.
p303	我爱睡觉。	Wǒ ài shuì jiào.	I love sleeping.
p304	我爱吃东西。	Wǒ ài chī dōng xi.	I love eating.
```
