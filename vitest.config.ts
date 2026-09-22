import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        // Existing unit tests — unchanged from before the Storybook project was added.
        plugins: [react()],
        resolve: {
          alias: {
            '@': path.resolve(dirname, './src'),
          },
        },
        test: {
          name: 'unit',
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
      },
      {
        // Every story in the repo (whatever .storybook/main.ts's own `stories`
        // glob indexes — components, projects, generated, _health — the
        // storybookTest plugin discovers via Storybook itself, not via this
        // project's own `include`; a narrower Vitest `include` glob here does
        // NOT restrict which stories run, confirmed empirically), run as
        // real browser tests via Playwright (not jsdom) — see
        // .storybook/vitest.setup.ts for the preview-annotations wiring.
        //
        // First run after a cache clear is flaky: Vite's dependency
        // pre-bundling under concurrent load can transiently fail individual
        // dynamic imports ("Failed to fetch dynamically imported module").
        // A second run with the warm node_modules/.cache/storybook cache
        // passes cleanly (100/100 files verified 2026-09-15). If this ever
        // runs in CI on a cold cache, expect to either retry once or warm
        // the cache in a separate step first.
        plugins: [
          react(),
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        resolve: {
          alias: {
            '@': path.resolve(dirname, './src'),
          },
        },
        test: {
          name: 'storybook',
          setupFiles: ['.storybook/vitest.setup.ts'],
          // Run story files serially. The cold-cache failures described above
          // come from Vite pre-bundling under concurrent load, so this fixes
          // the cause rather than papering over it: on a cleared cache,
          // parallel runs fail 13 tests while serial passes 638/638. Measured
          // cost on a warm cache is ~2s (33s -> 35s), which is a good trade
          // for removing a red check that has nothing to do with the change
          // that triggered it. A `retry` does NOT work here — verified; the
          // failures persist across retries within the same run.
          fileParallelism: false,
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
