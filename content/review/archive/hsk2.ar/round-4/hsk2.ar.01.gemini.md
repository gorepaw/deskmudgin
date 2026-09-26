These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is **sentences** a creature says on its own. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.

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
h2p309	我就在这儿。	I'm right here.	هَا أَنَا هُنَا.	Hā anā hunā.
h2p362	他很高。	He is tall.	هُوَ طَوِيلٌ.	Huwa ṭawīl.
h2p374	我觉得有点儿冷。	I feel a little cold.	أَشْعُرُ بِالْبَرْدِ قَلِيلًا.	Ashʿuru bi-l-bardi qalīlan.
h2p402	大家一起唱吧！	Everyone, sing together!	لِنُغَنِّ جَمِيعًا!	Linughanni jamīʿan!
h2p407	你想吃米饭还是面条？	Do you want rice or noodles?	أَتُرِيدُ أَرُزًّا أَمْ نُودِلْزَ؟	Aturīdu aruzzan am nūdilz?
h2p429	我最不喜欢考试。	I like exams least of all.	أَقَلُّ مَا أُحِبُّهُ هُوَ الِامْتِحَانَاتُ.	Aqallu mā uḥibbuhu huwa al-imtiḥānāt.
h2p443	这个卖完了。	This is sold out.	نَفِدَ هٰذَا الصِّنْفُ.	Nafida hādhā aṣ-ṣinf.
```
