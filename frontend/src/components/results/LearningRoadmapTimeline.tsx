import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Box, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LearningRoadmap, LearningPhase, LearningResource } from '../../types/assessmentResultsTypes';
import { formatTimeframe } from '../../utils/formatters';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(20, 108, 148, 0.1)',
  overflow: 'visible'
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '24px',
    top: '60px',
    bottom: '60px',
    width: '2px',
    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    borderRadius: '1px'
  }
}));

const PhaseCard = styled(Card)<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  marginBottom: '24px',
  borderRadius: '16px',
  border: `2px solid ${isExpanded ? theme.palette.primary.main : 'rgba(20, 108, 148, 0.1)'}`,
  boxShadow: isExpanded ? '0 8px 30px rgba(20, 108, 148, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  position: 'relative',
  marginLeft: '60px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-47px',
    top: '24px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: isExpanded ? theme.palette.primary.main : theme.palette.grey[400],
    border: `3px solid ${theme.palette.background.paper}`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease'
  }
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  border: 'none',
  '&::before': {
    display: 'none'
  },
  '& .MuiAccordionSummary-root': {
    padding: '20px 24px',
    minHeight: 'auto',
    '& .MuiAccordionSummary-content': {
      margin: '0',
      alignItems: 'center'
    }
  },
  '& .MuiAccordionDetails-root': {
    padding: '0 24px 24px'
  }
}));

const ResourceItem = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.grey[50],
  border: '1px solid rgba(0, 0, 0, 0.05)',
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: 0
  }
}));

const ResourceTypeChip = styled(Chip)<{ resourceType: string }>(({ theme, resourceType }) => {
  const getColorByType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'course':
        return { bg: '#E3F2FD', color: '#1565C0' };
      case 'book':
        return { bg: '#E8F5E8', color: '#2E7D32' };
      case 'project':
        return { bg: '#FFF3E0', color: '#EF6C00' };
      case 'certification':
        return { bg: '#F3E5F5', color: '#7B1FA2' };
      default:
        return { bg: '#FAFAFA', color: '#616161' };
    }
  };

  const colors = getColorByType(resourceType);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px'
  };
});

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'course':
      return <SchoolOutlinedIcon />;
    case 'book':
      return <ImportContactsOutlinedIcon />;
    case 'project':
      return <InventoryOutlinedIcon />;
    case 'certification':
      return <SchoolOutlinedIcon />;
    default:
      return <SchoolOutlinedIcon />;
  }
};

interface LearningRoadmapTimelineProps {
  roadmap: LearningRoadmap;
}

const LearningRoadmapTimeline: React.FC<LearningRoadmapTimelineProps> = ({ roadmap }) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  const handlePhaseToggle = (phaseIndex: number) => {
    setExpandedPhase(expandedPhase === phaseIndex ? null : phaseIndex);
  };

  return (
    <StyledCard>
      <CardContent className="p-8">
        <Stack direction="row" alignItems="center" spacing={2} className="mb-8">
          <EastOutlinedIcon className="text-primary-main text-2xl" />
          <Typography variant="h4" className="font-bold text-text-primary">
            Learning Roadmap
          </Typography>
        </Stack>

        <Typography variant="body1" className="text-text-secondary mb-8">
          Recommended Learning Path
        </Typography>

        <TimelineContainer>
          {roadmap.phases.map((phase: LearningPhase, index: number) => (
            <PhaseCard 
              key={index} 
              isExpanded={expandedPhase === index}
            >
              <StyledAccordion 
                expanded={expandedPhase === index}
                onChange={() => handlePhaseToggle(index)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction="row" alignItems="center" spacing={3} className="w-full">
                    <Box className="flex-1">
                      <Typography variant="h5" className="font-bold text-text-primary mb-1">
                        Phase {index + 1}: {phase.title}
                      </Typography>
                      <Typography variant="body2" className="text-text-secondary">
                        {phase.description}
                      </Typography>
                    </Box>
                    
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <ScheduleOutlinedIcon className="text-text-secondary text-lg" />
                      <Typography variant="body2" className="font-medium text-text-primary">
                        {formatTimeframe(phase.duration)}
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Stack spacing={4}>
                    {/* Skills to Learn */}
                    <Box>
                      <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                        Skills to Learn
                      </Typography>
                      <Stack direction="row" spacing={1} className="flex-wrap gap-2">
                        {phase.skills.map((skill, skillIndex) => (
                          <Chip 
                            key={skillIndex}
                            label={skill}
                            size="small"
                            className="bg-primary-light text-primary-contrastText"
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Learning Resources */}
                    <Box>
                      <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                        Learning Resources
                      </Typography>
                      <Stack spacing={2}>
                        {phase.resources.map((resource: LearningResource, resourceIndex: number) => (
                          <ResourceItem key={resourceIndex}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="mb-2">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Box className="text-text-secondary">
                                  {getResourceIcon(resource.type)}
                                </Box>
                                <Box>
                                  <Typography variant="h6" className="font-semibold text-text-primary">
                                    {resource.title}
                                  </Typography>
                                  {(resource.provider || resource.author) && (
                                    <Typography variant="body2" className="text-text-secondary">
                                      {resource.provider || resource.author}
                                    </Typography>
                                  )}
                                </Box>
                              </Stack>
                              
                              <Stack alignItems="flex-end" spacing={1}>
                                <ResourceTypeChip 
                                  label={resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                  resourceType={resource.type}
                                  size="small"
                                />
                                <Typography variant="body2" className="text-text-secondary">
                                  {formatTimeframe(resource.duration)}
                                </Typography>
                              </Stack>
                            </Stack>
                            
                            {resource.description && (
                              <Typography variant="body2" className="text-text-secondary">
                                {resource.description}
                              </Typography>
                            )}
                          </ResourceItem>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </StyledAccordion>
            </PhaseCard>
          ))}
        </TimelineContainer>
      </CardContent>
    </StyledCard>
  );
};

export default LearningRoadmapTimeline;