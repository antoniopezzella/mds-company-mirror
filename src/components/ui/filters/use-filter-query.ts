"use client"

import * as React from 'react';

import { applyFilterQuery } from './adapters/predicate';
import { countFilterRules, createFilterQuery } from './filters-query';
import { fieldTypeAt, type FilterField } from './filters-schema';
import {
  FILTER_QUERY_PARAM,
  parseFilterQuery,
  serializeFilterQuery,
  type FilterQueryDropped,
} from './filters-url';
import type { FilterQuery, FilterQueryChangeMeta } from './filters-types';

/**
 * Query state plus the rows it selects — the one-line way to wire filters up.
 *
 * Everything under `filters/` is deliberately pure and decoupled, which is
 * right for the model and leaves the caller doing the same four lines every
 * time: hold a query, run the predicate, count the rules, remember the URL.
 * This is those four lines, and nothing else. It owns no DOM and renders
 * nothing, so it composes with `DataTable`, `DataGrid` or a list of cards
 * equally well.
 */

export interface UseFilterQueryOptions {
  fields: FilterField[];
  /** Starting point when nothing arrives from the URL. */
  defaultQuery?: FilterQuery;
  /**
   * Keep the query in `?filter=`, so a filtered view can be sent to someone
   * (§37). Pass a string to use a different key — two filtered tables on one
   * page need two keys or they overwrite each other.
   *
   * Router-agnostic, via `history.replaceState`: it does not push history
   * entries, because Back should leave the page rather than step through
   * fourteen filter edits. If you use a router, own the query yourself and
   * pass `query`/`onQueryChange` to `Filters` instead.
   */
  syncToUrl?: boolean | string;
}

export interface UseFilterQueryResult<T> {
  query: FilterQuery;
  setQuery: (next: FilterQuery, meta?: FilterQueryChangeMeta) => void;
  /** `data` with the query applied. Incomplete rules are skipped (§13). */
  rows: T[];
  /** Executable rules, for a badge on a "Filters" button (§25). */
  count: number;
  /** The serialized query — the `?filter=` value. */
  serialized: string;
  /**
   * Anything the incoming URL named that the schema no longer has. Non-empty
   * means the user should be TOLD rather than left wondering why their link
   * came back with fewer filters than they sent.
   */
  dropped: FilterQueryDropped[];
  reset: () => void;
}

export function useFilterQuery<T>(
  data: T[],
  { fields, defaultQuery, syncToUrl = false }: UseFilterQueryOptions
): UseFilterQueryResult<T> {
  const key = typeof syncToUrl === 'string' ? syncToUrl : FILTER_QUERY_PARAM;
  const enabled = syncToUrl !== false;

  // Read the URL ONCE, in the initializer. Reading it in an effect would
  // render the unfiltered rows first and then swap them, which reads as the
  // page losing the recipient's filters for a frame.
  const [initial] = React.useState(() => {
    if (!enabled || typeof window === 'undefined') {
      return { query: defaultQuery ?? createFilterQuery(), dropped: [] as FilterQueryDropped[] };
    }
    const raw = new URLSearchParams(window.location.search).get(key);
    if (!raw) return { query: defaultQuery ?? createFilterQuery(), dropped: [] as FilterQueryDropped[] };
    const parsed = parseFilterQuery(raw, fields);
    return { query: parsed.query, dropped: parsed.dropped };
  });

  const [query, setQueryState] = React.useState<FilterQuery>(initial.query);
  const [dropped, setDropped] = React.useState<FilterQueryDropped[]>(initial.dropped);

  const serialized = React.useMemo(() => serializeFilterQuery(query), [query]);

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (serialized) params.set(key, serialized);
    else params.delete(key);
    const search = params.toString();
    const next = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
    // Only when it actually differs: writing the identical URL on every render
    // is a wasted history operation and, in some browsers, a throttled one.
    if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(window.history.state, '', next);
    }
  }, [serialized, key, enabled]);

  const setQuery = React.useCallback((next: FilterQuery) => {
    setQueryState(next);
    // A user edit answers whatever the incoming link got wrong, so the notice
    // stops applying the moment they touch it.
    setDropped((d) => (d.length ? [] : d));
  }, []);

  const typeOf = React.useCallback((path: string[]) => fieldTypeAt(fields, path), [fields]);

  const rows = React.useMemo(
    () => applyFilterQuery(data, query, fields),
    [data, query, fields]
  );
  const count = React.useMemo(() => countFilterRules(query, typeOf), [query, typeOf]);

  const reset = React.useCallback(() => setQuery(createFilterQuery()), [setQuery]);

  return { query, setQuery, rows, count, serialized, dropped, reset };
}
