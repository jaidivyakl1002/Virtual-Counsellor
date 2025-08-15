from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class Skill(BaseModel):
    name: str = Field(description="Name of the skill")
    level: str = Field(description="Proficiency level: Beginner, Intermediate, Advanced, Expert")
    category: str = Field(description="Category: Technical, Soft, Domain-specific, etc.")

class Project(BaseModel):
    name: str = Field(description="Project name")
    description: str = Field(description="Project description including any key achievements, outcomes, overview")
    technologies: List[str] = Field(description="Technologies used in the project")
    duration: Optional[str] = Field(description="Project duration", default=None)
    role: Optional[str] = Field(description="Role in the project", default=None)

class Experience(BaseModel):
    company: str = Field(description="Company name")
    position: str = Field(description="Job position")
    duration: str = Field(description="Employment duration")
    responsibilities: List[str] = Field(description="Key responsibilities")
    technologies: List[str] = Field(description="Technologies used")

class Education(BaseModel):
    institution: str = Field(description="Educational institution")
    degree: str = Field(description="Degree obtained")
    field: str = Field(description="Field of study")
    year: Optional[str] = Field(description="Graduation year", default=None)
    achievements: List[str] = Field(description="Relevant courses", default=[])

class CVAnalysis(BaseModel):
    """Structured analysis of CV information"""
    personal_info: str = Field(description="Personal information extracted")
    skills: List[Skill] = Field(description="List of identified skills")
    experience: List[Experience] = Field(description="Work experience")
    education: List[Education] = Field(description="Educational background")
    projects: List[Project] = Field(description="Projects mentioned")
    certifications: List[str] = Field(description="Certifications")
    summary: str = Field(description="Professional summary")

class GitHubInsights(BaseModel):
    """Insights from GitHub profile analysis"""
    primary_languages: str = Field(description="Different programming languages and their usage")
    total_repositories: int = Field(description="Total number of repositories")
    contribution_activity: str = Field(description="Overall contribution activity level")
    popular_projects: List[Project] = Field(description="Most notable projects")
    collaboration_score: str = Field(description="Level of collaboration based on forks, stars, etc.")
    recent_activity: str = Field(description="Recent development activity")
    technical_focus: List[str] = Field(description="Main technical focus areas")

class SkillGap(BaseModel):
    skill: str = Field(description="Missing or weak skill")
    importance: str = Field(description="High, Medium, Low - based on industry standards")
    current_level: str = Field(description="Current proficiency level")
    recommended_level: str = Field(description="Industry-standard proficiency level")
    gap_severity: str = Field(description="Critical, Major, Minor")
    reasoning: str = Field(description="Why this skill is important for career growth")

class SkillGaps(BaseModel):
    """Collection of identified skill gaps"""
    gaps: List[SkillGap] = Field(description="List of skill gaps identified in the analysis")

class LearningResource(BaseModel):
    title: str = Field(description="Resource title")
    type: str = Field(description="Type: Course, Book, Tutorial, Project, etc.")
    provider: str = Field(description="Provider or platform")
    estimated_duration: str = Field(description="Time needed to complete")
    difficulty: str = Field(description="Beginner, Intermediate, Advanced")
    url: Optional[str] = Field(description="Resource URL if available", default=None)

class LearningPath(BaseModel):
    skill: str = Field(description="Skill to develop")
    current_level: str = Field(description="Current proficiency")
    target_level: str = Field(description="Target proficiency")
    timeline: str = Field(description="Suggested timeline")
    phases: List[Dict[str, Any]] = Field(description="Learning phases with milestones")
    resources: List[LearningResource] = Field(description="Recommended learning resources")
    practical_projects: List[str] = Field(description="Hands-on projects to practice")

class LearningPaths(BaseModel):
    """Collection of personalized learning paths for skill development"""
    paths: List[LearningPath] = Field(description="List of personalized learning paths")

class SkillAnalysisReport(BaseModel):
    """Final comprehensive skill analysis report"""
    analysis_date: str = Field(description="Date of analysis")
    candidate_summary: str = Field(description="Overall candidate summary")
    cv_analysis: CVAnalysis = Field(description="CV analysis results")
    github_insights: GitHubInsights = Field(description="GitHub profile insights")
    skill_gaps: Optional[SkillGaps] = Field(description="Identified skill gaps based on industry standards", default=None)
    learning_roadmap: List[LearningPath] = Field(description="Personalized learning roadmap")
    career_recommendations: List[str] = Field(description="Career development recommendations")
    strengths: List[str] = Field(description="Key strengths identified")
    improvement_areas: List[str] = Field(description="Areas for improvement")
    overall_score: str = Field(description="Scores out of 10 for different categories")
    market_readiness: str = Field(description="Assessment of market readiness: Junior, Mid-level, Senior, Expert")
    suggested_roles: List[str] = Field(description="Suggested job roles based on current skills")
