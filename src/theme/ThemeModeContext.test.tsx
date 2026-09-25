import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeModeProvider, useThemeMode, __resetThemeMode } from './ThemeModeContext';

// Helper component that renders the current mode and exposes a toggle button
function ThemeModeConsumer() {
  const { mode, toggleMode } = useThemeMode();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleMode}>toggle</button>
    </div>
  );
}

describe('ThemeModeContext', () => {
  beforeEach(() => {
    __resetThemeMode();
    localStorage.clear();
    // Reset matchMedia mock before each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    });
  });

  it('defaults to light mode when no preference is stored or detected', () => {
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  it('reads persisted mode from localStorage', () => {
    localStorage.setItem('mds-theme-mode', 'dark');
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  it('respects OS dark preference when nothing is stored', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    });
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  it('toggles from light to dark', () => {
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    expect(screen.getByTestId('mode').textContent).toBe('light');
    act(() => {
      screen.getByRole('button').click();
    });
    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  it('toggles from dark back to light', () => {
    localStorage.setItem('mds-theme-mode', 'dark');
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    act(() => {
      screen.getByRole('button').click();
    });
    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  it('persists the new mode in localStorage after toggle', () => {
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    act(() => {
      screen.getByRole('button').click();
    });
    expect(localStorage.getItem('mds-theme-mode')).toBe('dark');
  });

  it('useThemeMode returns default context values when used outside a provider', () => {
    function Bare() {
      const { mode, toggleMode } = useThemeMode();
      return (
        <div>
          <span data-testid="bare-mode">{mode}</span>
          <button onClick={() => toggleMode()}>toggle</button>
        </div>
      );
    }
    render(<Bare />);
    expect(screen.getByTestId('bare-mode').textContent).toBe('light');
    // toggleMode default is a no-op — clicking it should not throw
    expect(() => fireEvent.click(screen.getByRole('button', { name: 'toggle' }))).not.toThrow();
  });
});
