import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/shared/PageHero';
import BenefitCard from '../components/shared/BenefitCard';
import ProcessStep from '../components/shared/ProcessStep';
import PageCTA from '../components/shared/PageCTA';
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const ContentSection = styled(Box)(({  }) => ({
  padding: '80px 0'
}));

const ProcessSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '80px 0'
}));

const SchoolPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/school_test');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navigation />

      <PageHero
        title="Choose Your Academic Stream with Confidence"
        subtitle="Navigate high school with confidence. Our AI analyzes your aptitude and interests to recommend academic streams and future career possibilities."
        buttonText="Start Your Assessment"
        onButtonClick={handleStartAssessment}
      />

      <ContentSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              color: 'primary.main', 
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Why Students Choose Virtual Counsellor
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<CrisisAlertOutlinedIcon />}
                title="Stream Selection"
                description="Get personalized recommendations for Science, Commerce, or Arts based on your strengths and interests."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<LocalLibraryOutlinedIcon />}
                title="Subject Guidance"
                description="Discover which subjects align with your natural abilities and career aspirations."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<TrendingUpOutlinedIcon />}
                title="Future Planning"
                description="Explore career paths and college options that match your chosen academic stream."
              />
            </Grid>
          </Grid>
        </Container>
      </ContentSection>

      <ProcessSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              color: 'primary.main', 
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Your Path to Academic Clarity
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: '1000px', mx: 'auto' }}>
            <Grid item xs={12} md={4}>
              <ProcessStep
                stepNumber={1}
                title="Take Assessment"
                description="Complete our comprehensive aptitude and interest assessment designed for high school students."
                stepColor="#146C94"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProcessStep
                stepNumber={2}
                title="Get Recommendations"
                description="Receive personalized stream and subject recommendations based on your unique profile."
                stepColor="#19A7CE"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProcessStep
                stepNumber={3}
                title="Plan Your Future"
                description="Access detailed roadmaps for your chosen stream and explore future career possibilities."
                stepColor="#AFD3E2"
              />
            </Grid>
          </Grid>
        </Container>
      </ProcessSection>

      <PageCTA
        title="Ready to Choose Your Academic Path?"
        subtitle="Join thousands of students who have found their perfect academic stream with our AI-powered guidance."
        buttonText="Start Your Free Assessment"
        onButtonClick={handleStartAssessment}
      />

      <Footer />
    </Box>
  );
};

export default SchoolPage;