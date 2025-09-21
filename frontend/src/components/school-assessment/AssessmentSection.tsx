import React from 'react';
import {
  Box,
  Typography,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AssessmentQuestion from './AssessmentQuestion';
import { QuestionSectionProps } from '../../types/assessmentSchemas';
import { AssessmentSection as AssessmentSectionEnum } from '../../types/assessmentEnums';
import { AnswerOption, SameDifferentOption } from '../../types/assessmentEnums';

const SectionContainer = styled(Box)(({  }) => ({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto'
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  borderRadius: '20px',
  border: '1px solid rgba(102, 126, 234, 0.2)'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.75rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1)
}));

const InstructionText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  lineHeight: 1.6
}));

const getSectionTitle = (section: AssessmentSectionEnum): string => {
  switch (section) {
    case AssessmentSectionEnum.VERBAL_SYNONYMS:
      return 'Verbal Ability (VA) - Part I: Synonyms';
    case AssessmentSectionEnum.VERBAL_PROVERBS:
      return 'Verbal Ability (VA) - Part II: Proverbs';
    case AssessmentSectionEnum.NUMERICAL:
      return 'Numerical Ability (NA)';
    case AssessmentSectionEnum.MECHANICAL:
      return 'Mechanical Aptitude (MA)';
    case AssessmentSectionEnum.CLERICAL:
      return 'Clerical Ability (CL)';
    case AssessmentSectionEnum.REASONING:
      return 'Reasoning Ability (RA)';
    default:
      return 'Assessment Section';
  }
};

const getSectionInstructions = (section: AssessmentSectionEnum): string => {
  switch (section) {
    case AssessmentSectionEnum.VERBAL_SYNONYMS:
      return 'Instructions: Find the one word that means the same thing as the word in capitals.';
    case AssessmentSectionEnum.VERBAL_PROVERBS:
      return 'Instructions: From the five sayings, find the one that means the same thing as the saying in capital letters.';
    case AssessmentSectionEnum.NUMERICAL:
      return 'Instructions: Choose the correct answer for the number problem.';
    case AssessmentSectionEnum.MECHANICAL:
      return 'Instructions: Answer questions about mechanical facts and principles.';
    case AssessmentSectionEnum.CLERICAL:
      return 'Instructions: For each pair, determine if they are exactly the same (S) or different (D).';
    case AssessmentSectionEnum.REASONING:
      return 'Instructions: Four of the five sets of letters follow a certain rule. Mark the one set that does not follow the rule.';
    default:
      return 'Instructions: Answer the following questions.';
  }
};

const AssessmentSection: React.FC<QuestionSectionProps> = ({
  section,
  questions,
  answers,
  onAnswerChange
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle variant="h4">
          {getSectionTitle(section)}
        </SectionTitle>
        <InstructionText>
          {getSectionInstructions(section)}
        </InstructionText>
      </SectionHeader>

      <Stack spacing={2}>
        {questions.map((question, index) => (
          <AssessmentQuestion
            key={question.id}
            question={question}
            selectedAnswer={answers[question.id] as AnswerOption | SameDifferentOption}
            onAnswerChange={(answer) => onAnswerChange(question.id, answer)}
            questionNumber={index + 1}
          />
        ))}
      </Stack>
    </SectionContainer>
  );
};

export default AssessmentSection;