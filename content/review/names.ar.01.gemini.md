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
n001	泥泥	Muddy	طُيَيْنٌ	Ṭuyayn
n002	小泥	Little Mud	وُحَيْلٌ	Wuḥayl
n003	泥球	Mudball	كُرَيَّةُ طِينٍ	Kurayyatu ṭīn
n004	泥巴	Mud	طِينَةٌ	Ṭīna
n005	土豆	Potato	دُرَيْنَةٌ	Durayna
n006	豆豆	Beanie	فُوَيْلٌ	Fuwayl
n007	小豆	Little Bean	حُبَيْبَةٌ	Ḥubayba
n008	包子	Bun	كُعَيْكَةٌ	Kuʿayka
n009	馒头	Steamed Bun	قُرَيْصٌ	Qurayṣ
n010	石头	Rocky	حُجَيْرٌ	Ḥujayr
n011	小石	Pebble	حُصَيَّةٌ	Ḥuṣayya
n012	墩墩	Chunky	كُتَيْلَةٌ	Kutayla
n013	胖胖	Chubby	بُدَيْنٌ	Budayn
n014	呱呱	Croaky	نُقَيْقٌ	Nuqayq
n015	团子	Dumpling Ball	كُرَيَّةٌ	Kurayya
n016	糯米	Sticky Rice	لُزَيْجَةٌ	Luzayja
n017	蘑菇	Mushroom	فُطَيْرٌ	Fuṭayr
n018	小菇	Little Mushroom	كُمَيْأَةٌ	Kumayʾa
n019	木头	Woody	خُشَيْبَةٌ	Khushayba
n020	小树	Sapling	شُجَيْرَةٌ	Shujayra
n021	苔苔	Mossy	طُحَيْلِبٌ	Ṭuḥaylib
n022	青青	Greenie	خُضَيْرٌ	Khuḍayr
n023	草草	Grassy	عُشَيْبَةٌ	ʿUshayba
n024	小草	Little Grass	كُلَيْأٌ	Kulayʾ
n025	叶子	Leafy	وُرَيْقَةٌ	Wurayqa
n026	芽芽	Sprout	بُرَيْعِمٌ	Burayʿim
n027	小芽	Little Sprout	نُبَيْتَةٌ	Nubayta
n028	花生	Peanut	لُوَيْزَةٌ	Luwayza
n029	核桃	Walnut	جُوَيْزَةٌ	Juwayza
n030	栗子	Chestnut	فُرَيْوَةٌ	Furaywa
n031	红薯	Sweet Potato	دُرَيْنَةٌ حُلْوَةٌ	Duraynatun ḥulwa
n032	山药	Yam	جُبَيْلٌ	Jubayl
n033	芋头	Taro	قُلَيْقِسٌ	Qulayqis
n034	芋圆	Taro Ball	كُرَيَّةُ قُلْقَاسٍ	Kurayyatu qulqās
n035	饺子	Dumpling	كُيَيْسٌ	Kuyays
n036	窝头	Cornbread	رُغَيْفُ ذُرَةٍ	Rughayfu dhura
n037	煤球	Coal Ball	فُحَيْمٌ	Fuḥaym
n038	黑豆	Black Bean	بُقَيْلَةٌ سَوْدَاءُ	Buqaylatun sawdāʾ
n039	绿豆	Mung Bean	بُقَيْلَةٌ خَضْرَاءُ	Buqaylatun khaḍrāʾ
n040	红豆	Red Bean	بُقَيْلَةٌ حَمْرَاءُ	Buqaylatun ḥamrāʾ
n041	毛豆	Edamame	زُغَيْبٌ	Zughayb
n042	土土	Earthy	تُرَيْبٌ	Turayb
n043	小土	Little Dirt	رُمَيْلٌ	Rumayl
n044	坑洼	Pothole	حُفَيْرَةٌ	Ḥufayra
n045	疙瘩	Lumpy	نُتَيْءٌ	Nutayʾ
n046	憨憨	Dopey	غُوَيْفِلٌ	Ghuwayfil
n047	笨笨	Silly	طُرَيْفٌ	Ṭurayf
n048	呆呆	Dozy	نُعَيْسٌ	Nuʿays
n049	懒懒	Lazy	كُسَيْلٌ	Kusayl
n050	咕咕	Gurgle	قُرَيْقِرَةٌ	Qurayqira
n051	咚咚	Thump	طُبَيْلٌ	Ṭubayl
n052	牛牛	Bull	عُجَيْلٌ	ʿUjayl
n053	虎子	Tiger Cub	نُمَيْرٌ	Numayr
n054	铁蛋	Iron Egg	بُوَيْضَةٌ حَدِيدِيَّةٌ	Buwayḍatun ḥadīdiyya
n055	石蛋	Stone Egg	بُوَيْضَةٌ حَجَرِيَّةٌ	Buwayḍatun ḥajariyya
n056	二狗	Doggo	كُلَيْبٌ	Kulayb
n057	大壮	Sturdy	مُتَيْنٌ	Mutayn
n058	小黑	Shadow	سُوَيْدَاءُ	Suwaydāʾ
n059	阿土	Dusty	غُبَيْرٌ	Ghubayr
n060	泡泡	Bubbles	فُقَيْقِعَةٌ	Fuqayqiʿa
```
