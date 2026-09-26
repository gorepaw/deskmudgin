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
x007	你在看什么？｜我在看你。	What are you looking at? | I'm looking at you.	إِلَى مَاذَا تَنْظُرُ؟ | أَنَا أَنْظُرُ إِلَيْكَ.	Ilā mādhā tanẓur? | Anā anẓuru ilayk.
x027	你喜欢吃中国菜吗？｜很喜欢！	Do you like Chinese food? | Very much!	هَلْ تُحِبُّ الطَّعَامَ الصِّينِيَّ؟ | أُحِبُّهُ كَثِيرًا!	Hal tuḥibbu aṭ-ṭaʿāma aṣ-ṣīniyy? | Uḥibbuhu kathīran!
x028	中午吃什么？｜吃米饭。	What's for lunch? | Rice.	مَاذَا نَأْكُلُ عَلَى الْغَدَاءِ؟ | أُرُزٌّ.	Mādhā naʾkulu ʿalā al-ghadāʾ? | Uruzz.
x029	你想睡觉吗？｜我很想睡觉。	Do you want to sleep? | I really want to sleep.	هَلْ تُرِيدُ أَنْ تَنَامَ؟ | أُرِيدُ أَنْ أَنَامَ بِشِدَّةٍ.	Hal turīdu an tanām? | Urīdu an anāma bishidda.
x040	这个多少钱？｜三块钱。｜太多了！	How much is this? | Three yuan. | That's too much!	بِكَمْ هٰذَا؟ | بِثَلَاثَةِ يُوَانَاتٍ. | هٰذَا كَثِيرٌ جِدًّا!	Bikam hādhā? | Bithalāthati yuwānāt. | Hādhā kathīrun jiddan!
x045	你会写这个字吗？｜我不会。	Can you write this character? | I can't.	هَلْ تَسْتَطِيعُ أَنْ تَكْتُبَ هٰذَا الْحَرْفَ الصِّينِيَّ؟ | لَا أَسْتَطِيعُ.	Hal tastaṭīʿu an taktuba hādhā al-ḥarfa aṣ-ṣīniyy? | Lā astaṭīʿ.
x047	今天是星期几？｜今天星期六。｜太好了！	What day is it today? | Today is Saturday. | Great!	أَيُّ يَوْمٍ هُوَ الْيَوْمُ؟ | الْيَوْمُ السَّبْتُ. | رَائِعٌ!	Ayyu yawmin huwa al-yawm? | Al-yawmu as-sabt. | Rāʾiʿ!
x051	你喜欢看书吗？｜喜欢，我爱看书。	Do you like reading? | Yes, I love reading.	هَلْ تُحِبُّ الْقِرَاءَةَ؟ | نَعَمْ، أُحِبُّ الْقِرَاءَةَ كَثِيرًا.	Hal tuḥibbu al-qirāʾa? | Naʿam, uḥibbu al-qirāʾata kathīran.
```
