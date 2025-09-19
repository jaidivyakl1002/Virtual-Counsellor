import React from 'react';
import { Card, CardContent, Typography, Stack, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(20, 108, 148, 0.1)',
  background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 24px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  minHeight: '48px',
  '&.primary': {
    background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #0F4C75 0%, #146C94 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(20, 108, 148, 0.3)'
    }
  },
  '&.secondary': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(20, 108, 148, 0.3)'
    }
  },
  transition: 'all 0.3s ease'
}));

interface ExportOptionsCardProps {
  onDownloadPDF?: () => void;
  onShareResults?: () => void;
  isDownloading?: boolean;
  isSharing?: boolean;
}

const ExportOptionsCard: React.FC<ExportOptionsCardProps> = ({
  onDownloadPDF,
  onShareResults,
  isDownloading = false,
  isSharing = false
}) => {
  return (
    <StyledCard>
      <CardContent className="p-8">
        <Typography variant="h5" className="font-bold text-text-primary mb-2">
          Export Options
        </Typography>
        
        <Typography variant="body2" className="text-text-secondary mb-6">
          Save your assessment results for future reference or share with mentors
        </Typography>

        <Stack spacing={3}>
          <ActionButton
            className="primary"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={onDownloadPDF}
            disabled={isDownloading}
            fullWidth
          >
            {isDownloading ? 'Generating PDF...' : 'Download PDF Report'}
          </ActionButton>

          <ActionButton
            className="secondary"
            startIcon={<ShareOutlinedIcon />}
            onClick={onShareResults}
            disabled={isSharing}
            fullWidth
          >
            {isSharing ? 'Sharing...' : 'Share Results'}
          </ActionButton>
        </Stack>

        <Box className="mt-6 p-4 bg-white/60 rounded-xl">
          <Typography variant="body2" className="text-text-secondary text-center">
            💡 <strong>Tip:</strong> Save your results to track your progress over time
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ExportOptionsCard;