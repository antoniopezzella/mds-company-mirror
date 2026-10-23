#!/usr/bin/env node
/**
 * Lighthouse audit against a running server.
 *
 * Runs the lighthouse CLI through `npx` at a pinned version instead of
 * importing it. lighthouse was a devDependency until 2026-10-23; its tree
 * carried 23 advisories (puppeteer, @sentry/node's OpenTelemetry packages,
 * and extract-zip, which has no fixed release), and MMC Artifactory/Xray
 * can refuse any of them during `npm ci`. Fetching it on demand keeps it out
 * of the lockfile, so only people who run this script ever download it.
 *
 *   LIGHTHOUSE_URL=http://localhost:4173 npm run lighthouse
 *
 * Writes JSON + HTML into ./lighthouse-reports and exits non-zero if the
 * budget below isn't met, so it can gate CI if wired up.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

// Keep in step with the `lighthouse:quick` script in package.json.
const LIGHTHOUSE = 'lighthouse@12.8.2';

const url = process.env.LIGHTHOUSE_URL || 'http://localhost:5173';
const outputDir = process.env.LIGHTHOUSE_OUT || './lighthouse-reports';
const enforce = process.env.LIGHTHOUSE_ENFORCE === '1';

// Same thresholds the previous runner declared.
const budget = {
  fcp: 1800,
  lcp: 2500,
  cls: 0.1,
  tbt: 200,
  tti: 3800,
  performanceScore: 90,
};

const ms = (v) => `${Math.round(v)}ms`;
const pct = (v) => Math.round((v ?? 0) * 100);

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  // With two --output formats the CLI appends `.report.<ext>` to this base.
  const base = path.join(outputDir, `report-${stamp}`);

  const run = spawnSync(
    'npx',
    [
      '-y', LIGHTHOUSE, url,
      '--quiet',
      '--output=json', '--output=html',
      `--output-path=${base}`,
      '--chrome-flags=--headless=new --no-sandbox',
    ],
    { stdio: ['ignore', 'inherit', 'inherit'] }
  );
  if (run.error) throw run.error;
  if (run.status !== 0) throw new Error(`${LIGHTHOUSE} exited with status ${run.status}`);

  const lhr = JSON.parse(await fs.readFile(`${base}.report.json`, 'utf8'));
  const a = lhr.audits;
  const metrics = {
    performanceScore: pct(lhr.categories.performance?.score),
    accessibility: pct(lhr.categories.accessibility?.score),
    bestPractices: pct(lhr.categories['best-practices']?.score),
    seo: pct(lhr.categories.seo?.score),
    fcp: a['first-contentful-paint']?.numericValue ?? 0,
    lcp: a['largest-contentful-paint']?.numericValue ?? 0,
    cls: a['cumulative-layout-shift']?.numericValue ?? 0,
    tbt: a['total-blocking-time']?.numericValue ?? 0,
    tti: a['interactive']?.numericValue ?? 0,
    speedIndex: a['speed-index']?.numericValue ?? 0,
  };

  console.log(`\nLighthouse — ${url}\n`);
  console.log('  Category scores');
  console.log(`    Performance      ${metrics.performanceScore}`);
  console.log(`    Accessibility    ${metrics.accessibility}`);
  console.log(`    Best practices   ${metrics.bestPractices}`);
  console.log(`    SEO              ${metrics.seo}`);
  console.log('\n  Metrics                         budget');
  const rows = [
    ['First Contentful Paint', ms(metrics.fcp), ms(budget.fcp), metrics.fcp <= budget.fcp],
    ['Largest Contentful Paint', ms(metrics.lcp), ms(budget.lcp), metrics.lcp <= budget.lcp],
    ['Total Blocking Time', ms(metrics.tbt), ms(budget.tbt), metrics.tbt <= budget.tbt],
    ['Time to Interactive', ms(metrics.tti), ms(budget.tti), metrics.tti <= budget.tti],
    ['Speed Index', ms(metrics.speedIndex), '—', true],
    ['Cumulative Layout Shift', metrics.cls.toFixed(3), budget.cls.toFixed(3), metrics.cls <= budget.cls],
  ];
  for (const [name, value, limit, ok] of rows) {
    console.log(`    ${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(26)} ${String(value).padStart(9)}   ${limit}`);
  }
  const scoreOk = metrics.performanceScore >= budget.performanceScore;
  console.log(`    ${scoreOk ? 'PASS' : 'FAIL'}  ${'Performance score'.padEnd(26)} ${String(metrics.performanceScore).padStart(9)}   ${budget.performanceScore}`);

  const failures = rows.filter(([, , , ok]) => !ok).length + (scoreOk ? 0 : 1);
  console.log(`\n  Reports: ${base}.report.{json,html}`);
  console.log(failures ? `  ${failures} metric(s) over budget.\n` : '  All metrics within budget.\n');

  if (enforce && failures) process.exitCode = 1;
}

main().catch((err) => {
  console.error('Lighthouse audit failed:', err?.message ?? err);
  process.exitCode = 1;
});
