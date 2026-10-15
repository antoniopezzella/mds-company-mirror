import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useFilterQuery } from './use-filter-query';
import { __resetFilterIds, createFilterQuery, createFilterRule } from './filters-query';
import type { FilterField } from './filters-schema';

beforeEach(() => {
  __resetFilterIds();
  window.history.replaceState(null, '', '/policies');
});

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
];

interface Policy {
  id: number;
  status: string;
  premium: number;
}
const DATA: Policy[] = [
  { id: 1, status: 'Active', premium: 12400 },
  { id: 2, status: 'Active', premium: 8200 },
  { id: 3, status: 'Expired', premium: 15900 },
];

describe('change metadata reaches the caller', () => {
  it('forwards the reason, which cannot be reconstructed by diffing trees', () => {
    // `setQuery` declared a `meta` argument and silently dropped it, so the
    // one seam a consumer wires `onQueryChange` to lost the reason entirely.
    const seen: Array<string | undefined> = [];
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, onChange: (_q, m) => seen.push(m?.reason) })
    );
    act(() => {
      result.current.setQuery(createFilterQuery([]), { reason: 'clear' });
    });
    expect(seen).toEqual(['clear']);
  });
});

describe('rows follow the query', () => {
  it('returns everything when nothing is set', () => {
    const { result } = renderHook(() => useFilterQuery(DATA, { fields: FIELDS }));
    expect(result.current.rows).toHaveLength(3);
    expect(result.current.count).toBe(0);
  });

  it('applies the query and counts executable rules only', () => {
    const { result } = renderHook(() => useFilterQuery(DATA, { fields: FIELDS }));
    act(() => {
      result.current.setQuery(
        createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'Active' }),
          // A draft must not narrow the rows or inflate the badge (§13, §25).
          createFilterRule(['premium']),
        ])
      );
    });
    expect(result.current.rows.map((r) => r.id)).toEqual([1, 2]);
    expect(result.current.count).toBe(1);
  });

  it('resets back to everything', () => {
    const { result } = renderHook(() => useFilterQuery(DATA, { fields: FIELDS }));
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Expired' })])
      );
    });
    expect(result.current.rows).toHaveLength(1);
    act(() => result.current.reset());
    expect(result.current.rows).toHaveLength(3);
  });
});

describe('URL sync (§37)', () => {
  it('does not touch the URL unless asked', () => {
    const { result } = renderHook(() => useFilterQuery(DATA, { fields: FIELDS }));
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Active' })])
      );
    });
    expect(window.location.search).toBe('');
    // The serialized form is still offered, so a caller can build its own link.
    expect(result.current.serialized).toBe('status:is:"Active"');
  });

  it('writes the query into ?filter= and removes the key when cleared', () => {
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Active' })])
      );
    });
    expect(decodeURIComponent(window.location.search)).toBe('?filter=status:is:"Active"');

    act(() => result.current.reset());
    // Not `?filter=` — an empty key survives copy-paste and makes two
    // identical views look like different URLs.
    expect(window.location.search).toBe('');
  });

  it('applies an incoming link on the FIRST render, not after one', () => {
    window.history.replaceState(null, '', '/policies?filter=status%3Ais%3A%22Expired%22');
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    // Reading the URL in an effect would render the unfiltered rows first,
    // which reads as the page losing the recipient's filters for a frame.
    expect(result.current.rows.map((r) => r.id)).toEqual([3]);
  });

  it('keeps other params, and does not push history entries', () => {
    window.history.replaceState(null, '', '/policies?page=2');
    const before = window.history.length;
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['premium'], { operator: 'gt', value: 10000 })])
      );
    });
    expect(window.location.search).toContain('page=2');
    // Back should leave the page, not step through fourteen filter edits.
    expect(window.history.length).toBe(before);
  });

  it('takes a custom key, so two tables on one page do not collide', () => {
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: 'policies' })
    );
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Active' })])
      );
    });
    expect(window.location.search).toContain('policies=');
    expect(window.location.search).not.toContain('filter=');
  });

  it('reports what a stale link named and cannot apply', () => {
    window.history.replaceState(
      null,
      '',
      `/policies?filter=${encodeURIComponent('status:is:"Active",ghost:is:1')}`
    );
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    expect(result.current.dropped).toEqual([{ raw: 'ghost:is:1', reason: 'unknown-field' }]);
    // The good half still applied.
    expect(result.current.rows.map((r) => r.id)).toEqual([1, 2]);
  });

  it('stops reporting a stale link once the user edits the filters', () => {
    window.history.replaceState(
      null,
      '',
      `/policies?filter=${encodeURIComponent('ghost:is:1')}`
    );
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    expect(result.current.dropped).toHaveLength(1);
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Active' })])
      );
    });
    // The notice answered a question the user has now answered themselves.
    expect(result.current.dropped).toHaveLength(0);
  });

  it('SURVIVES a schema that loads after the link does', () => {
    // A schema fetched from a server is empty on the first render. The link
    // was being dropped against the empty schema and then ERASED from the
    // address bar, so reloading could not recover it — the recipient's shared
    // view was simply gone.
    window.history.replaceState(null, '', '/policies?filter=status%3Ais%3A%22Expired%22');
    const { result, rerender } = renderHook(
      ({ fields }) => useFilterQuery(DATA, { fields, syncToUrl: true }),
      { initialProps: { fields: [] as FilterField[] } }
    );

    // Nothing resolves yet — but the URL is left exactly as it arrived.
    expect(result.current.rows).toHaveLength(3);
    expect(decodeURIComponent(window.location.search)).toBe('?filter=status:is:"Expired"');

    rerender({ fields: FIELDS });
    expect(result.current.rows.map((r) => r.id)).toEqual([3]);
    expect(result.current.dropped).toHaveLength(0);
  });

  it('does not loop when `fields` is a new array identity every render', () => {
    window.history.replaceState(null, '', '/policies?filter=status%3Ais%3A%22Active%22');
    let renders = 0;
    const { rerender } = renderHook(() => {
      renders += 1;
      // The common caller mistake: an inline literal, new on every render.
      return useFilterQuery(DATA, { fields: [...FIELDS], syncToUrl: true });
    });
    const after = renders;
    rerender();
    // Comparing the serialized form before setting state is what stops the
    // re-parse effect from feeding itself.
    expect(renders).toBeLessThanOrEqual(after + 2);
  });

  it('does not write a half-built rule into the URL', () => {
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['premium'], { operator: 'gt' })])
      );
    });
    // Reloading mid-edit used to show "1 filter could not be applied".
    expect(window.location.search).toBe('');
  });

  it('follows browser Back instead of silently disagreeing with the URL', () => {
    // Back and Forward change the URL without re-rendering the hook, so the
    // query and the address bar drifted apart after either one.
    const { result } = renderHook(() =>
      useFilterQuery(DATA, { fields: FIELDS, syncToUrl: true })
    );
    act(() => {
      result.current.setQuery(
        createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'Expired' })])
      );
    });
    expect(result.current.rows.map((r) => r.id)).toEqual([3]);

    act(() => {
      window.history.replaceState(null, '', '/policies');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(result.current.rows).toHaveLength(3);
  });

  it('prefers the link over defaultQuery, because the link is the request', () => {
    window.history.replaceState(null, '', '/policies?filter=status%3Ais%3A%22Expired%22');
    const { result } = renderHook(() =>
      useFilterQuery(DATA, {
        fields: FIELDS,
        syncToUrl: true,
        defaultQuery: createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'Active' }),
        ]),
      })
    );
    expect(result.current.rows.map((r) => r.id)).toEqual([3]);
  });

  it('falls back to defaultQuery when the link carries no filter', () => {
    const { result } = renderHook(() =>
      useFilterQuery(DATA, {
        fields: FIELDS,
        syncToUrl: true,
        defaultQuery: createFilterQuery([
          createFilterRule(['status'], { operator: 'is', value: 'Expired' }),
        ]),
      })
    );
    expect(result.current.rows.map((r) => r.id)).toEqual([3]);
  });
});
