import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ForInvestors: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const textContent = sectionRef.current?.querySelector('.text-content');
      const imageContent = sectionRef.current?.querySelector('.image-content');
      
      const mm = gsap.matchMedia();
      
      mm.add({
        mobile: '(max-width: 899px)',
        desktop: '(min-width: 900px)',
      }, (context) => {
        const { mobile } = context.conditions as { mobile?: boolean; desktop?: boolean };

        if (textContent) {
          gsap.from(textContent, {
            opacity: 0,
            x: mobile ? 0 : -50,
            y: mobile ? 30 : 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          });
        }

        if (imageContent) {
          gsap.from(imageContent, {
            opacity: 0,
            x: mobile ? 0 : 50,
            y: mobile ? 30 : 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: mobile ? 0.2 : 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          });
        }
      });
      
      return () => mm.revert();
    },
  });

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="investors-heading"
      style={{ background: getRoleColor('bg.default') }}
    >
      <Container maxWidth="xl">
        {/* Two-column layout: text on left, image on right */}
        <div className="mds-legacy-row gap-8 align-items-center">
          {/* Text Content */}
          <div className="mds-legacy-col-12 mds-legacy-col-lg-6 text-content">
            <Typography 
              id="investors-heading" 
              variant="h2" 
              component="h2"
              sx={{ 
                color: getRoleColor('fg.primary'), 
                mb: (t) => t.spacing(4),
                fontWeight: 600,
              }}
            >
              {content.forInvestors.heading}
            </Typography>
            
            {content.forInvestors.body.map((paragraph, index) => (
              <Typography 
                key={index}
                variant="body1" 
                sx={{ 
                  color: getRoleColor('fg.neutral.subtle'),
                  lineHeight: 1.7,
                  mb: (t) => t.spacing(3),
                }}
              >
                {paragraph}
              </Typography>
            ))}

            <Button
              variant="contained"
              href={content.forInvestors.cta.href}
              sx={{
                mt: (t) => t.spacing(2),
                backgroundColor: getRoleColor('interactive.primary'),
                color: getRoleColor('fg.on-dark'),
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                px: (t) => t.spacing(4),
                py: (t) => t.spacing(1.5),
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: getRoleColor('interactive.primary.hover'),
                },
              }}
            >
              {content.forInvestors.cta.label}
            </Button>
          </div>

          {/* Image Content */}
          <div className="mds-legacy-col-12 mds-legacy-col-lg-6 image-content">
            {content.forInvestors.image.src ? (
              <Box
                component="img"
                src={content.forInvestors.image.src}
                alt={content.forInvestors.image.alt}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '400px',
                  background: getRoleColor('bg.neutral.subtle'),
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ color: getRoleColor('fg.neutral.subtle') }}
                >
                  {content.forInvestors.image.alt}
                </Typography>
              </Box>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ForInvestors;
