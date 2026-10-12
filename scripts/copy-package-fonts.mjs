#!/usr/bin/env node
/**
 * copy-package-fonts.mjs — ship the icon font with the package.
 *
 * Toast, Alert and <Icon> render Material Symbols glyphs, so the subset woff2
 * has to travel with the published package next to dist-pkg/styles.css (whose
 * @font-face points at `./fonts/…`). Run as part of build:package, after the
 * stylesheet is built.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'public/fonts/material-symbols-outlined-subset.woff2');
const DEST_DIR = path.join(root, 'dist-pkg/fonts');
const DEST = path.join(DEST_DIR, 'material-symbols-outlined-subset.woff2');

if (!fs.existsSync(SRC)) {
  console.error(`✗ subset font missing: ${path.relative(root, SRC)} — run \`npm run icons:subset\`.`);
  process.exit(1);
}
fs.mkdirSync(DEST_DIR, { recursive: true });
fs.copyFileSync(SRC, DEST);
console.log(`✓ shipped ${(fs.statSync(DEST).size / 1024).toFixed(1)} KB → dist-pkg/fonts/`);
