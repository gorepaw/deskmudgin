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
h2p241	我告诉你一件事情。	Let me tell you something.	سَأُخْبِرُكَ بِشَيْءٍ.	Saʾukhbiruka bishayʾ.
h2p242	别告诉他！	Don't tell him!	لَا تُخْبِرْهُ!	Lā tukhbirh!
h2p243	你能帮助我吗？	Can you help me?	هَلْ تَسْتَطِيعُ مُسَاعَدَتِي؟	Hal tastaṭīʿu musāʿadatī?
h2p244	谢谢你的帮助。	Thank you for your help.	شُكْرًا عَلَى مُسَاعَدَتِكَ.	Shukran ʿalā musāʿadatik.
h2p245	我来介绍一下。	Let me make the introductions.	دَعْنِي أُعَرِّفُكَ بِنَفْسِي.	Daʿnī uʿarrifuka binafsī.
h2p246	请进！	Please come in!	تَفَضَّلْ بِالدُّخُولِ!	Tafaḍḍal bi-d-dukhūl!
h2p247	请等一下。	Please wait a moment.	اِنْتَظِرْ لَحْظَةً مِنْ فَضْلِكَ.	Intaẓir laḥẓatan min faḍlik.
h2p248	等等我！	Wait for me!	اِنْتَظِرْنِي!	Intaẓirnī!
h2p249	我们一起走吧。	Let's go together.	لِنَذْهَبْ مَعًا.	Linadhhab maʿan.
h2p250	你走得太快了！	You're walking too fast!	تَمْشِي بِسُرْعَةٍ كَبِيرَةٍ!	Tamshī bisurʿatin kabīra!
h2p251	我不想洗衣服。	I don't want to do the laundry.	لَا أُرِيدُ أَنْ أَغْسِلَ الْمَلَابِسَ.	Lā urīdu an aghsila al-malābis.
h2p252	我去洗手。	I'm going to wash my hands.	سَأَذْهَبُ لِأَغْسِلَ يَدَيَّ.	Saʾadhhabu liʾaghsila yadayy.
h2p253	他在看报纸。	He's reading the newspaper.	هُوَ يَقْرَأُ الْجَرِيدَةَ.	Huwa yaqraʾu al-jarīda.
h2p254	我喜欢喝咖啡。	I like drinking coffee.	أُحِبُّ شُرْبَ الْقَهْوَةِ.	Uḥibbu shurba al-qahwa.
h2p255	咖啡太热了。	The coffee is too hot.	الْقَهْوَةُ سَاخِنَةٌ جِدًّا.	Al-qahwatu sākhinatun jiddan.
h2p256	我每天早上喝牛奶。	I drink milk every morning.	أَشْرَبُ الْحَلِيبَ كُلَّ صَبَاحٍ.	Ashrabu al-ḥalība kulla ṣabāḥ.
h2p257	我不吃羊肉。	I don't eat lamb.	لَا آكُلُ لَحْمَ الْغَنَمِ.	Lā ākulu laḥma al-ghanam.
h2p258	这家饭店的菜很好吃。	The food at this restaurant is very tasty.	طَعَامُ هٰذَا الْمَطْعَمِ لَذِيذٌ جِدًّا.	Ṭaʿāmu hādhā al-maṭʿami ladhīdhun jiddan.
h2p259	服务员，我们要两杯茶。	Waiter, we'd like two cups of tea.	يَا نَادِلُ، نُرِيدُ كُوبَيْنِ مِنَ الشَّايِ.	Yā nādil, nurīdu kūbayni mina ash-shāy.
h2p260	我生病了。	I'm sick.	أَنَا مَرِيضٌ.	Anā marīḍ.
h2p261	你要吃药。	You need to take medicine.	يَجِبُ أَنْ تَتَنَاوَلَ الدَّوَاءَ.	Yajibu an tatanāwala ad-dawāʾ.
h2p262	你身体怎么样？	How are you feeling?	كَيْفَ صِحَّتُكَ؟	Kayfa ṣiḥḥatuk?
h2p263	我明天要去医院。	I have to go to the hospital tomorrow.	يَجِبُ أَنْ أَذْهَبَ إِلَى الْمُسْتَشْفَى غَدًا.	Yajibu an adhhaba ilā al-mustashfā ghadan.
h2p264	多喝水，多休息。	Drink lots of water and get lots of rest.	اِشْرَبْ مَاءً كَثِيرًا وَخُذْ قِسْطًا مِنَ الرَّاحَةِ.	Ishrab māʾan kathīran wakhudh qisṭan mina ar-rāḥa.
h2p265	门开着。	The door is open.	الْبَابُ مَفْتُوحٌ.	Al-bābu maftūḥ.
h2p266	请开门！	Please open the door!	اِفْتَحِ الْبَابَ مِنْ فَضْلِكَ!	Iftaḥi al-bāba min faḍlik!
h2p267	你在外面吗？	Are you outside?	هَلْ أَنْتَ فِي الْخَارِجِ؟	Hal anta fī al-khārij?
h2p268	外面有人。	There's someone outside.	هُنَاكَ أَحَدٌ فِي الْخَارِجِ.	Hunāka aḥadun fī al-khārij.
h2p269	我们进去吧。	Let's go in.	لِنَدْخُلْ.	Linadkhul.
h2p270	你出来！	Come out!	اُخْرُجْ!	Ukhruj!
h2p271	我不想出去。	I don't want to go out.	لَا أُرِيدُ أَنْ أَخْرُجَ.	Lā urīdu an akhruj.
h2p272	我可以进来吗？	May I come in?	هَلْ يُمْكِنُنِي الدُّخُولُ؟	Hal yumkinunī ad-dukhūl?
h2p273	他出去了。	He's gone out.	خَرَجَ.	Kharaj.
h2p274	那个人是男的还是女的？	Is that person a man or a woman?	هَلْ ذٰلِكَ الشَّخْصُ رَجُلٌ أَمِ اِمْرَأَةٌ؟	Hal dhālika ash-shakhṣu rajulun ami imraʾa?
h2p275	你姓什么？	What's your surname?	مَا اسْمُ عَائِلَتِكَ؟	Mā ismu ʿāʾilatik?
h2p276	我有两百块钱。	I have two hundred yuan.	عِنْدِي مِئَتَا يُوَانٍ.	ʿIndī miʾatā yuwān.
h2p277	一千块太贵了！	A thousand yuan is too expensive!	أَلْفُ يُوَانٍ غَالٍ جِدًّا!	Alfu yuwānin ghālin jiddan!
h2p278	我是第一！	I'm number one!	أَنَا الْأَوَّلُ!	Anā al-ʾawwal!
h2p279	我最高！	I'm the tallest!	أَنَا الْأَطْوَلُ!	Anā al-ʾaṭwal!
h2p280	你比我快。	You're faster than me.	أَنْتَ أَسْرَعُ مِنِّي.	Anta asraʿu minnī.
h2p281	他比我大两岁。	He's two years older than me.	هُوَ أَكْبَرُ مِنِّي بِسَنَتَيْنِ.	Huwa akbaru minnī bisanatayn.
h2p282	这个比那个好。	This one is better than that one.	هٰذَا أَفْضَلُ مِنْ ذٰلِكَ.	Hādhā afḍalu min dhālik.
h2p283	我没有你高。	I'm not as tall as you.	لَسْتُ طَوِيلًا مِثْلَكَ.	Lastu ṭawīlan mithlak.
h2p284	这是新的吗？	Is this new?	هَلْ هٰذَا جَدِيدٌ؟	Hal hādhā jadīd?
h2p285	我有一个新手机。	I have a new phone.	عِنْدِي هَاتِفٌ جَدِيدٌ.	ʿIndī hātifun jadīd.
h2p286	我喜欢你的新衣服。	I like your new clothes.	أُحِبُّ مَلَابِسَكَ الْجَدِيدَةَ.	Uḥibbu malābisaka al-jadīda.
h2p287	这本书我看完了。	I've finished reading this book.	اِنْتَهَيْتُ مِنْ قِرَاءَةِ هٰذَا الْكِتَابِ.	Intahaytu min qirāʾati hādhā al-kitāb.
h2p288	你做完了吗？	Are you done?	هَلِ انْتَهَيْتَ؟	Hali intahayt?
h2p289	我还没做完。	I haven't finished yet.	لَمْ أَنْتَهِ بَعْدُ.	Lam antahi baʿd.
h2p290	我们开始吧！	Let's begin!	لِنَبْدَأْ!	Linabdaʾ!
h2p291	我们什么时候开始？	When do we start?	مَتَى نَبْدَأُ؟	Matā nabdaʾ?
h2p292	你准备好了吗？	Are you ready?	هَلْ أَنْتَ مُسْتَعِدٌّ؟	Hal anta mustaʿidd?
h2p293	我准备好了！	I'm ready!	أَنَا مُسْتَعِدٌّ!	Anā mustaʿidd!
h2p294	我希望明天是晴天。	I hope it's sunny tomorrow.	أَتَمَنَّى أَنْ يَكُونَ الْجَوُّ مُشْمِسًا غَدًا.	Atamannā an yakūna al-jawwu mushmisan ghadan.
h2p295	我希望你快乐。	I hope you're happy.	أَتَمَنَّى لَكَ السَّعَادَةَ.	Atamannā laka as-saʿāda.
h2p296	可能吧。	Maybe.	رُبَّمَا.	Rubbamā.
h2p297	这样可以吗？	Is this OK?	هَلْ هٰذَا مُنَاسِبٌ؟	Hal hādhā munāsib?
h2p298	不可以！	No, you can't!	لَا يُمْكِنُ!	Lā yumkin!
h2p299	我可以坐这儿吗？	May I sit here?	هَلْ يُمْكِنُنِي الْجُلُوسُ هُنَا؟	Hal yumkinunī al-julūsu hunā?
h2p300	你要去哪儿？	Where are you going?	إِلَى أَيْنَ تَذْهَبُ؟	Ilā ayna tadhhab?
```
