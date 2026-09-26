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
n005	土豆	Potato	بُطَيْطَةٌ	Buṭayṭa
n007	小豆	Little Bean	حُمَيْصَةٌ	Ḥumayṣa
n011	小石	Pebble	صُخَيْرَةٌ	Ṣukhayra
n013	胖胖	Chubby	سُمَيِّنٌ	Sumayyin
n016	糯米	Sticky Rice	لُزَيِّجَةٌ	Luzayyija
n022	青青	Greenie	أُخَيْضِرٌ	Ukhayḍir
n024	小草	Little Grass	مُرَيْجَةٌ	Murayja
n028	花生	Peanut	فُسَيْتِقٌ	Fusaytiq
n030	栗子	Chestnut	كُسَيْتِنَةٌ	Kusaytina
n031	红薯	Sweet Potato	بُطَيْطَةٌ حُلْوَةٌ	Buṭayṭatun ḥulwa
n032	山药	Yam	جُذَيْرٌ	Judhayr
n033	芋头	Taro	قُلَيْقِيسٌ	Qulayqīs
n047	笨笨	Silly	سُوَيْذِجٌ	Suwaydhij
n053	虎子	Tiger Cub	شُبَيْلٌ	Shubayl
n054	铁蛋	Iron Egg	بُيَيْضَةٌ حَدِيدِيَّةٌ	Buyayḍatun ḥadīdiyya
n055	石蛋	Stone Egg	بُيَيْضَةٌ حَجَرِيَّةٌ	Buyayḍatun ḥajariyya
n057	大壮	Sturdy	مُتَيِّنٌ	Mutayyin
n058	小黑	Shadow	أُسَيْوِدٌ	Usaywid
n060	泡泡	Bubbles	فُقَيْقِيعَةٌ	Fuqayqīʿa
n061	小泡	Little Bubble	رُغَيْوَةٌ	Rughaywa
n062	圆圆	Roundy	دُوَيِّرَةٌ	Duwayyira
n063	团团	Roly	دُحَيْرِيجَةٌ	Duḥayrīja
n065	珠珠	Beady	دُرَيْرَةٌ	Durayra
n067	小贝	Little Shell	قُوَيْقِعَةٌ	Quwayqiʿa
n069	小浪	Little Wave	لُجَيْجَةٌ	Lujayja
n071	小海	Little Sea	يُمَيْمٌ	Yumaym
n076	小月	Little Moon	هُلَيِّلٌ	Hulayyil
n078	小星	Little Star	كُوَيْكِبٌ	Kuwaykib
n081	冰冰	Icy	جُلَيِّدٌ	Julayyid
n082	小冰	Little Ice	صُقَيِّعٌ	Ṣuqayyiʿ
n084	朵朵	Fluffy	وُبَيْرَةٌ	Wubayra
n085	银银	Silvery	فُضَيْضَةٌ	Fuḍayḍa
n086	小银	Little Silver	سُبَيِّكَةٌ	Subayyika
n087	潮潮	Tidey	مُدَيْدٌ	Mudayd
n088	泡芙	Cream Puff	نُفَيْخَةٌ	Nufaykha
n090	果冻	Jelly	هُلَامَةٌ	Hulāma
n092	甜甜	Sweetie	عُذَيِّبٌ	ʿUdhayyib
n093	奶糖	Toffee	كُرَيْمِيلٌ	Kuraymīl
n094	棉花	Cotton	نُدَيْفَةٌ	Nudayfa
n095	丸子	Meatball	كُفَيْتَةٌ	Kufayta
n096	球球	Ballie	طُوَيْبَةٌ	Ṭuwayba
n098	滚滚	Rolly	لُفَيْفَةٌ	Lufayfa
n099	嘟嘟	Pouty	شُفَيْهَةٌ	Shufayha
n100	乐乐	Cheery	فُرَيِّحٌ	Furayyiḥ
n101	笑笑	Smiley	ضُحَيِّكٌ	Ḍuḥayyik
n103	安安	Peaceful	وُدَيِّعٌ	Wudayyiʿ
n105	贝壳	Seashell	مَحَارَةٌ	Maḥāra
n107	海螺	Conch	حُلَيْزِينٌ	Ḥulayzīn
n108	浪花	Sea Spray	رُذَيِّذٌ	Rudhayyidh
n109	水母	Jellyfish	قُنَيْدِيلٌ	Qunaydīl
n111	鲸鲸	Whaley	عُنَيْبِرٌ	ʿUnaybir
n113	豆腐	Tofu	جُبَيْنَةٌ	Jubayna
n114	年糕	Rice Cake	رُزَيْزَةٌ	Ruzayza
n115	元宵	Lantern Dumpling	فُوَيْنِيسٌ	Fuwaynīs
```
