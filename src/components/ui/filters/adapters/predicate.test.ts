import { describe, it, expect, beforeEach } from 'vitest';

import { applyFilterQuery, compilePredicate } from './predicate';
import {
  __resetFilterIds,
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
} from '../filters-query';
import { operatorsFor } from '../filters-operators';
import type { FilterField } from '../filters-schema';

beforeEach(__resetFilterIds);

/**
 * Every operator, exercised against real rows.
 *
 * This file exists because a review inverted nine operators at once —
 * `is_not`, `contains`, `not_contains`, `starts_with`/`ends_with`, `eq`,
 * `neq`, `gte`, `lt`, `lte` — and the whole suite stayed green. Only `is`,
 * `gt`, `is_empty`, `contains_any` and `contains_all` were actually covered.
 * Deciding which rows match is the single thing a filter is for, so each
 * operator now has a case that fails if its meaning changes.
 */

const FIELDS: FilterField[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'premium', label: 'Premium', type: 'number' },
  { id: 'renewal', label: 'Renewal', type: 'date' },
  { id: 'seen', label: 'Seen at', type: 'datetime' },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Expired', label: 'Expired' },
    ],
  },
  { id: 'tags', label: 'Tags', type: 'multiselect' },
  { id: 'bound', label: 'Bound', type: 'boolean' },
  {
    id: 'risk',
    label: 'Risk',
    type: 'select',
    fields: [{ id: 'flood', label: 'Flood', type: 'number' }],
  },
];

interface Row {
  id: string;
  name?: string | null;
  premium?: number | null | '';
  renewal?: string | Date | null;
  seen?: string;
  status?: string | number | null;
  tags?: string[];
  bound?: boolean;
  risk?: { flood?: number };
}

/** Runs one rule and returns the ids that survive — the whole test vocabulary. */
function ids(rows: Row[], path: string[], operator: string, value?: unknown): string[] {
  const q = createFilterQuery([
    createFilterRule(path, { operator, value: value as never }),
  ]);
  return applyFilterQuery(rows, q, FIELDS).map((r) => r.id);
}

// ----------------------------------------------------------------- text

describe('text operators', () => {
  const rows: Row[] = [
    { id: 'rio', name: 'Rio de Janeiro' },
    { id: 'reno', name: 'Reno' },
    { id: 'null', name: null },
  ];

  it('is / is_not', () => {
    expect(ids(rows, ['name'], 'is', 'Reno')).toEqual(['reno']);
    expect(ids(rows, ['name'], 'is_not', 'Reno')).toEqual(['rio', 'null']);
  });

  it('contains / not_contains, case-insensitively', () => {
    expect(ids(rows, ['name'], 'contains', 'JANEIRO')).toEqual(['rio']);
    expect(ids(rows, ['name'], 'not_contains', 'JANEIRO')).toEqual(['reno', 'null']);
  });

  it('starts_with and ends_with are not interchangeable', () => {
    // `Re` starts Reno; `o` ends both cities. Swapping the two implementations
    // must not produce the same answer.
    expect(ids(rows, ['name'], 'starts_with', 'Re')).toEqual(['reno']);
    expect(ids(rows, ['name'], 'ends_with', 'Re')).toEqual([]);
    expect(ids(rows, ['name'], 'ends_with', 'o')).toEqual(['rio', 'reno']);
  });

  it('is_empty / is_not_empty treat null, undefined, "" and [] as empty', () => {
    const r: Row[] = [
      { id: 'set', name: 'x' },
      { id: 'null', name: null },
      { id: 'missing' },
      { id: 'blank', name: '' },
    ];
    expect(ids(r, ['name'], 'is_empty')).toEqual(['null', 'missing', 'blank']);
    expect(ids(r, ['name'], 'is_not_empty')).toEqual(['set']);
  });
});

// --------------------------------------------------------------- numeric

describe('numeric operators', () => {
  const rows: Row[] = [
    { id: 'low', premium: 50 },
    { id: 'mid', premium: 100 },
    { id: 'high', premium: 250 },
  ];

  it('each comparison selects a different set', () => {
    expect(ids(rows, ['premium'], 'eq', 100)).toEqual(['mid']);
    expect(ids(rows, ['premium'], 'neq', 100)).toEqual(['low', 'high']);
    expect(ids(rows, ['premium'], 'gt', 100)).toEqual(['high']);
    expect(ids(rows, ['premium'], 'gte', 100)).toEqual(['mid', 'high']);
    expect(ids(rows, ['premium'], 'lt', 100)).toEqual(['low']);
    expect(ids(rows, ['premium'], 'lte', 100)).toEqual(['low', 'mid']);
  });

  it('compares a numeric string from a URL as a number, not as text', () => {
    // '9' > '100' is true as strings and false as numbers.
    expect(ids(rows, ['premium'], 'gt', '100')).toEqual(['high']);
  });

  it('ABSENT IS NOT ZERO — a row with no premium matches no numeric filter', () => {
    // `Number(null)`, `Number('')` and `Number(false)` are all 0, so "Premium
    // under 100" used to return every policy with no premium recorded — a
    // wrong answer presented as fact.
    const r: Row[] = [
      { id: 'has', premium: 500 },
      { id: 'null', premium: null },
      { id: 'blank', premium: '' },
      { id: 'missing' },
    ];
    // `has` is 500, so only the operators 500 genuinely satisfies return it.
    // The point of the table is that NO operator ever returns null/blank/missing.
    const expected: Record<string, string[]> = {
      eq: [],
      lt: [],
      lte: [],
      neq: ['has'],
      gt: ['has'],
      gte: ['has'],
    };
    for (const [op, want] of Object.entries(expected)) {
      expect({ op, ids: ids(r, ['premium'], op, 100) }).toEqual({ op, ids: want });
    }
  });

  it('a blank row is excluded from a range too', () => {
    const r: Row[] = [
      { id: 'in', premium: 5 },
      { id: 'null', premium: null },
    ];
    expect(ids(r, ['premium'], 'between', { min: 0, max: 10 })).toEqual(['in']);
  });

  it('reads a nested path', () => {
    const r: Row[] = [
      { id: 'a', risk: { flood: 80 } },
      { id: 'b', risk: { flood: 10 } },
      { id: 'c' },
    ];
    expect(ids(r, ['risk', 'flood'], 'gt', 50)).toEqual(['a']);
  });
});

// ----------------------------------------------------------------- range

describe('between / not_between', () => {
  const rows: Row[] = [
    { id: 'below', premium: 5 },
    { id: 'lowEdge', premium: 10 },
    { id: 'inside', premium: 15 },
    { id: 'highEdge', premium: 20 },
    { id: 'above', premium: 25 },
  ];

  it('is inclusive on both ends, and not_between is its complement', () => {
    expect(ids(rows, ['premium'], 'between', { min: 10, max: 20 })).toEqual([
      'lowEdge',
      'inside',
      'highEdge',
    ]);
    expect(ids(rows, ['premium'], 'not_between', { min: 10, max: 20 })).toEqual([
      'below',
      'above',
    ]);
  });

  it('accepts an open-ended range in either direction', () => {
    // The editor lets a user fill in only one bound, so both halves must work.
    expect(ids(rows, ['premium'], 'between', { min: 20 })).toEqual(['highEdge', 'above']);
    expect(ids(rows, ['premium'], 'between', { max: 10 })).toEqual(['below', 'lowEdge']);
  });

  it('is inclusive on both ends of a date range', () => {
    const r: Row[] = [
      { id: 'before', renewal: '2025-12-31' },
      { id: 'first', renewal: '2026-01-01' },
      { id: 'mid', renewal: '2026-02-14' },
      { id: 'last', renewal: '2026-03-31' },
      { id: 'after', renewal: '2026-04-01' },
    ];
    expect(ids(r, ['renewal'], 'between', { from: '2026-01-01', to: '2026-03-31' })).toEqual([
      'first',
      'mid',
      'last',
    ]);
  });

  it('accepts an open-ended date range in either direction', () => {
    const r: Row[] = [
      { id: 'early', renewal: '2026-01-01' },
      { id: 'late', renewal: '2026-12-01' },
    ];
    expect(ids(r, ['renewal'], 'between', { from: '2026-06-01' })).toEqual(['late']);
    expect(ids(r, ['renewal'], 'between', { to: '2026-06-01' })).toEqual(['early']);
  });
});

// ------------------------------------------------------------------ sets

describe('set operators', () => {
  const rows: Row[] = [
    { id: 'a', status: 'Active' },
    { id: 'e', status: 'Expired' },
    { id: 'p', status: 'Pending' },
  ];

  it('any_of / none_of are complements over the known values', () => {
    expect(ids(rows, ['status'], 'any_of', ['Active', 'Expired'])).toEqual(['a', 'e']);
    expect(ids(rows, ['status'], 'none_of', ['Active', 'Expired'])).toEqual(['p']);
  });

  it('AGREES WITH `is` when the stored type differs from the option type', () => {
    // A select option may hold the number 1 while the grid row holds "1" —
    // `FilterValue`'s own doc calls that ordinary, and a URL turns one into
    // the other. `is` was loose and `any_of` strict, so the same intent gave
    // opposite answers.
    const mixed: Row[] = [{ id: 'num', status: 1 }, { id: 'str', status: '2' }];
    expect(ids(mixed, ['status'], 'is', '1')).toEqual(['num']);
    expect(ids(mixed, ['status'], 'any_of', ['1'])).toEqual(['num']);
    expect(ids(mixed, ['status'], 'is', 2)).toEqual(['str']);
    expect(ids(mixed, ['status'], 'any_of', [2])).toEqual(['str']);
    expect(ids(mixed, ['status'], 'none_of', ['1'])).toEqual(['str']);
  });

  it('contains_any is OR and contains_all is AND — never the same answer', () => {
    const r: Row[] = [
      { id: 'both', tags: ['cat', 'flood'] },
      { id: 'one', tags: ['cat'] },
      { id: 'none', tags: ['wind'] },
    ];
    expect(ids(r, ['tags'], 'contains_any', ['cat', 'flood'])).toEqual(['both', 'one']);
    expect(ids(r, ['tags'], 'contains_all', ['cat', 'flood'])).toEqual(['both']);
    expect(ids(r, ['tags'], 'not_contains_any', ['cat', 'flood'])).toEqual(['none']);
  });

  it('treats a scalar column as a one-element set', () => {
    // A multiselect column whose row happens to hold a bare value, not an
    // array — the `Array.isArray(actual) ? actual : [actual]` path.
    const r: Row[] = [
      { id: 'scalar', tags: 'cat' as unknown as string[] },
      { id: 'other', tags: 'wind' as unknown as string[] },
    ];
    expect(ids(r, ['tags'], 'contains_any', ['cat'])).toEqual(['scalar']);
  });
});

// ----------------------------------------------------------------- dates

describe('date operators', () => {
  const rows: Row[] = [
    { id: 'jan', renewal: '2026-01-15' },
    { id: 'jun', renewal: '2026-06-15' },
    { id: 'dec', renewal: '2026-12-15' },
  ];

  it('before / after / on_or_before / on_or_after differ at the boundary', () => {
    expect(ids(rows, ['renewal'], 'before', '2026-06-15')).toEqual(['jan']);
    expect(ids(rows, ['renewal'], 'on_or_before', '2026-06-15')).toEqual(['jan', 'jun']);
    expect(ids(rows, ['renewal'], 'after', '2026-06-15')).toEqual(['dec']);
    expect(ids(rows, ['renewal'], 'on_or_after', '2026-06-15')).toEqual(['jun', 'dec']);
  });

  it('parses YYYY-MM-DD as LOCAL midnight, not UTC', () => {
    // `new Date('2026-07-09')` is UTC midnight, so west of UTC the row lands
    // on the 8th and a range starting the 9th drops it. This is the whole
    // reason `day()` hand-parses the string.
    const r: Row[] = [{ id: 'boundary', renewal: '2026-07-09' }];
    expect(ids(r, ['renewal'], 'on_or_after', '2026-07-09')).toEqual(['boundary']);
    expect(ids(r, ['renewal'], 'on_or_before', '2026-07-09')).toEqual(['boundary']);
    expect(ids(r, ['renewal'], 'before', '2026-07-09')).toEqual([]);
  });

  it('IS compares at DAY granularity, like every other date operator', () => {
    // An ISO timestamp, a plain date and a Date object are the same day, and
    // `on_or_before` already matched all three. `is` compared raw values, so
    // a datetime column could never match `is` at all.
    const r: Row[] = [
      { id: 'iso', renewal: '2026-07-09T10:30:00Z' },
      { id: 'plain', renewal: '2026-07-09' },
      { id: 'obj', renewal: new Date(2026, 6, 9) },
      { id: 'other', renewal: '2026-07-10' },
    ];
    expect(ids(r, ['renewal'], 'is', '2026-07-09')).toEqual(['iso', 'plain', 'obj']);
    expect(ids(r, ['renewal'], 'is_not', '2026-07-09')).toEqual(['other']);
  });

  it('matches a datetime field on its day', () => {
    const r: Row[] = [
      { id: 'morning', seen: '2026-07-09T08:00:00Z' },
      { id: 'next', seen: '2026-07-10T08:00:00Z' },
    ];
    expect(ids(r, ['seen'], 'is', '2026-07-09')).toEqual(['morning']);
  });
});

// -------------------------------------------------------------- booleans

describe('boolean operators', () => {
  const rows: Row[] = [
    { id: 't', bound: true },
    { id: 'f', bound: false },
  ];

  it('distinguishes true from false', () => {
    expect(ids(rows, ['bound'], 'is', true)).toEqual(['t']);
    expect(ids(rows, ['bound'], 'is', false)).toEqual(['f']);
    // `boolean` defines only `is` — "is false" is how you say "is not true",
    // and offering both would be two controls for one choice.
    expect(operatorsFor('boolean').map((o) => o.value)).toEqual(['is']);
  });
});

// ------------------------------------------------------- tree combination

describe('how rules combine', () => {
  const rows: Row[] = [
    { id: 'a', status: 'Active', premium: 100 },
    { id: 'b', status: 'Active', premium: 900 },
    { id: 'c', status: 'Expired', premium: 100 },
  ];

  it('AND narrows, OR widens', () => {
    const and = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterRule(['premium'], { operator: 'lt', value: 500 }),
    ]);
    expect(applyFilterQuery(rows, and, FIELDS).map((r) => r.id)).toEqual(['a']);

    const or = createFilterGroup('or', [
      createFilterRule(['status'], { operator: 'is', value: 'Expired' }),
      createFilterRule(['premium'], { operator: 'gt', value: 500 }),
    ]);
    expect(applyFilterQuery(rows, createFilterQuery([or]), FIELDS).map((r) => r.id)).toEqual([
      'b',
      'c',
    ]);
  });

  it('A AND (B OR C) is not A AND B AND C — the reason grouping exists', () => {
    const grouped = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterGroup('or', [
        createFilterRule(['premium'], { operator: 'lt', value: 200 }),
        createFilterRule(['premium'], { operator: 'gt', value: 800 }),
      ]),
    ]);
    expect(applyFilterQuery(rows, grouped, FIELDS).map((r) => r.id)).toEqual(['a', 'b']);

    const flattened = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterRule(['premium'], { operator: 'lt', value: 200 }),
      createFilterRule(['premium'], { operator: 'gt', value: 800 }),
    ]);
    expect(applyFilterQuery(rows, flattened, FIELDS)).toHaveLength(0);
  });

  it('negates the NODE, which is not the same as inverting the operator', () => {
    // NOT (premium > 500) keeps the row with no premium; premium <= 500 does
    // not. Only the first is what the user asked for.
    const r: Row[] = [{ id: 'high', premium: 900 }, { id: 'null', premium: null }];
    const notGt = createFilterQuery([
      { ...createFilterRule(['premium'], { operator: 'gt', value: 500 }), negated: true },
    ]);
    expect(applyFilterQuery(r, notGt, FIELDS).map((x) => x.id)).toEqual(['null']);
    expect(ids(r, ['premium'], 'lte', 500)).toEqual([]);
  });

  it('negates a GROUP as a whole', () => {
    const q = createFilterQuery([
      {
        ...createFilterGroup('or', [
          createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        ]),
        negated: true,
      },
    ]);
    expect(applyFilterQuery(rows, q, FIELDS).map((r) => r.id)).toEqual(['c']);
  });

  it('skips incomplete rules instead of guessing at them', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterRule(['premium']),
      createFilterRule(['premium'], { operator: 'gt' }),
    ]);
    // A draft compiling to "match everything" would quietly widen the result
    // set while the user is still typing.
    expect(applyFilterQuery(rows, q, FIELDS).map((r) => r.id)).toEqual(['a', 'b']);
  });

  it('an empty group constrains nothing rather than excluding everything', () => {
    const q = createFilterQuery([createFilterGroup('and', [])]);
    expect(applyFilterQuery(rows, q, FIELDS)).toHaveLength(3);
  });

  it('an empty query matches every row', () => {
    expect(applyFilterQuery(rows, createFilterQuery(), FIELDS)).toHaveLength(3);
  });
});

describe('compilePredicate', () => {
  it('returns a reusable function, not rows', () => {
    const p = compilePredicate<Row>(
      createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Active' })]),
      FIELDS
    );
    expect(p({ id: 'x', status: 'Active' })).toBe(true);
    expect(p({ id: 'y', status: 'Expired' })).toBe(false);
  });
});
