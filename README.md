# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview built output |
| `npm run storybook` | Run Storybook (design system docs) |
| `npm run build-storybook` | Static Storybook export |
| `npm run storybook:clean` | Clear Storybook/Vite caches then start Storybook |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Watch mode tests |
| `npm run test:coverage` | Coverage report |

## Design System Tokens

Core color tokens in `src/tokens.ts`; spacing scale in `src/spacing.ts` integrates with the custom `theme.spacing(index)` function (returns explicit value for defined indices, otherwise `index * 4px`). Prefer `theme.spacing(n)` over raw pixel values for consistency and scalability.

Example:
```tsx
<Box sx={{ p: theme.spacing(3), gap: theme.spacing(2) }} />
```

## Testing

Tests use Vitest + jsdom. React Testing Library exercises component behavior & accessibility. Storybook stories are testable via the Storybook Vitest addon (`vitest.config.ts`).

Run all tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Coverage:
```bash
npm run test:coverage
```

## Storybook MDX Status

Project is standardized on Storybook 9.x with native MDX blocks; the previous temporary stub + alias were removed. Health pages live under `Health/*` for quick verification.

If MDX pages fail to load:
1. Run `npm run storybook:clean` (cleans caches & restarts).
2. Check for stray trailing code fences (``` or ````) in `.mdx` files.
3. Ensure all `@storybook/*` packages share the same version.
4. Review terminal output for `[storybook viteFinal]` plugin list to confirm MDX plugin is present.
5. Verify no duplicate `preview` files exist.

Chromatic addon is enabled; configure project token via environment variable if visual regression testing is desired.
