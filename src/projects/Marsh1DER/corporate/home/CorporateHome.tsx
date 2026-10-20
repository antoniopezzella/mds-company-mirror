import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IntroLoader } from '../../../../components/IntroLoader';
import WebsiteHeader, { type WebsiteHeaderNavItem } from '../../../../components/ui/website-header';
import HeroBanner from '../../../../components/sections/HeroBanner/HeroBanner';
import CarouselSection from '../../../../components/sections/CarouselSection/CarouselSection';
import { FAQSection } from '../../../../components/sections/FAQSection/FAQSection';
import { getRoleColor } from '../../../../theme/roles';
import { Stats } from '../../../marsh-one/components/Stats';
import PromoBanner from '../../components/PromoBanner';
import BusinessDescriptors from './BusinessDescriptors';

// ─── Card deck data ───────────────────────────────────────────────────────────
// Pulled from Figma node 9554:188144 ("card-deck-section", "Marsh One — Phase
// 1.5 — Workspace"). No topic-specific images exist yet in public/images/ —
// reusing the same journey-*.jpg stock photos already reused loosely across
// unrelated topics by RISK_CARDS in ../../Marsh1DER.tsx.

const PERSPECTIVE_CARDS = [
  {
    id: 'geopolitical-risk',
    title: 'Geopolitical risk',
    description:
      'Escalating tensions in the Middle East are driving uncertainty worldwide. Explore what this means for your operations, your supply chain, and how you manage risk.',
    imageSrc: '/images/journey-global-risks.jpg',
    imageAlt: 'Geopolitical risk',
    layout: 'vertical' as const,
    surface: 'neutral' as const,
  },
  {
    id: 'people-risk-report-2026',
    title: 'People Risk Report 2026',
    description:
      "Today's workforce risks are being reshaped by AI, cyber, geopolitics, and shifting employee needs. Discover the five imperatives for addressing people risk and how leaders can transform risk into strategic advantage.",
    imageSrc: '/images/journey-davos.jpg',
    imageAlt: 'People Risk Report 2026',
    layout: 'vertical' as const,
    surface: 'neutral' as const,
  },
  {
    id: 'global-insurance-market-index',
    title: 'Global Insurance Market Index',
    description:
      'Our quarterly index tracks commercial insurance rates across every region and line of business. See the latest results and what they mean for your renewal.',
    imageSrc: '/images/journey-bloomberg.jpg',
    imageAlt: 'Global Insurance Market Index',
    layout: 'vertical' as const,
    surface: 'neutral' as const,
  },
  {
    // TODO: the source Figma design shows this 4th card unfinished — Lorem-ipsum
    // title plus a category label + "Read article" link treatment the other 3
    // cards don't have. CardWebsite has no "Read article" link feature today
    // (only a decorative, non-interactive corner arrow), so this card uses the
    // same finished shape as the other 3 pending real copy from the content owner.
    id: 'card-4-placeholder',
    title: 'Card 4 — copy pending',
    description:
      'Placeholder — needs real copy and imagery before this ships.',
    imageSrc: '/images/journey-aviation.jpg',
    imageAlt: 'Placeholder',
    layout: 'vertical' as const,
    surface: 'neutral' as const,
  },
];

// ─── Header nav ───────────────────────────────────────────────────────────────

const NAV_ITEMS: WebsiteHeaderNavItem[] = [
  { label: 'How we help', href: '#how-we-help' },
  { label: 'Investors', href: '#investors' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Careers', href: '#careers' },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
// Pulled from Figma node 9534:174029 ("FQS"). Only the first item (open by
// default in the source) had its answer visible — the other 4 were closed
// accordions, so only their question text was readable. TODO: re-pull each
// one individually expanded in Figma to get the real answer copy.

const FAQ_ITEMS = [
  {
    question: 'What does Marsh do?',
    answer:
      'Marsh (NYSE: MRSH) is a global leader in risk, reinsurance and capital, people and investments, and management consulting, advising clients in 130 countries. With annual revenue of $27 billion and more than 95,000 colleagues, Marsh helps build the confidence to thrive through the power of perspective.',
  },
  {
    question: 'What industries does Marsh serve?',
    answer: 'TODO: real answer pending Figma content pull.',
  },
  {
    question: 'How is Marsh different from other professional services firms?',
    answer: 'TODO: real answer pending Figma content pull.',
  },
  {
    question: 'I already work with one of your businesses. Can I access services from your other businesses?',
    answer: 'TODO: real answer pending Figma content pull.',
  },
  {
    question: 'Is Marsh the same as Marsh McLennan?',
    answer: 'TODO: real answer pending Figma content pull.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
// New "Corporate Home" landing page (Figma: "Marsh One — Phase 1.5 —
// Workspace", frame "Corporate - home - Desktop V2 - WIP", node 9554:188081).
// Section order matches the Figma frame top to bottom.
const CorporateHome: React.FC = () => {
  // Same fix as Marsh1DER.tsx: IntroLoader is a fully opaque overlay for its
  // first ~2s, and HeroBanner's entrance timeline used to fire on mount
  // (unblocked by the overlay covering it) — finishing entirely behind it.
  // Gating HeroBanner's `play` on IntroLoader's onComplete holds the
  // entrance paused until the overlay actually clears.
  const [introDone, setIntroDone] = useState(false);

  return (
  <Box sx={{ minHeight: '100vh', backgroundColor: getRoleColor('bg.default') }}>

    {/* ── 0. Intro loader ── */}
    <IntroLoader onComplete={() => setIntroDone(true)} />

    {/* ── 1. Header ── */}
    <WebsiteHeader
      position="fixed"
      navItems={NAV_ITEMS}
      activeNavLabel="How we help"
      showLanguageSelector={false}
      showAuthActions={false}
      hideMenuButtonOnDesktop
    />

    {/* ── 2. Hero — "Seeing the full picture." (Figma node 9534:174575 / Hero-banner V3) ── */}
    <HeroBanner
      variant="dark"
      layout="split"
      title="Seeing the full picture. That's the power of perspective."
      description="One firm to help you across risk, strategy, people, and investments."
      primaryCta={{ text: 'Explore how we help', onClick: () => {}, icon: <ArrowForwardIcon /> }}
      videoSrc="/video/WebsiteHeaderVideo-960x900_V1 (1).mp4"
      imageAlt="Aerial view of a busy city crosswalk"
      play={introDone}
    />

    {/* ── 3. Business descriptors — "Your business, from every angle" (Figma node 9534:173936) ── */}
    <BusinessDescriptors />

    {/* ── 4. Promo banner — Marsh and Formula 1 (Figma node 9534:174575-adjacent instance) ── */}
    <PromoBanner
      surface="hero"
      headline="Marsh and Formula 1"
      description="Marsh is now an Official Partner of Formula 1 — one of the most recognized and fastest-growing sports platforms in the world."
      ctaLabel="Explore the partnership"
      // TODO: no F1 logo asset exists in public/images/ yet — placeholder path.
      logoSrc="/images/TODO-f1-logo.svg"
      logoAlt="Formula 1"
      legalText="*The F1 logo, FORMULA 1, F1, GRAND PRIX and related marks are trademarks of Formula One Licensing BV, a Formula 1 company. All rights reserved."
      // TODO: no F1 partnership image exists yet — reusing an existing stock photo as placeholder.
      imageSrc="/images/journey-davos.jpg"
      imageAlt="Formula 1 partnership"
    />

    {/* ── 5. Card Deck — "Perspective on what leaders face today" (Figma node 9554:188144) ── */}
    <CarouselSection
      surface="tertiary"
      style="left"
      title="Perspective on what leaders face today"
      description="Research and analysis from across Marsh on the issues shaping business."
      ctaLabel="Learn more"
      ctaHref="#insights"
      items={PERSPECTIVE_CARDS}
    />

    {/* ── 6. Promo banner — Marsh and Bloomberg (Figma node 9540:177629-adjacent instance) ── */}
    <PromoBanner
      surface="secondary"
      eyebrow=""
      headline="Marsh and Bloomberg"
      description="Marsh is a knowledge partner to Bloomberg Media. We bring research on risk and resilience to leaders at Bloomberg's events around the world."
      ctaLabel="Learn more"
      imageSrc="/images/journey-bloomberg.jpg"
      imageAlt="Marsh and Bloomberg"
    />

    {/* ── 7. Metrics — "The reach, experience, and perspective to help you thrive" (Figma node 9538:177232 / section-metrics) ──
         Headline only (no description) on a solid #000f47 background — this
         instance has no background photo overlay, unlike Stats' other caller
         (marsh-one's MarshOneHomepage). ── */}
    <Stats
      description=""
      hasBackgroundImage={false}
      stats={[
        { value: '130', label: 'Countries' },
        { value: '95k+', label: 'Global colleagues' },
        { value: '155+', label: 'Years' },
      ]}
    />

    {/* ── 8. Promo banner — Explore our 2025 reports (Figma node 9534:174000) ── */}
    <PromoBanner
      surface="secondary"
      eyebrow="Reports"
      headline="Explore our 2025 reports"
      description=""
      ctaLabel="Read Annual Report"
      secondaryCtaLabel="Read Business Responsibility Report"
      hasPlayButton={false}
      // TODO: no report-cover asset exists in public/images/ yet — placeholder path.
      imageSrc="/images/TODO-2025-report-covers.jpg"
      imageAlt="2025 Annual Report and Business Responsibility Report covers"
    />

    {/* ── 9. FAQ (Figma node 9534:174029 / FQS) ── */}
    <FAQSection
      variant="bordered"
      containerMaxWidth={1240}
      title="Frequently asked questions"
      description=""
      defaultExpanded={0}
      faqs={FAQ_ITEMS}
    />

  </Box>
  );
};

export default CorporateHome;
