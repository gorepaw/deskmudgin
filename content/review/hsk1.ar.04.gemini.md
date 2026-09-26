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
p182	你认识她吗？	Do you know her?	هَلْ تَعْرِفُهَا؟	Hal taʿrifuhā?
p183	明天我去学校。	Tomorrow I'm going to school.	غَدًا أَذْهَبُ إِلَى الْمَدْرَسَةِ.	Ghadan adhhabu ilā al-madrasa.
p184	我们都是朋友。	We are all friends.	نَحْنُ جَمِيعًا أَصْدِقَاءُ.	Naḥnu jamīʿan aṣdiqāʾ.
p185	我们都很好。	We are all fine.	نَحْنُ جَمِيعًا بِخَيْرٍ.	Naḥnu jamīʿan bikhayr.
p186	昨天我很高兴。	I was very happy yesterday.	كُنْتُ سَعِيدًا جِدًّا أَمْسِ.	Kuntu saʿīdan jiddan ams.
p187	我在家。	I'm at home.	أَنَا فِي الْبَيْتِ.	Anā fī al-bayt.
p188	我在学校。	I'm at school.	أَنَا فِي الْمَدْرَسَةِ.	Anā fī al-madrasa.
p189	一，二，三！	One, two, three!	وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ!	Wāḥid, ithnān, thalātha!
p190	四，五，六！	Four, five, six!	أَرْبَعَةٌ، خَمْسَةٌ، سِتَّةٌ!	Arbaʿa, khamsa, sitta!
p191	七，八，九，十！	Seven, eight, nine, ten!	سَبْعَةٌ، ثَمَانِيَةٌ، تِسْعَةٌ، عَشَرَةٌ!	Sabʿa, thamāniya, tisʿa, ʿashara!
p192	我有十个苹果。	I have ten apples.	عِنْدِي عَشْرُ تُفَّاحَاتٍ.	ʿIndī ʿashru tuffāḥāt.
p193	我想吃八个苹果。	I want to eat eight apples.	أُرِيدُ أَنْ آكُلَ ثَمَانِيَ تُفَّاحَاتٍ.	Urīdu an ākula thamāniya tuffāḥāt.
p194	你有几个苹果？	How many apples do you have?	كَمْ تُفَّاحَةً عِنْدَكَ؟	Kam tuffāḥatan ʿindak?
p195	这是我的桌子。	This is my table.	هٰذِهِ طَاوِلَتِي.	Hādhihi ṭāwilatī.
p196	那是你的椅子。	That is your chair.	ذٰلِكَ كُرْسِيُّكَ.	Dhālika kursiyyuk.
p197	这些是什么？	What are these?	مَا هٰذِهِ؟	Mā hādhih?
p198	那些是我的书。	Those are my books.	تِلْكَ كُتُبِي.	Tilka kutubī.
p199	你喜欢什么？	What do you like?	مَاذَا تُحِبُّ؟	Mādhā tuḥibb?
p200	我喜欢水果。	I like fruit.	أُحِبُّ الْفَوَاكِهَ.	Uḥibbu al-fawākih.
p201	这个很大。	This is very big.	هٰذَا كَبِيرٌ جِدًّا.	Hādhā kabīrun jiddan.
p202	那个很小。	That one is very small.	ذٰلِكَ صَغِيرٌ جِدًّا.	Dhālika ṣaghīrun jiddan.
p203	我很小。	I'm very small.	أَنَا صَغِيرٌ جِدًّا.	Anā ṣaghīrun jiddan.
p204	你很大。	You're very big.	أَنْتَ كَبِيرٌ جِدًّا.	Anta kabīrun jiddan.
p205	这是一个杯子。	This is a cup.	هٰذَا كُوبٌ.	Hādhā kūb.
p206	请喝一杯茶。	Please have a cup of tea.	اِشْرَبْ كُوبًا مِنَ الشَّايِ مِنْ فَضْلِكَ.	Ishrab kūban mina ash-shāyi min faḍlik.
p207	我想喝一杯水。	I want a glass of water.	أُرِيدُ أَنْ أَشْرَبَ كُوبًا مِنَ الْمَاءِ.	Urīdu an ashraba kūban mina al-māʾ.
p208	他在工作。	He is working.	هُوَ يَعْمَلُ.	Huwa yaʿmal.
p209	她在学习。	She is studying.	هِيَ تَدْرُسُ.	Hiya tadrus.
p210	我妈妈在做饭。	My mom is cooking.	أُمِّي تَطْبُخُ.	Ummī taṭbukh.
p211	我下午工作。	I work in the afternoon.	أَعْمَلُ بَعْدَ الظُّهْرِ.	Aʿmalu baʿda aẓ-ẓuhr.
p212	中午我在家吃饭。	I eat at home at noon.	فِي الظُّهْرِ آكُلُ فِي الْبَيْتِ.	Fī aẓ-ẓuhri ākulu fī al-bayt.
p213	他们是谁？	Who are they?	مَنْ هُمْ؟	Man hum?
p214	他们是我的朋友。	They are my friends.	هُمْ أَصْدِقَائِي.	Hum aṣdiqāʾī.
p215	我有一个女儿。	I have a daughter.	عِنْدِي بِنْتٌ.	ʿIndī bint.
p216	他有一个儿子。	He has a son.	عِنْدَهُ اِبْنٌ.	ʿIndahu ibn.
p217	先生，你好！	Hello, sir!	يَا سَيِّدِي، مَرْحَبًا!	Yā sayyidī, marḥaban!
p218	小姐，你好！	Hello, miss!	يَا آنِسَةُ، مَرْحَبًا!	Yā ānisa, marḥaban!
p219	你们好！	Hello, everyone!	مَرْحَبًا بِكُمْ جَمِيعًا!	Marḥaban bikum jamīʿan!
p220	我喜欢你的衣服。	I like your clothes.	أُحِبُّ مَلَابِسَكَ.	Uḥibbu malābisak.
p221	你的衣服很漂亮。	Your clothes are very pretty.	مَلَابِسُكَ جَمِيلَةٌ جِدًّا.	Malābisuka jamīlatun jiddan.
p222	这个星期我很高兴。	I'm very happy this week.	أَنَا سَعِيدٌ جِدًّا هٰذَا الْأُسْبُوعَ.	Anā saʿīdun jiddan hādhā al-ʾusbūʿ.
p223	我明天不工作。	I'm not working tomorrow.	لَا أَعْمَلُ غَدًا.	Lā aʿmalu ghadan.
p224	我能看电视吗？	Can I watch TV?	هَلْ أَسْتَطِيعُ مُشَاهَدَةَ التِّلْفَازِ؟	Hal astaṭīʿu mushāhadata at-tilfāz?
p225	你能看见我吗？	Can you see me?	هَلْ تَسْتَطِيعُ أَنْ تَرَانِي؟	Hal tastaṭīʿu an tarānī?
p226	我看见你了！	I see you!	رَأَيْتُكَ!	Raʾaytuk!
p227	我想看看。	I want to have a look.	أُرِيدُ أَنْ أُلْقِيَ نَظْرَةً.	Urīdu an ulqiya naẓra.
p228	我不会写这个字。	I can't write this character.	لَا أَسْتَطِيعُ كِتَابَةَ هٰذَا الْحَرْفِ.	Lā astaṭīʿu kitābata hādhā al-ḥarf.
p229	你会做饭吗？	Can you cook?	هَلْ تَسْتَطِيعُ الطَّبْخَ؟	Hal tastaṭīʿu aṭ-ṭabkh?
p231	他什么时候回来？	When is he coming back?	مَتَى يَعُودُ؟	Matā yaʿūd?
p232	我想和你说汉语。	I want to speak Chinese with you.	أُرِيدُ أَنْ أَتَحَدَّثَ مَعَكَ بِاللُّغَةِ الصِّينِيَّةِ.	Urīdu an ataḥaddatha maʿaka bi-l-lughati aṣ-ṣīniyya.
p233	我和我的朋友去商店。	My friend and I are going to the shop.	أَذْهَبُ أَنَا وَصَدِيقِي إِلَى الْمَتْجَرِ.	Adhhabu anā waṣadīqī ilā al-matjar.
p234	猫和狗都很好。	Cats and dogs are both nice.	الْقِطَطُ وَالْكِلَابُ لَطِيفَةٌ جِدًّا.	Al-qiṭaṭu wa-l-kilābu laṭīfatun jiddan.
p235	我不太喜欢这个。	I don't really like this.	لَا أُحِبُّ هٰذَا كَثِيرًا.	Lā uḥibbu hādhā kathīran.
p236	太热了！	It's too hot!	حَارٌّ جِدًّا!	Ḥārrun jiddan!
p237	太冷了！	It's too cold!	بَارِدٌ جِدًّا!	Bāridun jiddan!
p238	太大了！	It's too big!	كَبِيرٌ جِدًّا!	Kabīrun jiddan!
p239	太小了！	It's too small!	صَغِيرٌ جِدًّا!	Ṣaghīrun jiddan!
p240	太少了！	That's too little!	قَلِيلٌ جِدًّا!	Qalīlun jiddan!
p241	我很爱我的家。	I love my family very much.	أُحِبُّ عَائِلَتِي كَثِيرًا.	Uḥibbu ʿāʾilatī kathīran.
p242	你喜欢北京吗？	Do you like Beijing?	هَلْ تُحِبُّ بِكِينَ؟	Hal tuḥibbu bikīn?
```
