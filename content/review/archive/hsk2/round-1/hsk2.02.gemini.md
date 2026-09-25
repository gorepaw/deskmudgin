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
h2p061	我最喜欢你了！	Wǒ zuì xǐ huan nǐ le!	I like you the most!
h2p062	你真好！	Nǐ zhēn hǎo!	You're really nice!
h2p063	我觉得很好。	Wǒ jué de hěn hǎo.	I feel great.
h2p064	我想唱歌！	Wǒ xiǎng chàng gē!	I want to sing!
h2p065	我们一起跳舞吧！	Wǒ men yì qǐ tiào wǔ ba!	Let's dance together!
h2p066	你看，我在笑！	Nǐ kàn, wǒ zài xiào!	Look, I'm smiling!
h2p067	我每天都很快乐。	Wǒ měi tiān dōu hěn kuài lè.	I'm happy every day.
h2p068	生日快乐！	Shēng rì kuài lè!	Happy birthday!
h2p069	大家都去哪儿了？	Dà jiā dōu qù nǎr le?	Where did everyone go?
h2p070	没有人和我玩。	Méi yǒu rén hé wǒ wán.	Nobody plays with me.
h2p071	谁来和我玩？	Shéi lái hé wǒ wán?	Who will come and play with me?
h2p072	我等你很长时间了。	Wǒ děng nǐ hěn cháng shí jiān le.	I've been waiting for you for a long time.
h2p073	你什么时候回来？我等你。	Nǐ shén me shí hou huí lái? Wǒ děng nǐ.	When are you coming back? I'll wait for you.
h2p074	我一个人，真没意思。	Wǒ yí gè rén, zhēn méi yì si.	On my own, it's really boring.
h2p075	你们都很忙吗？	Nǐ men dōu hěn máng ma?	Are you all busy?
h2p076	我想和大家一起玩。	Wǒ xiǎng hé dà jiā yì qǐ wán.	I want to play with everyone.
h2p077	我想坐你旁边。	Wǒ xiǎng zuò nǐ páng biān.	I want to sit next to you.
h2p078	别这样！	Bié zhè yàng!	Don't do that!
h2p079	你要做什么？	Nǐ yào zuò shén me?	What are you going to do?
h2p080	我们要去哪儿？	Wǒ men yào qù nǎr?	Where are we going?
h2p081	太高了！	Tài gāo le!	Too high!
h2p082	让我下去！	Ràng wǒ xià qù!	Let me down!
h2p083	快让我下来！	Kuài ràng wǒ xià lái!	Quick, let me down!
h2p084	我不要！	Wǒ bú yào!	I don't want to!
h2p085	慢一点儿！	Màn yì diǎnr!	Slow down!
h2p086	你为什么这样做？	Nǐ wèi shén me zhè yàng zuò?	Why did you do that?
h2p087	别再这样了！	Bié zài zhè yàng le!	Don't do that again!
h2p088	这不对！	Zhè bú duì!	That's not right!
h2p089	你做错了。	Nǐ zuò cuò le.	You did it wrong.
h2p090	谢谢您！	Xiè xie nín!	Thank you! (polite)
h2p091	真好吃，谢谢！	Zhēn hǎo chī, xiè xie!	Really tasty, thanks!
h2p092	我最喜欢吃这个。	Wǒ zuì xǐ huan chī zhè ge.	This is my favourite thing to eat.
h2p093	我还想吃！	Wǒ hái xiǎng chī!	I want more!
h2p094	我吃得很好。	Wǒ chī de hěn hǎo.	I ate well.
h2p095	你给我的菜很好吃。	Nǐ gěi wǒ de cài hěn hǎo chī.	The food you gave me is very tasty.
h2p096	再来一次！	Zài lái yí cì!	Once more!
h2p097	别走！	Bié zǒu!	Don't go!
h2p098	我最喜欢这样了。	Wǒ zuì xǐ huan zhè yàng le.	I like this the most.
h2p099	你可以再来一次吗？	Nǐ kě yǐ zài lái yí cì ma?	Can you do it once more?
h2p100	真好！	Zhēn hǎo!	That's really nice!
h2p101	你对我真好。	Nǐ duì wǒ zhēn hǎo.	You're really good to me.
h2p102	我要走了。	Wǒ yào zǒu le.	I'm going to go.
h2p103	晚上见！	Wǎn shang jiàn!	See you tonight!
h2p104	我先走了，再见！	Wǒ xiān zǒu le, zài jiàn!	I'll go first, bye!
h2p105	慢走！	Màn zǒu!	Take care! (to someone leaving)
h2p106	您慢走。	Nín màn zǒu.	Take care. (polite, to someone leaving)
h2p107	明天早上见。	Míng tiān zǎo shang jiàn.	See you tomorrow morning.
h2p108	我起床了！	Wǒ qǐ chuáng le!	I'm up!
h2p109	现在几点了？我睡了多长时间？	Xiàn zài jǐ diǎn le? Wǒ shuì le duō cháng shí jiān?	What time is it? How long did I sleep?
h2p110	我还想睡。	Wǒ hái xiǎng shuì.	I still want to sleep.
h2p111	我睡得很好。	Wǒ shuì de hěn hǎo.	I slept well.
h2p112	已经晚上了吗？	Yǐ jīng wǎn shang le ma?	Is it already evening?
h2p113	我睡了十个小时。	Wǒ shuì le shí gè xiǎo shí.	I slept for ten hours.
h2p114	今天是晴天。	Jīn tiān shì qíng tiān.	It's sunny today.
h2p115	今天是阴天。	Jīn tiān shì yīn tiān.	It's overcast today.
h2p116	外面下雪了！	Wài miàn xià xuě le!	It's snowing outside!
h2p117	明天可能下雨。	Míng tiān kě néng xià yǔ.	It might rain tomorrow.
h2p118	今天比昨天冷。	Jīn tiān bǐ zuó tiān lěng.	Today is colder than yesterday.
h2p119	今天天气非常好。	Jīn tiān tiān qì fēi cháng hǎo.	The weather is extremely good today.
h2p120	下雪了，我们出去玩吧！	Xià xuě le, wǒ men chū qù wán ba!	It's snowing, let's go out and play!
```
