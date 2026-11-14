// =============================================================================
// Self-update.
//
// electron-updater against a plain HTTPS feed: the public R2 bucket behind
// updates.enriacindustries.com, under deskmudgin/win/ (package.json
// `build.publish.url`, which electron-builder bakes into the installed app as
// resources/app-update.yml). `npm run publish:update` puts a build there; see
// tools/publish-update.mjs.
//
// Nothing is silent. A check runs shortly after launch and every few hours,
// and finding something only *offers* it: the Matron says so once, and her
// menu and the tray grow an "Update to x" entry. The download starts on that
// click, and the install on a second one ("Restart to update"). A download
// that finished but was never restarted into installs when the app next quits.
//
// Background checks fail quietly — a laptop offline is not news. A check the
// user asked for, or a download they started, reports its failure.
//
// Builds that cannot update answer `disabled` and never touch the network:
// unpacked dev runs, and any build whose baked feed names a `.invalid` host,
// which is the kill switch if the bucket ever moves. DESKMUDGIN_DEV_UPDATE=1
// opts a dev run back in through a gitignored dev-app-update.yml.
// =============================================================================

import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import type { AppUpdater } from 'electron-updater'
import type { UpdateState } from '../shared/ipc'

/** First check this long after launch: the colony is up and drawing by then,
 *  and a check never competes with the boot for the disk. */
const FIRST_CHECK_MS = 20_000
/** Then this often. Releases are rare; a desk pet runs for days. */
const EVERY_MS = 6 * 3600_000

export class Updater {
  private s: UpdateState
  private au: AppUpdater | null = null
  private timer: NodeJS.Timeout | null = null

  constructor(
    private readonly onChange: (s: UpdateState) => void,
    private readonly log: (msg: string) => void,
  ) {
    this.s = { status: enabled() ? 'idle' : 'disabled', current: app.getVersion() }
  }

  get state(): UpdateState { return this.s }

  /** Start the schedule. A no-op for a build that cannot update. */
  start(): void {
    if (this.s.status === 'disabled') return
    setTimeout(() => void this.check(false), FIRST_CHECK_MS)
    this.timer = setInterval(() => void this.check(false), EVERY_MS)
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
  }

  /**
   * Ask the feed. `manual` is a click: its failure is reported, and it is the
   * only way to see "up to date". A background check that finds nothing, or
   * cannot reach the feed, leaves the state where it was.
   */
  async check(manual: boolean): Promise<UpdateState> {
    const { status } = this.s
    // Already found, fetching or fetched: there is nothing more to learn, and
    // re-checking mid-download would restart it.
    if (status === 'disabled' || status === 'checking' || status === 'available'
      || status === 'downloading' || status === 'ready') return this.s
    if (manual) this.set({ status: 'checking' })
    try {
      const r = await this.updater().checkForUpdates()
      if (r?.isUpdateAvailable) {
        this.set({ status: 'available', version: r.updateInfo.version })
      } else if (manual) {
        this.set({ status: 'none' })
      }
    } catch (err) {
      this.log(`[update] check failed: ${(err as Error)?.message ?? err}`)
      if (manual) this.set({ status: 'error' })
    }
    return this.s
  }

  /** Fetch the offered build. Progress and the result arrive as state changes. */
  download(): void {
    if (this.s.status !== 'available' && !(this.s.status === 'error' && this.s.version)) return
    this.set({ status: 'downloading', percent: 0 })
    this.updater().downloadUpdate().catch(err => {
      this.log(`[update] download failed: ${(err as Error)?.message ?? err}`)
      this.set({ status: 'error' })
    })
  }

  /** Restart into the downloaded build: a silent install, then relaunch. */
  install(): void {
    if (this.s.status !== 'ready') return
    // Deferred so the IPC reply goes out before the app tears itself down.
    setImmediate(() => this.updater().quitAndInstall(true, true))
  }

  private set(patch: Partial<UpdateState>): void {
    // `version` survives a failed download, so "try again" knows what it was
    // trying to fetch; `percent` only means anything while downloading.
    const next: UpdateState = { ...this.s, ...patch, current: app.getVersion() }
    if (next.status !== 'downloading') delete next.percent
    this.s = next
    this.onChange(next)
  }

  /** electron-updater, loaded on first use: a build that never checks never
   *  pays for it. */
  private updater(): AppUpdater {
    if (this.au) return this.au
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { autoUpdater } = require('electron-updater') as typeof import('electron-updater')
    if (process.env.DESKMUDGIN_DEV_UPDATE === '1') autoUpdater.forceDevUpdateConfig = true
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = true
    autoUpdater.logger = null
    // Failures are handled where they surface (the promises above); this only
    // keeps an 'error' event with no listener from being thrown as uncaught.
    autoUpdater.on('error', err => this.log(`[update] ${err?.message ?? err}`))
    let lastPct = -1
    autoUpdater.on('download-progress', p => {
      // Whole percents only: a progress event per network chunk is hundreds of
      // IPC pushes and panel redraws for a bar nobody reads that finely.
      const pct = Math.floor(p.percent)
      if (pct === lastPct) return
      lastPct = pct
      this.set({ status: 'downloading', percent: pct })
    })
    autoUpdater.on('update-downloaded', info => {
      this.log(`[update] ${info.version} downloaded`)
      this.set({ status: 'ready', version: info.version })
    })
    this.au = autoUpdater
    return autoUpdater
  }
}

/** Whether this build can update itself at all. */
function enabled(): boolean {
  if (process.env.DESKMUDGIN_DEV_UPDATE === '1') return true
  if (!app.isPackaged) return false
  try {
    const feed = fs.readFileSync(path.join(process.resourcesPath, 'app-update.yml'), 'utf8')
    return !feed.includes('.invalid')
  } catch {
    return false
  }
}
