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
h3w001	阿姨	aunt	خَالَةٌ	Khāla
h3w002	啊	(particle of surprise or emphasis)	(أَدَاةُ التَّعَجُّبِ)	(adātu at-taʿajjub)
h3w003	矮	short (of height)	قَصِيرٌ	Qaṣīr
h3w004	爱好	hobby	هِوَايَةٌ	Hiwāya
h3w005	安静	quiet	هَادِئٌ	Hādiʾ
h3w006	把	(marks the object before the verb)	(أَدَاةٌ تُحَدِّدُ الْمَفْعُولَ بِهِ)	(adātun tuḥaddidu al-mafʿūla bih)
h3w007	班	class	صَفٌّ	Ṣaff
h3w008	搬	to move (something heavy)	نَقَلَ	Naqal
h3w009	半	half	نِصْفٌ	Niṣf
h3w010	办法	way; method	طَرِيقَةٌ؛ وَسِيلَةٌ	Ṭarīqa; wasīla
h3w011	办公室	office	مَكْتَبٌ	Maktab
h3w012	帮忙	to help	سَاعَدَ	Sāʿad
h3w013	包	bag	حَقِيبَةٌ	Ḥaqība
h3w014	饱	full (after eating)	شَبْعَانُ	Shabʿān
h3w015	北方	the north	الشَّمَالُ	Ash-shamāl
h3w016	被	(passive marker) by	(أَدَاةُ الْمَبْنِيِّ لِلْمَجْهُولِ)؛ مِنْ قِبَلِ	(adātu al-mabniyyi li-l-majhūl); min qibal
h3w017	鼻子	nose	أَنْفٌ	Anf
h3w018	比较	rather; relatively	إِلَى حَدٍّ مَا؛ نِسْبِيًّا	Ilā ḥaddin mā; nisbiyyan
h3w019	比赛	match; competition	مُبَارَاةٌ؛ مُسَابَقَةٌ	Mubārāh; musābaqa
h3w020	笔记本	notebook	دَفْتَرٌ	Daftar
h3w021	必须	must	يَجِبُ	Yajib
h3w022	变化	change	تَغَيُّرٌ	Taghayyur
h3w023	别人	other people	الْآخَرُونَ	Al-ʾākharūn
h3w024	冰箱	refrigerator	ثَلَّاجَةٌ	Thallāja
h3w025	不但…而且	not only… but also	لَيْسَ فَقَطْ، بَلْ أَيْضًا	Laysa faqaṭ, bal ayḍan
h3w026	菜单	menu	قَائِمَةُ الطَّعَامِ	Qāʾimatu aṭ-ṭaʿām
h3w027	才	only then; not until	حِينَئِذٍ فَقَطْ؛ لَيْسَ قَبْلَ	Ḥīnaʾidhin faqaṭ; laysa qabl
h3w028	参加	to take part in	شَارَكَ	Shārak
h3w029	草	grass	عُشْبٌ	ʿUshb
h3w030	层	floor; layer	طَابِقٌ؛ طَبَقَةٌ	Ṭābiq; ṭabaqa
h3w031	差	to be short of; poor	نَقَصَ؛ سَيِّئٌ	Naqaṣ; sayyiʾ
h3w032	超市	supermarket	سُوبَرْمَارْكِتٌ	Sūbarmārkit
h3w033	衬衫	shirt	قَمِيصٌ	Qamīṣ
h3w034	成绩	result; grade	نَتِيجَةٌ؛ عَلَامَةٌ	Natīja; ʿalāma
h3w035	城市	city	مَدِينَةٌ	Madīna
h3w036	迟到	to be late	تَأَخَّرَ	Taʾakhkhar
h3w037	出现	to appear	ظَهَرَ	Ẓahar
h3w038	除了	besides; except	بِالْإِضَافَةِ إِلَى؛ مَا عَدَا	Bi-l-ʾiḍāfati ilā; mā ʿadā
h3w039	厨房	kitchen	مَطْبَخٌ	Maṭbakh
h3w041	春	spring	رَبِيعٌ	Rabīʿ
h3w042	词语	word; phrase	كَلِمَةٌ؛ عِبَارَةٌ	Kalima; ʿibāra
h3w043	聪明	clever	ذَكِيٌّ	Dhakiyy
h3w044	打扫	to clean	نَظَّفَ	Naẓẓaf
h3w045	打算	to plan	نَوَى	Nawā
h3w046	带	to bring; to take	أَحْضَرَ؛ أَخَذَ	Aḥḍar; akhadh
h3w047	担心	to worry	قَلِقَ	Qaliq
h3w048	蛋糕	cake	كَعْكَةٌ	Kaʿka
h3w049	当然	of course	بِالطَّبْعِ	Bi-ṭ-ṭabʿ
h3w050	地	(adverbial particle)	(أَدَاةٌ تَصِفُ الْفِعْلَ)	(adātun taṣifu al-fiʿl)
h3w051	灯	lamp; light	مِصْبَاحٌ؛ ضَوْءٌ	Miṣbāḥ; ḍawʾ
h3w052	地方	place	مَكَانٌ	Makān
h3w053	地铁	subway	مِتْرُو	Mitrū
h3w054	地图	map	خَرِيطَةٌ	Kharīṭa
h3w055	电梯	elevator	مِصْعَدٌ	Miṣʿad
h3w056	电子邮件	email	بَرِيدٌ إِلِكْتْرُونِيٌّ	Barīdun iliktrūniyy
h3w057	东	east	شَرْقٌ	Sharq
h3w058	冬	winter	شِتَاءٌ	Shitāʾ
h3w059	动物	animal	حَيَوَانٌ	Ḥayawān
h3w060	短	short (of length)	قَصِيرٌ	Qaṣīr
h3w061	段	(measure word for sections)	(كَلِمَةُ عَدٍّ لِلْأَجْزَاءِ)	(kalimatu ʿaddin li-l-ʾajzāʾ)
```
