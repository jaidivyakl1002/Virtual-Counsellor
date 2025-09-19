import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FleetSummary } from '../../types/assessmentTypes';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(20, 108, 148, 0.1)',
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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

const ConfidenceBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: '#E8F5E8',
  color: '#1B5E20',
  border: '2px solid #4CAF50',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 700,
  zIndex: 1
}));

const RecommendationCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '12px',
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
    transform: 'translateX(4px)'
  },
  transition: 'all 0.2s ease'
}));

const ActionCard = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: '#FFF3E0',
  border: '1px solid #FFB74D',
  marginBottom: '12px',
  '&:hover': {
    backgroundColor: '#FFE0B2',
    transform: 'translateX(4px)'
  },
  transition: 'all 0.2s ease'
}));

const ProcessingTimeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: '0.75rem'
}));

interface RecommendationsSummarySectionProps {
  fleetSummary: FleetSummary;
  nextActions: string[];
}

const RecommendationsSummarySection: React.FC<RecommendationsSummarySectionProps> = ({ 
  fleetSummary, 
  nextActions 
}) => {
  return (
    <StyledCard>
      <ConfidenceBadge>
        {Math.round(fleetSummary.confidence * 100)}% Confidence
      </ConfidenceBadge>
      
      <CardContent className="p-8 pt-16">
        <SectionHeader>
          <EmojiObjectsOutlinedIcon />
          <Typography variant="h4" className="font-bold text-text-primary">
            Key Recommendations
          </Typography>
        </SectionHeader>

        <Stack spacing={6}>
          {/* Processing Summary */}
          <Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} className="mb-6">
              <Box className="flex-1 text-center">
                <Typography variant="h3" className="font-bold text-primary-main mb-1">
                  {fleetSummary.recommendations.length}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  Recommendations
                </Typography>
              </Box>
              
              <Box className="flex-1 text-center">
                <Typography variant="h3" className="font-bold text-green-600 mb-1">
                  {Math.round(fleetSummary.processing_time)}s
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  Analysis Time
                </Typography>
              </Box>
              
              <Box className="flex-1 text-center">
                <ProcessingTimeChip 
                  label={fleetSummary.status.toUpperCase()}
                  size="small"
                />
                <Typography variant="body2" className="text-text-secondary mt-1">
                  Status
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Top Recommendations */}
          <Box>
            <SectionHeader>
              <TrendingUpOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Priority Recommendations
              </Typography>
            </SectionHeader>
            
            <Stack spacing={2}>
              {fleetSummary.recommendations.slice(0, 8).map((recommendation, index) => (
                <RecommendationCard key={index}>
                  <Stack direction="row" alignItems="start" spacing={3}>
                    <Box className="w-8 h-8 bg-primary-main text-white rounded-full flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                      {index + 1}
                    </Box>
                    <Typography variant="body1" className="text-text-secondary flex-1">
                      {recommendation}
                    </Typography>
                  </Stack>
                </RecommendationCard>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Immediate Next Actions */}
          <Box>
            <SectionHeader>
              <PlaylistAddCheckOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Immediate Next Actions
              </Typography>
            </SectionHeader>
            
            <Stack spacing={2}>
              {nextActions.map((action, index) => (
                <ActionCard key={index}>
                  <Stack direction="row" alignItems="start" spacing={3}>
                    <Box className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                      {index + 1}
                    </Box>
                    <Typography variant="body1" className="text-text-primary flex-1 font-medium">
                      {action}
                    </Typography>
                  </Stack>
                </ActionCard>
              ))}
            </Stack>
          </Box>

          {/* Fleet Summary Actions */}
          {fleetSummary.next_actions.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography variant="h5" className="font-semibold text-text-primary mb-4">
                  Additional Actions
                </Typography>
                <Stack spacing={2}>
                  {fleetSummary.next_actions.map((action, index) => (
                    <RecommendationCard key={index}>
                      <Stack direction="row" alignItems="start" spacing={3}>
                        <Box className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0">
                          {index + 1}
                        </Box>
                        <Typography variant="body2" className="text-text-secondary flex-1">
                          {action}
                        </Typography>
                      </Stack>
                    </RecommendationCard>
                  ))}
                </Stack>
              </Box>
            </>
          )}

          {/* Analysis Quality Indicators */}
          <Box className="bg-white/50 rounded-2xl p-6">
            <Typography variant="h6" className="font-semibold text-text-primary mb-4">
              Analysis Quality
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
              <Box className="flex-1 text-center">
                <Typography variant="h4" className="font-bold text-green-600 mb-1">
                  {Math.round(fleetSummary.confidence * 100)}%
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  Confidence Score
                </Typography>
              </Box>
              
              <Box className="flex-1 text-center">
                <Typography variant="h4" className="font-bold text-blue-600 mb-1">
                  5/5
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  Analysis Depth
                </Typography>
              </Box>
              
              <Box className="flex-1 text-center">
                <Typography variant="h4" className="font-bold text-purple-600 mb-1">
                  A+
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  Personalization
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default RecommendationsSummarySection;