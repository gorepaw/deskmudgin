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
h2p121	我喜欢下雪。	Wǒ xǐ huan xià xuě.	I like it when it snows.
h2p122	外面很冷，多穿点儿衣服。	Wài miàn hěn lěng, duō chuān diǎn ér yī fu.	It's cold outside, put on more clothes.
h2p123	今天太热了，我想去游泳。	Jīn tiān tài rè le, wǒ xiǎng qù yóu yǒng.	It's too hot today, I want to go swimming.
h2p124	明天是晴天吗？	Míng tiān shì qíng tiān ma?	Will it be sunny tomorrow?
h2p125	天阴了，可能要下雨。	Tiān yīn le, kě néng yào xià yǔ.	The sky has clouded over; it might rain.
h2p126	我有一个哥哥。	Wǒ yǒu yí gè gē ge.	I have an older brother.
h2p127	我姐姐是医生。	Wǒ jiě jie shì yī shēng.	My older sister is a doctor.
h2p128	我弟弟六岁。	Wǒ dì di liù suì.	My younger brother is six.
h2p129	我妹妹很漂亮。	Wǒ mèi mei hěn piào liang.	My younger sister is very pretty.
h2p130	他是我丈夫。	Tā shì wǒ zhàng fu.	He is my husband.
h2p131	她是我妻子。	Tā shì wǒ qī zi.	She is my wife.
h2p132	你有孩子吗？	Nǐ yǒu hái zi ma?	Do you have children?
h2p133	我哥哥比我高。	Wǒ gē ge bǐ wǒ gāo.	My older brother is taller than me.
h2p134	你有几个姐姐？	Nǐ yǒu jǐ gè jiě jie?	How many older sisters do you have?
h2p135	我的孩子喜欢踢足球。	Wǒ de hái zi xǐ huan tī zú qiú.	My child likes playing football.
h2p136	我们几点上课？	Wǒ men jǐ diǎn shàng kè?	What time is our class?
h2p137	今天有考试。	Jīn tiān yǒu kǎo shì.	There's an exam today.
h2p138	这个题我不会。	Zhè ge tí wǒ bú huì.	I can't do this question.
h2p139	我不懂这个问题。	Wǒ bù dǒng zhè ge wèn tí.	I don't understand this question.
h2p140	你懂了吗？	Nǐ dǒng le ma?	Do you understand?
h2p141	我懂了！	Wǒ dǒng le!	I get it!
h2p142	老师在教室里。	Lǎo shī zài jiào shì lǐ.	The teacher is in the classroom.
h2p143	我要准备考试。	Wǒ yào zhǔn bèi kǎo shì.	I need to prepare for the exam.
h2p144	考试开始了！	Kǎo shì kāi shǐ le!	The exam has started!
h2p145	你考得怎么样？	Nǐ kǎo de zěn me yàng?	How did your exam go?
h2p146	我可以问你一个问题吗？	Wǒ kě yǐ wèn nǐ yí gè wèn tí ma?	Can I ask you a question?
h2p147	请回答我的问题。	Qǐng huí dá wǒ de wèn tí.	Please answer my question.
h2p148	我学习汉语已经一年了。	Wǒ xué xí hàn yǔ yǐ jīng yì nián le.	I've been studying Chinese for a year now.
h2p149	这个字是什么意思？	Zhè ge zì shì shén me yì si?	What does this character mean?
h2p150	你说的是什么意思？	Nǐ shuō de shì shén me yì si?	What do you mean?
h2p151	我不知道。	Wǒ bù zhī dào.	I don't know.
h2p152	你知道吗？	Nǐ zhī dào ma?	Do you know?
h2p153	我知道了！	Wǒ zhī dào le!	Got it!
h2p154	铅笔在桌子上。	Qiān bǐ zài zhuō zi shang.	The pencil is on the table.
h2p155	我找不到我的铅笔了。	Wǒ zhǎo bú dào wǒ de qiān bǐ le.	I can't find my pencil.
h2p156	这是我第一次来北京。	Zhè shì wǒ dì yī cì lái běi jīng.	This is my first time in Beijing.
h2p157	我哥哥在公司工作。	Wǒ gē ge zài gōng sī gōng zuò.	My older brother works at a company.
h2p158	我要去上班了。	Wǒ yào qù shàng bān le.	I'm off to work.
h2p159	你每天几点上班？	Nǐ měi tiān jǐ diǎn shàng bān?	What time do you start work every day?
h2p160	他工作很忙。	Tā gōng zuò hěn máng.	He's very busy with work.
h2p161	我今天不上班。	Wǒ jīn tiān bú shàng bān.	I'm not working today.
h2p162	我喜欢打篮球。	Wǒ xǐ huan dǎ lán qiú.	I like playing basketball.
h2p163	我们一起去踢足球吧！	Wǒ men yì qǐ qù tī zú qiú ba!	Let's go play football together!
h2p164	我每天早上跑步。	Wǒ měi tiān zǎo shang pǎo bù.	I run every morning.
h2p165	你会游泳吗？	Nǐ huì yóu yǒng ma?	Can you swim?
h2p166	我游得很快。	Wǒ yóu de hěn kuài.	I swim fast.
h2p167	运动对身体好。	Yùn dòng duì shēn tǐ hǎo.	Exercise is good for your health.
h2p168	他跑得非常快。	Tā pǎo de fēi cháng kuài.	He runs extremely fast.
h2p169	你喜欢什么运动？	Nǐ xǐ huan shén me yùn dòng?	What sport do you like?
h2p170	我们去唱歌吧！	Wǒ men qù chàng gē ba!	Let's go singing!
h2p171	她跳舞跳得很好。	Tā tiào wǔ tiào de hěn hǎo.	She dances very well.
h2p172	太贵了！	Tài guì le!	Too expensive!
h2p173	这个很便宜。	Zhè ge hěn pián yi.	This is very cheap.
h2p174	有没有便宜一点儿的？	Yǒu méi yǒu pián yi yì diǎnr de?	Is there a cheaper one?
h2p175	我想买一件衣服。	Wǒ xiǎng mǎi yí jiàn yī fu.	I want to buy a piece of clothing.
h2p176	你喜欢什么颜色？	Nǐ xǐ huan shén me yán sè?	What colour do you like?
h2p177	我最喜欢红色。	Wǒ zuì xǐ huan hóng sè.	My favourite colour is red.
h2p178	我觉得白的好看。	Wǒ jué de bái de hǎo kàn.	I think the white one looks nicer.
h2p179	他穿着一件黑衣服。	Tā chuān zhe yí jiàn hēi yī fu.	He's wearing black clothes.
h2p180	这儿卖西瓜吗？	Zhèr mài xī guā ma?	Do they sell watermelon here?
```
