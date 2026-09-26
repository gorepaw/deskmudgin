These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use only **HSK 1–3 vocabulary** (the levels are cumulative).

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 3 vocabulary, counting every level below it?
5. Is it Simplified, not Traditional?

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_script	fix_reading	fix_english	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the `fix_` column(s) empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	reading	english
h3p301	这个我能试吗？	Zhè ge wǒ néng shì ma?	Can I try this?
h3p302	你最近是不是瘦了？	Nǐ zuì jìn shì bu shì shòu le?	Have you lost weight lately?
h3p303	叔叔今天来看你了吗？	Shū shu jīn tiān lái kàn nǐ le ma?	Did your uncle come to see you today?
h3p304	你的手很舒服，我喜欢。	Nǐ de shǒu hěn shū fu, wǒ xǐ huan.	Your hand feels lovely. I like it.
h3p305	这里好舒服，我想睡了。	Zhè lǐ hǎo shū fu, wǒ xiǎng shuì le.	It's so comfortable here. I feel sleepy.
h3p306	这个树很高，我上不去。	Zhè ge shù hěn gāo, wǒ shàng bú qù.	This tree is tall. I can't climb up.
h3p307	树下面有很多小鸟。	Shù xià mian yǒu hěn duō xiǎo niǎo.	There are lots of little birds under the tree.
h3p308	你喜欢数学吗？我不太喜欢。	Nǐ xǐ huan shù xué ma? Wǒ bú tài xǐ huan.	Do you like maths? I don't really.
h3p309	我不会做数学题。	Wǒ bú huì zuò shù xué tí.	I can't do maths problems.
h3p310	你刷牙了吗？	Nǐ shuā yá le ma?	Did you brush your teeth?
h3p311	我今天还没刷牙。	Wǒ jīn tiān hái méi shuā yá.	I haven't brushed my teeth yet today.
h3p312	你有两双新鞋，真好！	Nǐ yǒu liǎng shuāng xīn xié, zhēn hǎo!	You have two new pairs of shoes. How nice!
h3p313	我的水平还不高，要多练习。	Wǒ de shuǐ píng hái bù gāo, yào duō liàn xí.	My level isn't high yet. I need to practise more.
h3p314	那位司机开车很快。	Nà wèi sī jī kāi chē hěn kuài.	That driver drives fast.
h3p315	太阳出来了，好热！	Tài yáng chū lái le, hǎo rè!	The sun is out. So hot!
h3p316	我喜欢在太阳下睡觉。	Wǒ xǐ huan zài tài yáng xià shuì jiào.	I like sleeping in the sun.
h3p317	今天特别开心！	Jīn tiān tè bié kāi xīn!	I'm especially happy today!
h3p318	我特别想吃面条。	Wǒ tè bié xiǎng chī miàn tiáo.	I really want some noodles.
h3p319	你今天特别好看。	Nǐ jīn tiān tè bié hǎo kàn.	You look extra nice today.
h3p320	我的头有点儿疼。	Wǒ de tóu yǒu diǎnr téng.	My head hurts a little.
h3p321	别放手！我会疼的！	Bié fàng shǒu! Wǒ huì téng de!	Don't let go! It'll hurt!
h3p322	你想提高汉语水平吗？	Nǐ xiǎng tí gāo hàn yǔ shuǐ píng ma?	Do you want to improve your Chinese?
h3p323	我想提高我的水平。	Wǒ xiǎng tí gāo wǒ de shuǐ píng.	I want to improve my level.
h3p324	你喜欢上体育课吗？	Nǐ xǐ huan shàng tǐ yù kè ma?	Do you like PE class?
h3p325	我们一起做体育吧。	Wǒ men yì qǐ zuò tǐ yù ba.	Let's do some exercise together.
h3p326	这个苹果真甜！	Zhè ge píng guǒ zhēn tián!	This apple is so sweet!
h3p327	好甜啊，我还想吃！	Hǎo tián a, wǒ hái xiǎng chī!	So sweet. I want more!
h3p328	你有没有一条新裙子？	Nǐ yǒu méi yǒu yì tiáo xīn qún zi?	Do you have a new skirt?
h3p329	有一条小鱼在游。	Yǒu yì tiáo xiǎo yú zài yóu.	There's a little fish swimming.
h3p330	你的同事人好吗？	Nǐ de tóng shì rén hǎo ma?	Are your colleagues nice?
h3p331	你同事今天来了吗？	Nǐ tóng shì jīn tiān lái le ma?	Did your colleague come in today?
h3p332	我同意你说的。	Wǒ tóng yì nǐ shuō de.	I agree with what you said.
h3p333	你同意我出去玩吗？	Nǐ tóng yì wǒ chū qù wán ma?	Do you agree to let me go out and play?
h3p334	你的头发好长啊！	Nǐ de tóu fa hǎo cháng a!	Your hair is so long!
h3p335	我的头发是绿色的，好看吗？	Wǒ de tóu fa shì lǜ sè de, hǎo kàn ma?	My hair is green. Is it nice?
h3p336	外面突然黑了。	Wài mian tū rán hēi le.	It suddenly got dark outside.
h3p337	我突然想睡觉了。	Wǒ tū rán xiǎng shuì jiào le.	I suddenly feel like sleeping.
h3p338	突然有人拿起了我！	Tū rán yǒu rén ná qǐ le wǒ!	Suddenly somebody picked me up!
h3p339	你要去图书馆吗？	Nǐ yào qù tú shū guǎn ma?	Are you going to the library?
h3p340	图书馆里很安静。	Tú shū guǎn lǐ hěn ān jìng.	It's very quiet in the library.
h3p341	我的腿好累。	Wǒ de tuǐ hǎo lèi.	My legs are so tired.
h3p342	我的腿太短了，跑不快。	Wǒ de tuǐ tài duǎn le, pǎo bú kuài.	My legs are too short. I can't run fast.
h3p343	你完成作业了吗？	Nǐ wán chéng zuò yè le ma?	Did you finish your homework?
h3p344	我完成了今天的练习！	Wǒ wán chéng le jīn tiān de liàn xí!	I finished today's practice!
h3p345	我要一碗热的面条。	Wǒ yào yì wǎn rè de miàn tiáo.	I'd like a bowl of hot noodles.
h3p346	这碗饭真好吃！	Zhè wǎn fàn zhēn hǎo chī!	This bowl of rice is so tasty!
h3p347	谢谢你，一万个谢谢！	Xiè xie nǐ, yí wàn gè xiè xie!	Thank you, ten thousand thank-yous!
h3p348	我等了你一万年！	Wǒ děng le nǐ yí wàn nián!	I've waited ten thousand years for you!
h3p349	我的裙子是绿色的，你喜欢吗？	Wǒ de qún zi shì lǜ sè de, nǐ xǐ huan ma?	My skirt is green. Do you like it?
h3p350	我又忘记你的名字了，对不起。	Wǒ yòu wàng jì nǐ de míng zi le, duì bu qǐ.	I forgot your name again, sorry.
h3p351	别忘记给我吃的。	Bié wàng jì gěi wǒ chī de.	Don't forget to give me something to eat!
h3p352	为了你，我什么都愿意做。	Wèi le nǐ, wǒ shén me dōu yuàn yì zuò.	I'd do anything for you.
h3p353	今天有三位客人来看我。	Jīn tiān yǒu sān wèi kè rén lái kàn wǒ.	Three guests came to see me today.
h3p354	我喜欢别的地方的文化。	Wǒ xǐ huan bié de dì fang de wén huà.	I like the culture of other places.
h3p355	太阳从东边起来，从西边下去。	Tài yáng cóng dōng biān qǐ lái, cóng xī biān xià qù.	The sun comes up in the east and goes down in the west.
h3p356	我已经习惯一个人在这里了。	Wǒ yǐ jīng xí guàn yí gè rén zài zhè lǐ le.	I'm used to being here by myself now.
h3p357	早起是个好习惯。	Zǎo qǐ shì gè hǎo xí guàn.	Getting up early is a good habit.
h3p358	洗手间在哪里？我想去。	Xǐ shǒu jiān zài nǎ lǐ? Wǒ xiǎng qù.	Where's the restroom? I want to go.
h3p359	你什么时候洗澡？我也想洗。	Nǐ shén me shí hou xǐ zǎo? Wǒ yě xiǎng xǐ.	When do you take a bath? I want one too.
h3p360	夏天到了，我想去游泳。	Xià tiān dào le, wǒ xiǎng qù yóu yǒng.	Summer is here, and I want to go swimming.
```
