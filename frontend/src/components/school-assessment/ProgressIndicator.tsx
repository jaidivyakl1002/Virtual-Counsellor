import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Stack,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AssessmentSection } from '../../types/assessmentEnums';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ProgressContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 4
  }
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  textAlign: 'center'
}));

const SectionIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  flexWrap: 'wrap',
  gap: theme.spacing(1)
}));

const SectionDot = styled(Box)<{ active?: boolean; completed?: boolean }>(({ theme, active, completed }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: completed 
    ? theme.palette.success.main 
    : active 
    ? theme.palette.primary.main 
    : theme.palette.grey[300],
  transition: 'all 0.3s ease',
  boxShadow: active ? `0 0 0 3px ${theme.palette.primary.main}20` : 'none'
}));

const StepperContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiStepLabel-root': {
    cursor: 'default'
  },
  '& .MuiStepIcon-root': {
    fontSize: '1.5rem'
  }
}));

interface ProgressIndicatorProps {
  currentStep: 'basic-info' | 'assessment';
  currentSection?: AssessmentSection;
  completedSections: Set<AssessmentSection>;
  basicInfoComplete: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  currentSection,
  completedSections,
  basicInfoComplete
}) => {
  const sections = [
    AssessmentSection.VERBAL_SYNONYMS,
    AssessmentSection.VERBAL_PROVERBS,
    AssessmentSection.NUMERICAL,
    AssessmentSection.MECHANICAL,
    AssessmentSection.CLERICAL,
    AssessmentSection.REASONING
  ];

  const completedCount = completedSections.size;
  
  // Calculate overall progress
  const basicInfoProgress = basicInfoComplete ? 1 : (currentStep === 'basic-info' ? 0.5 : 0);
  const assessmentProgress = (completedCount / sections.length);
  const overallProgress = ((basicInfoProgress + assessmentProgress) / 2) * 100;

  const activeStep = currentStep === 'basic-info' ? 0 : 1;

  const getSectionName = (section: AssessmentSection): string => {
    switch (section) {
      case AssessmentSection.VERBAL_SYNONYMS:
        return 'VA-I';
      case AssessmentSection.VERBAL_PROVERBS:
        return 'VA-II';
      case AssessmentSection.NUMERICAL:
        return 'NA';
      case AssessmentSection.MECHANICAL:
        return 'MA';
      case AssessmentSection.CLERICAL:
        return 'CL';
      case AssessmentSection.REASONING:
        return 'RA';
      default:
        return '';
    }
  };

  return (
    <ProgressContainer>
      <Stack spacing={3}>
        {/* Main Steps */}
        <StepperContainer>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step completed={basicInfoComplete}>
              <StepLabel 
                StepIconComponent={basicInfoComplete ? CheckCircleIcon : RadioButtonUncheckedIcon}
                sx={{ 
                  '& .MuiStepLabel-label': { 
                    fontWeight: currentStep === 'basic-info' ? 600 : 400,
                    color: basicInfoComplete ? 'success.main' : currentStep === 'basic-info' ? 'primary.main' : 'text.secondary'
                  }
                }}
              >
                Basic Information
              </StepLabel>
            </Step>
            <Step completed={completedCount === sections.length}>
              <StepLabel 
                StepIconComponent={completedCount === sections.length ? CheckCircleIcon : RadioButtonUncheckedIcon}
                sx={{ 
                  '& .MuiStepLabel-label': { 
                    fontWeight: currentStep === 'assessment' ? 600 : 400,
                    color: completedCount === sections.length ? 'success.main' : currentStep === 'assessment' ? 'primary.main' : 'text.secondary'
                  }
                }}
              >
                Aptitude Assessment
              </StepLabel>
            </Step>
          </Stepper>
        </StepperContainer>

        {/* Overall Progress */}
        <ProgressText>
          Overall Progress: {Math.round(overallProgress)}% Complete
        </ProgressText>
        
        <StyledLinearProgress 
          variant="determinate" 
          value={overallProgress}
        />
        
        {/* Assessment Sections (only show when in assessment step) */}
        {currentStep === 'assessment' && currentSection && (
          <>
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary',
                fontSize: '0.8rem',
                mt: 2
              }}
            >
              Assessment Sections
            </Typography>
            
            <SectionIndicator>
              {sections.map((section, index) => (
                <Stack key={section} alignItems="center" spacing={0.5}>
                  <SectionDot
                    active={section === currentSection}
                    completed={completedSections.has(section)}
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 500,
                      color: section === currentSection ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    {getSectionName(section)}
                  </Typography>
                </Stack>
              ))}
            </SectionIndicator>
            
            <Typography 
              variant="caption" 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary',
                fontSize: '0.8rem'
              }}
            >
              {completedCount} of {sections.length} sections completed
            </Typography>
          </>
        )}
      </Stack>
    </ProgressContainer>
  );
};

export default ProgressIndicator;