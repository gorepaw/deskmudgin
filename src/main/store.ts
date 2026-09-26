// =============================================================================
// Persistence. Two JSON files in userData — settings and the creature.
//
// Writes are atomic (temp file, then rename) because the save fires on quit,
// and a machine powered off mid-write should cost you the last few seconds of
// hunger decay, not the Mudgin.
// =============================================================================

import { app } from 'electron'
import { readFileSync, writeFileSync, renameSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  DEFAULT_SAVE, DEFAULT_SETTINGS, legacyGenes, tongues,
  type ColonySave, type PetSave, type Settings,
} from '../shared/types'
import { EMPTY_LEDGER, type LedgerEntry, type LedgerSave } from '../shared/ledger'

const dir = () => app.getPath('userData')

function readJson<T>(file: string, fallback: T): T {
  try {
    const raw = readFileSync(join(dir(), file), 'utf8')
    // Strip a UTF-8 BOM. These files are meant to be hand-editable, and every
    // Windows tool that would edit them — Notepad, PowerShell's Out-File,
    // VS Code's "UTF-8 with BOM" — writes one. JSON.parse treats it as a
    // syntax error, so without this the file is silently ignored and the app
    // quietly runs on defaults, which is the worst possible failure for a
    // settings file.
    const text = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw
    // Shallow-merged over the defaults so a save written by an older build
    // gains new fields instead of arriving with them undefined.
    return { ...fallback, ...(JSON.parse(text) as object) } as T
  } catch (err) {
    // Worth a line in the log: a corrupt save silently reverting to a newborn
    // Mudgin is exactly the kind of thing that should not be invisible.
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`[store] ${file} unreadable, using defaults:`, err)
    }
    return fallback
  }
}

function writeJson(file: string, value: unknown): void {
  try {
    mkdirSync(dir(), { recursive: true })
    const tmp = join(dir(), `${file}.tmp`)
    writeFileSync(tmp, JSON.stringify(value, null, 2), 'utf8')
    renameSync(tmp, join(dir(), file))
  } catch (err) {
    console.error(`[store] failed to write ${file}:`, err)
  }
}

/** Through `tongues`, so a save from before L1 and L2 comes back in terms of them. */
export const loadSettings = (): Settings => tongues(readJson('settings.json', DEFAULT_SETTINGS))
export const saveSettings = (s: Settings): void => writeJson('settings.json', s)

/** Fill in anything a hand-edited or older save is missing. */
function repair(save: Partial<PetSave>, index: number): PetSave {
  const now = Date.now()
  const id = save.id ?? `mudgin-${index}-${now}`
  const bornAt = save.bornAt ?? now
  return {
    ...DEFAULT_SAVE,
    ...save,
    // Nested objects survive a shallow merge only if they exist at all.
    needs: { ...DEFAULT_SAVE.needs, ...save.needs },
    stats: { ...DEFAULT_SAVE.stats, ...save.stats },
    id,
    bornAt,
    // A save from before genomes existed. Roll one from his own id so he gets
    // one appearance and keeps it, rather than a new body every launch.
    genes: save.genes ?? legacyGenes(id),
    species: save.species ?? save.genes?.species ?? 'mudgin',
    adoptedAt: save.adoptedAt ?? bornAt,
    lastSeenAt: save.lastSeenAt ?? now,
  }
}

/**
 * Everyone the player owns — including the ones currently resting, who are
 * saved but not simulated.
 *
 * Reads three formats. v3 is the current `{ version: 3, mudgins: [...] }` with
 * species and genomes; v2 was the same shape without them; v1 was a bare
 * PetSave, from when there was exactly one creature. Both migrations run in
 * `repair`, and they are worth keeping indefinitely — they cost a few lines,
 * and the alternative is somebody's week-old Mudgin quietly becoming a newborn
 * stranger.
 */
export function loadColony(): PetSave[] {
  const raw = readJson<Partial<ColonySave> & Partial<PetSave>>('pet.json', {})
  const list = Array.isArray(raw.mudgins) ? raw.mudgins : raw.name ? [raw as PetSave] : []
  if (!list.length) return []
  // No cap on the roster — collecting is the point. MAX_MUDGINS bounds how many
  // are OUT at once, which is enforced where they are partitioned to windows.
  return list.map(repair)
}

export const saveColony = (mudgins: PetSave[]): void =>
  writeJson('pet.json', { version: 3, mudgins } satisfies ColonySave)

/**
 * The ledger, in its own file rather than inside the colony save.
 *
 * It outlives the colony by design — releasing a pet must not unlearn what it
 * taught you — so tying its lifetime to `pet.json` would be exactly wrong. A
 * separate file also means a corrupt colony cannot take the notebook with it.
 */
export function loadLedger(): LedgerEntry[] {
  const raw = readJson<LedgerSave>('ledger.json', EMPTY_LEDGER)
  return Array.isArray(raw.seen) ? raw.seen.filter(e => e && typeof e.key === 'string') : []
}

export const saveLedger = (seen: LedgerEntry[]): void =>
  writeJson('ledger.json', { version: 1, seen } satisfies LedgerSave)
