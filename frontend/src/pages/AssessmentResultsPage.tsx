import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AssessmentResults from './AssessmentResults';
import { AssessmentResultsResponse } from '../types/assessmentResultsTypes';
import { createMockAssessmentData } from '../utils/mockAssessmentData';

const AssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [assessmentData, setAssessmentData] = useState<AssessmentResultsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessmentResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to get session ID from URL params or localStorage
        const sessionId = searchParams.get('session_id') || localStorage.getItem('assessment_session_id');
        
        if (!sessionId) {
          // If no session ID, provide mock data for demo purposes
          console.warn('No session ID found, using mock data');
          const mockData = createMockAssessmentData();
          setAssessmentData(mockData);
          setIsLoading(false);
          return;
        }

        // Try to fetch real data from API
        const response = await fetch(`http://localhost:8000/api/status/${sessionId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch assessment results: ${response.status}`);
        }

        const data: AssessmentResultsResponse = await response.json();
        console.log('Fetched assessment data:', data);
        if (!data || !data.success) {
          throw new Error('Invalid assessment data received');
        }

        setAssessmentData(data);
      } catch (err) {
        console.error('Error fetching assessment results:', err);
        
        // Provide mock data as fallback
        console.warn('Using mock data as fallback');
        const mockData = createMockAssessmentData();
        setAssessmentData(mockData);
        // setError('Unable to load live results. Showing demo data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessmentResults();
  }, [searchParams]);

  const handleBackToAssessment = () => {
    navigate('/college_test');
  };

  const handleDownloadReport = (format: 'pdf' | 'json') => {
    console.log(`Downloading report in ${format} format`);
    // Implement download logic here
  };

  const handleShareResults = (platform: 'linkedin' | 'email') => {
    console.log(`Sharing results on ${platform}`);
    // Implement sharing logic here
  };

  const handleSaveResults = (notes?: string) => {
    console.log('Saving results with notes:', notes);
    // Implement save logic here
  };

  const handleActionItemClick = (actionId: string, actionText: string) => {
    console.log('Action item clicked:', actionId, actionText);
    // Implement action tracking logic here
  };

  const handleOpportunityApply = (opportunityId: string, opportunity: any) => {
    console.log('Applying to opportunity:', opportunityId, opportunity);
    // Implement opportunity application logic here
  };

  const handleStartImplementation = () => {
    console.log('Starting implementation');
    // Navigate to implementation page or show implementation guide
  };

  if (!assessmentData) {
    return (
      <AssessmentResults
        assessmentData={{} as AssessmentResultsResponse}
        isLoading={isLoading}
        error={error || 'Failed to load assessment results'}
        onBackToAssessment={handleBackToAssessment}
      />
    );
  }

  return (
    <AssessmentResults
      assessmentData={assessmentData}
      isLoading={isLoading}
      error={error}
      showExportOptions={true}
      enableActionTracking={true}
      onActionItemClick={handleActionItemClick}
      onOpportunityApply={handleOpportunityApply}
      onDownloadReport={handleDownloadReport}
      onShareResults={handleShareResults}
      onSaveResults={handleSaveResults}
      onBackToAssessment={handleBackToAssessment}
      onStartImplementation={handleStartImplementation}
    />
  );
};

export default AssessmentResultsPage;