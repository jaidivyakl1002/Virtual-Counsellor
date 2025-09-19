import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MarketIntelligenceOutput } from '../../types/assessmentTypes';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(20, 108, 148, 0.1)',
  overflow: 'visible',
  position: 'relative',
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

const DomainCard = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: '16px'
}));

const SkillDemandChip = styled(Chip)<{ demand: string }>(({ theme, demand }) => {
  const getColorByDemand = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'very high':
        return { bg: '#E8F5E8', color: '#1B5E20' };
      case 'high':
        return { bg: '#E3F2FD', color: '#0D47A1' };
      case 'medium':
        return { bg: '#FFF3E0', color: '#E65100' };
      default:
        return { bg: '#FAFAFA', color: '#424242' };
    }
  };

  const colors = getColorByDemand(demand);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px',
    margin: '2px'
  };
});

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: '0.75rem',
  height: '28px',
  margin: '4px'
}));

interface MarketIntelligenceSectionProps {
  marketIntelligence: MarketIntelligenceOutput;
}

const MarketIntelligenceSection: React.FC<MarketIntelligenceSectionProps> = ({ marketIntelligence }) => {
  const { data } = marketIntelligence;

  return (
    <StyledCard>
      <CardContent className="p-8">
        <SectionHeader>
          <TrendingUpOutlinedIcon />
          <Typography variant="h4" className="font-bold text-text-primary">
            Market Intelligence
          </Typography>
        </SectionHeader>

        <Stack spacing={6}>
          {/* Industry Trends */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Industry Trends
            </Typography>
            <Stack spacing={3}>
              {Object.entries(data.industry_trends).map(([industry, trend]) => (
                <DomainCard key={industry}>
                  <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                    {industry}
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary">
                    {trend}
                  </Typography>
                </DomainCard>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Skill Demand Analysis */}
          <Box>
            <SectionHeader>
              <WorkOutlineOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Skill Demand Analysis
              </Typography>
            </SectionHeader>
            
            <Stack spacing={4}>
              {Object.entries(data.skill_demand).map(([domain, skills]) => (
                <Box key={domain}>
                  <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                    {domain}
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {Object.entries(skills as Record<string, string>).map(([skill, demand]) => (
                      <Box key={skill} className="flex items-center space-x-2">
                        <Typography variant="body2" className="font-medium">
                          {skill}
                        </Typography>
                        <SkillDemandChip 
                          label={demand} 
                          demand={demand}
                          size="small"
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Salary Insights */}
          <Box>
            <SectionHeader>
              <AttachMoneyOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Salary Insights
              </Typography>
            </SectionHeader>
            
            <Stack spacing={3}>
              {Object.entries(data.salary_insights).map(([domain, salaryData]) => (
                <DomainCard key={domain}>
                  <Typography variant="h6" className="font-semibold text-text-primary mb-3">
                    {domain}
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                    {Object.entries(salaryData as Record<string, string>).map(([level, salary]) => (
                      <Box key={level} className="flex-1">
                        <Typography variant="body2" className="text-text-secondary mb-1">
                          {level}
                        </Typography>
                        <Typography variant="h6" className="font-bold text-green-600">
                          {salary}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </DomainCard>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Geographic Insights */}
          <Box>
            <SectionHeader>
              <LocationOnOutlinedIcon />
              <Typography variant="h5" className="font-semibold text-text-primary">
                Geographic Opportunities
              </Typography>
            </SectionHeader>
            
            <Stack spacing={2}>
              {Object.entries(data.geographic_insights).map(([location, insight]) => (
                <Box key={location} className="flex items-start space-x-3">
                  <Box className="w-3 h-3 bg-primary-main rounded-full mt-2"></Box>
                  <Box className="flex-1">
                    <Typography variant="h6" className="font-semibold text-text-primary">
                      {location}
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      {insight}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Emerging Technologies */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Emerging Technologies
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {data.emerging_technologies.map((tech, index) => (
                <TechChip key={index} label={tech} />
              ))}
            </Box>
          </Box>

          {/* Market Recommendations */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Market Recommendations
            </Typography>
            <Stack spacing={2}>
              {data.market_recommendations.map((recommendation, index) => (
                <Box key={index} className="flex items-start space-x-3">
                  <Box className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </Box>
                  <Typography variant="body1" className="text-text-secondary flex-1">
                    {recommendation}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Domain Selection Reasoning */}
          <Box>
            <Typography variant="h5" className="font-semibold text-text-primary mb-4">
              Domain Analysis
            </Typography>
            <Typography variant="body1" className="text-text-secondary mb-4">
              {data.domain_selection_reasoning.overall_strategy}
            </Typography>
            
            <Stack spacing={3}>
              {Object.entries(data.domain_selection_reasoning.domain_explanations).map(([domain, explanation]) => (
                <DomainCard key={domain}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-2">
                    <Typography variant="h6" className="font-semibold text-text-primary">
                      {domain}
                    </Typography>
                    <Chip 
                      label={`${Math.round(explanation.relevance_score * 10)}/10`}
                      color="primary"
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body2" className="text-text-secondary">
                    {explanation.reasoning}
                  </Typography>
                </DomainCard>
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default MarketIntelligenceSection;