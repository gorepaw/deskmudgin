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
h3p308	你喜欢数学吗？我不太喜欢。	Do you like maths? I don't really.	هَلْ تُحِبُّ الرِّيَاضِيَّاتِ؟ لَا أُحِبُّهَا كَثِيرًا.	Hal tuḥibbu ar-riyāḍiyyāt? Lā uḥibbuhā kathīran.
h3p309	我不会做数学题。	I can't do maths problems.	لَا أَعْرِفُ حَلَّ مَسَائِلِ الرِّيَاضِيَّاتِ.	Lā aʿrifu ḥalla masāʾili ar-riyāḍiyyāt.
h3p310	你刷牙了吗？	Did you brush your teeth?	هَلْ غَسَلْتَ أَسْنَانَكَ؟	Hal ghasalta asnānak?
h3p311	我今天还没刷牙。	I haven't brushed my teeth yet today.	لَمْ أَغْسِلْ أَسْنَانِي الْيَوْمَ بَعْدُ.	Lam aghsil asnānī al-yawma baʿd.
h3p312	你有两双新鞋，真好！	You have two new pairs of shoes. How nice!	عِنْدَكَ زَوْجَانِ مِنَ الْأَحْذِيَةِ الْجَدِيدَةِ، رَائِعٌ!	ʿIndaka zawjāni mina al-ʾaḥdhiyati al-jadīda, rāʾiʿ!
h3p313	我的水平还不高，要多练习。	My level isn't high yet. I need to practise more.	لَمْ أَصِلْ إِلَى مُسْتَوًى عَالٍ بَعْدُ، عَلَيَّ أَنْ أَتَدَرَّبَ أَكْثَرَ.	Lam aṣil ilā mustawan ʿālin baʿd, ʿalayya an atadarraba akthar.
h3p314	那位司机开车很快。	That driver drives fast.	ذٰلِكَ السَّائِقُ يَقُودُ بِسُرْعَةٍ.	Dhālika as-sāʾiqu yaqūdu bisurʿa.
h3p315	太阳出来了，好热！	The sun is out. So hot!	خَرَجَتِ الشَّمْسُ، الْجَوُّ حَارٌّ جِدًّا!	Kharajati ash-shams, al-jawwu ḥārrun jiddan!
h3p316	我喜欢在太阳下睡觉。	I like sleeping in the sun.	أُحِبُّ أَنْ أَنَامَ تَحْتَ الشَّمْسِ.	Uḥibbu an anāma taḥta ash-shams.
h3p317	今天特别开心！	I'm especially happy today!	أَنَا سَعِيدٌ جِدًّا الْيَوْمَ!	Anā saʿīdun jiddan al-yawm!
h3p318	我特别想吃面条。	I really want some noodles.	أُرِيدُ أَنْ آكُلَ نُودِلْزَ كَثِيرًا.	Urīdu an ākula nūdilza kathīran.
h3p319	你今天特别好看。	You look extra nice today.	تَبْدُو جَمِيلًا جِدًّا الْيَوْمَ.	Tabdū jamīlan jiddan al-yawm.
h3p320	我的头有点儿疼。	My head hurts a little.	رَأْسِي يُؤْلِمُنِي قَلِيلًا.	Raʾsī yuʾlimunī qalīlan.
h3p321	别放手！我会疼的！	Don't let go! It'll hurt!	لَا تُفْلِتْنِي! سَأَتَأَلَّمُ!	Lā tuflitnī! Saʾataʾallam!
h3p322	你想提高汉语水平吗？	Do you want to improve your Chinese?	هَلْ تُرِيدُ أَنْ تُحَسِّنَ لُغَتَكَ الصِّينِيَّةَ؟	Hal turīdu an tuḥassina lughataka aṣ-ṣīniyya?
h3p323	我想提高我的水平。	I want to improve my level.	أُرِيدُ أَنْ أَتَحَسَّنَ.	Urīdu an ataḥassan.
h3p324	你喜欢上体育课吗？	Do you like PE class?	هَلْ تُحِبُّ حِصَّةَ الرِّيَاضَةِ؟	Hal tuḥibbu ḥiṣṣata ar-riyāḍa?
h3p325	你喜欢体育吗？我们一起运动吧。	Do you like sports? Let us exercise together.	هَلْ تُحِبُّ الرِّيَاضَةَ؟ لِنَتَمَرَّنْ مَعًا.	Hal tuḥibbu ar-riyāḍa? Linatamarran maʿan.
h3p326	这个苹果真甜！	This apple is so sweet!	هٰذِهِ التُّفَّاحَةُ حُلْوَةٌ جِدًّا!	Hādhihi at-tuffāḥatu ḥulwatun jiddan!
h3p327	好甜啊，我还想吃！	So sweet. I want more!	حُلْوَةٌ جِدًّا، أُرِيدُ الْمَزِيدَ!	Ḥulwatun jiddan, urīdu al-mazīd!
h3p328	你有没有一条新裙子？	Do you have a new skirt?	هَلْ عِنْدَكَ تَنُّورَةٌ جَدِيدَةٌ؟	Hal ʿindaka tannūratun jadīda?
h3p329	有一条小鱼在水里游。	There is a little fish swimming in the water.	سَمَكَةٌ صَغِيرَةٌ تَسْبَحُ فِي الْمَاءِ.	Samakatun ṣaghīratun tasbaḥu fī al-māʾ.
h3p330	你的同事对你好吗？	Are your colleagues good to you?	هَلْ زُمَلَاؤُكَ فِي الْعَمَلِ طَيِّبُونَ مَعَكَ؟	Hal zumalāʾuka fī al-ʿamali ṭayyibūna maʿak?
h3p331	你同事今天来了吗？	Did your colleague come in today?	هَلْ جَاءَ زَمِيلُكَ الْيَوْمَ؟	Hal jāʾa zamīluka al-yawm?
h3p332	我同意你说的。	I agree with what you said.	أُوَافِقُكَ عَلَى مَا قُلْتَ.	Uwāfiquka ʿalā mā qult.
h3p333	你同意我出去玩吗？	Do you agree to let me go out and play?	هَلْ تُوَافِقُ عَلَى أَنْ أَخْرُجَ لِأَلْعَبَ؟	Hal tuwāfiqu ʿalā an akhruja liʾalʿab?
h3p334	你的头发好长啊！	Your hair is so long!	مَا أَطْوَلَ شَعْرَكَ!	Mā aṭwala shaʿrak!
h3p335	我的头发是绿色的，好看吗？	My hair is green. Is it nice?	شَعْرِي أَخْضَرُ، هَلْ هُوَ جَمِيلٌ؟	Shaʿrī akhḍar, hal huwa jamīl?
h3p336	外面突然黑了。	It suddenly got dark outside.	أَظْلَمَ الْجَوُّ فِي الْخَارِجِ فَجْأَةً.	Aẓlama al-jawwu fī al-khāriji fajʾa.
h3p337	我突然想睡觉了。	I suddenly feel like sleeping.	شَعَرْتُ بِالنُّعَاسِ فَجْأَةً.	Shaʿartu bi-n-nuʿāsi fajʾa.
h3p338	突然有人拿起了我！	Suddenly somebody picked me up!	فَجْأَةً رَفَعَنِي أَحَدٌ!	Fajʾatan rafaʿanī aḥad!
h3p339	你要去图书馆吗？	Are you going to the library?	هَلْ سَتَذْهَبُ إِلَى الْمَكْتَبَةِ؟	Hal satadhhabu ilā al-maktaba?
h3p340	图书馆里很安静。	It's very quiet in the library.	الْمَكْتَبَةُ هَادِئَةٌ جِدًّا.	Al-maktabatu hādiʾatun jiddan.
h3p341	我的腿好累。	My legs are so tired.	سَاقَايَ مُتْعَبَتَانِ جِدًّا.	Sāqāya mutʿabatāni jiddan.
h3p342	我的腿太短了，跑不快。	My legs are too short. I can't run fast.	سَاقَايَ قَصِيرَتَانِ جِدًّا، لَا أَسْتَطِيعُ أَنْ أَرْكُضَ بِسُرْعَةٍ.	Sāqāya qaṣīratāni jiddan, lā astaṭīʿu an arkuḍa bisurʿa.
h3p343	你完成作业了吗？	Did you finish your homework?	هَلْ أَنْهَيْتَ وَاجِبَكَ؟	Hal anhayta wājibak?
h3p344	我完成了今天的练习！	I finished today's practice!	أَنْهَيْتُ تَمْرِينَ الْيَوْمِ!	Anhaytu tamrīna al-yawm!
h3p345	我要一碗热的面条。	I'd like a bowl of hot noodles.	أُرِيدُ صَحْنًا سَاخِنًا مِنَ النُّودِلْزِ.	Urīdu ṣaḥnan sākhinan mina an-nūdilz.
h3p346	这碗饭真好吃！	This bowl of rice is so tasty!	هٰذَا الْأُرْزُ لَذِيذٌ جِدًّا!	Hādhā al-ʾurzu ladhīdhun jiddan!
h3p348	我等了你一万年！	I've waited ten thousand years for you!	اِنْتَظَرْتُكَ عَشَرَةَ آلَافِ سَنَةٍ!	Intaẓartuka ʿasharata ālāfi sana!
h3p349	我的裙子是绿色的，你喜欢吗？	My skirt is green. Do you like it?	تَنُّورَتِي خَضْرَاءُ، هَلْ تُعْجِبُكَ؟	Tannūratī khaḍrāʾ, hal tuʿjibuk?
h3p350	我又忘记你的名字了，对不起。	I forgot your name again, sorry.	نَسِيتُ اِسْمَكَ مَرَّةً أُخْرَى، آسِفٌ.	Nasītu ismaka marratan ukhrā, āsif.
h3p351	别忘记给我吃的。	Don't forget to give me something to eat!	لَا تَنْسَ أَنْ تُعْطِيَنِي شَيْئًا آكُلُهُ!	Lā tansa an tuʿṭiyanī shayʾan ākuluh!
h3p352	为了你，我什么都愿意做。	I'd do anything for you.	مِنْ أَجْلِكَ، أَنَا مُسْتَعِدٌّ لِفِعْلِ أَيِّ شَيْءٍ.	Min ajlik, anā mustaʿiddun lifiʿli ayyi shayʾ.
h3p353	今天有三位客人来看我。	Three guests came to see me today.	جَاءَ ثَلَاثَةُ ضُيُوفٍ لِزِيَارَتِي الْيَوْمَ.	Jāʾa thalāthatu ḍuyūfin liziyāratī al-yawm.
h3p354	我喜欢别的地方的文化。	I like the culture of other places.	أُحِبُّ ثَقَافَةَ الْأَمَاكِنِ الْأُخْرَى.	Uḥibbu thaqāfata al-ʾamākini al-ʾukhrā.
h3p355	太阳从东边起来，从西边下去。	The sun comes up in the east and goes down in the west.	تَطْلُعُ الشَّمْسُ مِنَ الشَّرْقِ وَتَغِيبُ فِي الْغَرْبِ.	Taṭluʿu ash-shamsu mina ash-sharqi wataghību fī al-gharb.
h3p356	我已经习惯一个人在这里了。	I'm used to being here by myself now.	اِعْتَدْتُ الْآنَ أَنْ أَكُونَ هُنَا وَحْدِي.	Iʿtadtu al-ʾāna an akūna hunā waḥdī.
h3p357	早起是个好习惯。	Getting up early is a good habit.	الِاسْتِيقَاظُ مُبَكِّرًا عَادَةٌ جَيِّدَةٌ.	Al-istīqāẓu mubakkiran ʿādatun jayyida.
h3p358	洗手间在哪里？我想去。	Where's the restroom? I want to go.	أَيْنَ دَوْرَةُ الْمِيَاهِ؟ أُرِيدُ أَنْ أَذْهَبَ.	Ayna dawratu al-miyāh? Urīdu an adhhab.
h3p359	你什么时候洗澡？我也想洗。	When do you take a bath? I want one too.	مَتَى تَسْتَحِمُّ؟ أُرِيدُ أَنْ أَسْتَحِمَّ أَنَا أَيْضًا.	Matā tastaḥimm? Urīdu an astaḥimma anā ayḍan.
h3p360	夏天到了，我想去游泳。	Summer is here, and I want to go swimming.	جَاءَ الصَّيْفُ، أُرِيدُ أَنْ أَذْهَبَ لِلسِّبَاحَةِ.	Jāʾa aṣ-ṣayf, urīdu an adhhaba li-s-sibāḥa.
h3p361	你先吃，我等一会儿。	You eat first, and I'll wait a bit.	كُلْ أَنْتَ أَوَّلًا، وَأَنَا سَأَنْتَظِرُ قَلِيلًا.	Kul anta awwalan, waʾanā saʾantaẓiru qalīlan.
h3p362	我相信你会回来的。	I believe you'll come back.	أَنَا أُصَدِّقُ أَنَّكَ سَتَعُودُ.	Anā uṣaddiqu annaka sataʿūd.
h3p363	我最爱吃的是香蕉。	What I love to eat most is bananas.	أَكْثَرُ مَا أُحِبُّ أَكْلَهُ هُوَ الْمَوْزُ.	Aktharu mā uḥibbu aklahu huwa al-mawz.
h3p364	你为什么一直向我笑？	Why do you keep smiling at me?	لِمَاذَا تَبْتَسِمُ لِي دَائِمًا؟	Limādhā tabtasimu lī dāʾiman?
h3p365	我像一条小小的鱼。	I look like a tiny fish.	أَبْدُو كَسَمَكَةٍ صَغِيرَةٍ جِدًّا.	Abdū kasamakatin ṣaghīratin jiddan.
h3p366	路上小心，早点回来。	Be careful on the road, and come back early.	اِنْتَبِهْ فِي الطَّرِيقِ، وَعُدْ مُبَكِّرًا.	Intabih fī aṭ-ṭarīq, waʿud mubakkiran.
h3p367	你们的校长今天来了吗？	Did your principal come today?	هَلْ جَاءَ مُدِيرُ مَدْرَسَتِكُمُ الْيَوْمَ؟	Hal jāʾa mudīru madrasatikumu al-yawm?
h3p368	今天的新闻你看了吗？	Did you see today's news?	هَلْ شَاهَدْتَ أَخْبَارَ الْيَوْمِ؟	Hal shāhadta akhbāra al-yawm?
```
