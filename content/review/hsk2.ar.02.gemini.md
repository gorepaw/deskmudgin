These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is **sentences** a creature says on its own. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.

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
h2p061	我最喜欢你了！	I like you the most!	أُحِبُّكَ أَكْثَرَ مِنْ أَيِّ أَحَدٍ آخَرَ!	Uḥibbuka akthara min ayyi aḥadin ākhar!
h2p062	你真好！	You're really nice!	أَنْتَ لَطِيفٌ حَقًّا!	Anta laṭīfun ḥaqqan!
h2p063	我觉得很好。	I feel great.	أَشْعُرُ بِخَيْرٍ.	Ashʿuru bikhayr.
h2p064	我想唱歌！	I want to sing!	أُرِيدُ أَنْ أُغَنِّيَ!	Urīdu an ughanniy!
h2p065	我们一起跳舞吧！	Let's dance together!	لِنَرْقُصْ مَعًا!	Linarquṣ maʿan!
h2p066	你看，我在笑！	Look, I'm smiling!	اُنْظُرْ، أَنَا أَضْحَكُ!	Unẓur, anā aḍḥak!
h2p067	我每天都很快乐。	I'm happy every day.	أَنَا سَعِيدٌ كُلَّ يَوْمٍ.	Anā saʿīdun kulla yawm.
h2p068	生日快乐！	Happy birthday!	عِيدَ مِيلَادٍ سَعِيدًا!	ʿĪda mīlādin saʿīdan!
h2p069	大家都去哪儿了？	Where did everyone go?	أَيْنَ ذَهَبَ الْجَمِيعُ؟	Ayna dhahaba al-jamīʿ?
h2p070	没有人和我玩。	Nobody plays with me.	لَا أَحَدَ يَلْعَبُ مَعِي.	Lā aḥada yalʿabu maʿī.
h2p071	谁来和我玩？	Who will come and play with me?	مَنْ سَيَأْتِي لِيَلْعَبَ مَعِي؟	Man sayaʾtī liyalʿaba maʿī?
h2p072	我等你很长时间了。	I've been waiting for you for a long time.	اِنْتَظَرْتُكَ وَقْتًا طَوِيلًا.	Intaẓartuka waqtan ṭawīlan.
h2p073	你什么时候回来？我等你。	When are you coming back? I'll wait for you.	مَتَى سَتَعُودُ؟ سَأَنْتَظِرُكَ.	Matā sataʿūd? Saʾantaẓiruk.
h2p074	我一个人，真没意思。	On my own, it's really boring.	أَنَا وَحْدِي، وَهٰذَا مُمِلٌّ حَقًّا.	Anā waḥdī, wahādhā mumillun ḥaqqan.
h2p075	你们都很忙吗？	Are you all busy?	هَلْ أَنْتُمْ مَشْغُولُونَ جَمِيعًا؟	Hal antum mashghūlūna jamīʿan?
h2p076	我想和大家一起玩。	I want to play with everyone.	أُرِيدُ أَنْ أَلْعَبَ مَعَ الْجَمِيعِ.	Urīdu an alʿaba maʿa al-jamīʿ.
h2p077	我想坐你旁边。	I want to sit next to you.	أُرِيدُ أَنْ أَجْلِسَ بِجَانِبِكَ.	Urīdu an ajlisa bijānibik.
h2p078	别这样！	Don't do that!	لَا تَفْعَلْ هَكَذَا!	Lā tafʿal hakadhā!
h2p079	你要做什么？	What are you going to do?	مَاذَا سَتَفْعَلُ؟	Mādhā satafʿal?
h2p080	我们要去哪儿？	Where are we going?	إِلَى أَيْنَ سَنَذْهَبُ؟	Ilā ayna sanadhhab?
h2p081	太高了！	Too high!	مُرْتَفِعٌ جِدًّا!	Murtafiʿun jiddan!
h2p082	让我下去！	Let me down!	أَنْزِلْنِي!	Anzilnī!
h2p083	快让我下来！	Quick, let me down!	أَنْزِلْنِي بِسُرْعَةٍ!	Anzilnī bisurʿa!
h2p084	我不要！	I don't want to!	لَا أُرِيدُ!	Lā urīd!
h2p085	慢一点儿！	Slow down!	أَبْطِئْ قَلِيلًا!	Abṭiʾ qalīlan!
h2p086	你为什么这样做？	Why did you do that?	لِمَاذَا فَعَلْتَ هَكَذَا؟	Limādhā faʿalta hakadhā?
h2p087	别再这样了！	Don't do that again!	لَا تَفْعَلْ هَكَذَا مَرَّةً أُخْرَى!	Lā tafʿal hakadhā marratan ukhrā!
h2p088	这不对！	That's not right!	هٰذَا غَيْرُ صَحِيحٍ!	Hādhā ghayru ṣaḥīḥ!
h2p089	你做错了。	You did it wrong.	أَخْطَأْتَ.	Akhṭaʾt.
h2p090	谢谢您！	Thank you! (polite)	شُكْرًا جَزِيلًا!	Shukran jazīlan!
h2p091	真好吃，谢谢！	Really tasty, thanks!	لَذِيذٌ حَقًّا، شُكْرًا!	Ladhīdhun ḥaqqan, shukran!
h2p092	我最喜欢吃这个。	This is my favourite thing to eat.	هٰذَا هُوَ أَكْثَرُ مَا أُحِبُّ أَكْلَهُ.	Hādhā huwa aktharu mā uḥibbu aklah.
h2p093	我还想吃！	I want more!	أُرِيدُ الْمَزِيدَ!	Urīdu al-mazīd!
h2p094	我吃得很好。	I ate well.	أَكَلْتُ جَيِّدًا.	Akaltu jayyidan.
h2p095	你给我的菜很好吃。	The food you gave me is very tasty.	الطَّعَامُ اَلَّذِي أَعْطَيْتَنِيهُ لَذِيذٌ جِدًّا.	Aṭ-ṭaʿāmu alladhī aʿṭaytanīhu ladhīdhun jiddan.
h2p096	再来一次！	Once more!	مَرَّةً أُخْرَى!	Marratan ukhrā!
h2p097	别走！	Don't go!	لَا تَذْهَبْ!	Lā tadhhab!
h2p098	我最喜欢这样了。	I like this the most.	أُحِبُّ هٰذَا أَكْثَرَ مِنْ أَيِّ شَيْءٍ.	Uḥibbu hādhā akthara min ayyi shayʾ.
h2p099	你可以再来一次吗？	Can you do it once more?	هَلْ يُمْكِنُكَ أَنْ تَفْعَلَهَا مَرَّةً أُخْرَى؟	Hal yumkinuka an tafʿalahā marratan ukhrā?
h2p100	真好！	That's really nice!	جَمِيلٌ جِدًّا!	Jamīlun jiddan!
h2p101	你对我真好。	You're really good to me.	أَنْتَ لَطِيفٌ جِدًّا مَعِي.	Anta laṭīfun jiddan maʿī.
h2p102	我要走了。	I'm going to go.	سَأَذْهَبُ الْآنَ.	Saʾadhhabu al-ʾān.
h2p103	晚上见！	See you tonight!	أَرَاكَ مَسَاءً!	Arāka masāʾ!
h2p104	我先走了，再见！	I'll go first, bye!	سَأَذْهَبُ أَوَّلًا، إِلَى اللِّقَاءِ!	Saʾadhhabu awwalan, ilā al-liqāʾ!
h2p105	慢走！	Take care! (to someone leaving)	مَعَ السَّلَامَةِ!	Maʿa as-salāma!
h2p106	您慢走。	Take care. (polite, to someone leaving)	مَعَ السَّلَامَةِ، اِعْتَنِ بِنَفْسِكَ.	Maʿa as-salāma, iʿtani binafsik.
h2p107	明天早上见。	See you tomorrow morning.	أَرَاكَ صَبَاحَ غَدٍ.	Arāka ṣabāḥa ghad.
h2p108	我起床了！	I'm up!	لَقَدِ اسْتَيْقَظْتُ!	Laqadi istayqaẓt!
h2p109	现在几点了？我睡了多长时间？	What time is it? How long did I sleep?	كَمِ السَّاعَةُ الْآنَ؟ كَمْ نِمْتُ مِنَ الْوَقْتِ؟	Kami as-sāʿatu al-ʾān? Kam nimtu mina al-waqt?
h2p110	我还想睡。	I still want to sleep.	مَا زِلْتُ أُرِيدُ أَنْ أَنَامَ.	Mā ziltu urīdu an anām.
h2p111	我睡得很好。	I slept well.	نِمْتُ جَيِّدًا.	Nimtu jayyidan.
h2p112	已经晚上了吗？	Is it already evening?	هَلْ حَلَّ الْمَسَاءُ بِالْفِعْلِ؟	Hal ḥalla al-masāʾu bi-l-fiʿl?
h2p113	我睡了十个小时。	I slept for ten hours.	نِمْتُ عَشْرَ سَاعَاتٍ.	Nimtu ʿashra sāʿāt.
h2p114	今天是晴天。	It's sunny today.	الْجَوُّ الْيَوْمَ مُشْمِسٌ.	Al-jawwu al-yawma mushmis.
h2p115	今天是阴天。	It's overcast today.	الْجَوُّ الْيَوْمَ غَائِمٌ.	Al-jawwu al-yawma ghāʾim.
h2p116	外面下雪了！	It's snowing outside!	الثَّلْجُ يَتَسَاقَطُ فِي الْخَارِجِ!	Ath-thalju yatasāqaṭu fī al-khārij!
h2p117	明天可能下雨。	It might rain tomorrow.	رُبَّمَا تُمْطِرُ غَدًا.	Rubbamā tumṭiru ghadan.
h2p118	今天比昨天冷。	Today is colder than yesterday.	الْيَوْمُ أَبْرَدُ مِنَ الْأَمْسِ.	Al-yawmu abradu mina al-ʾams.
h2p119	今天天气非常好。	The weather is extremely good today.	الطَّقْسُ الْيَوْمَ جَمِيلٌ جِدًّا.	Aṭ-ṭaqsu al-yawma jamīlun jiddan.
h2p120	下雪了，我们出去玩吧！	It's snowing, let's go out and play!	الثَّلْجُ يَتَسَاقَطُ، لِنَخْرُجْ لِلَّعِبِ!	Ath-thalju yatasāqaṭ, linakhruj lillaʿib!
```
