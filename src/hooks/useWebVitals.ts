/**
 * React Hook for Web Vitals Monitoring
 * 
 * Easy-to-use React hook for tracking Core Web Vitals in any component
 */

import { useEffect } from 'react';
import { initWebVitals, type WebVitalsConfig, getPerformanceSnapshot } from '../utils/performance/webVitals';

export interface UseWebVitalsOptions extends WebVitalsConfig {
  /** Enable monitoring */
  enabled?: boolean;
}

/**
 * React hook to monitor Web Vitals
 * 
 * @example
 * ```typescript
 * function App() {
 *   useWebVitals({
 *     debug: true,
 *     projectId: 'mds-platform',
 *     onMetric: (metric) => {
 *       // Send to analytics
 *       analytics.track('web-vital', metric);
 *     }
 *   });
 * 
 *   return <YourApp />;
 * }
 * ```
 */
export function useWebVitals(options: UseWebVitalsOptions = {}) {
  const { enabled = true, ...config } = options;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    // Initialize Web Vitals monitoring
    initWebVitals(config);

    // Log initial performance snapshot in debug mode
    if (config.debug) {
      const snapshot = getPerformanceSnapshot();
      if (snapshot) {
        /* eslint-disable no-console */
        console.group('📸 Initial Performance Snapshot');
        console.table(snapshot.metrics);
        console.groupEnd();
        /* eslint-enable no-console */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

/**
 * React hook to get current performance metrics
 * 
 * @example
 * ```typescript
 * function PerformanceWidget() {
 *   const metrics = usePerformanceMetrics();
 * 
 *   return (
 *     <div>
 *       <p>FCP: {metrics?.fcp}ms</p>
 *       <p>LCP: {metrics?.lcp}ms</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePerformanceMetrics() {
  const snapshot = getPerformanceSnapshot();
  return snapshot?.metrics || null;
}

export default useWebVitals;
