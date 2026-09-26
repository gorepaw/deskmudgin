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
h3p061	太阳从东边出来了。	Tài yáng cóng dōng biān chū lái le.	The sun is rising from the east.
h3p062	冬天太冷了，我不想出门。	Dōng tiān tài lěng le, wǒ bù xiǎng chū mén.	Winter is too cold, I don't want to go out.
h3p063	我最喜欢的动物是猫。	Wǒ zuì xǐ huan de dòng wù shì māo.	My favorite animal is the cat.
h3p064	我的腿很短。	Wǒ de tuǐ hěn duǎn.	My legs are short.
h3p065	这段路不太远。	Zhè duàn lù bú tài yuǎn.	This stretch of road isn't far.
h3p066	你每天锻炼吗？	Nǐ měi tiān duàn liàn ma?	Do you exercise every day?
h3p067	今天多么好的天气啊！	Jīn tiān duō me hǎo de tiān qì a!	What lovely weather today!
h3p068	我好饿啊，想吃面包。	Wǒ hǎo è a, xiǎng chī miàn bāo.	I'm so hungry. I want bread.
h3p069	我想去，而你不想去。	Wǒ xiǎng qù, ér nǐ bù xiǎng qù.	I want to go, but you don't.
h3p070	我有两只大耳朵。	Wǒ yǒu liǎng zhī dà ěr duo.	I have two big ears.
h3p071	你发烧了吗？	Nǐ fā shāo le ma?	Do you have a fever?
h3p072	我好像发烧了，头很疼。	Wǒ hǎo xiàng fā shāo le, tóu hěn téng.	I think I have a fever. My head hurts.
h3p073	你发现了什么？	Nǐ fā xiàn le shén me?	What did you find?
h3p074	在家很方便，什么都有。	Zài jiā hěn fāng biàn, shén me dōu yǒu.	It's convenient at home, there's everything.
h3p075	你把杯子放在哪儿了？	Nǐ bǎ bēi zi fàng zài nǎr le?	Where did you put the cup?
h3p076	你放心，我会在家等你。	Nǐ fàng xīn, wǒ huì zài jiā děng nǐ.	Rest assured, I'll wait for you at home.
h3p077	现在几点了？还差五分十二点。	Xiàn zài jǐ diǎn le? Hái chà wǔ fēn shí èr diǎn.	What time is it? Five to twelve.
h3p078	你发给我的邮件我看到了。	Nǐ fā gěi wǒ de yóu jiàn wǒ kàn dào le.	I saw the email you sent me.
h3p079	你在办公室累不累？	Nǐ zài bàn gōng shì lèi bu lèi?	Are you tired at the office?
h3p080	好舒服啊，再来一下！	Hǎo shū fu a, zài lái yí xià!	That feels great, do it again!
h3p081	啊，你把我放下来了！	A, nǐ bǎ wǒ fàng xià lái le!	Ah, you put me down!
h3p082	我一个人在家，好安静啊。	Wǒ yí gè rén zài jiā, hǎo ān jìng a.	I'm home alone. It's so quiet.
h3p083	你怎么才来？我等了好久。	Nǐ zěn me cái lái? Wǒ děng le hǎo jiǔ.	Why did you only just come? I've waited so long.
h3p084	我好像迟到了，快跑！	Wǒ hǎo xiàng chí dào le, kuài pǎo!	I think I'm late, run!
h3p085	啊，天亮了吗？	A, tiān liàng le ma?	Ah, is it morning already?
h3p086	别把我放在冰箱里！	Bié bǎ wǒ fàng zài bīng xiāng lǐ!	Don't put me in the fridge!
h3p087	你带我去参加比赛吧！	Nǐ dài wǒ qù cān jiā bǐ sài ba!	Take me to the match!
h3p088	你的成绩怎么样？	Nǐ de chéng jì zěn me yàng?	How were your grades?
h3p089	我想搬到北方去住。	Wǒ xiǎng bān dào běi fāng qù zhù.	I want to move to the north.
h3p090	这个包又大又重。	Zhè ge bāo yòu dà yòu zhòng.	This bag is big and heavy.
h3p091	超市里有很多吃的。	Chāo shì lǐ yǒu hěn duō chī de.	There's a lot to eat at the supermarket.
h3p092	你的鼻子和耳朵都红了。	Nǐ de bí zi hé ěr duo dōu hóng le.	Your nose and ears are both red.
h3p093	你打算几点睡觉？	Nǐ dǎ suàn jǐ diǎn shuì jiào?	When do you plan to go to bed?
h3p094	我的爱好是看地上的草。	Wǒ de ài hào shì kàn de shàng de cǎo.	My hobby is watching the grass on the ground.
h3p095	这里比较安静，我喜欢。	Zhè lǐ bǐ jiào ān jìng, wǒ xǐ huan.	It's fairly quiet here, I like it.
h3p096	别人都说我很矮。	Bié rén dōu shuō wǒ hěn ǎi.	Everyone says I'm short.
h3p097	下班了，你快回家吧。	Xià bān le, nǐ kuài huí jiā ba.	Work's over, come home soon.
h3p098	我在家里等你，你别担心。	Wǒ zài jiā lǐ děng nǐ, nǐ bié dān xīn.	I'll wait at home, don't worry.
h3p099	再见，路上要小心。	Zài jiàn, lù shang yào xiǎo xīn.	Bye, be careful on the way.
h3p100	你才走了半个小时，我就想你了。	Nǐ cái zǒu le bàn gè xiǎo shí, wǒ jiù xiǎng nǐ le.	You've only been gone half an hour and I miss you already.
h3p101	厨房的灯还亮着。	Chú fáng de dēng hái liàng zhe.	The kitchen light is still on.
h3p102	我想变得更聪明。	Wǒ xiǎng biàn de gèng cōng ming.	I want to become smarter.
h3p103	今天我必须锻炼一下。	Jīn tiān wǒ bì xū duàn liàn yí xià.	Today I have to exercise.
h3p104	我们一起打扫房间吧。	Wǒ men yì qǐ dǎ sǎo fáng jiān ba.	Let's clean the room together.
h3p105	春天，草地上有很多小动物。	Chūn tiān, cǎo de shàng yǒu hěn duō xiǎo dòng wù.	In spring there are lots of little animals on the lawn.
h3p106	我把蛋糕吃完了，真好吃！	Wǒ bǎ dàn gāo chī wán le, zhēn hǎo chī!	I finished the cake, it was so yummy!
h3p107	这个菜单上的词语我都不懂。	Zhè ge cài dān shàng de cí yǔ wǒ dōu bù dǒng.	I don't understand any of the words on this menu.
h3p108	你的电子邮件写得太短了。	Nǐ de diàn zǐ yóu jiàn xiě de tài duǎn le.	The email you wrote is too short.
h3p109	我的成绩进步了，你看！	Wǒ de chéng jì jìn bù le, nǐ kàn!	My grades have improved, look!
h3p110	今天的比赛我很开心！	Jīn tiān de bǐ sài wǒ hěn kāi xīn!	I had so much fun at the match today!
h3p111	你的办法真好！	Nǐ de bàn fǎ zhēn hǎo!	Your idea is really good!
h3p112	你要去哪个地方？	Nǐ yào qù nǎ gè dì fang?	Which place are you going to?
h3p113	这个地铁站人真多。	Zhè ge dì tiě zhàn rén zhēn duō.	There are so many people at this subway station.
h3p114	我在冰箱里发现了蛋糕！	Wǒ zài bīng xiāng lǐ fā xiàn le dàn gāo!	I found cake in the fridge!
h3p115	我一个人，好想有人帮忙。	Wǒ yí gè rén, hǎo xiǎng yǒu rén bāng máng.	I'm all alone, I wish someone would help.
h3p116	我想复习一下昨天的故事。	Wǒ xiǎng fù xí yí xià zuó tiān de gù shì.	I want to go over yesterday's story again.
h3p117	我刚才洗了脚，现在很干净！	Wǒ gāng cái xǐ le jiǎo, xiàn zài hěn gān jìng!	I just washed my feet, and now they're so clean!
h3p118	我好像感冒了，头有点儿疼。	Wǒ hǎo xiàng gǎn mào le, tóu yǒu diǎnr téng.	I think I've caught a cold. My head hurts a little.
h3p119	我对你的手机很感兴趣。	Wǒ duì nǐ de shǒu jī hěn gǎn xìng qù.	I'm really curious about your phone.
h3p120	刚才有一只鸟从我头上飞过去。	Gāng cái yǒu yì zhī niǎo cóng wǒ tóu shàng fēi guò qu.	A bird just flew over my head.
```
