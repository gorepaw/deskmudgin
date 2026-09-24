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
p062	我喜欢这儿。	Wǒ xǐ huan zhèr.	I like it here.
p063	今天我很高兴。	Jīn tiān wǒ hěn gāo xìng.	I'm happy today.
p064	我们都很高兴。	Wǒ men dōu hěn gāo xìng.	We're all happy.
p065	谢谢你！	Xiè xie nǐ!	Thank you!
p066	谢谢！	Xiè xie!	Thanks!
p067	我喜欢这个。	Wǒ xǐ huan zhè ge.	I like this.
p068	你很好。	Nǐ hěn hǎo.	You're very nice.
p069	你是我的朋友！	Nǐ shì wǒ de péng you!	You're my friend!
p070	我爱你！	Wǒ ài nǐ!	I love you!
p071	好吃！	Hǎo chī!	Tasty!
p072	很好吃！	Hěn hǎo chī!	Very tasty!
p073	太好吃了！	Tài hǎo chī le!	So tasty!
p074	谢谢，很好吃！	Xiè xie, hěn hǎo chī!	Thanks, it's very tasty!
p075	我喜欢吃这个。	Wǒ xǐ huan chī zhè ge.	I like eating this.
p076	我吃了很多。	Wǒ chī le hěn duō.	I ate a lot.
p077	这是什么？很好吃！	Zhè shì shén me? Hěn hǎo chī!	What is this? It's very tasty!
p078	你做什么？	Nǐ zuò shén me?	What are you doing?
p079	不！	Bù!	No!
p080	不，不，不！	Bù, bù, bù!	No, no, no!
p081	你想做什么？	Nǐ xiǎng zuò shén me?	What do you want to do?
p082	我不喜欢这个！	Wǒ bù xǐ huan zhè ge!	I don't like this!
p083	我在哪儿？	Wǒ zài nǎr?	Where am I?
p084	我们去哪儿？	Wǒ men qù nǎr?	Where are we going?
p085	对不起！	Duì bu qǐ!	Sorry!
p086	没关系。	Méi guān xi.	It's okay.
p087	不好！	Bù hǎo!	Not good!
p088	我不喜欢这个。	Wǒ bù xǐ huan zhè ge.	I don't like this.
p089	这是什么？	Zhè shì shén me?	What is this?
p090	这个是什么东西？	Zhè ge shì shén me dōng xi?	What is this thing?
p091	我想吃这个。	Wǒ xiǎng chī zhè ge.	I want to eat this.
p092	这个很好吃。	Zhè ge hěn hǎo chī.	This is very tasty.
p093	这个不好吃。	Zhè ge bù hǎo chī.	This isn't tasty.
p094	这是我的！	Zhè shì wǒ de!	This is mine!
p095	那是什么？	Nà shì shén me?	What is that?
p096	这个电脑很好吃。	Zhè ge diàn nǎo hěn hǎo chī.	This computer is very tasty.
p097	我在吃东西。	Wǒ zài chī dōng xi.	I'm eating.
p098	这个字怎么读？	Zhè ge zì zěn me dú?	How do you read this character?
p099	你好？	Nǐ hǎo?	Hello?
p100	喂？	Wèi?	Hello?
p101	谁在那儿？	Shéi zài nàr?	Who's there?
p102	我想你。	Wǒ xiǎng nǐ.	I miss you.
p103	你什么时候回来？	Nǐ shén me shí hou huí lái?	When are you coming back?
p104	我没有朋友。	Wǒ méi yǒu péng you.	I have no friends.
p105	我想看见你。	Wǒ xiǎng kàn jiàn nǐ.	I want to see you.
p106	你去哪儿了？	Nǐ qù nǎr le?	Where did you go?
p107	今天很热。	Jīn tiān hěn rè.	It's hot today.
p108	今天很冷。	Jīn tiān hěn lěng.	It's cold today.
p109	今天天气很好。	Jīn tiān tiān qì hěn hǎo.	The weather is nice today.
p110	今天天气怎么样？	Jīn tiān tiān qì zěn me yàng?	How's the weather today?
p111	明天会下雨吗？	Míng tiān huì xià yǔ ma?	Will it rain tomorrow?
p112	下雨了。	Xià yǔ le.	It's raining.
p113	我喜欢下雨。	Wǒ xǐ huan xià yǔ.	I like rain.
p114	昨天下雨了。	Zuó tiān xià yǔ le.	It rained yesterday.
p115	今天是几号？	Jīn tiān shì jǐ hào?	What's the date today?
p116	今天几月几号？	Jīn tiān jǐ yuè jǐ hào?	What's today's date?
p117	现在三点。	Xiàn zài sān diǎn.	It's three o'clock.
p118	现在十点了。	Xiàn zài shí diǎn le.	It's ten o'clock already.
p119	你几岁？	Nǐ jǐ suì?	How old are you?
p120	你多大？	Nǐ duō dà?	How old are you?
p121	我八岁。	Wǒ bā suì.	I'm eight years old.
p122	我有很多朋友。	Wǒ yǒu hěn duō péng you.	I have many friends.
```
