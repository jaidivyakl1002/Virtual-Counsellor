from typing import Annotated, Sequence, TypedDict, List, Dict, Any, Optional
from dotenv import load_dotenv
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, ToolMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_core.tools import tool
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field
from langsmith import traceable
import os
import json

from utils.git_extractor import GithubExtractor
from models.skill_analysis_model import CVAnalysis, GitHubInsights, SkillGaps, LearningResource, LearningPaths, SkillAnalysisReport

# Load environment variables
load_dotenv()
GEMINI_API = os.getenv('GEMINI_API_KEY')
LANGSMITH_API = os.getenv('LANGSMITH_KEY')
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = LANGSMITH_API
os.environ["LANGSMITH_PROJECT"] = "skill_analysis_system"

pdf_path = "/home/sarthak/Downloads/Virtual-Counsellor/Sarthak Choudhary (1).pdf"
pdf2 = "/home/sarthak/Downloads/Virtual-Counsellor/Resume.pdf"

# --- Agent State ---
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    github_username: str
    cv_content: str
    github_data: Dict[str, Any]
    cv_analysis: Optional[CVAnalysis]
    github_insights: Optional[GitHubInsights]
    skill_gaps: Optional[SkillGaps]
    final_report: Optional[SkillAnalysisReport]
    current_agent: str

# --- LLM Configuration ---
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", api_key=GEMINI_API, temperature=0.1)

# Structured LLMs for different agents
cv_analyzer_llm = llm.with_structured_output(CVAnalysis)
github_analyzer_llm = llm.with_structured_output(GitHubInsights)
gap_analyzer_llm = llm.with_structured_output(SkillGaps)
roadmap_generator_llm = llm.with_structured_output(LearningPaths)
report_generator_llm = llm.with_structured_output(SkillAnalysisReport)


def extract_cv_content(cv_path: str) -> str:
    """Extract content from CV PDF"""
    try:
        loader = PyMuPDFLoader(cv_path)
        pages = loader.load()
        content = "\n\n".join([page.page_content for page in pages])
        return content
    except Exception as e:
        return f"Error extracting CV: {str(e)}"

def extract_github_data(username: str) -> Dict[str, Any]:
    """Extract GitHub profile data"""
    try:
        extractor = GithubExtractor(token=GITHUB_TOKEN)
        return extractor.extract_complete_profile(username)
    except Exception as e:
        return {"error": f"Error extracting GitHub data: {str(e)}"}

# --- Agent Functions ---
@traceable
def cv_analysis_agent(state: AgentState) -> AgentState:
    """Agent specialized in analyzing CV content"""
    cv_content = state.get('cv_content', '')
    
    prompt = f"""
    Analyze the following CV content and extract structured information:
    
    CV Content:
    {cv_content}
    
    Extract and structure all relevant information including:
    1. Skills with proficiency levels and categories
    2. Work experience with technologies used
    3. Educational background
    4. Projects and achievements
    5. Certifications and training
    
    Pay special attention to:
    - Technical skills, programming languages, frameworks, and tools
    - Years of experience with different technologies
    - Project complexity and scope
    - Leadership and collaboration experience
    - Industry domains worked in
    """
    
    try:
        cv_analysis = cv_analyzer_llm.invoke([HumanMessage(content=prompt)])
        
        return {
            'cv_analysis': cv_analysis,
            'current_agent': 'github_analyzer'
        }
    except Exception as e:
        return {
            'messages': [AIMessage(content=f"CV analysis failed: {str(e)}")],
            'current_agent': 'github_analyzer'
        }

@traceable
def github_analysis_agent(state: AgentState) -> AgentState:
    """Agent specialized in analyzing GitHub profile data"""
    github_data = state.get('github_data', {})
    
    prompt = f"""
    Analyze the following GitHub profile data and extract technical insights:
    
    GitHub Data:
    {json.dumps(github_data, indent=2)}
    
    Focus on:
    1. Programming language proficiency based on repository languages
    2. Project complexity and technical skills demonstrated
    3. Collaboration patterns (forks, stars, contributions)
    4. Recent activity and development trends
    5. Technical focus areas and specializations
    """
    
    try:
        github_insights = github_analyzer_llm.invoke([HumanMessage(content=prompt)])
        return {
            'github_insights': github_insights,
            'current_agent': 'gap_analyzer'
        }
    except Exception as e:
        return {
            'messages': [AIMessage(content=f"GitHub analysis failed: {str(e)}")],
            'current_agent': 'gap_analyzer'
        }

@traceable
def skill_gap_analyzer(state: AgentState) -> AgentState:
    """Agent specialized in identifying skill gaps based on industry standards"""
    cv_analysis = state.get('cv_analysis')
    github_insights = state.get('github_insights')
    
    prompt = f"""
    Based on the CV analysis and GitHub insights, identify skill gaps and improvement opportunities:
    
    CV Analysis: {cv_analysis.model_dump() if cv_analysis else 'Not available'}
    GitHub Insights: {github_insights.model_dump() if github_insights else 'Not available'}
    
    Analyze the candidate's profile and identify:
    
    1. **Missing Industry-Standard Skills**: Skills that are commonly expected in their domain/level
    2. **Skill Level Gaps**: Skills they have but at insufficient proficiency for their experience level
    3. **Emerging Technology Gaps**: New technologies in their field they should learn
    4. **Soft Skill Gaps**: Leadership, communication, project management skills
    5. **Domain Knowledge Gaps**: Industry-specific knowledge or practices
    
    Consider:
    - Current market trends and in-demand skills
    - Career progression requirements
    - Technology stack completeness
    - Industry best practices
    - Certification opportunities
    
    For each gap, provide reasoning based on:
    - Industry standards and expectations
    - Career advancement requirements
    - Market demand and trends
    - Complementary skills that would enhance their profile
    """
    
    try:
        skill_gaps = gap_analyzer_llm.invoke([HumanMessage(content=prompt)])
        return {
            'skill_gaps': skill_gaps,
            'current_agent': 'roadmap_generator'
        }
    except Exception as e:
        return {
            'messages': [AIMessage(content=f"Gap analysis failed: {str(e)}")],
            'current_agent': 'roadmap_generator'
        }

@traceable
def learning_roadmap_generator(state: AgentState) -> AgentState:
    """Agent specialized in creating learning roadmaps"""
    skill_gaps = state.get('skill_gaps', [])
    cv_analysis = state.get('cv_analysis')
    
    prompt = f"""
    Create personalized learning roadmaps for the identified skill gaps:
    
    Skill Gaps: {skill_gaps.model_dump() if skill_gaps else 'Not available'}
    Current Skills: {cv_analysis.skills if cv_analysis else []}
    
    For each skill gap, create a detailed learning path including:
    1. Specific learning phases with milestones
    2. Recommended resources (courses, books, tutorials)
    3. Practical projects to build proficiency
    4. Realistic timelines based on current level
    5. Prerequisites and learning order
    """
    
    try:
        learning_paths = roadmap_generator_llm.invoke([HumanMessage(content=prompt)])
        return {
            'learning_roadmap': learning_paths,
            'current_agent': 'report_generator'
        }
    except Exception as e:
        return {
            'messages': [AIMessage(content=f"Roadmap generation failed: {str(e)}")],
            'current_agent': 'report_generator'
        }

@traceable
def report_generator(state: AgentState) -> AgentState:
    """Agent that compiles the final comprehensive report"""
    cv_analysis = state.get('cv_analysis')
    github_insights = state.get('github_insights')
    skill_gaps = state.get('skill_gaps', [])
    learning_roadmap = state.get('learning_roadmap', [])
    
    prompt = f"""
    Compile a comprehensive skill analysis report using all the analyzed data:
    
    CV Analysis: {cv_analysis.model_dump() if cv_analysis else {}}
    GitHub Insights: {github_insights.model_dump() if github_insights else {}}
    Skill Gaps: {skill_gaps.model_dump() if skill_gaps else []}
    Learning Roadmap: {learning_roadmap.model_dump() if learning_roadmap else []}
    
    Create a professional report that includes:
    
    1. **Executive Summary**: Overall candidate profile and capabilities
    2. **Key Strengths**: Technical and soft skills, domain expertise
    3. **Areas for Improvement**: Specific skills and knowledge gaps
    4. **Market Readiness Assessment**: Junior/Mid-level/Senior/Expert level
    5. **Suggested Roles**: Job positions that match current skill profile
    6. **Skill Gap Analysis**: Detailed breakdown of missing or weak skills
    7. **Learning Roadmap**: Prioritized development plan
    8. **Career Recommendations**: Next steps for career advancement
    9. **Overall Scoring**: Technical skills, experience, project complexity, etc.
    
    Focus on:
    - Industry-standard expectations for their experience level
    - Current market trends and in-demand skills
    - Career progression opportunities
    - Practical next steps for skill development
    - Realistic timeline for improvement
    """
    
    try:
        final_report = report_generator_llm.invoke([HumanMessage(content=prompt)])
        return {
            'final_report': final_report,
            'current_agent': 'completed'
        }
    except Exception as e:
        return {
            'messages': [AIMessage(content=f"Report generation failed: {str(e)}")],
            'current_agent': 'completed'
        }

# --- Data Extraction Node ---
@traceable
def data_extraction_node(state: AgentState) -> AgentState:
    """Extract GITHub and CV data """
    github_username = state.get('github_username')
    
    # Extract GitHub data
    github_data = {}
    if github_username:
        github_data = extract_github_data(github_username)
    
    cv_data = ""

    cv_data = extract_cv_content(pdf2)

    return {
        'cv_content': cv_data,
        'github_data': github_data,
        'current_agent': 'cv_analyzer'
    }

# --- Graph Construction ---
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("data_extractor", data_extraction_node)
workflow.add_node("cv_analyzer", cv_analysis_agent)
workflow.add_node("github_analyzer", github_analysis_agent)
workflow.add_node("gap_analyzer", skill_gap_analyzer)
workflow.add_node("roadmap_generator", learning_roadmap_generator)
workflow.add_node("report_generator", report_generator)

# Add edges between nodes
workflow.add_edge("data_extractor", "cv_analyzer")
workflow.add_edge("cv_analyzer", "github_analyzer")
workflow.add_edge("github_analyzer", "gap_analyzer")
workflow.add_edge("gap_analyzer", "roadmap_generator")
workflow.add_edge("roadmap_generator", "report_generator")

# Set entry point
workflow.set_entry_point("data_extractor")

# Direct edges to END
workflow.add_edge("report_generator", END)

# Compile the graph
skill_analysis_system = workflow.compile()

# --- Main Execution Function ---
@traceable
def run_complete_skill_analysis(github_username: str):
    """
    Run the complete multi-agent skill analysis system
    """
    print("\n=== Starting Multi-Agent Skill Analysis System ===")
    
    initial_state = {
        "messages": [],
        "github_username": github_username,
        "cv_content": "",
        "github_data": {},
        "cv_analysis": None,
        "github_insights": None,
        "skill_gaps": None,
        "learning_roadmap": [],
        "final_report": None,
        "current_agent": "data_extractor"
    }
    
    # Execute the workflow
    result = skill_analysis_system.invoke(initial_state)
    print(result)
    # Display results
    final_report = result.get('final_report')
    if final_report:
        print("\n=== SKILL ANALYSIS COMPLETE ===")
        print("Final Report Generated Successfully!")
        
        # Save report to file
        report_data = final_report.model_dump()
        with open('skill_analysis_report.json', 'w') as f:
            json.dump(report_data, f, indent=2, default=str)
        
        print("\nReport saved to 'skill_analysis_report.json'")
        return final_report
    else:
        print("\n=== ANALYSIS FAILED ===")
        print("Could not generate final report")
        return None

# --- Usage Example ---
if __name__ == "__main__":
    
    github_username = "jaidivyakl1002"
    run_complete_skill_analysis(github_username)



