import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    optimizeDeps: {
      include: ['@ffmpeg/ffmpeg'],
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/core'],
      
  },
  build: {
    target: 'esnext',
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
