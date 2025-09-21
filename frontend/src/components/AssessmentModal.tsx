import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { useNavigate } from 'react-router-dom';

const StyledDialog = styled(Dialog)(({  }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '24px',
    padding: 0,
    maxWidth: '600px',
    width: '90%',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    backdropFilter: 'blur(8px)'
  }
}));

const ModalHeader = styled(Box)(({  }) => ({
  position: 'relative',
  padding: '32px 32px 24px',
  textAlign: 'center',
  background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  color: theme.palette.grey[500],
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: theme.palette.grey[700]
  }
}));

const VerticalOption = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: '16px',
  border: '2px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.15)',
    background: 'rgba(255, 255, 255, 0.95)'
  },
  '&.selected': {
    borderColor: theme.palette.primary.main,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.15)'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  marginBottom: '16px',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem'
  }
}));

const NextButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '16px 48px',
  borderRadius: '16px',
  fontSize: '1.1rem',
  minWidth: '160px',
  '&:hover': {
    background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)'
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
    transform: 'none',
    boxShadow: 'none'
  },
  transition: 'all 0.3s ease'
}));

interface VerticalOptionData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  route: string;
}

interface AssessmentModalProps {
  open: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ open, onClose }) => {
  const [selectedVertical, setSelectedVertical] = useState<string>('');
  const navigate = useNavigate();

  const verticalOptions: VerticalOptionData[] = [
    {
      id: 'school',
      title: "I'm a High School Student",
      subtitle: 'Choosing My Stream',
      icon: <SchoolOutlinedIcon />,
      route: '/school_test'
    },
    {
      id: 'college',
      title: "I'm a University Student",
      subtitle: 'Considering a Skill Upgrade',
      icon: <AccountBalanceOutlinedIcon />,
      route: '/college_test'
    },
    {
      id: 'professional',
      title: "I'm a Professional",
      subtitle: 'Looking for Career Growth',
      icon: <BusinessCenterOutlinedIcon />,
      route: '/professional_test'
    }
  ];

  const handleNext = () => {
    const selectedOption = verticalOptions.find(option => option.id === selectedVertical);
    if (selectedOption) {
      onClose();
      navigate(selectedOption.route);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      aria-labelledby="assessment-modal-title"
    >
      <DialogContent sx={{ p: 0 }}>
        <ModalHeader>
          <CloseButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </CloseButton>
          <Typography
            id="assessment-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Ready to Unlock Your Potential?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.1rem'
            }}
          >
            Choose your current stage to get personalized guidance
          </Typography>
        </ModalHeader>

        <Box sx={{ p: '32px' }}>
          <Stack spacing={3} sx={{ mb: 4 }}>
            {verticalOptions.map((option) => (
              <VerticalOption
                key={option.id}
                className={selectedVertical === option.id ? 'selected' : ''}
                onClick={() => setSelectedVertical(option.id)}
                elevation={0}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <IconWrapper>
                    {option.icon}
                  </IconWrapper>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem'
                      }}
                    >
                      {option.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </VerticalOption>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <NextButton
              onClick={handleNext}
              disabled={!selectedVertical}
              size="large"
            >
              Next
            </NextButton>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default AssessmentModal;