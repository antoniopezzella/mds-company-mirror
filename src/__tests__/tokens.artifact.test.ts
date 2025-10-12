import { describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('tokens artifact', () => {
  const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');
  test('exists after build', () => {
    expect(fs.existsSync(artifactPath)).toBe(true);
  });
  test('keys align with in-memory modules', async () => {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const { tokens } = await import('../tokens');
    const { spacing } = await import('../spacing');
  const { shadows } = await import('../shadows');
  const { semanticColors } = await import('../semantic-tokens');
    expect(Object.keys(artifact.color).sort()).toEqual(Object.keys(tokens).sort());
    expect(artifact.spacing).toEqual(spacing);
    expect(artifact.shadows.map((s:any)=>s.level)).toEqual(shadows.map(s=>s.level));
    expect(Object.keys(artifact.semantic.color).sort()).toEqual(Object.keys(semanticColors).sort());
  });
  test('dark mode overrides align with code exports and are subset of semantic keys', async () => {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const artifactOverrides = artifact.semantic?.modes?.dark || {};
    const { tokens } = await import('../tokens');
    const { semanticColors, semanticDarkOverrides } = await import('../semantic-tokens');
    // Keys equality with code export
    expect(Object.keys(artifactOverrides).sort()).toEqual(Object.keys(semanticDarkOverrides).sort());
    // Subset check
    const base = new Set(Object.keys(semanticColors));
    for (const k of Object.keys(artifactOverrides)) {
      expect(base.has(k)).toBe(true);
    }
    // Value equality and primitive reference check
    const primitiveValues = new Set(Object.values(tokens));
    for (const [k,v] of Object.entries(artifactOverrides)) {
      expect(v).toBe((semanticDarkOverrides as any)[k]);
      expect(primitiveValues.has(v as string)).toBe(true);
    }
  });
});