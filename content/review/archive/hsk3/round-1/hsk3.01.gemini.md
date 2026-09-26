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
h3p001	阿姨，你今天来得真早！	Ā yí, nǐ jīn tiān lái de zhēn zǎo!	Auntie, you're here so early today!
h3p002	啊，你回来了！	A, nǐ huí lái le!	Ah, you're back!
h3p003	我个子太矮，拿不到桌上的包。	Wǒ gè zi tài ǎi, ná bú dào zhuō shàng de bāo.	I'm too short to get the bag on the table.
h3p004	你的爱好是什么？	Nǐ de ài hào shì shén me?	What's your hobby?
h3p005	我的爱好是睡觉。	Wǒ de ài hào shì shuì jiào.	My hobby is sleeping.
h3p006	这里好安静，我想睡觉了。	Zhè lǐ hǎo ān jìng, wǒ xiǎng shuì jiào le.	It's so quiet here. I feel like sleeping.
h3p007	请你把我放在灯下面。	Qǐng nǐ bǎ wǒ fàng zài dēng xià mian.	Please put me under the light.
h3p008	你今天几点上班？	Nǐ jīn tiān jǐ diǎn shàng bān?	What time do you start work today?
h3p009	我们班的同学都很好。	Wǒ men bān de tóng xué dōu hěn hǎo.	Everyone in our class is nice.
h3p010	别搬我，我很重！	Bié bān wǒ, wǒ hěn zhòng!	Don't move me, I'm heavy!
h3p011	我只吃了半个蛋糕。	Wǒ zhī chī le bàn gè dàn gāo.	I only ate half a cake.
h3p012	我没有办法，只好等你。	Wǒ méi yǒu bàn fǎ, zhǐ hǎo děng nǐ.	I have no choice but to wait for you.
h3p013	你的办公室大不大？	Nǐ de bàn gōng shì dà bu dà?	Is your office big?
h3p014	你能帮忙拿一下这个吗？	Nǐ néng bāng máng ná yí xià zhè ge ma?	Can you help me carry this?
h3p015	你的包里有好吃的吗？	Nǐ de bāo lǐ yǒu hǎo chī de ma?	Is there anything tasty in your bag?
h3p016	我吃饱了，想睡觉。	Wǒ chī bǎo le, xiǎng shuì jiào.	I'm full and I want to sleep.
h3p017	我吃得好饱啊！	Wǒ chī de hǎo bǎo a!	I'm so full!
h3p018	我想去北方看雪。	Wǒ xiǎng qù běi fāng kàn xuě.	I want to go to the north to see snow.
h3p019	我被你拿起来了！	Wǒ bèi nǐ ná qǐ lái le!	You picked me up!
h3p020	我的鼻子有点儿冷。	Wǒ de bí zi yǒu diǎnr lěng.	My nose is a bit cold.
h3p021	今天比较冷，你多穿点儿。	Jīn tiān bǐ jiào lěng, nǐ duō chuān diǎnr.	It's rather cold today, so wear more.
h3p022	你的比赛什么时候开始？	Nǐ de bǐ sài shén me shí hou kāi shǐ?	When does your match start?
h3p023	你的笔记本可以借我吗？	Nǐ de bǐ jì běn kě yǐ jiè wǒ ma?	Can I borrow your notebook?
h3p024	你必须早点儿睡觉。	Nǐ bì xū zǎo diǎnr shuì jiào.	You must go to bed early.
h3p025	天气有变化，要下雨了。	Tiān qì yǒu biàn huà, yào xià yǔ le.	The weather is changing. It's going to rain.
h3p026	别人都走了，只有我在这儿。	Bié rén dōu zǒu le, zhǐ yǒu wǒ zài zhèr.	Everyone else has gone. Only I'm here.
h3p027	冰箱里有蛋糕吗？	Bīng xiāng lǐ yǒu dàn gāo ma?	Is there any cake in the fridge?
h3p028	我不但饿，而且很累。	Wǒ bú dàn è, ér qiě hěn lèi.	I'm not only hungry, I'm tired too.
h3p029	把菜单给我看看吧。	Bǎ cài dān gěi wǒ kàn kan ba.	Let me see the menu.
h3p030	你怎么才回来？	Nǐ zěn me cái huí lái?	Why are you only just back?
h3p031	我想参加你的比赛。	Wǒ xiǎng cān jiā nǐ de bǐ sài.	I want to take part in your match.
h3p032	外面的草绿了。	Wài mian de cǎo lǜ le.	The grass outside has turned green.
h3p033	你住在几层？	Nǐ zhù zài jǐ céng?	Which floor do you live on?
h3p034	我的成绩比上次差。	Wǒ de chéng jì bǐ shàng cì chà.	My grade is worse than last time.
h3p035	你带我去超市，好吗？	Nǐ dài wǒ qù chāo shì, hǎo ma?	Will you take me to the supermarket?
h3p036	你的衬衫真好看。	Nǐ de chèn shān zhēn hǎo kàn.	Your shirt looks really nice.
h3p037	我今天的成绩不错！	Wǒ jīn tiān de chéng jì bú cuò!	My grade today is pretty good!
h3p038	这个城市很大，也很漂亮。	Zhè ge chéng shì hěn dà, yě hěn piào liang.	This city is big and pretty.
h3p039	我快迟到了，你快点儿！	Wǒ kuài chí dào le, nǐ kuài diǎnr!	I'm going to be late, hurry up!
h3p040	你怎么又迟到了？	Nǐ zěn me yòu chí dào le?	Why are you late again?
h3p041	你终于出现了！	Nǐ zhōng yú chū xiàn le!	You finally showed up!
h3p042	除了你，我谁也不想见。	Chú le nǐ, wǒ shéi yě bù xiǎng jiàn.	I don't want to see anyone but you.
h3p043	厨房里有好吃的东西。	Chú fáng lǐ yǒu hǎo chī de dōng xi.	There's something tasty in the kitchen.
h3p044	春天到了，我好高兴！	Chūn tiān dào le, wǒ hǎo gāo xìng!	Spring is here, I'm so happy!
h3p045	这个词语是什么意思？	Zhè ge cí yǔ shì shén me yì si?	What does this word mean?
h3p046	你真聪明！	Nǐ zhēn cōng ming!	You're so clever!
h3p047	我打扫得很干净吧？	Wǒ dǎ sǎo de hěn gān jìng ba?	I cleaned it really well, didn't I?
h3p048	你今天打算做什么？	Nǐ jīn tiān dǎ suàn zuò shén me?	What do you plan to do today?
h3p049	我打算去公园玩儿。	Wǒ dǎ suàn qù gōng yuán wán ér.	I plan to go and play in the park.
h3p050	你出门要带手机。	Nǐ chū mén yào dài shǒu jī.	Take your phone when you go out.
h3p051	我很担心你。	Wǒ hěn dān xīn nǐ.	I'm worried about you.
h3p052	我想吃蛋糕，想吃很多。	Wǒ xiǎng chī dàn gāo, xiǎng chī hěn duō.	I want cake, a lot of it.
h3p053	你饿了吗？当然要吃饭！	Nǐ è le ma? Dāng rán yào chī fàn!	Are you hungry? Of course you need to eat!
h3p054	我慢慢地走过去。	Wǒ màn màn de zǒu guò qu.	I walk over slowly.
h3p055	把灯关了吧，我要睡觉了。	Bǎ dēng guān le ba, wǒ yào shuì jiào le.	Turn off the light, I'm going to sleep.
h3p056	这个地方真漂亮。	Zhè ge dì fang zhēn piào liang.	This place is really pretty.
h3p057	你坐地铁去上班吗？	Nǐ zuò dì tiě qù shàng bān ma?	Do you take the subway to work?
h3p058	你看得懂这张地图吗？	Nǐ kàn de dǒng zhè zhāng dì tú ma?	Can you read this map?
h3p059	电梯坏了，只能走楼梯。	Diàn tī huài le, zhǐ néng zǒu lóu tī.	The elevator is broken, so we have to take the stairs.
h3p060	你有新的电子邮件！	Nǐ yǒu xīn de diàn zǐ yóu jiàn!	You've got a new email!
```
