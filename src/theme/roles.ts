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
  | 'fg.primary'
  | 'fg.neutral.subtle'
  | 'fg.on-dark'
  | 'fg.disabled'
  | 'fg.input.placeholder'
  | 'fg.on-accent'
  | 'fg.on-interactive'
  | 'fg.on-primary'
  | 'fg.on-success'
  | 'fg.on-warning'
  | 'fg.on-critical'
  | 'fg.on-light'
  | 'fg.success'
  | 'fg.warning'
  | 'fg.critical'
  | 'fg.info'
  | 'bg.default'
  | 'bg.neutral.subtle'
  | 'bg.disabled'
  | 'bg.raised'
  | 'bg.secondary'
  | 'bg.secondary.hover'
  | 'bg.selected.subtle'
  | 'bg.row-hover'
  | 'bg.selected'
  | 'bg.shell'
  | 'bg.shell.hover'
  | 'bg.shell.active'
  | 'bg.primary'
  | 'bg.accent'
  | 'bg.success.subtle'
  | 'bg.warning.subtle'
  | 'bg.critical.subtle'
  | 'bg.info.subtle'
  | 'border.focus'
  | 'border.success'
  | 'border.warning'
  | 'border.critical'
  | 'border.info'
  | 'data.1'
  | 'data.2'
  | 'data.3'
  | 'data.4'
  | 'data.5'
  | 'text.onPrimary'
  | 'surface.secondary.hover'
  | 'surface.row.hover'
  | 'surface.selected.subtle'
  | 'surface.navigation.hover'
  | 'surface.navigation.active'
  | 'border.default'
  | 'border.subtle'
  | 'border.strong'
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
  // ── Figma-aligned Phase-3 aliases ──
  'fg.primary': { semantic: 'textPrimary', description: 'Figma-aligned (Phase 3) — alias of text.primary.' },
  'fg.neutral.subtle': { semantic: 'textSecondary', description: 'Figma-aligned (Phase 3) — alias of text.secondary.' },
  'fg.on-dark': { semantic: 'textOnAccent', description: 'Figma-aligned (Phase 3) — alias of text.inverse.' },
  'fg.disabled': { semantic: 'textDisabled', description: 'Figma-aligned (Phase 3) — alias of text.disabled.' },
  'fg.input.placeholder': { semantic: 'textTertiary', description: 'Figma-aligned (Phase 3) — alias of text.placeholder.' },
  'fg.on-accent': { semantic: 'textOnAccent', description: 'Figma-aligned (Phase 3) — alias of text.onAccent.' },
  'fg.on-interactive': { semantic: 'textOnInteractive', description: 'Figma-aligned (Phase 3) — alias of text.onInteractive.' },
  'fg.on-primary': { semantic: 'textOnHero', description: 'Figma-aligned (Phase 3) — alias of text.onHero.' },
  'fg.on-success': { semantic: 'textOnSuccess', description: 'Figma-aligned (Phase 3) — alias of text.onSuccess.' },
  'fg.on-warning': { semantic: 'textOnWarning', description: 'Figma-aligned (Phase 3) — alias of text.onWarning.' },
  'fg.on-critical': { semantic: 'textOnDanger', description: 'Figma-aligned (Phase 3) — alias of text.onDanger.' },
  'fg.on-light': { semantic: 'textOnLight', description: 'Figma-aligned (Phase 3) — alias of text.onLight.' },
  'fg.success': { semantic: 'statusSuccessText', description: 'Figma-aligned (Phase 3) — alias of status.success.fg.' },
  'fg.warning': { semantic: 'statusWarningText', description: 'Figma-aligned (Phase 3) — alias of status.warning.fg.' },
  'fg.critical': { semantic: 'statusDangerText', description: 'Figma-aligned (Phase 3) — alias of status.danger.fg.' },
  'fg.info': { semantic: 'statusInfoText', description: 'Figma-aligned (Phase 3) — alias of status.info.fg.' },
  'bg.default': { semantic: 'surfaceDefault', description: 'Figma-aligned (Phase 3) — alias of surface.default.' },
  'bg.neutral.subtle': { semantic: 'surfaceSubtle', description: 'Figma-aligned (Phase 3) — alias of surface.subtle.' },
  'bg.disabled': { semantic: 'surfaceDisabled', description: 'Figma-aligned (Phase 3) — alias of surface.disabled.' },
  'bg.raised': { semantic: 'surfaceRaised', description: 'Figma-aligned (Phase 3) — alias of surface.raised.' },
  'bg.secondary': { semantic: 'brandSecondary', description: 'Figma-aligned (Phase 3) — alias of surface.secondary.' },
  'bg.secondary.hover': { semantic: 'surfaceSecondaryHover', description: 'Figma-aligned (Phase 3) — alias of surface.secondary-hover.' },
  'bg.selected.subtle': { semantic: 'surfaceSelectedSubtle', description: 'Figma-aligned (Phase 3) — alias of surface.selected-subtle.' },
  'bg.row-hover': { semantic: 'surfaceRowHover', description: 'Figma-aligned (Phase 3) — alias of surface.row-hover.' },
  'bg.selected': { semantic: 'surfaceSelected', description: 'Figma-aligned (Phase 3) — alias of surface.selected.' },
  'bg.shell': { semantic: 'surfaceNavigation', description: 'Figma-aligned (Phase 3) — alias of surface.navigation.' },
  'bg.shell.hover': { semantic: 'surfaceNavigationHover', description: 'Figma-aligned (Phase 3) — alias of surface.navigation-hover.' },
  'bg.shell.active': { semantic: 'surfaceNavigationActive', description: 'Figma-aligned (Phase 3) — alias of surface.navigation-active.' },
  'bg.primary': { semantic: 'surfaceHero', description: 'Figma-aligned (Phase 3) — alias of surface.hero.' },
  'bg.accent': { semantic: 'brandAccent', description: 'Figma-aligned (Phase 3) — alias of brand.accent.' },
  'bg.success.subtle': { semantic: 'statusSuccessBg', description: 'Figma-aligned (Phase 3) — alias of status.success.bg.' },
  'bg.warning.subtle': { semantic: 'statusWarningBg', description: 'Figma-aligned (Phase 3) — alias of status.warning.bg.' },
  'bg.critical.subtle': { semantic: 'statusDangerBg', description: 'Figma-aligned (Phase 3) — alias of status.danger.bg.' },
  'bg.info.subtle': { semantic: 'statusInfoBg', description: 'Figma-aligned (Phase 3) — alias of status.info.bg.' },
  'border.focus': { semantic: 'focusRing', description: 'Figma-aligned (Phase 3) — alias of focus.ring.' },
  'border.success': { semantic: 'statusSuccessBorder', description: 'Figma-aligned (Phase 3) — alias of status.success.border.' },
  'border.warning': { semantic: 'statusWarningBorder', description: 'Figma-aligned (Phase 3) — alias of status.warning.border.' },
  'border.critical': { semantic: 'statusDangerBorder', description: 'Figma-aligned (Phase 3) — alias of status.danger.border.' },
  'border.info': { semantic: 'statusInfoBorder', description: 'Figma-aligned (Phase 3) — alias of status.info.border.' },
  'data.1': { semantic: 'chartSeries1', description: 'Figma-aligned (Phase 3) — alias of chart.1.' },
  'data.2': { semantic: 'chartSeries2', description: 'Figma-aligned (Phase 3) — alias of chart.2.' },
  'data.3': { semantic: 'chartSeries3', description: 'Figma-aligned (Phase 3) — alias of chart.3.' },
  'data.4': { semantic: 'chartSeries4', description: 'Figma-aligned (Phase 3) — alias of chart.4.' },
  'data.5': { semantic: 'chartSeries5', description: 'Figma-aligned (Phase 3) — alias of chart.5.' },
  /**
   * @deprecated since 0.8.0; remove after 0.9.0 / 2027-01-09. Use `text.onAccent`.
   * Redundant alias of textOnAccent with a vague "inverse" meaning and zero
   * consumers. Content on an inverted/brand surface is the on-* pairing
   * (surface.primary + text.onPrimary), never an "inverse" token — see
   * docs/tasks/token-authority-decision.md.
   */
  'text.onPrimary': {
    semantic: 'textOnPrimary',
    description:
      'Label on interactive.primary — Sky in light, Midnight in dark, flipping with the fill beneath it (14.72:1 / 10.50:1). NOT text.primary, which is body text',
  },
  'surface.secondary.hover': { semantic: 'surfaceSecondaryHover', description: 'Lighter sky tint — hover overlay on sky-surface cards' },
  'surface.selected.subtle': {
    semantic: 'surfaceSelectedSubtle',
    description: 'Selected row/list-item fill — lighter than surface.selected so in-row content keeps its contrast',
  },
  'surface.row.hover': {
    semantic: 'surfaceRowHover',
    description:
      'Hovered table row — Sky Blue in light, unchanged neutral in dark. Status badges inside a row must set variant="soft"/"solid": the default outline badge is transparent and a success badge measures 4.16:1 on Sky, under AA',
  },
  'surface.navigation.hover': { semantic: 'surfaceNavigationHover', description: 'Hover state for navigation items' },
  'surface.navigation.active': { semantic: 'surfaceNavigationActive', description: 'Active/selected state for navigation items' },
  'border.default': { semantic: 'borderDefault', description: 'Standard divider / outline' },
  'border.subtle': {
    semantic: 'borderSubtle',
    description: 'Hairline rules inside a dense surface — table rows, list dividers, grid shells',
  },
  'border.strong': { semantic: 'borderStrong', description: 'Emphasized divider / outline' },
  'interactive.accent.hover': { semantic: 'interactiveAccentHover', description: 'Gold accent hover (Button primaryAlt variant)' },
  'interactive.accent.active': { semantic: 'interactiveAccentActive', description: 'Gold accent active (Button primaryAlt variant)' },
  'interactive.primary': { semantic: 'interactivePrimary', description: 'Primary interactive base' },
  'interactive.primary.hover': { semantic: 'interactivePrimaryHover', description: 'Primary interactive hover' },
  'interactive.primary.active': { semantic: 'interactivePrimaryActive', description: 'Primary interactive active' },
  'interactive.secondary': { semantic: 'interactiveSecondary', description: 'Secondary interactive base (Active Blue)' },
  'interactive.secondary.hover': { semantic: 'interactiveSecondaryHover', description: 'Secondary interactive hover' },
  'interactive.secondary.active': { semantic: 'interactiveSecondaryActive', description: 'Secondary interactive active' },
  'interactive.danger': { semantic: 'interactiveDanger', description: 'Destructive interactive base' },
  'interactive.danger.hover': { semantic: 'interactiveDangerHover', description: 'Destructive hover' },
  'interactive.danger.active': { semantic: 'interactiveDangerActive', description: 'Destructive active' },
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
 * The CSS custom property a role publishes, e.g. `var(--role-text-primary)`.
 *
 * This is the OVERRIDABLE counterpart to `getRoleColor()`. Where getRoleColor
 * bakes a resolved hex into an inline style — which no stylesheet can outrank,
 * so a consumer cannot retheme it — `roleVar()` returns a reference to the
 * custom property `RoleVarsProvider`/`roles.generated.css` publish, so a
 * consumer's `.dark` or brand scope wins from the cascade. Prefer this for any
 * colour that should be themeable; reach for `getRoleColor()` only when you
 * genuinely need the resolved hex at call time (a canvas fill, a computed
 * contrast check, or a mode explicitly forced via its options).
 *
 * The name mapping (dots → dashes, camelCase segments preserved: `interactive.primary`
 * → `--role-interactive-primary`, `text.onPrimary` → `--role-text-onPrimary`)
 * lives HERE and only here. It was previously duplicated in
 * RoleVarsProvider.tsx's `roleNameToVar` and again in its test; both now import
 * this, so the transform has a single source of truth and cannot drift.
 */
export function roleVarName(role: RoleName): string {
  if (!ROLE_MAP[role]) throw new Error(`Unknown role: ${role}`);
  // `.replace(/\./g, '-')`, not `.replaceAll`: roles.ts is also compiled under
  // tsconfig.tokens.json (build-tokens.js imports from it), whose lib target
  // predates String.replaceAll (ES2021). The global-regex replace is identical
  // and ancient-compatible. RoleVarsProvider's old copy of this used replaceAll
  // and compiled fine only because it's app-only code.
  return `--role-${role.replace(/\./g, '-')}`;
}

/** `var(--role-…)` wrapping {@link roleVarName}. The value to assign in a style. */
export function roleVar(role: RoleName): string {
  return `var(${roleVarName(role)})`;
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
