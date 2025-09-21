// Assessment question types and answer options
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SAME_DIFFERENT = 'same_different'
}

export enum AssessmentSection {
  VERBAL_SYNONYMS = 'verbal_synonyms',
  VERBAL_PROVERBS = 'verbal_proverbs', 
  NUMERICAL = 'numerical',
  MECHANICAL = 'mechanical',
  CLERICAL = 'clerical',
  REASONING = 'reasoning'
}

export enum AnswerOption {
  A = 'a',
  B = 'b', 
  C = 'c',
  D = 'd',
  E = 'e'
}

export enum SameDifferentOption {
  SAME = 'same',
  DIFFERENT = 'different'
}