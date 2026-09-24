"use client"

import * as React from 'react';

import {
  EMPTY_VALUE,
  formatCompact,
  formatCurrency,
  formatDate,
  formatDelta,
  formatNumber,
  formatPercent,
  formatRelative,
  formatValue,
  type CurrencyFormatOptions,
  type DateFormatOptions,
  type Formattable,
  type FormatKind,
  type NumberFormatOptions,
} from './format';

/**
 * App-level locale and currency for every formatter.
 *
 * Without this, locale is a parameter every call site has to remember, which
 * is how this repo ended up with one `toLocaleString('en-US')` and nine bare
 * `toLocaleString()` calls that silently follow whatever locale the browser
 * happens to have. A user in Frankfurt and a user in New York saw different
 * thousands separators on the same premium, and nothing in the code said so.
 *
 * Set it once at the app root:
 *
 *     <FormatProvider locale="en-GB" currency="GBP">
 *       <App />
 *     </FormatProvider>
 *
 * Every formatter still works standalone — the provider is a convenience, not
 * a requirement, so a component library consumer is never forced to add it.
 */

export interface FormatConfig {
  locale: string;
  currency: string;
  placeholder: string;
}

const DEFAULT_CONFIG: FormatConfig = {
  locale: 'en-US',
  currency: 'USD',
  placeholder: EMPTY_VALUE,
};

const FormatContext = React.createContext<FormatConfig>(DEFAULT_CONFIG);

export interface FormatProviderProps extends Partial<FormatConfig> {
  children: React.ReactNode;
}

export function FormatProvider({ children, ...overrides }: FormatProviderProps) {
  const inherited = React.useContext(FormatContext);
  const value = React.useMemo<FormatConfig>(
    () => ({ ...inherited, ...stripUndefined(overrides) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- spread of primitives
    [inherited, overrides.locale, overrides.currency, overrides.placeholder]
  );
  return <FormatContext.Provider value={value}>{children}</FormatContext.Provider>;
}

/** Nested providers should inherit what they don't override, not clobber it. */
function stripUndefined(o: Partial<FormatConfig>): Partial<FormatConfig> {
  const out: Partial<FormatConfig> = {};
  if (o.locale !== undefined) out.locale = o.locale;
  if (o.currency !== undefined) out.currency = o.currency;
  if (o.placeholder !== undefined) out.placeholder = o.placeholder;
  return out;
}

/** The resolved locale/currency/placeholder in scope. */
export function useFormatConfig(): FormatConfig {
  return React.useContext(FormatContext);
}

/**
 * Formatters pre-bound to the ambient locale and currency.
 *
 * Prefer this inside components over importing the raw functions — it is the
 * difference between "formats consistently" and "formats consistently as long
 * as everyone remembers to pass locale".
 */
export function useFormat() {
  const config = useFormatConfig();

  return React.useMemo(() => {
    const base = { locale: config.locale, placeholder: config.placeholder };
    const money = { ...base, currency: config.currency };

    return {
      config,
      currency: (v: Formattable, o: CurrencyFormatOptions = {}) => formatCurrency(v, { ...money, ...o }),
      number: (v: Formattable, o: NumberFormatOptions = {}) => formatNumber(v, { ...base, ...o }),
      compact: (v: Formattable, o: NumberFormatOptions = {}) => formatCompact(v, { ...base, ...o }),
      percent: (v: Formattable, o: NumberFormatOptions = {}) => formatPercent(v, { ...base, ...o }),
      date: (v: Formattable, o: DateFormatOptions = {}) => formatDate(v, { ...base, ...o }),
      relative: (v: Formattable, o: DateFormatOptions = {}) => formatRelative(v, { ...base, ...o }),
      delta: (
        v: Formattable,
        as: 'percent' | 'number' | 'currency' = 'percent',
        o: CurrencyFormatOptions = {}
      ) => formatDelta(v, as, { ...money, ...o }),
      value: (
        v: Formattable,
        kind: FormatKind | ((value: Formattable) => string) | undefined,
        o: CurrencyFormatOptions & DateFormatOptions = {}
      ) => formatValue(v, kind, { ...money, ...o }),
    };
  }, [config]);
}
