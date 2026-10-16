import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MetricCard } from './metric-card';

describe('MetricCard', () => {
  it('renders the value and label', () => {
    render(<MetricCard value="1,284" label="Active policies" />);
    expect(screen.getByText('1,284')).toBeInTheDocument();
    expect(screen.getByText('Active policies')).toBeInTheDocument();
  });

  it('forwards additional props like data-testid', () => {
    render(<MetricCard value="42" label="Claims" data-testid="metric" />);
    expect(screen.getByTestId('metric')).toBeInTheDocument();
  });

  it('merges a custom className onto the root without dropping base classes', () => {
    const { container } = render(<MetricCard value="42" label="Claims" className="custom" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/\bcustom\b/);
    expect(root.className).toMatch(/flex-col/);
  });

  it('forwards a ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<MetricCard value="42" label="Claims" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
