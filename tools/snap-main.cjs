// =============================================================================
// Electron entry for `npm run snap` — render one contact sheet to a PNG without
// ever putting a window on the screen.
//
// Deliberately not the app's main process: no single-instance lock (so it runs
// beside a live colony without touching it), no saving, no tray, no hotkeys.
// The window is offscreen — Chromium paints into memory and nothing is shown —
// and the process exits on its own, with a hard timeout behind it so a hung
// render cannot linger either. The one thing it must never do is what the
// visible contact sheets did: leave something covering the desktop with no
// obvious owner.
// =============================================================================

const { app, BrowserWindow, ipcMain } = require('electron')
const { writeFileSync } = require('node:fs')
const { join } = require('node:path')

const [sheet, out, w = '1520', h = '900', ...extra] = process.argv.slice(2).filter(a => !a.startsWith('--'))
// Anything after the size is query: `theme=manuscript`, or a bare number for
// the speech sheet's page.
const query = { layer: 'overlay' }
for (const e of extra) {
  const [k, v] = e.includes('=') ? e.split('=') : ['page', e]
  query[k] = v
}

// Whatever else happens, this process is gone in 20 seconds.
setTimeout(() => { console.error('snap: timed out'); app.exit(2) }, 20000).unref()

app.disableHardwareAcceleration()
app.whenReady().then(async () => {
  // The one call a contact sheet makes to main — asking to take input. There
  // is nothing to take input on here.
  ipcMain.handle('input:setHitRegion', () => undefined)
  const win = new BrowserWindow({
    width: Number(w), height: Number(h),
    show: false,
    webPreferences: {
      offscreen: true,
      preload: join(__dirname, '../out/preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })
  await win.loadFile(join(__dirname, '../out/renderer/index.html'), { query })
  // Fonts load and the paced loop draws a few frames before the capture.
  await new Promise(r => setTimeout(r, 1500))
  const img = await win.webContents.capturePage()
  writeFileSync(out, img.toPNG())
  console.log(`snap: ${sheet} → ${out} (${img.getSize().width}×${img.getSize().height})`)
  app.exit(0)
}).catch(err => { console.error('snap:', err); app.exit(1) })
