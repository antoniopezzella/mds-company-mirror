# MDS Platform Design System

![Contrast Status Badge](./contrast-badge.svg)

**🌐 Live Storybook:** [https://antoniopezzella.github.io/Marsh-Design-System/](https://antoniopezzella.github.io/Marsh-Design-System/)

> Interactive component library and design system documentation. Auto-deploys on every push to `main`.

---

## 🚀 Quick Links

- **Storybook (Staging):** https://antoniopezzella.github.io/Marsh-Design-System/
- **Repository:** https://github.com/antoniopezzella/Marsh-Design-System
- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📊 Quality Badges

Local contrast status badge is generated from the automated WCAG contrast report. Regenerate it after changing color or semantic tokens:

```bash
npm run tokens:contrast:badge
```

If the badge shows pass it means all required (non informational) contrast pairs meet or exceed their thresholds in both light and dark modes.

---

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

## CI & Quality Gates

This repository enforces design system integrity through three GitHub Actions workflows located in `.github/workflows/`:

| Workflow | File | Triggers | Purpose |
|----------|------|----------|---------|
| CI | `ci.yml` | push & PR to `main` | Install deps, lint docs, token governance (`tokens:check`), tests, build, (PR) build Storybook + upload artifact |
| Governance | `governance.yml` | push & PR to `main` | Strict governance: naming, deprecated token usage, missing semantic coverage |
| Contrast | `contrast.yml` | PR (selected paths) | WCAG contrast validation for token foreground/background pairs |

### Local Reproduction
| Check | Command |
|-------|---------|
| Full token build + diff + contrast | `npm run tokens:check` |
| Strict governance report | `npm run governance:report:strict` |
| Contrast (all pairs, JSON) | `npm run tokens:contrast:json` |
| Governance CI bundle | `npm run governance:ci` |

### Artifacts & Summaries
* Contrast: `contrast-report.json` (download from workflow artifacts). Fails if `totalFailed > 0`.
* Governance: `governance-report.json` (strict mode) for audit trail.
* CI: `token-diff.md` appended to the job summary (lists added/removed/changed tokens).
* Storybook (PR only): `storybook-static` artifact for ephemeral visual review.

### Failure Cheatsheet
| Failure Type | Likely Cause | What To Do |
|--------------|-------------|------------|
| Token diff step fails | Unauthorized primitive removal / changed reference | Add migration note or adjust governance policy | 
| Governance job fails | Deprecated or disallowed token usage; naming mismatch | Replace usage with suggested semantic token; run `roles:check` locally |
| Contrast job fails | Foreground/background pair below threshold | Adjust semantic mapping or palette value; re-run `tokens:contrast:all` |
| Tests fail | Unit or snapshot regression | Update test or component; confirm semantic token changes intentional |

### Adding / Changing Tokens Safely
1. Add primitive (palette) or semantic token in build script source.
2. Run `npm run tokens:build` locally.
3. Run `npm run tokens:contrast:all` to ensure no regressions.
4. Commit changes with clear description (e.g. `feat(tokens): add surface.button.primary semantic token`).
5. Open PR; verify CI summary & artifacts.

### Governance Escalation Path
Level 1 (Current): Informational reporting (token diff, contrast).
Level 2: Block PRs that remove a token without a `replacement` field.
Level 3: Block direct palette usage in component code (allowlist exceptions: charts, marketing).
Level 4: Enforce deprecation deadlines (auto-fail after cutoff date embedded in token meta).

### Concurrency (Planned)
To avoid redundant runs on rapid pushes, add:
```
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```
to each workflow (not yet applied—kept here for future optimization).

### Troubleshooting Checklist
| Symptom | Quick Triage |
|---------|--------------|
| Storybook artifact missing | Ensure PR build path triggered & no early failure |
| Governance passes locally but fails in CI | Local not using `npm ci` (version drift) – run `rm -rf node_modules && npm ci` |
| Contrast false positives | Confirm tokens referencing correct mode values; run JSON output & inspect pair entries |
| Slow CI | Consider enabling concurrency + caching Storybook build |

---
*If you contribute: always map new component colors via semantic tokens instead of raw palette values. Direct palette usage may become a governance failure in future levels.*
