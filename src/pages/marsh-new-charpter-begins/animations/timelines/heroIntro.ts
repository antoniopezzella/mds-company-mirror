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
  wordSequenceContainer?: HTMLElement | null;
}

/**
 * Hero intro: M formation → word sequence below M → arrow convergence → logo expansion → final layout.
 * Sequence (approx):
 * 0ms: Arrows off-screen (left/right) at slight scale.
 * 0-900ms: Slide + ease inward, slight overshoot to form M.
 * 900-1200ms: Settle into perfect M alignment.
 * 1200ms: Start word sequence below M: Risk, People, Strategy, Reinsurance, One Marsh (one at a time with reading delays)
 * 1200-6200ms: Word sequence animation (5 words × ~1s each)
 * 6200ms: Begin M convergence into arrow
 * 6200-7000ms: Arrows converge and move upward
 * 7000-7400ms: Crossfade M -> official logo asset; arrows fade out.
 * Then: layout shift: wordmark to left, body copy + scroll hint in.
 */
export function initHeroIntro({ 
  root, 
  reducedMotion,
  mArrowLeft,
  mArrowRight,
  fullLogo,
  headline,
  mSymbolFinal,
  wordSequenceContainer
}: HeroIntroOptions) {
  if (!root) return;
  if (reducedMotion) {
    // Instantly show final state with full logo, headline, and blue M symbol
    // Hide word sequence in reduced motion mode
    const logoElement = fullLogo || root.querySelector('.fullLogo') as HTMLElement | null;
    const headlineElement = headline || root.querySelector('.headline') as HTMLElement | null;
    const symbolElement = mSymbolFinal || root.querySelector('.mSymbolFinal') as HTMLElement | null;
    const wordContainer = wordSequenceContainer || root.querySelector('.wordSequence') as HTMLElement | null;
    const hint = root.querySelector('[data-hero-hint]') as HTMLElement | null;
    
    if (logoElement) gsap.set(logoElement, { autoAlpha: 1 });
    if (headlineElement) gsap.set(headlineElement, { autoAlpha: 1 });
    if (symbolElement) gsap.set(symbolElement, { autoAlpha: 1 });
    if (wordContainer) gsap.set(wordContainer, { autoAlpha: 0 });
    if (hint) gsap.set(hint, { autoAlpha: 1 });
    return;
  }

  // Use provided refs or fallback to class selectors
  const left = mArrowLeft || root.querySelector('.mArrowLeft') as HTMLElement | null;
  const right = mArrowRight || root.querySelector('.mArrowRight') as HTMLElement | null;
  const logoElement = fullLogo || root.querySelector('.fullLogo') as HTMLElement | null;
  const headlineElement = headline || root.querySelector('.headline') as HTMLElement | null;
  const symbolElement = mSymbolFinal || root.querySelector('.mSymbolFinal') as HTMLElement | null;
  const wordContainer = wordSequenceContainer || root.querySelector('.wordSequence') as HTMLElement | null;
  const hint = root.querySelector('[data-hero-hint]') as HTMLElement | null;
  
  // Get word elements for sequence animation
  const wordElements = wordContainer ? Array.from(wordContainer.querySelectorAll('.word-item')) as HTMLElement[] : [];
  
  if (!left || !right) return;

  // Initialize elements for animation start
  // Show M arrows immediately for M formation
  gsap.set([left, right], { 
    autoAlpha: 1, // Visible for M formation
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  });
  
  if (logoElement) gsap.set(logoElement, { autoAlpha: 0, scale: 1, y: 0 });
  if (headlineElement) gsap.set(headlineElement, { autoAlpha: 0, y: 20 });
  if (symbolElement) gsap.set(symbolElement, { autoAlpha: 0, scale: 0.8 });
  if (hint) gsap.set(hint, { autoAlpha: 0 });
  if (wordContainer) gsap.set(wordContainer, { autoAlpha: 1 });
  if (wordElements.length > 0) gsap.set(wordElements, { autoAlpha: 0, y: 20 });

  const tl = gsap.timeline({ 
    id: 'heroIntro', 
    defaults: { ease: eases.emphasized }
  });

  // PHASE 1: M Formation Animation (start immediately)
  // 1. Clean entrance - arrows slide in smoothly to form M
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
    
    // 3. Brief pause to show M formation
    .to({}, { duration: 0.5 })

  // PHASE 2: Word Sequence Animation BELOW the formed M
  if (wordElements.length > 0) {
    wordElements.forEach((wordEl, index) => {
      const isLastWord = index === wordElements.length - 1;
      const showDuration = 0.5; // Quick fade in
      const readingDelay = isLastWord ? 1.5 : 1.0; // Longer pause on "One Marsh"
      
      tl.to(wordEl, {
        autoAlpha: 1,
        y: 0,
        duration: showDuration,
        ease: "power2.out"
      }, ">+" + (index === 0 ? 0 : readingDelay - 0.3))
      
      // Fade out unless it's the last word
      if (!isLastWord) {
        tl.to(wordEl, {
          autoAlpha: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in"
        }, ">+" + (readingDelay - 0.3));
      }
    });
    
    // Fade out the last word and the container
    tl.to(wordElements[wordElements.length - 1], {
      autoAlpha: 0,
      y: -10,
      duration: 0.5,
      ease: "power2.in"
    }, ">=+1.0")
    .to(wordContainer, {
      autoAlpha: 0,
      duration: 0.3
    }, "<+0.2");
    
    // Add pause before M animation continues
    tl.to({}, { duration: 0.3 });
  }

  // PHASE 3: M Convergence Animation (existing logic continues)
  // 4. Convergence - M parts move toward each other to form arrow
  tl.to(left, {
    x: 105, // Move left arrow RIGHT toward center
    duration: 0.8, // Faster
    ease: "power2.out"
  }, ">")
    .to(right, {
      x: -105, // Move right arrow LEFT toward center
      duration: 0.8, // Faster
      ease: "power2.out"
    }, "<")
    // 5. Refined upward movement - closer formation moving as one arrow
    .to([left, right], {
      y: -180, // Smoother upward movement (reduced from -200)
      autoAlpha: 0,
      duration: 1.0, // Slightly faster but still graceful
      ease: "power2.inOut"
    }, ">+0.1") // Reduced delay for better flow
    // 6. Short pause then show full logo and headline  
    .to({}, { duration: 0.8 }) // Reduced from 3 seconds to 0.8 seconds

  // 6. Quick logo and content reveal with stroke draw-in animation
  if (logoElement) {
    // Get all SVG paths for stroke animation
    const logoLetters = logoElement.querySelectorAll('[data-logo-letter]');
    
    tl.set(logoElement, {
      autoAlpha: 1,
      y: 0
    }, ">")
    
    // Set up stroke drawing animation for each letter
    if (logoLetters.length > 0) {
      logoLetters.forEach((letter) => {
        const pathLength = (letter as SVGPathElement).getTotalLength();
        
        // Set initial state: stroked outline only, no fill
        gsap.set(letter, {
          fill: 'none',
          stroke: 'white',
          strokeWidth: 2,
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
      });
      
      // Animate letters drawing in one by one
      tl.to(logoLetters, {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.15, // Each letter draws in sequence
        ease: "power2.inOut"
      }, ">+0.8")
      
      // Fill in the letters after drawing
      .to(logoLetters, {
        fill: 'white',
        duration: 0.3,
        stagger: 0.1,
        ease: "none"
      }, ">-0.2"); // Slight overlap with stroke completion
    } else {
      // Fallback if no SVG paths found
      tl.to(logoElement, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, ">+0.8");
    }
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
