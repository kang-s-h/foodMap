import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://bigdata.daejeon.go.kr', // 원래 API 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거
      },
    },
  },
})
