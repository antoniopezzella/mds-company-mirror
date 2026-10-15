/**
 * @vitest-environment node
 *
 * Server-render regression test.
 *
 * Separate file, and separate environment, on purpose: the rest of the suite
 * runs in jsdom, where `window` and `localStorage` always exist — so nothing
 * in it could ever have caught this. `ThemeModeProvider` read `localStorage`
 * directly in a `useState` initializer and threw
 * `ReferenceError: localStorage is not defined` on any server render. The
 * package README tells consumers to wrap their app in this provider, so a
 * Next.js or Remix consumer hit it on their very first render.
 *
 * `@vitest-environment node` is what makes this meaningful — it is the only
 * environment in this repo where `typeof window === 'undefined'`, which is
 * asserted below so the test cannot quietly degrade into a jsdom test that
 * passes for the wrong reason.
 */
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';

import { ThemeModeProvider, useThemeMode } from './ThemeModeContext';

function Probe() {
  const { mode } = useThemeMode();
  return <span data-testid="mode">{mode}</span>;
}

describe('ThemeModeProvider — server rendering', () => {
  it('has no DOM globals in this environment', () => {
    // Guards the test itself: if this file ever picks up the jsdom
    // environment, the assertions below stop testing SSR at all.
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it('renders without throwing when localStorage does not exist', () => {
    expect(() =>
      renderToString(
        <ThemeModeProvider>
          <Probe />
        </ThemeModeProvider>
      )
    ).not.toThrow();
  });

  it('renders light mode on the server, matching what the client hydrates with', () => {
    // The server has no stored preference and no OS preference to read, so
    // `getServerSnapshot` must be a constant. If it ever tried to guess, the
    // client would hydrate against markup it cannot reproduce.
    const html = renderToString(
      <ThemeModeProvider>
        <Probe />
      </ThemeModeProvider>
    );
    expect(html).toContain('light');
    expect(html).not.toContain('dark');
  });

  it('renders a consumer that calls useThemeMode outside any provider', () => {
    // The default context value must also be server-safe — it is what any
    // component rendered outside the provider reads.
    expect(() => renderToString(<Probe />)).not.toThrow();
  });
});
