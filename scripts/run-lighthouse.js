#!/usr/bin/env node

/**
 * Enhanced Lighthouse Audit Script
 * 
 * Runs Lighthouse audits using the reusable utilities
 */

import { runFullAudit, checkPerformanceBudget } from '../src/utils/performance/lighthouse.js';

// Configuration
const url = process.env.LIGHTHOUSE_URL || 'http://localhost:5173';
const outputDir = './lighthouse-reports';

// Performance budget (adjust as needed)
const budget = {
  fcp: 1800,        // First Contentful Paint < 1.8s
  lcp: 2500,        // Largest Contentful Paint < 2.5s
  cls: 0.1,         // Cumulative Layout Shift < 0.1
  tbt: 200,         // Total Blocking Time < 200ms
  tti: 3800,        // Time to Interactive < 3.8s
  performanceScore: 90,  // Performance score >= 90
};

async function main() {
  console.log('🚀 Starting Lighthouse audit...');
  console.log(`📍 URL: ${url}\n`);

  try {
    // Run full audit (desktop + mobile)
    const results = await runFullAudit(url, {
      outputDir,
      projectId: 'mds-platform',
      verbose: true,
    });

    // Check performance budgets
    console.log('\n💰 Checking Performance Budgets...');
    console.log('━'.repeat(50));

    const desktopCheck = checkPerformanceBudget(results.desktop, budget);
    const mobileCheck = checkPerformanceBudget(results.mobile, budget);

    console.log('\n📊 Desktop:');
    if (desktopCheck.passed) {
      console.log('✅ All budgets met!');
    } else {
      console.log('❌ Budget violations:');
      desktopCheck.violations.forEach(v => console.log(`  - ${v}`));
    }

    console.log('\n📱 Mobile:');
    if (mobileCheck.passed) {
      console.log('✅ All budgets met!');
    } else {
      console.log('❌ Budget violations:');
      mobileCheck.violations.forEach(v => console.log(`  - ${v}`));
    }

    // Exit with error if budgets not met
    if (!desktopCheck.passed || !mobileCheck.passed) {
      console.log('\n❌ Performance budget check failed!');
      process.exit(1);
    }

    console.log('\n✅ All performance checks passed!');
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error);
    process.exit(1);
  }
}

main();
