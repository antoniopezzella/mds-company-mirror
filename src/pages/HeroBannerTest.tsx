import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Divider, Select, MenuItem, Chip, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { WebsiteHeader } from '../components/Header/Header';
import { HeroBanner } from '../components/sections/HeroBanner/HeroBanner';
import { getContrastRatio, formatContrastRatio, getWCAGLevel } from '../utils/contrastChecker';
import gsap from 'gsap';

const mockContent = {
  en: {
    name: 'English',
    eyebrow: 'Corporate',
    title: 'Four powerful brand legacies coming together to create one bold future for our clients and colleagues.',
    subtitle: 'Heading 2',
    description: 'Lorem ipsum dolor sit amet consectetur. Vivamus quis in volutpat feugiat molestie in senectus sed sed velit odio, volutpat feugiat molestie in senectus sed sed velit odio',
    primaryCta: 'Download Report',
    secondaryCta: 'Talk to Our Experts'
  },
  es: {
    name: 'Español',
    eyebrow: 'Corporativo',
    title: 'Cuatro poderosos legados de marca se unen para crear un futuro audaz para nuestros clientes y colegas.',
    subtitle: 'Encabezado 2',
    description: 'El dolor en sí es muy importante, pero a veces ocurre de tal manera que el trabajo y el dolor no te permiten concentrarte. Vivimos en un mundo confuso con grandes problemas de la sociedad.',
    primaryCta: 'Descargar Informe',
    secondaryCta: 'Hablar con Expertos'
  },
  de: {
    name: 'Deutsch',
    eyebrow: 'Unternehmen',
    title: 'Vier starke Markenvermächtnisse schließen sich zusammen, um eine mutige Zukunft für unsere Kunden und Kollegen zu schaffen.',
    subtitle: 'Überschrift 2',
    description: 'Man sollte den Schmerz des Lebens schätzen, doch die Realität zwingt uns, oft mit Schwierigkeiten zu kämpfen. Wir erleben ein tiefgreifendes Gefühl der Verantwortung für unsere zukünftigen Ziele.',
    primaryCta: 'Bericht Herunterladen',
    secondaryCta: 'Sprechen Sie mit uns'
  },
  tr: {
    name: 'Türkçe',
    eyebrow: 'Kurumsal',
    title: 'Dört güçlü marka mirası, müşterilerimiz ve çalışanlarımız için cesur bir gelecek yaratmak üzere bir araya geliyor.',
    subtitle: 'Başlık 2',
    description: 'Acının kendisi çok önemlidir, ancak bazen öyle bir şekilde ortaya çıkar ki, çalışmak ve acı konsantre olmanıza izin vermez. Büyük toplumsal sorunların olduğu kafa karıştırıcı bir dünyada yaşıyoruz.',
    primaryCta: 'Raporu İndir',
    secondaryCta: 'Uzmanlarımızla Konuşun'
  },
  fr: {
    name: 'Français',
    eyebrow: 'Entreprise',
    title: 'Quatre puissants héritages de marques s\'unissent pour créer un avenir audacieux pour nos clients et collègues.',
    subtitle: 'Titre 2',
    description: 'La douleur elle-même est très importante, mais parfois elle survient de telle manière que le travail et la douleur ne vous permettent pas de vous concentrer.',
    primaryCta: 'Télécharger le Rapport',
    secondaryCta: 'Parlez à nos Experts'
  }
};

type Language = keyof typeof mockContent;
type BannerSize = 'full' | 'medium' | 'small';

const bannerSizeHeights: Record<BannerSize, string> = {
  full: '100vh',
  medium: '70vh',
  small: '50vh',
};

const panelTextColor = '#000f47';
const panelMutedTextColor = '#303c37';
const panelLabelSx = {
  color: panelMutedTextColor,
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: '18px',
  mb: 0.75,
  '&.Mui-focused': {
    color: panelTextColor,
  },
  '&.Mui-disabled': {
    color: panelMutedTextColor,
    opacity: 0.78,
  },
};
const panelOptionLabel = (label: string) => (
  <Typography
    variant="body2"
    sx={{
      color: panelTextColor,
      fontSize: '14px',
      lineHeight: '20px',
    }}
  >
    {label}
  </Typography>
);

const HeroBannerTest: React.FC = () => {
  const [layout, setLayout] = useState<'split' | 'background'>('split');
  const [imagePosition, setImagePosition] = useState<'left' | 'right'>('right');
  const [variant, setVariant] = useState<'dark' | 'light'>('dark');
  const [bannerSize, setBannerSize] = useState<BannerSize>('full');
  const [showSubtitle, setShowSubtitle] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showCmsHints, setShowCmsHints] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('en');
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'both'>('video');
  const [numBanners, setNumBanners] = useState<1 | 2 | 3>(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  const content = mockContent[language];

  // Banner configurations for each slide
  const bannerConfigs = [
    { variant: 'dark' as const, layout: 'split' as const, mediaType: 'video' as const, label: 'Dark Split Video' },
    { variant: 'dark' as const, layout: 'background' as const, mediaType: 'video' as const, label: 'Dark Background Video' },
    { variant: 'light' as const, layout: 'split' as const, mediaType: 'image' as const, label: 'Light Split Image' },
  ].slice(0, numBanners);

  // GSAP slide animation
  const goToSlide = (index: number) => {
    if (index < 0 || index >= bannerConfigs.length || index === currentSlide) return;
    
    const direction = index > currentSlide ? -100 : 100;
    const currentElement = slidesRef.current[currentSlide];
    const nextElement = slidesRef.current[index];

    if (!currentElement || !nextElement) return;

    gsap.timeline()
      .set(nextElement, { xPercent: -direction, opacity: 0 })
      .to(currentElement, { 
        xPercent: direction, 
        opacity: 0, 
        duration: 0.6, 
        ease: 'power2.inOut' 
      })
      .to(nextElement, { 
        xPercent: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: 'power2.inOut' 
      }, '<');

    setCurrentSlide(index);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % bannerConfigs.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + bannerConfigs.length) % bannerConfigs.length);

  // Calculate contrast ratio for current slide
  const currentConfig = bannerConfigs[currentSlide];
  const textColor = currentConfig.variant === 'dark' ? '#ceecff' : '#000f47'; // Sky blue or Midnight blue
  const bgColor = variant === 'dark' ? '#000f47' : '#ffffff'; // Midnight blue or White
  const contrastRatio = getContrastRatio(textColor, bgColor);
  const wcagLevel = getWCAGLevel(contrastRatio, true); // true = large text (H1)
  const isPass = wcagLevel !== 'FAIL';

  return (
    <Box sx={{ position: 'relative' }}>
      <WebsiteHeader />
      
      {/* Contrast Indicator Badge */}
      <Paper
        elevation={4}
        sx={{
          position: 'fixed',
          top: 80,
          left: 24,
          zIndex: 1300,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minWidth: '200px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          border: `2px solid ${isPass ? '#2e7d32' : '#d32f2f'}`,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '11px', color: '#000f47', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Contrast Check
        </Typography>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 24, height: 24, backgroundColor: textColor, border: '1px solid #ccc', borderRadius: '4px' }} />
          <Typography variant="caption" sx={{ fontSize: '11px', color: '#666' }}>
            Text: {textColor}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 24, height: 24, backgroundColor: bgColor, border: '1px solid #ccc', borderRadius: '4px' }} />
          <Typography variant="caption" sx={{ fontSize: '11px', color: '#666' }}>
            BG: {bgColor}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '16px', color: '#000f47' }}>
            {formatContrastRatio(contrastRatio)}
          </Typography>
          <Chip
            label={wcagLevel}
            size="small"
            sx={{
              backgroundColor: isPass ? '#4caf50' : '#f44336',
              color: '#fff',
              fontWeight: 700,
              fontSize: '11px',
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ fontSize: '10px', color: '#999', mt: -0.5 }}>
          {isPass ? '✓ WCAG AA Pass (Large Text)' : '✗ WCAG AA Fail'}
        </Typography>
      </Paper>

      {/* Carousel Container */}
      <Box 
        ref={carouselRef}
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {/* Slides */}
        {bannerConfigs.map((config, index) => {
          const slideMediaType = config.mediaType;
          return (
            <Box
              key={index}
              ref={(el) => { if (el) slidesRef.current[index] = el; }}
              sx={{
                position: index === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: index === 0 ? 1 : 0,
              }}
            >
              <HeroBanner
                eyebrow={content.eyebrow}
                title={content.title}
                subtitle={showSubtitle ? content.subtitle : undefined}
                description={showDescription ? content.description : undefined}
                maxTitleChars={60}
                maxDescriptionChars={120}
                showCmsHints={showCmsHints}
                primaryCta={{
                  text: content.primaryCta,
                  onClick: () => {},
                }}
                secondaryCta={{
                  text: content.secondaryCta,
                  onClick: () => {},
                }}
                videoSrc={slideMediaType === 'video' || slideMediaType === 'both' ? "/video/WebsiteHeaderVideo-960x900_V1 (1).mp4" : undefined}
                videoPoster={slideMediaType === 'video' || slideMediaType === 'both' ? "/images/journey-aviation.jpg" : undefined}
                imageSrc={slideMediaType === 'image' || slideMediaType === 'both' ? "/images/journey-aviation.jpg" : undefined}
                imageAlt="Aerial city intersection view"
                variant={config.variant}
                height={bannerSizeHeights[bannerSize]}
                layout={config.layout}
                imagePosition={imagePosition}
              />
            </Box>
          );
        })}

        {/* Navigation Arrows (only show if multiple banners) */}
        {numBanners > 1 && (
          <>
            <IconButton
              onClick={prevSlide}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 20, color: '#000f47' }} />
            </IconButton>
            <IconButton
              onClick={nextSlide}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 20, color: '#000f47' }} />
            </IconButton>
          </>
        )}

        {/* Pagination Dots */}
        {numBanners > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              gap: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              p: 1,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            {bannerConfigs.map((config, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  width: currentSlide === index ? 32 : 8,
                  height: 8,
                  borderRadius: '4px',
                  backgroundColor: currentSlide === index ? '#000f47' : '#ccc',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: currentSlide === index ? '#000f47' : '#999',
                  },
                }}
                title={config.label}
              />
            ))}
          </Box>
        )}

        {/* Slide Label Badge */}
        {numBanners > 1 && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: 80,
              right: 24,
              zIndex: 10,
              px: 2,
              py: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#000f47', fontSize: '12px' }}>
              {bannerConfigs[currentSlide].label}
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Floating Toggle Panel */}
      <Paper
        elevation={6}
        sx={{
          position: { xs: 'static', lg: 'fixed' },
          bottom: { lg: 24 },
          right: { lg: 24 },
          m: { xs: 2, md: 3, lg: 0 },
          p: { xs: 2, md: 3 },
          zIndex: 1200,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.5, md: 2 },
          width: { xs: 'auto', lg: '250px' },
          minWidth: { lg: '250px' },
          maxHeight: { lg: 'calc(100vh - 48px)' },
          overflowY: { lg: 'auto' },
          color: panelTextColor,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(0, 15, 71, 0.18)',
          boxShadow: '0 18px 48px rgba(0, 15, 71, 0.22)',
          '& .MuiFormControlLabel-label': {
            color: panelTextColor,
          },
          '& .Mui-disabled .MuiFormControlLabel-label': {
            color: panelMutedTextColor,
            opacity: 0.78,
          },
          '& .MuiRadio-root': {
            color: panelTextColor,
          },
          '& .MuiRadio-root.Mui-checked': {
            color: panelTextColor,
          },
          '& .MuiRadio-root.Mui-disabled': {
            color: panelMutedTextColor,
            opacity: 0.78,
          },
          '& .MuiDivider-root': {
            borderColor: 'rgba(0, 15, 71, 0.16)',
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ color: panelTextColor, fontWeight: 700, mb: 1, fontFamily: 'var(--typo-body1-font-family)' }}>
          Hero Banner Settings
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <FormControl>
          <FormLabel sx={panelLabelSx}>Banner Size</FormLabel>
          <RadioGroup row value={bannerSize} onChange={(e) => setBannerSize(e.target.value as BannerSize)}>
            <FormControlLabel value="full" control={<Radio size="small" />} label={panelOptionLabel('Full')} />
            <FormControlLabel value="medium" control={<Radio size="small" />} label={panelOptionLabel('Medium')} />
            <FormControlLabel value="small" control={<Radio size="small" />} label={panelOptionLabel('Small')} />
          </RadioGroup>
          <Typography
            variant="caption"
            sx={{
              color: panelMutedTextColor,
              fontSize: '12px',
              lineHeight: '16px',
            }}
          >
            Full 100vh · Medium 70vh · Small 50vh
          </Typography>
        </FormControl>
        
        <FormControl>
          <FormLabel sx={panelLabelSx}>Content</FormLabel>
          <RadioGroup row value={showSubtitle ? 'show' : 'hide'} onChange={(e) => setShowSubtitle(e.target.value === 'show')}>
            <FormControlLabel value="show" control={<Radio size="small" />} label={panelOptionLabel('Show H2')} />
            <FormControlLabel value="hide" control={<Radio size="small" />} label={panelOptionLabel('Hide H2')} />
          </RadioGroup>
          <RadioGroup row value={showDescription ? 'show' : 'hide'} onChange={(e) => setShowDescription(e.target.value === 'show')}>
            <FormControlLabel value="show" control={<Radio size="small" />} label={panelOptionLabel('Show Body')} />
            <FormControlLabel value="hide" control={<Radio size="small" />} label={panelOptionLabel('Hide Body')} />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel sx={panelLabelSx}>Media Type</FormLabel>
          <RadioGroup value={mediaType} onChange={(e) => setMediaType(e.target.value as 'video' | 'image' | 'both')}>
            <FormControlLabel value="video" control={<Radio size="small" />} label={panelOptionLabel('Video Only')} />
            <FormControlLabel value="image" control={<Radio size="small" />} label={panelOptionLabel('Image Only')} />
            <FormControlLabel value="both" control={<Radio size="small" />} label={panelOptionLabel('Video + Image')} />
          </RadioGroup>
          <Typography
            variant="caption"
            sx={{
              color: panelMutedTextColor,
              fontSize: '12px',
              lineHeight: '16px',
              mt: 0.5,
            }}
          >
            Video: autoplay background · Image: static · Both: video with image overlay
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel sx={panelLabelSx}>Number of Banners</FormLabel>
          <RadioGroup row value={numBanners} onChange={(e) => setNumBanners(Number(e.target.value) as 1 | 2 | 3)}>
            <FormControlLabel value={1} control={<Radio size="small" />} label={panelOptionLabel('1')} />
            <FormControlLabel value={2} control={<Radio size="small" />} label={panelOptionLabel('2')} />
            <FormControlLabel value={3} control={<Radio size="small" />} label={panelOptionLabel('3')} />
          </RadioGroup>
          <Typography
            variant="caption"
            sx={{
              color: panelMutedTextColor,
              fontSize: '12px',
              lineHeight: '16px',
              mt: 0.5,
            }}
          >
            Compare multiple banners side-by-side
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel sx={panelLabelSx}>Layout</FormLabel>
          <RadioGroup row value={layout} onChange={(e) => setLayout(e.target.value as 'split' | 'background')}>
            <FormControlLabel value="split" control={<Radio size="small" />} label={panelOptionLabel('50/50 Split')} />
            <FormControlLabel value="background" control={<Radio size="small" />} label={panelOptionLabel('Full Background')} />
          </RadioGroup>
        </FormControl>

        <FormControl disabled={layout === 'background'}>
          <FormLabel sx={panelLabelSx}>Media Position (Split Only)</FormLabel>
          <RadioGroup row value={imagePosition} onChange={(e) => setImagePosition(e.target.value as 'left' | 'right')}>
            <FormControlLabel value="left" control={<Radio size="small" />} label={panelOptionLabel('Left')} />
            <FormControlLabel value="right" control={<Radio size="small" />} label={panelOptionLabel('Right')} />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel sx={panelLabelSx}>Language (i18n Test)</FormLabel>
          <Select
            size="small"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            sx={{
              color: panelTextColor,
              fontSize: '14px',
              fontFamily: 'var(--typo-body1-font-family)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 15, 71, 0.36)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: panelTextColor,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: panelTextColor,
              },
              '& .MuiSvgIcon-root': {
                color: panelTextColor,
              },
            }}
          >
            {Object.entries(mockContent).map(([code, data]) => (
              <MenuItem key={code} value={code} sx={{ fontSize: '14px' }}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel sx={panelLabelSx}>Color Variant Theme</FormLabel>
          <RadioGroup row value={variant} onChange={(e) => setVariant(e.target.value as 'dark' | 'light')}>
            <FormControlLabel value="dark" control={<Radio size="small" />} label={panelOptionLabel('Dark')} />
            <FormControlLabel value="light" control={<Radio size="small" />} label={panelOptionLabel('Light')} />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel sx={panelLabelSx}>CMS Helpers</FormLabel>
          <RadioGroup row value={showCmsHints ? 'show' : 'hide'} onChange={(e) => setShowCmsHints(e.target.value === 'show')}>
            <FormControlLabel value="show" control={<Radio size="small" />} label={panelOptionLabel('Show Character Counts')} />
            <FormControlLabel value="hide" control={<Radio size="small" />} label={panelOptionLabel('Hide')} />
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default HeroBannerTest;
