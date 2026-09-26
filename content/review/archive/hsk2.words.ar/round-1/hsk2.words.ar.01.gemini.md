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
h2w001	吧	(suggestion particle) let's…; …right?	(أَدَاةُ اقْتِرَاحٍ)؛ (أَدَاةُ تَأْكِيدٍ)	(adātu iqtirāḥ); (adātu taʾkīd)
h2w002	白	white	أَبْيَضُ	Abyaḍ
h2w003	百	hundred	مِائَةٌ	Miāʾa
h2w004	帮助	to help	سَاعَدَ	Sāʿad
h2w005	报纸	newspaper	جَرِيدَةٌ	Jarīda
h2w006	比	than; compared with	(حَرْفُ مُقَارَنَةٍ بِمَعْنَى مِنْ)	(ḥarfu muqāranatin bimaʿnā min)
h2w007	别	don't	(أَدَاةُ نَهْيٍ)	(adātu nahy)
h2w008	宾馆	hotel	فُنْدُقٌ	Funduq
h2w009	长	long	طَوِيلٌ	Ṭawīl
h2w010	唱歌	to sing	غَنَّى	Ghannā
h2w011	出	to go out; to come out	خَرَجَ	Kharaj
h2w012	穿	to wear; to put on	لَبِسَ	Labis
h2w013	次	(measure word for times)	(كَلِمَةُ عَدٍّ لِلْمَرَّاتِ)	(kalimatu ʿaddin li-l-marrāt)
h2w014	从	from	(حَرْفُ جَرٍّ بِمَعْنَى مِنْ)	(ḥarfu jarrin bimaʿnā min)
h2w015	错	wrong	خَاطِئٌ	Khāṭiʾ
h2w016	打篮球	to play basketball	لَعِبَ كُرَةَ السَّلَّةِ	Laʿiba kurata as-salla
h2w017	大家	everyone	الْجَمِيعُ	Al-jamīʿ
h2w018	到	to arrive; to	وَصَلَ؛ (حَرْفُ جَرٍّ بِمَعْنَى إِلَى)	Waṣal; (ḥarfu jarrin bimaʿnā ilā)
h2w019	得	(structural particle after a verb)	(أَدَاةٌ نَحْوِيَّةٌ بَعْدَ الْفِعْلِ)	(adātun naḥwiyyatun baʿda al-fiʿl)
h2w020	等	to wait	اِنْتَظَرَ	Intaẓar
h2w021	弟弟	younger brother	أَخٌ أَصْغَرُ	Akhun aṣghar
h2w022	第一	first	أَوَّلُ	Awwal
h2w023	懂	to understand	فَهِمَ	Fahim
h2w024	对	correct; towards	صَحِيحٌ؛ (حَرْفُ جَرٍّ بِمَعْنَى نَحْوَ)	Ṣaḥīḥ; (ḥarfu jarrin bimaʿnā naḥw)
h2w025	房间	room	غُرْفَةٌ	Ghurfa
h2w026	非常	very; extremely	جِدًّا	Jiddan
h2w027	服务员	waiter; attendant	نَادِلٌ؛ عَامِلٌ	Nādil; ʿāmil
h2w028	高	tall; high	طَوِيلٌ؛ عَالٍ	Ṭawīl; ʿāl
h2w029	告诉	to tell	أَخْبَرَ	Akhbar
h2w030	哥哥	older brother	أَخٌ أَكْبَرُ	Akhun akbar
h2w031	给	to give; for	أَعْطَى؛ (حَرْفُ جَرٍّ بِمَعْنَى اللَّامِ)	Aʿṭā; (ḥarfu jarrin bimaʿnā al-lām)
h2w032	公共汽车	bus	حَافِلَةٌ	Ḥāfila
h2w033	公司	company	شَرِكَةٌ	Sharika
h2w034	贵	expensive	غَالٍ	Ghāl
h2w035	过	(particle for past experience)	(أَدَاةٌ لِلْخِبْرَةِ الْمَاضِيَةِ)	(adātun li-l-khibrati al-māḍiya)
h2w036	还	still; also	(ظَرْفٌ بِمَعْنَى لَا يَزَالُ)؛ أَيْضًا	(ẓarfun bimaʿnā lā yazāl); ayḍan
h2w037	孩子	child	طِفْلٌ	Ṭifl
h2w038	好吃	tasty	لَذِيذٌ	Ladhīdh
h2w039	黑	black	أَسْوَدُ	Aswad
h2w040	红	red	أَحْمَرُ	Aḥmar
h2w041	欢迎	welcome	رَحَّبَ	Raḥḥab
h2w042	回答	to answer	أَجَابَ	Ajāb
h2w043	机场	airport	مَطَارٌ	Maṭār
h2w044	鸡蛋	egg	بَيْضَةٌ	Bayḍa
h2w045	件	(measure word for clothes and matters)	(كَلِمَةُ عَدٍّ لِلثِّيَابِ وَالْأُمُورِ)	(kalimatu ʿaddin li-th-thiyābi wa-l-ʾumūr)
h2w046	教室	classroom	فَصْلٌ	Faṣl
h2w047	姐姐	older sister	أُخْتٌ كُبْرَى	Ukhtun kubrā
h2w048	介绍	to introduce	قَدَّمَ	Qaddam
h2w049	进	to enter	دَخَلَ	Dakhal
h2w050	近	near	قَرِيبٌ	Qarīb
h2w051	就	just; right away	(ظَرْفٌ بِمَعْنَى فَوْرًا)	(ẓarfun bimaʿnā fawran)
h2w052	觉得	to feel; to think	شَعَرَ؛ ظَنَّ	Shaʿar; ẓann
h2w053	咖啡	coffee	قَهْوَةٌ	Qahwa
h2w054	开始	to begin	بَدَأَ	Badaʾ
h2w055	考试	exam	اِمْتِحَانٌ	Imtiḥān
h2w056	可能	maybe; possible	رُبَّمَا؛ مُمْكِنٌ	Rubbamā; mumkin
h2w057	可以	can; may	قَدَرَ؛ سُمِحَ لَهُ	Qadar; sumiḥa lah
h2w058	课	class; lesson	دَرْسٌ	Dars
h2w059	快	fast	سَرِيعٌ	Sarīʿ
h2w060	快乐	happy	سَعِيدٌ	Saʿīd
```
