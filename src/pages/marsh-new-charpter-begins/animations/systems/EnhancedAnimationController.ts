/**
 * Enhanced Animation Controller Integration
 * Orchestrates all animation systems for the Marsh landing page
 * Inspired by award-winning sites from CSS Design Awards
 */

import { TypographyAnimations } from './TypographyAnimations';
import { PhysicsInteractions } from './PhysicsInteractions';
import { ProgressiveDisclosure } from './ProgressiveDisclosure';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface AnimationConfig {
  enableParallax?: boolean;
  enableTypography?: boolean;
  enablePhysics?: boolean;
  enableProgressive?: boolean;
  performance?: 'high' | 'medium' | 'low';
  reducedMotion?: boolean;
}

export interface HeroAnimationConfig {
  title: HTMLElement;
  subtitle: HTMLElement;
  cta: HTMLElement;
  background: HTMLElement;
  decorativeElements?: HTMLElement[];
}

export interface ContentSectionConfig {
  container: HTMLElement;
  title: HTMLElement;
  content: HTMLElement[];
  media?: HTMLElement;
  interactive?: HTMLElement[];
}

export class EnhancedAnimationController {
  private config: AnimationConfig;
  private activeAnimations: gsap.core.Timeline[] = [];
  private isInitialized = false;

  constructor(config: AnimationConfig = {}) {
    this.config = {
      enableParallax: true,
      enableTypography: true,
      enablePhysics: true,
      enableProgressive: true,
      performance: 'high',
      reducedMotion: false,
      ...config
    };

    this.detectPerformance();
    this.checkReducedMotion();
  }

  /**
   * Initialize all animation systems
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set GSAP defaults based on performance
      this.configureGSAP();

      // Setup reduced motion handling
      if (this.config.reducedMotion) {
        this.setupReducedMotionFallbacks();
      }

      this.isInitialized = true;
      console.debug('Enhanced Animation Controller initialized');
    } catch (error) {
      console.error('Failed to initialize animation controller:', error);
    }
  }

  /**
   * Animate hero section with sophisticated effects
   */
  animateHero(config: HeroAnimationConfig): gsap.core.Timeline {
    const { title, subtitle, cta, background, decorativeElements = [] } = config;
    const masterTL = gsap.timeline();

    // Background entrance
    if (background) {
      masterTL.fromTo(background, {
        scale: 1.2,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power3.out'
      });
    }

    // Title animation with typography effects
    if (this.config.enableTypography) {
      const titleReveal = TypographyAnimations.reveal({
        element: title,
        direction: 'up',
        splitBy: 'words',
        stagger: 0.1
      });
      masterTL.add(titleReveal, 0.5);

      // Add glitch effect for impact
      const glitchTL = TypographyAnimations.glitch(title, { intensity: 5 });
      masterTL.add(glitchTL, 1.5);
    }

    // Subtitle with typewriter effect
    if (this.config.enableTypography && subtitle) {
      const subtitleText = subtitle.textContent || '';
      const typewriterTL = TypographyAnimations.typewriter({
        element: subtitle,
        text: [subtitleText],
        speed: 0.03,
        cursor: true,
        loop: false
      });
      masterTL.add(typewriterTL, 1.8);
    }

    // CTA with physics interactions
    if (this.config.enablePhysics && cta) {
      PhysicsInteractions.magnetic({
        element: cta,
        strength: 0.3,
        distance: 100
      });

      const ctaReveal = gsap.timeline()
        .fromTo(cta, {
          scale: 0,
          rotation: -180
        }, {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)'
        });
      
      masterTL.add(ctaReveal, 2.5);
    }

    // Decorative elements with fluid motion
    if (this.config.enablePhysics && decorativeElements.length > 0) {
      const fluidTL = PhysicsInteractions.fluid({
        container: document.body,
        elements: decorativeElements,
        flowDirection: 'radial',
        amplitude: 15,
        speed: 3
      });
      masterTL.add(fluidTL, 0);
    }

    this.activeAnimations.push(masterTL);
    return masterTL;
  }

  /**
   * Animate content sections with progressive disclosure
   */
  animateContentSection(config: ContentSectionConfig): gsap.core.Timeline {
    const { container, title, content, media, interactive = [] } = config;
    const sectionTL = gsap.timeline();

    // Progressive reveal of container
    if (this.config.enableProgressive) {
      const containerReveal = ProgressiveDisclosure.reveal({
        elements: [container],
        direction: 'up',
        duration: 1
      });
      sectionTL.add(containerReveal);

      // Title reveal with text animation
      if (this.config.enableTypography) {
        const titleReveal = ProgressiveDisclosure.textReveal(title, {
          splitBy: 'words',
          stagger: 0.05
        });
        sectionTL.add(titleReveal, 0.3);
      }

      // Content cascade reveal
      const contentReveal = ProgressiveDisclosure.cascadeReveal(content, {
        pattern: 'diagonal',
        stagger: 0.15
      });
      sectionTL.add(contentReveal, 0.6);
    }

    // Media animation
    if (media) {
      gsap.fromTo(media, {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: media,
          start: 'top 80%'
        }
      });
    }

    // Interactive elements with physics
    if (this.config.enablePhysics && interactive.length > 0) {
      interactive.forEach(element => {
        PhysicsInteractions.elastic({
          element,
          trigger: 'hover',
          strength: 1.05
        });
      });
    }

    this.activeAnimations.push(sectionTL);
    return sectionTL;
  }

  /**
   * Create advanced loading sequence inspired by award-winning sites
   */
  createLoadingSequence(
    loader: HTMLElement,
    content: HTMLElement[],
    options: { progress?: (percent: number) => void } = {}
  ): gsap.core.Timeline {
    const loadingTL = gsap.timeline();

    // Sophisticated loader animation
    const loaderParts = Array.from({ length: 5 }, (_, i) => {
      const part = document.createElement('div');
      part.style.cssText = `
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border-radius: 50%;
        position: absolute;
        left: ${i * 30}px;
        top: 50%;
        transform: translateY(-50%);
      `;
      loader.appendChild(part);
      return part;
    });

    // Morphing loader animation
    loadingTL.to(loaderParts, {
      scale: 1.5,
      rotation: 360,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true
    });

    // Progress simulation
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        // Trigger content reveal
        setTimeout(() => {
          this.completeLoading(loader, content);
        }, 500);
      }
      
      if (options.progress) {
        options.progress(progress);
      }
    }, 200);

    return loadingTL;
  }

  /**
   * Complete loading and reveal content
   */
  private completeLoading(loader: HTMLElement, content: HTMLElement[]): void {
    const completionTL = gsap.timeline();

    // Loader exit
    completionTL.to(loader, {
      scale: 0,
      rotation: 720,
      opacity: 0,
      duration: 1,
      ease: 'power3.in'
    });

    // Content entrance with progressive disclosure
    if (this.config.enableProgressive) {
      const contentReveal = ProgressiveDisclosure.reveal({
        elements: content,
        direction: 'scale',
        stagger: 0.1,
        duration: 0.8
      });
      completionTL.add(contentReveal, 0.5);
    }

    this.activeAnimations.push(completionTL);
  }

  /**
   * Create smooth page transitions
   */
  transitionTo(
    exitPage: HTMLElement,
    enterPage: HTMLElement,
    type: 'slide' | 'fade' | 'flip' = 'slide'
  ): gsap.core.Timeline {
    const transitionTL = ProgressiveDisclosure.pageTransition(
      exitPage,
      enterPage,
      {
        type,
        duration: 1.2,
        ease: 'power3.inOut'
      }
    );

    this.activeAnimations.push(transitionTL);
    return transitionTL;
  }

  /**
   * Configure GSAP based on performance settings
   */
  private configureGSAP(): void {
    const config = {
      high: { force3D: true as const },
      medium: { force3D: 'auto' as const },
      low: { force3D: false as const }
    };

    gsap.config(config[this.config.performance!]);
    gsap.defaults({
      duration: this.config.performance === 'low' ? 0.3 : 0.6,
      ease: this.config.performance === 'low' ? 'none' : 'power2.out'
    });
  }

  /**
   * Detect device performance capabilities
   */
  private detectPerformance(): void {
    // Check device capabilities
    const deviceMemory = navigator.deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    if (deviceMemory && deviceMemory < 4) {
      this.config.performance = 'low';
    } else if (hardwareConcurrency < 4) {
      this.config.performance = 'medium';
    }

    // Check for mobile devices
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      this.config.performance = this.config.performance === 'high' ? 'medium' : 'low';
    }
  }

  /**
   * Check for reduced motion preference
   */
  private checkReducedMotion(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      this.config.reducedMotion = true;
      this.config.enableParallax = false;
      this.config.enablePhysics = false;
    }
  }

  /**
   * Setup reduced motion fallbacks
   */
  private setupReducedMotionFallbacks(): void {
    // Disable complex animations
    gsap.defaults({
      duration: 0.1,
      ease: 'none'
    });

    console.debug('Reduced motion fallbacks configured');
  }

  /**
   * Pause all animations
   */
  pause(): void {
    this.activeAnimations.forEach(animation => animation.pause());
  }

  /**
   * Resume all animations
   */
  resume(): void {
    this.activeAnimations.forEach(animation => animation.resume());
  }

  /**
   * Cleanup and destroy all animations
   */
  destroy(): void {
    this.activeAnimations.forEach(animation => animation.kill());
    this.activeAnimations = [];
    
    PhysicsInteractions.cleanup();
    ProgressiveDisclosure.cleanup();
    
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    this.isInitialized = false;
  }

  /**
   * Animate in main content (called after loading)
   */
  animateIn(): void {
    if (!this.isInitialized) {
      console.warn('AnimationController not initialized, skipping animateIn');
      return;
    }

    // Find elements to animate
    const heroSection = document.querySelector('[data-hero]') as HTMLElement;
    const cards = document.querySelectorAll('.card-item') as NodeListOf<HTMLElement>;

    const masterTL = gsap.timeline();

    // Animate hero if found
    if (heroSection) {
      const title = heroSection.querySelector('h1') as HTMLElement;
      const subtitle = heroSection.querySelector('p') as HTMLElement;
      const bg = heroSection.querySelector('.hero-bg') as HTMLElement;

      if (title && subtitle && bg) {
        const heroConfig: HeroAnimationConfig = { title, subtitle, cta: title, background: bg };
        const heroTL = this.animateHero(heroConfig);
        masterTL.add(heroTL, 0);
      }
    }

    // Animate grid cards with stagger
    if (cards.length > 0) {
      masterTL.fromTo(cards, {
        opacity: 0,
        y: 30,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards[0].closest('.grid-section'),
          start: 'top 85%',
          once: true
        }
      }, 0.5);
    }

    this.activeAnimations.push(masterTL);
  }

  /**
   * Get animation performance metrics
   */
  getMetrics(): {
    activeAnimations: number;
    performance: string;
    reducedMotion: boolean;
    parallaxEnabled: boolean;
  } {
    return {
      activeAnimations: this.activeAnimations.length,
      performance: this.config.performance!,
      reducedMotion: this.config.reducedMotion!,
      parallaxEnabled: this.config.enableParallax!
    };
  }
}