import { useRef } from 'react';
import { Typography } from '@mui/material';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../theme/roles';
import './MetricCard.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface MetricCardProps {
  /** Large number/metric value */
  value: string;
  /** Metric label/description */
  label: string;
  /**
   * Delay (seconds) before the count-up starts once scrolled into view —
   * used by MetricsSection to cascade a row of cards left-to-right instead
   * of counting up in lockstep.
   */
  countUpDelay?: number;
}

interface ParsedMetric {
  prefix: string;
  suffix: string;
  decimals: number;
  target: number;
}

// Splits a display value like "130+", "$5.5B", or "25M" into the numeric
// core to animate (target/decimals) plus the surrounding prefix/suffix
// characters, which stay static throughout the count-up. Returns null for
// anything that isn't "optional non-digits, then a number, then optional
// non-digits" (e.g. "N/A") — callers fall back to rendering it statically.
function parseMetricValue(value: string): ParsedMetric | null {
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)([^\d]*)$/);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0;
  const target = parseFloat(numeric.replace(/,/g, ''));
  if (Number.isNaN(target)) return null;
  return { prefix, suffix, decimals, target };
}

function formatMetric(n: number, parsed: ParsedMetric): string {
  return `${parsed.prefix}${n.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  })}${parsed.suffix}`;
}

/**
 * MetricCard - Atomic component for displaying metrics
 *
 * Design from Figma node 2885:48269
 * - Large number display (128px height in design)
 * - Label underneath
 * - Centered text
 * - Counts up from 0 to its target value via GSAP + ScrollTrigger the first
 *   time it scrolls into view (skipped entirely for prefers-reduced-motion,
 *   and for any value shape parseMetricValue can't confidently animate).
 */
export const MetricCard: React.FC<MetricCardProps> = ({ value, label, countUpDelay = 0 }) => {
  const valueRef = useRef<HTMLElement>(null);
  const parsed = parseMetricValue(value);

  useGSAP(
    () => {
      if (!parsed || !valueRef.current) return;
      const el = valueRef.current;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = value;
        return;
      }

      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: parsed.target,
            duration: 1.6,
            delay: countUpDelay,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = formatMetric(counter.val, parsed);
            },
            onComplete: () => {
              // Guards against float drift landing 1 ULP off the target.
              el.textContent = value;
            },
          });
        },
      });
    },
    { scope: valueRef, dependencies: [value, countUpDelay] }
  );

  return (
    <div className="metric-card">
      <Typography
        ref={valueRef}
        className="metric-card__value"
        sx={{
          color: getRoleColor('text.primary'),
          fontSize: { xs: '64px', md: '96px', lg: '112px' },
          fontWeight: 700,
          lineHeight: 1,
          textAlign: 'center',
        }}
      >
        {parsed ? formatMetric(0, parsed) : value}
      </Typography>
      <Typography
        variant="h6"
        className="metric-card__label"
        sx={{
          color: getRoleColor('text.secondary'),
          textAlign: 'center',
          mt: (theme) => theme.spacing(2),
        }}
      >
        {label}
      </Typography>
    </div>
  );
};
