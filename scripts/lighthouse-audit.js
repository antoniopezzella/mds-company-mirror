#!/usr/bin/env node

/**
 * Comprehensive Lighthouse audit script for MDS Platform
 * Runs both mobile and desktop audits with detailed reporting
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

const SITE_URL = process.env.LIGHTHOUSE_URL || 'http://localhost:5173';
const OUTPUT_DIR = './lighthouse-reports';

async function ensureOutputDir() {
  try {
    await fs.access(OUTPUT_DIR);
  } catch {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  }
}

async function runLighthouseAudit(url, config, formFactor = 'desktop') {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
  });

  const options = {
    logLevel: 'info',
    output: ['html', 'json'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    ...config,
  };

  const runnerResult = await lighthouse(url, options);

  await chrome.kill();
  return runnerResult;
}

async function generateReports() {
  await ensureOutputDir();
  
  console.log('🚀 Starting Lighthouse audits for MDS Platform...\n');
  
  // Desktop audit
  console.log('📱 Running desktop audit...');
  const desktopConfig = {
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
  };
  
  const desktopResult = await runLighthouseAudit(SITE_URL, desktopConfig, 'desktop');
  
  // Save desktop reports
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'desktop-report.html'),
    desktopResult.report[0]
  );
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'desktop-report.json'),
    JSON.stringify(desktopResult.lhr, null, 2)
  );
  
  // Mobile audit
  console.log('📱 Running mobile audit...');
  const mobileConfig = {
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
  };
  
  const mobileResult = await runLighthouseAudit(SITE_URL, mobileConfig, 'mobile');
  
  // Save mobile reports
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'mobile-report.html'),
    mobileResult.report[0]
  );
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'mobile-report.json'),
    JSON.stringify(mobileResult.lhr, null, 2)
  );
  
  // Generate summary report
  const summary = generateSummary(desktopResult.lhr, mobileResult.lhr);
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log('\n✅ Lighthouse audits completed!');
  console.log(`📊 Reports saved to: ${OUTPUT_DIR}`);
  console.log(`🌐 Desktop report: ${path.join(OUTPUT_DIR, 'desktop-report.html')}`);
  console.log(`📱 Mobile report: ${path.join(OUTPUT_DIR, 'mobile-report.html')}`);
  
  // Output summary to console
  printSummary(summary);
}

function generateSummary(desktopLhr, mobileLhr) {
  const getScores = (lhr) => ({
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
    fcp: Math.round(lhr.audits['first-contentful-paint'].numericValue),
    lcp: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
    cls: parseFloat(lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    fid: Math.round(lhr.audits['max-potential-fid']?.numericValue || 0),
    speedIndex: Math.round(lhr.audits['speed-index'].numericValue),
    tti: Math.round(lhr.audits['interactive'].numericValue),
  });

  return {
    url: desktopLhr.finalUrl,
    timestamp: new Date().toISOString(),
    desktop: getScores(desktopLhr),
    mobile: getScores(mobileLhr),
  };
}

function printSummary(summary) {
  console.log('\n📊 LIGHTHOUSE AUDIT SUMMARY');
  console.log('='.repeat(50));
  console.log(`URL: ${summary.url}`);
  console.log(`Timestamp: ${summary.timestamp}\n`);
  
  console.log('🖥️  DESKTOP SCORES:');
  console.log(`   Performance: ${summary.desktop.performance}/100`);
  console.log(`   Accessibility: ${summary.desktop.accessibility}/100`);
  console.log(`   Best Practices: ${summary.desktop.bestPractices}/100`);
  console.log(`   SEO: ${summary.desktop.seo}/100`);
  console.log(`   
   Core Web Vitals:
   - FCP: ${summary.desktop.fcp}ms
   - LCP: ${summary.desktop.lcp}ms
   - CLS: ${summary.desktop.cls}
   - Speed Index: ${summary.desktop.speedIndex}ms
   - TTI: ${summary.desktop.tti}ms\n`);
  
  console.log('📱 MOBILE SCORES:');
  console.log(`   Performance: ${summary.mobile.performance}/100`);
  console.log(`   Accessibility: ${summary.mobile.accessibility}/100`);
  console.log(`   Best Practices: ${summary.mobile.bestPractices}/100`);
  console.log(`   SEO: ${summary.mobile.seo}/100`);
  console.log(`   
   Core Web Vitals:
   - FCP: ${summary.mobile.fcp}ms
   - LCP: ${summary.mobile.lcp}ms
   - CLS: ${summary.mobile.cls}
   - Speed Index: ${summary.mobile.speedIndex}ms
   - TTI: ${summary.mobile.tti}ms\n`);
}

// Run the audit
generateReports().catch(error => {
  console.error('❌ Lighthouse audit failed:', error);
  process.exit(1);
});