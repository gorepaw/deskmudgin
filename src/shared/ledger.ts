// =============================================================================
// What you have seen.
//
// The ledger is a **set with no denominator**. It records trait names the
// player has encountered and the day each one first showed up, and it never
// reports a total, a percentage, a count of what is missing, or anything that
// could be read as a target. There is nothing to complete: the genome is
// continuous, so the set of names is not a checklist that happens to be long —
// it is not a checklist at all.
//
// It is deliberately generous in one direction: releasing a pet does not
// unlearn it. Sending duplicates away is meant to be safe, and it stops being
// safe the moment the ledger can go backwards.
//
// Trait *keys* are the identity here, and describe.ts promises they are stable
// across builds. Changing one silently forgets everything filed under it.
// =============================================================================

import type { Trait } from './describe'

export interface LedgerEntry {
  /** From describe.ts — `eye:burning-gold`. Stable forever. */
  key: string
  /** The label as it read when last seen. Stored rather than re-derived: a key
   *  alone does not carry the wording, and pinning it here means a change to
   *  the phrasing cannot orphan an entry. */
  label: string
  category: LedgerCategory
  /** Epoch ms of the first sighting. */
  first: number
  /** For a line they said: its pinyin, shown on hover. Absent for traits. */
  reading?: string
  /** For a line they said: its English, shown on hover. Absent for traits. */
  gloss?: string
}

/**
 * The trait categories, plus `said`: course lines the creatures have spoken
 * where you could see them.
 *
 * Words belong here for the same reason traits do. It is a set with no
 * denominator — there is no "you have heard 41% of HSK 1", because the point is
 * a record of what you were actually exposed to, not a checklist to finish.
 */
export type LedgerCategory = Trait['category'] | 'said'

/** A course line, as the renderer reports it when a bubble first shows it. */
export interface HeardLine {
  /** The course entry id — `p052`. Stable across builds, so it is the key. */
  id: string
  script: string
  reading: string
  english: string
}

/** Ledger key for a spoken line. Namespaced so no trait key can collide. */
export const heardKey = (id: string): string => `said:${id}`

export interface LedgerSave {
  version: 1
  seen: LedgerEntry[]
}

export const EMPTY_LEDGER: LedgerSave = { version: 1, seen: [] }

/** Reading order for the panel. Species first, then the headline features. */
export const CATEGORY_ORDER: readonly LedgerCategory[] =
  ['species', 'eye', 'body', 'foot', 'flower', 'lumps', 'teeth', 'said']

export const CATEGORY_LABEL: Record<LedgerCategory, string> = {
  species: 'kinds',
  eye: 'eyes',
  body: 'hides',
  foot: 'feet',
  lumps: 'lumps',
  teeth: 'teeth',
  flower: 'blooms',
  said: 'what they said to you',
}

/**
 * Fold new traits into the set.
 *
 * Returns the updated list, or **null** when nothing was new — which is the
 * common case by a wide margin (every autosave, every load) and is what keeps
 * this from rewriting a file on every tick.
 */
export function record(
  seen: readonly LedgerEntry[], traits: readonly Trait[], at: number,
): LedgerEntry[] | null {
  const known = new Map(seen.map(e => [e.key, e]))
  let changed = false
  for (const t of traits) {
    const e = known.get(t.key)
    if (!e) {
      known.set(t.key, { key: t.key, label: t.label, category: t.category, first: at })
      changed = true
    } else if (e.label !== t.label) {
      // The wording moved under an existing key. Follow it — the key is the
      // identity, the label is only how it reads today.
      known.set(t.key, { ...e, label: t.label })
      changed = true
    }
  }
  return changed ? [...known.values()] : null
}

/**
 * Fold spoken lines into the set. Same contract as `record`: null when nothing
 * was new, which after the first few minutes is nearly every call.
 */
export function recordHeard(
  seen: readonly LedgerEntry[], lines: readonly HeardLine[], at: number,
): LedgerEntry[] | null {
  const known = new Map(seen.map(e => [e.key, e]))
  let changed = false
  for (const l of lines) {
    const key = heardKey(l.id)
    const e = known.get(key)
    // A line re-verified with new wording keeps its first-heard date and takes
    // the new text — the id is the identity, as with traits.
    if (e && e.label === l.script && e.reading === l.reading && e.gloss === l.english) continue
    known.set(key, {
      key, category: 'said', label: l.script, reading: l.reading, gloss: l.english,
      first: e?.first ?? at,
    })
    changed = true
  }
  return changed ? [...known.values()] : null
}
