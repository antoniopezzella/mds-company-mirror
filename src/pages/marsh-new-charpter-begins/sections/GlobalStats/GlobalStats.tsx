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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GlobalStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      // Animate stats with intelligent stagger
      const stats = sectionRef.current?.querySelectorAll('.stat-item');
      
      if (stats?.length) {
        // Count-up animation for numbers
        stats.forEach((stat, i) => {
          const numberEl = stat.querySelector('[data-stat-number]');
          if (numberEl) {
            const finalValue = numberEl.textContent || '0';
            const numericValue = parseInt(finalValue.replace(/\D/g, ''), 10) || 0;
            
            gsap.fromTo(numberEl, 
              { textContent: '0' },
              {
                textContent: numericValue,
                duration: 1.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                delay: i * 0.2,
                scrollTrigger: {
                  trigger: stat,
                  start: 'top 85%',
                  once: true,
                },
                onUpdate: function() {
                  const currentVal = Math.floor(this.targets()[0].textContent);
                  // Preserve formatting (130+ vs just 130)
                  if (finalValue.includes('+')) {
                    numberEl.textContent = currentVal + '+';
                  } else if (finalValue.includes('k')) {
                    numberEl.textContent = currentVal + 'k+';
                  } else {
                    numberEl.textContent = currentVal.toString();
                  }
                }
              }
            );
          }
        });

        // Card reveal with stagger
        gsap.from(stats, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    },
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="stats-heading" style={{ background: getRoleColor('surface.subtle') }}>
      <Container maxWidth="xl">
        <Typography id="stats-heading" variant="h3" sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(4) }}>
          Global Scale
        </Typography>
        
        {/* MDS Grid System: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="row gap-6">
          {content.stats.map((s) => (
            <div 
              key={s.label} 
              className="col-12 col-sm-6 col-lg-4 stat-item"
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '8px',
                background: getRoleColor('surface.accent'),
              }}
            >
              <Typography 
                variant="h3" 
                data-stat-number
                sx={{ 
                  color: getRoleColor('text.primary'), 
                  lineHeight: 1, 
                  mb: 1,
                  fontWeight: 700,
                }}
              >
                {s.value}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: getRoleColor('text.secondary'),
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                }} 
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
