import React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { NavigationProps } from '../../types/assessmentSchemas';

const NavigationContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)'
}));

const NavButton = styled(Button)(({  }) => ({
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  minWidth: '120px',
  transition: 'all 0.3s ease'
}));

const PreviousButton = styled(NavButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(12px)',
  border: '2px solid rgba(102, 126, 234, 0.3)',
  color: theme.palette.primary.main,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)'
  },
  '&:disabled': {
    background: theme.palette.grey[100],
    borderColor: theme.palette.grey[300],
    color: theme.palette.grey[500],
    transform: 'none',
    boxShadow: 'none'
  }
}));

const NextButton = styled(NavButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
    transform: 'none',
    boxShadow: 'none'
  }
}));

const SubmitButton = styled(NavButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  color: 'white',
  border: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
    transform: 'none',
    boxShadow: 'none'
  }
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textAlign: 'center'
}));

const AssessmentNavigation: React.FC<NavigationProps> = ({
  currentSection,
  canGoNext,
  canGoPrevious,
  isLastSection,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const getSectionNumber = (section: string): number => {
    const sections = ['verbal_synonyms', 'verbal_proverbs', 'numerical', 'mechanical', 'clerical', 'reasoning'];
    return sections.indexOf(section) + 1;
  };

  const currentSectionNumber = getSectionNumber(currentSection);
  const totalSections = 6;

  return (
    <NavigationContainer>
      <Stack spacing={2} alignItems="center">
        <ProgressText>
          Section {currentSectionNumber} of {totalSections}
        </ProgressText>
        
        <Stack 
          direction="row" 
          spacing={3} 
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          <PreviousButton
            onClick={onPrevious}
            disabled={!canGoPrevious}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Previous
          </PreviousButton>

          {isLastSection ? (
            <SubmitButton
              onClick={onSubmit}
              disabled={!canGoNext}
              startIcon={<CheckCircleIcon />}
              variant="contained"
            >
              Submit Assessment
            </SubmitButton>
          ) : (
            <NextButton
              onClick={onNext}
              disabled={!canGoNext}
              endIcon={<ArrowForwardIcon />}
              variant="contained"
            >
              Next
            </NextButton>
          )}
        </Stack>
      </Stack>
    </NavigationContainer>
  );
};

export default AssessmentNavigation;