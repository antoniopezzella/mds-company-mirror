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
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens.js';
// Base mapping to semantic keys (light mode). Dark mode resolution merges overrides.
// NOTE: Keep each entry on its own line with the quoted role key first – tooling
// (e.g., governance report parser) relies on a simple regex to extract `role -> semantic`.
const ROLE_MAP = {
    'text.primary': { semantic: 'textPrimary', description: 'Primary body & UI text' },
    'text.secondary': { semantic: 'textSecondary', description: 'Secondary / muted text' },
    /**
     * @deprecated since 0.8.0; remove after 0.9.0 / 2027-01-09. Use `text.onAccent`.
     * Redundant alias of textOnAccent with a vague "inverse" meaning and zero
     * consumers. Content on an inverted/brand surface is the on-* pairing
     * (surface.primary + text.onPrimary), never an "inverse" token — see
     * docs/tasks/token-authority-decision.md.
     */
    'text.inverse': { semantic: 'textOnAccent', description: 'DEPRECATED — use text.onAccent' },
    'text.onAccent': { semantic: 'textOnAccent', description: 'Explicit readable text over accent surfaces' },
    'text.onInteractive': { semantic: 'textOnInteractive', description: 'Text/icons on interactive.primary|secondary|danger surfaces specifically — those lighten in dark mode instead of staying dark, so this differs from text.onAccent there' },
    'text.onHero': { semantic: 'textOnHero', description: 'Readable text over hero brand surface — mode-INVARIANT Sky, because hero surfaces stay dark in both modes. For a label on interactive.primary, which does flip, use text.onPrimary' },
    'text.onPrimary': {
        semantic: 'textOnPrimary',
        description: 'Label on interactive.primary — Sky in light, Midnight in dark, flipping with the fill beneath it (14.72:1 / 10.50:1). NOT text.primary, which is body text',
    },
    'text.onDanger': { semantic: 'textOnDanger', description: 'Readable text over destructive surfaces' },
    'text.onSuccess': { semantic: 'textOnSuccess', description: 'Readable text over solid success surfaces (white light / Midnight dark)' },
    'text.onWarning': { semantic: 'textOnWarning', description: 'Readable text over solid warning surfaces (Midnight; mode-invariant, white fails on gold)' },
    'text.onLight': { semantic: 'textOnLight', description: 'Mode-invariant dark text — for surfaces that stay light/mid-toned in both light and dark mode (e.g. warning gold), unlike text.onInteractive which flips per mode' },
    'text.disabled': { semantic: 'textDisabled', description: 'Disabled text/icon' },
    'text.placeholder': {
        semantic: 'textTertiary',
        description: 'Placeholder text in empty inputs. Distinct from text.disabled — a placeholder ' +
            'sits in an ENABLED field and must stay legible; disabled text is deliberately ' +
            'de-emphasised and is WCAG 1.4.3-exempt. Also distinct from text.secondary, ' +
            'which is real content.\n\n' +
            'Promotes `textTertiary`, which has existed since the Figma sync (bound to ' +
            '"V3/Text & icon/Placeholder" in figma-variable-map-semantic.json) but was ' +
            'reachable from no role. Because of that, input.tsx, textarea.tsx, command.tsx ' +
            'and input-group.tsx each faked it with `placeholder:opacity-70` or `-60` — ' +
            'three different values, none of them the token, each dimming whatever colour ' +
            'happened to be inherited rather than using the specified placeholder colour.',
    },
    'surface.default': { semantic: 'surfaceDefault', description: 'Default page / card background' },
    'surface.subtle': { semantic: 'surfaceSubtle', description: 'Subtle background blocks' },
    'surface.disabled': { semantic: 'surfaceDisabled', description: 'Disabled surface' },
    'surface.accent': { semantic: 'surfaceAccent', description: 'Accent background surfaces' },
    'surface.raised': {
        semantic: 'surfaceRaised',
        description: 'A panel sitting above the page. Same as default in light; lifted in dark',
    },
    'surface.secondary': { semantic: 'brandSecondary', description: 'Secondary brand surface - e.g. Sky Blue' },
    'surface.secondary.hover': { semantic: 'surfaceSecondaryHover', description: 'Lighter sky tint — hover overlay on sky-surface cards' },
    'surface.selected.subtle': {
        semantic: 'surfaceSelectedSubtle',
        description: 'Selected row/list-item fill — lighter than surface.selected so in-row content keeps its contrast',
    },
    'surface.row.hover': {
        semantic: 'surfaceRowHover',
        description: 'Hovered table row — Sky Blue in light, unchanged neutral in dark. Status badges inside a row must set variant="soft"/"solid": the default outline badge is transparent and a success badge measures 4.16:1 on Sky, under AA',
    },
    'surface.selected': { semantic: 'surfaceSelected', description: 'Selected row/list item on a default surface — brand tint. Row hover is surface.row.hover (also Sky), so the two are told apart by the selected row\'s left accent bar, not by hue' },
    'surface.navigation': { semantic: 'surfaceNavigation', description: 'Header and sidebar navigation background - distinct from action buttons' },
    'surface.navigation.hover': { semantic: 'surfaceNavigationHover', description: 'Hover state for navigation items' },
    'surface.navigation.active': { semantic: 'surfaceNavigationActive', description: 'Active/selected state for navigation items' },
    'surface.hero': { semantic: 'surfaceHero', description: 'Hero brand background surface' },
    'border.default': { semantic: 'borderDefault', description: 'Standard divider / outline' },
    'border.subtle': {
        semantic: 'borderSubtle',
        description: 'Hairline rules inside a dense surface — table rows, list dividers, grid shells',
    },
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
    'interactive.danger.active': { semantic: 'interactiveDangerActive', description: 'Destructive active' },
    'interactive.disabled.bg': {
        semantic: 'interactiveDisabledBg',
        description: "Disabled fill for interactive controls. Separate from surface.disabled, which is the general disabled surface — this one is Figma's Neutral/Gray/300 and is what every Button variant uses",
    },
    'interactive.disabled.fg': {
        semantic: 'interactiveDisabledFg',
        description: 'Disabled label/icon on interactive.disabled.bg. Separate from text.disabled for the same reason. The pair measures below 4.5:1 by design — WCAG 1.4.3 exempts inactive controls',
    }
};
/**
 * Resolve a role to its hex color for a given mode.
 * @param role RoleName string union
 * @param options.mode 'light' | 'dark' (defaults to 'light')
 * @returns Hex color string (e.g. #ffffff)
 * @throws if role is unknown (guards against stale component references)
 */
function currentDomMode() {
    if (typeof document === 'undefined')
        return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
export function getRoleColor(role, options = {}) {
    const entry = ROLE_MAP[role];
    if (!entry)
        throw new Error(`Unknown role: ${role}`);
    // Explicit `mode` (the MUI side always passes one, threaded from
    // ThemeModeContext) wins. Callers that omit it — most of the shadcn/ui
    // component set — fall back to the `dark` class on <html>, which
    // ThemeModeProvider keeps in sync with the same shared mode state. This
    // is what makes dark mode work across the library without having to
    // thread `mode` through every one of those call sites individually.
    const mode = options.mode || currentDomMode();
    const base = semanticColors[entry.semantic];
    if (mode === 'dark' && entry.semantic in semanticDarkOverrides) {
        return semanticDarkOverrides[entry.semantic] || base;
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
 * The name mapping (dots → dashes, camelCase segments preserved: `text.primary`
 * → `--role-text-primary`, `text.onInteractive` → `--role-text-onInteractive`)
 * lives HERE and only here. It was previously duplicated in
 * RoleVarsProvider.tsx's `roleNameToVar` and again in its test; both now import
 * this, so the transform has a single source of truth and cannot drift.
 */
export function roleVarName(role) {
    if (!ROLE_MAP[role])
        throw new Error(`Unknown role: ${role}`);
    // `.replace(/\./g, '-')`, not `.replaceAll`: roles.ts is also compiled under
    // tsconfig.tokens.json (build-tokens.js imports from it), whose lib target
    // predates String.replaceAll (ES2021). The global-regex replace is identical
    // and ancient-compatible. RoleVarsProvider's old copy of this used replaceAll
    // and compiled fine only because it's app-only code.
    return `--role-${role.replace(/\./g, '-')}`;
}
/** `var(--role-…)` wrapping {@link roleVarName}. The value to assign in a style. */
export function roleVar(role) {
    return `var(${roleVarName(role)})`;
}
/**
 * Enumerate roles with metadata (semantic key + description) to feed documentation
 * tables, snapshots, and governance scripts.
 */
export function listRoles() {
    return Object.entries(ROLE_MAP).map(([role, { semantic, description }]) => ({ role: role, semantic, description }));
}
// For validation / testing
export const __ROLE_MAP = ROLE_MAP;
