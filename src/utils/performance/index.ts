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

// Lighthouse
export {
  runLighthouseAudit,
  runFullAudit,
  checkPerformanceBudget,
  desktopConfig,
  mobileConfig,
  type LighthouseConfig,
  type LighthouseResult,
  type PerformanceBudget,
} from './lighthouse';

// React Hooks
export { useWebVitals, usePerformanceMetrics, type UseWebVitalsOptions } from '../../hooks/useWebVitals';
