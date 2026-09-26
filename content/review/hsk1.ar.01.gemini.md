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
p001	你好！	Hello!	مَرْحَبًا!	Marḥaban!
p002	你好吗？	How are you?	كَيْفَ حَالُكَ؟	Kayfa ḥāluk?
p003	喂！	Hey! / Hello!	يَا!	Yā!
p004	喂，你好！	Hey, hello!	يَا، مَرْحَبًا!	Yā, marḥaban!
p005	我在这儿！	I'm here!	أَنَا هُنَا!	Anā hunā!
p006	你在哪儿？	Where are you?	أَيْنَ أَنْتَ؟	Ayna anta?
p007	你去哪儿？	Where are you going?	إِلَى أَيْنَ تَذْهَبُ؟	Ilā ayna tadhhab?
p008	你回来了！	You're back!	لَقَدْ عُدْتَ!	Laqad ʿudt!
p009	你来了！	You came!	لَقَدْ جِئْتَ!	Laqad jiʾt!
p010	我很好，谢谢。你呢？	I'm fine, thanks. And you?	أَنَا بِخَيْرٍ، شُكْرًا. وَأَنْتَ؟	Anā bikhayr, shukran. Waʾant?
p011	你叫什么名字？	What's your name?	مَا اسْمُكَ؟	Mā ismuk?
p012	我认识你！	I know you!	أَنَا أَعْرِفُكَ!	Anā aʿrifuk!
p013	你是谁？	Who are you?	مَنْ أَنْتَ؟	Man anta?
p014	下午好！	Good afternoon!	طَابَ نَهَارُكَ!	Ṭāba nahāruk!
p015	你今天怎么样？	How are you today?	كَيْفَ حَالُكَ الْيَوْمَ؟	Kayfa ḥāluka al-yawm?
p016	你在做什么？	What are you doing?	مَاذَا تَفْعَلُ؟	Mādhā tafʿal?
p017	你在看什么？	What are you looking at?	إِلَى مَاذَا تَنْظُرُ؟	Ilā mādhā tanẓur?
p018	你是我的朋友。	You are my friend.	أَنْتَ صَدِيقِي.	Anta ṣadīqī.
p019	我们是朋友。	We are friends.	نَحْنُ أَصْدِقَاءُ.	Naḥnu aṣdiqāʾ.
p020	再见！	Goodbye!	إِلَى اللِّقَاءِ!	Ilā al-liqāʾ!
p021	明天见！	See you tomorrow!	إِلَى اللِّقَاءِ غَدًا!	Ilā al-liqāʾi ghadan!
p022	下午见！	See you this afternoon!	إِلَى اللِّقَاءِ بَعْدَ الظُّهْرِ!	Ilā al-liqāʾi baʿda aẓ-ẓuhr!
p023	我回家了。	I'm going home.	أَنَا ذَاهِبٌ إِلَى الْبَيْتِ.	Anā dhāhibun ilā al-bayt.
p024	我去睡觉了。	I'm going to sleep.	سَأَذْهَبُ لِلنَّوْمِ.	Saʾadhhabu li-n-nawm.
p025	我想吃东西。	I want to eat something.	أُرِيدُ أَنْ آكُلَ شَيْئًا.	Urīdu an ākula shayʾan.
p026	我想吃饭。	I want to eat.	أُرِيدُ أَنْ آكُلَ.	Urīdu an ākul.
p027	我想吃米饭。	I want to eat rice.	أُرِيدُ أَنْ آكُلَ أُرْزًا.	Urīdu an ākula urzan.
p028	我想吃苹果。	I want to eat an apple.	أُرِيدُ أَنْ آكُلَ تُفَّاحَةً.	Urīdu an ākula tuffāḥa.
p029	我想吃水果。	I want to eat fruit.	أُرِيدُ أَنْ آكُلَ فَاكِهَةً.	Urīdu an ākula fākiha.
p030	我没有吃饭。	I haven't eaten.	لَمْ آكُلْ.	Lam ākul.
p031	我今天没有吃饭。	I haven't eaten today.	لَمْ آكُلْ الْيَوْمَ.	Lam ākul al-yawm.
p032	什么时候吃饭？	When do we eat?	مَتَى نَأْكُلُ؟	Matā naʾkul?
p033	中午吃什么？	What's for lunch?	مَاذَا نَأْكُلُ فِي الظُّهْرِ؟	Mādhā naʾkulu fī aẓ-ẓuhr?
p034	你有苹果吗？	Do you have an apple?	هَلْ عِنْدَكَ تُفَّاحَةٌ؟	Hal ʿindaka tuffāḥa?
p035	你有米饭吗？	Do you have rice?	هَلْ عِنْدَكَ أُرْزٌ؟	Hal ʿindaka urz?
p036	我想喝水。	I want to drink water.	أُرِيدُ أَنْ أَشْرَبَ مَاءً.	Urīdu an ashraba māʾ.
p037	我想喝茶。	I want to drink tea.	أُرِيدُ أَنْ أَشْرَبَ شَايًا.	Urīdu an ashraba shāyan.
p038	我很想吃东西。	I really want to eat something.	أُرِيدُ كَثِيرًا أَنْ آكُلَ شَيْئًا.	Urīdu kathīran an ākula shayʾan.
p039	我想吃很多东西。	I want to eat lots of things.	أُرِيدُ أَنْ آكُلَ أَشْيَاءَ كَثِيرَةً.	Urīdu an ākula ashyāʾa kathīra.
p040	这个能吃吗？	Can this be eaten?	هَلْ يُؤْكَلُ هَٰذَا؟	Hal yuʾkalu hādhā?
p041	我能吃这个吗？	May I eat this?	هَلْ أَسْتَطِيعُ أَنْ آكُلَ هَٰذَا؟	Hal astaṭīʿu an ākula hādhā?
p042	你吃饭了吗？	Have you eaten?	هَلْ أَكَلْتَ؟	Hal akalt?
p043	我们去饭店吃饭。	We're going to a restaurant to eat.	نَذْهَبُ إِلَى الْمَطْعَمِ لِنَأْكُلَ.	Nadhhabu ilā al-maṭʿami linaʾkul.
p044	我想睡觉。	I want to sleep.	أُرِيدُ أَنْ أَنَامَ.	Urīdu an anām.
p045	我很想睡觉。	I really want to sleep.	أُرِيدُ كَثِيرًا أَنْ أَنَامَ.	Urīdu kathīran an anām.
p046	我不想工作。	I don't want to work.	لَا أُرِيدُ أَنْ أَعْمَلَ.	Lā urīdu an aʿmal.
p047	现在几点了？	What time is it now?	كَمِ السَّاعَةُ الْآنَ؟	Kami as-sāʿatu al-ʾān?
p048	我今天做了很多工作。	I worked a lot today.	عَمِلْتُ كَثِيرًا الْيَوْمَ.	ʿAmiltu kathīran al-yawm.
p049	我想回家睡觉。	I want to go home and sleep.	أُرِيدُ أَنْ أَعُودَ إِلَى الْبَيْتِ وَأَنَامَ.	Urīdu an aʿūda ilā al-bayti waʾanām.
p050	我不想读书。	I don't want to study.	لَا أُرِيدُ أَنْ أَدْرُسَ.	Lā urīdu an adrus.
p051	我想坐一下。	I want to sit for a bit.	أُرِيدُ أَنْ أَجْلِسَ قَلِيلًا.	Urīdu an ajlisa qalīlan.
p052	我睡觉了。	I'm going to bed.	سَأَنَامُ الْآنَ.	Saʾanāmu al-ʾān.
p053	现在几点？	What time is it?	كَمِ السَّاعَةُ الْآنَ؟	Kami as-sāʿatu al-ʾān?
p054	今天是星期几？	What day is it today?	أَيُّ يَوْمٍ هُوَ الْيَوْمَ؟	Ayyu yawmin huwa al-yawm?
p055	你好！我在这儿。	Hello! I'm here.	مَرْحَبًا! أَنَا هُنَا.	Marḥaban! Anā hunā.
p056	我很高兴！	I'm very happy!	أَنَا سَعِيدٌ جِدًّا!	Anā saʿīdun jiddan!
p057	太好了！	Great!	رَائِعٌ!	Rāʾiʿ!
p058	很好！	Very good!	جَيِّدٌ جِدًّا!	Jayyidun jiddan!
p059	我很好。	I'm fine.	أَنَا بِخَيْرٍ.	Anā bikhayr.
p060	我喜欢你。	I like you.	أُحِبُّكَ.	Uḥibbuk.
```
