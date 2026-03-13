/**
 * Progressive Content Disclosure System
 * Creates sophisticated content revelation patterns inspired by award-winning sites
 * Includes staggered reveals, morphing containers, and intelligent loading states
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface RevealConfig {
  elements: HTMLElement[];
  trigger?: HTMLElement;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
}

export interface MorphContainerConfig {
  container: HTMLElement;
  states: Array<{
    width?: string;
    height?: string;
    borderRadius?: string;
    background?: string;
    transform?: string;
  }>;
  duration?: number;
  ease?: string;
  trigger?: 'scroll' | 'hover' | 'click' | 'auto';
  interval?: number;
}

export interface LoadingRevealConfig {
  container: HTMLElement;
  content: HTMLElement[];
  placeholder?: HTMLElement;
  shimmer?: boolean;
  staggerDelay?: number;
  revealDuration?: number;
}

export class ProgressiveDisclosure {
  private static observers = new Map<HTMLElement, ScrollTrigger>();
  private static morphTimelines = new Map<HTMLElement, gsap.core.Timeline>();

  /**
   * Creates progressive content reveal with various animation patterns
   */
  static reveal(config: RevealConfig): gsap.core.Timeline {
    const {
      elements,
      trigger,
      stagger = 0.1,
      direction = 'up',
      duration = 0.8,
      ease = 'power3.out',
      delay = 0,
      threshold = 0.8
    } = config;

    const tl = gsap.timeline();

    // Set initial states based on direction
    const initialProps = this.getInitialProps(direction);
    gsap.set(elements, initialProps);

    // Create reveal animation
    tl.to(elements, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration,
      stagger,
      ease,
      delay
    });

    // Trigger on scroll if trigger element provided
    if (trigger) {
      ScrollTrigger.create({
        trigger,
        start: `top ${threshold * 100}%`,
        animation: tl,
        toggleActions: 'play none none reverse'
      });
    }

    return tl;
  }

  /**
   * Creates morphing container animations
   */
  static morphContainer(config: MorphContainerConfig): gsap.core.Timeline {
    const {
      container,
      states,
      duration = 1,
      ease = 'power2.inOut',
      trigger = 'auto',
      interval = 3
    } = config;

    const tl = gsap.timeline({ repeat: trigger === 'auto' ? -1 : 0 });

    states.forEach((state, index) => {
      tl.to(container, {
        ...state,
        duration,
        ease
      }, index > 0 ? `+=${interval}` : 0);
    });

    // Store timeline for cleanup
    this.morphTimelines.set(container, tl);

    // Handle different triggers
    switch (trigger) {
      case 'hover':
        container.addEventListener('mouseenter', () => tl.play());
        container.addEventListener('mouseleave', () => tl.reverse());
        break;
      case 'click':
        container.addEventListener('click', () => tl.restart());
        break;
      case 'scroll':
        ScrollTrigger.create({
          trigger: container,
          start: 'top 80%',
          onEnter: () => tl.play()
        });
        break;
    }

    return tl;
  }

  /**
   * Creates sophisticated loading and reveal sequence
   */
  static loadingReveal(config: LoadingRevealConfig): gsap.core.Timeline {
    const {
      container,
      content,
      placeholder,
      shimmer = true,
      staggerDelay = 0.15,
      revealDuration = 0.6
    } = config;

    const tl = gsap.timeline();

    // Hide content initially
    gsap.set(content, { opacity: 0, y: 20 });

    // Create shimmer effect if enabled
    if (shimmer && placeholder) {
      this.createShimmer(placeholder);
    }

    // Loading phase
    tl.to(container, {
      opacity: 1,
      duration: 0.3
    });

    // Content reveal phase
    if (placeholder) {
      tl.to(placeholder, {
        opacity: 0,
        duration: 0.3
      });
    }

    tl.to(content, {
      opacity: 1,
      y: 0,
      duration: revealDuration,
      stagger: staggerDelay,
      ease: 'power3.out'
    }, '-=0.1');

    return tl;
  }

  /**
   * Creates cascading reveal effect for grid/list items
   */
  static cascadeReveal(
    elements: HTMLElement[], 
    options: {
      pattern?: 'diagonal' | 'wave' | 'spiral' | 'random';
      stagger?: number;
      duration?: number;
    } = {}
  ): gsap.core.Timeline {
    const { pattern = 'diagonal', stagger = 0.1, duration = 0.8 } = options;
    const tl = gsap.timeline();

    // Calculate reveal order based on pattern
    const revealOrder = this.calculateRevealOrder(elements, pattern);
    
    gsap.set(elements, { 
      opacity: 0, 
      scale: 0.8,
      rotationY: -90
    });

    revealOrder.forEach((element, index) => {
      tl.to(element, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration,
        ease: 'back.out(1.7)'
      }, index * stagger);
    });

    return tl;
  }

  /**
   * Creates intelligent content batching for performance
   */
  static batchReveal(
    elements: HTMLElement[],
    batchSize: number = 6,
    options: {
      triggerDistance?: number;
      revealDuration?: number;
      stagger?: number;
    } = {}
  ): void {
    const { triggerDistance = 200, revealDuration = 0.6, stagger = 0.05 } = options;
    
    // Split elements into batches
    const batches: HTMLElement[][] = [];
    for (let i = 0; i < elements.length; i += batchSize) {
      batches.push(elements.slice(i, i + batchSize));
    }

    batches.forEach((batch) => {
      const triggerElement = batch[0];
      
      gsap.set(batch, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: triggerElement,
        start: `top bottom-=${triggerDistance}`,
        onEnter: () => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: revealDuration,
            stagger,
            ease: 'power3.out'
          });
        }
      });
    });
  }

  /**
   * Creates text reveal with typing effect
   */
  static textReveal(
    element: HTMLElement,
    options: {
      splitBy?: 'chars' | 'words' | 'lines';
      stagger?: number;
      duration?: number;
      ease?: string;
    } = {}
  ): gsap.core.Timeline {
    const { splitBy = 'words', stagger = 0.03, duration = 0.5, ease = 'power3.out' } = options;
    
    const text = element.textContent || '';
    const parts = this.splitTextContent(text, splitBy);
    
    // Clear element and rebuild with spans
    element.innerHTML = '';
    const spans = parts.map(part => {
      const span = document.createElement('span');
      span.textContent = part;
      span.style.display = 'inline-block';
      if (splitBy === 'words') span.style.marginRight = '0.25em';
      element.appendChild(span);
      return span;
    });

    const tl = gsap.timeline();
    
    gsap.set(spans, { opacity: 0, y: 20 });
    
    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease
    });

    return tl;
  }

  /**
   * Creates smooth page transitions
   */
  static pageTransition(
    exitElement: HTMLElement,
    enterElement: HTMLElement,
    options: {
      type?: 'slide' | 'fade' | 'scale' | 'flip';
      direction?: 'horizontal' | 'vertical';
      duration?: number;
      ease?: string;
    } = {}
  ): gsap.core.Timeline {
    const { type = 'slide', direction = 'horizontal', duration = 0.8, ease = 'power3.inOut' } = options;
    
    const tl = gsap.timeline();

    switch (type) {
      case 'slide':
        const slideDistance = direction === 'horizontal' ? '100%' : '100%';
        const slideProperty = direction === 'horizontal' ? 'x' : 'y';
        
        tl.to(exitElement, {
          [slideProperty]: slideDistance,
          duration,
          ease
        })
        .fromTo(enterElement, {
          [slideProperty]: `-${slideDistance}`
        }, {
          [slideProperty]: '0%',
          duration,
          ease
        }, `-=${duration * 0.5}`);
        break;

      case 'fade':
        tl.to(exitElement, {
          opacity: 0,
          duration: duration * 0.5,
          ease
        })
        .fromTo(enterElement, {
          opacity: 0
        }, {
          opacity: 1,
          duration: duration * 0.5,
          ease
        }, `-=${duration * 0.1}`);
        break;

      case 'scale':
        tl.to(exitElement, {
          scale: 0,
          opacity: 0,
          duration: duration * 0.5,
          ease
        })
        .fromTo(enterElement, {
          scale: 1.1,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          duration: duration * 0.5,
          ease
        }, `-=${duration * 0.1}`);
        break;

      case 'flip':
        tl.to(exitElement, {
          rotationY: 90,
          duration: duration * 0.5,
          ease
        })
        .fromTo(enterElement, {
          rotationY: -90
        }, {
          rotationY: 0,
          duration: duration * 0.5,
          ease
        }, `-=${duration * 0.1}`);
        break;
    }

    return tl;
  }

  // Private utility methods
  private static getInitialProps(direction: string): gsap.TweenVars {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: 50 };
      case 'right':
        return { opacity: 0, x: -50 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      case 'rotate':
        return { opacity: 0, rotation: 180 };
      default:
        return { opacity: 0 };
    }
  }

  private static createShimmer(element: HTMLElement): void {
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 2s infinite;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shimmer);

    // Add shimmer animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  private static calculateRevealOrder(elements: HTMLElement[], pattern: string): HTMLElement[] {
    switch (pattern) {
      case 'diagonal':
        return elements.sort((a, b) => {
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          return (aRect.left + aRect.top) - (bRect.left + bRect.top);
        });

      case 'wave':
        return elements.sort((a, b) => {
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          return Math.sin(aRect.left / 100) - Math.sin(bRect.left / 100);
        });

      case 'spiral':
        const center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        };
        return elements.sort((a, b) => {
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          const aDist = Math.sqrt(
            Math.pow(aRect.left - center.x, 2) + Math.pow(aRect.top - center.y, 2)
          );
          const bDist = Math.sqrt(
            Math.pow(bRect.left - center.x, 2) + Math.pow(bRect.top - center.y, 2)
          );
          return aDist - bDist;
        });

      case 'random':
        return [...elements].sort(() => Math.random() - 0.5);

      default:
        return elements;
    }
  }

  private static splitTextContent(text: string, splitBy: string): string[] {
    switch (splitBy) {
      case 'chars':
        return text.split('');
      case 'lines':
        return text.split('\n');
      default:
        return text.split(' ');
    }
  }

  /**
   * Cleanup function to remove observers and timelines
   */
  static cleanup(element?: HTMLElement): void {
    if (element) {
      const observer = this.observers.get(element);
      if (observer) {
        observer.kill();
        this.observers.delete(element);
      }
      
      const timeline = this.morphTimelines.get(element);
      if (timeline) {
        timeline.kill();
        this.morphTimelines.delete(element);
      }
    } else {
      this.observers.forEach(observer => observer.kill());
      this.observers.clear();
      
      this.morphTimelines.forEach(timeline => timeline.kill());
      this.morphTimelines.clear();
    }
  }
}