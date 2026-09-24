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
p184	我们都是朋友。	Wǒ men dōu shì péng you.	We are all friends.
p185	我们都很好。	Wǒ men dōu hěn hǎo.	We are all fine.
p186	昨天我很高兴。	Zuó tiān wǒ hěn gāo xìng.	I was very happy yesterday.
p187	我在家。	Wǒ zài jiā.	I'm at home.
p188	我在学校。	Wǒ zài xué xiào.	I'm at school.
p189	一，二，三！	Yī, èr, sān!	One, two, three!
p190	四，五，六！	Sì, wǔ, liù!	Four, five, six!
p191	七，八，九，十！	Qī, bā, jiǔ, shí!	Seven, eight, nine, ten!
p192	我有十个苹果。	Wǒ yǒu shí gè píng guǒ.	I have ten apples.
p193	我想吃八个苹果。	Wǒ xiǎng chī bā gè píng guǒ.	I want to eat eight apples.
p194	你有几个苹果？	Nǐ yǒu jǐ gè píng guǒ?	How many apples do you have?
p195	这是我的桌子。	Zhè shì wǒ de zhuō zi.	This is my table.
p196	那是你的椅子。	Nà shì nǐ de yǐ zi.	That is your chair.
p197	这些是什么？	Zhè xiē shì shén me?	What are these?
p198	那些是我的书。	Nà xiē shì wǒ de shū.	Those are my books.
p199	你喜欢什么？	Nǐ xǐ huan shén me?	What do you like?
p200	我喜欢水果。	Wǒ xǐ huan shuǐ guǒ.	I like fruit.
p201	这个很大。	Zhè ge hěn dà.	This is very big.
p202	那个很小。	Nà ge hěn xiǎo.	That one is very small.
p203	我很小。	Wǒ hěn xiǎo.	I'm very small.
p204	你很大。	Nǐ hěn dà.	You're very big.
p205	这是一个杯子。	Zhè shì yí gè bēi zi.	This is a cup.
p206	请喝一杯茶。	Qǐng hē yì bēi chá.	Please have a cup of tea.
p207	我想喝一杯水。	Wǒ xiǎng hē yì bēi shuǐ.	I want a glass of water.
p208	他在工作。	Tā zài gōng zuò.	He is working.
p209	她在学习。	Tā zài xué xí.	She is studying.
p210	我妈妈在做饭。	Wǒ mā ma zài zuò fàn.	My mom is cooking.
p211	我下午工作。	Wǒ xià wǔ gōng zuò.	I work in the afternoon.
p212	中午我在家吃饭。	Zhōng wǔ wǒ zài jiā chī fàn.	I eat at home at noon.
p213	他们是谁？	Tā men shì shéi?	Who are they?
p214	他们是我的朋友。	Tā men shì wǒ de péng you.	They are my friends.
p215	我有一个女儿。	Wǒ yǒu yí gè nǚ ér.	I have a daughter.
p216	他有一个儿子。	Tā yǒu yí gè ér zi.	He has a son.
p217	先生，你好！	Xiān sheng, nǐ hǎo!	Hello, sir!
p218	小姐，你好！	Xiǎo jiě, nǐ hǎo!	Hello, miss!
p219	你们好！	Nǐ men hǎo!	Hello, everyone!
p220	我喜欢你的衣服。	Wǒ xǐ huan nǐ de yī fu.	I like your clothes.
p221	你的衣服很漂亮。	Nǐ de yī fu hěn piào liang.	Your clothes are very pretty.
p222	这个星期我很高兴。	Zhè ge xīng qī wǒ hěn gāo xìng.	I'm very happy this week.
p223	我明天不工作。	Wǒ míng tiān bù gōng zuò.	I'm not working tomorrow.
p224	我能看电视吗？	Wǒ néng kàn diàn shì ma?	Can I watch TV?
p225	你能看见我吗？	Nǐ néng kàn jiàn wǒ ma?	Can you see me?
p226	我看见你了！	Wǒ kàn jiàn nǐ le!	I see you!
p227	我想看看。	Wǒ xiǎng kàn kàn.	I want to have a look.
p228	我不会写汉字。	Wǒ bú huì xiě hàn zì.	I can't write Chinese characters.
p229	你会开车吗？	Nǐ huì kāi chē ma?	Can you drive?
p230	请开电脑。	Qǐng kāi diàn nǎo.	Please turn on the computer.
p231	他什么时候回来？	Tā shén me shí hou huí lái?	When is he coming back?
p232	我想和你说汉语。	Wǒ xiǎng hé nǐ shuō hàn yǔ.	I want to speak Chinese with you.
p233	我和我的朋友去商店。	Wǒ hé wǒ de péng you qù shāng diàn.	My friend and I are going to the shop.
p234	猫和狗都很好。	Māo hé gǒu dōu hěn hǎo.	Cats and dogs are both nice.
p235	我不太喜欢这个。	Wǒ bú tài xǐ huan zhè ge.	I don't really like this.
p236	太热了！	Tài rè le!	It's too hot!
p237	太冷了！	Tài lěng le!	It's too cold!
p238	太大了！	Tài dà le!	It's too big!
p239	太小了！	Tài xiǎo le!	It's too small!
p240	太少了！	Tài shǎo le!	That's too little!
p241	我很爱我的家。	Wǒ hěn ài wǒ de jiā.	I love my family very much.
p242	你喜欢北京吗？	Nǐ xǐ huan běi jīng ma?	Do you like Beijing?
p243	那个商店很大。	Nà ge shāng diàn hěn dà.	That shop is very big.
p244	医院在学校后面。	Yī yuàn zài xué xiào hòu miàn.	The hospital is behind the school.
```
