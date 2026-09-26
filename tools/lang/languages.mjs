// =============================================================================
// The languages a course can be translated into, as the tools see them.
//
// A course is written in one language (Chinese, for HSK) and English, and every
// other language lives beside it as a translation file — `hsk1.es.tsv`,
// `hsk1.ar.tsv` — with its own verification. This is the one list the tools
// consult about those languages: how the blind check runs, whether there is a
// reading to derive, what the drafting and reviewing style is. Adding a
// language to the tools is an entry here (and an adapter, if it has a script
// that needs a reading); the export, ingest, fill, sync and build steps do not
// change. Its runtime twin is src/shared/lang/index.ts.
// =============================================================================

import * as ar from './ar.mjs'

/**
 * `blind` is which way the blind translator works, and so what its answer is
 * compared against:
 *
 * - `from-source` — it translates the course's Chinese into this language, and
 *   is compared with the translation. Right for a language whose word overlap
 *   is measurable and whose translator can be handed Chinese: Spanish.
 * - `to-english` — it translates this language back into English, and is
 *   compared with the line's verified English. Right for a language whose
 *   own-language comparison would be unreliable — Arabic's vowel marks and
 *   attached prefixes defeat word matching — and the classic back-translation
 *   the Chinese itself went through.
 *
 * `reading`, where present, derives the pronunciation line from the text; the
 * translation file then carries it in a `gloss_reading` column, and the build
 * refuses any row where the two have drifted. `validate` names what is wrong
 * with a text before anyone is asked to check its meaning.
 */
export const TRANSLATIONS = {
  es: {
    name: 'Spanish',
    blind: 'from-source',
    style: 'The Spanish should be neutral Latin American Spanish: `tú` for "you", `ustedes` for the plural, no `vosotros`, no regionalisms, with correct accents and ¿¡ punctuation.',
    words: 'verbs as infinitives, "(partícula …)" for particles',
    names: 'say what the name means, the way a nickname is glossed ("Frijolito"), rather than transliterating it',
  },
  ar: {
    name: 'Arabic',
    blind: 'to-english',
    reading: ar.transliterate,
    validate: ar.validate,
    style: `The Arabic must be **Modern Standard Arabic**, plain and neutral — no dialect — and **fully vowelled**: every letter carries its fatha, damma, kasra, sukun, shadda or tanwin, case endings included, the way a careful speaker reads aloud. The last word before . ! ؟ is in pause (sukun, no case ending), except that tanwin on alif keeps its -an (شُكْرًا). The article is الْ before a moon letter and ال + shadda before a sun letter (الشَّمْس). هٰذَا هٰذِهِ ذٰلِكَ لٰكِنْ take the dagger alif. Arabic punctuation: ، ؟ ؛. The Latin \`reading\` beside it is derived mechanically from the vowel marks — if it is wrong, the vowelling is wrong.`,
    words: 'the dictionary sense a learner needs: verbs in the past-tense citation form (كَتَبَ) or the masdar where the Chinese is a noun-like verb, "(أَدَاةٌ …)" for particles',
    names: 'be a real, affectionate Arabic nickname that says what the name means — a diminutive (فُعَيْل), a pet form, a word used as a pet name — never a transliteration of the Chinese',
  },
}

export const translationLangs = Object.keys(TRANSLATIONS)

/** `hsk1.ar.tsv` → `ar`, or null for a course file. */
export function translationOf(path) {
  const m = path.match(/\.([a-z]{2})\.tsv$/)
  return m && TRANSLATIONS[m[1]] ? m[1] : null
}

export const translationPath = (coursePath, lang) => coursePath.replace(/\.tsv$/, `.${lang}.tsv`)
