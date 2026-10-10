import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders a block element', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('defaults to a small text-height when no explicit height is given', () => {
    const { container } = render(<Skeleton />);
    expect((container.firstElementChild as HTMLElement).style.height).toBe('1em');
  });

  it('defaults circular variant to a fixed 40px square', () => {
    const { container } = render(<Skeleton variant="circular" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
  });

  it('respects explicit width and height overrides', () => {
    const { container } = render(<Skeleton width={200} height={80} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('80px');
  });

  it('applies the pulse animation class by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild?.className).toMatch(/animate-pulse/);
  });

  it('applies no animation class when animation is false', () => {
    const { container } = render(<Skeleton animation={false} />);
    expect(container.firstElementChild?.className).not.toMatch(/animate-pulse/);
  });

  it('applies a fully rounded class for the circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstElementChild?.className).toMatch(/rounded-full/);
  });
});
