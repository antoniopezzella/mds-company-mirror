import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { buildCssVariableBlocks } from '../theme/css-tokens';
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens';

describe('CSS variable generation', () => {
  test('runtime builder includes semantic token vars', () => {
    const { root, dark } = buildCssVariableBlocks();
    expect(root).toContain('--color-text-primary');
    expect(dark).toContain('--color-text-primary');
    if (semanticDarkOverrides.statusSuccessText) {
      const lightVal = semanticColors.statusSuccessText;
      const darkVal = semanticDarkOverrides.statusSuccessText;
      expect(root).toContain(`--color-status-success-text: ${lightVal}`);
      expect(dark).toContain(`--color-status-success-text: ${darkVal}`);
    }
  });
  test('build output theme.css exists after build (if build run)', () => {
    const cssPath = path.join(process.cwd(), 'dist', 'theme.css');
    if (!fs.existsSync(cssPath)) return; // skip gracefully if not built in this run
    const content = fs.readFileSync(cssPath, 'utf8');
    expect(content).toContain('[data-theme="dark"]');
    expect(content).toMatch(/--color-text-primary:/);
  });
});