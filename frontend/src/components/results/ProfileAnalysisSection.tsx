import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, LinearProgress, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProfileAnalysisOutput } from '../../types/assessmentTypes';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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

const ScoreCard = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '16px',
  backgroundColor: theme.palette.grey[50],
  border: '1px solid rgba(0, 0, 0, 0.05)',
  textAlign: 'center'
}));

const StrengthChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#E8F5E8',
  color: '#2E7D32',
  fontWeight: 600,
  margin: '4px',
  '&:hover': {
    backgroundColor: '#C8E6C9'
  }
}));

const ImprovementChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#FFF3E0',
  color: '#EF6C00',
  fontWeight: 600,
  margin: '4px',
  '&:hover': {
    backgroundColor: '#FFE0B2'
  }
}));

const AnalysisCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '16px'
}));

interface ProfileAnalysisSectionProps {
  profileAnalysis: ProfileAnalysisOutput;
}

const ProfileAnalysisSection: React.FC<ProfileAnalysisSectionProps> = ({ profileAnalysis }) => {
  const { comprehensive_analysis, individual_analyses } = profileAnalysis.data;

  return (
    <StyledCard>
      <CardContent className="p-8">
        <SectionHeader>
          <PeopleOutlineOutlinedIcon />
          <Typography variant="h4" className="font-bold text-text-primary">
            Profile Analysis
          </Typography>
        </SectionHeader>

        <Stack spacing={6}>
          {/* Overall Scores */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <ScoreCard className="flex-1">
              <Typography variant="h3" className="font-bold text-primary-main mb-2">
                {Math.round(comprehensive_analysis.overall_profile_strength * 100)}%
              </Typography>
              <Typography variant="body2" className="text-text-secondary">
                Profile Strength
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={comprehensive_analysis.overall_profile_strength * 100} 
                className="mt-2 h-2 rounded-full"
                sx={{
                  backgroundColor: 'rgba(20, 108, 148, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#146C94',
                    borderRadius: '4px'
                  }
                }}
              />
            </ScoreCard>

            <ScoreCard className="flex-1">
              <Typography variant="h3" className="font-bold text-green-600 mb-2">
                {Math.round(comprehensive_analysis.career_readiness_score * 100)}%
              </Typography>
              <Typography variant="body2" className="text-text-secondary">
                Career Readiness
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={comprehensive_analysis.career_readiness_score * 100} 
                className="mt-2 h-2 rounded-full"
                sx={{
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#2E7D32',
                    borderRadius: '4px'
                  }
                }}
              />
            </ScoreCard>

            <ScoreCard className="flex-1">
              <Typography variant="h3" className="font-bold text-blue-600 mb-2">
                {Math.round(comprehensive_analysis.estimated_job_match_rate * 100)}%
              </Typography>
              <Typography variant="body2" className="text-text-secondary">
                Job Match Rate
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={comprehensive_analysis.estimated_job_match_rate * 100} 
                className="mt-2 h-2 rounded-full"
                sx={{
                  backgroundColor: 'rgba(21, 101, 192, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1565C0',
                    borderRadius: '4px'
                  }
                }}
              />
            </ScoreCard>
          </Stack>

          {/* Profile Summary */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-3">
              Profile Summary
            </Typography>
            <Typography variant="body1" className="text-text-secondary leading-relaxed">
              {comprehensive_analysis.profile_summary}
            </Typography>
          </Box>

          <Divider />

          {/* Key Strengths */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Key Strengths
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {comprehensive_analysis.key_strengths.map((strength, index) => (
                <StrengthChip key={index} label={strength} />
              ))}
            </Box>
          </Box>

          {/* Improvement Priorities */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Areas for Improvement
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {comprehensive_analysis.improvement_priorities.map((area, index) => (
                <ImprovementChip key={index} label={area} />
              ))}
            </Box>
          </Box>

          <Divider />

          {/* Individual Analysis Breakdown */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Detailed Analysis
            </Typography>
            
            <Stack spacing={3}>
              {/* Resume Analysis */}
              <AnalysisCard>
                <Stack direction="row" alignItems="center" spacing={2} className="mb-3">
                  <SchoolOutlinedIcon className="text-primary-main" />
                  <Typography variant="h6" className="font-semibold">
                    Resume Analysis
                  </Typography>
                  <Chip 
                    label={`${Math.round(individual_analyses.resume.completeness_score * 100)}% Complete`}
                    size="small"
                    color="primary"
                  />
                </Stack>
                <Typography variant="body2" className="text-text-secondary mb-3">
                  {individual_analyses.resume.personal_summary}
                </Typography>
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography variant="body2" className="font-medium text-text-primary">
                      Technical Skills: {individual_analyses.resume.technical_skills.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" className="font-medium text-text-primary">
                      Achievements: {individual_analyses.resume.achievements.length}
                    </Typography>
                  </Box>
                </Stack>
              </AnalysisCard>

              {/* LinkedIn Analysis */}
              <AnalysisCard>
                <Stack direction="row" alignItems="center" spacing={2} className="mb-3">
                  <LinkedInIcon className="text-primary-main" />
                  <Typography variant="h6" className="font-semibold">
                    LinkedIn Analysis
                  </Typography>
                  <Chip 
                    label={`${Math.round(individual_analyses.linkedin.professional_presence_score * 100)}% Professional Presence`}
                    size="small"
                    color="secondary"
                  />
                </Stack>
                <Typography variant="body2" className="text-text-secondary mb-2">
                  <strong>Network Strength:</strong> {individual_analyses.linkedin.professional_network_strength}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  <strong>Content Engagement:</strong> {individual_analyses.linkedin.content_engagement}
                </Typography>
              </AnalysisCard>

              {/* GitHub Analysis */}
              <AnalysisCard>
                <Stack direction="row" alignItems="center" spacing={2} className="mb-3">
                  <GitHubIcon className="text-primary-main" />
                  <Typography variant="h6" className="font-semibold">
                    GitHub Analysis
                  </Typography>
                  <Chip 
                    label={`${Math.round(individual_analyses.github.technical_depth_score * 100)}% Technical Depth`}
                    size="small"
                    color="info"
                  />
                </Stack>
                <Typography variant="body2" className="text-text-secondary mb-2">
                  <strong>Portfolio Strength:</strong> {individual_analyses.github.portfolio_strength}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  <strong>Contribution Consistency:</strong> {individual_analyses.github.contribution_consistency}
                </Typography>
              </AnalysisCard>

              {/* Academic Analysis */}
              <AnalysisCard>
                <Stack direction="row" alignItems="center" spacing={2} className="mb-3">
                  <SchoolOutlinedIcon className="text-primary-main" />
                  <Typography variant="h6" className="font-semibold">
                    Academic Analysis
                  </Typography>
                  <Chip 
                    label={`${Math.round(individual_analyses.academic.academic_strength_score * 100)}% Academic Strength`}
                    size="small"
                    color="success"
                  />
                </Stack>
                <Typography variant="body2" className="text-text-secondary mb-2">
                  {individual_analyses.academic.academic_performance}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  <strong>Specialization Alignment:</strong> {individual_analyses.academic.specialization_alignment}
                </Typography>
              </AnalysisCard>
            </Stack>
          </Box>

          {/* Recommended Next Steps */}
          <Box>
            <SectionHeader>
              <TrendingUpOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Recommended Next Steps
              </Typography>
            </SectionHeader>
            <Stack spacing={2}>
              {comprehensive_analysis.recommended_next_steps.map((step, index) => (
                <Box key={index} className="flex items-start space-x-3">
                  <Box className="w-6 h-6 bg-primary-main text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </Box>
                  <Typography variant="body1" className="text-text-secondary flex-1">
                    {step}
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

export default ProfileAnalysisSection;