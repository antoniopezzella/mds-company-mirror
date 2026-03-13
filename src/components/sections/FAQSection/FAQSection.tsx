import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import './FAQSection.scss';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
  /** Array of FAQ items */
  faqs: FAQItem[];
  /** Default expanded panel (optional) */
  defaultExpanded?: number;
}

/**
 * FAQSection - Centered FAQ section with accordions
 * 
 * Design from Figma node 2885:47835
 * - Centered container (1320px)
 * - Vertical accordion list
 * - Height: 980px
 */
export const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  description,
  faqs,
  defaultExpanded = 0,
}) => {
  return (
    <section className="faq-section">
      <div className="faq-section__container">
        <div className="faq-section__header">
          <Typography
            variant="h2"
            className="faq-section__title"
            sx={{
              color: getRoleColor('text.primary'),
              textAlign: 'center',
              mb: (theme) => theme.spacing(2),
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="faq-section__description"
            sx={{
              color: getRoleColor('text.secondary'),
              textAlign: 'center',
            }}
          >
            {description}
          </Typography>
        </div>

        <div className="faq-section__list">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              defaultExpanded={index === defaultExpanded}
              className="faq-section__accordion"
              sx={{
                backgroundColor: getRoleColor('surface.subtle'),
                borderRadius: '8px !important',
                mb: 2,
                '&:before': { display: 'none' },
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <AccordionSummary
                expandIcon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: getRoleColor('text.primary'),
                    fontWeight: 600,
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{
                    color: getRoleColor('text.secondary'),
                    lineHeight: 1.6,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};
