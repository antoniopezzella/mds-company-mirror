import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import { Inline, Stack } from './stack';

describe('Stack', () => {
  it('renders children in a vertical flex container', () => {
    render(
      <Stack data-testid="s">
        <span>a</span>
      </Stack>
    );
    const el = screen.getByTestId('s');
    expect(el).toHaveClass('flex', 'flex-col');
  });

  it('defaults to the 16px step', () => {
    render(<Stack data-testid="s" />);
    expect(screen.getByTestId('s')).toHaveClass('gap-4');
  });

  it('maps each gap step to a literal Tailwind class', () => {
    // Literal, not interpolated — Tailwind's scanner is plain text, so a
    // computed `gap-${n}` would compile to no CSS at all. This test is the
    // guard against someone "simplifying" the lookup table into a template
    // string, which would type-check and silently ship unstyled layouts.
    const cases = [
      [1, 'gap-1'],
      [6, 'gap-6'],
      [32, 'gap-32'],
    ] as const;
    for (const [gap, cls] of cases) {
      const { unmount } = render(<Stack data-testid="s" gap={gap} />);
      expect(screen.getByTestId('s')).toHaveClass(cls);
      unmount();
    }
  });

  it('applies align and justify only when asked', () => {
    const { rerender } = render(<Stack data-testid="s" />);
    expect(screen.getByTestId('s').className).not.toMatch(/items-|justify-/);

    rerender(<Stack data-testid="s" align="center" justify="between" />);
    expect(screen.getByTestId('s')).toHaveClass('items-center', 'justify-between');
  });

  it('merges a consumer className', () => {
    render(<Stack data-testid="s" className="mt-4" />);
    expect(screen.getByTestId('s')).toHaveClass('mt-4', 'flex');
  });

  it('renders as its child with asChild', () => {
    render(
      <Stack asChild>
        <section data-testid="s">content</section>
      </Stack>
    );
    const el = screen.getByTestId('s');
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveClass('flex', 'flex-col');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stack ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Inline', () => {
  it('is a horizontal flex row that wraps by default', () => {
    render(<Inline data-testid="i" />);
    const el = screen.getByTestId('i');
    expect(el).toHaveClass('flex', 'flex-row', 'flex-wrap');
  });

  it('can opt out of wrapping', () => {
    render(<Inline data-testid="i" wrap={false} />);
    expect(screen.getByTestId('i')).toHaveClass('flex-nowrap');
  });

  it('defaults to centre alignment and the 8px step', () => {
    render(<Inline data-testid="i" />);
    expect(screen.getByTestId('i')).toHaveClass('items-center', 'gap-2');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Inline ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
