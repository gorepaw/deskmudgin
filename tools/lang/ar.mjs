// =============================================================================
// The Arabic adapter. Everything in the tools that is about Arabic rather than
// about language lives here, as zh.mjs is for Chinese.
//
// Its job is the rule the whole pipeline rests on, carried over: **nobody types
// a reading by hand.** For Chinese the reading is pinyin, derived from the
// characters. For Arabic it is a romanization, and it is derived from the
// *vowel marks*: fully vowelled Arabic (مَرْحَبًا) says exactly how it is
// pronounced, letter by letter, so the Latin line can be read off it
// mechanically — marhaban — and nobody has to be trusted to transcribe it.
//
// That moves the thing to verify from the romanization to the vowelling, which
// is where it belongs: a wrong vowel is a mistake in the Arabic, and it is the
// Arabic a reviewer is looking at. So the Arabic must be vowelled completely,
// and `validate` refuses a letter left bare where a vowel belongs. Unvowelled
// Arabic is how adults read it; it is not how anyone learns it.
//
// The house style, which the prompts in lang-export.mjs repeat:
//
//   • Modern Standard Arabic, plain and neutral — no dialect.
//   • Every letter vowelled, case endings included, the way a textbook prints
//     it — the last word of a sentence too.
//   • The romanization is what is *said*, and a word before a pause (the end
//     of a turn, or punctuation) is said without its last short vowel or
//     tanwin: الْبَيْتِ. is printed with its kasra and read "al-bayt". That is a
//     rule, not a judgement, so the deriver applies it rather than trusting
//     anyone to write it. Tanwin on alif keeps its -an, as it is actually said:
//     شُكْرًا "shukran", جِدًّا "jiddan".
//   • The article is written الْ before a moon letter and ال with a shadda on
//     the following sun letter (الشَّمْس), as printed vowelled text does it.
//   • هٰذَا, هٰذِهِ, ذٰلِكَ, لٰكِنْ take the dagger alif, which is how the
//     long ā in them is marked.
//
// The romanization is a learner's one: digraphs (sh, kh, th, dh, gh), dots for
// the emphatics (ṣ ḍ ṭ ẓ ḥ), macrons for long vowels, ʿ for ʿayn and ʾ for
// hamza — dropped at the start of a word, where every romanization drops it.
// The article is "al-", assimilated before sun letters: ash-shams.
// =============================================================================

const FATHA = '\u064E', DAMMA = '\u064F', KASRA = '\u0650'
const FATHATAN = '\u064B', DAMMATAN = '\u064C', KASRATAN = '\u064D'
const SHADDA = '\u0651', SUKUN = '\u0652', DAGGER = '\u0670'

const VOWEL = { [FATHA]: 'a', [DAMMA]: 'u', [KASRA]: 'i' }
const TANWIN = { [FATHATAN]: 'an', [DAMMATAN]: 'un', [KASRATAN]: 'in' }
const MARKS = new Set([FATHA, DAMMA, KASRA, FATHATAN, DAMMATAN, KASRATAN, SHADDA, SUKUN, DAGGER])

const CONS = {
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'ḥ', 'خ': 'kh', 'د': 'd', 'ذ': 'dh',
  'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 'ṣ', 'ض': 'ḍ', 'ط': 'ṭ', 'ظ': 'ẓ',
  'ع': 'ʿ', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'w', 'ي': 'y',
  'ء': 'ʾ', 'أ': 'ʾ', 'إ': 'ʾ', 'ؤ': 'ʾ', 'ئ': 'ʾ',
}
const ALIF = 'ا', WASLA = 'ٱ', MADDA = 'آ', MAQSURA = 'ى', TA_MARBUTA = 'ة', LAM = 'ل'
const SUN = new Set('تثدذرزسشصضطظلن')
const LETTER = /[\u0621-\u063A\u0641-\u064A\u0671]/
const PUNCT = { '،': ',', '؟': '?', '؛': ';', '«': '“', '»': '”' }
/** Letters from Persian and Urdu that look Arabic and are not. */
const NOT_ARABIC = /[کگپچژیەۀہ]/
/** Words whose long ā is written with a dagger alif and nothing else. */
const DAGGER_WORDS = new Set(['هذا', 'هذه', 'هذان', 'هذين', 'ذلك', 'لكن', 'هؤلاء', 'أولئك'])

/** Words whose last vowel survives a pause. */
const KEEP_IN_PAUSE = new Set(['هو', 'هي', 'أنت'])

const HARAKAT =/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g
export const bare = s => s.replace(HARAKAT, '')

/** A word as letters, each with the marks written on it. */
function units(word) {
  const out = []
  for (const ch of word) {
    if (ch === 'ـ') continue // tatweel is decoration
    if (MARKS.has(ch) && out.length) out[out.length - 1].marks.add(ch)
    else out.push({ ch, marks: new Set() })
  }
  return out
}

const vowelOf = u => [...u.marks].map(m => VOWEL[m]).find(Boolean) ?? null
const tanwinOf = u => [...u.marks].map(m => TANWIN[m]).find(Boolean) ?? null
const has = (u, m) => !!u && u.marks.has(m)
/** No vowel of its own: nothing, or only a sukun. */
const unvowelled = u => !!u && !vowelOf(u) && !tanwinOf(u) && !has(u, DAGGER) && !has(u, SHADDA)

/**
 * One word to Latin. `last` says the word ends a turn or stands before
 * punctuation, where a bare final letter is a pause and not an omission.
 * Complaints about missing vowels go into `problems`.
 */
function word(w, last, problems) {
  if (bare(w) === 'الله') return 'Allāh'
  const u = units(w)
  let out = ''
  let i = 0

  // ── The article, with or without a one-letter prefix ─────────────────────
  // وَالْبَيْت wa-l-bayt · بِالشَّمْس bi-sh-shams · لِلْبَيْت li-l-bayt · الْبَيْت al-bayt.
  // The article's lam carries a sukun or nothing; a lam with a vowel (وَالِد)
  // is part of the word, not an article.
  const articleAt = j => (u[j]?.ch === ALIF || u[j]?.ch === WASLA)
    && (unvowelled(u[j]) || (j === 0 && vowelOf(u[j]) === 'a'))
    && u[j + 1]?.ch === LAM && unvowelled(u[j + 1]) && u[j + 2]
  /** A silent hamzat al-wasl at `j`, straight after a one-letter prefix. */
  const waslaAt = j => j === 1 && (u[1]?.ch === ALIF || u[1]?.ch === WASLA) && unvowelled(u[1])
    && 'وفبكل'.includes(u[0].ch) && !!vowelOf(u[0]) && has(u[2], SUKUN) && 2 < u.length - 1
  let article = -1
  let prefix = ''
  if (articleAt(0)) article = 1
  else if ('وفبك'.includes(u[0]?.ch) && vowelOf(u[0]) && articleAt(1)) {
    prefix = CONS[u[0].ch] + vowelOf(u[0])
    article = 2
  } else if (u[0]?.ch === LAM && vowelOf(u[0]) === 'i' && u[1]?.ch === LAM && unvowelled(u[1]) && u[2]) {
    prefix = 'li'
    article = 1
  }
  // The article on a word that begins with a hamzat al-wasl — الِامْتِحَانُ —
  // takes a kasra on its lam, and the word's own alif goes silent: al-imtiḥān.
  if (article < 0 && (u[0]?.ch === ALIF || u[0]?.ch === WASLA) && unvowelled(u[0])
    && u[1]?.ch === LAM && vowelOf(u[1]) === 'i' && (u[2]?.ch === ALIF || u[2]?.ch === WASLA) && unvowelled(u[2])) {
    out = 'al-i'
    i = 3
  }
  let skipDouble = -1
  if (article >= 0) {
    const next = u[article + 1]
    const sun = SUN.has(next.ch) && has(next, SHADDA) && !has(u[article], SUKUN)
    const l = sun ? CONS[next.ch] : 'l'
    out += prefix ? `${prefix}-${l}-` : `a${l}-`
    if (sun) skipDouble = article + 1
    i = article + 1
  }

  for (; i < u.length; i++) {
    const cur = u[i]
    const next = u[i + 1]
    const final = i === u.length - 1
    const ch = cur.ch

    if (ch === ALIF || ch === WASLA) {
      // At the start of a word: a hamzat al-wasl, said with its vowel.
      // A bare alif before a lam carrying a shadda is the article assimilated
      // into it — الَّذِي "alladhī", الَّتِي "allatī" — and says "a", not "i".
      if (i === 0) { out += vowelOf(cur) ?? (next?.ch === LAM && has(next, SHADDA) ? 'a' : 'i'); continue }
      // The same alif after a one-letter prefix is silent: وَاسْمِي wasmī. It is
      // told from a long ā (بَابٌ) by what follows — a consonant with a sukun
      // that is not the word's last letter, a cluster no long ā stands before.
      if (waslaAt(i)) continue
      // After tanwin fath (شُكْرًا), or at the end after a long ū (ذَهَبُوا): silent.
      if (tanwinOf(cur)) { out += tanwinOf(cur); continue }
      out += 'ā'
      continue
    }
    if (ch === MADDA) { out += i === 0 ? 'ā' : 'ʾā'; continue }
    if (ch === MAQSURA) { out += 'ā'; continue }
    // In pause, a word's last short vowel and any tanwin are not said — except
    // on هُوَ and هِيَ, which nobody says as "huw" and "hiy", and on أَنْتَ /
    // أَنْتِ, where the vowel is the only thing telling a learner which it is.
    const pause = final && last && !KEEP_IN_PAUSE.has(bare(w))
    if (ch === TA_MARBUTA) {
      const v = pause ? null : tanwinOf(cur) ?? vowelOf(cur)
      if (v) out += 't' + v
      else if (out.endsWith('ā')) out += 'h'
      else if (!out.endsWith('a')) out += 'a'
      continue
    }

    const t = CONS[ch]
    if (t === undefined) continue // anything else is not a letter we romanize
    // A hamza starting the word is not written in Latin: anā, not ʾanā.
    const c = i === 0 && t === 'ʾ' ? '' : t
    out += has(cur, SHADDA) && i !== skipDouble ? c + c : c

    if (has(cur, DAGGER)) { out += 'ā'; continue }
    // Tanwin fath keeps its -an in pause wherever it is written — on an alif
    // (شُكْرًا, handled below) or straight on a final hamza, which takes no
    // alif after a long ā: رَجَاءً "rajāʾan".
    if (pause && tanwinOf(cur) === 'an') { out += 'an'; continue }
    if (pause) continue
    const v = vowelOf(cur)
    const tw = tanwinOf(cur)
    if (tw) {
      out += tw
      // The alif that carries tanwin fath is silent. So is an alif maqsura
      // carrying it (مُسْتَشْفًى "mustashfan"), except that in pause it is
      // what is left: "mustashfā".
      if (next?.ch === ALIF && unvowelled(next)) i++
      if (next?.ch === MAQSURA && unvowelled(next)) {
        i++
        if (i === u.length - 1 && last && tw === 'an') out = out.slice(0, -2) + 'ā'
      }
      continue
    }
    if (v) {
      // Long vowels: a short vowel followed by its own letter, bare.
      if (v === 'a' && !waslaAt(i + 1) && (next?.ch === ALIF || next?.ch === MAQSURA) && unvowelled(next) && !tanwinOf(next)) {
        out += 'ā'; i++; continue
      }
      if (v === 'u' && next?.ch === 'و' && unvowelled(next)) {
        out += 'ū'; i++
        // The silent alif after a plural ū: ذَهَبُوا dhahabū.
        if (u[i + 1]?.ch === ALIF && i + 1 === u.length - 1) i++
        continue
      }
      if (v === 'i' && next?.ch === 'ي' && unvowelled(next)) { out += 'ī'; i++; continue }
      out += v
      continue
    }
    // No vowel. A sukun, or a word's last letter at a pause, is fine. So is a
    // hamza on its alif seat, where the seat already says which vowel it is.
    if (has(cur, SUKUN)) continue
    if (ch === 'إ') { out += 'i'; continue }
    // Tanwin written on the alif rather than before it (شكراً), and the
    // fatha before a long alif, which vowelled text often leaves implied.
    if (next?.ch === ALIF && tanwinOf(next)) continue
    if (next?.ch === ALIF && unvowelled(next) && !has(next, SUKUN)) { out += 'ā'; i++; continue }
    if (final && last) continue
    if (final) { problems.push(`${w}: the last letter, ${ch}, has no case ending or sukun`); continue }
    problems.push(`${w}: ${ch} has no vowel mark`)
  }
  return out
}

/** Capitalize the start of each sentence, past any leading ʿ or ʾ. */
function capitalize(s) {
  return s.replace(/(^|[.!?]\s+)([ʿʾ]?)(\p{L})/gu, (_, a, b, c) => a + b + c.toUpperCase())
}

/**
 * The romanization of a fully vowelled line, and what is wrong with it.
 * Turns (" | ") are romanized separately and joined the same way.
 */
export function analyse(text) {
  const problems = []
  const turns = text.normalize('NFC').split(/\s*\|\s*/).map(turn => {
    const tokens = turn.split(/(\s+|[،؟؛!.:«»"()])/).filter(t => t !== '')
    const out = tokens.map((tok, k) => {
      if (/^\s+$/.test(tok)) return ' '
      if (tok in PUNCT) return PUNCT[tok]
      if (!LETTER.test(tok)) return tok.replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660))
      // A pause: the end of the turn, or punctuation straight after.
      const rest = tokens.slice(k + 1).find(t => !/^\s+$/.test(t))
      const last = !rest || !LETTER.test(rest)
      return word(tok, last, problems)
    })
    return capitalize(out.join(''))
  })
  return { reading: turns.join(' | '), problems }
}

export const transliterate = text => analyse(text).reading

/**
 * What is wrong with a line of Arabic, as the pipeline sees it. Each complaint
 * names the word, so a reviewer or a drafter can find it.
 */
export function validate(text) {
  const out = []
  if (/[A-Za-z]/.test(text)) out.push('contains Latin letters')
  const foreign = text.match(NOT_ARABIC)
  if (foreign) out.push(`${foreign[0]} is a Persian or Urdu letter, not an Arabic one`)
  if (/[?,;]/.test(text)) out.push('use Arabic punctuation — ؟ ، ؛ — not ? , ;')
  for (const w of text.split(/[\s|،؟؛!.:«»"()]+/).filter(Boolean)) {
    if (DAGGER_WORDS.has(bare(w)) && !w.includes(DAGGER)) {
      out.push(`${w}: write the long ā with a dagger alif — ${bare(w)} is vowelled as هٰذَا, هٰذِهِ, ذٰلِكَ, لٰكِنْ`)
    }
  }
  out.push(...analyse(text).problems)
  return out
}
