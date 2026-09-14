import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Save Changes</Button>);
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('maps legacy variant aliases to the current variant classes', () => {
    const { container: ghostContainer } = render(<Button variant="ghost">Ghost</Button>);
    const { container: tertiaryContainer } = render(<Button variant="tertiary">Tertiary</Button>);
    expect(ghostContainer.querySelector('button')?.className).toBe(
      tertiaryContainer.querySelector('button')?.className
    );
  });

  it('composes variant + inverse into the inverse* variant classes', () => {
    const { container: inverseGhost } = render(
      <Button variant="ghost" inverse>
        Inverse ghost
      </Button>
    );
    const { container: inverseTertiary } = render(<Button variant="inverseTertiary">Inverse tertiary</Button>);
    expect(inverseGhost.querySelector('button')?.className).toBe(
      inverseTertiary.querySelector('button')?.className
    );
  });

  it('renders an icon-only button with an accessible label', () => {
    render(<Button iconOnly icon={<span data-testid="icon" />} aria-label="Close" />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('shows a loading spinner and disables the button while loading', () => {
    render(<Button loading>Submitting</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('is disabled when disabled is passed directly', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders asChild onto a single child element without throwing (Radix Slot requires exactly one element child)', () => {
    render(
      <Button asChild>
        <a href="#test">Go somewhere</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Go somewhere' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    // Slotted className/variant styling still applies to the child element.
    expect(link.className).toContain('inline-flex');
  });
});
