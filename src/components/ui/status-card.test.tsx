import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import StatusCard from './status-card';

/**
 * Ported from src/components/StatusCard/StatusCard.test.tsx when the MUI
 * component was deleted. The shadcn counterpart is API-compatible, so the
 * assertions are unchanged — only the MUI ThemeProvider wrapper is gone,
 * since this component resolves colour through getRoleColor() directly.
 */
describe('StatusCard', () => {
  it.each([
    ['success', 'Success Title', 'Success message'],
    ['warning', 'Warning Title', 'Warning message'],
    ['error', 'Error Title', 'Error message'],
    ['info', 'Info Title', 'Info message'],
  ] as const)('renders the %s variant correctly', (status, title, message) => {
    render(<StatusCard status={status} title={title} message={message} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<StatusCard status="success" title="Title" message="Message" />);
    const card = screen.getByRole('alert');
    expect(card).toHaveAttribute('aria-live', 'polite');
  });

  it('renders a custom icon in place of the status default', () => {
    render(
      <StatusCard status="info" title="Title" message="Message" icon={<span data-testid="custom-icon" />} />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
