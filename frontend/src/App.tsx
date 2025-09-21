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
import CollegeAssessment from './pages/CollegeAssessment';
import SchoolAssessment from './pages/SchoolAssessment';
import AssessmentResultsPage from './pages/AssessmentResultsPage';
import SchoolAssessmentResultsPage from './pages/SchoolAssessmentResultsPage';

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
            <Route path="/college_test" element={<CollegeAssessment />} />
            <Route path="/school_test" element={<SchoolAssessment />} />
            <Route path="/assessment_results" element={<AssessmentResultsPage/>} />
            <Route path="/school_assessment_results" element={<SchoolAssessmentResultsPage/>} />
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