import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ContrastStatus } from '../docs/_components/ContrastStatus';

// Simple mock fetch helper
const mockFetch = (payload: unknown, ok = true) => {
  global.fetch = vi.fn().mockResolvedValue({ ok, json: async () => payload });
};

describe('ContrastStatus', () => {
  const originalFetch = global.fetch;
  beforeEach(() => {
    (global.fetch as unknown) = undefined;
  });
  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('renders loading then badge data', async () => {
    mockFetch({ schemaVersion: 1, label: 'contrast', message: 'pass', color: 'brightgreen' });
    render(<ContrastStatus />);
    // Will throw if not present
    screen.getByText(/Loading contrast status/i);
    await waitFor(() => {
      screen.getByText(/contrast: pass/i);
    });
  });

  it('shows error when badge missing', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    render(<ContrastStatus />);
    await waitFor(() => {
      screen.getByText(/No contrast badge/);
    });
  });
});
