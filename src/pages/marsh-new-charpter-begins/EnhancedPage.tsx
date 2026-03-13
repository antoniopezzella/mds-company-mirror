/**
 * Enhanced Landing Page with Advanced Animation System
 * Integrates award-winning animation techniques inspired by CSS Design Awards
 */

import React, { useEffect, useRef, useState } from 'react';
import { EnhancedAnimationController } from './animations/systems/EnhancedAnimationController';
import { TypographyAnimations } from './animations/systems/TypographyAnimations';
import { PhysicsInteractions } from './animations/systems/PhysicsInteractions';
import { ProgressiveDisclosure } from './animations/systems/ProgressiveDisclosure';

// Original components
import Hero from './sections/Hero/Hero';
import Video from './sections/Video/Video';
import Announcement from './sections/Announcement/Announcement';
import TransformationTimeline from './sections/TransformationTimeline/TransformationTimeline';
import BusinessPillars from './sections/BusinessPillars/BusinessPillars';
import GlobalStats from './sections/GlobalStats/GlobalStats';
import LeadershipQuote from './sections/LeadershipQuote/LeadershipQuote';
import ClientOutcomes from './sections/ClientOutcomes/ClientOutcomes';
import NewsroomCTA from './sections/NewsroomCTA/NewsroomCTA';

export interface EnhancedMarshPageProps {
  enableAdvancedAnimations?: boolean;
  animationConfig?: {
    performance?: 'high' | 'medium' | 'low';
    enableParallax?: boolean;
    enableTypography?: boolean;
    enablePhysics?: boolean;
    enableProgressive?: boolean;
  };
}

export const EnhancedMarshPage: React.FC<EnhancedMarshPageProps> = ({
  enableAdvancedAnimations = true,
  animationConfig = {}
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const animationController = useRef<EnhancedAnimationController | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Initialize animation system
  useEffect(() => {
    if (!enableAdvancedAnimations) return;

    const controller = new EnhancedAnimationController({
      enableParallax: true,
      enableTypography: true,
      enablePhysics: true,
      enableProgressive: true,
      performance: 'high',
      ...animationConfig
    });

    animationController.current = controller;

    const initAnimations = async () => {
      await controller.init();
      
      // Create sophisticated loading sequence
      if (pageRef.current) {
        const loader = document.querySelector('.enhanced-loader') as HTMLElement;
        const mainContent = document.querySelector('.main-content') as HTMLElement;
        
        if (loader && mainContent) {
          controller.createLoadingSequence(
            loader,
            Array.from(mainContent.children) as HTMLElement[],
            {
              progress: (percent) => {
                setLoadingProgress(percent);
                if (percent >= 100) {
                  setTimeout(() => setIsLoading(false), 500);
                }
              }
            }
          );
        }
      }
    };

    initAnimations();

    return () => {
      controller.destroy();
    };
  }, [enableAdvancedAnimations, animationConfig]);

  // Setup enhanced section animations
  useEffect(() => {
    if (!enableAdvancedAnimations || !animationController.current || isLoading) return;

    const controller = animationController.current;
    
    // Enhanced Hero Animation
    const heroSection = document.querySelector('[data-section="hero"]') as HTMLElement;
    const heroTitle = heroSection?.querySelector('h1, h2') as HTMLElement;
    const heroSubtitle = heroSection?.querySelector('[data-hero-tagline]') as HTMLElement;
    const heroCTA = heroSection?.querySelector('button, a[role="button"]') as HTMLElement;
    const heroBackground = heroSection?.querySelector('[class*="bg"]') as HTMLElement;
    
    if (heroSection && heroTitle) {
      controller.animateHero({
        title: heroTitle,
        subtitle: heroSubtitle,
        cta: heroCTA,
        background: heroBackground,
        decorativeElements: Array.from(heroSection.querySelectorAll('[aria-hidden="true"]')) as HTMLElement[]
      });
    }

    // Enhanced Section Animations
    const sections = document.querySelectorAll('section[class*="section"]');
    sections.forEach((section, index) => {
      if (index === 0) return; // Skip hero, already handled
      
      const sectionEl = section as HTMLElement;
      const title = sectionEl.querySelector('h2, h3') as HTMLElement;
      const content = Array.from(sectionEl.querySelectorAll('p, .pillar-card, .stat-item, .quote-text')) as HTMLElement[];
      const media = sectionEl.querySelector('img, video, [class*="media"]') as HTMLElement;
      const interactive = Array.from(sectionEl.querySelectorAll('button, [role="button"], a')) as HTMLElement[];

      if (title && content.length > 0) {
        controller.animateContentSection({
          container: sectionEl,
          title,
          content,
          media,
          interactive
        });
      }
    });

  }, [enableAdvancedAnimations, isLoading]);

  // Add physics interactions to specific elements
  useEffect(() => {
    if (!enableAdvancedAnimations || isLoading) return;

    // Magnetic effect for CTAs
    const ctaButtons = document.querySelectorAll('button[data-variant="primary"], .hero button');
    ctaButtons.forEach(button => {
      PhysicsInteractions.magnetic({
        element: button as HTMLElement,
        strength: 0.3,
        distance: 120,
        speed: 1.2
      });
    });

    // Elastic hover for cards
    const cards = document.querySelectorAll('.pillar-card, .stat-item, .outcome-card');
    cards.forEach(card => {
      PhysicsInteractions.elastic({
        element: card as HTMLElement,
        trigger: 'hover',
        strength: 1.05,
        duration: 0.4
      });
    });

    // Fluid motion for decorative elements
    const decorativeElements = Array.from(document.querySelectorAll('[aria-hidden="true"]')) as HTMLElement[];
    if (decorativeElements.length > 0) {
      PhysicsInteractions.fluid({
        container: document.body,
        elements: decorativeElements,
        flowDirection: 'radial',
        amplitude: 10,
        speed: 4
      });
    }

  }, [enableAdvancedAnimations, isLoading]);

  // Enhanced typography animations for key text
  useEffect(() => {
    if (!enableAdvancedAnimations || isLoading) return;

    // Typewriter effect for hero headline
    const heroHeadline = document.querySelector('[id*="hero-heading"]') as HTMLElement;
    if (heroHeadline) {
      const originalText = heroHeadline.textContent || '';
      TypographyAnimations.typewriter({
        element: heroHeadline,
        text: [originalText],
        speed: 0.03,
        cursor: false,
        scramble: true
      });
    }

    // Reveal animations for section titles
    const sectionTitles = document.querySelectorAll('h2, h3');
    sectionTitles.forEach((title, index) => {
      if (index === 0) return; // Skip hero title
      
      setTimeout(() => {
        TypographyAnimations.reveal({
          element: title as HTMLElement,
          direction: 'up',
          splitBy: 'words',
          stagger: 0.1
        });
      }, index * 200);
    });

  }, [enableAdvancedAnimations, isLoading]);

  // Progressive disclosure for content sections
  useEffect(() => {
    if (!enableAdvancedAnimations || isLoading) return;

    // Cascade reveal for business pillars
    const pillarCards = Array.from(document.querySelectorAll('.pillar-card')) as HTMLElement[];
    if (pillarCards.length > 0) {
      ProgressiveDisclosure.cascadeReveal(pillarCards, {
        pattern: 'diagonal',
        stagger: 0.15,
        duration: 0.8
      });
    }

    // Batch reveal for stats
    const statItems = Array.from(document.querySelectorAll('.stat-item')) as HTMLElement[];
    if (statItems.length > 0) {
      ProgressiveDisclosure.batchReveal(statItems, 3, {
        triggerDistance: 150,
        revealDuration: 0.6,
        stagger: 0.1
      });
    }

    // Text reveal for long content
    const contentParagraphs = Array.from(document.querySelectorAll('section p')) as HTMLElement[];
    contentParagraphs.forEach(p => {
      ProgressiveDisclosure.textReveal(p, {
        splitBy: 'words',
        stagger: 0.03,
        duration: 0.5
      });
    });

  }, [enableAdvancedAnimations, isLoading]);

  if (isLoading && enableAdvancedAnimations) {
    return (
      <div className="enhanced-loader" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 9999
      }}>
        <div style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          Marsh
        </div>
        
        <div style={{
          width: '300px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${loadingProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          marginTop: '1rem',
          fontSize: '0.9rem'
        }}>
          {Math.round(loadingProgress)}%
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="enhanced-marsh-page">
      <div className="main-content">
        {/* Add data attributes for enhanced animations */}
        <div data-section="hero">
          <Hero />
        </div>
        
        <div data-section="video">
          <Video />
        </div>
        
        <div data-section="announcement">
          <Announcement />
        </div>
        
        <div data-section="timeline">
          <TransformationTimeline />
        </div>
        
        <div data-section="pillars">
          <BusinessPillars />
        </div>
        
        <div data-section="stats">
          <GlobalStats />
        </div>
        
        <div data-section="quote">
          <LeadershipQuote />
        </div>
        
        <div data-section="outcomes">
          <ClientOutcomes />
        </div>
        
        <div data-section="cta">
          <NewsroomCTA />
        </div>
      </div>
      
      {/* Enhanced floating action menu */}
      <div className="floating-actions" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000
      }}>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
      
      {/* Performance debug info (development only) */}
      {process.env.NODE_ENV === 'development' && animationController.current && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          zIndex: 1001
        }}>
          Animation Metrics: {JSON.stringify(animationController.current.getMetrics())}
        </div>
      )}
    </div>
  );
};

export default EnhancedMarshPage;