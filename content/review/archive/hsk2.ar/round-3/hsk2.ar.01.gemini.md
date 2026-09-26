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
h2p007	我们什么时候吃饭？还要等吗？	When do we eat? Do we still have to wait?	مَتَى نَأْكُلُ؟ هَلْ مَا زَالَ عَلَيْنَا أَنْ نَنْتَظِرَ؟	Matā naʾkul? Hal mā zāla ʿalaynā an nantaẓir?
h2p095	你给我的菜很好吃。	The food you gave me is very tasty.	الطَّعَامُ الَّذِي أَعْطَيْتَنِيهِ لَذِيذٌ جِدًّا.	Aṭ-ṭaʿāmu illadhī aʿṭaytanīhi ladhīdhun jiddan.
h2p107	明天早上见。	See you tomorrow morning.	أَرَاكَ غَدًا صَبَاحًا.	Arāka ghadan ṣabāḥan.
h2p135	我的孩子喜欢踢足球。	My child likes playing football.	طِفْلِي يُحِبُّ لَعِبَ كُرَةِ الْقَدَمِ.	Ṭiflī yuḥibbu laʿiba kurati al-qadam.
h2p165	你会游泳吗？	Can you swim?	هَلْ تُجِيدُ السِّبَاحَةَ؟	Hal tujīdu as-sibāḥa?
h2p187	我去年去了北京。	I went to Beijing last year.	ذَهَبْتُ إِلَى بِكِينَ الْعَامَ الْمَاضِي.	Dhahabtu ilā bikīna al-ʿāma al-māḍī.
h2p191	还有十分钟。	There are still ten minutes.	بَقِيَتْ عَشْرُ دَقَائِقَ.	Baqiyat ʿashru daqāʾiq.
h2p211	飞机票很贵。	Plane tickets are expensive.	تَذَاكِرُ الطَّائِرَةِ غَالِيَةٌ.	Tadhākiru aṭ-ṭāʾirati ghāliya.
h2p229	因为下雨，所以我没去。	Because it rained, I didn't go.	لِأَنَّ الْمَطَرَ هَطَلَ، فَلَمْ أَذْهَبْ.	Liʾanna al-maṭara haṭal, falam adhhab.
h2p230	虽然很累，但是我很高兴。	Although I'm tired, I'm happy.	مَعَ أَنِّي مُتْعَبٌ، إِلَّا أَنِّي سَعِيدٌ.	Maʿa annī mutʿab, illā annī saʿīd.
h2p231	虽然外面很冷，但是我想出去玩。	Although it's cold outside, I want to go out and play.	مَعَ أَنَّ الْجَوَّ بَارِدٌ فِي الْخَارِجِ، إِلَّا أَنِّي أُرِيدُ أَنْ أَخْرُجَ لِأَلْعَبَ.	Maʿa anna al-jawwa bāridun fī al-khārij, illā annī urīdu an akhruja liʾalʿab.
h2p236	他正在打电话。	He's on the phone right now.	هُوَ يَتَحَدَّثُ عَبْرَ الْهَاتِفِ الْآنَ.	Huwa yataḥaddathu ʿabra al-hātifi al-ʾān.
h2p245	我来介绍一下。	Let me make the introductions.	دَعُونِي أُعَرِّفْ بَعْضَكُمْ بِبَعْضٍ.	Daʿūnī uʿarrif baʿḍakum bibaʿḍ.
h2p250	你走得太快了！	You're walking too fast!	تَمْشِي أَسْرَعَ مِمَّا يَنْبَغِي!	Tamshī asraʿa mimmā yanbaghī!
h2p264	多喝水，多休息。	Drink lots of water and get lots of rest.	اِشْرَبْ مَاءً كَثِيرًا وَاسْتَرِحْ كَثِيرًا.	Ishrab māʾan kathīran wastariḥ kathīran.
h2p298	不可以！	No, you can't!	لَا، لَا يَجُوزُ ذٰلِكَ!	Lā, lā yajūzu dhālik!
h2p309	我就在这儿。	I'm right here.	أَنَا هُنَا تَمَامًا.	Anā hunā tamāman.
h2p323	你说话太快了。	You talk too fast.	تَتَكَلَّمُ أَسْرَعَ مِمَّا يَنْبَغِي.	Tatakallamu asraʿa mimmā yanbaghī.
h2p338	让我看看！	Let me see!	دَعْنِي أَرَ!	Daʿnī ar!
h2p361	这件衣服太长了。	This piece of clothing is too long.	هٰذَا الثَّوْبُ طَوِيلٌ أَكْثَرَ مِنَ اللَّازِمِ.	Hādhā ath-thawbu ṭawīlun akthara mina al-lāzim.
h2p362	他很高。	He is tall.	هُوَ طَوِيلٌ جِدًّا.	Huwa ṭawīlun jiddan.
h2p374	我觉得有点儿冷。	I feel a little cold.	أَشْعُرُ بِبَعْضِ الْبَرْدِ.	Ashʿuru bibaʿḍi al-bard.
h2p384	我想一下。	Let me think for a moment.	دَعْنِي أُفَكِّرْ لَحْظَةً.	Daʿnī ufakkir laḥẓa.
h2p402	大家一起唱吧！	Everyone, sing together!	غَنُّوا جَمِيعًا مَعًا!	Ghannū jamīʿan maʿan!
h2p406	我们去外面吃饭吧。	Let's eat out.	لِنَأْكُلْ خَارِجَ الْبَيْتِ.	Linaʾkul khārija al-bayt.
h2p407	你想吃米饭还是面条？	Do you want rice or noodles?	أَتُرِيدُ أَرُزًّا أَمْ مَعْكَرُونَةً؟	Aturīdu aruzzan am maʿkarūna?
h2p429	我最不喜欢考试。	I like exams least of all.	أَكْرَهُ الِامْتِحَانَاتِ أَكْثَرَ مِنْ أَيِّ شَيْءٍ.	Akrahu al-imtiḥānāti akthara min ayyi shayʾ.
h2p443	这个卖完了。	This is sold out.	نَفِدَ هٰذَا.	Nafida hādhā.
h2p447	你要多运动。	You should exercise more.	يَنْبَغِي أَنْ تُمَارِسَ الرِّيَاضَةَ أَكْثَرَ.	Yanbaghī an tumārisa ar-riyāḍata akthar.
```
