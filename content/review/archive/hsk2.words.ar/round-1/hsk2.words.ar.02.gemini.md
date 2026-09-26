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
h2w061	累	tired	تَعْبَانُ	Taʿbān
h2w062	离	away from	(حَرْفٌ يُفِيدُ الْمَسَافَةَ مِنْ)	(ḥarfun yufīdu al-masāfata min)
h2w063	两	two (of something)	اِثْنَانِ	Ithnān
h2w064	零	zero	صِفْرٌ	Ṣifr
h2w065	路	road	طَرِيقٌ	Ṭarīq
h2w066	旅游	to travel	سَافَرَ	Sāfar
h2w067	卖	to sell	بَاعَ	Bāʿ
h2w068	慢	slow	بَطِيءٌ	Baṭīʾ
h2w069	忙	busy	مَشْغُولٌ	Mashghūl
h2w070	每	every	(أَدَاةٌ بِمَعْنَى كُلُّ)	(adātun bimaʿnā kull)
h2w071	妹妹	younger sister	أُخْتٌ صُغْرَى	Ukhtun ṣughrā
h2w072	门	door	بَابٌ	Bāb
h2w073	面条	noodles	مَعْكَرُونَةٌ	Maʿkarūna
h2w074	男	male	ذَكَرٌ	Dhakar
h2w075	您	you (polite)	حَضْرَتُكَ	Ḥaḍratuk
h2w076	牛奶	milk	حَلِيبٌ	Ḥalīb
h2w077	女	female	أُنْثَى	Unthā
h2w078	旁边	beside	(ظَرْفُ مَكَانٍ بِمَعْنَى بِجَانِبِ)	(ẓarfu makānin bimaʿnā bijānib)
h2w079	跑步	to run; to jog	جَرَى	Jarā
h2w080	便宜	cheap	رَخِيصٌ	Rakhīṣ
h2w081	票	ticket	تَذْكِرَةٌ	Tadhkira
h2w082	妻子	wife	زَوْجَةٌ	Zawja
h2w083	起床	to get up	اِسْتَيْقَظَ	Istayqaẓ
h2w084	千	thousand	أَلْفٌ	Alf
h2w085	铅笔	pencil	قَلَمُ رَصَاصٍ	Qalamu raṣāṣ
h2w086	晴	sunny	مُشْمِسٌ	Mushmis
h2w087	去年	last year	الْعَامُ الْمَاضِي	Al-ʿāmu al-māḍī
h2w088	让	to let; to make (someone do)	سَمَحَ؛ جَعَلَ	Samaḥ; jaʿal
h2w089	日	day; date	يَوْمٌ؛ تَارِيخٌ	Yawm; tārīkh
h2w090	上班	to go to work	ذَهَبَ إِلَى الْعَمَلِ	Dhahaba ilā al-ʿamal
h2w091	身体	body; health	جِسْمٌ؛ صِحَّةٌ	Jism; ṣiḥḥa
h2w092	生病	to get sick	مَرِضَ	Mariḍ
h2w093	生日	birthday	عِيدُ مِيلَادٍ	ʿĪdu mīlād
h2w094	时间	time	وَقْتٌ	Waqt
h2w095	事情	matter; thing	أَمْرٌ؛ شَيْءٌ	Amr; shayʾ
h2w096	手表	wristwatch	سَاعَةُ يَدٍ	Sāʿatu yad
h2w097	手机	mobile phone	هَاتِفٌ مَحْمُولٌ	Hātifun maḥmūl
h2w098	说话	to speak; to talk	تَكَلَّمَ	Takallam
h2w099	送	to give (as a gift); to see off	أَهْدَى؛ وَدَّعَ	Ahdā; waddaʿ
h2w100	虽然…但是	although… (but)	مَعَ أَنَّ … فَإِنَّ	Maʿa ann … faʾinn
h2w101	它	it	(ضَمِيرٌ لِغَيْرِ الْعَاقِلِ: هُوَ أَوْ هِيَ)	(ḍamīrun lighayri al-ʿāqil: huwa aw hiya)
h2w102	踢足球	to play football	لَعِبَ كُرَةَ الْقَدَمِ	Laʿiba kurata al-qadam
h2w103	题	question (on a test)	سُؤَالٌ	Suʾāl
h2w104	跳舞	to dance	رَقَصَ	Raqaṣ
h2w105	外	outside	خَارِجٌ	Khārij
h2w106	完	to finish	اِنْتَهَى	Intahā
h2w107	玩	to play	لَعِبَ	Laʿib
h2w108	晚上	evening	مَسَاءٌ	Masāʾ
h2w109	往	towards	(حَرْفُ جَرٍّ بِمَعْنَى نَحْوَ)	(ḥarfu jarrin bimaʿnā naḥw)
h2w110	为什么	why	لِمَاذَا	Limādhā
h2w111	问	to ask	سَأَلَ	Saʾal
h2w112	问题	question; problem	سُؤَالٌ؛ مُشْكِلَةٌ	Suʾāl; mushkila
h2w113	西瓜	watermelon	بَطِّيخٌ	Baṭṭīkh
h2w114	希望	to hope	رَجَا	Rajā
h2w115	洗	to wash	غَسَلَ	Ghasal
h2w116	小时	hour	سَاعَةٌ	Sāʿa
h2w117	笑	to laugh; to smile	ضَحِكَ؛ اِبْتَسَمَ	Ḍaḥik; ibtasam
h2w118	新	new	جَدِيدٌ	Jadīd
h2w119	姓	surname; to be surnamed	اِسْمُ الْعَائِلَةِ؛ سُمِّيَ	Ismu al-ʿāʾila; summiy
h2w120	休息	to rest	اِسْتَرَاحَ	Istarāḥ
```
