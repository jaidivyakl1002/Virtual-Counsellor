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
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ConfidenceIndicator from '../shared/ConfidenceIndicator';
import { StreamAdvisorOutput, AcademicStream } from '../../types/schoolAssessmentTypes';
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

const StreamCard = styled(Card)(({ theme }) => ({
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

const SelectButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(20, 108, 148, 0.3)'
  }
}));

interface AcademicStreamAdvisorSectionProps {
  data: StreamAdvisorOutput['data'];
  confidence: number;
  onStreamSelect?: (stream: AcademicStream) => void;
}

const AcademicStreamAdvisorSection: React.FC<AcademicStreamAdvisorSectionProps> = ({
  data,
  confidence,
  onStreamSelect
}) => {
  return (
    <SectionContainer>
      <HeaderCard>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <CallSplitOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Academic Stream Advisor
            </Typography>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {data.executive_summary}
          </Typography>
        </CardContent>
      </HeaderCard>

      <Stack spacing={3}>
        {data.recommended_streams.map((stream, index) => (
          <StreamCard key={index}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {stream.stream_type}
                  </Typography>
                  <SuitabilityChip 
                    label={`${formatSuitabilityScore(stream.suitability_score)} Match`}
                    score={stream.suitability_score}
                    size="medium"
                  />
                </Box>
                <SelectButton
                  variant="contained"
                  onClick={() => onStreamSelect?.(stream.stream_type)}
                  startIcon={<TrendingUpIcon />}
                >
                  Select Stream
                </SelectButton>
              </Stack>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Suitability Score
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stream.suitability_score * 100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: 
                        stream.suitability_score >= 0.9 ? 'success.main' :
                        stream.suitability_score >= 0.7 ? 'primary.main' :
                        stream.suitability_score >= 0.5 ? 'warning.main' :
                        'error.main'
                    }
                  }} 
                />
              </Box>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Box flex={1}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Supporting Strengths
                  </Typography>
                  <List dense>
                    {stream.primary_strengths_supporting.map((strength, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={strength}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box flex={1}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Career Pathways
                  </Typography>
                  <List dense>
                    {stream.career_pathways.map((career, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <TrendingUpIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={career}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box flex={1}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Subject Requirements
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {stream.subject_requirements.map((subject, idx) => (
                      <Chip 
                        key={idx}
                        label={subject}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </StreamCard>
        ))}
      </Stack>
    </SectionContainer>
  );
};

export default AcademicStreamAdvisorSection;