// Types for school assessment results
export enum AptitudeDomain {
  VERBAL_REASONING = 'Ca',
  CLERICAL = 'Cl', 
  MATHEMATICAL_REASONING = 'Ma',
  NUMERICAL_ABILITY = 'Na',
  PERCEPTUAL_REASONING = 'Pm',
  ROTATIONAL_REASONING = 'Ra',
  SPATIAL_REASONING = 'Sa',
  VERBAL_FLUENCY = 'Va'
}

export enum InterestDomain {
  SCIENTIFIC = 'Scientific',
  SOCIAL = 'Social',
  CONVENTIONAL = 'Conventional',
  ARTISTIC = 'Artistic',
  ENTERPRISING = 'Enterprising',
  REALISTIC = 'Realistic'
}

export enum AcademicStream {
  SCIENCE_PCMB = 'Science (PCMB)',
  SCIENCE_PCM = 'Science (PCM)',
  SCIENCE_PCB = 'Science (PCB)',
  COMMERCE_MATH = 'Commerce (Math)',
  COMMERCE_NO_MATH = 'Commerce (No Math)',
  ARTS_HUMANITIES = 'Arts/Humanities'
}

export enum ScoreLevel {
  VERY_HIGH = 'Very High',
  HIGH = 'High', 
  ABOVE_AVERAGE = 'Above Average',
  AVERAGE = 'Average',
  BELOW_AVERAGE = 'Below Average',
  LOW = 'Low'
}

export enum CollegeType {
  IIT = 'IIT',
  NIT = 'NIT',
  IIIT = 'IIIT',
  PRIVATE = 'Private',
  STATE = 'State',
  CENTRAL = 'Central'
}

export enum ScholarshipType {
  MERIT_BASED = 'Merit-based',
  NEED_BASED = 'Need-based',
  GOVERNMENT = 'Government',
  PRIVATE = 'Private',
  INSTITUTIONAL = 'Institutional'
}

export enum Grade {
  GRADE_9 = '9',
  GRADE_10 = '10', 
  GRADE_11 = '11',
  GRADE_12 = '12'
}

export enum EntranceExam {
  JEE_MAIN = 'JEE Main',
  JEE_ADVANCED = 'JEE Advanced',
  NEET = 'NEET',
  BITSAT = 'BITSAT',
  COMEDK = 'COMEDK',
  MHT_CET = 'MHT CET'
}

// Props types for school assessment components
export interface SchoolAssessmentProps {
  assessmentData: SchoolAssessmentResponse;
  showExportOptions?: boolean;
  enableActionTracking?: boolean;
  onActionItemClick?: (actionId: string, actionText: string) => void;
  onDownloadReport?: (format: 'pdf' | 'json') => void;
  onShareResults?: (platform: 'linkedin' | 'email') => void;
  onSaveResults?: () => void;
  isLoading?: boolean;
  error?: string;
}

// Store types for global state data
export interface SchoolAssessmentStore {
  currentTab: number;
  selectedStream?: AcademicStream;
  selectedCareer?: string;
  bookmarkedColleges: string[];
  savedScholarships: string[];
  completedActions: string[];
}

// Query types for API response data
export interface SchoolAssessmentResponse {
  success: boolean;
  data: {
    session_id: string;
    status: string;
    updated_at: string;
    results: {
      success: boolean;
      vertical: string;
      session_id: string;
      timestamp: string;
      outputs: {
        fleet_summary: FleetSummary;
        agent_outputs: {
          test_score_interpreter: TestScoreOutput;
          academic_stream_advisor: StreamAdvisorOutput;
          career_pathway_explorer: CareerPathwayOutput;
          educational_roadmap_planner: RoadmapPlannerOutput;
          college_scholarship_navigator: CollegeScholarshipOutput;
        };
      };
    };
  };
}

export interface FleetSummary {
  status: string;
  confidence: number;
  processing_time: number;
  recommendations: string[];
  next_actions: string[];
}

export interface TestScoreOutput {
  status: string;
  confidence: number;
  data: {
    executive_summary: string;
    aptitude_analysis: Record<AptitudeDomain, string>;
    interest_analysis: Record<InterestDomain, string>;
    score_summaries: {
      dbda_top_aptitudes: AptitudeScore[];
      cii_top_interests: InterestScore[];
    };
  };
}

export interface AptitudeScore {
  domain: AptitudeDomain;
  score: number;
  level: ScoreLevel;
  description: string;
}

export interface InterestScore {
  domain: InterestDomain;
  score: number;
  level: ScoreLevel;
  description: string;
}

export interface StreamAdvisorOutput {
  status: string;
  confidence: number;
  data: {
    executive_summary: string;
    recommended_streams: RecommendedStream[];
  };
}

export interface RecommendedStream {
  stream_type: AcademicStream;
  suitability_score: number;
  primary_strengths_supporting: string[];
  career_pathways: string[];
  subject_requirements: string[];
}

export interface CareerPathwayOutput {
  status: string;
  confidence: number;
  data: {
    executive_summary: string;
    recommended_career_pathways: CareerPathway[];
  };
}

export interface CareerPathway {
  career_title: string;
  career_field: string;
  suitability_score: number;
  pathway_description: string;
  educational_requirements: string[];
  entry_timeline: string;
  salary_outlook: {
    entry_level: string;
    mid_career: string;
    senior: string;
  };
  aptitude_alignment: string[];
}

export interface RoadmapPlannerOutput {
  status: string;
  confidence: number;
  data: {
    executive_summary: string;
    grade_wise_milestones: GradeMilestone[];
    entrance_exam_strategies: ExamStrategy[];
  };
}

export interface GradeMilestone {
  grade: Grade;
  academic_focus: string[];
  subject_priorities: Record<string, string>;
  entrance_exam_preparation: string[];
}

export interface ExamStrategy {
  exam_name: EntranceExam;
  preparation_timeline: string;
  subject_priorities: string[];
  difficulty_assessment: string;
}

export interface CollegeScholarshipOutput {
  status: string;
  confidence: number;
  data: {
    executive_summary: string;
    recommended_colleges: RecommendedCollege[];
    scholarship_opportunities: ScholarshipOpportunity[];
  };
}

export interface RecommendedCollege {
  college_name: string;
  college_type: CollegeType;
  location: string;
  programs_offered: string[];
  admission_requirements: {
    entrance_exam: string;
    requirement: string;
  };
  fees_structure: {
    tuition: string;
    hostel: string;
    living_expenses: string;
  };
  placement_statistics: {
    average_salary: string;
    placement_rate: string;
  };
  suitability_score: number;
}

export interface ScholarshipOpportunity {
  scholarship_name: string;
  provider: string;
  scholarship_type: ScholarshipType;
  eligibility_criteria: string[];
  benefit_amount: string;
  application_process: string[];
  compatibility_score: number;
}

// Props interface for the SchoolAssessmentResults root component
export interface SchoolAssessmentResultsProps {
  // Core assessment data
  assessmentData: SchoolAssessmentResponse;
  
  // Optional configuration
  showExportOptions?: boolean;
  enableActionTracking?: boolean;
  allowCustomNotes?: boolean;
  compactView?: boolean;
  
  // Event handlers
  onActionItemClick?: (actionId: string, actionText: string) => void;
  onStreamSelect?: (stream: AcademicStream) => void;
  onCareerExplore?: (careerTitle: string, careerField: string) => void;
  onCollegeBookmark?: (collegeId: string, college: RecommendedCollege) => void;
  onScholarshipSave?: (scholarshipId: string, scholarship: ScholarshipOpportunity) => void;
  onDownloadReport?: (format: 'pdf' | 'json') => void;
  onShareResults?: (platform: 'linkedin' | 'email') => void;
  onSaveResults?: (notes?: string) => void;
  
  // Navigation handlers
  onBackToAssessment?: () => void;
  onStartImplementation?: () => void;
  onScheduleFollowUp?: () => void;
  onContactCounselor?: () => void;
  
  // Customization options
  theme?: 'light' | 'dark';
  sectionsToShow?: ('test-scores' | 'streams' | 'careers' | 'roadmap' | 'colleges' | 'actions')[];
  defaultTab?: number;
  
  // Loading and error states
  isLoading?: boolean;
  error?: string;
  
  // Analytics and tracking
  onSectionView?: (sectionName: string) => void;
  onActionComplete?: (actionId: string, completedAt: Date) => void;
  onGoalUpdate?: (goalId: string, progress: number) => void;
  onTabChange?: (tabIndex: number, tabName: string) => void;
}