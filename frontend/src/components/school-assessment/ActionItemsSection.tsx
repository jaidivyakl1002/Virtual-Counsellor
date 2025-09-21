import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  LinearProgress,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ConfidenceIndicator from '../shared/ConfidenceIndicator';
import { FleetSummary } from '../../types/schoolAssessmentTypes';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}));

const ActionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
  }
}));

const ImplementButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(20, 108, 148, 0.3)'
  }
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
  border: `2px solid ${theme.palette.primary.light}`,
  marginBottom: theme.spacing(3)
}));

interface ActionItemsSectionProps {
  fleetSummary: FleetSummary;
  onActionItemClick?: (actionId: string, actionText: string) => void;
  onStartImplementation?: () => void;
}

const ActionItemsSection: React.FC<ActionItemsSectionProps> = ({
  fleetSummary,
  onActionItemClick,
  onStartImplementation
}) => {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const handleActionToggle = (actionText: string) => {
    const actionId = actionText.replace(/\s+/g, '-').toLowerCase();
    const newCompleted = new Set(completedActions);
    
    if (completedActions.has(actionId)) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
    }
    
    setCompletedActions(newCompleted);
    onActionItemClick?.(actionId, actionText);
  };

  const totalActions = fleetSummary.recommendations.length + fleetSummary.next_actions.length;
  const completedCount = completedActions.size;
  const progressPercentage = totalActions > 0 ? (completedCount / totalActions) * 100 : 0;

  return (
    <SectionContainer>
      <HeaderCard>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <ChecklistOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Action Items
            </Typography>
            <ConfidenceIndicator confidence={fleetSummary.confidence} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Your personalized action plan based on the assessment results. Track your progress and implement these recommendations step by step.
          </Typography>
        </CardContent>
      </HeaderCard>

      <Stack spacing={4}>
        {/* Progress Overview */}
        <ProgressCard>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Implementation Progress
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  {completedCount} of {totalActions} completed
                </Typography>
                <ImplementButton
                  variant="contained"
                  onClick={onStartImplementation}
                  startIcon={<PlayArrowIcon />}
                  size="small"
                >
                  Start Implementation
                </ImplementButton>
              </Stack>
            </Stack>
            
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ 
                height: 12, 
                borderRadius: 6,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)'
                }
              }} 
            />
            
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Typography variant="caption" color="text.secondary">
                {progressPercentage.toFixed(0)}% Complete
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {totalActions - completedCount} remaining
              </Typography>
            </Stack>
          </CardContent>
        </ProgressCard>

        {/* Key Recommendations */}
        <ActionCard>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <TrendingUpIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Key Recommendations
              </Typography>
              <Chip 
                label={`${fleetSummary.recommendations.length} items`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Stack>
            
            <List>
              {fleetSummary.recommendations.map((recommendation, index) => {
                const actionId = recommendation.replace(/\s+/g, '-').toLowerCase();
                const isCompleted = completedActions.has(actionId);
                
                return (
                  <ListItem 
                    key={index}
                    sx={{ 
                      py: 1,
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor: isCompleted ? 'success.light' + '20' : 'transparent',
                      '&:hover': {
                        backgroundColor: isCompleted ? 'success.light' + '30' : 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        checked={isCompleted}
                        onChange={() => handleActionToggle(recommendation)}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={recommendation}
                      primaryTypographyProps={{ 
                        variant: 'body1',
                        sx: { 
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          color: isCompleted ? 'text.secondary' : 'text.primary'
                        }
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </ActionCard>

        {/* Next Actions */}
        <ActionCard>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <PlayArrowIcon sx={{ color: 'secondary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Next Actions
              </Typography>
              <Chip 
                label={`${fleetSummary.next_actions.length} items`}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Stack>
            
            <List>
              {fleetSummary.next_actions.map((action, index) => {
                const actionId = action.replace(/\s+/g, '-').toLowerCase();
                const isCompleted = completedActions.has(actionId);
                
                return (
                  <ListItem 
                    key={index}
                    sx={{ 
                      py: 1,
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor: isCompleted ? 'success.light' + '20' : 'transparent',
                      '&:hover': {
                        backgroundColor: isCompleted ? 'success.light' + '30' : 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        checked={isCompleted}
                        onChange={() => handleActionToggle(action)}
                        color="secondary"
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={action}
                      primaryTypographyProps={{ 
                        variant: 'body1',
                        sx: { 
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          color: isCompleted ? 'text.secondary' : 'text.primary'
                        }
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </ActionCard>

        {/* Summary Card */}
        <Card sx={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Assessment Summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Overall Confidence:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {Math.round(fleetSummary.confidence * 100)}%
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Processing Time:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {Math.round(fleetSummary.processing_time)}s
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Status:
                </Typography>
                <Chip 
                  label={fleetSummary.status}
                  size="small"
                  color="success"
                  variant="filled"
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </SectionContainer>
  );
};

export default ActionItemsSection;