import { Typography } from '@mui/material';
import {
  HeroSection,
  FourBrandsSection,
  MetricsSection,
  JourneySection,
  FAQSection,
} from '../components/sections';
import { AIAgentBot } from '../components/AIAgentBot';
import { getRoleColor } from '../theme/roles';
import './MarshCorporateFutureState.scss';

/**
 * MarshCorporateFutureState - Corporate landing page (Future State Design)
 * 
 * Based on Figma node 2885:47707 "Corporate- option 4 - Future State"
 * 
 * Architecture:
 * - Atomic design pattern
 * - Reusable section components
 * - MDS grid system throughout
 * - Clean, modern UX
 * 
 * Features:
 * - Hero section with dark variant
 * - Four business cards with dividers
 * - Large metrics display
 * - Journey carousel
 * - FAQ accordions
 * - NEW: Floating AI agent bot
 */
export const MarshCorporateFutureState = () => {
  // Mock data - replace with real content
  const businesses = [
    {
      logo: <Typography variant="h4" sx={{ fontWeight: 700 }}>MARSH</Typography>,
      title: 'Insurance broking and risk management',
      description: 'Organizations need to excel at quantifying and managing risk in order to grow and adapt.',
      cta: {
        text: 'Explore capabilities',
        onClick: () => {},
      },
    },
    {
      logo: <Typography variant="h6" sx={{ fontWeight: 700 }}>GUY CARPENTER</Typography>,
      title: 'Reinsurance and capital strategies',
      description: 'Specialized expertise and innovations in risk transfer, capital, analytics and actuarial science can help power profitable growth',
      cta: {
        text: 'Explore capabilities',
        onClick: () => {},
      },
    },
    {
      logo: <Typography variant="h6" sx={{ fontWeight: 700 }}>MERCER</Typography>,
      title: 'People and investments',
      description: "Companies' most vital assets are their people – who thrive with health, wealth and career support.",
      cta: {
        text: 'Explore capabilities',
        onClick: () => {},
      },
    },
    {
      logo: <Typography variant="h6" sx={{ fontWeight: 700 }}>OLIVER WYMAN</Typography>,
      title: 'Management consulting',
      description: 'Deep industry capabilities, expertise and relationships cut the learning curve for growing and competitive companies.',
      cta: {
        text: 'Explore capabilities',
        onClick: () => {},
      },
    },
  ];

  const metrics = [
    { value: '130', label: 'Countries' },
    { value: '90,000+', label: 'Global colleagues' },
    { value: '150', label: 'Years history' },
  ];

  const journeyCards = [
    {
      image: '/images/journey-business-services.jpg',
      title: 'Business and Client Services',
      description: 'Delivering exceptional service and support to our clients worldwide.',
      date: '',
    },
    {
      image: '/images/journey-bloomberg.jpg',
      title: "Bloomberg's global knowledge partnership",
      description: 'Leveraging data and insights to drive better decisions.',
      date: '',
    },
    {
      image: '/images/journey-marsh-brand.jpg',
      title: 'The new Marsh brand',
      description: 'A unified brand bringing together our collective expertise.',
      date: '',
    },
  ];

  const faqs = [
    {
      question: 'What does Marsh McLennan becoming Marsh mean for clients?',
      answer: 'The rebrand to Marsh represents our commitment to delivering integrated solutions across risk, strategy, and people. All four businesses continue to operate with their specialized expertise while leveraging our collective strength.',
    },
    {
      question: 'How does this change affect our existing relationships?',
      answer: 'Your existing relationships and points of contact remain the same. This change enhances our ability to serve you by providing seamless access to our full range of capabilities.',
    },
    {
      question: 'What services are available through the unified Marsh brand?',
      answer: 'You have access to insurance broking, reinsurance, people consulting, investment advice, and management consulting – all backed by our deep industry expertise and global reach.',
    },
    {
      question: 'How can we get started with Marsh?',
      answer: 'Connect with your existing relationship manager or reach out to our team through the contact form. We\'ll assess your needs and connect you with the right experts.',
    },
    {
      question: 'What industries does Marsh serve?',
      answer: 'We serve clients across 30+ major industries, including financial services, healthcare, technology, energy, manufacturing, and more. Our teams have deep sector-specific knowledge.',
    },
  ];

  return (
    <div className="marsh-corporate-future-state">
      {/* Hero Section */}
      <HeroSection
        title="Marsh McLennan is now Marsh"
        description="One Marsh brand, delivering integrated solutions across risk, strategy, and people."
        variant="dark"
        logoSrc="/images/hero-person.jpg"
        videoSrc="https://storage.coverr.co/videos/vwLpz2Gu01RhO2gPNDTAo01kAQVMdNAVoX/preview"
        cta={{
          text: 'Learn more',
          onClick: () => {},
        }}
        height="600px"
      />

      {/* Four Businesses Section */}
      <FourBrandsSection
        title="Access the collective expertise of our four businesses."
        description="Lorem ipsum dolor sit amet consectetur. Mollis at volutpat etiam neque diam aliquam elit suspendisse."
        businesses={businesses}
      />

      {/* Metrics Section */}
      <MetricsSection
        title="With more than 90,000 colleagues based all over the world, our shared purpose, to build the confidence to thrive through the power of perspective, has never been more important or more relevant. We are in business to expand what's possible for our clients and for each other."
        description=""
        metrics={metrics}
        backgroundColor="interactive.primary"
      />

      {/* Journey/Press Section */}
      <JourneySection
        title="Our journey"
        description="Thrive through the power of perspective."
        cards={journeyCards}
      />

      {/* FAQ Section */}
      <FAQSection
        title="Frequently asked questions"
        description="Lorem ipsum dolor sit amet consectetur. Mollis at volutpat etiam neque diam aliquam elit suspendisse."
        faqs={faqs}
        defaultExpanded={0}
      />

      {/* Talk to Experts CTA Section */}
      <section
        className="talk-experts-section"
        style={{
          backgroundColor: getRoleColor('interactive.primary'),
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          minHeight: '500px',
        }}
      >
        <div className="container-fluid">
          <div className="row g-0">
            {/* Text Column */}
            <div className="col-12 col-lg-6" style={{ padding: '64px 48px' }}>
              <Typography
                variant="h3"
                sx={{
                  color: getRoleColor('text.inverse'),
                  mb: (theme) => theme.spacing(3),
                  fontWeight: 600,
                }}
              >
                Connect with a Marsh expert
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: getRoleColor('text.inverse'),
                  mb: (theme) => theme.spacing(4),
                }}
              >
                Connect with us to discuss how we can help you to meet your business objectives.
              </Typography>
              <button
                style={{
                  padding: '12px 32px',
                  backgroundColor: getRoleColor('surface.default'),
                  color: getRoleColor('text.primary'),
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => {}}
              >
                Connect
              </button>
            </div>

            {/* Image Column */}
            <div className="col-12 col-lg-6">
              <img
                src="/images/rowing-team.jpg"
                alt="Rowing team"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  minHeight: '400px',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Agent Bot */}
      <AIAgentBot
        onOpen={() => {}}
        position={{ bottom: 24, right: 24 }}
      />
    </div>
  );
};
