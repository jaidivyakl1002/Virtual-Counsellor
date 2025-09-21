import React from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({  }) => ({
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  padding: '120px 0 80px',
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center'
}));

const HeroButton = styled(Button)(({  }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '16px 32px',
  fontSize: '1.1rem',
  borderRadius: '12px',
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(20, 108, 148, 0.3)'
  },
  transition: 'all 0.3s ease'
}));

interface PageHeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Stack alignItems="center" textAlign="center" spacing={4} sx={{ maxWidth: '800px', mx: 'auto' }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'primary.main',
              lineHeight: 1.2
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.25rem',
              color: 'text.secondary',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}
          >
            {subtitle}
          </Typography>
          
          <HeroButton size="large" onClick={onButtonClick}>
            {buttonText}
          </HeroButton>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default PageHero;