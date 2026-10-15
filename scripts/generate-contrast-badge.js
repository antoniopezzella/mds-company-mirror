#!/usr/bin/env node
/**
 * generate-contrast-badge.js
 * Consumes contrast-report.json and emits a shields.io style JSON & SVG badge.
 * Usage: node scripts/generate-contrast-badge.js contrast-report.json
 */
import fs from 'fs';
import path from 'path';

const input = process.argv[2] || 'contrast-report.json';
if (!fs.existsSync(input)) {
  console.error('Report not found:', input);
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync(input, 'utf8'));

const failed = report.totalFailed || 0;
const warned = report.totalWarned || 0;
const color = failed ? 'red' : (warned ? 'orange' : 'brightgreen');
const label = 'contrast';
const message = failed ? `${failed} fail` + (failed>1?'s':'') : (warned ? `${warned} warn` + (warned>1?'s':'') : 'pass');

const badgeJson = { schemaVersion: 1, label, message, color };
fs.writeFileSync('contrast-badge.json', JSON.stringify(badgeJson, null, 2));

// Minimal inline SVG badge (avoid network call to shields.io)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="20" role="img" aria-label="${label}: ${message}"><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="m"><rect width="130" height="20" rx="3" fill="#fff"/></mask><g mask="url(#m)"><rect width="70" height="20" fill="#555"/><rect x="70" width="60" height="20" fill="${color}"/><rect width="130" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11"><text x="35" y="15" fill="#010101" fill-opacity=".3">${label}</text><text x="35" y="14">${label}</text><text x="100" y="15" fill="#010101" fill-opacity=".3">${message}</text><text x="100" y="14">${message}</text></g></svg>`;
fs.writeFileSync('contrast-badge.svg', svg, 'utf8');

console.log('Generated contrast-badge.{json,svg}');