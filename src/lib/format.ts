/**
 * Data formatting for dashboards.
 *
 * Why this exists
 * ---------------
 * Before it, `src/lib/` contained `cn()` and nothing else, and the entire repo
 * had exactly ONE `Intl.*` call site — in a story. Currency was produced four
 * different ways across 129 lines and 34 files, and all four shipped:
 *
 *     '$1,250.00'   '$12,400'   '$2.4M'   '$13.362B'   '$482,000'
 *
 * The cause was a type, not carelessness: `StatCard.value` and both
 * `MetricCard.value` props were declared `string`, so the type system *pushed*
 * formatting onto every consumer. Accepting `number` and formatting here is
 * what makes consistency the default rather than a convention nobody enforces.
 *
 * For an insurance product this is not cosmetic. Two premiums rendered with
 * different thousands separators on the same screen reads as a broken system.
 *
 * Design notes
 * ------------
 * - `Intl` objects are **cached**. Constructing `Intl.NumberFormat` is
 *   expensive and doing it per render in a table cell is the classic way to
 *   make a grid janky.
 * - Every formatter accepts `null`/`undefined`/`NaN` and returns a placeholder
 *   (em dash) rather than throwing or emitting "NaN". A silent `NaN` in a
 *   premium column is worse than an obvious gap.
 * - Locale and currency default to `en-US`/`USD` but are overridable per call,
 *   and per app via `FormatProvider` (see format-context.tsx).
 */

/** Anything a dashboard might hand a formatter, including the absent cases. */
export type Formattable = number | string | Date | null | undefined;

/** Rendered when a value is absent or not a number. An em dash, not "N/A". */
export const EMPTY_VALUE = '—';

export interface BaseFormatOptions {
  /** BCP 47 tag. Defaults to `en-US`. */
  locale?: string;
  /** Rendered when the value is null/undefined/NaN. Defaults to an em dash. */
  placeholder?: string;
}

export interface NumberFormatOptions extends BaseFormatOptions {
  /** Fixed number of decimal places. Omit to let Intl decide. */
  decimals?: number;
  /** Abbreviate: 1_200_000 -> "1.2M". */
  compact?: boolean;
  /** Force a leading + on positives. Useful for deltas. */
  signDisplay?: Intl.NumberFormatOptions['signDisplay'];
}

export interface CurrencyFormatOptions extends NumberFormatOptions {
  /** ISO 4217 code. Defaults to `USD`. */
  currency?: string;
}

export interface DateFormatOptions extends BaseFormatOptions {
  /**
   * `short`  → 14 Mar 2026
   * `medium` → 14 March 2026
   * `long`   → Saturday, 14 March 2026
   * `time`   → 14 Mar 2026, 15:04
   */
  style?: 'short' | 'medium' | 'long' | 'time';
}

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_CURRENCY = 'USD';

// ── Intl instance cache ─────────────────────────────────────────────────────
// Keyed by locale + a stable serialisation of the options. Intl constructors
// are among the most expensive things you can call in a render path.

const numberFormatters = new Map<string, Intl.NumberFormat>();
const dateFormatters = new Map<string, Intl.DateTimeFormat>();
const relativeFormatters = new Map<string, Intl.RelativeTimeFormat>();

function numberFormatter(locale: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  let f = numberFormatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat(locale, options);
    numberFormatters.set(key, f);
  }
  return f;
}

function dateFormatter(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  let f = dateFormatters.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(locale, options);
    dateFormatters.set(key, f);
  }
  return f;
}

function relativeFormatter(locale: string): Intl.RelativeTimeFormat {
  let f = relativeFormatters.get(locale);
  if (!f) {
    f = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    relativeFormatters.set(locale, f);
  }
  return f;
}

// ── Coercion ────────────────────────────────────────────────────────────────

/**
 * Narrow a `Formattable` to a finite number, or `null` when it cannot be one.
 *
 * Accepts numeric strings because real data arrives that way from JSON APIs —
 * but an empty or whitespace-only string is absent, not zero. `Number('')` is
 * `0`, which would silently render a missing premium as "$0.00".
 */
export function toFiniteNumber(value: Formattable): number | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/** `YYYY-MM-DD` with no time component. */
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Narrow a `Formattable` to a valid Date, or `null`.
 *
 * **Date-only strings are parsed as LOCAL midnight, not UTC.** Per spec,
 * `new Date('2026-03-14')` is UTC midnight, so in any timezone behind UTC it
 * renders as the 13th — a renewal date silently one day early. There are 87
 * raw `YYYY-MM-DD` literals in this repo feeding tables, so this is the
 * difference between correct dates and an off-by-one nobody notices until a
 * client does. Strings that carry a time or an offset are left alone: those
 * are real instants and shifting them would be the actual bug.
 */
export function toValidDate(value: Formattable): Date | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === 'number') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (value.trim() === '') return null;

  const dateOnly = DATE_ONLY.exec(value.trim());
  if (dateOnly) {
    const [, y, m, d] = dateOnly;
    const local = new Date(Number(y), Number(m) - 1, Number(d));
    return Number.isNaN(local.getTime()) ? null : local;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// ── Formatters ──────────────────────────────────────────────────────────────

/**
 * Currency. `formatCurrency(1250)` -> `"$1,250.00"`.
 *
 * `compact` gives `"$1.3K"`; pair it with `decimals` for control. Note that
 * compact currency is for KPI tiles — never for a column a user will sum by
 * eye, where the rounding hides real differences.
 */
export function formatCurrency(value: Formattable, options: CurrencyFormatOptions = {}): string {
  const {
    locale = DEFAULT_LOCALE,
    currency = DEFAULT_CURRENCY,
    decimals,
    compact = false,
    signDisplay,
    placeholder = EMPTY_VALUE,
  } = options;

  const n = toFiniteNumber(value);
  if (n === null) return placeholder;

  const intlOptions: Intl.NumberFormatOptions = { style: 'currency', currency };
  if (compact) intlOptions.notation = 'compact';
  if (decimals !== undefined) {
    intlOptions.minimumFractionDigits = decimals;
    intlOptions.maximumFractionDigits = decimals;
  } else if (compact) {
    // Compact currency defaults to one decimal — "$1.3M" not "$1M", which
    // loses too much precision at dashboard scale.
    intlOptions.maximumFractionDigits = 1;
  }
  if (signDisplay) intlOptions.signDisplay = signDisplay;

  return numberFormatter(locale, intlOptions).format(n);
}

/** Plain number with grouping. `formatNumber(1234567)` -> `"1,234,567"`. */
export function formatNumber(value: Formattable, options: NumberFormatOptions = {}): string {
  const {
    locale = DEFAULT_LOCALE,
    decimals,
    compact = false,
    signDisplay,
    placeholder = EMPTY_VALUE,
  } = options;

  const n = toFiniteNumber(value);
  if (n === null) return placeholder;

  const intlOptions: Intl.NumberFormatOptions = {};
  if (compact) intlOptions.notation = 'compact';
  if (decimals !== undefined) {
    intlOptions.minimumFractionDigits = decimals;
    intlOptions.maximumFractionDigits = decimals;
  }
  if (signDisplay) intlOptions.signDisplay = signDisplay;

  return numberFormatter(locale, intlOptions).format(n);
}

/**
 * Abbreviated number. `formatCompact(1234567)` -> `"1.2M"`, `formatCompact(999)`
 * -> `"999"`.
 *
 * Deliberately a *maximum* of one decimal rather than a fixed one: a fixed
 * decimal renders small counts as "999.0", which reads as a measurement rather
 * than a count.
 */
export function formatCompact(value: Formattable, options: NumberFormatOptions = {}): string {
  const { locale = DEFAULT_LOCALE, decimals, signDisplay, placeholder = EMPTY_VALUE } = options;

  const n = toFiniteNumber(value);
  if (n === null) return placeholder;

  const intlOptions: Intl.NumberFormatOptions = { notation: 'compact' };
  if (decimals !== undefined) {
    intlOptions.minimumFractionDigits = decimals;
    intlOptions.maximumFractionDigits = decimals;
  } else {
    intlOptions.maximumFractionDigits = 1;
  }
  if (signDisplay) intlOptions.signDisplay = signDisplay;

  return numberFormatter(locale, intlOptions).format(n);
}

/**
 * Percentage. **Takes a percentage, not a ratio**: `formatPercent(12.5)` ->
 * `"12.5%"`.
 *
 * This is deliberately NOT `Intl`'s `style: 'percent'`, which expects 0.125.
 * Dashboard data overwhelmingly arrives already expressed as a percentage
 * (a 12.5% loss ratio is stored as 12.5), and silently multiplying by 100 is
 * the single most common percentage bug. Pass a ratio through
 * `formatPercent(r * 100)` if yours differs.
 */
export function formatPercent(value: Formattable, options: NumberFormatOptions = {}): string {
  const {
    locale = DEFAULT_LOCALE,
    decimals = 1,
    signDisplay,
    placeholder = EMPTY_VALUE,
  } = options;

  const n = toFiniteNumber(value);
  if (n === null) return placeholder;

  const intlOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  };
  if (signDisplay) intlOptions.signDisplay = signDisplay;

  return `${numberFormatter(locale, intlOptions).format(n)}%`;
}

/**
 * A signed delta for trend display. `formatDelta(12.5, 'percent')` -> `"+12.5%"`.
 *
 * Always shows the sign, because a delta without one is ambiguous — 41
 * hand-written change strings in this repo disagreed about whether to include
 * it, so some KPI tiles showed "+12.5%" beside others showing "4.5%" meaning
 * the same thing.
 */
export function formatDelta(
  value: Formattable,
  as: 'percent' | 'number' | 'currency' = 'percent',
  options: CurrencyFormatOptions = {}
): string {
  const withSign = { signDisplay: 'exceptZero' as const, ...options };
  if (as === 'currency') return formatCurrency(value, withSign);
  if (as === 'number') return formatNumber(value, withSign);
  return formatPercent(value, withSign);
}

const DATE_STYLES: Record<NonNullable<DateFormatOptions['style']>, Intl.DateTimeFormatOptions> = {
  short: { day: 'numeric', month: 'short', year: 'numeric' },
  medium: { day: 'numeric', month: 'long', year: 'numeric' },
  long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  time: { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' },
};

/**
 * Date. `formatDate('2026-03-14')` -> `"14 Mar 2026"`.
 *
 * Accepts the ISO strings that arrive from APIs — 87 of which are currently
 * rendered raw into tables in this repo.
 */
export function formatDate(value: Formattable, options: DateFormatOptions = {}): string {
  const { locale = DEFAULT_LOCALE, style = 'short', placeholder = EMPTY_VALUE } = options;
  const d = toValidDate(value);
  if (d === null) return placeholder;
  return dateFormatter(locale, DATE_STYLES[style]).format(d);
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Relative time. `formatRelative(in30Days)` -> `"in 30 days"`.
 *
 * Renewal- and deadline-driven dashboards read better this way than with an
 * absolute date: "in 12 days" is actionable, "26 Mar 2026" needs arithmetic.
 * Pair it with the absolute date in a tooltip or a `title`.
 */
export function formatRelative(
  value: Formattable,
  options: BaseFormatOptions & { now?: Date } = {}
): string {
  const { locale = DEFAULT_LOCALE, placeholder = EMPTY_VALUE, now = new Date() } = options;
  const d = toValidDate(value);
  if (d === null) return placeholder;

  const diff = d.getTime() - now.getTime();
  const abs = Math.abs(diff);
  const rtf = relativeFormatter(locale);

  if (abs < HOUR) return rtf.format(Math.round(diff / MINUTE), 'minute');
  if (abs < DAY) return rtf.format(Math.round(diff / HOUR), 'hour');
  if (abs < 30 * DAY) return rtf.format(Math.round(diff / DAY), 'day');
  if (abs < 365 * DAY) return rtf.format(Math.round(diff / (30 * DAY)), 'month');
  return rtf.format(Math.round(diff / (365 * DAY)), 'year');
}

/** The named formats a component's `format` prop accepts. */
export type FormatKind = 'currency' | 'number' | 'compact' | 'percent' | 'date' | 'relative';

/**
 * Dispatch by name, for components that take a `format` prop rather than a
 * function. Keeps `<StatCard value={1250} format="currency" />` possible
 * without every component importing every formatter.
 */
export function formatValue(
  value: Formattable,
  kind: FormatKind | ((value: Formattable) => string) | undefined,
  options: CurrencyFormatOptions & DateFormatOptions = {}
): string {
  if (typeof kind === 'function') return kind(value);

  switch (kind) {
    case 'currency':
      return formatCurrency(value, options);
    case 'number':
      return formatNumber(value, options);
    case 'compact':
      return formatCompact(value, options);
    case 'percent':
      return formatPercent(value, options);
    case 'date':
      return formatDate(value, options);
    case 'relative':
      return formatRelative(value, options);
    default:
      // No format requested: pass strings through untouched (a pre-formatted
      // value or a label), and group bare numbers so at least the separators
      // are consistent.
      if (value === null || value === undefined) return options.placeholder ?? EMPTY_VALUE;
      if (typeof value === 'number') return formatNumber(value, options);
      if (value instanceof Date) return formatDate(value, options);
      return value;
  }
}
