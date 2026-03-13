import React, { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const heading = sectionRef.current?.querySelector('h2');
      const accordions = sectionRef.current?.querySelectorAll('.faq-accordion');
      
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        });
      }

      if (accordions?.length) {
        gsap.from(accordions, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    },
  });

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="faq-heading"
      style={{ background: getRoleColor('surface.subtle') }}
    >
      <Container maxWidth="md">
        <Typography 
          id="faq-heading" 
          variant="h2" 
          component="h2"
          sx={{ 
            color: getRoleColor('text.primary'), 
            mb: (t) => t.spacing(6),
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {content.faq.heading}
        </Typography>
        
        <div>
          {content.faq.items.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className="faq-accordion"
              sx={{
                mb: (t) => t.spacing(2),
                background: getRoleColor('surface.default'),
                borderRadius: '8px !important',
                boxShadow: 'none',
                border: `1px solid rgba(0, 0, 0, 0.08)`,
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: (t) => `0 0 ${t.spacing(2)} 0`,
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon 
                    sx={{ color: getRoleColor('interactive.primary') }} 
                  />
                }
                sx={{
                  minHeight: '64px',
                  '&.Mui-expanded': {
                    minHeight: '64px',
                  },
                  '& .MuiAccordionSummary-content': {
                    my: (t) => t.spacing(2),
                    '&.Mui-expanded': {
                      my: (t) => t.spacing(2),
                    },
                  },
                }}
              >
                <Typography 
                  variant="h6"
                  sx={{ 
                    color: getRoleColor('text.primary'),
                    fontWeight: 500,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  pt: 0,
                  pb: (t) => t.spacing(3),
                  px: (t) => t.spacing(2),
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: getRoleColor('text.secondary'),
                    lineHeight: 1.7,
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
