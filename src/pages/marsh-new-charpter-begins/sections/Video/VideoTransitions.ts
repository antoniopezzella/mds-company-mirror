/**
 * Enhanced video scroll transitions for smooth cinematic reveals
 * Builds on existing GSAP ScrollTrigger setup
 */
import { gsap, ScrollTrigger } from '../../animations/gsap.client';

export interface VideoTransitionOptions {
  revealElement: HTMLElement;
  bridgeElement?: HTMLElement;
  frameElement: HTMLElement;
  useClipPath?: boolean;
  enableParallax?: boolean;
}

export function createCinematicVideoReveal({
  revealElement,
  bridgeElement,
  frameElement,
  useClipPath = true,
  enableParallax = false
}: VideoTransitionOptions) {
  
  // Set initial state
  gsap.set(revealElement, {
    scale: 0.85,
    opacity: 1,
    willChange: 'transform, clip-path, filter',
    clipPath: useClipPath ? 'inset(100% 0% 0% 0%)' : undefined,
    filter: 'blur(8px) brightness(0.8)',
    transformOrigin: 'center center'
  });

  if (bridgeElement) {
    gsap.set(bridgeElement, { opacity: 1, willChange: 'opacity' });
  }

  // Create main timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: frameElement,
      start: 'top 85%',
      end: 'top 25%',
      scrub: 0.8, // Smooth scrubbing
      anticipatePin: 1,
      fastScrollEnd: true,
      onEnter: () => {
        // Auto-play video when revealed
        try {
          const iframe = frameElement.querySelector('iframe');
          iframe?.contentWindow?.postMessage({ method: 'play' }, '*');
        } catch (error) {
          console.debug('Error auto-playing video:', error);
        }
      }
    }
  });

  // Stage 1: Bridge fade + initial scale
  if (bridgeElement) {
    tl.to(bridgeElement, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  }

  // Stage 2: Scale + clip reveal + deblur (main effect)
  tl.to(revealElement, {
    scale: 1,
    clipPath: useClipPath ? 'inset(0% 0% 0% 0%)' : undefined,
    filter: 'blur(0px) brightness(1)',
    duration: 1,
    ease: 'power3.out'
  }, '>-0.2');

  // Optional: Add parallax effect
  if (enableParallax) {
    gsap.to(revealElement, {
      scrollTrigger: {
        trigger: frameElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2, // Slower parallax
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(revealElement, {
            y: progress * -50, // Subtle parallax movement
          });
        }
      }
    });
  }

  return tl;
}

/**
 * Alternative: Progressive reveal with magnetic scroll snap
 */
export function createProgressiveVideoReveal({
  revealElement,
  bridgeElement,
  frameElement
}: VideoTransitionOptions) {
  
  // Magnetic scroll snap
  ScrollTrigger.create({
    trigger: frameElement,
    start: 'top 60%',
    end: 'top 45%',
    onEnter: () => {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: frameElement, offsetY: 100 },
        ease: 'power2.inOut'
      });
    }
  });

  // Multi-stage reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: frameElement,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1
    }
  });

  // Stage 1: Appearance
  tl.fromTo(revealElement, {
    y: 60,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(12px)'
  }, {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    duration: 1,
    ease: 'power2.out'
  });

  // Stage 2: Clip reveal
  if (bridgeElement) {
    tl.to(bridgeElement, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '>-0.3');
  }

  return tl;
}