These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use only **HSK 1–2 vocabulary** (the levels are cumulative).

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 2 vocabulary, counting every level below it?
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
h2p361	这件衣服太长了。	Zhè jiàn yī fu tài cháng le.	This piece of clothing is too long.
h2p362	他很高。	Tā hěn gāo.	He is tall.
h2p363	我不高，但是我很快。	Wǒ bù gāo, dàn shì wǒ hěn kuài.	I'm not tall, but I'm fast.
h2p364	虽然我很小，但是我吃得很多。	Suī rán wǒ hěn xiǎo, dàn shì wǒ chī de hěn duō.	Although I'm small, I eat a lot.
h2p365	因为今天下雪，所以我们不去学校。	Yīn wèi jīn tiān xià xuě, suǒ yǐ wǒ men bú qù xué xiào.	Because it's snowing today, we're not going to school.
h2p366	你为什么不高兴？	Nǐ wèi shén me bù gāo xìng?	Why aren't you happy?
h2p367	你为什么在这儿？	Nǐ wèi shén me zài zhèr?	Why are you here?
h2p368	他为什么还没来？	Tā wèi shén me hái méi lái?	Why hasn't he come yet?
h2p369	你怎么知道？	Nǐ zěn me zhī dào?	How do you know?
h2p370	我知道你是谁。	Wǒ zhī dào nǐ shì shéi.	I know who you are.
h2p371	你知道他在哪儿吗？	Nǐ zhī dào tā zài nǎr ma?	Do you know where he is?
h2p372	我不知道怎么说。	Wǒ bù zhī dào zěn me shuō.	I don't know how to say it.
h2p373	你觉得怎么样？	Nǐ jué de zěn me yàng?	What do you think?
h2p374	我觉得有点儿冷。	Wǒ jué de yǒu diǎn er lěng.	I feel a little cold.
h2p375	这个问题很好。	Zhè ge wèn tí hěn hǎo.	That's a good question.
h2p376	没问题！	Méi wèn tí!	No problem!
h2p377	我有一个问题。	Wǒ yǒu yí gè wèn tí.	I have a question.
h2p378	这是什么意思？	Zhè shì shén me yì si?	What does this mean?
h2p379	有意思！	Yǒu yì si!	Interesting!
h2p380	这本书很有意思。	Zhè běn shū hěn yǒu yì si.	This book is very interesting.
h2p381	那个电影有意思吗？	Nà ge diàn yǐng yǒu yì si ma?	Is that movie interesting?
h2p382	你来一下。	Nǐ lái yí xià.	Come here a moment.
h2p383	我看一下。	Wǒ kàn yí xià.	Let me take a look.
h2p384	我想一下。	Wǒ xiǎng yí xià.	Let me think for a moment.
h2p385	我的手表很贵。	Wǒ de shǒu biǎo hěn guì.	My watch is expensive.
h2p386	我的手机没电了。	Wǒ de shǒu jī méi diàn le.	My phone is out of battery.
h2p387	这是今天的报纸。	Zhè shì jīn tiān de bào zhǐ.	This is today's newspaper.
h2p388	我在机场等你。	Wǒ zài jī chǎng děng nǐ.	I'll wait for you at the airport.
h2p389	飞机几点到？	Fēi jī jǐ diǎn dào?	What time does the plane arrive?
h2p390	我坐飞机去旅游。	Wǒ zuò fēi jī qù lǚ yóu.	I'm flying off on a trip.
h2p391	你住在几号房间？	Nǐ zhù zài jǐ hào fáng jiān?	Which room are you staying in?
h2p392	他坐公共汽车上班。	Tā zuò gōng gòng qì chē shàng bān.	He takes the bus to work.
h2p393	公共汽车来了！	Gōng gòng qì chē lái le!	The bus is here!
h2p394	公司离我家很远。	Gōng sī lí wǒ jiā hěn yuǎn.	The company is far from my home.
h2p395	走路去要多长时间？	Zǒu lù qù yào duō cháng shí jiān?	How long does it take to walk there?
h2p396	学校离我家不远。	Xué xiào lí wǒ jiā bù yuǎn.	The school isn't far from my home.
h2p397	我们走路去吧。	Wǒ men zǒu lù qù ba.	Let's walk there.
h2p398	我家旁边有个商店。	Wǒ jiā páng biān yǒu gè shāng diàn.	There's a shop next to my home.
h2p399	你坐我旁边吧。	Nǐ zuò wǒ páng biān ba.	Sit next to me.
h2p400	她是我们的新同学。	Tā shì wǒ men de xīn tóng xué.	She's our new classmate.
h2p401	大家都来了吗？	Dà jiā dōu lái le ma?	Is everyone here?
h2p402	大家一起唱吧！	Dà jiā yì qǐ chàng ba!	Everyone, sing together!
h2p403	我给你打电话。	Wǒ gěi nǐ dǎ diàn huà.	I'll call you.
h2p404	我给你买了一个西瓜。	Wǒ gěi nǐ mǎi le yí gè xī guā.	I bought you a watermelon.
h2p405	这是给你的。	Zhè shì gěi nǐ de.	This is for you.
h2p406	我们去外面吃饭吧。	Wǒ men qù wài miàn chī fàn ba.	Let's eat out.
h2p407	你想吃米饭还是面条？	Nǐ xiǎng chī mǐ fàn hái shì miàn tiáo?	Do you want rice or noodles?
h2p408	鸡蛋很便宜。	Jī dàn hěn pián yi.	Eggs are cheap.
h2p409	茶比咖啡好喝。	Chá bǐ kā fēi hǎo hē.	Tea tastes better than coffee.
h2p410	西瓜是我最喜欢的水果。	Xī guā shì wǒ zuì xǐ huan de shuǐ guǒ.	Watermelon is my favourite fruit.
h2p411	你吃过羊肉吗？	Nǐ chī guo yáng ròu ma?	Have you ever eaten lamb?
h2p412	我没去过北京。	Wǒ méi qù guo běi jīng.	I've never been to Beijing.
h2p413	今天是几月几日？	Jīn tiān shì jǐ yuè jǐ rì?	What's the date today?
h2p414	一年有三百六十五天。	Yì nián yǒu sān bǎi liù shí wǔ tiān.	A year has three hundred and sixty-five days.
h2p415	我有一千个问题！	Wǒ yǒu yì qiān gè wèn tí!	I have a thousand questions!
h2p416	我们两个人一起去。	Wǒ men liǎng gè rén yì qǐ qù.	The two of us will go together.
h2p417	那个男人是谁？	Nà ge nán rén shì shéi?	Who is that man?
h2p418	您请坐。	Nín qǐng zuò.	Please have a seat.
h2p419	您想喝什么？	Nín xiǎng hē shén me?	What would you like to drink?
h2p420	它在哪儿？	Tā zài nǎr?	Where is it?
```
