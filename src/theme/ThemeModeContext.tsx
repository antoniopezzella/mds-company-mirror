import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

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

const STORAGE_KEY = 'mds-theme-mode';

/** Last explicit in-session choice. See getClientMode. */
let memoryMode: ThemeMode | null = null;

/**
 * Clear the in-session choice. Test-only — mirrors `__resetDataStateWarnings`
 * in data-state.tsx. `localStorage.clear()` alone does NOT reset this, so
 * without it a toggle in one test silently sets the starting mode for the
 * next one.
 */
export function __resetThemeMode() {
  memoryMode = null;
}

/**
 * Read the mode from the browser. Called only on the client — see
 * `getServerMode` below.
 *
 * Both reads are wrapped: Safari private mode and "block all cookies" make
 * `localStorage` *throw on access*, not return null, and `matchMedia` is
 * absent in some embedded webviews. A theme preference is not worth taking
 * the whole app down for.
 */
function getClientMode(): ThemeMode {
  // Set by toggleMode. Takes precedence because it is the most recent explicit
  // choice, and because it is the ONLY record of that choice when storage is
  // blocked — without it a toggle in Safari private mode would write nothing,
  // read back the OS preference, and appear not to work at all.
  if (memoryMode) return memoryMode;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* storage blocked — fall through to OS preference */
  }
  try {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    /* no matchMedia — fall through to light */
  }
  return 'light';
}

/**
 * The server has no `localStorage` and no OS preference, so it renders light.
 * React calls this during SSR *and* during hydration, then re-renders with
 * `getClientMode()` once hydration completes — which is what keeps the markup
 * identical on both sides. index.html's inline script sets the `dark` class
 * before first paint, so the visual result is correct even during that first
 * client render; only the inline-style colors settle a beat later.
 */
const getServerMode = (): ThemeMode => 'light';

// A store rather than component state, because `useSyncExternalStore` is the
// only hook that can give the server and the client different initial values
// *without* tripping a hydration mismatch. The previous implementation read
// localStorage directly in a useState initializer, which threw
// `ReferenceError: localStorage is not defined` the moment anyone rendered
// this provider on a server (Next.js App Router, Remix, any RSC setup) — the
// package's own README suggests wrapping the app in it, so that was the first
// thing a consumer would hit.
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Cross-tab sync, attached once rather than per subscriber. Guarded because
// this module is imported on the server too, where `window` does not exist.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY) return;
    // Another tab just made a newer explicit choice than ours, so drop the
    // in-memory one rather than letting it shadow the fresher value.
    memoryMode = null;
    emit();
  });
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getClientMode, getServerMode);

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
    const next: ThemeMode = getClientMode() === 'light' ? 'dark' : 'light';
    memoryMode = next;
    // Synchronous, not left to the effect above: this runs before React
    // re-renders in response to this same store update, so getRoleColor's
    // DOM-read fallback already sees the correct class on that render.
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked. The class above still flips, so the toggle works for
      // this session — it just won't survive a reload. Better than throwing
      // out of a click handler.
    }
    // The write above is what `getClientMode()` reads, so notify after it.
    emit();
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
