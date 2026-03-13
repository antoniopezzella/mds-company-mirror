# Testing the Corporate Landing Page

## ✅ Video Integration Confirmed

The hero video is working and correctly configured:
- **File Location**: `/public/video/hero-video.mp4`
- **File Size**: 19 MB
- **Video Properties**: Auto-play, muted, looping, responsive

## 🚀 How to Test

### 1. Start the Development Server

```bash
npm run dev
```

The dev server will start at `http://localhost:5173`

### 2. Access the Corporate Landing Page

Open your browser and navigate to:

```
http://localhost:5173/corporate-landing
```

### 3. What to Look For

#### Header (Top)
- ✅ Sticky header with blur effect
- ✅ Semi-transparent light blue background
- ✅ Marsh logo on the left
- ✅ Navigation links: Insights (with active underline), Solutions, Investors, About us, Media Center, Careers
- ✅ "Contact Us" button on the right

#### Hero Section (Main Area)
- ✅ Full-width light blue background (#CEECFF)
- ✅ Height: 980px
- ✅ **Left column (6 cols)**:
  - Eyebrow text: "Marsh McLennan is now Marsh."
  - Large headline: "One Marsh brand, delivering integrated solutions across risk, strategy, and people."
  - "Learn more" button with arrow icon
- ✅ **Right column (6 cols)**:
  - **Hero video playing automatically** (muted, looping)
  - Video covers the entire right side
  - Video has rounded corners (8px border-radius)
- ✅ **Bottom center**: Gold circular button with down arrow (scroll indicator)

### 4. Interactive Testing

#### Test Scroll Indicator
- Click the gold button at the bottom center
- Should smoothly scroll to next section

#### Test Navigation
- Hover over navigation links → Background should change slightly
- Click links → Should update active state (bottom border)

#### Test Responsiveness
- Resize browser window
- Mobile: Content should stack vertically
- Desktop: 6/6 column split maintained
- Video should adapt to container size

#### Test Video
- **Should auto-play** when page loads (muted)
- **Should loop** continuously
- **Should be muted** by default
- Video should cover right column without distortion
- On mobile: Video should still display properly

### 5. Validate Against Figma Design

Compare with the Figma design:
- [Figma Link](https://www.figma.com/design/ULnjmsLeldESKVrCDn4tRA/Marsh-Website-New-Concepts--future-state-?node-id=2897-45711)

Check:
- ✅ Spacing matches (48px margins, 24px padding)
- ✅ Typography sizes (24px eyebrow, 56px headline)
- ✅ Colors match exactly
- ✅ Grid layout is 6/6 split
- ✅ Video placement on right side

## 🔍 Browser DevTools Checks

### Console Errors
Open DevTools (F12) → Console tab
- Should have **no errors**
- Video should load successfully

### Network Tab
- Check video file loads: `/video/hero-video.mp4`
- Status should be `200 OK`
- Size: ~19 MB

### Elements Tab
Inspect the video element:
```html
<video autoplay muted loop playsinline>
  <source src="/video/hero-video.mp4" type="video/mp4">
</video>
```

## 🎨 Visual Regression Testing

### Colors
- Background: `#CEECFF` (light blue)
- Text primary: Blue from role tokens
- Button: Primary blue
- Gold button: `#FFBF0D`

### Typography
- Font family: MMC Display for headlines, Noto Sans for body
- Sizes responsive: 56px desktop → 40px mobile for headline

### Layout
- Header: Sticky at top
- Hero: Full viewport width
- Grid: Proper 6 column splits
- Video: Covers right column completely

## 🐛 Troubleshooting

### Video Not Playing?
1. Check file exists: `ls -lh public/video/hero-video.mp4`
2. Verify file size: Should be ~19 MB
3. Check browser console for 404 errors
4. Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Layout Issues?
1. Check browser zoom is at 100%
2. Clear browser cache
3. Check MUI Grid is working: Open DevTools → Elements → Verify Grid components

### Blur Effect Not Working?
1. Check browser supports backdrop-filter
2. Try in Chrome/Edge (best support)
3. Safari may have limited support

## 📱 Responsive Breakpoints to Test

- **Mobile**: < 600px (xs)
- **Tablet**: 600px - 1200px (md)
- **Desktop**: > 1200px (lg)

Test at each breakpoint:
- 375px (iPhone)
- 768px (iPad)
- 1440px (Desktop)
- 1920px (Large desktop)

## ✨ Accessibility Testing

### Keyboard Navigation
- Tab through navigation links
- Press Enter on scroll button
- Should work without mouse

### Screen Reader
- All interactive elements should have labels
- Video has fallback text
- Button has aria-label

## 🚦 Quick Validation Checklist

- [ ] Dev server running without errors
- [ ] Page loads at `/corporate-landing`
- [ ] Header visible and sticky
- [ ] Video playing automatically on right side
- [ ] Content visible on left side
- [ ] Scroll button visible at bottom
- [ ] Click scroll button works
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Video plays on all screen sizes

## 📊 Performance

Run Lighthouse audit:
```bash
npm run lighthouse:quick
```

Expected scores:
- Performance: > 80
- Accessibility: > 95
- Best Practices: > 90

## 🎯 Next Steps After Testing

If everything works:
1. Add remaining sections (Four Brands, Metrics, etc.)
2. Optimize video loading (lazy load, compression)
3. Add animations/transitions
4. Full accessibility audit
5. Cross-browser testing (Chrome, Firefox, Safari, Edge)
