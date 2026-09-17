/**
 * roles.ts
 * ---------------------------------------------------------------------------
 * PURPOSE
 * A consumption-intent layer that sits above semantic tokens. Components must
 * use roles (e.g. `text.primary`, `surface.subtle`, `status.success.bg`) rather
 * than referencing primitive or semantic tokens directly. This indirection:
 *   - Decouples component styling from underlying semantic naming / palette shifts
 *   - Eases introduction of additional modes (dark, high-contrast, brand variants)
 *   - Enables governance (lint / tests) to validate a finite, meaningful set
 *   - Centralizes description & future deprecation metadata
 *
 * AUTHORING GUIDELINES
 * 1. Name Pattern: `<category>.<subCategory>[.<state>]` using lowercase kebabless segments.
 *    Examples: `text.primary`, `surface.accent`, `interactive.primary.hover`.
 * 2. Avoid mirroring primitive or semantic token names one-to-one; use intent vocabulary.
 * 3. Add a concise description (user-facing / dev-friendly) – keep it action oriented.
 * 4. Prefer reusing existing roles over adding near-synonyms; propose new roles ONLY when
 *    a distinct recurring intent emerges in ≥2 components.
 * 5. Dark / mode overrides: Adjust in `semanticDarkOverrides` (semantic layer) so roles
 *    remain a stable interface.
 * 6. Deprecation: Mark a role with a `@deprecated` tag in its description comment (future enhancement
 *    may surface that via governance tooling).
 *
 * CSS-VAR ACCESS
 * Contexts that can't call `getRoleColor()` directly (.module.scss files,
 * :hover/:active/::before selectors) can use `var(--role-<dotted.name>)`
 * instead — see `RoleVarsProvider.tsx`, mounted once in `main.tsx`. Same
 * roles-only rule applies either way; there is no CSS-var access to
 * primitives or semantics.
 *
 * TESTING & GOVERNANCE
 * - `roles.mapping.test.ts`: basic resolution contract.
 * - `roles.snapshot.test.ts`: snapshot of light/dark resolved values (intentional updates require review).
 * - `roles.contrast.test.ts`: enforces contrast guardrails (enforced vs monitored pairs).
 * - `scripts/check-role-usage.js`: prevents primitive / semantic leakage.
 * - `scripts/report-governance.js`: aggregates role usage + contrast status.
 *
 * HOW TO ADD A ROLE
 * 1. Append to `RoleName` union.
 * 2. Add mapping entry in `ROLE_MAP` with `semantic` + `description`.
 * 3. Run: `npm run roles:check && npx vitest run src/__tests__/roles.mapping.test.ts`.
 * 4. Update documentation table (`25-Roles.mdx`) if necessary (auto-pulls via listRoles()).
 * 5. If role is text-on-surface, consider adding a contrast pair in `roles.contrast.test.ts`.
 *
 * RELATED DOCS: See Storybook page: Foundations / Roles.
 */

import { semanticColors, semanticDarkOverrides, type SemanticColorName } from '../semantic-tokens.js';

export type RoleName =
  | 'text.primary'
  | 'text.secondary'
  | 'text.inverse'
  | 'text.onAccent'
  | 'text.onInteractive'
  | 'text.onHero'
  | 'text.onDanger'
  | 'text.onLight'
  | 'text.disabled'
  | 'surface.default'
  | 'surface.subtle'
  | 'surface.disabled'
  | 'surface.accent'
  | 'surface.secondary'
  | 'surface.secondary.hover'
  | 'surface.hover'
  | 'surface.selected'
  | 'surface.navigation'
  | 'surface.navigation.hover'
  | 'surface.navigation.active'
  | 'surface.hero'
  | 'border.default'
  | 'border.strong'
  | 'focus.ring'
  | 'status.success.fg'
  | 'status.success.bg'
  | 'status.success.border'
  | 'status.warning.fg'
  | 'status.warning.bg'
  | 'status.warning.border'
  | 'status.danger.fg'
  | 'status.danger.bg'
  | 'status.danger.border'
  | 'status.info.fg'
  | 'status.info.bg'
  | 'status.info.border'
  | 'brand.accent'
  | 'interactive.accent.hover'
  | 'interactive.accent.active'
  | 'interactive.primary'
  | 'interactive.primary.hover'
  | 'interactive.primary.active'
  | 'interactive.secondary'
  | 'interactive.secondary.hover'
  | 'interactive.secondary.active'
  | 'interactive.danger'
  | 'interactive.danger.hover'
  | 'interactive.danger.active';

interface RoleMapEntry {
  semantic: SemanticColorName;
  description: string;
}

// Base mapping to semantic keys (light mode). Dark mode resolution merges overrides.
// NOTE: Keep each entry on its own line with the quoted role key first – tooling
// (e.g., governance report parser) relies on a simple regex to extract `role -> semantic`.
const ROLE_MAP: Record<RoleName, RoleMapEntry> = {
  'text.primary': { semantic: 'textPrimary', description: 'Primary body & UI text' },
  'text.secondary': { semantic: 'textSecondary', description: 'Secondary / muted text' },
  'text.inverse': { semantic: 'textOnAccent', description: 'Text on accent or inverse surfaces' },
  'text.onAccent': { semantic: 'textOnAccent', description: 'Explicit readable text over accent surfaces' },
  'text.onInteractive': { semantic: 'textOnInteractive', description: 'Text/icons on interactive.primary|secondary|danger surfaces specifically — those lighten in dark mode instead of staying dark, so this differs from text.onAccent there' },
  'text.onHero': { semantic: 'textOnHero', description: 'Readable text over hero brand surface' },
  'text.onDanger': { semantic: 'textOnDanger', description: 'Readable text over destructive surfaces' },
  'text.onLight': { semantic: 'textOnLight', description: 'Mode-invariant dark text — for surfaces that stay light/mid-toned in both light and dark mode (e.g. warning gold), unlike text.onInteractive which flips per mode' },
  'text.disabled': { semantic: 'textDisabled', description: 'Disabled text/icon' },
  'surface.default': { semantic: 'surfaceDefault', description: 'Default page / card background' },
  'surface.subtle': { semantic: 'surfaceSubtle', description: 'Subtle background blocks' },
  'surface.disabled': { semantic: 'surfaceDisabled', description: 'Disabled surface' },
  'surface.accent': { semantic: 'surfaceAccent', description: 'Accent background surfaces' },
  'surface.secondary': { semantic: 'brandSecondary', description: 'Secondary brand surface - e.g. Sky Blue' },
  'surface.secondary.hover': { semantic: 'surfaceSecondaryHover', description: 'Lighter sky tint — hover overlay on sky-surface cards' },
  'surface.hover': { semantic: 'surfaceHover', description: 'Hover state for rows/list items on a default surface — sky tint in light, blue975 in dark' },
  'surface.selected': { semantic: 'surfaceSelected', description: 'Selected row/list item on a default surface — always reads stronger than surface.hover' },
  'surface.navigation': { semantic: 'surfaceNavigation', description: 'Header and sidebar navigation background - distinct from action buttons' },
  'surface.navigation.hover': { semantic: 'surfaceNavigationHover', description: 'Hover state for navigation items' },
  'surface.navigation.active': { semantic: 'surfaceNavigationActive', description: 'Active/selected state for navigation items' },
  'surface.hero': { semantic: 'surfaceHero', description: 'Hero brand background surface' },
  'border.default': { semantic: 'borderDefault', description: 'Standard divider / outline' },
  'border.strong': { semantic: 'borderStrong', description: 'Emphasized divider / outline' },
  'focus.ring': { semantic: 'focusRing', description: 'Focus outline / ring' },
  'brand.accent': { semantic: 'brandAccent', description: 'Brand gold accent - eyebrow dashes, decorative elements' },
  'interactive.accent.hover': { semantic: 'interactiveAccentHover', description: 'Gold accent hover (Button primaryAlt variant)' },
  'interactive.accent.active': { semantic: 'interactiveAccentActive', description: 'Gold accent active (Button primaryAlt variant)' },
  'status.success.fg': { semantic: 'statusSuccessText', description: 'Success text/icon color' },
  'status.success.bg': { semantic: 'statusSuccessBg', description: 'Success background' },
  'status.success.border': { semantic: 'statusSuccessBorder', description: 'Success border color' },
  'status.warning.fg': { semantic: 'statusWarningText', description: 'Warning text/icon color' },
  'status.warning.bg': { semantic: 'statusWarningBg', description: 'Warning background' },
  'status.warning.border': { semantic: 'statusWarningBorder', description: 'Warning border color' },
  'status.danger.fg': { semantic: 'statusDangerText', description: 'Danger text/icon color' },
  'status.danger.bg': { semantic: 'statusDangerBg', description: 'Danger background' },
  'status.danger.border': { semantic: 'statusDangerBorder', description: 'Danger border color' },
  'status.info.fg': { semantic: 'statusInfoText', description: 'Informational text/icon color' },
  'status.info.bg': { semantic: 'statusInfoBg', description: 'Informational background' },
  'status.info.border': { semantic: 'statusInfoBorder', description: 'Informational border color' },
  'interactive.primary': { semantic: 'interactivePrimary', description: 'Primary interactive base' },
  'interactive.primary.hover': { semantic: 'interactivePrimaryHover', description: 'Primary interactive hover' },
  'interactive.primary.active': { semantic: 'interactivePrimaryActive', description: 'Primary interactive active' },
  'interactive.secondary': { semantic: 'interactiveSecondary', description: 'Secondary interactive base (Active Blue)' },
  'interactive.secondary.hover': { semantic: 'interactiveSecondaryHover', description: 'Secondary interactive hover' },
  'interactive.secondary.active': { semantic: 'interactiveSecondaryActive', description: 'Secondary interactive active' },
  'interactive.danger': { semantic: 'interactiveDanger', description: 'Destructive interactive base' },
  'interactive.danger.hover': { semantic: 'interactiveDangerHover', description: 'Destructive hover' },
  'interactive.danger.active': { semantic: 'interactiveDangerActive', description: 'Destructive active' }
};

export interface ResolveRoleOptions { mode?: 'light' | 'dark'; }

/**
 * Resolve a role to its hex color for a given mode.
 * @param role RoleName string union
 * @param options.mode 'light' | 'dark' (defaults to 'light')
 * @returns Hex color string (e.g. #ffffff)
 * @throws if role is unknown (guards against stale component references)
 */
function currentDomMode(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function getRoleColor(role: RoleName, options: ResolveRoleOptions = {}): string {
  const entry = ROLE_MAP[role];
  if (!entry) throw new Error(`Unknown role: ${role}`);
  // Explicit `mode` (the MUI side always passes one, threaded from
  // ThemeModeContext) wins. Callers that omit it — most of the shadcn/ui
  // component set — fall back to the `dark` class on <html>, which
  // ThemeModeProvider keeps in sync with the same shared mode state. This
  // is what makes dark mode work across the library without having to
  // thread `mode` through every one of those call sites individually.
  const mode = options.mode || currentDomMode();
  const base = semanticColors[entry.semantic];
  if (mode === 'dark' && entry.semantic in semanticDarkOverrides) {
    return semanticDarkOverrides[entry.semantic as SemanticColorName] || base;
  }
  return base;
}

/**
 * Enumerate roles with metadata (semantic key + description) to feed documentation
 * tables, snapshots, and governance scripts.
 */
export function listRoles() {
  return Object.entries(ROLE_MAP).map(([role, { semantic, description }]) => ({ role: role as RoleName, semantic, description }));
}

// For validation / testing
export const __ROLE_MAP = ROLE_MAP;
