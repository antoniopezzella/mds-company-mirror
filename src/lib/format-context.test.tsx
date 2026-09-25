/**
 * `FormatProvider` was exported from the package and consumed by nothing —
 * `StatCard`, the only component in the set that formats a value, imported the
 * raw formatters directly. So `<FormatProvider currency="EUR">` compiled,
 * type-checked, rendered, and changed no output anywhere.
 *
 * These tests assert the wiring rather than the formatters (which
 * `format.test.ts` covers): that the provider reaches a real component, that a
 * per-call option still beats it, and that nesting inherits.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { FormatProvider, useFormat, useFormatConfig } from './format-context';
import { StatCard } from '@/components/ui/stat-card';

function ConfigProbe() {
  const { locale, currency, placeholder } = useFormatConfig();
  return <span data-testid="config">{`${locale}|${currency}|${placeholder}`}</span>;
}

describe('FormatProvider — config resolution', () => {
  it('falls back to en-US/USD with no provider', () => {
    render(<ConfigProbe />);
    expect(screen.getByTestId('config')).toHaveTextContent('en-US|USD|—');
  });

  it('applies the provider values', () => {
    render(
      <FormatProvider locale="de-DE" currency="EUR" placeholder="n/a">
        <ConfigProbe />
      </FormatProvider>
    );
    expect(screen.getByTestId('config')).toHaveTextContent('de-DE|EUR|n/a');
  });

  it('inherits what a nested provider does not override', () => {
    render(
      <FormatProvider locale="de-DE" currency="EUR">
        <FormatProvider currency="GBP">
          <ConfigProbe />
        </FormatProvider>
      </FormatProvider>
    );
    // currency overridden, locale inherited — not reset to the default.
    expect(screen.getByTestId('config')).toHaveTextContent('de-DE|GBP|—');
  });
});

describe('useFormat — bound to the ambient config', () => {
  function MoneyProbe() {
    const f = useFormat();
    return <span data-testid="money">{f.currency(1234.5)}</span>;
  }

  it('formats with the provider currency', () => {
    render(
      <FormatProvider locale="en-GB" currency="GBP">
        <MoneyProbe />
      </FormatProvider>
    );
    expect(screen.getByTestId('money').textContent).toContain('£');
  });
});

describe('StatCard — actually consumes the provider', () => {
  // The regression test proper. Before this wiring, every assertion in this
  // block rendered "$1,235" regardless of the provider.
  it('uses the ambient currency', () => {
    render(
      <FormatProvider locale="en-GB" currency="GBP">
        <StatCard label="Premium" value={1234.5} format="currency" />
      </FormatProvider>
    );
    expect(screen.getByText(/£/)).toBeInTheDocument();
  });

  it('uses the ambient locale for grouping separators', () => {
    render(
      <FormatProvider locale="de-DE" currency="EUR">
        <StatCard label="Premium" value={1234567} format="number" />
      </FormatProvider>
    );
    // de-DE groups with '.', en-US with ','.
    expect(screen.getByText('1.234.567')).toBeInTheDocument();
  });

  it('lets a per-card formatOptions beat the provider', () => {
    render(
      <FormatProvider locale="en-GB" currency="GBP">
        <StatCard
          label="Premium"
          value={1234.5}
          format="currency"
          formatOptions={{ currency: 'JPY' }}
        />
      </FormatProvider>
    );
    expect(screen.getByText(/¥/)).toBeInTheDocument();
    expect(screen.queryByText(/£/)).not.toBeInTheDocument();
  });

  it('uses the ambient placeholder for a null value', () => {
    render(
      <FormatProvider placeholder="no data">
        <StatCard label="Premium" value={null} format="currency" />
      </FormatProvider>
    );
    expect(screen.getByText('no data')).toBeInTheDocument();
  });

  it('formats the delta with the ambient currency too', () => {
    render(
      <FormatProvider locale="en-GB" currency="GBP">
        <StatCard label="Premium" value={100} format="currency" delta={250} deltaFormat="currency" />
      </FormatProvider>
    );
    // Both the value and the delta badge should be in pounds.
    expect(screen.getAllByText(/£/).length).toBeGreaterThanOrEqual(2);
  });
});
