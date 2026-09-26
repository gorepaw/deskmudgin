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
w061	买	to buy	اِشْتَرَى	Ishtarā
w062	猫	cat	قِطَّةٌ	Qiṭṭa
w063	没关系	it doesn't matter	لَا بَأْسَ	Lā baʾs
w064	没有	to not have	لَيْسَ عِنْدَهُ	Laysa ʿindah
w065	米饭	cooked rice	أَرُزٌّ	Aruzz
w066	名字	name	اِسْمٌ	Ism
w067	明天	tomorrow	غَدًا	Ghadan
w068	哪	which	أَيٌّ	Ayy
w069	哪儿	where	أَيْنَ	Ayn
w070	那	that	ذٰلِكَ	Dhālik
w071	呢	(question particle)	(أَدَاةُ اسْتِفْهَامٍ)	(adātu istifhām)
w072	能	to be able to	اِسْتَطَاعَ	Istaṭāʿ
w073	你	you	أَنْتَ	Anta
w074	年	year	سَنَةٌ	Sana
w075	女儿	daughter	اِبْنَةٌ	Ibna
w076	朋友	friend	صَدِيقٌ	Ṣadīq
w077	漂亮	pretty	جَمِيلٌ	Jamīl
w078	苹果	apple	تُفَّاحَةٌ	Tuffāḥa
w079	七	seven	سَبْعَةٌ	Sabʿa
w080	前面	in front	أَمَامَ	Amām
w081	钱	money	مَالٌ	Māl
w082	请	please	رَجَا	Rajā
w083	去	to go	ذَهَبَ	Dhahab
w084	热	hot	حَارٌّ	Ḥārr
w085	人	person	إِنْسَانٌ	Insān
w086	认识	to know (someone)	عَرَفَ	ʿAraf
w087	三	three	ثَلَاثَةٌ	Thalātha
w088	商店	shop	مَتْجَرٌ	Matjar
w089	上	up; on	فَوْقَ؛ عَلَى	Fawq; ʿalā
w090	上午	morning	صَبَاحٌ	Ṣabāḥ
w091	少	few; little	قَلِيلٌ	Qalīl
w092	谁	who	مَنْ	Man
w093	什么	what	مَا	Mā
w094	十	ten	عَشَرَةٌ	ʿAshara
w095	时候	time; moment	وَقْتٌ؛ لَحْظَةٌ	Waqt; laḥẓa
w096	是	to be	كَانَ	Kān
w097	书	book	كِتَابٌ	Kitāb
w098	水	water	مَاءٌ	Māʾ
w099	水果	fruit	فَاكِهَةٌ	Fākiha
w100	睡觉	to sleep	نَامَ	Nām
w101	说	to speak	قَالَ	Qāl
w102	四	four	أَرْبَعَةٌ	Arbaʿa
w103	岁	years of age	(كَلِمَةُ عَدٍّ لِلسِّنِّ)	(kalimatu ʿaddin li-s-sinn)
w104	他	he; him	هُوَ	Huwa
w105	她	she; her	هِيَ	Hiya
w106	太	too	جِدًّا	Jiddan
w107	天气	weather	طَقْسٌ	Ṭaqs
w108	听	to listen	سَمِعَ	Samiʿ
w109	同学	classmate	زَمِيلُ الدِّرَاسَةِ	Zamīlu ad-dirāsa
w110	喂	hello (on the phone)	أَلُو	Alū
w111	我	I; me	أَنَا	Anā
w112	我们	we; us	نَحْنُ	Naḥn
w113	五	five	خَمْسَةٌ	Khamsa
w114	喜欢	to like	أَعْجَبَهُ	Aʿjabah
w115	下	down; under	تَحْتَ	Taḥt
w116	下午	afternoon	بَعْدَ الظُّهْرِ	Baʿda aẓ-ẓuhr
w117	下雨	to rain	أَمْطَرَ	Amṭar
w118	先生	mister	سَيِّدٌ	Sayyid
w119	现在	now	الْآنَ	Al-ʾān
w120	想	to want; to think	أَرَادَ؛ فَكَّرَ	Arād; fakkar
```
