import { gsap } from 'gsap';
import { eases } from '../motion/tokens';
import { registerTimeline } from '../motion/controller';

export interface HeroIntroOptions {
  root: Element;
  reducedMotion?: boolean;
  mArrowLeft?: HTMLElement | null;
  mArrowRight?: HTMLElement | null;
  fullLogo?: HTMLElement | null;
  headline?: HTMLElement | null;
  mSymbolFinal?: HTMLElement | null;
}

/**
 * Hero intro: two arrow halves slide inward, overlap to form the "M" silhouette, then crossfade to full Marsh logo.
 * Sequence (approx):
 * 0ms: Arrows off-screen (left/right) at slight scale.
 * 0-900ms: Slide + ease inward, slight overshoot.
 * 900-1200ms: Settle into perfect alignment.
 * 1200-1800ms: Pause holding the formed M + tagline.
 * 1800-2200ms: Crossfade M -> official logo asset; arrows fade out.
 * Then: layout shift: wordmark to left, body copy + scroll hint in.
 */
export function initHeroIntro({ 
  root, 
  reducedMotion,
  mArrowLeft,
  mArrowRight,
  fullLogo,
  headline,
  mSymbolFinal
}: HeroIntroOptions) {
  if (!root) return;
  if (reducedMotion) {
    // Instantly show final state with full logo, headline, and blue M symbol
    const logoElement = fullLogo || root.querySelector('.fullLogo') as HTMLElement | null;
    const headlineElement = headline || root.querySelector('.headline') as HTMLElement | null;
    const symbolElement = mSymbolFinal || root.querySelector('.mSymbolFinal') as HTMLElement | null;
    const hint = root.querySelector('[data-hero-hint]') as HTMLElement | null;
    
    if (logoElement) gsap.set(logoElement, { autoAlpha: 1 });
    if (headlineElement) gsap.set(headlineElement, { autoAlpha: 1 });
    if (symbolElement) gsap.set(symbolElement, { autoAlpha: 1 });
    if (hint) gsap.set(hint, { autoAlpha: 1 });
    return;
  }

  // Use provided refs or fallback to class selectors
  const left = mArrowLeft || root.querySelector('.mArrowLeft') as HTMLElement | null;
  const right = mArrowRight || root.querySelector('.mArrowRight') as HTMLElement | null;
  const logoElement = fullLogo || root.querySelector('.fullLogo') as HTMLElement | null;
  const headlineElement = headline || root.querySelector('.headline') as HTMLElement | null;
  const symbolElement = mSymbolFinal || root.querySelector('.mSymbolFinal') as HTMLElement | null;
  const hint = root.querySelector('[data-hero-hint]') as HTMLElement | null;
  if (!left || !right) return;

  // Initialize elements for animation start
  gsap.set([left, right], { 
    autoAlpha: 1,
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  });
  
  if (logoElement) gsap.set(logoElement, { autoAlpha: 0, scale: 1, y: 0 });
  if (headlineElement) gsap.set(headlineElement, { autoAlpha: 0, y: 20 });
  if (symbolElement) gsap.set(symbolElement, { autoAlpha: 0, scale: 0.8 });
  if (hint) gsap.set(hint, { autoAlpha: 0 });

  const tl = gsap.timeline({ 
    id: 'heroIntro', 
    defaults: { ease: eases.emphasized }
  });

  // 1. Clean entrance - arrows slide in smoothly
  tl.from(left, {
    xPercent: -100,
    duration: 0.8, // Faster entrance
    ease: "power2.out" // Simple, clean easing
  }, 0)
    .from(right, {
      xPercent: 100,
      duration: 0.8, // Faster entrance
      ease: "power2.out" // Simple, clean easing
    }, 0)
    
    // 2. Quick settle into M formation
    .to([left, right], {
      xPercent: 0,
      duration: 0.3, // Quick settle
      ease: "power1.out"
    }, ">-0.1")
    // 3. Brief pause (1 second instead of 2)
    .to({}, { duration: 1.0 }) // Reduced from 2 seconds
    
    // 4. Simple convergence
    .to(left, {
      x: 120, // Slightly less movement
      duration: 0.8, // Faster
      ease: "power2.out"
    }, ">")
    .to(right, {
      x: -120, // Slightly less movement
      duration: 0.8, // Faster
      ease: "power2.out"
    }, "<")
    
    // 5. Clean exit
    .to([left, right], {
      y: -200, // Less dramatic exit
      autoAlpha: 0,
      duration: 1.2, // Faster exit
      ease: "power2.inOut"
    }, ">+0.2")
    // 6. Wait 3000ms then show full logo and headline
    .to({}, { duration: 3.0 }) // 3000ms delay

  // 6. Quick logo and content reveal (reduced delay)
  if (logoElement) {
    tl.set(logoElement, {
      autoAlpha: 0,
      y: 20 // Subtle offset
    }, ">")
    .to(logoElement, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8, // Faster
      ease: "power2.out"
    }, ">+0.8"); // Much shorter delay (0.8s instead of 3s)
  }

  // 7. Simple M symbol scaling
  if (symbolElement) {
    tl.set(symbolElement, {
      autoAlpha: 1,
      scale: 0
    }, "<")
    .to(symbolElement, {
      scale: 1,
      duration: 0.6, // Faster
      ease: "back.out(1.2)" // Subtle bounce
    }, ">+0.2");
  }

  // 8. Clean headline reveal
  if (headlineElement) {
    tl.set(headlineElement, {
      autoAlpha: 0,
      y: 15 // Subtle movement
    }, "<")
    .to(headlineElement, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, ">+0.2");
  }

  // 9. Simple scroll hint
  if (hint) {
    tl.set(hint, {
      autoAlpha: 0,
      y: 10 // Minimal offset
    }, "<")
    .to(hint, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, ">+0.3");
  }

  return registerTimeline('heroIntro', tl);
}
