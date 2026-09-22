# 🚀 Lighthouse Performance Monitoring

This project includes comprehensive Lighthouse integration for performance monitoring, accessibility testing, and web vitals tracking.

## 📊 Available Scripts

### Local Development
```bash
# Quick Lighthouse audit (single HTML report)
npm run lighthouse:quick

# Comprehensive audit (mobile + desktop with detailed reports)
npm run lighthouse

# Run audit against development server
npm run lighthouse:dev

# Run audit against production build
npm run lighthouse:build
```

### Continuous Integration
```bash
# Run Lighthouse CI (used in GitHub Actions)
npm run lighthouse:ci

# Collect performance data only
npm run lighthouse:collect

# Upload results to Lighthouse CI server
npm run lighthouse:upload
```

## 📁 Report Outputs

### Local Reports
- **Quick Report**: `lighthouse-quick-report.html`
- **Comprehensive Reports**: `lighthouse-reports/`
  - `desktop-report.html` - Full desktop audit
  - `mobile-report.html` - Full mobile audit
  - `desktop-report.json` - Desktop data (JSON)
  - `mobile-report.json` - Mobile data (JSON)
  - `summary.json` - Combined summary

### CI Reports
- **GitHub Actions**: Reports uploaded as artifacts
- **PR Comments**: Automated performance scores in pull requests
- **Lighthouse CI Storage**: Temporary public storage for trend analysis

## 🎯 Performance Budgets

The project enforces the following performance thresholds:

### Core Web Vitals
- **First Contentful Paint (FCP)**: ≤ 1.8s
- **Largest Contentful Paint (LCP)**: ≤ 2.5s
- **First Input Delay (FID)**: ≤ 100ms
- **Cumulative Layout Shift (CLS)**: ≤ 0.1

### Lighthouse Scores
- **Performance**: ≥ 80/100
- **Accessibility**: ≥ 95/100
- **Best Practices**: ≥ 90/100
- **SEO**: ≥ 90/100

### Resource Budgets
- **JavaScript Bundle**: ≤ 250KB
- **Total Page Weight**: ≤ 500KB
- **Unused JavaScript**: ≤ 100KB
- **Render Blocking**: ≤ 500ms

## 🔧 Configuration

### Lighthouse CI (`.lighthouserc.js`)
- Performance budgets and assertions
- Core Web Vitals thresholds
- Resource optimization checks
- Design system specific audits

### Standalone Config (`lighthouse.config.js`)
- Custom audit categories
- Desktop/mobile configurations
- Design system quality metrics

### GitHub Actions (`.github/workflows/lighthouse.yml`)
- Automated audits on push/PR
- Performance regression detection
- Artifact upload and PR comments

## 📈 Design System Specific Metrics

The configuration includes custom audits for design system quality:

### Animation Performance
- **Efficient Animated Content**: GSAP animation optimization
- **Layout Shift**: Animation-induced layout changes
- **Render Blocking**: CSS/JS impact on first paint

### Accessibility
- **Color Contrast**: Token-based color system validation
- **Focus Management**: Interactive component focus states
- **Semantic Structure**: Proper heading hierarchy

### Resource Optimization
- **Unused CSS**: Design token and component CSS efficiency
- **Font Loading**: Typography system performance
- **Image Optimization**: Asset delivery optimization

## 🚀 Usage Examples

### Development Workflow
```bash
# Start development and run comprehensive audit
npm run dev
# In another terminal:
npm run lighthouse

# Check performance after changes
npm run lighthouse:quick
```

### Pre-deployment Check
```bash
# Build and audit production bundle
npm run lighthouse:build
```

### CI/CD Integration
The Lighthouse CI automatically runs on:
- Every push to `main`
- Every pull request
- Results posted as PR comments
- Trend tracking in Lighthouse CI dashboard

## 📊 Interpreting Results

### Performance Score Breakdown
- **0-49**: Needs significant improvement
- **50-89**: Needs improvement
- **90-100**: Good performance

### Key Metrics to Monitor
1. **First Contentful Paint**: Initial content visibility
2. **Largest Contentful Paint**: Main content loading
3. **Cumulative Layout Shift**: Visual stability
4. **Total Blocking Time**: Interactivity delay

### Design System Optimization
- Monitor unused CSS for token efficiency
- Track animation performance impact
- Validate accessibility compliance
- Ensure responsive image delivery

## 🔗 Integration with MDS Platform

The Lighthouse setup is specifically configured for the Marsh Design System:

- **Token System**: Validates color contrast and CSS efficiency
- **GSAP Animations**: Monitors animation performance impact
- **Component Library**: Tracks unused code and optimization
- **Responsive Design**: Tests across mobile/desktop breakpoints
- **Accessibility**: Ensures design system compliance