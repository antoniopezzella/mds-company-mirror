/**
 * Physics-Based Interactions System
 * Creates realistic physics animations inspired by award-winning sites
 * Includes magnetic effects, elastic interactions, and fluid dynamics
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface MagneticConfig {
  element: HTMLElement;
  trigger?: HTMLElement;
  strength?: number;
  speed?: number;
  ease?: string;
  distance?: number;
}

export interface ElasticConfig {
  element: HTMLElement;
  trigger?: 'hover' | 'click' | 'scroll';
  strength?: number;
  duration?: number;
  ease?: string;
}

export interface FluidConfig {
  container: HTMLElement;
  elements: HTMLElement[];
  flowDirection?: 'horizontal' | 'vertical' | 'radial';
  speed?: number;
  amplitude?: number;
}

export interface GravityConfig {
  elements: HTMLElement[];
  container: HTMLElement;
  strength?: number;
  resistance?: number;
  bounds?: boolean;
}

export class PhysicsInteractions {
  private static activeAnimations = new Map<HTMLElement, gsap.core.Timeline>();

  /**
   * Creates magnetic attraction effect on elements
   */
  static magnetic(config: MagneticConfig): void {
    const { 
      element, 
      trigger = element, 
      strength = 0.3, 
      speed = 1.2, 
      ease = 'power3.out',
      distance = 150 
    } = config;

    const bounds = element.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    let isActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distanceFromCenter < distance) {
        const force = (distance - distanceFromCenter) / distance;
        const magneticX = deltaX * force * strength;
        const magneticY = deltaY * force * strength;

        gsap.to(element, {
          x: magneticX,
          y: magneticY,
          duration: speed,
          ease,
          overwrite: 'auto'
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: speed * 1.5,
          ease,
          overwrite: 'auto'
        });
      }
    };

    const handleMouseEnter = () => {
      isActive = true;
      document.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      isActive = false;
      document.removeEventListener('mousemove', handleMouseMove);
      
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: speed * 1.5,
        ease,
        overwrite: 'auto'
      });
    };

    trigger.addEventListener('mouseenter', handleMouseEnter);
    trigger.addEventListener('mouseleave', handleMouseLeave);
  }

  /**
   * Creates elastic interaction effects
   */
  static elastic(config: ElasticConfig): gsap.core.Timeline {
    const { 
      element, 
      trigger = 'hover', 
      strength = 1.2, 
      duration = 0.6, 
      ease = 'elastic.out(1, 0.3)' 
    } = config;

    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scale: strength,
      duration: duration * 0.4,
      ease: 'power2.out'
    }).to(element, {
      scale: 1,
      duration: duration * 0.6,
      ease
    });

    switch (trigger) {
      case 'hover':
        element.addEventListener('mouseenter', () => tl.restart());
        break;
      case 'click':
        element.addEventListener('click', () => tl.restart());
        break;
      case 'scroll':
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          onEnter: () => tl.restart()
        });
        break;
    }

    return tl;
  }

  /**
   * Creates fluid motion effects
   */
  static fluid(config: FluidConfig): gsap.core.Timeline {
    const { 
      elements, 
      flowDirection = 'horizontal', 
      speed = 2, 
      amplitude = 20 
    } = config;

    const tl = gsap.timeline({ repeat: -1 });

    elements.forEach((element, index) => {
      const delay = index * 0.2;
      
      switch (flowDirection) {
        case 'horizontal':
          tl.to(element, {
            x: `+=${amplitude}`,
            duration: speed,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          }, delay);
          break;
          
        case 'vertical':
          tl.to(element, {
            y: `+=${amplitude}`,
            duration: speed,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          }, delay);
          break;
          
        case 'radial': {
          const angle = (index / elements.length) * Math.PI * 2;
          const radiusX = Math.cos(angle) * amplitude;
          const radiusY = Math.sin(angle) * amplitude;

          tl.to(element, {
            x: radiusX,
            y: radiusY,
            duration: speed,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          }, delay);
          break;
        }
      }
    });

    return tl;
  }

  /**
   * Creates gravity-based physics simulation
   */
  static gravity(config: GravityConfig): gsap.core.Timeline {
    const { 
      elements, 
      container, 
      strength = 0.8, 
      bounds = true 
    } = config;

    const tl = gsap.timeline();
    const containerBounds = container.getBoundingClientRect();

    elements.forEach((element, index) => {
      const initialY = gsap.getProperty(element, 'y') as number || 0;
      const delay = index * 0.1;
      
      // Simulate gravity fall
      const fallDistance = bounds ? 
        containerBounds.height - element.getBoundingClientRect().height : 
        window.innerHeight;

      tl.to(element, {
        y: initialY + fallDistance * strength,
        duration: 2 + Math.random(),
        ease: `power2.in`,
        delay,
        onComplete: () => {
          // Bounce effect when hitting bottom
          if (bounds) {
            gsap.to(element, {
              y: initialY + fallDistance * strength - 20,
              duration: 0.3,
              ease: 'bounce.out',
              repeat: 2,
              yoyo: true
            });
          }
        }
      }, 0);
    });

    return tl;
  }

  /**
   * Creates morphing blob interactions
   */
  static blob(element: HTMLElement, options: { strength?: number; speed?: number } = {}): void {
    const { strength = 30, speed = 1 } = options;
    
    // Create SVG blob filter
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    
    svg.innerHTML = `
      <defs>
        <filter id="blob-${Date.now()}">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.02" 
            numOctaves="1" 
            result="noise"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="${strength}"
          />
        </filter>
      </defs>
    `;
    
    document.body.appendChild(svg);
    element.style.filter = `url(#${svg.querySelector('filter')?.id})`;

    // Animate turbulence
    const turbulence = svg.querySelector('feTurbulence');
    if (turbulence) {
      gsap.to(turbulence, {
        attr: { baseFrequency: '0.1' },
        duration: speed,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }
  }

  /**
   * Creates spring physics for element chains
   */
  static spring(elements: HTMLElement[], options: { stiffness?: number; damping?: number } = {}): void {
    const { stiffness = 0.1, damping = 0.8 } = options;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    elements.forEach((element, index) => {
      let currentX = 0;
      let currentY = 0;
      let velocityX = 0;
      let velocityY = 0;
      const delay = index * 0.1;

      const animate = () => {
        // Calculate target position (following mouse with delay)
        const targetX = mouseX - window.innerWidth / 2;
        const targetY = mouseY - window.innerHeight / 2;
        
        // Apply spring physics
        const forceX = (targetX - currentX) * stiffness;
        const forceY = (targetY - currentY) * stiffness;
        
        velocityX += forceX;
        velocityY += forceY;
        
        velocityX *= damping;
        velocityY *= damping;
        
        currentX += velocityX;
        currentY += velocityY;

        gsap.set(element, {
          x: currentX,
          y: currentY
        });

        requestAnimationFrame(animate);
      };

      // Start animation with delay
      setTimeout(animate, delay * 1000);
    });
  }

  /**
   * Cleanup function to stop all physics animations
   */
  static cleanup(element?: HTMLElement): void {
    if (element) {
      const animation = this.activeAnimations.get(element);
      if (animation) {
        animation.kill();
        this.activeAnimations.delete(element);
      }
    } else {
      // Cleanup all animations
      this.activeAnimations.forEach(animation => animation.kill());
      this.activeAnimations.clear();
    }
  }
}