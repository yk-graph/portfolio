import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entryPoints: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  external: ['react'],
  ...options,
}))
