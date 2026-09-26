These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is **names** for the creatures — small, ugly, endearing frog-like animals and round sea creatures. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.
5. For a name: it should be a real, affectionate Arabic nickname that says what the name means — a diminutive (فُعَيْل), a pet form, a word used as a pet name — never a transliteration of the Chinese. Two creatures must not share a name. Say plainly if it carries any unintended or unfortunate meaning.

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
n061	小泡	Little Bubble	زُبَيْدٌ	Zubayd
n062	圆圆	Roundy	دُوَيْرَةٌ	Duwayra
n063	团团	Roly	مُدَحْرَجٌ	Mudaḥraj
n064	珍珠	Pearl	لُؤْلُؤَةٌ	Luʾluʾa
n065	珠珠	Beady	دُرَيَّةٌ	Durayya
n066	贝贝	Shelly	صُدَيْفَةٌ	Ṣudayfa
n067	小贝	Little Shell	مُحَيْرَةٌ	Muḥayra
n068	浪浪	Wavy	مُوَيْجَةٌ	Muwayja
n069	小浪	Little Wave	عُبَيْبٌ	ʿUbayb
n070	海海	Sea	بُحَيْرٌ	Buḥayr
n071	小海	Little Sea	بُحَيْرَةٌ	Buḥayra
n072	水水	Watery	مُوَيْهٌ	Muwayh
n073	滴滴	Droplet	قُطَيْرَةٌ	Quṭayra
n074	露露	Dewy	نُدَيَّةٌ	Nudayya
n075	月月	Moony	قُمَيْرٌ	Qumayr
n076	小月	Little Moon	قَمُّورٌ	Qammūr
n077	星星	Starry	نُجَيْمٌ	Nujaym
n078	小星	Little Star	ثُرَيَّا	Thurayyā
n079	汤圆	Sweet Dumpling	حُلَيْوَةٌ	Ḥulaywa
n080	雪球	Snowball	ثُلَيْجَةٌ	Thulayja
n081	冰冰	Icy	جُلَيْدٌ	Julayd
n082	小冰	Little Ice	صُقَيْعٌ	Ṣuqayʿ
n083	云朵	Cloud	غُيَيْمَةٌ	Ghuyayma
n084	朵朵	Fluffy	رُغَيْوَةٌ	Rughaywa
n085	银银	Silvery	فُضَيَّةٌ	Fuḍayya
n086	小银	Little Silver	لُجَيْنٌ	Lujayn
n087	潮潮	Tidey	تُيَيِّرٌ	Tuyayyir
n088	泡芙	Cream Puff	فُطَيْرَةٌ	Fuṭayra
n089	布丁	Pudding	قُشَيْدَةٌ	Qushayda
n090	果冻	Jelly	هُلَيْمٌ	Hulaym
n091	糖糖	Sugar	سُكَيْكِرٌ	Sukaykir
n092	甜甜	Sweetie	حُلَيْوٌ	Ḥulayw
n093	奶糖	Toffee	لُبَيْنَةٌ	Lubayna
n094	棉花	Cotton	قُطَيْنَةٌ	Quṭayna
n095	丸子	Meatball	بُنَيْدِقَةٌ	Bunaydiqa
n096	球球	Ballie	كُبَيَّةٌ	Kubayya
n098	滚滚	Rolly	لُفَيْفٌ	Lufayf
n099	嘟嘟	Pouty	شُفَيْفَةٌ	Shufayfa
n100	乐乐	Cheery	فُرَيْحٌ	Furayḥ
n101	笑笑	Smiley	ضُحَيْكٌ	Ḍuḥayk
n102	静静	Quiet	سُوَيْكِتٌ	Suwaykit
n103	安安	Peaceful	سُلَيْمٌ	Sulaym
n104	宝宝	Baby	كُنَيْزٌ	Kunayz
n105	贝壳	Seashell	وُدَيْعَةٌ	Wudayʿa
n106	海星	Starfish	نُجَيْمَةٌ بَحْرِيَّةٌ	Nujaymatun baḥriyya
n107	海螺	Conch	حُلَيْزُونٌ	Ḥulayzūn
n108	浪花	Sea Spray	رُذَيْذٌ	Rudhaydh
n109	水母	Jellyfish	هُلَيْمَةٌ	Hulayma
n110	小鲸	Little Whale	حُوَيْتٌ	Ḥuwayt
n111	鲸鲸	Whaley	حَوُّوتٌ	Ḥawwūt
n112	企鹅	Penguin	بُطَيْرِيقٌ	Buṭayrīq
n113	豆腐	Tofu	نُعَيْمَةٌ	Nuʿayma
n114	年糕	Rice Cake	أُرَيْزَةٌ	Urayza
n115	元宵	Lantern Dumpling	فُنَيْنِيسٌ	Funaynīs
n116	米米	Rice Grain	أُرَيْزٌ	Urayz
n117	月饼	Mooncake	بُدَيْرٌ	Budayr
n118	小雨	Drizzle	طُلَيْلٌ	Ṭulayl
n119	雨滴	Raindrop	قُطَيْرَةُ مَطَرٍ	Quṭayratu maṭar
```
