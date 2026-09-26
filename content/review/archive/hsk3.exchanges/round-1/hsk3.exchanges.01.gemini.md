These are drafted **short conversations** for a beginner Chinese learning app, held between two small cartoon creatures on the user's desktop. Each row is one whole exchange; turns are separated by ｜ in the Chinese and by " | " in the pinyin and English, and the speakers alternate (turn 1 is creature A, turn 2 is creature B, and so on). Only **HSK 1–3 vocabulary** (the levels are cumulative) may be used.

For every row, check the exchange **as a whole**:
1. Does each turn mean its English, turn for turn?
2. Is each reply a natural answer to what was just said — would two native speakers actually have this exchange? A correct sentence that does not answer the previous turn makes the row wrong.
3. Is the pinyin correct, **including tone marks and neutral tones**? (Generated mechanically — treat it as a claim. Syllable-by-syllable spacing is the house style; do not fix spacing.)
4. Is it within HSK 3 vocabulary (counting every level below), and Simplified?

If you fix a row, give the **whole** corrected exchange in each fix column you use, keeping the ｜ and " | " separators and the same number of turns in every column.

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
h3x001	你饿了吗？｜饿了，我想吃蛋糕。｜厨房里有一个。	Nǐ è le ma? | È le, wǒ xiǎng chī dàn gāo. | Chú fáng lǐ yǒu yí gè.	Are you hungry? | Yes, I want some cake. | There's one in the kitchen.
h3x002	你吃饱了吗？｜还没有，我还想吃香蕉。	Nǐ chī bǎo le ma? | Hái méi yǒu, wǒ hái xiǎng chī xiāng jiāo.	Are you full? | Not yet, I still want a banana.
h3x003	这个面包很新鲜。｜真的吗？我也想吃一个。	Zhè ge miàn bāo hěn xīn xiān. | Zhēn de ma? Wǒ yě xiǎng chī yí gè.	This bread is really fresh. | Really? I want one too.
h3x004	你想喝什么饮料？｜我想喝一点儿甜的。	Nǐ xiǎng hē shén me yǐn liào? | Wǒ xiǎng hē yì diǎnr tián de.	What drink would you like? | Something sweet, please.
h3x005	这个碗里是什么？｜是面条，你要吃吗？｜要！	Zhè ge wǎn lǐ shì shén me? | Shì miàn tiáo, nǐ yào chī ma? | Yào!	What's in this bowl? | Noodles. Do you want some? | Yes!
h3x006	冰箱里还有蛋糕吗？｜没有了，被我吃了。	Bīng xiāng lǐ hái yǒu dàn gāo ma? | Méi yǒu le, bèi wǒ chī le.	Is there any cake left in the fridge? | No, I ate it.
h3x007	你会用筷子吗？｜会，可是我还不习惯。	Nǐ huì yòng kuài zi ma? | Huì, kě shì wǒ hái bù xí guàn.	Can you use chopsticks? | Yes, but I'm not used to it yet.
h3x008	这个菜单我看不懂。｜别着急，我给你讲一下。	Zhè ge cài dān wǒ kàn bù dǒng. | Bié zháo jí, wǒ gěi nǐ jiǎng yí xià.	I can't understand this menu. | Don't worry, I'll explain it to you.
h3x009	盘子里的鱼你不吃吗？｜不吃，我不饿。你吃吧。	Pán zi lǐ de yú nǐ bù chī ma? | Bù chī, wǒ bú è. Nǐ chī ba.	Aren't you going to eat the fish on the plate? | No, I'm not hungry. You have it.
h3x010	你一共买了几个苹果？｜一共五个，都给你。	Nǐ yí gòng mǎi le jǐ gè píng guǒ? | Yí gòng wǔ gè, dōu gěi nǐ.	How many apples did you buy in all? | Five altogether, and they're all for you.
h3x011	这个瓶子里是什么？｜是饮料，很甜。	Zhè ge píng zi lǐ shì shén me? | Shì yǐn liào, hěn tián.	What's in this bottle? | It's a drink, and it's very sweet.
h3x012	你想吃面条还是面包？｜我想吃面包，然后喝牛奶。	Nǐ xiǎng chī miàn tiáo hái shì miàn bāo? | Wǒ xiǎng chī miàn bāo, rán hòu hē niú nǎi.	Do you want noodles or bread? | Bread, and then I'll have some milk.
h3x013	好久不见！｜是啊，你最近好吗？｜我很好，谢谢。	Hǎo jiǔ bú jiàn! | Shì a, nǐ zuì jìn hǎo ma? | Wǒ hěn hǎo, xiè xie.	Long time no see! | I know! How have you been lately? | I'm good, thanks.
h3x014	早上好！你今天来得真早。｜我一直起得很早。	Zǎo shang hǎo! Nǐ jīn tiān lái de zhēn zǎo. | Wǒ yì zhí qǐ de hěn zǎo.	Good morning! You came so early today. | I always get up early.
h3x015	你好，我是你的新邻居。｜欢迎！我们做朋友吧。	Nǐ hǎo, wǒ shì nǐ de xīn lín jū. | Huān yíng! Wǒ men zuò péng you ba.	Hello, I'm your new neighbor. | Welcome! Let's be friends.
h3x016	你好！我们是第一次见面吧？｜对，很高兴认识你。	Nǐ hǎo! Wǒ men shì dì yī cì jiàn miàn ba? | Duì, hěn gāo xìng rèn shi nǐ.	Hi! This is our first time meeting, right? | Yes, nice to meet you.
h3x017	你好，你是校长吗？｜不是，我是新来的。	Nǐ hǎo, nǐ shì xiào zhǎng ma? | Bú shì, wǒ shì xīn lái de.	Hello, are you the principal? | No, I'm new here.
h3x018	你去哪儿了？我等了你一会儿。｜对不起，我遇到朋友了。	Nǐ qù nǎr le? Wǒ děng le nǐ yí huìr. | Duì bu qǐ, wǒ yù dào péng you le.	Where did you go? I waited for you a while. | Sorry, I ran into a friend.
h3x019	你的帽子真可爱！｜谢谢，是奶奶给我的。	Nǐ de mào zi zhēn kě ài! | Xiè xie, shì nǎi nai gěi wǒ de.	Your hat is so cute! | Thanks, my grandma gave it to me.
h3x020	再见，我要回家了。｜好，路上小心！	Zài jiàn, wǒ yào huí jiā le. | Hǎo, lù shang xiǎo xīn!	Bye, I'm going home. | Okay, be careful on the way!
h3x021	今天刮风了。｜是啊，我的帽子飞走了！	Jīn tiān guā fēng le. | Shì a, wǒ de mào zi fēi zǒu le!	It's windy today. | Yeah, my hat blew away!
h3x022	今天太阳很大。｜是啊，我想去树下休息。	Jīn tiān tài yáng hěn dà. | Shì a, wǒ xiǎng qù shù xià xiū xi.	The sun is strong today. | Yeah, I want to rest under a tree.
h3x023	外面下雨了，你带伞了吗？｜带了，我的伞是蓝的。	Wài mian xià yǔ le, nǐ dài sǎn le ma? | Dài le, wǒ de sǎn shì lán de.	It's raining outside, did you bring an umbrella? | I did, mine is blue.
h3x024	现在是什么季节？｜是秋天，天气很舒服。	Xiàn zài shì shén me jì jié? | Shì qiū tiān, tiān qì hěn shū fu.	What season is it now? | Autumn, and the weather is nice.
h3x025	今天真热，我想开空调。｜好，我马上去开。	Jīn tiān zhēn rè, wǒ xiǎng kāi kōng tiáo. | Hǎo, wǒ mǎ shàng qù kāi.	It's so hot today, I want to turn on the air conditioner. | Okay, I'll go do it right now.
h3x026	今天天气怎么样？｜不冷也不热，很舒服。	Jīn tiān tiān qì zěn me yàng? | Bù lěng yě bú rè, hěn shū fu.	How's the weather today? | Not cold, not hot, very pleasant.
h3x027	你怎么感冒了？｜昨天很冷，我忘记穿衣服了。	Nǐ zěn me gǎn mào le? | Zuó tiān hěn lěng, wǒ wàng jì chuān yī fu le.	Why did you catch a cold? | It was cold yesterday and I forgot to put on clothes.
h3x028	明天会下雪吗？｜可能会，冬天快到了。｜太好了，我想玩雪！	Míng tiān huì xià xuě ma? | Kě néng huì, dōng tiān kuài dào le. | Tài hǎo le, wǒ xiǎng wán xuě!	Will it snow tomorrow? | Maybe, winter is almost here. | Great, I want to play in the snow!
h3x029	你怎么还不睡觉？｜我睡不着，我有点儿害怕。｜别怕，我在这儿。	Nǐ zěn me hái bú shuì jiào? | Wǒ shuì bù zhe, wǒ yǒu diǎnr hài pà. | Bié pà, wǒ zài zhèr.	Why aren't you asleep yet? | I can't sleep, I'm a little scared. | Don't be scared, I'm here.
h3x030	你几点睡觉？｜我一般十点睡。｜我也是。	Nǐ jǐ diǎn shuì jiào? | Wǒ yì bān shí diǎn shuì. | Wǒ yě shì.	What time do you go to bed? | Usually at ten. | Me too.
h3x031	你看起来很累。｜是啊，今天我练习了很久。	Nǐ kàn qǐ lái hěn lèi. | Shì a, jīn tiān wǒ liàn xí le hěn jiǔ.	You look tired. | Yeah, I practiced for a long time today.
h3x032	月亮出来了，我们睡觉吧。｜好，晚安。	Yuè liang chū lái le, wǒ men shuì jiào ba. | Hǎo, wǎn ān.	The moon is out, let's go to sleep. | Okay, good night.
h3x033	我想睡觉了。｜再玩一会儿，好吗？｜不行，明天还要爬山。	Wǒ xiǎng shuì jiào le. | Zài wán yí huìr, hǎo ma? | Bù xíng, míng tiān hái yào pá shān.	I'm sleepy. | Play a little longer, okay? | No, we have to climb the mountain tomorrow.
h3x034	你怎么这么累？｜我昨天做作业做到很晚。	Nǐ zěn me zhè me lèi? | Wǒ zuó tiān zuò zuò yè zuò dào hěn wǎn.	Why are you so tired? | I did my homework until very late yesterday.
h3x035	你在看什么？｜我在看照片，是我小时候的。	Nǐ zài kàn shén me? | Wǒ zài kàn zhào piàn, shì wǒ xiǎo shí hou de.	What are you looking at? | A photo from when I was little.
h3x036	你喜欢音乐吗？｜喜欢，我特别喜欢唱歌。	Nǐ xǐ huan yīn yuè ma? | Xǐ huan, wǒ tè bié xǐ huan chàng gē.	Do you like music? | Yes, I especially love singing.
h3x037	你的脚疼吗？｜有一点儿疼，我想休息。	Nǐ de jiǎo téng ma? | Yǒu yì diǎnr téng, wǒ xiǎng xiū xi.	Does your foot hurt? | A little, I want to rest.
h3x038	周末你想做什么？｜我想去公园玩。｜好，我也去！	Zhōu mò nǐ xiǎng zuò shén me? | Wǒ xiǎng qù gōng yuán wán. | Hǎo, wǒ yě qù!	What do you want to do this weekend? | I want to go play in the park. | Okay, I'm coming too!
h3x039	你会游泳吗？｜会一点儿，我在努力学。	Nǐ huì yóu yǒng ma? | Huì yì diǎnr, wǒ zài nǔ lì xué.	Can you swim? | A little, I'm working hard to learn.
h3x040	你为什么哭了？｜我的球坏了。｜别难过，我们再买一个。	Nǐ wèi shén me kū le? | Wǒ de qiú huài le. | Bié nán guò, wǒ men zài mǎi yí gè.	Why are you crying? | My ball is broken. | Don't be sad, we'll buy another one.
h3x041	你看，天上有一只鸟！｜它飞得真高！	Nǐ kàn, tiān shàng yǒu yì zhī niǎo! | Tā fēi de zhēn gāo!	Look, there's a bird in the sky! | It flies so high!
h3x042	你能帮忙吗？｜当然可以，你要我做什么？	Nǐ néng bāng máng ma? | Dāng rán kě yǐ, nǐ yào wǒ zuò shén me?	Can you help? | Of course, what do you need me to do?
h3x043	你会说中文吗？｜会一点儿，我在学。｜你说得很清楚！	Nǐ huì shuō zhōng wén ma? | Huì yì diǎnr, wǒ zài xué. | Nǐ shuō de hěn qīng chǔ!	Can you speak Chinese? | A little, I'm learning. | You speak very clearly!
h3x044	这只熊猫真胖！｜是啊，它每天吃很多东西。	Zhè zhī xióng māo zhēn pàng! | Shì a, tā měi tiān chī hěn duō dōng xi.	This panda is so chubby! | Yeah, it eats a lot every day.
h3x045	你的照相机在哪儿？｜在我的包里。｜借我用一下，好吗？	Nǐ de zhào xiàng jī zài nǎr? | Zài wǒ de bāo lǐ. | Jiè wǒ yòng yí xià, hǎo ma?	Where's your camera? | In my bag. | Can I borrow it for a bit?
h3x046	我可以借你的书吗？｜可以，你要记得还我。｜一定！	Wǒ kě yǐ jiè nǐ de shū ma? | Kě yǐ, nǐ yào jì de hái wǒ. | Yí dìng!	Can I borrow your book? | Sure, remember to give it back. | I will!
h3x047	你今天为什么这么高兴？｜因为我的成绩很好！	Nǐ jīn tiān wèi shén me zhè me gāo xìng? | Yīn wèi wǒ de chéng jì hěn hǎo!	Why are you so happy today? | Because my grades are great!
h3x048	你的头发真长。｜真的吗？我觉得有点儿重。	Nǐ de tóu fa zhēn cháng. | Zhēn de ma? Wǒ jué de yǒu diǎnr zhòng.	Your hair is so long. | Really? I think it's a bit heavy.
h3x049	你在玩什么游戏？｜一个新游戏，很难。｜我可以试一下吗？	Nǐ zài wán shén me yóu xì? | Yí gè xīn yóu xì, hěn nán. | Wǒ kě yǐ shì yí xià ma?	What game are you playing? | A new one, it's hard. | Can I try it?
h3x050	你为什么不说话？｜我在想办法，怎么才能爬上去。	Nǐ wèi shén me bù shuō huà? | Wǒ zài xiǎng bàn fǎ, zěn me cái néng pá shàng qù.	Why aren't you talking? | I'm figuring out how to climb up there.
h3x051	你的自行车真漂亮！｜谢谢，我每天都骑它。	Nǐ de zì xíng chē zhēn piào liang! | Xiè xie, wǒ měi tiān dōu qí tā.	Your bike is so pretty! | Thanks, I ride it every day.
h3x052	这本书是关于什么的？｜是关于一只熊猫的故事。	Zhè běn shū shì guān yú shén me de? | Shì guān yú yì zhī xióng māo de gù shì.	What is this book about? | It's a story about a panda.
h3x053	你在写什么？｜我在给爷爷写信。	Nǐ zài xiě shén me? | Wǒ zài gěi yé ye xiě xìn.	What are you writing? | I'm writing a letter to my grandpa.
h3x054	你的裙子是新的吗？｜不是，是我以前买的。	Nǐ de qún zi shì xīn de ma? | Bú shì, shì wǒ yǐ qián mǎi de.	Is your skirt new? | No, I bought it a while ago.
h3x055	你怎么了？｜我的腿没有力气了。	Nǐ zěn me le? | Wǒ de tuǐ méi yǒu lì qi le.	What's wrong? | My legs have no strength left.
h3x056	你听到声音了吗？｜听到了，是有人在唱歌。	Nǐ tīng dào shēng yīn le ma? | Tīng dào le, shì yǒu rén zài chàng gē.	Did you hear that sound? | I did, someone is singing.
h3x057	你想不想去爬山？｜想是想，可是我有点儿担心。｜别担心，我会照顾你。	Nǐ xiǎng bu xiǎng qù pá shān? | Xiǎng shì xiǎng, kě shì wǒ yǒu diǎnr dān xīn. | Bié dān xīn, wǒ huì zhào gù nǐ.	Do you want to go hiking? | I do, but I'm a bit worried. | Don't worry, I'll take care of you.
h3x058	我突然想起一件事。｜什么事？｜今天是妹妹的生日！	Wǒ tū rán xiǎng qǐ yí jiàn shì. | Shén me shì? | Jīn tiān shì mèi mei de shēng rì!	I just remembered something. | What is it? | Today is my little sister's birthday!
h3x059	你喜欢哪个季节？｜我喜欢夏天，可以游泳。	Nǐ xǐ huan nǎ gè jì jié? | Wǒ xǐ huan xià tiān, kě yǐ yóu yǒng.	Which season do you like? | Summer, because I can swim.
h3x060	这个问题你明白了吗？｜还没有，你再讲一遍吧。	Zhè ge wèn tí nǐ míng bái le ma? | Hái méi yǒu, nǐ zài jiǎng yí biàn ba.	Do you understand this problem? | Not yet, please explain it once more.
```
