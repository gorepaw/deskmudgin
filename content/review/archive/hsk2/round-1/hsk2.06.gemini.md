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
h2p301	我要这个。	Wǒ yào zhè ge.	I want this one.
h2p302	我什么都不要。	Wǒ shén me dōu bú yào.	I don't want anything.
h2p303	我们一起去吧！	Wǒ men yì qǐ qù ba!	Let's go together!
h2p304	我们一起吃饭吧。	Wǒ men yì qǐ chī fàn ba.	Let's eat together.
h2p305	我也想去。	Wǒ yě xiǎng qù.	I want to go too.
h2p306	你也喜欢猫吗？	Nǐ yě xǐ huan māo ma?	Do you like cats too?
h2p307	他也是学生。	Tā yě shì xué sheng.	He's a student too.
h2p308	就是这个！	Jiù shì zhè ge!	This is the one!
h2p309	我就在这儿。	Wǒ jiù zài zhèr.	I'm right here.
h2p310	我就来！	Wǒ jiù lái!	I'm coming right away!
h2p311	他还没来。	Tā hái méi lái.	He hasn't come yet.
h2p312	还有问题吗？	Hái yǒu wèn tí ma?	Any more questions?
h2p313	我还是学生。	Wǒ hái shì xué sheng.	I'm still a student.
h2p314	对不起，我错了。	Duì bu qǐ, wǒ cuò le.	Sorry, I was wrong.
h2p315	你错了。	Nǐ cuò le.	You're wrong.
h2p316	没错！	Méi cuò!	That's right!
h2p317	这个对吗？	Zhè ge duì ma?	Is this right?
h2p318	你到哪儿了？	Nǐ dào nǎr le?	Where are you now?
h2p319	我们到家了。	Wǒ men dào jiā le.	We're home.
h2p320	我从学校回来了。	Wǒ cóng xué xiào huí lái le.	I'm back from school.
h2p321	你往左边看。	Nǐ wǎng zuǒ bian kàn.	Look to the left.
h2p322	左边是我家。	Zuǒ bian shì wǒ jiā.	My home is on the left.
h2p323	你说话太快了。	Nǐ shuō huà tài kuài le.	You talk too fast.
h2p324	请说慢一点儿。	Qǐng shuō màn yì diǎnr.	Please speak a bit more slowly.
h2p325	别说话！	Bié shuō huà!	Don't talk!
h2p326	他不想说话。	Tā bù xiǎng shuō huà.	He doesn't want to talk.
h2p327	我没听懂。	Wǒ méi tīng dǒng.	I didn't understand what I heard.
h2p328	你听懂了吗？	Nǐ tīng dǒng le ma?	Did you understand?
h2p329	我听不懂。	Wǒ tīng bù dǒng.	I can't understand.
h2p330	我唱得不好。	Wǒ chàng de bù hǎo.	I don't sing well.
h2p331	你唱歌唱得真好！	Nǐ chàng gē chàng de zhēn hǎo!	You sing really well!
h2p332	小猫正在睡觉。	Xiǎo māo zhèng zài shuì jiào.	The kitten is sleeping.
h2p333	狗在外面跑。	Gǒu zài wài miàn pǎo.	The dog is running around outside.
h2p334	送你一个苹果。	Sòng nǐ yí gè píng guǒ.	Here, an apple for you.
h2p335	这是我送你的。	Zhè shì wǒ sòng nǐ de.	This is a gift from me to you.
h2p336	谢谢你送我这个。	Xiè xie nǐ sòng wǒ zhè ge.	Thank you for giving me this.
h2p337	妈妈不让我出去玩。	Mā ma bú ràng wǒ chū qù wán.	Mum won't let me go out to play.
h2p338	让我看看！	Ràng wǒ kàn kan!	Let me see!
h2p339	让我想想。	Ràng wǒ xiǎng xiǎng.	Let me think.
h2p340	我们玩得很高兴。	Wǒ men wán de hěn gāo xìng.	We had a great time.
h2p341	你想玩什么？	Nǐ xiǎng wán shén me?	What do you want to play?
h2p342	别玩手机了！	Bié wán shǒu jī le!	Stop playing on your phone!
h2p343	你每天几点睡觉？	Nǐ měi tiān jǐ diǎn shuì jiào?	What time do you go to bed every day?
h2p344	我今天起得很早。	Wǒ jīn tiān qǐ de hěn zǎo.	I got up very early today.
h2p345	你起床了吗？	Nǐ qǐ chuáng le ma?	Are you up?
h2p346	快起床！	Kuài qǐ chuáng!	Get up!
h2p347	他还在睡觉。	Tā hái zài shuì jiào.	He's still sleeping.
h2p348	今天晚上你做什么？	Jīn tiān wǎn shang nǐ zuò shén me?	What are you doing tonight?
h2p349	我晚上要学习。	Wǒ wǎn shang yào xué xí.	I have to study tonight.
h2p350	下午我们去跑步吧。	Xià wǔ wǒ men qù pǎo bù ba.	Let's go running this afternoon.
h2p351	每个星期我都去游泳。	Měi gè xīng qī wǒ dōu qù yóu yǒng.	I go swimming every week.
h2p352	我们学校有很多教室。	Wǒ men xué xiào yǒu hěn duō jiào shì.	Our school has a lot of classrooms.
h2p353	我的房间很小。	Wǒ de fáng jiān hěn xiǎo.	My room is very small.
h2p354	你的房间真大！	Nǐ de fáng jiān zhēn dà!	Your room is really big!
h2p355	我没见过雪。	Wǒ méi jiàn guo xuě.	I've never seen snow.
h2p356	雪是白的。	Xuě shì bái de.	Snow is white.
h2p357	西瓜里面是红的。	Xī guā lǐ miàn shì hóng de.	Watermelon is red inside.
h2p358	你的眼睛是什么颜色？	Nǐ de yǎn jing shì shén me yán sè?	What colour are your eyes?
h2p359	他穿着红衣服。	Tā chuān zhe hóng yī fu.	He's wearing red clothes.
h2p360	我今天穿什么？	Wǒ jīn tiān chuān shén me?	What shall I wear today?
```
