import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IntroLoader } from '../../components/IntroLoader';
import WebsiteHeader from '../../components/ui/website-header';
import HeroBanner from '../../components/sections/HeroBanner/HeroBanner';
import CarouselSection from '../../components/sections/CarouselSection/CarouselSection';
import { Button as DSButton } from '../../components/ui/button';
import { getRoleColor } from '../../theme/roles';
import { useScrollBackgroundFade, useScrollTextReveal, useScrollSmoother } from '../../hooks/gsap';
import InsightFeatureSection, { type SolutionsTopic } from './components/InsightFeatureSection';
import HeroAiSearchEntry from './components/HeroAiSearchEntry';
import PressSection, { type PressTestimonial } from './components/PressSection';
import PromoBanner from './components/PromoBanner';
import Marsh1DERFooter from './components/Marsh1DERFooter';
import { AIAgentBot } from '../../components/AIAgentBot/AIAgentBot';

// ─── Card deck data ───────────────────────────────────────────────────────────

const RISK_CARDS = [
  {
    id: 'cyber',
    title: 'Cyber Risk',
    description: 'Navigate the evolving threat landscape with tailored cyber insurance and risk advisory.',
    imageSrc: '/images/journey-bloomberg.jpg',
    imageAlt: 'Cyber Risk',
    surface: 'primary' as const,
    layout: 'vertical' as const,
    category: 'Insurance',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'casualty',
    title: 'Casualty',
    description: 'Comprehensive liability solutions designed for the risks your business faces today.',
    imageSrc: '/images/journey-davos.jpg',
    imageAlt: 'Casualty',
    surface: 'primary' as const,
    layout: 'vertical' as const,
    category: 'Insurance',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'multinacional',
    title: 'Multinational',
    description: 'Coordinated global programs that protect your operations across every jurisdiction.',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Multinational',
    surface: 'primary' as const,
    layout: 'vertical' as const,
    category: 'Solutions',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'political-risk',
    title: 'Political Risk',
    description: 'Protect your investments and operations against political instability worldwide.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'Political Risk',
    surface: 'primary' as const,
    layout: 'vertical' as const,
    category: 'Insurance',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'risk-consulting',
    title: 'Risk Consulting',
    description: 'Strategic advisory to identify, quantify, and reduce risk across your enterprise.',
    imageSrc: '/images/journey-bloomberg.jpg',
    imageAlt: 'Risk Consulting',
    surface: 'primary' as const,
    layout: 'vertical' as const,
    category: 'Advisory',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'global-report',
    title: 'Global Risk Report 2026',
    description: 'Data and insights from more than 1,300 global experts on the top risks ahead.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'Global Risk Report',
    surface: 'primary' as const,
    layout: 'vertical' as const,
    category: 'Report',
    aspectRatio: '1:1' as const,
  },
];

// Dedicated content for the "Popular this month" test section below — varied
// copy and content-type categories (rather than reusing RISK_CARDS) so the
// category-icon auto-lookup (CardWebsite.tsx's CONTENT_TYPE_ICON_MAP) shows a
// mix of icons instead of the same "Insurance"/"Solutions" labels repeated.
const POPULAR_CARDS = [
  {
    id: 'supply-chain-attack-surface',
    title: 'Why Supply Chains Are the New Attack Surface',
    description: 'Cyber threats increasingly target the vendors and logistics networks businesses depend on, not just their own systems.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'Cargo ship at sea',
    surface: 'neutral' as const,
    layout: 'vertical' as const,
    category: 'Article',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'risk-perspectives-hybrid-work',
    title: 'Risk Perspectives: Talent in a Hybrid World',
    description: 'Our specialists unpack how remote work is reshaping workforce risk, benefits design, and retention strategy.',
    imageSrc: '/images/journey-davos.jpg',
    imageAlt: 'Colleague working on a laptop',
    surface: 'neutral' as const,
    layout: 'vertical' as const,
    category: 'Podcast',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'manufacturer-claims-case-study',
    title: 'How a Global Manufacturer Cut Claims by 40%',
    description: 'A multi-year partnership combining risk engineering and claims advocacy delivered measurable loss reduction.',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Team reviewing plans',
    surface: 'neutral' as const,
    layout: 'vertical' as const,
    category: 'Case Study',
    aspectRatio: '1:1' as const,
  },
  {
    id: 'cyber-resilience-2026',
    title: 'State of Cyber Resilience 2026',
    description: 'Benchmarking data from over 900 organizations on breach readiness, response times, and recovery costs.',
    imageSrc: '/images/journey-bloomberg.jpg',
    imageAlt: 'Team collaborating at a desk',
    surface: 'neutral' as const,
    layout: 'vertical' as const,
    category: 'Report',
    aspectRatio: '1:1' as const,
  },
];

// ─── Solutions grid topics ────────────────────────────────────────────────────

const SOLUTIONS_TOPICS: SolutionsTopic[] = [
  {
    title: 'Risk & Insurance',
    description: 'Property, casualty, cyber and specialty coverage, claims advocacy and risk consulting.',
    linkLabel: 'Risk & insurance',
  },
  {
    title: 'Workforce & Benefits',
    description: 'Health and benefits, talent and rewards, and workforce strategy.',
    linkLabel: 'Workforce & benefits',
  },
  {
    title: 'Investments & Retirement',
    description: 'OCIO, pension investments, portfolio strategy and retirement solutions.',
    linkLabel: 'Investments & retirement',
  },
  {
    title: 'Reinsurance & Capital',
    description: 'Treaty and facultative reinsurance, catastrophe modelling and capital advisory.',
    linkLabel: 'Reinsurance & capital',
  },
  {
    title: 'Strategy & Transformation',
    description: 'Corporate strategy, operating model design and organisational performance.',
    linkLabel: 'Strategy & transformation',
  },
  {
    title: 'SME Products',
    description: 'Packaged cover for smaller businesses, online quote and bind.',
    linkLabel: 'SME products',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS: PressTestimonial[] = [
  {
    quote: 'Hurricane season used to mean scrambling. Now we have a plan, real numbers, and a broker who calls before we have to.',
    authorName: 'Sarah Jenkins',
    authorTitle: 'Head of Risk, Coastal Logistics',
    avatarSrc: '/images/journey-davos.jpg',
  },
  {
    quote: "Nobody tells you cyber insurance is really about the incident response team, not the policy wording. Marsh's team is the reason we were back online in days, not weeks.",
    authorName: 'Devon Reyes',
    authorTitle: 'CFO, Kestrel Manufacturing',
    avatarSrc: '/images/journey-bloomberg.jpg',
  },
  {
    quote: "Twelve countries, one point of contact, zero surprises at renewal. That's the whole pitch, and it's held up for three years running.",
    authorName: 'Amara Diallo',
    authorTitle: 'VP Global Risk, Aivex Aviation',
    avatarSrc: '/images/journey-aviation.jpg',
  },
  {
    quote: 'We walked into that conversation with a market-entry plan and walked out with a risk-adjusted one. It changed which countries we actually expanded into, not just how we insured the ones we picked.',
    authorName: 'Marcus Lindqvist',
    authorTitle: 'COO, Nordholm Energy',
    avatarSrc: '/images/journey-global-risks.jpg',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const Marsh1DER: React.FC = () => {
  const navigate = useNavigate();
  const [pendingChatQuery, setPendingChatQuery] = useState<string>();
  // IntroLoader is a fully opaque, fixed-position overlay for its first
  // ~2s — HeroBanner's entrance timeline used to fire the moment it mounted
  // (a sibling of IntroLoader, not blocked by it) and would finish playing
  // entirely behind the overlay, so by the time it was revealed the hero
  // just looked static. Gating HeroBanner's `play` on this flag (set via
  // IntroLoader's onComplete) holds its entrance paused until the overlay
  // actually clears.
  const [introDone, setIntroDone] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollSmoother — replaces native scroll with an eased one across
  // this page's scrollable content only. IntroLoader, WebsiteHeader, and
  // AIAgentBot are all `position: fixed` and stay OUTSIDE the wrapper/
  // content pair below (see useScrollSmoother's own doc comment for why —
  // fixed-position descendants of a transformed ancestor behave like
  // position:absolute relative to it, not the viewport).
  useScrollSmoother(smoothWrapperRef, smoothContentRef);

  // end:'bottom center' (rather than the hook's default 'bottom top') is
  // required here specifically: this is the last section before the
  // footer, and the footer isn't tall enough to give a full extra
  // viewport of scroll room past the CTA's bottom edge — 'bottom top'
  // would cap the fade at ~84% at the page's actual max scroll, leaving a
  // visible color jump right where the footer begins. 'bottom center'
  // only needs half a viewport of trailing scroll room, which the footer
  // does have.
  useScrollBackgroundFade(ctaRef, { from: 'surface.default', to: 'surface.hero', end: 'bottom center' });
  // Crossfades the headline's own text color in lockstep with the section
  // background above — surface.default→surface.hero and text.primary→
  // text.onHero share the same scroll span, so the headline stays readable
  // as the navy handoff completes (text.primary is #000f47, the same hex
  // as surface.hero, so without this it would fade to invisible).
  useScrollBackgroundFade(ctaHeadlineRef, { from: 'text.primary', to: 'text.onHero', trigger: ctaRef, end: 'bottom center', property: 'color' });
  useScrollTextReveal(ctaHeadlineRef, { type: 'lines' });

  return (
  <>
    {/* ── 0. Intro loader — Marsh logo reveal, then slides away ── */}
    <IntroLoader onComplete={() => setIntroDone(true)} />

    {/* ── 1. Header ── */}
    <WebsiteHeader
      position="fixed"
      signInLabel="Log in"
      onSignInClick={() => navigate('/login')}
    />

    {/* GSAP ScrollSmoother wrapper/content pair (see useScrollSmoother call
        above) — every scrollable section lives inside; IntroLoader,
        WebsiteHeader, and AIAgentBot are all position:fixed and stay
        outside, as true siblings, on purpose. */}
    <Box id="smooth-wrapper" ref={smoothWrapperRef}>
    <Box id="smooth-content" ref={smoothContentRef}>
    <Box sx={{ minHeight: '100vh', backgroundColor: getRoleColor('surface.default') }}>

    {/* ── 2. Hero — 50/50 split, looping video + animated M mark (Figma V1) ── */}
    <HeroBanner
      layout="split"
      variant="dark"
      videoSrc="/video/Gemini Omni Flash Reference to Video_0002.mp4"
      imageAlt="Aerial view of a busy city crosswalk"
      titleLineHeight={1.05}
      title="Find the right risk, people, or strategy solution for your business"
      description="Tell us about your business industry, size, exposures."
      play={introDone}
    >
      <HeroAiSearchEntry onAsk={setPendingChatQuery} />
    </HeroBanner>

    {/* ── 3. Insight Feature — headline + secondary CTA + 6-tile solutions grid ── */}
    <InsightFeatureSection
      headline="Whatever risk you're managing, we've handled it before."
      ctaLabel="Find right solution"
      topics={SOLUTIONS_TOPICS}
    />

    {/* ── 4. Card Deck — "Find the risks that matter to your business" ── */}
    <CarouselSection
      surface="hero"
      style="top"
      title="Find the risks that matter to your business"
      description="Explore Marsh solutions by risk area and sector with guidance from our specialists."
      ctaLabel="Browse all risk areas"
      items={RISK_CARDS}
      hideCategories
    />

    {/* ── 4b. Card Deck (test) — checks arrow controls hide when the track
         doesn't overflow (e.g. desktop) and reappear when it does (e.g.
         mobile). Uses POPULAR_CARDS (its own dedicated data, not RISK_CARDS)
         so copy and category vary across the row instead of repeating. */}
    <CarouselSection
      surface="default"
      style="top"
      title="Popular this month"
      description="Explore this month's most-read insights across formats."
      items={POPULAR_CARDS}
      fillAvailableSpace
    />

    {/* ── 5. Press / Client Story — line-reveal testimonial carousel (GSAP
         SplitText mask:'lines'), no big image ── */}
    <PressSection eyebrow="What our clients say:" testimonials={TESTIMONIALS} />

    {/* ── 6. Promo Banner — Global Risk Report ── */}
    <PromoBanner
      eyebrow="Report"
      headline="The risks ahead, mapped by the people who've handled them before"
      description="The top risks for 2026 and beyond. Data and insights from more than 1,300 global experts and leaders."
      ctaLabel="Read global report"
      imageSrc="/images/journey-global-risks.jpg"
      imageAlt="Global Risk Report 2026"
    />

    {/* ── 7. Solutions CTA — background scrub-fades to the footer's navy
         hero surface as this section scrolls through (useScrollBackgroundFade),
         with the headline both line-revealing in (useScrollTextReveal) and
         crossfading its own text color in step with the background so it
         stays readable at the navy end. CTA button uses primaryAlt (solid
         gold) rather than the outline `secondary` style specifically because
         its transparent background would otherwise ride the animated section
         background and its navy border/text would go illegible against navy. ── */}
    <Box
      ref={ctaRef}
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' } }}>
        <Typography
          ref={ctaHeadlineRef}
          variant="h2"
          sx={{
            fontFamily: 'var(--typo-h1-font-family)',
            fontWeight: 400,
            fontSize: 'clamp(32px, 3.5vw, 56px)',
            lineHeight: 1.15,
            mb: 5,
            maxWidth: 760,
            mx: 'auto',
          }}
        >
          Ready to start a conversation about your risk?
        </Typography>
        <DSButton
          variant="primaryAlt"
          size="lg"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {}}
        >
          Talk to an expert
        </DSButton>
      </Box>
    </Box>

    {/* ── 8. Footer ── */}
    <Marsh1DERFooter />

    </Box>
    </Box>
    </Box>

    {/* ── AI Chat bot — same DS component as dashboard ── */}
    {/* Appears at the middle of the second fold (1.5x viewport height), not
        the first — see AIAgentBot's own default (1x) for other pages. */}
    <AIAgentBot
      showSpeechBubble
      enableBubbles
      scrollThreshold={window.innerHeight * 1.5}
      pendingQuery={pendingChatQuery}
      visitorType="prospect"
    />
  </>
  );
};

export default Marsh1DER;
