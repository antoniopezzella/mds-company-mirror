import { describe, it, expect, beforeEach } from 'vitest';

import {
  FILTER_QUERY_PARAM,
  filterQueryFromSearchParams,
  filterQueryToSearchParams,
  parseFilterQuery,
  serializeFilterQuery,
} from './filters-url';
import {
  __resetFilterIds,
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
} from './filters-query';
import { applyFilterQuery } from './adapters/predicate';
import type { FilterField } from './filters-schema';
import type { FilterNode, FilterQuery } from './filters-types';

beforeEach(__resetFilterIds);

const FIELDS: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Expired', label: 'Expired' },
    ],
  },
  { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'bound', label: 'Bound', type: 'boolean' },
  { id: 'renewal', label: 'Renewal', type: 'date' },
  {
    id: 'location',
    label: 'Location',
    type: 'select',
    fields: [
      {
        id: 'country',
        label: 'Country',
        type: 'select',
        options: [
          { value: 'BR', label: 'Brazil' },
          { value: 'MX', label: 'Mexico' },
        ],
      },
    ],
  },
];

/** Ids are session-local by design, so round-trips compare everything else. */
function strip(node: FilterNode | FilterQuery): unknown {
  if (node.type === 'rule') {
    const { id, ...rest } = node;
    void id;
    return rest;
  }
  const { id, rules, ...rest } = node;
  void id;
  return { ...rest, rules: rules.map(strip) };
}

const roundTrip = (q: FilterQuery) => parseFilterQuery(serializeFilterQuery(q), FIELDS);

describe('the structure stays readable in the address bar (§37)', () => {
  it('writes AND as a comma, OR as a pipe, and groups as parentheses', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterGroup('or', [
        createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
        createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
      ]),
    ]);
    expect(serializeFilterQuery(q)).toBe(
      'status:is:"Active",(location.country:is:"BR"|location.country:is:"MX")'
    );
  });

  it('carries a nested path as a dotted path, not a label', () => {
    // Labels are translated; a persisted query must survive a copy change.
    const q = createFilterQuery([createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' })]);
    expect(serializeFilterQuery(q)).toContain('location.country');
    expect(serializeFilterQuery(q)).not.toContain('Brazil');
  });
});

describe('round trips', () => {
  it('preserves a flat query', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterRule(['premium'], { operator: 'gt', value: 10000 }),
    ]);
    expect(strip(roundTrip(q).query)).toEqual(strip(q));
  });

  it('preserves nesting and the OR', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterGroup('or', [
        createFilterRule(['location', 'country'], { operator: 'is', value: 'BR' }),
        createFilterRule(['location', 'country'], { operator: 'is', value: 'MX' }),
      ]),
    ]);
    expect(strip(roundTrip(q).query)).toEqual(strip(q));
  });

  it('preserves negation on a rule', () => {
    const rule = createFilterRule(['premium'], { operator: 'gt', value: 1, negated: true });
    expect(strip(roundTrip(createFilterQuery([rule])).query)).toEqual(
      strip(createFilterQuery([rule]))
    );
  });

  it('preserves a negated group that has siblings', () => {
    const q = createFilterQuery([
      createFilterRule(['city'], { operator: 'is', value: 'Rio' }),
      {
        ...createFilterGroup('or', [
          createFilterRule(['status'], { operator: 'is', value: 'Active' }),
          createFilterRule(['status'], { operator: 'is', value: 'Expired' }),
        ]),
        negated: true,
      },
    ]);
    expect(strip(roundTrip(q).query)).toEqual(strip(q));
  });

  it('preserves a negated root', () => {
    const negRoot: FilterQuery = {
      ...createFilterQuery([createFilterRule(['premium'], { operator: 'gt', value: 5 })]),
      negated: true,
    };
    expect(serializeFilterQuery(negRoot)).toBe('!(premium:gt:5)');
    expect(roundTrip(negRoot).query.negated).toBe(true);
  });

  it('NORMALIZES a lone negated group into a negated root, losslessly', () => {
    // `!(A|B)` is genuinely ambiguous between "negated root" and "root whose
    // only child is a negated group" — and the two mean exactly the same
    // thing, so the parser picks one rather than inventing a disambiguator.
    // The proof that matters is that they select the same rows, not that the
    // trees match.
    const q = createFilterQuery([
      {
        ...createFilterGroup('or', [
          createFilterRule(['status'], { operator: 'is', value: 'Active' }),
          createFilterRule(['status'], { operator: 'is', value: 'Expired' }),
        ]),
        negated: true,
      },
    ]);
    const back = roundTrip(q).query;

    expect(back.negated).toBe(true);
    expect(back.combinator).toBe('or');

    const rows = [
      { status: 'Active' },
      { status: 'Expired' },
      { status: 'Pending' },
      { status: 'Lapsed' },
    ];
    expect(applyFilterQuery(rows, back, FIELDS)).toEqual(applyFilterQuery(rows, q, FIELDS));
    // And it is the right answer, not merely a matching wrong one.
    expect(applyFilterQuery(rows, back, FIELDS)).toEqual([
      { status: 'Pending' },
      { status: 'Lapsed' },
    ]);
  });

  it('preserves an OPEN-ENDED range, in either direction', () => {
    // The editor emits both keys (`{min: undefined, max: 9}`), so `'min' in v`
    // was true in memory while JSON dropped it on the way out — "Premium up to
    // $9,000" worked on the sender's screen and was rejected on the
    // recipient's. Both bounds, both types, both directions.
    const cases: Array<[string[], unknown]> = [
      [['premium'], { min: undefined, max: 9 }],
      [['premium'], { min: 5, max: undefined }],
      [['renewal'], { from: undefined, to: '2026-02-01' }],
      [['renewal'], { from: '2026-02-01', to: undefined }],
    ];
    for (const [path, value] of cases) {
      const q = createFilterQuery([
        createFilterRule(path, { operator: 'between', value: value as never }),
      ]);
      const back = parseFilterQuery(serializeFilterQuery(q), FIELDS);
      expect({ value, dropped: back.dropped, kept: back.query.rules.length }).toEqual({
        value,
        dropped: [],
        kept: 1,
      });
    }
  });

  it('preserves every value shape', () => {
    const q = createFilterQuery([
      createFilterRule(['premium'], { operator: 'between', value: { min: 10, max: 20 } }),
      createFilterRule(['renewal'], { operator: 'between', value: { from: '2026-01-01', to: '2026-03-31' } }),
      createFilterRule(['status'], { operator: 'any_of', value: ['Active', 'Expired'] }),
      createFilterRule(['bound'], { operator: 'is', value: true }),
      createFilterRule(['premium'], { operator: 'is_empty' }),
    ]);
    expect(strip(roundTrip(q).query)).toEqual(strip(q));
  });
});

describe('values are JSON, and that is the point', () => {
  it('keeps a text "123" a STRING rather than a number', () => {
    // Guessing the type back from the raw text is exactly the silent
    // corruption the two quote characters buy protection from.
    const q = createFilterQuery([createFilterRule(['city'], { operator: 'is', value: '123' })]);
    const back = roundTrip(q).query.rules[0];
    expect(back).toMatchObject({ value: '123' });
    expect(typeof (back as { value: unknown }).value).toBe('string');
  });

  it('survives a value containing every delimiter in the grammar', () => {
    const nasty = 'Rio, Brazil | (north) : !important & 100%';
    const q = createFilterQuery([createFilterRule(['city'], { operator: 'is', value: nasty })]);
    // The delimiters travel RAW inside the JSON string — the splitter is what
    // knows they are not separators, so no second layer of escaping is needed.
    expect(serializeFilterQuery(q)).toBe(`city:is:${JSON.stringify(nasty)}`);
    expect(roundTrip(q).query.rules[0]).toMatchObject({ value: nasty });
  });

  it('survives a value that looks like a nested query', () => {
    const q = createFilterQuery([
      createFilterRule(['city'], { operator: 'is', value: 'a:is:1,(b|c)' }),
    ]);
    const parsed = roundTrip(q);
    expect(parsed.ok).toBe(true);
    expect(parsed.query.rules).toHaveLength(1);
    expect(parsed.query.rules[0]).toMatchObject({ value: 'a:is:1,(b|c)' });
  });
});

describe('drafts do not travel (§13)', () => {
  it('omits a rule with no operator, without leaving a dangling separator', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterRule(['premium']),
      createFilterRule(['city'], { operator: 'contains', value: 'Rio' }),
    ]);
    const text = serializeFilterQuery(q);
    // `a,,b` would no longer parse — the empty part must be filtered, not joined.
    expect(text).not.toContain(',,');
    expect(parseFilterQuery(text, FIELDS).query.rules).toHaveLength(2);
  });

  it('omits a group whose children were all drafts', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterGroup('or', [createFilterRule(['premium'])]),
    ]);
    expect(serializeFilterQuery(q)).toBe('status:is:"Active"');
  });

  it('omits a rule still missing its VALUE, when given the schema', () => {
    // The builder is in this state after every field-then-operator choice.
    // Emitting `status:is` made the reader report a dropped filter for work
    // the user had not finished.
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'Active' }),
      createFilterRule(['premium'], { operator: 'gt' }),
    ]);
    expect(serializeFilterQuery(q, FIELDS)).toBe('status:is:"Active"');
    // A value-LESS operator is complete and still travels.
    const empty = createFilterQuery([createFilterRule(['premium'], { operator: 'is_empty' })]);
    expect(serializeFilterQuery(empty, FIELDS)).toBe('premium:is_empty');
  });

  it('restores a value-less rule as a DRAFT, not as a dropped filter', () => {
    // Defence for a hand-edited or half-saved link: field and operator are
    // both valid, so this is unfinished work, not an error to blame on them.
    const r = parseFilterQuery('status:is:"Active",premium:gt', FIELDS);
    expect(r.ok).toBe(true);
    expect(r.dropped).toHaveLength(0);
    expect(r.query.rules).toHaveLength(2);
    expect(r.query.rules[1]).toMatchObject({ path: ['premium'], operator: 'gt' });
    // No `value` key at all, which is what an untouched draft looks like.
    expect('value' in r.query.rules[1]).toBe(false);
  });

  it('serializes an empty query to an empty string', () => {
    expect(serializeFilterQuery(createFilterQuery())).toBe('');
  });
});

describe('a link is untrusted input, and stale links are the common case', () => {
  it('drops a field that no longer exists and says so', () => {
    const r = parseFilterQuery('status:is:"Active",ghost:is:"1"', FIELDS);
    expect(r.query.rules).toHaveLength(1);
    expect(r.ok).toBe(false);
    expect(r.dropped).toEqual([{ raw: 'ghost:is:"1"', reason: 'unknown-field' }]);
  });

  it('refuses a field the product has hidden or disabled', () => {
    // The picker hides one and refuses the other, so a link naming either did
    // not come from this UI. Honouring it would filter on a field that has
    // been deliberately withdrawn.
    const guarded: FilterField[] = [
      { id: 'secret', label: 'Secret', type: 'text', hidden: true },
      { id: 'off', label: 'Off', type: 'text', disabled: true },
      {
        id: 'group',
        label: 'Group',
        type: 'select',
        hidden: true,
        fields: [{ id: 'child', label: 'Child', type: 'text' }],
      },
    ];
    for (const path of ['secret:is:"x"', 'off:is:"x"', 'group.child:is:"x"']) {
      const r = parseFilterQuery(path, guarded);
      expect({ path, rules: r.query.rules.length, reason: r.dropped[0]?.reason }).toEqual({
        path,
        rules: 0,
        reason: 'not-filterable',
      });
    }
  });

  it('refuses a branch, which has no value to compare', () => {
    const r = parseFilterQuery('location:is:"BR"', FIELDS);
    expect(r.query.rules).toHaveLength(0);
    expect(r.dropped[0].reason).toBe('not-filterable');
  });

  it('drops an operator the field cannot support', () => {
    // A link made while Premium was text, opened after it became a number.
    const r = parseFilterQuery('premium:contains:"10"', FIELDS);
    expect(r.query.rules).toHaveLength(0);
    expect(r.dropped[0].reason).toBe('invalid-operator');
  });

  it('drops a value whose SHAPE the operator cannot take', () => {
    // `between` needs two bounds; a bare number would compile into something
    // the sender never asked for.
    const r = parseFilterQuery('premium:between:5', FIELDS);
    expect(r.query.rules).toHaveLength(0);
    expect(r.dropped[0].reason).toBe('invalid-value');
  });

  it('drops a value that is not valid JSON', () => {
    const r = parseFilterQuery('city:is:nope', FIELDS);
    expect(r.dropped[0].reason).toBe('invalid-value');
  });

  it('keeps the good rules from a partly stale link', () => {
    const r = parseFilterQuery('status:is:"Active",ghost:is:1,premium:gt:100', FIELDS);
    expect(r.query.rules).toHaveLength(2);
    expect(r.dropped).toHaveLength(1);
  });
});

describe('an ambiguous link is refused, not guessed', () => {
  it('rejects mixed combinators at one level', () => {
    // `a,b|c` could be `(a AND b) OR c` or `a AND (b OR c)`. Guessing shows
    // the recipient the wrong rows, which they cannot see is wrong.
    const r = parseFilterQuery('status:is:"Active",premium:gt:1|premium:lt:9', FIELDS);
    expect(r.ok).toBe(false);
    expect(r.dropped).toEqual([
      { raw: 'status:is:"Active",premium:gt:1|premium:lt:9', reason: 'malformed' },
    ]);
    // Empty filters show MORE rows, which is visible; a wrong query is not.
    expect(r.query.rules).toHaveLength(0);
  });

  it('rejects unbalanced parentheses', () => {
    expect(parseFilterQuery('(premium:gt:1', FIELDS).dropped[0].reason).toBe('malformed');
    expect(parseFilterQuery('premium:gt:1)', FIELDS).dropped[0].reason).toBe('malformed');
  });

  it('rejects a fragment with no operator at all', () => {
    expect(parseFilterQuery('premium', FIELDS).dropped[0].reason).toBe('malformed');
  });

  it('reads an empty string as no filters, not as an error', () => {
    const r = parseFilterQuery('', FIELDS);
    expect(r.ok).toBe(true);
    expect(r.dropped).toHaveLength(0);
    expect(r.query.rules).toHaveLength(0);
  });
});

describe('search-param plumbing', () => {
  it('removes the key entirely when nothing is filtered', () => {
    const params = new URLSearchParams('filter=premium%3Agt%3A1&page=2');
    const next = filterQueryToSearchParams(createFilterQuery(), params);
    // A trailing `?filter=` survives copy-paste and makes two identical views
    // look like different URLs.
    expect(next.has(FILTER_QUERY_PARAM)).toBe(false);
    expect(next.get('page')).toBe('2');
  });

  it('leaves other params untouched and does not mutate the input', () => {
    const params = new URLSearchParams('page=2&sort=name');
    const q = createFilterQuery([createFilterRule(['premium'], { operator: 'gt', value: 10 })]);
    const next = filterQueryToSearchParams(q, params);
    expect(next.get('page')).toBe('2');
    expect(next.get('sort')).toBe('name');
    expect(params.has(FILTER_QUERY_PARAM)).toBe(false);
  });

  it('round-trips through a real query string', () => {
    const q = createFilterQuery([
      createFilterRule(['city'], { operator: 'contains', value: 'Rio, Brazil' }),
      createFilterGroup('or', [
        createFilterRule(['premium'], { operator: 'gt', value: 1 }),
        createFilterRule(['premium'], { operator: 'lt', value: 9 }),
      ]),
    ]);
    const url = new URL('https://example.test/policies');
    url.search = filterQueryToSearchParams(q).toString();
    const back = filterQueryFromSearchParams(url.searchParams, FIELDS);
    expect(back.ok).toBe(true);
    expect(strip(back.query)).toEqual(strip(q));
  });

  it('encodes ONCE — no double-encoding on the way to the address bar', () => {
    const q = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Active' })]);
    const qs = filterQueryToSearchParams(q).toString();
    // `%25` is a percent sign that was itself encoded: the signature of a
    // value escaped here and then escaped again by URLSearchParams.
    expect(qs).not.toContain('%25');
    // One decode returns the readable form, which is what makes it debuggable.
    expect(decodeURIComponent(qs)).toBe('filter=status:is:"Active"');
  });

  it('reads a missing key as no filters', () => {
    expect(filterQueryFromSearchParams('page=2', FIELDS).query.rules).toHaveLength(0);
  });
});
