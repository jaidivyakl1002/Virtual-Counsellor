from typing import Annotated, Sequence, TypedDict, List
from dotenv import load_dotenv
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, ToolMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyMuPDFLoader, TextLoader
from langchain_core.tools import tool
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph, END
from langchain_chroma import Chroma
from pydantic import BaseModel, Field
from langsmith import traceable
from pprint import pprint
import os
import json

# Load environment variables
load_dotenv()
GEMINI_API = os.getenv('GEMINI_API_KEY')
LANGSMITH_API = os.getenv('LANGSMITH_KEY')

os.environ["LANGSMITH_TRACING"]="true"
os.environ["LANGSMITH_API_KEY"]=LANGSMITH_API
os.environ["LANGSMITH_PROJECT"]="virtual_counsellor"


# --- Pydantic Models for Structured Output ---
class SkillMatch(BaseModel):
    """Skills that match between CV and job requirements"""
    technical_skills: List[str] = Field(description="Technical skills that match")
    soft_skills: List[str] = Field(description="Soft skills that match")
    certifications: List[str] = Field(description="Relevant certifications found")

class SkillGap(BaseModel):
    """Skills that are missing from the CV"""
    technical_skills_missing: List[str] = Field(description="Technical skills required but missing")
    soft_skills_missing: List[str] = Field(description="Soft skills required but missing")
    certifications_missing: List[str] = Field(description="Required certifications missing")
    priority_level: str = Field(description="Priority level: High, Medium, Low")

class ExperienceAnalysis(BaseModel):
    """Experience comparison analysis"""
    years_required: str = Field(description="Years of experience required by job")
    years_candidate_has: str = Field(description="Years of experience candidate has")
    experience_match_percentage: int = Field(description="Percentage match of experience (0-100)")
    relevant_experience: List[str] = Field(description="List of relevant experience areas")
    experience_gaps: List[str] = Field(description="Areas where experience is lacking")

class Recommendation(BaseModel):
    """Specific recommendations for the candidate"""
    immediate_actions: List[str] = Field(description="Actions to take immediately (next 1-3 months)")
    short_term_goals: List[str] = Field(description="Goals for next 6-12 months")
    learning_resources: List[str] = Field(description="Specific courses, books, or resources to bridge gaps")
    projects_to_build: List[str] = Field(description="Project ideas to demonstrate missing skills")

class SkillGapAnalysisReport(BaseModel):
    """Complete skill gap analysis report"""
    job_title: str = Field(description="Title of the job being analyzed")
    overall_match_score: int = Field(description="Overall match percentage (0-100)")
    skills_match: SkillMatch
    skills_gap: SkillGap
    experience_analysis: ExperienceAnalysis
    recommendations: Recommendation
    summary: str = Field(description="Executive summary of the analysis")
    candidate_readiness: str = Field(description="Ready/Nearly Ready/Needs Development/Not Ready")

# --- LLM and Embeddings Configuration ---
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", api_key=GEMINI_API, temperature=0.1)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Create structured LLM
structured_llm = llm.with_structured_output(SkillGapAnalysisReport)

# --- File Paths ---
pdf_path = "/home/sarthak/Desktop/skill_analysis_agent/Sarthak Choudhary (1).pdf"
job_description_path = "/home/sarthak/Desktop/skill_analysis_agent/job_description.txt"
persist_directory = r"/home/sarthak/Desktop/skill_analysis_agent/chroma_db"
collection_name = "cv_collection"

# --- CV Loading and Vector Store Setup ---
@traceable
def setup_vector_store():
    """Loads the CV, splits it into chunks, and creates a Chroma vector store."""
    pdf_loader = PyMuPDFLoader(pdf_path)
    pages = pdf_loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    pages_split = text_splitter.split_documents(pages)

    if not os.path.exists(persist_directory):
        os.makedirs(persist_directory)

    vectorstore = Chroma.from_documents(
        documents=pages_split,
        embedding=embeddings,
        persist_directory=persist_directory,
        collection_name=collection_name
    )
    print("Created and loaded ChromaDB vector store for the CV.")
    return vectorstore

vectorstore = setup_vector_store()
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})

# --- Tools Definition ---
@tool
def retrieve_cv_information(query: str) -> str:
    """
    Searches and returns relevant information from the user's CV/Resume document.
    Use this tool to find details about the user's skills, experience, and projects.
    """
    docs = retriever.invoke(query)
    if not docs:
        return "No relevant information found in the CV."
    return "\n\n".join([f"CV Snippet {i+1}:\n{doc.page_content}" for i, doc in enumerate(docs)])

@tool
def read_job_description(query: str) -> str:
    """
    Reads the content of the job description file.
    Use this tool to understand the requirements, skills, and qualifications for the job.
    The query parameter is not used, but it is required by the tool definition.
    """
    try:
        loader = TextLoader(job_description_path)
        doc = loader.load()
        return doc[0].page_content
    except Exception as e:
        return f"Error reading job description file: {e}"

# --- Agent State and Graph Definition ---
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    job_description: str
    cv_information: str
    analysis_complete: bool

agent_tools = [retrieve_cv_information, read_job_description]
tools_dict = {t.name: t for t in agent_tools}
llm_with_tools = llm.bind_tools(agent_tools)

@traceable
def should_continue(state: AgentState):
    """Determines whether to continue calling tools or proceed to analysis."""
    if state.get('analysis_complete', False):
        return "generate_report"
    if isinstance(state['messages'][-1], AIMessage) and not state['messages'][-1].tool_calls:
        return "generate_report"
    return "continue"

@traceable
def call_llm(state: AgentState) -> AgentState:
    """Calls the LLM with the current state and tools."""
    message = llm_with_tools.invoke(state['messages'])
    return {'messages': [message]}

@traceable
def take_action(state: AgentState) -> AgentState:
    """Executes the tool calls requested by the LLM."""
    tool_calls = state['messages'][-1].tool_calls
    results = []
    job_desc = state.get('job_description', '')
    cv_info = state.get('cv_information', '')
    
    for t in tool_calls:
        print(f"Calling Tool: {t['name']} with args: {t['args']}")
        result = tools_dict[t['name']].invoke(t['args'])
        
        # Store the results for final analysis
        if t['name'] == 'read_job_description':
            job_desc = str(result)
        elif t['name'] == 'retrieve_cv_information':
            cv_info += str(result) + "\n\n"
            
        results.append(ToolMessage(tool_call_id=t['id'], name=t['name'], content=str(result)))
    
    return {
        'messages': results,
        'job_description': job_desc,
        'cv_information': cv_info
    }

@traceable
def generate_structured_report(state: AgentState) -> AgentState:
    """Generate the final structured report using the structured LLM."""
    
    analysis_prompt = f"""
    Based on the job description and CV information gathered, perform a comprehensive skill gap analysis.
    
    Job Description:
    {state.get('job_description', 'Not available')}
    
    CV Information:
    {state.get('cv_information', 'Not available')}
    
    Analyze the match between the candidate's profile and job requirements. Be thorough and specific in your analysis.
    Provide actionable recommendations and an honest assessment of the candidate's readiness.
    """
    structured_report = structured_llm.invoke([HumanMessage(content=analysis_prompt)])
        
        # Convert structured report to JSON string for AIMessage content
    report_json = json.dumps(structured_report.model_dump(), indent=2)
    report_message = AIMessage(content=report_json)
        
    return {
            'messages': report_message,
            'analysis_complete': True,
        }

# --- Graph Construction ---
graph = StateGraph(AgentState)
graph.add_node("llm", call_llm)
graph.add_node("tools", take_action)
graph.add_node("generate_report", generate_structured_report)

graph.set_entry_point("llm")
graph.add_conditional_edges(
    "llm",
    should_continue,
    {"continue": "tools", "generate_report": "generate_report"}
)
graph.add_edge("tools", "llm")
graph.add_edge("generate_report", END)

gap_analysis_agent = graph.compile()

# --- Main Execution Logic ---
@traceable
def run_skill_gap_analysis():
    """
    Runs the complete skill gap analysis by orchestrating the agent.
    """
    print("\n=== Running Structured Skill Gap Analysis Agent ===")

    system_prompt = """
You are a career development assistant. Your task is to gather information about the job requirements and candidate's profile.

Steps:
1. Use `read_job_description` to get the job requirements
2. Use `retrieve_cv_information` with specific queries like:
   - "technical skills and programming languages"
   - "work experience and projects"
   - "education and certifications"
   - "soft skills and achievements"

Gather comprehensive information before the analysis phase begins.
"""

    initial_query = "Please gather information from both the job description and CV for skill gap analysis."
    messages = [SystemMessage(content=system_prompt), HumanMessage(content=initial_query)]

    result = gap_analysis_agent.invoke({
        "messages": messages,
        "job_description": "",
        "cv_information": "",
        "analysis_complete": False
    })

    print("\n=== SKILL GAP ANALYSIS RESULTS ===")
    print(result['messages'][-1].content)

    return result['messages'][-1].content

if __name__ == "__main__":      
    run_skill_gap_analysis()