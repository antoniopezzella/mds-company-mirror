// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  // Global ignores for build files and generated content
  {
    ignores: [
      'dist/**',
      'dist-pkg/**', // generated .d.ts package output, not source
      'storybook-static/**',
      'marsh-design-system-deploy/**',
      'node_modules/**',
      '.vercel/**',
      'coverage/**',
      'build/**',
      'scripts/figma/**' // Figma plugin scripts use intentional @ts-nocheck and any types
    ]
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // NOTE: Custom rule placeholders. We can later implement a rule to discourage raw pixel spacing values.
    rules: {
      // Example (disabled until custom rule created):
      // 'design-system/no-raw-spacing': 'warn',
      
      // TypeScript rules - warn instead of error for gradual adoption
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',

      // Standard escape hatch: prefix with _ to signal an intentionally
      // unused param/var (e.g. a positionally-required callback arg, or a
      // caught error you're not inspecting) without disabling the check.
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        // Destructuring specifically to exclude props from a ...rest spread
        // (e.g. `const { a, b, ...rest } = props`) is a deliberate pattern,
        // not dead code — several components do this to strip non-DOM
        // props before spreading the remainder.
        ignoreRestSiblings: true,
      }],
      
      // Allow console.debug for development debugging
      'no-console': ['warn', { allow: ['debug', 'info', 'warn', 'error'] }],

      // `try { localStorage.x } catch {}` (storage can throw in Safari
      // private mode / restricted iframes) is a deliberate silent-ignore
      // pattern used throughout the Story UI panel — not dead code.
      'no-empty': ['error', { allowEmptyCatch: true }],
    }
  },
  {
    // shadcn/ui's own generator template colocates a component with its
    // `cva()` variants function (and sometimes a small hook/helper) in one
    // file by design — e.g. `export { Toggle, toggleVariants }`. Splitting
    // every one of these into two files to satisfy Fast Refresh isn't
    // shadcn/ui convention anywhere, and buys nothing beyond DX (this
    // rule has zero effect on production builds).
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // True app entry points: no exports at all, so "move the component to
    // a separate file" (the rule's own suggested fix) doesn't apply —
    // there's no component here to move, just a render() call.
    files: ['src/main.tsx', 'src/main-simple.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // ThemeModeContext.tsx deliberately exports the Context object itself
    // (not just the hook) so Storybook's preview decorator can drive it —
    // see the comment in that file. Splitting this widely-imported theme
    // infrastructure file into three just for Fast Refresh isn't worth the
    // import-path churn across every consumer for a dev-only HMR nicety.
    files: ['src/theme/ThemeModeContext.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // Same shape as ThemeModeContext above: a provider and the hooks that read
    // it are one unit. `useFormat()` exists precisely so components don't
    // import the raw formatters and forget the locale — putting it in a
    // separate file from the provider it reads would undercut that.
    files: ['src/lib/format-context.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
], storybook.configs["flat/recommended"]);
