These are drafted **short conversations** for a beginner Chinese learning app, held between two small cartoon creatures on the user's desktop. Each row is one whole exchange; turns are separated by ｜ in the Chinese and by " | " in the pinyin and English, and the speakers alternate (turn 1 is creature A, turn 2 is creature B, and so on). Only **HSK 1 vocabulary** may be used.

For every row, check the exchange **as a whole**:
1. Does each turn mean its English, turn for turn?
2. Is each reply a natural answer to what was just said — would two native speakers actually have this exchange? A correct sentence that does not answer the previous turn makes the row wrong.
3. Is the pinyin correct, **including tone marks and neutral tones**? (Generated mechanically — treat it as a claim. Syllable-by-syllable spacing is the house style; do not fix spacing.)
4. Is it within HSK 1 vocabulary, and Simplified?

If you fix a row, give the **whole** corrected exchange in each fix column you use, keeping the ｜ and " | " separators and the same number of turns in every column.

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
x001	你好！｜你好！	Nǐ hǎo! | Nǐ hǎo!	Hello! | Hello!
x002	你好吗？｜我很好，谢谢。你呢？｜我很好。	Nǐ hǎo ma? | Wǒ hěn hǎo, xiè xie. Nǐ ne? | Wǒ hěn hǎo.	How are you? | I'm fine, thanks. And you? | I'm fine.
x003	你们好！｜你好！	Nǐ men hǎo! | Nǐ hǎo!	Hello, everyone! | Hello!
x004	你在哪儿？｜我在这儿！	Nǐ zài nǎr? | Wǒ zài zhèr!	Where are you? | I'm here!
x005	谁在那儿？｜是我！	Shéi zài nàr? | Shì wǒ!	Who's there? | It's me!
x006	你在做什么？｜我在吃东西。	Nǐ zài zuò shén me? | Wǒ zài chī dōng xi.	What are you doing? | I'm eating.
x007	你在看什么？｜我在看你。	Nǐ zài kàn shén me? | Wǒ zài kàn nǐ.	What are you looking at? | I'm looking at you.
x008	你认识他吗？｜我不认识他。	Nǐ rèn shi tā ma? | Wǒ bú rèn shi tā.	Do you know him? | I don't know him.
x009	他是谁？｜他是我的朋友。	Tā shì shéi? | Tā shì wǒ de péng you.	Who is he? | He is my friend.
x010	我们是朋友吗？｜是的！我们是朋友。	Wǒ men shì péng you ma? | Shì de! Wǒ men shì péng you.	Are we friends? | Yes! We are friends.
x011	你有朋友吗？｜有，你是我的朋友。	Nǐ yǒu péng you ma? | Yǒu, nǐ shì wǒ de péng you.	Do you have friends? | Yes, you're my friend.
x012	再见！｜明天见！	Zài jiàn! | Míng tiān jiàn!	Goodbye! | See you tomorrow!
x013	谢谢你！｜不客气。	Xiè xie nǐ! | Bú kè qi.	Thank you! | You're welcome.
x014	对不起！｜没关系。	Duì bu qǐ! | Méi guān xi.	Sorry! | It's okay.
x015	你好漂亮！｜谢谢！	Nǐ hǎo piào liang! | Xiè xie!	You're so pretty! | Thanks!
x016	你的衣服很漂亮。｜谢谢你！	Nǐ de yī fu hěn piào liang. | Xiè xie nǐ!	Your clothes are very pretty. | Thank you!
x017	我爱你。｜谢谢！我很高兴。	Wǒ ài nǐ. | Xiè xie! Wǒ hěn gāo xìng.	I love you. | Thanks! I'm very happy.
x018	你喜欢这儿吗？｜我很喜欢这儿。	Nǐ xǐ huan zhèr ma? | Wǒ hěn xǐ huan zhèr.	Do you like it here? | I like it here very much.
x019	你想吃什么？｜我想吃米饭。	Nǐ xiǎng chī shén me? | Wǒ xiǎng chī mǐ fàn.	What do you want to eat? | I want to eat rice.
x020	你吃饭了吗？｜我没有吃饭。｜我们去吃饭。	Nǐ chī fàn le ma? | Wǒ méi yǒu chī fàn. | Wǒ men qù chī fàn.	Have you eaten? | I haven't eaten. | Let's go and eat.
x021	我想吃东西。｜这儿有苹果。｜谢谢！	Wǒ xiǎng chī dōng xi. | Zhèr yǒu píng guǒ. | Xiè xie!	I want to eat something. | There are apples here. | Thanks!
x022	这是什么？｜这是苹果。｜我能吃吗？｜能！	Zhè shì shén me? | Zhè shì píng guǒ. | Wǒ néng chī ma? | Néng!	What is this? | This is an apple. | Can I eat it? | Yes!
x023	这个好吃吗？｜很好吃！	Zhè ge hǎo chī ma? | Hěn hǎo chī!	Is this tasty? | Very tasty!
x024	你喜欢什么水果？｜我喜欢苹果。	Nǐ xǐ huan shén me shuǐ guǒ? | Wǒ xǐ huan píng guǒ.	What fruit do you like? | I like apples.
x025	你想喝什么？｜我想喝茶。｜好的。	Nǐ xiǎng hē shén me? | Wǒ xiǎng hē chá. | Hǎo de.	What would you like to drink? | I'd like tea. | Okay.
x026	请喝茶。｜谢谢，我很喜欢喝茶。	Qǐng hē chá. | Xiè xie, wǒ hěn xǐ huan hē chá.	Please have some tea. | Thanks, I really like tea.
x027	你喜欢吃中国菜吗？｜很喜欢！	Nǐ xǐ huan chī zhōng guó cài ma? | Hěn xǐ huan!	Do you like Chinese food? | Very much!
x028	中午吃什么？｜吃米饭。	Zhōng wǔ chī shén me? | Chī mǐ fàn.	What's for lunch? | Rice.
x029	你想睡觉吗？｜我很想睡觉。	Nǐ xiǎng shuì jiào ma? | Wǒ hěn xiǎng shuì jiào.	Do you want to sleep? | I really want to sleep.
x030	你睡觉了吗？｜没有。	Nǐ shuì jiào le ma? | Méi yǒu.	Were you asleep? | No.
```
