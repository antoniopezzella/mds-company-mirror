/**
 * Canonical `size` / `tone` vocabularies, and the compatibility layer that keeps
 * the legacy spellings working.
 *
 * Why this file exists
 * --------------------
 * The component set had grown SEVEN different `size` vocabularies and FOUR
 * `tone` vocabularies. A developer could not predict what a prop was called:
 * `Avatar` took `small|medium|large|xlarge`, `Tooltip` took `sm|md|lg`,
 * `Dialog` exported BOTH `sm|md|lg|fullscreen` and a PascalCase
 * `Small|Medium|Large|FullScreen`, and `Input` named the prop `inputSize`
 * rather than `size` at all.
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

/** The canonical tone scale. `danger`, never `error`. */
export type Tone = 'default' | 'danger' | 'success' | 'warning' | 'info';

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

/** Legacy tone spellings → canonical. */
export const TONE_ALIASES = {
  error: 'danger',
} as const satisfies Record<string, Tone>;

export type LegacySize = keyof typeof SIZE_ALIASES;
export type LegacyTone = keyof typeof TONE_ALIASES;

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
  'tone.error': { replaceWith: 'danger', rationale: 'The system uses `danger` for the destructive tone everywhere else.' },
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

function warnOnce(prop: 'size' | 'tone', legacy: string, canonical: string, component?: string) {
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
type CanonicalTone<T extends string> = T extends LegacyTone ? (typeof TONE_ALIASES)[T] : T;

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

/** Resolve a possibly-legacy tone to the canonical scale. */
export function normalizeTone<T extends string>(
  value: T | undefined,
  component?: string,
): CanonicalTone<T> | undefined {
  if (value == null) return undefined;
  const mapped = (TONE_ALIASES as Record<string, Tone>)[value];
  if (!mapped) return value as CanonicalTone<T>;
  warnOnce('tone', value, mapped, component);
  return mapped as CanonicalTone<T>;
}
