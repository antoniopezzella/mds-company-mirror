import React, { useState, useRef } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { WebsiteHeader } from '../components/Header/Header';
import { HeroBanner } from '../components/sections/HeroBanner/HeroBanner';
import { MetricsSection } from '../components/sections/MetricsSection';
import { HeroBannerTestControls, type HeroBannerTestSettings } from './HeroBannerTestControls';
import gsap from 'gsap';

const nextSectionMetrics = [
  { value: '130+', label: 'Countries served worldwide' },
  { value: '$5.5B', label: 'Global insurance placements' },
  { value: '25M', label: 'Lives touched every year' },
];

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

const bannerSizeHeights: Record<HeroBannerTestSettings['bannerSize'], string> = {
  full: '100vh',
  medium: '70vh',
  small: '50vh',
};

const languageOptions = Object.fromEntries(
  Object.entries(mockContent).map(([code, data]) => [code, { name: data.name }])
);

const HeroBannerTest: React.FC = () => {
  const [layout, setLayout] = useState<HeroBannerTestSettings['layout']>('split');
  const [imagePosition, setImagePosition] = useState<HeroBannerTestSettings['imagePosition']>('right');
  const [variant, setVariant] = useState<HeroBannerTestSettings['variant']>('dark');
  const [bannerSize, setBannerSize] = useState<HeroBannerTestSettings['bannerSize']>('full');
  const [showSubtitle, setShowSubtitle] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showCmsHints, setShowCmsHints] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');
  const [mediaType, setMediaType] = useState<HeroBannerTestSettings['mediaType']>('video');
  const [numBanners, setNumBanners] = useState<1 | 2 | 3>(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  const content = mockContent[language];

  const settings: HeroBannerTestSettings = {
    bannerSize, showSubtitle, showDescription, mediaType, numBanners, layout, imagePosition, language, variant, showCmsHints,
  };
  const updateSetting = <K extends keyof HeroBannerTestSettings>(key: K, value: HeroBannerTestSettings[K]) => {
    switch (key) {
      case 'bannerSize': setBannerSize(value as HeroBannerTestSettings['bannerSize']); break;
      case 'showSubtitle': setShowSubtitle(value as boolean); break;
      case 'showDescription': setShowDescription(value as boolean); break;
      case 'mediaType': setMediaType(value as HeroBannerTestSettings['mediaType']); break;
      case 'numBanners': setNumBanners(value as 1 | 2 | 3); break;
      case 'layout': setLayout(value as HeroBannerTestSettings['layout']); break;
      case 'imagePosition': setImagePosition(value as HeroBannerTestSettings['imagePosition']); break;
      case 'language': setLanguage(value as Language); break;
      case 'variant': setVariant(value as HeroBannerTestSettings['variant']); break;
      case 'showCmsHints': setShowCmsHints(value as boolean); break;
    }
  };

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

  return (
    <Box sx={{ position: 'relative' }}>
      <WebsiteHeader />

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
          return (
            <Box
              key={index}
              ref={(el: HTMLDivElement | null) => { if (el) slidesRef.current[index] = el; }}
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
                vimeoId={
                  mediaType === 'vimeoBroken' ? "999999999999" : // out of range — proves the Player.js error fallback works
                  mediaType === 'vimeo1080p' ? "863362136" : // Vimeo's own official showcase video — verified 4/4 reliable loads, unlike the free-stock clips tried earlier
                  mediaType === 'vimeo' ? "1146072483" : undefined
                }
                videoSrc={
                  mediaType === 'video1080p' ? "/video/test-1920x1080.mp4" :
                  mediaType === 'video' || mediaType === 'both' ? "/video/WebsiteHeaderVideo-960x900_V1 (1).mp4" : undefined
                }
                videoPoster={mediaType === 'video' || mediaType === 'both' || mediaType === 'video1080p' ? "/images/journey-aviation.jpg" : undefined}
                imageSrc={
                  mediaType === 'image' || mediaType === 'both' ||
                  mediaType === 'vimeo' || mediaType === 'vimeo1080p' || mediaType === 'vimeoBroken'
                    ? "/images/journey-aviation.jpg" : undefined
                }
                imageAlt="Aerial city intersection view"
                variant={numBanners === 1 ? variant : config.variant}
                height={bannerSizeHeights[bannerSize]}
                layout={numBanners === 1 ? layout : config.layout}
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

      {/* Next Section - Tests content flow/spacing directly below the hero banner */}
      <MetricsSection
        title="Trusted by organizations around the world"
        description="A quick look at the scale we operate at, placed right under the hero to check spacing, gradient overlap, and scroll handoff."
        metrics={nextSectionMetrics}
      />

      <HeroBannerTestControls
        title="Hero Banner Settings"
        values={settings}
        onChange={updateSetting}
        languageOptions={languageOptions}
      />
    </Box>
  );
};

export default HeroBannerTest;
