import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';

import {
  normalizeSize,
  SIZE_ALIASES,
  DEPRECATED_PROP_VALUES,
  __resetPropCompatWarnings,
} from './prop-compat';
import { Avatar } from './avatar';
import { BadgeAnchor } from './badge-anchor';

// The component set had grown 7 `size` vocabularies. Unifying them is only safe
// if the legacy spellings keep working identically — that equivalence is what
// these tests pin down, not the normalisation function in isolation.
//
// `tone` is NOT unified, and the last describe block pins that decision down too.

beforeEach(__resetPropCompatWarnings);

describe('size normalisation', () => {
  it.each([
    ['small', 'sm'],
    ['medium', 'md'],
    ['large', 'lg'],
    ['xlarge', 'xl'],
    ['Small', 'sm'],
    ['Medium', 'md'],
    ['Large', 'lg'],
  ])('maps legacy %s to %s', (legacy, canonical) => {
    expect(normalizeSize(legacy)).toBe(canonical);
  });

  it.each(['sm', 'md', 'lg', 'xl', 'fullscreen'])('passes canonical %s through unchanged', (v) => {
    expect(normalizeSize(v)).toBe(v);
  });

  it('leaves undefined alone so a component default still applies', () => {
    expect(normalizeSize(undefined)).toBeUndefined();
  });

  it('does not mangle an unrelated value', () => {
    expect(normalizeSize('comfortable')).toBe('comfortable');
  });
});

describe('deprecation warnings', () => {
  let warn: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => warn.mockRestore());

  it('warns once per legacy value, not once per call', () => {
    normalizeSize('small', 'Avatar');
    normalizeSize('small', 'Avatar');
    normalizeSize('small', 'Avatar');
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('names the component, the legacy value and its replacement', () => {
    normalizeSize('xlarge', 'Avatar');
    expect(warn.mock.calls[0][0]).toContain('Avatar');
    expect(warn.mock.calls[0][0]).toContain('size="xlarge"');
    expect(warn.mock.calls[0][0]).toContain('size="xl"');
  });

  it('stays silent on canonical values', () => {
    normalizeSize('sm', 'Avatar');
    normalizeSize('lg', 'Avatar');
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns separately for different components using the same legacy value', () => {
    normalizeSize('small', 'Avatar');
    normalizeSize('small', 'Select');
    expect(warn).toHaveBeenCalledTimes(2);
  });
});

describe('legacy and canonical props render identically', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  // The actual compatibility guarantee: upgrading must not move a single pixel
  // for a consumer still on the old spelling.
  it.each([
    ['small', 'sm'],
    ['medium', 'md'],
    ['large', 'lg'],
    ['xlarge', 'xl'],
  ])('Avatar size=%s matches size=%s', (legacy, canonical) => {
    const a = render(<Avatar initials="AP" size={legacy as 'small'} />);
    const legacyHtml = a.container.innerHTML;
    a.unmount();

    const b = render(<Avatar initials="AP" size={canonical as 'sm'} />);
    expect(b.container.innerHTML).toBe(legacyHtml);
  });

  it('BadgeAnchor size=small matches size=sm', () => {
    const a = render(
      <BadgeAnchor content={3} variant="number" size="small">
        <span>x</span>
      </BadgeAnchor>,
    );
    const legacyHtml = a.container.innerHTML;
    a.unmount();

    const b = render(
      <BadgeAnchor content={3} variant="number" size="sm">
        <span>x</span>
      </BadgeAnchor>,
    );
    expect(b.container.innerHTML).toBe(legacyHtml);
  });
});

describe('the deprecation record itself is intact', () => {
  // Lifted from scripts/validate-tokens.js, which validates the token
  // deprecation record rather than merely flagging usage: every deprecated
  // value must name a replacement, and that replacement must be real.
  it('every alias has a registry entry', () => {
    for (const legacy of Object.keys(SIZE_ALIASES)) {
      expect(DEPRECATED_PROP_VALUES[`size.${legacy}`], `size.${legacy}`).toBeDefined();
    }
  });

  it('every registry entry names a replacement and a rationale', () => {
    for (const [key, entry] of Object.entries(DEPRECATED_PROP_VALUES)) {
      expect(entry.replaceWith, `${key} replaceWith`).toBeTruthy();
      expect(entry.rationale, `${key} rationale`).toBeTruthy();
    }
  });

  it('each alias resolves to the replacement its registry entry promises', () => {
    for (const [legacy, canonical] of Object.entries(SIZE_ALIASES)) {
      expect(DEPRECATED_PROP_VALUES[`size.${legacy}`].replaceWith).toBe(canonical);
    }
  });
});

describe('tone is deliberately NOT unified', () => {
  // A form field's `error` is the state of its value (aria-invalid, :invalid,
  // WCAG 3.3.1). A Button's `danger` is the severity of an action. Collapsing
  // them loses meaning, and every benchmarked system keeps them separate —
  // Polaris goes further and uses `critical` for actions so the two can never
  // be confused. This test exists so the distinction is not "tidied away".
  it('has no tone aliases in the deprecation record', () => {
    const toneEntries = Object.keys(DEPRECATED_PROP_VALUES).filter((k) => k.startsWith('tone.'));
    expect(toneEntries).toEqual([]);
  });
});
