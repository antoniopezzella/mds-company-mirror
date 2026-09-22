import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import { Button as DSButton } from '../../components/ui/button';
import { KeyboardArrowDown } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/_grid.scss';

gsap.registerPlugin(ScrollTrigger);

/**
 * Corporate Landing Page - Hero Section
 * 
 * Based on Figma design node 2897:45713
 * - Full width/height layout (980px)
 * - 6 column / 6 column grid split
 * - Light blue background
 * - Left: Eyebrow + Headline + CTA
 * - Right: Empty space for image/visual
 * - Bottom: Scroll indicator button
 */

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Fade in eyebrow text
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // GSAP MARK: Split Text Reveal - Modern word-by-word animation for H1
      if (headlineRef.current) {
        // Split text into words manually (wrapping each word in a span)
        const text = headlineRef.current.textContent || '';
        const words = text.trim().split(/\s+/);
        headlineRef.current.innerHTML = words
          .map(word => `<span class="word-wrapper" style="display: inline-block; overflow: hidden;"><span class="word" style="display: inline-block; will-change: transform;">${word}</span></span>`)
          .join(' ');
        
        const wordElements = headlineRef.current.querySelectorAll('.word');
        
        // Animate each word with fade up and stagger (no 3D rotation)
        tl.fromTo(
          wordElements,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05, // GSAP MARK: Each word appears 0.05s after previous
            ease: 'power3.out',
          },
          '-=0.4' // Start slightly before eyebrow finishes
        );
      }

      // Fade in CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // Animate video with clip-path mask from right to left
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { 
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', // Start: hidden on right
          },
          { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // End: fully visible
            duration: 1.5,
            ease: 'power3.inOut',
            delay: 0.3
          }
        );
      }

      // Parallax effect on scroll
      if (heroRef.current && contentRef.current && videoContainerRef.current) {
        // Text content moves up faster (more parallax)
        gsap.to(contentRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });

        // Video moves up slower (less parallax, creating depth)
        gsap.to(videoContainerRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 76px)' }, // Subtract header height
        height: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 76px)' },
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 1, // Hero stays behind, allowing next section to cover it
      }}
    >
      {/* Main Content Container */}
      <div className="mds-legacy-container-fluid" style={{ height: '100%', paddingLeft: 0, paddingRight: 0 }}>
        <div className="mds-legacy-row" style={{ height: '100%', alignItems: 'center', marginLeft: 0, marginRight: 0 }}>
          {/* Left Column: Content (6 cols) */}
          <div className="mds-legacy-col-12 mds-legacy-col-lg-6" style={{ paddingLeft: 0 }}>
            <Box
              ref={contentRef}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8, // Increased from 5 (40px) to 8 (64px)
                maxWidth: '874px',
                pl: { xs: 3, sm: 4, md: 6 }, // Match header padding: 24px → 32px → 48px
              }}
            >
              {/* Eyebrow Text */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography
                  ref={eyebrowRef}
                  variant="h4"
                  sx={{
                    color: '#FFFFFF', // White for visibility on dark background
                    fontWeight: 400,
                    opacity: 0,
                  }}
                >
                  Marsh McLennan is now Marsh.
                </Typography>

                {/* Main Headline */}
                <Typography
                  ref={headlineRef}
                  variant="h1"
                  component="h1"
                  sx={{
                    color: '#FFFFFF',
                    maxWidth: '874px',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  Four powerful brand legacies coming together to create one bold future for our clients and colleagues.
                </Typography>
              </Box>

              {/* CTA Button */}
              <Box ref={ctaRef} sx={{ opacity: 0 }}>
                <DSButton
                  variant="primary"
                  size="md"
                  endIcon={<span>→</span>}
                  style={{
                    backgroundColor: getRoleColor('brand.accent'),
                    borderColor: getRoleColor('brand.accent'),
                    color: '#1B222F',
                  }}
                >
                  Learn more
                </DSButton>
              </Box>
            </Box>
          </div>

          {/* Right Column: Hero Video (6 cols) */}
          <div className="mds-legacy-col-12 mds-legacy-col-lg-6" style={{ display: 'flex', height: '100%' }}>
            <Box
              ref={videoContainerRef}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: getRoleColor('surface.hero'),
                clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onError={(e) => {
                  console.error('Hero video error:', e);
                }}
                onLoadedData={() => console.debug('Hero video loaded successfully')}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  minWidth: '100%',
                  minHeight: '100%',
                  backgroundColor: 'transparent',
                }}
              >
                <source src="/video/WebsiteHeaderVideo-960x900_V1 (1).mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Button - Bottom Center */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '4vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <Box
          component="button"
          onClick={handleScroll}
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50px',
            backgroundColor: getRoleColor('brand.accent'),
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            padding: '12px',
            position: 'relative',
            zIndex: 10,
            '&:hover': {
              transform: 'translateY(2px)',
              boxShadow: '0px 4px 6px -2px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            '&:active': {
              transform: 'translateY(4px)',
            },
          }}
          aria-label="Scroll to content"
        >
          <KeyboardArrowDown
            sx={{
              fontSize: 24,
              color: getRoleColor('text.primary'),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
