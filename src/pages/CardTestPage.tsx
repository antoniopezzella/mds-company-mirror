import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InsightsIcon from '@mui/icons-material/Insights';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import gsap from 'gsap';
import { lightTheme, darkTheme } from '../theme';
import CardWebsite, { type CardSurface, type CardLayout, type CardAR } from '../components/CardWebsite/CardWebsite';
import CarouselSection from '../components/sections/CarouselSection';

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang         = 'en' | 'tr' | 'de' | 'fr' | 'ja';
type CardState    = 'default' | 'hover' | 'active' | 'focus' | 'skeleton';
type SectionSurface = 'default' | 'accent' | 'secondary' | 'hero';

// ─── Content maps ─────────────────────────────────────────────────────────────

const LANG_CONTENT: Record<Lang, { title: string; description: string; category: string; timestamp: string; datetime: string }> = {
  en: { title: 'Global Insurance Market Index — Q2 2026 Update on Commercial Premium Pricing', description: 'Our proprietary measure of global commercial insurance premium pricing shows a moderation in rate increases across most major lines of business.', category: 'Report', timestamp: '10 Jun 2026', datetime: '2026-06-10' },
  tr: { title: 'Küresel Sigorta Piyasası Endeksi — 2026 2. Çeyrek Ticari Prim Güncellemesi', description: 'Ticari sigorta prim fiyatlandırmasının tescilli ölçütümüz, çoğu büyük iş kolunda oran artışlarında bir yavaşlama olduğunu ortaya koymaktadır.', category: 'Rapor', timestamp: '10 Haz 2026', datetime: '2026-06-10' },
  de: { title: 'Globaler Versicherungsmarktindex — Aktualisierung Q2 2026 zur Prämienpreisentwicklung', description: 'Unser proprietäres Maß für die Preisgestaltung kommerzieller Versicherungsprämien zeigt eine Verlangsamung der Preiserhöhungen in den meisten Geschäftsbereichen.', category: 'Bericht', timestamp: '10. Jun. 2026', datetime: '2026-06-10' },
  fr: { title: "Indice mondial du marché de l'assurance — Mise à jour T2 2026", description: "Notre mesure exclusive des prix des primes d'assurance commerciale mondiale révèle une modération des hausses tarifaires dans la plupart des grandes lignes d'activité.", category: 'Rapport', timestamp: '10 juin 2026', datetime: '2026-06-10' },
  ja: { title: 'グローバル保険市場インデックス — 2026年第2四半期商業保険料価格更新レポート', description: '当社独自のグローバル商業保険料価格の測定値によると、主要な事業分野全体にわたり料率上昇の緩和が示されています。', category: 'レポート', timestamp: '2026年6月10日', datetime: '2026-06-10' },
};

const CARD_STATES: { value: CardState; label: string }[] = [
  { value: 'default',  label: 'Default'        },
  { value: 'hover',    label: 'Hover'          },
  { value: 'active',   label: 'Active / Pressed' },
  { value: 'focus',    label: 'Focus'          },
  { value: 'skeleton', label: 'Skeleton'       },
];

const STATE_PROPS: Record<CardState, Partial<React.ComponentProps<typeof CardWebsite>>> = {
  default:  {},
  hover:    { forceState: 'hover' },
  active:   { forceState: 'active' },
  focus:    { forceState: 'focus' },
  skeleton: { skeleton: true },
};

const SURFACE_COLOR: Record<CardSurface, string> = {
  white:   '#ffffff',
  neutral: '#f7f8f8',
  sky:     '#ceecff',
  primary: '#000f47',
};

const SECTION_META: Record<SectionSurface, { label: string; color: string; hint: string; cardSurface: CardSurface }> = {
  default:   { label: 'White',     color: '#ffffff', hint: 'On Neutral',    cardSurface: 'white'   },
  accent:    { label: 'Neutral',   color: '#f7f8f8', hint: 'On Neutral',    cardSurface: 'neutral' },
  secondary: { label: 'Secondary', color: '#ceecff', hint: 'On Secondary',  cardSurface: 'sky'     },
  hero:      { label: 'Primary',   color: '#000f47', hint: 'On Primary',    cardSurface: 'primary' },
};

const CAROUSEL_ITEMS_BASE = [
  { id: 'c1', title: 'Global Insurance Market Index — Q2 2026 Update', description: 'Our proprietary measure of global commercial insurance premium pricing shows a moderation in rate increases.', category: 'Report', timestamp: '10 Jun 2026', datetime: '2026-06-10', imageSrc: '/images/journey-aviation.jpg', imageAlt: 'Aerial view of aircraft', href: '#c1' },
  { id: 'c2', title: 'Cyber Risk Landscape: What Boards Need to Know in 2026', description: 'Ransomware attacks continue to evolve — organisations must align board governance with operational cyber resilience.', category: 'Insight', timestamp: '5 Jun 2026', datetime: '2026-06-05', imageSrc: '/images/journey-aviation.jpg', imageAlt: 'Digital network visualization', href: '#c2' },
  { id: 'c3', title: 'Climate Transition Risk: Building Corporate Resilience', description: 'Physical and transition climate risks are converging. A structured approach for enterprise strategy.', category: 'Research', timestamp: '28 May 2026', datetime: '2026-05-28', imageSrc: '/images/journey-aviation.jpg', imageAlt: 'Wind turbines at sunset', href: '#c3' },
  { id: 'c4', title: 'Supply Chain Disruption: New Approaches to Risk Transfer', description: 'Multi-tier supply chain exposures require innovative insurance structures.', category: 'Report', timestamp: '20 May 2026', datetime: '2026-05-20', hasImage: false, icon: <InsightsIcon sx={{ fontSize: 48 }} />, href: '#c4' },
  { id: 'c5', title: 'D&O Liability: Navigating a Hardening Market', description: 'D&O premiums continue to firm. Key coverage enhancements available to clients across sectors.', category: 'Market Update', timestamp: '15 May 2026', datetime: '2026-05-15', imageSrc: '/images/journey-aviation.jpg', imageAlt: 'Corporate office building', href: '#c5' },
  { id: 'c6', title: 'Political Risk Monitor: Emerging Market Exposures', description: 'Trade policy volatility and geopolitical instability are reshaping risk profiles globally.', category: 'Monitor', timestamp: '8 May 2026', datetime: '2026-05-08', imageSrc: '/images/journey-aviation.jpg', imageAlt: 'World map with risk regions', href: '#c6' },
];

// ─── Sidebar atoms ─────────────────────────────────────────────────────────────

interface SideGroupProps { label: string; children: React.ReactNode; isDark: boolean }
const SideGroup = ({ label, children, isDark }: SideGroupProps) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{
      fontSize: 9, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase',
      color: isDark ? '#606060' : '#aaaaaa', mb: 1.5, fontFamily: 'var(--typo-body1-font-family)',
    }}>
      {label}
    </Typography>
    {children}
  </Box>
);

interface SwatchRowProps {
  label: string; swatch?: string; hint?: string;
  active: boolean; isDark: boolean; onClick: () => void;
}
const SwatchRow = ({ label, swatch, hint, active, isDark, onClick }: SwatchRowProps) => (
  <Button
    onClick={onClick}
    disableRipple
    sx={{
      display: 'flex', alignItems: 'center', width: '100%',
      justifyContent: 'flex-start', textTransform: 'none',
      px: 1.25, py: '5px', borderRadius: '6px', minHeight: 0,
      bgcolor: active
        ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,15,71,0.06)')
        : 'transparent',
      '&:hover': {
        bgcolor: active
          ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,15,71,0.08)')
          : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
      },
    }}
  >
    {swatch !== undefined && (
      <Box sx={{
        width: 11, height: 11, borderRadius: '3px', mr: 1.5, flexShrink: 0,
        bgcolor: swatch, border: '1px solid rgba(128,128,128,0.25)',
      }} />
    )}
    <Typography sx={{
      fontSize: 12.5, fontFamily: 'var(--typo-body1-font-family)', flex: 1, textAlign: 'left',
      color: active ? (isDark ? '#ffffff' : '#000f47') : (isDark ? '#8a8a8a' : '#666666'),
      fontWeight: active ? 600 : 400, lineHeight: '20px',
    }}>
      {label}
    </Typography>
    {hint && (
      <Typography sx={{ fontSize: 10, color: isDark ? '#505050' : '#c0c0c0', fontFamily: 'var(--typo-body1-font-family)', lineHeight: '20px', ml: 1 }}>
        {hint}
      </Typography>
    )}
  </Button>
);

interface SectionDividerProps { isDark: boolean }
const SectionDivider = ({ isDark }: SectionDividerProps) => (
  <Box sx={{ borderTop: `1px solid ${isDark ? '#222222' : '#ebebeb'}`, mb: 3, mt: 0.5 }} />
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function CardTestPage() {
  const [isDark, setIsDark]               = useState(false);
  const [cardState, setCardState]         = useState<CardState>('default');
  const [surface, setSurface]             = useState<CardSurface>('white');
  const [layout, setLayout]               = useState<CardLayout>('vertical');
  const [aspectRatio, setAR]              = useState<CardAR>('4:3');
  const [lang, setLang]                   = useState<Lang>('en');
  const [hasImage, setHasImage]           = useState(true);
  const [hasDesc, setHasDesc]             = useState(true);
  const [hasIcon, setHasIcon]             = useState(false);
  const [hasBadges, setHasBadges]         = useState(false);
  const [sectionSurface, setSectionSurface] = useState<SectionSurface>('accent');
  const [carouselStyle, setCarouselStyle] = useState<'top' | 'left'>('top');

  const theme    = isDark ? darkTheme : lightTheme;
  const mainRef  = useRef<HTMLDivElement>(null);
  const content  = LANG_CONTENT[lang];
  const previewBg = SURFACE_COLOR[surface];

  // GSAP stagger on card grid sections when config changes
  useEffect(() => {
    if (!mainRef.current) return;
    const cards = mainRef.current.querySelectorAll('[data-card]');
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(cards),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.03, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    });
    return () => ctx.revert();
  }, [surface, layout, aspectRatio, lang, hasImage, hasDesc, hasIcon, hasBadges, cardState]);

  const baseCardProps = {
    ...content,
    surface,
    layout,
    aspectRatio,
    imageSrc:       hasImage && layout !== 'text-only' ? '/images/journey-aviation.jpg' : undefined,
    imageAlt:       'Aviation journey',
    hasImage:       hasImage && layout !== 'text-only',
    hasDescription: hasDesc,
    hasIcon,
    icon:           hasIcon ? <InsightsIcon sx={{ fontSize: 48 }} /> : undefined,
    badges:         hasBadges ? ['Aviation', 'Risk'] : undefined,
    href:           '#card-preview',
  };

  const carouselCardSurface = SECTION_META[sectionSurface].cardSurface;
  const carouselItems = CAROUSEL_ITEMS_BASE.map(item => ({ ...item, surface: carouselCardSurface }));

  // ── Derived colours ──────────────────────────────────────────────────────────
  const sidebarBg  = isDark ? '#141414' : '#fafafa';
  const sidebarBdr = isDark ? '#1e1e1e' : '#ebebeb';
  const sideLabel  = isDark ? '#aaaaaa' : '#000f47';
  const mainBg     = isDark ? '#0c0c0c' : '#f2f3f4';

  const selectSx = {
    fontFamily: 'var(--typo-body1-font-family)',
    fontSize: 13,
    '& .MuiSelect-select': { py: '6px', px: '10px' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isDark ? '#2a2a2a' : '#ddd',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? '#404040' : '#bbb' },
    color: sideLabel,
    bgcolor: isDark ? '#1a1a1a' : '#ffffff',
    borderRadius: '6px',
  };

  const toggleSx = {
    '& .MuiToggleButtonGroup-root': { gap: 0 },
    '& .MuiToggleButton-root': {
      fontFamily: 'var(--typo-body1-font-family)',
      fontSize: 12,
      textTransform: 'none',
      py: 0.5,
      borderColor: isDark ? '#2a2a2a' : '#ddd',
      color: isDark ? '#666' : '#888',
      '&.Mui-selected': {
        bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,15,71,0.08)',
        color: isDark ? '#fff' : '#000f47',
      },
    },
  };

  const previewDark = surface === 'primary';

  return (
    <ThemeProvider theme={theme}>
      {/* Full-viewport container — sidebar + main each scroll independently */}
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: mainBg }}>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <Box
          component="aside"
          sx={{
            width: 252,
            flexShrink: 0,
            height: '100vh',
            overflowY: 'auto',
            bgcolor: sidebarBg,
            borderRight: `1px solid ${sidebarBdr}`,
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-thumb': { bgcolor: isDark ? '#333' : '#ddd', borderRadius: 4 },
          }}
        >
          {/* Header */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: '14px', borderBottom: `1px solid ${sidebarBdr}`, mb: 3,
            position: 'sticky', top: 0, bgcolor: sidebarBg, zIndex: 1,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#0b4bff' }} />
              <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 12.5, fontWeight: 700, color: sideLabel, letterSpacing: '-0.01em' }}>
                Card Studio
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={() => setIsDark(!isDark)}
              sx={{ minWidth: 30, width: 30, height: 26, fontSize: 13, border: `1px solid ${sidebarBdr}`, bgcolor: 'transparent', color: sideLabel, p: 0, borderRadius: '6px' }}
            >
              {isDark ? '☀' : '◑'}
            </Button>
          </Box>

          <Box sx={{ px: 1.5, pb: 4, flex: 1 }}>

            {/* ── CARD group ─────────────────────────────────────────────── */}
            <SideGroup label="Card" isDark={isDark}>

              {/* State dropdown */}
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.75, px: 0.25 }}>
                  State
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={cardState}
                    onChange={(e) => setCardState(e.target.value as CardState)}
                    sx={selectSx}
                  >
                    {CARD_STATES.map(({ value, label }) => (
                      <MenuItem key={value} value={value} sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 13 }}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Surface */}
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.5, px: 0.25 }}>
                  Surface
                </Typography>
                {(['white', 'neutral', 'sky', 'primary'] as CardSurface[]).map(s => (
                  <SwatchRow
                    key={s}
                    label={s.charAt(0).toUpperCase() + s.slice(1)}
                    swatch={SURFACE_COLOR[s]}
                    active={surface === s}
                    isDark={isDark}
                    onClick={() => setSurface(s)}
                  />
                ))}
              </Box>

              {/* Layout */}
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.5, px: 0.25 }}>
                  Layout
                </Typography>
                {(['vertical', 'featured', 'horizontal', 'image-bg', 'text-only'] as CardLayout[]).map(l => (
                  <SwatchRow
                    key={l}
                    label={l}
                    active={layout === l}
                    isDark={isDark}
                    onClick={() => setLayout(l)}
                  />
                ))}
              </Box>

              {/* Aspect Ratio */}
              <Box sx={{ mb: 0.5 }}>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.75, px: 0.25 }}>
                  Aspect Ratio
                </Typography>
                <Box sx={toggleSx}>
                  <ToggleButtonGroup
                    exclusive value={aspectRatio}
                    onChange={(_, v) => v && setAR(v)}
                    size="small" fullWidth
                  >
                    {(['16:9', '4:3', '1:1'] as CardAR[]).map(ar => (
                      <ToggleButton key={ar} value={ar}>{ar}</ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              </Box>

            </SideGroup>

            <SectionDivider isDark={isDark} />

            {/* ── CONTENT group ──────────────────────────────────────────── */}
            <SideGroup label="Content" isDark={isDark}>

              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.75, px: 0.25 }}>
                  Language
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as Lang)}
                    sx={selectSx}
                  >
                    <MenuItem value="en" sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 13 }}>🇬🇧 English</MenuItem>
                    <MenuItem value="tr" sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 13 }}>🇹🇷 Türkçe</MenuItem>
                    <MenuItem value="de" sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 13 }}>🇩🇪 Deutsch</MenuItem>
                    <MenuItem value="fr" sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 13 }}>🇫🇷 Français</MenuItem>
                    <MenuItem value="ja" sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 13 }}>🇯🇵 日本語</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 0.5 }}>
                {([
                  { label: 'Image',       value: hasImage,  set: setHasImage },
                  { label: 'Description', value: hasDesc,   set: setHasDesc },
                  { label: 'Brand Icon',  value: hasIcon,   set: setHasIcon },
                  { label: 'Badges',      value: hasBadges, set: setHasBadges },
                ]).map(({ label, value, set }) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Switch
                        checked={value}
                        onChange={(e) => set(e.target.checked)}
                        size="small"
                        sx={{ '& .MuiSwitch-track': { bgcolor: isDark ? '#333' : undefined } }}
                      />
                    }
                    label={
                      <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 12.5, color: isDark ? '#8a8a8a' : '#555' }}>
                        {label}
                      </Typography>
                    }
                    sx={{ mx: 0, my: 0.1, pl: 0.25 }}
                  />
                ))}
              </Box>

            </SideGroup>

            <SectionDivider isDark={isDark} />

            {/* ── SECTION group ──────────────────────────────────────────── */}
            <SideGroup label="Section" isDark={isDark}>

              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.5, px: 0.25 }}>
                  Background
                </Typography>
                {(Object.entries(SECTION_META) as [SectionSurface, typeof SECTION_META[SectionSurface]][]).map(([key, meta]) => (
                  <SwatchRow
                    key={key}
                    label={meta.label}
                    swatch={meta.color}
                    hint={meta.hint}
                    active={sectionSurface === key}
                    isDark={isDark}
                    onClick={() => setSectionSurface(key)}
                  />
                ))}
              </Box>

              <Box>
                <Typography sx={{ fontSize: 10.5, fontFamily: 'var(--typo-body1-font-family)', color: isDark ? '#666' : '#999', mb: 0.75, px: 0.25 }}>
                  Heading style
                </Typography>
                <Box sx={toggleSx}>
                  <ToggleButtonGroup
                    exclusive value={carouselStyle}
                    onChange={(_, v) => v && setCarouselStyle(v as 'top' | 'left')}
                    size="small" fullWidth
                  >
                    <ToggleButton value="top">Top</ToggleButton>
                    <ToggleButton value="left">Left</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

            </SideGroup>

            <SectionDivider isDark={isDark} />

            {/* ── Footer links ───────────────────────────────────────────── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              {[
                { label: 'Figma specs', href: 'https://www.figma.com/design/jk5zuwRqfbox8kPr4eNrUJ/Phase-1.5-Delivery?node-id=2534-26426' },
                { label: 'Changelog',   href: '#requirements' },
              ].map(({ label, href }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    px: 1.25, py: '5px', borderRadius: '6px',
                    textDecoration: 'none',
                    color: isDark ? '#505050' : '#aaaaaa',
                    fontFamily: 'var(--typo-body1-font-family)', fontSize: 12,
                    '&:hover': { color: isDark ? '#ffffff' : '#000f47', bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' },
                    transition: 'color 0.15s, background-color 0.15s',
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: 11 }} />
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <Box
          component="main"
          ref={mainRef}
          sx={{ flex: 1, height: '100vh', overflowY: 'auto', '&::-webkit-scrollbar': { width: 6 }, '&::-webkit-scrollbar-thumb': { bgcolor: isDark ? '#333' : '#ccc', borderRadius: 4 } }}
        >
          <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 1200, mx: 'auto' }}>

            {/* ── Preview ────────────────────────────────────────────────── */}
            <SectionHeader text="Preview" dark={previewDark} state={cardState} />
            <Box sx={{ bgcolor: previewBg, p: 4, mb: 8, display: 'inline-block', borderRadius: '4px', width: layout === 'horizontal' ? 560 : 340 }}>
              <CardWebsite {...baseCardProps} {...STATE_PROPS[cardState]} />
            </Box>

            {/* ── All Surfaces ───────────────────────────────────────────── */}
            <SectionHeader text="Surfaces" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 8 }}>
              {(['white', 'neutral', 'sky', 'primary'] as CardSurface[]).map(s => (
                <Box key={s} sx={{ bgcolor: SURFACE_COLOR[s], p: 4, borderRadius: '4px', flexShrink: 0 }}>
                  <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: s === 'primary' ? 'rgba(206,236,255,0.5)' : '#aaa', mb: 1.5 }}>
                    {s}
                  </Typography>
                  <Box sx={{ width: 260 }}>
                    <CardWebsite {...{ ...baseCardProps, surface: s }} layout="vertical" aspectRatio="4:3" />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ── All Layouts ─────────────────────────────────────────────── */}
            <SectionHeader text="Layouts" dark={previewDark} />
            <Box sx={{ bgcolor: previewBg, p: 4, mb: 8, borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {(['vertical', 'featured', 'horizontal', 'image-bg', 'text-only'] as CardLayout[]).map(l => (
                <Box key={l}>
                  <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: previewDark ? 'rgba(206,236,255,0.5)' : '#aaa', mb: 1.5 }}>
                    {l}
                  </Typography>
                  <Box sx={{ maxWidth: l === 'horizontal' ? 560 : 320 }}>
                    <CardWebsite {...{ ...baseCardProps, layout: l, surface, hasImage: hasImage && l !== 'text-only', imageSrc: hasImage && l !== 'text-only' ? '/images/journey-aviation.jpg' : undefined }} />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ── Aspect Ratios ───────────────────────────────────────────── */}
            {layout !== 'image-bg' && layout !== 'text-only' && (
              <>
                <SectionHeader text="Aspect Ratios" dark={previewDark} />
                <Box sx={{ bgcolor: previewBg, p: 4, mb: 8, borderRadius: '4px', display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-start' }}>
                  {(['16:9', '4:3', '1:1'] as CardAR[]).map(ar => (
                    <Box key={ar} sx={{ width: 260, flexShrink: 0 }}>
                      <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: previewDark ? 'rgba(206,236,255,0.5)' : '#aaa', mb: 1.5 }}>
                        {ar}
                      </Typography>
                      <CardWebsite {...{ ...baseCardProps, aspectRatio: ar }} layout="vertical" />
                    </Box>
                  ))}
                </Box>
              </>
            )}

          </Box>

          {/* ── CarouselSection — full-bleed inside the scrollable main ─── */}
          <CarouselSection
            eyebrow="Insights"
            title="Insights shaping what matters most globally"
            description="Our research and analysis on the world's most influential risks and the factors defining the coming landscape."
            surface={sectionSurface}
            style={carouselStyle}
            ctaLabel="Explore all insights"
            ctaHref="#"
            skipTargetId="after-insights"
            items={carouselItems}
          />

          {/* ── Requirements ─────────────────────────────────────────────── */}
          <Box
            id="requirements"
            sx={{
              p: { xs: 3, md: 5 },
              maxWidth: 1200,
              mx: 'auto',
              mt: 2,
              mb: 8,
            }}
          >
            <Box sx={{
              border: `1px solid ${isDark ? '#222' : '#e4e4e4'}`,
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              {/* Header */}
              <Box sx={{
                bgcolor: isDark ? '#1a1a1a' : '#ffffff',
                borderBottom: `1px solid ${isDark ? '#222' : '#e8e8e8'}`,
                px: 4, py: 3,
                display: 'flex', alignItems: 'baseline', gap: 2,
              }}>
                <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 14, fontWeight: 700, color: isDark ? '#fff' : '#000f47' }}>
                  Insight Card — Component Requirements
                </Typography>
                <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 11, color: isDark ? '#555' : '#bbb', letterSpacing: '0.05em' }}>
                  v1.5 · Updated Jun 2026
                </Typography>
              </Box>

              {/* Body */}
              <Box sx={{ bgcolor: isDark ? '#141414' : '#fafafa', px: 4, py: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>

                <ReqBlock isDark={isDark} title="Surfaces" items={[
                  'White — surface.default (#ffffff), text.primary',
                  'Neutral — surface.accent (#f7f8f8), text.primary',
                  'Secondary — surface.secondary (#ceecff), text.primary',
                  'Primary — rgba(255,255,255,0.06) glass on navy, text.onHero (#ceecff)',
                ]} />

                <ReqBlock isDark={isDark} title="Layouts" items={[
                  'Vertical — stacked image → content',
                  'Featured — display-font title, taller image',
                  'Horizontal — image 40% left, content right',
                  'Image Background — full-bleed, gradient overlay, dark text at bottom',
                  'Text Only — no image, inline → arrow always visible',
                ]} />

                <ReqBlock isDark={isDark} title="States" items={[
                  'Default — no interaction layer',
                  'Hover — wash bg + state-layer div (inset: -12px), CTA arrow visible',
                  'Active / Pressed — wash + active title color (blue on light, sky on dark)',
                  'Focus — 2px solid focus.ring (#0b4bff), inset: -8px',
                  'Skeleton — DSSkeleton fills image, title, description slots',
                ]} />

                <ReqBlock isDark={isDark} title="Aspect Ratios" items={[
                  '16:9 — wide cinema (video thumbnails)',
                  '4:3 — standard (default)',
                  '1:1 — square (profile / icon cards)',
                  'Note: horizontal layout always uses 4:3 regardless of AR prop',
                ]} />

                <ReqBlock isDark={isDark} title="Design Tokens in use" items={[
                  'getRoleColor(\'surface.default | accent | secondary | hero\')',
                  'getRoleColor(\'text.primary | onHero\')',
                  'getRoleColor(\'surface.secondary.hover\') — hover wash on sky surface',
                  'getRoleColor(\'focus.ring\') — #0b4bff focus border',
                  'getRoleColor(\'interactive.secondary\') — active blue #0b4bff',
                  'var(--typo-display-font-family) — Featured layout title',
                ]} />

                <ReqBlock isDark={isDark} title="Animations" items={[
                  'GSAP entrance: fromTo opacity 0→1, y 20→0, 0.45s power2.out on animate prop',
                  'Hover image zoom: gsap.quickTo(img, scale, {duration: 0.3}) via callback ref',
                  'CarouselSection scroll reveal: ScrollTrigger start "top 85%", stagger 0.08',
                  'Test page config change: stagger 0.03, 0.28s on [data-card] selector',
                ]} />

                <ReqBlock isDark={isDark} title="Accessibility" items={[
                  'Stretched <a> on title with ::after { position: absolute; inset: 0 }',
                  'Text-only: same stretched link, arrow is decorative (aria-hidden)',
                  'Focus ring visible on keyboard nav and forceFocus prop',
                  'State-layer div: aria-hidden, pointerEvents: none',
                  'Image-bg: gradient overlay ensures minimum 4.5:1 contrast on text',
                  'WCAG AA: all text/bg token pairs validated by tokens:contrast:all',
                ]} />

                <ReqBlock isDark={isDark} title="Hover Ring — Figma State Layer" items={[
                  'Pattern: real <div> position: absolute; inset: -12px (not box-shadow)',
                  'Reason: box-shadow clips at element border inside overflow-x: auto',
                  'State layer is first child of article (zIndex: 0)',
                  'Content wrapper uses position: relative; zIndex: 1',
                  'CSS &:hover drives real interactions; force props drive test states',
                ]} />

                <ReqBlock isDark={isDark} title="CarouselSection integration" items={[
                  'surface prop drives section bg + card surface (matched via SECTION_META map)',
                  'style="top" — heading full-width above carousel',
                  'style="left" — heading fixed 420px left column, carousel fills right',
                  'CTA: DSButton variant="secondary", inverse on hero surface',
                  'Controls: DSButton arrows, always white bg regardless of section',
                ]} />

                <ReqBlock isDark={isDark} title="Figma alignment" items={[
                  'Card names: "On Neutral" → white/neutral surface',
                  '"On Secondary (sky-blue)" → sky surface',
                  '"On Primary" → primary glass surface',
                  'Figma variables map to CSS var(--v3/text-&-icon/primary)',
                  'Token sync: npm run tokens:build after primitive changes',
                ]} />

              </Box>

              {/* Links */}
              <Box sx={{
                bgcolor: isDark ? '#1a1a1a' : '#ffffff',
                borderTop: `1px solid ${isDark ? '#222' : '#e8e8e8'}`,
                px: 4, py: 2.5,
                display: 'flex', gap: 3, flexWrap: 'wrap',
              }}>
                {[
                  { label: 'Figma — Insight Card specs', href: 'https://www.figma.com/design/jk5zuwRqfbox8kPr4eNrUJ/Phase-1.5-Delivery?node-id=2534-26426' },
                  { label: 'CHANGELOG.md', href: '/CHANGELOG.md' },
                ].map(({ label, href }) => (
                  <Box
                    key={label}
                    component="a"
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 0.5,
                      fontFamily: 'var(--typo-body1-font-family)', fontSize: 12,
                      color: '#0b4bff', textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 12 }} />
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

interface SectionHeaderProps { text: string; dark?: boolean; state?: CardState }
function SectionHeader({ text, dark, state }: SectionHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2.5 }}>
      <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(206,236,255,0.4)' : '#aaaaaa' }}>
        {text}
      </Typography>
      {state && state !== 'default' && (
        <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 10, color: '#0b4bff', letterSpacing: '0.05em' }}>
          {CARD_STATES.find(s => s.value === state)?.label}
        </Typography>
      )}
    </Box>
  );
}

// ─── Requirements block ───────────────────────────────────────────────────────

interface ReqBlockProps { title: string; items: string[]; isDark: boolean }
function ReqBlock({ title, items, isDark }: ReqBlockProps) {
  return (
    <Box>
      <Typography sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 11, fontWeight: 700, color: isDark ? '#ffffff' : '#000f47', mb: 1, letterSpacing: '0.01em' }}>
        {title}
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2 }}>
        {items.map((item, i) => (
          <Box
            key={i}
            component="li"
            sx={{ fontFamily: 'var(--typo-body1-font-family)', fontSize: 11.5, color: isDark ? '#707070' : '#555555', lineHeight: '19px', mb: 0.4 }}
          >
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
