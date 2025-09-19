import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, LinearProgress, Divider, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SkillDevelopmentOutput } from '../../types/assessmentTypes';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

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

const SkillGapCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '12px'
}));

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

const SkillLevelChip = styled(Chip)<{ level: string }>(({ theme, level }) => {
  const getColorByLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'very high':
      case 'high':
        return { bg: '#E8F5E8', color: '#1B5E20' };
      case 'medium':
        return { bg: '#FFF3E0', color: '#E65100' };
      default:
        return { bg: '#FAFAFA', color: '#424242' };
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

const ProjectCard = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '16px',
  backgroundColor: theme.palette.grey[50],
  border: '1px solid rgba(0, 0, 0, 0.05)',
  marginBottom: '16px'
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
  height: '24px',
  margin: '2px'
}));

interface SkillDevelopmentSectionProps {
  skillDevelopment: SkillDevelopmentOutput;
}

const SkillDevelopmentSection: React.FC<SkillDevelopmentSectionProps> = ({ skillDevelopment }) => {
  const { data } = skillDevelopment;

  return (
    <StyledCard>
      <CardContent className="p-8">
        <SectionHeader>
          <SchoolOutlinedIcon />
          <Typography variant="h4" className="font-bold text-text-primary">
            Skill Development Strategy
          </Typography>
        </SectionHeader>

        <Stack spacing={6}>
          {/* Skill Gap Analysis */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Skill Gap Analysis
            </Typography>
            
            <Typography variant="body1" className="text-text-secondary mb-4">
              <strong>Gap Severity:</strong> {data.skill_gap_analysis.gap_severity}
            </Typography>

            {/* Current Skills vs Market Requirements */}
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
              <Box className="flex-1">
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Current Skills
                </Typography>
                <Stack spacing={2}>
                  {Object.entries(data.skill_gap_analysis.current_skills).map(([skill, level]) => (
                    <SkillGapCard key={skill}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" className="font-medium">
                          {skill}
                        </Typography>
                        <SkillLevelChip label={level} level={level} size="small" />
                      </Stack>
                    </SkillGapCard>
                  ))}
                </Stack>
              </Box>

              <Box className="flex-1">
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Market Requirements
                </Typography>
                <Stack spacing={2}>
                  {Object.entries(data.skill_gap_analysis.market_required_skills).map(([skill, demand]) => (
                    <SkillGapCard key={skill}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" className="font-medium">
                          {skill}
                        </Typography>
                        <SkillLevelChip label={demand} level={demand} size="small" />
                      </Stack>
                    </SkillGapCard>
                  ))}
                </Stack>
              </Box>
            </Stack>

            {/* Skill Gaps */}
            <Box className="mt-6">
              <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                Priority Skill Gaps
              </Typography>
              <Stack spacing={2}>
                {Object.entries(data.skill_gap_analysis.skill_gaps).map(([skill, priority]) => (
                  <SkillGapCard key={skill}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" className="font-medium">
                        {skill}
                      </Typography>
                      <PriorityChip label={priority} priority={priority} size="small" />
                    </Stack>
                  </SkillGapCard>
                ))}
              </Stack>
            </Box>
          </Box>

          <Divider />

          {/* Development Roadmap */}
          <Box>
            <SectionHeader>
              <RocketLaunchOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Learning Roadmap
              </Typography>
            </SectionHeader>

            {/* Priority Skills */}
            <Box className="mb-6">
              <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                Priority Skills to Develop
              </Typography>
              <Stack spacing={3}>
                {data.development_roadmap.priority_skills.map((skill, index) => (
                  <SkillGapCard key={index}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-2">
                      <Typography variant="h6" className="font-semibold">
                        {skill.skill}
                      </Typography>
                      <PriorityChip label={skill.priority} priority={skill.priority} size="small" />
                    </Stack>
                    <Typography variant="body2" className="text-text-secondary">
                      {skill.reason}
                    </Typography>
                  </SkillGapCard>
                ))}
              </Stack>
            </Box>

            {/* Learning Timeline */}
            <Box className="mb-6">
              <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                Learning Timeline
              </Typography>
              <Timeline>
                {data.development_roadmap.learning_pathway.map((stage, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < data.development_roadmap.learning_pathway.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6" className="font-semibold">
                        {stage.stage}
                      </Typography>
                      <Typography variant="body2" className="text-text-secondary mb-1">
                        Duration: {stage.duration}
                      </Typography>
                      <Typography variant="body2" className="text-text-secondary">
                        Focus: {stage.focus}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>

            {/* Resource Recommendations */}
            <Box className="mb-6">
              <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                Learning Resources
              </Typography>
              <Stack spacing={3}>
                {Object.entries(data.development_roadmap.resource_recommendations).map(([category, resources]) => (
                  <SkillGapCard key={category}>
                    <Typography variant="h6" className="font-semibold mb-2">
                      {category}
                    </Typography>
                    <Stack spacing={1}>
                      {resources.map((resource, index) => (
                        <Typography key={index} variant="body2" className="text-text-secondary">
                          • {resource}
                        </Typography>
                      ))}
                    </Stack>
                  </SkillGapCard>
                ))}
              </Stack>
            </Box>
          </Box>

          <Divider />

          {/* Portfolio Projects */}
          <Box>
            <SectionHeader>
              <EmojiObjectsOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Recommended Portfolio Projects
              </Typography>
            </SectionHeader>
            
            <Stack spacing={3}>
              {data.portfolio_projects.map((project, index) => (
                <ProjectCard key={index}>
                  <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                    {project.project}
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary mb-3">
                    {project.description}
                  </Typography>
                  <Box>
                    <Typography variant="body2" className="font-medium text-text-primary mb-2">
                      Technologies:
                    </Typography>
                    <Box className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <TechChip key={techIndex} label={tech} size="small" />
                      ))}
                    </Box>
                  </Box>
                </ProjectCard>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Certification Recommendations */}
          <Box>
            <SectionHeader>
              <VerifiedOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Certification Recommendations
              </Typography>
            </SectionHeader>
            
            <Stack spacing={3}>
              {data.certification_recommendations.map((cert, index) => (
                <SkillGapCard key={index}>
                  <Typography variant="h6" className="font-semibold text-text-primary mb-1">
                    {cert.certification}
                  </Typography>
                  <Typography variant="body2" className="text-primary-main font-medium mb-2">
                    Provider: {cert.provider}
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary">
                    {cert.reason}
                  </Typography>
                </SkillGapCard>
              ))}
            </Stack>
          </Box>

          {/* Immediate Actions */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Immediate Actions
            </Typography>
            <Stack spacing={2}>
              {data.immediate_actions.map((action, index) => (
                <Box key={index} className="flex items-start space-x-3">
                  <Box className="w-6 h-6 bg-primary-main text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </Box>
                  <Typography variant="body1" className="text-text-secondary flex-1">
                    {action}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Long-term Strategy */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Long-term Strategy
            </Typography>
            <Stack spacing={2}>
              {data.long_term_strategy.map((strategy, index) => (
                <Box key={index} className="flex items-start space-x-3">
                  <Box className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </Box>
                  <Typography variant="body1" className="text-text-secondary flex-1">
                    {strategy}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default SkillDevelopmentSection;