import React from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Stack,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  border: `1px solid ${theme.palette.grey[200]}`
}));

const ExampleAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main + '08',
  borderColor: theme.palette.primary.main + '20',
  '& .MuiAlert-icon': {
    color: theme.palette.primary.main
  }
}));

interface CareerGoalsSectionProps {
  initialMessage: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const CareerGoalsSection: React.FC<CareerGoalsSectionProps> = ({
  initialMessage,
  onChange,
  error,
  required = true
}) => {
  const exampleText = `I am a final year B.Tech student specializing in AI/ML. I want to transition into a data scientist role at top tech companies. Can you help me identify skill gaps and provide a learning roadmap?`;

  const wordCount = initialMessage.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minWords = 20;

  return (
    <SectionContainer>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Career Goals & Initial Message {required && <span style={{ color: 'red' }}>*</span>}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tell us about your current situation, desired career path, and specific questions. 
          Be as detailed as possible to get the most personalized guidance.
        </Typography>

        <ExampleAlert severity="info" variant="outlined">
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Example:
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            {exampleText}
          </Typography>
        </ExampleAlert>

        <TextField
          label="Describe your career goals and questions"
          placeholder="Share your current academic status, target career path, specific companies or roles you're interested in, and any particular challenges you're facing..."
          value={initialMessage}
          onChange={(e) => onChange(e.target.value)}
          error={!!error || (required && wordCount < minWords)}
          helperText={
            error || 
            (required && wordCount < minWords 
              ? `Please provide at least ${minWords} words for better guidance (current: ${wordCount})` 
              : `${wordCount} words - Great! The more details you provide, the better we can help you.`)
          }
          multiline
          rows={8}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px'
            }
          }}
        />
      </Stack>
    </SectionContainer>
  );
};

export default CareerGoalsSection;