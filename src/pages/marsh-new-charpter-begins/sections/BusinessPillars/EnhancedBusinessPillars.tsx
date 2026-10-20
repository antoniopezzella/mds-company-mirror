import React, { useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { PhysicsInteractions } from '../../animations/systems/PhysicsInteractions';
import { ProgressiveDisclosure } from '../../animations/systems/ProgressiveDisclosure';
import { TypographyAnimations } from '../../animations/systems/TypographyAnimations';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const EnhancedBusinessPillars: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Enhanced animations with our new system
  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const section = sectionRef.current;
    const cards = Array.from(section.querySelectorAll('.enhanced-pillar-card')) as HTMLElement[];
    const title = titleRef.current;

    // Title typography animation
    if (title) {
      TypographyAnimations.reveal({
        element: title,
        direction: 'up',
        splitBy: 'words',
        stagger: 0.1,
        duration: 0.8,
        trigger: section
      });
    }

    // Advanced card cascade reveal
    if (cards.length > 0) {
      ProgressiveDisclosure.cascadeReveal(cards, {
        pattern: 'diagonal',
        stagger: 0.2,
        duration: 1
      });

      // Add physics interactions to each card
      cards.forEach((card) => {
        // Magnetic hover effect
        PhysicsInteractions.magnetic({
          element: card,
          strength: 0.15,
          distance: 100,
          speed: 1.5
        });

        // Elastic click feedback
        PhysicsInteractions.elastic({
          element: card,
          trigger: 'hover',
          strength: 1.03,
          duration: 0.4,
          ease: 'elastic.out(1, 0.3)'
        });

        // Enhanced hover animations
        const cardTitle = card.querySelector('h5') as HTMLElement;
        const cardIcon = card.querySelector('.card-icon') as HTMLElement;

        card.addEventListener('mouseenter', () => {
          gsap.timeline()
            .to(card, {
              y: -12,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              duration: 0.4,
              ease: 'power3.out'
            })
            .to(cardIcon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3
            }, 0)
            .to(cardTitle, {
              color: getRoleColor('interactive.primary'),
              duration: 0.3
            }, 0);
        });

        card.addEventListener('mouseleave', () => {
          gsap.timeline()
            .to(card, {
              y: 0,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              duration: 0.4,
              ease: 'power3.inOut'
            })
            .to(cardIcon, {
              scale: 1,
              rotation: 0,
              duration: 0.3
            }, 0)
            .to(cardTitle, {
              color: getRoleColor('fg.primary'),
              duration: 0.3
            }, 0);
        });
      });
    }

    // Floating background elements
    const decorativeElements = Array.from(section.querySelectorAll('.floating-element')) as HTMLElement[];
    if (decorativeElements.length > 0) {
      PhysicsInteractions.fluid({
        container: section,
        elements: decorativeElements,
        flowDirection: 'radial',
        amplitude: 8,
        speed: 6
      });
    }

    return () => {
      // Cleanup physics interactions
      cards.forEach(card => {
        PhysicsInteractions.cleanup(card);
      });
    };

  }, [prefersReduced]);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.section} enhanced-pillars-section`} 
      aria-labelledby="pillars-heading" 
      style={{ 
        background: getRoleColor('bg.default'),
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating decorative elements */}
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: `linear-gradient(45deg, ${getRoleColor('interactive.primary')}, ${getRoleColor('bg.neutral.subtle')})`,
          borderRadius: '50%',
          opacity: 0.1,
          zIndex: 0
        }}
      />
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '40px',
          height: '40px',
          background: `linear-gradient(135deg, ${getRoleColor('bg.neutral.subtle')}, ${getRoleColor('interactive.primary')})`,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          opacity: 0.08,
          zIndex: 0
        }}
      />
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '80px',
          height: '20px',
          background: `linear-gradient(90deg, ${getRoleColor('interactive.primary')}, transparent)`,
          borderRadius: '50px',
          opacity: 0.06,
          zIndex: 0
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            ref={titleRef}
            id="pillars-heading" 
            variant="h3" 
            sx={{ 
              color: getRoleColor('fg.primary'), 
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
            }}
          >
            Unified Capabilities
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: getRoleColor('fg.neutral.subtle'),
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: 400
            }}
          >
            Four powerful pillars driving innovation and excellence across every aspect of our business
          </Typography>
        </Box>
        
        {/* Enhanced MDS Grid System with advanced cards */}
        <div ref={cardsContainerRef} className="mds-legacy-row gap-8">
          {content.pillars.map((pillar, index) => (
            <div 
              key={pillar.title} 
              className="mds-legacy-col-12 mds-legacy-col-md-6 enhanced-pillar-card"
              style={{
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  background: getRoleColor('bg.neutral.subtle'),
                  border: `1px solid ${getRoleColor('border.default')}`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${getRoleColor('interactive.primary')}, ${getRoleColor('bg.neutral.subtle')})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}
              >
                {/* Card Icon */}
                <Box 
                  className="card-icon"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${getRoleColor('interactive.primary')}15, ${getRoleColor('bg.neutral.subtle')}15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Icon based on pillar type */}
                  {index === 0 && '🛡️'}
                  {index === 1 && '👥'}
                  {index === 2 && '📈'}
                  {index === 3 && '🔄'}
                </Box>

                <div className="card-content" style={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: getRoleColor('fg.primary'), 
                      mb: 2,
                      fontWeight: 600,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: getRoleColor('fg.neutral.subtle'),
                      lineHeight: 1.6,
                      flex: 1
                    }}
                  >
                    {pillar.body}
                  </Typography>

                  {/* Enhanced CTA */}
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      component="span"
                      sx={{
                        color: getRoleColor('interactive.primary'),
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease',
                        '&::after': {
                          content: '"→"',
                          ml: 1,
                          transition: 'transform 0.3s ease'
                        },
                        '&:hover::after': {
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      Learn More
                    </Typography>
                  </Box>
                </div>

                {/* Subtle background pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '-20px',
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, ${getRoleColor('interactive.primary')}08 0%, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }}
                />
              </Box>
            </div>
          ))}
        </div>

        {/* Statistics or metrics section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: getRoleColor('fg.neutral.subtle'),
              mb: 3
            }}
          >
            Trusted by industry leaders worldwide
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4,
              flexWrap: 'wrap'
            }}
          >
            {[
              { value: '500+', label: 'Global Clients' },
              { value: '150', label: 'Countries' },
              { value: '45K+', label: 'Colleagues' },
              { value: '$20B+', label: 'Premium Revenue' }
            ].map((stat) => (
              <Box 
                key={stat.label}
                className="stat-item"
                sx={{
                  textAlign: 'center',
                  minWidth: '120px'
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: getRoleColor('interactive.primary'),
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: getRoleColor('fg.neutral.subtle'),
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem'
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default EnhancedBusinessPillars;