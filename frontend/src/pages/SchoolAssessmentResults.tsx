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
import TestScoreInterpretationSection from '../components/school-assessment/TestScoreInterpretationSection';
import AcademicStreamAdvisorSection from '../components/school-assessment/AcademicStreamAdvisorSection';
import CareerPathwayExplorerSection from '../components/school-assessment/CareerPathwayExplorerSection';
import EducationalRoadmapSection from '../components/school-assessment/EducationalRoadmapSection';
import CollegeScholarshipSection from '../components/school-assessment/CollegeScholarshipSection';
import ActionItemsSection from '../components/school-assessment/ActionItemsSection';
import ExportControls from '../components/shared/ExportControls';
import ConfidenceIndicator from '../components/shared/ConfidenceIndicator';
import { SchoolAssessmentResultsProps } from '../types/schoolAssessmentTypes';
import { formatProcessingTime, formatDate } from '../utils/assessmentFormatters';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

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
    minHeight: 48,
    fontSize: '0.875rem',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
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
      id={`school-results-tabpanel-${index}`}
      aria-labelledby={`school-results-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const SchoolAssessmentResults: React.FC<SchoolAssessmentResultsProps> = ({
  assessmentData,
  showExportOptions = true,
  enableActionTracking = true,
  onActionItemClick,
  onStreamSelect,
  onCareerExplore,
  onCollegeBookmark,
  onScholarshipSave,
  onDownloadReport,
  onShareResults,
  onSaveResults,
  onStartImplementation,
  isLoading = false,
  error
}) => {
  // Debug logging
  console.log('SchoolAssessmentResults render:', {
    assessmentData,
    isLoading,
    error,
    hasData: !!assessmentData,
    success: assessmentData?.success,
    dataStructure: assessmentData ? Object.keys(assessmentData) : 'no data'
  });
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
            <Typography variant="h6">Loading your school assessment results...</Typography>
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
            Failed to load school assessment results. Please try again.
          </Alert>
        </Container>
        <Footer />
      </PageContainer>
    );
  }

  const data = assessmentData.data;
  const outputs = data?.results?.outputs;

  // Safety check for required data
  if (!data || !outputs || !outputs.fleet_summary) {
    return (
      <PageContainer>
        <Navigation />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            Assessment data is incomplete. Please try again.
          </Alert>
        </Container>
        <Footer />
      </PageContainer>
    );
  }

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
                School Assessment Results
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: '1.2rem',
                  color: 'text.secondary',
                  mb: 2
                }}
              >
                Your Personalized Academic & Career Analysis
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Session: {data?.session_id || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed: {data?.updated_at ? formatDate(data.updated_at) : 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Processing Time: {outputs?.fleet_summary?.processing_time ? formatProcessingTime(outputs.fleet_summary.processing_time) : 'N/A'}
                </Typography>
              </Stack>
            </Box>
            
            <Stack alignItems="center" spacing={2}>
              <ConfidenceIndicator 
                confidence={outputs?.fleet_summary?.confidence || 0} 
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
          aria-label="school assessment results tabs"
        >
          <Tab 
            label="Test Score Interpretation" 
            icon={<SchoolOutlinedIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Academic Stream Advisor" 
            icon={<CallSplitOutlinedIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Career Pathway Explorer" 
            icon={<TrendingUpOutlinedIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Educational Roadmap" 
            icon={<EventNoteOutlinedIcon />}
            iconPosition="start"
          />
          <Tab 
            label="College & Scholarships" 
            icon={<AccountBalanceOutlinedIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Action Items" 
            icon={<ChecklistOutlinedIcon />}
            iconPosition="start"
          />
        </StyledTabs>

        <TabPanel value={activeTab} index={0}>
          {outputs?.agent_outputs?.test_score_interpreter ? (
            <TestScoreInterpretationSection
              data={outputs.agent_outputs.test_score_interpreter.data}
              confidence={outputs.agent_outputs.test_score_interpreter.confidence}
            />
          ) : (
            <Alert severity="warning">Test score interpretation data is not available.</Alert>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {outputs?.agent_outputs?.academic_stream_advisor ? (
            <AcademicStreamAdvisorSection
              data={outputs.agent_outputs.academic_stream_advisor.data}
              confidence={outputs.agent_outputs.academic_stream_advisor.confidence}
              onStreamSelect={onStreamSelect}
            />
          ) : (
            <Alert severity="warning">Academic stream advisor data is not available.</Alert>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {outputs?.agent_outputs?.career_pathway_explorer ? (
            <CareerPathwayExplorerSection
              data={outputs.agent_outputs.career_pathway_explorer.data}
              confidence={outputs.agent_outputs.career_pathway_explorer.confidence}
              onCareerExplore={onCareerExplore}
            />
          ) : (
            <Alert severity="warning">Career pathway explorer data is not available.</Alert>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {outputs?.agent_outputs?.educational_roadmap_planner ? (
            <EducationalRoadmapSection
              data={outputs.agent_outputs.educational_roadmap_planner.data}
              confidence={outputs.agent_outputs.educational_roadmap_planner.confidence}
            />
          ) : (
            <Alert severity="warning">Educational roadmap data is not available.</Alert>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          {outputs?.agent_outputs?.college_scholarship_navigator ? (
            <CollegeScholarshipSection
              data={outputs.agent_outputs.college_scholarship_navigator.data}
              confidence={outputs.agent_outputs.college_scholarship_navigator.confidence}
              onCollegeBookmark={onCollegeBookmark}
              onScholarshipSave={onScholarshipSave}
            />
          ) : (
            <Alert severity="warning">College and scholarship data is not available.</Alert>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          {outputs?.fleet_summary ? (
            <ActionItemsSection
              fleetSummary={outputs.fleet_summary}
              onActionItemClick={enableActionTracking ? onActionItemClick : undefined}
              onStartImplementation={onStartImplementation}
            />
          ) : (
            <Alert severity="warning">Action items data is not available.</Alert>
          )}
        </TabPanel>
      </ResultsContainer>

        <Footer />
      </PageContainer>
    
  );
};

export default SchoolAssessmentResults;