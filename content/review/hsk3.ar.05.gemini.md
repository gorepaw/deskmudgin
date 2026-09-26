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
h3p246	我马上就好，等我一下。	I'll be ready in a moment, wait for me.	سَأَكُونُ جَاهِزًا بَعْدَ قَلِيلٍ، اِنْتَظِرْنِي لَحْظَةً.	Saʾakūnu jāhizan baʿda qalīl, intaẓirnī laḥẓa.
h3p247	我对今天很满意。	I'm very happy with today.	أَنَا رَاضٍ جِدًّا عَنِ الْيَوْمِ.	Anā rāḍin jiddan ʿani al-yawm.
h3p248	你的帽子真好看！	Your hat looks great!	مَا أَجْمَلَ قُبَّعَتَكَ!	Mā ajmala qubbaʿatak!
h3p249	我只有一米高，很小吧？	I'm only one metre tall. Pretty small, right?	طُولِي مِتْرٌ وَاحِدٌ فَقَطْ، أَلَسْتُ صَغِيرًا؟	Ṭūlī mitrun wāḥidun faqaṭ, alastu ṣaghīran?
h3p250	我饿了，想吃面包。	I'm hungry. I want some bread.	أَنَا جَائِعٌ، أُرِيدُ أَنْ آكُلَ خُبْزًا.	Anā jāʾiʿ, urīdu an ākula khubzan.
h3p251	面包真香！	The bread smells so good!	مَا أَطْيَبَ رَائِحَةَ الْخُبْزِ!	Mā aṭyaba rāʾiḥata al-khubz!
h3p252	我明白了，你是想让我安静一点儿。	I get it. You want me to be quiet.	فَهِمْتُ، أَنْتَ تُرِيدُ أَنْ أَهْدَأَ قَلِيلًا.	Fahimt, anta turīdu an ahdaʾa qalīlan.
h3p253	我想拿那个苹果，可是拿不到。	I want to grab that apple, but I can't reach it.	أُرِيدُ أَنْ آخُذَ تِلْكَ التُّفَّاحَةَ، لٰكِنَّنِي لَا أَصِلُ إِلَيْهَا.	Urīdu an ākhudha tilka at-tuffāḥa, lākinnanī lā aṣilu ilayhā.
h3p254	别拿走我的东西！	Don't take my things!	لَا تَأْخُذْ أَغْرَاضِي!	Lā taʾkhudh aghrāḍī!
h3p255	你奶奶今天会来吗？	Is your grandmother coming today?	هَلْ سَتَأْتِي جَدَّتُكَ الْيَوْمَ؟	Hal sataʾtī jaddatuka al-yawm?
h3p256	小鸟往南飞了。	The birds flew south.	طَارَتِ الْعَصَافِيرُ نَحْوَ الْجَنُوبِ.	Ṭārati al-ʿaṣāfīru naḥwa al-janūb.
h3p257	你要走了，我有点儿难过。	You're leaving, and I feel a bit sad.	سَتَذْهَبُ، وَأَنَا حَزِينٌ قَلِيلًا.	Satadhhab, waʾanā ḥazīnun qalīlan.
h3p258	我今天很难过，你和我玩吧。	I'm sad today. Play with me, please.	أَنَا حَزِينٌ الْيَوْمَ، لَاعِبْنِي.	Anā ḥazīnun al-yawm, lāʿibnī.
h3p259	你现在是几年级？	What grade are you in now?	فِي أَيِّ صَفٍّ أَنْتَ الْآنَ؟	Fī ayyi ṣaffin anta al-ʾān?
h3p260	你看起来很年轻！	You look so young!	تَبْدُو شَابًّا جِدًّا!	Tabdū shābban jiddan!
h3p261	有一只鸟在树上唱歌。	A bird is singing in the tree.	عُصْفُورٌ يُغَنِّي عَلَى الشَّجَرَةِ.	ʿUṣfūrun yughannī ʿalā ash-shajara.
h3p262	我会努力的！	I'll try hard!	سَأَجْتَهِدُ!	Saʾajtahid!
h3p263	我每天都很努力地练习。	I work hard at practising every day.	أَتَدَرَّبُ بِجِدٍّ كُلَّ يَوْمٍ.	Atadarrabu bijiddin kulla yawm.
h3p264	周末我们去爬山吧。	Let's go climbing on the weekend.	لِنَتَسَلَّقِ الْجَبَلَ فِي نِهَايَةِ الْأُسْبُوعِ.	Linatasallaqi al-jabala fī nihāyati al-ʾusbūʿ.
h3p265	爬山太累了，我想睡觉。	Climbing was so tiring. I want to sleep.	تَسَلُّقُ الْجَبَلِ مُتْعِبٌ جِدًّا، أُرِيدُ أَنْ أَنَامَ.	Tasalluqu al-jabali mutʿibun jiddan, urīdu an anām.
h3p266	盘子里还有一块蛋糕。	There's still a piece of cake on the plate.	بَقِيَتْ قِطْعَةُ كَعْكٍ فِي الصَّحْنِ.	Baqiyat qiṭʿatu kaʿkin fī aṣ-ṣaḥn.
h3p267	我是不是变胖了？	Have I gotten fat?	هَلْ صِرْتُ سَمِينًا؟	Hal ṣirtu samīnan?
h3p268	你的皮鞋好亮啊！	Your leather shoes are so shiny!	مَا أَلْمَعَ حِذَاءَكَ الْجِلْدِيَّ!	Mā almaʿa ḥidhāʾaka al-jildiyy!
h3p269	我不喝啤酒，我喜欢喝水。	I don't drink beer. I like water.	لَا أَشْرَبُ الْبِيرَةَ، أُحِبُّ شُرْبَ الْمَاءِ.	Lā ashrabu al-bīra, uḥibbu shurba al-māʾ.
h3p270	瓶子里没有水了。	There's no water left in the bottle.	لَمْ يَبْقَ مَاءٌ فِي الزُّجَاجَةِ.	Lam yabqa māʾun fī az-zujāja.
h3p271	其实我不太饿。	Actually, I'm not that hungry.	فِي الْحَقِيقَةِ لَسْتُ جَائِعًا كَثِيرًا.	Fī al-ḥaqīqati lastu jāʾiʿan kathīran.
h3p272	其实我很想你。	Actually, I really miss you.	فِي الْحَقِيقَةِ أَنَا أَشْتَاقُ إِلَيْكَ كَثِيرًا.	Fī al-ḥaqīqati anā ashtāqu ilayka kathīran.
h3p273	其他人都去哪儿了？	Where did everybody else go?	إِلَى أَيْنَ ذَهَبَ الْبَاقُونَ؟	Ilā ayna dhahaba al-bāqūn?
h3p274	飞机马上就要起飞了。	The plane is about to take off.	الطَّائِرَةُ سَتُقْلِعُ بَعْدَ قَلِيلٍ.	Aṭ-ṭāʾiratu satuqliʿu baʿda qalīl.
h3p275	我没听清楚，你再说一遍吧。	I did not catch that. Say it again.	لَمْ أَسْمَعْ جَيِّدًا، قُلْ ذٰلِكَ مَرَّةً أُخْرَى.	Lam asmaʿ jayyidan, qul dhālika marratan ukhrā.
h3p276	今天我想请假，不想学习。	I want to take the day off today. I don't feel like studying.	أُرِيدُ إِجَازَةً الْيَوْمَ، لَا أُرِيدُ أَنْ أَدْرُسَ.	Urīdu ijāzatan al-yawm, lā urīdu an adrus.
h3p277	秋天到了，天气很好。	Autumn is here and the weather is lovely.	جَاءَ الْخَرِيفُ، وَالْجَوُّ جَمِيلٌ.	Jāʾa al-kharīf, wa-l-jawwu jamīl.
h3p278	我喜欢秋天的太阳。	I like the autumn sun.	أُحِبُّ شَمْسَ الْخَرِيفِ.	Uḥibbu shamsa al-kharīf.
h3p279	你的裙子真漂亮！	Your skirt is so pretty!	مَا أَجْمَلَ تَنُّورَتَكَ!	Mā ajmala tannūratak!
h3p280	先吃饭，然后再玩。	Eat first, then play.	لِنَأْكُلْ أَوَّلًا، ثُمَّ لِنَلْعَبْ.	Linaʾkul awwalan, thumma linalʿab.
h3p281	我先睡一会儿，然后再找你玩。	I'll take a nap first and then come play with you.	سَأَنَامُ قَلِيلًا أَوَّلًا، ثُمَّ آتِي لِأَلْعَبَ مَعَكَ.	Saʾanāmu qalīlan awwalan, thumma ātī liʾalʿaba maʿak.
h3p282	你好热情啊，我喜欢你！	You're so warm and friendly. I like you!	أَنْتَ وَدُودٌ جِدًّا، أُحِبُّكَ!	Anta wadūdun jiddan, uḥibbuk!
h3p283	我认为今天会下雨。	I think it's going to rain today.	أَظُنُّ أَنَّهَا سَتُمْطِرُ الْيَوْمَ.	Aẓunnu annahā satumṭiru al-yawm.
h3p284	你认为我可爱吗？	Do you think I'm cute?	هَلْ تَظُنُّ أَنَّنِي لَطِيفٌ؟	Hal taẓunnu annanī laṭīf?
h3p286	你认真地看着我，我有点儿不好意思。	You're looking at me so intently, and I'm a little shy.	تَنْظُرُ إِلَيَّ بِجِدٍّ، فَأَشْعُرُ بِالْخَجَلِ قَلِيلًا.	Tanẓuru ilayya bijidd, faʾashʿuru bi-l-khajali qalīlan.
h3p287	这个问题很容易。	This question is easy.	هٰذَا السُّؤَالُ سَهْلٌ جِدًّا.	Hādhā as-suʾālu sahlun jiddan.
h3p288	如果你不在，我会很想你。	If you're not here, I'll miss you a lot.	إِذَا لَمْ تَكُنْ هُنَا، فَسَأَشْتَاقُ إِلَيْكَ كَثِيرًا.	Idhā lam takun hunā, fasaʾashtāqu ilayka kathīran.
h3p289	如果明天下雨，我们就在家玩。	If it rains tomorrow, we'll play at home.	إِذَا أَمْطَرَتْ غَدًا، فَسَنَلْعَبُ فِي الْبَيْتِ.	Idhā amṭarat ghadan, fasanalʿabu fī al-bayt.
h3p290	外面下雨了，你带伞了吗？	It's raining out. Did you bring an umbrella?	السَّمَاءُ تُمْطِرُ فِي الْخَارِجِ، هَلْ أَخَذْتَ مِظَلَّةً؟	As-samāʾu tumṭiru fī al-khārij, hal akhadhta miẓalla?
h3p291	那把伞是谁的？	Whose umbrella is that?	لِمَنْ تِلْكَ الْمِظَلَّةُ؟	Liman tilka al-miẓalla?
h3p292	你在上网吗？	Are you online?	هَلْ أَنْتَ عَلَى الْإِنْتَرْنِتِ؟	Hal anta ʿalā al-ʾintarnit?
h3p293	你又上网了，不和我玩吗？	You're online again. Aren't you going to play with me?	أَنْتَ عَلَى الْإِنْتَرْنِتِ مِنْ جَدِيدٍ، أَلَنْ تَلْعَبَ مَعِي؟	Anta ʿalā al-ʾintarniti min jadīd, alan talʿaba maʿī?
h3p294	你别生气，我不是故意的。	Don't be angry. I didn't mean to.	لَا تَغْضَبْ، لَمْ أَقْصِدْ ذٰلِكَ.	Lā taghḍab, lam aqṣid dhālik.
h3p295	我生气了！你为什么把我放下？	I'm angry! Why did you put me down?	أَنَا غَاضِبٌ! لِمَاذَا وَضَعْتَنِي عَلَى الْأَرْضِ؟	Anā ghāḍib! Limādhā waḍaʿtanī ʿalā al-ʾarḍ?
h3p296	外面有很大的声音，我有点儿怕。	There's a loud noise outside. I'm a little scared.	هُنَاكَ صَوْتٌ عَالٍ فِي الْخَارِجِ، أَنَا خَائِفٌ قَلِيلًا.	Hunāka ṣawtun ʿālin fī al-khārij, anā khāʾifun qalīlan.
h3p297	你的声音真好听。	Your voice is really nice.	صَوْتُكَ جَمِيلٌ حَقًّا.	Ṣawtuka jamīlun ḥaqqan.
h3p298	这个世界真大啊！	This world is so big!	مَا أَكْبَرَ هٰذَا الْعَالَمَ!	Mā akbara hādhā al-ʿālam!
h3p299	我想看看外面的世界。	I want to see the world outside.	أُرِيدُ أَنْ أَرَى الْعَالَمَ فِي الْخَارِجِ.	Urīdu an arā al-ʿālama fī al-khārij.
h3p300	我想试一试，可以吗？	I'd like to give it a try. May I?	أُرِيدُ أَنْ أُجَرِّبَ، هَلْ يُمْكِنُ؟	Urīdu an ujarrib, hal yumkin?
h3p301	这个我能试吗？	Can I try this?	هَلْ يُمْكِنُنِي أَنْ أُجَرِّبَ هٰذَا؟	Hal yumkinunī an ujarriba hādhā?
h3p302	你最近是不是瘦了？	Have you lost weight lately?	هَلْ نَقَصَ وَزْنُكَ مُؤَخَّرًا؟	Hal naqaṣa waznuka muʾakhkharan?
h3p303	叔叔今天来看你了吗？	Did your uncle come to see you today?	هَلْ زَارَكَ عَمُّكَ الْيَوْمَ؟	Hal zāraka ʿammuka al-yawm?
h3p305	这里好舒服，我想睡了。	It's so comfortable here. I feel sleepy.	الْمَكَانُ هُنَا مُرِيحٌ جِدًّا، أَشْعُرُ بِالنُّعَاسِ.	Al-makānu hunā murīḥun jiddan, ashʿuru bi-n-nuʿās.
h3p306	这么高的树，我上不去。	I can't climb a tree that tall.	لَا أَسْتَطِيعُ تَسَلُّقَ شَجَرَةٍ بِهٰذَا الطُّولِ.	Lā astaṭīʿu tasalluqa shajaratin bihādhā aṭ-ṭūl.
h3p307	树下面有很多小鸟。	There are lots of little birds under the tree.	تَحْتَ الشَّجَرَةِ عَصَافِيرُ كَثِيرَةٌ.	Taḥta ash-shajarati ʿaṣāfīru kathīra.
```
