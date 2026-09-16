# MDS Platform Design System

![Contrast Status Badge](./contrast-badge.svg)

**🌐 Live Storybook:** Deploy for free with [Netlify](https://netlify.com) or [Vercel](https://vercel.com)

> Interactive component library and design system documentation with **AI-powered insurance assistant**. Auto-deploys on every push to `main`.

---

## 🤖 NEW: AI Assistant Integration

The MDS Platform now includes a **production-ready AI assistant** for insurance queries! 

**Features:**
- 🧠 RAG (Retrieval Augmented Generation) with 68,000+ words of insurance content
- 💬 Conversation memory and context-aware follow-ups
- 🔒 Enterprise security (input validation, audit logging, rate limiting)
- 📊 OpenTelemetry/Jaeger tracing for observability
- ✅ Automated evaluation suite for quality assurance

**Quick Start:**
```bash
# 1. Install gateway dependencies
cd apps/gateway && npm install && cd ../..

# 2. Set up your OpenAI API key
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# 3. Run both frontend and AI backend
npm run dev:all
```

**Learn more:** [apps/gateway/README.md](./apps/gateway/README.md)

---

## � Documentation

**Start here:** run `npm run dev`, then browse **[/design-system](http://localhost:5173/design-system)** — every component in the current library, live, with guidance on which one to reach for and when.

**Full documentation map:** [`docs/README.md`](./docs/README.md) — every doc in this repo, organized by what it's for.

### For Builders
*   [**Developer Get Started**](./docs/get-started/DEVELOPERS.md): Setup, installation, and component usage.
*   [**Build Your First Page**](./docs/get-started/BUILD_YOUR_FIRST_PAGE.md): End-to-end walkthrough — route, components, grid, tokens.
*   [**Contributing Guide**](./docs/CONTRIBUTING.md): How to build, test, and submit PRs.
*   [**Token System**](./docs/foundations/TOKENS.md): Deep dive into Primitives, Semantics, and Roles.
*   [**Design System Integration**](./docs/DESIGN_SYSTEM_INTEGRATION_GUIDE.md): Connecting components to legacy apps.

### For Designers
*   [**Designer Get Started**](./docs/get-started/DESIGNERS.md): Figma workflow and Code Connect.
*   [**Figma Code Connect**](./docs/FIGMA_CODE_CONNECT_GUIDE.md): Detailed setup for Dev Mode.

### Roadmaps & Status
*   [**Component Coverage**](./docs/archive/COMPONENT_COVERAGE.md): Archived — stale as of Dec 2025; see [Migration Status](./docs/SHADCN_MIGRATION_STATUS.md) for current component-by-component status.
*   [**Documentation Roadmap**](./docs/archive/ROADMAP_IMPROVEMENTS.md): Our plan for improving these docs. (archived, historical)

---

## �🚀 Quick Links

- **Repository:** https://github.com/antoniopezzella/Marsh-Design-System
- **Deployment Guide:** [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Storybook (GitHub Pages, automated) + app (Vercel)
- **Local Storybook:** `npm run storybook` → http://localhost:6006
- **Component showcase:** `npm run dev` → http://localhost:5173/design-system
- **AI Gateway:** [apps/gateway/README.md](./apps/gateway/README.md) - AI Assistant backend

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

### Everyday dev

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server, plus the AI gateway (`/design-system` lives here) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview built output |
| `npm run storybook` | Run Storybook (design system docs) |
| `npm run build-storybook` | Static Storybook export |
| `npm run storybook:clean` | Clear Storybook/Vite caches then start Storybook |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Watch mode tests |
| `npm run test:coverage` | Coverage report |

### Tokens & role enforcement

`roles:check` is the mechanism that actually enforces the "colors only via
`getRoleColor()`" rule described in [Tokens](./docs/foundations/TOKENS.md) —
run it (or its strict/CI variant) any time you touch component styling.

| Script | Purpose |
|--------|---------|
| `npm run tokens:build` | Compile `tokens.ts`/`semantic-tokens.ts` → `dist/tokens.json` + `dist/theme.css` + `dist/tokens.tokens.json` (W3C DTCG format) |
| `npm run tokens:check` | Full pipeline: build → diff → validate → validate-dtcg → contrast |
| `npm run tokens:validate` | Schema validation (hex format, structure) |
| `npm run tokens:validate-dtcg` | Structural conformance check for `dist/tokens.tokens.json` against the DTCG spec |
| `npm run tokens:diff` | Detect token additions/changes/removals vs. HEAD |
| `npm run tokens:contrast:all` | WCAG AA contrast check, all pairs |
| `npm run tokens:contrast:badge` | Regenerate `contrast-badge.svg` after a token change |
| `npm run roles:check` | Detect direct `tokens.*`/`semanticColors.*` usage in components |
| `npm run roles:check:strict` | Same, fails the build on any violation (what CI runs) |
| `npm run governance:report:strict` | Full governance report (naming, deprecated tokens, missing coverage) |
| `npm run governance:ci` | `tokens:build` + strict governance report, as run in CI |

## Design System Tokens

Core color tokens in `src/tokens.ts`; spacing scale in `src/spacing.ts` integrates with the custom `theme.spacing(index)` function (returns explicit value for defined indices, otherwise `index * 4px`). Prefer `theme.spacing(n)` over raw pixel values for consistency and scalability.

Example:
```tsx
<Box sx={{ p: theme.spacing(3), gap: theme.spacing(2) }} />
```

## Testing

`vitest.config.ts` defines two Vitest projects: `unit` (jsdom, component behavior) and `storybook` (every `.stories.tsx` in the repo, rendered as a real Chromium test via Playwright — no separate test files to write). Full walkthrough, including coverage and the Storybook-UI test widget: **Foundations/Testing** in Storybook (`npm run storybook`, or `src/docs/70-Testing.mdx`).

```bash
npm test                              # both projects
npm run test:watch                    # both projects, watch mode
npm run test:coverage                 # combined coverage
npm run test:coverage:storybook       # coverage from stories only
npx vitest run --project unit         # just unit
npx vitest run --project storybook    # just stories
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
| CI | `ci.yml` | push (any branch) & PR to `main` | Install deps, lint docs, lint, token governance (`tokens:check`), tests, build, (PR) build Storybook + upload artifact |
| Governance | `governance.yml` | push (any branch) & PR to `main` | Strict governance: naming, deprecated token usage, missing semantic coverage |
| Contrast | `contrast.yml` | push & PR (selected paths, any branch) | WCAG contrast validation for token foreground/background pairs |

Push triggers are intentionally not `main`-only — this repo does substantial work directly on feature branches, so every branch gets real CI signal instead of nothing until merge.

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

**🚨 Before adding a token, you must submit a token request for review and approval.**

#### For Designers & Product Owners
Follow the [Token Request Process](./docs/TOKEN_REQUEST_PROCESS.md):
1. Check if an existing token can work (search Figma Variables or Storybook)
2. If no match, submit a GitHub issue using the appropriate template:
   - [⭐ Brand Token](/.github/ISSUE_TEMPLATE/token-request-brand.md) (requires VP approval)
   - [🎨 Semantic Token](/.github/ISSUE_TEMPLATE/token-request-semantic.md) (requires Design Lead)
   - [🔧 Role Token](/.github/ISSUE_TEMPLATE/token-request-role.md) (requires DS Team)
3. Wait for approval before implementation
4. Developer will implement and sync to Figma

#### For Developers (Post-Approval Implementation)
Once a token request is **approved**, follow these steps:

**For Primitive/Brand tokens:**
1. Add to `src/tokens.ts` with clear comment
2. Run `npm run tokens:build`
3. Run `npm run tokens:validate` (schema check)
4. Update Figma variables (Primitives collection)

**For Semantic tokens:**
1. Add to `src/semantic-tokens.ts`
2. Define light mode value (reference primitive)
3. Add dark mode override in `semanticDarkOverrides`
4. Run `npm run tokens:build`
5. Run `npm run tokens:contrast:all` (fix failures if any)
6. Update Figma variables (Semantic collection with light/dark modes)

**For Role tokens:**
1. Add to `src/theme/roles.ts`
2. Update `RoleName` type union
3. Update `ROLE_MAP` with semantic mapping
4. Run `npm run roles:check`
5. Update component to use new role

**For all token types:**
1. Document in Storybook token browser
2. Add to `CHANGELOG.md` under `[Unreleased]`
3. Create PR with appropriate label (`tokens:primitive`, `tokens:semantic`, `tokens:role`)
4. Link to approved token request issue in PR description
5. Verify CI checks pass (diff, contrast, governance)
6. Get 1 approval and merge
7. Sync Figma variables after merge

**📚 Full governance guide:** [TOKEN_REQUEST_PROCESS.md](./docs/TOKEN_REQUEST_PROCESS.md)

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
