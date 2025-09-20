import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { PriorityLevel } from '../../types/assessmentResultsTypes';

const PriorityChip = styled(Chip)<{ prioritylevel: PriorityLevel }>(({ theme, prioritylevel }) => {
  const getStyles = () => {
    switch (prioritylevel) {
      case PriorityLevel.HIGH:
        return {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.dark,
          '& .MuiChip-icon': {
            color: theme.palette.error.main
          }
        };
      case PriorityLevel.MEDIUM:
        return {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.dark,
          '& .MuiChip-icon': {
            color: theme.palette.warning.main
          }
        };
      case PriorityLevel.LOW:
        return {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.dark,
          '& .MuiChip-icon': {
            color: theme.palette.success.main
          }
        };
      default:
        return {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[700]
        };
    }
  };

  return {
    ...getStyles(),
    fontWeight: 600,
    fontSize: '0.75rem'
  };
});

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'small' | 'medium';
  showIcon?: boolean;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'small',
  showIcon = true
}) => {
  const getIcon = () => {
    if (!showIcon) return undefined;
    
    switch (priority) {
      case PriorityLevel.HIGH:
        return <ErrorOutlineOutlinedIcon />;
      case PriorityLevel.MEDIUM:
        return <AnnouncementOutlinedIcon />;
      default:
        return undefined;
    }
  };

  return (
    <PriorityChip
      label={priority}
      size={size}
      prioritylevel={priority}
      icon={getIcon()}
    />
  );
};

export default PriorityBadge;