/**
 * Real User Monitoring (RUM) with Web Vitals
 * 
 * Sends performance metrics to analytics endpoints for monitoring
 * production performance and user experience.
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

// Analytics configuration
const ANALYTICS_CONFIG = {
  // Google Analytics 4
  ga4: {
    enabled: false, // Set to true when GA4 is configured
    measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
  },
  
  // Custom analytics endpoint
  custom: {
    enabled: true,
    endpoint: '/api/analytics/web-vitals', // Your backend endpoint
  },
  
  // DataDog RUM
  datadog: {
    enabled: false, // Set to true when DataDog is configured
    clientToken: 'your-datadog-client-token',
    applicationId: 'your-app-id',
  },
  
  // New Relic Browser
  newRelic: {
    enabled: false,
  },
};

/**
 * Send metric to Google Analytics 4
 */
function sendToGoogleAnalytics(metric: Metric) {
  if (!ANALYTICS_CONFIG.ga4.enabled) return;
  
  // Check if gtag is available
  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
    });
  }
}

/**
 * Send metric to custom analytics endpoint
 */
async function sendToCustomEndpoint(metric: Metric) {
  if (!ANALYTICS_CONFIG.custom.enabled) return;
  
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    connection: (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType,
  });

  try {
    // Use sendBeacon for reliability (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ANALYTICS_CONFIG.custom.endpoint, body);
    } else {
      // Fallback to fetch
      await fetch(ANALYTICS_CONFIG.custom.endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true, // Keep request alive even if page is closing
      });
    }
  } catch (error) {
    console.error('Failed to send Web Vitals to analytics:', error);
  }
}

/**
 * Send metric to DataDog RUM
 */
function sendToDataDog(metric: Metric) {
  if (!ANALYTICS_CONFIG.datadog.enabled) return;
  
  if (typeof window.DD_RUM !== 'undefined') {
    window.DD_RUM.addAction(metric.name, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

/**
 * Send metric to New Relic Browser
 */
function sendToNewRelic(metric: Metric) {
  if (!ANALYTICS_CONFIG.newRelic.enabled) return;
  
  if (typeof window.newrelic !== 'undefined') {
    window.newrelic.addPageAction(metric.name, {
      value: metric.value,
      rating: metric.rating,
    });
  }
}

/**
 * Log metric to console in development
 */
function logToConsole(metric: Metric) {
  if (import.meta.env.DEV) {
    const color = metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red';
    // eslint-disable-next-line no-console
    console.log(
      `%c${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }
}

/**
 * Send metric to all configured analytics providers
 */
function reportMetric(metric: Metric) {
  logToConsole(metric);
  sendToGoogleAnalytics(metric);
  sendToCustomEndpoint(metric);
  sendToDataDog(metric);
  sendToNewRelic(metric);
}

/**
 * Initialize Real User Monitoring
 * Call this in your app's entry point (main.tsx or App.tsx)
 */
export function initRUM() {
  // Only run in browser
  if (typeof window === 'undefined') return;

  // Register all Web Vitals metrics
  onCLS(reportMetric);
  onFCP(reportMetric);
  onINP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);

  if (import.meta.env.DEV) {
    console.info('[RUM] Real User Monitoring initialized');
  }
}

/**
 * Track custom performance metrics
 */
export function trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>) {
  const metric = {
    name: name as Metric['name'],
    value,
    rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor',
    id: `${name}-${Date.now()}`,
    navigationType: 'navigate',
    delta: value,
  };

  reportMetric(metric as Metric);

  // Send metadata separately if provided
  if (metadata && ANALYTICS_CONFIG.custom.enabled) {
    fetch(ANALYTICS_CONFIG.custom.endpoint, {
      method: 'POST',
      body: JSON.stringify({ ...metric, ...metadata }),
      headers: { 'Content-Type': 'application/json' },
    }).catch(console.error);
  }
}

/**
 * Track page views (for SPA navigation)
 */
export function trackPageView(path: string) {
  if (ANALYTICS_CONFIG.ga4.enabled && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }

  if (ANALYTICS_CONFIG.custom.enabled) {
    navigator.sendBeacon(
      ANALYTICS_CONFIG.custom.endpoint,
      JSON.stringify({
        type: 'pageview',
        path,
        title: document.title,
        timestamp: Date.now(),
      })
    );
  }
}

// TypeScript declarations for external libraries
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    DD_RUM?: {
      addAction: (name: string, context?: Record<string, unknown>) => void;
    };
    newrelic?: {
      addPageAction: (name: string, attributes?: Record<string, unknown>) => void;
    };
  }
}

export default initRUM;
