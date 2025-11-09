import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MarshNewCharpterBeginsPage from './pages/marsh-new-charpter-begins/Page';
import ComponentShowcase from './pages/ComponentShowcase';
import GridShowcase from './pages/GridShowcase';
import GridTestPage from './pages/GridTestPage';
import AnimatedGridDemo from './pages/AnimatedGridDemo';
import ParallaxDemo from './pages/ParallaxDemo';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/components" element={<ComponentShowcase />} />
      <Route path="/grid" element={<GridShowcase />} />
      <Route path="/grid-test" element={<GridTestPage />} />
      <Route path="/grid-demo" element={<AnimatedGridDemo />} />
      <Route path="/parallax-demo" element={<ParallaxDemo />} />
      <Route path="/marsh-new-charpter-begins" element={<MarshNewCharpterBeginsPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
