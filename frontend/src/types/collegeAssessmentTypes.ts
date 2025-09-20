// Form data types for college student assessment
export interface CollegeAssessmentFormData {
  resume: File | null;
  academicStatus: {
    gpa: string;
    yearStatus: string;
    majorSubjects: string;
    extracurriculars: string;
  };
  githubProfile: string;
  linkedinProfile: string;
  initialMessage: string;
}

// Props types for the assessment page
export interface CollegeAssessmentProps {
  userId: string;
  sessionId: string;
  initialFormData?: Partial<CollegeAssessmentFormData>;
  onSubmit?: (data: CollegeAssessmentFormData) => void;
}

// Form validation types
export interface FormErrors {
  resume?: string;
  academicStatus?: {
    gpa?: string;
    yearStatus?: string;
    majorSubjects?: string;
    extracurriculars?: string;
  };
  githubProfile?: string;
  linkedinProfile?: string;
  initialMessage?: string;
}

// Form submission response
export interface AssessmentSubmissionResponse {
  success: boolean;
  message: string;
  assessmentId?: string;
}