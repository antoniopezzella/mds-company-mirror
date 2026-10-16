import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { DataError } from './error-state';

describe('DataError', () => {
  it('announces itself with role="alert" and a default message', () => {
    render(<DataError />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Could not load this data')).toBeInTheDocument();
  });

  it('renders a custom title and description', () => {
    render(<DataError title="Boom" description="It broke" />);
    expect(screen.getByText('Boom')).toBeInTheDocument();
    expect(screen.getByText('It broke')).toBeInTheDocument();
  });

  it('renders a retry button only when onRetry is given, and calls it on click', () => {
    const onRetry = vi.fn();
    render(<DataError onRetry={onRetry} retryLabel="Retry" />);
    const btn = screen.getByRole('button', { name: 'Retry' });
    fireEvent.click(btn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders no button at all when onRetry is absent (never a disabled one)', () => {
    render(<DataError />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('introduces no heading, so it is safe to drop at any depth', () => {
    render(<DataError title="Failure" description="x" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('shows the technical detail when provided', () => {
    render(<DataError detail="trace-id: abc123" />);
    expect(screen.getByText('trace-id: abc123')).toBeInTheDocument();
  });
});
