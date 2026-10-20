import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

const Announcement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      // Skeleton: stagger reveal for text blocks will go here
    },
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="announcement-heading" style={{ background: getRoleColor('bg.default') }}>
      <Container maxWidth="lg">
        <Typography id="announcement-heading" variant="h3" sx={{ color: getRoleColor('fg.primary'), mb: (t) => t.spacing(2) }}>
          {content.announcement.title}
        </Typography>
        <Typography variant="body1" sx={{ color: getRoleColor('fg.neutral.subtle'), maxWidth: 900 }}>
          {content.announcement.body}
        </Typography>
      </Container>
    </section>
  );
};

export default Announcement;
