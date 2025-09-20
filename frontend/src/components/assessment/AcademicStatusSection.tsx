import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Stack,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  border: `1px solid ${theme.palette.grey[200]}`
}));

interface AcademicStatus {
  gpa: string;
  yearStatus: string;
  majorSubjects: string;
  extracurriculars: string;
}

interface AcademicStatusSectionProps {
  academicStatus: AcademicStatus;
  onChange: (field: keyof AcademicStatus, value: string) => void;
  errors?: Partial<AcademicStatus>;
}

const AcademicStatusSection: React.FC<AcademicStatusSectionProps> = ({
  academicStatus,
  onChange,
  errors
}) => {
  return (
    <SectionContainer>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Academic & Professional Status
          </Typography>
        </Box>

        <Stack spacing={3}>
          <TextField
            label="GPA"
            placeholder="e.g., 3.8/4.0 or 8.5/10.0"
            value={academicStatus.gpa}
            onChange={(e) => onChange('gpa', e.target.value)}
            error={!!errors?.gpa}
            helperText={errors?.gpa}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="Enter your current GPA or CGPA">
                    <InfoOutlinedIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                  </Tooltip>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <TextField
            label="Current Year/Graduation Year"
            placeholder="e.g., Final Year 2024, 3rd Year, Graduated 2023"
            value={academicStatus.yearStatus}
            onChange={(e) => onChange('yearStatus', e.target.value)}
            error={!!errors?.yearStatus}
            helperText={errors?.yearStatus}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <TextField
            label="Major Subjects/Specializations"
            placeholder="e.g., Computer Science, AI/ML, Data Science, Mechanical Engineering"
            value={academicStatus.majorSubjects}
            onChange={(e) => onChange('majorSubjects', e.target.value)}
            error={!!errors?.majorSubjects}
            helperText={errors?.majorSubjects}
            multiline
            rows={2}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <TextField
            label="Extracurriculars/Projects"
            placeholder="Describe your key projects, internships, competitions, leadership roles, or relevant extracurricular activities"
            value={academicStatus.extracurriculars}
            onChange={(e) => onChange('extracurriculars', e.target.value)}
            error={!!errors?.extracurriculars}
            helperText={errors?.extracurriculars}
            multiline
            rows={4}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />
        </Stack>
      </Stack>
    </SectionContainer>
  );
};

export default AcademicStatusSection;