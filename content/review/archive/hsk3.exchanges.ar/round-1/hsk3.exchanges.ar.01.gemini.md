These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is short **conversations** between two creatures; turns are separated by ｜ in the Chinese and " | " everywhere else. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.
5. Does each reply answer the turn before it? There must be exactly as many " | "-separated parts as the Chinese has ｜-separated turns.

If it needs changing, give the whole corrected Arabic in `fix_gloss`, fully vowelled.

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_gloss	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the `fix_` column(s) empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	english	gloss	gloss_reading
h3x001	你饿了吗？｜饿了，我想吃蛋糕。｜厨房里有一个。	Are you hungry? | Yes, I want some cake. | There's one in the kitchen.	هَلْ أَنْتَ جَائِعٌ؟ | نَعَمْ، أُرِيدُ كَعْكَةً. | تُوجَدُ كَعْكَةٌ فِي الْمَطْبَخِ.	Hal anta jāʾiʿ? | Naʿam, urīdu kaʿka. | Tūjadu kaʿkatun fī al-maṭbakh.
h3x002	你吃饱了吗？｜还没有，我还想吃香蕉。	Are you full? | Not yet, I still want a banana.	هَلْ شَبِعْتَ؟ | لَا، مَا زِلْتُ أُرِيدُ مَوْزَةً.	Hal shabiʿt? | Lā, mā ziltu urīdu mawza.
h3x003	这个面包很新鲜。｜真的吗？我也想吃一个。	This bread is really fresh. | Really? I want one too.	هٰذَا الْخُبْزُ طَازَجٌ جِدًّا. | حَقًّا؟ أُرِيدُ قِطْعَةً أَنَا أَيْضًا.	Hādhā al-khubzu ṭāzajun jiddan. | Ḥaqqan? Urīdu qiṭʿatan anā ayḍan.
h3x004	你想喝什么饮料？｜我想喝一点儿甜的。	What drink would you like? | Something sweet, please.	مَاذَا تُرِيدُ أَنْ تَشْرَبَ؟ | أُرِيدُ شَيْئًا حُلْوًا مِنْ فَضْلِكَ.	Mādhā turīdu an tashrab? | Urīdu shayʾan ḥulwan min faḍlik.
h3x005	这个碗里是什么？｜是面条，你要吃吗？｜要！	What's in this bowl? | Noodles. Do you want some? | Yes!	مَاذَا فِي هٰذَا الصَّحْنِ؟ | نُودِلْزُ، هَلْ تُرِيدُ بَعْضًا؟ | نَعَمْ!	Mādhā fī hādhā aṣ-ṣaḥn? | Nūdilz, hal turīdu baʿḍan? | Naʿam!
h3x006	冰箱里还有蛋糕吗？｜没有了，被我吃了。	Is there any cake left in the fridge? | No, I ate it.	هَلْ بَقِيَتْ كَعْكَةٌ فِي الثَّلَّاجَةِ؟ | لَا، أَكَلْتُهَا.	Hal baqiyat kaʿkatun fī ath-thallāja? | Lā, akaltuhā.
h3x007	你会用筷子吗？｜会，可是我还不习惯。	Can you use chopsticks? | Yes, but I'm not used to it yet.	هَلْ تَعْرِفُ أَنْ تَسْتَخْدِمَ عِيدَانَ الطَّعَامِ؟ | نَعَمْ، لٰكِنَّنِي لَمْ أَعْتَدْ عَلَيْهَا بَعْدُ.	Hal taʿrifu an tastakhdima ʿīdāna aṭ-ṭaʿām? | Naʿam, lākinnanī lam aʿtad ʿalayhā baʿd.
h3x008	这个菜单我看不懂。｜别着急，我给你讲一下。	I can't understand this menu. | Don't worry, I'll explain it to you.	لَا أَفْهَمُ هٰذِهِ الْقَائِمَةَ. | لَا تَقْلَقْ، سَأَشْرَحُهَا لَكَ.	Lā afhamu hādhihi al-qāʾima. | Lā taqlaq, saʾashraḥuhā lak.
h3x009	盘子里的鱼你不吃吗？｜不吃，我不饿。你吃吧。	Aren't you going to eat the fish on the plate? | No, I'm not hungry. You have it.	أَلَنْ تَأْكُلَ السَّمَكَةَ الَّتِي فِي الصَّحْنِ؟ | لَا، لَسْتُ جَائِعًا. كُلْهَا أَنْتَ.	Alan taʾkula as-samakata allatī fī aṣ-ṣaḥn? | Lā, lastu jāʾiʿan. Kulhā anta.
h3x010	你一共买了几个苹果？｜一共五个，都给你。	How many apples did you buy in all? | Five altogether, and they're all for you.	كَمْ تُفَّاحَةً اِشْتَرَيْتَ فِي الْمَجْمُوعِ؟ | خَمْسُ تُفَّاحَاتٍ، كُلُّهَا لَكَ.	Kam tuffāḥatan ishtarayta fī al-majmūʿ? | Khamsu tuffāḥāt, kulluhā lak.
h3x011	这个瓶子里是什么？｜是饮料，很甜。	What's in this bottle? | It's a drink, and it's very sweet.	مَاذَا فِي هٰذِهِ الزُّجَاجَةِ؟ | مَشْرُوبٌ، وَهُوَ حُلْوٌ جِدًّا.	Mādhā fī hādhihi az-zujāja? | Mashrūb, wahuwa ḥulwun jiddan.
h3x012	你想吃面条还是面包？｜我想吃面包，然后喝牛奶。	Do you want noodles or bread? | Bread, and then I'll have some milk.	هَلْ تُرِيدُ نُودِلْزَ أَمْ خُبْزًا؟ | أُرِيدُ خُبْزًا، ثُمَّ أَشْرَبُ حَلِيبًا.	Hal turīdu nūdilza am khubzan? | Urīdu khubzan, thumma ashrabu ḥalīban.
h3x013	好久不见！｜是啊，你最近好吗？｜我很好，谢谢。	Long time no see! | I know! How have you been lately? | I'm good, thanks.	مُنْذُ وَقْتٍ طَوِيلٍ! | نَعَمْ، كَيْفَ حَالُكَ مُؤَخَّرًا؟ | أَنَا بِخَيْرٍ، شُكْرًا.	Mundhu waqtin ṭawīl! | Naʿam, kayfa ḥāluka muʾakhkharan? | Anā bikhayr, shukran.
h3x014	早上好！你今天来得真早。｜我一直起得很早。	Good morning! You came so early today. | I always get up early.	صَبَاحُ الْخَيْرِ! جِئْتَ مُبَكِّرًا جِدًّا الْيَوْمَ. | أَنَا أَسْتَيْقِظُ مُبَكِّرًا دَائِمًا.	Ṣabāḥu al-khayr! Jiʾta mubakkiran jiddan al-yawm. | Anā astayqiẓu mubakkiran dāʾiman.
h3x015	你好，我是你的新邻居。｜欢迎！我们做朋友吧。	Hello, I'm your new neighbor. | Welcome! Let's be friends.	مَرْحَبًا، أَنَا جَارُكَ الْجَدِيدُ. | أَهْلًا وَسَهْلًا! لِنَكُنْ صَدِيقَيْنِ.	Marḥaban, anā jāruka al-jadīd. | Ahlan wasahlan! Linakun ṣadīqayn.
h3x016	你好！我们是第一次见面吧？｜对，很高兴认识你。	Hi! This is our first time meeting, right? | Yes, nice to meet you.	مَرْحَبًا! هٰذِهِ أَوَّلُ مَرَّةٍ نَلْتَقِي فِيهَا، أَلَيْسَ كَذٰلِكَ؟ | نَعَمْ، سُعِدْتُ بِمَعْرِفَتِكَ.	Marḥaban! Hādhihi awwalu marratin naltaqī fīhā, alaysa kadhālik? | Naʿam, suʿidtu bimaʿrifatik.
h3x017	你好，你是校长吗？｜不是，我是新来的。	Hello, are you the principal? | No, I'm new here.	مَرْحَبًا، هَلْ أَنْتَ مُدِيرُ الْمَدْرَسَةِ؟ | لَا، أَنَا جَدِيدٌ هُنَا.	Marḥaban, hal anta mudīru al-madrasa? | Lā, anā jadīdun hunā.
h3x018	你去哪儿了？我等了你一会儿。｜对不起，我遇到朋友了。	Where did you go? I waited for you a while. | Sorry, I ran into a friend.	إِلَى أَيْنَ ذَهَبْتَ؟ اِنْتَظَرْتُكَ قَلِيلًا. | آسِفٌ، قَابَلْتُ صَدِيقًا.	Ilā ayna dhahabt? Intaẓartuka qalīlan. | Āsif, qābaltu ṣadīqan.
h3x019	你的帽子真可爱！｜谢谢，是奶奶给我的。	Your hat is so cute! | Thanks, my grandma gave it to me.	مَا أَلْطَفَ قُبَّعَتَكَ! | شُكْرًا، أَعْطَتْنِيهَا جَدَّتِي.	Mā alṭafa qubbaʿatak! | Shukran, aʿṭatnīhā jaddatī.
h3x020	再见，我要回家了。｜好，路上小心！	Bye, I'm going home. | Okay, be careful on the way!	مَعَ السَّلَامَةِ، سَأَذْهَبُ إِلَى الْبَيْتِ. | حَسَنًا، اِنْتَبِهْ فِي الطَّرِيقِ!	Maʿa as-salāma, saʾadhhabu ilā al-bayt. | Ḥasanan, intabih fī aṭ-ṭarīq!
h3x021	今天刮风了。｜是啊，我的帽子飞走了！	It's windy today. | Yeah, my hat blew away!	الرِّيحُ تَهُبُّ الْيَوْمَ. | نَعَمْ، طَارَتْ قُبَّعَتِي!	Ar-rīḥu tahubbu al-yawm. | Naʿam, ṭārat qubbaʿatī!
h3x022	今天太阳很大。｜是啊，我想去树下休息。	The sun is strong today. | Yeah, I want to rest under a tree.	الشَّمْسُ قَوِيَّةٌ الْيَوْمَ. | نَعَمْ، أُرِيدُ أَنْ أَذْهَبَ لِأَسْتَرِيحَ تَحْتَ شَجَرَةٍ.	Ash-shamsu qawiyyatun al-yawm. | Naʿam, urīdu an adhhaba liʾastarīḥa taḥta shajara.
h3x023	外面下雨了，你带伞了吗？｜带了，我的伞是蓝的。	It's raining outside, did you bring an umbrella? | I did, mine is blue.	السَّمَاءُ تُمْطِرُ فِي الْخَارِجِ، هَلْ أَخَذْتَ مِظَلَّةً؟ | نَعَمْ، مِظَلَّتِي زَرْقَاءُ.	As-samāʾu tumṭiru fī al-khārij, hal akhadhta miẓalla? | Naʿam, miẓallatī zarqāʾ.
h3x024	现在是什么季节？｜是秋天，天气很舒服。	What season is it now? | Autumn, and the weather is nice.	فِي أَيِّ فَصْلٍ نَحْنُ الْآنَ؟ | فِي الْخَرِيفِ، وَالْجَوُّ مُرِيحٌ.	Fī ayyi faṣlin naḥnu al-ʾān? | Fī al-kharīf, wa-l-jawwu murīḥ.
h3x025	今天真热，我想开空调。｜好，我马上去开。	It's so hot today, I want to turn on the air conditioner. | Okay, I'll go do it right now.	الْجَوُّ حَارٌّ جِدًّا الْيَوْمَ، أُرِيدُ أَنْ أُشَغِّلَ الْمُكَيِّفَ. | حَسَنًا، سَأَذْهَبُ وَأُشَغِّلُهُ الْآنَ.	Al-jawwu ḥārrun jiddan al-yawm, urīdu an ushaghghila al-mukayyif. | Ḥasanan, saʾadhhabu waʾushaghghiluhu al-ʾān.
h3x026	今天天气怎么样？｜不冷也不热，很舒服。	How's the weather today? | Not cold, not hot, very pleasant.	كَيْفَ الْجَوُّ الْيَوْمَ؟ | لَا بَارِدٌ وَلَا حَارٌّ، مُرِيحٌ جِدًّا.	Kayfa al-jawwu al-yawm? | Lā bāridun walā ḥārr, murīḥun jiddan.
h3x027	你怎么感冒了？｜昨天很冷，我忘了多穿衣服。	Why did you catch a cold? | It was cold yesterday and I forgot to wear more clothes.	لِمَاذَا أُصِبْتَ بِالزُّكَامِ؟ | كَانَ الْجَوُّ بَارِدًا أَمْسِ، وَنَسِيتُ أَنْ أَلْبَسَ أَكْثَرَ.	Limādhā uṣibta bi-z-zukām? | Kāna al-jawwu bāridan ams, wanasītu an albasa akthar.
h3x028	明天会下雪吗？｜可能会，冬天快到了。｜太好了，我想玩雪！	Will it snow tomorrow? | Maybe, winter is almost here. | Great, I want to play in the snow!	هَلْ سَيَنْزِلُ الثَّلْجُ غَدًا؟ | رُبَّمَا، الشِّتَاءُ قَرِيبٌ. | رَائِعٌ، أُرِيدُ أَنْ أَلْعَبَ بِالثَّلْجِ!	Hal sayanzilu ath-thalju ghadan? | Rubbamā, ash-shitāʾu qarīb. | Rāʾiʿ, urīdu an alʿaba bi-th-thalj!
h3x029	你怎么还不睡觉？｜我睡不着，我有点儿害怕。｜别怕，我在这儿。	Why aren't you asleep yet? | I can't sleep, I'm a little scared. | Don't be scared, I'm here.	لِمَاذَا لَمْ تَنَمْ بَعْدُ؟ | لَا أَسْتَطِيعُ النَّوْمَ، أَنَا خَائِفٌ قَلِيلًا. | لَا تَخَفْ، أَنَا هُنَا.	Limādhā lam tanam baʿd? | Lā astaṭīʿu an-nawm, anā khāʾifun qalīlan. | Lā takhaf, anā hunā.
h3x030	你几点睡觉？｜我一般十点睡。｜我也是。	What time do you go to bed? | Usually at ten. | Me too.	مَتَى تَنَامُ؟ | عَادَةً فِي الْعَاشِرَةِ. | وَأَنَا أَيْضًا.	Matā tanām? | ʿĀdatan fī al-ʿāshira. | Waʾanā ayḍan.
h3x031	你看起来很累。｜是啊，今天我练习了很久。	You look tired. | Yeah, I practiced for a long time today.	تَبْدُو مُتْعَبًا. | نَعَمْ، تَدَرَّبْتُ طَوِيلًا الْيَوْمَ.	Tabdū mutʿaban. | Naʿam, tadarrabtu ṭawīlan al-yawm.
h3x032	月亮出来了，我们睡觉吧。｜好，晚安。	The moon is out, let's go to sleep. | Okay, good night.	طَلَعَ الْقَمَرُ، لِنَنَمْ. | حَسَنًا، تُصْبِحُ عَلَى خَيْرٍ.	Ṭalaʿa al-qamar, linanam. | Ḥasanan, tuṣbiḥu ʿalā khayr.
h3x033	我想睡觉了。｜再玩一会儿，好吗？｜不行，明天还要爬山。	I'm sleepy. | Play a little longer, okay? | No, we have to climb the mountain tomorrow.	أَشْعُرُ بِالنُّعَاسِ. | لِنَلْعَبْ قَلِيلًا بَعْدُ، حَسَنًا؟ | لَا، يَجِبُ أَنْ نَتَسَلَّقَ الْجَبَلَ غَدًا.	Ashʿuru bi-n-nuʿās. | Linalʿab qalīlan baʿd, ḥasanan? | Lā, yajibu an natasallaqa al-jabala ghadan.
h3x034	你怎么这么累？｜我昨天做作业做到很晚。	Why are you so tired? | I did my homework until very late yesterday.	لِمَاذَا أَنْتَ مُتْعَبٌ إِلَى هٰذَا الْحَدِّ؟ | حَلَلْتُ وَاجِبِي أَمْسِ حَتَّى وَقْتٍ مُتَأَخِّرٍ جِدًّا.	Limādhā anta mutʿabun ilā hādhā al-ḥadd? | Ḥalaltu wājibī amsi ḥattā waqtin mutaʾakhkhirin jiddan.
h3x035	你在看什么？｜我在看照片，是我小时候的。	What are you looking at? | A photo from when I was little.	مَاذَا تَنْظُرُ إِلَيْهِ؟ | أَنْظُرُ إِلَى صُورَةٍ مِنْ طُفُولَتِي.	Mādhā tanẓuru ilayh? | Anẓuru ilā ṣūratin min ṭufūlatī.
h3x036	你喜欢音乐吗？｜喜欢，我特别喜欢唱歌。	Do you like music? | Yes, I especially love singing.	هَلْ تُحِبُّ الْمُوسِيقَى؟ | نَعَمْ، أُحِبُّ الْغِنَاءَ كَثِيرًا.	Hal tuḥibbu al-mūsīqā? | Naʿam, uḥibbu al-ghināʾa kathīran.
h3x037	你的脚疼吗？｜有一点儿疼，我想休息。	Does your foot hurt? | A little, I want to rest.	هَلْ قَدَمُكَ تُؤْلِمُكَ؟ | قَلِيلًا، أُرِيدُ أَنْ أَسْتَرِيحَ.	Hal qadamuka tuʾlimuk? | Qalīlan, urīdu an astarīḥ.
h3x038	周末你想做什么？｜我想去公园玩。｜好，我也去！	What do you want to do this weekend? | I want to go play in the park. | Okay, I'm coming too!	مَاذَا تُرِيدُ أَنْ تَفْعَلَ فِي نِهَايَةِ الْأُسْبُوعِ؟ | أُرِيدُ أَنْ أَذْهَبَ لِأَلْعَبَ فِي الْحَدِيقَةِ. | حَسَنًا، سَأَذْهَبُ مَعَكَ!	Mādhā turīdu an tafʿala fī nihāyati al-ʾusbūʿ? | Urīdu an adhhaba liʾalʿaba fī al-ḥadīqa. | Ḥasanan, saʾadhhabu maʿak!
h3x039	你会游泳吗？｜会一点儿，我在努力学。	Can you swim? | A little, I'm working hard to learn.	هَلْ تَعْرِفُ السِّبَاحَةَ؟ | قَلِيلًا، وَأَنَا أَجْتَهِدُ فِي التَّعَلُّمِ.	Hal taʿrifu as-sibāḥa? | Qalīlan, waʾanā ajtahidu fī at-taʿallum.
h3x040	你为什么哭了？｜我的球坏了。｜别难过，我们再买一个。	Why are you crying? | My ball is broken. | Don't be sad, we'll buy another one.	لِمَاذَا تَبْكِي؟ | كُرَتِي انْكَسَرَتْ. | لَا تَحْزَنْ، سَنَشْتَرِي وَاحِدَةً أُخْرَى.	Limādhā tabkī? | Kuratī inkasarat. | Lā taḥzan, sanashtarī wāḥidatan ukhrā.
h3x041	你看，天上有一只鸟！｜它飞得真高！	Look, there's a bird in the sky! | It flies so high!	اُنْظُرْ، فِي السَّمَاءِ عُصْفُورٌ! | مَا أَعْلَى طَيَرَانَهُ!	Unẓur, fī as-samāʾi ʿuṣfūr! | Mā aʿlā ṭayarānah!
h3x042	你能帮忙吗？｜当然可以，你要我做什么？	Can you help? | Of course, what do you need me to do?	هَلْ تُسَاعِدُنِي؟ | طَبْعًا، مَاذَا تُرِيدُ أَنْ أَفْعَلَ؟	Hal tusāʿidunī? | Ṭabʿan, mādhā turīdu an afʿal?
h3x043	你会说中文吗？｜会一点儿，我在学。｜你说得很清楚！	Can you speak Chinese? | A little, I'm learning. | You speak very clearly!	هَلْ تَتَكَلَّمُ الصِّينِيَّةَ؟ | قَلِيلًا، أَنَا أَتَعَلَّمُهَا. | كَلَامُكَ وَاضِحٌ جِدًّا!	Hal tatakallamu aṣ-ṣīniyya? | Qalīlan, anā ataʿallamuhā. | Kalāmuka wāḍiḥun jiddan!
h3x044	这只熊猫真胖！｜是啊，它每天吃很多东西。	This panda is so chubby! | Yeah, it eats a lot every day.	هٰذَا الدُّبُّ سَمِينٌ جِدًّا! | نَعَمْ، يَأْكُلُ كَثِيرًا كُلَّ يَوْمٍ.	Hādhā ad-dubbu samīnun jiddan! | Naʿam, yaʾkulu kathīran kulla yawm.
h3x045	你的照相机在哪儿？｜在我的包里。｜借我用一下，好吗？	Where's your camera? | In my bag. | Can I borrow it for a bit?	أَيْنَ كَامِيرَاكَ؟ | فِي حَقِيبَتِي. | أَعِرْنِي إِيَّاهَا قَلِيلًا، حَسَنًا؟	Ayna kāmīrāk? | Fī ḥaqībatī. | Aʿirnī iyyāhā qalīlan, ḥasanan?
h3x046	我可以借你的书吗？｜可以，你要记得还我。｜一定！	Can I borrow your book? | Sure, remember to give it back. | I will!	هَلْ يُمْكِنُنِي أَنْ أَسْتَعِيرَ كِتَابَكَ؟ | طَبْعًا، وَتَذَكَّرْ أَنْ تُعِيدَهُ إِلَيَّ. | بِالتَّأْكِيدِ!	Hal yumkinunī an astaʿīra kitābak? | Ṭabʿan, watadhakkar an tuʿīdahu ilayy. | Bi-t-taʾkīd!
h3x047	你今天为什么这么高兴？｜因为我的成绩很好！	Why are you so happy today? | Because my grades are great!	لِمَاذَا أَنْتَ سَعِيدٌ جِدًّا الْيَوْمَ؟ | لِأَنَّ دَرَجَاتِي جَيِّدَةٌ جِدًّا!	Limādhā anta saʿīdun jiddan al-yawm? | Liʾanna darajātī jayyidatun jiddan!
h3x049	你在玩什么游戏？｜一个新游戏，很难。｜我可以试一下吗？	What game are you playing? | A new one, it's hard. | Can I try it?	أَيَّةَ لُعْبَةٍ تَلْعَبُ؟ | لُعْبَةٌ جَدِيدَةٌ، وَهِيَ صَعْبَةٌ. | هَلْ يُمْكِنُنِي أَنْ أُجَرِّبَ؟	Ayyata luʿbatin talʿab? | Luʿbatun jadīda, wahiya ṣaʿba. | Hal yumkinunī an ujarrib?
h3x050	你为什么不说话？｜我在想办法，怎么才能爬上去。	Why aren't you talking? | I'm figuring out how to climb up there.	لِمَاذَا لَا تَتَكَلَّمُ؟ | أُفَكِّرُ فِي طَرِيقَةٍ لِأَصْعَدَ إِلَى هُنَاكَ.	Limādhā lā tatakallam? | Ufakkiru fī ṭarīqatin liʾaṣʿada ilā hunāk.
h3x051	你的自行车真漂亮！｜谢谢，我每天都骑它。	Your bike is so pretty! | Thanks, I ride it every day.	مَا أَجْمَلَ دَرَّاجَتَكَ! | شُكْرًا، أَرْكَبُهَا كُلَّ يَوْمٍ.	Mā ajmala darrājatak! | Shukran, arkabuhā kulla yawm.
h3x052	这本书是关于什么的？｜是关于一只熊猫的故事。	What is this book about? | It's a story about a panda.	عَمَّ يَتَحَدَّثُ هٰذَا الْكِتَابُ؟ | إِنَّهُ قِصَّةٌ عَنْ دُبِّ بَانْدَا.	ʿAmma yataḥaddathu hādhā al-kitāb? | Innahu qiṣṣatun ʿan dubbi bandā.
h3x053	你在写什么？｜我在给爷爷写信。	What are you writing? | I'm writing a letter to my grandpa.	مَاذَا تَكْتُبُ؟ | أَكْتُبُ رِسَالَةً إِلَى جَدِّي.	Mādhā taktub? | Aktubu risālatan ilā jaddī.
h3x054	你的裙子是新的吗？｜不是，是我以前买的。	Is your skirt new? | No, I bought it a while ago.	هَلْ تَنُّورَتُكَ جَدِيدَةٌ؟ | لَا، اِشْتَرَيْتُهَا مِنْ قَبْلُ.	Hal tannūratuka jadīda? | Lā, ishtaraytuhā min qabl.
h3x055	你怎么了？｜我的腿走不动了。	What's wrong? | My legs can't walk any more.	مَا بِكَ؟ | سَاقَايَ لَا تَسْتَطِيعَانِ الْمَشْيَ بَعْدَ الْآنَ.	Mā bik? | Sāqāya lā tastaṭīʿāni al-mashya baʿda al-ʾān.
h3x056	你听到声音了吗？｜听到了，是有人在唱歌。	Did you hear that sound? | I did, someone is singing.	هَلْ سَمِعْتَ ذٰلِكَ الصَّوْتَ؟ | نَعَمْ، أَحَدٌ يُغَنِّي.	Hal samiʿta dhālika aṣ-ṣawt? | Naʿam, aḥadun yughannī.
h3x057	你想不想去爬山？｜想是想，可是我有点儿担心。｜别担心，我会照顾你。	Do you want to go hiking? | I do, but I'm a bit worried. | Don't worry, I'll take care of you.	هَلْ تُرِيدُ أَنْ تَتَسَلَّقَ الْجَبَلَ؟ | نَعَمْ، لٰكِنَّنِي قَلِقٌ قَلِيلًا. | لَا تَقْلَقْ، سَأَعْتَنِي بِكَ.	Hal turīdu an tatasallaqa al-jabal? | Naʿam, lākinnanī qaliqun qalīlan. | Lā taqlaq, saʾaʿtanī bik.
h3x058	我突然想起一件事。｜什么事？｜今天是妹妹的生日！	I suddenly remembered something. | What is it? | Today is my little sister's birthday!	تَذَكَّرْتُ شَيْئًا فَجْأَةً. | مَا هُوَ؟ | الْيَوْمَ عِيدُ مِيلَادِ أُخْتِي الصَّغِيرَةِ!	Tadhakkartu shayʾan fajʾa. | Mā huwa? | Al-yawma ʿīdu mīlādi ukhtī aṣ-ṣaghīra!
h3x059	你喜欢哪个季节？｜我喜欢夏天，可以游泳。	Which season do you like? | Summer, because I can swim.	أَيَّ فَصْلٍ تُحِبُّ؟ | أُحِبُّ الصَّيْفَ، فَأَسْتَطِيعُ السِّبَاحَةَ.	Ayya faṣlin tuḥibb? | Uḥibbu aṣ-ṣayf, faʾastaṭīʿu as-sibāḥa.
h3x060	这个问题你明白了吗？｜还没有，你再讲一遍吧。	Do you understand this problem? | Not yet, please explain it once more.	هَلْ فَهِمْتَ هٰذِهِ الْمَسْأَلَةَ؟ | لَا، اِشْرَحْهَا لِي مَرَّةً أُخْرَى.	Hal fahimta hādhihi al-masʾala? | Lā, ishraḥhā lī marratan ukhrā.
```
