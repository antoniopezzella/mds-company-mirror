import React, { useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GlobalStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !statsContainerRef.current) return;

    const section = sectionRef.current;
    const stats = content.stats;
    const statElements = statsContainerRef.current.querySelectorAll('.stat-item');

    // Animate heading and description on enter
    const heading = section.querySelector('#stats-heading');
    const description = section.querySelector('[data-stats-description]');

    if (heading && description) {
      gsap.fromTo([heading, description],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Set initial state - all hidden except first stat
    gsap.set(statElements, { opacity: 0, y: 30 });
    
    // Show first stat immediately when section is reached
    if (statElements[0]) {
      gsap.set(statElements[0], { opacity: 1, y: 0 });
      
      // Trigger first stat number animation
      const firstNumberEl = statElements[0].querySelector('[data-stat-number]');
      const firstStat = stats[0];
      if (firstNumberEl && firstStat) {
        const finalValue = String(firstStat.value);
        const numericValue = parseInt(finalValue.replace(/\D/g, ''), 10) || 0;
        
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          once: true,
          onEnter: () => {
            gsap.fromTo(firstNumberEl,
              { textContent: 0 },
              {
                textContent: numericValue,
                duration: 2.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                  const currentVal = Math.floor(Number(this.targets()[0].textContent));
                  if (finalValue.includes('+') && finalValue.includes('k')) {
                    firstNumberEl.textContent = currentVal + 'k+';
                  } else if (finalValue.includes('+')) {
                    firstNumberEl.textContent = currentVal + '+';
                  } else if (finalValue.includes('k')) {
                    firstNumberEl.textContent = currentVal + 'k';
                  } else {
                    firstNumberEl.textContent = currentVal.toString();
                  }
                }
              }
            );
          }
        });
      }
    }

    // Pin the section - unpins after last stat is shown
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${stats.length * 100}vh`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      snap: {
        snapTo: 1 / stats.length, // Snap to each stat position (1/3, 2/3, 3/3)
        duration: 0.8,
        delay: 200,
        ease: 'power2.inOut'
      }
    });

    // Create animations for each stat
    stats.forEach((stat, index) => {
      const element = statElements[index];
      if (!element) return;

      const numberEl = element.querySelector('[data-stat-number]');
      const finalValue = String(stat.value);
      const numericValue = parseInt(finalValue.replace(/\D/g, ''), 10) || 0;
      
      // Calculate when this stat should appear
      const startProgress = index / stats.length;
      const endProgress = (index + 1) / stats.length;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${stats.length * 100}vh`,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Each stat gets its own time window
          if (progress >= startProgress && progress < endProgress) {
            // Calculate local progress within this stat's window
            const localProgress = (progress - startProgress) / (endProgress - startProgress);
            
            // Fade in phase (0 to 0.1) - faster fade in
            if (localProgress < 0.1) {
              const fadeIn = localProgress / 0.1;
              gsap.set(element, { 
                opacity: fadeIn,
                y: 20 * (1 - fadeIn)
              });
            }
            // Fully visible phase (0.1 to 0.9) - visible longer
            else if (localProgress >= 0.1 && localProgress <= 0.9) {
              gsap.set(element, { opacity: 1, y: 0 });
              
              // Trigger number animation once when fully visible
              if (localProgress >= 0.15 && localProgress <= 0.2 && numberEl) {
                gsap.fromTo(numberEl,
                  { textContent: 0 },
                  {
                    textContent: numericValue,
                    duration: 2.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                      const currentVal = Math.floor(Number(this.targets()[0].textContent));
                      if (finalValue.includes('+') && finalValue.includes('k')) {
                        numberEl.textContent = currentVal + 'k+';
                      } else if (finalValue.includes('+')) {
                        numberEl.textContent = currentVal + '+';
                      } else if (finalValue.includes('k')) {
                        numberEl.textContent = currentVal + 'k';
                      } else {
                        numberEl.textContent = currentVal.toString();
                      }
                    }
                  }
                );
              }
            }
            // Fade out phase (0.9 to 1) - faster fade out
            else {
              const fadeOut = 1 - ((localProgress - 0.9) / 0.1);
              gsap.set(element, { 
                opacity: fadeOut,
                y: -20 * (1 - fadeOut)
              });
            }
          }
          // Before this stat's window
          else if (progress < startProgress) {
            gsap.set(element, { opacity: 0, y: 20 });
          }
          // After this stat's window
          else {
            gsap.set(element, { opacity: 0, y: -20 });
          }
        }
      });
    });

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) {
          st.kill();
        }
      });
    };
  }, [prefersReduced]);

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="stats-heading" 
      style={{ 
        background: getRoleColor('surface.default'),
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="xl">
        <div className="mds-legacy-row">
          {/* Left column - Heading and description */}
          <div className="mds-legacy-col-12 mds-legacy-col-md-6">
            <Typography 
              id="stats-heading" 
              variant="h2" 
              component="h2"
              sx={{ 
                color: getRoleColor('text.primary'), 
                mb: (t) => t.spacing(3),
                textAlign: 'left'
              }}
            >
              Global Scale
            </Typography>
            <Typography 
              variant="body1" 
              data-stats-description
              sx={{ 
                color: getRoleColor('text.secondary'),
                textAlign: 'left',
                fontSize: '1.125rem',
                lineHeight: 1.6
              }}
            >
              Our global presence spans across continents, serving clients with unmatched expertise and reach. 
              These numbers represent our commitment to excellence and the trust our clients place in us.
            </Typography>
          </div>

          {/* Right column - Animated stats */}
          <div className="mds-legacy-col-12 mds-legacy-col-md-6">
            <Box
              ref={statsContainerRef}
              sx={{
                position: 'relative',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {content.stats.map((s) => (
                <Box
                  key={s.label}
                  className="stat-item"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    textAlign: 'center'
                  }}
                >
                  <Typography 
                    variant="h1" 
                    data-stat-number
                    sx={{ 
                      color: getRoleColor('text.primary'), 
                      lineHeight: 1, 
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: '4rem', md: '6rem' }
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    data-stat-label
                    sx={{ 
                      color: getRoleColor('text.secondary'),
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600
                    }} 
                    aria-label={s.ariaLabel}
                  >
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GlobalStats;
