// Dev launcher. Vite serves the renderer with HMR; tsc watches the main process
// and Electron is restarted when its output changes. Written by hand rather than
// pulled in as `concurrently` + `electron-reload` because two spawns and a
// debounced restart is the whole job.

import { spawn } from 'node:child_process'
import { watch } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnElectron } from './electron.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

const procs = []
function run(cmd, args) {
  const p = spawn(cmd, args, { cwd: root, stdio: 'inherit', shell: true })
  procs.push(p)
  return p
}

let electron = null
process.on('SIGINT', () => {
  electron?.kill()
  for (const p of procs) p.kill()
  process.exit(0)
})

run(npx, ['vite'])
run(npx, ['tsc', '-p', 'tsconfig.main.json', '--watch', '--preserveWatchOutput'])

let timer = null
function restart() {
  clearTimeout(timer)
  // tsc emits file by file; without the debounce this restarts once per file.
  timer = setTimeout(() => {
    electron?.kill()
    electron = spawnElectron(['--dev'], { DESKMUDGIN_DEV_SERVER: 'http://localhost:5273' })
  }, 400)
}

// First boot waits for tsc to have emitted at least once.
setTimeout(restart, 2500)
try {
  watch(resolve(root, 'out/main'), { recursive: true }, restart)
} catch {
  // out/main does not exist yet on a clean checkout; the initial restart covers it.
}
