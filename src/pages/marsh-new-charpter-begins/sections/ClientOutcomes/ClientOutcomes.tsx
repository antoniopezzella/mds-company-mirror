import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ClientOutcomes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Setup responsive animations for outcome cards
  React.useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Mobile and desktop responsive animations
      const mm = gsap.matchMedia();

      // Mobile animation (simpler, vertical stagger)
      mm.add("(max-width: 768px)", () => {
        ScrollTrigger.batch(".outcome-card", {
          onEnter: (elements) => {
            // Set willChange for performance
            gsap.set(elements, { willChange: 'transform, opacity' });
            gsap.fromTo(elements, 
              {
                opacity: 0,
                y: 40,
                scale: 0.95,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                onComplete: () => {
                  // Clear willChange after animation
                  gsap.set(elements, { willChange: 'auto' });
                }
              }
            );
          },
          start: "top 85%",
        });
      });

      // Desktop animation (more sophisticated, with hover effects)
      mm.add("(min-width: 769px)", () => {
        // Initial reveal animation
        ScrollTrigger.batch(".outcome-card", {
          onEnter: (elements) => {
            gsap.fromTo(elements, 
              {
                opacity: 0,
                y: 60,
                rotationY: 15,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)"
              }
            );
          },
          start: "top 80%",
        });
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="outcomes-heading" style={{ background: getRoleColor('bg.default') }}>
      <Container maxWidth="xl">
        <Typography id="outcomes-heading" variant="h3" sx={{ color: getRoleColor('fg.primary'), mb: (t) => t.spacing(2), textAlign: 'center' }}>
          Client Outcomes
        </Typography>
        
        <div ref={cardsRef} className="mds-legacy-row" style={{ marginTop: '2rem' }}>
          {content.outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className="mds-legacy-col-12 mds-legacy-col-md-6 mb-4 outcome-card"
              style={{
                backgroundColor: getRoleColor('bg.neutral.subtle'),
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
                border: `1px solid ${getRoleColor('border.default')}`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: getRoleColor('fg.primary'),
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {outcome.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: getRoleColor('fg.neutral.subtle'),
                  lineHeight: 1.6,
                }}
              >
                {outcome.summary}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ClientOutcomes;
