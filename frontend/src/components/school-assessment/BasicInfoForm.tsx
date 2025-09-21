import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Stack,
  Alert,
  Button,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BasicInfoFormData, BasicInfoFormErrors } from '../../types/assessmentSchemas';

const FormContainer = styled(Container)(({ theme }) => ({
  maxWidth: '800px',
  padding: theme.spacing(4),
  margin: '0 auto'
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.3s ease'
}));

interface BasicInfoFormProps {
  formData: BasicInfoFormData;
  errors: BasicInfoFormErrors;
  onInputChange: (field: keyof BasicInfoFormData, value: string | string[]) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

// Form options
const gradeOptions = [
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade'
];

const streamOptions = [
  'Science',
  'Commerce', 
  'Arts/Humanities',
  'Vocational',
  'Other'
];

const subjectOptions = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'History',
  'Geography',
  'Political Science',
  'Economics',
  'Accountancy',
  'Business Studies',
  'Computer Science',
  'Psychology',
  'Sociology',
  'Philosophy',
  'Physical Education',
  'Fine Arts',
  'Music',
  'Other'
];

const interestOptions = [
  'Science & Technology',
  'Mathematics',
  'Literature & Writing',
  'Arts & Design',
  'Music & Performing Arts',
  'Sports & Fitness',
  'Business & Entrepreneurship',
  'Social Sciences',
  'Healthcare & Medicine',
  'Engineering',
  'Teaching & Education',
  'Law & Legal Studies',
  'Environment & Nature',
  'Travel & Culture',
  'Media & Communication',
  'Computer Programming',
  'Research & Analysis',
  'Public Service',
  'Other'
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  formData,
  errors,
  onInputChange,
  onSubmit,
  isSubmitting
}) => {
  const handleInputChange = (field: keyof BasicInfoFormData, value: string | string[]) => {
    onInputChange(field, value);
  };

  return (
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
                {errors.currentGrade && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.currentGrade}
                  </Typography>
                )}
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
                {errors.currentStream && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.currentStream}
                  </Typography>
                )}
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
              {errors.subjects && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.subjects}
                </Typography>
              )}
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
              {errors.interests && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.interests}
                </Typography>
              )}
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
            Please fill in all required fields and correct any errors before proceeding.
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <SubmitButton
            onClick={onSubmit}
            disabled={isSubmitting}
            size="large"
            variant="contained"
          >
            {isSubmitting ? 'Saving Information...' : 'Continue to Assessment'}
          </SubmitButton>
        </Box>
      </Stack>
    </FormContainer>
  );
};

export default BasicInfoForm;