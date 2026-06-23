import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
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
