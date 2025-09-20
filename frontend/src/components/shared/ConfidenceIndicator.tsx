import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { formatConfidenceScore } from '../../utils/assessmentFormatters';

const ConfidenceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ProgressValue = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.primary.main
}));

interface ConfidenceIndicatorProps {
  confidence: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  label = 'Confidence',
  size = 'medium',
  showIcon = true
}) => {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 48
  };

  const progressSize = sizeMap[size];
  const confidencePercentage = confidence * 100;

  const getColor = (value: number) => {
    if (value >= 90) return 'success';
    if (value >= 70) return 'primary';
    if (value >= 50) return 'warning';
    return 'error';
  };

  return (
    <ConfidenceContainer>
      <ProgressContainer>
        <CircularProgress
          variant="determinate"
          value={confidencePercentage}
          size={progressSize}
          thickness={4}
          color={getColor(confidencePercentage)}
        />
        <ProgressValue variant="caption">
          {formatConfidenceScore(confidence)}
        </ProgressValue>
      </ProgressContainer>
      
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        {showIcon && confidencePercentage >= 90 && (
          <CheckCircleOutlinedIcon 
            sx={{ 
              fontSize: '1rem', 
              color: 'success.main',
              ml: 0.5 
            }} 
          />
        )}
      </Box>
    </ConfidenceContainer>
  );
};

export default ConfidenceIndicator;