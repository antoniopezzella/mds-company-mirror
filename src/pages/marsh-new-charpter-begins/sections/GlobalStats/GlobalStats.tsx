import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

const GlobalStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      // Skeleton: count-up & map arcs triggers will go here
    },
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="stats-heading" style={{ background: getRoleColor('surface.subtle') }}>
      <Container maxWidth="xl">
        <Typography id="stats-heading" variant="h3" sx={{ color: getRoleColor('text.primary'), mb: (t) => t.spacing(2) }}>
          Global Scale
        </Typography>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
          {content.stats.map((s) => (
            <div key={s.label} style={{ gridColumn: 'span 4' }}>
              <Typography variant="h3" sx={{ color: getRoleColor('text.primary'), lineHeight: 1 }}>
                {s.value}
              </Typography>
              <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }} aria-label={s.ariaLabel}>
                {s.label}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GlobalStats;
