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
p122	我有很多朋友。	I have many friends.	عِنْدِي أَصْدِقَاءُ كَثِيرُونَ.	ʿIndī aṣdiqāʾu kathīrūn.
p123	我有三个朋友。	I have three friends.	عِنْدِي ثَلَاثَةُ أَصْدِقَاءَ.	ʿIndī thalāthatu aṣdiqāʾ.
p124	我家有五个人。	There are five people in my family.	فِي عَائِلَتِي خَمْسَةُ أَشْخَاصٍ.	Fī ʿāʾilatī khamsatu ashkhāṣ.
p125	我爸爸是医生。	My dad is a doctor.	أَبِي طَبِيبٌ.	Abī ṭabīb.
p126	我妈妈是老师。	My mom is a teacher.	أُمِّي مُعَلِّمَةٌ.	Ummī muʿallima.
p127	我是学生。	I'm a student.	أَنَا طَالِبٌ.	Anā ṭālib.
p128	我们是同学。	We are classmates.	نَحْنُ زُمَلَاءُ.	Naḥnu zumalāʾ.
p129	他是我的老师。	He is my teacher.	هُوَ مُعَلِّمِي.	Huwa muʿallimī.
p130	她是我的同学。	She is my classmate.	هِيَ زَمِيلَتِي.	Hiya zamīlatī.
p131	他是谁？	Who is he?	مَنْ هُوَ؟	Man huwa?
p132	她是谁？	Who is she?	مَنْ هِيَ؟	Man hiya?
p133	她很漂亮。	She is very pretty.	هِيَ جَمِيلَةٌ جِدًّا.	Hiya jamīlatun jiddan.
p134	他是中国人。	He is Chinese.	هُوَ صِينِيٌّ.	Huwa ṣīniyy.
p135	你是中国人吗？	Are you Chinese?	هَلْ أَنْتَ صِينِيٌّ؟	Hal anta ṣīniyy?
p136	我会说汉语。	I can speak Chinese.	أَسْتَطِيعُ أَنْ أَتَكَلَّمَ الصِّينِيَّةَ.	Astaṭīʿu an atakallama aṣ-ṣīniyya.
p137	我会说一点儿汉语。	I can speak a little Chinese.	أَسْتَطِيعُ أَنْ أَتَكَلَّمَ قَلِيلًا مِنَ الصِّينِيَّةِ.	Astaṭīʿu an atakallama qalīlan mina aṣ-ṣīniyya.
p138	你会说汉语吗？	Can you speak Chinese?	هَلْ تَسْتَطِيعُ أَنْ تَتَكَلَّمَ الصِّينِيَّةَ؟	Hal tastaṭīʿu an tatakallama aṣ-ṣīniyya?
p139	我在学习汉语。	I'm studying Chinese.	أَنَا أَتَعَلَّمُ الصِّينِيَّةَ.	Anā ataʿallamu aṣ-ṣīniyya.
p140	这个字怎么写？	How do you write this character?	كَيْفَ يُكْتَبُ هَٰذَا الْحَرْفُ؟	Kayfa yuktabu hādhā al-ḥarf?
p141	我会写这个字。	I can write this character.	أَسْتَطِيعُ أَنْ أَكْتُبَ هَٰذَا الْحَرْفَ.	Astaṭīʿu an aktuba hādhā al-ḥarf.
p142	我想去北京。	I want to go to Beijing.	أُرِيدُ أَنْ أَذْهَبَ إِلَى بِكِينَ.	Urīdu an adhhaba ilā bikīn.
p143	北京很大。	Beijing is very big.	بِكِينُ كَبِيرَةٌ جِدًّا.	Bikīnu kabīratun jiddan.
p144	我想去中国。	I want to go to China.	أُرِيدُ أَنْ أَذْهَبَ إِلَى الصِّينِ.	Urīdu an adhhaba ilā aṣ-ṣīn.
p145	中国很大。	China is very big.	الصِّينُ كَبِيرَةٌ جِدًّا.	Aṣ-ṣīnu kabīratun jiddan.
p146	我住在北京。	I live in Beijing.	أَسْكُنُ فِي بِكِينَ.	Askunu fī bikīn.
p147	你住在哪儿？	Where do you live?	أَيْنَ تَسْكُنُ؟	Ayna taskun?
p148	我坐飞机去北京。	I'm flying to Beijing.	أَذْهَبُ إِلَى بِكِينَ بِالطَّائِرَةِ.	Adhhabu ilā bikīna bi-ṭ-ṭāʾira.
p149	我坐出租车去。	I'll go by taxi.	سَأَذْهَبُ بِالتَّاكْسِي.	Saʾadhhabu bi-t-tāksī.
p150	我们去商店。	We're going to the shop.	نَذْهَبُ إِلَى الْمَتْجَرِ.	Nadhhabu ilā al-matjar.
p151	你想买什么？	What do you want to buy?	مَاذَا تُرِيدُ أَنْ تَشْتَرِيَ؟	Mādhā turīdu an tashtariy?
p152	我想买一本书。	I want to buy a book.	أُرِيدُ أَنْ أَشْتَرِيَ كِتَابًا.	Urīdu an ashtariya kitāban.
p153	我想买衣服。	I want to buy clothes.	أَنَا أُرِيدُ أَنْ أَشْتَرِيَ مَلَابِسَ.	Anā urīdu an ashtariya malābis.
p154	这个多少钱？	How much is this?	بِكَمْ هٰذَا؟	Bikam hādhā?
p155	三块钱。	Three yuan.	ثَلَاثَةُ يُوَانَاتٍ.	Thalāthatu yuwānāt.
p156	太多了！	That's too much!	كَثِيرٌ جِدًّا!	Kathīrun jiddan!
p157	我没有钱。	I don't have money.	لَيْسَ عِنْدِي مَالٌ.	Laysa ʿindī māl.
p158	我有一点儿钱。	I have a little money.	عِنْدِي قَلِيلٌ مِنَ الْمَالِ.	ʿIndī qalīlun mina al-māl.
p159	我喜欢猫。	I like cats.	أُحِبُّ الْقِطَطَ.	Uḥibbu al-qiṭaṭ.
p160	我喜欢狗。	I like dogs.	أُحِبُّ الْكِلَابَ.	Uḥibbu al-kilāb.
p161	猫在桌子下面。	The cat is under the table.	الْقِطُّ تَحْتَ الطَّاوِلَةِ.	Al-qiṭṭu taḥta aṭ-ṭāwila.
p162	狗在椅子上。	The dog is on the chair.	الْكَلْبُ عَلَى الْكُرْسِيِّ.	Al-kalbu ʿalā al-kursiyy.
p163	书在桌子上。	The book is on the table.	الْكِتَابُ عَلَى الطَّاوِلَةِ.	Al-kitābu ʿalā aṭ-ṭāwila.
p164	你看见我的书了吗？	Have you seen my book?	هَلْ رَأَيْتَ كِتَابِي؟	Hal raʾayta kitābī?
p165	我在看书。	I'm reading a book.	أَنَا أَقْرَأُ كِتَابًا.	Anā aqraʾu kitāban.
p166	我喜欢看书。	I like reading.	أُحِبُّ الْقِرَاءَةَ.	Uḥibbu al-qirāʾa.
p167	我喜欢看电影。	I like watching films.	أُحِبُّ مُشَاهَدَةَ الْأَفْلَامِ.	Uḥibbu mushāhadata al-ʾaflām.
p168	我们去看电影。	We're going to see a film.	نَحْنُ نَذْهَبُ لِمُشَاهَدَةِ فِيلْمٍ.	Naḥnu nadhhabu limushāhadati fīlm.
p169	你喜欢看电视吗？	Do you like watching TV?	هَلْ تُحِبُّ مُشَاهَدَةَ التِّلْفَازِ؟	Hal tuḥibbu mushāhadata at-tilfāz?
p170	我在看电视。	I'm watching TV.	أَنَا أُشَاهِدُ التِّلْفَازَ.	Anā ushāhidu at-tilfāz.
p171	电脑在哪儿？	Where is the computer?	أَيْنَ الْحَاسُوبُ؟	Ayna al-ḥāsūb?
p172	我想打电话。	I want to make a phone call.	أُرِيدُ أَنْ أَتَّصِلَ بِالْهَاتِفِ.	Urīdu an attaṣila bi-l-hātif.
p173	请坐。	Please sit.	اِجْلِسْ مِنْ فَضْلِكَ.	Ijlis min faḍlik.
p174	请喝茶。	Please have some tea.	اِشْرَبْ شَايًا مِنْ فَضْلِكَ.	Ishrab shāyan min faḍlik.
p175	你喝什么？	What would you like to drink?	مَاذَا تَشْرَبُ؟	Mādhā tashrab?
p176	我喝水。	I'll drink water.	سَأَشْرَبُ مَاءً.	Saʾashrabu māʾ.
p177	我喜欢喝茶。	I like drinking tea.	أُحِبُّ شُرْبَ الشَّايِ.	Uḥibbu shurba ash-shāy.
p178	我想回家。	I want to go home.	أُرِيدُ أَنْ أَعُودَ إِلَى الْبَيْتِ.	Urīdu an aʿūda ilā al-bayt.
p179	他去医院了。	He went to the hospital.	ذَهَبَ إِلَى الْمُسْتَشْفَى.	Dhahaba ilā al-mustashfā.
p180	她是医生。	She is a doctor.	هِيَ طَبِيبَةٌ.	Hiya ṭabība.
p181	我不认识他。	I don't know him.	لَا أَعْرِفُهُ.	Lā aʿrifuh.
```
