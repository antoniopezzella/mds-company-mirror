import { Typography } from '@mui/material';
import { BusinessCard } from '../BusinessCard';
import type { BusinessCardProps } from '../BusinessCard';
import { getRoleColor } from '../../../theme/roles';
import './FourBrandsSection.scss';

export interface FourBrandsSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
  /** Array of 4 business cards */
  businesses: Omit<BusinessCardProps, 'showDivider'>[];
  /** Background color (default: surface.default) */
  backgroundColor?: string;
}

/**
 * FourBrandsSection - Section displaying 4 business cards
 * 
 * Design from Figma node 2885:48182
 * - 4-column grid layout with dividers
 * - Responsive: stacks on mobile
 * - Height: 980px
 */
export const FourBrandsSection: React.FC<FourBrandsSectionProps> = ({
  title,
  description,
  businesses,
  backgroundColor = getRoleColor('bg.default'),
}) => {
  return (
    <section className="four-brands-section" style={{ backgroundColor }}>
      <div className="mds-legacy-container">
        <div className="four-brands-section__header">
          <Typography
            variant="h2"
            className="four-brands-section__title"
            sx={{
              color: getRoleColor('fg.primary'),
              textAlign: 'center',
              mb: (theme) => theme.spacing(2),
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="four-brands-section__description"
            sx={{
              color: getRoleColor('fg.neutral.subtle'),
              textAlign: 'center',
            }}
          >
            {description}
          </Typography>
        </div>

        <div className="mds-legacy-row mds-legacy-g-0 four-brands-section__row">
          {businesses.map((business, index) => (
            <div key={index} className="mds-legacy-col-12 mds-legacy-col-lg-3 four-brands-section__col">
              <BusinessCard
                {...business}
                showDivider={index < businesses.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
