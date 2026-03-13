import { Typography } from '@mui/material';
import { MetricCard } from '../MetricCard';
import type { MetricCardProps } from '../MetricCard';
import { getRoleColor } from '../../../theme/roles';
import './MetricsSection.scss';

export interface MetricsSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
  /** Array of metrics to display */
  metrics: MetricCardProps[];
  /** Background color (default: surface.subtle) */
  backgroundColor?: string;
}

/**
 * MetricsSection - Section displaying key metrics
 * 
 * Design from Figma node 2885:48264
 * - 3-column grid layout
 * - Large numbers with labels
 * - Height: 980px
 */
export const MetricsSection: React.FC<MetricsSectionProps> = ({
  title,
  description,
  metrics,
  backgroundColor = getRoleColor('surface.subtle'),
}) => {
  return (
    <section className="metrics-section" style={{ backgroundColor }}>
      <div className="container">
        <div className="metrics-section__header">
          <Typography
            variant="h2"
            className="metrics-section__title"
            sx={{
              color: getRoleColor('text.primary'),
              mb: (theme) => theme.spacing(3),
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="metrics-section__description"
            sx={{
              color: getRoleColor('text.secondary'),
            }}
          >
            {description}
          </Typography>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-6 metrics-section__row">
          {metrics.map((metric, index) => (
            <div key={index} className="col">
              <MetricCard {...metric} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
