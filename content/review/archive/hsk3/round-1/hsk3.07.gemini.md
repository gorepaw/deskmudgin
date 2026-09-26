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
h3p361	你先吃，我等一会儿。	Nǐ xiān chī, wǒ děng yí huìr.	You eat first, and I'll wait a bit.
h3p362	我相信你会回来的。	Wǒ xiāng xìn nǐ huì huí lái de.	I believe you'll come back.
h3p363	我最爱吃的是香蕉。	Wǒ zuì ài chī de shì xiāng jiāo.	What I love to eat most is bananas.
h3p364	你为什么一直向我笑？	Nǐ wèi shén me yì zhí xiàng wǒ xiào?	Why do you keep smiling at me?
h3p365	我像一只小小的鱼。	Wǒ xiàng yì zhī xiǎo xiǎo de yú.	I look like a tiny fish.
h3p366	路上小心，早点回来。	Lù shang xiǎo xīn, zǎo diǎn huí lái.	Be careful on the road, and come back early.
h3p367	你们的校长今天来了吗？	Nǐ men de xiào zhǎng jīn tiān lái le ma?	Did your principal come today?
h3p368	今天的新闻你看了吗？	Jīn tiān de xīn wén nǐ kàn le ma?	Did you see today's news?
h3p369	这个苹果很新鲜，快来吃。	Zhè ge píng guǒ hěn xīn xiān, kuài lái chī.	This apple is really fresh, come and eat.
h3p370	你有新的信吗？我在等。	Nǐ yǒu xīn de xìn ma? Wǒ zài děng.	Do you have a new letter? I'm waiting.
h3p371	你的行李箱好大啊。	Nǐ de xíng li xiāng hǎo dà a.	Your suitcase is so big.
h3p372	我想变成一只大熊猫。	Wǒ xiǎng biàn chéng yì zhī dà xióng māo.	I want to turn into a giant panda.
h3p373	我需要你在我旁边。	Wǒ xū yào nǐ zài wǒ páng biān.	I need you next to me.
h3p374	你想选择哪一个？	Nǐ xiǎng xuǎn zé nǎ yí gè?	Which one do you want to choose?
h3p375	我有一个小小的要求：别走。	Wǒ yǒu yí gè xiǎo xiǎo de yāo qiú: bié zǒu.	I have one small request: don't go.
h3p376	我爷爷也喜欢这个歌。	Wǒ yé ye yě xǐ huan zhè ge gē.	My grandpa likes this song too.
h3p377	明天一定是个好天气。	Míng tiān yí dìng shì gè hǎo tiān qì.	Tomorrow will surely be nice weather.
h3p378	今天一共有五个人来看我。	Jīn tiān yí gòng yǒu wǔ gè rén lái kàn wǒ.	Altogether five people came to see me today.
h3p379	我睡一会儿，别叫我。	Wǒ shuì yí huìr, bié jiào wǒ.	I'll sleep for a bit, don't wake me.
h3p380	你和我一样喜欢吃蛋糕。	Nǐ hé wǒ yí yàng xǐ huan chī dàn gāo.	You like cake just like I do.
h3p381	我一直在等你回家。	Wǒ yì zhí zài děng nǐ huí jiā.	I've been waiting for you to come home all along.
h3p382	以前我住在水里。	Yǐ qián wǒ zhù zài shuǐ lǐ.	I used to live in the water.
h3p383	我一般晚上不睡觉。	Wǒ yì bān wǎn shang bú shuì jiào.	I generally don't sleep at night.
h3p384	这个音乐真好听。	Zhè ge yīn yuè zhēn hǎo tīng.	This music sounds really nice.
h3p385	你去银行做什么？	Nǐ qù yín háng zuò shén me?	What are you going to the bank for?
h3p386	我想喝一杯冷饮料。	Wǒ xiǎng hē yì bēi lěng yǐn liào.	I want a cold drink.
h3p387	你应该早点睡觉。	Nǐ yīng gāi zǎo diǎn shuì jiào.	You should go to bed earlier.
h3p388	天气会影响我的心情。	Tiān qì huì yǐng xiǎng wǒ de xīn qíng.	The weather affects my mood.
h3p389	我可以用一下你的笔吗？	Wǒ kě yǐ yòng yí xià nǐ de bǐ ma?	Can I use your pen for a moment?
h3p390	我喜欢这个游戏，再玩一次。	Wǒ xǐ huan zhè ge yóu xì, zài wán yí cì.	I like this game, let's play once more.
h3p391	你的朋友很有名吧？	Nǐ de péng you hěn yǒu míng ba?	Your friend is quite famous, isn't he?
h3p392	你又来了，太好了！	Nǐ yòu lái le, tài hǎo le!	You're here again, great!
h3p393	我今天在路上遇到一只猫。	Wǒ jīn tiān zài lù shang yù dào yì zhī māo.	I ran into a cat on the road today.
h3p394	你愿意和我一起玩吗？	Nǐ yuàn yì hé wǒ yì qǐ wán ma?	Are you willing to play with me?
h3p395	今晚的月亮又大又亮。	Jīn wǎn de yuè liang yòu dà yòu liàng.	Tonight's moon is big and bright.
h3p396	天越来越冷了。	Tiān yuè lái yuè lěng le.	It's getting colder and colder.
h3p397	我在车站等你。	Wǒ zài chē zhàn děng nǐ.	I'll wait for you at the station.
h3p398	请给我一张纸。	Qǐng gěi wǒ yì zhāng zhǐ.	Please give me a sheet of paper.
h3p399	你怎么还不回来，我好着急。	Nǐ zěn me hái bù huí lái, wǒ hǎo zháo jí.	Why aren't you back yet? I'm so worried.
h3p400	请你照顾我，好吗？	Qǐng nǐ zhào gù wǒ, hǎo ma?	Please take care of me, okay?
h3p401	这张照片是谁给你的？	Zhè zhāng zhào piàn shì shéi gěi nǐ de?	Who gave you this photo?
h3p402	我想用照相机看看你。	Wǒ xiǎng yòng zhào xiàng jī kàn kan nǐ.	I want to look at you with the camera.
h3p403	桌子上有一只小鸟。	Zhuō zi shang yǒu yì zhī xiǎo niǎo.	There's a little bird on the table.
h3p404	我只有你一个朋友。	Wǒ zhǐ yǒu nǐ yí gè péng you.	You're my only friend.
h3p405	我坐在桌子中间。	Wǒ zuò zài zhuō zi zhōng jiān.	I'm sitting in the middle of the table.
h3p406	我在学中文，你教教我吧。	Wǒ zài xué zhōng wén, nǐ jiāo jiāo wǒ ba.	I'm learning Chinese, so teach me.
h3p407	你终于回来了！	Nǐ zhōng yú huí lái le!	You're finally back!
h3p408	你喜欢哪一种水果？	Nǐ xǐ huan nǎ yì zhǒng shuǐ guǒ?	Which kind of fruit do you like?
h3p409	今天的书包好重啊。	Jīn tiān de shū bāo hǎo zhòng a.	Today's school bag is so heavy.
h3p410	你最重要，别走。	Nǐ zuì zhòng yào, bié zǒu.	You're the most important, don't go.
h3p411	这个周末你有空吗？	Zhè ge zhōu mò nǐ yǒu kōng ma?	Are you free this weekend?
h3p412	我主要吃蛋糕和水果。	Wǒ zhǔ yào chī dàn gāo hé shuǐ guǒ.	I mainly eat cake and fruit.
h3p413	过马路要注意车。	Guo mǎ lù yào zhù yì chē.	Pay attention to cars when crossing the road.
h3p414	我想自己试一试。	Wǒ xiǎng zì jǐ shì yi shì.	I want to try it myself.
h3p415	我想骑自行车去玩。	Wǒ xiǎng qí zì xíng chē qù wán.	I want to ride a bike and play.
h3p416	你总是这么早起来。	Nǐ zǒng shì zhè me zǎo qǐ lái.	You always get up this early.
h3p417	最后一块蛋糕给我吧。	Zuì hòu yí kuài dàn gāo gěi wǒ ba.	Give me the last piece of cake.
h3p418	你最近好吗？我想你了。	Nǐ zuì jìn hǎo ma? Wǒ xiǎng nǐ le.	How have you been lately? I missed you.
h3p419	你的作业做完了吗？	Nǐ de zuò yè zuò wán le ma?	Have you finished your homework?
h3p420	请再说一遍。	Qǐng zài shuō yí biàn.	Please say it once more.
```
