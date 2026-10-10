import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Separator, Divider } from './separator';

describe('Separator', () => {
  it('renders as decorative (no separator role) by default', () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('[role="separator"]')).not.toBeInTheDocument();
  });

  it('renders with a separator role when decorative is false', () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('defaults to horizontal orientation', () => {
    const { container } = render(<Separator decorative={false} />);
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('accepts a vertical orientation', () => {
    const { container } = render(<Separator decorative={false} orientation="vertical" />);
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'vertical');
  });
});

describe('Divider', () => {
  it('renders as a plain separator with no label by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders a centered label between two lines when label is provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
    // Labeled variant renders as a flex row, not the plain role="separator" div.
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('sets aria-orientation to match the orientation prop', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });
});
