import base from './tailwind.config.js';

/**
 * Tailwind config for the PUBLISHED package stylesheet — not this repo's app,
 * which uses tailwind.config.js directly.
 *
 * Why a separate config
 * ---------------------
 * The app's `content` globs cover all of `src/`: pages, marketing sections,
 * dashboards, Storybook stories. None of that ships. Scanning it here would
 * bloat the consumer's stylesheet with utilities for components they can't even
 * import.
 *
 * This narrows scanning to exactly the export surface — `src/components/ui/`
 * plus the handful of files `src/index.ts` re-exports — so the shipped CSS
 * covers what a consumer can actually use, and nothing else.
 *
 * Everything else (theme, plugins, the role/token wiring) is inherited from the
 * base config, so the package and the app cannot drift apart visually.
 */
export default {
  ...base,
  content: [
    'src/components/ui/**/*.{ts,tsx}',
    'src/theme/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
    'src/index.ts',
    // Stories and tests are development-only; their classes never reach a
    // consumer, so scanning them would ship dead CSS.
    '!src/components/ui/**/*.stories.tsx',
    '!src/components/ui/**/*.test.tsx',
  ],
};
