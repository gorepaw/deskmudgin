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
h3p121	根据天气，今天可能会下雨。	Gēn jù tiān qì, jīn tiān kě néng huì xià yǔ.	Going by the weather, it might rain today.
h3p122	我想跟你一起去公园。	Wǒ xiǎng gēn nǐ yì qǐ qù gōng yuán.	I want to go to the park with you.
h3p123	我更喜欢你的手，很舒服。	Wǒ gèng xǐ huan nǐ de shǒu, hěn shū fu.	I like your hands even better. They feel nice.
h3p124	公园里的花开了，好看极了！	Gōng yuán lǐ de huā kāi le, hǎo kàn jí le!	The flowers in the park are out. They're so pretty!
h3p125	给我讲一个故事吧。	Gěi wǒ jiǎng yí gè gù shì ba.	Tell me a story.
h3p126	外面在刮风，我不想出去。	Wài mian zài guā fēng, wǒ bù xiǎng chū qù.	It's windy outside. I don't want to go out.
h3p127	请把灯关了，我想睡觉。	Qǐng bǎ dēng guān le, wǒ xiǎng shuì jiào.	Please turn off the light. I want to sleep.
h3p128	你和我的关系最好了！	Nǐ hé wǒ de guān xi zuì hǎo le!	You and I are the best of friends!
h3p129	谢谢你这么关心我。	Xiè xie nǐ zhè me guān xīn wǒ.	Thank you for caring about me so much.
h3p130	关于明天，你有什么打算？	Guān yú míng tiān, nǐ yǒu shén me dǎ suàn?	What are your plans for tomorrow?
h3p131	你去过几个国家？	Nǐ qù guo jǐ gè guó jiā?	How many countries have you been to?
h3p132	过去我住在水里。	Guò qu wǒ zhù zài shuǐ lǐ.	I used to live in the water.
h3p133	你想吃蛋糕还是面包？	Nǐ xiǎng chī dàn gāo hái shì miàn bāo?	Would you like cake or bread?
h3p134	外面下大雨，我好害怕。	Wài mian xià dà yǔ, wǒ hǎo hài pà.	It is pouring outside. I am so scared.
h3p135	黑板上写的字，我看不懂。	Hēi bǎn shàng xiě de zì, wǒ kàn bù dǒng.	I can't read what's written on the blackboard.
h3p136	后来我又睡着了。	Hòu lái wǒ yòu shuì zháo le.	Afterwards I fell asleep again.
h3p137	你的护照在哪儿？	Nǐ de hù zhào zài nǎr?	Where's your passport?
h3p138	我想把钱花在好吃的东西上。	Wǒ xiǎng bǎ qián huā zài hǎo chī de dōng xi shàng.	I want to spend my money on tasty things.
h3p139	我想画一只大鱼。	Wǒ xiǎng huà yì zhī dà yú.	I want to draw a big fish.
h3p140	我的东西坏了，你能帮我吗？	Wǒ de dōng xi huài le, nǐ néng bāng wǒ ma?	Something of mine is broken. Can you help me?
h3p141	这里的环境真好，很安静。	Zhè lǐ de huán jìng zhēn hǎo, hěn ān jìng.	It's lovely here. So quiet.
h3p142	我想换一个新的家。	Wǒ xiǎng huàn yí gè xīn de jiā.	I want to switch to a new home.
h3p143	你去过黄河吗？	Nǐ qù guo huáng hé ma?	Have you ever been to the Yellow River?
h3p144	你今天有会议吗？别忘了我！	Nǐ jīn tiān yǒu huì yì ma? Bié wàng le wǒ!	Do you have a meeting today? Don't forget about me!
h3p145	你想喝茶或者果汁？	Nǐ xiǎng hē chá huò zhě guǒ zhī?	Would you like tea or juice?
h3p146	我几乎每天都想你。	Wǒ jī hū měi tiān dōu xiǎng nǐ.	I think of you almost every day.
h3p147	这是个好机会，我们出去玩吧！	Zhè shì gè hǎo jī huì, wǒ men chū qù wán ba!	This is a great chance. Let's go out and play!
h3p148	今天太阳很好，我高兴极了！	Jīn tiān tài yáng hěn hǎo, wǒ gāo xìng jí le!	The sun is out today. I'm so happy!
h3p149	你还记得我的名字吗？	Nǐ hái jì de wǒ de míng zi ma?	Do you still remember my name?
h3p150	我最喜欢春天这个季节。	Wǒ zuì xǐ huan chūn tiān zhè ge jì jié.	Spring is my favorite season.
h3p151	让我检查一下你的包里有没有吃的。	Ràng wǒ jiǎn chá yí xià nǐ de bāo lǐ yǒu méi yǒu chī de.	Let me check whether there's any food in your bag.
h3p152	这个很简单，我也会！	Zhè ge hěn jiǎn dān, wǒ yě huì!	This is easy. Even I can do it!
h3p153	多吃水果，身体才健康。	Duō chī shuǐ guǒ, shēn tǐ cái jiàn kāng.	Eat more fruit and you'll be healthy.
h3p154	明天见面的时候，我要给你看东西。	Míng tiān jiàn miàn de shí hou, wǒ yào gěi nǐ kàn dōng xi.	When we meet tomorrow, I have something to show you.
h3p155	我给你讲讲今天的事情吧。	Wǒ gěi nǐ jiǎng jiǎng jīn tiān de shì qing ba.	Let me tell you what happened today.
h3p156	你教我说话，好不好？	Nǐ jiāo wǒ shuō huà, hǎo bu hǎo?	Will you teach me to talk?
h3p157	我喜欢坐在桌子的一角。	Wǒ xǐ huan zuò zài zhuō zi de yì jiǎo.	I like sitting on the corner of the table.
h3p158	我的脚好冷。	Wǒ de jiǎo hǎo lěng.	My feet are so cold.
h3p159	你能来接我吗？	Nǐ néng lái jiē wǒ ma?	Can you come and pick me up?
h3p160	电视里有一个好看的节目。	Diàn shì lǐ yǒu yí gè hǎo kàn de jié mù.	There's a good show on TV.
h3p161	今天是节日，我们吃好吃的吧！	Jīn tiān shì jié rì, wǒ men chī hǎo chī de ba!	It's a holiday today. Let's eat something yummy!
h3p162	两只小鱼要结婚了！	Liǎng zhī xiǎo yú yào jié hūn le!	Two little fish are getting married!
h3p163	会议什么时候结束？	Huì yì shén me shí hou jié shù?	When does the meeting end?
h3p164	我不会做这个，你能帮我解决吗？	Wǒ bú huì zuò zhè ge, nǐ néng bāng wǒ jiě jué ma?	I can't do this. Can you sort it out for me?
h3p165	我可以借你的椅子坐一下吗？	Wǒ kě yǐ jiè nǐ de yǐ zi zuò yí xià ma?	Can I borrow your chair for a bit?
h3p166	你为什么经常不理我？	Nǐ wèi shén me jīng cháng bù lǐ wǒ?	Why do you so often ignore me?
h3p167	我看到一只猫经过门口。	Wǒ kàn dào yì zhī māo jīng guò mén kǒu.	I saw a cat pass by the door.
h3p168	你的经理今天不高兴吗？	Nǐ de jīng lǐ jīn tiān bù gāo xìng ma?	Is your manager in a bad mood today?
h3p169	你走了好久，我一个人好难过。	Nǐ zǒu le hǎo jiǔ, wǒ yí gè rén hǎo nán guò.	You have been gone so long. I am so sad on my own.
h3p170	这本旧书是我最爱的。	Zhè běn jiù shū shì wǒ zuì ài de.	This old book is my favorite.
h3p171	你能教我说这个句子吗？	Nǐ néng jiāo wǒ shuō zhè ge jù zi ma?	Can you teach me to say this sentence?
h3p172	我决定了，今天不睡觉！	Wǒ jué dìng le, jīn tiān bú shuì jiào!	I've decided. I'm not sleeping today!
h3p173	你的脸好可爱！	Nǐ de liǎn hǎo kě ài!	Your face is so cute!
h3p174	我渴了，想喝水。	Wǒ kě le, xiǎng hē shuǐ.	I'm thirsty. I want some water.
h3p175	现在是三点一刻。	Xiàn zài shì sān diǎn yí kè.	It's a quarter past three.
h3p176	有客人来了，快去开门！	Yǒu kè rén lái le, kuài qù kāi mén!	A guest is here. Go and open the door!
h3p177	空调太冷了，我要感冒了。	Kōng tiáo tài lěng le, wǒ yào gǎn mào le.	The air conditioning is too cold. I'm going to catch a cold.
h3p178	我想吃一口你的蛋糕。	Wǒ xiǎng chī yì kǒu nǐ de dàn gāo.	I'd like a bite of your cake.
h3p179	你走了，我想哭。	Nǐ zǒu le, wǒ xiǎng kū.	You're leaving, and I want to cry.
h3p180	你的裤子真好看。	Nǐ de kù zi zhēn hǎo kàn.	Your trousers look really nice.
```
