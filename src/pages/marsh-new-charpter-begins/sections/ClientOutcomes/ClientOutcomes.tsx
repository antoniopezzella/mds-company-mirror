import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

const ClientOutcomes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      // Skeleton: reveal case cards and lazy-load media
    },
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="outcomes-heading" style={{ background: getRoleColor('surface.default') }}>
      <Container maxWidth="xl">
        <Typography id="outcomes-heading" variant="h3" sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(2) }}>
          Client Outcomes
        </Typography>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
          {content.outcomes.map((o) => (
            <div key={o.title} style={{ gridColumn: 'span 6' }}>
              <Typography variant="h5" sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(1) }}>
                {o.title}
              </Typography>
              <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
                {o.summary}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ClientOutcomes;
