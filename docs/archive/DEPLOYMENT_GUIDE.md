# MDS Platform Deployment Guide

## 🚀 Vercel Project Setup

**Project ID**: `prj_09oJEVnuyBTRMyBuUGgbr97x8j5Q`

## Quick Deployment Commands

```bash
# Test build locally
npm run vercel:build

# Deploy to production (requires Vercel CLI)
npm run deploy

# Deploy preview version
npm run deploy:preview

# Just deploy updated tokens
npm run deploy:tokens
```

## 🔧 Setup Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Link your project
```bash
vercel link
```

### 3. Deploy
```bash
vercel --prod
```

## 📊 What Gets Deployed

✅ **Storybook Documentation** - Complete component library  
✅ **Design Tokens** - Available at `/tokens.json`  
✅ **CSS Theme** - Available at `/theme.css`  
✅ **Optimized Assets** - All fonts, images, SVGs  
✅ **Hero Animation** - Your enhanced M formation sequence!  

## 🌐 URLs After Deployment

- **Production**: `https://mds-platform-b2b-2025.vercel.app`
- **Preview**: Unique URL for each PR
- **Tokens API**: `https://your-domain.vercel.app/tokens.json`
- **Theme CSS**: `https://your-domain.vercel.app/theme.css`

## 📈 Performance Optimizations Applied

- **Font Caching**: 1 year cache for web fonts
- **Asset Optimization**: Automatic image optimization
- **Compression**: Gzip compression for all assets
- **CDN Distribution**: Global edge network

## 🎯 Next Steps

1. Run `vercel` to deploy your first version
2. Share the preview URL with stakeholders
3. Set up GitHub integration for automatic deployments
4. Monitor performance with Vercel Analytics

Your Hero animations with the enhanced M formation are ready to go live! 🎬✨