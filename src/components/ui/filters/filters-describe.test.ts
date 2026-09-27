import { describe, it, expect } from 'vitest';

import { describeValue, describeRuleValue } from './filters-describe';
import { createFilterRule, __resetFilterIds } from './filters-query';
import type { FilterField } from './filters-schema';

/**
 * A rule's VALUE in words — the text inside the third segment of a condition.
 *
 * Had no test file of its own at 57% coverage, and the uncovered half was the
 * part that decides what a user reads: unit formatting, option labels, and
 * the compaction that keeps a chip from wrapping the toolbar.
 */

const money: FilterField = { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' };
const percent: FilterField = { id: 'share', label: 'Share', type: 'number', unit: 'percent' };
const plain: FilterField = { id: 'count', label: 'Count', type: 'number' };
const status: FilterField = {
  id: 'status',
  label: 'Status',
  type: 'select',
  options: [
    { value: 'A', label: 'Active' },
    { value: 'E', label: 'Expired' },
    { value: 'P', label: 'Pending' },
    { value: 1, label: 'Tier one' },
  ],
};
const bound: FilterField = { id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound' };
const renewal: FilterField = { id: 'renewal', label: 'Renewal', type: 'date' };

describe('absent values describe as nothing, not as "undefined"', () => {
  it.each([undefined, null])('%s', (v) => {
    expect(describeValue(v as never, plain)).toBe('');
  });

  it('an empty array and an empty range describe as nothing too', () => {
    expect(describeValue([] as never, status)).toBe('');
    expect(describeValue({} as never, money)).toBe('');
  });
});

describe('units are always stated', () => {
  it('formats currency, percent and bare numbers differently', () => {
    // "Premium over 500000" is ambiguous and "over $500,000" is not — the
    // field already declares which it is (§44).
    expect(describeValue(500000, money)).toBe('$500,000');
    expect(describeValue(12, percent)).toContain('12');
    expect(describeValue(12, percent)).not.toBe('12');
    expect(describeValue(1500, plain)).toBe('1,500');
  });

  it('carries the unit into both ends of a range', () => {
    expect(describeValue({ min: 1000, max: 5000 } as never, money)).toBe('$1,000 – $5,000');
  });

  it('describes a half-open range from whichever bound is set', () => {
    expect(describeValue({ min: 1000 } as never, money)).toBe('$1,000');
    expect(describeValue({ max: 5000 } as never, money)).toBe('$5,000');
  });
});

describe('option labels, not stored values', () => {
  it('shows the label a human chose', () => {
    expect(describeValue('A', status)).toBe('Active');
  });

  it('resolves inside an array as well as outside it', () => {
    // Strict `===` inside the array path meant a multi-select chip lost its
    // labels whenever the stored type and the option type differed — which a
    // URL round trip routinely causes.
    expect(describeValue(['A', 'E'] as never, status)).toBe('Active, Expired');
    expect(describeValue(['1'] as never, status)).toBe('Tier one');
    expect(describeValue(1 as never, status)).toBe('Tier one');
  });

  it('falls back to the raw value when no option matches', () => {
    expect(describeValue('ZZ', status)).toBe('ZZ');
  });
});

describe('compaction keeps a condition from wrapping the toolbar', () => {
  it('lists two, then counts the rest', () => {
    // Five labels are longer than the column being filtered (§27).
    expect(describeValue(['A', 'E'] as never, status)).toBe('Active, Expired');
    expect(describeValue(['A', 'E', 'P'] as never, status)).toBe('Active +2');
  });
});

describe('booleans use the field’s own words', () => {
  it('prefers trueLabel / falseLabel over Yes and No', () => {
    expect(describeValue(true, bound)).toBe('Bound');
    expect(describeValue(false, bound)).toBe('Unbound');
  });

  it('falls back to Yes and No when the field does not say', () => {
    const bare: FilterField = { id: 'b', label: 'B', type: 'boolean' };
    expect(describeValue(true, bare)).toBe('Yes');
    expect(describeValue(false, bare)).toBe('No');
  });
});

describe('dates', () => {
  it('formats a single date and both range directions', () => {
    expect(describeValue('2026-07-09', renewal)).not.toBe('2026-07-09');
    expect(describeValue({ from: '2026-01-01', to: '2026-03-31' } as never, renewal)).toContain('–');
    expect(describeValue({ from: '2026-01-01' } as never, renewal)).toMatch(/^from /);
    expect(describeValue({ to: '2026-03-31' } as never, renewal)).toMatch(/^until /);
  });
});

describe('describeRuleValue describes only the VALUE', () => {
  it('never includes the field or the operator', () => {
    __resetFilterIds();
    // The segmented UI renders those as their own controls; building one
    // sentence here would force the rule to re-split it.
    const rule = createFilterRule(['premium'], { operator: 'gt', value: 500000 });
    expect(describeRuleValue(rule, money)).toBe('$500,000');
  });

  it('survives an unknown field', () => {
    const rule = createFilterRule(['ghost'], { operator: 'is', value: 'x' });
    expect(describeRuleValue(rule, undefined)).toBe('x');
  });
});
