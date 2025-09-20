import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { MarketIntelligenceData } from '../../../types/assessmentResultsTypes';
import ConfidenceIndicator from '../../shared/ConfidenceIndicator';
import ExpandableSection from '../../shared/ExpandableSection';

const MarketCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 300,
  width: '100%',
  marginTop: theme.spacing(2)
}));

const COLORS = ['#146C94', '#19A7CE', '#AFD3E2', '#0F4C75', '#F6F1F1'];

interface MarketIntelligenceSectionProps {
  data: MarketIntelligenceData;
  confidence: number;
}

const MarketIntelligenceSection: React.FC<MarketIntelligenceSectionProps> = ({
  data,
  confidence
}) => {
  // Prepare chart data
  const skillDemandData = Object.entries(data.skill_demand.Technology || {}).map(([skill, demand]) => ({
    skill: skill.length > 15 ? `${skill.substring(0, 15)}...` : skill,
    demand: demand === 'Very High' ? 5 : demand === 'High' ? 4 : demand === 'Medium' ? 3 : demand === 'Low' ? 2 : 1,
    demandLabel: demand
  }));

  const geographicData = Object.entries(data.geographic_insights).map(([location, description], index) => ({
    name: location,
    value: Math.floor(Math.random() * 30) + 20, // Mock data for visualization
    description
  }));

  return (
    <Stack spacing={3}>
      {/* Header Card */}
      <MarketCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <TrendingUpOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Market Intelligence
              </Typography>
            </Box>
            <ConfidenceIndicator confidence={confidence} />
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Comprehensive analysis of industry trends, skill demand, and market opportunities
          </Typography>
        </CardContent>
      </MarketCard>

      {/* Industry Trends */}
      <ExpandableSection
        title="Industry Trends"
        subtitle="Current market trends across different domains"
        icon={<TrendingUpOutlinedIcon sx={{ color: 'primary.main' }} />}
        defaultExpanded={true}
      >
        <Stack spacing={2}>
          {Object.entries(data.industry_trends).map(([domain, trend], index) => (
            <Box key={index} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {domain}
                </Typography>
                <Chip 
                  label="Trending" 
                  color="success" 
                  size="small"
                  variant="outlined"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {trend}
              </Typography>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Skill Demand Chart */}
      <MarketCard>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Technology Skills Demand
          </Typography>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="skill" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 5]}
                  tickFormatter={(value) => {
                    const labels = ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];
                    return labels[value] || '';
                  }}
                />
                <Tooltip 
                  formatter={(value, name) => [skillDemandData.find(item => item.demand === value)?.demandLabel || value, 'Demand Level']}
                />
                <Bar dataKey="demand" fill="#146C94" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </MarketCard>

      {/* Geographic Insights */}
      <MarketCard>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1} mb={3}>
            <LocationOnOutlinedIcon sx={{ color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Geographic Opportunities
            </Typography>
          </Stack>
          
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
            <Box sx={{ flex: 1 }}>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List>
                {Object.entries(data.geographic_insights).map(([location, description], index) => (
                  <ListItem key={index} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {location}
                          </Typography>
                        </Stack>
                      }
                      secondary={description}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </CardContent>
      </MarketCard>

      {/* Salary Insights */}
      <ExpandableSection
        title="Salary Insights"
        subtitle="Compensation ranges across different experience levels"
        icon={<TrendingUpOutlinedIcon sx={{ color: 'success.main' }} />}
      >
        <Stack spacing={2}>
          {Object.entries(data.salary_insights).map(([domain, salaryData], domainIndex) => (
            <Box key={domainIndex}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                {domain}
              </Typography>
              <Stack spacing={1}>
                {Object.entries(salaryData).map(([level, range], index) => (
                  <Box key={index} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {level}
                      </Typography>
                      <Chip 
                        label={range} 
                        color="success" 
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </ExpandableSection>

      {/* Emerging Technologies */}
      <ExpandableSection
        title="Emerging Technologies"
        subtitle={`${data.emerging_technologies.length} trending technologies`}
        icon={<TrendingUpOutlinedIcon sx={{ color: 'warning.main' }} />}
      >
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {data.emerging_technologies.map((tech, index) => (
            <Chip 
              key={index} 
              label={tech} 
              color="primary" 
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </ExpandableSection>

      {/* Market Recommendations */}
      <ExpandableSection
        title="Market Recommendations"
        subtitle={`${data.market_recommendations.length} strategic recommendations`}
        icon={<TrendingUpOutlinedIcon sx={{ color: 'info.main' }} />}
      >
        <List>
          {data.market_recommendations.map((recommendation, index) => (
            <ListItem key={index} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={recommendation}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { lineHeight: 1.6 }
                }}
              />
            </ListItem>
          ))}
        </List>
      </ExpandableSection>
    </Stack>
  );
};

export default MarketIntelligenceSection;