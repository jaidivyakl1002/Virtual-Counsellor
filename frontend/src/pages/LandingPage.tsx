import React from 'react';
import { Box } from '@mui/material';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import UserJourneySection from '../components/UserJourneySection';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navigation />
      <HeroSection />
      <UserJourneySection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </Box>
  );
};

export default LandingPage;