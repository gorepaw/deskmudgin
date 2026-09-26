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
h3w243	需要	to need	احْتَاجَ	Iḥtāj
h3w244	选择	to choose	اخْتَارَ	Ikhtār
h3w245	要求	to demand; requirement	طَلَبَ؛ مُتَطَلَّبٌ	Ṭalab; mutaṭallab
h3w246	爷爷	grandfather (father's father)	جَدٌّ	Jadd
h3w247	一定	certainly	بِالتَّأْكِيدِ	Bi-t-taʾkīd
h3w248	一共	altogether	فِي الْمَجْمُوعِ	Fī al-majmūʿ
h3w249	一会儿	a moment	لَحْظَةٌ	Laḥẓa
h3w250	一样	the same	مُتَشَابِهٌ	Mutashābih
h3w251	一直	always; all along	طَوَالَ الْوَقْتِ؛ دَائِمًا	Ṭawāla al-waqt; dāʾiman
h3w252	以前	before; previously	قَبْلَ	Qabl
h3w253	一般	generally	عَادَةً	ʿĀda
h3w254	音乐	music	مُوسِيقَى	Mūsīqā
h3w255	银行	bank	بَنْكٌ	Bank
h3w256	饮料	drink; beverage	مَشْرُوبٌ	Mashrūb
h3w257	应该	should	يَنْبَغِي	Yanbaghī
h3w258	影响	to influence; influence	أَثَّرَ؛ تَأْثِيرٌ	Aththar; taʾthīr
h3w259	用	to use	اسْتَخْدَمَ	Istakhdam
h3w260	游戏	game	لُعْبَةٌ	Luʿba
h3w261	有名	famous	مَشْهُورٌ	Mashhūr
h3w262	又	again	مَرَّةً أُخْرَى	Marratan ukhrā
h3w263	遇到	to meet; to run into	قَابَلَ؛ صَادَفَ	Qābal; ṣādaf
h3w264	愿意	to be willing	رَغِبَ	Raghib
h3w265	月亮	moon	قَمَرٌ	Qamar
h3w266	越	the more…	كُلَّمَا	Kullamā
h3w267	站	station; to stand	مَحَطَّةٌ؛ وَقَفَ	Maḥaṭṭa; waqaf
h3w268	张	(measure word for flat things)	(كَلِمَةُ عَدٍّ لِلْأَشْيَاءِ الْمُسَطَّحَةِ)	(kalimatu ʿaddin li-l-ʾashyāʾi al-musaṭṭaḥa)
h3w269	着急	anxious	مُسْتَعْجِلٌ؛ قَلِقٌ	Mustaʿjil; qaliq
h3w270	照顾	to take care of	اعْتَنَى	Iʿtanā
h3w271	照片	photo	صُورَةٌ	Ṣūra
h3w272	照相机	camera	كَامِيرَا	Kāmīrā
h3w273	只	(measure word for animals)	(كَلِمَةُ عَدٍّ لِلْحَيَوَانَاتِ)	(kalimatu ʿaddin li-l-ḥayawānāt)
h3w274	只有	only; only if	فَقَطْ؛ إِلَّا إِذَا	Faqaṭ; illā idhā
h3w275	中间	middle	وَسَطٌ	Wasaṭ
h3w276	中文	the Chinese language	اللُّغَةُ الصِّينِيَّةُ	Al-lughatu aṣ-ṣīniyya
h3w277	终于	finally	أَخِيرًا	Akhīran
h3w278	种	kind; type	نَوْعٌ	Nawʿ
h3w279	重	heavy	ثَقِيلٌ	Thaqīl
h3w280	重要	important	مُهِمٌّ	Muhimm
h3w281	周末	weekend	عُطْلَةُ نِهَايَةِ الْأُسْبُوعِ	ʿUṭlatu nihāyati al-ʾusbūʿ
h3w282	主要	main	رَئِيسِيٌّ	Raʾīsiyy
h3w283	注意	to pay attention to	انْتَبَهَ	Intabah
h3w284	自己	oneself	نَفْسٌ	Nafs
h3w285	自行车	bicycle	دَرَّاجَةٌ	Darrāja
h3w286	总是	always	دَوْمًا	Dawman
h3w287	最后	finally; last	آخِرٌ؛ فِي النِّهَايَةِ	Ākhir; fī an-nihāya
h3w288	最近	recently	مُؤَخَّرًا	Muʾakhkharan
h3w289	作业	homework	وَاجِبٌ مَنْزِلِيٌّ	Wājibun manziliyy
h3w290	遍	(measure word for times)	(كَلِمَةُ عَدٍّ لِلْمَرَّاتِ)	(kalimatu ʿaddin li-l-marrāt)
h3w291	对面	opposite	مُقَابِلٌ	Muqābil
h3w292	礼物	gift	هَدِيَّةٌ	Hadiyya
h3w293	历史	history	تَارِيخٌ	Tārīkh
h3w294	附近	nearby	قَرِيبٌ	Qarīb
h3w295	骑	to ride (a bike or horse)	رَكِبَ	Rakib
h3w296	果汁	fruit juice	عَصِيرُ الْفَاكِهَةِ	ʿAṣīru al-fākiha
h3w297	一边	at the same time; on one side	فِي الْوَقْتِ نَفْسِهِ؛ جَانِبٌ	Fī al-waqti nafsih; jānib
h3w298	嘴	mouth	فَمٌ	Fam
h3w299	起来	(direction: up); to begin to	(أَدَاةُ اتِّجَاهٍ لِلْأَعْلَى)؛ بَدَأَ	(adātu ittijāhin li-l-ʾaʿlā); badaʾ
h3w300	难	difficult	صَعْبٌ	Ṣaʿb
```
