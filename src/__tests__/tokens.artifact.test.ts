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
    expect(Object.keys(artifact.color).sort()).toEqual(Object.keys(tokens).sort());
    expect(artifact.spacing).toEqual(spacing);
    expect(artifact.shadows.map((s:any)=>s.level)).toEqual(shadows.map(s=>s.level));
  });
});