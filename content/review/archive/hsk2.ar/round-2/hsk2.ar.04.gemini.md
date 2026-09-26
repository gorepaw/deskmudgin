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
h2p181	商店几点开门？	What time does the shop open?	فِي أَيِّ سَاعَةٍ يَفْتَحُ الْمَحَلُّ؟	Fī ayyi sāʿatin yaftaḥu al-maḥall?
h2p182	这个比那个贵。	This one is more expensive than that one.	هٰذَا أَغْلَى مِنْ ذٰلِكَ.	Hādhā aghlā min dhālik.
h2p183	我没有时间。	I don't have time.	لَيْسَ عِنْدِي وَقْتٌ.	Laysa ʿindī waqt.
h2p184	你有时间吗？	Do you have time?	هَلْ عِنْدَكَ وَقْتٌ؟	Hal ʿindaka waqt?
h2p185	你的生日是几月几号？	When is your birthday?	مَتَى عِيدُ مِيلَادِكَ؟	Matā ʿīdu mīlādik?
h2p186	今天是我的生日！	Today is my birthday!	الْيَوْمَ عِيدُ مِيلَادِي!	Al-yawma ʿīdu mīlādī!
h2p187	我去年去了北京。	I went to Beijing last year.	ذَهَبْتُ إِلَى بِكِينَ الْعَامَ الْمَاضِيَ.	Dhahabtu ilā bikīna al-ʿāma al-māḍiy.
h2p188	我已经吃饭了。	I've already eaten.	لَقَدْ أَكَلْتُ بِالْفِعْلِ.	Laqad akaltu bi-l-fiʿl.
h2p189	他已经走了。	He's already gone.	لَقَدْ ذَهَبَ بِالْفِعْلِ.	Laqad dhahaba bi-l-fiʿl.
h2p190	我等了一个小时。	I waited for an hour.	اِنْتَظَرْتُ سَاعَةً.	Intaẓartu sāʿa.
h2p191	还有十分钟。	There are still ten minutes.	مَا زَالَتْ هُنَاكَ عَشْرُ دَقَائِقَ.	Mā zālat hunāka ʿashru daqāʾiq.
h2p192	我们快点儿走吧！	Let's hurry up and go!	لِنُسْرِعْ وَنَذْهَبْ!	Linusriʿ wanadhhab!
h2p193	时间到了！	Time's up!	اِنْتَهَى الْوَقْتُ!	Intahā al-waqt!
h2p194	每天都很忙。	Every day is busy.	أَنَا مَشْغُولٌ كُلَّ يَوْمٍ.	Anā mashghūlun kulla yawm.
h2p195	我每天八点起床。	I get up at eight every day.	أَسْتَيْقِظُ فِي السَّاعَةِ الثَّامِنَةِ كُلَّ يَوْمٍ.	Astayqiẓu fī as-sāʿati ath-thāminati kulla yawm.
h2p196	晚上我们去看电影吧。	Let's go see a movie tonight.	لِنَذْهَبْ لِمُشَاهَدَةِ فِيلْمٍ اللَّيْلَةَ.	Linadhhab limushāhadati fīlmin al-layla.
h2p197	我想去旅游。	I want to go travelling.	أُرِيدُ أَنْ أُسَافِرَ.	Urīdu an usāfir.
h2p198	机场离这儿远吗？	Is the airport far from here?	هَلِ الْمَطَارُ بَعِيدٌ مِنْ هُنَا؟	Hali al-maṭāru baʿīdun min hunā?
h2p199	医院离这儿很近。	The hospital is very close to here.	الْمُسْتَشْفَى قَرِيبٌ جِدًّا مِنْ هُنَا.	Al-mustashfā qarībun jiddan min hunā.
h2p200	我们坐公共汽车去吧。	Let's take the bus.	لِنَذْهَبْ بِالْحَافِلَةِ.	Linadhhab bi-l-ḥāfila.
h2p201	我们住在宾馆。	We're staying at a hotel.	نَحْنُ نُقِيمُ فِي فُنْدُقٍ.	Naḥnu nuqīmu fī funduq.
h2p202	你的房间在哪儿？	Where is your room?	أَيْنَ غُرْفَتُكَ؟	Ayna ghurfatuk?
h2p203	往左边走。	Go to the left.	اِذْهَبْ إِلَى الْيَسَارِ.	Idhhab ilā al-yasār.
h2p204	往右边走。	Go to the right.	اِذْهَبْ إِلَى الْيَمِينِ.	Idhhab ilā al-yamīn.
h2p205	学校在医院旁边。	The school is next to the hospital.	الْمَدْرَسَةُ بِجَانِبِ الْمُسْتَشْفَى.	Al-madrasatu bijānibi al-mustashfā.
h2p206	商店在右边。	The shop is on the right.	الْمَحَلُّ عَلَى الْيَمِينِ.	Al-maḥallu ʿalā al-yamīn.
h2p207	我从北京来。	I come from Beijing.	أَنَا قَادِمٌ مِنْ بِكِينَ.	Anā qādimun min bikīn.
h2p208	你从哪儿来？	Where do you come from?	مِنْ أَيْنَ أَنْتَ؟	Min ayna anta?
h2p209	北京离这儿很远。	Beijing is far from here.	بِكِينُ بَعِيدَةٌ عَنْ هُنَا.	Bikīnu baʿīdatun ʿan hunā.
h2p210	路上车很多。	There are lots of cars on the road.	هُنَاكَ سَيَّارَاتٌ كَثِيرَةٌ عَلَى الطَّرِيقِ.	Hunāka sayyārātun kathīratun ʿalā aṭ-ṭarīq.
h2p211	飞机票很贵。	Plane tickets are expensive.	تَذْكِرَةُ الطَّائِرَةِ غَالِيَةٌ.	Tadhkiratu aṭ-ṭāʾirati ghāliya.
h2p212	我买到票了！	I got the tickets!	حَصَلْتُ عَلَى التَّذْكِرَةِ!	Ḥaṣaltu ʿalā at-tadhkira!
h2p213	你去过中国吗？	Have you been to China?	هَلْ ذَهَبْتَ إِلَى الصِّينِ مِنْ قَبْلُ؟	Hal dhahabta ilā aṣ-ṣīni min qabl?
h2p214	我去过北京。	I've been to Beijing.	ذَهَبْتُ إِلَى بِكِينَ مِنْ قَبْلُ.	Dhahabtu ilā bikīna min qabl.
h2p215	你的眼睛很漂亮。	Your eyes are very pretty.	عَيْنَاكَ جَمِيلَتَانِ جِدًّا.	ʿAynāka jamīlatāni jiddan.
h2p216	我有一个很大的眼睛。	I have one very big eye.	عِنْدِي عَيْنٌ كَبِيرَةٌ جِدًّا.	ʿIndī ʿaynun kabīratun jiddan.
h2p217	猫在门外面。	The cat is outside the door.	الْقِطَّةُ خَارِجَ الْبَابِ.	Al-qiṭṭatu khārija al-bāb.
h2p218	它是我的猫。	It's my cat.	هِيَ قِطَّتِي.	Hiya qiṭṭatī.
h2p219	它叫什么名字？	What's its name?	مَا اسْمُهَا؟	Mā ismuhā?
h2p220	你说得对。	You're right.	أَنْتَ عَلَى حَقٍّ.	Anta ʿalā ḥaqq.
h2p221	我觉得你说得对。	I think you're right.	أَعْتَقِدُ أَنَّكَ عَلَى حَقٍّ.	Aʿtaqidu annaka ʿalā ḥaqq.
h2p222	我也是！	Me too!	أَنَا أَيْضًا!	Anā ayḍan!
h2p223	我也不知道。	I don't know either.	أَنَا أَيْضًا لَا أَعْرِفُ.	Anā ayḍan lā aʿrif.
h2p224	真的吗？	Really?	حَقًّا؟	Ḥaqqan?
h2p225	真的！	Really!	حَقًّا!	Ḥaqqan!
h2p226	为什么？	Why?	لِمَاذَا؟	Limādhā?
h2p227	为什么不呢？	Why not?	لِمَاذَا لَا؟	Limādhā lā?
h2p228	因为我喜欢你，所以我来了。	Because I like you, I came.	لِأَنِّي أُحِبُّكَ، أَتَيْتُ.	Liʾannī uḥibbuk, atayt.
h2p229	因为下雨，所以我没去。	Because it rained, I didn't go.	لِأَنَّهَا أَمْطَرَتْ، لَمْ أَذْهَبْ.	Liʾannahā amṭarat, lam adhhab.
h2p230	虽然很累，但是我很高兴。	Although I'm tired, I'm happy.	مَعَ أَنِّي مُتْعَبٌ، لٰكِنِّي سَعِيدٌ.	Maʿa annī mutʿab, lākinnī saʿīd.
h2p231	虽然外面很冷，但是我想出去玩。	Although it's cold outside, I want to go out and play.	مَعَ أَنَّ الْجَوَّ بَارِدٌ فِي الْخَارِجِ، لٰكِنِّي أُرِيدُ أَنْ أَخْرُجَ لِلَّعِبِ.	Maʿa anna al-jawwa bāridun fī al-khārij, lākinnī urīdu an akhruja lillaʿib.
h2p232	你别笑！	Don't laugh!	لَا تَضْحَكْ!	Lā taḍḥak!
h2p233	他笑了。	He laughed.	ضَحِكَ.	Ḍaḥik.
h2p234	你在笑什么？	What are you laughing at?	عَلَى مَاذَا تَضْحَكُ؟	ʿAlā mādhā taḍḥak?
h2p235	我正在看书。	I'm reading right now.	أَقْرَأُ كِتَابًا الْآنَ.	Aqraʾu kitāban al-ʾān.
h2p236	他正在打电话。	He's on the phone right now.	هُوَ عَلَى الْهَاتِفِ الْآنَ.	Huwa ʿalā al-hātifi al-ʾān.
h2p237	我在找我的手机。	I'm looking for my phone.	أَبْحَثُ عَنْ هَاتِفِي.	Abḥathu ʿan hātifī.
h2p238	你看见我的手表了吗？	Have you seen my watch?	هَلْ رَأَيْتَ سَاعَتِي؟	Hal raʾayta sāʿatī?
h2p239	我的手机在哪儿？	Where's my phone?	أَيْنَ هَاتِفِي؟	Ayna hātifī?
h2p240	给我打电话吧。	Give me a call.	اِتَّصِلْ بِي.	Ittaṣil bī.
```
