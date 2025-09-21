import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, PieChart } from '@mui/x-charts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ConfidenceIndicator from '../shared/ConfidenceIndicator';
import { TestScoreOutput, AptitudeScore, InterestScore } from '../../types/schoolAssessmentTypes';
import { formatAptitudeDomain, formatInterestDomain, formatStenScore } from '../../utils/schoolAssessmentFormatters';

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

const ScoreCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
  }
}));

const ScoreChip = styled(Chip)<{ level: string }>(({ theme, level }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  backgroundColor: 
    level === 'Very High' ? theme.palette.success.light :
    level === 'High' ? theme.palette.primary.light :
    level === 'Above Average' ? theme.palette.info.light :
    level === 'Average' ? theme.palette.warning.light :
    theme.palette.error.light,
  color:
    level === 'Very High' ? theme.palette.success.contrastText :
    level === 'High' ? theme.palette.primary.contrastText :
    level === 'Above Average' ? theme.palette.info.contrastText :
    level === 'Average' ? theme.palette.warning.contrastText :
    theme.palette.error.contrastText
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2)
}));

interface TestScoreInterpretationSectionProps {
  data: TestScoreOutput['data'];
  confidence: number;
}

const TestScoreInterpretationSection: React.FC<TestScoreInterpretationSectionProps> = ({
  data,
  confidence
}) => {
  const aptitudeChartData = data.score_summaries.dbda_top_aptitudes.map(apt => ({
    id: formatAptitudeDomain(apt.domain),
    label: formatAptitudeDomain(apt.domain),
    value: apt.score
  }));

  const interestChartData = data.score_summaries.cii_top_interests.map(interest => ({
    id: formatInterestDomain(interest.domain),
    label: formatInterestDomain(interest.domain),
    value: interest.score
  }));

  const COLORS = ['#146C94', '#19A7CE', '#AFD3E2', '#F6F1F1', '#FF6B6B', '#4ECDC4'];

  return (
    <SectionContainer>
      <HeaderCard>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <SchoolOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Test Score Interpretation
            </Typography>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {data.executive_summary}
          </Typography>
        </CardContent>
      </HeaderCard>

      <Stack spacing={4}>
        {/* Aptitude Analysis Chart */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Aptitude Analysis
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <BarChart
                dataset={data.score_summaries.dbda_top_aptitudes.map(apt => ({
                  domain: formatAptitudeDomain(apt.domain),
                  score: apt.score
                }))}
                xAxis={[{ scaleType: 'band', dataKey: 'domain' }]}
                series={[{ dataKey: 'score', label: 'Score', color: '#146C94' }]}
                width={800}
                height={400}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Interest Analysis Chart */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Interest Analysis
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <PieChart
                series={[{
                  data: interestChartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                }]}
                width={800}
                height={400}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Top Aptitudes */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Top Aptitudes
            </Typography>
            <Stack spacing={2}>
              {data.score_summaries.dbda_top_aptitudes.map((aptitude, index) => (
                <ScoreCard key={index}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {formatAptitudeDomain(aptitude.domain)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {aptitude.description}
                        </Typography>
                      </Box>
                      <Stack alignItems="flex-end" spacing={1}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {aptitude.score}/10
                        </Typography>
                        <ScoreChip label={aptitude.level} level={aptitude.level} size="small" />
                      </Stack>
                    </Stack>
                    <ProgressContainer>
                      <LinearProgress 
                        variant="determinate" 
                        value={aptitude.score * 10} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: 
                              aptitude.level === 'Very High' ? 'success.main' :
                              aptitude.level === 'High' ? 'primary.main' :
                              aptitude.level === 'Above Average' ? 'info.main' :
                              aptitude.level === 'Average' ? 'warning.main' :
                              'error.main'
                          }
                        }} 
                      />
                    </ProgressContainer>
                  </CardContent>
                </ScoreCard>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Top Interests */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Top Interests
            </Typography>
            <Stack spacing={2}>
              {data.score_summaries.cii_top_interests.map((interest, index) => (
                <ScoreCard key={index}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {formatInterestDomain(interest.domain)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {interest.description}
                        </Typography>
                      </Box>
                      <Stack alignItems="flex-end" spacing={1}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {interest.score}/10
                        </Typography>
                        <ScoreChip label={interest.level} level={interest.level} size="small" />
                      </Stack>
                    </Stack>
                    <ProgressContainer>
                      <LinearProgress 
                        variant="determinate" 
                        value={interest.score * 10} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: 
                              interest.level === 'Very High' ? 'success.main' :
                              interest.level === 'High' ? 'primary.main' :
                              interest.level === 'Above Average' ? 'info.main' :
                              interest.level === 'Average' ? 'warning.main' :
                              'error.main'
                          }
                        }} 
                      />
                    </ProgressContainer>
                  </CardContent>
                </ScoreCard>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Detailed Analysis Accordions */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Detailed Analysis
            </Typography>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Aptitude Breakdown
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {Object.entries(data.aptitude_analysis).map(([domain, analysis]) => (
                    <Box key={domain}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        {formatAptitudeDomain(domain)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {analysis}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Interest Breakdown
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {Object.entries(data.interest_analysis).map(([domain, analysis]) => (
                    <Box key={domain}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        {formatInterestDomain(domain)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {analysis}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Stack>
    </SectionContainer>
  );
};

export default TestScoreInterpretationSection;