import { AssessmentSection, QuestionType, AnswerOption, SameDifferentOption } from './assessmentEnums';

// Assessment form data types
export interface AssessmentQuestion {
  id: string;
  question: string;
  type?: QuestionType;
  options: AssessmentOption[];
  correctAnswer: AnswerOption | SameDifferentOption;
}

export interface AssessmentOption {
  value: AnswerOption | SameDifferentOption;
  label: string;
}

export interface AssessmentFormData {
  [AssessmentSection.VERBAL_SYNONYMS]: Record<string, AnswerOption>;
  [AssessmentSection.VERBAL_PROVERBS]: Record<string, AnswerOption>;
  [AssessmentSection.NUMERICAL]: Record<string, AnswerOption>;
  [AssessmentSection.MECHANICAL]: Record<string, AnswerOption>;
  [AssessmentSection.CLERICAL]: Record<string, SameDifferentOption>;
  [AssessmentSection.REASONING]: Record<string, AnswerOption>;
}

export interface AssessmentState {
  currentSection: AssessmentSection;
  answers: AssessmentFormData;
  isComplete: boolean;
  sectionProgress: Record<AssessmentSection, boolean>;
}

// Props types
export interface AssessmentFormProps {
  initialSection?: AssessmentSection;
  onSubmit: (answers: AssessmentFormData) => void;
  onSectionChange?: (section: AssessmentSection) => void;
}

export interface QuestionSectionProps {
  section: AssessmentSection;
  questions: AssessmentQuestion[];
  answers: Record<string, AnswerOption | SameDifferentOption>;
  onAnswerChange: (questionId: string, answer: AnswerOption | SameDifferentOption) => void;
}

export interface NavigationProps {
  currentSection: AssessmentSection;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastSection: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}