import { describe, it, expect } from 'vitest';
import { theme } from '../theme';

type TypoKey = keyof typeof theme.typography;

const KEYS: TypoKey[] = [
  'h1','h2','h3','h4','h5','h6',
  'subtitle1','subtitle2',
  'body1','body2',
  'caption','overline',
  'button'
];

describe('theme.typography snapshot', () => {
  it('has expected public fields for key variants', () => {
    const snapshot: Record<string, unknown> = {};
    for (const k of KEYS) {
      const t = theme.typography[k];
      if (!t) continue;
      snapshot[k] = {
        fontFamily: t.fontFamily ?? theme.typography.fontFamily,
        fontSize: t.fontSize,
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
        fontWeight: t.fontWeight ?? 400,
      };
    }
    expect(snapshot).toMatchSnapshot();
  });
});
