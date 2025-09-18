import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AssessmentModal from './AssessmentModal';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  color: theme.palette.text.primary
}));

const Logo = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  cursor: 'pointer',
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '2rem'
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  padding: '8px 16px',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: 'rgba(30, 58, 138, 0.08)',
    color: theme.palette.primary.main
  },
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(30, 58, 138, 0.08)'
  }
}));

const LogoLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit'
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '10px 24px',
  borderRadius: '12px',
  '&:hover': {
    background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)'
  },
  transition: 'all 0.3s ease'
}));

const Navigation: React.FC = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartAssessment = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <LogoLink to="/">
            <Logo direction="row" spacing={1}>
              <PsychologyOutlinedIcon />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Virtual Counsellor
              </Typography>
            </Logo>
          </LogoLink>
          
          <Stack direction="row" spacing={4} alignItems="center">
            <NavButton 
              component={Link} 
              to="/school"
              className={location.pathname === '/school' ? 'active' : ''}
            >
              For Students
            </NavButton>
            <NavButton 
              component={Link} 
              to="/college"
              className={location.pathname === '/college' ? 'active' : ''}
            >
              For College
            </NavButton>
            <NavButton 
              component={Link} 
              to="/professional"
              className={location.pathname === '/professional' ? 'active' : ''}
            >
              For Professionals
            </NavButton>
            <CTAButton onClick={handleStartAssessment}>
              Start Your Assessment
            </CTAButton>
          </Stack>
        </Toolbar>
      </Container>
      
      <AssessmentModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
      />
    </StyledAppBar>
  );
};

export default Navigation;