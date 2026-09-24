"use client"

import * as React from 'react';
import { Inbox, SearchX } from 'lucide-react';

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';
import { DataError } from './error-state';
import { Button } from './button';
import { Spinner } from './spinner';

/**
 * One vocabulary for the four states every data surface has.
 *
 * The problem this solves
 * -----------------------
 * Measured across the 75 modules in `src/components/ui/`:
 *
 *   loading prop     3  (under 4 different names)
 *   data-error prop  0
 *   empty prop       3  (under 3 names, 2 types)
 *
 * So a dashboard could not express a failed fetch at all, and a dead API
 * rendered as "No data yet" — indistinguishable from a genuinely empty
 * result, which is the worst failure mode available because it looks like an
 * answer.
 *
 * Why three layers rather than one
 * --------------------------------
 * `resolveDataStatus` is a pure function, `<DataState>` is the chrome, and
 * `DataStateProps` is the prop set components spread in. Each exists because
 * the others cannot do its job:
 *
 * - A wrapper alone would force every loading state to be a centred spinner
 *   that replaces the subtree. A table's loading state must be skeleton rows
 *   *inside its own tbody*, preserving column widths and the header — swapping
 *   the subtree gives you a layout jump on every fetch, and a KPI row that
 *   reflows when data lands.
 * - A prop set alone is what produced the divergence above. Three names and
 *   two types is what "every component renders its own branches" looks like
 *   after eighteen months.
 *
 * So the resolver is mandatory — one precedence rule, one place — and each
 * component chooses per branch whether to delegate to `<DataState>` or render
 * in place.
 */

export type DataStatus = 'loading' | 'error' | 'empty' | 'ready';

/** Why there is nothing to show. Drives the copy and the recovery action. */
export type EmptyReason = 'no-data' | 'no-results';

export interface DataStateProps {
  /** A request is in flight. Already the repo's only spelling for this. */
  loading?: boolean;

  /**
   * The fetch failed. **Not form validation** — see the note on naming below.
   * Accepts a boolean, an Error, or a node to render as the description.
   */
  loadError?: React.ReactNode | Error | boolean | null;

  /** Re-run the failed load. Renders "Try again"; omitted entirely when absent. */
  onRetry?: () => void;

  /**
   * Why the result is empty. `no-results` means a filter excluded everything,
   * which is a different message and a different recovery action from having
   * no data at all.
   */
  emptyReason?: EmptyReason;

  /** Clears the filters that produced a `no-results` empty. */
  onClearFilters?: () => void;

  /** Full override of the empty branch. The canonical name across the system. */
  emptyState?: React.ReactNode;
  /** Copy-only overrides, for the common case that just wants different words. */
  emptyTitle?: React.ReactNode;
  emptyDescription?: React.ReactNode;
  emptyAction?: React.ReactNode;

  /** Full overrides of the other two branches. */
  loadingState?: React.ReactNode;
  errorState?: React.ReactNode;
}

/**
 * Decide which branch renders. **Precedence: loading > error > empty > ready.**
 *
 * Loading-first is deliberate and is the one genuinely contestable call here.
 * Error-first looks more defensive — a stuck spinner is unrecoverable while a
 * spurious error still offers Retry — but it breaks the most common real
 * sequence there is: the user clicks Retry, `loading` flips true, the consumer
 * has not cleared `loadError` yet, and they are left staring at the error they
 * just tried to dismiss.
 *
 * The stuck-loading case is caught instead by a dev warning, which fires where
 * the bug actually is rather than degrading the UI for everyone.
 */
export function resolveDataStatus(
  input: { loading?: boolean; loadError?: unknown; isEmpty?: boolean },
  component?: string
): DataStatus {
  const { loading, loadError, isEmpty } = input;

  if (import.meta.env?.DEV && loading && loadError) {
    warnOnce(
      `${component ?? 'DataState'}: \`loading\` and \`loadError\` are both set. ` +
        'Rendering the loading state. Clear `loadError` when a retry starts, or ' +
        'the user sees a spinner over a stale failure.'
    );
  }

  if (loading) return 'loading';
  if (loadError) return 'error';
  if (isEmpty) return 'empty';
  return 'ready';
}

// Mirrors the warn-once machinery in prop-compat.ts: a noisy dev warning that
// fires on every render is one people learn to ignore.
const warned = new Set<string>();
function warnOnce(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  // eslint-disable-next-line no-console
  console.warn(`[mds] ${message}`);
}

/** Reset the warn-once cache. Test-only. */
export function __resetDataStateWarnings() {
  warned.clear();
}

/**
 * Default copy. Lifted from `data-table.tsx`, which had the best-written empty
 * states in the repo — the `no-results` text tells the user what to *do*, not
 * just what happened. Standardising on the better wording rather than a
 * generic one is the point of having a contract.
 */
const EMPTY_COPY: Record<EmptyReason, { title: string; description: string }> = {
  'no-data': {
    title: 'No data yet',
    description: 'There is nothing to show here yet.',
  },
  'no-results': {
    title: 'No matching results',
    description:
      'No rows match your current filters. Try a different term, or clear them to see everything.',
  },
};

export interface DataStateComponentProps extends DataStateProps {
  /** Fully controlled: skip resolution and render this branch. */
  status?: DataStatus;
  /** Computed by the component (`rows.length === 0`), never passed by consumers. */
  isEmpty?: boolean;
  /** Rendered when the status is `ready`. */
  children?: React.ReactNode;
  /** Names the component in dev warnings. */
  name?: string;
}

/**
 * Renders the right branch for the resolved status.
 *
 * Use it for the empty and error branches of any data surface. Use it for
 * loading too *unless* the component has a structural loading state worth
 * preserving — a table's skeleton rows, a KPI tile's skeleton value — in
 * which case render that in place and let this handle the other two.
 */
export function DataState({
  status,
  loading,
  loadError,
  isEmpty,
  onRetry,
  emptyReason = 'no-data',
  onClearFilters,
  emptyState,
  emptyTitle,
  emptyDescription,
  emptyAction,
  loadingState,
  errorState,
  children,
  name,
}: DataStateComponentProps) {
  const resolved = status ?? resolveDataStatus({ loading, loadError, isEmpty }, name);

  if (resolved === 'loading') {
    if (loadingState) return <>{loadingState}</>;
    // No role/aria here: `Spinner` already carries `role="status"` and
    // `aria-label="Loading"`, and `role="status"` implies `aria-live="polite"`.
    // Restating them on the wrapper produced two status regions announcing
    // "Loading" twice.
    return (
      <div className="flex min-h-40 flex-1 items-center justify-center p-6">
        <Spinner />
      </div>
    );
  }

  if (resolved === 'error') {
    if (errorState) return <>{errorState}</>;
    // A ReactNode error becomes the description; a bare `true`/Error keeps the
    // generic copy, because an Error's `.message` is written for developers.
    const description =
      loadError && typeof loadError !== 'boolean' && !(loadError instanceof Error)
        ? (loadError as React.ReactNode)
        : undefined;
    return <DataError description={description} onRetry={onRetry} />;
  }

  if (resolved === 'empty') {
    if (emptyState) return <>{emptyState}</>;
    const copy = EMPTY_COPY[emptyReason];
    const Icon = emptyReason === 'no-results' ? SearchX : Inbox;
    const action =
      emptyAction ??
      (emptyReason === 'no-results' && onClearFilters ? (
        <Button variant="secondary" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : null);

    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>{emptyTitle ?? copy.title}</EmptyTitle>
          <EmptyDescription>{emptyDescription ?? copy.description}</EmptyDescription>
        </EmptyHeader>
        {action && <EmptyContent>{action}</EmptyContent>}
      </Empty>
    );
  }

  return <>{children}</>;
}
