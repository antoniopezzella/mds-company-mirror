import React, { useRef, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../theme/roles';

gsap.registerPlugin(ScrollTrigger);

/**
 * Metrics Section
 * 
 * Dark blue background with key company statistics:
 * - 130 countries
 * - 90,000+ global colleagues
 * - 150 years history
 * 
 * Features animated counter using GSAP when scrolled into view
 */

interface Metric {
  value: string;
  label: string;
  numericValue: number;
  suffix?: string;
}

const metrics: Metric[] = [
  { value: '130', label: 'Offices in countries', numericValue: 130 },
  { value: '90,000+', label: 'Global colleagues', numericValue: 90000, suffix: '+' },
  { value: '150', label: 'Years history', numericValue: 150 },
];

export const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Pin this section so it stays in place while next section slides over
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    });

    // Animate each counter when section enters viewport
    counterRefs.current.forEach((counter, index) => {
      if (!counter) return;

      const metric = metrics[index];
      const obj = { value: 0 };

      gsap.to(obj, {
        value: metric.numericValue,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
        onUpdate: () => {
          const formatted = Math.floor(obj.value).toLocaleString();
          counter.textContent = formatted + (metric.suffix || '');
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: getRoleColor('bg.primary'), // GSAP MARK: Solid dark blue background (no transition)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: (theme) => theme.spacing(6), // 48px
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: (theme) => theme.spacing(6),
          }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            Global scale with expertise in over 30 major industries
          </Typography>

          {/* Description */}
          <Typography
            variant="h4"
            sx={{
              color: '#F7F3EE', // Neutral 250
              textAlign: 'center',
              maxWidth: '1200px',
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            With more than 90,000 colleagues based all over the world, our shared purpose, to build the confidence to thrive through the power of perspective, has never been more important or more relevant. We are in business to expand what's possible for our clients and for each other.
          </Typography>

          {/* Metrics Grid */}
          <Grid
            container
            spacing={3}
            sx={{
              py: 3,
              justifyContent: 'center',
            }}
          >
            {metrics.map((metric, index) => (
              <Grid
                key={metric.label}
                size={{ xs: 12, md: 4 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  textAlign: 'center',
                }}
              >
                {/* Value */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '104px',
                    lineHeight: '128px',
                    color: getRoleColor('bg.accent'),
                    fontWeight: 400,
                  }}
                >
                  <span ref={(el) => { counterRefs.current[index] = el; }}>0</span>
                </Typography>

                {/* Label */}
                <Typography
                  variant="h4"
                  sx={{
                    color: '#F8FAFC', // Blue gray 50
                    fontWeight: 400,
                  }}
                >
                  {metric.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
