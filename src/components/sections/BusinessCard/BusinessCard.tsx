import { Typography, Divider } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import './BusinessCard.scss';

export interface BusinessCardProps {
  /** Business logo (component or image URL) */
  logo: React.ReactNode;
  /** Business title */
  title: string;
  /** Business description */
  description: string;
  /** CTA button config */
  cta: {
    text: string;
    onClick: () => void;
  };
  /** Show divider on the right */
  showDivider?: boolean;
}

/**
 * BusinessCard - Atomic component for business presentation
 * 
 * Design specs from Figma node 2885:48190
 * - Width: 419.25px (in 4-column grid)
 * - Logo area: 64px height
 * - Content area with title + description
 * - CTA button at bottom
 */
export const BusinessCard: React.FC<BusinessCardProps> = ({
  logo,
  title,
  description,
  cta,
  showDivider = false,
}) => {
  return (
    <div className="business-card">
      <div className="business-card__content">
        <div className="business-card__logo">{logo}</div>
        
        <div className="business-card__text">
          <Typography
            variant="h5"
            className="business-card__title"
            sx={{
              color: getRoleColor('text.primary'),
              mb: (theme) => theme.spacing(2),
            }}
          >
            {title}
          </Typography>
          
          <Typography
            variant="body1"
            className="business-card__description"
            sx={{
              color: getRoleColor('text.secondary'),
            }}
          >
            {description}
          </Typography>
        </div>
      </div>

      <button
        className="business-card__cta"
        onClick={cta.onClick}
        style={{
          backgroundColor: getRoleColor('interactive.primary'),
          // text.onPrimary, not text.inverse (a synonym of text.onAccent):
          // interactive.primary lightens to #95caff in dark → 1.73:1.
          color: getRoleColor('text.onPrimary'),
        }}
      >
        {cta.text}
      </button>

      {showDivider && (
        <Divider
          orientation="vertical"
          className="business-card__divider"
          sx={{
            borderColor: getRoleColor('border.default'),
          }}
        />
      )}
    </div>
  );
};
