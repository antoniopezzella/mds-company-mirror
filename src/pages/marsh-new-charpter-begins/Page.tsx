import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import styles from './index.module.scss';
import { useLenisSmooth } from './animations/smooth/useLenisSmooth';
import { useRefreshOnAssetsReady } from './animations/utils/useRefreshOnAssetsReady';

// Sections
import Hero from './sections/Hero/Hero';
import Video from './sections/Video/Video';
import Announcement from './sections/Announcement/Announcement';
import TransformationTimeline from './sections/TransformationTimeline/TransformationTimeline';
import BusinessPillars from './sections/BusinessPillars/BusinessPillars';
import GlobalStats from './sections/GlobalStats/GlobalStats';
import OurJourney from './sections/OurJourney/OurJourney';
import FAQ from './sections/FAQ/FAQ';
import ForInvestors from './sections/ForInvestors/ForInvestors';
import LeadershipQuote from './sections/LeadershipQuote/LeadershipQuote';
import ClientOutcomes from './sections/ClientOutcomes/ClientOutcomes';
import NewsroomCTA from './sections/NewsroomCTA/NewsroomCTA';
import Footer from './sections/Footer/Footer';
import SectionErrorBoundary from './sections/ErrorBoundary';
import { applyMotionDebugFromQuery } from './animations/motion/controller';

const MarshNewCharpterBeginsPage: React.FC = () => {
  // Enable smooth scrolling for this page unless user prefers reduced motion
  useLenisSmooth();
  // Ensure ScrollTrigger positions are correct after fonts/images finish loading
  useRefreshOnAssetsReady();
  // Apply query param driven motion debug (timeScale/skip)
  applyMotionDebugFromQuery();

  return (
    <>
      <header role="banner" className={styles.header}>
        <Container maxWidth="xl">
          <Box component="h1" sx={visuallyHidden}>Marsh — One Brand. Countless Possibilities.</Box>
        </Container>
      </header>

      <main id="main" role="main">
        <SectionErrorBoundary label="Hero">
          <Hero />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="Video">
          <Video />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="Announcement">
          <Announcement />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="TransformationTimeline">
          <TransformationTimeline />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="BusinessPillars">
          <BusinessPillars />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="GlobalStats">
          <GlobalStats />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="OurJourney">
          <OurJourney />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="FAQ">
          <FAQ />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="LeadershipQuote">
          <LeadershipQuote />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="ClientOutcomes">
          <ClientOutcomes />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="ForInvestors">
          <ForInvestors />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="NewsroomCTA">
          <NewsroomCTA />
        </SectionErrorBoundary>
      </main>

      <SectionErrorBoundary label="Footer">
        <Footer />
      </SectionErrorBoundary>
    </>
  );
};

export default MarshNewCharpterBeginsPage;
