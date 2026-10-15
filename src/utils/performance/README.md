# Performance Monitoring Utilities

Reusable performance monitoring tools for measuring user experience across MDS projects.

## 🚀 Features

- **Web Vitals Monitoring**: Track Core Web Vitals (CLS, FID, FCP, LCP, TTFB, INP)
- **Lighthouse Audits**: Automated performance, accessibility, and SEO audits
- **React Hooks**: Easy integration with React applications
- **Analytics Integration**: Send metrics to custom analytics endpoints
- **Performance Budgets**: Automated checks against performance budgets
- **TypeScript Support**: Full type safety

## 📦 Installation

The utilities are already included in the MDS Platform. For other projects:

```bash
npm install web-vitals
npm install lighthouse chrome-launcher --save-dev
```

## 🎯 Web Vitals Monitoring

### Basic Usage

```typescript
import { initWebVitals } from '@/utils/performance';

// Initialize with debug logging
initWebVitals({ debug: true });
```

### With Analytics

```typescript
import { initWebVitals } from '@/utils/performance';

initWebVitals({
  debug: false,
  analyticsEndpoint: 'https://analytics.example.com/vitals',
  projectId: 'mds-platform',
});
```

### Custom Callback

```typescript
import { initWebVitals } from '@/utils/performance';

initWebVitals({
  onMetric: (metric) => {
    // Send to your analytics service
    analytics.track('web-vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  },
});
```

### React Hook

```typescript
import { useWebVitals } from '@/utils/performance';

function App() {
  useWebVitals({
    debug: true,
    projectId: 'mds-platform',
    onMetric: (metric) => {
      console.log(`${metric.name}: ${metric.value}`);
    },
  });

  return <YourApp />;
}
```

## 🔍 Lighthouse Audits

### Run Desktop Audit

```typescript
import { runLighthouseAudit } from '@/utils/performance';

const result = await runLighthouseAudit({
  url: 'http://localhost:5173',
  formFactor: 'desktop',
  outputDir: './lighthouse-reports',
  projectId: 'mds-platform',
  verbose: true,
});

console.log('Performance Score:', result.performanceScore);
console.log('LCP:', result.coreWebVitals.lcp);
```

### Run Full Audit (Desktop + Mobile)

```typescript
import { runFullAudit } from '@/utils/performance';

const results = await runFullAudit('http://localhost:5173', {
  outputDir: './reports',
  projectId: 'mds-platform',
  verbose: true,
});

console.log('Desktop Score:', results.desktop.performanceScore);
console.log('Mobile Score:', results.mobile.performanceScore);
```

### Performance Budget Checker

```typescript
import { runLighthouseAudit, checkPerformanceBudget } from '@/utils/performance';

const result = await runLighthouseAudit({
  url: 'http://localhost:5173',
  formFactor: 'desktop',
});

const budgetCheck = checkPerformanceBudget(result, {
  fcp: 1800,        // First Contentful Paint < 1.8s
  lcp: 2500,        // Largest Contentful Paint < 2.5s
  cls: 0.1,         // Cumulative Layout Shift < 0.1
  tbt: 200,         // Total Blocking Time < 200ms
  tti: 3800,        // Time to Interactive < 3.8s
  performanceScore: 90,  // Performance score >= 90
});

if (!budgetCheck.passed) {
  console.error('Performance budget violations:');
  budgetCheck.violations.forEach(v => console.error(`  - ${v}`));
  process.exit(1);
}
```

## 📊 Metric Thresholds

Based on Google's Core Web Vitals recommendations:

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| **FID** | ≤ 100ms | ≤ 300ms | > 300ms |
| **CLS** | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| **FCP** | ≤ 1.8s | ≤ 3.0s | > 3.0s |
| **TTFB** | ≤ 800ms | ≤ 1.8s | > 1.8s |
| **INP** | ≤ 200ms | ≤ 500ms | > 500ms |

```typescript
import { getMetricRating, WEB_VITALS_THRESHOLDS } from '@/utils/performance';

const rating = getMetricRating('LCP', 2300);
console.log(rating); // 'good'

console.log(WEB_VITALS_THRESHOLDS.LCP);
// { good: 2500, needsImprovement: 4000 }
```

## 🔧 NPM Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lighthouse": "node scripts/lighthouse-audit.js",
    "lighthouse:desktop": "LIGHTHOUSE_FORM_FACTOR=desktop npm run lighthouse",
    "lighthouse:mobile": "LIGHTHOUSE_FORM_FACTOR=mobile npm run lighthouse",
    "lighthouse:full": "npm run lighthouse:desktop && npm run lighthouse:mobile"
  }
}
```

## 📁 File Structure

```
src/
├── utils/
│   └── performance/
│       ├── index.ts           # Main exports
│       ├── webVitals.ts       # Web Vitals monitoring
│       └── lighthouse.ts      # Lighthouse utilities
└── hooks/
    └── useWebVitals.ts        # React hook
```

## 🎨 Example: Performance Dashboard Component

```typescript
import React, { useState, useEffect } from 'react';
import { useWebVitals, getPerformanceSnapshot } from '@/utils/performance';

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useWebVitals({
    debug: false,
    onMetric: (metric) => {
      setMetrics((prev: any) => ({
        ...prev,
        [metric.name]: {
          value: metric.value,
          rating: metric.rating,
        },
      }));
    },
  });

  useEffect(() => {
    const snapshot = getPerformanceSnapshot();
    if (snapshot) {
      setMetrics((prev: any) => ({
        ...prev,
        ...snapshot.metrics,
      }));
    }
  }, []);

  if (!metrics) return null;

  return (
    <div className="performance-dashboard">
      <h3>Core Web Vitals</h3>
      {Object.entries(metrics).map(([name, data]: any) => (
        <div key={name} className={`metric metric--${data.rating}`}>
          <span>{name}</span>
          <span>{data.value}</span>
        </div>
      ))}
    </div>
  );
}
```

## 🚀 CI/CD Integration

### GitHub Actions

```yaml
name: Performance Audit

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Start server
        run: npm run preview &
        
      - name: Run Lighthouse
        run: npm run lighthouse
      
      - name: Check performance budget
        run: node scripts/check-performance-budget.js
```

## 📚 Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Performance Budgets](https://web.dev/performance-budgets-101/)

## 🔗 Usage in Other Projects

To use these utilities in other MDS projects:

1. **Copy the performance utilities**:
   ```bash
   cp -r src/utils/performance /path/to/other/project/src/utils/
   cp src/hooks/useWebVitals.ts /path/to/other/project/src/hooks/
   ```

2. **Install dependencies**:
   ```bash
   npm install web-vitals
   npm install lighthouse chrome-launcher --save-dev
   ```

3. **Import and use**:
   ```typescript
   import { initWebVitals, runLighthouseAudit } from '@/utils/performance';
   ```

## 🐛 Troubleshooting

### Web Vitals not reporting

Make sure you're running in a browser environment:

```typescript
if (typeof window !== 'undefined') {
  initWebVitals({ debug: true });
}
```

### Lighthouse fails to launch Chrome

Install Chrome dependencies:

```bash
# Ubuntu/Debian
sudo apt-get install -y chromium-browser

# macOS
brew install --cask google-chrome
```

### TypeScript errors

Ensure you have the correct type definitions:

```bash
npm install --save-dev @types/node
```
