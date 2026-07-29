import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Put the heavy 3D globe library into its own chunk so the rest of
        // the site stays light. It's already lazy-loaded in Home.jsx, so
        // visitors who don't scroll to it never download this chunk.
        manualChunks: (id) => {
          if (id.includes('react-globe.gl') || id.includes('/three/')) {
            return 'globe'
          }
        },
      },
    },
  },
})
