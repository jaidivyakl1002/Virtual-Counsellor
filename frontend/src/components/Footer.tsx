import React from 'react';
import { Container, Typography, Stack, Box, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1E293B',
  color: 'white',
  padding: '80px 0 40px'
}));

const FooterSection = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start'
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 400,
  '&:hover': {
    color: 'white',
    textDecoration: 'none'
  },
  transition: 'color 0.3s ease'
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)'
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
    fontSize: '1.2rem'
  }
}));

const Logo = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  marginBottom: '24px',
  '& .MuiSvgIcon-root': {
    color: '#60A5FA',
    fontSize: '2rem'
  }
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Main Footer Content */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
            {/* Logo and Description */}
            <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '300px' } }}>
              <Logo direction="row" spacing={1}>
                <PsychologyOutlinedIcon />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                  Virtual Counsellor
                </Typography>
              </Logo>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                  mb: 3
                }}
              >
                © 2025 Virtual Counsellor. All rights reserved.
              </Typography>
            </Box>

            {/* Footer Links */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{ flex: 2 }}>
              <FooterSection spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  Product
                </Typography>
                <FooterLink href="#">For Students</FooterLink>
                <FooterLink href="#">How It Works</FooterLink>
                <FooterLink href="#">Professionals</FooterLink>
                <FooterLink href="#">Pricing</FooterLink>
              </FooterSection>

              <FooterSection spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  Company
                </Typography>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Press</FooterLink>
              </FooterSection>

              <FooterSection spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  Resources
                </Typography>
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </FooterSection>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Contact Info and Social */}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={3}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Contact Info
            </Typography>
            
            <Stack direction="row" spacing={2}>
              <SocialIcon>
                <XIcon />
              </SocialIcon>
              <SocialIcon>
                <LinkedInIcon />
              </SocialIcon>
              <SocialIcon>
                <FacebookIcon />
              </SocialIcon>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </FooterContainer>
  );
};

export default Footer;