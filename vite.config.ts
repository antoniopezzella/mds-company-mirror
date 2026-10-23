import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

// Note: Importing 'path' from 'node:path' requires Node.js v16+ (ESM support)
// https://vite.dev/config/
// Vite configuration for the design system platform.
// The React plugin enables fast refresh and JSX support.
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // A FUNCTION, not the old object map: Rollup 5 (via Vite 8) removed
        // `manualChunks` as a package->chunk record. Same split as before —
        // the heavy vendors leave the entry chunk so they download in parallel
        // and cache independently of app code across deploys.
        //
        // Order matters: @mui/x-data-grid must be tested before the general
        // @mui rule, or the grid would be swallowed into the `mui` chunk.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/gsap/')) return 'gsap';
          if (id.includes('/@mui/x-data-grid/')) return 'mui-datagrid';
          if (id.includes('/recharts/')) return 'recharts';
          if (id.includes('/@mui/')) return 'mui';
          if (/\/(react|react-dom|react-router-dom)\//.test(id)) return 'react-vendor';
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    cors: {
      origin: ['http://localhost:3333'],
      credentials: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/api/answer'),
      }
    }
  }
});
