import type { RefObject, DependencyList } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { registerGsapPlugins } from './registerGsapPlugins';
import { useReducedMotion } from './useReducedMotion';

registerGsapPlugins();

export interface UseScrollTextRevealOptions {
  /** SplitText granularity. */
  type?: 'lines' | 'words' | 'chars';
  /** Clip-mask the split target so lines/words slide out from under a mask edge. */
  mask?: boolean;
  /** Starting offset (%) each segment slides in from. */
  yPercent?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger `start` position. */
  start?: string;
}

/**
 * Scroll-triggered line/word/char reveal, generalized from the line-reveal
 * pattern in `src/projects/Marsh1DER/components/PressSection.tsx`. Animates
 * only `yPercent`/`opacity` (transform + opacity), per this repo's GSAP
 * animation conventions.
 *
 * Respects `prefers-reduced-motion`: when reduced motion is on, the target
 * is set to its fully-revealed end state immediately instead of splitting
 * and tweening it.
 */
export function useScrollTextReveal(
  targetRef: RefObject<HTMLElement | null>,
  options: UseScrollTextRevealOptions = {},
  dependencies: DependencyList = [],
): void {
  const {
    type = 'lines',
    mask = true,
    yPercent = 100,
    duration = 0.7,
    stagger = 0.05,
    ease = 'power3.out',
    start = 'top 85%',
  } = options;
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const target = targetRef.current;
      if (!target) return;

      if (reducedMotion) {
        gsap.set(target, { opacity: 1 });
        return;
      }

      const split = SplitText.create(target, {
        type,
        mask: mask ? type : undefined,
      });
      const segments = type === 'lines' ? split.lines : type === 'words' ? split.words : split.chars;

      gsap.fromTo(
        segments,
        { yPercent, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: target,
            start,
            toggleActions: 'play none none none',
          },
        },
      );

      return () => split.revert();
    },
    { scope: targetRef as RefObject<HTMLElement>, dependencies: [reducedMotion, type, mask, yPercent, duration, stagger, ease, start, ...dependencies] },
  );
}
