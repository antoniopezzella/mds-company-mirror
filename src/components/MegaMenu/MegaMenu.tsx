
import React from 'react';
import { createPortal } from 'react-dom';
import { Box, Typography, Divider } from '@mui/material';
import { Chip } from '../Chip/Chip';
import styles from './MegaMenu.module.scss';

const MARSH_M_LOGO = '/images/M-logo.svg';

export interface MegaMenuProps {
  isOpen: boolean;
  onClose?: () => void;
  /**
   * Vertical offset in pixels from the top of the viewport so the
   * mega menu renders directly below the header. Defaults to 64px.
   */
  offsetTop?: number;
}

// Quick actions removed per request — kept data removed to simplify markup

const SOLUTION_PILLARS = [
  {
    title: 'Protect',
    subtitle: 'Your Business & Assets',
    tags: ['Property & Casualty', 'Cyber Security', 'Climate Risk', 'Specialty Coverage'],
    cta: 'All Protection Solutions'
  },
  {
    title: 'Strengthen',
    subtitle: 'Your People & Organization',
    tags: ['Workforce Solutions', 'Financial Position', 'Health & Benefits', 'Retirement & Wealth'],
    cta: 'All Strength Solutions'
  },
  {
    title: 'Grow & Transform',
    subtitle: 'Your Business',
    tags: ['Digital Innovation', 'Growth Strategy', 'Analytics & Digital', 'M&A Advisory'],
    cta: 'All Growth Solutions'
  },
  {
    title: 'Reinsurance & Capital',
    subtitle: 'Solutions',
    tags: ['Digital Innovation', 'Growth Strategy', 'Analytics & Digital', 'M&A Advisory'],
    cta: 'All Growth Solutions'
  }
];

const BOTTOM_LISTS = [
  {
    title: 'By Role',
    subtitle: 'Solutions tailored to your leadership position',
    items: [
      { label: 'Business & Strategy Leaders', badge: 'Popular' },
      { label: 'Risk & Insurance Leaders', badge: '' },
      { label: 'People & Workforce Leaders', badge: '' },
      { label: 'Technology & Cyber Leaders', badge: '' },
      { label: 'Governance & Oversight', badge: '' }
    ]
  },
  {
    title: 'By Organization',
    subtitle: 'Choose by company size and structure',
    items: [
      { label: 'Large Enterprises', badge: 'New' },
      { label: 'Mid-Market Companies', badge: '' },
      { label: 'Public Sector & Nonprofits', badge: '' },
      { label: 'High-Growth & PE Backed', badge: '' }
    ]
  },
  {
    title: 'Insights',
    subtitle: 'Latest research and industry trends',
    items: [
      { label: 'AI & Cyber Risk', badge: '' },
      { label: 'Climate Transition', badge: '' },
      { label: 'Global Talent Trends', badge: '' },
      { label: 'Market Insights', badge: '' }
    ]
  }
];

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, offsetTop }) => {
  // Previously the only way to close this dialog was clicking the backdrop
  // — a keyboard-only user had no way to dismiss it at all. Effect (not a
  // conditional hook) so it still runs every render per the Rules of
  // Hooks; the isOpen check lives inside the callback instead.
  React.useEffect(() => {
    if (!isOpen || !onClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const node = typeof document !== 'undefined' ? document.body : null;
  if (!node) return null;

  const topOffset = offsetTop ?? 64;

  const content = (
    <>
      {/* Decorative click-to-dismiss backdrop, not the only way to close —
          Escape (registered above) is the real keyboard path. */}
      <div
        aria-hidden="true"
        className={styles.overlay}
        onClick={onClose}
        style={{ top: topOffset, height: `calc(100vh - ${topOffset}px)` }}
      />
      <Box
        className={styles.megaMenuWrapper}
        role="dialog"
        aria-modal="true"
        sx={{ top: topOffset }}
      >
        <div className="container">
          <Box className={styles.containerInner}>
            <Divider className={styles.divider} />

            {/* Top Grid: Solutions Header + What Right Solution (AI) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box className={styles.solutionsHeader} sx={{ maxWidth: '400px' }}>
                <Typography variant="h5" component="h2" className={styles.solutionsTitle}>Solutions</Typography>
                <Typography variant="caption" className={styles.solutionsSubtitle}>Comprehensive protect Property & Casualty on and growth</Typography>
              </Box>

              <Box className={styles.aiSolutionTop}>
                 <Box className={styles.aiHeaderTop}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#000f47' }}>What right solution</Typography>
                    <Box className={styles.aiLogoCircleSmall}>
                      <img src={MARSH_M_LOGO} alt="M" className={styles.aiLogoSmall} />
                    </Box>
                 </Box>
                 <Box className={styles.aiChipsTop}>
                    {['Financial Institutions', 'Energy & Oil & Gas', 'Manufacturing', 'Healthcare', 'Real Estate', 'Aviation'].slice(0, 6).map(chip => (
                      <Chip key={chip} label={chip} variant="outlined" size="sm" className={styles.aiChipSmall} />
                    ))}
                 </Box>
              </Box>
            </Box>

            <div className="row g-4">
              {SOLUTION_PILLARS.map((pillar, idx) => (
                <div className="col-12 col-sm-6 col-md-3" key={idx}>
                  <Box className={styles.pillarCard}>
                    <Typography variant="subtitle1" component="h3" className={styles.pillarTitle}>
                      <strong>{pillar.title}</strong> {pillar.subtitle}
                    </Typography>
                    <Box className={styles.pillarTags}>
                      {pillar.tags.map(tag => (
                        <Typography key={tag} variant="caption" className={styles.pillarTag}>{tag}</Typography>
                      ))}
                    </Box>
                    <Typography variant="button" className={styles.pillarCta}>
                      &rarr; {pillar.cta}
                    </Typography>
                  </Box>
                </div>
              ))}
            </div>

            <Box className={styles.bottomSection}>
              <div className="row g-4">
                {BOTTOM_LISTS.map((list, idx) => (
                  <div className="col-12 col-md-2" key={idx}>
                    <Typography variant="subtitle2" component="h4" className={styles.listTitle}>{list.title}</Typography>
                    {list.subtitle && (
                      <Typography variant="caption" sx={{ display: 'block', mb: 1.5, color: '#595959', lineHeight: 1.2 }}>
                        {list.subtitle}
                      </Typography>
                    )}
                    <Box className={styles.list}>
                      {list.items.map(item => (
                        <Box key={item.label} className={styles.listItem}>
                          <Typography variant="body2" sx={{ fontSize: '13px' }}>{item.label}</Typography>
                          {item.badge && <span className={styles.badge}>{item.badge}</span>}
                        </Box>
                      ))}
                    </Box>
                  </div>
                ))}

                {/* Banner CTA Section - Teal Box from Screenshot */}
                <div className="col-12 col-md-6">
                  <Box className={styles.bannerCta}>
                    <Box className={styles.bannerContent}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#000f47', mb: 1 }}>Headline</Typography>
                      <Typography variant="body2" sx={{ color: '#000f47', mb: 2, maxWidth: '200px', fontSize: '13px' }}>
                        Lorem ipsum dolor sit amet consectetur. Viverra nunc pellentesque morbi curabitur purus senectus.
                      </Typography>
                      <Typography variant="button" sx={{ fontWeight: 800, color: '#000f47', cursor: 'pointer', borderBottom: '1px solid currentColor' }}>
                        [Banner CTA]
                      </Typography>
                    </Box>
                    <Box className={styles.bannerImagePlaceholder}>
                      <Typography variant="caption" sx={{ opacity: 0.5 }}>Image</Typography>
                    </Box>
                  </Box>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );

  return createPortal(content, node);
};
