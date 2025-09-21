import { AssessmentSection, QuestionType, AnswerOption, SameDifferentOption } from './assessmentEnums';

// Basic Information Form Data
export interface BasicInfoFormData {
  studentName: string;
  currentGrade: string;
  currentStream: string;
  subjects: string[];
  academicPerformance: string;
  interests: string[];
  careerAspirations: string;
  parentContact: string;
  additionalInfo: string;
}

// Form validation errors
export interface BasicInfoFormErrors {
  studentName?: string;
  currentGrade?: string;
  currentStream?: string;
  subjects?: string;
  academicPerformance?: string;
  interests?: string;
  careerAspirations?: string;
  parentContact?: string;
}

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
  currentStep: 'basic-info' | 'assessment';
  currentSection: AssessmentSection;
  answers: AssessmentFormData;
  basicInfoData: BasicInfoFormData;
  basicInfoComplete: boolean;
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