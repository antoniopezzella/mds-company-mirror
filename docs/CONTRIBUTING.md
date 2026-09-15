# Contributing to MDS Platform

Thank you for your interest in contributing to the Marsh Design System (MDS) Platform! This guide covers environment setup, creating components, and submitting changes.

## 🛠 Development Setup

### Prerequisites
- Node.js v22 (check `package.json` engines)
- npm

### Installation
```bash
git clone https://github.com/antoniopezzella/Marsh-Design-System.git
npm install
```

### Key Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite dev server for the platform app |
| `npm run storybook` | Starts the Storybook environment (recommended for component dev) |
| `npm test` | Runs the test suite (Vitest — unit tests + every story as a real browser test via Playwright, see README's Testing section) |
| `npm run tokens:build` | Generates CSS and JSON artifacts from token definitions |
| `npm run roles:check` | Validates role-token usage in code |
| `npm run docs:lint` | Lints MDX docs + enforces repo-root doc placement (see `CLAUDE.md` → "Documentation Governance") |

## Core principles

- Single source of truth: component APIs live in CSF stories (Autodocs); conceptual/foundational narrative lives in MDX under `src/docs`. See `src/docs/60-Documentation-Guidelines.mdx` for the full MDX authoring rules (Meta usage, heading hierarchy, token sourcing) — not repeated here.
- Keep stories minimal and focused on meaningful states.
- Prefer composition over custom ad-hoc docs components.

## 🧩 Creating a New Component

Check `/design-system` and existing components first — see `CLAUDE.md`'s "decision ladder" (does it exist already → do its props cover it → can you compose existing primitives → only then build new).

1. **Scaffold files** in `src/components/MyComponent/` (or `src/components/ui/` for the current stack):
   - `MyComponent.tsx`
   - `MyComponent.stories.tsx`
   - `MyComponent.test.tsx`
2. **Follow conventions**:
   - **Colors**: always `getRoleColor(...)` — never a hex code directly.
   - **Spacing**: `theme.spacing()` (MUI stack) or Tailwind spacing classes (current stack) — no hardcoded pixels.
   - **Exports**: via a barrel `index.ts`.
3. **Storybook**: stories covering all meaningful states (Primary, Secondary, Disabled, Error, etc.) — see `docs/guides/STORYBOOK_BEST_PRACTICES.md` for naming/organization conventions.
4. **Testing**: a render test at minimum; interaction tests if the component is interactive.

### Directory layout
```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.stories.tsx
  ComponentName.test.tsx
```

## 🎨 Token System Workflow

**⚠️ Before adding or modifying a token, submit a token request for approval** — see [Token Request Process](./TOKEN_REQUEST_PROCESS.md). Quick links:
- [⭐ Brand Token Request](/.github/ISSUE_TEMPLATE/token-request-brand.md) (VP approval)
- [🎨 Semantic Token Request](/.github/ISSUE_TEMPLATE/token-request-semantic.md) (Design Lead)
- [🔧 Role Token Request](/.github/ISSUE_TEMPLATE/token-request-role.md) (DS Team)

Post-approval implementation:
1. **Primitives** — `src/tokens.ts` (raw values).
2. **Semantics** — `src/semantic-tokens.ts` (intent names, light + dark).
3. **Roles** — `src/theme/roles.ts` (the component-facing API).
4. **Build** — `npm run tokens:build` (regenerates `dist/tokens.json`, `dist/theme.css`, `dist/tokens.tokens.json` — generated, don't hand-edit).
5. Commit the regenerated `dist/` artifacts so diffs are reviewable; `npm run tokens:diff` shows what changed vs. `HEAD`.

## ✅ Pull Request Process

1. `npm test` passes (unit + Storybook/Playwright tests).
2. `npm run lint` passes (ESLint, including `eslint-plugin-storybook` rules on story files).
3. `npm run docs:lint` passes.
4. `npm run build-storybook` succeeds.
5. `npm run tokens:build` succeeds if you touched any token file.

Component coverage is tracked in [`SHADCN_MIGRATION_STATUS.md`](./SHADCN_MIGRATION_STATUS.md) (the old hand-maintained `COMPONENT_COVERAGE.md` is archived — see `docs/archive/COMPONENT_COVERAGE.md`).

## Out of scope / anti-patterns

- No raw hex colors or hardcoded pixel spacing in components — see `CLAUDE.md`'s token rules.
- No duplicate variant stories that differ only by trivial args — prefer docs narrative if the distinction matters.
- No new root-level `.md` files — see `CLAUDE.md` → "Documentation Governance."
