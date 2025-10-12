#!/usr/bin/env node
/**
 * annotate-contrast.js
 * Reads contrast-report.json (from check-contrast --json) and emits GitHub Actions annotations.
 * Usage: node scripts/annotate-contrast.js contrast-report.json
 */
import fs from 'fs';

const file = process.argv[2] || 'contrast-report.json';
if (!fs.existsSync(file)) {
  console.error(`Report file not found: ${file}`);
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const mode of report.modes) {
  for (const row of mode.rows) {
    if (row.status === 'FAIL') {
      // ::error ::message
      console.log(`::error title=Contrast FAIL (${mode.mode})::${row.pair} ratio ${row.ratio} < required ${row.required}`);
    } else if (row.status === 'WARN') {
      console.log(`::warning title=Contrast WARN (${mode.mode})::${row.pair} ratio ${row.ratio} < recommended ${row.required}`);
    }
  }
}

if (report.totalFailed > 0) {
  process.exit(1);
}
process.exit(0);
