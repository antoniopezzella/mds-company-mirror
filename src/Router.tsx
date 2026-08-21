import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { usePageTracking } from './hooks/usePageTracking';

// Lazy load all page components for better performance
const TestPage = lazy(() => import('./pages/TestPage'));
const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage'));
const SimpleApp = lazy(() => import('./pages/SimpleApp'));
const MarshNewCharpterBeginsPage = lazy(() => import('./pages/marsh-new-charpter-begins/Page'));
const ComponentShowcase = lazy(() => import('./pages/ComponentShowcase'));
const GridShowcase = lazy(() => import('./pages/GridShowcase'));
const GridTestPage = lazy(() => import('./pages/GridTestPage'));
const AnimatedGridDemo = lazy(() => import('./pages/AnimatedGridDemo'));
const SimpleEnhancedGridDemo = lazy(() => import('./pages/SimpleEnhancedGridDemo'));
const DebugPage = lazy(() => import('./pages/DebugPage'));
const ParallaxDemo = lazy(() => import('./pages/ParallaxDemo'));
const MarshCorporate = lazy(() => import('./pages/MarshCorporate'));
const MarshCorporateNew = lazy(() => import('./pages/MarshCorporateNew'));
const CorporateLandingPage = lazy(() => import('./pages/CorporateLandingPage/index').then(m => ({ default: m.CorporateLandingPage })));
const MarshOneHomepage = lazy(() => import('./projects/marsh-one').then(m => ({ default: m.MarshOneHomepageDefault })));
const InsuranceDashboard = lazy(() => import('./projects/insurance-dashboard').then(m => ({ default: m.InsuranceDashboardDefault })));
const ShadcnDashboard = lazy(() => import('./projects/shadcn-dashboard').then(m => ({ default: m.ShadcnDashboardDefault })));
const MarshOneNewExperience = lazy(() => import('./pages/ai-personalized-experience/AIPersonalizedExperience'));
const TypographyDemo = lazy(() => import('./projects/marsh-one/TypographyDemo'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RESGAssetListPage = lazy(() => import('./pages/RESGAssetListPage'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const ClinicalTrials = lazy(() => import('./projects/ClinicalTrials').then(m => ({ default: m.ClinicalTrialsPage })));
const TreeTestingToolPage = lazy(() => import('./pages/TreeTestingTool/TreeTestingToolPage'));
const HeroBannerTest = lazy(() => import('./pages/HeroBannerTest'));
const HeroBannerGridTest = lazy(() => import('./pages/HeroBannerGridTest'));
const CardTestPage = lazy(() => import('./pages/CardTestPage'));
const ColorSandbox = lazy(() => import('./pages/ColorSandbox'));
const Marsh1DER = lazy(() => import('./projects/Marsh1DER').then(m => ({ default: m.Marsh1DERPage })));
const CorporateHome = lazy(() => import('./projects/Marsh1DER/corporate/home').then(m => ({ default: m.CorporateHomePage })));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    Loading...
  </div>
);

// Wrapper component for page tracking
const RouterWithTracking: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  usePageTracking();
  return <>{children}</>;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <RouterWithTracking>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
        <Route path="/app" element={<App />} />
        <Route path="/simple-app" element={<SimpleApp />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/components" element={<ComponentShowcase />} />
        <Route path="/grid" element={<GridShowcase />} />
        <Route path="/grid-test" element={<GridTestPage />} />
        <Route path="/grid-demo" element={<AnimatedGridDemo />} />
        <Route path="/enhanced-grid" element={<SimpleEnhancedGridDemo />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/parallax-demo" element={<ParallaxDemo />} />
        <Route path="/marsh-new-charpter-begins" element={<MarshNewCharpterBeginsPage />} />
        <Route path="/marsh-corporate" element={<MarshCorporate />} />
        <Route path="/marsh-corporate-new" element={<MarshCorporateNew />} />
        <Route path="/corporate-landing" element={<CorporateLandingPage />} />
        <Route path="/marsh-one" element={<MarshOneHomepage />} />
        <Route path="/insurance-dashboard" element={<InsuranceDashboard />} />
        <Route path="/shadcn-dashboard" element={<ShadcnDashboard />} />
        <Route path="/marshone-new-experience" element={<MarshOneNewExperience />} />
        <Route path="/typography-demo" element={<TypographyDemo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resg-asset-list" element={<RESGAssetListPage />} />
        <Route path="/ClinicalTrials" element={<ClinicalTrials />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tree-testing" element={<TreeTestingToolPage />} />
        <Route path="/hero-banner-test" element={<HeroBannerTest />} />
        <Route path="/hero-banner-grid-test" element={<HeroBannerGridTest />} />
        <Route path="/card-test" element={<CardTestPage />} />
        <Route path="/color-sandbox" element={<ColorSandbox />} />
        <Route path="/marsh-1der" element={<Marsh1DER />} />
        <Route path="/marsh-1der/corporate" element={<CorporateHome />} />
      </Routes>
    </Suspense>
    </RouterWithTracking>
  </BrowserRouter>
);

export default Router;
