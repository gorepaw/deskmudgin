// =============================================================================
// This window's copy of the self-update state (main/updater.ts owns it).
//
// Kept here rather than fetched by the menu when it opens, because it changes
// while the menu is open — a download's progress, then "Restart to update" —
// and a panel has no subscription of its own to hear that.
// =============================================================================

import type { UpdateState } from '../../shared/ipc'

let state: UpdateState = { status: 'disabled', current: '' }

export const updateState = (): UpdateState => state

/** Returns the previous state, so the caller can act on a transition. */
export function setUpdateState(next: UpdateState): UpdateState {
  const was = state
  state = next
  return was
}
