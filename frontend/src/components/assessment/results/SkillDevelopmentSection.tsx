import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import JoinFullOutlinedIcon from '@mui/icons-material/JoinFullOutlined';
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { SkillDevelopmentData } from '../../../types/assessmentResultsTypes';
import { formatDate } from '../../../utils/assessmentFormatters';
import ConfidenceIndicator from '../../shared/ConfidenceIndicator';
import ExpandableSection from '../../shared/ExpandableSection';
import PriorityBadge from '../../shared/PriorityBadge';

const SkillCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const SkillComparisonContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: 12,
  marginBottom: theme.spacing(2)
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  '& .MuiStepConnector-root': {
    marginLeft: theme.spacing(2)
  },
  '& .MuiStepLabel-root': {
    paddingLeft: 0
  }
}));

interface SkillDevelopmentSectionProps {
  data: SkillDevelopmentData;
  confidence: number;
}

const SkillDevelopmentSection: React.FC<SkillDevelopmentSectionProps> = ({
  data,
  confidence
}) => {
  const { skill_gap_analysis, development_roadmap } = data;

  const getSkillLevel = (level: string) => {
    switch (level) {
      case 'Advanced': return 4;
      case 'Intermediate': return 3;
      case 'Beginner': return 2;
      default: return 1;
    }
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'success';
      case 'Intermediate': return 'primary';
      case 'Beginner': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Stack spacing={3}>
      {/* Header Card */}
      <SkillCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <JoinFullOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Skill Development Strategy
              </Typography>
            </Box>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Comprehensive analysis of your current skills vs market requirements with a personalized learning roadmap
          </Typography>

          {/* Gap Severity Indicator */}
          <Box sx={{ p: 2, backgroundColor: 'warning.light', borderRadius: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.dark' }}>
              Gap Severity: {skill_gap_analysis.gap_severity}
            </Typography>
          </Box>
        </CardContent>
      </SkillCard>

      {/* Current Skills vs Required Skills */}
      <ExpandableSection
        title="Skill Gap Analysis"
        subtitle="Current skills compared to market requirements"
        icon={<JoinFullOutlinedIcon sx={{ color: 'primary.main' }} />}
        defaultExpanded={true}
      >
        <Stack spacing={3}>
          {/* Current Skills */}
          <SkillComparisonContainer>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Current Skills
            </Typography>
            <Stack spacing={2}>
              {Object.entries(skill_gap_analysis.current_skills).map(([skill, level], index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {skill}
                    </Typography>
                    <Chip 
                      label={level} 
                      color={getSkillColor(level)}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(getSkillLevel(level) / 4) * 100}
                    // color={getSkillColor(level)}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </Stack>
          </SkillComparisonContainer>

          {/* Skill Gaps */}
          <SkillComparisonContainer>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'error.main' }}>
              Identified Skill Gaps
            </Typography>
            <Stack spacing={2}>
              {Object.entries(skill_gap_analysis.skill_gaps).map(([skill, priority], index) => (
                <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {skill}
                  </Typography>
                  <PriorityBadge priority={priority as any} />
                </Stack>
              ))}
            </Stack>
          </SkillComparisonContainer>

          {/* Skill Overlap */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
              Skills Already Aligned with Market
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {skill_gap_analysis.skill_overlap.map((skill, index) => (
                <Chip 
                  key={index} 
                  label={skill} 
                  color="success" 
                  variant="outlined"
                  icon={<CheckCircleOutlinedIcon />}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </ExpandableSection>

      {/* Priority Skills */}
      <ExpandableSection
        title="Priority Skills"
        subtitle={`${development_roadmap.priority_skills.length} high-impact skills identified`}
        icon={<LinearScaleOutlinedIcon sx={{ color: 'secondary.main' }} />}
        defaultExpanded={true}
      >
        <Stack spacing={2}>
          {development_roadmap.priority_skills.map((skill, index) => (
            <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {skill.skill}
                </Typography>
                <PriorityBadge priority={skill.priority} />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {skill.reason}
              </Typography>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Learning Pathway */}
      <SkillCard>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Learning Pathway Timeline
          </Typography>
          
          <TimelineContainer>
            <Stepper orientation="vertical">
              {development_roadmap.learning_pathway.map((stage, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {stage.stage}
                    </Typography>
                    <Chip 
                      label={stage.duration} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {stage.focus}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </TimelineContainer>
        </CardContent>
      </SkillCard>

      {/* Milestone Timeline */}
      <ExpandableSection
        title="Milestone Timeline"
        subtitle="Key milestones and target dates"
        icon={<LinearScaleOutlinedIcon sx={{ color: 'info.main' }} />}
      >
        <Stack spacing={2}>
          {Object.entries(development_roadmap.milestone_timeline).map(([milestone, date], index) => (
            <Box key={index} sx={{ p: 2, backgroundColor: 'info.light', borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {milestone}
                </Typography>
                <Chip 
                  label={formatDate(date)} 
                  color="info" 
                  variant="outlined"
                />
              </Stack>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Resource Recommendations */}
      <ExpandableSection
        title="Learning Resources"
        subtitle="Recommended courses and materials"
        icon={<CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />}
      >
        <Stack spacing={3}>
          {Object.entries(development_roadmap.resource_recommendations).map(([category, resources], index) => (
            <Box key={index}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                {category}
              </Typography>
              <List>
                {resources.map((resource, resourceIndex) => (
                  <ListItem key={resourceIndex} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleOutlinedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={resource} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Portfolio Projects */}
      <ExpandableSection
        title="Recommended Portfolio Projects"
        subtitle={`${data.portfolio_projects.length} projects to showcase your skills`}
        icon={<CheckCircleOutlinedIcon sx={{ color: 'warning.main' }} />}
      >
        <Stack spacing={2}>
          {data.portfolio_projects.map((project, index) => (
            <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {project.project}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {project.description}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {project.technologies.map((tech, techIndex) => (
                  <Chip 
                    key={techIndex} 
                    label={tech} 
                    size="small" 
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Certification Recommendations */}
      <ExpandableSection
        title="Certification Recommendations"
        subtitle={`${data.certification_recommendations.length} valuable certifications`}
        icon={<CheckCircleOutlinedIcon sx={{ color: 'secondary.main' }} />}
      >
        <Stack spacing={2}>
          {data.certification_recommendations.map((cert, index) => (
            <Box key={index} sx={{ p: 2, backgroundColor: 'secondary.light', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
                {cert.certification}
              </Typography>
              <Typography variant="body2" sx={{ color: 'secondary.dark', mb: 1 }}>
                Provider: {cert.provider}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cert.reason}
              </Typography>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>
    </Stack>
  );
};

export default SkillDevelopmentSection;