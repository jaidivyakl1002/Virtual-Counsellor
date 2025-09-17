import React from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CTAContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)',
  padding: '100px 0',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none'
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: theme.palette.primary.main,
  fontWeight: 700,
  padding: '18px 40px',
  fontSize: '1.2rem',
  borderRadius: '50px',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
  },
  transition: 'all 0.3s ease'
}));

const CTASection: React.FC = () => {
  return (
    <CTAContainer>
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3rem' },
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            Ready to Unlock Your True Potential?
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              fontSize: '1.3rem',
              fontWeight: 400,
              lineHeight: 1.5
            }}
          >
            Start with our scientifically-backed assessment and receive your initial AI-driven insights for free.
          </Typography>
          
          <CTAButton size="large">
            Start My Free Assessment
          </CTAButton>
        </Stack>
      </Container>
    </CTAContainer>
  );
};

export default CTASection;