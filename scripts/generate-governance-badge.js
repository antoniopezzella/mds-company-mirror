#!/usr/bin/env node
/**
 * generate-governance-badge.js
 * Consumes governance JSON output (report-governance.js --json) and emits a shields-style JSON & SVG badge.
 * Usage: node scripts/generate-governance-badge.js [governance-report.json]
 */
import fs from 'fs';

const input = process.argv[2] || 'governance-report.json';
if (!fs.existsSync(input)) {
  console.error('Governance report not found:', input);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(input, 'utf8'));

const enforcedFailures = report.roleContrast?.enforcedFailures?.length || 0;
const roleUsageViolations = report.roleUsage?.count || 0;
const monitoredCount = report.roleContrast?.monitored?.length || 0;

let color = 'brightgreen';
if (enforcedFailures || roleUsageViolations) color = 'red';
else if (monitoredCount) color = 'orange';

const label = 'governance';
let message = 'pass';
if (enforcedFailures) message = `${enforcedFailures} fail` + (enforcedFailures>1?'s':'');
else if (roleUsageViolations) message = `${roleUsageViolations} usage`;
else if (monitoredCount) message = `${monitoredCount} monitor` + (monitoredCount>1?'s':'');

const badgeJson = { schemaVersion: 1, label, message, color };
fs.writeFileSync('governance-badge.json', JSON.stringify(badgeJson, null, 2));

function textWidth(t){ return 6 * t.length + 10; }
const labelWidth = Math.max(70, textWidth(label));
const valueWidth = Math.max(60, textWidth(message));
const totalWidth = labelWidth + valueWidth;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${label}: ${message}"><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="m"><rect width="${totalWidth}" height="20" rx="3" fill="#fff"/></mask><g mask="url(#m)"><rect width="${labelWidth}" height="20" fill="#555"/><rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/><rect width="${totalWidth}" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11"><text x="${labelWidth/2}" y="15" fill="#010101" fill-opacity=".3">${label}</text><text x="${labelWidth/2}" y="14">${label}</text><text x="${labelWidth + valueWidth/2}" y="15" fill="#010101" fill-opacity=".3">${message}</text><text x="${labelWidth + valueWidth/2}" y="14">${message}</text></g></svg>`;
fs.writeFileSync('governance-badge.svg', svg, 'utf8');

console.log('Generated governance-badge.{json,svg}');
