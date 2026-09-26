These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is single **words** from the HSK Chinese vocabulary list. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.
5. For a word: the dictionary sense a learner needs: verbs in the past-tense citation form (كَتَبَ) or the masdar where the Chinese is a noun-like verb, "(أَدَاةٌ …)" for particles.

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
h2w121	雪	snow	ثَلْجٌ	Thalj
h2w122	颜色	colour	لَوْنٌ	Lawn
h2w123	眼睛	eye	عَيْنٌ	ʿAyn
h2w124	羊肉	mutton; lamb	لَحْمُ غَنَمٍ	Laḥmu ghanam
h2w125	药	medicine	دَوَاءٌ	Dawāʾ
h2w126	要	to want; will	أَرَادَ؛ (أَدَاةُ الْمُسْتَقْبَلِ: سَوْفَ)	Arād; (adātu al-mustaqbal: sawf)
h2w127	也	also; too	أَيْضًا	Ayḍan
h2w128	一起	together	مَعًا	Maʿan
h2w129	一下	(a quick) once; a bit	(كَلِمَةٌ بِمَعْنَى قَلِيلًا أَوْ فِعْلًا سَرِيعًا)	(kalimatun bimaʿnā qalīlan aw fiʿlan sarīʿan)
h2w130	已经	already	بِالْفِعْلِ	Bi-l-fiʿl
h2w131	意思	meaning	مَعْنًى	Maʿnā
h2w132	因为…所以	because… (so)	لِأَنَّ … لِذَٰلِكَ	Liʾann … lidhālik
h2w133	阴	cloudy; overcast	غَائِمٌ	Ghāʾim
h2w134	游泳	to swim	سَبَحَ	Sabaḥ
h2w135	右边	right side	الْيَمِينُ	Al-yamīn
h2w136	鱼	fish	سَمَكَةٌ	Samaka
h2w137	远	far	بَعِيدٌ	Baʿīd
h2w138	运动	sport; to exercise	رِيَاضَةٌ؛ مَارَسَ الرِّيَاضَةَ	Riyāḍa; mārasa ar-riyāḍa
h2w139	再	again	مُجَدَّدًا	Mujaddadan
h2w140	早上	morning	صَبَاحٌ	Ṣabāḥ
h2w141	丈夫	husband	زَوْجٌ	Zawj
h2w142	找	to look for	بَحَثَ	Baḥath
h2w143	着	(particle for a continuing state)	(أَدَاةٌ تُفِيدُ اسْتِمْرَارَ الْحَالَةِ)	(adātun tufīdu istimrāra al-ḥāla)
h2w144	真	really; truly	حَقًّا	Ḥaqqan
h2w145	正在	in the middle of (doing)	(أَدَاةُ الْحَاضِرِ الْمُسْتَمِرِّ)	(adātu al-ḥāḍiri al-mustamirr)
h2w146	知道	to know	عَرَفَ	ʿAraf
h2w147	准备	to prepare	أَعَدَّ	Aʿadd
h2w148	走	to walk; to leave	مَشَى؛ غَادَرَ	Mashā; ghādar
h2w149	最	most	(أَدَاةُ التَّفْضِيلِ)	(adātu at-tafḍīl)
h2w150	左边	left side	الْيَسَارُ	Al-yasār
```
