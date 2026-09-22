import React, { useEffect, useRef } from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { gsap } from 'gsap';
import { getRoleColor } from '../../../theme/roles';

interface HeroProps {
  headline?: string;
  subheadline?: string;
  backgroundImage?: string;
  searchPlaceholder?: string;
  suggestions?: string[];
}

/**
 * Hero section — Figma node 148:1842
 *
 * - Full-width, 1000px height, background image + dark overlay
 * - Subheadline 28px → Headline 80px → Search bar 971px → Suggestion pills
 */
export const Hero: React.FC<HeroProps> = ({
  headline = "AI-powered insights, backed\nby Marsh's global expertise.",
  subheadline = 'Clarity for the risks that matter most.',
  backgroundImage = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
  searchPlaceholder = "Hi, I'm Marsh Ai Assistant, ask me anything...",
  suggestions = [
    'Personalized question?',
    'What is right solution for my company?',
    'How fast can I get a quote?',
  ],
}) => {
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance animation
      const timeline = gsap.timeline({ delay: 0.5 });
      
      // Animate subheadline
      timeline.fromTo(subheadlineRef.current, 
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }
      );
      
      // Animate headline with split text effect
      timeline.fromTo(headlineRef.current, 
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.2, 
          ease: "back.out(1.2)" 
        }, 
        "-=0.4"
      );
      
      // Animate search bar
      timeline.fromTo(searchBarRef.current, 
        { 
          opacity: 0, 
          y: 40, 
          scale: 0.9 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "power2.out" 
        }, 
        "-=0.6"
      );
      
      // Animate suggestions with stagger
      const suggestionPills = suggestionsRef.current?.querySelectorAll('div > div');
      if (suggestionPills) {
        timeline.fromTo(suggestionPills, 
          { 
            opacity: 0, 
            y: 20, 
            scale: 0.8 
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.15, 
            ease: "back.out(1.5)" 
          }, 
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, []);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '600px', md: '1000px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background layers */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundColor: getRoleColor('surface.hero') }} />
        
        {/* Video Background */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        >
          <source src="/video/WebsiteHeaderVideo-960x900_V1%20(1).mp4" type="video/mp4" />
        </Box>

        {/* Fallback Image */}
        <Box
          component="img"
          src={backgroundImage}
          alt=""
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: 0, // Hidden while video plays, can use visibility: hidden or similar
            transition: 'opacity 0.5s ease'
          }}
        />

        {/* Blue Accessibility Tint Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0, 15, 71, 0.6) 0%, rgba(0, 15, 71, 0.8) 100%)',
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1536px',
          px: { xs: '24px', md: '48px' },
          pb: '24px',
        }}
      >
        {/* Text block */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'white', mb: '48px' }}>
          <Typography
            ref={subheadlineRef}
            sx={{
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 400,
              fontSize: { xs: '20px', md: '28px' },
              lineHeight: '36px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {subheadline}
          </Typography>
          <Typography
            ref={headlineRef}
            sx={{
              fontFamily: "'Marsh Serif', sans-serif",
              fontWeight: 400,
              fontSize: { xs: '40px', md: '80px' },
              lineHeight: { xs: '48px', md: '96px' },
              color: 'white',
              textAlign: 'center',
              whiteSpace: 'pre-line',
            }}
          >
            {headline}
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          ref={searchBarRef}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', md: '971px' },
            height: '72px',
            backgroundColor: 'white',
            border: '1px solid #8cb9fe',
            borderRadius: '4px',
            boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
            px: '24px',
            gap: '16px',
            mb: '48px',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: '32px', color: getRoleColor('brand.accent'), flexShrink: 0 }} />
          <InputBase
            placeholder={searchPlaceholder}
            fullWidth
            sx={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: '18px',
              lineHeight: '36px',
              color: '#3d3c37',
              '& ::placeholder': { color: '#3d3c37', opacity: 1 },
            }}
          />
        </Box>

        {/* Suggestions */}
        <Box ref={suggestionsRef} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px', width: { xs: '100%', md: '971px' } }}>
          <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '20px', lineHeight: '24px', color: 'white', fontWeight: 400 }}>
            Suggestions
          </Typography>
          <Box sx={{ display: 'flex', gap: '16px', overflow: 'hidden', width: '100%', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            {suggestions.map((suggestion, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: '#d2ebfe',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: '16px',
                  py: '12px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  '&:hover': { backgroundColor: '#b8dcf8' },
                }}
              >
                <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '18px', lineHeight: '24px', color: '#3d3c37', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {suggestion}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
