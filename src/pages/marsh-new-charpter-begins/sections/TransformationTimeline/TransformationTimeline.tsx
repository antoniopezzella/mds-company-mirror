import React, { useMemo, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import tlStyles from './TransformationTimeline.module.scss';
import { initTransformationTimeline } from '../../animations/timelines/transformationTimeline';
import { content } from '../../data/content';

const TransformationTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stepsWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Pull steps from centralized content (fallback to empty array)
  const steps = useMemo(() => content.timeline.steps ?? [], []);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  stepRefs.current = [];
  const prefersReduced = useReducedMotion();

  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: () => {
      const wrapperEl = sectionRef.current!;
      const sceneEl = sceneRef.current!;
      const stepEls = stepRefs.current.filter(Boolean) as HTMLElement[];
      initTransformationTimeline({ wrapper: wrapperEl, scene: sceneEl, steps: stepEls, progressBar: progressBarRef.current });
    },
  });

  return (
    <section ref={sectionRef} className={`${styles.section} ${tlStyles.wrapper}`} aria-labelledby="timeline-heading" style={{ background: getRoleColor('bg.neutral.subtle') }}>
      <div ref={sceneRef} className={tlStyles.scene}>
        <Container maxWidth="xl">
          <Typography id="timeline-heading" variant="h3" sx={{ color: getRoleColor('fg.primary'), mb: (t) => t.spacing(2) }}>
            Transformation Timeline
          </Typography>

          <div ref={stepsWrapRef} className={tlStyles.steps} aria-live="polite">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={tlStyles.step}
                role="article"
                aria-labelledby={`step-${i}-title`}
                ref={(el) => { if (el) stepRefs.current[i] = el; }}
              >
                <Container maxWidth="md">
                  <Typography id={`step-${i}-title`} variant="h4" sx={{ color: getRoleColor('fg.primary'), mb: (t) => t.spacing(1) }}>
                    {s.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: getRoleColor('fg.neutral.subtle') }}>
                    {s.body}
                  </Typography>
                </Container>
              </div>
            ))}
          </div>

          <div className={tlStyles.progress} aria-hidden="true">
            <div ref={progressBarRef} className={tlStyles.progressBar} style={{ background: getRoleColor('interactive.primary') }} />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default TransformationTimeline;
