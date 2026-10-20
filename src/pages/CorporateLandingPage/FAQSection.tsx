import React, { useState } from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRoleColor } from '../../theme/roles';

/**
 * FAQ Section
 * 
 * Frequently asked questions with expandable accordions
 */

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Why is Marsh McLennan now called Marsh?',
    answer: 'Marsh McLennan is transitioning to the Marsh brand to create a stronger, more unified identity in the marketplace. While Marsh McLennan remains our parent company name, our client-facing business is now known simply as Marsh. This change simplifies our brand architecture, making it easier for clients to understand and access our comprehensive insurance broking and risk management services under one recognizable name.',
  },
  {
    question: 'What is the new Marsh brand and why did it change?',
    answer: 'The new Marsh brand represents our evolution as a global leader in insurance broking and risk management. This transformation reflects our commitment to innovation, digital transformation, and our expanded capabilities to serve clients across 130 countries. The rebrand unifies our global presence while maintaining our 150-year heritage of excellence. This transition strengthens our position as the world\'s leading insurance broker and risk advisor.',
  },
  {
    question: 'Will this brand change affect the services I receive?',
    answer: 'No, the transition to the Marsh brand will not affect the quality or scope of services you receive. You will continue to work with the same dedicated teams and have access to the same comprehensive solutions. In fact, this change enhances our ability to deliver integrated services by creating a clearer, more cohesive brand experience while maintaining our commitment to excellence and innovation.',
  },
  {
    question: 'How does Marsh help businesses manage risk?',
    answer: 'Marsh provides comprehensive risk management solutions including insurance broking, risk advisory, and strategic consulting. We leverage advanced analytics, industry expertise, and our global network to help organizations identify, quantify, and mitigate risks. Our approach combines data-driven insights with personalized service to create tailored risk management strategies.',
  },
  {
    question: 'What services does Marsh McLennan offer through its four business units?',
    answer: 'Marsh McLennan operates through four distinct business units: Marsh (insurance broking and risk management), Guy Carpenter (reinsurance and capital strategies), Mercer (people and investments including HR, retirement, and wealth management), and Oliver Wyman (management consulting). Together, these businesses provide comprehensive solutions for risk, strategy, and people.',
  },
  {
    question: 'How can I connect with Marsh experts for my business needs?',
    answer: 'You can connect with our team of experts by using the "Contact us" button on this page, or by reaching out through our AI assistant for immediate guidance. Our specialists are available to discuss your specific business objectives and provide customized solutions for insurance, risk management, employee benefits, or consulting needs.',
  },
  {
    question: 'What makes Marsh McLennan different from other insurance brokers?',
    answer: 'With 90,000+ colleagues across 130 countries and 150 years of history, Marsh McLennan combines unmatched global reach with deep local expertise. Our integrated approach brings together insurance, reinsurance, consulting, and people solutions under one roof. We leverage advanced analytics, proprietary data, and strategic partnerships like Bloomberg to deliver superior insights and outcomes for our clients.',
  },
];

export const FAQSection: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F2F6F9', // GSAP MARK: Solid light blue background (no transparency, unpinned)
        display: 'flex',
        alignItems: 'center',
        py: (theme) => theme.spacing(7), // 56px
        position: 'relative',
        zIndex: 40,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: (theme) => theme.spacing(6),
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            mb: 3,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: 'var(--font-family-display, "Marsh Serif", serif)',
              fontSize: '40px',
              lineHeight: '48px',
              color: getRoleColor('fg.primary'),
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            Frequently asked questions
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
              fontSize: '24px',
              lineHeight: '32px',
              color: '#3D3C37',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Get answers to common questions about our brand, services, and how we can help your business thrive.
          </Typography>
        </Box>

        {/* Accordions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={`panel${index}`}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                backgroundColor: expanded === `panel${index}` ? '#E5EDF4' : 'white',
                border: '1px solid #DADADA',
                borderRadius: '2px !important',
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
                mb: 0,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  minHeight: '64px',
                  px: 3,
                  py: 2,
                  '& .MuiAccordionSummary-content': {
                    my: 0,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                    fontSize: '18px',
                    lineHeight: '28px',
                    color: '#1B222F',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#1B222F',
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
