import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('exposes a status role and an accessible name', () => {
    render(<Spinner />);
    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-label', 'Loading');
  });

  it('animates and defaults to size-4', () => {
    render(<Spinner />);
    const el = screen.getByRole('status');
    expect(el).toHaveClass('animate-spin');
    expect(el).toHaveClass('size-4');
  });

  it('a custom size class wins via twMerge, keeping animate-spin', () => {
    render(<Spinner className="size-8" />);
    const el = screen.getByRole('status');
    expect(el).toHaveClass('size-8');
    expect(el).toHaveClass('animate-spin');
    // twMerge drops the conflicting default rather than emitting both.
    expect(el).not.toHaveClass('size-4');
  });

  it('spreads arbitrary svg props onto the element', () => {
    render(<Spinner data-testid="spin" />);
    expect(screen.getByTestId('spin')).toBe(screen.getByRole('status'));
  });
});
