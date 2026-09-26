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
h3p181	我不会用筷子。	Wǒ bú huì yòng kuài zi.	I can't use chopsticks.
h3p182	天是蓝的，草是绿的。	Tiān shì lán de, cǎo shì lǜ de.	The sky is blue and the grass is green.
h3p183	我们的房子已经很老了。	Wǒ men de fáng zi yǐ jīng hěn lǎo le.	Our house is very old now.
h3p184	别离开我，好吗？	Bié lí kāi wǒ, hǎo ma?	Don't leave me, okay?
h3p185	我今天没有力气。	Wǒ jīn tiān méi yǒu lì qi.	I have no strength today.
h3p186	你真厉害！	Nǐ zhēn lì hài!	You're amazing!
h3p187	我饿得没有力气了。	Wǒ è de méi yǒu lì qi le.	I'm so hungry I have no strength left.
h3p188	我渴极了，快给我水！	Wǒ kě jí le, kuài gěi wǒ shuǐ!	I am parched. Quick, get me some water!
h3p189	我好害怕，别放开我！	Wǒ hǎo hài pà, bié fàng kāi wǒ!	I'm so scared. Don't let go!
h3p190	你的手真干净，我喜欢。	Nǐ de shǒu zhēn gān jìng, wǒ xǐ huan.	Your hands are so clean. I like them.
h3p191	我的脚好疼，是不是坏了？	Wǒ de jiǎo hǎo téng, shì bu shì huài le?	My foot really hurts. Is it broken?
h3p192	我刚才睡着了，现在有力气了。	Wǒ gāng cái shuì zháo le, xiàn zài yǒu lì qi le.	I was just asleep, and now I have some energy.
h3p193	早上好，今天有什么好节目？	Zǎo shang hǎo, jīn tiān yǒu shén me hǎo jié mù?	Good morning! What's fun on today?
h3p194	又见面了，我好高兴！	Yòu jiàn miàn le, wǒ hǎo gāo xìng!	We meet again. I'm so happy!
h3p195	我要走了，明天再见面。	Wǒ yào zǒu le, míng tiān zài jiàn miàn.	I have to go. See you tomorrow.
h3p196	别关电脑，我还想玩。	Bié guān diàn nǎo, wǒ hái xiǎng wán.	Don't turn off the computer. I still want to play.
h3p197	没有你，我一个人好难过，想哭。	Méi yǒu nǐ, wǒ yí gè rén hǎo nán guò, xiǎng kū.	Without you I'm all alone and so sad I want to cry.
h3p198	谢谢你的蛋糕，好吃极了！	Xiè xie nǐ de dàn gāo, hǎo chī jí le!	Thanks for the cake. It's delicious!
h3p199	再给我一口，好不好？	Zài gěi wǒ yì kǒu, hǎo bu hǎo?	Give me one more bite, okay?
h3p200	这个东西好旧，我要吃了它。	Zhè ge dōng xi hǎo jiù, wǒ yào chī le tā.	This thing is so old. I am going to eat it up.
h3p201	我更饿了，你有吃的吗？	Wǒ gèng è le, nǐ yǒu chī de ma?	I'm even hungrier now. Have you got anything to eat?
h3p202	你今天很关心我，我好高兴。	Nǐ jīn tiān hěn guān xīn wǒ, wǒ hǎo gāo xìng.	You've been so caring today. I'm so happy.
h3p203	我们经常一起玩，我最开心了！	Wǒ men jīng cháng yì qǐ wán, wǒ zuì kāi xīn le!	We often play together, and it makes me so happy!
h3p204	你刚才去哪儿了？我想你了。	Nǐ gāng cái qù nǎr le? Wǒ xiǎng nǐ le.	Where did you go just now? I missed you.
h3p205	天气太热，我想开空调。	Tiān qì tài rè, wǒ xiǎng kāi kōng tiáo.	It's too hot. I want to turn on the air conditioning.
h3p206	门没关，风进来了。	Mén méi guān, fēng jìn lái le.	The door is not shut and the wind is coming in.
h3p207	你换了新裤子，真好看！	Nǐ huàn le xīn kù zi, zhēn hǎo kàn!	You changed into new trousers. They look great!
h3p208	我画了一个你，可爱吗？	Wǒ huà le yí gè nǐ, kě ài ma?	I drew you. Is it cute?
h3p209	我对做饭很感兴趣，教教我吧。	Wǒ duì zuò fàn hěn gǎn xìng qù, jiāo jiāo wǒ ba.	I'm interested in cooking. Teach me!
h3p210	你晚上还是早上回来？	Nǐ wǎn shang hái shì zǎo shang huí lái?	Are you coming back tonight or in the morning?
h3p211	你决定去哪个公园了吗？	Nǐ jué dìng qù nǎ gè gōng yuán le ma?	Have you decided which park to go to?
h3p212	这个季节，公园里的花最多。	Zhè ge jì jié, gōng yuán lǐ de huā zuì duō.	In this season the park has the most flowers.
h3p213	我不想结束今天，再玩一会儿吧。	Wǒ bù xiǎng jié shù jīn tiān, zài wán yí huìr ba.	I don't want today to end. Let's play a little longer.
h3p214	快到节日了，我想吃好吃的。	Kuài dào jié rì le, wǒ xiǎng chī hǎo chī de.	The festival is nearly here. I want something yummy.
h3p215	你说话的声音很好听，再讲一个吧。	Nǐ shuō huà de shēng yīn hěn hǎo tīng, zài jiǎng yí gè ba.	Your voice is lovely. Tell me another one.
h3p216	我几乎什么都记得，除了你的生日。	Wǒ jī hū shén me dōu jì de, chú le nǐ de shēng rì.	I remember almost everything, except your birthday.
h3p217	你家的街道很大吗？	Nǐ jiā de jiē dào hěn dà ma?	Is the street where you live big?
h3p218	我想借你的书看看。	Wǒ xiǎng jiè nǐ de shū kàn kan.	I'd like to borrow your book.
h3p219	会议开完了吗？我想找你玩。	Huì yì kāi wán le ma? Wǒ xiǎng zhǎo nǐ wán.	Is the meeting over? I want to play with you.
h3p220	我们一起检查一下，冰箱里有什么。	Wǒ men yì qǐ jiǎn chá yí xià, bīng xiāng lǐ yǒu shén me.	Let's check together what's in the fridge.
h3p221	蓝色的东西，我都喜欢。	Lán sè de dōng xi, wǒ dōu xǐ huan.	I like anything blue.
h3p222	我怕黑，你别关灯。	Wǒ pà hēi, nǐ bié guān dēng.	I'm afraid of the dark. Don't turn off the light.
h3p223	你为什么哭了？谁让你不高兴？	Nǐ wèi shén me kū le? Shéi ràng nǐ bù gāo xìng?	Why are you crying? Who upset you?
h3p224	你的国家有河吗？	Nǐ de guó jiā yǒu hé ma?	Does your country have rivers?
h3p225	我要去看看你的黑板上写了什么。	Wǒ yào qù kàn kan nǐ de hēi bǎn shàng xiě le shén me.	I want to see what is written on your blackboard.
h3p226	后来你去哪儿了？我等了你很久。	Hòu lái nǐ qù nǎr le? Wǒ děng le nǐ hěn jiǔ.	Where did you go afterwards? I waited for you a long time.
h3p227	你的国家有什么节日？	Nǐ de guó jiā yǒu shén me jié rì?	What festivals does your country have?
h3p228	我想学怎么解决问题。	Wǒ xiǎng xué zěn me jiě jué wèn tí.	I want to learn how to solve problems.
h3p229	我不想换衣服，我喜欢这件。	Wǒ bù xiǎng huàn yī fu, wǒ xǐ huan zhè jiàn.	I do not want to change clothes. I like this one.
h3p230	你今天检查作业了吗？	Nǐ jīn tiān jiǎn chá zuò yè le ma?	Did you check your homework today?
h3p231	我画的花好看吗？	Wǒ huà de huā hǎo kàn ma?	Does the flower I drew look nice?
h3p232	你每天都很忙，我很关心你。	Nǐ měi tiān dōu hěn máng, wǒ hěn guān xīn nǐ.	You are busy every day. I worry about you.
h3p233	今天刮风，我们别去公园了。	Jīn tiān guā fēng, wǒ men bié qù gōng yuán le.	It is windy today. Let us not go to the park.
h3p234	你的老朋友今天会来吗？	Nǐ de lǎo péng you jīn tiān huì lái ma?	Is your old friend coming today?
h3p235	我喜欢甜的东西，例如蛋糕和苹果。	Wǒ xǐ huan tián de dōng xi, lì rú dàn gāo hé píng guǒ.	I like sweet things, like cake and apples.
h3p236	我的脸有点儿绿，你看到了吗？	Wǒ de liǎn yǒu diǎnr lǜ, nǐ kàn dào le ma?	My face is a little green. Did you notice?
h3p237	我每天都练习跳舞。	Wǒ měi tiān dōu liàn xí tiào wǔ.	I practise dancing every day.
h3p238	一辆红色的车开过去了。	Yí liàng hóng sè de chē kāi guò qu le.	A red car just drove past.
h3p239	我想多了解你一点儿。	Wǒ xiǎng duō liǎo jiě nǐ yì diǎnr.	I want to get to know you a little better.
h3p240	邻居家的猫今天又来了。	Lín jū jiā de māo jīn tiān yòu lái le.	The neighbour's cat came over again today.
```
