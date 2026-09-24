// =============================================================================
// Finding the four shell windows the desktop layer is built out of, and nothing
// else. The hierarchy Windows actually builds is not the one it documents, and
// it differs between builds, so every lookup here is written as "try the shape
// we expect, then walk the siblings", never as a fixed path.
//
// The desktop, top to bottom:
//
//   Progman ─┬─ SHELLDLL_DefView ── SysListView32 "FolderView"   ← your icons
//            │
//   WorkerW ─┘  (sometimes DefView lives under a WorkerW instead)
//   WorkerW      ← the empty one. Wallpaper paints here. We live here too.
//
// The second WorkerW — the one with no DefView child — is the layer between the
// wallpaper and the icons. Parenting into it is what puts the Mudgin behind
// your icons instead of on top of them. Wallpaper Engine and Lively do the
// same thing; this is the well-trodden path, not a trick.
// =============================================================================

import {
  FindWindowW, FindWindowExW, SendMessageTimeoutW, IsWindow, windowRect,
  NULL_HWND, WM_SPAWN_WORKER, SMTO_NORMAL, asHandle, type Hwnd,
} from './api'

const nul = null as unknown as string   // koffi passes a JS null through as NULL

/** The desktop root. Always exists while explorer is alive. */
export const progman = (): Hwnd => asHandle(FindWindowW('Progman', nul))

/**
 * Ask the shell to split the desktop into wallpaper and icon layers.
 *
 * Before this message there is usually only one WorkerW (or none). Progman
 * handles 0x052C by creating the pair. It is idempotent — sending it when the
 * split already happened is a no-op — so we send it on every attach rather than
 * tracking whether we have.
 *
 * The wParam/lParam pair differs across builds. 0,0 is what Win10/11 want;
 * 0x0D,0x01 is the older form. Sending both costs a millisecond and covers
 * machines where only one takes.
 */
export function spawnWorkerW(): void {
  const p = progman()
  if (p === NULL_HWND) return
  const out = new BigUint64Array(1)
  SendMessageTimeoutW(p, WM_SPAWN_WORKER, 0, 0, SMTO_NORMAL, 1000, out)
  SendMessageTimeoutW(p, WM_SPAWN_WORKER, 0x0d, 0x01, SMTO_NORMAL, 1000, out)
}

const childDefView = (h: Hwnd): Hwnd =>
  asHandle(FindWindowExW(h, NULL_HWND, 'SHELLDLL_DefView', nul))

/** Every top-level WorkerW, in Z-order. */
function* workerWs(): Generator<Hwnd> {
  let w: Hwnd = NULL_HWND
  for (;;) {
    w = asHandle(FindWindowExW(NULL_HWND, w, 'WorkerW', nul))
    if (w === NULL_HWND) return
    yield w
  }
}

/**
 * The window that owns the desktop icons, wherever the shell put it this boot.
 * Progman first because that is where it lives most of the time; the WorkerW
 * walk is for the machines where it does not.
 */
export function defView(): Hwnd {
  const p = progman()
  const direct = p !== NULL_HWND ? childDefView(p) : NULL_HWND
  if (direct !== NULL_HWND) return direct
  for (const w of workerWs()) {
    const dv = childDefView(w)
    if (dv !== NULL_HWND) return dv
  }
  return NULL_HWND
}

/** The desktop icon list itself. */
export function folderView(): Hwnd {
  const dv = defView()
  if (dv === NULL_HWND) return NULL_HWND
  return asHandle(FindWindowExW(dv, NULL_HWND, 'SysListView32', 'FolderView'))
}

/**
 * Is this window big enough to be the wallpaper?
 *
 * The class name alone is not a test. A live Windows 11 desktop has around
 * seventeen top-level WorkerWs, and all but at most one of them are 136×39
 * shell helpers that have nothing to do with the wallpaper. Parenting into one
 * of those puts the Mudgin in a 136×39 box in the corner of the screen, which
 * is exactly what the sibling-order heuristic does on its own.
 *
 * So: it has to cover most of what Progman covers. Progman always spans the
 * whole virtual desktop, which makes it the reference.
 */
function isDesktopSized(w: Hwnd, ref: { right: number; left: number; bottom: number; top: number }): boolean {
  const r = windowRect(w)
  if (!r) return false
  const refW = ref.right - ref.left
  const refH = ref.bottom - ref.top
  if (refW <= 0 || refH <= 0) return false
  return (r.right - r.left) >= refW * 0.8 && (r.bottom - r.top) >= refH * 0.8
}

/**
 * The wallpaper-level WorkerW, or NULL_HWND when this machine does not have
 * one.
 *
 * NULL is the common case on Windows 11, not a failure. There, DefView stays a
 * child of Progman, 0x052C creates nothing, and Progman paints the wallpaper
 * itself — so the layer we want is "a child of Progman, below DefView in
 * Z-order" rather than a window of its own. The underlay strategy handles both
 * shapes; this function's job is only to answer honestly which one we are on.
 */
export function wallpaperWorkerW(): Hwnd {
  spawnWorkerW()

  const p = progman()
  if (p === NULL_HWND) return NULL_HWND
  const ref = windowRect(p)
  if (!ref) return NULL_HWND

  // Shape A — the shell moved DefView into a WorkerW. The wallpaper layer is
  // the next WorkerW below that host.
  for (const w of workerWs()) {
    if (childDefView(w) === NULL_HWND) continue
    const after = asHandle(FindWindowExW(NULL_HWND, w, 'WorkerW', nul))
    if (after !== NULL_HWND && isDesktopSized(after, ref)) return after
  }

  // Shape B — DefView is still under Progman, but a desktop-sized WorkerW
  // exists anyway (some builds, and most machines running a live-wallpaper app).
  if (childDefView(p) !== NULL_HWND) {
    for (const w of workerWs()) {
      if (childDefView(w) === NULL_HWND && isDesktopSized(w, ref)) return w
    }
  }

  return NULL_HWND
}

export const alive = (h: Hwnd): boolean => h !== NULL_HWND && IsWindow(h)
