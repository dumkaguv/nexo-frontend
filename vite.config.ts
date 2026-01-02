import path from 'path'

import { sentryVitePlugin } from '@sentry/vite-plugin'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: './',
  publicDir: 'public',
  cacheDir: './node_modules/.vite/apps/nexo-frontend',

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts']
  },

  server: {
    port: 4200,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
    tailwindcss(),
    svgr(),

    sentryVitePlugin({
      org: 'sentry',
      project: 'nexo-frontend',
      url: 'https://dmitrii-g0.sentry.io/',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: ['dist/**/*.map']
      },
      telemetry: false
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 2000,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    sourcemap: true
  },

  define: {
    'import.meta.env.VITE_PUBLIC_API_URL': JSON.stringify(
      process.env.VITE_PUBLIC_API_URL ?? 'http://localhost:3000'
    )
  }
})
