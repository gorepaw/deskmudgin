// =============================================================================
// The bridge. Nothing but a typed pass-through of the channels declared in
// shared/ipc.ts — it deliberately holds no logic, so there is exactly one place
// (main) where a request can be refused and exactly one place (renderer) where
// a reply is interpreted.
//
// Channels are whitelisted by construction: `invoke` forwards whatever it is
// given, but the renderer is typed against InvokeChannel and main only registers
// handlers for those, so an unknown channel is a build error on one side and a
// rejected promise on the other.
// =============================================================================

import { contextBridge, ipcRenderer } from 'electron'
import type { MudginBridge, PushChannel, Push } from '../shared/ipc'

const bridge: MudginBridge = {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args) as never,

  on<K extends PushChannel>(channel: K, fn: (payload: Push[K]) => void) {
    const wrapped = (_e: unknown, payload: Push[K]) => fn(payload)
    ipcRenderer.on(channel, wrapped as never)
    return () => { ipcRenderer.off(channel, wrapped as never) }
  },

  isDev: process.argv.includes('--dev') || !!process.env.DESKMUDGIN_DEV_SERVER,
  isDebug: !!process.env.DESKMUDGIN_DEBUG,
  isContact: process.env.DESKMUDGIN_CONTACT ?? '',
  isFast: !!process.env.DESKMUDGIN_FAST,
}

contextBridge.exposeInMainWorld('mudgin', bridge)
