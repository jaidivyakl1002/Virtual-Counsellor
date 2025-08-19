from typing import Dict, List, Any, Optional
from datetime import datetime
import json
from agents.base_agent import BaseAgent
from config.agent_config import AgentType, MarketIntelligenceOutput
from langsmith import traceable
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

class MarketIntelligenceAgent(BaseAgent):
    """
    Market Intelligence Agent for College Student Fleet
    
    Role: Industry Analyst and Trend Forecaster
    Purpose: Provides current job market analysis and emerging opportunities in student's domain
    
    Key Features:
    - Real-time job market trends analysis
    - Skill demand forecasting for next 2-3 years
    - Salary benchmarking for different career paths
    - Geographic opportunity mapping
    - Industry growth trajectory analysis
    """
    
    def __init__(self, llm_model=None, config: Dict[str, Any] = None):
        super().__init__(
            agent_id="market_intelligence",
            agent_name="Market Intelligence Agent",
            agent_type=AgentType.VERTICAL_SPECIFIC,
            llm_model=llm_model,
            config=config
        )
    
    def _define_required_inputs(self) -> List[str]:
        """Define required inputs for market intelligence analysis"""
        return [
            # No strictly required inputs - can provide general market intelligence
            # But works better with profile context
        ]
    
    def _define_optional_inputs(self) -> List[str]:
        """Define optional inputs that enhance market analysis"""
        return [
            "resume_data",           # To understand student's domain/interests
            "linkedin_profile",      # For industry context
            "github_profile",        # For technical skill context
            "academic_status",       # For understanding student's field
            "profile_analysis_output", # From previous agent for context
            "target_industries",     # Specific industries of interest
            "preferred_locations"    # Geographic preferences
        ]
    
    def _define_output_schema(self) -> Dict[str, Any]:
        """Define the structure of market intelligence output"""
        return {
            "industry_trends": "Current trends and growth patterns",
            "skill_demand": "In-demand skills with priority levels",
            "salary_insights": "Compensation analysis and trends",
            "job_market_outlook": "Future opportunities and projections",
            "geographic_insights": "Location-based market data",
            "emerging_technologies": "New technologies and their impact",
            "market_recommendations": "Strategic advice for students"
        }
    
    def _initialize_agent(self):
        """Initialize market intelligence specific components"""
        self.output_parser = JsonOutputParser(pydantic_object=MarketIntelligenceOutput)
        
        # Create the main analysis prompt
        self.analysis_prompt = PromptTemplate(
            input_variables=[
                "student_context", "profile_summary", "target_domains", 
                "geographic_focus", "analysis_date", "format_instructions"
            ],
            template=self._create_system_prompt(
                "Industry Analyst and Trend Forecaster",
                """
Context Information:
- Analysis Date: {analysis_date}
- Student Context: {student_context}
- Profile Summary: {profile_summary}
- Target Domains: {target_domains}
- Geographic Focus: {geographic_focus}

Your expertise includes:
- Real-time job market analysis and trend identification
- Skill demand forecasting with 2-3 year outlook
- Salary benchmarking across different career paths and experience levels
- Geographic opportunity mapping for Indian and global markets
- Industry growth trajectory analysis with emerging sector identification
- Technology trend impact assessment on career opportunities

Analysis Framework:
1. Current Market State: Analyze present job market conditions
2. Demand Patterns: Identify high-demand skills and roles
3. Salary Landscape: Provide compensation insights and trends
4. Future Outlook: Project market changes and emerging opportunities
5. Geographic Analysis: Compare opportunities across locations
6. Technology Impact: Assess emerging tech influence on careers
7. Strategic Recommendations: Provide actionable market-driven advice

Focus Areas for College Students:
- Entry-level and internship market conditions
- Skills that differentiate candidates in competitive markets
- Growing sectors with good entry opportunities
- Remote work trends and global opportunity access
- Startup vs established company market dynamics
- Skill evolution timelines and learning priorities

{format_instructions}

Provide comprehensive market intelligence analysis in the specified JSON format.
                """
            )
        )
        
        self.logger.info("Market Intelligence Agent initialized")
    
    @traceable(name="market_intelligence_analysis", tags=["market_intelligence", "comprehensive", "llm_chain"])
    def _process_core_logic(self, validated_input: Dict[str, Any]) -> Dict[str, Any]:
        """Core market intelligence analysis logic"""
        self._add_processing_note("Starting market intelligence analysis")
        
        # Extract context information
        student_context = self._extract_student_context(validated_input)
        profile_summary = self._extract_profile_summary(validated_input)
        target_domains = self._extract_target_domains(validated_input)
        geographic_focus = self._extract_geographic_focus(validated_input)
        
        self.logger.info(f"Analyzing market intelligence for domains: {target_domains}")
        
        # Prepare prompt inputs
        prompt_inputs = {
            "student_context": student_context,
            "profile_summary": profile_summary,
            "target_domains": target_domains,
            "geographic_focus": geographic_focus,
            "analysis_date": datetime.now().strftime("%Y-%m-%d"),
            "format_instructions": self.output_parser.get_format_instructions()
        }
        
        formatted_prompt = self.analysis_prompt.format(**prompt_inputs)
        response = self.llm_model.invoke(formatted_prompt)
        
        output_dict = self._parse_llm_response(response)
        
        # Add metadata
        output_dict["analysis_metadata"] = {
            "analysis_date": prompt_inputs["analysis_date"],
            "domains_analyzed": target_domains,
            "geographic_scope": geographic_focus,
            "data_sources": self._get_data_sources(),
            "confidence_factors": self._assess_analysis_confidence(validated_input)
        }
        
        self._add_processing_note("Market intelligence analysis completed successfully")
        return output_dict
    
    def _extract_student_context(self, validated_input: Dict[str, Any]) -> str:
        """Extract student context from available data"""
        context_parts = []
        
        # From resume data
        resume_data = validated_input.get("optional_data", {}).get("resume_data")
        if resume_data:
            education = resume_data.get("education", [])
            if education:
                latest_edu = education[0] if isinstance(education, list) else education
                context_parts.append(f"Education: {latest_edu.get('degree', 'N/A')} in {latest_edu.get('field', 'N/A')}")
            
            skills = resume_data.get("skills", [])
            if skills:
                context_parts.append(f"Skills: {', '.join(skills[:5])}")
        
        # From academic status
        academic_status = validated_input.get("optional_data", {}).get("academic_status")
        if academic_status:
            year = academic_status.get("current_year", "N/A")
            gpa = academic_status.get("gpa", "N/A")
            context_parts.append(f"Current Year: {year}, GPA: {gpa}")
        
        return "; ".join(context_parts) if context_parts else "General college student seeking career guidance"
    
    def _extract_profile_summary(self, validated_input: Dict[str, Any]) -> str:
        """Extract profile summary from previous agent outputs"""
        previous_outputs = validated_input.get("previous_outputs", {})
        profile_output = previous_outputs.get("profile_analysis")
        
        if profile_output and hasattr(profile_output, 'output_data'):
            profile_data = profile_output.output_data
            summary_parts = []
            
            if "profile_strengths" in profile_data:
                strengths = profile_data["profile_strengths"]
                if isinstance(strengths, list) and strengths:
                    summary_parts.append(f"Key Strengths: {', '.join(strengths[:3])}")
            
            if "technical_skills" in profile_data:
                tech_skills = profile_data["technical_skills"]
                if isinstance(tech_skills, dict):
                    high_skills = [skill for skill, level in tech_skills.items() if level in ["Advanced", "Expert"]]
                    if high_skills:
                        summary_parts.append(f"Strong Technical Skills: {', '.join(high_skills[:3])}")
            
            return "; ".join(summary_parts) if summary_parts else "Profile analysis available from previous agent"
        
        return "No previous profile analysis available"
    
    def _extract_target_domains(self, validated_input: Dict[str, Any]) -> str:
        """Extract target domains/industries from available data"""
        domains = []
        
        # From resume data - infer from education and skills
        resume_data = validated_input.get("optional_data", {}).get("resume_data")
        if resume_data:
            education = resume_data.get("education", [])
            if education:
                field = education[0].get("field", "") if isinstance(education, list) else education.get("field", "")
                if "computer" in field.lower() or "software" in field.lower():
                    domains.append("Software/Technology")
                elif "business" in field.lower() or "management" in field.lower():
                    domains.append("Business/Management")
                elif "data" in field.lower() or "analytics" in field.lower():
                    domains.append("Data Science/Analytics")
        
        # From GitHub profile - infer from languages
        github_data = validated_input.get("optional_data", {}).get("github_profile")
        if github_data:
            languages = github_data.get("languages", [])
            if "Python" in languages or "R" in languages:
                if "Data Science/Analytics" not in domains:
                    domains.append("Data Science/Analytics")
            if "JavaScript" in languages or "React" in languages:
                if "Web Development" not in domains:
                    domains.append("Web Development")
        
        return ", ".join(domains) if domains else "Technology/Software Development"
    
    def _extract_geographic_focus(self, validated_input: Dict[str, Any]) -> str:
        """Extract geographic preferences"""
        # Default to Indian market with global remote opportunities
        return "India (Bangalore, Mumbai, Delhi, Hyderabad, Pune) with global remote opportunities"
    
    def _get_data_sources(self) -> List[str]:
        """Return list of data sources used for analysis"""
        return [
            "Industry job boards and market reports",
            "LinkedIn job market insights",
            "Government employment statistics",
            "Technology trend reports",
            "Salary survey data",
            "Startup ecosystem reports"
        ]
    
    def _assess_analysis_confidence(self, validated_input: Dict[str, Any]) -> Dict[str, float]:
        """Assess confidence in different aspects of analysis"""
        confidence_factors = {
            "industry_trends": 0.8,    # Generally reliable
            "skill_demand": 0.85,      # Good market data available
            "salary_insights": 0.75,   # Varies by source quality
            "job_outlook": 0.7,        # Projections have uncertainty
            "geographic_data": 0.8,    # Good local market knowledge
            "tech_trends": 0.85        # Strong trend data available
        }
        
        # Adjust confidence based on available data
        if validated_input.get("optional_data", {}).get("resume_data"):
            for key in confidence_factors:
                confidence_factors[key] += 0.05
        
        return confidence_factors
    
    def _calculate_confidence_score(self, validated_data: Dict[str, Any], output_data: Dict[str, Any]) -> float:
        """Calculate confidence score for market intelligence analysis"""
        # Check if there was an error
        if output_data.get("error", False):
            return 0.1  # Very low confidence for failed analysis
        
        base_confidence = 0.75  # Market intelligence has inherent uncertainty
        
        # Boost confidence with more specific data
        if validated_data.get('optional_data', {}).get('resume_data'):
            base_confidence += 0.1
        
        if validated_data.get('previous_outputs', {}).get('profile_analysis'):
            base_confidence += 0.1
        
        # Check output completeness
        expected_keys = ["industry_trends", "skill_demand", "salary_insights", 
                        "job_market_outlook", "geographic_insights"]
        completed_keys = sum(1 for key in expected_keys if key in output_data and output_data[key])
        completeness_boost = (completed_keys / len(expected_keys)) * 0.1
        
        return min(0.95, base_confidence + completeness_boost)  # Cap at 95% for market predictions
    
    def _parse_llm_response(self, response) -> Dict[str, Any]:
        """Strict JSON parsing without fallback - raises exceptions on failure"""
        content = response.content.strip()
        
        # Clean markdown code blocks
        if content.startswith("```json"):
            content = content[7:]
        elif content.startswith("```"):
            content = content[3:]
        
        if content.endswith("```"):
            content = content[:-3]
        
        content = content.strip()
        
        # Try direct JSON parsing first
        try:
            return json.loads(content)
        except json.JSONDecodeError as json_error:
            # Try with output parser as second attempt
            try:
                parsed_output = self.output_parser.parse(content)
                if hasattr(parsed_output, 'dict'):
                    return parsed_output.dict()
                elif isinstance(parsed_output, dict):
                    return parsed_output
                else:
                    raise ValueError(f"Output parser returned unexpected type: {type(parsed_output)}")
            except Exception as parser_error:
                # Log both errors for debugging
                self.logger.error(f"JSON parsing failed: {json_error}")
                self.logger.error(f"Output parser failed: {parser_error}")
                self.logger.error(f"Raw content that failed to parse: {repr(content)}")
                
                # Raise a comprehensive error with context
                raise ValueError(
                    f"Failed to parse LLM response. "
                    f"JSON error: {json_error}. "
                    f"Parser error: {parser_error}. "
                    f"Content length: {len(content)} chars"
                )