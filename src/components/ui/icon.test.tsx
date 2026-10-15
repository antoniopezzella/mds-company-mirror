import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders the Material Symbols class and the ligature name as its text', () => {
    render(<Icon name="info" data-testid="i" />);
    const el = screen.getByTestId('i');
    expect(el).toHaveClass('material-symbols-outlined');
    expect(el).toHaveTextContent('info');
  });

  it('is decorative (aria-hidden, no role) when no aria-label is given', () => {
    render(<Icon name="info" data-testid="i" />);
    const el = screen.getByTestId('i');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).not.toHaveAttribute('role');
  });

  it('is a labelled image when aria-label is provided', () => {
    render(<Icon name="warning" aria-label="Warning" />);
    const el = screen.getByRole('img', { name: 'Warning' });
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveAttribute('aria-hidden');
  });

  it('drives the FILL axis via font-variation-settings', () => {
    const { rerender } = render(<Icon name="check_circle" data-testid="i" />);
    expect(screen.getByTestId('i').style.fontVariationSettings).toContain("'FILL' 0");
    rerender(<Icon name="check_circle" fill data-testid="i" />);
    expect(screen.getByTestId('i').style.fontVariationSettings).toContain("'FILL' 1");
  });

  it('sets font-size from the size prop', () => {
    render(<Icon name="close" size={32} data-testid="i" />);
    expect(screen.getByTestId('i').style.fontSize).toBe('32px');
  });
});
