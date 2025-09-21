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
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

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

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  border: '1px solid',
  borderColor: theme.palette.divider
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

interface SchoolAssessmentFormData {
  studentName: string;
  currentGrade: string;
  currentStream: string;
  subjects: string[];
  academicPerformance: string;
  interests: string[];
  careerAspirations: string;
  parentContact: string;
  additionalInfo: string;
}

const gradeOptions = ['9th Grade', '10th Grade', '11th Grade', '12th Grade'];
const streamOptions = ['Science', 'Commerce', 'Arts', 'Not Decided'];
const subjectOptions = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 
  'Hindi', 'Social Studies', 'Computer Science', 'Economics', 
  'Accountancy', 'Business Studies', 'History', 'Geography', 
  'Political Science', 'Psychology', 'Physical Education'
];
const interestOptions = [
  'Science & Technology', 'Medicine & Healthcare', 'Engineering', 
  'Business & Finance', 'Arts & Design', 'Sports', 'Music', 
  'Literature', 'Social Work', 'Teaching', 'Research', 'Entrepreneurship'
];

const SchoolAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SchoolAssessmentFormData>({
    studentName: '',
    currentGrade: '',
    currentStream: '',
    subjects: [],
    academicPerformance: '',
    interests: [],
    careerAspirations: '',
    parentContact: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Partial<SchoolAssessmentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<SchoolAssessmentFormData> = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    if (!formData.currentGrade) {
      newErrors.currentGrade = 'Current grade is required';
    }
    if (!formData.currentStream) {
      newErrors.currentStream = 'Current stream is required';
    }
    if (formData.subjects.length === 0) {
      newErrors.subjects = 'Please select at least one subject';
    }
    if (!formData.academicPerformance.trim()) {
      newErrors.academicPerformance = 'Academic performance is required';
    }
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest area';
    }
    if (!formData.careerAspirations.trim()) {
      newErrors.careerAspirations = 'Career aspirations are required';
    }
    if (!formData.parentContact.trim()) {
      newErrors.parentContact = 'Parent contact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (field: keyof SchoolAssessmentFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call for school assessment
      const response = await fetch('http://localhost:8000/api/school-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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
            School Student Assessment
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
            Help us understand your academic journey and interests so we can provide personalized guidance for your future academic and career path.
          </Typography>
        </Container>
      </HeaderSection>

      <FormContainer maxWidth="md">
        <Stack spacing={4}>
          {/* Basic Information */}
          <FormSection elevation={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
              Basic Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Student Name"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                error={!!errors.studentName}
                helperText={errors.studentName}
                required
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth required error={!!errors.currentGrade}>
                  <InputLabel>Current Grade</InputLabel>
                  <Select
                    value={formData.currentGrade}
                    onChange={(e) => handleInputChange('currentGrade', e.target.value)}
                    label="Current Grade"
                  >
                    {gradeOptions.map((grade) => (
                      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required error={!!errors.currentStream}>
                  <InputLabel>Current Stream</InputLabel>
                  <Select
                    value={formData.currentStream}
                    onChange={(e) => handleInputChange('currentStream', e.target.value)}
                    label="Current Stream"
                  >
                    {streamOptions.map((stream) => (
                      <MenuItem key={stream} value={stream}>{stream}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </FormSection>

          {/* Academic Details */}
          <FormSection elevation={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
              Academic Details
            </Typography>
            <Stack spacing={3}>
              <FormControl fullWidth required error={!!errors.subjects}>
                <InputLabel>Subjects</InputLabel>
                <Select
                  multiple
                  value={formData.subjects}
                  onChange={(e) => handleInputChange('subjects', e.target.value as string[])}
                  label="Subjects"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {subjectOptions.map((subject) => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Academic Performance"
                placeholder="Describe your current academic performance (e.g., percentage, grades, strengths, challenges)"
                value={formData.academicPerformance}
                onChange={(e) => handleInputChange('academicPerformance', e.target.value)}
                error={!!errors.academicPerformance}
                helperText={errors.academicPerformance}
                multiline
                rows={3}
                required
              />
            </Stack>
          </FormSection>

          {/* Interests & Aspirations */}
          <FormSection elevation={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
              Interests & Career Aspirations
            </Typography>
            <Stack spacing={3}>
              <FormControl fullWidth required error={!!errors.interests}>
                <InputLabel>Interest Areas</InputLabel>
                <Select
                  multiple
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value as string[])}
                  label="Interest Areas"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" color="primary" />
                      ))}
                    </Box>
                  )}
                >
                  {interestOptions.map((interest) => (
                    <MenuItem key={interest} value={interest}>{interest}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Career Aspirations"
                placeholder="What career or field are you interested in pursuing? What are your goals after completing school?"
                value={formData.careerAspirations}
                onChange={(e) => handleInputChange('careerAspirations', e.target.value)}
                error={!!errors.careerAspirations}
                helperText={errors.careerAspirations}
                multiline
                rows={4}
                required
              />
            </Stack>
          </FormSection>

          {/* Additional Information */}
          <FormSection elevation={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
              Additional Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Parent/Guardian Contact"
                placeholder="Email or phone number for parent/guardian"
                value={formData.parentContact}
                onChange={(e) => handleInputChange('parentContact', e.target.value)}
                error={!!errors.parentContact}
                helperText={errors.parentContact}
                required
              />
              <TextField
                fullWidth
                label="Additional Information"
                placeholder="Any additional information about hobbies, achievements, challenges, or specific questions you have about your future academic path"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                multiline
                rows={3}
              />
            </Stack>
          </FormSection>

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
          <Typography variant="h6">Processing your school assessment...</Typography>
        </Stack>
      </Backdrop>

      <Footer />
    </PageContainer>
  );
};

export default SchoolAssessment;