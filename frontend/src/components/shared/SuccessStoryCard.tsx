import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%'
}));

const Avatar = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.25rem',
  fontWeight: 700
}));

const SuccessIndicator = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.success.main,
  '& .MuiSvgIcon-root': {
    fontSize: '1rem'
  }
}));

interface SuccessStoryCardProps {
  initial: string;
  name: string;
  transition: string;
  quote: string;
  achievement: string;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ 
  initial, 
  name, 
  transition, 
  quote, 
  achievement 
}) => {
  return (
    <StyledCard>
      <CardContent sx={{ pt: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Avatar>
            {initial}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {transition}
            </Typography>
          </Box>
        </Stack>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.primary',
            fontStyle: 'italic',
            mb: 3,
            lineHeight: 1.6
          }}
        >
          "{quote}"
        </Typography>
        
        <SuccessIndicator>
          <CheckCircleOutlineOutlinedIcon />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {achievement}
          </Typography>
        </SuccessIndicator>
      </CardContent>
    </StyledCard>
  );
};

export default SuccessStoryCard;