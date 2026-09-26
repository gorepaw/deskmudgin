These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is short **conversations** between two creatures; turns are separated by ｜ in the Chinese and " | " everywhere else. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.
5. Does each reply answer the turn before it? There must be exactly as many " | "-separated parts as the Chinese has ｜-separated turns.

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
h3x013	好久不见！｜是啊，你最近好吗？｜我很好，谢谢。	Long time no see! | I know! How have you been lately? | I'm good, thanks.	لَمْ نَلْتَقِ مُنْذُ وَقْتٍ طَوِيلٍ! | نَعَمْ، كَيْفَ حَالُكَ مُؤَخَّرًا؟ | أَنَا بِخَيْرٍ، شُكْرًا.	Lam naltaqi mundhu waqtin ṭawīl! | Naʿam, kayfa ḥāluka muʾakhkharan? | Anā bikhayr, shukran.
h3x044	这只熊猫真胖！｜是啊，它每天吃很多东西。	This panda is so chubby! | Yeah, it eats a lot every day.	دُبُّ الْبَانْدَا هٰذَا سَمِينٌ جِدًّا! | نَعَمْ، يَأْكُلُ كَثِيرًا كُلَّ يَوْمٍ.	Dubbu al-bāndā hādhā samīnun jiddan! | Naʿam, yaʾkulu kathīran kulla yawm.
h3x055	你怎么了？｜我的腿走不动了。	What's wrong? | My legs can't walk any more.	مَا بِكَ؟ | رِجْلَايَ لَا تَسْتَطِيعَانِ الْمَشْيَ بَعْدَ الْآنَ.	Mā bik? | Rijlāya lā tastaṭīʿāni al-mashya baʿda al-ʾān.
```
