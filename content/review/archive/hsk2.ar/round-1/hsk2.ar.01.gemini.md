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
h2p001	我想吃面条。	I want to eat noodles.	أُرِيدُ أَنْ آكُلَ الْمَعْكَرُونَةَ.	Urīdu an ākula al-maʿkarūna.
h2p002	我想吃鸡蛋。	I want to eat eggs.	أُرِيدُ أَنْ آكُلَ الْبَيْضَ.	Urīdu an ākula al-bayḍ.
h2p003	我想喝牛奶。	I want to drink milk.	أُرِيدُ أَنْ أَشْرَبَ الْحَلِيبَ.	Urīdu an ashraba al-ḥalīb.
h2p004	你有西瓜吗？	Do you have any watermelon?	هَلْ عِنْدَكَ بِطِّيخٌ؟	Hal ʿindaka biṭṭīkh?
h2p005	我想吃羊肉。	I want to eat lamb.	أُرِيدُ أَنْ آكُلَ لَحْمَ الْغَنَمِ.	Urīdu an ākula laḥma al-ghanam.
h2p006	我要吃饭！	I want to eat!	أُرِيدُ أَنْ آكُلَ!	Urīdu an ākul!
h2p007	我们什么时候吃饭？还要等吗？	When do we eat? Do we still have to wait?	مَتَى نَأْكُلُ؟ هَلْ عَلَيْنَا أَنْ نَنْتَظِرَ أَيْضًا؟	Matā naʾkul? Hal ʿalaynā an nantaẓira ayḍan?
h2p008	有没有好吃的？	Is there anything tasty?	هَلْ يُوجَدُ شَيْءٌ لَذِيذٌ؟	Hal yūjadu shayʾun ladhīdh?
h2p009	给我一点儿吃的吧。	Give me a little something to eat.	أَعْطِنِي قَلِيلًا مِنَ الطَّعَامِ.	Aʿṭinī qalīlan mina aṭ-ṭaʿām.
h2p010	这儿有鱼吗？	Is there any fish here?	هَلْ هُنَا سَمَكٌ؟	Hal hunā samak?
h2p011	我已经一天没吃东西了。	I haven't eaten anything all day.	لَمْ آكُلْ شَيْئًا مُنْذُ يَوْمٍ كَامِلٍ.	Lam ākul shayʾan mundhu yawmin kāmil.
h2p012	快给我吃的！	Quick, give me something to eat!	أَعْطِنِي الطَّعَامَ بِسُرْعَةٍ!	Aʿṭinī aṭ-ṭaʿāma bisurʿa!
h2p013	我可以吃这个吗？	Can I eat this?	هَلْ يُمْكِنُنِي أَنْ آكُلَ هٰذَا؟	Hal yumkinunī an ākula hādhā?
h2p014	还有牛奶吗？	Is there any milk left?	هَلْ بَقِيَ حَلِيبٌ؟	Hal baqiya ḥalīb?
h2p015	饭准备好了吗？	Is the food ready?	هَلِ الطَّعَامُ جَاهِزٌ؟	Hali aṭ-ṭaʿāmu jāhiz?
h2p016	我想吃苹果和西瓜。	I want to eat apples and watermelon.	أُرِيدُ أَنْ آكُلَ التُّفَّاحَ وَالْبِطِّيخَ.	Urīdu an ākula at-tuffāḥa wa-l-biṭṭīkh.
h2p017	我最喜欢吃鱼。	I like eating fish the most.	أُحِبُّ أَكْلَ السَّمَكِ أَكْثَرَ مِنْ أَيِّ شَيْءٍ آخَرَ.	Uḥibbu akla as-samaki akthara min ayyi shayʾin ākhar.
h2p018	我要喝咖啡。	I want coffee.	أُرِيدُ أَنْ أَشْرَبَ الْقَهْوَةَ.	Urīdu an ashraba al-qahwa.
h2p019	我等了很长时间了。	I've been waiting a long time.	اِنْتَظَرْتُ وَقْتًا طَوِيلًا.	Intaẓartu waqtan ṭawīlan.
h2p020	中午我们吃面条吧。	Let's have noodles for lunch.	لِنَأْكُلِ الْمَعْكَرُونَةَ ظُهْرًا.	Linaʾkuli al-maʿkarūnata ẓuhran.
h2p021	您好！	Hello! (polite)	مَرْحَبًا!	Marḥaban!
h2p022	欢迎！	Welcome!	أَهْلًا وَسَهْلًا!	Ahlan wasahlan!
h2p023	欢迎你来！	Glad you came!	أَهْلًا بِمَجِيئِكَ!	Ahlan bimajīʾik!
h2p024	欢迎回来！	Welcome back!	أَهْلًا بِعَوْدَتِكَ!	Ahlan biʿawdatik!
h2p025	早上好！	Good morning!	صَبَاحَ الْخَيْرِ!	Ṣabāḥa al-khayr!
h2p026	晚上好！	Good evening!	مَسَاءَ الْخَيْرِ!	Masāʾa al-khayr!
h2p027	你身体好吗？	How is your health?	كَيْفَ صِحَّتُكَ؟	Kayfa ṣiḥḥatuk?
h2p028	你最近怎么样？	How have you been lately?	كَيْفَ حَالُكَ مُؤَخَّرًا؟	Kayfa ḥāluka muʾakhkharan?
h2p029	大家好！	Hello, everyone!	مَرْحَبًا بِالْجَمِيعِ!	Marḥaban bi-l-jamīʿ!
h2p030	你也在这儿！	You're here too!	أَنْتَ هُنَا أَيْضًا!	Anta hunā ayḍan!
h2p031	你今天忙吗？	Are you busy today?	هَلْ أَنْتَ مَشْغُولٌ الْيَوْمَ؟	Hal anta mashghūlun al-yawm?
h2p032	您贵姓？	What is your surname? (polite)	مَا اسْمُ عَائِلَتِكَ الْكَرِيمُ؟	Mā ismu ʿāʾilatika al-karīm?
h2p033	你睡得好吗？	Did you sleep well?	هَلْ نِمْتَ جَيِّدًا؟	Hal nimta jayyidan?
h2p034	你还在吗？	Are you still there?	هَلْ مَا زِلْتَ هُنَاكَ؟	Hal mā zilta hunāk?
h2p035	我到了！	I've arrived!	لَقَدْ وَصَلْتُ!	Laqad waṣalt!
h2p036	这个真好吃！	This is really tasty!	هٰذَا لَذِيذٌ حَقًّا!	Hādhā ladhīdhun ḥaqqan!
h2p037	这个没有鱼好吃。	This isn't as tasty as fish.	هٰذَا لَيْسَ لَذِيذًا كَالسَّمَكِ.	Hādhā laysa ladhīdhan ka-s-samak.
h2p038	我吃完了！	I've finished eating!	لَقَدِ انْتَهَيْتُ مِنَ الْأَكْلِ!	Laqadi intahaytu mina al-ʾakl!
h2p039	我还要吃。	I want to eat more.	أُرِيدُ أَنْ آكُلَ أَكْثَرَ.	Urīdu an ākula akthar.
h2p040	真好吃！	So tasty!	لَذِيذٌ جِدًّا!	Ladhīdhun jiddan!
h2p041	我正在吃东西呢。	I'm eating right now.	أَنَا آكُلُ الْآنَ.	Anā ākulu al-ʾān.
h2p042	别看我，我在吃。	Don't look at me, I'm eating.	لَا تَنْظُرْ إِلَيَّ، أَنَا آكُلُ.	Lā tanẓur ilayy, anā ākul.
h2p043	这个比苹果好吃。	This is tastier than apples.	هٰذَا أَلَذُّ مِنَ التُّفَّاحِ.	Hādhā aladhdhu mina at-tuffāḥ.
h2p044	我吃了两个。	I ate two.	أَكَلْتُ اثْنَيْنِ.	Akaltu ithnayn.
h2p045	别吃那个！	Don't eat that!	لَا تَأْكُلْ ذٰلِكَ!	Lā taʾkul dhālik!
h2p046	我累了。	I'm tired.	أَنَا تَعِبٌ.	Anā taʿib.
h2p047	我太累了。	I'm too tired.	أَنَا تَعِبٌ جِدًّا.	Anā taʿibun jiddan.
h2p048	我想休息一下。	I want to rest for a bit.	أُرِيدُ أَنْ أَسْتَرِيحَ قَلِيلًا.	Urīdu an astarīḥa qalīlan.
h2p049	我要去睡觉了。	I'm going to bed.	سَأَذْهَبُ لِلنَّوْمِ.	Saʾadhhabu li-n-nawm.
h2p050	我已经很累了。	I'm already very tired.	أَنَا تَعِبٌ جِدًّا بِالْفِعْلِ.	Anā taʿibun jiddan bi-l-fiʿl.
h2p051	我今天想早点儿休息。	I want to rest early today.	أُرِيدُ أَنْ أَسْتَرِيحَ مُبَكِّرًا الْيَوْمَ.	Urīdu an astarīḥa mubakkiran al-yawm.
h2p052	让我休息一下吧。	Let me rest for a bit.	دَعْنِي أَسْتَرِحْ قَلِيلًا.	Daʿnī astariḥ qalīlan.
h2p053	我今天非常累。	I'm extremely tired today.	أَنَا تَعِبٌ جِدًّا الْيَوْمَ.	Anā taʿibun jiddan al-yawm.
h2p054	我不想起床。	I don't want to get up.	لَا أُرِيدُ أَنْ أَقُومَ.	Lā urīdu an aqūm.
h2p055	别说话，我想睡觉。	Don't talk, I want to sleep.	لَا تَتَكَلَّمْ، أُرِيدُ أَنْ أَنَامَ.	Lā tatakallam, urīdu an anām.
h2p056	我走不动了。	I can't walk any further.	لَا أَسْتَطِيعُ الْمَشْيَ أَكْثَرَ.	Lā astaṭīʿu al-mashya akthar.
h2p057	我们休息一下吧。	Let's take a break.	لِنَسْتَرِحْ قَلِيلًا.	Linastariḥ qalīlan.
h2p058	我很快乐！	I'm very happy!	أَنَا سَعِيدٌ جِدًّا!	Anā saʿīdun jiddan!
h2p059	今天真好！	Today is really great!	الْيَوْمُ رَائِعٌ حَقًّا!	Al-yawmu rāʾiʿun ḥaqqan!
h2p060	我非常高兴！	I'm extremely happy!	أَنَا مَسْرُورٌ جِدًّا!	Anā masrūrun jiddan!
```
