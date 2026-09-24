import * as React from 'react';

/**
 * The shared size scale for every interactive control.
 *
 * Why this file exists
 * --------------------
 * Before it, `size="md"` meant two different heights depending on which
 * component you asked: Button rendered 48px (`h-12`) while Input and Select
 * rendered 40px (`h-10`). Put them in a row — which is what a filter bar,
 * a search field and a button group all are — and the button visibly towered
 * over the fields. Nothing caught it, because each component was internally
 * consistent and no page rendered them together.
 *
 * Four more controls (Textarea, Combobox, DatePicker, InputOTP) had no size
 * prop at all and had drifted to three different fixed heights: 40px, 32px
 * and 40px respectively.
 *
 * So the scale lives here, once, and every control reads from it. A height
 * that only exists in one component's cva block is how the drift started.
 *
 * The values
 * ----------
 * 32 / 40 / 48, shared by buttons and fields alike. This matches IBM Carbon,
 * the closest enterprise-dashboard peer, and keeps the field heights this
 * system already had while bringing Button down to meet them.
 *
 * Tailwind's scanner is plain text, so every class string below MUST stay a
 * literal. A computed `h-${n}` generates no CSS at all.
 */
export type ControlSize = 'sm' | 'md' | 'lg';

export const CONTROL_SIZES: readonly ControlSize[] = ['sm', 'md', 'lg'] as const;

/** Fixed height for single-line controls. Textarea opts out — it grows. */
export const CONTROL_HEIGHT: Record<ControlSize, string> = {
  sm: 'h-8', // 32px
  md: 'h-10', // 40px
  lg: 'h-12', // 48px
};

/** Horizontal padding. Scales with height so the text never looks pinched. */
export const CONTROL_PX: Record<ControlSize, string> = {
  sm: 'px-2.5', // 10px
  md: 'px-3', // 12px
  lg: 'px-4', // 16px
};

/**
 * Vertical padding, for controls without a fixed height (Textarea) and for
 * centring text in those with one.
 */
export const CONTROL_PY: Record<ControlSize, string> = {
  sm: 'py-1', // 4px
  md: 'py-2', // 8px
  lg: 'py-2.5', // 10px
};

/**
 * Type scale. `sm` stays at `text-sm` rather than dropping to `text-xs`:
 * 12px input text fails legibility expectations for data entry, and Select
 * was the only control doing it — an inconsistency this removes.
 */
export const CONTROL_TEXT: Record<ControlSize, string> = {
  sm: 'text-sm', // 14px
  md: 'text-sm', // 14px
  lg: 'text-base', // 16px
};

/** Leading/trailing icon size, so affordances scale with the control. */
export const CONTROL_ICON: Record<ControlSize, string> = {
  sm: 'size-3.5', // 14px
  md: 'size-4', // 16px
  lg: 'size-5', // 20px
};

/** Everything a single-line control needs, in one string. */
export function controlSizeClasses(size: ControlSize): string {
  return `${CONTROL_HEIGHT[size]} ${CONTROL_PX[size]} ${CONTROL_TEXT[size]}`;
}

/**
 * Size cascade for grouped controls.
 *
 * `ButtonGroup`/`InputGroup` publish their `size` here so every child adopts
 * it without the author repeating it — and, more importantly, so a group
 * containing a mismatched child is not expressible. An explicit prop on the
 * child still wins, for the rare deliberate exception.
 */
export const ControlSizeContext = React.createContext<ControlSize | undefined>(undefined);

/**
 * Resolve a control's size: explicit prop, else the enclosing group, else md.
 *
 * Call this in every control that accepts `size`. Reading the context
 * directly and falling back by hand is how one component ends up defaulting
 * differently from the rest.
 */
export function useControlSize(explicit?: ControlSize): ControlSize {
  const inherited = React.useContext(ControlSizeContext);
  return explicit ?? inherited ?? 'md';
}
