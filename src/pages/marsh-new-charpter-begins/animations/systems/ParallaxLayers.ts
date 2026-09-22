/**
 * Advanced Parallax Layer System
 * Inspired by award-winning sites like those featured on CSS Design Awards
 * Creates depth through multiple moving layers with performance optimization
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ParallaxLayerConfig {
  element: HTMLElement;
  speed: number; // 0.1 = slow background, 1 = normal speed, 2 = fast foreground
  axis?: 'x' | 'y' | 'both';
  range?: { start: string; end: string };
  easing?: string;
  opacity?: { start: number; end: number };
  scale?: { start: number; end: number };
  rotation?: { start: number; end: number };
}

export class ParallaxSystem {
  private layers: ParallaxLayerConfig[] = [];
  private isEnabled = true;

  constructor() {
    this.bindEvents();
  }

  addLayer(config: ParallaxLayerConfig) {
    this.layers.push({
      axis: 'y',
      range: { start: 'top bottom', end: 'bottom top' },
      easing: 'none',
      ...config
    });
    this.initializeLayer(config);
  }

  private initializeLayer(config: ParallaxLayerConfig) {
    const { element, speed, axis, range, opacity, scale, rotation } = config;
    
    // Set initial transform origin for better performance
    gsap.set(element, { 
      transformOrigin: 'center center',
      willChange: 'transform'
    });

    // Create ScrollTrigger for the layer
    ScrollTrigger.create({
      trigger: element,
      start: range?.start || 'top bottom',
      end: range?.end || 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const transforms = [];

        // Apply movement based on axis and speed
        if (axis === 'y' || axis === 'both') {
          const yMove = (progress - 0.5) * speed * 100;
          transforms.push(`translateY(${yMove}px)`);
        }
        if (axis === 'x' || axis === 'both') {
          const xMove = (progress - 0.5) * speed * 50;
          transforms.push(`translateX(${xMove}px)`);
        }

        // Apply scale if defined
        if (scale) {
          const scaleValue = gsap.utils.interpolate(scale.start, scale.end, progress);
          transforms.push(`scale(${scaleValue})`);
        }

        // Apply rotation if defined
        if (rotation) {
          const rotationValue = gsap.utils.interpolate(rotation.start, rotation.end, progress);
          transforms.push(`rotate(${rotationValue}deg)`);
        }

        // Apply all transforms
        gsap.set(element, { 
          transform: transforms.join(' '),
          opacity: opacity ? gsap.utils.interpolate(opacity.start, opacity.end, progress) : undefined
        });
      }
    });
  }

  private bindEvents() {
    // Pause on reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleMotionPreference(mediaQuery);
    mediaQuery.addEventListener('change', (e) => this.handleMotionPreference(e.currentTarget as MediaQueryList));

    // Pause on low performance devices
    this.detectPerformance();
  }

  private handleMotionPreference(mediaQuery: MediaQueryList) {
    if (mediaQuery.matches) {
      this.disable();
    } else {
      this.enable();
    }
  }

  private detectPerformance() {
    // Simple performance detection
    const isLowEnd = navigator.hardwareConcurrency <= 4 ||
                    (navigator.deviceMemory ?? Infinity) <= 4;
    if (isLowEnd) {
      // Reduce complex animations for low-end devices
      this.layers.forEach(layer => {
        layer.speed *= 0.5; // Reduce movement intensity
      });
    }
  }

  enable() {
    if (this.isEnabled) return;
    this.isEnabled = true;
    ScrollTrigger.getAll().forEach(st => {
      if (this.layers.some(layer => layer.element === st.trigger)) {
        st.enable();
      }
    });
  }

  disable() {
    if (!this.isEnabled) return;
    this.isEnabled = false;
    ScrollTrigger.getAll().forEach(st => {
      if (this.layers.some(layer => layer.element === st.trigger)) {
        st.disable();
      }
    });
  }

  destroy() {
    this.layers.forEach(layer => {
      gsap.set(layer.element, { clearProps: 'all' });
    });
    ScrollTrigger.getAll().forEach(st => {
      if (this.layers.some(layer => layer.element === st.trigger)) {
        st.kill();
      }
    });
    this.layers = [];
  }
}

// Factory function for easy setup
export function createAdvancedParallax(): ParallaxSystem {
  return new ParallaxSystem();
}