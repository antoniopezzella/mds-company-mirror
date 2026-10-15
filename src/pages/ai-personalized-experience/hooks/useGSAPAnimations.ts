import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for managing GSAP animations throughout the experience
 * Provides reusable animation functions and cleanup
 */
export function useGSAPAnimations() {
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  // Initialize core animations
  const initAnimations = useCallback(() => {
    // Fade in hero elements
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
    heroTl.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4');

    timelinesRef.current.push(heroTl);
  }, []);

  // Animate card entrance
  const animateCardEntrance = useCallback((element: HTMLElement, delay = 0) => {
    const tl = gsap.timeline({ delay });
    tl.from(element, {
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.6,
      ease: 'power2.out'
    });
    timelinesRef.current.push(tl);
    return tl;
  }, []);

  // Magnetic button effect
  const addMagneticEffect = useCallback((element: HTMLElement, strength = 0.3) => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll-triggered reveal
  const addScrollReveal = useCallback((selector: string, options = {}) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        ...options
      });
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const timelines = timelinesRef.current;
    return () => {
      timelines.forEach(tl => tl.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return {
    initAnimations,
    animateCardEntrance,
    addMagneticEffect,
    addScrollReveal
  };
}
