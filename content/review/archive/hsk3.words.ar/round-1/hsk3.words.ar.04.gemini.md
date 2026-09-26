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
h3w182	裙子	skirt	تَنُّورَةٌ	Tannūra
h3w183	然后	then; afterwards	ثُمَّ؛ بَعْدَ ذٰلِكَ	Thumm; baʿda dhālik
h3w184	热情	warm; enthusiastic	وَدُودٌ؛ مُتَحَمِّسٌ	Wadūd; mutaḥammis
h3w185	认为	to think; to consider	اعْتَقَدَ	Iʿtaqad
h3w186	认真	serious; conscientious	جَادٌّ؛ دَقِيقٌ	Jādd; daqīq
h3w187	容易	easy	سَهْلٌ	Sahl
h3w188	如果	if	إِذَا	Idhā
h3w189	伞	umbrella	مِظَلَّةٌ	Miẓalla
h3w190	上网	to go online	تَصَفَّحَ الْإِنْتَرْنِتَ	Taṣaffaḥa al-ʾintarnit
h3w191	生气	to be angry	غَضِبَ	Ghaḍib
h3w192	声音	sound; voice	صَوْتٌ	Ṣawt
h3w193	世界	world	عَالَمٌ	ʿĀlam
h3w194	试	to try	جَرَّبَ	Jarrab
h3w195	瘦	thin	نَحِيفٌ	Naḥīf
h3w196	叔叔	uncle	عَمٌّ	ʿAmm
h3w197	舒服	comfortable	مُرِيحٌ	Murīḥ
h3w198	树	tree	شَجَرَةٌ	Shajara
h3w199	数学	maths	رِيَاضِيَّاتٌ	Riyāḍiyyāt
h3w200	刷牙	to brush one's teeth	غَسَلَ أَسْنَانَهُ	Ghasala asnānah
h3w201	双	pair	زَوْجٌ	Zawj
h3w202	水平	level; standard	مُسْتَوًى	Mustawā
h3w203	司机	driver	سَائِقٌ	Sāʾiq
h3w204	太阳	sun	شَمْسٌ	Shams
h3w205	特别	special; especially	خَاصٌّ؛ خُصُوصًا	Khāṣṣ; khuṣūṣan
h3w206	疼	to hurt; painful	آلَمَ	Ālam
h3w207	提高	to improve	حَسَّنَ؛ رَفَعَ	Ḥassan; rafaʿ
h3w208	体育	sports; physical education	رِيَاضَةٌ؛ تَرْبِيَةٌ بَدَنِيَّةٌ	Riyāḍa; tarbiyatun badaniyya
h3w209	甜	sweet	حُلْوٌ	Ḥulw
h3w210	条	(measure word for long things)	(كَلِمَةُ عَدٍّ لِلْأَشْيَاءِ الطَّوِيلَةِ)	(kalimatu ʿaddin li-l-ʾashyāʾi aṭ-ṭawīla)
h3w211	同事	colleague	زَمِيلٌ	Zamīl
h3w212	同意	to agree	وَافَقَ	Wāfaq
h3w213	头发	hair	شَعْرٌ	Shaʿr
h3w214	突然	suddenly	فَجْأَةً	Fajʾa
h3w215	图书馆	library	مَكْتَبَةٌ	Maktaba
h3w216	腿	leg	سَاقٌ	Sāq
h3w217	完成	to complete	أَكْمَلَ	Akmal
h3w218	碗	bowl	وِعَاءٌ	Wiʿāʾ
h3w219	万	ten thousand	عَشَرَةُ آلَافٍ	ʿAsharatu ālāf
h3w220	忘记	to forget	نَسِيَ	Nasiy
h3w221	为	for; to	مِنْ أَجْلِ؛ لِأَجْلِ	Min ajl; liʾajl
h3w222	为了	in order to	لِكَيْ	Likay
h3w223	位	(polite measure word for people)	(كَلِمَةُ عَدٍّ مُهَذَّبَةٌ لِلْأَشْخَاصِ)	(kalimatu ʿaddin muhadhdhabatun li-l-ʾashkhāṣ)
h3w224	文化	culture	ثَقَافَةٌ	Thaqāfa
h3w225	西	west	غَرْبٌ	Gharb
h3w226	习惯	habit; to be used to	عَادَةٌ؛ اعْتَادَ	ʿĀda; iʿtād
h3w227	洗手间	restroom	دَوْرَةُ الْمِيَاهِ	Dawratu al-miyāh
h3w228	洗澡	to take a bath or shower	اسْتَحَمَّ	Istaḥamm
h3w229	夏	summer	صَيْفٌ	Ṣayf
h3w230	先	first	أَوَّلًا	Awwalan
h3w231	相信	to believe	صَدَّقَ؛ وَثِقَ	Ṣaddaq; wathiq
h3w232	香蕉	banana	مَوْزٌ	Mawz
h3w233	向	towards	نَحْوَ	Naḥw
h3w234	像	to resemble; like	أَشْبَهَ؛ مِثْلُ	Ashbah; mithl
h3w235	小心	careful	حَذِرٌ	Ḥadhir
h3w236	校长	principal	مُدِيرُ الْمَدْرَسَةِ	Mudīru al-madrasa
h3w237	新闻	news	أَخْبَارٌ	Akhbār
h3w238	新鲜	fresh	طَازَجٌ	Ṭāzaj
h3w239	信	letter	رِسَالَةٌ	Risāla
h3w241	行李箱	suitcase	حَقِيبَةُ سَفَرٍ	Ḥaqībatu safar
h3w242	熊猫	panda	دُبُّ الْبَانْدَا	Dubbu al-bāndā
```
