import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

// Exported (not just the hook) so Storybook's preview decorator can supply
// a controlled value driven by its own "Color Mode" toolbar, instead of
// ThemeModeProvider's own localStorage/OS-preference-reading state — see
// .storybook/preview.tsx.
export const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'light',
  toggleMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Persist preference in localStorage
    const stored = localStorage.getItem('mds-theme-mode');
    if (stored === 'dark' || stored === 'light') return stored;
    // Respect OS preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  // Tailwind's `darkMode: ['class']` (and getRoleColor's DOM-mode fallback,
  // see roles.ts) both key off this class — it's what makes the shadcn/ui
  // component set respond to the same mode as the MUI side, without every
  // one of those components needing to consume this context directly.
  //
  // Kept as a useEffect too (redundant with the sync write in toggleMode
  // below) as a safety net for any future path that calls setMode
  // directly. It is NOT sufficient on its own: it only runs after React
  // commits the render that the state change triggered — one render too
  // late. Any getRoleColor() call in that render already read the OLD
  // class value (nothing mutates it until this effect runs, and React has
  // no way to know a later DOM mutation should trigger another render) —
  // so inline-style colors would render stale for a beat, only correcting
  // themselves if something unrelated happened to force a second render.
  // index.html carries the equivalent fix for the very first paint.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      // Synchronous, not left to the effect above: this runs before React
      // re-renders in response to this same state update, so getRoleColor's
      // DOM-read fallback already sees the correct class on that render.
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('mds-theme-mode', next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
