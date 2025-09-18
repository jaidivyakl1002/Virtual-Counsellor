import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Alert,
  Backdrop,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FileUploadSection from '../components/assessment/FileUploadSection';
import AcademicStatusSection from '../components/assessment/AcademicStatusSection';
import ProfessionalProfilesSection from '../components/assessment/ProfessionalProfilesSection';
import CareerGoalsSection from '../components/assessment/CareerGoalsSection';
import { CollegeAssessmentFormData, FormErrors } from '../types/collegeAssessmentTypes';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[50]
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  padding: '80px 0 60px',
  textAlign: 'center'
}));

const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8)
}));

const StepperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '16px'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '16px 48px',
  fontSize: '1.1rem',
  borderRadius: '16px',
  minWidth: '200px',
  '&:hover': {
    background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(20, 108, 148, 0.3)'
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
    transform: 'none',
    boxShadow: 'none'
  },
  transition: 'all 0.3s ease'
}));

const steps = [
  'Upload Resume',
  'Academic Status',
  'Professional Profiles',
  'Career Goals'
];

const CollegeAssessment: React.FC = () => {
  const [formData, setFormData] = useState<CollegeAssessmentFormData>({
    resume: null,
    academicStatus: {
      gpa: '',
      yearStatus: '',
      majorSubjects: '',
      extracurriculars: ''
    },
    githubProfile: '',
    linkedinProfile: '',
    initialMessage: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validate resume
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    // Validate academic status
    const academicErrors: FormErrors['academicStatus'] = {};
    if (!formData.academicStatus.gpa.trim()) {
      academicErrors.gpa = 'GPA is required';
    }
    if (!formData.academicStatus.yearStatus.trim()) {
      academicErrors.yearStatus = 'Current year/graduation year is required';
    }
    if (!formData.academicStatus.majorSubjects.trim()) {
      academicErrors.majorSubjects = 'Major subjects/specializations are required';
    }
    if (!formData.academicStatus.extracurriculars.trim()) {
      academicErrors.extracurriculars = 'Please describe your extracurriculars/projects';
    }

    if (Object.keys(academicErrors).length > 0) {
      newErrors.academicStatus = academicErrors;
    }

    // Validate initial message
    const wordCount = formData.initialMessage.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 20) {
      newErrors.initialMessage = 'Please provide at least 20 words for better guidance';
    }

    // Validate URLs if provided
    if (formData.githubProfile && !isValidGithubUrl(formData.githubProfile)) {
      newErrors.githubProfile = 'Please enter a valid GitHub username or URL';
    }
    if (formData.linkedinProfile && !isValidLinkedinUrl(formData.linkedinProfile)) {
      newErrors.linkedinProfile = 'Please enter a valid LinkedIn profile URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const isValidGithubUrl = (url: string): boolean => {
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
    return githubRegex.test(url) || usernameRegex.test(url);
  };

  const isValidLinkedinUrl = (url: string): boolean => {
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, resume: file }));
    if (file && errors.resume) {
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  const handleAcademicStatusChange = (field: keyof CollegeAssessmentFormData['academicStatus'], value: string) => {
    setFormData(prev => ({
      ...prev,
      academicStatus: {
        ...prev.academicStatus,
        [field]: value
      }
    }));

    // Clear error for this field
    if (errors.academicStatus?.[field]) {
      setErrors(prev => ({
        ...prev,
        academicStatus: {
          ...prev.academicStatus,
          [field]: undefined
        }
      }));
    }
  };

  const handleGithubChange = (value: string) => {
    setFormData(prev => ({ ...prev, githubProfile: value }));
    if (errors.githubProfile) {
      setErrors(prev => ({ ...prev, githubProfile: undefined }));
    }
  };

  const handleLinkedinChange = (value: string) => {
    setFormData(prev => ({ ...prev, linkedinProfile: value }));
    if (errors.linkedinProfile) {
      setErrors(prev => ({ ...prev, linkedinProfile: undefined }));
    }
  };

  const handleInitialMessageChange = (value: string) => {
    setFormData(prev => ({ ...prev, initialMessage: value }));
    if (errors.initialMessage) {
      setErrors(prev => ({ ...prev, initialMessage: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Assessment submitted:', {
        ...formData,
        userId: 'user_12345',
        sessionId: 'session_67890'
      });
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActiveStepFromFormData = () => {
    if (!formData.resume) return 0;
    if (!formData.academicStatus.gpa || !formData.academicStatus.yearStatus) return 1;
    if (formData.initialMessage.trim().split(/\s+/).filter(word => word.length > 0).length < 20) return 3;
    return 3;
  };

  React.useEffect(() => {
    setActiveStep(getActiveStepFromFormData());
  }, [formData]);

  if (submitSuccess) {
    return (
      <PageContainer>
        <Navigation />
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <Stack spacing={4} alignItems="center">
            <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
              Assessment Submitted Successfully!
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: '600px' }}>
              Thank you for completing your assessment. Our AI counselor will analyze your information and provide personalized career guidance shortly.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => window.location.href = '/'}
              sx={{ mt: 4 }}
            >
              Return to Home
            </Button>
          </Stack>
        </Container>
        <Footer />
      </PageContainer>
    );
  }

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
            College Student Assessment
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
            Tell us about your academic journey and career aspirations so we can provide personalized guidance for your future success.
          </Typography>
        </Container>
      </HeaderSection>

      <FormContainer maxWidth="md">
        <StepperContainer elevation={1}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperContainer>

        <Stack spacing={4}>
          <FileUploadSection
            file={formData.resume}
            onFileChange={handleFileChange}
            error={errors.resume}
          />

          <AcademicStatusSection
            academicStatus={formData.academicStatus}
            onChange={handleAcademicStatusChange}
            errors={errors.academicStatus}
          />

          <ProfessionalProfilesSection
            githubProfile={formData.githubProfile}
            linkedinProfile={formData.linkedinProfile}
            onGithubChange={handleGithubChange}
            onLinkedinChange={handleLinkedinChange}
            errors={{
              githubProfile: errors.githubProfile,
              linkedinProfile: errors.linkedinProfile
            }}
          />

          <CareerGoalsSection
            initialMessage={formData.initialMessage}
            onChange={handleInitialMessageChange}
            error={errors.initialMessage}
          />

          {Object.keys(errors).length > 0 && (
            <Alert severity="error">
              Please fill in all required fields and correct any errors before submitting.
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
            <SubmitButton
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="large"
            >
              {isSubmitting ? 'Submitting Assessment...' : 'Submit Assessment'}
            </SubmitButton>
          </Box>
        </Stack>
      </FormContainer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress color="inherit" />
          <Typography variant="h6">Processing your assessment...</Typography>
        </Stack>
      </Backdrop>

      <Footer />
    </PageContainer>
  );
};

export default CollegeAssessment;