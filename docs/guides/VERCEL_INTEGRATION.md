# Vercel Integration for MDS Platform

This document outlines how to leverage Vercel for design system deployment, monitoring, and distribution.

## 🚀 Deployment Strategies

### Automatic Deployments
- **Production**: `main` branch → https://your-ds.vercel.app
- **Preview**: Every PR → Unique preview URLs for stakeholder review
- **Branch**: Feature branches → Isolated testing environments

### Manual Deployments
```bash
# Deploy to production
npm run deploy

# Deploy preview
npm run deploy:preview

# Deploy just updated tokens
npm run deploy:tokens
```

## 📊 Vercel Analytics Integration

### Core Web Vitals Monitoring
```typescript
// Add to your Storybook main.ts
import { Analytics } from '@vercel/analytics/react';

export default {
  // ... existing config
  viteFinal: async (config) => {
    // Add analytics in production
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(/* Analytics plugin */);
    }
    return config;
  }
};
```

### Performance Budgets
```json
// vercel.json - Add performance monitoring
{
  "functions": {
    "app/**": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        }
      ]
    }
  ]
}
```

## 🎯 Design System Distribution

### Token API Endpoints
Your deployed design system will expose:
- `/tokens.json` → Design tokens
- `/theme.css` → CSS custom properties
- `/dist/` → Build artifacts

### Consumption Examples
```bash
# Install from Vercel deployment
npm install https://your-ds.vercel.app/dist/mds-platform.tgz

# Or use CDN
<link rel="stylesheet" href="https://your-ds.vercel.app/theme.css">
```

## 🔧 Environment Setup

### Required Vercel Secrets
Set these in your Vercel dashboard:
- `VERCEL_TOKEN` → Your Vercel API token
- `VERCEL_ORG_ID` → Organization ID
- `VERCEL_PROJECT_ID` → Project ID

### Environment Variables
```bash
# .env.local
NODE_ENV=production
VERCEL_ENV=production
```

## 📈 Monitoring & Analytics

### Design System Usage Tracking
```typescript
// Track component usage
import { track } from '@vercel/analytics';

export const Button = ({ variant, ...props }) => {
  useEffect(() => {
    track('component_used', {
      component: 'Button',
      variant,
      timestamp: Date.now()
    });
  }, [variant]);
  
  return <MuiButton {...props} />;
};
```

### Performance Monitoring
- **Bundle Size**: Track component bundle sizes
- **Load Times**: Monitor Storybook performance
- **User Metrics**: Real user monitoring for teams using the DS

## 🚀 Advanced Features

### Edge Functions for Token Generation
```typescript
// api/tokens/[version].ts - Dynamic token API
export default function handler(req, res) {
  const { version } = req.query;
  const tokens = generateTokensForVersion(version);
  
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.json(tokens);
}
```

### Multi-Environment Support
- **Production**: `main` branch
- **Staging**: `develop` branch  
- **Feature**: Feature branches

## 📝 Next Steps

1. **Connect Vercel Project**: Link your repository
2. **Configure Secrets**: Add required environment variables
3. **Test Deployment**: Push to trigger first build
4. **Monitor Performance**: Set up analytics and monitoring
5. **Team Access**: Share preview URLs with stakeholders

## 🔗 Useful Commands

```bash
# Development
npm run dev                    # Local development
npm run storybook             # Design system documentation

# Building
npm run tokens:build          # Generate design tokens
npm run build-storybook       # Build documentation
npm run vercel:build          # Full Vercel build

# Deployment
npm run deploy                # Production deployment
npm run deploy:preview        # Preview deployment
npm run deploy:tokens         # Deploy token updates only

# Quality
npm run tokens:check          # Validate design system
npm run governance:ci         # Run governance checks
npm run lighthouse:build      # Performance audit
```

## 🎉 Benefits

- ✅ **Zero-config Deployments**: Automatic builds and deploys
- ✅ **Preview URLs**: Every PR gets a shareable link
- ✅ **Performance Monitoring**: Built-in Core Web Vitals tracking
- ✅ **Global CDN**: Fast token/asset delivery worldwide
- ✅ **Team Collaboration**: Easy stakeholder review process
- ✅ **Version Control**: Automatic versioning and rollbacks