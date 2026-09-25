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
h2p241	我告诉你一件事情。	Wǒ gào su nǐ yí jiàn shì qing.	Let me tell you something.
h2p242	别告诉他！	Bié gào su tā!	Don't tell him!
h2p243	你能帮助我吗？	Nǐ néng bāng zhù wǒ ma?	Can you help me?
h2p244	谢谢你的帮助。	Xiè xie nǐ de bāng zhù.	Thank you for your help.
h2p245	我来介绍一下。	Wǒ lái jiè shào yí xià.	Let me introduce everyone.
h2p246	请进！	Qǐng jìn!	Please come in!
h2p247	请等一下。	Qǐng děng yí xià.	Please wait a moment.
h2p248	等等我！	Děng děng wǒ!	Wait for me!
h2p249	我们一起走吧。	Wǒ men yì qǐ zǒu ba.	Let's go together.
h2p250	你走得太快了！	Nǐ zǒu de tài kuài le!	You're walking too fast!
h2p251	我不想洗衣服。	Wǒ bù xiǎng xǐ yī fu.	I don't want to do the laundry.
h2p252	我去洗手。	Wǒ qù xǐ shǒu.	I'm going to wash my hands.
h2p253	他在看报纸。	Tā zài kàn bào zhǐ.	He's reading the newspaper.
h2p254	我喜欢喝咖啡。	Wǒ xǐ huan hē kā fēi.	I like drinking coffee.
h2p255	咖啡太热了。	Kā fēi tài rè le.	The coffee is too hot.
h2p256	我每天早上喝牛奶。	Wǒ měi tiān zǎo shang hē niú nǎi.	I drink milk every morning.
h2p257	我不吃羊肉。	Wǒ bù chī yáng ròu.	I don't eat lamb.
h2p258	这家饭店的菜很好吃。	Zhè jiā fàn diàn de cài hěn hǎo chī.	The food at this restaurant is very tasty.
h2p259	服务员，我们要两杯茶。	Fú wù yuán, wǒ men yào liǎng bēi chá.	Waiter, we'd like two cups of tea.
h2p260	我生病了。	Wǒ shēng bìng le.	I'm sick.
h2p261	你要吃药。	Nǐ yào chī yào.	You need to take medicine.
h2p262	你身体怎么样？	Nǐ shēn tǐ zěn me yàng?	How are you feeling?
h2p263	我明天要去医院。	Wǒ míng tiān yào qù yī yuàn.	I have to go to the hospital tomorrow.
h2p264	多喝水，多休息。	Duō hē shuǐ, duō xiū xi.	Drink lots of water and get lots of rest.
h2p265	门开着。	Mén kāi zhe.	The door is open.
h2p266	请开门！	Qǐng kāi mén!	Please open the door!
h2p267	你在外面吗？	Nǐ zài wài miàn ma?	Are you outside?
h2p268	外面有人。	Wài miàn yǒu rén.	There's someone outside.
h2p269	我们进去吧。	Wǒ men jìn qù ba.	Let's go in.
h2p270	你出来！	Nǐ chū lái!	Come out!
h2p271	我不想出去。	Wǒ bù xiǎng chū qù.	I don't want to go out.
h2p272	我可以进来吗？	Wǒ kě yǐ jìn lái ma?	May I come in?
h2p273	他出去了。	Tā chū qù le.	He's gone out.
h2p274	那个人是男的还是女的？	Nà ge rén shì nán de hái shì nǚ de?	Is that person a man or a woman?
h2p275	你姓什么？	Nǐ xìng shén me?	What's your surname?
h2p276	我有两百块钱。	Wǒ yǒu liǎng bǎi kuài qián.	I have two hundred yuan.
h2p277	一千块太贵了！	Yì qiān kuài tài guì le!	A thousand yuan is too expensive!
h2p278	我是第一！	Wǒ shì dì yī!	I'm number one!
h2p279	我最高！	Wǒ zuì gāo!	I'm the tallest!
h2p280	你比我快。	Nǐ bǐ wǒ kuài.	You're faster than me.
h2p281	他比我大两岁。	Tā bǐ wǒ dà liǎng suì.	He's two years older than me.
h2p282	这个比那个好。	Zhè ge bǐ nà ge hǎo.	This one is better than that one.
h2p283	我没有你高。	Wǒ méi yǒu nǐ gāo.	I'm not as tall as you.
h2p284	这是新的吗？	Zhè shì xīn de ma?	Is this new?
h2p285	我有一个新手机。	Wǒ yǒu yí gè xīn shǒu jī.	I have a new phone.
h2p286	我喜欢你的新衣服。	Wǒ xǐ huan nǐ de xīn yī fu.	I like your new clothes.
h2p287	这本书我看完了。	Zhè běn shū wǒ kàn wán le.	I've finished reading this book.
h2p288	你做完了吗？	Nǐ zuò wán le ma?	Are you done?
h2p289	我还没做完。	Wǒ hái méi zuò wán.	I haven't finished yet.
h2p290	我们开始吧！	Wǒ men kāi shǐ ba!	Let's begin!
h2p291	我们什么时候开始？	Wǒ men shén me shí hou kāi shǐ?	When do we start?
h2p292	你准备好了吗？	Nǐ zhǔn bèi hǎo le ma?	Are you ready?
h2p293	我准备好了！	Wǒ zhǔn bèi hǎo le!	I'm ready!
h2p294	我希望明天是晴天。	Wǒ xī wàng míng tiān shì qíng tiān.	I hope it's sunny tomorrow.
h2p295	我希望你快乐。	Wǒ xī wàng nǐ kuài lè.	I hope you're happy.
h2p296	可能吧。	Kě néng ba.	Maybe.
h2p297	这样可以吗？	Zhè yàng kě yǐ ma?	Is this OK?
h2p298	不可以！	Bù kě yǐ!	No, you can't!
h2p299	我可以坐这儿吗？	Wǒ kě yǐ zuò zhèr ma?	May I sit here?
h2p300	你要去哪儿？	Nǐ yào qù nǎr?	Where are you going?
```
