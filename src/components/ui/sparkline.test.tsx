import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { Sparkline } from './sparkline';

const polyline = (c: HTMLElement) => c.querySelector('polyline');

describe('Sparkline', () => {
  it('renders a polyline spanning the viewBox', () => {
    const { container } = render(<Sparkline data={[0, 5, 10]} />);
    expect(polyline(container)?.getAttribute('points')).toBe('0,100 50,50 100,0');
  });

  it('renders nothing for fewer than two points', () => {
    // A line needs two points; one would produce a degenerate path.
    expect(polyline(render(<Sparkline data={[]} />).container)).toBeNull();
    expect(polyline(render(<Sparkline data={[5]} />).container)).toBeNull();
  });

  it('draws a flat series down the middle instead of disappearing', () => {
    // span === 0 means dividing by zero -> NaN -> the path silently vanishes.
    // "No change" is a real and common answer for a KPI, so it must render.
    const { container } = render(<Sparkline data={[100, 100, 100]} />);
    const points = polyline(container)?.getAttribute('points') ?? '';
    expect(points).not.toContain('NaN');
    expect(points).toBe('0,50 50,50 100,50');
  });

  it('is hidden from assistive tech', () => {
    // The trend is already stated in the delta text beside it, and a screen
    // reader cannot usefully consume a polyline.
    const { container } = render(<Sparkline data={[1, 2]} />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps the stroke width constant when stretched', () => {
    const { container } = render(<Sparkline data={[1, 2]} />);
    expect(polyline(container)).toHaveAttribute('vector-effect', 'non-scaling-stroke');
  });

  it('accepts an explicit colour override', () => {
    const { container } = render(<Sparkline data={[1, 2]} color="#ff0000" />);
    expect(polyline(container)).toHaveAttribute('stroke', '#ff0000');
  });
});
