import React from 'react';
import { Container, Typography, Card, CardContent, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F1F5F9',
  padding: '100px 0',
  position: 'relative'
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: '40px 30px',
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: '20px',
  border: '1px solid #E2E8F0',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.light
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '70px',
  height: '70px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: 'white'
  }
}));

interface FeatureData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featuresData: FeatureData[] = [
  {
    icon: <PsychologyOutlinedIcon />,
    title: 'Psychometric Science + Agentic AI',
    description: 'We combine validated psychological assessments with specialized, coordinated AI agents for truly deep and accurate career matching.'
  },
  {
    icon: <ShowChartOutlinedIcon />,
    title: 'Real-Time Market Intelligence',
    description: 'Our advice is grounded in reality. We integrate live data from job portals to ensure your roadmap is relevant and in-demand.'
  },
  {
    icon: <VerifiedUserOutlinedIcon />,
    title: 'Grounded by RAG',
    description: 'No hallucinations. Our Retrieval-Augmented Generation (RAG) knowledge base ensures all advice is based on factual, up-to-date information.'
  },
  {
    icon: <MapOutlinedIcon />,
    title: 'Actionable, Step-by-Step Plans',
    description: 'We deliver more than suggestions. You get detailed, milestone-based roadmaps, from course selection to skill development.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center',
              color: 'primary.dark',
              fontWeight: 700,
              maxWidth: '600px',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            The New Standard in Career Guidance
          </Typography>
          
          <Box sx={{ width: '100%' }}>
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={4}
              sx={{ mb: 4 }}
            >
              {featuresData.slice(0, 2).map((feature, index) => (
                <FeatureCard key={index} sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <IconWrapper>
                      {feature.icon}
                    </IconWrapper>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2,
                        fontSize: '1.5rem'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: '1.1rem'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              ))}
            </Stack>
            
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={4}
            >
              {featuresData.slice(2, 4).map((feature, index) => (
                <FeatureCard key={index + 2} sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <IconWrapper>
                      {feature.icon}
                    </IconWrapper>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2,
                        fontSize: '1.5rem'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: '1.1rem'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default FeaturesSection;