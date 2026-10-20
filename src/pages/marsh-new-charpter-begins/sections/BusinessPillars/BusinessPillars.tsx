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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BusinessPillars: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const cards = sectionRef.current?.querySelectorAll('.pillar-card');
      
      if (cards?.length) {
        // Responsive animations using matchMedia
        const mm = gsap.matchMedia();
        
        mm.add({
          mobile: '(max-width: 899px)',
          desktop: '(min-width: 900px)',
        }, (context) => {
          const { mobile } = context.conditions as { mobile?: boolean; desktop?: boolean };
          
          // Card reveal with grid-aware stagger
          ScrollTrigger.batch(cards as unknown as Element[], {
            batchMax: mobile ? 1 : 2, // 1 card mobile, 2 cards desktop
            onEnter: (batch) => {
              gsap.from(batch, {
                opacity: 0,
                y: mobile ? 20 : 40,
                scale: 0.98,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power2.out',
              });
            },
            start: 'top 85%',
            once: true,
          });

          // Hover interactions for desktop
          if (!mobile) {
            cards.forEach((card) => {
              card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                  scale: 1.02,
                  y: -8,
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
          }
        });
        
        return () => mm.revert();
      }
    },
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="pillars-heading" style={{ background: getRoleColor('bg.default') }}>
      <Container maxWidth="xl">
        <Typography id="pillars-heading" variant="h3" sx={{ color: getRoleColor('fg.primary'), mb: (t) => t.spacing(4) }}>
          Unified Capabilities
        </Typography>
        
        {/* MDS Grid System: 1 col mobile, 2 col desktop */}
        <div className="mds-legacy-row gap-6">
          {content.pillars.map((p) => (
            <div 
              key={p.title} 
              className="mds-legacy-col-12 mds-legacy-col-md-6 pillar-card"
              style={{
                padding: '2rem',
                borderRadius: '12px',
                background: getRoleColor('bg.neutral.subtle'),
                border: `1px solid rgba(0, 0, 0, 0.08)`,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: getRoleColor('fg.primary'), 
                  mb: (t) => t.spacing(2),
                  fontWeight: 600,
                }}
              >
                {p.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: getRoleColor('fg.neutral.subtle'),
                  lineHeight: 1.6,
                }}
              >
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
