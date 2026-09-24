// =============================================================================
// Reading your desktop icons out of explorer.exe.
//
// The desktop is a normal SysListView32, so the normal ListView messages work —
// but a ListView reports through caller-supplied buffers, and this ListView
// lives in another process. Every field therefore takes the long way round:
// allocate a page inside explorer, write our request into it, post the message,
// read the answer back out. That is the whole shape of this file.
//
// It is also entirely optional. Any step can fail (explorer restarting, icons
// switched off, a shell replacement, an integrity-level mismatch) and every one
// of them returns [] rather than throwing. A Mudgin with no icons to chew just
// wanders instead — see the `chewIcon` behaviour's score().
// =============================================================================

import {
  SendMessageW, OpenProcess, CloseHandle, VirtualAllocEx, VirtualFreeEx,
  ReadProcessMemory, WriteProcessMemory, GetWindowThreadProcessId, ClientToScreen,
  NULL_HWND, asHandle, type Hwnd,
  LVM_GETITEMCOUNT, LVM_GETITEMRECT, LVM_GETITEMTEXTW, LVIR_ICON, LVIR_BOUNDS, LVIF_TEXT,
  PROCESS_VM_OPERATION, PROCESS_VM_READ, PROCESS_VM_WRITE, PROCESS_QUERY_INFORMATION,
  MEM_COMMIT, MEM_RESERVE, MEM_RELEASE, PAGE_READWRITE,
} from './api'
import { folderView } from './shell'

/** One icon in physical screen pixels. DIP conversion happens in main/world.ts. */
export interface RawIcon {
  index: number
  name: string
  icon: { left: number; top: number; right: number; bottom: number }
  bounds: { left: number; top: number; right: number; bottom: number }
}

// x64 LVITEMW field offsets. Written out rather than computed because getting
// one wrong writes a stray pointer into explorer's address space, and a named
// constant is easier to check against the SDK header than an arithmetic chain.
const LVITEM_MASK = 0
const LVITEM_ISUBITEM = 8
const LVITEM_PSZTEXT = 24     // 8-byte aligned, so 4 bytes of padding precede it
const LVITEM_CCHTEXTMAX = 32
const LVITEM_SIZE = 88

// Layout inside the page we allocate in explorer. Two disjoint regions so the
// struct and the string it points at never overlap.
const OFF_STRUCT = 0
const OFF_TEXT = 256
const TEXT_CHARS = 260
const PAGE = 4096

/** A hard cap. Nobody has 400 icons, and an explorer that reports a nonsense
 *  count (it happens mid-restart) should cost one wasted loop, not a hang. */
const MAX_ICONS = 400

const rectOf = (b: Buffer, at = 0) => ({
  left: b.readInt32LE(at), top: b.readInt32LE(at + 4),
  right: b.readInt32LE(at + 8), bottom: b.readInt32LE(at + 12),
})

/**
 * Snapshot every desktop icon. Returns [] on any failure — see the file header.
 *
 * Costs one cross-process allocation and three messages per icon, so it is a
 * poll-every-few-seconds call, not a per-frame one. IconWatcher above it does
 * the polling and only pushes when something actually moved.
 */
export function readDesktopIcons(): RawIcon[] {
  const lv = folderView()
  if (lv === NULL_HWND) return []

  const pidOut = new Uint32Array(1)
  GetWindowThreadProcessId(lv, pidOut)
  const pid = pidOut[0]
  if (!pid) return []

  const proc = asHandle(OpenProcess(
    PROCESS_VM_OPERATION | PROCESS_VM_READ | PROCESS_VM_WRITE | PROCESS_QUERY_INFORMATION,
    false, pid))
  if (proc === NULL_HWND) return []

  let remote: Hwnd = NULL_HWND
  try {
    remote = asHandle(VirtualAllocEx(proc, 0n, PAGE, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE))
    if (remote === NULL_HWND) return []

    const count = Math.min(Number(SendMessageW(lv, LVM_GETITEMCOUNT, 0, 0n)), MAX_ICONS)
    if (count <= 0) return []

    // The list-view's client origin in screen space. Every rect below is client
    // relative; this is what lifts them onto the actual screen. Read once —
    // the desktop does not move between icons.
    const origin = { x: 0, y: 0 }
    ClientToScreen(lv, origin)

    const scratch = Buffer.alloc(LVITEM_SIZE)
    const textBuf = Buffer.alloc(TEXT_CHARS * 2)
    const out: RawIcon[] = []

    for (let i = 0; i < count; i++) {
      const icon = readRect(proc, lv, remote, i, LVIR_ICON, scratch)
      const bounds = readRect(proc, lv, remote, i, LVIR_BOUNDS, scratch)
      if (!icon || !bounds) continue

      // An icon scrolled out of view reports a degenerate or wildly offset
      // rect. Skipping them keeps him from hopping off to chew on nothing.
      if (icon.right <= icon.left || icon.bottom <= icon.top) continue

      out.push({
        index: i,
        name: readText(proc, lv, remote, i, scratch, textBuf),
        icon: shift(icon, origin),
        bounds: shift(bounds, origin),
      })
    }
    return out
  } catch {
    return []
  } finally {
    if (remote !== NULL_HWND) VirtualFreeEx(proc, remote, 0, MEM_RELEASE)
    CloseHandle(proc)
  }
}

const shift = (r: RawIcon['icon'], o: { x: number; y: number }) => ({
  left: r.left + o.x, top: r.top + o.y, right: r.right + o.x, bottom: r.bottom + o.y,
})

/**
 * LVM_GETITEMRECT is an in-out message: the RECT's `left` carries the LVIR_*
 * code in, and the whole rect comes back out. So the request has to be written
 * across before the message, not just read after it.
 */
function readRect(
  proc: Hwnd, lv: Hwnd, remote: Hwnd, index: number, code: number, scratch: Buffer,
): RawIcon['icon'] | null {
  scratch.writeInt32LE(code, 0)
  if (!WriteProcessMemory(proc, remote + BigInt(OFF_STRUCT), scratch, 16, null)) return null
  if (!SendMessageW(lv, LVM_GETITEMRECT, index, remote + BigInt(OFF_STRUCT))) return null
  if (!ReadProcessMemory(proc, remote + BigInt(OFF_STRUCT), scratch, 16, null)) return null
  return rectOf(scratch)
}

/**
 * The item's display name, for his commentary — he should be able to complain
 * about Recycle Bin by name. Failure here is cosmetic, so it degrades to ''
 * rather than dropping the icon.
 */
function readText(
  proc: Hwnd, lv: Hwnd, remote: Hwnd, index: number, scratch: Buffer, textBuf: Buffer,
): string {
  scratch.fill(0)
  scratch.writeUInt32LE(LVIF_TEXT, LVITEM_MASK)
  scratch.writeInt32LE(0, LVITEM_ISUBITEM)
  // pszText points at the other half of the page we already own.
  scratch.writeBigUInt64LE(remote + BigInt(OFF_TEXT), LVITEM_PSZTEXT)
  scratch.writeInt32LE(TEXT_CHARS, LVITEM_CCHTEXTMAX)

  if (!WriteProcessMemory(proc, remote + BigInt(OFF_STRUCT), scratch, LVITEM_SIZE, null)) return ''
  const len = Number(SendMessageW(lv, LVM_GETITEMTEXTW, index, remote + BigInt(OFF_STRUCT)))
  if (len <= 0) return ''
  if (!ReadProcessMemory(proc, remote + BigInt(OFF_TEXT), textBuf, Math.min(len, TEXT_CHARS - 1) * 2, null)) return ''
  return textBuf.toString('utf16le', 0, Math.min(len, TEXT_CHARS - 1) * 2)
}
