/**
 * Web Vitals Performance Monitoring Utility
 * 
 * Tracks Core Web Vitals metrics and reports them to analytics
 * Can be used across different projects in the MDS ecosystem
 * 
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift)
 * - FID (First Input Delay)
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint) - new metric replacing FID
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

export interface WebVitalsConfig {
  /** Enable console logging of metrics */
  debug?: boolean;
  /** Custom analytics endpoint */
  analyticsEndpoint?: string;
  /** Project identifier */
  projectId?: string;
  /** Custom callback for metric reporting */
  onMetric?: (metric: Metric) => void;
}

export interface PerformanceReport {
  metrics: Record<string, number>;
  timestamp: string;
  projectId?: string;
  url: string;
  userAgent: string;
}

/**
 * Default metric handler - logs to console and sends to analytics
 */
function defaultMetricHandler(metric: Metric, config: WebVitalsConfig) {
  const { name, value, rating, delta } = metric;

  if (config.debug) {
    /* eslint-disable no-console */
    console.group(`📊 Web Vital: ${name}`);
    console.log('Value:', value);
    console.log('Rating:', rating);
    console.log('Delta:', delta);
    console.log('Full metric:', metric);
    console.groupEnd();
    /* eslint-enable no-console */
  }

  // Send to analytics endpoint if configured
  if (config.analyticsEndpoint) {
    sendToAnalytics(metric, config);
  }

  // Call custom callback if provided
  if (config.onMetric) {
    config.onMetric(metric);
  }
}

/**
 * Send metric to analytics endpoint
 */
async function sendToAnalytics(metric: Metric, config: WebVitalsConfig) {
  const body: PerformanceReport = {
    metrics: {
      [metric.name]: metric.value,
    },
    timestamp: new Date().toISOString(),
    projectId: config.projectId,
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  try {
    await fetch(config.analyticsEndpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      keepalive: true, // Ensures request completes even if page is closing
    });
  } catch (error) {
    if (config.debug) {
      console.error('Failed to send metric to analytics:', error);
    }
  }
}

/**
 * Initialize Web Vitals monitoring
 * 
 * @example
 * ```typescript
 * // Basic usage
 * initWebVitals({ debug: true });
 * 
 * // With analytics
 * initWebVitals({
 *   debug: false,
 *   analyticsEndpoint: 'https://analytics.example.com/vitals',
 *   projectId: 'mds-platform',
 * });
 * 
 * // With custom callback
 * initWebVitals({
 *   onMetric: (metric) => {
 *     // Send to your custom analytics
 *     trackEvent('web-vital', { name: metric.name, value: metric.value });
 *   }
 * });
 * ```
 */
export function initWebVitals(config: WebVitalsConfig = {}) {
  const handler = (metric: Metric) => defaultMetricHandler(metric, config);

  // Track all Core Web Vitals (FID deprecated in favor of INP)
  onCLS(handler);
  onFCP(handler);
  onLCP(handler);
  onTTFB(handler);
  onINP(handler);

  if (config.debug) {
    /* eslint-disable-next-line no-console */
    console.log('🚀 Web Vitals monitoring initialized');
  }
}

/**
 * Get current performance metrics snapshot
 */
export function getPerformanceSnapshot(): PerformanceReport | null {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
  const lcp = performance.getEntriesByType('largest-contentful-paint').pop() as PerformanceEntry;

  return {
    metrics: {
      // Navigation timing
      dns: navigation?.domainLookupEnd - navigation?.domainLookupStart || 0,
      tcp: navigation?.connectEnd - navigation?.connectStart || 0,
      ttfb: navigation?.responseStart - navigation?.requestStart || 0,
      download: navigation?.responseEnd - navigation?.responseStart || 0,
      domInteractive: navigation?.domInteractive || 0,
      domComplete: navigation?.domComplete || 0,
      loadComplete: navigation?.loadEventEnd || 0,
      
      // Paint timing
      fcp: fcp?.startTime || 0,
      lcp: lcp?.startTime || 0,
    },
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };
}

/**
 * Rating thresholds based on Google recommendations
 */
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
} as const;

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  name: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

export default initWebVitals;
