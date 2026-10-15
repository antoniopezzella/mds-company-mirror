import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, Divider } from '@mui/material';
import { Settings, X } from 'lucide-react';
import { DSSelect } from '../components/ui/select';

// Shared settings panel for /hero-banner-test and /hero-banner-grid-test —
// extracted so the two test harnesses can't drift in how they present
// controls (they already share the exact same media-type/layout/size
// matrix; this makes the UI share that guarantee too). Collapsed by
// default and anchored top-right (below the fixed header) specifically so
// it never sits over the hero's own play/pause button, which lives
// bottom-right of the media column — the old always-open, bottom-right
// panel routinely overlapped it.

export type BannerSize = 'full' | 'medium' | 'small';
export type MediaType = 'video' | 'video1080p' | 'vimeo' | 'vimeo1080p' | 'vimeoBroken' | 'image' | 'both';

export interface HeroBannerTestSettings {
  bannerSize: BannerSize;
  showSubtitle: boolean;
  showDescription: boolean;
  mediaType: MediaType;
  numBanners: 1 | 2 | 3;
  layout: 'split' | 'background';
  imagePosition: 'left' | 'right';
  language: string;
  variant: 'dark' | 'light';
  showCmsHints: boolean;
}

export interface HeroBannerTestControlsProps {
  title: string;
  values: HeroBannerTestSettings;
  onChange: <K extends keyof HeroBannerTestSettings>(key: K, value: HeroBannerTestSettings[K]) => void;
  languageOptions: Record<string, { name: string }>;
}

const panelTextColor = '#000f47';

const mediaTypeOptions: { value: MediaType; label: string }[] = [
  { value: 'video', label: 'Video Only (960×900)' },
  { value: 'video1080p', label: 'Video Only (1920×1080)' },
  { value: 'vimeo', label: 'Vimeo (960×900)' },
  { value: 'vimeo1080p', label: 'Vimeo (landscape HD)' },
  { value: 'vimeoBroken', label: 'Vimeo (broken — tests fallback)' },
  { value: 'image', label: 'Image Only' },
  { value: 'both', label: 'Video + Image' },
];

export const HeroBannerTestControls: React.FC<HeroBannerTestControlsProps> = ({
  title,
  values,
  onChange,
  languageOptions,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close test settings' : 'Open test settings'}
        sx={{
          position: 'fixed',
          top: 88,
          right: 16,
          zIndex: 1300,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 15, 71, 0.18)',
          boxShadow: '0 8px 24px rgba(0, 15, 71, 0.18)',
          '&:hover': { backgroundColor: '#fff' },
        }}
      >
        {open ? <X size={20} color={panelTextColor} /> : <Settings size={20} color={panelTextColor} />}
      </IconButton>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            top: 136,
            right: 16,
            left: { xs: 16, sm: 'auto' },
            zIndex: 1299,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: { xs: 'auto', sm: '280px' },
            maxHeight: 'calc(100vh - 152px)',
            overflowY: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(0, 15, 71, 0.18)',
            boxShadow: '0 18px 48px rgba(0, 15, 71, 0.22)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ color: panelTextColor, fontWeight: 700, fontFamily: 'var(--typo-body1-font-family)' }}>
              {title}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(0, 15, 71, 0.16)' }} />

          <DSSelect
            size="sm"
            fullWidth
            label="Banner Size"
            value={values.bannerSize}
            onChange={(value) => onChange('bannerSize', value as BannerSize)}
            options={[
              { value: 'full', label: 'Full (100vh)' },
              { value: 'medium', label: 'Medium (70vh)' },
              { value: 'small', label: 'Small (50vh)' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Subtitle (H2)"
            value={values.showSubtitle ? 'show' : 'hide'}
            onChange={(value) => onChange('showSubtitle', value === 'show')}
            options={[
              { value: 'show', label: 'Show' },
              { value: 'hide', label: 'Hide' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Body Text"
            value={values.showDescription ? 'show' : 'hide'}
            onChange={(value) => onChange('showDescription', value === 'show')}
            options={[
              { value: 'show', label: 'Show' },
              { value: 'hide', label: 'Hide' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Media Type"
            value={values.mediaType}
            onChange={(value) => onChange('mediaType', value as MediaType)}
            options={mediaTypeOptions}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Number of Banners"
            value={values.numBanners}
            onChange={(value) => onChange('numBanners', value as 1 | 2 | 3)}
            options={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Layout"
            value={values.layout}
            onChange={(value) => onChange('layout', value as 'split' | 'background')}
            options={[
              { value: 'split', label: '50/50 Split' },
              { value: 'background', label: 'Full Background' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            disabled={values.layout === 'background'}
            label="Media Position (Split Only)"
            value={values.imagePosition}
            onChange={(value) => onChange('imagePosition', value as 'left' | 'right')}
            options={[
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Language (i18n Test)"
            value={values.language}
            onChange={(value) => onChange('language', value as string)}
            options={Object.entries(languageOptions).map(([code, data]) => ({ value: code, label: data.name }))}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="Color Variant Theme"
            value={values.variant}
            onChange={(value) => onChange('variant', value as 'dark' | 'light')}
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
            ]}
          />

          <DSSelect
            size="sm"
            fullWidth
            label="CMS Helpers"
            value={values.showCmsHints ? 'show' : 'hide'}
            onChange={(value) => onChange('showCmsHints', value === 'show')}
            options={[
              { value: 'show', label: 'Show Character Counts' },
              { value: 'hide', label: 'Hide' },
            ]}
          />
        </Paper>
      )}
    </>
  );
};

export default HeroBannerTestControls;
