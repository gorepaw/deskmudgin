// Spawns Electron with an environment it can actually start in.
//
// The one thing this exists for: VS Code — and anything else built on Electron,
// including a terminal running inside it — exports ELECTRON_RUN_AS_NODE=1 to
// its children. Electron inheriting that flag boots as a bare Node process, so
// `require('electron')` hands back a path string instead of the API object and
// main.ts dies on `app.requestSingleInstanceLock()` with a mystifying "Cannot
// read properties of undefined". Since this project is developed from inside
// VS Code, stripping it here is the difference between `npm run dev` working
// and not.

import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

export function spawnElectron(args = [], extraEnv = {}) {
  const env = { ...process.env, ...extraEnv }
  delete env.ELECTRON_RUN_AS_NODE

  // Resolve the binary through the package rather than PATH, so we launch the
  // Electron this project pinned and not whatever `npx` decides to fetch.
  const require = createRequire(import.meta.url)
  const binary = require('electron')

  return spawn(binary, ['.', ...args], { cwd: root, stdio: 'inherit', env })
}

// Also usable directly: `node scripts/electron.mjs --dev`
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const child = spawnElectron(process.argv.slice(2))
  child.on('exit', code => process.exit(code ?? 0))
}
