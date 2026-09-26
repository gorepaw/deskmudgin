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
p243	那个商店很大。	That shop is very big.	ذٰلِكَ الْمَتْجَرُ كَبِيرٌ جِدًّا.	Dhālika al-matjaru kabīrun jiddan.
p244	医院在学校后面。	The hospital is behind the school.	الْمُسْتَشْفَى خَلْفَ الْمَدْرَسَةِ.	Al-mustashfā khalfa al-madrasa.
p245	商店在前面。	The shop is up ahead.	الْمَتْجَرُ فِي الْأَمَامِ.	Al-matjaru fī al-ʾamām.
p246	你家在哪儿？	Where is your home?	أَيْنَ بَيْتُكَ؟	Ayna baytuk?
p247	我的家很小。	My home is very small.	بَيْتِي صَغِيرٌ جِدًّا.	Baytī ṣaghīrun jiddan.
p248	我想认识你。	I'd like to get to know you.	أُرِيدُ أَنْ أَتَعَرَّفَ عَلَيْكَ.	Urīdu an ataʿarrafa ʿalayk.
p249	你说什么？	What did you say?	مَاذَا قُلْتَ؟	Mādhā qult?
p250	你听！	Listen!	اِسْمَعْ!	Ismaʿ!
p251	我在听。	I'm listening.	أَنَا أَسْتَمِعُ.	Anā astamiʿ.
p252	你想去哪儿？	Where do you want to go?	إِلَى أَيْنَ تُرِيدُ أَنْ تَذْهَبَ؟	Ilā ayna turīdu an tadhhab?
p253	我们去哪儿吃饭？	Where shall we eat?	إِلَى أَيْنَ نَذْهَبُ لِنَأْكُلَ؟	Ilā ayna nadhhabu linaʾkul?
p254	这个饭店很好。	This restaurant is very good.	هٰذَا الْمَطْعَمُ جَيِّدٌ جِدًّا.	Hādhā al-maṭʿamu jayyidun jiddan.
p255	我们去那个饭店。	We're going to that restaurant.	نَذْهَبُ إِلَى ذٰلِكَ الْمَطْعَمِ.	Nadhhabu ilā dhālika al-maṭʿam.
p256	我想吃中国菜。	I want to eat Chinese food.	أُرِيدُ أَنْ آكُلَ طَعَامًا صِينِيًّا.	Urīdu an ākula ṭaʿāman ṣīniyyan.
p257	中国菜很好吃。	Chinese food is very tasty.	الطَّعَامُ الصِّينِيُّ لَذِيذٌ جِدًّا.	Aṭ-ṭaʿāmu aṣ-ṣīniyyu ladhīdhun jiddan.
p258	你喜欢吃什么菜？	What dishes do you like?	أَيَّ طَعَامٍ تُحِبُّ؟	Ayya ṭaʿāmin tuḥibb?
p259	我不喜欢吃苹果。	I don't like eating apples.	لَا أُحِبُّ أَكْلَ التُّفَّاحِ.	Lā uḥibbu akla at-tuffāḥ.
p260	这是谁的书？	Whose book is this?	كِتَابُ مَنْ هٰذَا؟	Kitābu man hādhā?
p261	这是我的书。	This is my book.	هٰذَا كِتَابِي.	Hādhā kitābī.
p262	那不是我的。	That's not mine.	ذٰلِكَ لَيْسَ لِي.	Dhālika laysa lī.
p263	这是你的吗？	Is this yours?	هَلْ هٰذَا لَكَ؟	Hal hādhā lak?
p264	我是你的朋友吗？	Am I your friend?	هَلْ أَنَا صَدِيقُكَ؟	Hal anā ṣadīquk?
p265	你是老师吗？	Are you a teacher?	هَلْ أَنْتَ مُعَلِّمٌ؟	Hal anta muʿallim?
p266	我不是老师。	I'm not a teacher.	لَسْتُ مُعَلِّمًا.	Lastu muʿalliman.
p267	今天星期一。	Today is Monday.	الْيَوْمُ يَوْمُ الِاثْنَيْنِ.	Al-yawmu yawmu al-ithnayn.
p268	明天星期六。	Tomorrow is Saturday.	غَدًا يَوْمُ السَّبْتِ.	Ghadan yawmu as-sabt.
p269	九月很热。	September is very hot.	الشَّهْرُ التَّاسِعُ حَارٌّ جِدًّا.	Ash-shahru at-tāsiʿu ḥārrun jiddan.
p270	十二月很冷。	December is very cold.	الشَّهْرُ الثَّانِي عَشَرَ بَارِدٌ جِدًّا.	Ash-shahru ath-thānī ʿashara bāridun jiddan.
p271	我明年去中国。	I'm going to China next year.	أَذْهَبُ إِلَى الصِّينِ الْعَامَ الْقَادِمَ.	Adhhabu ilā aṣ-ṣīni al-ʿāma al-qādim.
p272	我去年在北京。	I was in Beijing last year.	كُنْتُ فِي بِكِينَ الْعَامَ الْمَاضِيَ.	Kuntu fī bikīna al-ʿāma al-māḍiy.
p273	我很喜欢我的老师。	I really like my teacher.	أُحِبُّ مُعَلِّمِي كَثِيرًا.	Uḥibbu muʿallimī kathīran.
p274	我们的老师很好。	Our teacher is very good.	مُعَلِّمُنَا جَيِّدٌ جِدًّا.	Muʿallimunā jayyidun jiddan.
p275	我在写字。	I'm writing characters.	أَنَا أَكْتُبُ حُرُوفًا.	Anā aktubu ḥurūfan.
p276	多少个？	How many?	كَمْ؟	Kam?
p277	多少人？	How many people?	كَمْ شَخْصًا؟	Kam shakhṣan?
p278	有很多人。	There are lots of people.	هُنَاكَ كَثِيرٌ مِنَ النَّاسِ.	Hunāka kathīrun mina an-nās.
p279	没有人。	There's nobody.	لَا أَحَدَ هُنَاكَ.	Lā aḥada hunāk.
p280	我什么都没有。	I don't have anything.	لَا أَمْلِكُ شَيْئًا.	Lā amliku shayʾan.
p281	你什么时候来？	When are you coming?	مَتَى تَأْتِي؟	Matā taʾtī?
p282	我现在来。	I'm coming now.	أَنَا آتٍ الْآنَ.	Anā ātin al-ʾān.
p283	我明天来。	I'll come tomorrow.	سَآتِي غَدًا.	Saʾātī ghadan.
p284	他没有来。	He didn't come.	لَمْ يَأْتِ.	Lam yaʾt.
p285	请来我家。	Please come to my home.	تَعَالَ إِلَى بَيْتِي مِنْ فَضْلِكَ.	Taʿāla ilā baytī min faḍlik.
p286	我能坐这儿吗？	Can I sit here?	هَلْ أَسْتَطِيعُ الْجُلُوسَ هُنَا؟	Hal astaṭīʿu al-julūsa hunā?
p287	请坐这儿。	Please sit here.	اِجْلِسْ هُنَا مِنْ فَضْلِكَ.	Ijlis hunā min faḍlik.
p288	我坐在椅子上。	I'm sitting on the chair.	أَجْلِسُ عَلَى الْكُرْسِيِّ.	Ajlisu ʿalā al-kursiyy.
p289	他坐在我后面。	He's sitting behind me.	يَجْلِسُ خَلْفِي.	Yajlisu khalfī.
p290	这个苹果很大。	This apple is very big.	هٰذِهِ التُّفَّاحَةُ كَبِيرَةٌ جِدًّا.	Hādhihi at-tuffāḥatu kabīratun jiddan.
p291	那个苹果很小。	That apple is very small.	تِلْكَ التُّفَّاحَةُ صَغِيرَةٌ جِدًّا.	Tilka at-tuffāḥatu ṣaghīratun jiddan.
p292	我不想说。	I'd rather not say.	لَا أُرِيدُ أَنْ أَقُولَ.	Lā urīdu an aqūl.
p293	你能来吗？	Can you come?	هَلْ تَسْتَطِيعُ أَنْ تَأْتِيَ؟	Hal tastaṭīʿu an taʾtiy?
p294	我不能来。	I can't come.	لَا أَسْتَطِيعُ أَنْ آتِيَ.	Lā astaṭīʿu an ātiy.
p295	没有了。	There's none left.	لَمْ يَبْقَ شَيْءٌ.	Lam yabqa shayʾ.
p296	好的。	Okay.	حَسَنًا.	Ḥasanan.
p297	是的。	Yes.	نَعَمْ.	Naʿam.
p298	不是。	No, it isn't.	لَا.	Lā.
p299	对不起，我不认识你。	Sorry, I don't know you.	آسِفٌ، لَا أَعْرِفُكَ.	Āsif, lā aʿrifuk.
p300	我爱中国菜。	I love Chinese food.	أُحِبُّ الطَّعَامَ الصِّينِيَّ.	Uḥibbu aṭ-ṭaʿāma aṣ-ṣīniyy.
p301	我爱喝茶。	I love drinking tea.	أُحِبُّ شُرْبَ الشَّايِ.	Uḥibbu shurba ash-shāy.
p302	我爱看书。	I love reading.	أُحِبُّ الْقِرَاءَةَ.	Uḥibbu al-qirāʾa.
```
