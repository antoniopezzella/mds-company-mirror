import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'src/__tests__/**/*.{test,spec}.{ts,tsx}', 'src/__tests__/**/*.test.{ts,tsx}'],
    projects: [
      // Storybook-driven interaction tests
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              { browser: 'chromium' }
            ]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      },
      // Pure unit tests (no Storybook plugin filtering)
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}', 'src/**/*.unit.{test,spec}.{ts,tsx}', 'src/components/**/*.test.{ts,tsx}', 'src/utils/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/setupTests.ts']
        }
      }
    ]
  }
});