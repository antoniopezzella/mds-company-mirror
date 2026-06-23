import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from './marsh-new-charpter-begins/animations/hooks/useReducedMotion';
import { useScrollTrigger } from './marsh-new-charpter-begins/animations/hooks/useScrollTrigger';
import { durations, eases } from './marsh-new-charpter-begins/animations/motion/tokens';
import { registerTimeline } from './marsh-new-charpter-begins/animations/motion/controller';
import { gsap } from './marsh-new-charpter-begins/animations/gsap.client';
import './MarshCorporate.scss';

// Text splitting utility for word-by-word animation
const splitTextIntoWords = (element: HTMLElement): HTMLSpanElement[] => {
  const text = element.textContent || '';
  const words = text.trim().split(/\s+/);
  element.innerHTML = '';
  
  return words.map((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(10px)';
    
    element.appendChild(span);
    
    // Add space after word (except last)
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
    
    return span;
  });
};

const MarshCorporate: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);
  const businessSectionRef = useRef<HTMLElement>(null);
  const scrollIconRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  // Video autoplay handler
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => console.info('✅ Video playing'))
        .catch((error) => console.error('❌ Video autoplay failed:', error));
    }
  }, []);

  // Hero content reveal animation with word-by-word text and M formation
  useScrollTrigger({
    scope: heroRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      if (!contentBoxRef.current) return;

      const timeline = gsap.timeline({ 
        delay: durations.sm,
        defaults: { ease: eases.emphasized }
      });
      
      registerTimeline('marsh-corporate-hero-enhanced', timeline);
      
      // 1. Content box entrance
      timeline.from(contentBoxRef.current, {
        y: 60,
        opacity: 0,
        duration: durations.lg,
      }, 0);
      
      // 2. Small title
      timeline.from(
        contentBoxRef.current.querySelector('.hero-small-title'),
        {
          y: 20,
          opacity: 0,
          duration: durations.md,
        },
        0.3
      );

      // 3. Headline - word by word animation
      const headlineEl = contentBoxRef.current.querySelector('.hero-main-headline');
      if (headlineEl && !prefersReduced) {
        const words = splitTextIntoWords(headlineEl as HTMLElement);
        
        timeline.to(words, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: durations.sm,
          ease: eases.entrance,
        }, 0.8);
      } else if (headlineEl && prefersReduced) {
        // Fallback: show complete text immediately
        timeline.from(headlineEl, {
          opacity: 0,
          y: 20,
          duration: durations.md,
        }, 0.8);
      }

      // 4. CTA Button
      timeline.from(
        contentBoxRef.current.querySelector('.hero-cta'),
        {
          y: 20,
          opacity: 0,
          scale: 0.95,
          duration: durations.md,
        },
        2.5
      );

      // 5. M Logo Formation - arrows slide in from sides
      const leftArrow = contentBoxRef.current.querySelector('.m-arrow-left');
      const rightArrow = contentBoxRef.current.querySelector('.m-arrow-right');
      
      if (leftArrow && rightArrow && !prefersReduced) {
        // Set initial positions (off-screen to the sides)
        gsap.set(leftArrow, { 
          xPercent: -150, 
          opacity: 0, 
          rotation: -10,
          transformOrigin: 'center center'
        });
        gsap.set(rightArrow, { 
          xPercent: 150, 
          opacity: 0, 
          rotation: 10,
          transformOrigin: 'center center'
        });
        
        // Animate to final position (meet in center)
        timeline.to(leftArrow, {
          xPercent: 0,
          opacity: 1,
          rotation: 0,
          duration: durations.lg,
          ease: 'back.out(1.7)',
        }, 3.0);
        
        timeline.to(rightArrow, {
          xPercent: 0,
          opacity: 1,
          rotation: 0,
          duration: durations.lg,
          ease: 'back.out(1.7)',
        }, 3.1); // Slight stagger
      } else if (leftArrow && rightArrow && prefersReduced) {
        // Fallback: fade in complete logo
        timeline.from([leftArrow, rightArrow], {
          opacity: 0,
          duration: durations.md,
        }, 2.5);
      }

      // 6. Subtitle
      timeline.from(
        contentBoxRef.current.querySelector('.hero-subtitle'),
        {
          y: 20,
          opacity: 0,
          duration: durations.md,
        },
        4.2
      );
    }
  });

  // Scroll indicator animation (respects reduced motion)
  useScrollTrigger({
    scope: heroRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      if (!scrollIconRef.current) return;

      // Initial reveal
      gsap.from(scrollIconRef.current, {
        opacity: 0,
        y: -20,
        duration: durations.lg,
        delay: 1.8,
        ease: eases.entrance,
      });
      
      // Continuous bounce (only if motion enabled)
      if (!prefersReduced) {
        gsap.to(scrollIconRef.current, {
          y: -10,
          duration: 1.2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }
  });

  // Blue content box AND business section slide up together over video on scroll
  useScrollTrigger({
    scope: heroRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      if (!contentBoxRef.current || !businessSectionRef.current || !heroRef.current) return;

      // Animate both elements together
      const elementsToMove = [contentBoxRef.current, businessSectionRef.current];
      
      gsap.set(elementsToMove, { willChange: 'transform' });
      gsap.to(elementsToMove, {
        yPercent: -30, // Both slide up 30% as user scrolls
        ease: eases.none,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8, // Smooth scrub
          onLeave: () => {
            gsap.set(elementsToMove, { willChange: 'auto' });
          }
        },
      });
    },
  });

  // Video and M logo parallax on scroll
  useScrollTrigger({
    scope: heroRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      if (!videoRef.current || !heroRef.current) return;

      // Video parallax
      gsap.set(videoRef.current, { willChange: 'transform' });
      gsap.to(videoRef.current, {
        yPercent: 15,
        ease: eases.none,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onLeave: () => {
            gsap.set(videoRef.current, { willChange: 'auto' });
          }
        },
      });
      
      // M Logo parallax (moves more prominently)
      const mLogo = contentBoxRef.current?.querySelector('.hero-m-logo');
      if (mLogo) {
        gsap.to(mLogo, {
          yPercent: 30,
          scale: 0.95,
          opacity: 0.7,
          ease: eases.none,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }
    }
  });

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <main className="marsh-corporate">
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        {/* Background Video */}
        <div className="hero-bg">
          <video
            ref={videoRef}
            className="hero-bg-video"
            src="/video/2818546-uhd_3840_2160_24fps.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ visibility: 'visible', opacity: 1 }}
            onError={(e: React.SyntheticEvent<HTMLVideoElement>) => {
              console.error('Video error event:', e);
              console.error('Video src:', videoRef.current?.currentSrc);
              console.error('Video readyState:', videoRef.current?.readyState);
              console.error('Video networkState:', videoRef.current?.networkState);
            }}
            onLoadStart={() => console.info('✓ Video loading started')}
            onLoadedMetadata={() => console.info('✓ Video metadata loaded')}
            onLoadedData={() => console.info('✓ Video data loaded')}
            onCanPlay={() => console.info('✓ Video can play')}
            onCanPlayThrough={() => console.info('✓ Video can play through')}
            onPlay={() => console.info('✓ Video is playing!')}
            onPause={() => console.info('⚠ Video paused')}
            onWaiting={() => console.info('⏳ Video waiting/buffering')}
          />
        </div>

        {/* Hero Content - Light Blue Box */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div ref={contentBoxRef} className="hero-content-box">
                {/* Content Grid */}
                <div className="hero-content-grid">
                  {/* Left Content */}
                  <div className="hero-left-content">
                    {/* Small Title */}
                    <p className="hero-small-title">Marsh McLennan is now Marsh Risk</p>

                    {/* Main Headline */}
                    <h1 className="hero-main-headline">
                      One Marsh brand, delivering integrated solutions across risk, strategy, and people.
                    </h1>

                    {/* CTA Button */}
                    <button className="hero-cta" type="button">
                      Learn more
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Right Content - Large M Logo */}
                  <div className="hero-right-content">
                    <div className="hero-m-logo" aria-label="Marsh Logo">
                      <svg width="214" height="219" viewBox="0 0 292 300" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                        {/* Left arrow - animates from left */}
                        <g className="m-arrow-left">
                          <path d="M54.719 300H0V0H6.04454L145.705 206.151H141.251L54.719 164.793V300Z" fill="#001047"/>
                        </g>
                        {/* Right arrow - animates from right */}
                        <g className="m-arrow-right">
                          <path d="M236.988 300H291.707V0H285.662L146.002 206.151H150.456L236.988 164.793V300Z" fill="#001047"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Subtitle at bottom */}
                <p className="hero-subtitle">
                  Access the collective expertise of our four businesses through one expanded brand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          ref={scrollIconRef}
          className="scroll-indicator"
          onClick={handleScrollDown}
          aria-label="Scroll to content"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Business Pillars Section */}
      <section ref={businessSectionRef} className="business-pillars-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <p className="section-intro">
                Access the collective expertise of our four businesses.
              </p>
              
              <div className="business-cards-grid">
                {/* MARSH Card */}
                <div className="business-card">
                  <div className="business-card-content">
                    <div className="business-logo">
                      <span className="business-logo-text">MARSH</span>
                    </div>
                    <h3 className="business-title">Insurance broking and risk management</h3>
                    <p className="business-description">
                      Organizations need to excel at quantifying and managing risk in order to grow and adapt.
                    </p>
                  </div>
                  <button className="business-btn">
                    Explore capabilities
                  </button>
                </div>

                <div className="card-divider"></div>

                {/* GUY CARPENTER Card */}
                <div className="business-card">
                  <div className="business-card-content">
                    <div className="business-logo">
                      <span className="business-logo-text">GUY CARPENTER</span>
                    </div>
                    <h3 className="business-title">Reinsurance and capital strategies</h3>
                    <p className="business-description">
                      Specialized expertise and innovations in risk transfer, capital, analytics and actuarial science can help power profitable growth
                    </p>
                  </div>
                  <button className="business-btn">
                    Explore capabilities
                  </button>
                </div>

                <div className="card-divider"></div>

                {/* MERCER Card */}
                <div className="business-card">
                  <div className="business-card-content">
                    <div className="business-logo">
                      <span className="business-logo-text">MERCER</span>
                    </div>
                    <h3 className="business-title">People and investments</h3>
                    <p className="business-description">
                      Companies' most vital assets are their people – who thrive with health, wealth and career support.
                    </p>
                  </div>
                  <button className="business-btn">
                    Explore capabilities
                  </button>
                </div>

                <div className="card-divider"></div>

                {/* OLIVER WYMAN Card */}
                <div className="business-card">
                  <div className="business-card-content">
                    <div className="business-logo">
                      <span className="business-logo-text">OLIVER WYMAN</span>
                    </div>
                    <h3 className="business-title">Management consulting</h3>
                    <p className="business-description">
                      Deep industry capabilities, expertise and relationships cut the learning curve for growing and competitive companies.
                    </p>
                  </div>
                  <button className="business-btn">
                    Explore capabilities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="global-stats-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <p className="stats-intro">
                With more than 90,000 colleagues based all over the world, our shared purpose, to build the confidence to thrive through the power of perspective, has never been more important or more relevant. We are in business to expand what's possible for our clients and for each other.
              </p>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">130</div>
                  <div className="stat-label">Offices in countries</div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">90,000+</div>
                  <div className="stat-label">Global colleagues</div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">150</div>
                  <div className="stat-label">Years history</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="our-journey-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="journey-header">
                <h2 className="journey-title">Our journey</h2>
                <p className="journey-subtitle">Thrive through the power of perspective.</p>
              </div>

              <div className="journey-cards">
                <div className="journey-card">
                  <div className="journey-card-image">
                    <img src="/images/journey-1.jpg" alt="Business and Client Services" />
                  </div>
                  <div className="journey-card-content">
                    <h3 className="journey-card-title">Business and Client Services</h3>
                    <p className="journey-card-description">
                      Delivering innovative solutions and exceptional service to help our clients succeed in an ever-changing world.
                    </p>
                  </div>
                </div>

                <div className="journey-card">
                  <div className="journey-card-image">
                    <img src="/images/journey-2.jpg" alt="Bloomberg global knowledge partnership" />
                  </div>
                  <div className="journey-card-content">
                    <h3 className="journey-card-title">Bloomberg global knowledge partnership</h3>
                    <p className="journey-card-description">
                      Partnering with industry leaders to provide comprehensive insights and data-driven solutions.
                    </p>
                  </div>
                </div>

                <div className="journey-card">
                  <div className="journey-card-image">
                    <img src="/images/journey-3.jpg" alt="The new Marsh brand" />
                  </div>
                  <div className="journey-card-content">
                    <h3 className="journey-card-title">The new Marsh brand</h3>
                    <p className="journey-card-description">
                      Evolving our identity to reflect our commitment to innovation, excellence, and client success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2 className="faq-title">Frequently asked questions</h2>
              <p className="faq-intro">
                Find answers to common questions about our services, partnerships, and approach to risk management.
              </p>

              <div className="faq-accordions">
                <div className="faq-accordion">
                  <button className="faq-accordion-header" aria-expanded="false">
                    <span className="faq-question">What services does Marsh provide?</span>
                    <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="faq-accordion-content">
                    <p>Marsh provides comprehensive risk management, insurance broking, and advisory services to help organizations protect their assets, manage uncertainty, and achieve their strategic objectives.</p>
                  </div>
                </div>

                <div className="faq-accordion">
                  <button className="faq-accordion-header" aria-expanded="false">
                    <span className="faq-question">How does Marsh help businesses manage risk?</span>
                    <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="faq-accordion-content">
                    <p>We combine deep industry expertise, data analytics, and innovative technology to identify, assess, and mitigate risks across your organization, helping you make informed decisions.</p>
                  </div>
                </div>

                <div className="faq-accordion">
                  <button className="faq-accordion-header" aria-expanded="false">
                    <span className="faq-question">What industries does Marsh serve?</span>
                    <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="faq-accordion-content">
                    <p>Marsh serves clients across virtually every industry, including financial services, healthcare, manufacturing, technology, energy, and more, with specialized expertise tailored to each sector.</p>
                  </div>
                </div>

                <div className="faq-accordion">
                  <button className="faq-accordion-header" aria-expanded="false">
                    <span className="faq-question">How can I contact Marsh for a consultation?</span>
                    <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="faq-accordion-content">
                    <p>You can reach out to us through our website contact form, call our offices directly, or connect with one of our representatives through our business unit pages.</p>
                  </div>
                </div>

                <div className="faq-accordion">
                  <button className="faq-accordion-header" aria-expanded="false">
                    <span className="faq-question">What makes Marsh different from other brokers?</span>
                    <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="faq-accordion-content">
                    <p>Our global reach, deep industry insights, innovative risk solutions, and commitment to client success set us apart. With 150 years of experience, we bring unmatched expertise and resources to every engagement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Investors Section */}
      <section className="investors-section">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="investors-content">
                <h2 className="investors-title">For investors</h2>
                <p className="investors-description">
                  Stay informed about Marsh McLennan's financial performance, corporate governance, and strategic initiatives. Access investor resources, reports, and information about our commitment to creating long-term value for our shareholders.
                </p>
                <button className="investors-cta">
                  Learn more
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="investors-image">
                <img src="/images/investors.jpg" alt="Investor Relations" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="marsh-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="footer-main">
                <div className="footer-brand">
                  <div className="footer-logo">
                    <span className="footer-logo-text">MARSH</span>
                  </div>
                  <p className="footer-baseline">
                    Building the confidence to thrive through the power of perspective.
                  </p>
                </div>

                <div className="footer-links">
                  <div className="footer-column">
                    <h4 className="footer-column-title">Our Businesses</h4>
                    <ul className="footer-list">
                      <li><a href="#marsh">Marsh</a></li>
                      <li><a href="#guy-carpenter">Guy Carpenter</a></li>
                      <li><a href="#mercer">Mercer</a></li>
                      <li><a href="#oliver-wyman">Oliver Wyman</a></li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h4 className="footer-column-title">About Us</h4>
                    <ul className="footer-list">
                      <li><a href="#our-story">Our Story</a></li>
                      <li><a href="#leadership">Leadership</a></li>
                      <li><a href="#careers">Careers</a></li>
                      <li><a href="#newsroom">Newsroom</a></li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h4 className="footer-column-title">Resources</h4>
                    <ul className="footer-list">
                      <li><a href="#insights">Insights</a></li>
                      <li><a href="#reports">Reports</a></li>
                      <li><a href="#events">Events</a></li>
                      <li><a href="#contact">Contact</a></li>
                    </ul>
                  </div>
                </div>

                <div className="footer-social">
                  <a href="#linkedin" className="footer-social-link" aria-label="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a href="#twitter" className="footer-social-link" aria-label="Twitter">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46 6c-.85.38-1.78.64-2.75.76a4.86 4.86 0 0 0 2.12-2.68 9.64 9.64 0 0 1-3.04 1.17 4.8 4.8 0 0 0-8.18 4.37A13.6 13.6 0 0 1 2.05 4.77a4.8 4.8 0 0 0 1.49 6.4 4.77 4.77 0 0 1-2.18-.6v.06a4.8 4.8 0 0 0 3.85 4.7 4.77 4.77 0 0 1-2.17.08 4.8 4.8 0 0 0 4.48 3.33A9.64 9.64 0 0 1 2 20.5a13.56 13.56 0 0 0 7.29 2.14c8.75 0 13.54-7.25 13.54-13.54 0-.21 0-.42-.01-.62a9.68 9.68 0 0 0 2.37-2.48z"/>
                    </svg>
                  </a>
                  <a href="#instagram" className="footer-social-link" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="footer-bottom">
                <div className="footer-legal">
                  <a href="#privacy">Privacy Policy</a>
                  <span className="footer-divider">|</span>
                  <a href="#terms">Terms of Use</a>
                  <span className="footer-divider">|</span>
                  <a href="#cookies">Cookie Settings</a>
                </div>
                <p className="footer-copyright">
                  © {new Date().getFullYear()} Marsh McLennan. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default MarshCorporate;
