These are **Spanish translations** of Chinese lines from a beginner Chinese learning app (small cartoon creatures on a desktop say them). The Chinese has already been verified and is not under review. What is under review is the `gloss` column: the Spanish meaning shown under the Chinese to a learner who reads Spanish. An English gloss is included only so you can see the intended sense.

The Spanish should be neutral Latin American Spanish: `tú` for "you", `ustedes` for the plural, no `vosotros`, no regionalisms. Lines of a conversation are separated by " | " and must keep the same number of parts as the Chinese (separated by ｜).

For every row, check:
1. Does the Spanish mean what the **Chinese** says — not a translation of the English, which can be looser?
2. Is it natural Spanish, the way a native speaker would actually put it, with correct accents and ¿¡ punctuation?
3. For a single word, is it the dictionary sense a learner needs (verbs as infinitives, "(partícula …)" for particles)?
4. For a creature's name, does the Spanish say what the name means, the way a nickname is glossed ("Frijolito"), rather than transliterating it?

If it needs changing, give the whole corrected Spanish in `fix_gloss`.

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
id	script	english	gloss
h2w001	吧	(suggestion particle) let's…; …right?	(partícula de sugerencia o de confirmación)
h2w007	别	don't	no (para prohibir algo)
h2w027	服务员	waiter; attendant	mesero; empleado de servicio
h2w057	可以	can; may	poder (tener permiso)
h2w062	离	away from	(indica distancia) de
h2w099	送	to give (as a gift); to see off	regalar; acompañar (a alguien que se va)
h2w101	它	it	él; ella (cosa o animal)
h2w114	希望	to hope	desear
h2w129	一下	(a quick) once; a bit	un momento; un poco
h2w136	鱼	fish	pez; pescado
h2w140	早上	morning	la mañana
h2w149	最	most	el más
```
