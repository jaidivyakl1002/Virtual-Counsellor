import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Stack,
  InputAdornment,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  border: `1px solid ${theme.palette.grey[200]}`
}));

interface ProfessionalProfilesSectionProps {
  githubProfile: string;
  linkedinProfile: string;
  onGithubChange: (value: string) => void;
  onLinkedinChange: (value: string) => void;
  errors?: {
    githubProfile?: string;
    linkedinProfile?: string;
  };
}

const ProfessionalProfilesSection: React.FC<ProfessionalProfilesSectionProps> = ({
  githubProfile,
  linkedinProfile,
  onGithubChange,
  onLinkedinChange,
  errors
}) => {
  const validateGithubUrl = (url: string): boolean => {
    if (!url) return true; // Optional field
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
    return githubRegex.test(url) || usernameRegex.test(url);
  };

  const validateLinkedinUrl = (url: string): boolean => {
    if (!url) return true; // Optional field
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinRegex.test(url);
  };

  return (
    <SectionContainer>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinkOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Professional Profiles
          </Typography>
          <Chip 
            label="Optional" 
            size="small" 
            variant="outlined" 
            sx={{ ml: 1, fontSize: '0.75rem' }}
          />
        </Box>

        <Stack spacing={3}>
          <TextField
            label="GitHub Profile"
            placeholder="Enter your GitHub username or URL (e.g., john-doe or github.com/john-doe)"
            value={githubProfile}
            onChange={(e) => onGithubChange(e.target.value)}
            error={!!errors?.githubProfile || (githubProfile && !validateGithubUrl(githubProfile))}
            helperText={
              errors?.githubProfile || 
              (githubProfile && !validateGithubUrl(githubProfile) 
                ? "Please enter a valid GitHub username or URL" 
                : "Your GitHub profile showcases your coding projects and contributions")
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndOutlinedIcon sx={{ color: 'text.secondary' }} />
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
            label="LinkedIn Profile"
            placeholder="Enter your LinkedIn profile URL (e.g., linkedin.com/in/john-doe)"
            value={linkedinProfile}
            onChange={(e) => onLinkedinChange(e.target.value)}
            error={!!errors?.linkedinProfile || (linkedinProfile && !validateLinkedinUrl(linkedinProfile))}
            helperText={
              errors?.linkedinProfile || 
              (linkedinProfile && !validateLinkedinUrl(linkedinProfile) 
                ? "Please enter a valid LinkedIn profile URL" 
                : "Your LinkedIn profile shows your professional network and experience")
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndOutlinedIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
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

export default ProfessionalProfilesSection;