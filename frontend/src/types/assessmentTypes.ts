// Types for the comprehensive assessment results from LLM
export interface AssessmentResponse {
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
        agent_outputs: AgentOutputs;
      };
      summary: string;
      next_actions: string[];
      conversation_context: {
        can_ask_follow_up: boolean;
        vertical_workflow_complete: boolean;
      };
    };
  };
  error: null;
  session_id: string;
  timestamp: string;
}

export interface FleetSummary {
  status: string;
  confidence: number;
  processing_time: number;
  recommendations: string[];
  next_actions: string[];
}

export interface AgentOutputs {
  profile_analysis: ProfileAnalysisOutput;
  market_intelligence: MarketIntelligenceOutput;
  skill_development_strategist: SkillDevelopmentOutput;
  career_optimization_planner: CareerOptimizationOutput;
  opportunity_matcher: OpportunityMatcherOutput;
}

export interface ProfileAnalysisOutput {
  status: string;
  confidence: number;
  data: {
    comprehensive_analysis: ComprehensiveAnalysis;
    individual_analyses: IndividualAnalyses;
    analysis_metadata: AnalysisMetadata;
    recommendations_summary: RecommendationsSummary;
  };
  warnings: string[];
}

export interface ComprehensiveAnalysis {
  overall_profile_strength: number;
  career_readiness_score: number;
  profile_summary: string;
  key_strengths: string[];
  improvement_priorities: string[];
  competitive_advantages: string[];
  risk_factors: string[];
  profile_positioning: string;
  recommended_next_steps: string[];
  estimated_job_match_rate: number;
}

export interface IndividualAnalyses {
  resume: ResumeAnalysis;
  linkedin: LinkedInAnalysis;
  github: GitHubAnalysis;
  academic: AcademicAnalysis;
}

export interface ResumeAnalysis {
  personal_summary: string;
  technical_skills: string[];
  soft_skills: string[];
  education_highlights: EducationHighlight[];
  experience_summary: string;
  achievements: string[];
  career_trajectory: string;
  strengths: string[];
  areas_for_improvement: string[];
  completeness_score: number;
}

export interface EducationHighlight {
  Institution: string;
  Degree: string;
  CGPA: string;
  "Graduation Year": string;
}

export interface LinkedInAnalysis {
  professional_network_strength: string;
  content_engagement: string;
  industry_connections: string[];
  professional_presence_score: number;
  profile_completeness: string;
  networking_opportunities: string[];
  visibility_enhancement: string[];
}

export interface GitHubAnalysis {
  technical_proficiency: Record<string, string>;
  project_quality_assessment: string;
  contribution_consistency: string;
  collaboration_evidence: string;
  portfolio_strength: string;
  recommended_improvements: string[];
  standout_projects: string[];
  technical_depth_score: number;
}

export interface AcademicAnalysis {
  academic_performance: string;
  relevant_coursework: string[];
  academic_trajectory: string;
  specialization_alignment: string;
  academic_achievements: string[];
  knowledge_gaps: string[];
  academic_strength_score: number;
}

export interface AnalysisMetadata {
  analyzed_components: string[];
  missing_components: string[];
  analysis_timestamp: string;
  data_sources_count: number;
}

export interface RecommendationsSummary {
  immediate_actions: string[];
  profile_improvements: string[];
  competitive_positioning: string;
}

export interface MarketIntelligenceOutput {
  status: string;
  confidence: number;
  data: {
    industry_trends: Record<string, string>;
    skill_demand: Record<string, Record<string, string>>;
    salary_insights: Record<string, Record<string, string>>;
    job_market_outlook: Record<string, string>;
    geographic_insights: Record<string, string>;
    emerging_technologies: string[];
    market_recommendations: string[];
    domain_selection_reasoning: DomainSelectionReasoning;
    analysis_metadata: MarketAnalysisMetadata;
  };
  warnings: string[];
}

export interface DomainSelectionReasoning {
  identified_domains: string[];
  domain_explanations: Record<string, DomainExplanation>;
  overall_strategy: string;
  extraction_confidence: number;
}

export interface DomainExplanation {
  relevance_score: number;
  reasoning: string;
}

export interface MarketAnalysisMetadata {
  analysis_date: string;
  domains_analyzed: string;
  domain_extraction_method: string;
  geographic_scope: string;
  data_sources: string[];
  confidence_factors: Record<string, number>;
}

export interface SkillDevelopmentOutput {
  status: string;
  confidence: number;
  data: {
    skill_gap_analysis: SkillGapAnalysis;
    development_roadmap: DevelopmentRoadmap;
    immediate_actions: string[];
    long_term_strategy: string[];
    portfolio_projects: PortfolioProject[];
    certification_recommendations: CertificationRecommendation[];
    networking_opportunities: string[];
    strategy_metadata: StrategyMetadata;
  };
  warnings: string[];
}

export interface SkillGapAnalysis {
  current_skills: Record<string, string>;
  market_required_skills: Record<string, string>;
  skill_gaps: Record<string, string>;
  skill_overlap: string[];
  gap_severity: string;
}

export interface DevelopmentRoadmap {
  priority_skills: PrioritySkill[];
  learning_pathway: LearningStage[];
  resource_recommendations: Record<string, string[]>;
  milestone_timeline: Record<string, string>;
  validation_strategies: string[];
}

export interface PrioritySkill {
  skill: string;
  reason: string;
  priority: string;
}

export interface LearningStage {
  stage: string;
  duration: string;
  focus: string;
}

export interface PortfolioProject {
  project: string;
  technologies: string[];
  description: string;
}

export interface CertificationRecommendation {
  certification: string;
  provider: string;
  reason: string;
}

export interface StrategyMetadata {
  analysis_date: string;
  current_skills_analyzed: number;
  market_trends_considered: number;
  learning_timeline: string;
  confidence_factors: Record<string, number>;
}

export interface CareerOptimizationOutput {
  status: string;
  confidence: number;
  data: {
    career_goals: CareerGoal[];
    career_strategy: CareerStrategy;
    networking_plan: NetworkingPlan;
    job_search_strategy: JobSearchStrategy;
    personal_branding: PersonalBranding;
    monthly_action_plan: Record<string, string[]>;
    success_tracking: Record<string, string>;
    contingency_plans: string[];
    optimization_metadata: OptimizationMetadata;
    implementation_timeline: Record<string, string[]>;
  };
  warnings: string[];
}

export interface CareerGoal {
  goal_title: string;
  description: string;
  timeline: string;
  success_metrics: string[];
  priority: string;
  dependencies: string[];
}

export interface CareerStrategy {
  short_term_strategy: string;
  long_term_vision: string;
  key_differentiators: string[];
  risk_mitigation: string[];
}

export interface NetworkingPlan {
  target_connections: string[];
  networking_channels: string[];
  networking_goals: string[];
  follow_up_strategy: string;
}

export interface JobSearchStrategy {
  target_companies: string[];
  application_timeline: string;
  application_strategy: string;
  interview_preparation: string[];
  negotiation_strategy: string;
}

export interface PersonalBranding {
  brand_positioning: string;
  content_strategy: string[];
  platform_optimization: Record<string, string>;
  thought_leadership_areas: string[];
}

export interface OptimizationMetadata {
  analysis_date: string;
  planning_horizon: string;
  strategy_components: string[];
  personalization_level: string;
  implementation_complexity: string;
  success_probability: number;
}

export interface OpportunityMatcherOutput {
  status: string;
  confidence: number;
  data: {
    matched_opportunities: MatchedOpportunity[];
    compatibility_analysis: Record<string, string>;
    application_strategy: Record<string, string>;
    success_probability: Record<string, string>;
    preparation_requirements: Record<string, string>;
    alternative_pathways: AlternativePathways;
    networking_strategy: NetworkingStrategy;
    matching_metadata: MatchingMetadata;
    implementation_guidance: ImplementationGuidance;
  };
  warnings: string[];
}

export interface MatchedOpportunity {
  opportunity_id: string;
  company: string;
  title: string;
  location: string;
  type: string;
  description: string;
}

export interface AlternativePathways {
  description: string;
}

export interface NetworkingStrategy {
  description: string;
}

export interface MatchingMetadata {
  analysis_date: string;
  opportunities_analyzed: number;
  matching_criteria: string[];
  success_factors: string[];
  personalization_level: string;
}

export interface ImplementationGuidance {
  immediate_actions: string[];
  weekly_tasks: string[];
  monthly_goals: string[];
}