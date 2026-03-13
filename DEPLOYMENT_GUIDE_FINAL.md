# Deployment Guide - Marsh Design System

## 📋 Pre-Deployment Checklist

✅ **Completed Optimizations:**
- [x] npm audit vulnerabilities fixed (3 high/moderate fixed)
- [x] Security headers configured (Netlify & Vercel)
- [x] Content Security Policy implemented
- [x] Font optimization with `font-display: swap`
- [x] GSAP lazy-loading utilities created
- [x] Real User Monitoring (RUM) integrated
- [x] Route-based code splitting (35% bundle reduction)
- [x] Compression enabled (gzip + brotli)

## 🚀 Deployment Steps

### Option 1: Deploy to Netlify

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
   
   Or connect your GitHub repo for automatic deployments:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings are already configured in `netlify.toml`

4. **Verify security headers** after deployment:
   ```bash
   curl -I https://your-site.netlify.app
   ```
   
   You should see:
   - `Strict-Transport-Security`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Content-Security-Policy`

### Option 2: Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```
   
   Or connect via GitHub:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Build settings are in `vercel.json`

4. **Verify deployment**:
   ```bash
   curl -I https://your-site.vercel.app
   ```

## 📊 Post-Deployment Verification

### 1. Run Lighthouse Audit

On the **deployed** site (not localhost):

```bash
npx lighthouse https://your-deployed-site.com \
  --output=html \
  --output=json \
  --output-path=./lighthouse-production \
  --view
```

**Expected Scores:**
- Performance: **85%+** (with compression and lazy loading)
- Accessibility: **95%+** (with aria-labels)
- Best Practices: **95%+** (with security headers)
- SEO: **90%+** (with meta tags)

### 2. Test Security Headers

```bash
curl -I https://your-deployed-site.com | grep -i "security\|frame\|content"
```

Should show:
```
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
content-security-policy: default-src 'self'; ...
```

### 3. Check Bundle Sizes

```bash
# After build, check dist/ directory
ls -lh dist/assets/*.js | awk '{print $5, $9}'
```

**Expected sizes:**
- Main bundle: ~880 KB (252 KB gzipped)
- React vendor: ~62 KB (21 KB gzipped)
- GSAP vendor: ~118 KB (47 KB gzipped)
- Corporate page chunk: ~59 KB (11 KB gzipped)

### 4. Test Real User Monitoring

1. Open browser DevTools Console
2. Navigate through the site
3. Check for Web Vitals logs:
   ```
   [RUM] Real User Monitoring initialized
   CLS: 0.02ms (good)
   FCP: 1200ms (good)
   LCP: 2100ms (good)
   ```

4. Verify page tracking:
   - Open DevTools Network tab
   - Navigate to different routes
   - Look for analytics beacons to `/api/analytics/web-vitals`

## 🔧 Configure Analytics (Optional)

### Enable Google Analytics 4

1. **Get your GA4 Measurement ID**:
   - Go to Google Analytics Admin
   - Create a new GA4 property
   - Copy your Measurement ID (G-XXXXXXXXXX)

2. **Update configuration** in `src/utils/rum.ts`:
   ```typescript
   ga4: {
     enabled: true, // Enable GA4
     measurementId: 'G-YOUR-MEASUREMENT-ID',
   }
   ```

3. **Add GA4 script** to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-YOUR-ID');
   </script>
   ```

### Enable Custom Analytics Endpoint

1. **Create backend endpoint** at `/api/analytics/web-vitals`:
   ```javascript
   // Example Express.js endpoint
   app.post('/api/analytics/web-vitals', (req, res) => {
     const metric = req.body;
     // Store in database or forward to analytics service
     console.log('Web Vital:', metric.name, metric.value);
     res.sendStatus(204);
   });
   ```

2. **Already configured** in `src/utils/rum.ts`:
   ```typescript
   custom: {
     enabled: true,
     endpoint: '/api/analytics/web-vitals',
   }
   ```

### Enable DataDog RUM

1. **Sign up for DataDog** and get credentials

2. **Update configuration**:
   ```typescript
   datadog: {
     enabled: true,
     clientToken: 'your-datadog-client-token',
     applicationId: 'your-app-id',
   }
   ```

3. **Install DataDog SDK**:
   ```bash
   npm install @datadog/browser-rum
   ```

4. **Initialize in `main.tsx`**:
   ```typescript
   import { datadogRum } from '@datadog/browser-rum';
   
   datadogRum.init({
     applicationId: 'your-app-id',
     clientToken: 'your-client-token',
     site: 'datadoghq.com',
     service: 'marsh-design-system',
     env: 'production',
   });
   ```

## 🎯 Performance Targets

### Before Optimization (Baseline)
- Bundle size: 1,362 KB (323 KB gzipped)
- Performance score: 30%
- First Contentful Paint: 3.8s
- Largest Contentful Paint: 40s

### After Optimization (Current)
- Bundle size: 881 KB (252 KB gzipped) - **35% reduction**
- Performance score: **85%+** expected
- First Contentful Paint: **<1.5s**
- Largest Contentful Paint: **<2.5s**
- Cumulative Layout Shift: **<0.1**

## 📈 Monitoring Best Practices

### 1. Set Up Alerts

**Critical metrics to monitor:**
- LCP > 2.5s (poor)
- FID/INP > 200ms (poor)
- CLS > 0.25 (poor)
- Error rate > 1%

**Recommended tools:**
- Google Analytics 4 (free)
- DataDog RUM (paid, comprehensive)
- New Relic Browser (paid)
- Sentry (error tracking)

### 2. Weekly Performance Reviews

```bash
# Run weekly Lighthouse audits
npm run lighthouse:prod

# Compare results over time
node scripts/compare-lighthouse-reports.js
```

### 3. Monitor Bundle Size

Add to CI/CD pipeline:
```bash
# Fail build if bundle grows >10%
npm run build
node scripts/check-bundle-size.js --max-increase=10
```

## 🔒 Security Hardening for Production

### 1. Update CSP for Production

The current CSP allows `unsafe-inline` and `unsafe-eval` for development.

**For production**, create a stricter policy:
1. Use the nonce-based CSP plugin we created
2. Remove `unsafe-inline` and `unsafe-eval`
3. Add CSP reporting endpoint

### 2. Enable HSTS Preloading

After confirming HTTPS works:
1. Go to https://hstspreload.org/
2. Submit your domain
3. Wait for browser inclusion (can take weeks)

### 3. Regular Security Audits

```bash
# Run monthly
npm audit
npm audit fix

# Check for outdated dependencies
npm outdated

# Update dependencies quarterly
npm update
```

## 🆘 Troubleshooting

### Issue: Performance score still low

**Check:**
1. Are you testing on production URL (not localhost)?
2. Is compression enabled on server?
3. Are images optimized?
4. Is caching configured correctly?

**Solution:**
```bash
# Verify compression
curl -H "Accept-Encoding: gzip" https://your-site.com -I | grep content-encoding

# Should show: content-encoding: gzip or br
```

### Issue: Security headers not showing

**Check:**
1. Are you deploying to Netlify/Vercel?
2. Is `netlify.toml` or `vercel.json` in the project root?
3. Did you redeploy after adding headers?

**Solution:**
```bash
# Redeploy
git add netlify.toml vercel.json
git commit -m "Add security headers"
git push

# Force redeploy on Netlify
netlify deploy --prod --force
```

### Issue: RUM not sending data

**Check:**
1. Are analytics endpoints configured?
2. Is CORS enabled on backend?
3. Check browser console for errors

**Solution:**
```typescript
// Enable debug logging
if (import.meta.env.DEV) {
  console.info('[RUM] Metric sent:', metric);
}
```

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)
- [CSP Reference](https://content-security-policy.com/)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)

## ✅ Deployment Complete

After deployment:
1. ✅ Verify site loads correctly
2. ✅ Run Lighthouse audit
3. ✅ Check security headers
4. ✅ Test all routes and features
5. ✅ Monitor Web Vitals for 24-48 hours
6. ✅ Set up alerts for critical metrics

---

**Deployed by:** [Your Name]  
**Date:** [Date]  
**Version:** 1.0.0  
**Production URL:** [Your URL]
