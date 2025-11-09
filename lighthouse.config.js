module.exports = {
  extends: 'lighthouse:default',
  settings: {
    // Custom audit configuration for MDS Platform
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    
    // Skip audits that might not be relevant for design system
    skipAudits: [
      'robots-txt', // Not relevant for design system demo
      'canonical', // Not relevant for single-page demo
    ],
    
    // Additional audits for design system
    onlyAudits: [
      // Performance
      'first-contentful-paint',
      'largest-contentful-paint',
      'first-input-delay',
      'cumulative-layout-shift',
      'speed-index',
      'interactive',
      'total-blocking-time',
      
      // Resource optimization
      'unused-javascript',
      'unused-css-rules',
      'render-blocking-resources',
      'unminified-css',
      'unminified-javascript',
      'uses-optimized-images',
      'uses-webp-images',
      'uses-responsive-images',
      'efficient-animated-content',
      
      // Accessibility
      'color-contrast',
      'focus-traps',
      'focusable-controls',
      'interactive-element-affordance',
      'logical-tab-order',
      'managed-focus',
      'visual-order-follows-dom',
      
      // Best practices
      'uses-https',
      'uses-http2',
      'no-vulnerable-libraries',
      'charset',
      'font-display',
      
      // SEO basics
      'meta-description',
      'document-title',
      'html-has-lang',
      'meta-viewport',
    ],
  },
  
  // Custom categories for design system evaluation
  categories: {
    performance: {
      title: 'Performance',
      auditRefs: [
        { id: 'first-contentful-paint', weight: 10 },
        { id: 'largest-contentful-paint', weight: 25 },
        { id: 'first-input-delay', weight: 25 },
        { id: 'cumulative-layout-shift', weight: 25 },
        { id: 'speed-index', weight: 10 },
        { id: 'interactive', weight: 5 },
      ],
    },
    'design-system': {
      title: 'Design System Quality',
      description: 'Metrics specific to design system implementation',
      auditRefs: [
        { id: 'color-contrast', weight: 20 },
        { id: 'font-display', weight: 15 },
        { id: 'efficient-animated-content', weight: 15 },
        { id: 'uses-responsive-images', weight: 10 },
        { id: 'unused-css-rules', weight: 20 },
        { id: 'unused-javascript', weight: 20 },
      ],
    },
  },
};