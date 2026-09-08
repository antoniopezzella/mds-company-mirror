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
      
      // Allow console.debug for development debugging
      'no-console': ['warn', { allow: ['debug', 'info', 'warn', 'error'] }],
    }
  },
], storybook.configs["flat/recommended"]);
