import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Stack,
  Alert,
  Backdrop,
  CircularProgress,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AssessmentSection from '../components/school-assessment/AssessmentSection';
import AssessmentNavigation from '../components/school-assessment/AssessmentNavigation';
// import ProgressIndicator from '../components/school-assessment/ProgressIndicator';
import BasicInfoForm from '../components/school-assessment/BasicInfoForm';
import { mockAssessmentQuestions } from '../datamock/schoolAssessmentMockData';
import { AssessmentSection as AssessmentSectionEnum, AnswerOption, SameDifferentOption } from '../types/assessmentEnums';
import { AssessmentFormData, AssessmentState, BasicInfoFormData, BasicInfoFormErrors } from '../types/assessmentSchemas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[50]
}));

const HeaderSection = styled(Box)(({  }) => ({
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  padding: '80px 0 60px',
  textAlign: 'center'
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4)
}));

const AssessmentContainer = styled(Box)(({  }) => ({
  minHeight: '60vh',
  position: 'relative'
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textTransform: 'none',
  fontWeight: 500
}));

const initialFormData: AssessmentFormData = {
  [AssessmentSectionEnum.VERBAL_SYNONYMS]: {
    'vs1': AnswerOption.A,
    'vs2': AnswerOption.B,
    'vs3': AnswerOption.A,
  },
  [AssessmentSectionEnum.VERBAL_PROVERBS]: {
    'vp1': AnswerOption.C,
    'vp2': AnswerOption.B,
    'vp3': AnswerOption.D, 
  },
  [AssessmentSectionEnum.NUMERICAL]: {
    'na1': AnswerOption.C,
    'na2': AnswerOption.B,
    'na3': AnswerOption.D, 
  },
  [AssessmentSectionEnum.MECHANICAL]: {
    'ma1': AnswerOption.C,
    'ma2': AnswerOption.B,
    'ma3': AnswerOption.D, 
  },
  [AssessmentSectionEnum.CLERICAL]: {
    'cl1': SameDifferentOption.SAME,
    'cl2': SameDifferentOption.DIFFERENT,
    'cl3': SameDifferentOption.SAME,
  },
  [AssessmentSectionEnum.REASONING]: {
    'ra1': AnswerOption.C,
    'ra2': AnswerOption.B,
    'ra3': AnswerOption.D, 
  }
};

const initialBasicInfoData: BasicInfoFormData = {
  studentName: 'Sarthak',
  currentGrade: '9th Grade',
  currentStream: 'Science',
  subjects: ['Mathematics', 'Software Development','Web Development'],
  academicPerformance: '9.5 GPA',
  interests: ['AI','ML','Blockchain'],
  careerAspirations: 'I want to become a software developer and work on innovative tech solutions that can make a positive impact on society.',
  parentContact: '9871345647',
  additionalInfo: ''
};

const SchoolAssessmentExtended: React.FC = () => {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentStep: 'basic-info',
    currentSection: AssessmentSectionEnum.VERBAL_SYNONYMS,
    answers: initialFormData,
    basicInfoData: initialBasicInfoData,
    basicInfoComplete: false,
    isComplete: false,
    sectionProgress: {
      [AssessmentSectionEnum.VERBAL_SYNONYMS]: false,
      [AssessmentSectionEnum.VERBAL_PROVERBS]: false,
      [AssessmentSectionEnum.NUMERICAL]: false,
      [AssessmentSectionEnum.MECHANICAL]: false,
      [AssessmentSectionEnum.CLERICAL]: false,
      [AssessmentSectionEnum.REASONING]: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [basicInfoErrors, setBasicInfoErrors] = useState<BasicInfoFormErrors>({});

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedBasicInfo = localStorage.getItem('school_assessment_basic_info');
    if (savedBasicInfo) {
      try {
        const parsedData = JSON.parse(savedBasicInfo);
        setAssessmentState(prev => ({
          ...prev,
          basicInfoData: parsedData,
          basicInfoComplete: true
        }));
      } catch (error) {
        console.error('Error parsing saved basic info:', error);
      }
    }
  }, []);

  const sections = [
    AssessmentSectionEnum.VERBAL_SYNONYMS,
    AssessmentSectionEnum.VERBAL_PROVERBS,
    AssessmentSectionEnum.NUMERICAL,
    AssessmentSectionEnum.MECHANICAL,
    AssessmentSectionEnum.CLERICAL,
    AssessmentSectionEnum.REASONING
  ];

  const currentSectionIndex = sections.indexOf(assessmentState.currentSection);
  const isLastSection = currentSectionIndex === sections.length - 1;
  const canGoPrevious = currentSectionIndex > 0;

  // Validation function for basic info
  const validateBasicInfo = (data: BasicInfoFormData): BasicInfoFormErrors => {
    const errors: BasicInfoFormErrors = {};

    if (!data.studentName.trim()) {
      errors.studentName = 'Student name is required';
    }

    if (!data.currentGrade) {
      errors.currentGrade = 'Current grade is required';
    }

    if (!data.currentStream) {
      errors.currentStream = 'Current stream is required';
    }

    if (data.subjects.length === 0) {
      errors.subjects = 'Please select at least one subject';
    }

    if (!data.academicPerformance.trim()) {
      errors.academicPerformance = 'Academic performance description is required';
    }

    if (data.interests.length === 0) {
      errors.interests = 'Please select at least one interest area';
    }

    if (!data.careerAspirations.trim()) {
      errors.careerAspirations = 'Career aspirations are required';
    }

    if (!data.parentContact.trim()) {
      errors.parentContact = 'Parent/Guardian contact is required';
    }

    return errors;
  };

  // Handle basic info form input changes
  const handleBasicInfoChange = useCallback((field: keyof BasicInfoFormData, value: string | string[]) => {
    setAssessmentState(prev => ({
      ...prev,
      basicInfoData: {
        ...prev.basicInfoData,
        [field]: value
      }
    }));

    // Clear error for this field
    // if (basicInfoErrors[field]) {
    //   setBasicInfoErrors(prev => ({
    //     ...prev,
    //     [field]: undefined
    //   }));
    // }
  }, [basicInfoErrors]);

  // Handle basic info form submission
  const handleBasicInfoSubmit = useCallback(() => {
    const errors = validateBasicInfo(assessmentState.basicInfoData);
    
    if (Object.keys(errors).length > 0) {
      setBasicInfoErrors(errors);
      return;
    }

    // Save to localStorage
    //localStorage.setItem('school_assessment_basic_info', JSON.stringify(assessmentState.basicInfoData));

    // Move to assessment step
    setAssessmentState(prev => ({
      ...prev,
      currentStep: 'assessment',
      basicInfoComplete: true
    }));

    setBasicInfoErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [assessmentState.basicInfoData]);

  // Handle back to basic info
  const handleBackToBasicInfo = useCallback(() => {
    setAssessmentState(prev => ({
      ...prev,
      currentStep: 'basic-info'
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Check if current section is complete
  const isCurrentSectionComplete = useCallback(() => {
    const currentQuestions = mockAssessmentQuestions[assessmentState.currentSection];
    const currentAnswers = assessmentState.answers[assessmentState.currentSection];
    
    return currentQuestions.every(question => 
      currentAnswers[question.id] !== undefined
    );
  }, [assessmentState.currentSection, assessmentState.answers]);

  const canGoNext = isCurrentSectionComplete();

  // Update section progress when answers change
  useEffect(() => {
    if (assessmentState.currentStep === 'assessment') {
      const isComplete = isCurrentSectionComplete();
      setAssessmentState(prev => ({
        ...prev,
        sectionProgress: {
          ...prev.sectionProgress,
          [prev.currentSection]: isComplete
        }
      }));
    }
  }, [assessmentState.answers, assessmentState.currentSection, assessmentState.currentStep, isCurrentSectionComplete]);

  const handleAnswerChange = useCallback((questionId: string, answer: AnswerOption | SameDifferentOption) => {
    setAssessmentState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentSection]: {
          ...prev.answers[prev.currentSection],
          [questionId]: answer
        }
      }
    }));
    setValidationError(null);
  }, []);

  const handleNext = useCallback(() => {
    if (!canGoNext) {
      setValidationError('Please answer all questions in this section before proceeding.');
      return;
    }

    if (currentSectionIndex < sections.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentSection: sections[currentSectionIndex + 1]
      }));
      setValidationError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [canGoNext, currentSectionIndex, sections]);

  const handlePrevious = useCallback(() => {
    if (canGoPrevious) {
      setAssessmentState(prev => ({
        ...prev,
        currentSection: sections[currentSectionIndex - 1]
      }));
      setValidationError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [canGoPrevious, currentSectionIndex, sections]);

  const handleSubmit = async () => {
    if (!canGoNext) {
      setValidationError('Please answer all questions in this section before submitting.');
      return;
    }

    // Check if all sections are complete
    const allSectionsComplete = sections.every(section => {
      const questions = mockAssessmentQuestions[section];
      const answers = assessmentState.answers[section];
      return questions.every(question => 
        answers[question.id] !== undefined
      );
    });

    if (!allSectionsComplete) {
      setValidationError('Please complete all sections before submitting the assessment.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine basic info with assessment answers
      await new Promise(resolve => setTimeout(resolve, 5000));

      const combinedData = {
        ...assessmentState.basicInfoData,
        assessmentAnswers: assessmentState.answers,
        assessmentCompleted: true,
        assessmentCompletedAt: new Date().toISOString()
      };

      // Simulate API call for school assessment
      const response = await fetch('https://my-service-prod-1015057250826.us-central1.run.app/api/school-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('School assessment submission response:', responseData);
      
      // Store session ID for results page
      if (responseData.session_id) {
        localStorage.setItem('school_assessment_session_id', responseData.session_id);
        navigate(`/school_assessment_results?session_id=${responseData.session_id}`);
      } else {
        // Navigate without session ID - will use mock data
        navigate('/school_assessment_results');
      }
    } catch (error) {
      console.error('School assessment submission error:', error);
      
      // Navigate to results with mock data on error
      navigate('/school_assessment_results');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <PageContainer>
      <Navigation />
      
      <HeaderSection>
        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            {assessmentState.currentStep === 'basic-info' ? 'Student Information' : 'Aptitude Assessment'}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.2rem',
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            {assessmentState.currentStep === 'basic-info' 
              ? 'Please provide your basic information to get started with the assessment.'
              : 'Complete this comprehensive aptitude test to help us provide personalized academic and career guidance.'
            }
          </Typography>
        </Container>
      </HeaderSection>

      <ContentContainer maxWidth="lg">
        <Stack spacing={4}>
          {/* <ProgressIndicator
            currentStep={assessmentState.currentStep}
            currentSection={assessmentState.currentSection}
            completedSections={completedSections}
            basicInfoComplete={assessmentState.basicInfoComplete}
          /> */}

          {assessmentState.currentStep === 'assessment' && (
            <BackButton
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToBasicInfo}
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            >
              Back to Basic Information
            </BackButton>
          )}

          {validationError && (
            <Alert severity="warning" sx={{ maxWidth: '800px', mx: 'auto' }}>
              {validationError}
            </Alert>
          )}

          {assessmentState.currentStep === 'basic-info' ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <BasicInfoForm
                formData={assessmentState.basicInfoData}
                errors={basicInfoErrors}
                onInputChange={handleBasicInfoChange}
                onSubmit={handleBasicInfoSubmit}
                isSubmitting={false}
              />
            </Box>
          ) : (
            <AssessmentContainer>
              <AssessmentSection
                section={assessmentState.currentSection}
                questions={mockAssessmentQuestions[assessmentState.currentSection]}
                answers={assessmentState.answers[assessmentState.currentSection]}
                onAnswerChange={handleAnswerChange}
              />

              <AssessmentNavigation
                currentSection={assessmentState.currentSection}
                canGoNext={canGoNext}
                canGoPrevious={canGoPrevious}
                isLastSection={isLastSection}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onSubmit={handleSubmit}
              />
            </AssessmentContainer>
          )}
        </Stack>
      </ContentContainer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress color="inherit" />
          <Typography variant="h6">Processing your assessment...</Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: '300px' }}>
            Please wait while we analyze your responses and prepare your personalized results.
          </Typography>
        </Stack>
      </Backdrop>

      <Footer />
    </PageContainer>
  );
};

export default SchoolAssessmentExtended;