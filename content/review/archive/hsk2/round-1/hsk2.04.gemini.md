These are drafted phrases for a beginner Chinese learning app. Each is spoken by a small cartoon creature living on the user's desktop, and must use only **HSK 1–2 vocabulary** (the levels are cumulative).

For every row, check:
1. Does the Chinese mean the English?
2. Is the pinyin correct, **including tone marks and neutral tones**? (It was generated mechanically — treat it as a claim to check. Watch neutral tones and 一/不 sandhi.)
3. Is it natural — would a native speaker actually say this, or is it translated-sounding?
4. Is it within HSK 2 vocabulary, counting every level below it?
5. Is it Simplified, not Traditional?

## Reply format — important

Reply with **nothing but a TSV block**, one row per entry, with this exact header:

```
id	verdict	fix_script	fix_reading	fix_english	note
```

- `verdict` is exactly one of `ok`, `fix`, or `drop`.
- For `ok`, leave the three `fix_` columns empty.
- For `fix`, fill in **only** the columns that need to change; leave the rest empty.
- For `drop`, explain why in `note` — use this when the entry is not salvageable.
- `note` is free text but must contain no tab characters.
- Return a row for **every** id given, in the same order.

## Entries

```
id	script	reading	english
h2p181	商店几点开门？	Shāng diàn jǐ diǎn kāi mén?	What time does the shop open?
h2p182	这个比那个贵。	Zhè ge bǐ nà ge guì.	This one is more expensive than that one.
h2p183	我没有时间。	Wǒ méi yǒu shí jiān.	I don't have time.
h2p184	你有时间吗？	Nǐ yǒu shí jiān ma?	Do you have time?
h2p185	你的生日是几月几号？	Nǐ de shēng rì shì jǐ yuè jǐ hào?	When is your birthday?
h2p186	今天是我的生日！	Jīn tiān shì wǒ de shēng rì!	Today is my birthday!
h2p187	我去年去了北京。	Wǒ qù nián qù le běi jīng.	I went to Beijing last year.
h2p188	我已经吃饭了。	Wǒ yǐ jīng chī fàn le.	I've already eaten.
h2p189	他已经走了。	Tā yǐ jīng zǒu le.	He's already gone.
h2p190	我等了一个小时。	Wǒ děng le yí gè xiǎo shí.	I waited for an hour.
h2p191	还有十分钟。	Hái yǒu shí fēn zhōng.	There are still ten minutes.
h2p192	我们快点儿走吧！	Wǒ men kuài diǎn ér zǒu ba!	Let's hurry up and go!
h2p193	时间到了！	Shí jiān dào le!	Time's up!
h2p194	每天都很忙。	Měi tiān dōu hěn máng.	Every day is busy.
h2p195	我每天八点起床。	Wǒ měi tiān bā diǎn qǐ chuáng.	I get up at eight every day.
h2p196	晚上我们去看电影吧。	Wǎn shang wǒ men qù kàn diàn yǐng ba.	Let's go see a movie tonight.
h2p197	我想去旅游。	Wǒ xiǎng qù lǚ yóu.	I want to go travelling.
h2p198	机场离这儿远吗？	Jī chǎng lí zhèr yuǎn ma?	Is the airport far from here?
h2p199	医院离这儿很近。	Yī yuàn lí zhèr hěn jìn.	The hospital is very close to here.
h2p200	我们坐公共汽车去吧。	Wǒ men zuò gōng gòng qì chē qù ba.	Let's take the bus.
h2p201	我们住在宾馆。	Wǒ men zhù zài bīn guǎn.	We're staying at a hotel.
h2p202	你的房间在哪儿？	Nǐ de fáng jiān zài nǎr?	Where is your room?
h2p203	往左边走。	Wǎng zuǒ bian zǒu.	Go to the left.
h2p204	往右边走。	Wǎng yòu bian zǒu.	Go to the right.
h2p205	学校在医院旁边。	Xué xiào zài yī yuàn páng biān.	The school is next to the hospital.
h2p206	商店在右边。	Shāng diàn zài yòu bian.	The shop is on the right.
h2p207	我从北京来。	Wǒ cóng běi jīng lái.	I come from Beijing.
h2p208	你从哪儿来？	Nǐ cóng nǎr lái?	Where do you come from?
h2p209	北京离这儿很远。	Běi jīng lí zhèr hěn yuǎn.	Beijing is far from here.
h2p210	路上车很多。	Lù shang chē hěn duō.	There are lots of cars on the road.
h2p211	飞机票很贵。	Fēi jī piào hěn guì.	Plane tickets are expensive.
h2p212	我买到票了！	Wǒ mǎi dào piào le!	I got the tickets!
h2p213	你去过中国吗？	Nǐ qù guo zhōng guó ma?	Have you been to China?
h2p214	我去过北京。	Wǒ qù guo běi jīng.	I've been to Beijing.
h2p215	你的眼睛很漂亮。	Nǐ de yǎn jing hěn piào liang.	Your eyes are very pretty.
h2p216	我有一个很大的眼睛。	Wǒ yǒu yí gè hěn dà de yǎn jing.	I have one very big eye.
h2p217	猫在门外面。	Māo zài mén wài miàn.	The cat is outside the door.
h2p218	它是我的猫。	Tā shì wǒ de māo.	It's my cat.
h2p219	它叫什么名字？	Tā jiào shén me míng zi?	What's its name?
h2p220	你说得对。	Nǐ shuō de duì.	You're right.
h2p221	我觉得你说得对。	Wǒ jué de nǐ shuō de duì.	I think you're right.
h2p222	我也是！	Wǒ yě shì!	Me too!
h2p223	我也不知道。	Wǒ yě bù zhī dào.	I don't know either.
h2p224	真的吗？	Zhēn de ma?	Really?
h2p225	真的！	Zhēn de!	Really!
h2p226	为什么？	Wèi shén me?	Why?
h2p227	为什么不呢？	Wèi shén me bù ne?	Why not?
h2p228	因为我喜欢你，所以我来了。	Yīn wèi wǒ xǐ huan nǐ, suǒ yǐ wǒ lái le.	Because I like you, I came.
h2p229	因为下雨，所以我没去。	Yīn wèi xià yǔ, suǒ yǐ wǒ méi qù.	Because it rained, I didn't go.
h2p230	虽然很累，但是我很高兴。	Suī rán hěn lèi, dàn shì wǒ hěn gāo xìng.	Although I'm tired, I'm happy.
h2p231	虽然外面很冷，但是我想出去玩。	Suī rán wài miàn hěn lěng, dàn shì wǒ xiǎng chū qù wán.	Although it's cold outside, I want to go out and play.
h2p232	你别笑！	Nǐ bié xiào!	Don't laugh!
h2p233	他笑了。	Tā xiào le.	He laughed.
h2p234	你在笑什么？	Nǐ zài xiào shén me?	What are you laughing at?
h2p235	我正在看书。	Wǒ zhèng zài kàn shū.	I'm reading right now.
h2p236	他正在打电话。	Tā zhèng zài dǎ diàn huà.	He's on the phone right now.
h2p237	我在找我的手机。	Wǒ zài zhǎo wǒ de shǒu jī.	I'm looking for my phone.
h2p238	你看见我的手表了吗？	Nǐ kàn jiàn wǒ de shǒu biǎo le ma?	Have you seen my watch?
h2p239	我的手机在哪儿？	Wǒ de shǒu jī zài nǎr?	Where's my phone?
h2p240	给我打电话吧。	Gěi wǒ dǎ diàn huà ba.	Give me a call.
```
