import React from 'react';
import { Container, Typography, Card, CardContent, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const SectionContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%)',
  padding: '100px 0',
  position: 'relative'
}));

const JourneyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: '40px 30px',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem',
    color: 'white'
  }
}));

interface JourneyCardData {
  icon: React.ReactNode;
  title: string;
  question: string;
  description: string;
}

const journeyData: JourneyCardData[] = [
  {
    icon: <ExploreOutlinedIcon />,
    title: 'For School Students',
    question: 'Choosing Your Stream?',
    description: 'Navigate high school with confidence. Our AI analyzes your aptitude and interests to recommend academic streams and future career possibilities.'
  },
  {
    icon: <SchoolOutlinedIcon />,
    title: 'For University Students',
    question: 'Ready to Upskill?',
    description: 'Enhance your skill degree. We identify skill gaps for careers and a roadmap of courses, projects, and certifications to make you job-ready.'
  },
  {
    icon: <SettingsOutlinedIcon />,
    title: 'For Professionals',
    question: 'Considering a Career Switch?',
    description: 'Make your next move the right one. Our AI analyzes your existing skills to find fulfilling new careers and provides a detailed transition plan.'
  }
];

const UserJourneySection: React.FC = () => {
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
              maxWidth: '800px',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Personalized Guidance for Every Step of Your Journey
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4} 
            sx={{ width: '100%' }}
          >
            {journeyData.map((item, index) => (
              <JourneyCard key={index} sx={{ flex: 1 }}>
                <CardContent sx={{ p: 0 }}>
                  <IconWrapper>
                    {item.icon}
                  </IconWrapper>
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 2
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 3
                    }}
                  >
                    {item.question}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.6
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </JourneyCard>
            ))}
          </Stack>
        </Stack>
      </Container>
    </SectionContainer>
  );
};

export default UserJourneySection;