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
  
  // Ref for word sequence animation
  const wordSequenceRef = useRef<HTMLDivElement>(null);

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
          mSymbolFinal: mSymbolPatternRef.current,
          wordSequenceContainer: wordSequenceRef.current
        });
      } catch (e) {
        console.error('[HeroIntro] failed', e);
      }
      const wEls = wordRefs.current.filter(Boolean) as HTMLElement[];
      const pEls = paragraphRefs.current.filter(Boolean) as HTMLElement[];
      try {
        initHeroMotion({ section: sectionEl, bg: bgRef.current, words: wEls, kicker: kickerRef.current, paragraphs: pEls });
      } catch (e) {
        console.error('[Hero] motion init failed', e);
      }
    },
  });

  // Pin hero section while video section scrolls
  useEffect(() => {
    if (prefersReduced || isMotionDisabled()) return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Pin the hero section
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=100vh", // Pin for one viewport height (duration of video animation)
      pin: true,
      pinSpacing: false, // Don't add spacing
      anticipatePin: 1,
      onEnter: () => console.debug('Hero pinned'),
      onLeave: () => console.debug('Hero unpinned')
    });
    
    // Parallax fade for logo and headline on scroll
    const fadeTimeout = setTimeout(() => {
      if (!fullLogoRef.current || !headlineTextRef.current || !sectionRef.current) return;
      
      const logo = fullLogoRef.current;
      const headline = headlineTextRef.current;
      const section = sectionRef.current;
      
      console.debug('Setting up parallax fade animations');
      
      // Clear ALL GSAP inline styles and set fresh initial state
      gsap.set([logo, headline], { clearProps: "all" });
      gsap.set([logo, headline], { 
        opacity: 1, 
        y: 0,
        visibility: "visible",
        willChange: "transform, opacity"
      });
      
      // Logo parallax fade (slower movement)
      gsap.to(logo, {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100vh",
          scrub: 1,
          id: "logo-fade",
          onUpdate: (self) => {
            console.debug('Logo fade progress:', self.progress);
          }
        }
      });
      
      // Headline parallax fade (faster movement for depth)
      gsap.to(headline, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100vh",
          scrub: 1,
          id: "headline-fade"
        }
      });
      
      console.debug('Parallax fade setup complete');
    }, 12000);
    
    // Optional: M symbol movement while pinned
    let symbolTrigger: ScrollTrigger | undefined;
    if (mSymbolPatternRef.current) {
      const mSymbol = mSymbolPatternRef.current;
      symbolTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100vh",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const maxMovement = 150;
          gsap.set(mSymbol, {
            y: progress * maxMovement,
            ease: "none"
          });
        }
      });
    }

    // Cleanup
    return () => {
      clearTimeout(fadeTimeout);
      pinTrigger.kill();
      if (symbolTrigger) symbolTrigger.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, [prefersReduced]);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.section} ${heroStyles.hero}`} 
      aria-labelledby="hero-heading" 
      style={{ 
        background: getRoleColor('surface.hero')
      }} 
      data-debug-motion-disabled={prefersReduced || isMotionDisabled() ? '1' : '0'}
    >
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
        {/* Intro animation overlay: word sequence → M formation → arrow convergence → logo expansion → final layout */}
        <Box className={heroStyles.introOverlay} aria-hidden>
          {/* Word Sequence Animation */}
          <div className={heroStyles.wordSequence} ref={wordSequenceRef}>
            <div className="word-item">Risk</div>
            <div className="word-item">People</div>
            <div className="word-item">Strategy</div>
            <div className="word-item">Reinsurance</div>
            <div className="word-item">One Marsh</div>
          </div>

          {/* M-Arrow Elements that will move to final positions */}
          <div className={heroStyles.mArrowLeft} ref={mArrowLeftRef} />
          <div className={heroStyles.mArrowRight} ref={mArrowRightRef} />

          {/* Full MARSH logo that appears in final position */}
          <div className={heroStyles.fullLogo} ref={fullLogoRef}>
            <svg width="558" height="121" viewBox="0 0 558 121" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1253_15249)">
                {/* M - letter (2 paths combined) */}
                <path 
                  data-logo-letter="m1"
                  d="M2.33595 0L58.2002 81.6527H56.4015L21.8879 65.6794V118.912H0V0H2.33595Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                <path 
                  data-logo-letter="m2"
                  d="M116.448 0V118.912H94.5598V65.3894L60.7002 81.6527H58.6562C59.2519 80.6203 114.112 0.324801 114.112 0H116.448Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* A - letter */}
                <path 
                  data-logo-letter="a"
                  d="M241.933 118.912H217.861L207.653 97.1968H160.42L150.446 118.912H128.406L184.574 0.846924H186.256L241.933 118.912ZM200.202 79.8548L183.862 44.2659L168.094 79.8548H200.202Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* R - letter */}
                <path 
                  data-logo-letter="r"
                  d="M253.895 3.17822H302.494C325.211 4.94143 342.567 22.4111 339.028 45.7736C336.832 60.2272 327.243 67.7788 314.419 72.8713C314.139 72.9873 313.893 72.7089 313.999 73.3353L342.31 118.9H316.778L280.162 58.29V58.0464H280.968C280.968 58.0464 318.997 59.0324 316.556 37.5375C315.704 30.0439 307.014 22.8519 299.562 22.8519H276.95V118.9H253.895V3.17822Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* S - letter */}
                <path 
                  data-logo-letter="s"
                  d="M432.503 31.5404C423.509 22.9332 410.346 18.8384 397.907 19.662C387.08 20.3812 375.249 29.6844 381.427 41.2381C386.309 50.3673 410.557 52.9541 420.449 57.2345C436.147 64.0438 442.804 77.2446 438.553 94.0878C431.16 123.343 390.759 125.002 367.283 116.604C364.457 115.594 361.443 114.33 358.967 112.694V88.253C367.096 96.0135 377.923 101.129 389.206 102.393C398.445 103.426 413.068 102.08 416.665 91.791C422.633 74.7506 395.256 72.1058 384.417 68.6606C367.447 63.255 356.841 54.1953 357.776 35.1597C359.469 0.777149 403.993 -4.94167 429.49 6.62357C430.506 7.08757 431.72 7.51677 432.503 8.27077V31.5636V31.5404Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* H - letter */}
                <path 
                  data-logo-letter="h"
                  d="M558.002 118.912H535.238V70.586H482.994V118.912H460.23V3.17822H482.994V50.4832L483.438 50.924H535.238V3.17822H558.002V118.912Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <clipPath id="clip0_1253_15249">
                  <rect width="558" height="121" fill="white"/>
                </clipPath>
              </defs>
            </svg>
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
            Four powerful brand legacies coming together to create one bold future.
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

      {/* Scroll hint button - updated Figma design with smaller size */}
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
          bgcolor: '#2d6ef3', // Exact Figma blue color
          color: 'white',
          width: 'auto', // Let padding determine size
          height: 'auto',
          borderRadius: '50px', // Exact Figma border radius
          boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)', // Exact Figma shadow
          padding: '8px', // Updated to 8px padding (much smaller)
          minWidth: 'unset', // Remove default MUI minWidth
          '&:hover': { 
            bgcolor: '#1e5ed8', // Slightly darker on hover
            transform: 'translateX(-50%) scale(1.05)'
          },
          '&:active': {
            transform: 'translateX(-50%) scale(0.95)',
          }
        }}
      >
        <Box
          component="img"
          src="/src/assets/scroll-button-icon-updated.svg"
          alt=""
          sx={{ 
            width: 24, // Exact 24px from Figma
            height: 24,
            display: 'block'
          }}
        />
      </IconButton>
    </section>
  );
};

export default Hero;
