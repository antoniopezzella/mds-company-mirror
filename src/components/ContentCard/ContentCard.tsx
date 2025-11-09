import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DSButton from '../Button/Button';
import { getRoleColor } from '../../theme/roles';

export type ContentCardOrientation = 'vertical' | 'horizontal';

export interface ContentCardProps {
  orientation?: ContentCardOrientation;
  withBorder?: boolean;
  showBottomDecoration?: boolean;
  imageUrl?: string; // optional; when omitted, show a placeholder
  categoryLabel?: string;
  readingTime?: string; // e.g., "1 min read"
  date?: string; // e.g., "MM/DD/YYYY"
  title: string;
  description?: string;
  badges?: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

// Tiny inline icons to avoid external deps in previews
const DocIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" width={20} height={20} aria-hidden focusable={false} {...props}>
    <path fill="currentColor" d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5L12.5 2H5zm7 1.5L16.5 8H12a0 0 0 0 1 0 0V3.5z" />
  </svg>
);
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" width={20} height={20} aria-hidden focusable={false} {...props}>
    <path fill="currentColor" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 4H9v5h5v-2h-3V6z" />
  </svg>
);
const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden focusable={false} {...props}>
    <path fill="currentColor" d="M6.5 4l4 4-4 4-1-1 3-3-3-3 1-1z" />
  </svg>
);

function PlaceholderImage({ className }: { className?: string }) {
  return (
    <Box
      className={className}
      sx={{
        bgcolor: getRoleColor('surface.subtle'),
        color: getRoleColor('text.secondary'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden>
        <path d="M8 36l12-16 9 10 7-8 20 26H8z" fill="currentColor" opacity=".2" />
        <circle cx="22" cy="14" r="4" fill="currentColor" opacity=".2" />
      </svg>
    </Box>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        px: 1,
        borderRadius: '6px',
        border: `1px solid ${getRoleColor('border.default')}`,
        color: getRoleColor('text.secondary'),
        fontSize: 12,
      }}
    >
      {children}
    </Box>
  );
}

const MetaRow: React.FC<{
  categoryLabel?: string;
  readingTime?: string;
  date?: string;
}> = ({ categoryLabel, readingTime, date }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      color: getRoleColor('text.secondary'),
      fontSize: 14,
      width: '100%',
      borderBottom: `1px solid ${getRoleColor('border.default')}`,
      pb: 1.5,
    }}
  >
    {categoryLabel && (
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        <DocIcon />
        <span style={{ whiteSpace: 'nowrap' }}>{categoryLabel}</span>
      </Box>
    )}
    {readingTime && (
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, flex: 1, minWidth: 80 }}>
        <ClockIcon />
        <span style={{ whiteSpace: 'nowrap' }}>{readingTime}</span>
      </Box>
    )}
    {date && <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>{date}</span>}
  </Box>
);

const TitleBlock: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <Stack spacing={1}>
    <h3
      style={{
        fontFamily: 'MMC Display, var(--typo-h4-font-family)',
        fontWeight: 700,
        fontSize: 20,
        lineHeight: '28px',
        color: getRoleColor('text.primary'),
        margin: 0,
      }}
    >
      {title}
    </h3>
    {description && (
      <p style={{ color: getRoleColor('text.primary'), fontSize: 16, lineHeight: '24px', margin: 0 }}>{description}</p>
    )}
  </Stack>
);

const ContentCard: React.FC<ContentCardProps> = ({
  orientation = 'vertical',
  withBorder = true,
  showBottomDecoration = true,
  imageUrl,
  categoryLabel,
  readingTime,
  date,
  title,
  description,
  badges,
  ctaLabel = 'Read more',
  onCtaClick,
  className = '',
}) => {
  const Container = (children: React.ReactNode) => (
    <Box
      component="article"
      className={className}
      sx={{
        position: 'relative',
        bgcolor: getRoleColor('surface.default'),
        border: withBorder ? `1px solid ${getRoleColor('border.default')}` : 'none',
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        gap: orientation === 'horizontal' ? 3 : 0,
        alignItems: orientation === 'horizontal' ? 'flex-start' : 'stretch',
      }}
    >
      {children}
      {showBottomDecoration && withBorder && (
        <Box component="div" aria-hidden sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, bgcolor: getRoleColor('interactive.primary') }} />
      )}
    </Box>
  );

  if (orientation === 'horizontal') {
    return Container(
      <>
        <Box sx={{ flex: 1, minWidth: 0, alignSelf: 'stretch' }}>
          {imageUrl ? (
            <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <PlaceholderImage />
          )}
        </Box>
        <Stack spacing={2} sx={{ flex: 1, minWidth: 0, p: 3 }}>
          <MetaRow categoryLabel={categoryLabel} readingTime={readingTime} date={date} />
          <TitleBlock title={title} description={description} />
          {badges && badges.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              {badges.map((b, i) => (
                <Badge key={`${b}-${i}`}>{b}</Badge>
              ))}
            </Box>
          )}
          <div>
            <DSButton variant="tertiary" size="md" endIcon={<ArrowRightIcon /> } onClick={onCtaClick}>
              {ctaLabel}
            </DSButton>
          </div>
        </Stack>
      </>
    );
  }

  // vertical
  return Container(
    <>
      <Box sx={{ width: '100%', height: 268 }}>
        {imageUrl ? (
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <PlaceholderImage />
        )}
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <MetaRow categoryLabel={categoryLabel} readingTime={readingTime} date={date} />
        <TitleBlock title={title} description={description} />
        {badges && badges.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {badges.map((b, i) => (
              <Badge key={`${b}-${i}`}>{b}</Badge>
            ))}
          </Box>
        )}
        <div>
          <DSButton variant="tertiary" size="md" endIcon={<ArrowRightIcon /> } onClick={onCtaClick}>
            {ctaLabel}
          </DSButton>
        </div>
      </Stack>
    </>
  );
};

export default ContentCard;
