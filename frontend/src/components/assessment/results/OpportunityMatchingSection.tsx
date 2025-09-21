import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
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
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { OpportunityMatcherData } from '../../../types/assessmentResultsTypes';
import ConfidenceIndicator from '../../shared/ConfidenceIndicator';
import ExpandableSection from '../../shared/ExpandableSection';

const OpportunityCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
  }
}));

const OpportunityHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.light + '20',
  borderRadius: '16px 16px 0 0',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const SuccessProbabilityContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.success.light + '30',
  borderRadius: 8,
  textAlign: 'center'
}));

const ApplyButton = styled(Button)(({  }) => ({
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

interface OpportunityMatchingSectionProps {
  data: OpportunityMatcherData;
  confidence: number;
  onOpportunityApply?: (opportunityId: string) => void;
}

const OpportunityMatchingSection: React.FC<OpportunityMatchingSectionProps> = ({
  data,
  confidence,
  onOpportunityApply
}) => {
  const { matched_opportunities, compatibility_analysis, success_probability, preparation_requirements } = data;

  const getSuccessProbability = (opportunityId: string): number => {
    const prob = success_probability[opportunityId];
    return parseInt(prob?.replace('%', '') || '0');
  };

  const getSuccessColor = (probability: number) => {
    if (probability >= 80) return 'success';
    if (probability >= 60) return 'primary';
    if (probability >= 40) return 'warning';
    return 'error';
  };

  return (
    <Stack spacing={3}>
      {/* Header Card */}
      <OpportunityCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <ExtensionOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Opportunity Matching
              </Typography>
            </Box>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Personalized job opportunities matched to your profile with compatibility analysis and success predictions
          </Typography>

          <Box sx={{ p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.dark' }}>
              {matched_opportunities.length} High-Quality Matches Found
            </Typography>
          </Box>
        </CardContent>
      </OpportunityCard>

      {/* Matched Opportunities */}
      <Stack spacing={3}>
        {matched_opportunities.map((opportunity) => {
          const successProb = getSuccessProbability(opportunity.opportunity_id);
          const compatibility = compatibility_analysis[opportunity.opportunity_id];
          const preparation = preparation_requirements[opportunity.opportunity_id];

          return (
            <OpportunityCard key={opportunity.opportunity_id}>
              <OpportunityHeader>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      {opportunity.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <BusinessOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.company}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <LocationOnOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.location}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Chip 
                    label={opportunity.type} 
                    color="primary" 
                    variant="outlined"
                  />
                </Stack>
              </OpportunityHeader>

              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {opportunity.description}
                </Typography>

                {/* Success Probability */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
                  <SuccessProbabilityContainer sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      color: `${getSuccessColor(successProb)}.main`,
                      mb: 1 
                    }}>
                      {successProb}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Success Probability
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={successProb}
                      color={getSuccessColor(successProb)}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </SuccessProbabilityContainer>

                  <Box sx={{ flex: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Compatibility Analysis
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {compatibility}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Preparation Requirements */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Preparation Requirements
                  </Typography>
                  <Box sx={{ p: 2, backgroundColor: 'warning.light', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {preparation}
                    </Typography>
                  </Box>
                </Box>

                {/* Action Button */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      label={`${successProb >= 70 ? 'High' : successProb >= 50 ? 'Medium' : 'Low'} Match`}
                      color={getSuccessColor(successProb)}
                      variant="outlined"
                      size="small"
                    />
                    <Chip 
                      label="Recommended"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                  
                  <ApplyButton
                    onClick={() => onOpportunityApply?.(opportunity.opportunity_id)}
                    size="medium"
                  >
                    View Application Strategy
                  </ApplyButton>
                </Stack>
              </CardContent>
            </OpportunityCard>
          );
        })}
      </Stack>

      {/* Implementation Guidance */}
      <ExpandableSection
        title="Implementation Guidance"
        subtitle="Step-by-step approach to opportunity pursuit"
        icon={<CheckCircleOutlinedIcon sx={{ color: 'info.main' }} />}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'info.main' }}>
              Immediate Actions
            </Typography>
            <List>
              {data.implementation_guidance.immediate_actions.map((action, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <CheckCircleOutlinedIcon sx={{ color: 'info.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
              Weekly Tasks
            </Typography>
            <List>
              {data.implementation_guidance.weekly_tasks.map((task, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <CheckCircleOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={task} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
              Monthly Goals
            </Typography>
            <List>
              {data.implementation_guidance.monthly_goals.map((goal, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon>
                    <CheckCircleOutlinedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={goal} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </ExpandableSection>

      {/* Alternative Pathways */}
      <ExpandableSection
        title="Alternative Pathways"
        subtitle="Additional opportunities and strategies"
        icon={<ExtensionOutlinedIcon sx={{ color: 'warning.main' }} />}
      >
        <Box sx={{ p: 2, backgroundColor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {data.alternative_pathways.description}
          </Typography>
        </Box>
      </ExpandableSection>

      {/* Networking Strategy */}
      <ExpandableSection
        title="Networking Strategy for Opportunities"
        subtitle="Leverage connections for better outcomes"
        icon={<CheckCircleOutlinedIcon sx={{ color: 'secondary.main' }} />}
      >
        <Box sx={{ p: 2, backgroundColor: 'secondary.light', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {data.networking_strategy.description}
          </Typography>
        </Box>
      </ExpandableSection>
    </Stack>
  );
};

export default OpportunityMatchingSection;