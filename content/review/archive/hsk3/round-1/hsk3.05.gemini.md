These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use only **HSK 1–3 vocabulary** (the levels are cumulative).

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 3 vocabulary, counting every level below it?
5. Is it Simplified, not Traditional?

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_script	fix_reading	fix_english	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the `fix_` column(s) empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	reading	english
h3p241	另外，我还想吃一个面包。	Lìng wài, wǒ hái xiǎng chī yí gè miàn bāo.	Also, I'd like a piece of bread.
h3p242	你走的时候，能不能给我留着灯？	Nǐ zǒu de shí hou, néng bu néng gěi wǒ liú zhe dēng?	When you go, could you leave the light on for me?
h3p243	你留下来，好不好？	Nǐ liú xià lái, hǎo bu hǎo?	Will you stay, please?
h3p244	这里的楼好高啊！	Zhè lǐ de lóu hǎo gāo a!	The buildings here are so tall!
h3p245	我是绿色的，你喜欢吗？	Wǒ shì lǜ sè de, nǐ xǐ huan ma?	I'm green. Do you like it?
h3p246	我马上就好，等我一下。	Wǒ mǎ shàng jiù hǎo, děng wǒ yí xià.	I'll be ready in a moment, wait for me.
h3p247	我对今天很满意。	Wǒ duì jīn tiān hěn mǎn yì.	I'm very happy with today.
h3p248	你的帽子真好看！	Nǐ de mào zi zhēn hǎo kàn!	Your hat looks great!
h3p249	我只有一米高，很小吧？	Wǒ zhǐ yǒu yì mǐ gāo, hěn xiǎo ba?	I'm only one metre tall. Pretty small, right?
h3p250	我饿了，想吃面包。	Wǒ è le, xiǎng chī miàn bāo.	I'm hungry. I want some bread.
h3p251	面包真香！	Miàn bāo zhēn xiāng!	The bread smells so good!
h3p252	我明白了，你是想让我安静一点儿。	Wǒ míng bái le, nǐ shì xiǎng ràng wǒ ān jìng yì diǎnr.	I get it. You want me to be quiet.
h3p253	我想拿那个苹果，可是拿不到。	Wǒ xiǎng ná nà ge píng guǒ, kě shì ná bú dào.	I want to grab that apple, but I can't reach it.
h3p254	别拿走我的东西！	Bié ná zǒu wǒ de dōng xi!	Don't take my things!
h3p255	你奶奶今天会来吗？	Nǐ nǎi nai jīn tiān huì lái ma?	Is your grandmother coming today?
h3p256	小鸟往南飞了。	Xiǎo niǎo wǎng nán fēi le.	The birds flew south.
h3p257	你走了，我有点儿难过。	Nǐ zǒu le, wǒ yǒu diǎnr nán guò.	You're leaving, and I feel a bit sad.
h3p258	我今天很难过，你和我玩吧。	Wǒ jīn tiān hěn nán guò, nǐ hé wǒ wán ba.	I'm sad today. Play with me, please.
h3p259	你现在是几年级？	Nǐ xiàn zài shì jǐ nián jí?	What grade are you in now?
h3p260	你看起来很年轻！	Nǐ kàn qǐ lái hěn nián qīng!	You look so young!
h3p261	有一只鸟在树上唱歌。	Yǒu yì zhī niǎo zài shù shàng chàng gē.	A bird is singing in the tree.
h3p262	我会努力的！	Wǒ huì nǔ lì de!	I'll try hard!
h3p263	我每天都很努力地练习。	Wǒ měi tiān dōu hěn nǔ lì de liàn xí.	I work hard at practising every day.
h3p264	周末我们去爬山吧。	Zhōu mò wǒ men qù pá shān ba.	Let's go climbing on the weekend.
h3p265	爬山太累了，我想睡觉。	Pá shān tài lèi le, wǒ xiǎng shuì jiào.	Climbing was so tiring. I want to sleep.
h3p266	盘子里还有一块蛋糕。	Pán zi lǐ hái yǒu yí kuài dàn gāo.	There's still a piece of cake on the plate.
h3p267	我是不是变胖了？	Wǒ shì bu shì biàn pàng le?	Have I gotten fat?
h3p268	你的皮鞋好亮啊！	Nǐ de pí xié hǎo liàng a!	Your leather shoes are so shiny!
h3p269	我不喝啤酒，我喜欢喝水。	Wǒ bù hē pí jiǔ, wǒ xǐ huan hē shuǐ.	I don't drink beer. I like water.
h3p270	瓶子里没有水了。	Píng zi lǐ méi yǒu shuǐ le.	There's no water left in the bottle.
h3p271	其实我不太饿。	Qí shí wǒ bú tài è.	Actually, I'm not that hungry.
h3p272	其实我很想你。	Qí shí wǒ hěn xiǎng nǐ.	Actually, I missed you.
h3p273	其他人都去哪儿了？	Qí tā rén dōu qù nǎr le?	Where did everybody else go?
h3p274	飞机马上就要起飞了。	Fēi jī mǎ shàng jiù yào qǐ fēi le.	The plane is about to take off.
h3p275	你说得不清楚，再说一遍吧。	Nǐ shuō de bù qīng chǔ, zài shuō yí biàn ba.	I can't quite hear you clearly, say it again.
h3p276	今天我想请假，不想学习。	Jīn tiān wǒ xiǎng qǐng jià, bù xiǎng xué xí.	I want to take the day off today. I don't feel like studying.
h3p277	秋天到了，天气很好。	Qiū tiān dào le, tiān qì hěn hǎo.	Autumn is here and the weather is lovely.
h3p278	我喜欢秋天的太阳。	Wǒ xǐ huan qiū tiān de tài yáng.	I like the autumn sun.
h3p279	你的裙子真漂亮！	Nǐ de qún zi zhēn piào liang!	Your skirt is so pretty!
h3p280	先吃饭，然后再玩。	Xiān chī fàn, rán hòu zài wán.	Eat first, then play.
h3p281	我先睡一会儿，然后再找你玩。	Wǒ xiān shuì yí huìr, rán hòu zài zhǎo nǐ wán.	I'll take a nap first and then come play with you.
h3p282	你好热情啊，我喜欢你！	Nǐ hǎo rè qíng a, wǒ xǐ huan nǐ!	You're so warm and friendly. I like you!
h3p283	我认为今天会下雨。	Wǒ rèn wéi jīn tiān huì xià yǔ.	I think it's going to rain today.
h3p284	你认为我可爱吗？	Nǐ rèn wéi wǒ kě ài ma?	Do you think I'm cute?
h3p285	他做事很认真。	Tā zuò shì hěn rèn zhēn.	He's very serious about his work.
h3p286	你认真地看着我，我有点儿不好意思。	Nǐ rèn zhēn de kàn zhe wǒ, wǒ yǒu diǎnr bù hǎo yì si.	You're looking at me so intently, and I'm a little shy.
h3p287	这个问题很容易。	Zhè ge wèn tí hěn róng yì.	This question is easy.
h3p288	如果你不在，我会很想你。	Rú guǒ nǐ bú zài, wǒ huì hěn xiǎng nǐ.	If you're not here, I'll miss you a lot.
h3p289	如果明天下雨，我们就在家玩。	Rú guǒ míng tiān xià yǔ, wǒ men jiù zài jiā wán.	If it rains tomorrow, we'll play at home.
h3p290	外面下雨了，你带伞了吗？	Wài mian xià yǔ le, nǐ dài sǎn le ma?	It's raining out. Did you bring an umbrella?
h3p291	那把伞是谁的？	Nà bǎ sǎn shì shéi de?	Whose umbrella is that?
h3p292	你在上网吗？	Nǐ zài shàng wǎng ma?	Are you online?
h3p293	你又上网了，不和我玩吗？	Nǐ yòu shàng wǎng le, bù hé wǒ wán ma?	You're online again. Aren't you going to play with me?
h3p294	你别生气，我不是故意的。	Nǐ bié shēng qì, wǒ bú shì gù yì de.	Don't be angry. I didn't mean to.
h3p295	我生气了！你为什么把我放下？	Wǒ shēng qì le! Nǐ wèi shén me bǎ wǒ fàng xià?	I'm angry! Why did you put me down?
h3p296	外面有很大的声音，我有点儿怕。	Wài mian yǒu hěn dà de shēng yīn, wǒ yǒu diǎnr pà.	There's a loud noise outside. I'm a little scared.
h3p297	你的声音真好听。	Nǐ de shēng yīn zhēn hǎo tīng.	Your voice is really nice.
h3p298	这个世界真大啊！	Zhè ge shì jiè zhēn dà a!	This world is so big!
h3p299	我想看看外面的世界。	Wǒ xiǎng kàn kan wài mian de shì jiè.	I want to see the world outside.
h3p300	我想试一试，可以吗？	Wǒ xiǎng shì yi shì, kě yǐ ma?	I'd like to give it a try. May I?
```
