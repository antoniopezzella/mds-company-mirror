import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    pool: 'vmForks',
    setupFiles: [path.join(dirname, './src/setupTests.ts')],
    include: [
      'src/__tests__/**/*.{test,spec}.{ts,tsx}',
      'src/**/*.unit.{test,spec}.{ts,tsx}',
      'src/components/**/*.test.{ts,tsx}',
      'src/utils/**/*.test.{ts,tsx}',
    ],
    exclude: [
      'src/**/*.stories.{ts,tsx}',
      'src/**/*.accessibility.test.tsx',
      'src/**/*.old-test.tsx',
      '**/node_modules/**',
    ],
  },
});
