import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, Divider, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { OpportunityMatcherOutput } from '../../types/assessmentTypes';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
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

const OpportunityCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '16px',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease'
}));

const SuccessBadge = styled(Box)<{ probability: string }>(({ theme, probability }) => {
  const getColorByProbability = (prob: string) => {
    const numProb = parseInt(prob.replace('%', ''));
    if (numProb >= 80) return { bg: '#E8F5E8', color: '#1B5E20', border: '#4CAF50' };
    if (numProb >= 60) return { bg: '#E3F2FD', color: '#0D47A1', border: '#2196F3' };
    if (numProb >= 40) return { bg: '#FFF3E0', color: '#E65100', border: '#FF9800' };
    return { bg: '#FFEBEE', color: '#C62828', border: '#F44336' };
  };

  const colors = getColorByProbability(probability);
  return {
    position: 'absolute',
    top: '-8px',
    right: '16px',
    backgroundColor: colors.bg,
    color: colors.color,
    border: `2px solid ${colors.border}`,
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    zIndex: 1
  };
});

const TypeChip = styled(Chip)<{ type: string }>(({ theme, type }) => {
  const getColorByType = (type: string) => {
    if (type.toLowerCase().includes('full-time')) return { bg: '#E8F5E8', color: '#1B5E20' };
    if (type.toLowerCase().includes('internship')) return { bg: '#E3F2FD', color: '#0D47A1' };
    if (type.toLowerCase().includes('freelance')) return { bg: '#FFF3E0', color: '#E65100' };
    return { bg: '#F3E5F5', color: '#4A148C' };
  };

  const colors = getColorByType(type);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px'
  };
});

const StrategyCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.grey[50],
  border: '1px solid rgba(0, 0, 0, 0.05)',
  marginBottom: '12px'
}));

interface OpportunityMatcherSectionProps {
  opportunityMatcher: OpportunityMatcherOutput;
}

const OpportunityMatcherSection: React.FC<OpportunityMatcherSectionProps> = ({ opportunityMatcher }) => {
  const { data } = opportunityMatcher;

  return (
    <StyledCard>
      <CardContent className="p-8">
        <SectionHeader>
          <FindInPageOutlinedIcon />
          <Typography variant="h4" className="font-bold text-text-primary">
            Matched Opportunities
          </Typography>
        </SectionHeader>

        <Stack spacing={6}>
          {/* Matched Opportunities */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Top Opportunities for You
            </Typography>
            <Stack spacing={3}>
              {data.matched_opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.opportunity_id}>
                  <SuccessBadge probability={data.success_probability[`opportunity_id_${opportunity.opportunity_id}`] || '0%'}>
                    {data.success_probability[`opportunity_id_${opportunity.opportunity_id}`] || '0%'} Match
                  </SuccessBadge>
                  
                  <CardContent className="p-6 pt-8">
                    <Stack spacing={3}>
                      {/* Header */}
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={2} className="mb-2">
                          <BusinessOutlinedIcon className="text-primary-main" />
                          <Typography variant="h6" className="font-bold text-text-primary">
                            {opportunity.title}
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" alignItems="center" spacing={3} className="mb-3">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <WorkOutlineOutlinedIcon className="text-text-secondary text-sm" />
                            <Typography variant="body2" className="text-text-secondary font-medium">
                              {opportunity.company}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <LocationOnOutlinedIcon className="text-text-secondary text-sm" />
                            <Typography variant="body2" className="text-text-secondary">
                              {opportunity.location}
                            </Typography>
                          </Stack>
                          
                          <TypeChip 
                            label={opportunity.type} 
                            type={opportunity.type}
                            size="small"
                          />
                        </Stack>
                        
                        <Typography variant="body2" className="text-text-secondary">
                          {opportunity.description}
                        </Typography>
                      </Box>

                      {/* Compatibility Analysis */}
                      <Box>
                        <Typography variant="body2" className="font-medium text-text-primary mb-2">
                          Compatibility Analysis:
                        </Typography>
                        <Typography variant="body2" className="text-text-secondary">
                          {data.compatibility_analysis[`opportunity_id_${opportunity.opportunity_id}`]}
                        </Typography>
                      </Box>

                      {/* Application Strategy */}
                      <Box>
                        <Typography variant="body2" className="font-medium text-text-primary mb-2">
                          Application Strategy:
                        </Typography>
                        <Typography variant="body2" className="text-text-secondary">
                          {data.application_strategy[`opportunity_id_${opportunity.opportunity_id}`]}
                        </Typography>
                      </Box>

                      {/* Preparation Requirements */}
                      <Box>
                        <Typography variant="body2" className="font-medium text-text-primary mb-2">
                          Preparation Requirements:
                        </Typography>
                        <Typography variant="body2" className="text-text-secondary">
                          {data.preparation_requirements[`opportunity_id_${opportunity.opportunity_id}`]}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </OpportunityCard>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Implementation Guidance */}
          <Box>
            <SectionHeader>
              <TrendingUpOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Implementation Guidance
              </Typography>
            </SectionHeader>
            
            <Stack spacing={4}>
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Immediate Actions
                </Typography>
                <Stack spacing={1}>
                  {data.implementation_guidance.immediate_actions.map((action, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {action}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Weekly Tasks
                </Typography>
                <Stack spacing={1}>
                  {data.implementation_guidance.weekly_tasks.map((task, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {task}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Monthly Goals
                </Typography>
                <Stack spacing={1}>
                  {data.implementation_guidance.monthly_goals.map((goal, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {goal}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
            </Stack>
          </Box>

          <Divider />

          {/* Alternative Pathways */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Alternative Pathways
            </Typography>
            <StrategyCard>
              <Typography variant="body2" className="text-text-secondary">
                {data.alternative_pathways.description}
              </Typography>
            </StrategyCard>
          </Box>

          {/* Networking Strategy */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Networking Strategy
            </Typography>
            <StrategyCard>
              <Typography variant="body2" className="text-text-secondary">
                {data.networking_strategy.description}
              </Typography>
            </StrategyCard>
          </Box>

          {/* Success Factors */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Key Success Factors
            </Typography>
            <Stack spacing={2}>
              {data.matching_metadata.success_factors.map((factor, index) => (
                <Box key={index} className="flex items-start space-x-3">
                  <Box className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </Box>
                  <Typography variant="body1" className="text-text-secondary flex-1">
                    {factor}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Matching Criteria */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Matching Criteria Used
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {data.matching_metadata.matching_criteria.map((criteria, index) => (
                <Chip 
                  key={index}
                  label={criteria}
                  variant="outlined"
                  size="small"
                  className="m-1"
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default OpportunityMatcherSection;