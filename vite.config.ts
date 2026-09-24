import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// The renderer is a plain TS/Canvas app — no framework, no runtime deps. It is
// built to out/renderer and loaded off disk in production, off the dev server
// in development (see scripts/dev.mjs). `base: './'` matters: the production
// window loads via file://, where an absolute /assets path resolves to the
// drive root.
export default defineConfig({
  root: resolve(__dirname, 'src/renderer'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'out/renderer'),
    emptyOutDir: true,
    target: 'chrome128',
    sourcemap: true,
  },
  server: { port: 5273, strictPort: true },
})
