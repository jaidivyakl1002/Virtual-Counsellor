import { AssessmentSection, QuestionType, AnswerOption, SameDifferentOption } from '../types/assessmentEnums';

// Mock data for assessment questions
export const mockAssessmentQuestions = {
  [AssessmentSection.VERBAL_SYNONYMS]: [
    {
      id: 'vs1',
      question: 'FAST',
      options: [
        { value: AnswerOption.A, label: 'old' },
        { value: AnswerOption.B, label: 'rapid' },
        { value: AnswerOption.C, label: 'slow' },
        { value: AnswerOption.D, label: 'early' },
        { value: AnswerOption.E, label: 'late' }
      ],
      correctAnswer: AnswerOption.B
    },
    {
      id: 'vs2', 
      question: 'DECEIVE',
      options: [
        { value: AnswerOption.A, label: 'blunder' },
        { value: AnswerOption.B, label: 'obtain' },
        { value: AnswerOption.C, label: 'conceal' },
        { value: AnswerOption.D, label: 'mislead' },
        { value: AnswerOption.E, label: 'disclose' }
      ],
      correctAnswer: AnswerOption.D
    },
    {
      id: 'vs3',
      question: 'EXCESS', 
      options: [
        { value: AnswerOption.A, label: 'waste' },
        { value: AnswerOption.B, label: 'departure' },
        { value: AnswerOption.C, label: 'surplus' },
        { value: AnswerOption.D, label: 'tax' },
        { value: AnswerOption.E, label: 'approach' }
      ],
      correctAnswer: AnswerOption.C
    }
  ],
  [AssessmentSection.VERBAL_PROVERBS]: [
    {
      id: 'vp1',
      question: 'STRIKE WHILE THE IRON IS HOT',
      options: [
        { value: AnswerOption.A, label: 'Take things as you find them' },
        { value: AnswerOption.B, label: 'Hot love is soon cold' },
        { value: AnswerOption.C, label: 'Make hay while the sun shines' },
        { value: AnswerOption.D, label: 'First think and then speak' },
        { value: AnswerOption.E, label: 'Look before you leap' }
      ],
      correctAnswer: AnswerOption.C
    },
    {
      id: 'vp2',
      question: 'IT NEVER RAINS BUT IT POURS',
      options: [
        { value: AnswerOption.A, label: 'cloudy mornings turn to clear evenings' },
        { value: AnswerOption.B, label: 'misfortunes never come one at a time' },
        { value: AnswerOption.C, label: 'the least predictable thing in life is the weather' },
        { value: AnswerOption.D, label: 'riches alone will not make a man happy' },
        { value: AnswerOption.E, label: 'every cloud has a silver lining' }
      ],
      correctAnswer: AnswerOption.B
    },
    {
      id: 'vp3',
      question: 'LET SLEEPING DOGS LIE',
      options: [
        { value: AnswerOption.A, label: 'as you make your bed, so you must lie on it' },
        { value: AnswerOption.B, label: 'do not keep a dog and bark yourself' },
        { value: AnswerOption.C, label: 'there will be sleeping enough in the grave' },
        { value: AnswerOption.D, label: 'never look for trouble; let trouble look for you' },
        { value: AnswerOption.E, label: 'an old dog does not bark for nothing' }
      ],
      correctAnswer: AnswerOption.D
    }
  ],
  [AssessmentSection.NUMERICAL]: [
    {
      id: 'na1',
      question: '92×(25−19)​=',
      options: [
        { value: AnswerOption.A, label: '32​' },
        { value: AnswerOption.B, label: '131​' },
        { value: AnswerOption.C, label: '191​' },
        { value: AnswerOption.D, label: '197​' },
        { value: AnswerOption.E, label: '232​' }
      ],
      correctAnswer: AnswerOption.E
    },
    {
      id: 'na2',
      question: 'Which one of the numbers below could replace X in both places in: 4+X=6−X?',
      options: [
        { value: AnswerOption.A, label: '4' },
        { value: AnswerOption.B, label: '3' },
        { value: AnswerOption.C, label: '2' },
        { value: AnswerOption.D, label: '1' },
        { value: AnswerOption.E, label: '-2' }
      ],
      correctAnswer: AnswerOption.D
    },
    {
      id: 'na3',
      question: '125% of 32=',
      options: [
        { value: AnswerOption.A, label: '6' },
        { value: AnswerOption.B, label: '12' },
        { value: AnswerOption.C, label: '36' },
        { value: AnswerOption.D, label: '52' },
        { value: AnswerOption.E, label: '40' }
      ],
      correctAnswer: AnswerOption.E
    }
  ],
  [AssessmentSection.MECHANICAL]: [
    {
      id: 'ma1',
      question: 'A device that does the same thing as a fuse does is called a(n)...',
      options: [
        { value: AnswerOption.A, label: 'circuit breaker' },
        { value: AnswerOption.B, label: 'resistor' },
        { value: AnswerOption.C, label: 'relay' },
        { value: AnswerOption.D, label: 'alternator' },
        { value: AnswerOption.E, label: 'voltage regulator' }
      ],
      correctAnswer: AnswerOption.A
    },
    {
      id: 'ma2',
      question: 'Powdered graphite is useful as a(n)...',
      options: [
        { value: AnswerOption.A, label: 'adhesive' },
        { value: AnswerOption.B, label: 'thickening agent' },
        { value: AnswerOption.C, label: 'fuel' },
        { value: AnswerOption.D, label: 'lubricant' },
        { value: AnswerOption.E, label: 'conducting agent' }
      ],
      correctAnswer: AnswerOption.D
    },
    {
      id: 'ma3',
      question: 'In which of the following lists are the four metals arranged from hardest to softest?',
      options: [
        { value: AnswerOption.A, label: 'steel, copper, iron, lead' },
        { value: AnswerOption.B, label: 'steel, iron, lead, copper' },
        { value: AnswerOption.C, label: 'iron, steel, copper, lead' },
        { value: AnswerOption.D, label: 'iron, steel, lead, copper' },
        { value: AnswerOption.E, label: 'steel, iron, copper, lead' }
      ],
      correctAnswer: AnswerOption.E
    }
  ],
  [AssessmentSection.CLERICAL]: [
    {
      id: 'cl1',
      question: 'Pair 1: 1013295 Pair 2: 1012395',
      type: QuestionType.SAME_DIFFERENT as const,
      options: [
        { value: SameDifferentOption.SAME, label: 'Same' },
        { value: SameDifferentOption.DIFFERENT, label: 'Different' }
      ],
      correctAnswer: SameDifferentOption.DIFFERENT
    },
    {
      id: 'cl2', 
      question: 'Pair 1: krqpdisu Pair 2: krqpdisu',
      type: QuestionType.SAME_DIFFERENT as const,
      options: [
        { value: SameDifferentOption.SAME, label: 'Same' },
        { value: SameDifferentOption.DIFFERENT, label: 'Different' }
      ],
      correctAnswer: SameDifferentOption.SAME
    },
    {
      id: 'cl3',
      question: 'Pair 1: mnovpryde Pair 2: mnovprdye',
      type: QuestionType.SAME_DIFFERENT as const,
      options: [
        { value: SameDifferentOption.SAME, label: 'Same' },
        { value: SameDifferentOption.DIFFERENT, label: 'Different' }
      ],
      correctAnswer: SameDifferentOption.DIFFERENT
    }
  ],
  [AssessmentSection.REASONING]: [
    {
      id: 'ra1',
      question: 'Find the odd one out:',
      options: [
        { value: AnswerOption.A, label: 'DEPD' },
        { value: AnswerOption.B, label: 'RFMR' },
        { value: AnswerOption.C, label: 'SJUS' },
        { value: AnswerOption.D, label: 'TVWT' },
        { value: AnswerOption.E, label: 'GBBK' }
      ],
      correctAnswer: AnswerOption.E
    },
    {
      id: 'ra2',
      question: 'Find the odd one out:',
      options: [
        { value: AnswerOption.A, label: 'XFGX' },
        { value: AnswerOption.B, label: 'BLMB' },
        { value: AnswerOption.C, label: 'KORK' },
        { value: AnswerOption.D, label: 'DTSD' },
        { value: AnswerOption.E, label: 'MYZM' }
      ],
      correctAnswer: AnswerOption.C
    },
    {
      id: 'ra3',
      question: 'Find the odd one out:',
      options: [
        { value: AnswerOption.A, label: 'FGHE' },
        { value: AnswerOption.B, label: 'LIKH' },
        { value: AnswerOption.C, label: 'LMNP' },
        { value: AnswerOption.D, label: 'RSTQ' },
        { value: AnswerOption.E, label: 'VWXU' }
      ],
      correctAnswer: AnswerOption.C
    }
  ]
};

export const mockRootProps = {
  initialSection: AssessmentSection.VERBAL_SYNONYMS as const,
  totalSections: 6,
  questionsPerSection: 3
};