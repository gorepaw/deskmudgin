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
h2x004	你好，你姓什么？｜我姓高，你呢？｜我姓白。	Hello, what's your surname? | My surname is Gao, and yours? | My surname is Bai.	مَرْحَبًا، مَا اسْمُ عَائِلَتِكَ؟ | اسْمُ عَائِلَتِي غَاو، وَأَنْتَ؟ | اسْمُ عَائِلَتِي بَاي.	Marḥaban, mā ismu ʿāʾilatik? | Ismu ʿāʾilatī ghāw, waʾant? | Ismu ʿāʾilatī bāy.
h2x016	这个多少钱？｜很便宜，三块钱。｜太好了，我买一个。	How much is this? | It's cheap, three yuan. | Great, I'll buy one.	بِكَمْ هٰذَا؟ | إِنَّهُ رَخِيصٌ، بِثَلَاثَةِ يُوَانَاتٍ. | رَائِعٌ، سَأَشْتَرِي وَاحِدًا.	Bikam hādhā? | Innahu rakhīṣ, bithalāthati yuwānāt. | Rāʾiʿ, saʾashtarī wāḥidan.
h2x029	下雨了，我们回家吧。｜好，我们等一下再走。	It's raining, let's go home. | Okay, let's wait a bit and then go.	إِنَّهَا تُمْطِرُ، لِنَعُدْ إِلَى الْبَيْتِ. | حَسَنًا، لِنَنْتَظِرْ قَلِيلًا ثُمَّ نَذْهَبْ.	Innahā tumṭir, linaʿud ilā al-bayt. | Ḥasanan, linantaẓir qalīlan thumma nadhhab.
h2x046	这件衣服多少钱？｜不贵，很便宜。｜太好了，我买了。	How much is this piece of clothing? | Not expensive, it's cheap. | Great, I'll buy it.	بِكَمْ هٰذَا الثَّوْبُ؟ | لَيْسَ غَالِيًا، إِنَّهُ رَخِيصٌ. | رَائِعٌ، سَأَشْتَرِيهِ.	Bikam hādhā ath-thawb? | Laysa ghāliyan, innahu rakhīṣ. | Rāʾiʿ, saʾashtarīh.
h2x059	你在找什么？｜我在找我的手机，你看见了吗？｜没看见。	What are you looking for? | I'm looking for my phone, have you seen it? | No, I haven't.	عَنْ مَاذَا تَبْحَثُ؟ | أَبْحَثُ عَنْ هَاتِفِي، هَلْ رَأَيْتَهُ؟ | لَمْ أَرَهُ.	ʿAn mādhā tabḥath? | Abḥathu ʿan hātifī, hal raʾaytah? | Lam arah.
```
