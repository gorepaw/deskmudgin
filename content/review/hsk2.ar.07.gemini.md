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
h2p361	这件衣服太长了。	This piece of clothing is too long.	هٰذَا الثَّوْبُ طَوِيلٌ جِدًّا.	Hādhā ath-thawbu ṭawīlun jiddan.
h2p362	他很高。	He is tall.	هُوَ طَوِيلٌ.	Huwa ṭawīl.
h2p363	我不高，但是我很快。	I'm not tall, but I'm fast.	لَسْتُ طَوِيلًا، لٰكِنِّي سَرِيعٌ.	Lastu ṭawīlan, lākinnī sarīʿ.
h2p364	虽然我很小，但是我吃得很多。	Although I'm small, I eat a lot.	مَعَ أَنِّي صَغِيرٌ، لٰكِنِّي آكُلُ كَثِيرًا.	Maʿa annī ṣaghīr, lākinnī ākulu kathīran.
h2p365	因为今天下雪，所以我们不去学校。	Because it's snowing today, we're not going to school.	لِأَنَّ الثَّلْجَ يَنْزِلُ الْيَوْمَ، لَنْ نَذْهَبَ إِلَى الْمَدْرَسَةِ.	Liʾanna ath-thalja yanzilu al-yawm, lan nadhhaba ilā al-madrasa.
h2p366	你为什么不高兴？	Why aren't you happy?	لِمَاذَا أَنْتَ غَيْرُ سَعِيدٍ؟	Limādhā anta ghayru saʿīd?
h2p367	你为什么在这儿？	Why are you here?	لِمَاذَا أَنْتَ هُنَا؟	Limādhā anta hunā?
h2p368	他为什么还没来？	Why hasn't he come yet?	لِمَاذَا لَمْ يَأْتِ بَعْدُ؟	Limādhā lam yaʾti baʿd?
h2p369	你怎么知道？	How do you know?	كَيْفَ عَرَفْتَ؟	Kayfa ʿaraft?
h2p370	我知道你是谁。	I know who you are.	أَعْرِفُ مَنْ أَنْتَ.	Aʿrifu man anta.
h2p371	你知道他在哪儿吗？	Do you know where he is?	هَلْ تَعْرِفُ أَيْنَ هُوَ؟	Hal taʿrifu ayna huwa?
h2p372	我不知道怎么说。	I don't know how to say it.	لَا أَعْرِفُ كَيْفَ أَقُولُ ذٰلِكَ.	Lā aʿrifu kayfa aqūlu dhālik.
h2p373	你觉得怎么样？	What do you think?	مَا رَأْيُكَ؟	Mā raʾyuk?
h2p374	我觉得有点儿冷。	I feel a little cold.	أَشْعُرُ بِبَرْدٍ قَلِيلٍ.	Ashʿuru bibardin qalīl.
h2p375	这个问题很好。	That's a good question.	هٰذَا سُؤَالٌ جَيِّدٌ.	Hādhā suʾālun jayyid.
h2p376	没问题！	No problem!	لَا مُشْكِلَةَ!	Lā mushkila!
h2p377	我有一个问题。	I have a question.	عِنْدِي سُؤَالٌ.	ʿIndī suʾāl.
h2p378	这是什么意思？	What does this mean?	مَاذَا يَعْنِي هٰذَا؟	Mādhā yaʿnī hādhā?
h2p379	有意思！	Interesting!	مُمْتِعٌ!	Mumtiʿ!
h2p380	这本书很有意思。	This book is very interesting.	هٰذَا الْكِتَابُ مُمْتِعٌ جِدًّا.	Hādhā al-kitābu mumtiʿun jiddan.
h2p381	那个电影有意思吗？	Is that movie interesting?	هَلْ ذٰلِكَ الْفِيلْمُ مُمْتِعٌ؟	Hal dhālika al-fīlmu mumtiʿ?
h2p382	你来一下。	Come here a moment.	تَعَالَ لَحْظَةً.	Taʿāla laḥẓa.
h2p383	我看一下。	Let me take a look.	دَعْنِي أَنْظُرْ.	Daʿnī anẓur.
h2p384	我想一下。	Let me think for a moment.	دَعْنِي أُفَكِّرُ لَحْظَةً.	Daʿnī ufakkiru laḥẓa.
h2p385	我的手表很贵。	My watch is expensive.	سَاعَتِي غَالِيَةٌ.	Sāʿatī ghāliya.
h2p386	我的手机没电了。	My phone is out of battery.	نَفِدَتْ بَطَّارِيَّةُ هَاتِفِي.	Nafidat baṭṭāriyyatu hātifī.
h2p387	这是今天的报纸。	This is today's newspaper.	هٰذِهِ جَرِيدَةُ الْيَوْمِ.	Hādhihi jarīdatu al-yawm.
h2p388	我在机场等你。	I'll wait for you at the airport.	سَأَنْتَظِرُكَ فِي الْمَطَارِ.	Saʾantaẓiruka fī al-maṭār.
h2p389	飞机几点到？	What time does the plane arrive?	فِي أَيِّ سَاعَةٍ تَصِلُ الطَّائِرَةُ؟	Fī ayyi sāʿatin taṣilu aṭ-ṭāʾira?
h2p390	我坐飞机去旅游。	I'm flying off on a trip.	سَأُسَافِرُ بِالطَّائِرَةِ لِلسِّيَاحَةِ.	Saʾusāfiru bi-ṭ-ṭāʾirati li-s-siyāḥa.
h2p391	你住在几号房间？	Which room are you staying in?	فِي أَيِّ غُرْفَةٍ تُقِيمُ؟	Fī ayyi ghurfatin tuqīm?
h2p392	他坐公共汽车上班。	He takes the bus to work.	يَذْهَبُ إِلَى الْعَمَلِ بِالْحَافِلَةِ.	Yadhhabu ilā al-ʿamali bi-l-ḥāfila.
h2p393	公共汽车来了！	The bus is here!	الْحَافِلَةُ وَصَلَتْ!	Al-ḥāfilatu waṣalat!
h2p394	公司离我家很远。	The company is far from my home.	الشَّرِكَةُ بَعِيدَةٌ عَنْ بَيْتِي.	Ash-sharikatu baʿīdatun ʿan baytī.
h2p395	走路去要多长时间？	How long does it take to walk there?	كَمْ مِنَ الْوَقْتِ يَسْتَغْرِقُ الْمَشْيُ إِلَى هُنَاكَ؟	Kam mina al-waqti yastaghriqu al-mashyu ilā hunāk?
h2p396	学校离我家不远。	The school isn't far from my home.	الْمَدْرَسَةُ لَيْسَتْ بَعِيدَةً عَنْ بَيْتِي.	Al-madrasatu laysat baʿīdatan ʿan baytī.
h2p397	我们走路去吧。	Let's walk there.	لِنَذْهَبْ مَشْيًا.	Linadhhab mashyan.
h2p398	我家旁边有个商店。	There's a shop next to my home.	بِجَانِبِ بَيْتِي مَتْجَرٌ.	Bijānibi baytī matjar.
h2p399	你坐我旁边吧。	Sit next to me.	اِجْلِسْ بِجَانِبِي.	Ijlis bijānibī.
h2p400	她是我们的新同学。	She's our new classmate.	هِيَ زَمِيلَتُنَا الْجَدِيدَةُ.	Hiya zamīlatunā al-jadīda.
h2p401	大家都来了吗？	Is everyone here?	هَلْ حَضَرَ الْجَمِيعُ؟	Hal ḥaḍara al-jamīʿ?
h2p402	大家一起唱吧！	Everyone, sing together!	لِيُغَنِّ الْجَمِيعُ مَعًا!	Liyughanni al-jamīʿu maʿan!
h2p403	我给你打电话。	I'll call you.	سَأَتَّصِلُ بِكَ.	Saʾattaṣilu bik.
h2p404	我给你买了一个西瓜。	I bought you a watermelon.	اِشْتَرَيْتُ لَكَ بَطِّيخَةً.	Ishtaraytu laka baṭṭīkha.
h2p405	这是给你的。	This is for you.	هٰذَا لَكَ.	Hādhā lak.
h2p406	我们去外面吃饭吧。	Let's eat out.	لِنَذْهَبْ لِلْأَكْلِ خَارِجًا.	Linadhhab li-l-ʾakli khārijan.
h2p407	你想吃米饭还是面条？	Do you want rice or noodles?	هَلْ تُرِيدُ أَرُزًّا أَمْ مَعْكَرُونَةً؟	Hal turīdu aruzzan am maʿkarūna?
h2p408	鸡蛋很便宜。	Eggs are cheap.	الْبَيْضُ رَخِيصٌ.	Al-bayḍu rakhīṣ.
h2p409	茶比咖啡好喝。	Tea tastes better than coffee.	الشَّايُ أَلَذُّ مِنَ الْقَهْوَةِ.	Ash-shāyu aladhdhu mina al-qahwa.
h2p410	西瓜是我最喜欢的水果。	Watermelon is my favourite fruit.	الْبَطِّيخُ فَاكِهَتِي الْمُفَضَّلَةُ.	Al-baṭṭīkhu fākihatī al-mufaḍḍala.
h2p411	你吃过羊肉吗？	Have you ever eaten lamb?	هَلْ أَكَلْتَ لَحْمَ الْغَنَمِ مِنْ قَبْلُ؟	Hal akalta laḥma al-ghanami min qabl?
h2p412	我没去过北京。	I've never been to Beijing.	لَمْ أَذْهَبْ إِلَى بِكِينَ أَبَدًا.	Lam adhhab ilā bikīna abadan.
h2p413	今天是几月几日？	What's the date today?	مَا هُوَ تَارِيخُ الْيَوْمِ؟	Mā huwa tārīkhu al-yawm?
h2p414	一年有三百六十五天。	A year has three hundred and sixty-five days.	فِي السَّنَةِ ثَلَاثُمِئَةٍ وَخَمْسَةٌ وَسِتُّونَ يَوْمًا.	Fī as-sanati thalāthumiʾatin wakhamsatun wasittūna yawman.
h2p415	我有一千个问题！	I have a thousand questions!	عِنْدِي أَلْفُ سُؤَالٍ!	ʿIndī alfu suʾāl!
h2p416	我们两个人一起去。	The two of us will go together.	سَنَذْهَبُ كِلَانَا مَعًا.	Sanadhhabu kilānā maʿan.
h2p417	那个男人是谁？	Who is that man?	مَنْ ذٰلِكَ الرَّجُلُ؟	Man dhālika ar-rajul?
h2p418	您请坐。	Please have a seat.	تَفَضَّلْ بِالْجُلُوسِ.	Tafaḍḍal bi-l-julūs.
h2p419	您想喝什么？	What would you like to drink?	مَاذَا تُرِيدُ أَنْ تَشْرَبَ؟	Mādhā turīdu an tashrab?
h2p420	它在哪儿？	Where is it?	أَيْنَ هُوَ؟	Ayna huwa?
```
