import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import AssessmentModal from './AssessmentModal';

const CTAContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  color: 'white',
  padding: '80px 0',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  fontWeight: 700,
  padding: '16px 48px',
  fontSize: '1.2rem',
  borderRadius: '16px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
  },
  transition: 'all 0.3s ease'
}));

const CTASection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartAssessment = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <CTAContainer>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              maxWidth: '800px',
              lineHeight: 1.2
            }}
          >
            Ready to Transform Your Career Journey?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: '600px',
              fontSize: '1.3rem',
              fontWeight: 400
            }}
          >
            Join thousands of students and professionals who have discovered their perfect career path with our AI-powered guidance.
          </Typography>
          <CTAButton
            size="large"
            onClick={handleStartAssessment}
          >
            Start Your Free Assessment
          </CTAButton>
        </Stack>
      </Container>
      
      <AssessmentModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
      />
    </CTAContainer>
  );
};

export default CTASection;