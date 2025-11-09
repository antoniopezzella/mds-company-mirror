import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/_grid.scss';
import { useLenisSmooth } from './marsh-new-charpter-begins/animations/smooth/useLenisSmooth';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Animated Grid Demo - Showcasing GSAP + MDS Grid Integration
 * 
 * Features:
 * - Card grid stagger animations
 * - Responsive animations with matchMedia
 * - Dashboard widget reveals
 * - Parallax effects
 * - Smooth scroll reveals
 */
export default function AnimatedGridDemo() {
  // Enable smooth scrolling
  useLenisSmooth();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const orderingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Match MDS breakpoints
    mm.add({
      mobile: '(max-width: 899px)',
      tablet: '(min-width: 900px) and (max-width: 1199px)',
      desktop: '(min-width: 1200px)',
    }, (context) => {
      const { mobile, desktop } = context.conditions as any;

      // 1. Hero Section with Parallax
      if (heroRef.current) {
        const hero = heroRef.current;
        const bg = hero.querySelector('.hero-bg');
        const title = hero.querySelector('h1');
        const subtitle = hero.querySelector('p');

        // Entrance animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top 75%',
            once: true,
          },
        });

        tl.from(title, {
          opacity: 0,
          y: desktop ? 50 : 30,
          duration: 0.8,
          ease: 'power2.out',
        })
        .from(subtitle, {
          opacity: 0,
          y: 20,
          duration: 0.6,
        }, '-=0.4');

        // Parallax background
        if (bg) {
          gsap.to(bg, {
            yPercent: desktop ? -20 : -10,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }

      // 2. Card Grid with Stagger
      if (cardGridRef.current) {
        const cards = cardGridRef.current.querySelectorAll('.card-item');

        ScrollTrigger.batch(cards as unknown as Element[], {
          batchMax: desktop ? 4 : mobile ? 1 : 2,
          onEnter: (batch) => {
            gsap.from(batch, {
              opacity: 0,
              scale: 0.9,
              y: desktop ? 40 : 20,
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
      }

      // 3. Dashboard Widget Reveals
      if (dashboardRef.current) {
        const widgets = dashboardRef.current.querySelectorAll('.widget');

        gsap.from(widgets, {
          opacity: 0,
          scale: 0.95,
          y: 30,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // 4. Column Ordering Animation
      if (orderingRef.current) {
        const items = orderingRef.current.querySelectorAll('.order-item');

        gsap.from(items, {
          opacity: 0,
          x: mobile ? 0 : 20,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: orderingRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    });

    // Cleanup
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700 }}>
        GSAP + Grid Animation Demo
      </h1>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="hero-section" style={{ 
        position: 'relative', 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '6rem',
        overflow: 'hidden',
        borderRadius: '12px',
      }}>
        <div 
          className="hero-bg" 
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '2rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>
            Parallax Hero
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
            Background moves at different speed as you scroll
          </p>
        </div>
      </section>

      {/* Card Grid with Auto-Fit */}
      <section style={{ marginBottom: '6rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>
          Animated Card Grid (Auto-Fit)
        </h2>
        <div ref={cardGridRef} className="grid-auto-fit-md gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="card-item"
              style={{
                background: '#f0faff',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                color: '#1a1a1a',
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: `linear-gradient(135deg, #667eea ${i * 10}%, #764ba2 100%)`,
                borderRadius: '8px',
                marginBottom: '1rem',
              }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Card {i + 1}</h3>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Auto-fits at 300px minimum width
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard with Mixed Row Spans */}
      <section style={{ marginBottom: '6rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>
          Dashboard Widgets (Mixed Row Spans)
        </h2>
        <div ref={dashboardRef} className="grid-cols-3 grid-rows-3 gap-4" style={{ minHeight: '400px' }}>
          <div className="row-span-2 widget" style={{
            background: '#667eea',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
          }}>
            Tall Widget<br/>(2 rows)
          </div>
          <div className="widget" style={{
            background: '#f0faff',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            fontWeight: 600,
          }}>
            Metric A
          </div>
          <div className="row-span-3 widget" style={{
            background: '#48bb78',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
          }}>
            Full Height<br/>(3 rows)
          </div>
          <div className="widget" style={{
            background: '#f0faff',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            fontWeight: 600,
          }}>
            Metric B
          </div>
          <div className="col-span-2 widget" style={{
            background: '#edf2f7',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            fontWeight: 600,
          }}>
            Wide Widget (2 columns)
          </div>
        </div>
      </section>

      {/* Responsive Column Ordering */}
      <section style={{ marginBottom: '6rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>
          Responsive Column Ordering
        </h2>
        <div ref={orderingRef} className="row gap-4">
          <main className="col-12 col-md-8 order-md-2 order-item" style={{
            background: '#e5edf4',
            padding: '2rem',
            borderRadius: '8px',
            color: '#1a1a1a',
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Main Content</h3>
            <p style={{ color: '#666' }}>First on mobile, second on desktop</p>
          </main>
          <aside className="col-12 col-md-4 order-md-1 order-item" style={{
            background: '#667eea',
            color: 'white',
            padding: '2rem',
            borderRadius: '8px',
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Sidebar</h3>
            <p>Second on mobile, first on desktop</p>
          </aside>
        </div>
      </section>

      {/* Instructions */}
      <section style={{ 
        background: '#f7fafc', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '2px dashed #cbd5e0',
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
          🎬 Animation Features
        </h3>
        <ul style={{ fontSize: '0.875rem', color: '#4a5568', lineHeight: 1.6 }}>
          <li>✅ <strong>Parallax Hero:</strong> Background moves at different speed</li>
          <li>✅ <strong>Card Stagger:</strong> Cards reveal with intelligent grid stagger</li>
          <li>✅ <strong>Dashboard Widgets:</strong> Mixed row spans animate individually</li>
          <li>✅ <strong>Responsive Ordering:</strong> Smooth transition when layout changes</li>
          <li>✅ <strong>matchMedia:</strong> Different animations per breakpoint</li>
          <li>✅ <strong>ScrollTrigger:</strong> Animations trigger as you scroll</li>
          <li>✅ <strong>Performance:</strong> Hardware-accelerated, 60fps animations</li>
        </ul>
        
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: '#fff', 
          borderRadius: '8px',
          fontSize: '0.875rem',
        }}>
          <strong>🔍 Debug Mode:</strong> Add <code style={{ 
            background: '#e5e7eb', 
            padding: '2px 6px', 
            borderRadius: '4px' 
          }}>?st-markers=1</code> to URL to see ScrollTrigger markers
        </div>
      </section>
    </div>
  );
}
