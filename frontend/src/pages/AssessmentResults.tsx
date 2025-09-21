import React, { useState } from 'react';
import {
  Container,
  Typography,
  Stack,
  Box,
  Tabs,
  Tab,
  Alert,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ProfileAnalysisSection from '../components/assessment/results/ProfileAnalysisSection';
import MarketIntelligenceSection from '../components/assessment/results/MarketIntelligenceSection';
import SkillDevelopmentSection from '../components/assessment/results/SkillDevelopmentSection';
import CareerOptimizationSection from '../components/assessment/results/CareerOptimizationSection';
import OpportunityMatchingSection from '../components/assessment/results/OpportunityMatchingSection';
import ActionItemsSection from '../components/assessment/results/ActionItemsSection';
import ExportControls from '../components/shared/ExportControls';
import ConfidenceIndicator from '../components/shared/ConfidenceIndicator';
import { AssessmentResultsProps } from '../types/assessmentResultsTypes';
import { formatProcessingTime, formatDate } from '../utils/assessmentFormatters';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[50]
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  padding: '60px 0 40px',
  marginBottom: theme.spacing(4)
}));

const ResultsContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(8)
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(4),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '& .MuiTab-root': {
    borderRadius: 12,
    textTransform: 'none',
    fontWeight: 600,
    minHeight: 48
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      aria-labelledby={`results-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  assessmentData,
  showExportOptions = true,
  enableActionTracking = true,
  onActionItemClick,
  onDownloadReport,
  onShareResults,
  onSaveResults,
  onStartImplementation,
  isLoading = false,
  error
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setActiveTab(newValue);
  };

  const handleDownloadPDF = () => {
    onDownloadReport?.('pdf');
  };

  const handleDownloadJSON = () => {
    onDownloadReport?.('json');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShare = (platform: 'linkedin' | 'email') => {
    onShareResults?.(platform);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Navigation />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress color="inherit" />
            <Typography variant="h6">Loading your assessment results...</Typography>
          </Stack>
        </Backdrop>
        <Footer />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Navigation />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Container>
        <Footer />
      </PageContainer>
    );
  }

  if (!assessmentData?.success) {
    return (
      <PageContainer>
        <Navigation />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            Failed to load assessment results. Please try again.
          </Alert>
        </Container>
        <Footer />
      </PageContainer>
    );
  }

  const { data } = assessmentData;
  const { outputs } = data.results;

  return (
    <PageContainer>
      <Navigation />
      
      <HeaderSection>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 2
                }}
              >
                Assessment Results
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: '1.2rem',
                  color: 'text.secondary',
                  mb: 2
                }}
              >
                Your Personalized Career Analysis
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Session: {data.session_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed: {formatDate(data.updated_at)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Processing Time: {formatProcessingTime(outputs.fleet_summary.processing_time)}
                </Typography>
              </Stack>
            </Box>
            
            <Stack alignItems="center" spacing={2}>
              <ConfidenceIndicator 
                confidence={outputs.fleet_summary.confidence} 
                label="Overall Confidence"
                size="large"
              />
              {showExportOptions && (
                <ExportControls
                  onDownloadPDF={handleDownloadPDF}
                  onDownloadJSON={handleDownloadJSON}
                  onCopyLink={handleCopyLink}
                  onShare={handleShare}
                  onSave={onSaveResults}
                />
              )}
            </Stack>
          </Stack>
        </Container>
      </HeaderSection>

      <ResultsContainer maxWidth="lg">
        <StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="assessment results tabs"
        >
          <Tab label="Profile Analysis" />
          <Tab label="Market Intelligence" />
          <Tab label="Skill Development" />
          <Tab label="Career Planning" />
          <Tab label="Opportunities" />
          <Tab label="Action Items" />
        </StyledTabs>

        <TabPanel value={activeTab} index={0}>
          <ProfileAnalysisSection
            data={outputs.agent_outputs.profile_analysis.data}
            confidence={outputs.agent_outputs.profile_analysis.confidence}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <MarketIntelligenceSection
            data={outputs.agent_outputs.market_intelligence.data}
            confidence={outputs.agent_outputs.market_intelligence.confidence}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <SkillDevelopmentSection
            data={outputs.agent_outputs.skill_development_strategist.data}
            confidence={outputs.agent_outputs.skill_development_strategist.confidence}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <CareerOptimizationSection
            data={outputs.agent_outputs.career_optimization_planner.data}
            confidence={outputs.agent_outputs.career_optimization_planner.confidence}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <OpportunityMatchingSection
            data={outputs.agent_outputs.opportunity_matcher.data}
            confidence={outputs.agent_outputs.opportunity_matcher.confidence}
            // onOpportunityApply={onOpportunityApply}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <ActionItemsSection
            fleetSummary={outputs.fleet_summary}
            onActionItemClick={enableActionTracking ? onActionItemClick : undefined}
            onStartImplementation={onStartImplementation}
          />
        </TabPanel>
      </ResultsContainer>

      <Footer />
    </PageContainer>
  );
};

export default AssessmentResults;