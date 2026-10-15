import React, { useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../../hooks/gsap/useReducedMotion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../theme/roles';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface InsightCard {
  type: string; // e.g. "Podcast", "Article"
  title: string;
  description: string;
  image: string;
}

interface StatsProps {
  headline?: string;
  description?: string;
  stats: Stat[];
  insightHeadline?: string;
  insightSubtext?: string;
  insightCards?: InsightCard[];
  backgroundImage?: string;
  /** Whether the background photo overlay renders behind the solid navy. Default true. Set false for a plain solid #000f47 background (e.g. Figma node 9538:177232's "section-metrics" instance, which has no image). */
  hasBackgroundImage?: boolean;
}

/**
 * Stats + Insights — Figma node 148:1903 (section-metrics)
 *
 * Part 1 (top): Metrics
 * - Dark bg (#000f47) + background image at 30% opacity
 * - Two-column header: headline (56px, 722px) left, description (22px, 584px) right
 * - 3 stat columns: yellow (#FFBF0D) numbers 104px, white divider borders
 * - Min-height 300px per stat column, center-aligned
 *
 * Part 2 (bottom): Insights
 * - Same bg continues
 * - Left column (577px): 96px headline (#ceecff), 20px subtext (white)
 * - Right column: horizontally scrollable cards (501px wide, 420px image height)
 *   - Card: type label (28px, white), title (40px Marsh Serif, #ceecff), description (28px, white)
 * - Navigation arrows (yellow), scroll indicator bar
 */
export const Stats: React.FC<StatsProps> = ({
  headline = 'The reach, experience, and perspective to help you thrive',
  description = 'With more than 90,000 colleagues in over 130 countries, our shared purpose — to build the confidence to thrive through the power of perspective — guides how we deliver value to our stakeholders.',
  stats,
  insightHeadline = 'Insights that act where your risk is real.',
  insightSubtext = 'Expert analysis, applied to the decisions that matter most to your business.',
  insightCards = [],
  backgroundImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920',
  hasBackgroundImage = true,
}) => {
  const hasDescription = Boolean(description);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const insightHeadlineRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  // Entrance animations are skipped entirely for users who have asked for
  // reduced motion (WCAG 2.3.3). This component called gsap directly rather
  // than going through the hooks in src/hooks/gsap/, all of which already
  // honour the preference, so it animated regardless.
  //
  // It also made these elements unreadable while in flight: the animation
  // starts at opacity 0, so anything sampling the page mid-animation sees text
  // blended into its background. That is what axe was reporting here as
  // colour-contrast failures on elements whose declared colour was correct.
  useEffect(() => {
    if (reducedMotion) return;
const ctx = gsap.context(() => {
      // Animate headline and description when section enters view
      gsap.fromTo(headlineRef.current, 
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      if (descriptionRef.current) {
        gsap.fromTo(descriptionRef.current,
          {
            opacity: 0,
            y: 40
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // Animate stats with number counting
      const statElements = statsRef.current?.querySelectorAll('[data-stat-value]');
      if (statElements) {
        statElements.forEach((element, index) => {
          const target = element as HTMLElement;
          const endValue = target.dataset.statValue || '0';
          const suffix = target.dataset.statSuffix || '';
          
          // Extract numeric value for counting
          const numericValue = parseInt(endValue.replace(/[^0-9]/g, ''), 10) || 0;
          
          // Create counter object
          const counter = { value: 0 };
          
          gsap.fromTo(counter,
            { value: 0 },
            {
              value: numericValue,
              duration: 2.5,
              ease: "power2.out",
              onUpdate: function() {
                const currentValue = Math.round(counter.value);
                const formattedValue = endValue.includes('k') ? `${currentValue}k` : 
                                     endValue.includes('M') ? `${currentValue}M` : 
                                     endValue.includes('%') ? `${currentValue}%` : 
                                     currentValue.toString();
                target.textContent = formattedValue + suffix;
              },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 70%",
              },
              delay: index * 0.2 // Stagger the animations
            }
          );

          // Also animate the stat container for entrance
          const statContainer = target.closest('[data-stat-container]');
          if (statContainer) {
            gsap.fromTo(statContainer,
              {
                opacity: 0,
                y: 50,
                scale: 0.9
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.0,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: "top 75%",
                },
                delay: index * 0.15
              }
            );
          }
        });
      }

      // Animate insight headline
      gsap.fromTo(insightHeadlineRef.current, 
        { 
          opacity: 0, 
          x: -60 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: insightHeadlineRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [stats, reducedMotion]);

  const scrollCards = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -525 : 525,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        width: '100%',
        pt: '96px',
      }}
    >
      {/* Background */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundColor: '#000f47' }} />
        {hasBackgroundImage && (
          <Box
            component="img"
            src={backgroundImage}
            alt=""
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
        )}
      </Box>

      {/* ─── Part 1: Metrics ─── */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1540px',
          mx: 'auto',
          px: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '50px',
        }}
      >
        {/* Header — two-column (headline + description) when a description is
            given, or a single centered full-width headline when not (matches
            Figma node 9538:177232's "section-metrics" instance, which has no
            description at all). */}
        <Box
          sx={hasDescription ? {
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '32px',
            alignItems: { md: 'center' },
            width: '100%',
          } : {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography
            ref={headlineRef}
            sx={{
              fontFamily: "'Marsh Serif', sans-serif",
              fontWeight: 400,
              fontSize: { xs: '36px', md: '56px' },
              lineHeight: { xs: '44px', md: '80px' },
              color: '#fcfcfc',
              textAlign: hasDescription ? 'left' : 'center',
              width: hasDescription ? { xs: '100%', md: '722px' } : '100%',
              maxWidth: hasDescription ? undefined : '1227px',
              flexShrink: 0,
            }}
          >
            {headline}
          </Typography>
          {hasDescription && (
            <Typography
              ref={descriptionRef}
              sx={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 400,
                fontSize: { xs: '18px', md: '22px' },
                lineHeight: '36px',
                color: 'white',
                width: { xs: '100%', md: '584px' },
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* Stat Columns with dividers */}
        <Box
          ref={statsRef}
          sx={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: '2px',
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 0 0',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}
            >
              <Box
                data-stat-container="true"
                sx={{
                  flex: '1 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                  textAlign: 'center',
                  borderRadius: '4px',
                  // Left border on last item, right border on first item
                  ...(index === 0 && { borderRight: '1px solid rgba(255,255,255,0.4)' }),
                  ...(index === stats.length - 1 && { borderLeft: '1px solid rgba(255,255,255,0.4)' }),
                }}
              >
                <Typography
                  data-stat-value={stat.value}
                  data-stat-suffix={stat.suffix || ''}
                  sx={{
                    fontFamily: "'Marsh Serif', sans-serif",
                    fontWeight: 400,
                    fontSize: { xs: '60px', md: '104px' },
                    lineHeight: '128px',
                    color: getRoleColor('brand.accent'),
                  }}
                >
                  {/* Initial value - will be animated */}
                  0{stat.suffix || ''}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Noto Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '40px',
                    color: '#f8fafc',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ─── Part 2: Insights ─── */}
      {insightCards.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            px: '48px',
            py: '96px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: '56px',
              alignItems: { lg: 'center' },
              position: 'relative',
            }}
          >
            {/* Left: Headline */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                flexShrink: 0,
                width: { xs: '100%', lg: '577px' },
              }}
            >
              <Typography
                ref={insightHeadlineRef}
                sx={{
                  fontFamily: "'Marsh Serif', sans-serif",
                  fontWeight: 400,
                  fontSize: { xs: '48px', lg: '96px' },
                  lineHeight: { xs: '56px', lg: '96px' },
                  color: '#ceecff',
                }}
              >
                {insightHeadline}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '36px',
                  color: '#fcfcfc',
                  maxWidth: '413px',
                }}
              >
                {insightSubtext}
              </Typography>
            </Box>

            {/* Right: Scrollable Cards */}
            <Box sx={{ flex: '1 0 0', minWidth: 0, position: 'relative' }}>
              {/* Nav Arrows */}
              <Box sx={{ position: 'absolute', top: '-59px', right: '9px', display: 'flex', gap: '24px', zIndex: 3 }}>
                <IconButton
                  onClick={() => scrollCards('left')}
                  sx={{ backgroundColor: getRoleColor('brand.accent'), width: '48px', height: '48px', '&:hover': { backgroundColor: '#FFD54F' } }}
                  aria-label="Scroll insights left"
                >
                  <ArrowBackIcon sx={{ fontSize: '20px', color: '#000f47' }} />
                </IconButton>
                <IconButton
                  onClick={() => scrollCards('right')}
                  sx={{ backgroundColor: getRoleColor('brand.accent'), width: '48px', height: '48px', '&:hover': { backgroundColor: '#FFD54F' } }}
                  aria-label="Scroll insights right"
                >
                  <ArrowForwardIcon sx={{ fontSize: '20px', color: '#000f47' }} />
                </IconButton>
              </Box>

              <Box
                ref={scrollRef}
                // A horizontally scrolling region must be keyboard-focusable or
                // its off-screen cards are unreachable without a mouse
                // (WCAG 2.1.1; axe: scrollable-region-focusable). Arrow keys
                // scroll it natively once focused, so no key handler is needed.
                tabIndex={0}
                role="group"
                aria-label="Insights"
                sx={{
                  display: 'flex',
                  gap: '24px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {insightCards.map((card, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      flexShrink: 0,
                      width: { xs: '300px', md: '501px' },
                      scrollSnapAlign: 'start',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Card Image */}
                    <Box sx={{ width: '100%', height: { xs: '260px', md: '420px' }, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                      <Box
                        component="img"
                        src={card.image}
                        alt={card.title}
                        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    {/* Type label */}
                    <Typography
                      sx={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: '28px',
                        lineHeight: '36px',
                        color: '#fcfcfc',
                      }}
                    >
                      {card.type}
                    </Typography>
                    {/* Title */}
                    <Typography
                      sx={{
                        fontFamily: "'Marsh Serif', sans-serif",
                        fontWeight: 400,
                        fontSize: { xs: '24px', md: '40px' },
                        lineHeight: '18px',
                        color: '#ceecff',
                      }}
                    >
                      {card.title}
                    </Typography>
                    {/* Description */}
                    <Typography
                      sx={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: { xs: '18px', md: '28px' },
                        lineHeight: '36px',
                        color: '#fcfcfc',
                        maxWidth: '417px',
                      }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Scroll indicator */}
              <Box sx={{ mt: '24px', width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                <Box sx={{ width: '100px', height: '4px', backgroundColor: '#2c6eff', borderRadius: '2px' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Stats;
