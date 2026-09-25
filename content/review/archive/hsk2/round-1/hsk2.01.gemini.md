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
h2p001	我想吃面条。	Wǒ xiǎng chī miàn tiáo.	I want to eat noodles.
h2p002	我想吃鸡蛋。	Wǒ xiǎng chī jī dàn.	I want to eat eggs.
h2p003	我想喝牛奶。	Wǒ xiǎng hē niú nǎi.	I want to drink milk.
h2p004	你有西瓜吗？	Nǐ yǒu xī guā ma?	Do you have any watermelon?
h2p005	我想吃羊肉。	Wǒ xiǎng chī yáng ròu.	I want to eat lamb.
h2p006	我要吃饭！	Wǒ yào chī fàn!	I want to eat!
h2p007	我们什么时候吃饭？还要等吗？	Wǒ men shén me shí hou chī fàn? Hái yào děng ma?	When do we eat? Do we still have to wait?
h2p008	有没有好吃的？	Yǒu méi yǒu hǎo chī de?	Is there anything tasty?
h2p009	给我一点儿吃的吧。	Gěi wǒ yì diǎnr chī de ba.	Give me a little something to eat.
h2p010	这儿有鱼吗？	Zhèr yǒu yú ma?	Is there any fish here?
h2p011	我已经一天没吃东西了。	Wǒ yǐ jīng yì tiān méi chī dōng xi le.	I haven't eaten anything all day.
h2p012	快给我吃的！	Kuài gěi wǒ chī de!	Quick, give me something to eat!
h2p013	我可以吃这个吗？	Wǒ kě yǐ chī zhè ge ma?	Can I eat this?
h2p014	还有牛奶吗？	Hái yǒu niú nǎi ma?	Is there any milk left?
h2p015	饭准备好了吗？	Fàn zhǔn bèi hǎo le ma?	Is the food ready?
h2p016	我想吃苹果和西瓜。	Wǒ xiǎng chī píng guǒ hé xī guā.	I want to eat apples and watermelon.
h2p017	我最喜欢吃鱼。	Wǒ zuì xǐ huan chī yú.	I like eating fish the most.
h2p018	我要喝咖啡。	Wǒ yào hē kā fēi.	I want coffee.
h2p019	我等了很长时间了。	Wǒ děng le hěn cháng shí jiān le.	I've been waiting a long time.
h2p020	中午我们吃面条吧。	Zhōng wǔ wǒ men chī miàn tiáo ba.	Let's have noodles for lunch.
h2p021	您好！	Nín hǎo!	Hello! (polite)
h2p022	欢迎！	Huān yíng!	Welcome!
h2p023	欢迎你来！	Huān yíng nǐ lái!	Glad you came!
h2p024	欢迎回来！	Huān yíng huí lái!	Welcome back!
h2p025	早上好！	Zǎo shang hǎo!	Good morning!
h2p026	晚上好！	Wǎn shang hǎo!	Good evening!
h2p027	你身体好吗？	Nǐ shēn tǐ hǎo ma?	How is your health?
h2p028	你最近怎么样？	Nǐ zuì jìn zěn me yàng?	How have you been lately?
h2p029	大家好！	Dà jiā hǎo!	Hello, everyone!
h2p030	你也在这儿！	Nǐ yě zài zhèr!	You're here too!
h2p031	你今天忙吗？	Nǐ jīn tiān máng ma?	Are you busy today?
h2p032	您贵姓？	Nín guì xìng?	What is your surname? (polite)
h2p033	你睡得好吗？	Nǐ shuì de hǎo ma?	Did you sleep well?
h2p034	你还在吗？	Nǐ hái zài ma?	Are you still there?
h2p035	我到了！	Wǒ dào le!	I've arrived!
h2p036	这个真好吃！	Zhè ge zhēn hǎo chī!	This is really tasty!
h2p037	这个没有鱼好吃。	Zhè ge méi yǒu yú hǎo chī.	This isn't as tasty as fish.
h2p038	我吃完了！	Wǒ chī wán le!	I've finished eating!
h2p039	我还要吃。	Wǒ hái yào chī.	I want to eat more.
h2p040	真好吃！	Zhēn hǎo chī!	So tasty!
h2p041	我正在吃东西呢。	Wǒ zhèng zài chī dōng xi ne.	I'm eating right now.
h2p042	别看我，我在吃。	Bié kàn wǒ, wǒ zài chī.	Don't look at me, I'm eating.
h2p043	这个比苹果好吃。	Zhè ge bǐ píng guǒ hǎo chī.	This is tastier than apples.
h2p044	我吃了两个。	Wǒ chī le liǎng gè.	I ate two.
h2p045	别吃那个！	Bié chī nà ge!	Don't eat that!
h2p046	我累了。	Wǒ lèi le.	I'm tired.
h2p047	我太累了。	Wǒ tài lèi le.	I'm too tired.
h2p048	我想休息一下。	Wǒ xiǎng xiū xi yí xià.	I want to rest for a bit.
h2p049	我要去睡觉了。	Wǒ yào qù shuì jiào le.	I'm going to bed.
h2p050	我已经很累了。	Wǒ yǐ jīng hěn lèi le.	I'm already very tired.
h2p051	我今天想早点儿休息。	Wǒ jīn tiān xiǎng zǎo diǎn ér xiū xi.	I want to rest early today.
h2p052	让我休息一下吧。	Ràng wǒ xiū xi yí xià ba.	Let me rest for a bit.
h2p053	我今天非常累。	Wǒ jīn tiān fēi cháng lèi.	I'm extremely tired today.
h2p054	我不想起床。	Wǒ bù xiǎng qǐ chuáng.	I don't want to get up.
h2p055	别说话，我想睡觉。	Bié shuō huà, wǒ xiǎng shuì jiào.	Don't talk, I want to sleep.
h2p056	我走不动了。	Wǒ zǒu bú dòng le.	I can't walk any further.
h2p057	我们休息一下吧。	Wǒ men xiū xi yí xià ba.	Let's take a break.
h2p058	我很快乐！	Wǒ hěn kuài lè!	I'm very happy!
h2p059	今天真好！	Jīn tiān zhēn hǎo!	Today is really great!
h2p060	我非常高兴！	Wǒ fēi cháng gāo xìng!	I'm extremely happy!
```
