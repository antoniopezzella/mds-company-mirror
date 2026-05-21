import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusCard from './StatusCard';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

describe('StatusCard', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders success variant correctly', () => {
    renderWithTheme(
      <StatusCard status="success" title="Success Title" message="Success message" />
    );
    expect(screen.getByText('Success Title')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders warning variant correctly', () => {
    renderWithTheme(
      <StatusCard status="warning" title="Warning Title" message="Warning message" />
    );
    expect(screen.getByText('Warning Title')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('renders error variant correctly', () => {
    renderWithTheme(
      <StatusCard status="error" title="Error Title" message="Error message" />
    );
    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders info variant correctly', () => {
    renderWithTheme(
      <StatusCard status="info" title="Info Title" message="Info message" />
    );
    expect(screen.getByText('Info Title')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(
      <StatusCard status="success" title="Title" message="Message" />
    );
    const card = screen.getByRole('alert');
    expect(card).toHaveAttribute('aria-live', 'polite');
  });
});
