import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

const IconContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
    color: theme.palette.secondary.main
  }
}));

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <StyledCard>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
        <IconContainer>
          {icon}
        </IconContainer>
        
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            color: 'primary.main', 
            mb: 2,
            fontSize: '1.25rem'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.6,
            flex: 1
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default BenefitCard;