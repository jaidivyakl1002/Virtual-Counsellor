import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AssessmentQuestion as AssessmentQuestionType } from '../../types/assessmentSchemas';
import { AnswerOption, SameDifferentOption, QuestionType } from '../../types/assessmentEnums';

const QuestionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)'
  }
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  fontFamily: '"Space Grotesk", sans-serif'
}));

const OptionLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: theme.palette.text.primary,
  fontWeight: 500
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main
  }
}));

interface AssessmentQuestionProps {
  question: AssessmentQuestionType;
  selectedAnswer?: AnswerOption | SameDifferentOption;
  onAnswerChange: (answer: AnswerOption | SameDifferentOption) => void;
  questionNumber: number;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerChange,
  questionNumber
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(event.target.value as AnswerOption | SameDifferentOption);
  };

  return (
    <QuestionContainer elevation={0}>
      <QuestionText variant="h6">
        {questionNumber}. {question.question}
      </QuestionText>
      
      <RadioGroup
        value={selectedAnswer || ''}
        onChange={handleChange}
        name={`question-${question.id}`}
      >
        {question.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<StyledRadio />}
            label={
              <OptionLabel>
                {option.value}. {option.label}
              </OptionLabel>
            }
            sx={{ 
              mb: 1,
              '& .MuiFormControlLabel-label': {
                flex: 1
              }
            }}
          />
        ))}
      </RadioGroup>
    </QuestionContainer>
  );
};

export default AssessmentQuestion;