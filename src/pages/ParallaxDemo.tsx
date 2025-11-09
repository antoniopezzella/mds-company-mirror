import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/_grid.scss';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Advanced Parallax Demo - Multi-layer Text Parallax Effects
 * 
 * Techniques demonstrated:
 * - Multi-speed text layers (background, mid, foreground)
 * - Horizontal parallax text scrolling
 * - Vertical depth parallax
 * - Split text with word-level parallax
 * - Image + text parallax combinations
 * - Smooth scrub animations
 * 
 * Research sources:
 * - GSAP ScrollTrigger scrub: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 * - Parallax depth formula: speed = distance / (1 + depth)
 * - Apple-style multi-layer parallax: Different speeds for visual depth
 */
export default function ParallaxDemo() {
  const heroRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const imageTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      mobile: '(max-width: 899px)',
      desktop: '(min-width: 900px)',
    }, (context) => {
      const { desktop } = context.conditions as any;

      // 1. HERO: Classic Background Parallax
      if (heroRef.current) {
        const bg = heroRef.current.querySelector('.parallax-bg');

        // Background moves slower (depth illusion)
        gsap.to(bg, {
          yPercent: desktop ? -30 : -15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1, // Smooth scrub (1 second lag)
          },
        });

        // Content moves at normal speed (no transform)
        // This creates parallax effect between bg and content
      }

      // 2. MULTI-LAYER: Background, Midground, Foreground
      if (layersRef.current) {
        const layers = layersRef.current.querySelectorAll('.layer');

        layers.forEach((layer, i) => {
          const speed = i === 0 ? -40 : i === 1 ? -25 : -10; // Depth: far → near
          
          gsap.to(layer, {
            yPercent: desktop ? speed : speed * 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: layersRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }

      // 3. HORIZONTAL: Text scrolling left/right
      if (horizontalRef.current) {
        const leftText = horizontalRef.current.querySelector('.scroll-left');
        const rightText = horizontalRef.current.querySelector('.scroll-right');

        gsap.to(leftText, {
          xPercent: desktop ? -20 : -10,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(rightText, {
          xPercent: desktop ? 20 : 10,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 4. WORD-LEVEL: Each word moves at different speed
      if (wordsRef.current) {
        const words = wordsRef.current.querySelectorAll('.parallax-word');

        words.forEach((word, i) => {
          const speed = -10 - (i * 5); // Each word slower than previous
          
          gsap.to(word, {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: wordsRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }

      // 5. IMAGE + TEXT: Different speeds for depth
      if (imageTextRef.current) {
        const image = imageTextRef.current.querySelector('.parallax-image');
        const text = imageTextRef.current.querySelector('.parallax-text');

        // Image moves slower (background)
        gsap.to(image, {
          yPercent: desktop ? -20 : -10,
          scale: 1.1, // Slight zoom for depth
          ease: 'none',
          scrollTrigger: {
            trigger: imageTextRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Text moves faster (foreground)
        gsap.to(text, {
          yPercent: desktop ? 15 : 8,
          ease: 'none',
          scrollTrigger: {
            trigger: imageTextRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
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
    <div style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Header */}
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
          Advanced Parallax Techniques
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px' }}>
          Scroll down to see different parallax effects with text and images moving at different speeds
        </p>
      </div>

      {/* 1. Classic Hero Parallax */}
      <section 
        ref={heroRef}
        style={{ 
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div 
          className="parallax-bg"
          style={{
            position: 'absolute',
            inset: '-10%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: 0,
          }}
        />
        <div 
          className="parallax-content container"
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          <h2 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '1rem' }}>
            Classic Parallax
          </h2>
          <p style={{ fontSize: '1.5rem', opacity: 0.95 }}>
            Background moves slower than content, creating depth
          </p>
        </div>
      </section>

      {/* 2. Multi-Layer Depth */}
      <section 
        ref={layersRef}
        className="container"
        style={{ 
          minHeight: '100vh',
          paddingTop: '8rem',
          paddingBottom: '8rem',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Multi-Layer Depth
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
            Three layers moving at different speeds
          </p>
        </div>

        <div style={{ position: 'relative', minHeight: '500px' }}>
          {/* Background layer - slowest */}
          <div 
            className="layer"
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              fontSize: '8rem',
              fontWeight: 900,
              opacity: 0.15,
              color: '#667eea',
              userSelect: 'none',
            }}
          >
            DEEP
          </div>

          {/* Midground layer - medium speed */}
          <div 
            className="layer"
            style={{
              position: 'absolute',
              top: '40%',
              right: '15%',
              fontSize: '6rem',
              fontWeight: 700,
              opacity: 0.4,
              color: '#48bb78',
              userSelect: 'none',
            }}
          >
            MIDDLE
          </div>

          {/* Foreground layer - fastest */}
          <div 
            className="layer"
            style={{
              position: 'absolute',
              top: '60%',
              left: '30%',
              fontSize: '4rem',
              fontWeight: 700,
              opacity: 0.9,
              color: 'white',
              userSelect: 'none',
            }}
          >
            FRONT
          </div>
        </div>
      </section>

      {/* 3. Horizontal Parallax */}
      <section 
        ref={horizontalRef}
        style={{ 
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#1a1a1a',
          padding: '4rem 0',
        }}
      >
        <div className="container" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
            Horizontal Parallax
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, textAlign: 'center' }}>
            Text scrolls left and right at different speeds
          </p>
        </div>

        <div className="scroll-left" style={{
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          fontWeight: 900,
          opacity: 0.3,
          whiteSpace: 'nowrap',
          marginBottom: '2rem',
          userSelect: 'none',
        }}>
          SCROLL LEFT • SCROLL LEFT • SCROLL LEFT • SCROLL LEFT
        </div>

        <div className="scroll-right" style={{
          fontSize: 'clamp(2rem, 6vw, 6rem)',
          fontWeight: 700,
          opacity: 0.5,
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          SCROLL RIGHT • SCROLL RIGHT • SCROLL RIGHT • SCROLL RIGHT
        </div>
      </section>

      {/* 4. Word-Level Parallax */}
      <section 
        ref={wordsRef}
        className="container"
        style={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Word-Level Parallax
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
            Each word moves at a different speed
          </p>
        </div>

        <div style={{ 
          fontSize: 'clamp(2rem, 5vw, 5rem)', 
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          {['Creating', 'Amazing', 'User', 'Experiences'].map((word, i) => (
            <span 
              key={i}
              className="parallax-word"
              style={{ 
                display: 'inline-block',
                marginRight: '1rem',
                opacity: 1 - (i * 0.15),
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </section>

      {/* 5. Image + Text Parallax */}
      <section 
        ref={imageTextRef}
        style={{ 
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: '#0f0f0f',
        }}
      >
        {/* Image layer (background) */}
        <div 
          className="parallax-image"
          style={{
            position: 'absolute',
            inset: '-10%',
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        {/* Text layer (foreground) */}
        <div 
          className="parallax-text container"
          style={{ 
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
          }}
        >
          <h2 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '1rem' }}>
            Image + Text
          </h2>
          <p style={{ fontSize: '1.5rem', opacity: 0.95, marginBottom: '2rem' }}>
            Image moves slower (background), text moves faster (foreground)
          </p>
          <div className="row gap-4">
            <div className="col-12 col-md-6">
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Depth Perception</h3>
                <p style={{ opacity: 0.8 }}>Different speeds create 3D depth effect</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Smooth Scrub</h3>
                <p style={{ opacity: 0.8 }}>Animations tied directly to scroll position</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Guide */}
      <section className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '2rem' }}>
          🎬 Parallax Techniques Explained
        </h2>

        <div className="row gap-6">
          <div className="col-12 col-md-6">
            <div style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '12px',
              height: '100%',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>
                1. Classic Parallax
              </h3>
              <code style={{ 
                display: 'block',
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                overflowX: 'auto',
              }}>
{`gsap.to(bg, {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    scrub: 1
  }
});`}
              </code>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Background moves slower than normal scroll speed, creating depth illusion
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '12px',
              height: '100%',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#48bb78' }}>
                2. Multi-Layer Depth
              </h3>
              <code style={{ 
                display: 'block',
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                overflowX: 'auto',
              }}>
{`layers.forEach((layer, i) => {
  const speed = i * -15;
  gsap.to(layer, {
    yPercent: speed,
    scrub: 1
  });
});`}
              </code>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Each layer moves at different speed: far (slow), middle (medium), near (fast)
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '12px',
              height: '100%',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f59e0b' }}>
                3. Horizontal Scroll
              </h3>
              <code style={{ 
                display: 'block',
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                overflowX: 'auto',
              }}>
{`gsap.to(leftText, {
  xPercent: -20,
  scrub: 1
});
gsap.to(rightText, {
  xPercent: 20,
  scrub: 1
});`}
              </code>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Text scrolls horizontally in opposite directions as user scrolls vertically
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '12px',
              height: '100%',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ec4899' }}>
                4. Word-Level Control
              </h3>
              <code style={{ 
                display: 'block',
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                overflowX: 'auto',
              }}>
{`words.forEach((word, i) => {
  const speed = -10 - (i * 5);
  gsap.to(word, {
    yPercent: speed,
    scrub: 1
  });
});`}
              </code>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Each word animates independently at incrementally different speeds
              </p>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div style={{
          marginTop: '4rem',
          background: '#1a1a1a',
          padding: '2rem',
          borderRadius: '12px',
          border: '2px solid #667eea',
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea' }}>
            ⚡ Performance Best Practices
          </h3>
          <ul style={{ fontSize: '0.875rem', lineHeight: 1.8, opacity: 0.9 }}>
            <li><strong>Use <code>scrub</code>:</strong> Ties animation directly to scroll position (60fps)</li>
            <li><strong>Transform only:</strong> Animate <code>x</code>, <code>y</code>, <code>scale</code> (GPU-accelerated)</li>
            <li><strong>Add <code>will-change: transform</code>:</strong> Hint browser for optimization</li>
            <li><strong>Use <code>ease: 'none'</code>:</strong> Linear motion for smooth parallax</li>
            <li><strong>Scrub value:</strong> <code>scrub: 1</code> adds 1 second smoothing lag</li>
            <li><strong>Overflow hidden:</strong> Prevent scrollbars on translated elements</li>
            <li><strong>Test on mobile:</strong> Reduce parallax intensity for smaller screens</li>
          </ul>
        </div>

        {/* Integration Guide */}
        <div style={{
          marginTop: '3rem',
          background: '#1a1a1a',
          padding: '2rem',
          borderRadius: '12px',
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            🔧 Integration with MDS Grid
          </h3>
          <div className="row gap-4">
            <div className="col-12 col-md-4">
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#667eea' }}>
                Grid Layouts
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Use <code>.row</code> and <code>.col-*</code> with parallax sections for responsive layouts
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#48bb78' }}>
                Card Grids
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Apply parallax to <code>.grid-auto-fit-md</code> backgrounds for depth effect
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#f59e0b' }}>
                Hero Sections
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Combine parallax with <code>.container</code> for centered content with moving backgrounds
              </p>
            </div>
          </div>
        </div>

        {/* Debug Mode */}
        <div style={{
          marginTop: '3rem',
          background: 'rgba(102, 126, 234, 0.1)',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
        }}>
          <strong style={{ fontSize: '1rem' }}>🔍 Debug Mode:</strong> Add <code style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            padding: '2px 6px', 
            borderRadius: '4px',
            margin: '0 4px',
          }}>?st-markers=1</code> to URL to see ScrollTrigger start/end markers
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        padding: '3rem 0',
        textAlign: 'center',
        opacity: 0.6,
      }}>
        <p>Parallax Demo • MDS Grid + GSAP ScrollTrigger</p>
      </footer>
    </div>
  );
}
