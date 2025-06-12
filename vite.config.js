import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    optimizeDeps: {
      include: ['@ffmpeg/ffmpeg'],
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 KB

  },
})

// export default {
//   optimizeDeps: {
//     include: ['@ffmpeg/ffmpeg'],
//   },
//   build: {
//     target: 'esnext',
//   },
// }
