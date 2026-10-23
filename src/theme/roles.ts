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
import { mdsColor, type MdsColorToken } from '../tokens/figma/mds-color-values.generated.js';

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
  /**
   * The Figma token this role is PINNED to. When present it wins over
   * `semantic`, in both resolution paths — getRoleColor() and the
   * roles.generated.css that build-tokens.js emits — so the hex in an inline
   * style and the value behind `var(--role-…)` cannot disagree.
   *
   * 31 of 59 roles are pinned. The other 28 have no token of that meaning in
   * the Figma export and still resolve through `semantic`: the `interactive.*`
   * family (a code-specific button layer), `bg.shell*`/`bg.row-hover`/
   * `bg.raised`/`bg.selected.subtle`/`bg.secondary.hover`, `border.strong`,
   * `fg.on-dark`/`fg.on-light`/`fg.on-interactive`, `data.1-5` (no data tokens
   * in this export) and the legacy `text.onPrimary`. Closing that gap means
   * adding tokens in Figma, not inventing them here — see
   * docs/tasks/token-pipeline-migration.md step 4.
   */
  token?: MdsColorToken;
}

// Base mapping to semantic keys (light mode). Dark mode resolution merges overrides.
// NOTE: Keep each entry on its own line with the quoted role key first – tooling
// (e.g., governance report parser) relies on a simple regex to extract `role -> semantic`.
const ROLE_MAP: Record<RoleName, RoleMapEntry> = {

  // ── QUARANTINED: three roles deliberately NOT pinned (2026-10-22) ─────────
  // Each has a same-named Figma token, and each one FAILED a measured gate
  // when pinned. Recorded here rather than silently skipped, because the
  // obvious reading — "the names match, so pin it" — is the wrong one:
  //
  //   fg.on-accent
  //     Figma's foreground/on-accent means text ON THE GOLD ACCENT (#000f47
  //     navy). This role is used as "text on a dark surface" (white) — 5
  //     getRoleColor + 2 var() call sites, incl. the MUI side navigation.
  //     Pinning it put #000f47 on #333f6b: 1.78:1, and broke 6 stories. The
  //     names collide; the meanings do not.
  //
  //   fg.on-primary
  //     Only coherent together with bg.primary, which is quarantined below:
  //     Figma flips the pair in Dark (surface #000f47 -> #3d7aff, text
  //     #ceecff -> #000f47). Pinning one half gives navy text on navy, 1.0:1.
  //
  //   bg.primary
  //     Figma's Dark value #3d7aff against border.focus #5e9aff is 1.39:1
  //     where the enforced pair needs 3.0 ('border.focus' on 'bg.primary',
  //     roles.contrast.test.ts:44). A focus ring that cannot be seen on the
  //     surface it rings.
  //
  //
  //
  // All four are value disagreements with Figma, not code defects: resolving
  // them means a decision in Figma (or a mode-aware pairing in the component),
  // not a different mapping here. Until then they resolve through `semantic`.
  // ──────────────────────────────────────────────────────────────────────────
  // ── Figma-aligned Phase-3 aliases ──
  'fg.primary': { semantic: 'fg.primary', token: 'color.foreground.primary.default', description: 'Figma-aligned (Phase 3) — alias of text.primary.' },
  'fg.neutral.subtle': { semantic: 'fg.neutral.subtle', token: 'color.foreground.neutral.subtle', description: 'Figma-aligned (Phase 3) — alias of text.secondary.' },
  'fg.on-dark': { semantic: 'fg.on-accent', description: 'Figma-aligned (Phase 3) — alias of text.inverse.' },
  'fg.disabled': { semantic: 'fg.disabled', token: 'color.foreground.disabled', description: 'Figma-aligned (Phase 3) — alias of text.disabled.' },
  'fg.input.placeholder': { semantic: 'fg.input.placeholder', token: 'color.foreground.input.placeholder', description: 'Figma-aligned (Phase 3) — alias of text.placeholder.' },
  'fg.on-accent': { semantic: 'fg.on-accent', description: 'Figma-aligned (Phase 3) — alias of text.onAccent.' },
  'fg.on-interactive': { semantic: 'fg.on-interactive', description: 'Figma-aligned (Phase 3) — alias of text.onInteractive.' },
  'fg.on-primary': { semantic: 'fg.on-primary', description: 'Figma-aligned (Phase 3) — alias of text.onHero.' },
  'fg.on-success': { semantic: 'fg.on-success', token: 'color.foreground.on-success', description: 'Figma-aligned (Phase 3) — alias of text.onSuccess.' },
  'fg.on-warning': { semantic: 'fg.on-warning', token: 'color.foreground.on-warning', description: 'Figma-aligned (Phase 3) — alias of text.onWarning.' },
  'fg.on-critical': { semantic: 'fg.on-critical', token: 'color.foreground.on-critical', description: 'Figma-aligned (Phase 3) — alias of text.onDanger.' },
  'fg.on-light': { semantic: 'fg.on-light', description: 'Figma-aligned (Phase 3) — alias of text.onLight.' },
  'fg.success': { semantic: 'fg.success', token: 'color.foreground.success.default', description: 'Figma-aligned (Phase 3) — alias of status.success.fg.' },
  'fg.warning': { semantic: 'fg.warning', token: 'color.foreground.warning.default', description: 'Figma-aligned (Phase 3) — alias of status.warning.fg.' },
  'fg.critical': { semantic: 'fg.critical', token: 'color.foreground.critical.default', description: 'Figma-aligned (Phase 3) — alias of status.danger.fg.' },
  'fg.info': { semantic: 'fg.info', token: 'color.foreground.info.default', description: 'Figma-aligned (Phase 3) — alias of status.info.fg.' },
  'bg.default': { semantic: 'bg.default', token: 'color.background.default', description: 'Figma-aligned (Phase 3) — alias of surface.default.' },
  'bg.neutral.subtle': { semantic: 'bg.neutral.subtle', token: 'color.background.neutral.subtle', description: 'Figma-aligned (Phase 3) — alias of surface.subtle.' },
  'bg.disabled': { semantic: 'bg.disabled', token: 'color.background.disabled.default', description: 'Figma-aligned (Phase 3) — alias of surface.disabled.' },
  'bg.raised': { semantic: 'bg.raised', description: 'Figma-aligned (Phase 3) — alias of surface.raised.' },
  'bg.secondary': { semantic: 'bg.secondary', token: 'color.background.secondary.default', description: 'Figma-aligned (Phase 3) — alias of surface.secondary.' },
  'bg.secondary.hover': { semantic: 'bg.secondary.hover', description: 'Figma-aligned (Phase 3) — alias of surface.secondary-hover.' },
  'bg.selected.subtle': { semantic: 'bg.selected.subtle', description: 'Figma-aligned (Phase 3) — alias of surface.selected-subtle.' },
  'bg.row-hover': { semantic: 'bg.row-hover', description: 'Figma-aligned (Phase 3) — alias of surface.row-hover.' },
  'bg.selected': { semantic: 'bg.selected', token: 'color.background.selected', description: 'Figma-aligned (Phase 3) — alias of surface.selected.' },
  'bg.shell': { semantic: 'bg.shell', description: 'Figma-aligned (Phase 3) — alias of surface.navigation.' },
  'bg.shell.hover': { semantic: 'bg.shell.hover', description: 'Figma-aligned (Phase 3) — alias of surface.navigation-hover.' },
  'bg.shell.active': { semantic: 'bg.shell.active', description: 'Figma-aligned (Phase 3) — alias of surface.navigation-active.' },
  'bg.primary': { semantic: 'bg.primary', description: 'Figma-aligned (Phase 3) — alias of surface.hero.' },
  'bg.accent': { semantic: 'bg.accent', token: 'color.background.accent.default', description: 'Figma-aligned (Phase 3) — alias of brand.accent.' },
  'bg.success.subtle': { semantic: 'bg.success.subtle', token: 'color.background.success.subtle', description: 'Figma-aligned (Phase 3) — alias of status.success.bg.' },
  'bg.warning.subtle': { semantic: 'bg.warning.subtle', token: 'color.background.warning.subtle', description: 'Figma-aligned (Phase 3) — alias of status.warning.bg.' },
  'bg.critical.subtle': { semantic: 'bg.critical.subtle', token: 'color.background.critical.subtle', description: 'Figma-aligned (Phase 3) — alias of status.danger.bg.' },
  'bg.info.subtle': { semantic: 'bg.info.subtle', token: 'color.background.info.subtle', description: 'Figma-aligned (Phase 3) — alias of status.info.bg.' },
  'border.focus': { semantic: 'border.focus', token: 'color.border.focus.default', description: 'Figma-aligned (Phase 3) — alias of focus.ring.' },
  'border.success': { semantic: 'border.success', token: 'color.border.success.default', description: 'Figma-aligned (Phase 3) — alias of status.success.border.' },
  'border.warning': { semantic: 'border.warning', token: 'color.border.warning.default', description: 'Figma-aligned (Phase 3) — alias of status.warning.border.' },
  'border.critical': { semantic: 'border.critical', token: 'color.border.critical.default', description: 'Figma-aligned (Phase 3) — alias of status.danger.border.' },
  'border.info': { semantic: 'border.info', token: 'color.border.info.default', description: 'Figma-aligned (Phase 3) — alias of status.info.border.' },
  'data.1': { semantic: 'data.1', description: 'Figma-aligned (Phase 3) — alias of chart.1.' },
  'data.2': { semantic: 'data.2', description: 'Figma-aligned (Phase 3) — alias of chart.2.' },
  'data.3': { semantic: 'data.3', description: 'Figma-aligned (Phase 3) — alias of chart.3.' },
  'data.4': { semantic: 'data.4', description: 'Figma-aligned (Phase 3) — alias of chart.4.' },
  'data.5': { semantic: 'data.5', description: 'Figma-aligned (Phase 3) — alias of chart.5.' },
  /**
   * @deprecated since 0.8.0; remove after 0.9.0 / 2027-01-09. Use `text.onAccent`.
   * Redundant alias of fgOnAccent with a vague "inverse" meaning and zero
   * consumers. Content on an inverted/brand surface is the on-* pairing
   * (surface.primary + text.onPrimary), never an "inverse" token — see
   * docs/tasks/token-authority-decision.md.
   */
  'text.onPrimary': {
    token: 'color.foreground.on-primary',
    semantic: 'text.onPrimary',
    description:
      'Label on interactive.primary — Sky in light, Midnight in dark, flipping with the fill beneath it (14.72:1 / 10.50:1). NOT text.primary, which is body text',
  },
  'border.default': { semantic: 'border.default', token: 'color.border.default', description: 'Standard divider / outline' },
  'border.subtle': {
    token: 'color.border.subtle',
    semantic: 'border.subtle',
    description: 'Hairline rules inside a dense surface — table rows, list dividers, grid shells',
  },
  'border.strong': { semantic: 'border.strong', description: 'Emphasized divider / outline' },
  'interactive.accent.hover': { semantic: 'interactive.accent.hover', description: 'Gold accent hover (Button primaryAlt variant)' },
  'interactive.accent.active': { semantic: 'interactive.accent.active', description: 'Gold accent active (Button primaryAlt variant)' },
  'interactive.primary': { semantic: 'interactive.primary', description: 'Primary interactive base' },
  'interactive.primary.hover': { semantic: 'interactive.primary.hover', description: 'Primary interactive hover' },
  'interactive.primary.active': { semantic: 'interactive.primary.active', description: 'Primary interactive active' },
  'interactive.secondary': { semantic: 'interactive.secondary', description: 'Secondary interactive base (Active Blue)' },
  'interactive.secondary.hover': { semantic: 'interactive.secondary.hover', description: 'Secondary interactive hover' },
  'interactive.secondary.active': { semantic: 'interactive.secondary.active', description: 'Secondary interactive active' },
  'interactive.danger': { semantic: 'interactive.danger', description: 'Destructive interactive base' },
  'interactive.danger.hover': { semantic: 'interactive.danger.hover', description: 'Destructive hover' },
  'interactive.danger.active': { semantic: 'interactive.danger.active', description: 'Destructive active' },
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
  // `data-theme` first: it is the mechanism the generated token layer uses and
  // the one that outlives the class (see docs/tasks/token-pipeline-migration.md
  // step 2). Both are written today, so this only matters for a surface that
  // sets the attribute WITHOUT the class — a nested light card inside a navy
  // band — where reading the class would report the page mode and colour the
  // card's inline styles wrongly. Falls back to the class so anything setting
  // only the class (a consumer app, an old story decorator) still works.
  const attr = document.documentElement.dataset.theme;
  if (attr === 'dark' || attr === 'light') return attr;
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
  // Pinned to a Figma token → that is the answer, for every mode. No semantic
  // lookup, no dark-override merge: the export already carries all three modes.
  if (entry.token) return mdsColor(entry.token, mode);
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
