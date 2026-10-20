import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../theme/roles';
import { CorporateHeader } from './Header';
import { HeroSection } from './HeroSection';
import { FourBrandsSection } from './FourBrandsSection';
import { MetricsSection } from './MetricsSection';
import { JourneySection } from './JourneySection';
import { VideoSection } from './VideoSection';
import { FAQSection } from './FAQSection';
import { TalkToExpertsSection } from './TalkToExpertsSection';
import { Footer } from './Footer';
import { AIAgentBot } from '../../components/AIAgentBot';
import { MArrowAnimationTest } from './MArrowAnimationTest';
import { useWebVitals } from '../../hooks/useWebVitals';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

/**
 * CorporateLandingPage Component
 * 
 * Main landing page component that composes all sections:
 * - Header: Sticky navigation with blur effect
 * - Hero: Video banner with CTA
 * - Four Brands: Business unit showcase
 * - Metrics: Statistics and achievements
 * - Journey: Image cards with overlays
 * - Video: Vimeo brand video with clip-path reveal
 * - FAQ: Accordion-based questions
 * - Talk to Experts: CTA section
 * - Footer: Multi-column footer
 * 
 * Features smooth background color transitions using GSAP ScrollTrigger
 */
const CorporateLandingPage: React.FC = () => {
  // Initialize Web Vitals monitoring for landing page
  useWebVitals({
    debug: import.meta.env.DEV,
    projectId: 'marsh-corporate-landing',
    onMetric: () => {
      // Web Vitals metrics logged for development debugging
    },
  });

  const backgroundRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const mArrowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const expertsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!backgroundRef.current) return;

      // Define section color transitions - GSAP MARK: Adjusted to start fading earlier
      const heroSurface = getRoleColor('bg.primary');
      const defaultSurface = getRoleColor('bg.default');
      const colorTransitions = [
        { trigger: heroRef.current, color: heroSurface, start: 'top bottom', end: 'center center' }, // GSAP MARK: Starts when section enters viewport
        { trigger: heroRef.current, color: '#F7F3EE', start: 'bottom bottom', end: 'bottom top' }, // GSAP MARK: Starts at hero scroll button position (using heroRef) — #F7F3EE has no token yet (see semantic-tokens.ts audit), stays literal
        // Metrics section skipped - stays dark blue with no transition
        { trigger: journeyRef.current, color: defaultSurface, start: 'top bottom', end: 'center center' }, // GSAP MARK: Starts when section enters viewport
        { trigger: mArrowRef.current, color: heroSurface, start: 'top bottom', end: 'center center' }, // GSAP MARK: Starts when section enters viewport
        { trigger: videoRef.current, color: heroSurface, start: 'top bottom', end: 'center center' }, // GSAP MARK: Starts when section enters viewport
        { trigger: faqRef.current, color: '#F2F6F9', start: 'top bottom', end: 'center center' }, // GSAP MARK: no matching token exists, stays literal
        { trigger: expertsRef.current, color: '#002C77', start: 'top bottom', end: 'center center' }, // GSAP MARK: matches brandPrimaryDark, which is orphaned (no role yet) — stays literal
      ];

      colorTransitions.forEach((transition, index) => {
        if (!transition.trigger) return;

        gsap.to(backgroundRef.current, {
          backgroundColor: transition.color,
          scrollTrigger: {
            trigger: transition.trigger,
            start: transition.start,
            end: transition.end,
            scrub: 0, // GSAP MARK: Instant response (was 0.1)
            markers: import.meta.env.DEV, // GSAP MARK: Show markers only in development
            onEnter: () => {
              gsap.to(backgroundRef.current, {
                backgroundColor: transition.color,
                duration: 0.1, // GSAP MARK: Nearly instant (was 0.2s)
                ease: 'power2.inOut',
              });
            },
            onLeaveBack: () => {
              const prevColor = colorTransitions[index - 1]?.color || transition.color;
              gsap.to(backgroundRef.current, {
                backgroundColor: prevColor,
                duration: 0.1, // GSAP MARK: Nearly instant (was 0.2s)
                ease: 'power2.inOut',
              });
            },
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100vw',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Animated Background Layer */}
      <Box
        ref={backgroundRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: getRoleColor('bg.primary'),
          zIndex: 0,
          transition: 'background-color 0.8s ease-in-out',
        }}
      />

      {/* Content Layer */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Sticky Header */}
        <CorporateHeader />

        {/* Hero Section */}
        <Box ref={heroRef}>
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>
        </Box>

        {/* Four Brands Section */}
        <Box ref={brandsRef}>
          <ErrorBoundary>
            <FourBrandsSection />
          </ErrorBoundary>
        </Box>

        {/* Metrics Section */}
        <Box ref={metricsRef}>
          <ErrorBoundary>
            <MetricsSection />
          </ErrorBoundary>
        </Box>

        {/* Journey Section */}
        <Box ref={journeyRef}>
          <ErrorBoundary>
            <JourneySection />
          </ErrorBoundary>
        </Box>

        {/* M Arrow Animation Test */}
        <Box ref={mArrowRef}>
          <ErrorBoundary>
            <MArrowAnimationTest />
          </ErrorBoundary>
        </Box>

        {/* Video Section */}
        <Box ref={videoRef}>
          <ErrorBoundary>
            <VideoSection />
          </ErrorBoundary>
        </Box>

        {/* FAQ Section */}
        <Box ref={faqRef}>
          <ErrorBoundary>
            <FAQSection />
          </ErrorBoundary>
        </Box>

        {/* Talk to Experts Section */}
        <Box ref={expertsRef}>
          <ErrorBoundary>
            <TalkToExpertsSection />
          </ErrorBoundary>
        </Box>

        {/* Footer */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>

        {/* AI Assistant Bot */}
        <ErrorBoundary>
          <AIAgentBot visitorType="prospect" />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default CorporateLandingPage;
export { CorporateLandingPage };
