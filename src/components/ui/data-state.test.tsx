import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DataState, resolveDataStatus, __resetDataStateWarnings } from './data-state';

beforeEach(() => __resetDataStateWarnings());

describe('resolveDataStatus', () => {
  it('returns ready when nothing is set', () => {
    expect(resolveDataStatus({})).toBe('ready');
  });

  it('resolves each state in isolation', () => {
    expect(resolveDataStatus({ loading: true })).toBe('loading');
    expect(resolveDataStatus({ loadError: new Error('boom') })).toBe('error');
    expect(resolveDataStatus({ isEmpty: true })).toBe('empty');
  });

  it('prefers loading over error', () => {
    // The sequence this protects: user clicks Retry, `loading` flips true, the
    // consumer has not cleared `loadError` yet. Error-first would leave them
    // staring at the error they just tried to dismiss.
    expect(resolveDataStatus({ loading: true, loadError: true })).toBe('loading');
  });

  it('prefers error over empty', () => {
    // A failed fetch usually also yields zero rows. Reporting that as "no data"
    // is the exact bug this contract exists to prevent — it looks like an answer.
    expect(resolveDataStatus({ loadError: true, isEmpty: true })).toBe('error');
  });

  it('warns once when loading and loadError are both set', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    resolveDataStatus({ loading: true, loadError: true }, 'Widget');
    resolveDataStatus({ loading: true, loadError: true }, 'Widget');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('Widget');
    warn.mockRestore();
  });

  it('treats a falsy loadError as no error', () => {
    // `loadError={null}` after a successful retry must not pin the error state.
    expect(resolveDataStatus({ loadError: null })).toBe('ready');
    expect(resolveDataStatus({ loadError: false })).toBe('ready');
    expect(resolveDataStatus({ loadError: '' })).toBe('ready');
  });
});

describe('DataState', () => {
  it('renders children when ready', () => {
    render(<DataState>the data</DataState>);
    expect(screen.getByText('the data')).toBeInTheDocument();
  });

  it('announces loading exactly once and hides the content', () => {
    render(<DataState loading>the data</DataState>);
    // Exactly one: Spinner already carries role="status" + aria-label, so a
    // wrapper restating them announced "Loading" twice.
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading');
    expect(screen.queryByText('the data')).not.toBeInTheDocument();
  });

  it('renders the error branch as an alert so it is announced', () => {
    render(<DataState loadError>the data</DataState>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Could not load this data')).toBeInTheDocument();
  });

  it('offers retry only when a handler is given', () => {
    const { rerender } = render(<DataState loadError>x</DataState>);
    // Never a disabled button: that reads as "you may not retry" rather than
    // "there is nothing to retry".
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();

    const onRetry = vi.fn();
    rerender(
      <DataState loadError onRetry={onRetry}>
        x
      </DataState>
    );
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('uses a ReactNode loadError as the description', () => {
    render(<DataState loadError={<span>Gateway timeout</span>}>x</DataState>);
    expect(screen.getByText('Gateway timeout')).toBeInTheDocument();
  });

  it('does not leak an Error message into the UI', () => {
    // `.message` is written for developers, not users.
    render(<DataState loadError={new Error('ECONNREFUSED 10.0.0.2:5432')}>x</DataState>);
    expect(screen.queryByText(/ECONNREFUSED/)).not.toBeInTheDocument();
    expect(screen.getByText('Could not load this data')).toBeInTheDocument();
  });

  it('distinguishes no-data from no-results', () => {
    const { rerender } = render(<DataState isEmpty>x</DataState>);
    expect(screen.getByText('No data yet')).toBeInTheDocument();

    rerender(
      <DataState isEmpty emptyReason="no-results">
        x
      </DataState>
    );
    expect(screen.getByText('No matching results')).toBeInTheDocument();
  });

  it('offers Clear filters only for a filtered empty', () => {
    const onClearFilters = vi.fn();
    const { rerender } = render(
      <DataState isEmpty onClearFilters={onClearFilters}>
        x
      </DataState>
    );
    // no-data is not recoverable by clearing filters, so no action.
    expect(screen.queryByRole('button', { name: /clear filters/i })).not.toBeInTheDocument();

    rerender(
      <DataState isEmpty emptyReason="no-results" onClearFilters={onClearFilters}>
        x
      </DataState>
    );
    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));
    expect(onClearFilters).toHaveBeenCalledOnce();
  });

  it('honours copy overrides and full slot overrides', () => {
    const { rerender } = render(
      <DataState isEmpty emptyTitle="No policies" emptyDescription="Add one to begin">
        x
      </DataState>
    );
    expect(screen.getByText('No policies')).toBeInTheDocument();
    expect(screen.getByText('Add one to begin')).toBeInTheDocument();

    rerender(
      <DataState isEmpty emptyState={<div>bespoke</div>}>
        x
      </DataState>
    );
    expect(screen.getByText('bespoke')).toBeInTheDocument();
    expect(screen.queryByText('No data yet')).not.toBeInTheDocument();
  });

  it('accepts a fully controlled status', () => {
    render(
      <DataState status="empty" loading>
        x
      </DataState>
    );
    // Explicit status wins over the shorthands.
    expect(screen.getByText('No data yet')).toBeInTheDocument();
  });

  it('renders no heading element in any branch', () => {
    // These blocks render inside tables and cards at unpredictable depths.
    // An unexpected heading is what broke heading order when StatCard
    // hardcoded <h3> under a page <h1>.
    for (const props of [{ loading: true }, { loadError: true }, { isEmpty: true }] as const) {
      const { container, unmount } = render(<DataState {...props}>x</DataState>);
      expect(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).toHaveLength(0);
      unmount();
    }
  });
});
