import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Sparkline } from './sparkline';

describe('Sparkline', () => {
  it('renders a decorative (aria-hidden) svg for a valid series', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('renders nothing for fewer than two points (a line needs two)', () => {
    const { container } = render(<Sparkline data={[5]} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('draws a flat series down the middle (y=50) instead of vanishing', () => {
    const { container } = render(<Sparkline data={[5, 5, 5]} />);
    const poly = container.querySelector('polyline');
    expect(poly).toBeInTheDocument();
    const points = poly?.getAttribute('points') ?? '';
    // Every y coordinate is 50 when the series is flat.
    expect(points.split(' ').every((p) => p.endsWith(',50'))).toBe(true);
  });

  it('scales to a fixed domain, so a small wobble stays small', () => {
    const { container } = render(<Sparkline data={[5, 5.4, 5]} domain={[3.4, 5.4]} />);
    const ys = (container.querySelector('polyline')?.getAttribute('points') ?? '')
      .split(' ')
      .map((p) => Number(p.split(',')[1]));
    // 5 of 3.4–5.4 sits 80% up (y=20); 5.4 is the top (y=0). Without the
    // domain the same series would span the whole box (100 → 0 → 100).
    expect(ys[0]).toBeCloseTo(20);
    expect(ys[1]).toBeCloseTo(0);
    expect(ys[2]).toBeCloseTo(20);
  });

  it('forwards its ref to the svg element', () => {
    const ref = { current: null as SVGSVGElement | null };
    render(<Sparkline data={[1, 2]} ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('svg');
  });
});
