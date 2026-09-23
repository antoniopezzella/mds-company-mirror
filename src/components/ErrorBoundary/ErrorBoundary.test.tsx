import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

// A component that throws an error on demand
function BrokenChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>Healthy child</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <BrokenChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Healthy child')).toBeTruthy();
  });

  it('renders the default fallback UI when a child throws', () => {
    // Suppress expected console.error output from React
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BrokenChild shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeTruthy();
    spy.mockRestore();
  });

  it('renders a custom fallback when provided', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <BrokenChild shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom fallback')).toBeTruthy();
    expect(screen.queryByText(/something went wrong/i)).toBeNull();
    spy.mockRestore();
  });

  it('displays a "Try Again" button in the default fallback', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BrokenChild shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: /try again/i })).toBeTruthy();
    spy.mockRestore();
  });

  it('resets the error state when "Try Again" is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const shouldThrow = true;
    const { rerender } = render(
      <ErrorBoundary>
        <BrokenChild shouldThrow={shouldThrow} />
      </ErrorBoundary>
    );
    // Boundary is showing fallback - rerender first with healthy child then reset
    rerender(
      <ErrorBoundary>
        <BrokenChild shouldThrow={false} />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByText('Healthy child')).toBeTruthy();
    spy.mockRestore();
  });

  it('displays a "Go to Home" button in the default fallback', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BrokenChild shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: /go to home/i })).toBeTruthy();
    spy.mockRestore();
  });
});
