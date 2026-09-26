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
h2p301	我要这个。	I want this one.	أُرِيدُ هٰذَا.	Urīdu hādhā.
h2p302	我什么都不要。	I don't want anything.	لَا أُرِيدُ شَيْئًا.	Lā urīdu shayʾan.
h2p303	我们一起去吧！	Let's go together!	لِنَذْهَبْ مَعًا!	Linadhhab maʿan!
h2p304	我们一起吃饭吧。	Let's eat together.	لِنَأْكُلْ مَعًا.	Linaʾkul maʿan.
h2p305	我也想去。	I want to go too.	أُرِيدُ الذَّهَابَ أَيْضًا.	Urīdu adh-dhahāba ayḍan.
h2p306	你也喜欢猫吗？	Do you like cats too?	هَلْ تُحِبُّ الْقِطَطَ أَيْضًا؟	Hal tuḥibbu al-qiṭaṭa ayḍan?
h2p307	他也是学生。	He's a student too.	هُوَ طَالِبٌ أَيْضًا.	Huwa ṭālibun ayḍan.
h2p308	就是这个！	This is the one!	هٰذَا هُوَ بِالضَّبْطِ!	Hādhā huwa bi-ḍ-ḍabṭ!
h2p309	我就在这儿。	I'm right here.	أَنَا هُنَا بِالضَّبْطِ.	Anā hunā bi-ḍ-ḍabṭ.
h2p310	我就来！	I'm coming right away!	سَآتِي حَالًا!	Saʾātī ḥālan!
h2p311	他还没来。	He hasn't come yet.	لَمْ يَأْتِ بَعْدُ.	Lam yaʾti baʿd.
h2p312	还有问题吗？	Any more questions?	هَلْ هُنَاكَ أَسْئِلَةٌ أُخْرَى؟	Hal hunāka asʾilatun ukhrā?
h2p313	我还是学生。	I'm still a student.	مَا زِلْتُ طَالِبًا.	Mā ziltu ṭāliban.
h2p314	对不起，我错了。	Sorry, I was wrong.	آسِفٌ، كُنْتُ مُخْطِئًا.	Āsif, kuntu mukhṭiʾan.
h2p315	你错了。	You're wrong.	أَنْتَ مُخْطِئٌ.	Anta mukhṭiʾ.
h2p316	没错！	That's right!	صَحِيحٌ!	Ṣaḥīḥ!
h2p317	这个对吗？	Is this right?	هَلْ هٰذَا صَحِيحٌ؟	Hal hādhā ṣaḥīḥ?
h2p318	你到哪儿了？	Where are you now?	إِلَى أَيْنَ وَصَلْتَ؟	Ilā ayna waṣalt?
h2p319	我们到家了。	We're home.	وَصَلْنَا إِلَى الْبَيْتِ.	Waṣalnā ilā al-bayt.
h2p320	我从学校回来了。	I'm back from school.	عُدْتُ مِنَ الْمَدْرَسَةِ.	ʿUdtu mina al-madrasa.
h2p321	你往左边看。	Look to the left.	اُنْظُرْ إِلَى الْيَسَارِ.	Unẓur ilā al-yasār.
h2p322	左边是我家。	My home is on the left.	بَيْتِي عَلَى الْيَسَارِ.	Baytī ʿalā al-yasār.
h2p323	你说话太快了。	You talk too fast.	تَتَكَلَّمُ بِسُرْعَةٍ كَبِيرَةٍ.	Tatakallamu bisurʿatin kabīra.
h2p324	请说慢一点儿。	Please speak a bit more slowly.	تَكَلَّمْ بِبُطْءٍ أَكْثَرَ مِنْ فَضْلِكَ.	Takallam bibuṭʾin akthara min faḍlik.
h2p325	别说话！	Don't talk!	لَا تَتَكَلَّمْ!	Lā tatakallam!
h2p326	他不想说话。	He doesn't want to talk.	لَا يُرِيدُ أَنْ يَتَكَلَّمَ.	Lā yurīdu an yatakallam.
h2p327	我没听懂。	I didn't understand what I heard.	لَمْ أَفْهَمْ.	Lam afham.
h2p328	你听懂了吗？	Did you understand?	هَلْ فَهِمْتَ؟	Hal fahimt?
h2p329	我听不懂。	I can't understand.	لَا أَفْهَمُ.	Lā afham.
h2p330	我唱得不好。	I don't sing well.	لَا أُغَنِّي جَيِّدًا.	Lā ughannī jayyidan.
h2p331	你唱歌唱得真好！	You sing really well!	أَنْتَ تُغَنِّي جَيِّدًا حَقًّا!	Anta tughannī jayyidan ḥaqqan!
h2p332	小猫正在睡觉。	The kitten is sleeping.	الْقِطُّ الصَّغِيرُ نَائِمٌ الْآنَ.	Al-qiṭṭu aṣ-ṣaghīru nāʾimun al-ʾān.
h2p333	狗在外面跑。	The dog is running around outside.	الْكَلْبُ يَجْرِي فِي الْخَارِجِ.	Al-kalbu yajrī fī al-khārij.
h2p334	送你一个苹果。	Here, an apple for you.	أُهْدِيكَ تُفَّاحَةً.	Uhdīka tuffāḥa.
h2p335	这是我送你的。	This is a gift from me to you.	هٰذِهِ هَدِيَّةٌ مِنِّي لَكَ.	Hādhihi hadiyyatun minnī lak.
h2p336	谢谢你送我这个。	Thank you for giving me this.	شُكْرًا عَلَى إِهْدَائِكَ هٰذَا لِي.	Shukran ʿalā ihdāʾika hādhā lī.
h2p337	妈妈不让我出去玩。	Mum won't let me go out to play.	أُمِّي لَا تَسْمَحُ لِي بِالْخُرُوجِ لِلَّعِبِ.	Ummī lā tasmaḥu lī bi-l-khurūji lillaʿib.
h2p338	让我看看！	Let me see!	دَعْنِي أَرَى!	Daʿnī arā!
h2p339	让我想想。	Let me think.	دَعْنِي أُفَكِّرُ.	Daʿnī ufakkir.
h2p340	我们玩得很高兴。	We had a great time.	اِسْتَمْتَعْنَا كَثِيرًا بِاللَّعِبِ.	Istamtaʿnā kathīran bi-l-laʿib.
h2p341	你想玩什么？	What do you want to play?	مَاذَا تُرِيدُ أَنْ تَلْعَبَ؟	Mādhā turīdu an talʿab?
h2p342	别玩手机了！	Stop playing on your phone!	كَفَى لَعِبًا بِالْهَاتِفِ!	Kafā laʿiban bi-l-hātif!
h2p343	你每天几点睡觉？	What time do you go to bed every day?	فِي أَيِّ سَاعَةٍ تَنَامُ كُلَّ يَوْمٍ؟	Fī ayyi sāʿatin tanāmu kulla yawm?
h2p344	我今天起得很早。	I got up very early today.	اِسْتَيْقَظْتُ مُبَكِّرًا جِدًّا الْيَوْمَ.	Istayqaẓtu mubakkiran jiddan al-yawm.
h2p345	你起床了吗？	Are you up?	هَلِ اسْتَيْقَظْتَ؟	Hali istayqaẓt?
h2p346	快起床！	Get up!	اِسْتَيْقِظْ بِسُرْعَةٍ!	Istayqiẓ bisurʿa!
h2p347	他还在睡觉。	He's still sleeping.	مَا زَالَ نَائِمًا.	Mā zāla nāʾiman.
h2p348	今天晚上你做什么？	What are you doing tonight?	مَاذَا تَفْعَلُ هٰذَا الْمَسَاءَ؟	Mādhā tafʿalu hādhā al-masāʾ?
h2p349	我晚上要学习。	I have to study tonight.	يَجِبُ أَنْ أَدْرُسَ هٰذَا الْمَسَاءَ.	Yajibu an adrusa hādhā al-masāʾ.
h2p350	下午我们去跑步吧。	Let's go running this afternoon.	لِنَذْهَبْ لِلْجَرْيِ بَعْدَ الظُّهْرِ.	Linadhhab li-l-jaryi baʿda aẓ-ẓuhr.
h2p351	每个星期我都去游泳。	I go swimming every week.	أَذْهَبُ لِلسِّبَاحَةِ كُلَّ أُسْبُوعٍ.	Adhhabu li-s-sibāḥati kulla usbūʿ.
h2p352	我们学校有很多教室。	Our school has a lot of classrooms.	فِي مَدْرَسَتِنَا فُصُولٌ كَثِيرَةٌ.	Fī madrasatinā fuṣūlun kathīra.
h2p353	我的房间很小。	My room is very small.	غُرْفَتِي صَغِيرَةٌ جِدًّا.	Ghurfatī ṣaghīratun jiddan.
h2p354	你的房间真大！	Your room is really big!	غُرْفَتُكَ كَبِيرَةٌ حَقًّا!	Ghurfatuka kabīratun ḥaqqan!
h2p355	我没见过雪。	I've never seen snow.	لَمْ أَرَ الثَّلْجَ أَبَدًا.	Lam ara ath-thalja abadan.
h2p356	雪是白的。	Snow is white.	الثَّلْجُ أَبْيَضُ.	Ath-thalju abyaḍ.
h2p357	西瓜里面是红的。	Watermelon is red inside.	دَاخِلُ الْبَطِّيخَةِ أَحْمَرُ.	Dākhilu al-baṭṭīkhati aḥmar.
h2p358	你的眼睛是什么颜色？	What colour are your eyes?	مَا لَوْنُ عَيْنَيْكَ؟	Mā lawnu ʿaynayk?
h2p359	他穿着红衣服。	He's wearing red clothes.	هُوَ يَلْبَسُ مَلَابِسَ حَمْرَاءَ.	Huwa yalbasu malābisa ḥamrāʾ.
h2p360	我今天穿什么？	What shall I wear today?	مَاذَا أَلْبَسُ الْيَوْمَ؟	Mādhā albasu al-yawm?
```
