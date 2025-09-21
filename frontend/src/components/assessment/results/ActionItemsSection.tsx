import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Divider,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { FleetSummary } from '../../../types/assessmentResultsTypes';
import ConfidenceIndicator from '../../shared/ConfidenceIndicator';
import PriorityBadge from '../../shared/PriorityBadge';
import { PriorityLevel } from '../../../types/assessmentResultsTypes';

const ActionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const ActionButton = styled(Button)(({  }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(20, 108, 148, 0.3)'
  },
  transition: 'all 0.3s ease'
}));

const CompletedActionItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.success.light + '20',
  borderRadius: 8,
  marginBottom: theme.spacing(1),
  '& .MuiListItemText-primary': {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary
  }
}));

const PendingActionItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
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

  const handleActionToggle = (actionId: string, actionText: string) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
      onActionItemClick?.(actionId, actionText);
    }
    setCompletedActions(newCompleted);
  };

  const getPriorityFromIndex = (index: number): PriorityLevel => {
    if (index < 3) return PriorityLevel.HIGH;
    if (index < 6) return PriorityLevel.MEDIUM;
    return PriorityLevel.LOW;
  };

  const completionPercentage = (completedActions.size / (fleetSummary.recommendations.length + fleetSummary.next_actions.length)) * 100;

  return (
    <Stack spacing={3}>
      {/* Header Card */}
      <ActionCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Action Items & Next Steps
              </Typography>
            </Box>
            <ConfidenceIndicator confidence={fleetSummary.confidence} />
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your personalized action plan with prioritized recommendations and immediate next steps
          </Typography>

          {/* Progress Overview */}
          <Box sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 2, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                Implementation Progress
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {Math.round(completionPercentage)}%
              </Typography>
            </Stack>
            <Box sx={{ 
              width: '100%', 
              height: 8, 
              backgroundColor: 'rgba(255,255,255,0.3)', 
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <Box sx={{
                width: `${completionPercentage}%`,
                height: '100%',
                backgroundColor: 'primary.dark',
                transition: 'width 0.3s ease'
              }} />
            </Box>
          </Box>

          {/* Quick Stats */}
          <Stack direction="row" spacing={2} mb={3}>
            <Chip 
              label={`${fleetSummary.recommendations.length} Recommendations`}
              color="primary"
              variant="outlined"
            />
            <Chip 
              label={`${fleetSummary.next_actions.length} Next Actions`}
              color="secondary"
              variant="outlined"
            />
            <Chip 
              label={`${completedActions.size} Completed`}
              color="success"
              variant="outlined"
            />
          </Stack>
        </CardContent>
      </ActionCard>

      {/* Immediate Next Actions */}
      <ActionCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" gap={2} mb={3}>
            <PlayArrowOutlinedIcon sx={{ color: 'error.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
              Immediate Next Actions
            </Typography>
          </Stack>

          <List>
            {fleetSummary.next_actions.map((action, index) => {
              const actionId = `next-action-${index}`;
              const isCompleted = completedActions.has(actionId);
              const priority = getPriorityFromIndex(index);
              const ItemComponent = isCompleted ? CompletedActionItem : PendingActionItem;

              return (
                <ItemComponent key={actionId}>
                  <ListItemIcon>
                    <Checkbox
                      checked={isCompleted}
                      onChange={() => handleActionToggle(actionId, action)}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={action}
                    secondary={
                      <Stack direction="row" alignItems="center" gap={1} mt={1}>
                        <PriorityBadge priority={priority} size="small" />
                        <Chip 
                          label="Immediate"
                          color="error"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    }
                  />
                </ItemComponent>
              );
            })}
          </List>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <ActionButton
              onClick={onStartImplementation}
              size="large"
              startIcon={<PlayArrowOutlinedIcon />}
            >
              Start Implementation Plan
            </ActionButton>
          </Box>
        </CardContent>
      </ActionCard>

      {/* Strategic Recommendations */}
      <ActionCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" gap={2} mb={3}>
            <CheckCircleOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Strategic Recommendations
            </Typography>
          </Stack>

          <List>
            {fleetSummary.recommendations.map((recommendation, index) => {
              const actionId = `recommendation-${index}`;
              const isCompleted = completedActions.has(actionId);
              const priority = getPriorityFromIndex(index + 3); // Offset for lower priority
              const ItemComponent = isCompleted ? CompletedActionItem : PendingActionItem;

              return (
                <ItemComponent key={actionId}>
                  <ListItemIcon>
                    <Checkbox
                      checked={isCompleted}
                      onChange={() => handleActionToggle(actionId, recommendation)}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={recommendation}
                    secondary={
                      <Stack direction="row" alignItems="center" gap={1} mt={1}>
                        <PriorityBadge priority={priority} size="small" />
                        <Chip 
                          label="Strategic"
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    }
                  />
                </ItemComponent>
              );
            })}
          </List>
        </CardContent>
      </ActionCard>

      {/* Implementation Summary */}
      <ActionCard>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'success.main' }}>
            Implementation Summary
          </Typography>

          <Stack spacing={2}>
            <Box sx={{ p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.dark', mb: 1 }}>
                Total Actions: {fleetSummary.recommendations.length + fleetSummary.next_actions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete these actions to maximize your career opportunities and achieve your goals
              </Typography>
            </Box>

            <Box sx={{ p: 2, backgroundColor: 'info.light', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.dark', mb: 1 }}>
                Processing Time: {Math.round(fleetSummary.processing_time)}s
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your comprehensive analysis was completed with high accuracy and attention to detail
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </ActionCard>
    </Stack>
  );
};

export default ActionItemsSection;