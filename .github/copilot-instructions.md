# Marsh Design System Platform — Agent Guide
---

## Advanced Governance & Output Quality (Figma MCP best practices)

- **Custom Rule Enforcement:**
  - Add or update custom governance rules in `scripts/check-role-usage.js` or MCP config. Validate with `npm run governance:ci`.

- **Accessibility & Contrast:**
  - All new tokens/components must pass `npm run tokens:contrast:all` and Storybook a11y checks before merging.

- **Deprecation & Migration:**
  - Mark deprecated tokens in `src/tokens.ts` meta, and provide a `replaceWith` field. Update governance scripts to block usage after cutoff.

- **Design-Dev Parity:**
  - When updating Figma tokens, ensure changes are reflected in `src/tokens.ts` and semantic/role mappings. Run full governance checks after sync.

- **Custom Output Validation:**
  - If using MCP or similar, add output validation scripts for generated code (e.g., checking for consistent naming, structure, or accessibility).
<!-- Workspace-specific instructions for AI coding agents. Keep this concise and factual to this repo. -->

# Marsh Design System Platform — Agent Guide

What this is
- Vite + React 19 + TypeScript design system platform using MUI 7 and Emotion.
- Node 22 required (package.json engines). Use CSS Modules (.module.scss/.module.css) for component styles.

Architecture (big picture)
- Tokens layering (do not bypass):
  1) Primitives: `src/tokens.ts` — raw palette values
  2) Semantics: `src/semantic-tokens.ts` — intent names + `semanticDarkOverrides`
  3) Roles: `src/theme/roles.ts` — the ONLY API components should consume
    - Use `getRoleColor('category.name')`. CI scripts flag direct `tokens.*` or `semanticColors.*` usage.
- Theme: `src/theme.ts` creates MUI themes (light/dark), typography, and a custom spacing function.
- Spacing: `src/spacing.ts` + `theme.spacing(index)`; defined indices map to explicit values, otherwise fallback 4px grid.
- Token build outputs: `dist/tokens.json` and `dist/theme.css` via `scripts/build-tokens.js`.

Component conventions
- Build on MUI primitives; keep props narrow and design-approved (see `src/components/Button/Button.tsx`).
- Colors via roles only, e.g. `getRoleColor('interactive.primary')` and state variants (e.g., `.hover`).
- Prefer `sx` and `theme.spacing(n)` over raw pixel values. Avoid `tokens.*`/`semanticColors.*` in components.
- Use CSS Modules for component styles (e.g., `Header.module.scss`).

Key workflows
- Dev: `npm run dev` (Task: “Vite: Dev Server”).
- Tests (Vitest + jsdom + Storybook addon): `npm test` | `npm run test:watch` | `npm run test:coverage`.
- Storybook: `npm run storybook` | build `npm run build-storybook` | clean caches `npm run storybook:clean`.
- Tokens/Governance:
  - Build tokens: `npm run tokens:build` (creates `dist/tokens.json`, `dist/theme.css`).
  - Full check (build + diff + validate + contrast): `npm run tokens:check`.
  - Role usage: `npm run roles:check` (add `:strict` to fail on violations).
  - Governance reports/badge: `npm run governance:ci` | `npm run governance:badge`.
  - Contrast badge: `npm run tokens:contrast:badge` (updates `contrast-badge.svg`).

CI quality gates (reference)
- `.github/workflows/ci.yml`, `governance.yml`, `contrast.yml` run token checks, governance, tests, build, and (on PR) Storybook build with artifacts.

Examples (follow these patterns)
- Role-based color in MUI:
  - `import { getRoleColor } from 'src/theme/roles'`
  - `sx={{ backgroundColor: getRoleColor('surface.accent'), '&:hover': { backgroundColor: getRoleColor('interactive.primary.hover') } }}`
- Spacing usage:
  - `sx={{ p: (theme) => theme.spacing(3), gap: (theme) => theme.spacing(2) }}`

Files to know
- Tokens: `src/tokens.ts`, `src/semantic-tokens.ts`, `src/spacing.ts`, `src/shadows.ts` (if present)
- Roles API: `src/theme/roles.ts` (union `RoleName`, tests in `src/__tests__/roles.*`)
- Theme: `src/theme.ts`
- Docs/Stories: `src/docs/*`, `.storybook/*`, and `src/components/**/*.stories.*`

Do/Don’t
- Do: add/adjust semantic tokens and dark overrides, then map via roles; update tests where intentional.
- Don’t: hardcode brand hex; use `tokens.*`/`semanticColors.*` directly in components; or raw pixel spacing.

If adding a new role
- Update `RoleName` and `ROLE_MAP` in `src/theme/roles.ts`, then run `npm run roles:check` and role tests (see `src/__tests__/roles.*`).
