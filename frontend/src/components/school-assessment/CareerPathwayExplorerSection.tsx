import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConfidenceIndicator from '../shared/ConfidenceIndicator';
import { CareerPathwayOutput } from '../../types/schoolAssessmentTypes';
import { formatSuitabilityScore } from '../../utils/schoolAssessmentFormatters';

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

const CareerCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main
  }
}));

const SuitabilityChip = styled(Chip)<{ score: number }>(({ theme, score }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  backgroundColor: 
    score >= 0.9 ? theme.palette.success.light :
    score >= 0.7 ? theme.palette.primary.light :
    score >= 0.5 ? theme.palette.warning.light :
    theme.palette.error.light,
  color:
    score >= 0.9 ? theme.palette.success.contrastText :
    score >= 0.7 ? theme.palette.primary.contrastText :
    score >= 0.5 ? theme.palette.warning.contrastText :
    theme.palette.error.contrastText
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(20, 108, 148, 0.3)'
  }
}));

const SalaryBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`
}));

interface CareerPathwayExplorerSectionProps {
  data: CareerPathwayOutput['data'];
  confidence: number;
  onCareerExplore?: (careerTitle: string, careerField: string) => void;
}

const CareerPathwayExplorerSection: React.FC<CareerPathwayExplorerSectionProps> = ({
  data,
  confidence,
  onCareerExplore
}) => {
  return (
    <SectionContainer>
      <HeaderCard>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <TrendingUpOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Career Pathway Explorer
            </Typography>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {data.executive_summary}
          </Typography>
        </CardContent>
      </HeaderCard>

      <Stack spacing={3}>
        {data.recommended_career_pathways.map((career, index) => (
          <CareerCard key={index}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {career.career_title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    {career.career_field}
                  </Typography>
                  <SuitabilityChip 
                    label={`${formatSuitabilityScore(career.suitability_score)} Match`}
                    score={career.suitability_score}
                    size="medium"
                  />
                </Box>
                <ExploreButton
                  variant="contained"
                  onClick={() => onCareerExplore?.(career.career_title, career.career_field)}
                  startIcon={<WorkOutlineIcon />}
                >
                  Explore Career
                </ExploreButton>
              </Stack>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Suitability Score
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={career.suitability_score * 100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: 
                        career.suitability_score >= 0.9 ? 'success.main' :
                        career.suitability_score >= 0.7 ? 'primary.main' :
                        career.suitability_score >= 0.5 ? 'warning.main' :
                        'error.main'
                    }
                  }} 
                />
              </Box>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {career.pathway_description}
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon sx={{ fontSize: 20 }} />
                    Educational Requirements
                  </Typography>
                  <List dense>
                    {career.educational_requirements.map((req, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={req}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 2 }}>
                    Entry Timeline: {career.entry_timeline}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoneyIcon sx={{ fontSize: 20 }} />
                    Salary Outlook
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <SalaryBox flex={1}>
                      <Typography variant="body2" color="text.secondary">Entry Level</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {career.salary_outlook.entry_level}
                      </Typography>
                    </SalaryBox>
                    <SalaryBox flex={1}>
                      <Typography variant="body2" color="text.secondary">Mid Career</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {career.salary_outlook.mid_career}
                      </Typography>
                    </SalaryBox>
                    <SalaryBox flex={1}>
                      <Typography variant="body2" color="text.secondary">Senior Level</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {career.salary_outlook.senior}
                      </Typography>
                    </SalaryBox>
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Aptitude Alignment
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {career.aptitude_alignment.map((aptitude, idx) => (
                      <Chip 
                        key={idx}
                        label={aptitude}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </CareerCard>
        ))}
      </Stack>
    </SectionContainer>
  );
};

export default CareerPathwayExplorerSection;