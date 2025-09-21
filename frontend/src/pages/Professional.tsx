import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/shared/PageHero';
import BenefitCard from '../components/shared/BenefitCard';
import ProcessStep from '../components/shared/ProcessStep';
import SuccessStoryCard from '../components/shared/SuccessStoryCard';
import PageCTA from '../components/shared/PageCTA';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const ContentSection = styled(Box)(({  }) => ({
  padding: '80px 0'
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '80px 0'
}));

const ProcessSection = styled(Box)(({  }) => ({
  padding: '80px 0'
}));

const ProfessionalsPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navigation />

      <PageHero
        title="Make Your Next Career Move the Right One"
        subtitle="Our AI analyzes your existing skills to find fulfilling new careers and provides a detailed transition plan."
        buttonText="Explore Career Transitions"
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
            Why Professionals Choose Our Guidance
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<CrisisAlertOutlinedIcon />}
                title="Skills Assessment"
                description="Comprehensive analysis of your current skills and their transferability to new roles."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<KeyboardArrowRightOutlinedIcon />}
                title="Transition Planning"
                description="Step-by-step roadmap for switching careers without starting from scratch."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<TrendingUpOutlinedIcon />}
                title="Market Intelligence"
                description="Real-time insights into job market trends and salary expectations for your target roles."
              />
            </Grid>
          </Grid>
        </Container>
      </ContentSection>

      <FeatureSection>
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
            Professional Success Stories
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} md={6}>
              <SuccessStoryCard
                initial="S"
                name="Sarah M."
                transition="Marketing → Data Science"
                quote="The transition roadmap helped me leverage my marketing analytics experience to break into data science. I landed my dream job in just 8 months!"
                achievement="40% salary increase"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SuccessStoryCard
                initial="M"
                name="Michael R."
                transition="Finance → Product Management"
                quote="I thought I'd have to start over, but the AI showed me how my financial modeling skills were perfect for product strategy roles."
                achievement="Smooth 6-month transition"
              />
            </Grid>
          </Grid>
        </Container>
      </FeatureSection>

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
            Your Career Transition Journey
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} sm={6} md={3}>
              <ProcessStep
                stepNumber={1}
                title="Skills Audit"
                description="Comprehensive assessment of your current professional skills and experience."
                stepColor="#146C94"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ProcessStep
                stepNumber={2}
                title="Career Matching"
                description="AI-powered matching to identify careers that align with your skills and interests."
                stepColor="#19A7CE"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ProcessStep
                stepNumber={3}
                title="Gap Analysis"
                description="Identify skill gaps and create a personalized learning plan to bridge them."
                stepColor="#AFD3E2"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ProcessStep
                stepNumber={4}
                title="Execute Plan"
                description="Follow your personalized roadmap with ongoing support and progress tracking."
                stepColor="#146C94"
              />
            </Grid>
          </Grid>
        </Container>
      </ProcessSection>

      <PageCTA
        title="Ready to Transform Your Career?"
        subtitle="Join thousands of professionals who have successfully transitioned to fulfilling new careers."
        buttonText="Start Your Career Assessment"
      />

      <Footer />
    </Box>
  );
};

export default ProfessionalsPage;