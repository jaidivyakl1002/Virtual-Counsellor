import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import createCache from '@emotion/cache';
import theme from './theme';
import AssessmentResultsPage from './pages/AssessmentResultsPage';
import CollegeAssessment from './pages/CollegeAssessment';

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
            <Route path="/" element={<AssessmentResultsPage />} />
            <Route path="/college_test" element={<CollegeAssessment />} />
            <Route path="/assessment_results" element={<AssessmentResultsPage />} />
            {/* Fallback route */}
            <Route path="*" element={<AssessmentResultsPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;