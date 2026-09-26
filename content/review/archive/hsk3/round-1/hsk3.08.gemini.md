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
h3p421	我家对面有一个大商店。	Wǒ jiā duì miàn yǒu yí gè dà shāng diàn.	There's a big shop across from my home.
h3p422	别忘了，明天我一定要吃鱼。	Bié wàng le, míng tiān wǒ yí dìng yào chī yú.	Don't forget, tomorrow I absolutely want fish.
h3p423	为了吃蛋糕，我一直在等。	Wèi le chī dàn gāo, wǒ yì zhí zài děng.	I've been waiting just to have cake.
h3p424	我们这里有三位小朋友。	Wǒ men zhè lǐ yǒu sān wèi xiǎo péng you.	There are three little kids here.
h3p425	我想去看看别的文化。	Wǒ xiǎng qù kàn kan bié de wén huà.	I want to go see other cultures.
h3p426	你往西走，我往东走。	Nǐ wǎng xī zǒu, wǒ wǎng dōng zǒu.	You go west, and I'll go east.
h3p427	你的新习惯是什么？	Nǐ de xīn xí guàn shì shén me?	What's your new habit?
h3p428	我一个人不想去洗手间。	Wǒ yí gè rén bù xiǎng qù xǐ shǒu jiān.	I don't want to go to the restroom alone.
h3p429	洗完澡，我觉得很舒服。	Xǐ wán zǎo, wǒ jué de hěn shū fu.	After a bath I feel really comfortable.
h3p430	夏天的晚上很好玩。	Xià tiān de wǎn shang hěn hǎo wán.	Summer nights are lots of fun.
h3p431	我想先睡，你也早点睡。	Wǒ xiǎng xiān shuì, nǐ yě zǎo diǎn shuì.	I want to sleep first, and you sleep early too.
h3p432	我相信这个小故事。	Wǒ xiāng xìn zhè ge xiǎo gù shì.	I believe this little story.
h3p433	香蕉是我最爱的水果。	Xiāng jiāo shì wǒ zuì ài de shuǐ guǒ.	Bananas are my favorite fruit.
h3p434	我向你跑过去了。	Wǒ xiàng nǐ pǎo guò qu le.	I ran over toward you.
h3p435	你像我的哥哥一样。	Nǐ xiàng wǒ de gē ge yí yàng.	You're like a big brother to me.
h3p436	小心，别把我放在地上。	Xiǎo xīn, bié bǎ wǒ fàng zài de shàng.	Careful, don't put me on the floor.
h3p437	校长今天没有来学校。	Xiào zhǎng jīn tiān méi yǒu lái xué xiào.	The principal didn't come to school today.
h3p438	我在电视上看新闻。	Wǒ zài diàn shì shàng kàn xīn wén.	I'm watching the news on TV.
h3p439	我要新鲜的鱼，不要旧的。	Wǒ yào xīn xiān de yú, bú yào jiù de.	I want fresh fish, not old.
h3p440	我给爷爷写了信。	Wǒ gěi yé ye xiě le xìn.	I wrote a letter to my grandpa.
h3p441	你的行李箱里有什么？	Nǐ de xíng li xiāng lǐ yǒu shén me?	What is in your suitcase?
h3p442	熊猫也喜欢吃东西。	Xióng māo yě xǐ huan chī dōng xi.	Pandas like eating too.
h3p443	我需要休息一下。	Wǒ xū yào xiū xi yí xià.	I need to rest for a bit.
h3p444	选择太多了，我不知道吃什么。	Xuǎn zé tài duō le, wǒ bù zhī dào chī shén me.	There are too many choices, and I don't know what to eat.
h3p445	你的要求我都记住了。	Nǐ de yāo qiú wǒ dōu jì zhù le.	I've remembered all your requests.
h3p446	爷爷的家很大。	Yé ye de jiā hěn dà.	Grandpa's home is very big.
h3p447	我一定会好好听话。	Wǒ yí dìng huì hǎo hǎo tīng huà.	I'll definitely be good and listen.
h3p448	我们一共有几个人？	Wǒ men yí gòng yǒu jǐ gè rén?	How many of us are there altogether?
h3p449	你等我一会儿，好吗？	Nǐ děng wǒ yí huìr, hǎo ma?	Wait for me a moment, okay?
h3p450	你和我一样，是我的家人。	Nǐ hé wǒ yí yàng, shì wǒ de jiā rén.	You're the same as me, you're my family.
h3p451	我一直想有个朋友。	Wǒ yì zhí xiǎng yǒu gè péng you.	I've always wanted a friend.
h3p452	以前的日子也很好。	Yǐ qián de rì zi yě hěn hǎo.	The days before were nice too.
h3p453	我们一般什么时候吃饭？	Wǒ men yì bān shén me shí hou chī fàn?	When do we usually eat?
h3p454	我在听音乐，别说话。	Wǒ zài tīng yīn yuè, bié shuō huà.	I'm listening to music, so don't talk.
h3p455	我们去银行旁边玩吧。	Wǒ men qù yín háng páng biān wán ba.	Let's go play next to the bank.
h3p456	这个饮料是谁的？	Zhè ge yǐn liào shì shéi de?	Whose drink is this?
h3p457	我应该去睡觉了。	Wǒ yīng gāi qù shuì jiào le.	I should go to sleep now.
h3p458	天气会影响我睡觉。	Tiān qì huì yǐng xiǎng wǒ shuì jiào.	The weather affects my sleep.
h3p459	你用什么听音乐？	Nǐ yòng shén me tīng yīn yuè?	What do you use to listen to music?
h3p460	我们再玩一个游戏吧。	Wǒ men zài wán yí gè yóu xì ba.	Let's play another game.
h3p461	这里最有名的是什么？	Zhè lǐ zuì yǒu míng de shì shén me?	What's the most famous thing here?
h3p462	你又忘记吃饭了吗？	Nǐ yòu wàng jì chī fàn le ma?	Did you forget to eat again?
h3p463	我今天遇到很多朋友。	Wǒ jīn tiān yù dào hěn duō péng you.	I ran into lots of friends today.
h3p464	我愿意一直和你在一起。	Wǒ yuàn yì yì zhí hé nǐ zài yì qǐ.	I'm willing to stay with you always.
h3p465	月亮出来了，晚安。	Yuè liang chū lái le, wǎn ān.	The moon is out, good night.
h3p466	我越吃越想吃。	Wǒ yuè chī yuè xiǎng chī.	The more I eat, the more I want.
h3p467	车站的人很多，我有点怕。	Chē zhàn de rén hěn duō, wǒ yǒu diǎn pà.	There are lots of people at the station, and I'm a bit scared.
h3p468	我想要一个礼物，你有吗？	Wǒ xiǎng yào yí gè lǐ wù, nǐ yǒu ma?	I want a present. Do you have one?
h3p469	我喜欢听历史故事。	Wǒ xǐ huan tīng lì shǐ gù shì.	I like listening to history stories.
h3p470	附近有一个公园，我们去玩吧！	Fù jìn yǒu yí gè gōng yuán, wǒ men qù wán ba!	There is a park nearby. Let's go and play!
h3p471	我一边吃饭，一边看电视。	Wǒ yì biān chī fàn, yì biān kàn diàn shì.	I am eating and watching TV at the same time.
h3p472	我的嘴好干，想喝水。	Wǒ de zuǐ hǎo gān, xiǎng hē shuǐ.	My mouth is so dry. I want some water.
```
