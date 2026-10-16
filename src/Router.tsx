import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { usePageTracking } from './hooks/usePageTracking';

// Lazy load all page components for better performance
// App is the dashboard route itself — it pulls in @mui/x-data-grid and
// recharts, so importing it eagerly put both in the entry chunk and made
// every other route wait on them before first paint.
const App = lazy(() => import('./App'));
const MarshNewCharpterBeginsPage = lazy(() => import('./pages/marsh-new-charpter-begins/Page'));
const GridShowcase = lazy(() => import('./pages/GridShowcase'));
const MarshCorporate = lazy(() => import('./pages/MarshCorporate'));
const MarshCorporateNew = lazy(() => import('./pages/MarshCorporateNew'));
const CorporateLandingPage = lazy(() => import('./pages/CorporateLandingPage/index').then(m => ({ default: m.CorporateLandingPage })));
const MarshOneHomepage = lazy(() => import('./projects/marsh-one').then(m => ({ default: m.MarshOneHomepageDefault })));
const GoToMarket = lazy(() => import('./pages/GoToMarket/GoToMarket'));
const InsuranceDashboard = lazy(() => import('./projects/insurance-dashboard').then(m => ({ default: m.InsuranceDashboardDefault })));
const DashboardDemo = lazy(() => import('./projects/dashboard-demo').then(m => ({ default: m.DashboardDemoDefault })));
const ColleagueLayout = lazy(() => import('./projects/colleague-profile').then(m => ({ default: m.ColleagueLayoutDefault })));
const ColleagueProfile = lazy(() => import('./projects/colleague-profile').then(m => ({ default: m.ColleagueProfileDefault })));
const ColleagueManageTeam = lazy(() => import('./projects/colleague-profile').then(m => ({ default: m.ManageTeamDefault })));
const MarshOneNewExperience = lazy(() => import('./pages/ai-personalized-experience/AIPersonalizedExperience'));
const TypographyDemo = lazy(() => import('./projects/marsh-one/TypographyDemo'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RESGAssetListPage = lazy(() => import('./pages/RESGAssetListPage'));
const RESGClientSummary = lazy(() => import('./projects/resg').then(m => ({ default: m.ClientSummaryDefault })));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const ClinicalTrials = lazy(() => import('./projects/ClinicalTrials').then(m => ({ default: m.ClinicalTrialsPage })));
const HeroBannerTest = lazy(() => import('./pages/HeroBannerTest'));
const HeroBannerGridTest = lazy(() => import('./pages/HeroBannerGridTest'));
const ColorSandbox = lazy(() => import('./pages/ColorSandbox'));
const Marsh1DER = lazy(() => import('./projects/Marsh1DER').then(m => ({ default: m.Marsh1DERPage })));
const CorporateHome = lazy(() => import('./projects/Marsh1DER/corporate/home').then(m => ({ default: m.CorporateHomePage })));
const Marsh1DERConcepts = lazy(() => import('./projects/Marsh1DER/concepts').then(m => ({ default: m.ConceptsPage })));
const DesignSystemLayout = lazy(() => import('./projects/design-system').then(m => ({ default: m.DesignSystemLayoutDefault })));
const DesignSystemIndexPage = lazy(() => import('./projects/design-system').then(m => ({ default: m.DesignSystemIndexPageDefault })));
const DesignSystemCategoryPage = lazy(() => import('./projects/design-system').then(m => ({ default: m.CategoryPageDefault })));

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
        <Route path="/grid" element={<GridShowcase />} />
        <Route path="/marsh-new-charpter-begins" element={<MarshNewCharpterBeginsPage />} />
        <Route path="/marsh-corporate" element={<MarshCorporate />} />
        <Route path="/marsh-corporate-new" element={<MarshCorporateNew />} />
        <Route path="/corporate-landing" element={<CorporateLandingPage />} />
        <Route path="/marsh-one" element={<MarshOneHomepage />} />
        <Route path="/marsh-one/go-to-market" element={<GoToMarket />} />
        <Route path="/insurance-dashboard" element={<InsuranceDashboard />} />
        <Route path="/dashboard-demo" element={<DashboardDemo />} />
        {/* Nested under ColleagueLayout so both routes share the TeamsProvider
            store — a team created in the drawer survives the hop to Team Setup. */}
        <Route path="/colleague-profile" element={<ColleagueLayout />}>
          <Route index element={<ColleagueProfile />} />
          <Route path="teams/:teamId" element={<ColleagueManageTeam />} />
        </Route>
        <Route path="/marshone-new-experience" element={<MarshOneNewExperience />} />
        <Route path="/typography-demo" element={<TypographyDemo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resg-asset-list" element={<RESGAssetListPage />} />
        <Route path="/resg/client-summary" element={<RESGClientSummary />} />
        <Route path="/ClinicalTrials" element={<ClinicalTrials />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/hero-banner-test" element={<HeroBannerTest />} />
        <Route path="/hero-banner-grid-test" element={<HeroBannerGridTest />} />
        <Route path="/color-sandbox" element={<ColorSandbox />} />
        <Route path="/marsh-1der" element={<Marsh1DER />} />
        <Route path="/marsh-1der/corporate" element={<CorporateHome />} />
        <Route path="/marsh-1der/concepts" element={<Marsh1DERConcepts />} />
        <Route path="/design-system" element={<DesignSystemLayout />}>
          <Route index element={<DesignSystemIndexPage />} />
          <Route path=":categoryId" element={<DesignSystemCategoryPage />} />
        </Route>
      </Routes>
    </Suspense>
    </RouterWithTracking>
  </BrowserRouter>
);

export default Router;
