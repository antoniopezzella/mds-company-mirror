import type { RefObject, DependencyList } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { registerGsapPlugins } from './registerGsapPlugins';
import { useReducedMotion } from './useReducedMotion';

registerGsapPlugins();

export interface UseScrollRevealOptions {
  /**
   * CSS selector, queried against `containerRef.current`, for the elements
   * to animate as a staggered group (e.g. `.tile`, `[role="group"]`, or
   * `:scope > *` for "all direct children"). Omit to animate
   * `containerRef.current` itself as a single target.
   */
  targets?: string;
  x?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger `start` position. */
  start?: string;
  /** ScrollTrigger's own trigger element, if different from `containerRef`. Defaults to `containerRef.current`. */
  trigger?: RefObject<HTMLElement | null>;
  /**
   * `'once'` plays the reveal the first time it scrolls into view and
   * leaves it revealed (default — matches most entrance reveals on this
   * page). `'toggle'` re-hides it on scrolling back up past the trigger.
   */
  repeat?: 'once' | 'toggle';
}

/**
 * Scroll-triggered fade/slide reveal for a single element or a staggered
 * group of matched descendants — generalizes the near-identical
 * `gsap.fromTo(..., {scrollTrigger})` entrance pattern hand-rolled across
 * several Marsh1DER section components.
 *
 * Respects `prefers-reduced-motion`: when reduced motion is on, targets are
 * set straight to their revealed end state, no tween and no ScrollTrigger.
 */
export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {},
  dependencies: DependencyList = [],
): void {
  const {
    targets,
    x = 0,
    y = 24,
    duration = 0.7,
    stagger = 0,
    ease = 'power2.out',
    start = 'top 85%',
    trigger,
    repeat = 'once',
  } = options;
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const els = targets ? Array.from(container.querySelectorAll<HTMLElement>(targets)) : [container];
      if (!els.length) return;

      if (reducedMotion) {
        gsap.set(els, { x: 0, y: 0, opacity: 1, clearProps: 'transform,opacity' });
        return;
      }

      gsap.fromTo(
        els,
        { x, y, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: trigger?.current ?? container,
            start,
            toggleActions: repeat === 'toggle' ? 'play none none reverse' : 'play none none none',
          },
        },
      );
    },
    {
      scope: containerRef as RefObject<HTMLElement>,
      dependencies: [reducedMotion, targets, x, y, duration, stagger, ease, start, repeat, ...dependencies],
    },
  );
}
