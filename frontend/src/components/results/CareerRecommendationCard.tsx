import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CareerRecommendation } from '../../types/assessmentResultsTypes';
import { formatSalaryRange, formatCareerMatch } from '../../utils/formatters';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(20, 108, 148, 0.1)',
  overflow: 'visible',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-4px)',
  },
  transition: 'all 0.3s ease'
}));

const MatchBadge = styled(Box)<{ matchLevel: string }>(({ theme, matchLevel }) => {
  const getColorByMatch = (level: string) => {
    switch (level.toLowerCase()) {
      case 'excellent':
        return { bg: '#E8F5E8', color: '#2E7D32', border: '#4CAF50' };
      case 'good':
        return { bg: '#E3F2FD', color: '#1565C0', border: '#2196F3' };
      case 'fair':
        return { bg: '#FFF3E0', color: '#EF6C00', border: '#FF9800' };
      default:
        return { bg: '#FFEBEE', color: '#C62828', border: '#F44336' };
    }
  };

  const colors = getColorByMatch(matchLevel);
  return {
    position: 'absolute',
    top: '-12px',
    right: '24px',
    backgroundColor: colors.bg,
    color: colors.color,
    border: `2px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '0.875rem',
    fontWeight: 600,
    zIndex: 1
  };
});

const SkillChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  fontSize: '0.75rem',
  height: '28px',
  '&.required': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  '&.nice-to-have': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.secondary
  }
}));

interface CareerRecommendationCardProps {
  recommendation: CareerRecommendation;
  onClick?: () => void;
}

const CareerRecommendationCard: React.FC<CareerRecommendationCardProps> = ({ 
  recommendation, 
  onClick 
}) => {
  return (
    <StyledCard onClick={onClick}>
      <MatchBadge matchLevel={recommendation.matchLevel}>
        {formatCareerMatch(recommendation.matchLevel)}
      </MatchBadge>
      
      <CardContent className="p-6 pt-8">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={2} className="mb-2">
              <WorkOutlineOutlinedIcon className="text-primary-main" />
              <Typography variant="h5" className="font-bold text-text-primary">
                {recommendation.title}
              </Typography>
            </Stack>
            
            <Typography variant="body1" className="text-text-secondary mb-4">
              {recommendation.description}
            </Typography>
            
            {/* Match Percentage */}
            <Box className="mb-4">
              <Stack direction="row" justifyContent="space-between" className="mb-2">
                <Typography variant="body2" className="text-text-secondary font-medium">
                  Skill Match
                </Typography>
                <Typography variant="body2" className="font-bold text-primary-main">
                  {recommendation.matchPercentage}%
                </Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={recommendation.matchPercentage} 
                className="h-2 rounded-full"
                sx={{
                  backgroundColor: 'rgba(20, 108, 148, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#146C94',
                    borderRadius: '4px'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Salary and Growth */}
          <Stack direction="row" spacing={4}>
            <Box className="flex-1">
              <Typography variant="body2" className="text-text-secondary mb-1">
                Salary Range
              </Typography>
              <Typography variant="h6" className="font-bold text-text-primary">
                {formatSalaryRange(recommendation.salaryRange.min, recommendation.salaryRange.max)}
              </Typography>
            </Box>
            
            <Box className="flex-1">
              <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
                <TrendingUpOutlinedIcon className="text-green-600 text-lg" />
                <Typography variant="body2" className="text-text-secondary">
                  Growth Potential
                </Typography>
              </Stack>
              <Typography variant="h6" className="font-bold text-green-600">
                {recommendation.growthPotential}
              </Typography>
            </Box>
          </Stack>

          {/* Required Skills */}
          <Box>
            <Typography variant="body2" className="text-text-secondary font-medium mb-3">
              Required Skills
            </Typography>
            <Stack direction="row" spacing={1} className="flex-wrap gap-2">
              {recommendation.requiredSkills.map((skill, index) => (
                <SkillChip 
                  key={index}
                  label={skill}
                  size="small"
                  className="required"
                />
              ))}
            </Stack>
          </Box>

          {/* Nice to Have Skills */}
          {recommendation.niceToHave.length > 0 && (
            <Box>
              <Typography variant="body2" className="text-text-secondary font-medium mb-3">
                Nice to Have
              </Typography>
              <Stack direction="row" spacing={1} className="flex-wrap gap-2">
                {recommendation.niceToHave.map((skill, index) => (
                  <SkillChip 
                    key={index}
                    label={skill}
                    size="small"
                    className="nice-to-have"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default CareerRecommendationCard;