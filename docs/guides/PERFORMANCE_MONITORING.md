# Performance Monitoring Setup

Complete guide for performance monitoring infrastructure in the MDS Platform.

## 🎯 Overview

The MDS Platform now includes comprehensive performance monitoring utilities that can be used across different projects:

- **Web Vitals Monitoring**: Real-time Core Web Vitals tracking
- **Lighthouse Audits**: Automated performance, accessibility, and SEO audits
- **React Integration**: Easy-to-use hooks for React applications
- **Performance Budgets**: Automated checks to enforce performance standards

## 📦 What's Installed

### Web Vitals Package
- **Package**: `web-vitals` (v4.x)
- **Size**: ~5KB gzipped
- **Metrics**: CLS, FID, FCP, LCP, TTFB, INP

### Lighthouse Tools
- **Package**: `lighthouse` + `chrome-launcher`
- **Environment**: Development only (devDependencies)
- **Output**: HTML and JSON reports

## 📁 File Structure

```
src/
├── utils/
│   └── performance/
│       ├── index.ts           # Main exports
│       ├── webVitals.ts       # Web Vitals monitoring
│       ├── lighthouse.ts      # Lighthouse utilities
│       └── README.md          # Detailed documentation
├── hooks/
│   └── useWebVitals.ts        # React hook
└── pages/
    └── CorporateLandingPage/
        └── index.tsx          # Web Vitals enabled ✅

scripts/
├── lighthouse-audit.js        # Original audit script
└── run-lighthouse.js          # Enhanced audit with budgets

package.json                   # NPM scripts added
```

## 🚀 Usage

### 1. Web Vitals Monitoring (Runtime)

#### Basic Setup

```typescript
import { initWebVitals } from '@/utils/performance';

// Initialize monitoring
initWebVitals({ debug: true });
```

#### React Hook (Recommended)

```typescript
import { useWebVitals } from '@/hooks/useWebVitals';

function App() {
  useWebVitals({
    debug: import.meta.env.DEV,
    projectId: 'mds-platform',
    onMetric: (metric) => {
      console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
    },
  });

  return <YourApp />;
}
```

#### Current Implementation

**src/App.tsx** ✅
```typescript
useWebVitals({
  debug: import.meta.env.DEV,
  projectId: 'mds-platform',
  onMetric: (metric) => {
    if (import.meta.env.DEV) {
      console.log(`[Web Vital] ${metric.name}:`, metric.value, `(${metric.rating})`);
    }
  },
});
```

**src/pages/CorporateLandingPage/index.tsx** ✅
```typescript
useWebVitals({
  debug: import.meta.env.DEV,
  projectId: 'marsh-corporate-landing',
  onMetric: (metric) => {
    if (import.meta.env.DEV) {
      console.log(`[Landing Page] ${metric.name}:`, metric.value, `(${metric.rating})`);
    }
  },
});
```

### 2. Lighthouse Audits (Build Time)

#### NPM Scripts

```bash
# Run enhanced audit with performance budgets
npm run perf:audit

# Audit development build
npm run perf:dev

# Audit production build
npm run perf:build

# Legacy scripts (still work)
npm run lighthouse        # Original audit script
npm run lighthouse:dev    # Dev audit
npm run lighthouse:build  # Build audit
```

#### Performance Budgets

The enhanced audit (`npm run perf:audit`) checks against these budgets:

```javascript
{
  fcp: 1800,              // First Contentful Paint < 1.8s
  lcp: 2500,              // Largest Contentful Paint < 2.5s
  cls: 0.1,               // Cumulative Layout Shift < 0.1
  tbt: 200,               // Total Blocking Time < 200ms
  tti: 3800,              // Time to Interactive < 3.8s
  performanceScore: 90,   // Performance score >= 90
}
```

**Note**: The script will exit with error code 1 if budgets are not met, useful for CI/CD.

#### Programmatic Usage

```typescript
import { runLighthouseAudit, checkPerformanceBudget } from '@/utils/performance';

const result = await runLighthouseAudit({
  url: 'http://localhost:5173',
  formFactor: 'desktop',
  outputDir: './reports',
  projectId: 'my-project',
  verbose: true,
});

const budgetCheck = checkPerformanceBudget(result, {
  lcp: 2500,
  cls: 0.1,
  performanceScore: 90,
});

if (!budgetCheck.passed) {
  console.error('Budget violations:', budgetCheck.violations);
}
```

## 📊 Monitoring in Action

### Development Mode

When running `npm run dev`, you'll see Web Vitals logged to console:

```
[Web Vital] FCP: 567 (good)
[Web Vital] LCP: 1234 (good)
[Web Vital] CLS: 0.05 (good)
[Landing Page] FCP: 523 (good)
[Landing Page] LCP: 1156 (good)
```

### Production Mode

In production, metrics are collected but not logged. You can:

1. **Send to analytics endpoint**:
   ```typescript
   initWebVitals({
     analyticsEndpoint: 'https://analytics.example.com/vitals',
     projectId: 'mds-platform',
   });
   ```

2. **Custom analytics integration**:
   ```typescript
   initWebVitals({
     onMetric: (metric) => {
       // Google Analytics 4
       gtag('event', metric.name, {
         value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
         metric_id: metric.id,
         metric_value: metric.value,
         metric_delta: metric.delta,
       });
     },
   });
   ```

## 🎨 Performance Dashboard Component

You can create a real-time performance dashboard:

```typescript
import React, { useState } from 'react';
import { useWebVitals, getPerformanceSnapshot } from '@/utils/performance';
import { Badge } from '@/components/ui';

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  useWebVitals({
    onMetric: (metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name]: {
          value: metric.value,
          rating: metric.rating,
        },
      }));
    },
  });

  return (
    <div className="p-2">
      <h6>Core Web Vitals</h6>
      {Object.entries(metrics).map(([name, data]) => (
        <div key={name} className="flex items-center gap-1 my-1">
          <span>{name}:</span>
          <span>{Math.round(data.value)}</span>
          <Badge tone={data.rating === 'good' ? 'success' : 'warning'}>
            {data.rating}
          </Badge>
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Configuration

### Customizing Lighthouse Config

Edit `src/utils/performance/lighthouse.ts`:

```typescript
export const desktopConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1440,  // Adjust viewport
      height: 900,
      deviceScaleFactor: 1,
    },
  },
  // ... more settings
};
```

### Customizing Performance Budgets

Edit `scripts/run-lighthouse.js`:

```javascript
const budget = {
  fcp: 1500,              // Stricter: < 1.5s
  lcp: 2000,              // Stricter: < 2.0s
  cls: 0.05,              // Stricter: < 0.05
  tbt: 150,               // Stricter: < 150ms
  tti: 3000,              // Stricter: < 3.0s
  performanceScore: 95,   // Stricter: >= 95
};
```

## 🚨 Current Issues to Address

### 1. GSAP Markers Enabled (HIGH PRIORITY)

**Issue**: `markers: true` in production adds performance overhead

**Files affected**:
- `src/pages/CorporateLandingPage/index.tsx`
- `src/pages/CorporateLandingPage/FourBrandsSection.tsx`

**Fix needed**:
```typescript
// Before
gsap.to(element, { 
  scrollTrigger: { 
    markers: true,  // ❌ Remove this
  } 
});

// After
gsap.to(element, { 
  scrollTrigger: { 
    markers: import.meta.env.DEV,  // ✅ Only in development
  } 
});
```

### 2. H1 Accessibility Issue (HIGH PRIORITY)

**Issue**: Split text animation breaks screen readers

**File**: `src/pages/CorporateLandingPage/HeroSection.tsx`

**Current implementation**: Uses `innerHTML` to split text
**Problem**: Screen readers can't read properly structured text

**Fix needed**: Use CSS-based animation instead:
```css
.word {
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.word:nth-child(1) { animation-delay: 0s; }
.word:nth-child(2) { animation-delay: 0.05s; }
/* ... */
```

### 3. No Lazy Loading (MEDIUM PRIORITY)

**Issue**: All images/videos load immediately

**Fix needed**:
```typescript
<img 
  src={imageSrc} 
  loading="lazy"  // ✅ Add this
  alt="..." 
/>
```

## 📈 Expected Results

### Good Performance Scores

After implementing all optimizations, you should see:

**Desktop**:
- Performance: 95-100
- FCP: < 1.0s
- LCP: < 1.5s
- CLS: < 0.05
- TBT: < 100ms

**Mobile**:
- Performance: 85-95
- FCP: < 1.8s
- LCP: < 2.5s
- CLS: < 0.1
- TBT: < 300ms

### Current Baseline (Needs Measurement)

Run `npm run perf:dev` to establish current metrics.

## 🔄 Using in Other Projects

### 1. Copy Utilities

```bash
# From MDS-Platform to another project
cp -r src/utils/performance /path/to/project/src/utils/
cp src/hooks/useWebVitals.ts /path/to/project/src/hooks/
```

### 2. Install Dependencies

```bash
npm install web-vitals
npm install lighthouse chrome-launcher --save-dev
```

### 3. Add NPM Scripts

```json
{
  "scripts": {
    "perf:audit": "node scripts/run-lighthouse.js",
    "perf:dev": "npm run dev & sleep 10 && npm run perf:audit",
    "perf:build": "npm run build && npm run preview & sleep 5 && LIGHTHOUSE_URL=http://localhost:4173 npm run perf:audit"
  }
}
```

### 4. Initialize in App

```typescript
import { useWebVitals } from '@/hooks/useWebVitals';

function App() {
  useWebVitals({
    debug: import.meta.env.DEV,
    projectId: 'your-project-name',
  });

  return <YourApp />;
}
```

## 📚 Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Performance Budgets Guide](https://web.dev/performance-budgets-101/)
- [Utility README](../../src/utils/performance/README.md)

## ✅ Next Steps

1. **Remove GSAP markers from production** (edit ScrollTrigger configs)
2. **Fix H1 accessibility** (replace innerHTML with CSS animation)
3. **Add lazy loading** (images, videos, heavy components)
4. **Run baseline audit** (`npm run perf:dev`)
5. **Set up analytics integration** (Google Analytics, custom endpoint)
6. **Add performance monitoring to CI/CD** (GitHub Actions, etc.)
7. **Create performance dashboard component** (optional)

## 🤝 Contributing

When adding new features:

1. Run performance audit before and after
2. Check Core Web Vitals impact
3. Update performance budgets if needed
4. Document any performance considerations
