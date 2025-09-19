import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { ProfileAnalysisData } from '../../../types/assessmentResultsTypes';
import { formatPercentage } from '../../../utils/assessmentFormatters';
import ConfidenceIndicator from '../../shared/ConfidenceIndicator';
import ExpandableSection from '../../shared/ExpandableSection';

const ProfileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const ScoreContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: 12,
  textAlign: 'center'
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

interface ProfileAnalysisSectionProps {
  data: ProfileAnalysisData;
  confidence: number;
}

const ProfileAnalysisSection: React.FC<ProfileAnalysisSectionProps> = ({
  data,
  confidence
}) => {
  const { comprehensive_analysis, individual_analyses } = data;

  return (
    <Stack spacing={3}>
      {/* Header Card */}
      <ProfileCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <PersonOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Profile Analysis
              </Typography>
            </Box>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>

          {/* Overall Scores */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
            <ScoreContainer sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {formatPercentage(comprehensive_analysis.overall_profile_strength)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Profile Strength
              </Typography>
            </ScoreContainer>

            <ScoreContainer sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                {formatPercentage(comprehensive_analysis.career_readiness_score)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Career Readiness Score
              </Typography>
            </ScoreContainer>

            <ScoreContainer sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {formatPercentage(comprehensive_analysis.estimated_job_match_rate)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Job Match Rate
              </Typography>
            </ScoreContainer>
          </Stack>

          {/* Profile Summary */}
          <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {comprehensive_analysis.profile_summary}
            </Typography>
          </Box>
        </CardContent>
      </ProfileCard>

      {/* Key Strengths */}
      <ExpandableSection
        title="Key Strengths"
        subtitle={`${comprehensive_analysis.key_strengths.length} strengths identified`}
        icon={<CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />}
        defaultExpanded={true}
      >
        <List>
          {comprehensive_analysis.key_strengths.map((strength, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemIcon>
                <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText primary={strength} />
            </ListItem>
          ))}
        </List>
      </ExpandableSection>

      {/* Improvement Priorities */}
      <ExpandableSection
        title="Improvement Priorities"
        subtitle={`${comprehensive_analysis.improvement_priorities.length} areas for improvement`}
        icon={<TrendingUpOutlinedIcon sx={{ color: 'warning.main' }} />}
      >
        <List>
          {comprehensive_analysis.improvement_priorities.map((priority, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemIcon>
                <TrendingUpOutlinedIcon sx={{ color: 'warning.main' }} />
              </ListItemIcon>
              <ListItemText primary={priority} />
            </ListItem>
          ))}
        </List>
      </ExpandableSection>

      {/* Individual Analysis Cards */}
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Individual Analysis
        </Typography>

        {/* Resume Analysis */}
        <ProfileCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Resume Analysis
              </Typography>
              <Chip 
                label={formatPercentage(individual_analyses.resume.completeness_score)}
                color="primary"
                variant="outlined"
              />
            </Stack>
            
            <ProgressContainer>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Completeness Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={individual_analyses.resume.completeness_score * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </ProgressContainer>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {individual_analyses.resume.personal_summary}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {individual_analyses.resume.technical_skills.slice(0, 6).map((skill, index) => (
                <Chip key={index} label={skill} size="small" variant="outlined" />
              ))}
              {individual_analyses.resume.technical_skills.length > 6 && (
                <Chip 
                  label={`+${individual_analyses.resume.technical_skills.length - 6} more`} 
                  size="small" 
                  variant="outlined" 
                />
              )}
            </Stack>
          </CardContent>
        </ProfileCard>

        {/* LinkedIn Analysis */}
        <ProfileCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                LinkedIn Profile
              </Typography>
              <Chip 
                label={formatPercentage(individual_analyses.linkedin.professional_presence_score)}
                color="secondary"
                variant="outlined"
              />
            </Stack>
            
            <ProgressContainer>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Professional Presence Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={individual_analyses.linkedin.professional_presence_score * 100}
                color="secondary"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </ProgressContainer>

            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Network:</strong> {individual_analyses.linkedin.professional_network_strength}
              </Typography>
              <Typography variant="body2">
                <strong>Engagement:</strong> {individual_analyses.linkedin.content_engagement}
              </Typography>
            </Stack>
          </CardContent>
        </ProfileCard>

        {/* GitHub Analysis */}
        <ProfileCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                GitHub Portfolio
              </Typography>
              <Chip 
                label={formatPercentage(individual_analyses.github.technical_depth_score)}
                color="info"
                variant="outlined"
              />
            </Stack>
            
            <ProgressContainer>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Technical Depth Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={individual_analyses.github.technical_depth_score * 100}
                color="info"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </ProgressContainer>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {individual_analyses.github.project_quality_assessment}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {Object.entries(individual_analyses.github.technical_proficiency).map(([skill, level], index) => (
                <Chip 
                  key={index} 
                  label={`${skill}: ${level}`} 
                  size="small" 
                  variant="outlined"
                  color={level === 'Advanced' ? 'success' : level === 'Intermediate' ? 'primary' : 'default'}
                />
              ))}
            </Stack>
          </CardContent>
        </ProfileCard>

        {/* Academic Analysis */}
        <ProfileCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Academic Performance
              </Typography>
              <Chip 
                label={formatPercentage(individual_analyses.academic.academic_strength_score)}
                color="success"
                variant="outlined"
              />
            </Stack>
            
            <ProgressContainer>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Academic Strength Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={individual_analyses.academic.academic_strength_score * 100}
                color="success"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </ProgressContainer>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {individual_analyses.academic.academic_performance}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {individual_analyses.academic.relevant_coursework.map((course, index) => (
                <Chip key={index} label={course} size="small" variant="outlined" />
              ))}
            </Stack>
          </CardContent>
        </ProfileCard>
      </Stack>

      {/* Risk Factors */}
      {comprehensive_analysis.risk_factors.length > 0 && (
        <ExpandableSection
          title="Risk Factors"
          subtitle={`${comprehensive_analysis.risk_factors.length} risks identified`}
          icon={<ErrorOutlineOutlinedIcon sx={{ color: 'error.main' }} />}
        >
          <List>
            {comprehensive_analysis.risk_factors.map((risk, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <ErrorOutlineOutlinedIcon sx={{ color: 'error.main' }} />
                </ListItemIcon>
                <ListItemText primary={risk} />
              </ListItem>
            ))}
          </List>
        </ExpandableSection>
      )}
    </Stack>
  );
};

export default ProfileAnalysisSection;