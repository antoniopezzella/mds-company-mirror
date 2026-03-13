import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useLenisSmooth } from './marsh-new-charpter-begins/animations/smooth/useLenisSmooth';
import { TypographyAnimations } from './marsh-new-charpter-begins/animations/systems/TypographyAnimations';
import { PhysicsInteractions } from './marsh-new-charpter-begins/animations/systems/PhysicsInteractions';
import { ProgressiveDisclosure } from './marsh-new-charpter-begins/animations/systems/ProgressiveDisclosure';
import { EnhancedAnimationController } from './marsh-new-charpter-begins/animations/systems/EnhancedAnimationController';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * Enhanced Grid Demo - Comprehensive GSAP + MDS Grid Integration
 * 
 * Features:
 * - Card grid stagger animations
 * - Responsive animations with matchMedia
 * - Dashboard widget reveals
 * - Parallax effects with performance controls
 * - Typography effects (typewriter, character reveals, morphing)
 * - Physics interactions (magnetic fields, elastic feedback)
 * - Progressive disclosure (cascade reveals, batch loading)
 * - Performance modes and loading states
 * - Bootstrap 5.3 compatibility examples
 * - Developer controls and debugging tools
 */
export default function AnimatedGridDemo() {
  // Performance States
  const [animationMode, setAnimationMode] = useState<'high' | 'medium' | 'low'>('high');
  const [enabledFeatures, setEnabledFeatures] = useState({
    parallax: true,
    typography: true,
    physics: true,
    progressive: true,
    bootstrap: true
  });
  
  // Enable smooth scrolling
  useLenisSmooth();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const orderingRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);
  const bootstrapRef = useRef<HTMLDivElement>(null);
  
  const animationController = useRef<EnhancedAnimationController | null>(null);

  // Initialize enhanced animation system
  useEffect(() => {
    const controller = new EnhancedAnimationController({
      enableParallax: enabledFeatures.parallax,
      enableTypography: enabledFeatures.typography,
      enablePhysics: enabledFeatures.physics,
      enableProgressive: enabledFeatures.progressive,
      performance: animationMode
    });

    animationController.current = controller;

    const initAnimations = async () => {
      try {
        await controller.init();
        ScrollTrigger.refresh();
      } catch (error) {
        console.warn('Animation controller init failed:', error);
      }
    };

    initAnimations();

    return () => {
      controller.destroy();
    };
  }, [animationMode, enabledFeatures]);

  // Trigger enhanced animations when ready
  useEffect(() => {
    if (animationController.current) {
      const timer = setTimeout(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
        animationController.current?.animateIn();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  // Main GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Match MDS breakpoints
    mm.add({
      mobile: '(max-width: 899px)',
      tablet: '(min-width: 900px) and (max-width: 1199px)',
      desktop: '(min-width: 1200px)',
    }, (context) => {
      const { mobile } = context.conditions as Record<string, boolean>;

      // 1. Hero Section with Parallax (background only for now)
      // 1. Hero Section with Parallax (background + subtle banner shift)
      if (heroRef.current) {
        const hero = heroRef.current;
        const bg = hero.querySelector('.hero-bg') as HTMLElement;
        // NOTE: we intentionally skip title/subtitle animation for now

        // Smooth parallax background effect
        // Background parallax: moves slower than scroll for depth
        if (bg) {
          gsap.fromTo(
            bg,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        // Subtle parallax on entire hero banner
        gsap.fromTo(
          hero,
          { y: 0 },
          {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 2. Card Grid with Enhanced Text Animations
      if (cardGridRef.current) {
        const cards = cardGridRef.current.querySelectorAll('.card-item');

        gsap.fromTo(cards, {
          opacity: 0,
          scale: 0.8,
          y: 60,
          rotation: -5
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: 'start',
            ease: 'power2.inOut'
          },
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => {
              // Simple fade in for card text without splitting
              cards.forEach((card, index) => {
                const cardTitle = card.querySelector('h3') as HTMLElement;
                const cardText = card.querySelector('p') as HTMLElement;
                
                if (cardTitle) {
                  gsap.fromTo(cardTitle,
                    { opacity: 0, y: 15, scale: 0.95 },
                    { 
                      opacity: 1, 
                      y: 0,
                      scale: 1, 
                      duration: 0.8,
                      delay: index * 0.15 + 0.4,
                      ease: 'back.out(1.5)'
                    }
                  );
                }
                
                if (cardText) {
                  gsap.fromTo(cardText,
                    { opacity: 0, y: 10 },
                    { 
                      opacity: 1, 
                      y: 0, 
                      duration: 0.6,
                      delay: index * 0.15 + 0.7,
                      ease: 'power2.out'
                    }
                  );
                }
              });
            }
          },
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

      // 5. Typography Effects
      if (enabledFeatures.typography && typographyRef.current) {
        // Typewriter effect
        const typewriterText = typographyRef.current.querySelector('.typewriter-text');
        if (typewriterText) {
          TypographyAnimations.typewriter({
            element: typewriterText as HTMLElement,
            text: ['Typewriter Effect', 'Character by Character', 'Smooth Animation'],
            speed: 0.05,
            cursor: true,
            loop: true
          });
        }

        // Character reveal
        const characterReveal = typographyRef.current.querySelector('.character-reveal');
        if (characterReveal) {
          TypographyAnimations.reveal({
            element: characterReveal as HTMLElement,
            direction: 'up',
            splitBy: 'chars',
            stagger: 0.02,
            duration: 0.6
          });
        }

        // Split reveal
        const splitReveal = typographyRef.current.querySelector('.split-reveal');
        if (splitReveal) {
          TypographyAnimations.reveal({
            element: splitReveal as HTMLElement,
            direction: 'up',
            splitBy: 'words',
            stagger: 0.1
          });
        }
      }

      // 6. Physics Interactions
      if (enabledFeatures.physics && physicsRef.current) {
        const physicsCards = physicsRef.current.querySelectorAll('.physics-card');
        
        physicsCards.forEach((card) => {
          if (card.classList.contains('magnetic-field')) {
            PhysicsInteractions.magnetic({
              element: card as HTMLElement,
              strength: 0.3,
              distance: 100
            });
          } else if (card.classList.contains('elastic-feedback')) {
            PhysicsInteractions.elastic({
              element: card as HTMLElement,
              trigger: 'click',
              strength: 0.4
            });
          } else if (card.classList.contains('gravity-sim')) {
            // Add click listener for gravity effect
            card.addEventListener('click', () => {
              PhysicsInteractions.gravity({
                elements: [card as HTMLElement],
                container: physicsRef.current!,
                strength: 0.5
              });
            });
          }
        });
      }

      // 7. Progressive Disclosure
      if (enabledFeatures.progressive) {
        // Apply to card grids
        if (cardGridRef.current) {
          ProgressiveDisclosure.cascadeReveal(
            Array.from(cardGridRef.current.querySelectorAll('.card-item')) as HTMLElement[],
            {
              stagger: 0.1,
              pattern: 'diagonal'
            }
          );
        }

        // Apply to bootstrap section
        if (bootstrapRef.current && enabledFeatures.bootstrap) {
          ProgressiveDisclosure.cascadeReveal(
            Array.from(bootstrapRef.current.querySelectorAll('.col-12')) as HTMLElement[],
            {
              stagger: 0.15,
              pattern: 'wave'
            }
          );
        }
      }
    });

    // Cleanup
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [enabledFeatures.bootstrap, enabledFeatures.physics, enabledFeatures.progressive, enabledFeatures.typography]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Performance Controls Panel */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        background: 'rgba(0,0,0,0.9)', 
        color: '#fff',
        padding: '1rem', 
        borderRadius: '8px', 
        zIndex: 1000,
        fontSize: '0.875rem',
        minWidth: '200px'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>🎛️ Controls</h4>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Performance:</label>
          <select 
            value={animationMode} 
            onChange={(e) => setAnimationMode(e.target.value as 'high' | 'medium' | 'low')}
            style={{ width: '100%', padding: '0.25rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            <option value="high">🚀 High Quality</option>
            <option value="medium">⚡ Medium</option>
            <option value="low">💾 Performance</option>
          </select>
        </div>

        <div style={{ fontSize: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
            <input 
              type="checkbox" 
              checked={enabledFeatures.parallax}
              onChange={(e) => setEnabledFeatures(prev => ({ ...prev, parallax: e.target.checked }))}
              style={{ marginRight: '0.5rem' }}
            />
            Parallax Effects
          </label>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
            <input 
              type="checkbox" 
              checked={enabledFeatures.typography}
              onChange={(e) => setEnabledFeatures(prev => ({ ...prev, typography: e.target.checked }))}
              style={{ marginRight: '0.5rem' }}
            />
            Typography Animations
          </label>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
            <input 
              type="checkbox" 
              checked={enabledFeatures.physics}
              onChange={(e) => setEnabledFeatures(prev => ({ ...prev, physics: e.target.checked }))}
              style={{ marginRight: '0.5rem' }}
            />
            Physics Interactions
          </label>
        </div>
      </div>

      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700 }}>
        Enhanced Grid Animation Demo
      </h1>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} data-hero className="hero-section" style={{ 
        position: 'relative', 
        minHeight: '80vh', 
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
            top: '-20%',
            left: '-10%',
            right: '-10%',
            bottom: '-20%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '2rem', maxWidth: '800px' }}>
          <h1 className="hero-title" style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1.5rem', 
            fontWeight: 700, 
            lineHeight: 1.2
          }}>
            Amazing Parallax Effect
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: '1.4rem', 
            lineHeight: 1.5
          }}>
            Watch the background move as you scroll through this page
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

      {/* Typography Effects Section */}
      {enabledFeatures.typography && (
        <section ref={typographyRef} style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>
            🎨 Typography Effects
          </h2>
          <div className="grid-cols-1 grid-cols-md-2 gap-6">
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '3rem',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 className="typewriter-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Typewriter Effect
              </h3>
              <p className="character-reveal" style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                Characters appear one by one with smooth timing
              </p>
            </div>
            
            <div style={{ 
              background: '#f8f9fa',
              padding: '3rem',
              borderRadius: '12px',
              textAlign: 'center',
              border: '2px solid #e9ecef'
            }}>
              <h3 className="morphing-text" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
                Morphing Text
              </h3>
              <p className="split-reveal" style={{ fontSize: '1.125rem', color: '#666' }}>
                Text transforms with smooth character transitions
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Physics Interactions Section */}
      {enabledFeatures.physics && (
        <section ref={physicsRef} style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>
            ⚡ Physics Interactions
          </h2>
          <div className="grid-cols-1 grid-cols-md-3 gap-6">
            <div className="physics-card magnetic-field" style={{ 
              background: '#48bb78',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🧲 Magnetic Field</h4>
              <p>Hover to feel the attraction</p>
            </div>
            
            <div className="physics-card elastic-feedback" style={{ 
              background: '#ed8936',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🎾 Elastic Feedback</h4>
              <p>Click for bounce effect</p>
            </div>
            
            <div className="physics-card gravity-sim" style={{ 
              background: '#9f7aea',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🌍 Gravity Simulation</h4>
              <p>Elements fall with physics</p>
            </div>
          </div>
        </section>
      )}

      {/* Bootstrap 5.3 Compatibility Section */}
      {enabledFeatures.bootstrap && (
        <section ref={bootstrapRef} style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>
            🎯 Bootstrap 5.3 Compatibility
          </h2>
          <div style={{ 
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#155724', marginBottom: '1rem' }}>✅ Exact Bootstrap 5.3 Match</h3>
            <div className="grid-cols-1 grid-cols-md-2 gap-4" style={{ fontSize: '0.875rem', color: '#155724' }}>
              <div>
                <strong>Breakpoints:</strong><br />
                xs(0), sm(576px), md(768px), lg(992px), xl(1200px), xxl(1400px)
              </div>
              <div>
                <strong>Containers:</strong><br />
                sm(540px), md(720px), lg(960px), xl(1140px), xxl(1320px)
              </div>
            </div>
          </div>
          
          <div className="row gap-4">
            <div className="col-12 col-sm-6 col-md-4" style={{ 
              background: '#007bff', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              .col-12 .col-sm-6 .col-md-4
            </div>
            <div className="col-12 col-sm-6 col-md-4" style={{ 
              background: '#28a745', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              Bootstrap Classes Work
            </div>
            <div className="col-12 col-sm-12 col-md-4" style={{ 
              background: '#dc3545', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              1.5rem Gutters
            </div>
          </div>
        </section>
      )}

      {/* Instructions */}
      <section style={{ 
        background: '#f7fafc', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '2px dashed #cbd5e0',
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
          🏆 Enhanced Animation Features
        </h3>
        <div className="grid-cols-1 grid-cols-md-2 gap-6">
          <ul style={{ fontSize: '0.875rem', color: '#4a5568', lineHeight: 1.6 }}>
            <li>✅ <strong>Parallax Hero:</strong> Background moves at different speed</li>
            <li>✅ <strong>Card Stagger:</strong> Cards reveal with intelligent grid stagger</li>
            <li>✅ <strong>Dashboard Widgets:</strong> Mixed row spans animate individually</li>
            <li>✅ <strong>Responsive Ordering:</strong> Smooth transition when layout changes</li>
            <li>✅ <strong>Typography Effects:</strong> Typewriter, character reveals, morphing</li>
            <li>✅ <strong>Physics Interactions:</strong> Magnetic fields, elastic feedback</li>
          </ul>
          
          <ul style={{ fontSize: '0.875rem', color: '#4a5568', lineHeight: 1.6 }}>
            <li>✅ <strong>Progressive Disclosure:</strong> Cascade reveals, batch loading</li>
            <li>✅ <strong>Bootstrap 5.3:</strong> Exact compatibility with all classes</li>
            <li>✅ <strong>Performance Modes:</strong> High/Medium/Low quality options</li>
            <li>✅ <strong>matchMedia:</strong> Different animations per breakpoint</li>
            <li>✅ <strong>ScrollTrigger:</strong> Animations trigger as you scroll</li>
            <li>✅ <strong>Hardware Acceleration:</strong> 60fps smooth animations</li>
          </ul>
        </div>
        
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
