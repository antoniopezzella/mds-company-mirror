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
          // One glob for the whole tree, not a per-directory allowlist.
          //
          // The previous list named only __tests__, *.unit.*, components/ and
          // utils/ — so a test written anywhere else simply never ran, with no
          // error and no output to say so. Two had been sitting unexecuted in
          // the repo: src/features/tree-testing/treeTesting.utils.test.ts and
          // src/projects/marsh-one/components/WorkspaceCard.test.tsx. It also
          // meant src/hooks/ and src/theme/ were untestable in practice, which
          // is a plausible reason the theming layer had no tests at all — the
          // place a dangling-CSS-variable bug later hid.
          // src/ AND api/. The serverless functions under api/ are real
          // shipped code — chat-stream.ts is a public endpoint spending an
          // OpenAI key — and were outside the test runner entirely, the same
          // way src/hooks/ and src/theme/ were before the previous widening.
          include: ['src/**/*.{test,spec}.{ts,tsx}', 'api/**/*.{test,spec}.{ts,tsx}'],
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
          // No `setupFiles` here on purpose. It used to point at
          // .storybook/vitest.setup.ts, which called setProjectAnnotations()
          // manually — and since Storybook 10.3 that makes
          // @storybook/addon-vitest SKIP its own automatic provisioning
          // ("Skipping automatic provisioning of preview annotations to avoid
          // conflicts", printed on every run). That automatic path is what
          // wires in the *addons'* annotations, so preview.tsx's decorators
          // applied while addon-a11y's never did — meaning
          // `a11y: { test: 'error' }` in preview.tsx silently ran no checks at
          // all. Verified by probe: a story with deliberate colour-contrast and
          // button-name violations PASSED. Letting addon-vitest provision
          // automatically fixes it, and the same probe then fails as it should.
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
            instances: [
              {
                browser: 'chromium',
                // Run the whole suite as a reduced-motion user would see it.
                //
                // This is not just a convenience. Entrance animations start at
                // opacity 0, so a story sampled mid-flight has text blended
                // most of the way into its background — axe reported dozens of
                // colour-contrast failures for elements whose declared colour
                // was perfectly correct (#000f47 measuring as ~#e2e3ea at
                // 1.2:1). The readings were real, the defect was not: the text
                // was simply still fading in, and the result varied with
                // machine speed.
                //
                // Asking for reduced motion settles the DOM before axe looks,
                // which makes contrast deterministic AND exercises the
                // accessibility path that actually matters — every animation in
                // this repo is now expected to honour the preference, so if one
                // regresses and animates anyway, these tests go flaky again and
                // say so.
                context: { reducedMotion: 'reduce' },
              },
            ],
          },
        },
      },
    ],
  },
});
