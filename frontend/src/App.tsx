import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import createCache from '@emotion/cache';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import SchoolPage from './pages/School';
import CollegePage from './pages/College';
import ProfessionalsPage from './pages/Professional';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/school" element={<SchoolPage />} />
            <Route path="/college" element={<CollegePage />} />
            <Route path="/professional" element={<ProfessionalsPage />} />
            {/* Fallback route */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;