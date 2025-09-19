import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, Divider, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CareerOptimizationOutput } from '../../types/assessmentTypes';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

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

const GoalCard = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '16px'
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

const StrategyCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.grey[50],
  border: '1px solid rgba(0, 0, 0, 0.05)',
  marginBottom: '12px'
}));

interface CareerOptimizationSectionProps {
  careerOptimization: CareerOptimizationOutput;
}

const CareerOptimizationSection: React.FC<CareerOptimizationSectionProps> = ({ careerOptimization }) => {
  const { data } = careerOptimization;

  return (
    <StyledCard>
      <CardContent className="p-8">
        <SectionHeader>
          <RocketLaunchOutlinedIcon />
          <Typography variant="h4" className="font-bold text-text-primary">
            Career Optimization Plan
          </Typography>
        </SectionHeader>

        <Stack spacing={6}>
          {/* Career Goals */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Career Goals
            </Typography>
            <Stack spacing={3}>
              {data.career_goals.map((goal, index) => (
                <GoalCard key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-3">
                    <Typography variant="h6" className="font-semibold text-text-primary">
                      {goal.goal_title}
                    </Typography>
                    <PriorityChip label={goal.priority} priority={goal.priority} size="small" />
                  </Stack>
                  
                  <Typography variant="body2" className="text-text-secondary mb-3">
                    {goal.description}
                  </Typography>
                  
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="mb-3">
                    <Box className="flex-1">
                      <Typography variant="body2" className="font-medium text-text-primary">
                        Timeline: {goal.timeline}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Box className="mb-3">
                    <Typography variant="body2" className="font-medium text-text-primary mb-2">
                      Success Metrics:
                    </Typography>
                    <Stack spacing={1}>
                      {goal.success_metrics.map((metric, metricIndex) => (
                        <Typography key={metricIndex} variant="body2" className="text-text-secondary">
                          • {metric}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                  
                  {goal.dependencies.length > 0 && (
                    <Box>
                      <Typography variant="body2" className="font-medium text-text-primary mb-2">
                        Dependencies:
                      </Typography>
                      <Stack spacing={1}>
                        {goal.dependencies.map((dependency, depIndex) => (
                          <Typography key={depIndex} variant="body2" className="text-text-secondary">
                            • {dependency}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </GoalCard>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Career Strategy */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Career Strategy
            </Typography>
            
            <Stack spacing={4}>
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                  Short-term Strategy
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {data.career_strategy.short_term_strategy}
                </Typography>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                  Long-term Vision
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {data.career_strategy.long_term_vision}
                </Typography>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Key Differentiators
                </Typography>
                <Stack spacing={1}>
                  {data.career_strategy.key_differentiators.map((differentiator, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {differentiator}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
            </Stack>
          </Box>

          <Divider />

          {/* Networking Plan */}
          <Box>
            <SectionHeader>
              <NetworkCheckOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Networking Strategy
              </Typography>
            </SectionHeader>
            
            <Stack spacing={4}>
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Target Connections
                </Typography>
                <Stack spacing={1}>
                  {data.networking_plan.target_connections.map((connection, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {connection}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Networking Channels
                </Typography>
                <Stack spacing={1}>
                  {data.networking_plan.networking_channels.map((channel, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {channel}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Networking Goals
                </Typography>
                <Stack spacing={1}>
                  {data.networking_plan.networking_goals.map((goal, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {goal}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
            </Stack>
          </Box>

          <Divider />

          {/* Job Search Strategy */}
          <Box>
            <SectionHeader>
              <WorkOutlineOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Job Search Strategy
              </Typography>
            </SectionHeader>
            
            <Stack spacing={4}>
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Target Companies
                </Typography>
                <Stack spacing={1}>
                  {data.job_search_strategy.target_companies.map((company, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {company}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                  Application Timeline
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {data.job_search_strategy.application_timeline}
                </Typography>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Interview Preparation
                </Typography>
                <Stack spacing={1}>
                  {data.job_search_strategy.interview_preparation.map((prep, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {prep}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
            </Stack>
          </Box>

          <Divider />

          {/* Personal Branding */}
          <Box>
            <SectionHeader>
              <PersonOutlineOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Personal Branding
              </Typography>
            </SectionHeader>
            
            <Stack spacing={4}>
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                  Brand Positioning
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {data.personal_branding.brand_positioning}
                </Typography>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Content Strategy
                </Typography>
                <Stack spacing={1}>
                  {data.personal_branding.content_strategy.map((strategy, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {strategy}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
              
              <StrategyCard>
                <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                  Thought Leadership Areas
                </Typography>
                <Stack spacing={1}>
                  {data.personal_branding.thought_leadership_areas.map((area, index) => (
                    <Typography key={index} variant="body2" className="text-text-secondary">
                      • {area}
                    </Typography>
                  ))}
                </Stack>
              </StrategyCard>
            </Stack>
          </Box>

          <Divider />

          {/* Monthly Action Plan */}
          <Box>
            <SectionHeader>
              <CalendarTodayOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Monthly Action Plan
              </Typography>
            </SectionHeader>
            
            <Stack spacing={3}>
              {Object.entries(data.monthly_action_plan).map(([month, actions]) => (
                <StrategyCard key={month}>
                  <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                    {month}
                  </Typography>
                  <Stack spacing={1}>
                    {actions.map((action, index) => (
                      <Typography key={index} variant="body2" className="text-text-secondary">
                        • {action}
                      </Typography>
                    ))}
                  </Stack>
                </StrategyCard>
              ))}
            </Stack>
          </Box>

          {/* Success Tracking */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Success Tracking Metrics
            </Typography>
            <Stack spacing={2}>
              {Object.entries(data.success_tracking).map(([metric, description]) => (
                <StrategyCard key={metric}>
                  <Typography variant="h6" className="font-semibold text-text-primary">
                    {metric}
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary">
                    {description}
                  </Typography>
                </StrategyCard>
              ))}
            </Stack>
          </Box>

          {/* Implementation Timeline */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Implementation Timeline
            </Typography>
            <Timeline>
              {Object.entries(data.implementation_timeline).map(([phase, tasks], index) => (
                <TimelineItem key={phase}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index < Object.entries(data.implementation_timeline).length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" className="font-semibold">
                      {phase}
                    </Typography>
                    <Stack spacing={1} className="mt-2">
                      {tasks.map((task, taskIndex) => (
                        <Typography key={taskIndex} variant="body2" className="text-text-secondary">
                          • {task}
                        </Typography>
                      ))}
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default CareerOptimizationSection;