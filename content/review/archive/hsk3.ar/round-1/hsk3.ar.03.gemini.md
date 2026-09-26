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
h3p121	天阴了，我担心会下雨。	The sky has clouded over. I'm worried it will rain.	تَغَيَّمَتِ السَّمَاءُ، أَخَافُ أَنْ تُمْطِرَ.	Taghayyamati as-samāʾ, akhāfu an tumṭir.
h3p122	我想跟你一起去公园。	I want to go to the park with you.	أُرِيدُ أَنْ أَذْهَبَ مَعَكَ إِلَى الْحَدِيقَةِ.	Urīdu an adhhaba maʿaka ilā al-ḥadīqa.
h3p123	我最喜欢你的手，很舒服。	I like your hands best. They feel nice.	يَدَاكَ أَحَبُّ شَيْءٍ إِلَيَّ، وَهُمَا مُرِيحَتَانِ.	Yadāka aḥabbu shayʾin ilayy, wahumā murīḥatān.
h3p124	公园里的花开了，好看极了！	The flowers in the park are out. They're so pretty!	تَفَتَّحَتِ الْأَزْهَارُ فِي الْحَدِيقَةِ، مَا أَجْمَلَهَا!	Tafattaḥati al-ʾazhāru fī al-ḥadīqa, mā ajmalahā!
h3p125	给我讲一个故事吧。	Tell me a story.	احْكِ لِي قِصَّةً.	Iḥki lī qiṣṣa.
h3p126	外面在刮风，我不想出去。	It's windy outside. I don't want to go out.	الرِّيحُ تَهُبُّ فِي الْخَارِجِ، لَا أُرِيدُ أَنْ أَخْرُجَ.	Ar-rīḥu tahubbu fī al-khārij, lā urīdu an akhruj.
h3p127	请把灯关了，我想睡觉。	Please turn off the light. I want to sleep.	مِنْ فَضْلِكَ أَطْفِئِ الْمِصْبَاحَ، أُرِيدُ أَنْ أَنَامَ.	Min faḍlika aṭfiʾi al-miṣbāḥ, urīdu an anām.
h3p128	你和我的关系最好了！	You and I are the best of friends!	أَنْتَ أَفْضَلُ صَدِيقٍ لِي!	Anta afḍalu ṣadīqin lī!
h3p129	谢谢你这么关心我。	Thank you for caring about me so much.	شُكْرًا لَكَ عَلَى اهْتِمَامِكَ الْكَبِيرِ بِي.	Shukran laka ʿalā ihtimāmika al-kabīri bī.
h3p130	关于明天，你有什么打算？	What are your plans for tomorrow?	بِخُصُوصِ الْغَدِ، مَاذَا تَنْوِي أَنْ تَفْعَلَ؟	Bikhuṣūṣi al-ghad, mādhā tanwī an tafʿal?
h3p131	你去过几个国家？	How many countries have you been to?	كَمْ بَلَدًا زُرْتَ؟	Kam baladan zurt?
h3p132	过去我住在水里。	I used to live in the water.	فِي الْمَاضِي كُنْتُ أَسْكُنُ فِي الْمَاءِ.	Fī al-māḍī kuntu askunu fī al-māʾ.
h3p133	你想吃蛋糕还是面包？	Would you like cake or bread?	هَلْ تُرِيدُ كَعْكَةً أَمْ خُبْزًا؟	Hal turīdu kaʿkatan am khubzan?
h3p134	外面下大雨，我好害怕。	It is pouring outside. I am so scared.	الْمَطَرُ غَزِيرٌ فِي الْخَارِجِ، أَنَا خَائِفٌ جِدًّا.	Al-maṭaru ghazīrun fī al-khārij, anā khāʾifun jiddan.
h3p135	黑板上写的字，我看不懂。	I can't read what's written on the blackboard.	لَا أَفْهَمُ مَا كُتِبَ عَلَى السَّبُّورَةِ.	Lā afhamu mā kutiba ʿalā as-sabbūra.
h3p136	后来我又睡着了。	Afterwards I fell asleep again.	وَبَعْدَ ذٰلِكَ نِمْتُ مَرَّةً أُخْرَى.	Wabaʿda dhālika nimtu marratan ukhrā.
h3p137	你的护照在哪儿？	Where's your passport?	أَيْنَ جَوَازُ سَفَرِكَ؟	Ayna jawāzu safarik?
h3p138	我想把钱花在好吃的东西上。	I want to spend my money on tasty things.	أُرِيدُ أَنْ أُنْفِقَ مَالِي عَلَى أَشْيَاءَ لَذِيذَةٍ.	Urīdu an unfiqa mālī ʿalā ashyāʾa ladhīdha.
h3p139	我想画一只大鱼。	I want to draw a big fish.	أُرِيدُ أَنْ أَرْسُمَ سَمَكَةً كَبِيرَةً.	Urīdu an arsuma samakatan kabīra.
h3p140	我的东西坏了，你能帮我吗？	Something of mine is broken. Can you help me?	انْكَسَرَ شَيْءٌ مِنْ أَغْرَاضِي، هَلْ تُسَاعِدُنِي؟	Inkasara shayʾun min aghrāḍī, hal tusāʿidunī?
h3p141	这里的环境真好，很安静。	It's lovely here. So quiet.	الْمَكَانُ جَمِيلٌ هُنَا، وَهَادِئٌ جِدًّا.	Al-makānu jamīlun hunā, wahādiʾun jiddan.
h3p142	我想换一个新的家。	I want to switch to a new home.	أُرِيدُ أَنْ أَنْتَقِلَ إِلَى بَيْتٍ جَدِيدٍ.	Urīdu an antaqila ilā baytin jadīd.
h3p143	你去过黄河吗？	Have you ever been to the Yellow River?	هَلْ زُرْتَ النَّهْرَ الْأَصْفَرَ؟	Hal zurta an-nahra al-ʾaṣfar?
h3p144	你今天有会议吗？别忘了我！	Do you have a meeting today? Don't forget about me!	هَلْ عِنْدَكَ اجْتِمَاعٌ الْيَوْمَ؟ لَا تَنْسَنِي!	Hal ʿindaka ijtimāʿun al-yawm? Lā tansanī!
h3p145	茶或者果汁，我都可以喝。	Tea or juice, either is fine with me.	الشَّايُ أَوِ الْعَصِيرُ، لَا فَرْقَ عِنْدِي، أَشْرَبُ أَيَّهُمَا.	Ash-shāyu awi al-ʿaṣīr, lā farqa ʿindī, ashrabu ayyahumā.
h3p146	我几乎每天都想你。	I think of you almost every day.	أَشْتَاقُ إِلَيْكَ كُلَّ يَوْمٍ تَقْرِيبًا.	Ashtāqu ilayka kulla yawmin taqrīban.
h3p147	这是个好机会，我们出去玩吧！	This is a great chance. Let's go out and play!	هٰذِهِ فُرْصَةٌ جَيِّدَةٌ، لِنَخْرُجْ وَنَلْعَبْ!	Hādhihi furṣatun jayyida, linakhruj wanalʿab!
h3p148	今天出太阳了，我高兴极了！	The sun is out today. I'm so happy!	خَرَجَتِ الشَّمْسُ الْيَوْمَ، أَنَا سَعِيدٌ جِدًّا!	Kharajati ash-shamsu al-yawm, anā saʿīdun jiddan!
h3p149	你还记得我的名字吗？	Do you still remember my name?	هَلْ مَا زِلْتَ تَذْكُرُ اسْمِي؟	Hal mā zilta tadhkuru ismī?
h3p150	我最喜欢的季节是春天。	Spring is my favorite season.	فَصْلِي الْمُفَضَّلُ هُوَ الرَّبِيعُ.	Faṣlī al-mufaḍḍalu huwa ar-rabīʿ.
h3p151	让我检查一下你的包里有没有吃的。	Let me check whether there's any food in your bag.	دَعْنِي أَفْحَصْ هَلْ فِي حَقِيبَتِكَ طَعَامٌ.	Daʿnī afḥaṣ hal fī ḥaqībatika ṭaʿām.
h3p152	这个很简单，我也会！	This is easy. Even I can do it!	هٰذَا سَهْلٌ جِدًّا، أَنَا أَيْضًا أَسْتَطِيعُ!	Hādhā sahlun jiddan, anā ayḍan astaṭīʿ!
h3p153	多吃水果，身体才健康。	Eat more fruit and you'll be healthy.	كُلِ الْفَاكِهَةَ كَثِيرًا لِتَكُونَ بِصِحَّةٍ جَيِّدَةٍ.	Kuli al-fākihata kathīran litakūna biṣiḥḥatin jayyida.
h3p154	明天见面时，我有东西要给你看。	When we meet tomorrow, I have something to show you.	عِنْدَمَا نَلْتَقِي غَدًا، عِنْدِي شَيْءٌ أُرِيدُ أَنْ أُرِيَكَ إِيَّاهُ.	ʿIndamā naltaqī ghadan, ʿindī shayʾun urīdu an uriyaka iyyāh.
h3p155	我给你讲讲今天的事情吧。	Let me tell you what happened today.	دَعْنِي أَحْكِ لَكَ مَا حَدَثَ الْيَوْمَ.	Daʿnī aḥki laka mā ḥadatha al-yawm.
h3p156	你教我说话，好不好？	Will you teach me to talk?	هَلْ تُعَلِّمُنِي الْكَلَامَ؟	Hal tuʿallimunī al-kalām?
h3p157	我喜欢坐在桌子的一角。	I like sitting on the corner of the table.	أُحِبُّ الْجُلُوسَ عَلَى زَاوِيَةِ الطَّاوِلَةِ.	Uḥibbu al-julūsa ʿalā zāwiyati aṭ-ṭāwila.
h3p158	我的脚好冷。	My feet are so cold.	قَدَمَايَ بَارِدَتَانِ جِدًّا.	Qadamāya bāridatāni jiddan.
h3p159	你能来接我吗？	Can you come and pick me up?	هَلْ تَسْتَطِيعُ أَنْ تَأْتِيَ لِتَأْخُذَنِي؟	Hal tastaṭīʿu an taʾtiya litaʾkhudhanī?
h3p160	电视里有一个好看的节目。	There's a good show on TV.	فِي التِّلْفَازِ بَرْنَامَجٌ جَمِيلٌ.	Fī at-tilfāzi barnāmajun jamīl.
h3p161	今天是节日，我们吃好吃的吧！	It's a holiday today. Let's eat something yummy!	الْيَوْمَ عِيدٌ، لِنَأْكُلْ شَيْئًا لَذِيذًا!	Al-yawma ʿīd, linaʾkul shayʾan ladhīdhan!
h3p162	两只小鱼要结婚了！	Two little fish are getting married!	سَمَكَتَانِ صَغِيرَتَانِ سَتَتَزَوَّجَانِ!	Samakatāni ṣaghīratāni satatazawwajān!
h3p163	会议什么时候结束？	When does the meeting end?	مَتَى يَنْتَهِي الِاجْتِمَاعُ؟	Matā yantahī al-ijtimāʿ?
h3p164	我不会做这个，你能帮我解决吗？	I can't do this. Can you sort it out for me?	لَا أَعْرِفُ كَيْفَ أَفْعَلُ هٰذَا، هَلْ تُسَاعِدُنِي فِي حَلِّهِ؟	Lā aʿrifu kayfa afʿalu hādhā, hal tusāʿidunī fī ḥallih?
h3p165	我可以借你的椅子坐一下吗？	Can I borrow your chair for a bit?	هَلْ أَسْتَطِيعُ أَنْ أَسْتَعِيرَ كُرْسِيَّكَ لِلْجُلُوسِ قَلِيلًا؟	Hal astaṭīʿu an astaʿīra kursiyyaka li-l-julūsi qalīlan?
h3p166	你为什么经常不理我？	Why do you so often ignore me?	لِمَاذَا تَتَجَاهَلُنِي كَثِيرًا؟	Limādhā tatajāhalunī kathīran?
h3p167	我看到一只猫经过门口。	I saw a cat pass by the door.	رَأَيْتُ قِطَّةً تَمُرُّ أَمَامَ الْبَابِ.	Raʾaytu qiṭṭatan tamurru amāma al-bāb.
h3p168	你的经理今天不高兴吗？	Is your manager in a bad mood today?	هَلْ مُدِيرُكَ مُنْزَعِجٌ الْيَوْمَ؟	Hal mudīruka munzaʿijun al-yawm?
h3p169	你走了好久，我一个人好难过。	You have been gone so long. I am so sad on my own.	ذَهَبْتَ مُنْذُ وَقْتٍ طَوِيلٍ، وَأَنَا حَزِينٌ جِدًّا وَحْدِي.	Dhahabta mundhu waqtin ṭawīl, waʾanā ḥazīnun jiddan waḥdī.
h3p170	这本旧书是我最爱的。	This old book is my favorite.	هٰذَا الْكِتَابُ الْقَدِيمُ هُوَ أَحَبُّ الْكُتُبِ إِلَيَّ.	Hādhā al-kitābu al-qadīmu huwa aḥabbu al-kutubi ilayy.
h3p171	你能教我说这个句子吗？	Can you teach me to say this sentence?	هَلْ تُعَلِّمُنِي كَيْفَ أَقُولُ هٰذِهِ الْجُمْلَةَ؟	Hal tuʿallimunī kayfa aqūlu hādhihi al-jumla?
h3p172	我决定了，今天不睡觉！	I've decided. I'm not sleeping today!	قَرَّرْتُ، لَنْ أَنَامَ الْيَوْمَ!	Qarrart, lan anāma al-yawm!
h3p173	你的脸好可爱！	Your face is so cute!	وَجْهُكَ لَطِيفٌ جِدًّا!	Wajhuka laṭīfun jiddan!
h3p174	我渴了，想喝水。	I'm thirsty. I want some water.	أَنَا عَطْشَانُ، أُرِيدُ أَنْ أَشْرَبَ مَاءً.	Anā ʿaṭshān, urīdu an ashraba māʾan.
h3p175	现在是三点一刻。	It's a quarter past three.	السَّاعَةُ الْآنَ الثَّالِثَةُ وَالرُّبْعُ.	As-sāʿatu al-ʾāna ath-thālithatu wa-r-rubʿ.
h3p176	有客人来了，快去开门！	A guest is here. Go and open the door!	جَاءَ ضَيْفٌ، أَسْرِعْ وَافْتَحِ الْبَابَ!	Jāʾa ḍayf, asriʿ waftaḥi al-bāb!
h3p177	空调太冷了，我要感冒了。	The air conditioning is too cold. I'm going to catch a cold.	الْمُكَيِّفُ بَارِدٌ أَكْثَرَ مِنَ اللَّازِمِ، سَأُصَابُ بِالزُّكَامِ.	Al-mukayyifu bāridun akthara mina al-lāzim, saʾuṣābu bi-z-zukām.
h3p178	我想吃一口你的蛋糕。	I'd like a bite of your cake.	أُرِيدُ قَضْمَةً مِنْ كَعْكَتِكَ.	Urīdu qaḍmatan min kaʿkatik.
h3p179	你走了，我想哭。	You're leaving, and I want to cry.	أَنْتَ تَذْهَبُ، وَأُرِيدُ أَنْ أَبْكِيَ.	Anta tadhhab, waʾurīdu an abkiy.
h3p180	你的裤子真好看。	Your trousers look really nice.	سِرْوَالُكَ جَمِيلٌ حَقًّا.	Sirwāluka jamīlun ḥaqqan.
```
