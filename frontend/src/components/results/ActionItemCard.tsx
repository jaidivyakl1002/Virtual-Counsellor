import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ActionItem } from '../../types/assessmentResultsTypes';
import { formatPriority } from '../../utils/formatters';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

const StyledCard = styled(Card)<{ priority: string }>(({ theme, priority }) => {
  const getBorderColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };

  return {
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    border: `2px solid ${getBorderColor(priority)}`,
    borderLeft: `6px solid ${getBorderColor(priority)}`,
    overflow: 'visible',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s ease'
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
    position: 'absolute',
    top: '-12px',
    right: '16px',
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px',
    zIndex: 1
  };
});

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  height: '24px',
  fontWeight: 500
}));

interface ActionItemCardProps {
  actionItem: ActionItem;
  onClick?: () => void;
}

const ActionItemCard: React.FC<ActionItemCardProps> = ({ actionItem, onClick }) => {
  return (
    <StyledCard priority={actionItem.priority} onClick={onClick}>
      <PriorityChip 
        label={formatPriority(actionItem.priority)} 
        priority={actionItem.priority}
        size="small"
      />
      
      <CardContent className="p-6 pt-8">
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <ChecklistOutlinedIcon className="text-primary-main mt-1" />
            <Box className="flex-1">
              <Typography variant="h6" className="font-bold text-text-primary mb-2">
                {actionItem.title}
              </Typography>
              <Typography variant="body2" className="text-text-secondary">
                {actionItem.description}
              </Typography>
            </Box>
          </Stack>

          {/* Time and Category */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <ScheduleOutlinedIcon className="text-text-secondary text-lg" />
              <Typography variant="body2" className="font-medium text-text-primary">
                {actionItem.estimatedTime}
              </Typography>
            </Stack>
            
            <CategoryChip 
              label={actionItem.category}
              size="small"
            />
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default ActionItemCard;