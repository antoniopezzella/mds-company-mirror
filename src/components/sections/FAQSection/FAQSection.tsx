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
  /**
   * Visual style: 'shadow' (default — rounded, elevated cards on a subtle
   * surface) or 'bordered' (white background, 1px solid outline, 2px radius —
   * matches the "FQS" Figma spec used by the Corporate Home page).
   */
  variant?: 'shadow' | 'bordered';
  /** Overrides the container's max-width (default 1320px, matching Figma node 2885:47835). Set this to fit inside a caller's own outer container instead of self-centering at the default width. */
  containerMaxWidth?: number;
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
  variant = 'shadow',
  containerMaxWidth = 1320,
}) => {
  const isBordered = variant === 'bordered';
  return (
    <section className={`faq-section${isBordered ? ' faq-section--bordered' : ''}`}>
      <div className="faq-section__container" style={{ maxWidth: containerMaxWidth }}>
        <div className="faq-section__header">
          <Typography
            variant="h2"
            className="faq-section__title"
            sx={{
              color: getRoleColor('fg.primary'),
              textAlign: isBordered ? 'left' : 'center',
              mb: (theme) => theme.spacing(2),
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body1"
              className="faq-section__description"
              sx={{
                color: getRoleColor('fg.neutral.subtle'),
                textAlign: isBordered ? 'left' : 'center',
              }}
            >
              {description}
            </Typography>
          )}
        </div>

        <div className="faq-section__list">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              defaultExpanded={index === defaultExpanded}
              className="faq-section__accordion"
              sx={isBordered ? {
                backgroundColor: '#ffffff',
                // #dadada has no role mapping in roles.ts (only border.default
                // #878787 / border.strong exist) — hardcoded to match the exact
                // Figma value, same precedent as elsewhere in this codebase.
                border: '1px solid #dadada',
                borderRadius: '2px !important',
                mb: 1.5,
                '&:before': { display: 'none' },
                boxShadow: 'none',
              } : {
                backgroundColor: getRoleColor('bg.neutral.subtle'),
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
                sx={isBordered ? {
                  minHeight: '64px !important',
                  px: '24px',
                  '& .MuiAccordionSummary-content': { my: '16px' },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '2px',
                  },
                } : {
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: getRoleColor('fg.primary'),
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
                    color: getRoleColor('fg.neutral.subtle'),
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
