import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
  // The a11y contract is the whole point of this component: it is a purely
  // decorative icon that must still announce itself to assistive tech, since
  // it is the only indication that something is in flight.
  it('exposes itself as a status with an accessible name', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading');
  });

  it('animates by default', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').getAttribute('class')).toContain('animate-spin');
  });

  it('merges a caller className without dropping the animation', () => {
    render(<Spinner className="size-8" />);
    const cls = screen.getByRole('status').getAttribute('class') ?? '';
    expect(cls).toContain('size-8');
    expect(cls).toContain('animate-spin');
  });

  it('allows the accessible name to be overridden for context', () => {
    render(<Spinner aria-label="Saving changes" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Saving changes');
  });
});
