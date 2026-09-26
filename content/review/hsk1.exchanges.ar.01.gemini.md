These are **Arabic translations** of lines from a beginner language-learning app — small cartoon creatures on a desktop say them. This batch is short **conversations** between two creatures; turns are separated by ｜ in the Chinese and " | " everywhere else. The Chinese and English have already been verified and are not under review. What is under review is the `gloss` column, the Arabic, and its romanization in `gloss_reading`. It is shown two ways: to someone learning Arabic, as the line to learn, and to someone who reads Arabic, as the meaning of a line in another language — so it must be both correct and natural.

The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin `reading` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.

For every row, check:
1. Does the Arabic mean what the **Chinese** says? The English shows the intended sense but can be looser.
2. Is it natural Arabic, the way a native speaker would actually put it?
3. **Is the vowelling complete and correct** — the right vowel on every letter, every shadda, every case ending? This is the most important question: a learner will pronounce exactly what is written.
4. Does `gloss_reading` read the way the Arabic is said? It is derived mechanically from the vowel marks, with the pause applied at the end of each sentence, so if it is wrong the vowelling is wrong — fix the Arabic, never the romanization.
5. Does each reply answer the turn before it? There must be exactly as many " | "-separated parts as the Chinese has ｜-separated turns.

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
x001	你好！｜你好！	Hello! | Hello!	مَرْحَبًا! | مَرْحَبًا!	Marḥaban! | Marḥaban!
x002	你好吗？｜我很好，谢谢。你呢？｜我很好。	How are you? | I'm fine, thanks. And you? | I'm fine.	كَيْفَ حَالُكَ؟ | أَنَا بِخَيْرٍ، شُكْرًا. وَأَنْتَ؟ | أَنَا بِخَيْرٍ.	Kayfa ḥāluk? | Anā bikhayr, shukran. Waʾant? | Anā bikhayr.
x003	你们好！｜你好！	Hello, everyone! | Hello!	مَرْحَبًا بِكُمْ جَمِيعًا! | مَرْحَبًا!	Marḥaban bikum jamīʿan! | Marḥaban!
x004	你在哪儿？｜我在这儿！	Where are you? | I'm here!	أَيْنَ أَنْتَ؟ | أَنَا هُنَا!	Ayna anta? | Anā hunā!
x005	谁在那儿？｜是我！	Who's there? | It's me!	مَنْ هُنَاكَ؟ | أَنَا!	Man hunāk? | Anā!
x006	你在做什么？｜我在吃东西。	What are you doing? | I'm eating.	مَاذَا تَفْعَلُ؟ | أَنَا آكُلُ.	Mādhā tafʿal? | Anā ākul.
x007	你在看什么？｜我在看你。	What are you looking at? | I'm looking at you.	مَاذَا تَنْظُرُ؟ | أَنَا أَنْظُرُ إِلَيْكَ.	Mādhā tanẓur? | Anā anẓuru ilayk.
x008	你认识他吗？｜我不认识他。	Do you know him? | I don't know him.	هَلْ تَعْرِفُهُ؟ | لَا أَعْرِفُهُ.	Hal taʿrifuh? | Lā aʿrifuh.
x009	他是谁？｜他是我的朋友。	Who is he? | He is my friend.	مَنْ هُوَ؟ | هُوَ صَدِيقِي.	Man huwa? | Huwa ṣadīqī.
x010	我们是朋友吗？｜是的！我们是朋友。	Are we friends? | Yes! We are friends.	هَلْ نَحْنُ أَصْدِقَاءُ؟ | نَعَمْ! نَحْنُ أَصْدِقَاءُ.	Hal naḥnu aṣdiqāʾ? | Naʿam! Naḥnu aṣdiqāʾ.
x011	你有朋友吗？｜有，你是我的朋友。	Do you have friends? | Yes, you're my friend.	هَلْ لَدَيْكَ أَصْدِقَاءُ؟ | نَعَمْ، أَنْتَ صَدِيقِي.	Hal ladayka aṣdiqāʾ? | Naʿam, anta ṣadīqī.
x012	再见！｜明天见！	Goodbye! | See you tomorrow!	مَعَ السَّلَامَةِ! | أَرَاكَ غَدًا!	Maʿa as-salāma! | Arāka ghadan!
x013	谢谢你！｜不客气。	Thank you! | You're welcome.	شُكْرًا لَكَ! | عَفْوًا.	Shukran lak! | ʿAfwan.
x014	对不起！｜没关系。	Sorry! | It's okay.	آسِفٌ! | لَا بَأْسَ.	Āsif! | Lā baʾs.
x015	你好漂亮！｜谢谢！	You're so pretty! | Thanks!	أَنْتَ جَمِيلٌ جِدًّا! | شُكْرًا!	Anta jamīlun jiddan! | Shukran!
x016	你的衣服很漂亮。｜谢谢你！	Your clothes are very pretty. | Thank you!	مَلَابِسُكَ جَمِيلَةٌ جِدًّا. | شُكْرًا لَكَ!	Malābisuka jamīlatun jiddan. | Shukran lak!
x017	我爱你。｜谢谢！我很高兴。	I love you. | Thanks! I'm very happy.	أُحِبُّكَ. | شُكْرًا! أَنَا سَعِيدٌ جِدًّا.	Uḥibbuk. | Shukran! Anā saʿīdun jiddan.
x018	你喜欢这儿吗？｜我很喜欢这儿。	Do you like it here? | I like it here very much.	هَلْ تُحِبُّ هٰذَا الْمَكَانَ؟ | أُحِبُّهُ كَثِيرًا.	Hal tuḥibbu hādhā al-makān? | Uḥibbuhu kathīran.
x019	你想吃什么？｜我想吃米饭。	What do you want to eat? | I want to eat rice.	مَاذَا تُرِيدُ أَنْ تَأْكُلَ؟ | أُرِيدُ أَنْ آكُلَ أُرُزًّا.	Mādhā turīdu an taʾkul? | Urīdu an ākula uruzzan.
x020	你吃饭了吗？｜我没有吃饭。｜我们去吃饭。	Have you eaten? | I haven't eaten. | Let's go and eat.	هَلْ أَكَلْتَ؟ | لَمْ آكُلْ. | لِنَذْهَبْ لِنَأْكُلَ.	Hal akalt? | Lam ākul. | Linadhhab linaʾkul.
x021	我想吃东西。｜这儿有苹果。｜谢谢！	I want to eat something. | There are apples here. | Thanks!	أُرِيدُ أَنْ آكُلَ شَيْئًا. | هُنَا تُفَّاحٌ. | شُكْرًا!	Urīdu an ākula shayʾan. | Hunā tuffāḥ. | Shukran!
x022	这是什么？｜这是苹果。｜我能吃吗？｜能！	What is this? | This is an apple. | Can I eat it? | Yes!	مَا هٰذَا؟ | هٰذَا تُفَّاحٌ. | هَلْ يُمْكِنُنِي أَنْ آكُلَهُ؟ | نَعَمْ!	Mā hādhā? | Hādhā tuffāḥ. | Hal yumkinunī an ākulah? | Naʿam!
x023	这个好吃吗？｜很好吃！	Is this tasty? | Very tasty!	هَلْ هٰذَا لَذِيذٌ؟ | لَذِيذٌ جِدًّا!	Hal hādhā ladhīdh? | Ladhīdhun jiddan!
x024	你喜欢什么水果？｜我喜欢苹果。	What fruit do you like? | I like apples.	أَيُّ فَاكِهَةٍ تُحِبُّ؟ | أُحِبُّ التُّفَّاحَ.	Ayyu fākihatin tuḥibb? | Uḥibbu at-tuffāḥ.
x025	你想喝什么？｜我想喝茶。｜好的。	What would you like to drink? | I'd like tea. | Okay.	مَاذَا تُرِيدُ أَنْ تَشْرَبَ؟ | أُرِيدُ أَنْ أَشْرَبَ شَايًا. | حَسَنًا.	Mādhā turīdu an tashrab? | Urīdu an ashraba shāyan. | Ḥasanan.
x026	请喝茶。｜谢谢，我很喜欢喝茶。	Please have some tea. | Thanks, I really like tea.	تَفَضَّلْ بِالشَّايِ. | شُكْرًا، أَنَا أُحِبُّ الشَّايَ كَثِيرًا.	Tafaḍḍal bi-sh-shāy. | Shukran, anā uḥibbu ash-shāya kathīran.
x027	你喜欢吃中国菜吗？｜很喜欢！	Do you like Chinese food? | Very much!	هَلْ تُحِبُّ الْأَكْلَ الصِّينِيَّ؟ | أُحِبُّهُ كَثِيرًا!	Hal tuḥibbu al-ʾakla aṣ-ṣīniyy? | Uḥibbuhu kathīran!
x028	中午吃什么？｜吃米饭。	What's for lunch? | Rice.	مَاذَا نَأْكُلُ فِي الظُّهْرِ؟ | أُرُزٌّ.	Mādhā naʾkulu fī aẓ-ẓuhr? | Uruzz.
x029	你想睡觉吗？｜我很想睡觉。	Do you want to sleep? | I really want to sleep.	هَلْ تُرِيدُ أَنْ تَنَامَ؟ | أُرِيدُ أَنْ أَنَامَ كَثِيرًا.	Hal turīdu an tanām? | Urīdu an anāma kathīran.
x030	你睡觉了吗？｜没有。	Have you gone to bed? | No.	هَلْ نِمْتَ؟ | لَا.	Hal nimt? | Lā.
x031	现在几点？｜现在三点。｜我想睡觉了。	What time is it? | It's three o'clock. | I want to sleep now.	كَمِ السَّاعَةُ الْآنَ؟ | السَّاعَةُ الْآنَ الثَّالِثَةُ. | أُرِيدُ أَنْ أَنَامَ الْآنَ.	Kami as-sāʿatu al-ʾān? | As-sāʿatu al-ʾāna ath-thālitha. | Urīdu an anāma al-ʾān.
x032	你想回家吗？｜想，我想睡觉。	Do you want to go home? | Yes, I want to sleep.	هَلْ تُرِيدُ أَنْ تَعُودَ إِلَى الْبَيْتِ؟ | نَعَمْ، أُرِيدُ أَنْ أَنَامَ.	Hal turīdu an taʿūda ilā al-bayt? | Naʿam, urīdu an anām.
x033	今天天气怎么样？｜今天很热。	How's the weather today? | It's hot today.	كَيْفَ الطَّقْسُ الْيَوْمَ؟ | الطَّقْسُ حَارٌّ الْيَوْمَ.	Kayfa aṭ-ṭaqsu al-yawm? | Aṭ-ṭaqsu ḥārrun al-yawm.
x034	今天很冷。｜是的，太冷了！	It's cold today. | Yes, it's too cold!	الطَّقْسُ بَارِدٌ الْيَوْمَ. | نَعَمْ، بَارِدٌ جِدًّا!	Aṭ-ṭaqsu bāridun al-yawm. | Naʿam, bāridun jiddan!
x035	明天会下雨吗？｜会。	Will it rain tomorrow? | It will.	هَلْ سَتُمْطِرُ غَدًا؟ | نَعَمْ.	Hal satumṭiru ghadan? | Naʿam.
x036	下雨了！｜我们回家。	It's raining! | We're going home.	إِنَّهَا تُمْطِرُ! | نَحْنُ نَعُودُ إِلَى الْبَيْتِ.	Innahā tumṭir! | Naḥnu naʿūdu ilā al-bayt.
x037	你冷吗？｜我很冷。	Are you cold? | I'm very cold.	هَلْ تَشْعُرُ بِالْبَرْدِ؟ | أَشْعُرُ بِبَرْدٍ شَدِيدٍ.	Hal tashʿuru bi-l-bard? | Ashʿuru bibardin shadīd.
x038	你热吗？｜不热。	Are you hot? | No.	هَلْ تَشْعُرُ بِالْحَرِّ؟ | لَا.	Hal tashʿuru bi-l-ḥarr? | Lā.
x039	你去哪儿？｜我去商店。｜你想买什么？｜我想买苹果。	Where are you going? | I'm going to the shop. | What do you want to buy? | I want to buy apples.	إِلَى أَيْنَ تَذْهَبُ؟ | أَذْهَبُ إِلَى الْمَتْجَرِ. | مَاذَا تُرِيدُ أَنْ تَشْتَرِيَ؟ | أُرِيدُ أَنْ أَشْتَرِيَ تُفَّاحًا.	Ilā ayna tadhhab? | Adhhabu ilā al-matjar. | Mādhā turīdu an tashtariy? | Urīdu an ashtariya tuffāḥan.
x040	这个多少钱？｜三块钱。｜太多了！	How much is this? | Three yuan. | That's too much!	بِكَمْ هٰذَا؟ | بِثَلَاثَةِ يُوَانٍ. | هٰذَا كَثِيرٌ جِدًّا!	Bikam hādhā? | Bithalāthati yuwān. | Hādhā kathīrun jiddan!
x041	你几岁？｜我八岁。你呢？｜我九岁。	How old are you? | I'm eight. And you? | I'm nine.	كَمْ عُمْرُكَ؟ | عُمْرِي ثَمَانِي سَنَوَاتٍ. وَأَنْتَ؟ | عُمْرِي تِسْعُ سَنَوَاتٍ.	Kam ʿumruk? | ʿUmrī thamānī sanawāt. Waʾant? | ʿUmrī tisʿu sanawāt.
x042	你家有几个人？｜我家有五个人。	How many people are in your family? | There are five people in my family.	كَمْ فَرْدًا فِي عَائِلَتِكَ؟ | فِي عَائِلَتِي خَمْسَةُ أَفْرَادٍ.	Kam fardan fī ʿāʾilatik? | Fī ʿāʾilatī khamsatu afrād.
x043	你会说汉语吗？｜我会说一点儿。	Can you speak Chinese? | I can speak a little.	هَلْ تَسْتَطِيعُ أَنْ تَتَكَلَّمَ الصِّينِيَّةَ؟ | أَسْتَطِيعُ أَنْ أَتَكَلَّمَ قَلِيلًا.	Hal tastaṭīʿu an tatakallama aṣ-ṣīniyya? | Astaṭīʿu an atakallama qalīlan.
x044	你在学习汉语吗？｜是的，汉语很好。	Are you studying Chinese? | Yes, Chinese is great.	هَلْ تَدْرُسُ الصِّينِيَّةَ؟ | نَعَمْ، الصِّينِيَّةُ رَائِعَةٌ.	Hal tadrusu aṣ-ṣīniyya? | Naʿam, aṣ-ṣīniyyatu rāʾiʿa.
x045	你会写这个字吗？｜我不会。	Can you write this character? | I can't.	هَلْ تَسْتَطِيعُ أَنْ تَكْتُبَ هٰذَا الْحَرْفَ؟ | لَا أَسْتَطِيعُ.	Hal tastaṭīʿu an taktuba hādhā al-ḥarf? | Lā astaṭīʿ.
x046	你是老师吗？｜不是，我是学生。	Are you a teacher? | No, I'm a student.	هَلْ أَنْتَ مُعَلِّمٌ؟ | لَا، أَنَا طَالِبٌ.	Hal anta muʿallim? | Lā, anā ṭālib.
x047	今天是星期几？｜今天星期六。｜太好了！	What day is it today? | Today is Saturday. | Great!	أَيُّ يَوْمٍ الْيَوْمَ؟ | الْيَوْمَ السَّبْتُ. | رَائِعٌ!	Ayyu yawmin al-yawm? | Al-yawma as-sabt. | Rāʾiʿ!
x048	这是你的吗？｜不是，是他的。	Is this yours? | No, it's his.	هَلْ هٰذَا لَكَ؟ | لَا، هُوَ لَهُ.	Hal hādhā lak? | Lā, huwa lah.
x049	你喜欢猫吗？｜我很喜欢猫。	Do you like cats? | I really like cats.	هَلْ تُحِبُّ الْقِطَطَ؟ | أُحِبُّ الْقِطَطَ كَثِيرًا.	Hal tuḥibbu al-qiṭaṭ? | Uḥibbu al-qiṭaṭa kathīran.
x050	你喜欢狗吗？｜不喜欢。	Do you like dogs? | No.	هَلْ تُحِبُّ الْكِلَابَ؟ | لَا.	Hal tuḥibbu al-kilāb? | Lā.
x051	你喜欢看书吗？｜喜欢，我爱看书。	Do you like reading? | Yes, I love reading.	هَلْ تُحِبُّ الْقِرَاءَةَ؟ | نَعَمْ، أَنَا أَعْشَقُ الْقِرَاءَةَ.	Hal tuḥibbu al-qirāʾa? | Naʿam, anā aʿshaqu al-qirāʾa.
x052	你想看电影吗？｜好！我们去看电影。	Do you want to see a film? | Okay! We'll go see a film.	هَلْ تُرِيدُ أَنْ تُشَاهِدَ فِيلْمًا؟ | حَسَنًا! لِنَذْهَبْ لِنُشَاهِدَ فِيلْمًا.	Hal turīdu an tushāhida fīlman? | Ḥasanan! Linadhhab linushāhida fīlman.
x053	你想去北京吗？｜想！北京很大。	Do you want to go to Beijing? | Yes! Beijing is very big.	هَلْ تُرِيدُ أَنْ تَذْهَبَ إِلَى بِكِينَ؟ | نَعَمْ! بِكِينُ كَبِيرَةٌ جِدًّا.	Hal turīdu an tadhhaba ilā bikīn? | Naʿam! Bikīnu kabīratun jiddan.
x054	你能来我家吗？｜能！什么时候？｜明天上午。	Can you come to my home? | Yes! When? | Tomorrow morning.	هَلْ تَسْتَطِيعُ أَنْ تَأْتِيَ إِلَى بَيْتِي؟ | نَعَمْ! مَتَى؟ | غَدًا صَبَاحًا.	Hal tastaṭīʿu an taʾtiya ilā baytī? | Naʿam! Matā? | Ghadan ṣabāḥan.
x055	你的猫在哪儿？｜在桌子下面。	Where is your cat? | Under the table.	أَيْنَ قِطُّكَ؟ | تَحْتَ الطَّاوِلَةِ.	Ayna qiṭṭuk? | Taḥta aṭ-ṭāwila.
x056	我没有钱。｜没关系，我有。	I don't have money. | It's okay, I do.	لَيْسَ عِنْدِي مَالٌ. | لَا بَأْسَ، عِنْدِي.	Laysa ʿindī māl. | Lā baʾs, ʿindī.
x057	你想坐这个椅子吗？｜好的，谢谢。	Do you want to sit in this chair? | Okay, thanks.	هَلْ تُرِيدُ أَنْ تَجْلِسَ عَلَى هٰذَا الْكُرْسِيِّ؟ | حَسَنًا، شُكْرًا.	Hal turīdu an tajlisa ʿalā hādhā al-kursiyy? | Ḥasanan, shukran.
x058	请坐！｜谢谢。	Please sit! | Thanks.	تَفَضَّلْ بِالْجُلُوسِ! | شُكْرًا.	Tafaḍḍal bi-l-julūs! | Shukran.
x059	你去医院吗？｜不去。	Are you going to the hospital? | No.	هَلْ تَذْهَبُ إِلَى الْمُسْتَشْفَى؟ | لَا.	Hal tadhhabu ilā al-mustashfā? | Lā.
x060	我看见你了！｜你好！	I see you! | Hello!	رَأَيْتُكَ! | مَرْحَبًا!	Raʾaytuk! | Marḥaban!
```
