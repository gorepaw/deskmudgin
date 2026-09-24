// =============================================================================
// Names for numbers.
//
// This is a **lossy lens** over the continuous genome, computed on demand and
// never stored. It exists so that "another brown four-lumped one" is a thought
// a player can have, in a system where no two pets are actually alike.
//
// Two consequences are load-bearing and should survive any edit here:
//
//   • A name is not an identity. Two pets that both read "ember eye" have
//     different ember eyes, and a ledger line that says `ember` does not mean
//     you have seen every ember there is. That is the entire reason the ledger
//     can never show a total — there isn't one.
//   • Nothing here rates anything. No rarity, no score, no stars. A description
//     says what a creature has and stops; the player works out what is uncommon
//     by how seldom they see it.
//
// Vocabulary is deliberately in galanova's register — earthy, blunt, a bit
// grim. These are the Republic's least-regarded citizens, not show ponies.
// =============================================================================

import type { Genes, Hsl, SpeciesId } from './genome'

/** One named feature. `key` is stable and goes in the ledger; `label` is shown. */
export interface Trait {
  /** e.g. `eye:burning-gold`. Stable across builds — changing one forgets it. */
  key: string
  /** e.g. "burning gold eye". */
  label: string
  category: 'species' | 'eye' | 'body' | 'foot' | 'lumps' | 'teeth' | 'flower'
}

/**
 * Hue families. Boundaries are arbitrary and that is fine — they are a reading
 * of a continuous wheel, not a partition of a finite set. A hue one degree
 * either side of a boundary gets a different name and looks almost identical,
 * which is a feature: it keeps names from feeling like item codes.
 */
const FAMILIES: readonly [number, string][] = [
  [12, 'crimson'],
  [30, 'rust'],
  [48, 'amber'],
  [68, 'gold'],
  [95, 'bile'],
  [145, 'moss'],
  [178, 'verdigris'],
  [205, 'teal'],
  [240, 'azure'],
  [268, 'indigo'],
  [295, 'violet'],
  [325, 'orchid'],
  [345, 'rose'],
  [360, 'crimson'],
]

/**
 * Warm hues at low lightness are browns, and no amount of correctness makes
 * "deep rust" the right word for one. The species is described as
 * purple-brown-**grey**; the vocabulary has to be able to say brown.
 */
function brownName(l: number, s: number): string {
  if (l < 0.26) return 'bark'
  return s < 0.3 ? 'umber' : 'brown'
}

const family = (h: number): string => {
  const hue = ((h % 360) + 360) % 360
  for (const [ceil, name] of FAMILIES) if (hue < ceil) return name
  return 'crimson'
}

/**
 * Colours with almost no saturation have no hue worth naming — calling a grey
 * "violet" because it is 0.03 saturated is technically true and useless.
 */
const ACHROMATIC = 0.1

function greyName(l: number): string {
  if (l < 0.3) return 'soot'
  if (l < 0.55) return 'ash'
  return 'bone'
}

/**
 * `glowing` picks the vocabulary for things that emit light — an eye that is
 * both saturated and bright is "burning", a hide that is merely bright is
 * "vivid". Same numbers, different word, because they read differently.
 */
export function colourName(c: Hsl, glowing = false): string {
  if (c.s < ACHROMATIC) return greyName(c.l)
  const hue = ((c.h % 360) + 360) % 360
  // Checked before the family lookup: a dark orange is a brown first and a
  // "rust" second, and only one of those words describes a Mudgin.
  if (hue >= 10 && hue < 55 && c.l < 0.42) return brownName(c.l, c.s)
  const base = family(c.h)
  if (c.s > 0.68 && c.l > 0.5) return `${glowing ? 'burning' : 'vivid'} ${base}`
  if (c.l < 0.28) return `deep ${base}`
  if (c.l > 0.68) return `pale ${base}`
  if (c.s < 0.22) return `dull ${base}`
  return base
}

/** Stable, lowercase, punctuation-free — safe as a ledger key forever. */
const slug = (s: string): string => s.replace(/\s+/g, '-')

/**
 * Keys carry the species, because the same colour on two animals is not the
 * same trait and does not read as the same words.
 *
 * Without it a Mudgin's `indigo hide` and a Sephin's `indigo back` both file
 * under `body:indigo`, so the ledger shows whichever was recorded last and
 * silently claims you have seen a hide you have never seen. The colliding pair
 * is not exotic — every colour category is shared by both species.
 */
const keyOf = (species: SpeciesId, category: Trait['category'], name: string): string =>
  `${category}:${species}:${slug(name)}`

const COUNT_WORDS = ['no', 'single', 'twin', 'three', 'four', 'five', 'six', 'seven']
const countWord = (n: number): string => COUNT_WORDS[n] ?? String(n)

export function describe(genes: Genes): Trait[] {
  const out: Trait[] = []
  const sp = genes.species

  const add = (category: Trait['category'], key: string, label: string) =>
    out.push({ category, key: keyOf(sp, category, key), label })

  if (genes.species === 'mudgin') {
    // The species trait is the one thing that is not per-species — its name is
    // the species — so it keeps the plain key.
    out.push({ category: 'species', key: 'species:mudgin', label: 'Mudgin' })
    add('eye', colourName(genes.eye, true), `${colourName(genes.eye, true)} eye`)
    add('body', colourName(genes.body), `${colourName(genes.body)} hide`)
    add('lumps', `${genes.lumps.length}`, `${countWord(genes.lumps.length)}-lumped`)
    // One snaggletooth is the canonical Mudgin, so it gets the canonical word
    // rather than being counted like a defect.
    add('teeth', `${genes.teeth.length}`,
      genes.teeth.length === 1 ? 'snaggletoothed' : `${countWord(genes.teeth.length)}-toothed`)
    return out
  }

  out.push({ category: 'species', key: 'species:sephin', label: 'Sephin' })
  add('eye', colourName(genes.eye, true), `${colourName(genes.eye, true)} eyes`)
  add('body', colourName(genes.body), `${colourName(genes.body)} back`)
  add('foot', colourName(genes.foot), `${colourName(genes.foot)} feet`)
  return out
}

/**
 * The flower is a separate call because it only exists once a Mudgin is fully
 * grown — describing an unbloomed one by a flower nobody can see would leak
 * the future, and half the point of maturity is not knowing what you have yet.
 */
export function describeFlower(genes: Genes): Trait | null {
  if (genes.species !== 'mudgin') return null
  const name = colourName(genes.flower)
  return { category: 'flower', key: keyOf('mudgin', 'flower', name), label: `${name} bloom` }
}

/** One line for the popup: "burning gold eye · ash hide · four-lumped". */
export const summarise = (traits: Trait[]): string =>
  traits.filter(t => t.category !== 'species').map(t => t.label).join(' · ')
