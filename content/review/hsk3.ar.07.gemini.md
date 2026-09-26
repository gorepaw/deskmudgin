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
h3p369	这个苹果很新鲜，快来吃。	This apple is really fresh, come and eat.	هٰذِهِ التُّفَّاحَةُ طَازَجَةٌ جِدًّا، تَعَالَ وَكُلْ.	Hādhihi at-tuffāḥatu ṭāzajatun jiddan, taʿāla wakul.
h3p370	你有新的信吗？我在等。	Do you have a new letter? I'm waiting.	هَلْ عِنْدَكَ رِسَالَةٌ جَدِيدَةٌ؟ أَنَا أَنْتَظِرُ.	Hal ʿindaka risālatun jadīda? Anā antaẓir.
h3p371	你的行李箱好大啊。	Your suitcase is so big.	حَقِيبَةُ سَفَرِكَ كَبِيرَةٌ جِدًّا.	Ḥaqībatu safarika kabīratun jiddan.
h3p372	我想变成一只大熊猫。	I want to turn into a giant panda.	أُرِيدُ أَنْ أَصِيرَ دُبَّ بَانْدَا.	Urīdu an aṣīra dubba bandā.
h3p373	我需要你在我旁边。	I need you next to me.	أَحْتَاجُ إِلَى وُجُودِكَ بِجَانِبِي.	Aḥtāju ilā wujūdika bijānibī.
h3p374	你想选择哪一个？	Which one do you want to choose?	أَيَّ وَاحِدٍ تُرِيدُ أَنْ تَخْتَارَ؟	Ayya wāḥidin turīdu an takhtār?
h3p375	我有一个小小的要求：别走。	I have one small request: don't go.	عِنْدِي طَلَبٌ صَغِيرٌ: لَا تَذْهَبْ.	ʿIndī ṭalabun ṣaghīr: lā tadhhab.
h3p376	我爷爷也喜欢听音乐。	My grandpa likes listening to music too.	جَدِّي يُحِبُّ الِاسْتِمَاعَ إِلَى الْمُوسِيقَى أَيْضًا.	Jaddī yuḥibbu al-istimāʿa ilā al-mūsīqā ayḍan.
h3p377	明天一定是个好天气。	Tomorrow will surely be nice weather.	سَيَكُونُ الْجَوُّ جَمِيلًا غَدًا بِلَا شَكٍّ.	Sayakūnu al-jawwu jamīlan ghadan bilā shakk.
h3p378	今天一共有五个人来看我。	Altogether five people came to see me today.	جَاءَ خَمْسَةُ أَشْخَاصٍ لِزِيَارَتِي الْيَوْمَ فِي الْمَجْمُوعِ.	Jāʾa khamsatu ashkhāṣin liziyāratī al-yawma fī al-majmūʿ.
h3p379	我睡一会儿，别叫我。	I'll sleep for a bit, don't wake me.	سَأَنَامُ قَلِيلًا، لَا تُوقِظْنِي.	Saʾanāmu qalīlan, lā tūqiẓnī.
h3p380	你和我一样喜欢吃蛋糕。	You like cake just like I do.	تُحِبُّ الْكَعْكَ مِثْلِي تَمَامًا.	Tuḥibbu al-kaʿka mithlī tamāman.
h3p381	我一直在等你回家。	I've been waiting for you to come home all along.	مَا زِلْتُ أَنْتَظِرُ عَوْدَتَكَ إِلَى الْبَيْتِ.	Mā ziltu antaẓiru ʿawdataka ilā al-bayt.
h3p382	以前我住在水里。	I used to live in the water.	كُنْتُ أَسْكُنُ فِي الْمَاءِ مِنْ قَبْلُ.	Kuntu askunu fī al-māʾi min qabl.
h3p383	我一般晚上不睡觉。	I generally don't sleep at night.	عَادَةً لَا أَنَامُ فِي اللَّيْلِ.	ʿĀdatan lā anāmu fī al-layl.
h3p384	这个音乐真好听。	This music sounds really nice.	هٰذِهِ الْمُوسِيقَى جَمِيلَةٌ جِدًّا.	Hādhihi al-mūsīqā jamīlatun jiddan.
h3p385	你去银行做什么？	What are you going to the bank for?	مَاذَا سَتَفْعَلُ فِي الْمَصْرِفِ؟	Mādhā satafʿalu fī al-maṣrif?
h3p386	我想喝一杯冷的饮料。	I want a cold drink.	أُرِيدُ أَنْ أَشْرَبَ مَشْرُوبًا بَارِدًا.	Urīdu an ashraba mashrūban bāridan.
h3p387	你应该早点睡觉。	You should go to bed earlier.	يَنْبَغِي أَنْ تَنَامَ أَبْكَرَ.	Yanbaghī an tanāma abkar.
h3p388	天气会影响我的心情。	The weather affects my mood.	الطَّقْسُ يُؤَثِّرُ فِي مِزَاجِي.	Aṭ-ṭaqsu yuʾaththiru fī mizājī.
h3p389	我可以用一下你的笔吗？	Can I use your pen for a moment?	هَلْ يُمْكِنُنِي أَنْ أَسْتَخْدِمَ قَلَمَكَ لَحْظَةً؟	Hal yumkinunī an astakhdima qalamaka laḥẓa?
h3p390	我喜欢这个游戏，再玩一次。	I like this game, let's play once more.	تُعْجِبُنِي هٰذِهِ اللُّعْبَةُ، لِنَلْعَبْ مَرَّةً أُخْرَى.	Tuʿjibunī hādhihi al-luʿba, linalʿab marratan ukhrā.
h3p391	你的朋友很有名吧？	Your friend is quite famous, isn't he?	صَدِيقُكَ مَشْهُورٌ جِدًّا، أَلَيْسَ كَذٰلِكَ؟	Ṣadīquka mashhūrun jiddan, alaysa kadhālik?
h3p392	你终于来了，太好了！	You're finally here, how wonderful!	وَصَلْتَ أَخِيرًا، هٰذَا رَائِعٌ!	Waṣalta akhīran, hādhā rāʾiʿ!
h3p393	我今天在路上遇到一只猫。	I ran into a cat on the road today.	قَابَلْتُ قِطَّةً فِي الطَّرِيقِ الْيَوْمَ.	Qābaltu qiṭṭatan fī aṭ-ṭarīqi al-yawm.
h3p394	你愿意和我一起玩吗？	Are you willing to play with me?	هَلْ تُرِيدُ أَنْ تَلْعَبَ مَعِي؟	Hal turīdu an talʿaba maʿī?
h3p395	今晚的月亮又大又亮。	Tonight's moon is big and bright.	قَمَرُ اللَّيْلَةِ كَبِيرٌ وَمُضِيءٌ.	Qamaru al-laylati kabīrun wamuḍīʾ.
h3p396	天越来越冷了。	It's getting colder and colder.	الْجَوُّ يَزْدَادُ بُرُودَةً.	Al-jawwu yazdādu burūda.
h3p397	我在车站等你。	I'll wait for you at the station.	سَأَنْتَظِرُكَ فِي الْمَحَطَّةِ.	Saʾantaẓiruka fī al-maḥaṭṭa.
h3p398	请给我一张纸。	Please give me a sheet of paper.	أَعْطِنِي وَرَقَةً مِنْ فَضْلِكَ.	Aʿṭinī waraqatan min faḍlik.
h3p399	你怎么还不回来，我好着急。	Why aren't you back yet? I'm so worried.	لِمَاذَا لَمْ تَعُدْ بَعْدُ؟ أَنَا قَلِقٌ جِدًّا.	Limādhā lam taʿud baʿd? Anā qaliqun jiddan.
h3p400	请你照顾我，好吗？	Please take care of me, okay?	اِعْتَنِ بِي مِنْ فَضْلِكَ، حَسَنًا؟	Iʿtani bī min faḍlik, ḥasanan?
h3p401	这张照片是谁给你的？	Who gave you this photo?	مَنْ أَعْطَاكَ هٰذِهِ الصُّورَةَ؟	Man aʿṭāka hādhihi aṣ-ṣūra?
h3p402	我想用照相机给你照张相。	I want to take your picture with the camera.	أُرِيدُ أَنْ آخُذَ لَكَ صُورَةً بِالْكَامِيرَا.	Urīdu an ākhudha laka ṣūratan bi-l-kāmīrā.
h3p403	桌子上有一只小鸟。	There's a little bird on the table.	عَلَى الطَّاوِلَةِ عُصْفُورٌ صَغِيرٌ.	ʿAlā aṭ-ṭāwilati ʿuṣfūrun ṣaghīr.
h3p404	我只有你一个朋友。	You're my only friend.	لَيْسَ لِي صَدِيقٌ غَيْرُكَ.	Laysa lī ṣadīqun ghayruk.
h3p405	我坐在桌子中间。	I'm sitting in the middle of the table.	أَجْلِسُ فِي وَسَطِ الطَّاوِلَةِ.	Ajlisu fī wasaṭi aṭ-ṭāwila.
h3p406	我在学中文，你教教我吧。	I'm learning Chinese, so teach me.	أَتَعَلَّمُ الصِّينِيَّةَ، عَلِّمْنِي.	Ataʿallamu aṣ-ṣīniyya, ʿallimnī.
h3p407	你终于回来了！	You're finally back!	عُدْتَ أَخِيرًا!	ʿUdta akhīran!
h3p408	你喜欢哪一种水果？	Which kind of fruit do you like?	أَيَّ نَوْعٍ مِنَ الْفَوَاكِهِ تُحِبُّ؟	Ayya nawʿin mina al-fawākihi tuḥibb?
h3p409	今天的书包好重啊。	Today's school bag is so heavy.	حَقِيبَةُ الْمَدْرَسَةِ ثَقِيلَةٌ جِدًّا الْيَوْمَ.	Ḥaqībatu al-madrasati thaqīlatun jiddan al-yawm.
h3p410	你最重要，别走。	You're the most important, don't go.	أَنْتَ الْأَهَمُّ، لَا تَذْهَبْ.	Anta al-ʾahamm, lā tadhhab.
h3p411	这个周末你有空吗？	Are you free this weekend?	هَلْ عِنْدَكَ وَقْتٌ فِي نِهَايَةِ الْأُسْبُوعِ؟	Hal ʿindaka waqtun fī nihāyati al-ʾusbūʿ?
h3p412	我主要吃蛋糕和水果。	I mainly eat cake and fruit.	آكُلُ الْكَعْكَ وَالْفَاكِهَةَ فِي الْغَالِبِ.	Ākulu al-kaʿka wa-l-fākihata fī al-ghālib.
h3p413	过马路要注意车。	Pay attention to cars when crossing the road.	اِنْتَبِهْ لِلسَّيَّارَاتِ عِنْدَ عُبُورِ الشَّارِعِ.	Intabih li-s-sayyārāti ʿinda ʿubūri ash-shāriʿ.
h3p414	我想自己试一试。	I want to try it myself.	أُرِيدُ أَنْ أُجَرِّبَ بِنَفْسِي.	Urīdu an ujarriba binafsī.
h3p415	我想骑自行车去玩。	I want to ride a bike and play.	أُرِيدُ أَنْ أَرْكَبَ الدَّرَّاجَةَ وَأَلْعَبَ.	Urīdu an arkaba ad-darrājata waʾalʿab.
h3p416	你总是这么早起来。	You always get up this early.	تَسْتَيْقِظُ دَائِمًا مُبَكِّرًا جِدًّا.	Tastayqiẓu dāʾiman mubakkiran jiddan.
h3p417	最后一块蛋糕给我吧。	Give me the last piece of cake.	أَعْطِنِي آخِرَ قِطْعَةِ كَعْكٍ.	Aʿṭinī ākhira qiṭʿati kaʿk.
h3p418	你最近好吗？我想你了。	How have you been lately? I missed you.	كَيْفَ حَالُكَ مُؤَخَّرًا؟ اِشْتَقْتُ إِلَيْكَ.	Kayfa ḥāluka muʾakhkharan? Ishtaqtu ilayk.
h3p419	你的作业做完了吗？	Have you finished your homework?	هَلْ أَنْهَيْتَ وَاجِبَكَ؟	Hal anhayta wājibak?
h3p420	请再说一遍。	Please say it once more.	أَعِدْ ذٰلِكَ مَرَّةً أُخْرَى مِنْ فَضْلِكَ.	Aʿid dhālika marratan ukhrā min faḍlik.
h3p421	我家对面有一个大商店。	There's a big shop across from my home.	يُوجَدُ مَتْجَرٌ كَبِيرٌ مُقَابِلَ بَيْتِي.	Yūjadu matjarun kabīrun muqābila baytī.
h3p422	别忘了，明天我一定要吃鱼。	Don't forget, tomorrow I absolutely want fish.	لَا تَنْسَ، سَآكُلُ سَمَكًا غَدًا بِالتَّأْكِيدِ.	Lā tans, saʾākulu samakan ghadan bi-t-taʾkīd.
h3p423	为了吃蛋糕，我一直在等。	I've been waiting just to have cake.	مَا زِلْتُ أَنْتَظِرُ مِنْ أَجْلِ الْكَعْكَةِ.	Mā ziltu antaẓiru min ajli al-kaʿka.
h3p424	我们这里有三位小朋友。	There are three little kids here.	عِنْدَنَا هُنَا ثَلَاثَةُ أَطْفَالٍ صِغَارٍ.	ʿIndanā hunā thalāthatu aṭfālin ṣighār.
h3p425	我想去看看别的文化。	I want to go see other cultures.	أُرِيدُ أَنْ أَذْهَبَ لِأَرَى ثَقَافَاتٍ أُخْرَى.	Urīdu an adhhaba liʾarā thaqāfātin ukhrā.
h3p426	你往西走，我往东走。	You go west, and I'll go east.	اِذْهَبْ أَنْتَ نَحْوَ الْغَرْبِ، وَأَنَا سَأَذْهَبُ نَحْوَ الشَّرْقِ.	Idhhab anta naḥwa al-gharb, waʾanā saʾadhhabu naḥwa ash-sharq.
h3p427	你的新习惯是什么？	What's your new habit?	مَا عَادَتُكَ الْجَدِيدَةُ؟	Mā ʿādatuka al-jadīda?
h3p428	我一个人不想去洗手间。	I don't want to go to the restroom alone.	لَا أُرِيدُ أَنْ أَذْهَبَ إِلَى دَوْرَةِ الْمِيَاهِ وَحْدِي.	Lā urīdu an adhhaba ilā dawrati al-miyāhi waḥdī.
```
