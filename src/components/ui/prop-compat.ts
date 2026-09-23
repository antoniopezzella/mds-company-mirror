/**
 * The canonical `size` scale, and the compatibility layer that keeps the legacy
 * spellings working.
 *
 * Why this file exists
 * --------------------
 * The component set had grown SEVEN different `size` vocabularies. A developer
 * could not predict what a prop was called: `Avatar` took
 * `small|medium|large|xlarge`, `Tooltip` took `sm|md|lg`, `Dialog` exported
 * BOTH `sm|md|lg|fullscreen` and a PascalCase `Small|Medium|Large|FullScreen`,
 * and `Input` named the prop `inputSize` rather than `size` at all.
 *
 * `tone` is deliberately NOT unified the same way — see the note below it.
 *
 * Two normalisation idioms had also grown up independently — an inline ternary
 * chain in `button.tsx` and a `Record` lookup in `dialog.tsx`. This module is
 * the single implementation both now use, so a legacy alias is resolved one way
 * everywhere.
 *
 * The compatibility contract
 * --------------------------
 * Legacy spellings still work — nothing breaks on upgrade. They are marked
 * `@deprecated` so editors strike them through, they warn once per prop in
 * development, and they are removed at 1.0 per the deprecation window in
 * docs/CONTRIBUTING.md.
 *
 * The registry below is deliberately shaped like the token system's
 * `deprecatedTokens` in scripts/build-tokens.js: keyed by the deprecated thing,
 * carrying an explicit replacement and a human rationale. That shape is what
 * lets a checker validate the record itself — that every deprecated value names
 * a replacement, and that the replacement actually exists — rather than merely
 * flagging usage.
 */

/** The canonical size scale. `xl` exists only where a component genuinely has a fourth step. */
export type Size = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Action-severity tone — for components where the tone describes what an action
 * DOES: Button, Chip, Badge, Switch, MenuItem.
 *
 * `error` is deliberately NOT a member. See the note below.
 */
export type Tone = 'default' | 'danger' | 'success' | 'warning' | 'info';

/**
 * WHY FORM FIELDS USE `error` AND ACTIONS USE `danger`
 * ----------------------------------------------------
 * This looks like an inconsistency and is not. They are two different axes, and
 * collapsing them loses meaning:
 *
 *   - A form field's tone is the STATE OF ITS VALUE. `error` means "this failed
 *     validation" — the same concept as `aria-invalid`, the CSS `:invalid`
 *     pseudo-class, and WCAG 3.3.1, which is literally titled "Error
 *     Identification". Every form library a consumer already uses (React Hook
 *     Form, Formik, Zod) calls this `errors`.
 *
 *   - An action's tone is the SEVERITY OF WHAT IT DOES. `danger` means
 *     "this is destructive" — it says nothing about validity.
 *
 * A disabled delete button is `danger` and perfectly valid; an email field with
 * a typo is `error` and nothing is destructive about it.
 *
 * Every benchmarked system keeps these separate, and Shopify Polaris makes the
 * split explicit by using entirely different words: `error` on form fields,
 * `critical` on buttons. Carbon uses `invalid` / `danger`; Primer uses
 * `validationStatus="error"` / `variant="danger"`; MUI uses a boolean `error`
 * prop on TextField.
 *
 * So `InputTone` (input.tsx — shared by Input, Textarea, TextField and Select)
 * keeps `error`, and it is not aliased to `danger`. Both remain correct.
 */

/**
 * Legacy size spellings → canonical. Covers the `small|medium|large|xlarge`
 * family and Dialog's PascalCase `ModalSize`, which are the same concept
 * written three ways.
 */
export const SIZE_ALIASES = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  xlarge: 'xl',
  // Dialog's ModalSize — PascalCase, and the only vocabulary with a non-size
  // member, so `FullScreen` is handled by the caller rather than mapped here.
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const satisfies Record<string, Size>;

export type LegacySize = keyof typeof SIZE_ALIASES;

/**
 * The deprecation record. Machine-readable on purpose: `scripts/check-prop-vocab.js`
 * reads this to verify every legacy value still names a live replacement, the way
 * scripts/validate-tokens.js validates the token deprecations.
 */
export const DEPRECATED_PROP_VALUES: Record<
  string,
  { replaceWith: string; rationale: string }
> = {
  'size.small': { replaceWith: 'sm', rationale: 'Unified on the sm|md|lg|xl scale.' },
  'size.medium': { replaceWith: 'md', rationale: 'Unified on the sm|md|lg|xl scale.' },
  'size.large': { replaceWith: 'lg', rationale: 'Unified on the sm|md|lg|xl scale.' },
  'size.xlarge': { replaceWith: 'xl', rationale: 'Unified on the sm|md|lg|xl scale.' },
  'size.Small': { replaceWith: 'sm', rationale: 'ModalSize PascalCase retired; Dialog now uses one size vocabulary.' },
  'size.Medium': { replaceWith: 'md', rationale: 'ModalSize PascalCase retired; Dialog now uses one size vocabulary.' },
  'size.Large': { replaceWith: 'lg', rationale: 'ModalSize PascalCase retired; Dialog now uses one size vocabulary.' },
  'size.FullScreen': { replaceWith: 'fullscreen', rationale: 'ModalSize PascalCase retired; Dialog now uses one size vocabulary.' },
};

/**
 * Warn at most once per distinct legacy value, in development only.
 *
 * Before this, a consumer on `size="small"` got no signal at all that they were
 * on a deprecated path — the normalisation was silent, so the alias could
 * outlive several majors unnoticed. Once per value rather than once per render,
 * because a list of 200 avatars should not produce 200 identical warnings.
 */
const warned = new Set<string>();

function warnOnce(prop: 'size', legacy: string, canonical: string, component?: string) {
  if (process.env.NODE_ENV === 'production') return;
  const key = `${component ?? ''}:${prop}.${legacy}`;
  if (warned.has(key)) return;
  warned.add(key);
  const where = component ? `${component}: ` : '';
  console.warn(
    `[MDS] ${where}${prop}="${legacy}" is deprecated — use ${prop}="${canonical}". ` +
      `${DEPRECATED_PROP_VALUES[`${prop}.${legacy}`]?.rationale ?? ''} ` +
      `Legacy values are removed at 1.0; see docs/CONTRIBUTING.md.`,
  );
}

/** Test seam — the warn-once cache is module state and would otherwise leak between tests. */
export function __resetPropCompatWarnings() {
  warned.clear();
}

/**
 * Maps a union through the alias table at the type level, so the return type is
 * exactly as narrow as the input allowed.
 *
 * This matters: a naive `T | Size` return widens `'sm' | 'md' | 'small'` to
 * include `'lg'` and `'xl'`, which then fails to assign to a two-step prop like
 * `Input`'s `inputSize`. Distributing over the union keeps `Select`'s size
 * resolving to `'sm' | 'md'` and `Avatar`'s to `'sm' | 'md' | 'lg' | 'xl'`.
 */
type CanonicalSize<T extends string> = T extends LegacySize ? (typeof SIZE_ALIASES)[T] : T;

/**
 * Resolve a possibly-legacy size to the canonical scale.
 *
 * Accepts already-canonical values unchanged, so it is safe to call
 * unconditionally at the top of a component body.
 */
export function normalizeSize<T extends string>(
  value: T | undefined,
  component?: string,
): CanonicalSize<T> | undefined {
  if (value == null) return undefined;
  const mapped = (SIZE_ALIASES as Record<string, Size>)[value];
  if (!mapped) return value as CanonicalSize<T>;
  warnOnce('size', value, mapped, component);
  return mapped as CanonicalSize<T>;
}

