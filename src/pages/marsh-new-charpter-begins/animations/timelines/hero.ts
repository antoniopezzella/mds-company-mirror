import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { durations, eases, staggers } from '../motion/tokens';

export interface HeroMotionOptions {
  section: HTMLElement;
  bg?: HTMLElement | null;
  words?: HTMLElement[];
  kicker?: HTMLElement | null;
  paragraphs?: HTMLElement[];
}

/**
 * Initialize Hero motion: word-by-word reveal on enter, subtle parallax for bg.
 * - Entrance animation runs once when hero enters viewport.
 * - Parallax scroll anim scrubs across the section.
 */
export function initHeroMotion({ section, bg, words = [], kicker, paragraphs = [] }: HeroMotionOptions) {
  if (!section) return;

  const mm = gsap.matchMedia();

  mm.add({
    // Example breakpoint map; same behavior currently, adjustable later
    all: '(min-width: 0px)',
  }, () => {
    // Entrance timeline: stagger words + show kicker
    const tl = gsap.timeline({ defaults: { ease: eases.entrance }, invalidateOnRefresh: true });

    if (words.length) {
      tl.from(words, {
        yPercent: 100,
        opacity: 0,
        duration: durations.md,
        stagger: staggers.standard,
      }, 0);
    }

    if (kicker) {
      tl.from(kicker, { opacity: 0, y: 16, duration: durations.sm }, 0.15);
    }
    if (paragraphs.length) {
      tl.from(paragraphs, {
        opacity: 0,
        y: 20,
        duration: durations.sm,
        stagger: 0.12,
      }, 0.3);
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => tl.play(0),
      refreshPriority: 1,
    });

    // Subtle parallax background (if provided)
    if (bg) {
      // create depth with slight scale and y-translation
      gsap.to(bg, {
        yPercent: -12,
        scale: 1.04,
        transformOrigin: '50% 50%',
        ease: eases.none,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    return () => {
      // cleanup handled by gsap.context via caller; matchMedia callback can also return cleanup
    };
  });
}
