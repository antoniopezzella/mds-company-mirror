/**
 * Morphing Typography System
 * Creates dynamic text animations inspired by award-winning sites
 * Includes word reveals, character animations, and text morphing effects
 */

import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register TextPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

export interface TypewriterConfig {
  element: HTMLElement;
  text: string[];
  speed?: number;
  delay?: number;
  cursor?: boolean;
  loop?: boolean;
  scramble?: boolean;
}

export interface RevealConfig {
  element: HTMLElement;
  trigger?: HTMLElement;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
  splitBy?: 'chars' | 'words' | 'lines';
  ease?: string;
  duration?: number;
}

export interface MorphConfig {
  duration?: number;
  stagger?: number;
  ease?: string;
}

export interface GlitchConfig {
  duration?: number;
  intensity?: number;
}

export class TypographyAnimations {
  
  /**
   * Creates a typewriter effect with multiple text strings
   */
  static typewriter(config: TypewriterConfig): gsap.core.Timeline {
    const { element, text, speed = 0.05, delay = 1, cursor = true, loop = true, scramble = false } = config;
    const tl = gsap.timeline({ repeat: loop ? -1 : 0 });

    // Add cursor if enabled
    if (cursor) {
      const cursorSpan = document.createElement('span');
      cursorSpan.textContent = '|';
      cursorSpan.className = 'typewriter-cursor';
      element.appendChild(cursorSpan);
      
      // Animate cursor blink
      gsap.to(cursorSpan, { 
        opacity: 0, 
        duration: 0.8, 
        repeat: -1, 
        yoyo: true, 
        ease: 'power2.inOut' 
      });
    }

    text.forEach((string, index) => {
      if (scramble) {
        // Scramble effect before revealing final text
        tl.to(element, {
          duration: 0.8,
          text: { value: this.generateScrambledText(string), delimiter: '' },
          ease: 'none'
        }, index * delay);
      }
      
      // Type the actual text
      tl.to(element, {
        duration: string.length * speed,
        text: { value: string, delimiter: '' },
        ease: 'none'
      }, index * delay + (scramble ? 0.8 : 0));

      // Pause before next text
      if (index < text.length - 1) {
        tl.to({}, { duration: delay }, '+=0.5');
        
        // Erase current text
        tl.to(element, {
          duration: string.length * speed * 0.5,
          text: { value: '', delimiter: '' },
          ease: 'none'
        });
      }
    });

    return tl;
  }

  /**
   * Creates a reveal animation for text elements
   */
  static reveal(config: RevealConfig): gsap.core.Timeline {
    const { 
      element, 
      trigger = element, 
      direction = 'up', 
      stagger = 0.1, 
      splitBy = 'words',
      ease = 'power3.out',
      duration = 0.8
    } = config;

    const tl = gsap.timeline();

    // Split text into elements
    const textElements = this.splitText(element, splitBy);
    
    // Set initial state
    const initialY = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;
    const initialX = direction === 'left' ? 50 : direction === 'right' ? -50 : 0;
    
    gsap.set(textElements, {
      opacity: 0,
      y: initialY,
      x: initialX,
      rotationX: direction === 'up' || direction === 'down' ? 90 : 0
    });

    // Create reveal animation
    tl.to(textElements, {
      opacity: 1,
      y: 0,
      x: 0,
      rotationX: 0,
      duration,
      stagger,
      ease
    });

    // Trigger on scroll
    ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      animation: tl,
      toggleActions: 'play none none reverse'
    });

    return tl;
  }

  /**
   * Creates a morphing effect between different text states
   */
  static morph(element: HTMLElement, texts: string[], options: MorphConfig = {}): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1 });
    const { duration = 1, stagger = 0.1, ease = 'power2.inOut' } = options;

    texts.forEach((text, index) => {
      // Split current and next text into characters
      const chars = text.split('');
      const nextText = texts[(index + 1) % texts.length];
      const nextChars = nextText.split('');
      const maxLength = Math.max(chars.length, nextChars.length);

      // Create character elements if they don't exist
      if (element.children.length === 0) {
        chars.forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          element.appendChild(span);
        });
      }

      // Morph each character
      for (let i = 0; i < maxLength; i++) {
        const charElement = element.children[i] as HTMLElement;
        if (!charElement) {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          element.appendChild(span);
        }

        const targetChar = nextChars[i] || '';
        
        tl.to(charElement, {
          rotationY: 90,
          duration: duration / 2,
          ease,
          onComplete: () => {
            if (charElement) charElement.textContent = targetChar;
          }
        }, index * 2 + i * stagger)
        .to(charElement, {
          rotationY: 0,
          duration: duration / 2,
          ease
        }, index * 2 + duration / 2 + i * stagger);
      }

      tl.to({}, { duration: 1.5 }); // Pause between morphs
    });

    return tl;
  }

  /**
   * Creates a glitch effect on text
   */
  static glitch(element: HTMLElement, options: GlitchConfig = {}): gsap.core.Timeline {
    const { intensity = 10 } = options;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    // Create glitch layers
    const glitchLayer1 = element.cloneNode(true) as HTMLElement;
    const glitchLayer2 = element.cloneNode(true) as HTMLElement;
    
    glitchLayer1.style.position = 'absolute';
    glitchLayer2.style.position = 'absolute';
    glitchLayer1.style.color = '#ff0000';
    glitchLayer2.style.color = '#00ffff';
    glitchLayer1.style.mixBlendMode = 'screen';
    glitchLayer2.style.mixBlendMode = 'screen';
    
    element.style.position = 'relative';
    element.appendChild(glitchLayer1);
    element.appendChild(glitchLayer2);

    // Animate glitch layers
    tl.set([glitchLayer1, glitchLayer2], { opacity: 0 })
      .to(glitchLayer1, {
        opacity: 0.8,
        x: () => gsap.utils.random(-intensity, intensity),
        duration: 0.1,
        repeat: 5,
        yoyo: true
      })
      .to(glitchLayer2, {
        opacity: 0.8,
        x: () => gsap.utils.random(-intensity, intensity),
        duration: 0.15,
        repeat: 3,
        yoyo: true
      }, 0.1)
      .to([glitchLayer1, glitchLayer2], {
        opacity: 0,
        duration: 0.1
      });

    return tl;
  }

  /**
   * Utility: Split text into individual elements
   */
  private static splitText(element: HTMLElement, splitBy: 'chars' | 'words' | 'lines'): HTMLElement[] {
    const text = element.textContent || '';
    element.innerHTML = '';
    
    let parts: string[] = [];
    
    switch (splitBy) {
      case 'chars':
        parts = text.split('');
        break;
      case 'words':
        parts = text.split(' ');
        break;
      case 'lines':
        parts = text.split('\n');
        break;
    }
    
    return parts.map((part, index) => {
      const span = document.createElement('span');
      span.textContent = splitBy === 'words' && index < parts.length - 1 ? part + ' ' : part;
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
  }

  /**
   * Utility: Generate scrambled text for typewriter effect
   */
  private static generateScrambledText(text: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    return text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
}