// =============================================================================
// The raw Win32 surface, and the only file in the app that knows koffi exists.
// Everything above this imports named functions and never a DLL.
//
// One convention runs through the whole file: HWNDs, HANDLEs and remote
// addresses are declared as `int64_t`, not `void *`. They are opaque tokens we
// only ever hand straight back to Windows, and typing them as integers means no
// pointer marshalling, `0n` for NULL, and ordinary `===` comparisons. Only
// buffers we own locally are declared as real pointers, because those koffi
// genuinely has to translate.
//
// x64 only. On a 32-bit host the handle width would be wrong; Electron has
// shipped x64-by-default on Windows for years and the installer pins it.
// =============================================================================

import koffi from 'koffi'

export const NULL_HWND = 0n
export type Hwnd = bigint

/** koffi hands back Number or BigInt depending on magnitude; normalise once. */
export const asHandle = (v: unknown): Hwnd =>
  typeof v === 'bigint' ? v : BigInt((v as number) ?? 0)

// ── Structs ──────────────────────────────────────────────────────────────────
export const RECT = koffi.struct('RECT', {
  left: 'int32_t', top: 'int32_t', right: 'int32_t', bottom: 'int32_t',
})
export const POINT = koffi.struct('POINT', { x: 'int32_t', y: 'int32_t' })

export interface Win32Rect { left: number; top: number; right: number; bottom: number }

// ── user32 ───────────────────────────────────────────────────────────────────
const user32 = koffi.load('user32.dll')

export const FindWindowW = user32.func(
  'int64_t __stdcall FindWindowW(const char16_t *cls, const char16_t *win)')
export const FindWindowExW = user32.func(
  'int64_t __stdcall FindWindowExW(int64_t parent, int64_t after, const char16_t *cls, const char16_t *win)')
export const SendMessageW = user32.func(
  'int64_t __stdcall SendMessageW(int64_t hwnd, uint32_t msg, uint64_t wparam, int64_t lparam)')
export const SendMessageTimeoutW = user32.func(
  'int64_t __stdcall SendMessageTimeoutW(int64_t hwnd, uint32_t msg, uint64_t wparam, int64_t lparam, uint32_t flags, uint32_t timeout, _Out_ uint64_t *result)')
export const SetParent = user32.func(
  'int64_t __stdcall SetParent(int64_t child, int64_t parent)')
export const GetParent = user32.func('int64_t __stdcall GetParent(int64_t hwnd)')
export const IsWindow = user32.func('bool __stdcall IsWindow(int64_t hwnd)')
export const GetWindowRect = user32.func(
  'bool __stdcall GetWindowRect(int64_t hwnd, _Out_ RECT *r)')
export const SetWindowPos = user32.func(
  'bool __stdcall SetWindowPos(int64_t hwnd, int64_t after, int x, int y, int cx, int cy, uint32_t flags)')
export const GetWindowLongPtrW = user32.func(
  'int64_t __stdcall GetWindowLongPtrW(int64_t hwnd, int index)')
export const SetWindowLongPtrW = user32.func(
  'int64_t __stdcall SetWindowLongPtrW(int64_t hwnd, int index, int64_t value)')
export const GetWindowThreadProcessId = user32.func(
  'uint32_t __stdcall GetWindowThreadProcessId(int64_t hwnd, _Out_ uint32_t *pid)')
export const ShowWindow = user32.func('bool __stdcall ShowWindow(int64_t hwnd, int cmd)')
export const ClientToScreen = user32.func(
  'bool __stdcall ClientToScreen(int64_t hwnd, _Inout_ POINT *p)')
/**
 * Current state of a virtual key. The high bit is "down right now".
 *
 * Used for one thing: noticing a left-click in the desktop layer, where the
 * window is behind explorer's icon view and never receives an input event.
 * This *observes* the button — it is a poll, not a hook, so it intercepts
 * nothing and the desktop still gets the same click it always would.
 */
export const GetAsyncKeyState = user32.func(
  'int16_t __stdcall GetAsyncKeyState(int vKey)')
export const VK_LBUTTON = 0x01
/** Right button. Opens a pet's card from the desktop layer — the only way to
 *  reach a panel from a plane that cannot receive a click. */
export const VK_RBUTTON = 0x02

// ── kernel32 ─────────────────────────────────────────────────────────────────
const kernel32 = koffi.load('kernel32.dll')

export const OpenProcess = kernel32.func(
  'int64_t __stdcall OpenProcess(uint32_t access, bool inherit, uint32_t pid)')
export const CloseHandle = kernel32.func('bool __stdcall CloseHandle(int64_t h)')
export const VirtualAllocEx = kernel32.func(
  'int64_t __stdcall VirtualAllocEx(int64_t proc, int64_t addr, size_t size, uint32_t type, uint32_t protect)')
export const VirtualFreeEx = kernel32.func(
  'bool __stdcall VirtualFreeEx(int64_t proc, int64_t addr, size_t size, uint32_t type)')
export const ReadProcessMemory = kernel32.func(
  'bool __stdcall ReadProcessMemory(int64_t proc, int64_t addr, _Out_ void *buf, size_t size, _Out_ size_t *read)')
export const WriteProcessMemory = kernel32.func(
  'bool __stdcall WriteProcessMemory(int64_t proc, int64_t addr, const void *buf, size_t size, _Out_ size_t *written)')

// ── Constants ────────────────────────────────────────────────────────────────
/** The undocumented Progman message that makes the shell spawn a WorkerW. */
export const WM_SPAWN_WORKER = 0x052c
export const SMTO_NORMAL = 0x0000

export const GWL_EXSTYLE = -20
export const WS_EX_TOOLWINDOW = 0x00000080
export const WS_EX_NOACTIVATE = 0x08000000
export const WS_EX_TRANSPARENT = 0x00000020
export const WS_EX_TOPMOST = 0x00000008
export const WS_EX_LAYERED = 0x00080000

export const SWP_NOSIZE = 0x0001
export const SWP_NOMOVE = 0x0002
export const SWP_NOZORDER = 0x0004
export const SWP_NOACTIVATE = 0x0010
export const SWP_SHOWWINDOW = 0x0040
export const SWP_FRAMECHANGED = 0x0020
export const HWND_BOTTOM = 1n

export const PROCESS_VM_OPERATION = 0x0008
export const PROCESS_VM_READ = 0x0010
export const PROCESS_VM_WRITE = 0x0020
export const PROCESS_QUERY_INFORMATION = 0x0400

export const MEM_COMMIT = 0x1000
export const MEM_RESERVE = 0x2000
export const MEM_RELEASE = 0x8000
export const PAGE_READWRITE = 0x04

/** ListView messages, for reading the desktop's icon grid out of explorer. */
export const LVM_GETITEMCOUNT = 0x1004
export const LVM_GETITEMPOSITION = 0x1010
export const LVM_GETITEMRECT = 0x100e
export const LVM_GETITEMTEXTW = 0x1073
export const LVM_GETORIGIN = 0x1029
export const LVIR_ICON = 1
export const LVIR_BOUNDS = 0
export const LVIF_TEXT = 0x0001

export const emptyRect = (): Win32Rect => ({ left: 0, top: 0, right: 0, bottom: 0 })

/** GetWindowRect wrapped so callers deal in a plain object, never an out-param. */
export function windowRect(hwnd: Hwnd): Win32Rect | null {
  if (hwnd === NULL_HWND) return null
  const r = emptyRect()
  return GetWindowRect(hwnd, r) ? r : null
}
