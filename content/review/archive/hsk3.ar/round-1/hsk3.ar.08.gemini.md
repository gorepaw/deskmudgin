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
h3p429	洗完澡，我觉得很舒服。	After a bath I feel really comfortable.	بَعْدَ الِاسْتِحْمَامِ أَشْعُرُ بِرَاحَةٍ كَبِيرَةٍ.	Baʿda al-istiḥmāmi ashʿuru birāḥatin kabīra.
h3p430	夏天的晚上很舒服。	Summer nights are really pleasant.	لَيَالِي الصَّيْفِ مُرِيحَةٌ جِدًّا.	Layālī aṣ-ṣayfi murīḥatun jiddan.
h3p431	我想先睡，你也早点睡。	I want to sleep first, and you sleep early too.	أُرِيدُ أَنْ أَنَامَ أَوَّلًا، وَأَنْتَ نَمْ مُبَكِّرًا أَيْضًا.	Urīdu an anāma awwalan, waʾanta nam mubakkiran ayḍan.
h3p432	我喜欢这个小故事。	I like this little story.	تُعْجِبُنِي هٰذِهِ الْقِصَّةُ الصَّغِيرَةُ.	Tuʿjibunī hādhihi al-qiṣṣatu aṣ-ṣaghīra.
h3p433	香蕉是我最爱的水果。	Bananas are my favorite fruit.	الْمَوْزُ هُوَ فَاكِهَتِي الْمُفَضَّلَةُ.	Al-mawzu huwa fākihatī al-mufaḍḍala.
h3p434	我向你跑过去了。	I ran over toward you.	رَكَضْتُ نَحْوَكَ.	Rakaḍtu naḥwak.
h3p435	你像我的哥哥一样。	You're like a big brother to me.	أَنْتَ مِثْلُ أَخِي الْكَبِيرِ.	Anta mithlu akhī al-kabīr.
h3p436	小心，别把我放在地上。	Careful, don't put me on the floor.	اِنْتَبِهْ، لَا تَضَعْنِي عَلَى الْأَرْضِ.	Intabih, lā taḍaʿnī ʿalā al-ʾarḍ.
h3p437	校长今天没有来学校。	The principal didn't come to school today.	لَمْ يَأْتِ مُدِيرُ الْمَدْرَسَةِ إِلَى الْمَدْرَسَةِ الْيَوْمَ.	Lam yaʾti mudīru al-madrasati ilā al-madrasati al-yawm.
h3p438	我在电视上看新闻。	I'm watching the news on TV.	أُشَاهِدُ الْأَخْبَارَ عَلَى التِّلْفَازِ.	Ushāhidu al-ʾakhbāra ʿalā at-tilfāz.
h3p439	我要新鲜的鱼，不要旧的。	I want fresh fish, not old.	أُرِيدُ سَمَكًا طَازَجًا، لَا قَدِيمًا.	Urīdu samakan ṭāzajan, lā qadīman.
h3p440	我给爷爷写了信。	I wrote a letter to my grandpa.	كَتَبْتُ رِسَالَةً إِلَى جَدِّي.	Katabtu risālatan ilā jaddī.
h3p441	你的行李箱里有什么？	What is in your suitcase?	مَاذَا فِي حَقِيبَةِ سَفَرِكَ؟	Mādhā fī ḥaqībati safarik?
h3p442	熊猫也喜欢吃东西。	Pandas like eating too.	الدُّبُّ الْبَانْدَا يُحِبُّ الْأَكْلَ أَيْضًا.	Ad-dubbu al-bāndā yuḥibbu al-ʾakla ayḍan.
h3p443	我需要休息一下。	I need to rest for a bit.	أَحْتَاجُ إِلَى قَلِيلٍ مِنَ الرَّاحَةِ.	Aḥtāju ilā qalīlin mina ar-rāḥa.
h3p444	选择太多了，我不知道吃什么。	There are too many choices, and I don't know what to eat.	الْخِيَارَاتُ كَثِيرَةٌ جِدًّا، لَا أَعْرِفُ مَاذَا آكُلُ.	Al-khiyārātu kathīratun jiddan, lā aʿrifu mādhā ākul.
h3p445	你的要求我都记住了。	I've remembered all your requests.	حَفِظْتُ كُلَّ طَلَبَاتِكَ.	Ḥafiẓtu kulla ṭalabātik.
h3p446	爷爷的家很大。	Grandpa's home is very big.	بَيْتُ جَدِّي كَبِيرٌ جِدًّا.	Baytu jaddī kabīrun jiddan.
h3p447	我一定会好好听话。	I'll definitely be good and listen.	سَأَكُونُ مُطِيعًا بِالتَّأْكِيدِ.	Saʾakūnu muṭīʿan bi-t-taʾkīd.
h3p448	我们一共有几个人？	How many of us are there altogether?	كَمْ عَدَدُنَا فِي الْمَجْمُوعِ؟	Kam ʿadadunā fī al-majmūʿ?
h3p449	你等我一会儿，好吗？	Wait for me a moment, okay?	اِنْتَظِرْنِي قَلِيلًا، حَسَنًا؟	Intaẓirnī qalīlan, ḥasanan?
h3p450	你是我的家人，我很放心。	You're my family, so I feel at ease.	أَنْتَ مِنْ عَائِلَتِي، فَأَنَا مُطْمَئِنٌّ.	Anta min ʿāʾilatī, faʾanā muṭmaʾinn.
h3p451	我一直想有个朋友。	I've always wanted a friend.	كُنْتُ أُرِيدُ دَائِمًا أَنْ يَكُونَ لِي صَدِيقٌ.	Kuntu urīdu dāʾiman an yakūna lī ṣadīq.
h3p452	以前的日子也很好。	The days before were nice too.	الْأَيَّامُ السَّابِقَةُ كَانَتْ جَمِيلَةً أَيْضًا.	Al-ʾayyāmu as-sābiqatu kānat jamīlatan ayḍan.
h3p453	我们一般什么时候吃饭？	When do we usually eat?	مَتَى نَأْكُلُ عَادَةً؟	Matā naʾkulu ʿāda?
h3p454	我在听音乐，别说话。	I'm listening to music, so don't talk.	أَسْتَمِعُ إِلَى الْمُوسِيقَى، فَلَا تَتَكَلَّمْ.	Astamiʿu ilā al-mūsīqā, falā tatakallam.
h3p455	我们去银行旁边玩吧。	Let's go play next to the bank.	لِنَذْهَبْ وَنَلْعَبْ بِجَانِبِ الْمَصْرِفِ.	Linadhhab wanalʿab bijānibi al-maṣrif.
h3p456	这杯饮料是谁的？	Whose drink is this?	لِمَنْ هٰذَا الْمَشْرُوبُ؟	Liman hādhā al-mashrūb?
h3p457	我应该去睡觉了。	I should go to sleep now.	يَنْبَغِي أَنْ أَذْهَبَ لِأَنَامَ الْآنَ.	Yanbaghī an adhhaba liʾanāma al-ʾān.
h3p458	天气会影响我睡觉。	The weather affects my sleep.	الطَّقْسُ يُؤَثِّرُ فِي نَوْمِي.	Aṭ-ṭaqsu yuʾaththiru fī nawmī.
h3p459	你用什么听音乐？	What do you use to listen to music?	بِمَاذَا تَسْتَمِعُ إِلَى الْمُوسِيقَى؟	Bimādhā tastamiʿu ilā al-mūsīqā?
h3p460	我们再玩一个游戏吧。	Let's play another game.	لِنَلْعَبْ لُعْبَةً أُخْرَى.	Linalʿab luʿbatan ukhrā.
h3p461	这里最有名的是什么？	What's the most famous thing here?	مَا أَشْهَرُ شَيْءٍ هُنَا؟	Mā ashharu shayʾin hunā?
h3p462	你又忘记吃饭了吗？	Did you forget to eat again?	هَلْ نَسِيتَ أَنْ تَأْكُلَ مَرَّةً أُخْرَى؟	Hal nasīta an taʾkula marratan ukhrā?
h3p463	我今天遇到很多朋友。	I ran into lots of friends today.	قَابَلْتُ أَصْدِقَاءَ كَثِيرِينَ الْيَوْمَ.	Qābaltu aṣdiqāʾa kathīrīna al-yawm.
h3p464	我愿意一直和你在一起。	I'm willing to stay with you always.	أَرْغَبُ فِي أَنْ أَبْقَى مَعَكَ دَائِمًا.	Arghabu fī an abqā maʿaka dāʾiman.
h3p465	月亮出来了，晚安。	The moon is out, good night.	طَلَعَ الْقَمَرُ، تُصْبِحُ عَلَى خَيْرٍ.	Ṭalaʿa al-qamar, tuṣbiḥu ʿalā khayr.
h3p466	我越吃越想吃。	The more I eat, the more I want.	كُلَّمَا أَكَلْتُ أَكْثَرَ، أَرَدْتُ أَكْثَرَ.	Kullamā akaltu akthar, aradtu akthar.
h3p467	车站的人很多，我有点怕。	There are lots of people at the station, and I'm a bit scared.	النَّاسُ كَثِيرُونَ فِي الْمَحَطَّةِ، أَنَا خَائِفٌ قَلِيلًا.	An-nāsu kathīrūna fī al-maḥaṭṭa, anā khāʾifun qalīlan.
h3p468	我想要一个礼物，你能送我吗？	I want a present. Can you give me one?	أُرِيدُ هَدِيَّةً، هَلْ تُعْطِينِي وَاحِدَةً؟	Urīdu hadiyya, hal tuʿṭīnī wāḥida?
h3p469	我喜欢听历史故事。	I like listening to history stories.	أُحِبُّ الِاسْتِمَاعَ إِلَى قِصَصٍ تَارِيخِيَّةٍ.	Uḥibbu al-istimāʿa ilā qiṣaṣin tārīkhiyya.
h3p470	附近有一个公园，我们去玩吧！	There is a park nearby. Let's go and play!	تُوجَدُ حَدِيقَةٌ قَرِيبَةٌ، لِنَذْهَبْ وَنَلْعَبْ!	Tūjadu ḥadīqatun qarība, linadhhab wanalʿab!
h3p471	我一边吃饭，一边看电视。	I am eating and watching TV at the same time.	آكُلُ وَأُشَاهِدُ التِّلْفَازَ فِي الْوَقْتِ نَفْسِهِ.	Ākulu waʾushāhidu at-tilfāza fī al-waqti nafsih.
h3p472	我的嘴好干，想喝水。	My mouth is so dry. I want some water.	فَمِي جَافٌّ جِدًّا، أُرِيدُ أَنْ أَشْرَبَ مَاءً.	Famī jāffun jiddan, urīdu an ashraba māʾan.
```
