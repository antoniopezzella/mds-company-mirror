/**
 * Performance Monitoring Utilities
 * 
 * Re-export all performance monitoring tools for easy import
 */

// Web Vitals
export {
  initWebVitals,
  getPerformanceSnapshot,
  getMetricRating,
  WEB_VITALS_THRESHOLDS,
  type WebVitalsConfig,
  type PerformanceReport,
} from './webVitals';

// React Hooks
export { useWebVitals, usePerformanceMetrics, type UseWebVitalsOptions } from '../../hooks/useWebVitals';
