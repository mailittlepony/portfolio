/*
 * vite.config.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */

import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portfolio/',
  appType: 'spa',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['markdown-it', 'dompurify'],
          highlight: ['highlight.js', 'markdown-it-highlightjs'],
        },
      },
    },
    chunkSizeWarningLimit: 1500
  },
})

