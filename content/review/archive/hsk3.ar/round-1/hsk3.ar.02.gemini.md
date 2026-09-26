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
h3p061	太阳从东边出来了。	The sun is rising from the east.	تُشْرِقُ الشَّمْسُ مِنَ الشَّرْقِ.	Tushriqu ash-shamsu mina ash-sharq.
h3p062	冬天太冷了，我不想出门。	Winter is too cold, I don't want to go out.	الشِّتَاءُ بَارِدٌ أَكْثَرَ مِنَ اللَّازِمِ، لَا أُرِيدُ أَنْ أَخْرُجَ.	Ash-shitāʾu bāridun akthara mina al-lāzim, lā urīdu an akhruj.
h3p063	我最喜欢的动物是猫。	My favorite animal is the cat.	حَيَوَانِي الْمُفَضَّلُ هُوَ الْقِطُّ.	Ḥayawānī al-mufaḍḍalu huwa al-qiṭṭ.
h3p064	我的腿很短。	My legs are short.	رِجْلَايَ قَصِيرَتَانِ.	Rijlāya qaṣīratān.
h3p065	这段路不太远。	This stretch of road isn't far.	هٰذَا الطَّرِيقُ لَيْسَ بَعِيدًا كَثِيرًا.	Hādhā aṭ-ṭarīqu laysa baʿīdan kathīran.
h3p066	你每天锻炼吗？	Do you exercise every day?	هَلْ تَتَمَرَّنُ كُلَّ يَوْمٍ؟	Hal tatamarranu kulla yawm?
h3p067	今天天气多么好啊！	What lovely weather today!	مَا أَجْمَلَ الْجَوَّ الْيَوْمَ!	Mā ajmala al-jawwa al-yawm!
h3p068	我好饿啊，想吃面包。	I'm so hungry. I want bread.	أَنَا جَائِعٌ جِدًّا، أُرِيدُ خُبْزًا.	Anā jāʾiʿun jiddan, urīdu khubzan.
h3p069	我想去，而你不想去。	I want to go, but you don't.	أُرِيدُ أَنْ أَذْهَبَ، أَمَّا أَنْتَ فَلَا تُرِيدُ.	Urīdu an adhhab, ammā anta falā turīd.
h3p070	我有两只大耳朵。	I have two big ears.	لِي أُذُنَانِ كَبِيرَتَانِ.	Lī udhunāni kabīratān.
h3p071	你发烧了吗？	Do you have a fever?	هَلْ عِنْدَكَ حُمَّى؟	Hal ʿindaka ḥummā?
h3p072	我好像发烧了，头很疼。	I think I have a fever. My head hurts.	أَظُنُّ أَنَّ عِنْدِي حُمَّى، رَأْسِي يُؤْلِمُنِي كَثِيرًا.	Aẓunnu anna ʿindī ḥummā, raʾsī yuʾlimunī kathīran.
h3p073	你发现了什么？	What did you find?	مَاذَا وَجَدْتَ؟	Mādhā wajadt?
h3p074	在家很方便，什么都有。	It's convenient at home, there's everything.	الْبَيْتُ مُرِيحٌ، فِيهِ كُلُّ شَيْءٍ.	Al-baytu murīḥ, fīhi kullu shayʾ.
h3p075	你把杯子放在哪儿了？	Where did you put the cup?	أَيْنَ وَضَعْتَ الْكُوبَ؟	Ayna waḍaʿta al-kūb?
h3p076	你放心，我会在家等你。	Rest assured, I'll wait for you at home.	لَا تَقْلَقْ، سَأَنْتَظِرُكَ فِي الْبَيْتِ.	Lā taqlaq, saʾantaẓiruka fī al-bayt.
h3p077	现在几点了？还差五分十二点。	What time is it? Five to twelve.	كَمِ السَّاعَةُ الْآنَ؟ الثَّانِيَةَ عَشْرَةَ إِلَّا خَمْسَ دَقَائِقَ.	Kami as-sāʿatu al-ʾān? Ath-thāniyata ʿashrata illā khamsa daqāʾiq.
h3p078	你发给我的邮件我看到了。	I saw the email you sent me.	رَأَيْتُ الرِّسَالَةَ الَّتِي أَرْسَلْتَهَا إِلَيَّ.	Raʾaytu ar-risālata allatī arsaltahā ilayy.
h3p079	你在办公室累不累？	Are you tired at the office?	هَلْ تَتْعَبُ فِي الْمَكْتَبِ؟	Hal tatʿabu fī al-maktab?
h3p080	好舒服啊，再来一下！	That feels great, do it again!	هٰذَا مُرِيحٌ جِدًّا، مَرَّةً أُخْرَى!	Hādhā murīḥun jiddan, marratan ukhrā!
h3p081	啊，你把我放下来了！	Ah, you put me down!	آهٍ، لَقَدْ أَنْزَلْتَنِي!	Āh, laqad anzaltanī!
h3p082	我一个人在家，好安静啊。	I'm home alone. It's so quiet.	أَنَا وَحْدِي فِي الْبَيْتِ، مَا أَهْدَأَ الْمَكَانَ!	Anā waḥdī fī al-bayt, mā ahdaʾa al-makān!
h3p083	你怎么才来？我等了好久。	Why did you only just come? I've waited so long.	لِمَاذَا لَمْ تَأْتِ إِلَّا الْآنَ؟ انْتَظَرْتُكَ مُنْذُ وَقْتٍ طَوِيلٍ.	Limādhā lam taʾti illā al-ʾān? Intaẓartuka mundhu waqtin ṭawīl.
h3p084	我好像迟到了，快跑！	I think I'm late, run!	أَظُنُّ أَنَّنِي تَأَخَّرْتُ، لِأَرْكُضْ بِسُرْعَةٍ!	Aẓunnu annanī taʾakhkhart, liʾarkuḍ bisurʿa!
h3p085	啊，天亮了吗？	Ah, is it morning already?	آهٍ، هَلْ طَلَعَ النَّهَارُ؟	Āh, hal ṭalaʿa an-nahār?
h3p086	别把我放在冰箱里！	Don't put me in the fridge!	لَا تَضَعْنِي فِي الثَّلَّاجَةِ!	Lā taḍaʿnī fī ath-thallāja!
h3p087	你带我去参加比赛吧！	Take me to the match!	خُذْنِي إِلَى الْمُبَارَاةِ!	Khudhnī ilā al-mubārāh!
h3p088	你的成绩怎么样？	How were your grades?	كَيْفَ كَانَتْ دَرَجَاتُكَ؟	Kayfa kānat darajātuk?
h3p089	我想搬到北方去住。	I want to move to the north.	أُرِيدُ أَنْ أَنْتَقِلَ لِأَسْكُنَ فِي الشَّمَالِ.	Urīdu an antaqila liʾaskuna fī ash-shamāl.
h3p090	这个包又大又重。	This bag is big and heavy.	هٰذِهِ الْحَقِيبَةُ كَبِيرَةٌ وَثَقِيلَةٌ.	Hādhihi al-ḥaqībatu kabīratun wathaqīla.
h3p091	超市里有很多吃的。	There's a lot to eat at the supermarket.	فِي الْمَتْجَرِ الْكَبِيرِ طَعَامٌ كَثِيرٌ.	Fī al-matjari al-kabīri ṭaʿāmun kathīr.
h3p092	你的鼻子和耳朵都红了。	Your nose and ears are both red.	احْمَرَّ أَنْفُكَ وَأُذُنَاكَ.	Iḥmarra anfuka waʾudhunāk.
h3p093	你打算几点睡觉？	When do you plan to go to bed?	فِي أَيِّ سَاعَةٍ تَنْوِي أَنْ تَنَامَ؟	Fī ayyi sāʿatin tanwī an tanām?
h3p094	我的爱好是看地上的草。	My hobby is watching the grass on the ground.	هِوَايَتِي هِيَ النَّظَرُ إِلَى الْعُشْبِ عَلَى الْأَرْضِ.	Hiwāyatī hiya an-naẓaru ilā al-ʿushbi ʿalā al-ʾarḍ.
h3p095	这里比较安静，我喜欢。	It's fairly quiet here, I like it.	الْمَكَانُ هَادِئٌ نَوْعًا مَا هُنَا، وَهٰذَا يُعْجِبُنِي.	Al-makānu hādiʾun nawʿan mā hunā, wahādhā yuʿjibunī.
h3p096	别人都说我很矮。	Everyone says I'm short.	يَقُولُ الْآخَرُونَ كُلُّهُمْ إِنَّنِي قَصِيرٌ.	Yaqūlu al-ʾākharūna kulluhum innanī qaṣīr.
h3p097	下班了，你快回家吧。	Work's over, come home soon.	انْتَهَى الْعَمَلُ، عُدْ إِلَى الْبَيْتِ بِسُرْعَةٍ.	Intahā al-ʿamal, ʿud ilā al-bayti bisurʿa.
h3p098	我在家里等你，你别担心。	I'll wait at home, don't worry.	سَأَنْتَظِرُكَ فِي الْبَيْتِ، لَا تَقْلَقْ.	Saʾantaẓiruka fī al-bayt, lā taqlaq.
h3p099	再见，路上要小心。	Bye, be careful on the way.	مَعَ السَّلَامَةِ، انْتَبِهْ فِي الطَّرِيقِ.	Maʿa as-salāma, intabih fī aṭ-ṭarīq.
h3p100	你才走了半个小时，我就想你了。	You've only been gone half an hour and I miss you already.	لَمْ يَمْضِ عَلَى ذَهَابِكَ إِلَّا نِصْفُ سَاعَةٍ، وَقَدِ اشْتَقْتُ إِلَيْكَ.	Lam yamḍi ʿalā dhahābika illā niṣfu sāʿa, waqadi ishtaqtu ilayk.
h3p101	厨房的灯还亮着。	The kitchen light is still on.	ضَوْءُ الْمَطْبَخِ لَا يَزَالُ مُضَاءً.	Ḍawʾu al-maṭbakhi lā yazālu muḍāʾan.
h3p102	我想变得更聪明。	I want to become smarter.	أُرِيدُ أَنْ أَصِيرَ أَذْكَى.	Urīdu an aṣīra adhkā.
h3p103	今天我必须锻炼一下。	Today I have to exercise.	يَجِبُ أَنْ أَتَمَرَّنَ الْيَوْمَ.	Yajibu an atamarrana al-yawm.
h3p104	我们一起打扫房间吧。	Let's clean the room together.	لِنُنَظِّفِ الْغُرْفَةَ مَعًا.	Linunaẓẓifi al-ghurfata maʿan.
h3p105	春天到了，外面有很多小动物。	Spring is here, and there are lots of little animals outside.	جَاءَ الرَّبِيعُ، وَفِي الْخَارِجِ حَيَوَانَاتٌ صَغِيرَةٌ كَثِيرَةٌ.	Jāʾa ar-rabīʿ, wafī al-khāriji ḥayawānātun ṣaghīratun kathīra.
h3p106	我把蛋糕吃完了，真好吃！	I finished the cake, it was so yummy!	أَكَلْتُ الْكَعْكَةَ كُلَّهَا، مَا أَلَذَّهَا!	Akaltu al-kaʿkata kullahā, mā aladhdhahā!
h3p107	这个菜单上的词语我都不懂。	I don't understand any of the words on this menu.	لَا أَفْهَمُ أَيَّ كَلِمَةٍ فِي هٰذِهِ الْقَائِمَةِ.	Lā afhamu ayya kalimatin fī hādhihi al-qāʾima.
h3p108	你的电子邮件写得太短了。	The email you wrote is too short.	رِسَالَتُكَ الْإِلِكْتِرُونِيَّةُ قَصِيرَةٌ أَكْثَرَ مِنَ اللَّازِمِ.	Risālatuka al-ʾiliktirūniyyatu qaṣīratun akthara mina al-lāzim.
h3p109	我的成绩进步了，你看！	My grades have improved, look!	تَحَسَّنَتْ دَرَجَاتِي، انْظُرْ!	Taḥassanat darajātī, inẓur!
h3p110	今天的比赛我很开心！	I had so much fun at the match today!	اسْتَمْتَعْتُ كَثِيرًا بِالْمُبَارَاةِ الْيَوْمَ!	Istamtaʿtu kathīran bi-l-mubārāti al-yawm!
h3p111	你的办法真好！	Your idea is really good!	فِكْرَتُكَ جَيِّدَةٌ حَقًّا!	Fikratuka jayyidatun ḥaqqan!
h3p112	你要去哪个地方？	Which place are you going to?	إِلَى أَيِّ مَكَانٍ تُرِيدُ أَنْ تَذْهَبَ؟	Ilā ayyi makānin turīdu an tadhhab?
h3p113	这个地铁站人真多。	There are so many people at this subway station.	مَا أَكْثَرَ النَّاسَ فِي مَحَطَّةِ الْمِتْرُو هٰذِهِ!	Mā akthara an-nāsa fī maḥaṭṭati al-mitrū hādhih!
h3p114	我在冰箱里发现了蛋糕！	I found cake in the fridge!	وَجَدْتُ كَعْكَةً فِي الثَّلَّاجَةِ!	Wajadtu kaʿkatan fī ath-thallāja!
h3p115	我一个人，好想有人帮忙。	I'm all alone, I wish someone would help.	أَنَا وَحْدِي، لَيْتَ أَحَدًا يُسَاعِدُنِي.	Anā waḥdī, layta aḥadan yusāʿidunī.
h3p116	我想复习一下昨天的故事。	I want to go over yesterday's story again.	أُرِيدُ أَنْ أُرَاجِعَ قِصَّةَ الْأَمْسِ.	Urīdu an urājiʿa qiṣṣata al-ʾams.
h3p117	我刚才洗了脚，现在很干净！	I just washed my feet, and now they're so clean!	غَسَلْتُ قَدَمَيَّ قَبْلَ قَلِيلٍ، وَهُمَا الْآنَ نَظِيفَتَانِ جِدًّا!	Ghasaltu qadamayya qabla qalīl, wahumā al-ʾāna naẓīfatāni jiddan!
h3p118	我好像感冒了，头有点儿疼。	I think I've caught a cold. My head hurts a little.	أَظُنُّ أَنَّنِي أُصِبْتُ بِالزُّكَامِ، رَأْسِي يُؤْلِمُنِي قَلِيلًا.	Aẓunnu annanī uṣibtu bi-z-zukām, raʾsī yuʾlimunī qalīlan.
h3p119	我对你的手机很感兴趣。	I'm really curious about your phone.	هَاتِفُكَ يُثِيرُ اهْتِمَامِي كَثِيرًا.	Hātifuka yuthīru ihtimāmī kathīran.
h3p120	刚才有一只鸟从我头上飞过去。	A bird just flew over my head.	طَارَ طَائِرٌ فَوْقَ رَأْسِي قَبْلَ قَلِيلٍ.	Ṭāra ṭāʾirun fawqa raʾsī qabla qalīl.
```
