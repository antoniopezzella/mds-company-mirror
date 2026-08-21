import React from 'react';
import { Box, Typography } from '@mui/material';
import MarshOneHeader from '../components/MarshOneHeader';
import { WebsiteAlertBanner } from '../../../components/WebsiteAlertBanner';
import Hero from '../components/Hero';
import SolutionsGrid from '../components/SolutionsGrid';
import Stats from '../components/Stats';
import { Accordion } from '../../../components/ui/accordion';
import { Footer } from '../../../pages/CorporateLandingPage/Footer';
import { AIAgentBot } from '../../../components/AIAgentBot';

/**
 * Marsh One Homepage — Figma node 148:1837
 *
 * Sections:
 * 1. Header (transparent, overlays hero)
 * 2. Hero (1000px, bg image, search bar, suggestion pills)
 * 3. Expertise Cards + AI Chatbot (horizontal scroll, #d2ebfe bg)
 * 4. Stats + Insights (dark bg #000f47)
 * 5. FAQ (#f7f3ee bg, accordion)
 * 6. Footer
 */
export const MarshOneHomepage: React.FC = () => {
  return (
    <Box component="main" sx={{ backgroundColor: '#fff' }}>
      {/* Website Alert Banner */}
      <WebsiteAlertBanner
        title="Important Announcement"
        message="We're evolving and building a new, expanded Marsh brand to represent all of our capabilities."
        brand="marsh"
        ctaText="Discover new Marsh"
        ctaUrl="/learn-more"
        onClose={() => console.log('Banner closed')}
        fullWidth
      />
      
      {/* Header — transparent, fixed, overlays hero, offset below banner */}
      <MarshOneHeader height={96} scrollThreshold={50} offsetTop={96} />

      {/* Hero Section */}
      <Box component="section" id="hero" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Hero
          headline={"AI-powered insights, backed\nby Marsh's global expertise."}
          subheadline="Clarity for the risks that matter most."
          searchPlaceholder="Hi, I'm Marsh Ai Assistant, ask me anything..."
          suggestions={[
            'Personalized question?',
            'What is right solution for my company?',
            'How fast can I get a quote?',
          ]}
          backgroundImage="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920"
        />
      </Box>

      {/* Solutions Grid Section — Figma node 7071:182332 "section Press" */}
      <Box component="section" id="solutions-grid" sx={{ display: 'flex', alignItems: 'center' }}>
        <SolutionsGrid
          headline="Whatever risk you're managing, we've handled it before."
          ctaLabel="Find right solution"
          topics={[
            {
              title: 'Risk & Insurance',
              description: 'Property, casualty, cyber and specialty coverage, claims advocacy and risk consulting.',
              linkLabel: 'Risk & insurance',
            },
            {
              title: 'Workforce & Benefits',
              description: 'Health and benefits, talent and rewards, and workforce strategy.',
              linkLabel: 'Workforce & benefits',
            },
            {
              title: 'Investments & Retirement',
              description: 'OCIO, pension investments, portfolio strategy and retirement solutions.',
              linkLabel: 'Investments & retirement',
            },
            {
              title: 'Reinsurance & Capital',
              description: 'Treaty and facultative reinsurance, catastrophe modelling and capital advisory.',
              linkLabel: 'Reinsurance & capital',
            },
            {
              title: 'Strategy & Transformation',
              description: 'Corporate strategy, operating model design and organisational performance.',
              linkLabel: 'Strategy & transformation',
            },
            {
              title: 'SME Products',
              description: 'Packaged cover for smaller businesses, online quote and bind.',
              linkLabel: 'SME products',
            },
          ]}
        />
      </Box>

      {/* Sticky AI Agent Bot - floating with full chat functionality */}
      <AIAgentBot 
        position={{ bottom: '32px', right: '32px' }}
        apiEndpoint="/api/answer-stream"
        visitorType="prospect"
        showLabel={true}
        enableBubbles={true}
      />

      {/* Metrics + Insights Section */}
      <Box component="section" id="metrics" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Stats
          headline="The reach, experience, and perspective to help you thrive"
          description="With more than 90,000 colleagues in over 130 countries, our shared purpose — to build the confidence to thrive through the power of perspective — guides how we deliver value to our stakeholders."
          stats={[
            { value: '130', label: 'Countries' },
            { value: '90,000', suffix: '+', label: 'Global colleagues' },
            { value: '150', label: 'Years' },
          ]}
          insightHeadline="Insights that act where your risk is real."
          insightSubtext="Expert analysis, applied to the decisions that matter most to your business."
          insightCards={[
            {
              type: 'Podcast',
              title: 'Risk & Insurance',
              description: 'Advisory and placement strategies for complex risk.',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
            },
            {
              type: 'Article',
              title: 'People & Workforce',
              description: 'Health, benefits, wellbeing, and talent risk.',
              image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
            },
            {
              type: 'Article',
              title: 'Climate & Property',
              description: 'Physical risk, resilience, and adaptation.',
              image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
            },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920"
        />
      </Box>

      {/* FAQ Section — Figma node 148:1960 */}
      <Box
        component="section"
        id="faq"
        sx={{
          backgroundColor: '#f7f3ee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: '24px', md: '202px' },
          py: '80px',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1516px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography
            sx={{
              fontFamily: "'Marsh Serif', 'Noto Sans', sans-serif",
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '36px',
              color: '#002c77',
            }}
          >
            Frequently asked questions
          </Typography>

          <Accordion
            items={[
              {
                id: 'faq-1',
                title: 'What does Marsh do?',
                content: (
                  <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1b222f' }}>
                    Marsh helps organizations navigate risk, develop their people, build their strategies to help them thrive.
                    With more than 90,000 colleagues in over 130 countries, we deliver expertise across risk, reinsurance and capital,
                    people and investments, and management consulting.
                  </Typography>
                ),
              },
              {
                id: 'faq-2',
                title: 'What industries does Marsh serve?',
                content: (
                  <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1b222f' }}>
                    We serve organizations across all major industries including financial services, healthcare, manufacturing, energy, technology, and more.
                  </Typography>
                ),
              },
              {
                id: 'faq-3',
                title: 'How is Marsh different from other professional services firms?',
                content: (
                  <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1b222f' }}>
                    Marsh combines deep industry expertise with global reach, data-driven insights, and AI-powered tools to deliver
                    solutions that are tailored to the specific needs of each client.
                  </Typography>
                ),
              },
              {
                id: 'faq-4',
                title: 'I already work with one of your businesses. Can I access services from your other businesses?',
                content: (
                  <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1b222f' }}>
                    Yes. Our integrated platform allows clients to access the full range of services across our businesses,
                    including risk and insurance, reinsurance, people solutions, and management consulting.
                  </Typography>
                ),
              },
              {
                id: 'faq-5',
                title: 'Is Marsh the same as Marsh McLennan?',
                content: (
                  <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1b222f' }}>
                    Marsh is the insurance broking and risk management business of Marsh McLennan, a global professional services firm.
                  </Typography>
                ),
              },
              {
                id: 'faq-6',
                title: 'Is the stock ticker symbol changing?',
                content: (
                  <Typography sx={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: '24px', color: '#1b222f' }}>
                    Please refer to our investor relations page for the most current information about our stock ticker symbol.
                  </Typography>
                ),
              },
            ]}
            variant="default"
          />
        </Box>
      </Box>

      {/* Footer Section */}
      <Footer />
    </Box>
  );
};

export default MarshOneHomepage;
