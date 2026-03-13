import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const OurJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const cards = sectionRef.current?.querySelectorAll('.journey-card');
      const heading = sectionRef.current?.querySelector('h2');
      
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        });
      }

      if (cards?.length) {
        const mm = gsap.matchMedia();
        
        mm.add({
          mobile: '(max-width: 899px)',
          desktop: '(min-width: 900px)',
        }, (context) => {
          const { mobile } = context.conditions as { mobile?: boolean; desktop?: boolean };
          
          // Staggered card reveal
          gsap.from(cards, {
            opacity: 0,
            y: mobile ? 30 : 50,
            scale: 0.95,
            stagger: 0.2,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          });

          // Hover lift effect for desktop
          if (!mobile) {
            cards.forEach((card) => {
              card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                  y: -12,
                  scale: 1.02,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              });

              card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                  y: 0,
                  scale: 1,
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
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="journey-heading"
      style={{ background: getRoleColor('surface.default') }}
    >
      <Container maxWidth="xl">
        <Typography 
          id="journey-heading" 
          variant="h2" 
          component="h2"
          sx={{ 
            color: getRoleColor('text.primary'), 
            mb: (t) => t.spacing(6),
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {content.journey.heading}
        </Typography>
        
        {/* MDS Grid System: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="row gap-6">
          {content.journey.cards.map((card) => (
            <div 
              key={card.title} 
              className="col-12 col-md-6 col-lg-4 journey-card"
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: getRoleColor('surface.subtle'),
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  border: `1px solid rgba(0, 0, 0, 0.08)`,
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                {card.image.src && (
                  <CardMedia
                    component="img"
                    height="240"
                    image={card.image.src}
                    alt={card.image.alt}
                    sx={{ 
                      objectFit: 'cover',
                      background: getRoleColor('surface.accent'),
                    }}
                  />
                )}
                {!card.image.src && (
                  <div 
                    style={{ 
                      height: '240px', 
                      background: getRoleColor('surface.accent'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ color: getRoleColor('text.secondary') }}
                    >
                      {card.image.alt}
                    </Typography>
                  </div>
                )}
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    p: (t) => t.spacing(4),
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3"
                    sx={{ 
                      color: getRoleColor('text.primary'), 
                      mb: (t) => t.spacing(2),
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: getRoleColor('text.secondary'),
                      lineHeight: 1.6,
                    }}
                  >
                    {card.body}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurJourney;
