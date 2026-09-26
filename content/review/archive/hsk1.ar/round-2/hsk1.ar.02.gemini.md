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
p061	我爱你。	I love you.	أُحِبُّكَ جِدًّا.	Uḥibbuka jiddan.
p062	我喜欢这儿。	I like it here.	أُحِبُّ هَٰذَا الْمَكَانَ.	Uḥibbu hādhā al-makān.
p063	今天我很高兴。	I'm happy today.	أَنَا سَعِيدٌ الْيَوْمَ.	Anā saʿīdun al-yawm.
p064	我们都很高兴。	We're all happy.	نَحْنُ جَمِيعًا سُعَدَاءُ.	Naḥnu jamīʿan suʿadāʾ.
p065	谢谢你！	Thank you!	شُكْرًا لَكَ!	Shukran lak!
p066	谢谢！	Thanks!	شُكْرًا!	Shukran!
p067	我喜欢这个。	I like this.	أُحِبُّ هَٰذَا.	Uḥibbu hādhā.
p068	你很好。	You're very nice.	أَنْتَ لَطِيفٌ جِدًّا.	Anta laṭīfun jiddan.
p069	你是我的朋友！	You're my friend!	أَنْتَ صَدِيقِي!	Anta ṣadīqī!
p070	我爱你！	I love you!	أُحِبُّكَ!	Uḥibbuk!
p071	好吃！	Tasty!	لَذِيذٌ!	Ladhīdh!
p072	很好吃！	Very tasty!	لَذِيذٌ جِدًّا!	Ladhīdhun jiddan!
p073	太好吃了！	So tasty!	مَا أَلَذَّهُ!	Mā aladhdhah!
p074	谢谢，很好吃！	Thanks, it's very tasty!	شُكْرًا، إِنَّهُ لَذِيذٌ جِدًّا!	Shukran, innahu ladhīdhun jiddan!
p075	我喜欢吃这个。	I like eating this.	أُحِبُّ أَكْلَ هَٰذَا.	Uḥibbu akla hādhā.
p076	我吃了很多。	I ate a lot.	أَكَلْتُ كَثِيرًا.	Akaltu kathīran.
p077	这是什么？很好吃！	What is this? It's very tasty!	مَا هَٰذَا؟ إِنَّهُ لَذِيذٌ جِدًّا!	Mā hādhā? Innahu ladhīdhun jiddan!
p079	不！	No!	لَا!	Lā!
p080	不，不，不！	No, no, no!	لَا، لَا، لَا!	Lā, lā, lā!
p081	你想做什么？	What do you want to do?	مَاذَا تُرِيدُ أَنْ تَفْعَلَ؟	Mādhā turīdu an tafʿal?
p082	我不喜欢这个！	I don't like this!	لَا أُحِبُّ هَٰذَا!	Lā uḥibbu hādhā!
p083	我在哪儿？	Where am I?	أَيْنَ أَنَا؟	Ayna anā?
p084	我们去哪儿？	Where are we going?	إِلَى أَيْنَ نَذْهَبُ؟	Ilā ayna nadhhab?
p085	对不起！	Sorry!	آسِفٌ!	Āsif!
p086	没关系。	It's okay.	لَا بَأْسَ.	Lā baʾs.
p087	不好！	Not good!	سَيِّئٌ!	Sayyiʾ!
p088	我不喜欢这个。	I don't like this.	لَا أُحِبُّ هَٰذَا.	Lā uḥibbu hādhā.
p089	这是什么？	What is this?	مَا هَٰذَا؟	Mā hādhā?
p090	这个是什么东西？	What is this thing?	مَا هَٰذَا الشَّيْءُ؟	Mā hādhā ash-shayʾ?
p091	我想吃这个。	I want to eat this.	أُرِيدُ أَنْ آكُلَ هَٰذَا.	Urīdu an ākula hādhā.
p092	这个很好吃。	This is very tasty.	هَٰذَا لَذِيذٌ جِدًّا.	Hādhā ladhīdhun jiddan.
p093	这个不好吃。	This isn't tasty.	هَٰذَا لَيْسَ لَذِيذًا.	Hādhā laysa ladhīdhan.
p094	这是我的！	This is mine!	هَٰذَا لِي!	Hādhā lī!
p095	那是什么？	What is that?	مَا ذَٰلِكَ؟	Mā dhālik?
p096	这个电脑很好吃。	This computer is very tasty.	هَٰذَا الْحَاسُوبُ لَذِيذٌ جِدًّا.	Hādhā al-ḥāsūbu ladhīdhun jiddan.
p097	我在吃东西。	I'm eating.	أَنَا آكُلُ شَيْئًا.	Anā ākulu shayʾan.
p098	这个字怎么读？	How do you read this character?	كَيْفَ يُقْرَأُ هَٰذَا الْحَرْفُ؟	Kayfa yuqraʾu hādhā al-ḥarf?
p099	你好？	Hello?	مَرْحَبًا؟	Marḥaban?
p100	喂？	Hello?	يَا؟	Yā?
p101	谁在那儿？	Who's there?	مَنْ هُنَاكَ؟	Man hunāk?
p102	我想你。	I miss you.	أَشْتَاقُ إِلَيْكَ.	Ashtāqu ilayk.
p103	你什么时候回来？	When are you coming back?	مَتَى تَعُودُ؟	Matā taʿūd?
p104	我没有朋友。	I have no friends.	لَيْسَ لِي أَصْدِقَاءُ.	Laysa lī aṣdiqāʾ.
p105	我想看看你。	I want to see you.	أُرِيدُ أَنْ أَرَاكَ.	Urīdu an arāk.
p106	你去哪儿了？	Where did you go?	إِلَى أَيْنَ ذَهَبْتَ؟	Ilā ayna dhahabt?
p107	今天很热。	It's hot today.	الْجَوُّ حَارٌّ الْيَوْمَ.	Al-jawwu ḥārrun al-yawm.
p108	今天很冷。	It's cold today.	الْجَوُّ بَارِدٌ الْيَوْمَ.	Al-jawwu bāridun al-yawm.
p109	今天天气很好。	The weather is nice today.	الطَّقْسُ جَمِيلٌ الْيَوْمَ.	Aṭ-ṭaqsu jamīlun al-yawm.
p110	今天天气怎么样？	How's the weather today?	كَيْفَ الطَّقْسُ الْيَوْمَ؟	Kayfa aṭ-ṭaqsu al-yawm?
p111	明天会下雨吗？	Will it rain tomorrow?	هَلْ سَتُمْطِرُ غَدًا؟	Hal satumṭiru ghadan?
p112	下雨了。	It's raining.	إِنَّهَا تُمْطِرُ الْآنَ.	Innahā tumṭiru al-ʾān.
p113	我喜欢下雨。	I like rain.	أُحِبُّ الْمَطَرَ.	Uḥibbu al-maṭar.
p114	昨天下雨了。	It rained yesterday.	أَمْطَرَتْ أَمْسِ.	Amṭarat ams.
p115	今天是几号？	What's the date today?	مَا التَّارِيخُ الْيَوْمَ؟	Mā at-tārīkhu al-yawm?
p116	今天几月几号？	What's today's date?	مَا تَارِيخُ الْيَوْمِ؟	Mā tārīkhu al-yawm?
p117	现在三点。	It's three o'clock.	السَّاعَةُ الْآنَ الثَّالِثَةُ.	As-sāʿatu al-ʾāna ath-thālitha.
p118	现在十点了。	It's ten o'clock already.	السَّاعَةُ الْآنَ الْعَاشِرَةُ.	As-sāʿatu al-ʾāna al-ʿāshira.
p119	你几岁？	How old are you?	كَمْ عُمْرُكَ؟	Kam ʿumruk?
p120	你多大？	How old are you?	كَمْ سِنُّكَ؟	Kam sinnuk?
p121	我八岁。	I'm eight years old.	عُمْرِي ثَمَانِي سَنَوَاتٍ.	ʿUmrī thamānī sanawāt.
```
