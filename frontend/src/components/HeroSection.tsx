import React from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  paddingTop: '80px'
}));

const HeroContent = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  maxWidth: '600px',
  zIndex: 2
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '16px 32px',
  fontSize: '1.1rem',
  borderRadius: '12px',
  '&:hover': {
    background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)'
  },
  transition: 'all 0.3s ease'
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  fontWeight: 600,
  padding: '16px 32px',
  fontSize: '1.1rem',
  borderRadius: '12px',
  borderWidth: '2px',
  '&:hover': {
    borderWidth: '2px',
    backgroundColor: 'rgba(30, 58, 138, 0.08)',
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.3s ease'
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  borderRadius: '20px',
  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))'
}));

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
          <HeroContent spacing={4}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.2
              }}
            >
              Your Career Roadmap, Powered by{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Agentic AI
              </Box>
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.25rem',
                color: 'text.secondary',
                lineHeight: 1.6,
                maxWidth: '500px'
              }}
            >
              Move beyond generic advice. Our Virtual Career Counselor combines 
              psychometric science with real-time market data to build a personalized, 
              actionable plan for your future.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 2 }}>
              <PrimaryButton size="large">
                Find My Path
              </PrimaryButton>
              <SecondaryButton variant="outlined" size="large">
                Watch Demo
              </SecondaryButton>
            </Stack>
          </HeroContent>
          
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <HeroImage
              src="https://images.unsplash.com/photo-1655557984735-aa24ccbbf0bc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwM0QlMjB0ZWNobm9sb2d5JTIwZnV0dXJpc3RpYyUyMGlzb21ldHJpYyUyMGNpcmN1aXRzfGVufDB8MHx8Ymx1ZXwxNzU4MDg1MTc1fDA&ixlib=rb-4.1.0&q=85"
              alt="Futuristic 3D isometric illustration of AI technology with blue glowing elements, circuit patterns, and geometric shapes representing artificial intelligence and data processing - Steve Johnson on Unsplash"
              style={{ width: '500px', height: '400px' }}
            />
          </Box>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;