import { describe, it, expect } from 'vitest';

import {
  collectApplied,
  describeFilterValue,
  isFilterActive,
  resolveFilterFn,
  type FilterField,
} from './filter-schema';

const status: FilterField = {
  id: 'status',
  label: 'Status',
  type: 'multi',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' },
  ],
};
const premium: FilterField = { id: 'premium', label: 'Premium', type: 'numberRange', unit: 'currency' };
const renewal: FilterField = { id: 'renewal', label: 'Renewal', type: 'dateRange' };
const bound: FilterField = { id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound' };

describe('resolveFilterFn', () => {
  it('maps every field type to a REGISTERED matcher', () => {
    // v9 makes an unregistered filterFn a type error rather than a filter that
    // silently matches nothing — so this list must stay in step with
    // data-grid-features.ts.
    expect(resolveFilterFn({ id: 't', label: 'T', type: 'text' })).toBe('includesString');
    expect(resolveFilterFn({ id: 's', label: 'S', type: 'select', options: [] })).toBe('equals');
    expect(resolveFilterFn(status)).toBe('arrHas');
    expect(resolveFilterFn(renewal)).toBe('dateRange');
    expect(resolveFilterFn(premium)).toBe('inNumberRange');
    expect(resolveFilterFn(bound)).toBe('equals');
  });

  it('uses arrHas for multi-select, never arrIncludesSome', () => {
    // arrIncludesSome early-returns false unless the CELL is an array, so a
    // faceted filter over a plain string column matched zero rows. That
    // shipped once.
    expect(resolveFilterFn(status)).not.toBe('arrIncludesSome');
  });
});

describe('isFilterActive — an empty filter must not look applied', () => {
  it('treats empty collections and blank ranges as inactive', () => {
    expect(isFilterActive(status, [])).toBe(false);
    expect(isFilterActive(status, ['active'])).toBe(true);
    expect(isFilterActive(renewal, {})).toBe(false);
    expect(isFilterActive(renewal, { from: '2026-01-01' })).toBe(true);
    expect(isFilterActive(premium, {})).toBe(false);
    expect(isFilterActive(premium, { min: 0 })).toBe(true); // zero IS a bound
    expect(isFilterActive({ id: 't', label: 'T', type: 'text' }, '')).toBe(false);
  });

  it('treats false as an applied boolean, not an absent one', () => {
    // The classic bug: `if (!value)` drops "Unbound" entirely.
    expect(isFilterActive(bound, false)).toBe(true);
  });
});

describe('describeFilterValue states the UNIT', () => {
  it('renders a currency range as money, not bare digits', () => {
    // "Premium 500000 – 1000000" is ambiguous; the column already declares it
    // is currency, so the chip has no excuse.
    const out = describeFilterValue(premium, { min: 500000, max: 1000000 });
    expect(out).toMatch(/\$/);
    expect(out).not.toMatch(/^\d+ – \d+$/);
  });

  it('describes an open-ended range in words', () => {
    expect(describeFilterValue(premium, { min: 500000 })).toMatch(/^over \$/);
    expect(describeFilterValue(premium, { max: 500000 })).toMatch(/^under \$/);
  });

  it('formats a percent range as a percentage', () => {
    const pct: FilterField = { id: 'r', label: 'Rate', type: 'numberRange', unit: 'percent' };
    expect(describeFilterValue(pct, { min: 0.1 })).toMatch(/%/);
  });

  it('names a single multi-select value, and counts the rest', () => {
    // A list of five labels is longer than the column it filters.
    expect(describeFilterValue(status, ['active'])).toBe('Active');
    expect(describeFilterValue(status, ['active', 'pending'])).toBe('2 selected');
  });

  it('formats dates rather than echoing the ISO string', () => {
    const out = describeFilterValue(renewal, { from: '2026-01-15', to: '2026-03-31' });
    expect(out).not.toContain('2026-01-15');
    expect(out).toContain('–');
  });

  it('uses the field\'s own words for a boolean', () => {
    expect(describeFilterValue(bound, true)).toBe('Bound');
    expect(describeFilterValue(bound, false)).toBe('Unbound');
  });
});

describe('collectApplied', () => {
  const fields = [status, premium, renewal, bound];

  it('returns only what actually narrows the data', () => {
    const applied = collectApplied(fields, {
      status: [],
      premium: { min: 500000 },
      renewal: {},
      bound: false,
    });
    expect(applied.map((a) => a.field.id)).toEqual(['premium', 'bound']);
  });

  it('keeps FIELD order, not the order they were applied', () => {
    // A row that reshuffles as filters are added is harder to scan, and the
    // user already learnt the order from the bar above it.
    const applied = collectApplied(fields, { bound: true, status: ['active'] });
    expect(applied.map((a) => a.field.id)).toEqual(['status', 'bound']);
  });

  it('carries the described value, so a chip does not re-derive it', () => {
    const [first] = collectApplied(fields, { status: ['pending'] });
    expect(first.description).toBe('Pending');
  });
});
