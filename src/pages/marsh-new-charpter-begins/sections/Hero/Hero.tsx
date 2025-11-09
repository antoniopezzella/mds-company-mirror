import React, { useMemo, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';
import leftArrow from '../../../../assets/m-arrow-left.svg';
import rightArrow from '../../../../assets/m-arrow-right.svg';
import heroStyles from './Hero.module.scss';
import { initHeroMotion } from '../../animations/timelines/hero';
import { initHeroIntro } from '../../animations/timelines/heroIntro';
import { isMotionDisabled } from '../../animations/utils/DebugFlags';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

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
      // Run intro arrow merge first (non-scroll-dependent)
      try {
        initHeroIntro({ root: sectionEl, reducedMotion: prefersReduced || isMotionDisabled() });
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
        {/* Intro animation overlay: arrows merge → M → swap to logo */}
        {content.hero.logo && (
          <Box className={heroStyles.introOverlay} aria-hidden>
            <Box className={heroStyles.introStage}>
              <Box
                component="img"
                src={leftArrow}
                alt=""
                className={`${heroStyles.arrow} ${heroStyles.arrowLeft}`}
                data-hero-arrow="left"
              />
              <Box
                component="img"
                src={rightArrow}
                alt=""
                className={`${heroStyles.arrow} ${heroStyles.arrowRight}`}
                data-hero-arrow="right"
              />
              <Box
                component="img"
                src={content.hero.logo.src}
                alt={content.hero.logo.alt}
                className={heroStyles.logoSwap}
                data-hero-logo
              />
            </Box>
          </Box>
        )}
        {content.hero.eyebrow && (
          <Typography variant="overline" sx={{ color: getRoleColor('text.onHero'), display: 'block', mb: (t) => t.spacing(1) }}>
            {content.hero.eyebrow}
          </Typography>
        )}
        {words.length > 0 && (
          <Typography id="hero-heading" variant="h2" sx={{ color: getRoleColor('text.onHero'), mb: (t) => t.spacing(2), lineHeight: 1.05 }}>
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
          <Typography ref={kickerRef} variant="subtitle1" className={heroStyles.kicker} data-hero-tagline sx={{ color: getRoleColor('text.onHero'), opacity: 0.9, mb: (t) => t.spacing(2) }}>
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
            sx={{ color: getRoleColor('text.onHero'), opacity: 1, fontWeight: 400, typography: 'h2' }}
          >
            {p}
          </Typography>
        ))}
        <Box sx={{ mt: (t) => t.spacing(4) }}>
          {/* CTA(s) will go here using DS Button */}
        </Box>
      </Container>

      {/* Scroll hint button */}
      <IconButton
        aria-label="Scroll down"
        onClick={() => {
          try { window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' }); } catch { window.scrollTo(0, window.innerHeight); }
        }}
        data-hero-hint
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: (t) => t.spacing(8), // 48px from bottom
          transform: 'translateX(-50%)',
          zIndex: 5,
          bgcolor: getRoleColor('interactive.primary'),
          color: getRoleColor('text.onAccent'),
          width: 80,
          height: 80,
          borderRadius: '50%',
          boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: getRoleColor('interactive.primary.hover') },
        }}
      >
        <ExpandMoreRoundedIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </section>
  );
};

export default Hero;
