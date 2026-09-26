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
h2p421	我喜欢它。	I like it.	أُحِبُّهُ.	Uḥibbuh.
h2p422	别看！	Don't look!	لَا تَنْظُرْ!	Lā tanẓur!
h2p423	你真的要走吗？	Are you really leaving?	هَلْ سَتَذْهَبُ حَقًّا؟	Hal satadhhabu ḥaqqan?
h2p424	我真的不知道。	I really don't know.	لَا أَعْرِفُ حَقًّا.	Lā aʿrifu ḥaqqan.
h2p425	这个真大！	This is really big!	هٰذَا كَبِيرٌ حَقًّا!	Hādhā kabīrun ḥaqqan!
h2p426	你真高！	You're really tall!	أَنْتَ طَوِيلٌ حَقًّا!	Anta ṭawīlun ḥaqqan!
h2p427	今天真冷！	It's really cold today!	الْجَوُّ بَارِدٌ جِدًّا الْيَوْمَ!	Al-jawwu bāridun jiddan al-yawm!
h2p428	你是我最好的朋友。	You're my best friend.	أَنْتَ أَفْضَلُ صَدِيقٍ لِي.	Anta afḍalu ṣadīqin lī.
h2p429	我最不喜欢考试。	I like exams least of all.	أَكْرَهُ اِمْتِحَانَاتٍ أَكْثَرَ مِنْ كُلِّ شَيْءٍ.	Akrahu imtiḥānātin akthara min kulli shayʾ.
h2p430	我准备了很多吃的。	I've prepared lots of food.	حَضَّرْتُ كَثِيرًا مِنَ الطَّعَامِ.	Ḥaḍḍartu kathīran mina aṭ-ṭaʿām.
h2p431	我希望能去中国。	I hope I can go to China.	أَتَمَنَّى أَنْ أَسْتَطِيعَ الذَّهَابَ إِلَى الصِّينِ.	Atamannā an astaṭīʿa adh-dhahāba ilā aṣ-ṣīn.
h2p432	他可能不来了。	He might not come.	رُبَّمَا لَا يَأْتِي.	Rubbamā lā yaʾtī.
h2p433	我可能错了。	I might be wrong.	رُبَّمَا أَكُونُ مُخْطِئًا.	Rubbamā akūnu mukhṭiʾan.
h2p434	我已经知道了。	I already know.	أَعْرِفُ ذٰلِكَ بِالْفِعْلِ.	Aʿrifu dhālika bi-l-fiʿl.
h2p435	已经十点了！	It's already ten o'clock!	السَّاعَةُ الْعَاشِرَةُ بِالْفِعْلِ!	As-sāʿatu al-ʿāshiratu bi-l-fiʿl!
h2p436	你在等谁？	Who are you waiting for?	مَنْ تَنْتَظِرُ؟	Man tantaẓir?
h2p437	你等我一下。	Wait for me a moment.	اِنْتَظِرْنِي لَحْظَةً.	Intaẓirnī laḥẓa.
h2p438	他在找你。	He's looking for you.	هُوَ يَبْحَثُ عَنْكَ.	Huwa yabḥathu ʿank.
h2p439	我找到了！	I found it!	وَجَدْتُهُ!	Wajadtuh!
h2p440	你找什么？	What are you looking for?	مَاذَا تَبْحَثُ عَنْهُ؟	Mādhā tabḥathu ʿanh?
h2p441	这儿的东西都很便宜。	Everything here is cheap.	كُلُّ الْأَشْيَاءِ هُنَا رَخِيصَةٌ.	Kullu al-ʾashyāʾi hunā rakhīṣa.
h2p442	西瓜怎么卖？	How much is the watermelon?	بِكَمِ الْبَطِّيخُ؟	Bikami al-baṭṭīkh?
h2p443	这个卖完了。	This is sold out.	بِيعَ هٰذَا كُلُّهُ.	Bīʿa hādhā kulluh.
h2p444	你会打篮球吗？	Can you play basketball?	هَلْ تُجِيدُ لَعِبَ كُرَةِ السَّلَّةِ؟	Hal tujīdu laʿiba kurati as-salla?
h2p445	我不会跳舞。	I can't dance.	لَا أُجِيدُ الرَّقْصَ.	Lā ujīdu ar-raqṣ.
h2p446	我身体很好。	I'm in good health.	صِحَّتِي جَيِّدَةٌ.	Ṣiḥḥatī jayyida.
h2p447	你要多运动。	You should exercise more.	يَجِبُ أَنْ تُمَارِسَ الرِّيَاضَةَ أَكْثَرَ.	Yajibu an tumārisa ar-riyāḍata akthar.
h2p448	跑步很累。	Running is tiring.	الْجَرْيُ مُتْعِبٌ.	Al-jaryu mutʿib.
h2p449	游泳很有意思。	Swimming is fun.	السِّبَاحَةُ مُمْتِعَةٌ.	As-sibāḥatu mumtiʿa.
```
