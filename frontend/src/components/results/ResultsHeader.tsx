import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StudentProfile } from '../../types/assessmentResultsTypes';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E3F2FD 0%, #E0F7FA 100%)',
  padding: '100px 0 60px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(20, 108, 148, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none'
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  padding: '20px',
  borderRadius: '50%',
  backgroundColor: 'rgba(20, 108, 148, 0.1)',
  marginBottom: '24px',
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
    color: theme.palette.primary.main
  }
}));

interface ResultsHeaderProps {
  studentProfile: StudentProfile;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ studentProfile }) => {
  return (
    <HeaderSection>
      <Container maxWidth="md">
        <ContentWrapper>
          <IconWrapper>
            <SchoolOutlinedIcon />
          </IconWrapper>
          
          <Typography 
            variant="h1" 
            className="text-4xl md:text-5xl font-bold text-primary-main mb-4"
          >
            Assessment Results
          </Typography>
          
          <Typography 
            variant="h4" 
            className="text-xl md:text-2xl text-text-secondary mb-6 max-w-2xl mx-auto"
          >
            Your Personalized Career Guidance
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
            className="mt-8"
          >
            <Box className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
              <Typography variant="body2" className="text-text-secondary">
                Student
              </Typography>
              <Typography variant="h6" className="font-semibold text-text-primary">
                {studentProfile.name}
              </Typography>
            </Box>
            
            <Box className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
              <Typography variant="body2" className="text-text-secondary">
                Major
              </Typography>
              <Typography variant="h6" className="font-semibold text-text-primary">
                {studentProfile.major}
              </Typography>
            </Box>
            
            <Box className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
              <Typography variant="body2" className="text-text-secondary">
                GPA
              </Typography>
              <Typography variant="h6" className="font-semibold text-text-primary">
                {studentProfile.gpa}
              </Typography>
            </Box>
          </Stack>
          
          <Typography 
            variant="body1" 
            className="text-text-secondary mt-6 max-w-2xl mx-auto"
          >
            Based on your assessment, here's your tailored career roadmap
          </Typography>
        </ContentWrapper>
      </Container>
    </HeaderSection>
  );
};

export default ResultsHeader;