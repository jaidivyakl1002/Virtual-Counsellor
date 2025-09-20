import React from 'react';
import { Container, Typography, Stack, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageHero from '../components/shared/PageHero';
import BenefitCard from '../components/shared/BenefitCard';
import PageCTA from '../components/shared/PageCTA';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

const ContentSection = styled(Box)(({ theme }) => ({
  padding: '80px 0'
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '80px 0'
}));

const FeatureList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3)
}));

const FeatureItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: theme.spacing(2)
}));

const FeatureDot = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  flexShrink: 0,
  marginTop: '4px'
}));

const StatCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #AFD3E2 0%, #19A7CE 100%)',
  padding: theme.spacing(4),
  borderRadius: '16px',
  textAlign: 'center',
  color: 'white'
}));

const CollegePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navigation />

      <PageHero
        title="Bridge the Gap Between College and Career"
        subtitle="Enhance your skill degree. We identify skill gaps for careers and provide a roadmap of courses, projects, and certifications to make you job-ready."
        buttonText="Start Your Upskilling Journey"
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
            Why College Students Trust Us
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<DataObjectOutlinedIcon />}
                title="Skill Gap Analysis"
                description="Identify exactly what skills you need to develop for your target career path."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<EmojiEventsOutlinedIcon />}
                title="Certification Roadmap"
                description="Get a curated list of industry-recognized certifications that boost your employability."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard
                icon={<BusinessCenterOutlinedIcon />}
                title="Project Portfolio"
                description="Build a portfolio of real-world projects that demonstrate your skills to employers."
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
            Your College-to-Career Bridge
          </Typography>
          
          <Grid container spacing={6} alignItems="center" sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main', 
                  mb: 4,
                  fontSize: '1.75rem'
                }}
              >
                From Academic Knowledge to Industry Skills
              </Typography>
              
              <FeatureList>
                <FeatureItem>
                  <FeatureDot />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                      Industry-Aligned Curriculum
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Learn skills that employers actually need in today's job market.
                    </Typography>
                  </Box>
                </FeatureItem>
                
                <FeatureItem>
                  <FeatureDot />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                      Hands-on Projects
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Build real projects that showcase your abilities to potential employers.
                    </Typography>
                  </Box>
                </FeatureItem>
                
                <FeatureItem>
                  <FeatureDot />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                      Career Mentorship
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Get guidance from industry professionals who understand your field.
                    </Typography>
                  </Box>
                </FeatureItem>
              </FeatureList>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StatCard>
                <SchoolOutlinedIcon sx={{ fontSize: '5rem', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  85% Job Placement Rate
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Our college students land jobs within 6 months of completing their personalized roadmap.
                </Typography>
              </StatCard>
            </Grid>
          </Grid>
        </Container>
      </FeatureSection>

      <PageCTA
        title="Ready to Become Job-Ready?"
        subtitle="Transform your college education into career success with our personalized upskilling roadmap."
        buttonText="Start Your Assessment Today"
      />

      <Footer />
    </Box>
  );
};

export default CollegePage;