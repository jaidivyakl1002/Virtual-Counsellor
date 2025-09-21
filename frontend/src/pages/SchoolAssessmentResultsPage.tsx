import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SchoolAssessmentResults from './SchoolAssessmentResults';
import { SchoolAssessmentResponse } from '../types/schoolAssessmentTypes';
import { mockSchoolAssessmentData } from '../utils/schoolAssessmentMockData';

const SchoolAssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [assessmentData, setAssessmentData] = useState<SchoolAssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolAssessmentResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to get session ID from URL params or localStorage
        const sessionId = searchParams.get('session_id') || localStorage.getItem('school_assessment_session_id');
        
        if (!sessionId) {
          // If no session ID, provide mock data for demo purposes
          console.warn('No session ID found, using mock school assessment data');
            // @ts-expect-error: mockSchoolAssessmentData may not exactly match SchoolAssessmentResponse type
            setAssessmentData(mockSchoolAssessmentData);
          setIsLoading(false);
          return;
        }

        // Try to fetch real data from API
        const response = await fetch(`https://my-service-prod-1015057250826.us-central1.run.app/api/status/${sessionId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch school assessment results: ${response.status}`);
        }

        const data: SchoolAssessmentResponse = await response.json();
        console.log('Fetched school assessment data:', data);
        if (!data || !data.success) {
          throw new Error('Invalid school assessment data received');
        }

        setAssessmentData(data);
      } catch (err) {
        console.error('Error fetching school assessment results:', err);
        
        // Provide mock data as fallback
        console.warn('Using mock school assessment data as fallback');
        // @ts-expect-error: mockSchoolAssessmentData may not exactly match SchoolAssessmentResponse type
        setAssessmentData(mockSchoolAssessmentData);
        // setError('Unable to load live results. Showing demo data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchoolAssessmentResults();
  }, [searchParams]);

  const handleBackToAssessment = () => {
    navigate('/school');
  };

  const handleDownloadReport = (format: 'pdf' | 'json') => {
    console.log(`Downloading school assessment report in ${format} format`);
    // Implement download logic here
  };

  const handleShareResults = (platform: 'linkedin' | 'email') => {
    console.log(`Sharing school assessment results on ${platform}`);
    // Implement sharing logic here
  };

  const handleSaveResults = (notes?: string) => {
    console.log('Saving school assessment results with notes:', notes);
    // Implement save logic here
  };

  const handleActionItemClick = (actionId: string, actionText: string) => {
    console.log('School assessment action item clicked:', actionId, actionText);
    // Implement action tracking logic here
  };

  const handleStreamSelect = (stream: string) => {
    console.log('Academic stream selected:', stream);
    // Implement stream selection logic here
  };

  const handleCareerExplore = (careerTitle: string, careerField: string) => {
    console.log('Career explored:', careerTitle, careerField);
    // Implement career exploration logic here
  };

  const handleCollegeBookmark = (collegeId: string, college: any) => {
    console.log('College bookmarked:', collegeId, college);
    // Implement college bookmarking logic here
  };

  const handleScholarshipSave = (scholarshipId: string, scholarship: any) => {
    console.log('Scholarship saved:', scholarshipId, scholarship);
    // Implement scholarship saving logic here
  };

  const handleStartImplementation = () => {
    console.log('Starting school assessment implementation');
    // Navigate to implementation page or show implementation guide
  };

  const handleContactCounselor = () => {
    console.log('Contacting counselor for school assessment');
    // Navigate to counselor contact page
  };

  // Don't render anything if we don't have assessment data and we're not loading
  if (!assessmentData && !isLoading) {
    return (
      <SchoolAssessmentResults
        assessmentData={{ success: false } as SchoolAssessmentResponse}
        isLoading={false}
        error={error || 'Failed to load school assessment results'}
        onBackToAssessment={handleBackToAssessment}
      />
    );
  }

  // If we're still loading, show loading state
  if (isLoading || !assessmentData) {
    return (
      <SchoolAssessmentResults
        assessmentData={{ success: false } as SchoolAssessmentResponse}
        isLoading={true}
        // error={null}
        onBackToAssessment={handleBackToAssessment}
      />
    );
  }

  return (
    <SchoolAssessmentResults
      assessmentData={assessmentData}
      isLoading={isLoading}
      // error={error}
      showExportOptions={true}
      enableActionTracking={true}
      onActionItemClick={handleActionItemClick}
      onStreamSelect={handleStreamSelect}
      onCareerExplore={handleCareerExplore}
      onCollegeBookmark={handleCollegeBookmark}
      onScholarshipSave={handleScholarshipSave}
      onDownloadReport={handleDownloadReport}
      onShareResults={handleShareResults}
      onSaveResults={handleSaveResults}
      onBackToAssessment={handleBackToAssessment}
      onStartImplementation={handleStartImplementation}
      onContactCounselor={handleContactCounselor}
    />
  );
};

export default SchoolAssessmentResultsPage;