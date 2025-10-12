import { describe, test, expect } from 'vitest';
import { tokens } from '../tokens';
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens';

// Build effective dark semantic map (base + overrides)
const darkSemantic: Record<string, string> = { ...semanticColors, ...semanticDarkOverrides };

// Contrast utilities (mirrors logic in scripts/check-contrast.js)
function hexToRgb(hex: string) {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  const int = parseInt(full,16);
  return { r: (int>>16)&255, g: (int>>8)&255, b: int & 255 };
}
function luminanceChannel(c: number) {
  const v = c/255;
  return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
}
function relativeLuminance(rgb:{r:number;g:number;b:number}) {
  const R = luminanceChannel(rgb.r);
  const G = luminanceChannel(rgb.g);
  const B = luminanceChannel(rgb.b);
  return 0.2126*R + 0.7152*G + 0.0722*B;
}
function contrast(hex1:string, hex2:string) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1,L2);
  const darker = Math.min(L1,L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Threshold map (could expand later)
const REQUIREMENTS: Record<string, number> = {
  textPrimary: 4.5,
  textSecondary: 3.0,
  interactivePrimary: 3.0,
  focusRing: 3.0,
  statusSuccessText: 3.0,
  statusWarningText: 3.0,
  statusDangerText: 3.0,
};

describe('dark mode semantic contrast guard', () => {
  test('required semantic roles meet minimum contrast vs dark surfaceDefault', () => {
    const surface = darkSemantic.surfaceDefault;
    expect(surface).toBeDefined();
    const failures: { token: string; ratio: number; required: number }[] = [];
    for (const [token, required] of Object.entries(REQUIREMENTS)) {
      const value = darkSemantic[token];
      expect(value).toBeDefined();
      const ratio = contrast(value, surface);
      if (ratio < required) {
        failures.push({ token, ratio: Number(ratio.toFixed(2)), required });
      }
    }
    if (failures.length) {
      console.error('Dark mode contrast failures:', failures);
    }
    expect(failures).toHaveLength(0);
  });
  test('override values are valid primitive references', () => {
    const primitiveValues = new Set(Object.values(tokens));
    for (const v of Object.values(semanticDarkOverrides)) {
      expect(primitiveValues.has(v as string)).toBe(true);
    }
  });
});
