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
h3w062	锻炼	to exercise	مَارَسَ الرِّيَاضَةَ	Mārasa ar-riyāḍa
h3w063	多么	how (in exclamations)	(أَدَاةُ التَّعَجُّبِ)	(adātu at-taʿajjub)
h3w064	饿	hungry	جَائِعٌ	Jāʾiʿ
h3w065	而	and yet; but	لٰكِنْ؛ بَيْنَمَا	Lākin; baynamā
h3w066	耳朵	ear	أُذُنٌ	Udhun
h3w067	发	to send	أَرْسَلَ	Arsal
h3w068	发烧	to have a fever	أُصِيبَ بِالْحُمَّى	Uṣība bi-l-ḥummā
h3w069	发现	to discover	اكْتَشَفَ	Iktashaf
h3w070	方便	convenient	مُنَاسِبٌ؛ سَهْلٌ	Munāsib; sahl
h3w071	放	to put	وَضَعَ	Waḍaʿ
h3w072	放心	to rest assured	اطْمَأَنَّ	Iṭmaʾann
h3w073	分	to divide; minute	قَسَمَ؛ دَقِيقَةٌ	Qasam; daqīqa
h3w074	复习	to review	رَاجَعَ	Rājaʿ
h3w075	干净	clean	نَظِيفٌ	Naẓīf
h3w076	感冒	a cold; to catch a cold	زُكَامٌ؛ أُصِيبَ بِالزُّكَامِ	Zukām; uṣība bi-z-zukām
h3w077	感兴趣	to be interested	مُهْتَمٌّ	Muhtamm
h3w078	刚才	just now	قَبْلَ قَلِيلٍ	Qabla qalīl
h3w079	根据	according to	حَسَبَ	Ḥasab
h3w080	跟	with; to follow	مَعَ؛ تَبِعَ	Maʿ; tabiʿ
h3w081	更	even more	أَكْثَرُ؛ أَشَدُّ	Akthar; ashadd
h3w082	公园	park	حَدِيقَةٌ	Ḥadīqa
h3w083	故事	story	قِصَّةٌ	Qiṣṣa
h3w084	刮风	to be windy	هَبَّتِ الرِّيحُ	Habbati ar-rīḥ
h3w085	关	to close; to turn off	أَغْلَقَ؛ أَطْفَأَ	Aghlaq; aṭfaʾ
h3w086	关系	relationship	عَلَاقَةٌ	ʿAlāqa
h3w087	关心	to care about	اهْتَمَّ	Ihtamm
h3w088	关于	about	حَوْلَ؛ بِشَأْنِ	Ḥawl; bishaʾn
h3w089	国家	country	دَوْلَةٌ؛ بَلَدٌ	Dawla; balad
h3w090	过去	the past; to go over	الْمَاضِي؛ مَرَّ	Al-māḍī; marr
h3w091	还是	or; still	أَمْ؛ مَا زَالَ	Am; mā zāl
h3w092	害怕	to be afraid	خَافَ	Khāf
h3w093	黑板	blackboard	سَبُّورَةٌ	Sabbūra
h3w094	后来	afterwards	فِيمَا بَعْدُ	Fīmā baʿd
h3w095	护照	passport	جَوَازُ سَفَرٍ	Jawāzu safar
h3w096	花	flower; to spend	زَهْرَةٌ؛ أَنْفَقَ	Zahra; anfaq
h3w097	画	to draw; painting	رَسَمَ؛ لَوْحَةٌ	Rasam; lawḥa
h3w098	坏	bad; broken	سَيِّئٌ؛ مُعَطَّلٌ	Sayyiʾ; muʿaṭṭal
h3w099	环境	environment	بِيئَةٌ	Bīʾa
h3w100	换	to change	غَيَّرَ	Ghayyar
h3w101	黄河	the Yellow River	النَّهْرُ الْأَصْفَرُ	An-nahru al-ʾaṣfar
h3w102	会议	meeting	اجْتِمَاعٌ	Ijtimāʿ
h3w103	或者	or	أَوْ	Aw
h3w104	几乎	almost	تَقْرِيبًا	Taqrīban
h3w105	机会	opportunity	فُرْصَةٌ	Furṣa
h3w106	极	extremely	لِلْغَايَةِ؛ جِدًّا	Li-l-ghāya; jiddan
h3w107	记得	to remember	تَذَكَّرَ	Tadhakkar
h3w108	季节	season	فَصْلٌ؛ مَوْسِمٌ	Faṣl; mawsim
h3w109	检查	to check	فَحَصَ	Faḥaṣ
h3w110	简单	simple	بَسِيطٌ	Basīṭ
h3w111	健康	healthy	سَلِيمٌ	Salīm
h3w112	见面	to meet	اِلْتَقَى	Iltaqā
h3w113	讲	to speak; to tell	تَحَدَّثَ؛ رَوَى	Taḥaddath; rawā
h3w114	教	to teach	عَلَّمَ	ʿAllam
h3w115	角	corner; (a tenth of a yuan)	زَاوِيَةٌ؛ عُشْرُ يُوَانٍ	Zāwiya; ʿushru yuwān
h3w116	脚	foot	قَدَمٌ	Qadam
h3w117	接	to receive; to pick up	اسْتَقْبَلَ؛ اصْطَحَبَ	Istaqbal; iṣṭaḥab
h3w118	街道	street	شَارِعٌ	Shāriʿ
h3w119	节目	programme	بَرْنَامَجٌ	Barnāmaj
h3w120	节日	festival	عِيدٌ	ʿĪd
h3w121	结婚	to get married	تَزَوَّجَ	Tazawwaj
```
