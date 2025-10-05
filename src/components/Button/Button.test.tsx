import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSButton from './Button';

describe('DSButton', () => {
  it('renders label', () => {
    render(<DSButton variant="primary" tone="default">Click Me</DSButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
