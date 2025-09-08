import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), svgr({ include: '**/*.svg' })],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      proxy: {
        '/bigdata': {
          target: 'http://bigdata.daejeon.go.kr',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bigdata/, ''),
        },
        '/football': {
          target: 'https://api.football-data.org/v4',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/football/, ''),
          headers: {
            'X-Auth-Token': env.VITE_FOOTBALL_API_KEY,
          },
        },
      },
    },
  };
});
