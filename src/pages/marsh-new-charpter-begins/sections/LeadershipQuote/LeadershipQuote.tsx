import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

const LeadershipQuote: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      // Skeleton: image reveal and text emphasize on center
    },
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="quote-heading" style={{ background: getRoleColor('surface.default') }}>
      <Container maxWidth="md">
        <Typography id="quote-heading" variant="h3" sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(2) }}>
          Leadership Perspective
        </Typography>
        <blockquote style={{ margin: 0 }}>
          <Typography component="p" variant="h5" sx={{ color: getRoleColor('text.primary') }}>
            “{content.quote.text}”
          </Typography>
          <Typography variant="body2" sx={{ color: getRoleColor('text.secondary'), mt: (t) => t.spacing(1) }}>
            — {content.quote.attribution}{content.quote.role ? `, ${content.quote.role}` : ''}
          </Typography>
        </blockquote>
      </Container>
    </section>
  );
};

export default LeadershipQuote;
