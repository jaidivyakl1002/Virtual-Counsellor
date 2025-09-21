import React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StepNumber = styled(Box)(({  stepColor }: { stepColor: string }) => ({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: stepColor,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  margin: '0 auto 16px'
}));

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  stepColor?: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  stepNumber, 
  title, 
  description, 
  stepColor = '#146C94' 
}) => {
  return (
    <Stack alignItems="center" textAlign="center" spacing={2}>
      <StepNumber stepColor={stepColor}>
        {stepNumber}
      </StepNumber>
      
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          color: 'primary.main',
          fontSize: '1.125rem'
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          lineHeight: 1.6,
          fontSize: '0.875rem'
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default ProcessStep;