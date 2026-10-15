import type { RefObject } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { registerGsapPlugins } from './registerGsapPlugins';
import { useReducedMotion } from './useReducedMotion';

registerGsapPlugins();

export interface UseScrollSmootherOptions {
  /** Scroll catch-up ease amount — higher is "floatier". GSAP's own default is 1.5. */
  smooth?: number;
  /**
   * Enables ScrollSmoother's declarative `data-speed`/`data-lag` parallax
   * shorthand on descendant elements. Off by default — this repo's
   * existing parallax (HeroBanner) is a hand-rolled ScrollTrigger tween,
   * which syncs automatically without this.
   */
  effects?: boolean;
}

/**
 * Mounts GSAP's ScrollSmoother across a wrapper/content pair, replacing
 * native scroll with an eased, GPU-transformed one. Every existing
 * ScrollTrigger-driven effect already in the tree (the other hooks in this
 * module, HeroBanner's own parallax, PressSection's entrance) keeps
 * working unmodified — ScrollSmoother patches ScrollTrigger's scroll
 * source globally once created, no changes needed at those call sites.
 *
 * IMPORTANT: any `position: fixed` element (a fixed header, a floating
 * chat widget, an intro overlay) must render OUTSIDE both refs' DOM
 * subtree, as a sibling. ScrollSmoother moves `content` via a CSS
 * transform, and `position: fixed` inside a transformed ancestor behaves
 * like `position: absolute` relative to that ancestor instead of the
 * viewport — a standard CSS interaction, not a ScrollSmoother bug.
 *
 * Respects `prefers-reduced-motion`: when reduced motion is on, no
 * smoother is created at all and the page scrolls natively.
 */
export function useScrollSmoother(
  wrapperRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  options: UseScrollSmootherOptions = {},
): void {
  const { smooth = 1.5, effects = false } = options;
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      if (!wrapperRef.current || !contentRef.current) return;

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth,
        effects,
      });

      return () => smoother.kill();
    },
    { dependencies: [reducedMotion, smooth, effects] },
  );
}
