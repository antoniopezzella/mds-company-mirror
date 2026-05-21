import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSButton from './Button';

describe('DSButton', () => {
  it('renders label', () => {
    render(<DSButton variant="primary" tone="default">Click Me</DSButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders leading and trailing icons with a visible label', () => {
    render(
      <DSButton
        variant="primaryAlt"
        startIcon={<span data-testid="leading-icon">L</span>}
        endIcon={<span data-testid="trailing-icon">T</span>}
      >
        Continue
      </DSButton>
    );

    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  it('renders icon-only buttons with an accessible label', () => {
    render(
      <DSButton
        variant="tertiary"
        iconOnly
        icon={<span data-testid="only-icon">I</span>}
        aria-label="Edit item"
      />
    );

    expect(screen.getByRole('button', { name: /edit item/i })).toBeInTheDocument();
    expect(screen.getByTestId('only-icon')).toBeInTheDocument();
  });
});
