import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MarshCorporate.css';

gsap.registerPlugin(ScrollTrigger);

const MarshCorporate: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content reveal animation
      if (contentRef.current) {
        const timeline = gsap.timeline({ delay: 0.3 });
        
        timeline.from(contentRef.current.querySelector('.hero-title'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
        
        timeline.from(
          contentRef.current.querySelector('.hero-description'),
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );

        timeline.from(
          contentRef.current.querySelector('.hero-cta'),
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );

        timeline.from(
          contentRef.current.querySelector('.marsh-logo'),
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      // Scroll icon animation
      if (scrollIconRef.current) {
        gsap.from(scrollIconRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          delay: 1.5,
          ease: 'power2.out',
        });
        
        // Continuous bounce animation
        gsap.to(scrollIconRef.current, {
          y: -10,
          duration: 1,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Video parallax on scroll
      if (videoRef.current && heroRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <main className="marsh-corporate">
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        {/* Background Video with Gradient Overlay */}
        <div className="hero-bg">
          <video
            ref={videoRef}
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/marsh-corporate-hero.mp4" type="video/mp4" />
            <source src="/marsh-corporate-hero.webm" type="video/webm" />
          </video>
          <div className="hero-bg-gradient" />
        </div>

        {/* Hero Content */}
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 col-xl-9">
              <div ref={contentRef} className="hero-content">
                {/* Hero Title */}
                <h1 className="hero-title">Marsh McLennan is now Marsh</h1>

                {/* Hero Description */}
                <p className="hero-description">
                  We have simplified our name and structure to reflect how we work.
                </p>

                {/* CTA Button */}
                <button className="hero-cta" type="button">
                  Learn More
                </button>

                {/* Brand Logo - positioned on the right */}
                <figure className="marsh-logo">
                  <svg
                    width="214"
                    height="219"
                    viewBox="0 0 214 219"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Marsh"
                  >
                    <title>Marsh</title>
                    {/* Placeholder - Replace with actual Figma exported logo paths */}
                    <rect width="214" height="219" fill="white" fillOpacity="0.15" rx="4" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="white"
                      fontSize="32"
                      fontWeight="700"
                      letterSpacing="0.02em"
                    >
                      MARSH
                    </text>
                  </svg>
                </figure>
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
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M20 26V14M20 26L15 21M20 26L25 21"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Future Sections Placeholder */}
      <section className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div style={{ minHeight: '50vh', padding: '4rem 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#001047' }}>
                  Additional Content Sections
                </h2>
                <p style={{ color: '#666', fontSize: '1.125rem' }}>
                  More sections will be added here following the Figma design
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MarshCorporate;
