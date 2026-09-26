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
h2p121	我喜欢下雪。	I like it when it snows.	أُحِبُّ نُزُولَ الثَّلْجِ.	Uḥibbu nuzūla ath-thalj.
h2p122	外面很冷，多穿点儿衣服。	It's cold outside, put on more clothes.	الْجَوُّ بَارِدٌ فِي الْخَارِجِ، اِلْبَسْ مَلَابِسَ أَكْثَرَ.	Al-jawwu bāridun fī al-khārij, ilbas malābisa akthar.
h2p123	今天太热了，我想去游泳。	It's too hot today, I want to go swimming.	الْجَوُّ حَارٌّ جِدًّا الْيَوْمَ، أُرِيدُ أَنْ أَذْهَبَ لِلسِّبَاحَةِ.	Al-jawwu ḥārrun jiddan al-yawm, urīdu an adhhaba li-s-sibāḥa.
h2p124	明天是晴天吗？	Will it be sunny tomorrow?	هَلْ سَيَكُونُ الْجَوُّ مُشْمِسًا غَدًا؟	Hal sayakūnu al-jawwu mushmisan ghadan?
h2p125	天阴了，可能要下雨。	The sky has clouded over; it might rain.	أَصْبَحَتِ السَّمَاءُ غَائِمَةً، رُبَّمَا تُمْطِرُ.	Aṣbaḥati as-samāʾu ghāʾima, rubbamā tumṭir.
h2p126	我有一个哥哥。	I have an older brother.	عِنْدِي أَخٌ كَبِيرٌ.	ʿIndī akhun kabīr.
h2p127	我姐姐是医生。	My older sister is a doctor.	أُخْتِي الْكَبِيرَةُ طَبِيبَةٌ.	Ukhtī al-kabīratu ṭabība.
h2p128	我弟弟六岁。	My younger brother is six.	أَخِي الصَّغِيرُ عُمْرُهُ سِتُّ سَنَوَاتٍ.	Akhī aṣ-ṣaghīru ʿumruhu sittu sanawāt.
h2p129	我妹妹很漂亮。	My younger sister is very pretty.	أُخْتِي الصَّغِيرَةُ جَمِيلَةٌ جِدًّا.	Ukhtī aṣ-ṣaghīratu jamīlatun jiddan.
h2p130	他是我丈夫。	He is my husband.	هُوَ زَوْجِي.	Huwa zawjī.
h2p131	她是我妻子。	She is my wife.	هِيَ زَوْجَتِي.	Hiya zawjatī.
h2p132	你有孩子吗？	Do you have children?	هَلْ عِنْدَكَ أَوْلَادٌ؟	Hal ʿindaka awlād?
h2p133	我哥哥比我高。	My older brother is taller than me.	أَخِي الْكَبِيرُ أَطْوَلُ مِنِّي.	Akhī al-kabīru aṭwalu minnī.
h2p134	你有几个姐姐？	How many older sisters do you have?	كَمْ أُخْتًا كَبِيرَةً عِنْدَكَ؟	Kam ukhtan kabīratan ʿindak?
h2p135	我的孩子喜欢踢足球。	My child likes playing football.	وَلَدِي يُحِبُّ لَعِبَ كُرَةِ الْقَدَمِ.	Waladī yuḥibbu laʿiba kurati al-qadam.
h2p136	我们几点上课？	What time is our class?	مَتَى يَبْدَأُ دَرْسُنَا؟	Matā yabdaʾu darsunā?
h2p137	今天有考试。	There's an exam today.	الْيَوْمَ هُنَاكَ اِمْتِحَانٌ.	Al-yawma hunāka imtiḥān.
h2p138	这个题我不会。	I can't do this question.	لَا أَعْرِفُ حَلَّ هٰذَا السُّؤَالِ.	Lā aʿrifu ḥalla hādhā as-suʾāl.
h2p139	我不懂这个问题。	I don't understand this question.	لَا أَفْهَمُ هٰذَا السُّؤَالَ.	Lā afhamu hādhā as-suʾāl.
h2p140	你懂了吗？	Do you understand?	هَلْ فَهِمْتَ؟	Hal fahimt?
h2p141	我懂了！	I get it!	فَهِمْتُ!	Fahimt!
h2p142	老师在教室里。	The teacher is in the classroom.	الْمُعَلِّمُ فِي الْفَصْلِ.	Al-muʿallimu fī al-faṣl.
h2p143	我要准备考试。	I need to prepare for the exam.	عِنْدِي اِمْتِحَانٌ، يَجِبُ أَنْ أَسْتَعِدَّ لَهُ.	ʿIndī imtiḥān, yajibu an astaʿidda lah.
h2p144	考试开始了！	The exam has started!	لَقَدْ بَدَأَ اِمْتِحَانُنَا!	Laqad badaʾa imtiḥānunā!
h2p145	你考得怎么样？	How did your exam go?	كَيْفَ كَانَ اِمْتِحَانُكَ؟	Kayfa kāna imtiḥānuk?
h2p146	我可以问你一个问题吗？	Can I ask you a question?	هَلْ يُمْكِنُنِي أَنْ أَسْأَلَكَ سُؤَالًا؟	Hal yumkinunī an asʾalaka suʾālan?
h2p147	请回答我的问题。	Please answer my question.	مِنْ فَضْلِكَ أَجِبْ عَنْ سُؤَالِي.	Min faḍlika ajib ʿan suʾālī.
h2p148	我学习汉语已经一年了。	I've been studying Chinese for a year now.	أَدْرُسُ اللُّغَةَ الصِّينِيَّةَ مُنْذُ سَنَةٍ.	Adrusu al-lughata aṣ-ṣīniyyata mundhu sana.
h2p149	这个字是什么意思？	What does this character mean?	مَا مَعْنَى هٰذِهِ الْكَلِمَةِ؟	Mā maʿnā hādhihi al-kalima?
h2p150	你说的是什么意思？	What do you mean?	مَاذَا تَقْصِدُ؟	Mādhā taqṣid?
h2p151	我不知道。	I don't know.	لَا أَعْرِفُ.	Lā aʿrif.
h2p152	你知道吗？	Do you know?	هَلْ تَعْرِفُ؟	Hal taʿrif?
h2p153	我知道了！	Got it!	عَرَفْتُ!	ʿAraft!
h2p154	铅笔在桌子上。	The pencil is on the table.	قَلَمُ الرَّصَاصِ عَلَى الطَّاوِلَةِ.	Qalamu ar-raṣāṣi ʿalā aṭ-ṭāwila.
h2p155	我找不到我的铅笔了。	I can't find my pencil.	لَا أَجِدُ قَلَمَ رَصَاصِي.	Lā ajidu qalama raṣāṣī.
h2p156	这是我第一次来北京。	This is my first time in Beijing.	هٰذِهِ أَوَّلُ مَرَّةٍ أَزُورُ فِيهَا بِكِينَ.	Hādhihi awwalu marratin azūru fīhā bikīn.
h2p157	我哥哥在公司工作。	My older brother works at a company.	أَخِي الْكَبِيرُ يَعْمَلُ فِي شَرِكَةٍ.	Akhī al-kabīru yaʿmalu fī sharika.
h2p158	我要去上班了。	I'm off to work.	سَأَذْهَبُ إِلَى الْعَمَلِ.	Saʾadhhabu ilā al-ʿamal.
h2p159	你每天几点上班？	What time do you start work every day?	فِي أَيِّ سَاعَةٍ تَذْهَبُ إِلَى الْعَمَلِ كُلَّ يَوْمٍ؟	Fī ayyi sāʿatin tadhhabu ilā al-ʿamali kulla yawm?
h2p160	他工作很忙。	He's very busy with work.	هُوَ مَشْغُولٌ جِدًّا بِعَمَلِهِ.	Huwa mashghūlun jiddan biʿamalih.
h2p161	我今天不上班。	I'm not working today.	لَا أَعْمَلُ الْيَوْمَ.	Lā aʿmalu al-yawm.
h2p162	我喜欢打篮球。	I like playing basketball.	أُحِبُّ لَعِبَ كُرَةِ السَّلَّةِ.	Uḥibbu laʿiba kurati as-salla.
h2p163	我们一起去踢足球吧！	Let's go play football together!	لِنَذْهَبْ لِنَلْعَبَ كُرَةَ الْقَدَمِ مَعًا!	Linadhhab linalʿaba kurata al-qadami maʿan!
h2p164	我每天早上跑步。	I run every morning.	أَرْكُضُ كُلَّ صَبَاحٍ.	Arkuḍu kulla ṣabāḥ.
h2p165	你会游泳吗？	Can you swim?	هَلْ تَعْرِفُ السِّبَاحَةَ؟	Hal taʿrifu as-sibāḥa?
h2p166	我游得很快。	I swim fast.	أَسْبَحُ بِسُرْعَةٍ.	Asbaḥu bisurʿa.
h2p167	运动对身体好。	Exercise is good for your health.	الرِّيَاضَةُ مُفِيدَةٌ لِلصِّحَّةِ.	Ar-riyāḍatu mufīdatun li-ṣ-ṣiḥḥa.
h2p168	他跑得非常快。	He runs extremely fast.	هُوَ يَرْكُضُ بِسُرْعَةٍ كَبِيرَةٍ.	Huwa yarkuḍu bisurʿatin kabīra.
h2p169	你喜欢什么运动？	What sport do you like?	أَيَّ رِيَاضَةٍ تُحِبُّ؟	Ayya riyāḍatin tuḥibb?
h2p170	我们去唱歌吧！	Let's go singing!	لِنَذْهَبْ لِلْغِنَاءِ!	Linadhhab li-l-ghināʾ!
h2p171	她跳舞跳得很好。	She dances very well.	هِيَ تَرْقُصُ جَيِّدًا جِدًّا.	Hiya tarquṣu jayyidan jiddan.
h2p172	太贵了！	Too expensive!	غَالٍ جِدًّا!	Ghālin jiddan!
h2p173	这个很便宜。	This is very cheap.	هٰذَا رَخِيصٌ جِدًّا.	Hādhā rakhīṣun jiddan.
h2p174	有没有便宜一点儿的？	Is there a cheaper one?	هَلْ يُوجَدُ شَيْءٌ أَرْخَصُ؟	Hal yūjadu shayʾun arkhaṣ?
h2p175	我想买一件衣服。	I want to buy a piece of clothing.	أُرِيدُ أَنْ أَشْتَرِيَ قِطْعَةَ مَلَابِسَ.	Urīdu an ashtariya qiṭʿata malābis.
h2p176	你喜欢什么颜色？	What colour do you like?	أَيَّ لَوْنٍ تُحِبُّ؟	Ayya lawnin tuḥibb?
h2p177	我最喜欢红色。	My favourite colour is red.	أَكْثَرُ لَوْنٍ أُحِبُّهُ هُوَ الْأَحْمَرُ.	Aktharu lawnin uḥibbuhu huwa al-ʾaḥmar.
h2p178	我觉得白的好看。	I think the white one looks nicer.	أَعْتَقِدُ أَنَّ الْأَبْيَضَ أَجْمَلُ.	Aʿtaqidu anna al-ʾabyaḍa ajmal.
h2p179	他穿着一件黑衣服。	He's wearing black clothes.	هُوَ يَرْتَدِي مَلَابِسَ سَوْدَاءَ.	Huwa yartadī malābisa sawdāʾ.
h2p180	这儿卖西瓜吗？	Do they sell watermelon here?	هَلْ يُبَاعُ الْبِطِّيخُ هُنَا؟	Hal yubāʿu al-biṭṭīkhu hunā?
```
