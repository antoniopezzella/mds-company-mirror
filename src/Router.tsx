import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StyleGuidePage from './pages/StyleGuidePage';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/style-guide" element={<StyleGuidePage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
