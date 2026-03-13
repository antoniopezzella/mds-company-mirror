/**
 * Lighthouse Performance Audit Utilities
 * 
 * Reusable Lighthouse configurations and runners for automated performance auditing
 * Can be used across different projects in the MDS ecosystem
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

export interface LighthouseConfig {
  /** URL to audit */
  url: string;
  /** Form factor: desktop or mobile */
  formFactor?: 'desktop' | 'mobile';
  /** Output directory for reports */
  outputDir?: string;
  /** Project identifier for reports */
  projectId?: string;
  /** Enable verbose logging */
  verbose?: boolean;
  /** Custom port for Chrome */
  port?: number;
}

export interface LighthouseResult {
  /** Overall performance score (0-100) */
  performanceScore: number;
  /** Core Web Vitals */
  coreWebVitals: {
    fcp: number;
    lcp: number;
    cls: number;
    tbt: number;
    si: number;
    tti: number;
  };
  /** Accessibility score (0-100) */
  accessibilityScore: number;
  /** Best practices score (0-100) */
  bestPracticesScore: number;
  /** SEO score (0-100) */
  seoScore: number;
  /** Full report path */
  reportPath: string;
}

/**
 * Desktop Lighthouse configuration (1440x900)
 */
export const desktopConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop' as const,
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  categories: {
    performance: { weight: 1 },
    accessibility: { weight: 1 },
    'best-practices': { weight: 1 },
    seo: { weight: 1 },
  },
};

/**
 * Mobile Lighthouse configuration (375x667)
 */
export const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile' as const,
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1.6 * 1024,
      uploadThroughputKbps: 750,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  },
  categories: {
    performance: { weight: 1 },
    accessibility: { weight: 1 },
    'best-practices': { weight: 1 },
    seo: { weight: 1 },
  },
};

/**
 * Run Lighthouse audit
 * 
 * @example
 * ```typescript
 * // Desktop audit
 * const result = await runLighthouseAudit({
 *   url: 'http://localhost:5173',
 *   formFactor: 'desktop',
 *   outputDir: './reports',
 *   projectId: 'mds-platform',
 * });
 * 
 * console.log('Performance:', result.performanceScore);
 * console.log('LCP:', result.coreWebVitals.lcp);
 * ```
 */
export async function runLighthouseAudit(config: LighthouseConfig): Promise<LighthouseResult> {
  const {
    url,
    formFactor = 'desktop',
    outputDir = './lighthouse-reports',
    projectId = 'lighthouse-audit',
    verbose = false,
    port,
  } = config;

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    port,
  });

  if (verbose) {
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Chrome launched on port ${chrome.port}`);
  }

  try {
    // Select configuration based on form factor
    const lhConfig = formFactor === 'desktop' ? desktopConfig : mobileConfig;

    // Run Lighthouse
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const runnerResult = await lighthouse(url, {
      port: chrome.port,
      output: ['html', 'json'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }, lhConfig as any); // Using 'as any' to avoid Lighthouse config type complexity

    if (!runnerResult) {
      throw new Error('Lighthouse audit failed');
    }

    // Extract metrics
    const { lhr, report } = runnerResult;
    const audits = lhr.audits;

    const result: LighthouseResult = {
      performanceScore: Math.round((lhr.categories.performance?.score || 0) * 100),
      coreWebVitals: {
        fcp: audits['first-contentful-paint']?.numericValue || 0,
        lcp: audits['largest-contentful-paint']?.numericValue || 0,
        cls: audits['cumulative-layout-shift']?.numericValue || 0,
        tbt: audits['total-blocking-time']?.numericValue || 0,
        si: audits['speed-index']?.numericValue || 0,
        tti: audits['interactive']?.numericValue || 0,
      },
      accessibilityScore: Math.round((lhr.categories.accessibility?.score || 0) * 100),
      bestPracticesScore: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
      seoScore: Math.round((lhr.categories.seo?.score || 0) * 100),
      reportPath: '',
    };

    // Save reports
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const filename = `${projectId}-${formFactor}-${timestamp}`;
    
    const htmlPath = path.join(outputDir, `${filename}.html`);
    const jsonPath = path.join(outputDir, `${filename}.json`);

    fs.writeFileSync(htmlPath, report[0]);
    fs.writeFileSync(jsonPath, report[1]);

    result.reportPath = htmlPath;

    if (verbose) {
      /* eslint-disable no-console */
      console.log('\n📊 Lighthouse Audit Results');
      console.log('━'.repeat(50));
      console.log(`Performance:     ${result.performanceScore}/100`);
      console.log(`Accessibility:   ${result.accessibilityScore}/100`);
      console.log(`Best Practices:  ${result.bestPracticesScore}/100`);
      console.log(`SEO:             ${result.seoScore}/100`);
      console.log('\n⚡ Core Web Vitals');
      console.log('━'.repeat(50));
      console.log(`FCP:  ${Math.round(result.coreWebVitals.fcp)}ms`);
      console.log(`LCP:  ${Math.round(result.coreWebVitals.lcp)}ms`);
      console.log(`CLS:  ${result.coreWebVitals.cls.toFixed(3)}`);
      console.log(`TBT:  ${Math.round(result.coreWebVitals.tbt)}ms`);
      console.log(`SI:   ${Math.round(result.coreWebVitals.si)}ms`);
      console.log(`TTI:  ${Math.round(result.coreWebVitals.tti)}ms`);
      console.log('\n📄 Reports saved:');
      console.log(`  HTML: ${htmlPath}`);
      console.log(`  JSON: ${jsonPath}`);
      /* eslint-enable no-console */
    }

    return result;
  } finally {
    // Always close Chrome
    await chrome.kill();
  }
}

/**
 * Run both desktop and mobile audits
 */
export async function runFullAudit(
  url: string,
  options: Omit<LighthouseConfig, 'url' | 'formFactor'> = {}
): Promise<{ desktop: LighthouseResult; mobile: LighthouseResult }> {
  /* eslint-disable-next-line no-console */
  console.log('🔍 Running full Lighthouse audit (desktop + mobile)...\n');

  const desktop = await runLighthouseAudit({
    ...options,
    url,
    formFactor: 'desktop',
  });

  const mobile = await runLighthouseAudit({
    ...options,
    url,
    formFactor: 'mobile',
  });

  /* eslint-disable-next-line no-console */
  console.log('\n✅ Full audit complete!');

  return { desktop, mobile };
}

/**
 * Performance budget checker
 */
export interface PerformanceBudget {
  fcp?: number;
  lcp?: number;
  cls?: number;
  tbt?: number;
  tti?: number;
  performanceScore?: number;
}

export function checkPerformanceBudget(
  result: LighthouseResult,
  budget: PerformanceBudget
): { passed: boolean; violations: string[] } {
  const violations: string[] = [];

  if (budget.fcp && result.coreWebVitals.fcp > budget.fcp) {
    violations.push(`FCP: ${Math.round(result.coreWebVitals.fcp)}ms > ${budget.fcp}ms`);
  }

  if (budget.lcp && result.coreWebVitals.lcp > budget.lcp) {
    violations.push(`LCP: ${Math.round(result.coreWebVitals.lcp)}ms > ${budget.lcp}ms`);
  }

  if (budget.cls && result.coreWebVitals.cls > budget.cls) {
    violations.push(`CLS: ${result.coreWebVitals.cls.toFixed(3)} > ${budget.cls}`);
  }

  if (budget.tbt && result.coreWebVitals.tbt > budget.tbt) {
    violations.push(`TBT: ${Math.round(result.coreWebVitals.tbt)}ms > ${budget.tbt}ms`);
  }

  if (budget.tti && result.coreWebVitals.tti > budget.tti) {
    violations.push(`TTI: ${Math.round(result.coreWebVitals.tti)}ms > ${budget.tti}ms`);
  }

  if (budget.performanceScore && result.performanceScore < budget.performanceScore) {
    violations.push(`Score: ${result.performanceScore} < ${budget.performanceScore}`);
  }

  return {
    passed: violations.length === 0,
    violations,
  };
}

export default runLighthouseAudit;
