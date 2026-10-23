import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

/**
 * The DARK-MODE story pass. `npm run test:dark`.
 *
 * Why this exists
 * ---------------
 * Marsh's hero surface rendered sage green (#3e4944) in dark mode on every
 * page that used it, and every gate passed: the role -> semantic -> primitive
 * chain was valid and `text.onHero` on it measured 7.61:1, comfortably past
 * WCAG AA. Every dark gate in this repo asserts a RATIO or a SHAPE; none
 * asserts what colour actually appeared.
 *
 * The reason it was invisible is simpler than it sounds: of ~630 indexed story
 * entries, exactly TWO opted into dark mode — stat-card.stories.tsx:295 and
 * metric-card.stories.tsx:165 — and both were added reactively after earlier
 * dark bugs. The default `colorMode` global is 'light'
 * (.storybook/preview.tsx:25), the main vitest.config.ts passes no
 * `initialGlobals`, so the whole suite ran light and nothing said so.
 *
 * This config runs the SAME stories with the colour mode flipped, which is the
 * one thing that makes a visually-wrong-but-structurally-valid token fail
 * something. It reuses the existing Storybook + Playwright infrastructure
 * rather than adding a framework: the only difference from the `storybook`
 * project in vitest.config.ts is `initialGlobals`.
 *
 * Why a SEPARATE config rather than a third project in vitest.config.ts
 * --------------------------------------------------------------------
 * Two reasons, both practical:
 *
 *   1. `npm test` already takes ~70s. Folding a second full browser pass into
 *      the default run roughly doubles the cost of every local test
 *      invocation, including the ones that have nothing to do with colour.
 *   2. 628 of these stories have NEVER had axe run against them in dark mode.
 *      Wiring that straight into the default gate would turn an unrelated
 *      change red for pre-existing findings. Keeping it a separate command
 *      lets the backlog be triaged deliberately.
 *
 * Promote it into `governance:ci` once it is green — the same warn-first
 * ladder the other gates in this repo followed.
 */
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [
          react(),
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            // THE whole point of this file. Flips `colorMode`, which
            // .storybook/preview.tsx turns into both the MUI dark theme and
            // the `dark` class on <html> that Tailwind's `dark:` variants and
            // getRoleColor()'s DOM lookup key off.
            initialGlobals: { colorMode: 'dark' },
          }),
        ],
        resolve: {
          alias: {
            '@': path.resolve(dirname, './src'),
          },
        },
        test: {
          name: 'storybook-dark',
          // Same rationale as the light project: cold-cache Vite pre-bundling
          // fails individual dynamic imports under concurrent load, and a
          // `retry` does not help. See vitest.config.ts for the measurements.
          fileParallelism: false,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({ contextOptions: { reducedMotion: 'reduce' } }),
            instances: [
              {
                browser: 'chromium',
                // Must match the light pass. Entrance animations start at
                // opacity 0, so a story sampled mid-flight reports colour
                // contrast for a half-faded element — real readings, not real
                // defects. Reduced motion settles the DOM before axe looks.
              },
            ],
          },
        },
      },
    ],
  },
});
