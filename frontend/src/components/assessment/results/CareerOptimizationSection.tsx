import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { CareerOptimizationData } from '../../../types/assessmentResultsTypes';
import ConfidenceIndicator from '../../shared/ConfidenceIndicator';
import ExpandableSection from '../../shared/ExpandableSection';
import PriorityBadge from '../../shared/PriorityBadge';

const CareerCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const GoalCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: 12,
  backgroundColor: theme.palette.primary.light + '10',
  marginBottom: theme.spacing(2)
}));

const StrategyBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: 8,
  marginBottom: theme.spacing(2)
}));

interface CareerOptimizationSectionProps {
  data: CareerOptimizationData;
  confidence: number;
}

const CareerOptimizationSection: React.FC<CareerOptimizationSectionProps> = ({
  data,
  confidence
}) => {
  const { career_goals, career_strategy, networking_plan, job_search_strategy, personal_branding } = data;

  return (
    <Stack spacing={3}>
      {/* Header Card */}
      <CareerCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <LocationSearchingOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Career Optimization Plan
              </Typography>
            </Box>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Strategic career planning with actionable goals, networking strategies, and implementation timeline
          </Typography>
        </CardContent>
      </CareerCard>

      {/* Career Goals */}
      <ExpandableSection
        title="Career Goals"
        subtitle={`${career_goals.length} strategic goals defined`}
        icon={<LocationSearchingOutlinedIcon sx={{ color: 'primary.main' }} />}
        defaultExpanded={true}
      >
        <Stack spacing={2}>
          {career_goals.map((goal, index) => (
            <GoalCard key={index}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {goal.goal_title}
                </Typography>
                <PriorityBadge priority={goal.priority} />
              </Stack>
              
              <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                {goal.description}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Timeline: {goal.timeline}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={25} // Mock progress
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Success Metrics:
                </Typography>
                <List dense>
                  {goal.success_metrics.map((metric, metricIndex) => (
                    <ListItem key={metricIndex} sx={{ py: 0, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <ChecklistOutlinedIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={metric}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {goal.dependencies.length > 0 && (
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    Dependencies:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {goal.dependencies.map((dependency, depIndex) => (
                      <Chip 
                        key={depIndex} 
                        label={dependency} 
                        size="small" 
                        variant="outlined"
                        color="warning"
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </GoalCard>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Career Strategy */}
      <ExpandableSection
        title="Career Strategy"
        subtitle="Short-term and long-term strategic approach"
        icon={<ChecklistOutlinedIcon sx={{ color: 'secondary.main' }} />}
      >
        <Stack spacing={3}>
          <StrategyBox>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
              Short-term Strategy
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {career_strategy.short_term_strategy}
            </Typography>
          </StrategyBox>

          <StrategyBox>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Long-term Vision
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {career_strategy.long_term_vision}
            </Typography>
          </StrategyBox>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
              Key Differentiators
            </Typography>
            <List>
              {career_strategy.key_differentiators.map((differentiator, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <ChecklistOutlinedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={differentiator} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'warning.main' }}>
              Risk Mitigation
            </Typography>
            <List>
              {career_strategy.risk_mitigation.map((risk, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <ChecklistOutlinedIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={risk} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </ExpandableSection>

      {/* Networking Plan */}
      <ExpandableSection
        title="Networking Strategy"
        subtitle="Build meaningful professional connections"
        icon={<HandshakeOutlinedIcon sx={{ color: 'info.main' }} />}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'info.main' }}>
              Target Connections
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {networking_plan.target_connections.map((connection, index) => (
                <Chip 
                  key={index} 
                  label={connection} 
                  color="info" 
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Networking Channels
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {networking_plan.networking_channels.map((channel, index) => (
                <Chip 
                  key={index} 
                  label={channel} 
                  color="primary" 
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
              Networking Goals
            </Typography>
            <List>
              {networking_plan.networking_goals.map((goal, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <HandshakeOutlinedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={goal} />
                </ListItem>
              ))}
            </List>
          </Box>

          <StrategyBox>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Follow-up Strategy
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {networking_plan.follow_up_strategy}
            </Typography>
          </StrategyBox>
        </Stack>
      </ExpandableSection>

      {/* Job Search Strategy */}
      <ExpandableSection
        title="Job Search Strategy"
        subtitle="Systematic approach to finding opportunities"
        icon={<ChecklistOutlinedIcon sx={{ color: 'warning.main' }} />}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'warning.main' }}>
              Target Companies
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {job_search_strategy.target_companies.map((company, index) => (
                <Chip 
                  key={index} 
                  label={company} 
                  color="warning" 
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          <StrategyBox>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Application Timeline
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {job_search_strategy.application_timeline}
            </Typography>
          </StrategyBox>

          <StrategyBox>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Application Strategy
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {job_search_strategy.application_strategy}
            </Typography>
          </StrategyBox>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Interview Preparation
            </Typography>
            <List>
              {job_search_strategy.interview_preparation.map((prep, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <ChecklistOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={prep} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </ExpandableSection>

      {/* Personal Branding */}
      <ExpandableSection
        title="Personal Branding"
        subtitle="Build your professional identity"
        icon={<HandshakeOutlinedIcon sx={{ color: 'secondary.main' }} />}
      >
        <Stack spacing={3}>
          <StrategyBox>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
              Brand Positioning
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {personal_branding.brand_positioning}
            </Typography>
          </StrategyBox>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Content Strategy
            </Typography>
            <List>
              {personal_branding.content_strategy.map((strategy, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <ChecklistOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={strategy} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'info.main' }}>
              Platform Optimization
            </Typography>
            <Stack spacing={2}>
              {Object.entries(personal_branding.platform_optimization).map(([platform, strategy], index) => (
                <Box key={index} sx={{ p: 2, backgroundColor: 'info.light', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'info.dark', mb: 1 }}>
                    {platform}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {strategy}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
              Thought Leadership Areas
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {personal_branding.thought_leadership_areas.map((area, index) => (
                <Chip 
                  key={index} 
                  label={area} 
                  color="success" 
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </ExpandableSection>

      {/* Monthly Action Plan */}
      <ExpandableSection
        title="Monthly Action Plan"
        subtitle="Step-by-step implementation guide"
        icon={<ChecklistOutlinedIcon sx={{ color: 'primary.main' }} />}
      >
        <Stack spacing={2}>
          {Object.entries(data.monthly_action_plan).map(([month, actions], index) => (
            <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                {month}
              </Typography>
              <List dense>
                {actions.map((action, actionIndex) => (
                  <ListItem key={actionIndex} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon>
                      <ChecklistOutlinedIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={action}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>
    </Stack>
  );
};

export default CareerOptimizationSection;