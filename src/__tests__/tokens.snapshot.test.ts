import { describe, expect, test } from 'vitest';
import { tokens } from '../tokens';
import { spacing } from '../spacing';
import { shadows } from '../shadows';
import { semanticColors } from '../semantic-tokens';

// Snapshot key design primitives to catch accidental removals or renames.
// Intentional changes require updating snapshot + CHANGELOG entry.

describe('design tokens snapshots', () => {
  test('color tokens', () => {
    expect(tokens).toMatchSnapshot('color-tokens');
  });
  test('spacing scale', () => {
    expect(spacing).toMatchSnapshot('spacing-scale');
  });
  test('shadows', () => {
    expect(shadows).toMatchSnapshot('shadow-levels');
  });
  test('semantic color tokens', () => {
    expect(semanticColors).toMatchSnapshot('semantic-color-tokens');
  });
});
