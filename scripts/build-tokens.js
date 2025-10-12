#!/usr/bin/env node
/**
 * build-tokens.js (compile-based)
 * 1. Compile token-related TS files to a temp dir.
 * 2. Import compiled JS modules and assemble JSON artifact.
 * 3. Emit dist/tokens.json
 */
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const tmpOut = path.join(root, '.tmp-token-build');

// Clean previous temp output
try { rmSync(tmpOut, { recursive: true, force: true }); } catch {}

// Compile only the token sources (fast)
execSync('npx tsc -p tsconfig.tokens.json', { stdio: 'inherit', cwd: root });

// Dynamically import compiled modules (files emitted at outDir root)
const tokens = (await import(path.join(tmpOut, 'tokens.js'))).tokens;
const spacing = (await import(path.join(tmpOut, 'spacing.js'))).spacing;
const shadows = (await import(path.join(tmpOut, 'shadows.js'))).shadows;
// Import semantic layer directly from TS (no compile reference needed if we want, but keep consistent)
const { semanticColors, semanticDarkOverrides } = await import(path.join(tmpOut, 'semantic-tokens.js'));

// CSS variable helpers (inline to avoid needing TS import for build step)
const camelToKebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
function buildCssBlocks() {
  const primitives = tokens;
  const light = semanticColors;
  const dark = { ...semanticColors, ...semanticDarkOverrides };
  const linesRoot = [':root {'];
  for (const [k,v] of Object.entries(primitives)) linesRoot.push(`  --primitive-${camelToKebab(k)}: ${v};`);
  for (const [k,v] of Object.entries(light)) linesRoot.push(`  --color-${camelToKebab(k)}: ${v};`);
  linesRoot.push('}');
  const linesDark = ['[data-theme="dark"] {'];
  for (const [k,v] of Object.entries(dark)) linesDark.push(`  --color-${camelToKebab(k)}: ${v};`);
  linesDark.push('}');
  return { root: linesRoot.join('\n'), dark: linesDark.join('\n') };
}

const distDir = path.join(root, 'dist');
mkdirSync(distDir, { recursive: true });

const artifact = {
  $schema: 'https://example.com/design-tokens.schema.json',
  meta: {
    generated: new Date().toISOString(),
    version: process.env.npm_package_version || '0.0.0',
    source: ['src/tokens.ts', 'src/spacing.ts', 'src/shadows.ts'],
    deprecated: {
      statusWarning: {
        replaceWith: ['statusWarningBg','statusWarningText'],
        rationale: 'Use background + text pair for accessible warning states.'
      },
      statusSuccess: {
        replaceWith: ['statusSuccessBg','statusSuccessText'],
        rationale: 'Adopt background/text pattern for consistency.'
      },
      statusDanger: {
        replaceWith: ['statusDangerBg','statusDangerText'],
        rationale: 'Adopt background/text pattern for consistency.'
      }
    }
  },
  color: tokens,
  spacing,
  shadows,
  semantic: {
    color: semanticColors,
    modes: {
      dark: semanticDarkOverrides
    }
  }
};

writeFileSync(path.join(distDir, 'tokens.json'), JSON.stringify(artifact, null, 2));
console.log('✔ tokens.json generated');

// Emit theme.css with primitives + semantic light/dark variables
try {
  const { root: rootBlock, dark: darkBlock } = buildCssBlocks();
  const cssOut = `${rootBlock}\n\n${darkBlock}\n`;
  writeFileSync(path.join(distDir, 'theme.css'), cssOut, 'utf8');
  console.log('✔ theme.css generated');
} catch (e) {
  console.warn('⚠ failed to generate theme.css', e);
}