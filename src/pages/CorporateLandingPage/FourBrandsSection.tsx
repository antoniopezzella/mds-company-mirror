import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import { Button as DSButton } from '../../components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Four Brands Section
 * 
 * Showcases the four business units:
 * - Marsh (Insurance broking and risk management)
 * - Guy Carpenter (Reinsurance and capital strategies)
 * - Mercer (People and investments)
 * - Oliver Wyman (Management consulting)
 */

interface BrandCard {
  logo: string;
  title: string;
  description: string;
}

const brands: BrandCard[] = [
  {
    logo: 'MARSH',
    title: 'Insurance broking and risk management',
    description: 'Organizations need to excel at quantifying and managing risk in order to grow and adapt.',
  },
  {
    logo: 'GUY CARPENTER',
    title: 'Reinsurance and capital strategies',
    description: 'Specialized expertise and innovations in risk transfer, capital, analytics and actuarial science can help power profitable growth.',
  },
  {
    logo: 'MERCER',
    title: 'People and investments',
    description: "Companies' most vital assets are their people – who thrive with health, wealth and career support.",
  },
  {
    logo: 'OLIVER WYMAN',
    title: 'Management consulting',
    description: 'Deep industry capabilities, expertise and relationships cut the learning curve for growing and competitive companies.',
  },
];

export const FourBrandsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && textElementsRef.current && cardsRef.current) {
        // Pin this section so it stays in place while next section slides over
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
        
        // Fade in title as section comes into view
        gsap.fromTo(
          textElementsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            }
          }
        );

        // Stagger fade in cards - animate upward stacking effect
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 100 }, // GSAP MARK: Start from further down (was 30)
          {
            opacity: 1,
            y: 0,
            stagger: 0.2, // GSAP MARK: Stagger each card animation by 0.2s
            duration: 1, // GSAP MARK: Duration of each card animation
            ease: 'power3.out', // GSAP MARK: Smooth ease out
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%', // GSAP MARK: Start when cards enter viewport
              end: 'top 20%', // GSAP MARK: Complete stacking animation
              toggleActions: 'play none none reverse', // GSAP MARK: Play on enter, reverse on scroll back
              markers: import.meta.env.DEV, // GSAP MARK: Show markers only in development
            }
          }
        );

        // GSAP MARK: H2 text color transition - white to dark blue
        if (textElementsRef.current) {
          const h2Element = textElementsRef.current.querySelector('.h2-transition');
          
          if (h2Element) {
            // Transition to midnight blue (primary color) during background change
            gsap.fromTo(
              h2Element,
              { color: '#FFFFFF' }, // Start: white text on dark background
              {
                color: '#002C77', // End: midnight blue (primary color) on light background
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top bottom', // GSAP MARK: Starts when section enters viewport
                  end: 'top center', // GSAP MARK: Completes when section is centered
                  scrub: 0.3,
                  markers: import.meta.env.DEV, // GSAP MARK: Show markers only in development
                }
              }
            );
          }
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10, // Places this section above the hero
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: (theme) => theme.spacing(6), // 48px grid margin
        }}
      >
        {/* Title Section */}
        <Box
          ref={textElementsRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            mb: 5,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            className="h2-transition"
            sx={{
              color: '#002C77', // Midnight blue (primary color) - final state after transition
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            Explore our capabilities across risk, strategy, and people.
          </Typography>
        </Box>

        {/* Brands Grid */}
        <Grid ref={cardsRef} container spacing={0} sx={{ height: '462px' }}>
          {brands.map((brand, index) => (
            <Grid
              key={brand.logo}
              size={{ xs: 12, md: 3 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRight: index < brands.length - 1 ? { xs: 'none', md: '1px solid #B9B6B1' } : 'none',
              }}
            >
              {/* Card Content */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  p: 2,
                }}
              >
                {/* Logo */}
                <Box sx={{ height: '64px', display: 'flex', alignItems: 'center' }}>
                  {brand.logo === 'MARSH' ? (
                    <Box
                      component="img"
                      src="/images/marsh-logo-brand.svg"
                      alt="Marsh Logo"
                      loading="lazy"
                      width="120"
                      height="44"
                      sx={{ height: '44px', width: 'auto' }}
                    />
                  ) : brand.logo === 'GUY CARPENTER' ? (
                    <Box
                      component="img"
                      src="/images/Guy Carpenter.svg"
                      alt="Guy Carpenter Logo"
                      loading="lazy"
                      width="180"
                      height="44"
                      sx={{ height: '44px', width: 'auto' }}
                    />
                  ) : brand.logo === 'MERCER' ? (
                    <Box
                      component="img"
                      src="/images/mercer.svg"
                      alt="Mercer Logo"
                      loading="lazy"
                      width="140"
                      height="44"
                      sx={{ height: '44px', width: 'auto' }}
                    />
                  ) : brand.logo === 'OLIVER WYMAN' ? (
                    <Box
                      component="img"
                      src="/images/Oliver.svg"
                      alt="Oliver Wyman Logo"
                      sx={{ height: '44px', width: 'auto' }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-family-display, "Marsh Serif", serif)',
                        fontSize: '20px',
                        color: getRoleColor('fg.primary'),
                      }}
                    >
                      {brand.logo}
                    </Typography>
                  )}
                </Box>

                {/* Content */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                      fontSize: '24px',
                      lineHeight: '32px',
                      color: '#3D3C37', // Neutral color
                    }}
                  >
                    {brand.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                      fontSize: '20px',
                      lineHeight: '32px',
                      color: '#3D3C37', // Neutral color
                    }}
                  >
                    {brand.description}
                  </Typography>
                </Box>
              </Box>

              {/* Button */}
              <Box sx={{ p: 2, pt: 0 }}>
                <DSButton variant="outline" size="md" style={{ width: '100%' }}>
                  Explore capabilities
                </DSButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
