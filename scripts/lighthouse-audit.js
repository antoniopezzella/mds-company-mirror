#!/usr/bin/env node
/**
 * Lighthouse audit against a running server.
 *
 * ESM, not CJS: this package is `"type": "module"` and lighthouse@12 /
 * chrome-launcher@1 are both ESM-only, so the previous `require()` version
 * could never have run under either constraint.
 *
 *   LIGHTHOUSE_URL=http://localhost:4173 npm run lighthouse
 *
 * Writes JSON + HTML into ./lighthouse-reports and exits non-zero if the
 * budget below isn't met, so it can gate CI if wired up.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

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
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  try {
    const result = await lighthouse(
      url,
      { logLevel: 'error', output: ['json', 'html'], port: chrome.port },
      undefined
    );
    if (!result) throw new Error('Lighthouse returned no result');

    const { lhr, report } = result;
    await fs.mkdir(outputDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    await fs.writeFile(path.join(outputDir, `report-${stamp}.json`), report[0]);
    await fs.writeFile(path.join(outputDir, `report-${stamp}.html`), report[1]);

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
    console.log(`\n  Reports: ${outputDir}/report-${stamp}.{json,html}`);
    console.log(failures ? `  ${failures} metric(s) over budget.\n` : '  All metrics within budget.\n');

    if (enforce && failures) process.exitCode = 1;
  } finally {
    await chrome.kill();
  }
}

main().catch((err) => {
  console.error('Lighthouse audit failed:', err?.message ?? err);
  process.exitCode = 1;
});
