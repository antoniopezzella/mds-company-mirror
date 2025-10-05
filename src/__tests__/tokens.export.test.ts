import { describe, expect, test } from 'vitest';
import { tokens } from '../tokens';
import { spacing } from '../spacing';
import { shadows } from '../shadows';
import { semanticColors } from '../semantic-tokens';

describe('token export shapes', () => {
  test('color tokens non-empty + key sample', () => {
    expect(Object.keys(tokens).length).toBeGreaterThan(5);
    expect(tokens.blue700).toBe('#002c77');
  });
  test('spacing ascending', () => {
    const sorted = [...spacing].sort((a,b)=>a-b);
    expect(sorted).toEqual(spacing);
  });
  test('shadow levels contiguous', () => {
    const levels = shadows.map(s => s.level).sort((a,b)=>a-b);
    expect(levels).toEqual([0,1,2,3,4,5]);
  });
  test('semantic colors reference existing primitives', () => {
    const { tokens } = require('../tokens');
    for (const v of Object.values(semanticColors)) {
      expect(Object.values(tokens)).toContain(v);
    }
  });
});