# GSAP + Grid System Integration Guide

**Last Updated:** November 9, 2025  
**GSAP Version:** 3.13.0  
**MDS Grid:** CSS Grid-based, 12-column responsive system

---

## 🎯 Overview

Your project already has **GSAP 3.13.0** with **ScrollTrigger** configured. This guide shows how to combine GSAP's powerful animation capabilities with your MDS grid system to create responsive, performant user experiences.

---

## ✅ Current GSAP Setup

### Installed & Configured
```json
{
  "gsap": "^3.13.0",
  "lenis": "^1.3.11"  // Smooth scroll
}
```

### Architecture
```
src/pages/marsh-new-charpter-begins/animations/
├── gsap.client.ts              ← Registration & config
├── timelines/
│   ├── hero.ts                 ← Word-by-word reveals
│   ├── arrowMotif.ts           ← Arrow animations
│   ├── transformationTimeline.ts
│   └── heroIntro.ts
├── hooks/
│   └── useScrollTrigger.ts     ← React hook
└── smooth/
    └── useLenisSmooth.ts       ← Smooth scroll hook
```

### Key Features Already Implemented
- ✅ ScrollTrigger registered globally
- ✅ Debug markers (`?st-markers=1` query param)
- ✅ matchMedia for responsive breakpoints
- ✅ Lenis smooth scroll integration
- ✅ Parallax effects
- ✅ Stagger animations

---

## 🎨 GSAP + Grid: Perfect Combination

### Why This Works Great

| Grid Feature | GSAP Enhancement | Result |
|--------------|------------------|--------|
| **Responsive layouts** | `matchMedia()` breakpoints | Animations adapt to screen size |
| **12-column system** | Animate `grid-column` span | Dynamic layout transitions |
| **CSS Grid placement** | Animate `x`, `y`, `scale` | Position-independent effects |
| **Gap utilities** | Animate with FLIP technique | Smooth spacing changes |
| **Auto-fit grids** | Stagger card reveals | Masonry-style entrances |

---

## 📐 Responsive Animation Patterns

### 1. Grid-Aware Breakpoints

**Your existing approach:**
```typescript
// src/pages/marsh-new-charpter-begins/animations/timelines/hero.ts
const mm = gsap.matchMedia();

mm.add({
  all: '(min-width: 0px)',
  sm: '(min-width: 600px)',   // Match MDS breakpoints
  md: '(min-width: 900px)',
  lg: '(min-width: 1200px)',
  xl: '(min-width: 1536px)',
}, (context) => {
  const { sm, md, lg, xl } = context.conditions as any;
  
  // Different animations per breakpoint
  gsap.from('.grid-item', {
    y: md ? 40 : 20,              // More dramatic on larger screens
    stagger: lg ? 0.08 : 0.12,    // Faster stagger on desktop
    duration: xl ? 0.6 : 0.8,
  });
});
```

### 2. Card Grid Stagger (Auto-Fit)

Animate `.grid-auto-fit-md` cards with intelligent stagger:

```typescript
// Animate cards in auto-fit grid
gsap.from('.grid-auto-fit-md > *', {
  opacity: 0,
  scale: 0.9,
  y: 30,
  stagger: {
    amount: 0.8,              // Total duration spread
    grid: 'auto',             // Detect grid layout
    from: 'start',            // or 'center', 'end', 'random'
  },
  scrollTrigger: {
    trigger: '.grid-auto-fit-md',
    start: 'top 80%',
    once: true,
  }
});
```

### 3. Dashboard Widget Reveals

Animate widgets with row spanning:

```typescript
// Dashboard grid: 3 cols × 3 rows with mixed spans
const widgets = gsap.utils.toArray('.dashboard-widget');

ScrollTrigger.batch(widgets, {
  onEnter: (batch) => {
    gsap.from(batch, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power2.out',
    });
  },
  start: 'top 85%',
  once: true,
});
```

### 4. Column Reordering Animation

Smooth transition when `.order-md-*` classes change layout:

```typescript
// FLIP technique for grid reordering
const flip = Flip.getState('.row > *');

// Change layout (e.g., mobile → desktop)
container.classList.toggle('responsive-layout');

Flip.from(flip, {
  duration: 0.6,
  ease: 'power2.inOut',
  absolute: true,
  onEnter: elements => gsap.fromTo(elements, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.3 }
  ),
});
```

---

## 🚀 Performance Best Practices

### 1. Use `will-change` Sparingly
```typescript
// Set before animation, clear after
ScrollTrigger.create({
  trigger: '.grid-item',
  onEnter: () => {
    gsap.set('.grid-item', { willChange: 'transform, opacity' });
  },
  onLeave: () => {
    gsap.set('.grid-item', { willChange: 'auto' });
  },
});
```

### 2. Batch Scroll Triggers
```typescript
// Instead of individual ScrollTriggers per item:
ScrollTrigger.batch('.card', {
  batchMax: 3,  // Animate 3 at a time
  onEnter: (batch) => gsap.from(batch, { opacity: 0, y: 30, stagger: 0.1 }),
  start: 'top 85%',
});
```

### 3. Invalidate on Resize
```typescript
// Recalculate when grid layout changes
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
```

---

## 💡 Practical Examples for MDS Grid

### Example 1: Animated Product Grid

```tsx
// GridShowcase.tsx or similar
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ProductGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger cards with grid awareness
      gsap.from('.product-card', {
        opacity: 0,
        scale: 0.9,
        y: 40,
        stagger: {
          amount: 1,
          grid: 'auto',
          from: 'start',
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="grid-auto-fit-md gap-6">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Responsive Dashboard with Parallax

```tsx
function AnimatedDashboard() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      mobile: '(max-width: 899px)',
      desktop: '(min-width: 900px)',
    }, (context) => {
      const { mobile } = context.conditions as any;

      // Different parallax intensity per breakpoint
      gsap.to('.widget-background', {
        yPercent: mobile ? -5 : -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.dashboard-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="dashboard-container grid-cols-3 grid-rows-3 gap-4">
      <div className="row-span-2">
        <div className="widget-background" />
        <ChartWidget />
      </div>
      <div><MetricCard /></div>
      <div className="row-span-3"><ActivityFeed /></div>
      <div><MetricCard /></div>
      <div className="col-span-2"><TableWidget /></div>
    </div>
  );
}
```

### Example 3: Column Ordering with Smooth Transition

```tsx
function ResponsiveLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate layout changes smoothly
    const ctx = gsap.context(() => {
      gsap.from('.layout-item', {
        opacity: 0,
        x: isMobile ? 0 : 20,
        duration: 0.4,
        stagger: 0.08,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={containerRef} className="row gap-4">
      <main className={`col-12 col-md-8 ${isMobile ? '' : 'order-md-2'} layout-item`}>
        Main Content
      </main>
      <aside className={`col-12 col-md-4 ${isMobile ? '' : 'order-md-1'} layout-item`}>
        Sidebar
      </aside>
    </div>
  );
}
```

---

## 🎬 Advanced Techniques

### 1. Scroll-Linked Grid Morphing

```typescript
// Transform 2-column grid to 4-column as user scrolls
gsap.to('.morphing-grid', {
  '--grid-cols': 4,  // CSS custom property
  ease: 'none',
  scrollTrigger: {
    trigger: '.morphing-grid',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  },
});

// CSS
.morphing-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols, 2), 1fr);
  transition: grid-template-columns 0.3s ease;
}
```

### 2. Reveal Cards One by One on Scroll

```typescript
ScrollTrigger.create({
  trigger: '.card-grid',
  start: 'top center',
  end: 'bottom center',
  onUpdate: (self) => {
    const progress = self.progress;
    const totalCards = 12;
    const cardsToShow = Math.floor(progress * totalCards);
    
    gsap.to('.card', {
      opacity: (i) => i < cardsToShow ? 1 : 0,
      scale: (i) => i < cardsToShow ? 1 : 0.8,
      duration: 0.3,
    });
  },
});
```

### 3. Magnetic Grid Items (Hover Effect)

```typescript
// Add magnetic pull to cursor
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    gsap.to(item, {
      scale: 1.05,
      z: 10,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(item, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      x: 0,
      y: 0,
      scale: 1,
      z: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  });
});
```

---

## 📊 Recommended Animation Timings (MDS Standards)

Match your existing motion tokens:

```typescript
// src/pages/marsh-new-charpter-begins/animations/motion/tokens.ts
export const durations = {
  xs: 0.2,
  sm: 0.4,
  md: 0.6,
  lg: 0.8,
  xl: 1.2,
};

export const eases = {
  entrance: 'power2.out',
  exit: 'power2.in',
  standard: 'power1.inOut',
  none: 'none',
};

export const staggers = {
  tight: 0.05,
  standard: 0.08,
  relaxed: 0.12,
};
```

---

## 🔧 Integration Checklist

### Phase 1: Basic Grid Animations
- [ ] Animate `.grid-auto-fit-md` card grids on scroll
- [ ] Add stagger to `.row` children
- [ ] Implement fade-in for new grid items

### Phase 2: Responsive Enhancements
- [ ] Use `matchMedia()` to match MDS breakpoints (xs, sm, md, lg, xl)
- [ ] Adjust animation intensity per breakpoint
- [ ] Test with `.order-md-*` column reordering

### Phase 3: Advanced Effects
- [ ] Parallax backgrounds in grid containers
- [ ] FLIP transitions for layout changes
- [ ] Magnetic hover effects on grid items
- [ ] Scroll-linked grid morphing

### Phase 4: Performance Optimization
- [ ] Batch ScrollTriggers where possible
- [ ] Use `will-change` strategically
- [ ] Test with 100+ grid items
- [ ] Add `invalidateOnRefresh` where needed

---

## 🎯 Quick Wins (Immediate Implementation)

### 1. Add to GridShowcase.tsx

```tsx
// src/pages/GridShowcase.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Add to component
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Animate all sections on scroll
  const sections = gsap.utils.toArray<HTMLElement>('.grid-section');
  
  sections.forEach(section => {
    gsap.from(section.querySelectorAll('.animate-in'), {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });
  });

  return () => ScrollTrigger.getAll().forEach(st => st.kill());
}, []);
```

### 2. Add CSS Classes

```scss
// Add to _grid.scss or Grid.module.scss
.animate-in {
  opacity: 0; // Start invisible, GSAP will animate
}

.grid-section {
  margin-bottom: 4rem;
}
```

---

## 📚 Resources

### GSAP Documentation
- **Main docs:** https://gsap.com/docs/v3/
- **ScrollTrigger:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **matchMedia:** https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- **Flip Plugin:** https://gsap.com/docs/v3/Plugins/Flip/

### Your Project Files
- **GSAP Setup:** `src/pages/marsh-new-charpter-begins/animations/gsap.client.ts`
- **Hero Example:** `src/pages/marsh-new-charpter-begins/animations/timelines/hero.ts`
- **Grid Styles:** `src/styles/_grid.scss`
- **Grid Docs:** `src/docs/35-Grid.mdx`

---

## 🎉 Summary

**You have everything needed to create amazing experiences:**

✅ **GSAP 3.13.0** already installed  
✅ **ScrollTrigger** configured with debug markers  
✅ **Lenis smooth scroll** for butter-smooth scrolling  
✅ **MDS Grid System** with 300+ utilities  
✅ **Responsive breakpoints** that match exactly  
✅ **Motion tokens** for consistent timing  

**Next Steps:**
1. Add basic scroll reveals to `GridShowcase.tsx`
2. Experiment with stagger animations on card grids
3. Implement parallax on dashboard widgets
4. Test responsiveness at all breakpoints

**Expected Results:**
- ⚡ 60fps animations
- 📱 Responsive behavior at all sizes
- 🎨 Professional polish
- ♿ Accessible (respects `prefers-reduced-motion`)
- 🚀 Performant even with 100+ grid items

---

**Ready to implement?** Start with the "Quick Wins" section above! 🚀
