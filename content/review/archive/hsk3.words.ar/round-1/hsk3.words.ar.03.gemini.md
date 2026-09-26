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
h3w122	结束	to end	انْتَهَى	Intahā
h3w123	解决	to solve	حَلَّ	Ḥall
h3w124	借	to borrow; to lend	اسْتَعَارَ؛ أَعَارَ	Istaʿār; aʿār
h3w125	经常	often	غَالِبًا	Ghāliban
h3w126	经过	to pass through	مَرَّ	Marr
h3w127	经理	manager	مُدِيرٌ	Mudīr
h3w128	久	for a long time	مُنْذُ وَقْتٍ طَوِيلٍ	Mundhu waqtin ṭawīl
h3w129	旧	old (of things)	قَدِيمٌ	Qadīm
h3w130	句子	sentence	جُمْلَةٌ	Jumla
h3w131	决定	to decide	قَرَّرَ	Qarrar
h3w132	可爱	lovely	لَطِيفٌ	Laṭīf
h3w133	渴	thirsty	عَطْشَانُ	ʿAṭshān
h3w134	刻	quarter of an hour	رُبْعُ سَاعَةٍ	Rubʿu sāʿa
h3w135	客人	guest	ضَيْفٌ	Ḍayf
h3w136	空调	air conditioning	مُكَيِّفُ هَوَاءٍ	Mukayyifu hawāʾ
h3w137	口	mouth; (measure word for family members)	فَمٌ؛ (كَلِمَةُ عَدٍّ لِأَفْرَادِ الْأُسْرَةِ)	Fam; (kalimatu ʿaddin liʾafrādi al-ʾusra)
h3w138	哭	to cry	بَكَى	Bakā
h3w139	裤子	trousers	بَنْطَلُونٌ	Banṭalūn
h3w140	筷子	chopsticks	عِيدَانُ الطَّعَامِ	ʿĪdānu aṭ-ṭaʿām
h3w141	蓝	blue	أَزْرَقُ	Azraq
h3w142	老	old	كَبِيرٌ فِي السِّنِّ	Kabīrun fī as-sinn
h3w143	离开	to leave	غَادَرَ	Ghādar
h3w144	力气	strength	قُوَّةٌ	Quwwa
h3w145	厉害	formidable; impressive	رَائِعٌ؛ قَوِيٌّ	Rāʾiʿ; qawiyy
h3w146	例如	for example	مَثَلًا	Mathalan
h3w147	脸	face	وَجْهٌ	Wajh
h3w148	练习	to practise	تَدَرَّبَ	Tadarrab
h3w149	辆	(measure word for vehicles)	(كَلِمَةُ عَدٍّ لِلسَّيَّارَاتِ)	(kalimatu ʿaddin li-s-sayyārāt)
h3w150	了解	to understand	تَفَهَّمَ؛ عَرَفَ	Tafahham; ʿaraf
h3w151	邻居	neighbour	جَارٌ	Jār
h3w152	另外	in addition	عِلَاوَةً عَلَى ذٰلِكَ	ʿIlāwatan ʿalā dhālik
h3w153	留	to stay; to keep	بَقِيَ؛ احْتَفَظَ	Baqiy; iḥtafaẓ
h3w154	楼	building; floor	مَبْنًى؛ طَابِقٌ	Mabnā; ṭābiq
h3w155	绿	green	أَخْضَرُ	Akhḍar
h3w156	马上	immediately	فَوْرًا	Fawran
h3w157	满意	satisfied	رَاضٍ	Rāḍ
h3w158	帽子	hat	قُبَّعَةٌ	Qubbaʿa
h3w159	米	metre; rice	مِتْرٌ؛ أُرْزٌ	Mitr; urz
h3w160	面包	bread	خُبْزٌ	Khubz
h3w161	明白	to understand	فَهِمَ	Fahim
h3w162	拿	to take; to hold	أَخَذَ؛ أَمْسَكَ	Akhadh; amsak
h3w163	奶奶	grandmother (father's mother)	جَدَّةٌ	Jadda
h3w164	南	south	جَنُوبٌ	Janūb
h3w165	难过	sad	حَزِينٌ	Ḥazīn
h3w166	年级	school year; grade	سَنَةٌ دِرَاسِيَّةٌ؛ مَرْحَلَةٌ	Sanatun dirāsiyya; marḥala
h3w167	年轻	young	شَابٌّ	Shābb
h3w168	鸟	bird	طَائِرٌ	Ṭāʾir
h3w169	努力	hard-working; to strive	مُجْتَهِدٌ؛ اجْتَهَدَ	Mujtahid; ijtahad
h3w170	爬山	to climb a mountain	تَسَلَّقَ الْجَبَلَ	Tasallaqa al-jabal
h3w171	盘子	plate	طَبَقٌ	Ṭabaq
h3w172	胖	fat; plump	سَمِينٌ	Samīn
h3w173	皮鞋	leather shoes	حِذَاءٌ جِلْدِيٌّ	Ḥidhāʾun jildiyy
h3w174	啤酒	beer	بِيرَةٌ	Bīra
h3w175	瓶子	bottle	زُجَاجَةٌ	Zujāja
h3w176	其实	in fact	فِي الْوَاقِعِ	Fī al-wāqiʿ
h3w177	其他	other	آخَرُ	Ākhar
h3w178	起飞	to take off	أَقْلَعَ	Aqlaʿ
h3w179	清楚	clear	وَاضِحٌ	Wāḍiḥ
h3w180	请假	to ask for leave	طَلَبَ إِجَازَةً	Ṭalaba ijāza
h3w181	秋	autumn	خَرِيفٌ	Kharīf
```
