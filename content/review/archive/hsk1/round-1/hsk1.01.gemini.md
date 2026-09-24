These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use **only HSK 1 vocabulary**.

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 1 vocabulary?
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
p001	你好！	Nǐ hǎo!	Hello!
p002	你好吗？	Nǐ hǎo ma?	How are you?
p003	喂！	Wèi!	Hey! / Hello!
p004	喂，你好！	Wèi, nǐ hǎo!	Hey, hello!
p005	我在这儿！	Wǒ zài zhèr!	I'm here!
p006	你在哪儿？	Nǐ zài nǎr?	Where are you?
p007	你去哪儿？	Nǐ qù nǎr?	Where are you going?
p008	你回来了！	Nǐ huí lái le!	You're back!
p009	你来了！	Nǐ lái le!	You came!
p010	我很好，谢谢。你呢？	Wǒ hěn hǎo, xiè xie. Nǐ ne?	I'm fine, thanks. And you?
p011	你叫什么名字？	Nǐ jiào shén me míng zi?	What's your name?
p012	我认识你！	Wǒ rèn shi nǐ!	I know you!
p013	你是谁？	Nǐ shì shéi?	Who are you?
p014	下午好！	Xià wǔ hǎo!	Good afternoon!
p015	你今天怎么样？	Nǐ jīn tiān zěn me yàng?	How are you today?
p016	你在做什么？	Nǐ zài zuò shén me?	What are you doing?
p017	你在看什么？	Nǐ zài kàn shén me?	What are you looking at?
p018	你是我的朋友。	Nǐ shì wǒ de péng you.	You are my friend.
p019	我们是朋友。	Wǒ men shì péng you.	We are friends.
p020	再见！	Zài jiàn!	Goodbye!
p021	明天见！	Míng tiān jiàn!	See you tomorrow!
p022	下午见！	Xià wǔ jiàn!	See you this afternoon!
p023	我回家了。	Wǒ huí jiā le.	I'm going home.
p024	我去睡觉了。	Wǒ qù shuì jiào le.	I'm going to sleep.
p025	我想吃东西。	Wǒ xiǎng chī dōng xi.	I want to eat something.
p026	我想吃饭。	Wǒ xiǎng chī fàn.	I want to eat.
p027	我想吃米饭。	Wǒ xiǎng chī mǐ fàn.	I want to eat rice.
p028	我想吃苹果。	Wǒ xiǎng chī píng guǒ.	I want to eat an apple.
p029	我想吃水果。	Wǒ xiǎng chī shuǐ guǒ.	I want to eat fruit.
p030	我没有吃饭。	Wǒ méi yǒu chī fàn.	I haven't eaten.
p031	我今天没有吃饭。	Wǒ jīn tiān méi yǒu chī fàn.	I haven't eaten today.
p032	什么时候吃饭？	Shén me shí hou chī fàn?	When do we eat?
p033	中午吃什么？	Zhōng wǔ chī shén me?	What's for lunch?
p034	你有苹果吗？	Nǐ yǒu píng guǒ ma?	Do you have an apple?
p035	你有米饭吗？	Nǐ yǒu mǐ fàn ma?	Do you have rice?
p036	我想喝水。	Wǒ xiǎng hē shuǐ.	I want to drink water.
p037	我想喝茶。	Wǒ xiǎng hē chá.	I want to drink tea.
p038	我很想吃东西。	Wǒ hěn xiǎng chī dōng xi.	I really want to eat something.
p039	我想吃很多东西。	Wǒ xiǎng chī hěn duō dōng xi.	I want to eat lots of things.
p040	这个能吃吗？	Zhè ge néng chī ma?	Can this be eaten?
p041	我能吃这个吗？	Wǒ néng chī zhè ge ma?	May I eat this?
p042	你吃饭了吗？	Nǐ chī fàn le ma?	Have you eaten?
p043	我们去饭店吃饭。	Wǒ men qù fàn diàn chī fàn.	Let's go eat at a restaurant.
p044	我想睡觉。	Wǒ xiǎng shuì jiào.	I want to sleep.
p045	我很想睡觉。	Wǒ hěn xiǎng shuì jiào.	I really want to sleep.
p046	我不想工作。	Wǒ bù xiǎng gōng zuò.	I don't want to work.
p047	现在几点了？	Xiàn zài jǐ diǎn le?	What time is it now?
p048	我今天工作了很多。	Wǒ jīn tiān gōng zuò le hěn duō.	I worked a lot today.
p049	我想回家睡觉。	Wǒ xiǎng huí jiā shuì jiào.	I want to go home and sleep.
p050	我不想读书。	Wǒ bù xiǎng dú shū.	I don't want to study.
p051	我想坐一下。	Wǒ xiǎng zuò yí xià.	I want to sit for a bit.
p052	我睡觉了。	Wǒ shuì jiào le.	I was asleep.
p053	现在几点？	Xiàn zài jǐ diǎn?	What time is it?
p054	今天是星期几？	Jīn tiān shì xīng qī jǐ?	What day is it today?
p055	你好！我在这儿。	Nǐ hǎo! Wǒ zài zhèr.	Hello! I'm here.
p056	我很高兴！	Wǒ hěn gāo xìng!	I'm very happy!
p057	太好了！	Tài hǎo le!	Great!
p058	很好！	Hěn hǎo!	Very good!
p059	我很好。	Wǒ hěn hǎo.	I'm fine.
p060	我喜欢你。	Wǒ xǐ huan nǐ.	I like you.
p061	我爱你。	Wǒ ài nǐ.	I love you.
```
