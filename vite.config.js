import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react(),],

  server: {
    proxy: {
      "/api": "http://localhost:4000"
      // "/api": {
      //   target: "https://watch-gi-website-backend.vercel.app",
      //   changeOrigin: true,
      //   secure: true,
      // },
    },
  },

  // build: {
  //   outDir: 'dist',
  // },

  base: '/', // Good for root domain. Change if deploying to subfolder.
})
