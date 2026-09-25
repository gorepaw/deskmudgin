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
h2p421	我喜欢它。	Wǒ xǐ huan tā.	I like it.
h2p422	别看！	Bié kàn!	Don't look!
h2p423	你真的要走吗？	Nǐ zhēn de yào zǒu ma?	Are you really leaving?
h2p424	我真的不知道。	Wǒ zhēn de bù zhī dào.	I really don't know.
h2p425	这个真大！	Zhè ge zhēn dà!	This is really big!
h2p426	你真高！	Nǐ zhēn gāo!	You're really tall!
h2p427	今天真冷！	Jīn tiān zhēn lěng!	It's really cold today!
h2p428	你是我最好的朋友。	Nǐ shì wǒ zuì hǎo de péng you.	You're my best friend.
h2p429	我最不喜欢考试。	Wǒ zuì bù xǐ huan kǎo shì.	I like exams least of all.
h2p430	我准备了很多吃的。	Wǒ zhǔn bèi le hěn duō chī de.	I've prepared lots of food.
h2p431	我希望能去中国。	Wǒ xī wàng néng qù zhōng guó.	I hope I can go to China.
h2p432	他可能不来了。	Tā kě néng bù lái le.	He might not come.
h2p433	我可能错了。	Wǒ kě néng cuò le.	I might be wrong.
h2p434	我已经知道了。	Wǒ yǐ jīng zhī dào le.	I already know.
h2p435	已经十点了！	Yǐ jīng shí diǎn le!	It's already ten o'clock!
h2p436	你在等谁？	Nǐ zài děng shéi?	Who are you waiting for?
h2p437	你等我一下。	Nǐ děng wǒ yí xià.	Wait for me a moment.
h2p438	他在找你。	Tā zài zhǎo nǐ.	He's looking for you.
h2p439	我找到了！	Wǒ zhǎo dào le!	I found it!
h2p440	你找什么？	Nǐ zhǎo shén me?	What are you looking for?
h2p441	这儿的东西都很便宜。	Zhèr de dōng xi dōu hěn pián yi.	Everything here is cheap.
h2p442	西瓜怎么卖？	Xī guā zěn me mài?	How much is the watermelon?
h2p443	这个卖完了。	Zhè ge mài wán le.	This is sold out.
h2p444	你会打篮球吗？	Nǐ huì dǎ lán qiú ma?	Can you play basketball?
h2p445	我不会跳舞。	Wǒ bú huì tiào wǔ.	I can't dance.
h2p446	我身体很好。	Wǒ shēn tǐ hěn hǎo.	I'm in good health.
h2p447	你要多运动。	Nǐ yào duō yùn dòng.	You should exercise more.
h2p448	跑步很累。	Pǎo bù hěn lèi.	Running is tiring.
h2p449	游泳很有意思。	Yóu yǒng hěn yǒu yì si.	Swimming is fun.
```
