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
    // The provider writes to <html>; without this a mode set by one test is
    // the starting DOM state of the next.
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');
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

  // The mode is published to the DOM twice over: the `dark` class (Tailwind's
  // `dark:` variant, `darkMode: ['class']`, currentDomMode's fallback) and
  // `data-theme` (the generated token layer, src/styles/generated/mds-tokens.css).
  // Both are asserted because dropping either one breaks colour silently — no
  // error, just the wrong palette. See docs/tasks/token-pipeline-migration.md.
  it('publishes light mode to the DOM as both the class and data-theme', () => {
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('publishes dark mode to the DOM as both the class and data-theme', () => {
    localStorage.setItem('mds-theme-mode', 'dark');
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('moves both the class and data-theme on toggle, in step', () => {
    render(
      <ThemeModeProvider>
        <ThemeModeConsumer />
      </ThemeModeProvider>
    );
    act(() => {
      screen.getByRole('button').click();
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.dataset.theme).toBe('dark');
    act(() => {
      screen.getByRole('button').click();
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('light');
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
