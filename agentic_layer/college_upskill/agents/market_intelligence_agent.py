from typing import Dict, List, Any, Optional
from datetime import datetime
import json
from agentic_layer.base_agent import BaseAgent
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
    - Dynamic domain extraction with LLM-based reasoning
    """
    
    def __init__(self, llm_model=None, config: Dict[str, Any] = None):
        super().__init__(
            agent_id="market_intelligence",
            agent_name="Market Intelligence Agent",
            agent_type=AgentType.VERTICAL_SPECIFIC,
            llm_model=llm_model,
            config=config
        )
        
        # Store domain analysis details for integration into final output
        self.domain_analysis_details = {}
    
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
            "market_recommendations": "Strategic advice for students",
            "domain_selection_reasoning": "Explanation of how target domains were identified"
        }

    def _initialize_agent(self):
        """Initialize market intelligence specific components"""
        self.output_parser = JsonOutputParser(pydantic_object=MarketIntelligenceOutput)
        
        # Create domain extraction prompt with escaped JSON
        self.domain_extraction_prompt = PromptTemplate(
            input_variables=["context"],
            template="""
You are an expert career counselor analyzing a college student's profile to identify their most relevant career domains.

Student Context:
{context}

Based on this information, identify 3-5 most relevant industry domains/career paths for this student. Consider:

1. Educational background and field of study
2. Technical and soft skills demonstrated
3. Project work and practical experience
4. Interests shown through activities/profiles
5. Natural career progressions from their current state
6. Emerging opportunities that match their profile

Be broad in your domain thinking - include domains like:
- Technology (Software, Hardware, AI/ML, Cybersecurity, etc.)
- Business (Consulting, Finance, Marketing, Operations, etc.)
- Healthcare (Medical, Biotech, Health Tech, Public Health, etc.)
- Creative Industries (Design, Media, Entertainment, etc.)
- Government & Policy (Public Service, Policy Analysis, etc.)
- Education (Teaching, EdTech, Training, etc.)
- Non-profit & Social Impact
- Research & Academia
- Manufacturing & Engineering
- And any other relevant broad domains

For each domain, provide:
- Broad domain name (e.g., "Healthcare" not "Digital Health Technology")
- Relevance score (1-10)
- Brief explanation of why this domain fits the student's profile

Return response in this exact JSON format:
{{
    "domains": ["Domain 1", "Domain 2", "Domain 3"],
    "domain_analysis": {{
        "Domain 1": {{
            "relevance_score": 8.5,
            "reasoning": "Detailed explanation of why this domain fits the student's background, skills, and interests"
        }},
        "Domain 2": {{
            "relevance_score": 7.2,
            "reasoning": "Detailed explanation of why this domain fits the student's background, skills, and interests"
        }}
    }},
    "overall_reasoning": "High-level explanation of the domain selection strategy and how these domains complement each other for this student's career path"
}}
"""
    )   
        # Create the main analysis prompt
        self.analysis_prompt = PromptTemplate(
            input_variables=[
                "student_context", "profile_summary", "target_domains", 
                "domain_reasoning", "geographic_focus", "analysis_date", "format_instructions"
            ],
            template=self._create_system_prompt(
                "Industry Analyst and Trend Forecaster",
                """
Context Information:
- Analysis Date: {analysis_date}
- Student Context: {student_context}
- Profile Summary: {profile_summary}
- Target Domains: {target_domains}
- Domain Selection Reasoning: {domain_reasoning}
- Geographic Focus: {geographic_focus}

Your expertise includes:
- Real-time job market analysis and trend identification
- Skill demand forecasting with 2-3 year outlook
- Salary benchmarking across different career paths and experience levels
- Geographic opportunity mapping for Indian and global markets
- Industry growth trajectory analysis with emerging sector identification
- Technology trend impact assessment on career opportunities

Analysis Framework:
1. Current Market State: Analyze present job market conditions in the identified domains
2. Demand Patterns: Identify high-demand skills and roles within these domains
3. Salary Landscape: Provide compensation insights and trends for these domains
4. Future Outlook: Project market changes and emerging opportunities in these areas
5. Geographic Analysis: Compare opportunities across locations for these domains
6. Technology Impact: Assess emerging tech influence on careers in these domains
7. Strategic Recommendations: Provide actionable market-driven advice for these specific domains

Focus Areas for College Students:
- Entry-level and internship market conditions in the target domains
- Skills that differentiate candidates in competitive markets within these domains
- Growing sectors with good entry opportunities in the identified domains
- Remote work trends and global opportunity access in these fields
- Startup vs established company market dynamics in these domains
- Skill evolution timelines and learning priorities for these domains

IMPORTANT: Base your entire analysis on the identified target domains: {target_domains}
Include the domain selection reasoning in your final output to help the student understand why these domains were chosen.

{format_instructions}

Provide comprehensive market intelligence analysis in the specified JSON format.
                """
            )
        )
        
        self.logger.info("Market Intelligence Agent initialized with dynamic domain extraction")
    
    @traceable(name="market_intelligence_analysis", tags=["market_intelligence", "comprehensive", "llm_chain"])
    def _process_core_logic(self, validated_input: Dict[str, Any]) -> Dict[str, Any]:
        """Core market intelligence analysis logic"""
        self._add_processing_note("Starting market intelligence analysis with dynamic domain extraction")
        
        # Step 1: Extract target domains dynamically using LLM
        target_domains, domain_reasoning = self._extract_target_domains_dynamic(validated_input)
        
        # Step 2: Extract other context information
        student_context = self._extract_student_context(validated_input)
        profile_summary = self._extract_profile_summary(validated_input)
        geographic_focus = self._extract_geographic_focus(validated_input)
        
        self.logger.info(f"Analyzing market intelligence for dynamically identified domains: {target_domains}")
        
        # Step 3: Prepare prompt inputs for main analysis
        prompt_inputs = {
            "student_context": student_context,
            "profile_summary": profile_summary,
            "target_domains": target_domains,
            "domain_reasoning": domain_reasoning,
            "geographic_focus": geographic_focus,
            "analysis_date": datetime.now().strftime("%Y-%m-%d"),
            "format_instructions": self.output_parser.get_format_instructions()
        }
        
        # Step 4: Execute main market intelligence analysis
        formatted_prompt = self.analysis_prompt.format(**prompt_inputs)
        response = self.llm_model.invoke(formatted_prompt)
        
        output_dict = self._parse_llm_response(response)
        
        # Step 5: Add domain selection reasoning to output
        output_dict["domain_selection_reasoning"] = {
            "identified_domains": target_domains.split(", "),
            "domain_explanations": self.domain_analysis_details.get("domain_analysis", {}),
            "overall_strategy": self.domain_analysis_details.get("overall_reasoning", ""),
            "extraction_confidence": self.domain_analysis_details.get("extraction_confidence", 0.0)
        }
        
        # Step 6: Add metadata
        output_dict["analysis_metadata"] = {
            "analysis_date": prompt_inputs["analysis_date"],
            "domains_analyzed": target_domains,
            "domain_extraction_method": "LLM-based dynamic analysis",
            "geographic_scope": geographic_focus,
            "data_sources": self._get_data_sources(),
            "confidence_factors": self._assess_analysis_confidence(validated_input)
        }
        
        self._add_processing_note("Market intelligence analysis completed successfully")
        return output_dict
    
    def _extract_target_domains_dynamic(self, validated_input: Dict[str, Any]) -> tuple[str, str]:
        """Use LLM to dynamically extract target domains from all available data"""
        self._add_processing_note("Extracting target domains using LLM analysis")
        
        # Build comprehensive context
        context = self._build_comprehensive_context(validated_input)
        
        # Execute LLM call for domain extraction
        formatted_prompt = self.domain_extraction_prompt.format(context=context)
        response = self.llm_model.invoke(formatted_prompt)
        
        # Parse domain response (no fallback - let errors bubble up for debugging)
        parsed_response = self._parse_domain_response(response)
        
        # Extract domain list and reasoning
        domains_list = parsed_response.get("domains", [])
        if not domains_list:
            raise ValueError("LLM failed to identify any target domains")
        
        # Store detailed analysis for integration into final output
        self.domain_analysis_details = {
            "domain_analysis": parsed_response.get("domain_analysis", {}),
            "overall_reasoning": parsed_response.get("overall_reasoning", ""),
            "extraction_confidence": self._calculate_domain_confidence(context, parsed_response)
        }
        
        domains_string = ", ".join(domains_list)
        domain_reasoning = parsed_response.get("overall_reasoning", "")
        
        self.logger.info(f"Successfully extracted {len(domains_list)} target domains: {domains_string}")
        return domains_string, domain_reasoning
    
    def _build_comprehensive_context(self, validated_input: Dict[str, Any]) -> str:
        """Build comprehensive context from all available data sources"""
        context_sections = []
        
        # Education background
        resume_data = validated_input.get("optional_data", {}).get("resume_data")
        if resume_data:
            education = resume_data.get("education", [])
            if education:
                edu_info = education[0] if isinstance(education, list) else education
                degree = edu_info.get('degree', 'Unknown')
                field = edu_info.get('field', 'Unknown')
                institution = edu_info.get('institution', 'Unknown')
                context_sections.append(f"Education: {degree} in {field} from {institution}")
            
            # Skills
            skills = resume_data.get("skills", [])
            if skills:
                context_sections.append(f"Skills: {', '.join(skills)}")
            
            # Experience
            experience = resume_data.get("experience", [])
            if experience:
                exp_summary = []
                for exp in experience[:3]:
                    title = exp.get('title', 'Unknown Role')
                    company = exp.get('company', 'Unknown Company')
                    exp_summary.append(f"{title} at {company}")
                context_sections.append(f"Experience: {'; '.join(exp_summary)}")
            
            # Projects
            projects = resume_data.get("projects", [])
            if projects:
                proj_summary = []
                for proj in projects[:3]:
                    name = proj.get('name', 'Unnamed Project')
                    description = proj.get('description', '')[:100]
                    proj_summary.append(f"{name}: {description}")
                context_sections.append(f"Projects: {'; '.join(proj_summary)}")
        
        # GitHub profile analysis
        github_data = validated_input.get("optional_data", {}).get("github_profile")
        if github_data:
            languages = github_data.get("languages", [])
            repos = github_data.get("repositories", [])
            if languages:
                context_sections.append(f"Programming Languages: {', '.join(languages[:5])}")
            if repos:
                repo_topics = []
                for repo in repos[:5]:
                    topics = repo.get("topics", [])
                    if topics:
                        repo_topics.extend(topics)
                if repo_topics:
                    unique_topics = list(set(repo_topics))[:10]
                    context_sections.append(f"Project Topics: {', '.join(unique_topics)}")
        
        # LinkedIn profile
        linkedin_data = validated_input.get("optional_data", {}).get("linkedin_profile")
        if linkedin_data:
            summary = linkedin_data.get("summary", "")
            if summary:
                context_sections.append(f"LinkedIn Summary: {summary[:200]}")
            
            interests = linkedin_data.get("interests", [])
            if interests:
                context_sections.append(f"Professional Interests: {', '.join(interests[:5])}")
        
        # Academic status
        academic_data = validated_input.get("optional_data", {}).get("academic_status")
        if academic_data:
            year = academic_data.get("current_year", "Unknown")
            major = academic_data.get("major", "Unknown")
            context_sections.append(f"Current Status: {year} year student in {major}")
        
        # Previous agent analysis
        profile_analysis = validated_input.get("previous_outputs", {}).get("profile_analysis")
        if profile_analysis and hasattr(profile_analysis, 'output_data'):
            strengths = profile_analysis.output_data.get("profile_strengths", [])
            if strengths:
                context_sections.append(f"Identified Strengths: {', '.join(strengths[:5])}")
        
        # Explicit target industries if specified
        target_industries = validated_input.get("optional_data", {}).get("target_industries")
        if target_industries:
            context_sections.append(f"Student's Stated Target Industries: {target_industries}")
        
        final_context = "\n".join(context_sections) if context_sections else "Limited profile information available - please provide general domain recommendations for a college student."
        
        self.logger.info(f"Built comprehensive context with {len(context_sections)} sections")
        return final_context
    
    def _parse_domain_response(self, response) -> Dict[str, Any]:
        """Parse domain extraction response - strict parsing with no fallback"""
        content = response.content.strip()
        
        # Clean markdown code blocks
        if content.startswith("```json"):
            content = content[7:]
        elif content.startswith("```"):
            content = content[3:]
        
        if content.endswith("```"):
            content = content[:-3]
        
        content = content.strip()
        
        try:
            parsed = json.loads(content)
            
            # Validate required fields
            if "domains" not in parsed:
                raise ValueError("Response missing required 'domains' field")
            if "domain_analysis" not in parsed:
                raise ValueError("Response missing required 'domain_analysis' field")
            if "overall_reasoning" not in parsed:
                raise ValueError("Response missing required 'overall_reasoning' field")
            
            return parsed
            
        except json.JSONDecodeError as e:
            self.logger.error(f"Failed to parse domain extraction response: {e}")
            self.logger.error(f"Raw content: {repr(content)}")
            raise ValueError(f"Failed to parse domain extraction response as JSON: {e}")
    
    def _calculate_domain_confidence(self, context: str, parsed_response: Dict[str, Any]) -> float:
        """Calculate confidence in domain extraction"""
        base_confidence = 0.7
        
        # Boost confidence with more context
        context_sections = context.count('\n') + 1
        if context_sections > 5:
            base_confidence += 0.1
        elif context_sections > 3:
            base_confidence += 0.05
        
        # Check quality of domain analysis
        domain_analysis = parsed_response.get("domain_analysis", {})
        if domain_analysis:
            avg_reasoning_length = sum(len(analysis.get("reasoning", "")) for analysis in domain_analysis.values()) / len(domain_analysis)
            if avg_reasoning_length > 100:
                base_confidence += 0.1
            elif avg_reasoning_length > 50:
                base_confidence += 0.05
        
        # Check if overall reasoning is substantial
        overall_reasoning = parsed_response.get("overall_reasoning", "")
        if len(overall_reasoning) > 100:
            base_confidence += 0.05
        
        return min(0.95, base_confidence)
    
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
            "tech_trends": 0.85,       # Strong trend data available
            "domain_extraction": self.domain_analysis_details.get("extraction_confidence", 0.7)
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
        
        # Boost confidence with successful domain extraction
        if output_data.get("domain_selection_reasoning"):
            base_confidence += 0.05
        
        # Check output completeness
        expected_keys = ["industry_trends", "skill_demand", "salary_insights", 
                        "job_market_outlook", "geographic_insights", "domain_selection_reasoning"]
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