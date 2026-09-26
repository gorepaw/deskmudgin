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
w001	爱	love	أَحَبَّ	Aḥabb
w002	八	eight	ثَمَانِيَةٌ	Thamāniya
w003	爸爸	dad	أَبٌ	Ab
w004	杯子	cup	كُوبٌ	Kūb
w005	北京	Beijing	بِكِينُ	Bikīn
w006	本	(measure word for books)	(كَلِمَةُ عَدٍّ لِلْكُتُبِ)	(kalimatu ʿaddin li-l-kutub)
w007	不客气	you're welcome	عَفْوًا	ʿAfwan
w008	不	not; no	(أَدَاةُ نَفْيٍ)؛ لَا	(adātu nafy); lā
w009	菜	dish; vegetable	طَبَقٌ؛ خُضَارٌ	Ṭabaq; khuḍār
w010	茶	tea	شَايٌ	Shāy
w011	吃	to eat	أَكَلَ	Akal
w012	出租车	taxi	سَيَّارَةُ أُجْرَةٍ	Sayyāratu ujra
w013	打电话	to make a phone call	هَاتَفَ	Hātaf
w014	大	big	كَبِيرٌ	Kabīr
w015	的	(possessive particle)	(أَدَاةُ الْمِلْكِيَّةِ)	(adātu al-milkiyya)
w016	点	o'clock; a little	(لِلسَّاعَةِ)؛ قَلِيلٌ	(li-s-sāʿa); qalīl
w017	电脑	computer	حَاسُوبٌ	Ḥāsūb
w018	电视	television	تِلْفَازٌ	Tilfāz
w019	电影	film	فِيلْمٌ	Fīlm
w020	东西	thing	شَيْءٌ	Shayʾ
w021	都	all; both	كُلٌّ؛ كِلَا	Kull; kilā
w022	读	to read	قَرَأَ	Qaraʾ
w023	对不起	sorry	آسِفٌ	Āsif
w024	多	many; much	كَثِيرٌ	Kathīr
w025	多少	how many; how much	كَمْ	Kam
w026	儿子	son	اِبْنٌ	Ibn
w027	二	two	اِثْنَانِ	Ithnān
w028	饭店	restaurant; hotel	مَطْعَمٌ؛ فُنْدُقٌ	Maṭʿam; funduq
w029	飞机	aeroplane	طَائِرَةٌ	Ṭāʾira
w030	分钟	minute	دَقِيقَةٌ	Daqīqa
w031	高兴	happy	سَعِيدٌ	Saʿīd
w032	个	(general measure word)	(كَلِمَةُ عَدٍّ عَامَّةٌ)	(kalimatu ʿaddin ʿāmma)
w033	工作	work; to work	عَمَلٌ؛ عَمِلَ	ʿAmal; ʿamil
w034	狗	dog	كَلْبٌ	Kalb
w035	汉语	Chinese language	اللُّغَةُ الصِّينِيَّةُ	Al-lughatu aṣ-ṣīniyya
w036	好	good	جَيِّدٌ	Jayyid
w037	号	number; day of the month	رَقْمٌ؛ يَوْمٌ	Raqm; yawm
w038	喝	to drink	شَرِبَ	Sharib
w039	和	and	(حَرْفُ عَطْفٍ)	(ḥarfu ʿaṭf)
w040	很	very	جِدًّا	Jiddan
w041	后面	behind	خَلْفَ	Khalf
w042	回	to return	رَجَعَ	Rajaʿ
w043	会	can; to know how to	أَجَادَ	Ajād
w044	几	how many; several	كَمْ؛ عِدَّةٌ	Kam; ʿidda
w045	家	home; family	بَيْتٌ؛ أُسْرَةٌ	Bayt; usra
w046	叫	to be called	سُمِّيَ	Summiy
w047	今天	today	الْيَوْمَ	Al-yawm
w048	九	nine	تِسْعَةٌ	Tisʿa
w049	开	to open; to drive	فَتَحَ؛ قَادَ	Fataḥ; qād
w050	看	to look; to watch	نَظَرَ؛ شَاهَدَ	Naẓar; shāhad
w051	看见	to see	رَأَى	Raʾā
w052	块	(measure word for money)	(كَلِمَةُ عَدٍّ لِلنُّقُودِ)	(kalimatu ʿaddin li-n-nuqūd)
w053	来	to come	جَاءَ	Jāʾ
w054	老师	teacher	مُعَلِّمٌ	Muʿallim
w055	了	(aspect particle)	(أَدَاةُ إِتْمَامِ الْفِعْلِ)	(adātu itmāmi al-fiʿl)
w056	冷	cold	بَارِدٌ	Bārid
w057	里	inside	دَاخِلَ	Dākhil
w058	六	six	سِتَّةٌ	Sitta
w059	妈妈	mum	أُمٌّ	Umm
w060	吗	(question particle)	(أَدَاةُ اسْتِفْهَامٍ)	(adātu istifhām)
```
