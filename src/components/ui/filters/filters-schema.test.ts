import { describe, it, expect, beforeEach } from 'vitest';

import {
  fieldPathLabel,
  fieldTypeAt,
  fieldsAtPath,
  flattenFields,
  getFilterField,
  searchFields,
  type FilterField,
} from './filters-schema';
import { applyFilterQuery, compilePredicate } from './adapters/predicate';
import {
  __resetFilterIds,
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
} from './filters-query';

beforeEach(__resetFilterIds);

/** A schema with real nesting, because flat schemas hide every path bug. */
const FIELDS: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'expired', label: 'Expired' },
    ],
  },
  {
    id: 'tiv',
    label: 'Total insured value',
    type: 'number',
    unit: 'currency',
    aliases: ['TIV'],
  },
  {
    id: 'location',
    label: 'Location',
    type: 'select',
    fields: [
      { id: 'country', label: 'Country', type: 'select' },
      { id: 'city', label: 'City', type: 'text' },
    ],
  },
  {
    id: 'risk',
    label: 'Risk',
    type: 'select',
    fields: [
      {
        id: 'cat',
        label: 'CAT',
        type: 'select',
        fields: [
          { id: 'flood', label: 'Flood', type: 'number' },
          { id: 'wind', label: 'Wind', type: 'number' },
        ],
      },
      { id: 'casualty', label: 'Casualty', type: 'number' },
    ],
  },
  { id: 'secret', label: 'Internal', type: 'text', hidden: true },
];

describe('nested fields (§7)', () => {
  it('flattens to LEAVES only — a branch is a grouping, not a condition', () => {
    const leaves = flattenFields(FIELDS).map((r) => r.path.join('.'));
    expect(leaves).toContain('risk.cat.flood');
    expect(leaves).toContain('location.country');
    expect(leaves).not.toContain('risk');
    expect(leaves).not.toContain('risk.cat');
  });

  it('omits hidden fields', () => {
    expect(flattenFields(FIELDS).map((r) => r.path.join('.'))).not.toContain('secret');
  });

  it('resolves a stored path back to its field', () => {
    expect(getFilterField(FIELDS, ['risk', 'cat', 'wind'])?.label).toBe('Wind');
    expect(fieldTypeAt(FIELDS, ['risk', 'cat', 'wind'])).toBe('number');
  });

  it('returns undefined for a path whose field was REMOVED (§60)', () => {
    // A persisted query must not crash the grid because a later release
    // dropped the field it references.
    expect(getFilterField(FIELDS, ['risk', 'cat', 'hail'])).toBeUndefined();
    expect(fieldTypeAt(FIELDS, ['gone'])).toBeUndefined();
  });

  it('renders a readable path', () => {
    expect(fieldPathLabel(FIELDS, ['risk', 'cat', 'flood'])).toBe('Risk › CAT › Flood');
  });

  it('lists the children at a level, for drilling in', () => {
    expect(fieldsAtPath(FIELDS, ['risk', 'cat']).map((f) => f.id)).toEqual(['flood', 'wind']);
    expect(fieldsAtPath(FIELDS, []).map((f) => f.id)).not.toContain('secret');
  });
});

describe('field search (§8)', () => {
  it('finds a DEEPLY nested field from the top level', () => {
    // The whole point of search over a hundred-field schema: the user should
    // not have to know that Flood lives under Risk › CAT.
    const hits = searchFields(FIELDS, 'flood');
    expect(hits).toHaveLength(1);
    expect(hits[0].path).toEqual(['risk', 'cat', 'flood']);
  });

  it('preserves parent context, so an ambiguous label is readable', () => {
    expect(searchFields(FIELDS, 'flood')[0].ancestors).toEqual(['Risk', 'CAT']);
  });

  it('is case-insensitive and trims whitespace', () => {
    expect(searchFields(FIELDS, '  FLOOD ')).toHaveLength(1);
  });

  it('matches an ALIAS the label does not contain', () => {
    // "TIV" must find "Total insured value".
    const hits = searchFields(FIELDS, 'tiv');
    expect(hits.map((h) => h.path.join('.'))).toContain('tiv');
  });

  it('searching a BRANCH returns its descendants', () => {
    const hits = searchFields(FIELDS, 'risk').map((h) => h.path.join('.'));
    expect(hits).toEqual(expect.arrayContaining(['risk.cat.flood', 'risk.cat.wind', 'risk.casualty']));
  });

  it('reports match ranges for highlighting, and none for an alias hit', () => {
    expect(searchFields(FIELDS, 'flo')[0].matches).toEqual([[0, 3]]);
    // The matched text is not in the rendered label, so highlighting it would
    // point at the wrong characters.
    expect(searchFields(FIELDS, 'tiv')[0].matches).toEqual([]);
  });

  it('returns everything for an empty term, and nothing for a miss', () => {
    expect(searchFields(FIELDS, '').length).toBe(flattenFields(FIELDS).length);
    expect(searchFields(FIELDS, 'earthquke')).toHaveLength(0);
  });
});

interface Row {
  status: string;
  tiv: number | null;
  location: { country: string; city: string };
  risk: { cat: { flood: number; wind: number }; casualty: number };
  tags?: string[];
}
const rows: Row[] = [
  { status: 'active', tiv: 5_000_000, location: { country: 'BR', city: 'Rio' }, risk: { cat: { flood: 80, wind: 20 }, casualty: 10 }, tags: ['a', 'b'] },
  { status: 'active', tiv: 12_000_000, location: { country: 'MX', city: 'Leon' }, risk: { cat: { flood: 10, wind: 90 }, casualty: 50 }, tags: ['b'] },
  { status: 'expired', tiv: null, location: { country: 'US', city: 'Boise' }, risk: { cat: { flood: 40, wind: 40 }, casualty: 5 }, tags: [] },
];

describe('the predicate adapter (§31)', () => {
  it('reads NESTED values by path', () => {
    const q = createFilterQuery([createFilterRule(['risk', 'cat', 'flood'], { operator: 'gt', value: 50 })]);
    expect(applyFilterQuery(rows, q, FIELDS).map((r) => r.location.city)).toEqual(['Rio']);
  });

  it('combines with AND at the root', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterRule(['tiv'], { operator: 'gt', value: 10_000_000 }),
    ]);
    expect(applyFilterQuery(rows, q, FIELDS).map((r) => r.location.city)).toEqual(['Leon']);
  });

  it('honours a nested OR group — A AND (B OR C)', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterGroup('or', [
        createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
        createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
      ]),
    ]);
    expect(applyFilterQuery(rows, q, FIELDS)).toHaveLength(2);
  });

  it('applies negation to the NODE, not by inverting the operator (§17)', () => {
    // NOT (tiv > 10M) keeps the null row; tiv <= 10M does not. Only the first
    // is what the user asked for.
    const q = createFilterQuery([
      createFilterRule(['tiv'], { operator: 'gt', value: 10_000_000, negated: true }),
    ]);
    const kept = applyFilterQuery(rows, q, FIELDS).map((r) => r.location.city);
    expect(kept).toEqual(['Rio', 'Boise']);
  });

  it('SKIPS an incomplete rule rather than guessing (§13)', () => {
    // A draft that compiled to "match everything" would quietly widen the
    // result set while the user is still choosing.
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterRule(['tiv']), // draft: no operator, no value
    ]);
    expect(applyFilterQuery(rows, q, FIELDS)).toHaveLength(2);
  });

  it('skips a rule whose field no longer exists (§60)', () => {
    const q = createFilterQuery([createFilterRule(['gone'], { operator: 'is', value: 'x' })]);
    expect(applyFilterQuery(rows, q, FIELDS)).toHaveLength(3);
  });

  it('treats an empty query as no constraint', () => {
    expect(applyFilterQuery(rows, createFilterQuery(), FIELDS)).toHaveLength(3);
  });

  it('handles is_empty without a value editor ever having run', () => {
    const q = createFilterQuery([createFilterRule(['tiv'], { operator: 'is_empty' })]);
    expect(applyFilterQuery(rows, q, FIELDS).map((r) => r.location.city)).toEqual(['Boise']);
  });

  it('distinguishes contains-any from contains-all (§10.4)', () => {
    const any = createFilterQuery([
      createFilterRule(['tags'], { operator: 'contains_any', value: ['a', 'b'] }),
    ]);
    const all = createFilterQuery([
      createFilterRule(['tags'], { operator: 'contains_all', value: ['a', 'b'] }),
    ]);
    const schema: FilterField[] = [...FIELDS, { id: 'tags', label: 'Tags', type: 'multiselect' }];
    expect(applyFilterQuery(rows, any, schema)).toHaveLength(2);
    expect(applyFilterQuery(rows, all, schema)).toHaveLength(1);
  });

  it('is inclusive on both ends of a numeric between (§45)', () => {
    const q = createFilterQuery([
      createFilterRule(['risk', 'casualty'], { operator: 'between', value: { min: 5, max: 10 } }),
    ]);
    expect(applyFilterQuery(rows, q, FIELDS)).toHaveLength(2);
  });

  it('returns a reusable predicate rather than only filtered rows', () => {
    const q = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'expired' })]);
    const predicate = compilePredicate<Row>(q, FIELDS);
    expect(rows.filter(predicate)).toHaveLength(1);
    expect(predicate(rows[0])).toBe(false);
  });
});
