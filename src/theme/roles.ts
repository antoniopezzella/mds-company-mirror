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

import { semanticColors, semanticDarkOverrides, type SemanticColorName } from '../semantic-tokens';

export type RoleName =
  | 'text.primary'
  | 'text.secondary'
  | 'text.inverse'
  | 'text.onAccent'
  | 'text.onHero'
  | 'text.onDanger'
  | 'text.disabled'
  | 'surface.default'
  | 'surface.subtle'
  | 'surface.disabled'
  | 'surface.accent'
  | 'surface.secondary'
  | 'surface.navigation'
  | 'surface.navigation.hover'
  | 'surface.navigation.active'
  | 'surface.hero'
  | 'border.default'
  | 'border.strong'
  | 'focus.ring'
  | 'status.success.fg'
  | 'status.success.bg'
  | 'status.warning.fg'
  | 'status.warning.bg'
  | 'status.danger.fg'
  | 'status.danger.bg'
  | 'status.info.fg'
  | 'status.info.bg'
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
  'text.onHero': { semantic: 'textOnHero', description: 'Readable text over hero brand surface' },
  'text.onDanger': { semantic: 'textOnDanger', description: 'Readable text over destructive surfaces' },
  'text.disabled': { semantic: 'textDisabled', description: 'Disabled text/icon' },
  'surface.default': { semantic: 'surfaceDefault', description: 'Default page / card background' },
  'surface.subtle': { semantic: 'surfaceSubtle', description: 'Subtle background blocks' },
  'surface.disabled': { semantic: 'surfaceDisabled', description: 'Disabled surface' },
  'surface.accent': { semantic: 'surfaceAccent', description: 'Accent background surfaces' },
  'surface.secondary': { semantic: 'brandSecondary', description: 'Secondary brand surface - e.g. Sky Blue' },
  'surface.navigation': { semantic: 'surfaceNavigation', description: 'Header and sidebar navigation background - distinct from action buttons' },
  'surface.navigation.hover': { semantic: 'surfaceNavigationHover', description: 'Hover state for navigation items' },
  'surface.navigation.active': { semantic: 'surfaceNavigationActive', description: 'Active/selected state for navigation items' },
  'surface.hero': { semantic: 'surfaceHero', description: 'Hero brand background surface' },
  'border.default': { semantic: 'borderDefault', description: 'Standard divider / outline' },
  'border.strong': { semantic: 'borderStrong', description: 'Emphasized divider / outline' },
  'focus.ring': { semantic: 'focusRing', description: 'Focus outline / ring' },
  'status.success.fg': { semantic: 'statusSuccessText', description: 'Success text/icon color' },
  'status.success.bg': { semantic: 'statusSuccessBg', description: 'Success background' },
  'status.warning.fg': { semantic: 'statusWarningText', description: 'Warning text/icon color' },
  'status.warning.bg': { semantic: 'statusWarningBg', description: 'Warning background' },
  'status.danger.fg': { semantic: 'statusDangerText', description: 'Danger text/icon color' },
  'status.danger.bg': { semantic: 'statusDangerBg', description: 'Danger background' },
  'status.info.fg': { semantic: 'statusInfoText', description: 'Informational text/icon color' },
  'status.info.bg': { semantic: 'statusInfoBg', description: 'Informational background' },
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
export function getRoleColor(role: RoleName, options: ResolveRoleOptions = {}): string {
  const entry = ROLE_MAP[role];
  if (!entry) throw new Error(`Unknown role: ${role}`);
  const mode = options.mode || 'light';
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
