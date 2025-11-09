import React, { useMemo, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';
import heroStyles from './Hero.module.scss';
import { initHeroMotion } from '../../animations/timelines/hero';
import { initHeroIntro } from '../../animations/timelines/heroIntro';
import { isMotionDisabled } from '../../animations/utils/DebugFlags';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  // Refs for the M-arrow animation elements
  const mArrowLeftRef = useRef<HTMLDivElement>(null);
  const mArrowRightRef = useRef<HTMLDivElement>(null);
  const fullLogoRef = useRef<HTMLDivElement>(null);
  const headlineTextRef = useRef<HTMLDivElement>(null);
  const mSymbolPatternRef = useRef<HTMLDivElement>(null);

  // Pre-split headline into word spans for precise stagger control
  const words = useMemo(() => (content.hero.headline || '').split(' ').filter(Boolean), []);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  wordRefs.current = [];
  const prefersReduced = useReducedMotion();
  // Allow generic HTMLElement to avoid strict tag mismatch (Typography may render span/p)
  const paragraphRefs = useRef<Array<HTMLElement | null>>([]);
  paragraphRefs.current = [];

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced || isMotionDisabled(),
    setup: () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;
      // Run intro arrow merge first with new refs for logo formation sequence
      try {
        initHeroIntro({ 
          root: sectionEl, 
          reducedMotion: prefersReduced || isMotionDisabled(),
          mArrowLeft: mArrowLeftRef.current,
          mArrowRight: mArrowRightRef.current,
          fullLogo: fullLogoRef.current,
          headline: headlineTextRef.current,
          mSymbolFinal: mSymbolPatternRef.current
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[HeroIntro] failed', e);
      }
      const wEls = wordRefs.current.filter(Boolean) as HTMLElement[];
      const pEls = paragraphRefs.current.filter(Boolean) as HTMLElement[];
      try {
        initHeroMotion({ section: sectionEl, bg: bgRef.current, words: wEls, kicker: kickerRef.current, paragraphs: pEls });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[Hero] motion init failed', e);
      }
    },
  });

  // Minimalist scroll-responsive M pattern movement
  useEffect(() => {
    if (prefersReduced || isMotionDisabled() || !mSymbolPatternRef.current) return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    const mSymbol = mSymbolPatternRef.current;
    
    // Simple, clean scroll animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top", 
      scrub: 0.8, // Slightly responsive
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Simple downward movement only
        const maxMovement = 150; // Reduced movement
        
        gsap.set(mSymbol, {
          y: progress * maxMovement,
          ease: "none"
        });
      }
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
    };
  }, [prefersReduced, mSymbolPatternRef.current]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${heroStyles.hero}`} aria-labelledby="hero-heading" style={{ background: getRoleColor('surface.hero') }} data-debug-motion-disabled={prefersReduced || isMotionDisabled() ? '1' : '0'}>
      {/* Parallax background layer */}
      <Box ref={bgRef} className={heroStyles.bg} sx={{
        background: `linear-gradient(180deg, ${getRoleColor('surface.hero')} 0%, ${getRoleColor('surface.hero')} 100%)`
      }} />
      <Box ref={gradientRef} className={heroStyles.gradientLayer} />
      <Box aria-hidden className={heroStyles.patternLayer} />

      <Container
        maxWidth="xl"
        className={heroStyles.content}
        sx={{ px: (t) => t.spacing(8) /* 48px side gutters to match Figma */ }}
      >
        {/* Intro animation overlay: M formation → arrow convergence → logo expansion → final layout */}
        <Box className={heroStyles.introOverlay} aria-hidden>
          {/* M-Arrow Elements that will move to final positions */}
          <div className={heroStyles.mArrowLeft} ref={mArrowLeftRef} />
          <div className={heroStyles.mArrowRight} ref={mArrowRightRef} />

          {/* Full MARSH logo that appears in final position */}
          <div className={heroStyles.fullLogo} ref={fullLogoRef}>
            <img src="/src/assets/brand-logo.svg" alt="MARSH" />
          </div>

          {/* Blue M Symbol (right side) - created from stroke M pattern */}
          <div className={heroStyles.mSymbolFinal} ref={mSymbolPatternRef}>
            <img src="/src/assets/m-pattern-stroke.svg" alt="" />
          </div>
        </Box>

        {/* Headline text that appears with the logo */}
        <div className={heroStyles.headline} ref={headlineTextRef}>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              color: '#dbf3ff !important',
              fontSize: '40px !important',
              lineHeight: '64px !important',
              maxWidth: '786px',
              fontFamily: 'var(--font/family/display, "MMC_Display:Regular", sans-serif) !important',
              fontWeight: '400 !important',
              margin: '0 !important',
              padding: '0 !important'
            }}
          >
            Four powerful brand legacies coming together to create one bold future for our clients and colleagues.
          </Typography>
        </div>
        {content.hero.eyebrow && (
          <Typography variant="overline" sx={{ color: getRoleColor('text.onHero'), display: 'block', mb: (t) => t.spacing(1), opacity: 0 }}>
            {content.hero.eyebrow}
          </Typography>
        )}
        {/* Hide original headline and body during animation */}
        {words.length > 0 && (
          <Typography id="hero-heading" variant="h2" sx={{ color: getRoleColor('text.onHero'), mb: (t) => t.spacing(2), lineHeight: 1.05, opacity: 0 }}>
            {words.map((w: string, i: number) => (
              <React.Fragment key={`${w}-${i}`}>
                <span className={heroStyles.wordWrap}>
                  <span
                    className={heroStyles.word}
                    data-hero-word
                    ref={(el) => { if (el) wordRefs.current[i] = el; }}
                  >
                    {w}
                  </span>
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </Typography>
        )}
        {content.hero.kicker && (
          <Typography ref={kickerRef} variant="subtitle1" className={heroStyles.kicker} data-hero-tagline sx={{ color: getRoleColor('text.onHero'), opacity: 0, mb: (t) => t.spacing(2) }}>
            {content.hero.kicker}
          </Typography>
        )}
        {content.hero.body?.map((p, i) => (
          <Typography
            key={i}
            component="p"
            ref={(el) => { if (el) paragraphRefs.current[i] = el; }}
            className={heroStyles.heroTitle}
            data-hero-body
            sx={{ color: getRoleColor('text.onHero'), opacity: 0, fontWeight: 400, typography: 'h2' }}
          >
            {p}
          </Typography>
        ))}
        <Box sx={{ mt: (t) => t.spacing(4) }}>
          {/* CTA(s) will go here using DS Button */}
        </Box>
      </Container>

      {/* Scroll hint button - blue circular design from Figma */}
      <IconButton
        aria-label="Scroll down"
        onClick={() => {
          try { window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' }); } catch { window.scrollTo(0, window.innerHeight); }
        }}
        data-hero-hint
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: 48, // 48px from bottom as shown in Figma
          transform: 'translateX(-50%)',
          zIndex: 5,
          bgcolor: '#2d6ef3', // Blue color from Figma
          color: 'white',
          width: 80,
          height: 80,
          borderRadius: '50%',
          boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
          padding: '34px', // 34px padding as per Figma
          '&:hover': { 
            bgcolor: '#1e5ed8',
            transform: 'translateX(-50%) scale(1.05)'
          },
        }}
      >
        <Box
          component="img"
          src="/src/assets/scroll-button-icon.svg"
          alt=""
          sx={{ width: 40, height: 40 }}
        />
      </IconButton>
    </section>
  );
};

export default Hero;
