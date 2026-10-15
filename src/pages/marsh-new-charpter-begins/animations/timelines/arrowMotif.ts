import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eases } from '../motion/tokens';

export interface ArrowMotifOptions {
  container: HTMLElement; // element containing arrow instances
  arrows: HTMLElement[]; // individual arrow elements (left/right variety)
  reducedMotion?: boolean;
}

/**
 * Scroll-reactive arrow motif:
 * - Applies differential parallax translation (and subtle rotation) to each arrow as page scrolls.
 * - Uses a single ScrollTrigger scrub. Arrows alternate direction for visual rhythm.
 * - Reduced motion: leaves arrows static (optional low-opacity fade-in).
 */
export function initArrowMotif({ container, arrows, reducedMotion }: ArrowMotifOptions) {
  if (!container || !arrows.length) return;
  if (reducedMotion) {
    gsap.set(arrows, { opacity: 0.35, y: 0, rotate: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: eases.none }, scrollTrigger: {
    trigger: container,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    // Accessing property ensures TS/ESLint doesn't flag unused import in some setups
    onUpdate: () => void ScrollTrigger,
  }});

  arrows.forEach((el, i) => {
    const dir = i % 2 === 0 ? 1 : -1; // alternate direction
    const travelY = 40 * dir; // px vertical travel
    const travelX = 30 * dir * 0.5; // slight horizontal drift
    const rot = 6 * dir; // small rotation
    tl.to(el, { y: travelY, x: travelX, rotate: rot }, 0);
  });

  return tl;
}
