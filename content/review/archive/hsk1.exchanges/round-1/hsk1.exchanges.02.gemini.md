These are drafted **short conversations** for a beginner Chinese learning app, held between two small cartoon creatures on the user's desktop. Each row is one whole exchange; turns are separated by ｜ in the Chinese and by " | " in the pinyin and English, and the speakers alternate (turn 1 is creature A, turn 2 is creature B, and so on). Only **HSK 1 vocabulary** may be used.

For every row, check the exchange **as a whole**:
1. Does each turn mean its English, turn for turn?
2. Is each reply a natural answer to what was just said — would two native speakers actually have this exchange? A correct sentence that does not answer the previous turn makes the row wrong.
3. Is the pinyin correct, **including tone marks and neutral tones**? (Generated mechanically — treat it as a claim. Syllable-by-syllable spacing is the house style; do not fix spacing.)
4. Is it within HSK 1 vocabulary, and Simplified?

If you fix a row, give the **whole** corrected exchange in each fix column you use, keeping the ｜ and " | " separators and the same number of turns in every column.

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
x031	现在几点？｜现在三点。｜我想睡觉了。	Xiàn zài jǐ diǎn? | Xiàn zài sān diǎn. | Wǒ xiǎng shuì jiào le.	What time is it? | It's three o'clock. | I want to sleep now.
x032	你想回家吗？｜想，我想睡觉。	Nǐ xiǎng huí jiā ma? | Xiǎng, wǒ xiǎng shuì jiào.	Do you want to go home? | Yes, I want to sleep.
x033	今天天气怎么样？｜今天很热。	Jīn tiān tiān qì zěn me yàng? | Jīn tiān hěn rè.	How's the weather today? | It's hot today.
x034	今天很冷。｜是的，太冷了！	Jīn tiān hěn lěng. | Shì de, tài lěng le!	It's cold today. | Yes, it's too cold!
x035	明天会下雨吗？｜会。	Míng tiān huì xià yǔ ma? | Huì.	Will it rain tomorrow? | It will.
x036	下雨了！｜我们回家。	Xià yǔ le! | Wǒ men huí jiā.	It's raining! | We're going home.
x037	你冷吗？｜我很冷。	Nǐ lěng ma? | Wǒ hěn lěng.	Are you cold? | I'm very cold.
x038	你热吗？｜不热。	Nǐ rè ma? | Bú rè.	Are you hot? | No.
x039	你去哪儿？｜我去商店。｜你想买什么？｜我想买苹果。	Nǐ qù nǎr? | Wǒ qù shāng diàn. | Nǐ xiǎng mǎi shén me? | Wǒ xiǎng mǎi píng guǒ.	Where are you going? | I'm going to the shop. | What do you want to buy? | I want to buy apples.
x040	这个多少钱？｜三块钱。｜太多了！	Zhè ge duō shao qián? | Sān kuài qián. | Tài duō le!	How much is this? | Three yuan. | That's too much!
x041	你几岁？｜我八岁。你呢？｜我九岁。	Nǐ jǐ suì? | Wǒ bā suì. Nǐ ne? | Wǒ jiǔ suì.	How old are you? | I'm eight. And you? | I'm nine.
x042	你家有几个人？｜我家有五个人。	Nǐ jiā yǒu jǐ gè rén? | Wǒ jiā yǒu wǔ gè rén.	How many people are in your family? | There are five people in my family.
x043	你会说汉语吗？｜我会说一点儿。	Nǐ huì shuō hàn yǔ ma? | Wǒ huì shuō yì diǎnr.	Can you speak Chinese? | I can speak a little.
x044	你在学习汉语吗？｜是的，汉语很好。	Nǐ zài xué xí hàn yǔ ma? | Shì de, hàn yǔ hěn hǎo.	Are you studying Chinese? | Yes, Chinese is great.
x045	你会写这个字吗？｜我不会。	Nǐ huì xiě zhè ge zì ma? | Wǒ bú huì.	Can you write this character? | I can't.
x046	你是老师吗？｜不是，我是学生。	Nǐ shì lǎo shī ma? | Bú shì, wǒ shì xué sheng.	Are you a teacher? | No, I'm a student.
x047	今天是星期几？｜今天星期六。｜太好了！	Jīn tiān shì xīng qī jǐ? | Jīn tiān xīng qī liù. | Tài hǎo le!	What day is it today? | Today is Saturday. | Great!
x048	这是你的吗？｜不是，是他的。	Zhè shì nǐ de ma? | Bú shì, shì tā de.	Is this yours? | No, it's his.
x049	你喜欢猫吗？｜我很喜欢猫。	Nǐ xǐ huan māo ma? | Wǒ hěn xǐ huan māo.	Do you like cats? | I really like cats.
x050	你喜欢狗吗？｜不喜欢。	Nǐ xǐ huan gǒu ma? | Bù xǐ huan.	Do you like dogs? | No.
x051	你喜欢看书吗？｜喜欢，我爱看书。	Nǐ xǐ huan kàn shū ma? | Xǐ huan, wǒ ài kàn shū.	Do you like reading? | Yes, I love reading.
x052	你想看电影吗？｜好！我们去看电影。	Nǐ xiǎng kàn diàn yǐng ma? | Hǎo! Wǒ men qù kàn diàn yǐng.	Do you want to see a film? | Okay! We'll go see a film.
x053	你想去北京吗？｜想！北京很大。	Nǐ xiǎng qù běi jīng ma? | Xiǎng! Běi jīng hěn dà.	Do you want to go to Beijing? | Yes! Beijing is very big.
x054	你能来我家吗？｜能！什么时候？｜明天上午。	Nǐ néng lái wǒ jiā ma? | Néng! Shén me shí hou? | Míng tiān shàng wǔ.	Can you come to my home? | Yes! When? | Tomorrow morning.
x055	你的猫在哪儿？｜在桌子下面。	Nǐ de māo zài nǎr? | Zài zhuō zi xià mian.	Where is your cat? | Under the table.
x056	我没有钱。｜没关系，我有。	Wǒ méi yǒu qián. | Méi guān xi, wǒ yǒu.	I don't have money. | It's okay, I do.
x057	你想坐这儿吗？｜好的，谢谢。	Nǐ xiǎng zuò zhèr ma? | Hǎo de, xiè xie.	Do you want to sit here? | Okay, thanks.
x058	请坐！｜谢谢。	Qǐng zuò! | Xiè xie.	Please sit! | Thanks.
x059	你去医院吗？｜不去。	Nǐ qù yī yuàn ma? | Bú qù.	Are you going to the hospital? | No.
x060	我看见你了！｜你好！	Wǒ kàn jiàn nǐ le! | Nǐ hǎo!	I see you! | Hello!
```
