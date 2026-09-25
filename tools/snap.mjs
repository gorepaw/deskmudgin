// Render a contact sheet to a PNG, offscreen. Nothing appears on the desktop.
//
//   npm run build:web && npm run snap -- themes shots/themes.png [width height] [key=value…]
//
// Sheets: themes, chrome (theme=<id>), speech (a bare number is the page),
// growth, 1 (the population sheet). See
// tools/snap-main.cjs for why this is its own Electron entry.

import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [sheet, out, ...rest] = process.argv.slice(2)
if (!sheet || !out) {
  console.error('usage: node tools/snap.mjs <sheet> <out.png> [width height] [key=value…]')
  process.exit(2)
}
const env = { ...process.env, DESKMUDGIN_CONTACT: sheet }
// See scripts/electron.mjs: inherited from VS Code, it boots Electron as Node.
delete env.ELECTRON_RUN_AS_NODE
const electron = createRequire(import.meta.url)('electron')
const child = spawn(electron, [resolve(root, 'tools/snap-main.cjs'), sheet, resolve(out), ...rest],
  { cwd: root, stdio: 'inherit', env })
child.on('exit', code => process.exit(code ?? 1))
