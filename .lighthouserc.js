module.exports = {
  ci: {
    collect: {
      // Build and serve the app for testing
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4173'], // Vite preview default port
      numberOfRuns: 3, // Average of 3 runs for more stable results
      settings: {
        chromeFlags: '--no-sandbox --headless',
        // Emulate mobile and desktop
        preset: 'desktop',
        // Custom budget and performance thresholds
        budgets: [
          {
            resourceSizes: [
              {
                resourceType: 'script',
                budget: 250, // 250KB max for JS bundles
              },
              {
                resourceType: 'total',
                budget: 500, // 500KB total page weight
              },
            ],
          },
        ],
      },
    },
    assert: {
      // Performance budgets and thresholds
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }], // 80+ performance score
        'categories:accessibility': ['error', { minScore: 0.95 }], // 95+ accessibility score
        'categories:best-practices': ['error', { minScore: 0.9 }], // 90+ best practices score
        'categories:seo': ['error', { minScore: 0.9 }], // 90+ SEO score
        
        // Core Web Vitals thresholds
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }], // 2.5s LCP
        'first-input-delay': ['warn', { maxNumericValue: 100 }], // 100ms FID
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }], // 0.1 CLS
        
        // Performance metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }], // 1.8s FCP
        'speed-index': ['warn', { maxNumericValue: 3000 }], // 3s Speed Index
        'interactive': ['warn', { maxNumericValue: 3800 }], // 3.8s TTI
        
        // Resource optimization
        'unused-javascript': ['warn', { maxNumericValue: 100000 }], // 100KB max unused JS
        'render-blocking-resources': ['warn', { maxNumericValue: 500 }], // 500ms max render blocking
        
        // Design system specific checks
        'font-display': ['error', { minScore: 1 }], // Ensure proper font loading
        'uses-responsive-images': ['warn', { minScore: 1 }], // Responsive images
        'efficient-animated-content': ['warn', { minScore: 1 }], // GSAP animation efficiency
      },
    },
    upload: {
      target: 'temporary-public-storage', // Use Lighthouse CI's temporary storage
      // For production, consider using GitHub Actions or custom server
    },
    server: {
      // Local server configuration for CI
      port: 9009,
      storage: './lhci-data',
    },
  },
};