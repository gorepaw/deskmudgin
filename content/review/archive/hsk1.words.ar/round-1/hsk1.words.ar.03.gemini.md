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
w121	小	small	صَغِيرٌ	Ṣaghīr
w122	小姐	miss	آنِسَةٌ	Ānisa
w123	些	some	بَعْضٌ	Baʿḍ
w124	写	to write	كَتَبَ	Katab
w125	谢谢	thanks	شُكْرًا	Shukran
w126	星期	week	أُسْبُوعٌ	Usbūʿ
w127	学生	student	طَالِبٌ	Ṭālib
w128	学习	to study	دَرَسَ	Daras
w129	学校	school	مَدْرَسَةٌ	Madrasa
w130	一	one	وَاحِدٌ	Wāḥid
w131	一点儿	a little	قَلِيلًا	Qalīlan
w132	衣服	clothes	مَلَابِسُ	Malābis
w133	医生	doctor	طَبِيبٌ	Ṭabīb
w134	医院	hospital	مُسْتَشْفَى	Mustashfā
w135	椅子	chair	كُرْسِيٌّ	Kursiyy
w136	有	to have	مَلَكَ	Malak
w137	月	month	شَهْرٌ	Shahr
w138	在	at; in	فِي	Fī
w139	再见	goodbye	إِلَى اللِّقَاءِ	Ilā al-liqāʾ
w140	怎么	how	كَيْفَ	Kayf
w141	怎么样	how about	كَيْفَ ذٰلِكَ	Kayfa dhālik
w142	这	this	هٰذَا	Hādhā
w143	中国	China	الصِّينُ	Aṣ-ṣīn
w144	中午	noon	ظُهْرٌ	Ẓuhr
w145	住	to live; to stay	سَكَنَ	Sakan
w146	桌子	table	طَاوِلَةٌ	Ṭāwila
w147	字	character; word	حَرْفٌ؛ كَلِمَةٌ	Ḥarf; kalima
w148	昨天	yesterday	أَمْسِ	Ams
w149	坐	to sit	جَلَسَ	Jalas
w150	做	to do; to make	فَعَلَ؛ صَنَعَ	Faʿal; ṣanaʿ
w151	这儿	here	هُنَا	Hunā
w152	那儿	there	هُنَاكَ	Hunāk
```
