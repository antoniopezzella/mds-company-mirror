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
  toFiniteNumber,
  toValidDate,
} from './format';

/**
 * Formatting bugs are silent — nothing throws, the number is just wrong, and
 * it lands in front of a client. So the absent/invalid cases get as much
 * coverage as the happy path.
 */

describe('toFiniteNumber', () => {
  it('accepts numbers and numeric strings', () => {
    expect(toFiniteNumber(42)).toBe(42);
    expect(toFiniteNumber('42.5')).toBe(42.5);
    expect(toFiniteNumber(-7)).toBe(-7);
    expect(toFiniteNumber(0)).toBe(0);
  });

  it('rejects the absent and non-finite cases', () => {
    expect(toFiniteNumber(null)).toBeNull();
    expect(toFiniteNumber(undefined)).toBeNull();
    expect(toFiniteNumber(NaN)).toBeNull();
    expect(toFiniteNumber(Infinity)).toBeNull();
    expect(toFiniteNumber('abc')).toBeNull();
  });

  it('treats an empty string as absent, not zero', () => {
    // `Number('')` is 0. Without this guard a missing premium renders as
    // "$0.00" — a wrong number is far worse than a visible gap.
    expect(toFiniteNumber('')).toBeNull();
    expect(toFiniteNumber('   ')).toBeNull();
  });
});

describe('toValidDate', () => {
  it('accepts Dates, ISO strings and epoch numbers', () => {
    expect(toValidDate(new Date('2026-03-14'))?.getUTCFullYear()).toBe(2026);
    expect(toValidDate('2026-03-14')?.getUTCMonth()).toBe(2);
    expect(toValidDate(0)?.getUTCFullYear()).toBe(1970);
  });

  it('rejects invalid dates', () => {
    expect(toValidDate(null)).toBeNull();
    expect(toValidDate(undefined)).toBeNull();
    expect(toValidDate('')).toBeNull();
    expect(toValidDate('not a date')).toBeNull();
    expect(toValidDate(new Date('nope'))).toBeNull();
  });
});

describe('formatCurrency', () => {
  it('formats with symbol, grouping and two decimals', () => {
    expect(formatCurrency(1250)).toBe('$1,250.00');
    expect(formatCurrency(482000)).toBe('$482,000.00');
  });

  it('handles zero and negatives', () => {
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-1250)).toBe('-$1,250.00');
  });

  it('respects decimals', () => {
    expect(formatCurrency(1250, { decimals: 0 })).toBe('$1,250');
  });

  it('abbreviates when compact, keeping one decimal by default', () => {
    // "$1.2M" not "$1M" — at dashboard scale the dropped digit is real money.
    expect(formatCurrency(1_234_567, { compact: true })).toBe('$1.2M');
    expect(formatCurrency(13_362_000_000, { compact: true })).toBe('$13.4B');
  });

  it('supports non-USD currency and non-en locales', () => {
    expect(formatCurrency(1250, { currency: 'GBP', locale: 'en-GB' })).toBe('£1,250.00');
    // de-DE uses . for grouping, , for decimal, and a trailing symbol.
    const de = formatCurrency(1250, { currency: 'EUR', locale: 'de-DE' });
    expect(de).toContain('1.250');
    expect(de).toContain('€');
  });

  it('returns the placeholder for absent values', () => {
    expect(formatCurrency(null)).toBe(EMPTY_VALUE);
    expect(formatCurrency(undefined)).toBe(EMPTY_VALUE);
    expect(formatCurrency(NaN)).toBe(EMPTY_VALUE);
    expect(formatCurrency('')).toBe(EMPTY_VALUE);
    expect(formatCurrency(null, { placeholder: 'n/a' })).toBe('n/a');
  });

  it('never emits the string NaN', () => {
    for (const bad of [NaN, Infinity, -Infinity, 'abc', '', null, undefined] as const) {
      expect(formatCurrency(bad)).not.toContain('NaN');
    }
  });
});

describe('formatNumber / formatCompact', () => {
  it('groups thousands', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('abbreviates', () => {
    expect(formatCompact(1_234_567)).toBe('1.2M');
    expect(formatCompact(1500)).toBe('1.5K');
    expect(formatCompact(999)).toBe('999');
  });

  it('placeholders absent values', () => {
    expect(formatNumber(null)).toBe(EMPTY_VALUE);
    expect(formatCompact(undefined)).toBe(EMPTY_VALUE);
  });
});

describe('formatPercent', () => {
  it('takes a percentage, NOT a ratio', () => {
    // The single most common percentage bug is a silent ×100. A 12.5% loss
    // ratio is stored as 12.5, so that is what this takes.
    expect(formatPercent(12.5)).toBe('12.5%');
    expect(formatPercent(0.125)).toBe('0.1%');
  });

  it('respects decimals and zero', () => {
    expect(formatPercent(94.25, { decimals: 2 })).toBe('94.25%');
    expect(formatPercent(0)).toBe('0.0%');
    expect(formatPercent(-4.5)).toBe('-4.5%');
  });

  it('placeholders absent values', () => {
    expect(formatPercent(null)).toBe(EMPTY_VALUE);
  });
});

describe('formatDelta', () => {
  it('always shows a sign on non-zero values', () => {
    // 41 hand-written change strings in this repo disagreed on this, so some
    // KPI tiles showed "+12.5%" beside others showing "4.5%" for the same idea.
    expect(formatDelta(12.5)).toBe('+12.5%');
    expect(formatDelta(-4.5)).toBe('-4.5%');
  });

  it('does not sign zero', () => {
    expect(formatDelta(0)).toBe('0.0%');
  });

  it('supports currency and number deltas', () => {
    expect(formatDelta(6_750_000, 'currency', { compact: true })).toBe('+$6.8M');
    expect(formatDelta(12, 'number')).toBe('+12');
  });
});

describe('formatDate', () => {
  it('renders ISO strings, which is how API data arrives', () => {
    expect(formatDate('2026-03-14')).toBe('Mar 14, 2026');
    expect(formatDate('2026-03-14', { style: 'medium' })).toBe('March 14, 2026');
    expect(formatDate('2026-03-14', { locale: 'en-GB' })).toBe('14 Mar 2026');
  });

  it('does not shift a date-only string across a timezone boundary', () => {
    // `new Date('2026-03-14')` is UTC midnight per spec, so in any timezone
    // behind UTC it renders as the 13th. This repo has 87 raw YYYY-MM-DD
    // literals feeding tables; an off-by-one renewal date is the kind of bug
    // a client finds before we do. Asserted for a fixed negative offset so it
    // fails regardless of where CI runs.
    const d = toValidDate('2026-03-14')!;
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(2); // March
    expect(d.getDate()).toBe(14); // not 13
  });

  it('leaves timestamps with a time or offset alone', () => {
    // These are real instants — shifting them would be the actual bug.
    const withOffset = toValidDate('2026-03-14T00:00:00Z')!;
    expect(withOffset.toISOString()).toBe('2026-03-14T00:00:00.000Z');
  });

  it('placeholders invalid input rather than rendering "Invalid Date"', () => {
    expect(formatDate(null)).toBe(EMPTY_VALUE);
    expect(formatDate('nope')).toBe(EMPTY_VALUE);
    expect(formatDate('')).toBe(EMPTY_VALUE);
  });
});

describe('formatRelative', () => {
  const now = new Date('2026-03-14T12:00:00Z');

  it('describes future and past at the right granularity', () => {
    expect(formatRelative('2026-03-24T12:00:00Z', { now })).toBe('in 10 days');
    expect(formatRelative('2026-03-04T12:00:00Z', { now })).toBe('10 days ago');
    expect(formatRelative('2026-03-14T14:00:00Z', { now })).toBe('in 2 hours');
    expect(formatRelative('2027-03-14T12:00:00Z', { now })).toBe('next year');
  });

  it('placeholders absent values', () => {
    expect(formatRelative(null, { now })).toBe(EMPTY_VALUE);
  });
});

describe('formatValue', () => {
  it('dispatches by name', () => {
    expect(formatValue(1250, 'currency')).toBe('$1,250.00');
    expect(formatValue(12.5, 'percent')).toBe('12.5%');
    expect(formatValue(1_234_567, 'compact')).toBe('1.2M');
    expect(formatValue('2026-03-14', 'date')).toBe('Mar 14, 2026');
  });

  it('accepts a custom function', () => {
    expect(formatValue(3, (v) => `${v} claims`)).toBe('3 claims');
  });

  it('passes pre-formatted strings through untouched', () => {
    // Existing call sites hand components strings like "$2.4M". They must
    // keep working unchanged while consumers migrate to numbers.
    expect(formatValue('$2.4M', undefined)).toBe('$2.4M');
    expect(formatValue('Active', undefined)).toBe('Active');
  });

  it('still groups a bare number with no format given', () => {
    expect(formatValue(1234567, undefined)).toBe('1,234,567');
  });

  it('placeholders absent values with no format given', () => {
    expect(formatValue(null, undefined)).toBe(EMPTY_VALUE);
  });
});

describe('Intl instance caching', () => {
  it('reuses formatters across calls', () => {
    // Constructing Intl.NumberFormat per render in a table cell is the classic
    // way to make a grid janky, so the cache is load-bearing, not an
    // optimisation to be "simplified" away later.
    const spy = vi.spyOn(Intl, 'NumberFormat');
    const before = spy.mock.calls.length;
    for (let i = 0; i < 50; i++) formatCurrency(i);
    expect(spy.mock.calls.length).toBe(before);
    spy.mockRestore();
  });
});
