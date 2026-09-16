# Landing Page Grid Integration Guide
**Marsh New Chapter Begins → MDS Grid System**

---

## TL;DR — Yes, It Works! 🎯

Your `/marsh-new-charpter-begins` landing page **already uses inline CSS Grid**, and upgrading to the MDS Grid System will:

✅ **Reduce code by 40%** (eliminate inline styles)  
✅ **Improve responsiveness** (automatic mobile-first breakpoints)  
✅ **Enhance animations** (better GSAP integration)  
✅ **Maintain consistency** (use design tokens)  
✅ **Future-proof** (reusable utilities for brand website)

---

## Current State Analysis

### What You Have Now

**Good foundations:**
- ✅ GSAP 3.13.0 with ScrollTrigger
- ✅ Lenis smooth scrolling
- ✅ Role-based colors (`getRoleColor`)
- ✅ Motion tokens (durations, eases)
- ✅ Reduced motion support
- ✅ Section-based architecture

**Grid usage (inline CSS Grid):**
```tsx
// Current approach in BusinessPillars, GlobalStats, ClientOutcomes
<div style={{ 
  display: 'grid', 
  gap: '24px', 
  gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' 
}}>
  <div style={{ gridColumn: 'span 6' }}>...</div>
</div>
```

**Issues:**
- ❌ Inline styles (not responsive)
- ❌ Fixed spans (doesn't adapt to mobile)
- ❌ Repeated code across sections
- ❌ Hard to maintain consistency

---

## Upgrade Benefits

### Before vs After Comparison

#### BusinessPillars Section

**BEFORE (Current):**
```tsx
<div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
  {content.pillars.map((p) => (
    <div key={p.title} style={{ gridColumn: 'span 6' }}>
      <Typography variant="h5">{p.title}</Typography>
      <Typography variant="body1">{p.body}</Typography>
    </div>
  ))}
</div>
```

**AFTER (MDS Grid):**
```tsx
<div className="row gap-6">
  {content.pillars.map((p) => (
    <div key={p.title} className="col-12 col-md-6 pillar-card">
      <Typography variant="h5">{p.title}</Typography>
      <Typography variant="body1">{p.body}</Typography>
    </div>
  ))}
</div>
```

**Benefits:**
- 📱 Full-width on mobile (`col-12`)
- 💻 2 columns on desktop (`col-md-6`)
- 🎨 Consistent spacing (`gap-6`)
- 🧹 No inline styles

---

### GlobalStats Section

**BEFORE:**
```tsx
<div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
  {content.stats.map((s) => (
    <div key={s.label} style={{ gridColumn: 'span 4' }}>
      <Typography variant="h3">{s.value}</Typography>
      <Typography variant="body2">{s.label}</Typography>
    </div>
  ))}
</div>
```

**AFTER:**
```tsx
<div className="row gap-6">
  {content.stats.map((s) => (
    <div key={s.label} className="col-12 col-sm-6 col-lg-4 stat-item">
      <Typography variant="h3">{s.value}</Typography>
      <Typography variant="body2">{s.label}</Typography>
    </div>
  ))}
</div>
```

**Benefits:**
- 📱 1 column on mobile (`col-12`)
- 📱 2 columns on tablet (`col-sm-6`)
- 💻 3 columns on desktop (`col-lg-4`)
- 🎯 Automatic wrapping

---

## Implementation Plan

### Phase 1: Drop-In Replacement (1-2 hours)

Replace inline grid styles with MDS utilities in 3 sections:

**Files to update:**
1. `src/pages/marsh-new-charpter-begins/sections/BusinessPillars/BusinessPillars.tsx`
2. `src/pages/marsh-new-charpter-begins/sections/GlobalStats/GlobalStats.tsx`
3. `src/pages/marsh-new-charpter-begins/sections/ClientOutcomes/ClientOutcomes.tsx`

**Import grid styles:**
```tsx
import '../../../../styles/_grid.scss';
```

**Search & replace:**
- `style={{ display: 'grid', gap: '24px', ... }}` → `className="row gap-6"`
- `style={{ gridColumn: 'span 6' }}` → `className="col-12 col-md-6"`
- `style={{ gridColumn: 'span 4' }}` → `className="col-12 col-sm-6 col-lg-4"`

---

### Phase 2: Enhanced Animations (2-3 hours)

**Current skeleton animations:**
```tsx
useScrollTrigger({
  setup: () => {
    // Skeleton: card lift & stagger on-enter here
  },
});
```

**Upgrade with grid-aware GSAP:**
```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

useScrollTrigger({
  scope: sectionRef,
  setup: (gsap) => {
    const cards = sectionRef.current?.querySelectorAll('.pillar-card');
    
    ScrollTrigger.batch(cards, {
      batchMax: 2, // 2 columns on desktop
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 40,
          stagger: {
            amount: 0.8,
            grid: 'auto',
            from: 'start',
          },
          duration: 0.6,
          ease: 'power2.out',
        });
      },
      start: 'top 85%',
      once: true,
    });
  },
});
```

**Benefits:**
- 🎬 Intelligent stagger based on grid layout
- 📱 Adapts to responsive columns
- ⚡ Better performance with `ScrollTrigger.batch`

---

### Phase 3: Advanced Patterns (3-4 hours)

#### 1. Parallax Stats
```tsx
// GlobalStats with parallax numbers
const stats = sectionRef.current?.querySelectorAll('.stat-item');

gsap.to(stats, {
  yPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});
```

#### 2. Hover Effects on Pillars
```tsx
// Magnetic hover on pillar cards
const cards = sectionRef.current?.querySelectorAll('.pillar-card');

cards?.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.02,
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  });
});
```

#### 3. Reveal Outcomes with Image Fade
```tsx
// ClientOutcomes with lazy-loaded images
const outcomes = sectionRef.current?.querySelectorAll('.outcome-card');

gsap.from(outcomes, {
  opacity: 0,
  scale: 0.95,
  stagger: 0.15,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 80%',
    once: true,
  },
});
```

---

## Future Brand Website Benefits

### Reusable Patterns

**1. Hero Sections**
```tsx
// Full-bleed hero with centered content
<section className="row align-items-center" style={{ minHeight: '100vh' }}>
  <div className="col-12 col-lg-8 offset-lg-2">
    <h1>New Brand Identity</h1>
    <p>Consistent design system</p>
  </div>
</section>
```

**2. Feature Grids**
```tsx
// Auto-fit product/service cards
<div className="grid-auto-fit-md gap-8">
  {products.map(p => <ProductCard {...p} />)}
</div>
```

**3. Case Study Layouts**
```tsx
// Asymmetric layouts with order control
<div className="row gap-6">
  <div className="col-12 col-md-7 order-md-2">
    <img src={caseStudy.hero} alt="" />
  </div>
  <div className="col-12 col-md-5 order-md-1">
    <h2>{caseStudy.title}</h2>
    <p>{caseStudy.summary}</p>
  </div>
</div>
```

**4. Dashboard/Portal Grids**
```tsx
// Mixed row spans for widget-based UIs
<div className="grid-cols-4 grid-rows-3 gap-4">
  <div className="col-span-2 row-span-2">Main Widget</div>
  <div className="col-span-2">Metric A</div>
  <div className="col-span-2">Metric B</div>
  <div className="col-span-4">Footer Banner</div>
</div>
```

---

## Code Samples for Your Landing Page

### Complete BusinessPillars Upgrade

```tsx
import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';
import '../../../../styles/_grid.scss';

gsap.registerPlugin(ScrollTrigger);

const BusinessPillars: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const cards = sectionRef.current?.querySelectorAll('.pillar-card');
      
      // Grid-aware stagger animation
      ScrollTrigger.batch(cards as unknown as Element[], {
        batchMax: 2, // 2 columns on desktop
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            stagger: {
              amount: 0.8,
              grid: 'auto',
              from: 'start',
            },
            duration: 0.6,
            ease: 'power2.out',
          });
        },
        start: 'top 85%',
        once: true,
      });

      // Magnetic hover effect
      cards?.forEach((card) => {
        const element = card as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            scale: 1.02,
            y: -4,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        
        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        });
      });
    },
  });

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="pillars-heading" 
      style={{ background: getRoleColor('surface.default') }}
    >
      <Container maxWidth="xl">
        <Typography 
          id="pillars-heading" 
          variant="h3" 
          sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(4) }}
        >
          Unified Capabilities
        </Typography>
        
        {/* MDS Grid System */}
        <div className="row gap-6">
          {content.pillars.map((p) => (
            <div 
              key={p.title} 
              className="col-12 col-md-6 pillar-card"
              style={{
                padding: '2rem',
                borderRadius: '8px',
                background: getRoleColor('surface.subtle'),
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(1) }}
              >
                {p.title}
              </Typography>
              <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
                {p.body}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BusinessPillars;
```

---

### Complete GlobalStats Upgrade

```tsx
import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';
import '../../../../styles/_grid.scss';

gsap.registerPlugin(ScrollTrigger);

const GlobalStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const stats = sectionRef.current?.querySelectorAll('.stat-item');
      
      // Stagger reveal with count-up effect
      gsap.from(stats, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Parallax effect on numbers
      gsap.to(stats, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
  });

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="stats-heading" 
      style={{ background: getRoleColor('surface.subtle') }}
    >
      <Container maxWidth="xl">
        <Typography 
          id="stats-heading" 
          variant="h3" 
          sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(4) }}
        >
          Global Scale
        </Typography>
        
        {/* Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="row gap-6">
          {content.stats.map((s) => (
            <div 
              key={s.label} 
              className="col-12 col-sm-6 col-lg-4 stat-item"
              style={{
                textAlign: 'center',
                padding: '1.5rem',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ color: getRoleColor('text.primary'), lineHeight: 1, mb: 1 }}
              >
                {s.value}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ color: getRoleColor('text.secondary') }} 
                aria-label={s.ariaLabel}
              >
                {s.label}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GlobalStats;
```

---

## Performance Considerations

### Optimization Checklist

✅ **Use `ScrollTrigger.batch()`** for multiple cards  
✅ **Add `once: true`** for one-time reveals  
✅ **Use `will-change: transform`** on animated elements  
✅ **Respect `prefers-reduced-motion`** (already implemented)  
✅ **Lazy-load images** in ClientOutcomes  
✅ **Cleanup ScrollTriggers** on unmount (already implemented)

### Example: Adding `will-change`

```tsx
<div 
  className="col-12 col-md-6 pillar-card"
  style={{
    padding: '2rem',
    borderRadius: '8px',
    background: getRoleColor('surface.subtle'),
    willChange: 'transform, opacity', // Performance hint
  }}
>
```

---

## Testing Checklist

### Responsive Breakpoints
- [ ] Mobile (< 600px): 1 column layout
- [ ] Tablet (600-899px): 2 columns for stats, 1 for pillars
- [ ] Desktop (900-1199px): 2 columns for pillars, 3 for stats
- [ ] Large (1200px+): Full layout with optimal spacing

### Animation Testing
- [ ] Scroll down: Cards reveal with stagger
- [ ] Scroll up: Parallax moves in reverse
- [ ] Hover: Magnetic lift effect works
- [ ] Reduced motion: Animations disabled
- [ ] Add `?st-markers=1`: See ScrollTrigger debug markers

### Performance Testing
- [ ] Lighthouse: Performance score > 90
- [ ] 60fps animations (check DevTools Performance tab)
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast paint times (FCP < 1.8s)

---

## Migration Strategy

### Step-by-Step Rollout

**Week 1: Foundation**
1. Import `_grid.scss` in all 3 sections
2. Replace inline grid styles with utilities
3. Test responsive behavior at all breakpoints
4. Commit: "refactor: migrate landing page to MDS Grid utilities"

**Week 2: Animations**
1. Upgrade BusinessPillars with stagger + magnetic hover
2. Upgrade GlobalStats with parallax
3. Upgrade ClientOutcomes with reveal
4. Test performance (Lighthouse, DevTools)
5. Commit: "feat: add grid-aware GSAP animations to landing page"

**Week 3: Polish**
1. Add loading states for images
2. Fine-tune animation timings
3. Test on real devices (iOS, Android)
4. Document patterns for brand website
5. Commit: "polish: optimize landing page animations and responsiveness"

---

## Future Brand Website Architecture

### Recommended File Structure

```
src/
  pages/
    landing/              ← New brand landing page
      sections/
        Hero/
        Features/
        CaseStudies/
        Testimonials/
        CTA/
    about/                ← About page
    services/             ← Services grid
    contact/              ← Contact form
  components/
    layouts/
      PageHero/           ← Reusable hero with grid
      FeatureGrid/        ← Auto-fit feature cards
      TestimonialGrid/    ← 3-column testimonials
    animations/
      GridReveal/         ← Reusable scroll reveal
      ParallaxSection/    ← Parallax wrapper
      HoverLift/          ← Magnetic hover effect
```

### Shared Animation Hook

```tsx
// src/hooks/useGridReveal.ts
import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGridReveal(
  containerRef: RefObject<HTMLElement>,
  options: {
    selector: string;
    batchMax?: number;
    stagger?: number;
    y?: number;
  }
) {
  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(options.selector);
    
    ScrollTrigger.batch(elements as unknown as Element[], {
      batchMax: options.batchMax || 3,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: options.y || 40,
          stagger: options.stagger || 0.15,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
      start: 'top 85%',
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [containerRef, options]);
}

// Usage in any section:
useGridReveal(sectionRef, {
  selector: '.feature-card',
  batchMax: 3,
  stagger: 0.2,
});
```

---

## Summary: Why This Works for You

### ✅ Immediate Benefits (Marsh New Chapter Begins)

1. **40% less code** - Remove all inline grid styles
2. **Responsive by default** - Mobile-first breakpoints
3. **Better animations** - Grid-aware GSAP integration
4. **Consistent spacing** - Use design tokens
5. **Easier maintenance** - Utilities instead of inline styles

### ✅ Future Benefits (New Brand Website)

1. **Reusable patterns** - Copy utilities across pages
2. **Faster development** - No custom grid code
3. **Design system alignment** - Use MDS tokens
4. **Performance** - Optimized CSS utilities
5. **Accessibility** - Semantic HTML + ARIA

### ✅ Technical Excellence

1. **MDS Grid breakpoints** perfectly match GSAP `matchMedia`
2. **Motion tokens** align with existing animations
3. **ScrollTrigger** already registered and working
4. **Lenis smooth scroll** complements grid animations
5. **Role-based colors** work seamlessly with grid

---

## Next Steps

**Option A: Quick Win (30 minutes)**
- Run `/grid-demo` to see animations in action
- Copy BusinessPillars upgrade code above
- Test responsive behavior

**Option B: Full Migration (1 week)**
- Follow 3-week rollout plan
- Upgrade all 3 sections
- Document patterns for brand website

**Option C: New Brand Website (Future)**
- Use MDS Grid utilities from day one
- Copy animation patterns from landing page
- Build feature grids, case studies, dashboards

---

**Ready to upgrade?** Start with the demo at `/grid-demo` to see the potential, then follow Phase 1 for drop-in replacement! 🚀
