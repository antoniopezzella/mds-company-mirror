#!/usr/bin/env node
/**
 * check-contrast.js
 * Computes WCAG contrast ratios for key semantic text/surface & status pairs.
 * Fails on critical violations, warns on soft thresholds.
 */
import fs from 'fs';
import path from 'path';

const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');
if (!fs.existsSync(artifactPath)) {
  console.error('tokens.json not found. Run npm run tokens:build first.');
  process.exit(1);
}
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const sem = artifact.semantic?.color || {};

function hexToRgb(hex) {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  const int = parseInt(full,16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}
function luminanceChannel(c) {
  const v = c/255;
  return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
}
function relativeLuminance({r,g,b}) {
  const R = luminanceChannel(r);
  const G = luminanceChannel(g);
  const B = luminanceChannel(b);
  return 0.2126*R + 0.7152*G + 0.0722*B;
}
function contrast(hex1, hex2) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Define pairs: foreground vs background
// required: hard fail threshold; warn: lower bound that triggers warning if below required.
const pairs = [
  { name: 'textPrimary on surfaceDefault', fg: 'textPrimary', bg: 'surfaceDefault', required: 4.5, warn: 4.5 },
  { name: 'textSecondary on surfaceDefault', fg: 'textSecondary', bg: 'surfaceDefault', required: 3.0, warn: 4.5 },
  { name: 'textOnAccent on surfaceAccent', fg: 'textOnAccent', bg: 'surfaceAccent', required: 4.5, warn: 4.5 },
  { name: 'focusRing outline vs surfaceDefault', fg: 'focusRing', bg: 'surfaceDefault', required: 3.0, warn: 3.0 },
  { name: 'statusSuccess text vs surfaceDefault', fg: 'statusSuccess', bg: 'surfaceDefault', required: 3.0, warn: 4.5 },
  { name: 'statusWarning text vs surfaceDefault', fg: 'statusWarning', bg: 'surfaceDefault', required: 3.0, warn: 4.5 },
  { name: 'statusDanger text vs surfaceDefault', fg: 'statusDanger', bg: 'surfaceDefault', required: 3.0, warn: 4.5 }
];

let failed = 0;
let warned = 0;
const rows = [];

function getColor(name) {
  if (!(name in sem)) throw new Error(`Semantic token ${name} not found`);
  return sem[name];
}

for (const p of pairs) {
  try {
    const fg = getColor(p.fg);
    const bg = getColor(p.bg);
    const ratio = contrast(fg, bg);
    const ratioStr = ratio.toFixed(2);
    let status = 'PASS';
    if (ratio < p.required) { status = 'FAIL'; failed++; }
    else if (ratio < p.warn) { status = 'WARN'; warned++; }
    rows.push({ pair: p.name, ratio: ratioStr, required: p.required, status });
  } catch (e) {
    rows.push({ pair: p.name, ratio: 'ERR', required: p.required, status: 'ERROR' });
    failed++;
  }
}

function printTable() {
  console.log('\nContrast Checks');
  console.log('| Pair | Ratio | Required | Status |');
  console.log('|------|-------|----------|--------|');
  for (const r of rows) {
    console.log(`| ${r.pair} | ${r.ratio} | ${r.required} | ${r.status} |`);
  }
  console.log();
}

printTable();

if (failed) {
  console.error(`Contrast validation failed: ${failed} failing pair(s).`);
  process.exit(1);
}
if (warned) {
  console.warn(`Contrast warnings: ${warned} pair(s) below recommended ideal but above minimum.`);
}
console.log('Contrast validation passed.');