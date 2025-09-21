import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import QuizIcon from '@mui/icons-material/Quiz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConfidenceIndicator from '../shared/ConfidenceIndicator';
import { RoadmapPlannerOutput } from '../../types/schoolAssessmentTypes';
import { formatGrade } from '../../utils/schoolAssessmentFormatters';

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

const GradeCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
  }
}));

const ExamCard = styled(Card)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.light}`,
  backgroundColor: theme.palette.primary.light + '20',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main
  }
}));

const DifficultyChip = styled(Chip)<{ difficulty: string }>(({ theme, difficulty }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  backgroundColor: 
    difficulty.toLowerCase().includes('highly') ? theme.palette.error.light :
    difficulty.toLowerCase().includes('moderate') ? theme.palette.warning.light :
    theme.palette.success.light,
  color:
    difficulty.toLowerCase().includes('highly') ? theme.palette.error.contrastText :
    difficulty.toLowerCase().includes('moderate') ? theme.palette.warning.contrastText :
    theme.palette.success.contrastText
}));

interface EducationalRoadmapSectionProps {
  data: RoadmapPlannerOutput['data'];
  confidence: number;
}

const EducationalRoadmapSection: React.FC<EducationalRoadmapSectionProps> = ({
  data,
  confidence
}) => {
  return (
    <SectionContainer>
      <HeaderCard>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <EventNoteOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Educational Roadmap
            </Typography>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {data.executive_summary}
          </Typography>
        </CardContent>
      </HeaderCard>

      <Stack spacing={4}>
        {/* Grade-wise Milestones */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Grade-wise Academic Milestones
            </Typography>
            
            <Stack spacing={3}>
              {data.grade_wise_milestones.map((milestone, index) => (
                <Box key={index}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 48, 
                        height: 48,
                        mt: 1
                      }}
                    >
                      <SchoolIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <GradeCard>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            {formatGrade(milestone.grade)}
                          </Typography>
                          
                          <Box mb={3}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                              Academic Focus
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                              {milestone.academic_focus.map((focus, idx) => (
                                <Chip 
                                  key={idx}
                                  label={focus}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              ))}
                            </Stack>
                          </Box>

                          <Box mb={3}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                              Subject Priorities
                            </Typography>
                            <List dense>
                              {Object.entries(milestone.subject_priorities).map(([subject, priority]) => (
                                <ListItem key={subject} sx={{ py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <BookIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={subject}
                                    secondary={priority}
                                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                    secondaryTypographyProps={{ variant: 'caption' }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>

                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                              Entrance Exam Preparation
                            </Typography>
                            <List dense>
                              {milestone.entrance_exam_preparation.map((prep, idx) => (
                                <ListItem key={idx} sx={{ py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={prep}
                                    primaryTypographyProps={{ variant: 'body2' }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </CardContent>
                      </GradeCard>
                    </Box>
                  </Stack>
                  {index < data.grade_wise_milestones.length - 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                      <Divider orientation="vertical" sx={{ height: 40, borderWidth: 2, borderColor: 'primary.main' }} />
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Entrance Exam Strategies */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Entrance Exam Strategies
            </Typography>
            
            <Stack spacing={3}>
              {data.entrance_exam_strategies.map((exam, index) => (
                <ExamCard key={index}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          {exam.exam_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {exam.preparation_timeline}
                        </Typography>
                      </Box>
                      <DifficultyChip 
                        label="Highly Competitive"
                        difficulty={exam.difficulty_assessment}
                        size="small"
                      />
                    </Stack>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Exam Details & Strategy
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                              Subject Priorities
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                              {exam.subject_priorities.map((subject, idx) => (
                                <Chip 
                                  key={idx}
                                  label={subject}
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                  icon={<QuizIcon />}
                                />
                              ))}
                            </Stack>
                          </Box>
                          
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                              Difficulty Assessment
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {exam.difficulty_assessment}
                            </Typography>
                          </Box>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </ExamCard>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </SectionContainer>
  );
};

export default EducationalRoadmapSection;