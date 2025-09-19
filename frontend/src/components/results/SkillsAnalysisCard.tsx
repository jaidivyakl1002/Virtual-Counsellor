import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SkillsAnalysis, CurrentSkill, SkillGap } from '../../types/assessmentResultsTypes';
import { formatSkillLevel, formatPriority } from '../../utils/formatters';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(20, 108, 148, 0.1)',
  overflow: 'visible',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease'
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px',
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '1.5rem'
  }
}));

const SkillItem = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.grey[50],
  border: '1px solid rgba(0, 0, 0, 0.05)',
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: 0
  }
}));

const SkillLevel = styled(Chip)<{ level: string }>(({ theme, level }) => {
  const getColorByLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return { bg: '#E8F5E8', color: '#2E7D32' };
      case 'advanced':
        return { bg: '#E3F2FD', color: '#1565C0' };
      case 'intermediate':
        return { bg: '#FFF3E0', color: '#EF6C00' };
      default:
        return { bg: '#FAFAFA', color: '#616161' };
    }
  };

  const colors = getColorByLevel(level);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px'
  };
});

const PriorityChip = styled(Chip)<{ priority: string }>(({ theme, priority }) => {
  const getColorByPriority = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return { bg: '#FFEBEE', color: '#C62828' };
      case 'medium':
        return { bg: '#FFF3E0', color: '#EF6C00' };
      default:
        return { bg: '#E8F5E8', color: '#2E7D32' };
    }
  };

  const colors = getColorByPriority(priority);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px'
  };
});

interface SkillsAnalysisCardProps {
  skillsAnalysis: SkillsAnalysis;
}

const SkillsAnalysisCard: React.FC<SkillsAnalysisCardProps> = ({ skillsAnalysis }) => {
  return (
    <StyledCard>
      <CardContent className="p-8">
        <Typography variant="h4" className="font-bold text-text-primary mb-8">
          Skills Analysis
        </Typography>

        <Stack spacing={6}>
          {/* Current Strengths */}
          <Box>
            <SectionHeader>
              <SchoolOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Current Strengths
              </Typography>
            </SectionHeader>
            
            <Stack spacing={2}>
              {skillsAnalysis.currentSkills.map((skill: CurrentSkill, index: number) => (
                <SkillItem key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-3">
                    <Typography variant="h6" className="font-semibold text-text-primary">
                      {skill.name}
                    </Typography>
                    <SkillLevel 
                      label={formatSkillLevel(skill.level)} 
                      level={skill.level}
                      size="small"
                    />
                  </Stack>
                  
                  <Box className="mb-2">
                    <Stack direction="row" justifyContent="space-between" className="mb-1">
                      <Typography variant="body2" className="text-text-secondary">
                        Skill Level
                      </Typography>
                      <Typography variant="body2" className="font-medium text-text-primary">
                        {skill.score}%
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.score} 
                      className="h-2 rounded-full"
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: skill.score >= 80 ? '#2E7D32' : skill.score >= 60 ? '#1565C0' : '#EF6C00',
                          borderRadius: '4px'
                        }
                      }}
                    />
                  </Box>
                </SkillItem>
              ))}
            </Stack>
          </Box>

          {/* Areas for Improvement */}
          <Box>
            <SectionHeader>
              <TrendingUpOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Areas for Improvement
              </Typography>
            </SectionHeader>
            
            <Stack spacing={2}>
              {skillsAnalysis.skillGaps.map((gap: SkillGap, index: number) => (
                <SkillItem key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-3">
                    <Typography variant="h6" className="font-semibold text-text-primary">
                      {gap.name}
                    </Typography>
                    <PriorityChip 
                      label={formatPriority(gap.importance)} 
                      priority={gap.importance}
                      size="small"
                    />
                  </Stack>
                  
                  <Stack direction="row" spacing={4} alignItems="center">
                    <Box className="flex-1">
                      <Typography variant="body2" className="text-text-secondary mb-1">
                        Current Level
                      </Typography>
                      <SkillLevel 
                        label={formatSkillLevel(gap.currentLevel)} 
                        level={gap.currentLevel}
                        size="small"
                      />
                    </Box>
                    
                    <Box className="text-text-secondary">
                      →
                    </Box>
                    
                    <Box className="flex-1">
                      <Typography variant="body2" className="text-text-secondary mb-1">
                        Target Level
                      </Typography>
                      <SkillLevel 
                        label={formatSkillLevel(gap.targetLevel)} 
                        level={gap.targetLevel}
                        size="small"
                      />
                    </Box>
                  </Stack>
                </SkillItem>
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default SkillsAnalysisCard;