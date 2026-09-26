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
h3p011	我只吃了半个蛋糕。	Wǒ zhǐ chī le bàn gè dàn gāo.	I only ate half a cake.
h3p019	你把我拿起来了！	Nǐ bǎ wǒ ná qǐ lái le!	You picked me up!
h3p049	我打算去公园玩儿。	Wǒ dǎ suàn qù gōng yuán wánr.	I plan to go and play in the park.
h3p067	今天天气多么好啊！	Jīn tiān tiān qì duō me hǎo a!	What lovely weather today!
h3p094	我的爱好是看地上的草。	Wǒ de ài hào shì kàn dì shang de cǎo.	My hobby is watching the grass on the ground.
h3p105	春天到了，外面有很多小动物。	Chūn tiān dào le, wài mian yǒu hěn duō xiǎo dòng wù.	Spring is here, and there are lots of little animals outside.
h3p121	天阴了，我担心会下雨。	Tiān yīn le, wǒ dān xīn huì xià yǔ.	The sky has clouded over. I'm worried it will rain.
h3p123	我最喜欢你的手，很舒服。	Wǒ zuì xǐ huan nǐ de shǒu, hěn shū fu.	I like your hands best. They feel nice.
h3p132	过去我住在水里。	Guò qù wǒ zhù zài shuǐ lǐ.	I used to live in the water.
h3p145	茶或者果汁，我都可以喝。	Chá huò zhě guǒ zhī, wǒ dōu kě yǐ hē.	Tea or juice, either is fine with me.
h3p148	今天出太阳了，我高兴极了！	Jīn tiān chū tài yáng le, wǒ gāo xìng jí le!	The sun is out today. I'm so happy!
h3p150	我最喜欢的季节是春天。	Wǒ zuì xǐ huan de jì jié shì chūn tiān.	Spring is my favorite season.
h3p154	明天见面时，我有东西要给你看。	Míng tiān jiàn miàn shí, wǒ yǒu dōng xi yào gěi nǐ kàn.	When we meet tomorrow, I have something to show you.
h3p183	我们的房子已经很旧了。	Wǒ men de fáng zi yǐ jīng hěn jiù le.	Our house is very old now.
h3p193	早上好，今天有什么好节目？	Zǎo shang hǎo, jīn tiān yǒu shén me hǎo jié mù?	Good morning! Any good shows on today?
h3p195	我先走了，明天见！	Wǒ xiān zǒu le, míng tiān jiàn!	I'm heading off first. See you tomorrow!
h3p202	谢谢你关心我，我好高兴。	Xiè xie nǐ guān xīn wǒ, wǒ hǎo gāo xìng.	Thanks for caring about me. I am so happy.
h3p208	我画了你，你看像不像？	Wǒ huà le nǐ, nǐ kàn xiàng bu xiàng?	I drew you. Does it look like you?
h3p210	你是晚上回来，还是明天早上回来？	Nǐ shì wǎn shang huí lái, hái shì míng tiān zǎo shang huí lái?	Are you coming back tonight or tomorrow morning?
h3p211	你决定去哪个公园了吗？	Nǐ jué dìng qù nǎ ge gōng yuán le ma?	Have you decided which park to go to?
h3p213	我不想让今天结束，再玩一会儿吧。	Wǒ bù xiǎng ràng jīn tiān jié shù, zài wán yí huìr ba.	I don't want today to end. Let's play a little longer.
h3p215	你的声音真好听，再讲一个故事吧。	Nǐ de shēng yīn zhēn hǎo tīng, zài jiǎng yí gè gù shì ba.	Your voice is lovely. Tell me another story.
h3p216	我几乎什么都记得，就是忘了你的生日。	Wǒ jī hū shén me dōu jì de, jiù shì wàng le nǐ de shēng rì.	I remember almost everything, except I forgot your birthday.
h3p220	我们一起检查一下冰箱吧。	Wǒ men yì qǐ jiǎn chá yí xià bīng xiāng ba.	Let us check the fridge together.
h3p227	你们国家有什么节日？	Nǐ men guó jiā yǒu shén me jié rì?	What festivals does your country have?
h3p232	你每天都很忙，我很关心你。	Nǐ měi tiān dōu hěn máng, wǒ hěn guān xīn nǐ.	You are busy every day. I care about you.
h3p241	另外，我还想吃一片面包。	Lìng wài, wǒ hái xiǎng chī yí piàn miàn bāo.	Also, I would like a slice of bread.
h3p257	你要走了，我有点儿难过。	Nǐ yào zǒu le, wǒ yǒu diǎnr nán guò.	You're leaving, and I feel a bit sad.
h3p272	其实我很想你。	Qí shí wǒ hěn xiǎng nǐ.	Actually, I really miss you.
h3p275	我没听清楚，你再说一遍吧。	Wǒ méi tīng qīng chǔ, nǐ zài shuō yí biàn ba.	I did not catch that. Say it again.
h3p306	这么高的树，我上不去。	Zhè me gāo de shù, wǒ shàng bú qù.	I can't climb a tree that tall.
h3p325	你喜欢体育吗？我们一起运动吧。	Nǐ xǐ huan tǐ yù ma? Wǒ men yì qǐ yùn dòng ba.	Do you like sports? Let us exercise together.
h3p329	有一条小鱼在水里游。	Yǒu yì tiáo xiǎo yú zài shuǐ lǐ yóu.	There is a little fish swimming in the water.
h3p330	你的同事对你好吗？	Nǐ de tóng shì duì nǐ hǎo ma?	Are your colleagues good to you?
h3p365	我像一条小小的鱼。	Wǒ xiàng yì tiáo xiǎo xiǎo de yú.	I look like a tiny fish.
h3p376	我爷爷也喜欢听音乐。	Wǒ yé ye yě xǐ huan tīng yīn yuè.	My grandpa likes listening to music too.
h3p386	我想喝一杯冷的饮料。	Wǒ xiǎng hē yì bēi lěng de yǐn liào.	I want a cold drink.
h3p392	你终于来了，太好了！	Nǐ zhōng yú lái le, tài hǎo le!	You're finally here, how wonderful!
h3p402	我想用照相机给你照张相。	Wǒ xiǎng yòng zhào xiàng jī gěi nǐ zhào zhāng xiāng.	I want to take your picture with the camera.
h3p413	过马路要注意车。	Guò mǎ lù yào zhù yì chē.	Pay attention to cars when crossing the road.
h3p430	夏天的晚上很舒服。	Xià tiān de wǎn shang hěn shū fu.	Summer nights are really pleasant.
h3p432	我喜欢这个小故事。	Wǒ xǐ huan zhè ge xiǎo gù shì.	I like this little story.
h3p436	小心，别把我放在地上。	Xiǎo xīn, bié bǎ wǒ fàng zài dì shang.	Careful, don't put me on the floor.
h3p450	你是我的家人，我很放心。	Nǐ shì wǒ de jiā rén, wǒ hěn fàng xīn.	You're my family, so I feel at ease.
h3p456	这杯饮料是谁的？	Zhè bēi yǐn liào shì shéi de?	Whose drink is this?
h3p468	我想要一个礼物，你能送我吗？	Wǒ xiǎng yào yí gè lǐ wù, nǐ néng sòng wǒ ma?	I want a present. Can you give me one?
```
