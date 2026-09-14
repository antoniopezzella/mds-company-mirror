import React, { useRef } from 'react';
import { Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';
import { getRoleColor } from '../theme/roles';
import { AIAgentBot } from '../components/AIAgentBot';
import '../global.scss';
import './MarshCorporateNew.scss';

/**
 * Marsh Corporate redesign per Figma 2753:2226
 * New brand identity: "Marsh McLennan is now Marsh"
 * Sections: Hero, Brand Section, Map Content, Press, FAQ, Connect CTA, Footer
 */
const MarshCorporateNew: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const pressRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);

  return (
    <>
    {/* TEST: This should be visible */}
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: 'red',
      color: 'white',
      padding: '20px',
      zIndex: 999999,
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold'
    }}>
      TEST BOX - Can you see this?
    </div>
    
    <main className="marsh-corporate-new">
        {/* Hero Section */}
        <section ref={heroRef} className="hero-section">
          <div className="mds-legacy-container-fluid hero-container">
            <div className="mds-legacy-row mds-legacy-g-0 hero-row">
              {/* Left Column - 6 cols */}
              <div className="mds-legacy-col-12 mds-legacy-col-lg-6 hero-text-col">
                <div className="hero-content">
                  <div className="hero-text-content">
                    <Typography variant="h6" className="hero-eyebrow">
                      Marsh McLennan is now Marsh.
                    </Typography>
                    <Typography variant="h1" className="hero-headline">
                      One Marsh brand, delivering integrated solutions across risk, strategy, and people.
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    size="large"
                    className="hero-cta"
                    sx={{
                      backgroundColor: getRoleColor('interactive.primary'),
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: getRoleColor('interactive.primary.hover'),
                      },
                    }}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
              
              {/* Right Column - 6 cols with video */}
              <div className="mds-legacy-col-12 mds-legacy-col-lg-6 hero-video-col">
                <video
                  className="hero-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/video/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          
          {/* Scroll icon */}
          <div className="scroll-icon">
            <ArrowDownIcon sx={{ fontSize: 48 }} />
          </div>
        </section>

        {/* Brand Section - 4 Businesses */}
        <section ref={brandRef} className="brand-section">
          <div className="mds-legacy-container">
            <div className="brand-title">
              <Typography variant="h2" className="section-headline">
                Access the collective expertise of our four businesses.
              </Typography>
            </div>
            <div className="mds-legacy-row mds-legacy-g-0 brand-row">
              <div className="mds-legacy-col-12 mds-legacy-col-lg-3 brand-card">
                <div className="card-content">
                  <div className="card-logo">
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>MARSH</Typography>
                  </div>
                  <div className="card-text">
                    <Typography variant="h5" className="card-title">
                      Insurance broking and risk management
                    </Typography>
                    <Typography variant="body1" className="card-description">
                      Organizations need to excel at quantifying and managing risk in order to grow and adapt.
                    </Typography>
                  </div>
                </div>
                <Button variant="outlined" fullWidth className="card-button">
                  Explore capabilities
                </Button>
              </div>
              
              <div className="mds-legacy-col-12 mds-legacy-col-lg-3 brand-card">
                <div className="card-content">
                  <div className="card-logo">
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>GUY CARPENTER</Typography>
                  </div>
                  <div className="card-text">
                    <Typography variant="h5" className="card-title">
                      Reinsurance and capital strategies
                    </Typography>
                    <Typography variant="body1" className="card-description">
                      Specialized expertise and innovations in risk transfer, capital, analytics and actuarial science can help power profitable growth
                    </Typography>
                  </div>
                </div>
                <Button variant="outlined" fullWidth className="card-button">
                  Explore capabilities
                </Button>
              </div>
              
              <div className="mds-legacy-col-12 mds-legacy-col-lg-3 brand-card">
                <div className="card-content">
                  <div className="card-logo">
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>MERCER</Typography>
                  </div>
                  <div className="card-text">
                    <Typography variant="h5" className="card-title">
                      People and investments
                    </Typography>
                    <Typography variant="body1" className="card-description">
                      Companies' most vital assets are their people – who thrive with health, wealth and career support.
                    </Typography>
                  </div>
                </div>
                <Button variant="outlined" fullWidth className="card-button">
                  Explore capabilities
                </Button>
              </div>
              
              <div className="mds-legacy-col-12 mds-legacy-col-lg-3 brand-card">
                <div className="card-content">
                  <div className="card-logo">
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>OLIVER WYMAN</Typography>
                  </div>
                  <div className="card-text">
                    <Typography variant="h5" className="card-title">
                      Management consulting
                    </Typography>
                    <Typography variant="body1" className="card-description">
                      Deep industry capabilities, expertise and relationships cut the learning curve for growing and competitive companies.
                    </Typography>
                  </div>
                </div>
                <Button variant="outlined" fullWidth className="card-button">
                  Explore capabilities
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Map Content - Stats */}
        <section ref={statsRef} className="map-section">
          <div className="mds-legacy-container">
            <Typography variant="body1" className="map-intro">
              With more than 90,000 colleagues based all over the world, our shared purpose, to build the confidence to thrive through the power of perspective, has never been more important or more relevant. We are in business to expand what's possible for our clients and for each other.
            </Typography>
            <div className="mds-legacy-row mds-legacy-row-cols-1 mds-legacy-row-cols-md-3 mds-legacy-g-8">
              <div className="stat-item">
                <Typography variant="h2" className="stat-number">130</Typography>
                <Typography variant="body1" className="stat-label">Offices in countries</Typography>
              </div>
              <div className="stat-item">
                <Typography variant="h2" className="stat-number">90,000+</Typography>
                <Typography variant="body1" className="stat-label">Global colleagues</Typography>
              </div>
              <div className="stat-item">
                <Typography variant="h2" className="stat-number">150</Typography>
                <Typography variant="body1" className="stat-label">Years history</Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Press - Our Journey */}
        <section ref={pressRef} className="press-section">
          <div className="mds-legacy-container">
            <div className="press-header">
              <Typography variant="h6" className="section-eyebrow">Our journey</Typography>
              <Typography variant="h3" className="section-headline">
                Thrive through the power of perspective.
              </Typography>
            </div>
            <div className="mds-legacy-row mds-legacy-row-cols-1 mds-legacy-row-cols-md-3 mds-legacy-g-6">
              <div className="press-card">
                <div className="card-image">
                  <img src="/assets/press-1.jpg" alt="Business and Client Services" />
                </div>
                <Typography variant="h6" className="card-title">
                  Business and Client Services
                </Typography>
              </div>
              <div className="press-card">
                <div className="card-image">
                  <img src="/assets/press-2.jpg" alt="Bloomberg Partnership" />
                </div>
                <Typography variant="h6" className="card-title">
                  Bloomberg global knowledge partnership
                </Typography>
              </div>
              <div className="press-card">
                <div className="card-image">
                  <img src="/assets/press-3.jpg" alt="New Marsh Brand" />
                </div>
                <Typography variant="h6" className="card-title">
                  The new Marsh brand
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="faq-section">
          <div className="mds-legacy-container">
            <div className="faq-header">
              <Typography variant="h3" className="section-headline">
                Frequently asked questions
              </Typography>
              <Typography variant="body1" className="section-description">
                Lorem ipsum dolor sit amet consectetur. Mollis at volutpat etiam neque diam aliquam elit suspendisse.
              </Typography>
            </div>
            <div className="faq-list">
              {[
                'What is the difference between Marsh McLennan and Marsh?',
                'How does this affect my existing services?',
                'What solutions do you offer?',
                'How can I contact you?',
                'Where are your offices located?',
              ].map((question, index) => (
                <Accordion key={index} className="faq-item" defaultExpanded={index === 0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-${index}-content`}
                    id={`faq-${index}-header`}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet consectetur. Pulvinar in sed sapien fringilla pulvinar. Laoreet tellus diam lorem odio facilisis eget libero sollicitudin urna.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

        {/* Connect CTA Section */}
        <section ref={connectRef} className="connect-section">
          <div className="mds-legacy-container">
            <div className="mds-legacy-row mds-legacy-g-6">
              <div className="mds-legacy-col-12 mds-legacy-col-lg-6 connect-content">
                <div className="accent-bar" />
                <Typography variant="h3" className="connect-headline">
                  Connect with a Marsh expert
                </Typography>
                <Typography variant="body1" className="connect-description">
                  Connect with us to discuss how we can help you to meet your business objectives.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  className="connect-button"
                  sx={{
                    borderColor: getRoleColor('interactive.primary'),
                    color: getRoleColor('interactive.primary'),
                    '&:hover': {
                      borderColor: getRoleColor('interactive.primary.hover'),
                      backgroundColor: getRoleColor('interactive.primary.hover'),
                      color: '#ffffff',
                    },
                  }}
                >
                  Contact us
                </Button>
              </div>
              <div className="mds-legacy-col-12 mds-legacy-col-lg-6 connect-image">
                <img src="/assets/connect-expert.jpg" alt="Connect with Marsh" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer would go here - reuse existing or create new */}
      </main>

      {/* AI Assistant Bot */}
      <AIAgentBot />
    </>
  );
};

export default MarshCorporateNew;
