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
p123	我有三个朋友。	Wǒ yǒu sān gè péng you.	I have three friends.
p124	我家有五个人。	Wǒ jiā yǒu wǔ gè rén.	There are five people in my family.
p125	我爸爸是医生。	Wǒ bà ba shì yī shēng.	My dad is a doctor.
p126	我妈妈是老师。	Wǒ mā ma shì lǎo shī.	My mom is a teacher.
p127	我是学生。	Wǒ shì xué sheng.	I'm a student.
p128	我们是同学。	Wǒ men shì tóng xué.	We are classmates.
p129	他是我的老师。	Tā shì wǒ de lǎo shī.	He is my teacher.
p130	她是我的同学。	Tā shì wǒ de tóng xué.	She is my classmate.
p131	他是谁？	Tā shì shéi?	Who is he?
p132	她是谁？	Tā shì shéi?	Who is she?
p133	她很漂亮。	Tā hěn piào liang.	She is very pretty.
p134	他是中国人。	Tā shì zhōng guó rén.	He is Chinese.
p135	你是中国人吗？	Nǐ shì zhōng guó rén ma?	Are you Chinese?
p136	我会说汉语。	Wǒ huì shuō hàn yǔ.	I can speak Chinese.
p137	我会说一点儿汉语。	Wǒ huì shuō yì diǎnr hàn yǔ.	I can speak a little Chinese.
p138	你会说汉语吗？	Nǐ huì shuō hàn yǔ ma?	Can you speak Chinese?
p139	我在学习汉语。	Wǒ zài xué xí hàn yǔ.	I'm studying Chinese.
p140	这个字怎么写？	Zhè ge zì zěn me xiě?	How do you write this character?
p141	我会写这个字。	Wǒ huì xiě zhè ge zì.	I can write this character.
p142	我想去北京。	Wǒ xiǎng qù běi jīng.	I want to go to Beijing.
p143	北京很大。	Běi jīng hěn dà.	Beijing is very big.
p144	我想去中国。	Wǒ xiǎng qù zhōng guó.	I want to go to China.
p145	中国很大。	Zhōng guó hěn dà.	China is very big.
p146	我住在北京。	Wǒ zhù zài běi jīng.	I live in Beijing.
p147	你住在哪儿？	Nǐ zhù zài nǎr?	Where do you live?
p148	我坐飞机去北京。	Wǒ zuò fēi jī qù běi jīng.	I'm flying to Beijing.
p149	我坐出租车去。	Wǒ zuò chū zū chē qù.	I'll go by taxi.
p150	我们去商店。	Wǒ men qù shāng diàn.	We're going to the shop.
p151	你想买什么？	Nǐ xiǎng mǎi shén me?	What do you want to buy?
p152	我想买一本书。	Wǒ xiǎng mǎi yì běn shū.	I want to buy a book.
p153	我想买衣服。	Wǒ xiǎng mǎi yī fu.	I want to buy clothes.
p154	这个多少钱？	Zhè ge duō shao qián?	How much is this?
p155	三块钱。	Sān kuài qián.	Three yuan.
p156	太多了！	Tài duō le!	That's too much!
p157	我没有钱。	Wǒ méi yǒu qián.	I don't have money.
p158	我有一点儿钱。	Wǒ yǒu yì diǎnr qián.	I have a little money.
p159	我喜欢猫。	Wǒ xǐ huan māo.	I like cats.
p160	我喜欢狗。	Wǒ xǐ huan gǒu.	I like dogs.
p161	猫在桌子下面。	Māo zài zhuō zi xià miàn.	The cat is under the table.
p162	狗在椅子上。	Gǒu zài yǐ zi shàng.	The dog is on the chair.
p163	书在桌子上。	Shū zài zhuō zi shàng.	The book is on the table.
p164	你看见我的书了吗？	Nǐ kàn jiàn wǒ de shū le ma?	Have you seen my book?
p165	我在看书。	Wǒ zài kàn shū.	I'm reading a book.
p166	我喜欢看书。	Wǒ xǐ huan kàn shū.	I like reading.
p167	我喜欢看电影。	Wǒ xǐ huan kàn diàn yǐng.	I like watching films.
p168	我们去看电影。	Wǒ men qù kàn diàn yǐng.	Let's go see a film.
p169	你喜欢看电视吗？	Nǐ xǐ huan kàn diàn shì ma?	Do you like watching TV?
p170	我在看电视。	Wǒ zài kàn diàn shì.	I'm watching TV.
p171	电脑在哪儿？	Diàn nǎo zài nǎr?	Where is the computer?
p172	我想打电话。	Wǒ xiǎng dǎ diàn huà.	I want to make a phone call.
p173	请坐。	Qǐng zuò.	Please sit.
p174	请喝茶。	Qǐng hē chá.	Please have some tea.
p175	你喝什么？	Nǐ hē shén me?	What would you like to drink?
p176	我喝水。	Wǒ hē shuǐ.	I'll drink water.
p177	我喜欢喝茶。	Wǒ xǐ huan hē chá.	I like drinking tea.
p178	我想回家。	Wǒ xiǎng huí jiā.	I want to go home.
p179	他去医院了。	Tā qù yī yuàn le.	He went to the hospital.
p180	她是医生。	Tā shì yī shēng.	She is a doctor.
p181	我不认识他。	Wǒ bú rèn shi tā.	I don't know him.
p182	你认识她吗？	Nǐ rèn shi tā ma?	Do you know her?
p183	明天我去学校。	Míng tiān wǒ qù xué xiào.	Tomorrow I'm going to school.
```
