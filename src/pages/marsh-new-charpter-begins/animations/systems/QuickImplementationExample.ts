/**
 * Quick Implementation Example
 * A simple drop-in enhancement for your existing Hero section
 */

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypographyAnimations } from './TypographyAnimations';
import { PhysicsInteractions } from './PhysicsInteractions';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useEnhancedHeroAnimations = (options: {
  enableAdvanced?: boolean;
  performance?: 'high' | 'medium' | 'low';
} = {}) => {
  const { enableAdvanced = true, performance = 'high' } = options;
  
  useEffect(() => {
    if (!enableAdvanced) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Find hero elements
    const heroTitle = document.querySelector('[id*="hero-heading"]') as HTMLElement;
    const heroButton = document.querySelector('[data-hero-hint], .hero button') as HTMLElement;
    const heroCards = Array.from(document.querySelectorAll('.pillar-card')) as HTMLElement[];

    // Enhanced Typography Animation
    if (heroTitle && performance === 'high') {
      // Store original text
      const originalText = heroTitle.textContent || '';
      
      // Create typewriter effect
      TypographyAnimations.typewriter({
        element: heroTitle,
        text: [originalText],
        speed: 0.04,
        cursor: false,
        scramble: true
      });
    }

    // Enhanced Button Interactions
    if (heroButton) {
      // Add magnetic effect
      PhysicsInteractions.magnetic({
        element: heroButton,
        strength: 0.2,
        distance: 80,
        speed: 1.5
      });

      // Enhanced hover effect
      heroButton.addEventListener('mouseenter', () => {
        gsap.to(heroButton, {
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(45, 110, 243, 0.4)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      heroButton.addEventListener('mouseleave', () => {
        gsap.to(heroButton, {
          scale: 1,
          boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.inOut'
        });
      });
    }

    // Enhanced Card Animations
    if (heroCards.length > 0) {
      // Staggered reveal with physics
      gsap.fromTo(heroCards, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: heroCards[0],
          start: 'top 85%',
          once: true
        }
      });

      // Add physics interactions to cards
      heroCards.forEach(card => {
        PhysicsInteractions.elastic({
          element: card,
          trigger: 'hover',
          strength: 1.03,
          duration: 0.4
        });
      });
    }

    // Floating elements animation
    const decorativeElements = Array.from(document.querySelectorAll('[aria-hidden="true"]')) as HTMLElement[];
    if (decorativeElements.length > 0 && performance === 'high') {
      decorativeElements.forEach((element, index) => {
        gsap.to(element, {
          y: '+=20',
          rotation: '+=10',
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.5
        });
      });
    }

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [enableAdvanced, performance]);
};

// Usage example:
export const EnhancedHeroExample: React.FC = () => {
  // Simply add this hook to your existing Hero component
  useEnhancedHeroAnimations({
    enableAdvanced: true,
    performance: 'high'
  });

  return null; // This hook enhances existing elements
};