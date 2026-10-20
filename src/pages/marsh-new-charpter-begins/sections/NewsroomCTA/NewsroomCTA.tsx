import React, { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getRoleColor } from '../../../../theme/roles';
import styles from '../../index.module.scss';
import { content } from '../../data/content';

const NewsroomCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="newsroom-heading" style={{ background: getRoleColor('bg.neutral.subtle') }}>
      <Container maxWidth="md">
        <Typography id="newsroom-heading" variant="h3" sx={{ color: getRoleColor('fg.on-accent'), mb: (t) => t.spacing(2) }}>
          {content.newsroomCta.heading}
        </Typography>
        <Typography variant="body1" sx={{ color: getRoleColor('fg.on-accent'), mb: (t) => t.spacing(3) }}>
          {content.newsroomCta.body}
        </Typography>
        <Button variant="contained" color="primary" href={content.newsroomCta.button.href} aria-label={content.newsroomCta.button.label}>
          {content.newsroomCta.button.label}
        </Button>
      </Container>
    </section>
  );
};

export default NewsroomCTA;
