import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AssessmentSection } from '../../types/assessmentEnums';

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

interface ProgressIndicatorProps {
  currentSection: AssessmentSection;
  completedSections: Set<AssessmentSection>;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentSection,
  completedSections
}) => {
  const sections = [
    AssessmentSection.VERBAL_SYNONYMS,
    AssessmentSection.VERBAL_PROVERBS,
    AssessmentSection.NUMERICAL,
    AssessmentSection.MECHANICAL,
    AssessmentSection.CLERICAL,
    AssessmentSection.REASONING
  ];

  const currentIndex = sections.indexOf(currentSection);
  const progress = ((currentIndex + 1) / sections.length) * 100;
  const completedCount = completedSections.size;

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
      <Stack spacing={2}>
        <ProgressText>
          Assessment Progress: {Math.round(progress)}% Complete
        </ProgressText>
        
        <StyledLinearProgress 
          variant="determinate" 
          value={progress}
        />
        
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
      </Stack>
    </ProgressContainer>
  );
};

export default ProgressIndicator;