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
h3p181	我不会用筷子。	I can't use chopsticks.	لَا أَعْرِفُ كَيْفَ أَسْتَخْدِمُ عِيدَانَ الطَّعَامِ.	Lā aʿrifu kayfa astakhdimu ʿīdāna aṭ-ṭaʿām.
h3p182	天是蓝的，草是绿的。	The sky is blue and the grass is green.	السَّمَاءُ زَرْقَاءُ وَالْعُشْبُ أَخْضَرُ.	As-samāʾu zarqāʾu wa-l-ʿushbu akhḍar.
h3p183	我们的房子已经很旧了。	Our house is very old now.	بَيْتُنَا قَدِيمٌ جِدًّا الْآنَ.	Baytunā qadīmun jiddan al-ʾān.
h3p184	别离开我，好吗？	Don't leave me, okay?	لَا تَتْرُكْنِي، حَسَنًا؟	Lā tatruknī, ḥasanan?
h3p185	我今天没有力气。	I have no strength today.	لَيْسَ عِنْدِي قُوَّةٌ الْيَوْمَ.	Laysa ʿindī quwwatun al-yawm.
h3p186	你真厉害！	You're amazing!	مَا أَرْوَعَكَ!	Mā arwaʿak!
h3p187	我饿得没有力气了。	I'm so hungry I have no strength left.	أَنَا جَائِعٌ حَتَّى لَمْ تَعُدْ لِي قُوَّةٌ.	Anā jāʾiʿun ḥattā lam taʿud lī quwwa.
h3p188	我渴极了，快给我水！	I am parched. Quick, get me some water!	أَنَا عَطْشَانُ جِدًّا، أَعْطِنِي مَاءً بِسُرْعَةٍ!	Anā ʿaṭshānu jiddan, aʿṭinī māʾan bisurʿa!
h3p189	我好害怕，别放开我！	I'm so scared. Don't let go!	أَنَا خَائِفٌ جِدًّا، لَا تُفْلِتْنِي!	Anā khāʾifun jiddan, lā tuflitnī!
h3p191	我的脚好疼，是不是坏了？	My foot really hurts. Is it broken?	قَدَمِي تُؤْلِمُنِي كَثِيرًا، هَلْ هِيَ مَكْسُورَةٌ؟	Qadamī tuʾlimunī kathīran, hal hiya maksūra?
h3p192	我刚才睡着了，现在有力气了。	I was just asleep, and now I have some energy.	نِمْتُ قَبْلَ قَلِيلٍ، وَالْآنَ عِنْدِي قُوَّةٌ.	Nimtu qabla qalīl, wa-l-ʾāna ʿindī quwwa.
h3p193	早上好，今天有什么好节目？	Good morning! Any good shows on today?	صَبَاحُ الْخَيْرِ، أَيُّ بَرْنَامَجٍ جَيِّدٍ الْيَوْمَ؟	Ṣabāḥu al-khayr, ayyu barnāmajin jayyidin al-yawm?
h3p194	又见面了，我好高兴！	We meet again. I'm so happy!	نَلْتَقِي مَرَّةً أُخْرَى، مَا أَسْعَدَنِي!	Naltaqī marratan ukhrā, mā asʿadanī!
h3p195	我先走了，明天见！	I'm heading off first. See you tomorrow!	سَأَذْهَبُ أَنَا أَوَّلًا، إِلَى اللِّقَاءِ غَدًا!	Saʾadhhabu anā awwalan, ilā al-liqāʾi ghadan!
h3p196	别关电脑，我还想玩。	Don't turn off the computer. I still want to play.	لَا تُطْفِئِ الْحَاسُوبَ، مَا زِلْتُ أُرِيدُ أَنْ أَلْعَبَ.	Lā tuṭfiʾi al-ḥāsūb, mā ziltu urīdu an alʿab.
h3p197	没有你，我一个人好难过，想哭。	Without you I'm all alone and so sad I want to cry.	بِدُونِكَ أَنَا وَحْدِي وَحَزِينٌ جِدًّا، أُرِيدُ أَنْ أَبْكِيَ.	Bidūnika anā waḥdī waḥazīnun jiddan, urīdu an abkiy.
h3p198	谢谢你的蛋糕，好吃极了！	Thanks for the cake. It's delicious!	شُكْرًا عَلَى كَعْكَتِكَ، مَا أَلَذَّهَا!	Shukran ʿalā kaʿkatik, mā aladhdhahā!
h3p199	再给我一口，好不好？	Give me one more bite, okay?	أَعْطِنِي قَضْمَةً أُخْرَى، هَلْ يُمْكِنُ؟	Aʿṭinī qaḍmatan ukhrā, hal yumkin?
h3p201	我更饿了，你有吃的吗？	I'm even hungrier now. Have you got anything to eat?	صِرْتُ أَجُوعُ أَكْثَرَ، هَلْ عِنْدَكَ شَيْءٌ لِلْأَكْلِ؟	Ṣirtu ajūʿu akthar, hal ʿindaka shayʾun li-l-ʾakl?
h3p202	谢谢你关心我，我好高兴。	Thanks for caring about me. I am so happy.	شُكْرًا لِاهْتِمَامِكَ بِي، أَنَا سَعِيدٌ جِدًّا.	Shukran lihtimāmika bī, anā saʿīdun jiddan.
h3p203	我们经常一起玩，我最开心了！	We often play together, and it makes me so happy!	نَلْعَبُ مَعًا كَثِيرًا، وَهٰذَا يُسْعِدُنِي جِدًّا!	Nalʿabu maʿan kathīran, wahādhā yusʿidunī jiddan!
h3p204	你刚才去哪儿了？我想你了。	Where did you go just now? I missed you.	أَيْنَ ذَهَبْتَ قَبْلَ قَلِيلٍ؟ اشْتَقْتُ إِلَيْكَ.	Ayna dhahabta qabla qalīl? Ishtaqtu ilayk.
h3p205	天气太热，我想开空调。	It's too hot. I want to turn on the air conditioning.	الْجَوُّ حَارٌّ جِدًّا، أُرِيدُ أَنْ أُشَغِّلَ الْمُكَيِّفَ.	Al-jawwu ḥārrun jiddan, urīdu an ushaghghila al-mukayyif.
h3p206	门没关，风进来了。	The door is not shut and the wind is coming in.	الْبَابُ مَفْتُوحٌ، وَالرِّيحُ تَدْخُلُ.	Al-bābu maftūḥ, wa-r-rīḥu tadkhul.
h3p207	你换了新裤子，真好看！	You changed into new trousers. They look great!	لَبِسْتَ سِرْوَالًا جَدِيدًا، مَا أَجْمَلَهُ!	Labista sirwālan jadīdan, mā ajmalah!
h3p208	我画了你，你看像不像？	I drew you. Does it look like you?	رَسَمْتُكَ، انْظُرْ، هَلْ يُشْبِهُكَ؟	Rasamtuk, inẓur, hal yushbihuk?
h3p209	我对做饭很感兴趣，教教我吧。	I'm interested in cooking. Teach me!	أَنَا مُهْتَمٌّ جِدًّا بِالطَّبْخِ، عَلِّمْنِي!	Anā muhtammun jiddan bi-ṭ-ṭabkh, ʿallimnī!
h3p210	你是晚上回来，还是明天早上回来？	Are you coming back tonight or tomorrow morning?	هَلْ سَتَعُودُ فِي الْمَسَاءِ أَمْ صَبَاحَ الْغَدِ؟	Hal sataʿūdu fī al-masāʾi am ṣabāḥa al-ghad?
h3p211	你决定去哪个公园了吗？	Have you decided which park to go to?	هَلْ قَرَّرْتَ إِلَى أَيِّ حَدِيقَةٍ تَذْهَبُ؟	Hal qarrarta ilā ayyi ḥadīqatin tadhhab?
h3p212	这个季节，公园里的花最多。	In this season the park has the most flowers.	فِي هٰذَا الْفَصْلِ تَكُونُ الْأَزْهَارُ فِي الْحَدِيقَةِ أَكْثَرَ مَا يَكُونُ.	Fī hādhā al-faṣli takūnu al-ʾazhāru fī al-ḥadīqati akthara mā yakūn.
h3p213	我不想让今天结束，再玩一会儿吧。	I don't want today to end. Let's play a little longer.	لَا أُرِيدُ أَنْ يَنْتَهِيَ الْيَوْمُ، لِنَلْعَبْ لَحْظَةً أُخْرَى.	Lā urīdu an yantahiya al-yawm, linalʿab laḥẓatan ukhrā.
h3p214	快到节日了，我想吃好吃的。	The festival is nearly here. I want something yummy.	الْعِيدُ قَرِيبٌ، أُرِيدُ أَنْ آكُلَ شَيْئًا لَذِيذًا.	Al-ʿīdu qarīb, urīdu an ākula shayʾan ladhīdhan.
h3p215	你的声音真好听，再讲一个故事吧。	Your voice is lovely. Tell me another story.	صَوْتُكَ جَمِيلٌ جِدًّا، احْكِ لِي قِصَّةً أُخْرَى.	Ṣawtuka jamīlun jiddan, iḥki lī qiṣṣatan ukhrā.
h3p216	我几乎什么都记得，就是忘了你的生日。	I remember almost everything, except I forgot your birthday.	أَتَذَكَّرُ كُلَّ شَيْءٍ تَقْرِيبًا، لٰكِنِّي نَسِيتُ عِيدَ مِيلَادِكَ.	Atadhakkaru kulla shayʾin taqrīban, lākinnī nasītu ʿīda mīlādik.
h3p218	我想借你的书看看。	I'd like to borrow your book.	أُرِيدُ أَنْ أَسْتَعِيرَ كِتَابَكَ لِأَقْرَأَهُ.	Urīdu an astaʿīra kitābaka liʾaqraʾah.
h3p219	会议开完了吗？我想找你玩。	Is the meeting over? I want to play with you.	هَلِ انْتَهَى الِاجْتِمَاعُ؟ أُرِيدُ أَنْ أَلْعَبَ مَعَكَ.	Hali intahā al-ijtimāʿ? Urīdu an alʿaba maʿak.
h3p220	我们一起检查一下冰箱吧。	Let us check the fridge together.	لِنَفْحَصِ الثَّلَّاجَةَ مَعًا.	Linafḥaṣi ath-thallājata maʿan.
h3p221	蓝色的东西，我都喜欢。	I like anything blue.	أُحِبُّ كُلَّ شَيْءٍ أَزْرَقَ.	Uḥibbu kulla shayʾin azraq.
h3p222	我怕黑，你别关灯。	I'm afraid of the dark. Don't turn off the light.	أَخَافُ مِنَ الظَّلَامِ، لَا تُطْفِئِ الضَّوْءَ.	Akhāfu mina aẓ-ẓalām, lā tuṭfiʾi aḍ-ḍawʾ.
h3p223	你为什么哭了？谁让你不高兴？	Why are you crying? Who upset you?	لِمَاذَا بَكَيْتَ؟ مَنْ أَزْعَجَكَ؟	Limādhā bakayt? Man azʿajak?
h3p226	后来你去哪儿了？我等了你很久。	Where did you go afterwards? I waited for you a long time.	وَبَعْدَ ذٰلِكَ أَيْنَ ذَهَبْتَ؟ انْتَظَرْتُكَ طَوِيلًا.	Wabaʿda dhālika ayna dhahabt? Intaẓartuka ṭawīlan.
h3p227	你们国家有什么节日？	What festivals does your country have?	مَا الْأَعْيَادُ فِي بَلَدِكُمْ؟	Mā al-ʾaʿyādu fī baladikum?
h3p228	我想学怎么解决问题。	I want to learn how to solve problems.	أُرِيدُ أَنْ أَتَعَلَّمَ كَيْفَ أَحُلُّ الْمَشَاكِلَ.	Urīdu an ataʿallama kayfa aḥullu al-mashākil.
h3p229	我不想换衣服，我喜欢这件。	I do not want to change clothes. I like this one.	لَا أُرِيدُ أَنْ أُبَدِّلَ مَلَابِسِي، أُحِبُّ هٰذِهِ.	Lā urīdu an ubaddila malābisī, uḥibbu hādhih.
h3p230	你今天检查作业了吗？	Did you check your homework today?	هَلْ رَاجَعْتَ وَاجِبَكَ الْيَوْمَ؟	Hal rājaʿta wājibaka al-yawm?
h3p231	我画的花好看吗？	Does the flower I drew look nice?	هَلِ الزَّهْرَةُ الَّتِي رَسَمْتُهَا جَمِيلَةٌ؟	Hali az-zahratu allatī rasamtuhā jamīla?
h3p232	你每天都很忙，我很关心你。	You are busy every day. I care about you.	أَنْتَ مَشْغُولٌ كُلَّ يَوْمٍ، وَأَنَا أَهْتَمُّ بِكَ كَثِيرًا.	Anta mashghūlun kulla yawm, waʾanā ahtammu bika kathīran.
h3p233	今天刮风，我们别去公园了。	It is windy today. Let us not go to the park.	الرِّيحُ تَهُبُّ الْيَوْمَ، فَلَا نَذْهَبْ إِلَى الْحَدِيقَةِ.	Ar-rīḥu tahubbu al-yawm, falā nadhhab ilā al-ḥadīqa.
h3p234	你的老朋友今天会来吗？	Is your old friend coming today?	هَلْ سَيَأْتِي صَدِيقُكَ الْقَدِيمُ الْيَوْمَ؟	Hal sayaʾtī ṣadīquka al-qadīmu al-yawm?
h3p235	我喜欢甜的东西，例如蛋糕和苹果。	I like sweet things, like cake and apples.	أُحِبُّ الْأَشْيَاءَ الْحُلْوَةَ، مِثْلَ الْكَعْكِ وَالتُّفَّاحِ.	Uḥibbu al-ʾashyāʾa al-ḥulwa, mithla al-kaʿki wa-t-tuffāḥ.
h3p236	我的脸有点儿绿，你看到了吗？	My face is a little green. Did you notice?	وَجْهِي أَخْضَرُ قَلِيلًا، هَلْ رَأَيْتَ ذٰلِكَ؟	Wajhī akhḍaru qalīlan, hal raʾayta dhālik?
h3p237	我每天都练习跳舞。	I practise dancing every day.	أَتَمَرَّنُ عَلَى الرَّقْصِ كُلَّ يَوْمٍ.	Atamarranu ʿalā ar-raqṣi kulla yawm.
h3p238	一辆红色的车开过去了。	A red car just drove past.	مَرَّتْ سَيَّارَةٌ حَمْرَاءُ.	Marrat sayyāratun ḥamrāʾ.
h3p239	我想多了解你一点儿。	I want to get to know you a little better.	أُرِيدُ أَنْ أَعْرِفَكَ أَكْثَرَ قَلِيلًا.	Urīdu an aʿrifaka akthara qalīlan.
h3p240	邻居家的猫今天又来了。	The neighbour's cat came over again today.	جَاءَتْ قِطَّةُ الْجِيرَانِ الْيَوْمَ مِنْ جَدِيدٍ.	Jāʾat qiṭṭatu al-jīrāni al-yawma min jadīd.
h3p241	另外，我还想吃一片面包。	Also, I would like a slice of bread.	وَأُرِيدُ أَيْضًا قِطْعَةَ خُبْزٍ.	Waʾurīdu ayḍan qiṭʿata khubz.
h3p242	你走的时候，能不能给我留着灯？	When you go, could you leave the light on for me?	هَلْ تَتْرُكُ لِيَ الضَّوْءَ مُضَاءً عِنْدَمَا تَذْهَبُ؟	Hal tatruku liya aḍ-ḍawʾa muḍāʾan ʿindamā tadhhab?
h3p243	你留下来，好不好？	Will you stay, please?	هَلْ تَبْقَى مَعِي، مِنْ فَضْلِكَ؟	Hal tabqā maʿī, min faḍlik?
h3p244	这里的楼好高啊！	The buildings here are so tall!	الْمَبَانِي هُنَا عَالِيَةٌ جِدًّا!	Al-mabānī hunā ʿāliyatun jiddan!
h3p245	我是绿色的，你喜欢吗？	I'm green. Do you like it?	أَنَا أَخْضَرُ، هَلْ يُعْجِبُكَ لَوْنِي؟	Anā akhḍar, hal yuʿjibuka lawnī?
```
