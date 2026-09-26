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
h3p001	阿姨，你今天来得真早！	Auntie, you're here so early today!	يَا خَالَتِي، جِئْتِ مُبَكِّرَةً الْيَوْمَ حَقًّا!	Yā khālatī, jiʾti mubakkiratan al-yawma ḥaqqan!
h3p002	啊，你回来了！	Ah, you're back!	آهٍ، لَقَدْ عُدْتَ!	Āh, laqad ʿudt!
h3p003	我个子太矮，拿不到桌上的包。	I'm too short to get the bag on the table.	أَنَا أَقْصَرُ مِنْ أَنْ أَصِلَ إِلَى الْحَقِيبَةِ الَّتِي عَلَى الطَّاوِلَةِ.	Anā aqṣaru min an aṣila ilā al-ḥaqībati allatī ʿalā aṭ-ṭāwila.
h3p004	你的爱好是什么？	What's your hobby?	مَا هِوَايَتُكَ؟	Mā hiwāyatuk?
h3p005	我的爱好是睡觉。	My hobby is sleeping.	هِوَايَتِي هِيَ النَّوْمُ.	Hiwāyatī hiya an-nawm.
h3p006	这里好安静，我想睡觉了。	It's so quiet here. I feel like sleeping.	الْمَكَانُ هَادِئٌ جِدًّا هُنَا، أُرِيدُ أَنْ أَنَامَ.	Al-makānu hādiʾun jiddan hunā, urīdu an anām.
h3p007	请你把我放在灯下面。	Please put me under the light.	مِنْ فَضْلِكَ، ضَعْنِي تَحْتَ الْمِصْبَاحِ.	Min faḍlik, ḍaʿnī taḥta al-miṣbāḥ.
h3p008	你今天几点上班？	What time do you start work today?	فِي أَيِّ سَاعَةٍ تَبْدَأُ الْعَمَلَ الْيَوْمَ؟	Fī ayyi sāʿatin tabdaʾu al-ʿamala al-yawm?
h3p009	我们班的同学都很好。	Everyone in our class is nice.	زُمَلَاؤُنَا فِي الصَّفِّ كُلُّهُمْ لُطَفَاءُ.	Zumalāʾunā fī aṣ-ṣaffi kulluhum luṭafāʾ.
h3p010	别搬我，我很重！	Don't move me, I'm heavy!	لَا تَنْقُلْنِي، أَنَا ثَقِيلٌ!	Lā tanqulnī, anā thaqīl!
h3p011	我只吃了半个蛋糕。	I only ate half a cake.	أَكَلْتُ نِصْفَ كَعْكَةٍ فَقَطْ.	Akaltu niṣfa kaʿkatin faqaṭ.
h3p012	我没有办法，只好等你。	I have no choice but to wait for you.	لَيْسَ عِنْدِي حِيلَةٌ، لَا أَسْتَطِيعُ إِلَّا أَنْ أَنْتَظِرَكَ.	Laysa ʿindī ḥīla, lā astaṭīʿu illā an antaẓirak.
h3p013	你的办公室大不大？	Is your office big?	هَلْ مَكْتَبُكَ كَبِيرٌ؟	Hal maktabuka kabīr?
h3p014	你能帮忙拿一下这个吗？	Can you help me carry this?	هَلْ تَسْتَطِيعُ أَنْ تُسَاعِدَنِي فِي حَمْلِ هٰذَا؟	Hal tastaṭīʿu an tusāʿidanī fī ḥamli hādhā?
h3p015	你的包里有好吃的吗？	Is there anything tasty in your bag?	هَلْ فِي حَقِيبَتِكَ شَيْءٌ لَذِيذٌ؟	Hal fī ḥaqībatika shayʾun ladhīdh?
h3p016	我吃饱了，想睡觉。	I'm full and I want to sleep.	شَبِعْتُ، وَأُرِيدُ أَنْ أَنَامَ.	Shabiʿt, waʾurīdu an anām.
h3p017	我吃得好饱啊！	I'm so full!	لَقَدْ شَبِعْتُ جِدًّا!	Laqad shabiʿtu jiddan!
h3p018	我想去北方看雪。	I want to go to the north to see snow.	أُرِيدُ أَنْ أَذْهَبَ إِلَى الشَّمَالِ لِأَرَى الثَّلْجَ.	Urīdu an adhhaba ilā ash-shamāli liʾarā ath-thalj.
h3p019	你把我拿起来了！	You picked me up!	لَقَدْ رَفَعْتَنِي!	Laqad rafaʿtanī!
h3p020	我的鼻子有点儿冷。	My nose is a bit cold.	أَنْفِي بَارِدٌ قَلِيلًا.	Anfī bāridun qalīlan.
h3p021	今天比较冷，你多穿点儿。	It's rather cold today, so wear more.	الْجَوُّ بَارِدٌ نَوْعًا مَا الْيَوْمَ، فَالْبَسْ مَلَابِسَ أَكْثَرَ.	Al-jawwu bāridun nawʿan mā al-yawm, fa-l-bas malābisa akthar.
h3p022	你的比赛什么时候开始？	When does your match start?	مَتَى تَبْدَأُ مُبَارَاتُكَ؟	Matā tabdaʾu mubārātuk?
h3p023	你的笔记本可以借我吗？	Can I borrow your notebook?	هَلْ يُمْكِنُنِي أَنْ أَسْتَعِيرَ دَفْتَرَكَ؟	Hal yumkinunī an astaʿīra daftarak?
h3p024	你必须早点儿睡觉。	You must go to bed early.	يَجِبُ أَنْ تَنَامَ مُبَكِّرًا.	Yajibu an tanāma mubakkiran.
h3p025	天气有变化，要下雨了。	The weather is changing. It's going to rain.	الْجَوُّ يَتَغَيَّرُ، وَسَتُمْطِرُ قَرِيبًا.	Al-jawwu yataghayyar, wasatumṭiru qarīban.
h3p026	别人都走了，只有我在这儿。	Everyone else has gone. Only I'm here.	ذَهَبَ الْآخَرُونَ كُلُّهُمْ، وَبَقِيتُ أَنَا هُنَا فَقَطْ.	Dhahaba al-ʾākharūna kulluhum, wabaqītu anā hunā faqaṭ.
h3p027	冰箱里有蛋糕吗？	Is there any cake in the fridge?	هَلْ فِي الثَّلَّاجَةِ كَعْكَةٌ؟	Hal fī ath-thallājati kaʿka?
h3p028	我不但饿，而且很累。	I'm not only hungry, I'm tired too.	أَنَا لَسْتُ جَائِعًا فَقَطْ، بَلْ مُتْعَبٌ أَيْضًا.	Anā lastu jāʾiʿan faqaṭ, bal mutʿabun ayḍan.
h3p029	把菜单给我看看吧。	Let me see the menu.	أَرِنِي قَائِمَةَ الطَّعَامِ، مِنْ فَضْلِكَ.	Arinī qāʾimata aṭ-ṭaʿām, min faḍlik.
h3p030	你怎么才回来？	Why are you only just back?	لِمَاذَا لَمْ تَعُدْ إِلَّا الْآنَ؟	Limādhā lam taʿud illā al-ʾān?
h3p031	我想参加你的比赛。	I want to take part in your match.	أُرِيدُ أَنْ أُشَارِكَ فِي مُبَارَاتِكَ.	Urīdu an ushārika fī mubārātik.
h3p032	外面的草绿了。	The grass outside has turned green.	أَصْبَحَ الْعُشْبُ فِي الْخَارِجِ أَخْضَرَ.	Aṣbaḥa al-ʿushbu fī al-khāriji akhḍar.
h3p033	你住在几层？	Which floor do you live on?	فِي أَيِّ طَابِقٍ تَسْكُنُ؟	Fī ayyi ṭābiqin taskun?
h3p034	我的成绩比上次差。	My grade is worse than last time.	دَرَجَاتِي أَسْوَأُ مِنَ الْمَرَّةِ الْمَاضِيَةِ.	Darajātī aswaʾu mina al-marrati al-māḍiya.
h3p035	你带我去超市，好吗？	Will you take me to the supermarket?	هَلْ تَأْخُذُنِي إِلَى الْمَتْجَرِ الْكَبِيرِ؟	Hal taʾkhudhunī ilā al-matjari al-kabīr?
h3p036	你的衬衫真好看。	Your shirt looks really nice.	قَمِيصُكَ جَمِيلٌ حَقًّا.	Qamīṣuka jamīlun ḥaqqan.
h3p037	我今天的成绩不错！	My grade today is pretty good!	دَرَجَاتِي الْيَوْمَ جَيِّدَةٌ جِدًّا!	Darajātī al-yawma jayyidatun jiddan!
h3p038	这个城市很大，也很漂亮。	This city is big and pretty.	هٰذِهِ الْمَدِينَةُ كَبِيرَةٌ وَجَمِيلَةٌ أَيْضًا.	Hādhihi al-madīnatu kabīratun wajamīlatun ayḍan.
h3p039	我快迟到了，你快点儿！	I'm going to be late, hurry up!	سَأَتَأَخَّرُ، أَسْرِعْ!	Saʾataʾakhkhar, asriʿ!
h3p040	你怎么又迟到了？	Why are you late again?	لِمَاذَا تَأَخَّرْتَ مَرَّةً أُخْرَى؟	Limādhā taʾakhkharta marratan ukhrā?
h3p041	你终于出现了！	You finally showed up!	ظَهَرْتَ أَخِيرًا!	Ẓaharta akhīran!
h3p042	除了你，我谁也不想见。	I don't want to see anyone but you.	لَا أُرِيدُ أَنْ أَرَى أَحَدًا غَيْرَكَ.	Lā urīdu an arā aḥadan ghayrak.
h3p043	厨房里有好吃的东西。	There's something tasty in the kitchen.	فِي الْمَطْبَخِ شَيْءٌ لَذِيذٌ.	Fī al-maṭbakhi shayʾun ladhīdh.
h3p044	春天到了，我好高兴！	Spring is here, I'm so happy!	جَاءَ الرَّبِيعُ، مَا أَسْعَدَنِي!	Jāʾa ar-rabīʿ, mā asʿadanī!
h3p045	这个词语是什么意思？	What does this word mean?	مَا مَعْنَى هٰذِهِ الْكَلِمَةِ؟	Mā maʿnā hādhihi al-kalima?
h3p046	你真聪明！	You're so clever!	مَا أَذْكَاكَ!	Mā adhkāk!
h3p047	我打扫得很干净吧？	I cleaned it really well, didn't I?	لَقَدْ نَظَّفْتُ الْمَكَانَ جَيِّدًا، أَلَيْسَ كَذٰلِكَ؟	Laqad naẓẓaftu al-makāna jayyidan, alaysa kadhālik?
h3p048	你今天打算做什么？	What do you plan to do today?	مَاذَا تَنْوِي أَنْ تَفْعَلَ الْيَوْمَ؟	Mādhā tanwī an tafʿala al-yawm?
h3p049	我打算去公园玩儿。	I plan to go and play in the park.	أَنْوِي أَنْ أَذْهَبَ إِلَى الْحَدِيقَةِ لِأَلْعَبَ.	Anwī an adhhaba ilā al-ḥadīqati liʾalʿab.
h3p050	你出门要带手机。	Take your phone when you go out.	خُذْ هَاتِفَكَ عِنْدَمَا تَخْرُجُ.	Khudh hātifaka ʿindamā takhruj.
h3p051	我很担心你。	I'm worried about you.	أَنَا قَلِقٌ عَلَيْكَ.	Anā qaliqun ʿalayk.
h3p052	我想吃蛋糕，想吃很多。	I want cake, a lot of it.	أُرِيدُ كَعْكَةً، أُرِيدُ الْكَثِيرَ مِنْهَا.	Urīdu kaʿka, urīdu al-kathīra minhā.
h3p053	你饿了吗？当然要吃饭！	Are you hungry? Of course you need to eat!	هَلْ أَنْتَ جَائِعٌ؟ طَبْعًا يَجِبُ أَنْ تَأْكُلَ!	Hal anta jāʾiʿ? Ṭabʿan yajibu an taʾkul!
h3p054	我慢慢地走过去。	I walk over slowly.	أَمْشِي إِلَى هُنَاكَ بِبُطْءٍ.	Amshī ilā hunāka bibuṭʾ.
h3p055	把灯关了吧，我要睡觉了。	Turn off the light, I'm going to sleep.	أَطْفِئِ الْمِصْبَاحَ، سَأَنَامُ الْآنَ.	Aṭfiʾi al-miṣbāḥ, saʾanāmu al-ʾān.
h3p056	这个地方真漂亮。	This place is really pretty.	هٰذَا الْمَكَانُ جَمِيلٌ حَقًّا.	Hādhā al-makānu jamīlun ḥaqqan.
h3p057	你坐地铁去上班吗？	Do you take the subway to work?	هَلْ تَذْهَبُ إِلَى الْعَمَلِ بِالْمِتْرُو؟	Hal tadhhabu ilā al-ʿamali bi-l-mitrū?
h3p058	你看得懂这张地图吗？	Can you read this map?	هَلْ تَسْتَطِيعُ أَنْ تَقْرَأَ هٰذِهِ الْخَرِيطَةَ؟	Hal tastaṭīʿu an taqraʾa hādhihi al-kharīṭa?
h3p059	电梯坏了，只能走楼梯。	The elevator is broken, so we have to take the stairs.	الْمِصْعَدُ مُعَطَّلٌ، فَعَلَيْنَا أَنْ نَسْتَخْدِمَ السُّلَّمَ.	Al-miṣʿadu muʿaṭṭal, faʿalaynā an nastakhdima as-sullam.
h3p060	你有新的电子邮件！	You've got a new email!	لَدَيْكَ بَرِيدٌ إِلِكْتِرُونِيٌّ جَدِيدٌ!	Ladayka barīdun iliktirūniyyun jadīd!
```
