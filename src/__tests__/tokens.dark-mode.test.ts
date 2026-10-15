import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// In-memory modules
import { tokens } from '../tokens';
import { semanticColors, semanticDarkOverrides, type SemanticColorName } from '../semantic-tokens';

// Helper: ensure artifact exists so we also validate emitted JSON shape.
const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');

interface TokensArtifact {
  semantic: { modes?: { dark?: Record<string, string> } };
}

function readArtifact(): TokensArtifact | null {
  if (!fs.existsSync(artifactPath)) return null;
  return JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
}

describe('semantic dark mode overrides', () => {
  test('override keys are subset of base semantic keys', () => {
    const baseKeys = new Set(Object.keys(semanticColors));
    for (const k of Object.keys(semanticDarkOverrides)) {
      expect(baseKeys.has(k)).toBe(true);
    }
  });

  test('override values reference primitive tokens', () => {
    const primitiveValues = new Set(Object.values(tokens));
    for (const v of Object.values(semanticDarkOverrides)) {
      expect(primitiveValues.has(v as string)).toBe(true);
    }
  });

  test('artifact (if built) contains dark mode section aligned with in-memory overrides', () => {
    const artifact = readArtifact();
    if (!artifact) {
      // Skip (not fail) if artifact not built yet; other tests already assert build presence.
      return;
    }
    const artifactOverrides = artifact.semantic?.modes?.dark || {};
    // Key equality (artifact should not miss or add keys compared to code export)
    expect(Object.keys(artifactOverrides).sort()).toEqual(
      Object.keys(semanticDarkOverrides).sort()
    );
    // Values should match exactly
    for (const k of Object.keys(semanticDarkOverrides)) {
      expect(artifactOverrides[k]).toBe(semanticDarkOverrides[k as SemanticColorName]);
    }
  });
});
