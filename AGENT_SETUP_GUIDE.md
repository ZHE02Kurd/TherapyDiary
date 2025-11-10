# How to Create AI Agents for TherapyDiary Project

## Quick Overview

You need to create 4 specialized AI agents that will work together on this project:
1. **Agent 1**: Backend Specialist (Node.js, MongoDB, APIs)
2. **Agent 2**: Frontend Specialist (React Native, UI/UX)
3. **Agent 3**: Research Specialist (Documentation, best practices)
4. **Agent 4**: DevOps/QA Specialist (Testing, deployment, monitoring)

---

## Option 1: GitHub Copilot Workspace (Recommended for This Project)

**Best for**: Code-heavy tasks, direct GitHub integration, collaborative coding

### Setup Steps:

1. **Enable GitHub Copilot Workspace**
   - Go to https://github.com/features/copilot
   - Sign in with your GitHub Student account
   - Enable Copilot (free with Student Developer Pack)
   - Access Copilot Workspace (beta feature)

2. **Create Your Repository**
   ```bash
   # Create the repo on GitHub
   # Then clone it locally
   git clone https://github.com/yourusername/therapydiary.git
   cd therapydiary
   ```

3. **Set Up Copilot as Your Coding Agent**
   - Install VS Code: https://code.visualstudio.com/
   - Install GitHub Copilot extension
   - Sign in with your GitHub account
   - Copilot will act as your "pair programming" agent

4. **Use Multiple Sessions for Different Roles**
   - Open separate terminal windows/VS Code workspaces
   - Use different `.md` files to give Copilot context:
     - `backend-context.md` - For Agent 1 work
     - `frontend-context.md` - For Agent 2 work
     - `research-context.md` - For Agent 3 work
     - `devops-context.md` - For Agent 4 work

**Pros**: 
- Free with student account
- Direct code generation
- GitHub integration
- Works in your IDE

**Cons**: 
- Not truly autonomous agents
- Requires you to orchestrate
- One session at a time

---

## Option 2: Custom GPT Agents (OpenAI ChatGPT Plus)

**Best for**: Planning, documentation, research tasks

### Setup Steps:

1. **Subscribe to ChatGPT Plus**
   - Go to https://chat.openai.com/
   - Upgrade to Plus ($20/month)
   - Access GPTs feature

2. **Create Custom GPT for Each Agent**

   **Agent 1: Backend Specialist GPT**
   - Click "Explore GPTs" → "Create"
   - Name: "TherapyDiary Backend Dev"
   - Instructions:
     ```
     You are a senior Node.js backend developer specializing in Express, 
     MongoDB, and RESTful APIs. You help build the TherapyDiary mental 
     health app backend. You focus on database design, API endpoints, 
     authentication, and security. Always write clean, tested code with 
     proper error handling.
     ```
   - Upload: `AI_AGENT_ONBOARDING.md`, `RESEARCH_AND_DEVELOPMENT.md`
   - Capabilities: Code Interpreter, Web Browsing
   - Save and use

   **Agent 2: Frontend Specialist GPT**
   - Instructions:
     ```
     You are an expert React Native developer specializing in mobile app 
     UI/UX. You build calming, accessible interfaces for mental health apps. 
     You focus on React Native components, navigation, state management, and 
     responsive design. You prioritize user experience for users with 
     depression (low energy, easy navigation).
     ```
   - Upload same docs
   
   **Agent 3: Research Specialist GPT**
   - Instructions:
     ```
     You are a mental health app research specialist. You understand 
     Behavioural Activation therapy and evidence-based mental health 
     interventions. You create documentation, analyze competitors, ensure 
     accessibility, and write user-friendly content. You prioritize privacy, 
     ethics, and user safety.
     ```
   - Upload: `Behavioural-Activation-booklet.pdf`, `app-planning-guide.md`, R&D doc
   
   **Agent 4: DevOps/QA GPT**
   - Instructions:
     ```
     You are a DevOps and QA engineer specializing in DigitalOcean, 
     MongoDB Atlas, CI/CD with GitHub Actions, and mobile testing with 
     BrowserStack. You ensure quality, security, and reliability. You write 
     tests, configure deployments, and monitor production systems.
     ```

3. **Use in Separate Chat Sessions**
   - Start 4 different chats, one with each GPT
   - Give them tasks from the R&D document
   - Copy their outputs into your project

**Pros**:
- Specialized context per agent
- Good for planning and architecture
- Can upload project documents
- Remembers conversation context

**Cons**:
- Costs $20/month
- Manual copying of outputs
- No direct code execution
- Not truly collaborative

---

## Option 3: Claude Projects (Anthropic - What You're Using Now!)

**Best for**: Long context, document analysis, comprehensive planning

### Setup Steps:

1. **Subscribe to Claude Pro**
   - Go to https://claude.ai/
   - Upgrade to Pro ($20/month)
   - Access Projects feature

2. **Create 4 Separate Projects**

   **Project 1: Backend Development**
   - Name: "TherapyDiary - Backend"
   - Add knowledge:
     - `AI_AGENT_ONBOARDING.md`
     - `RESEARCH_AND_DEVELOPMENT.md` (filtered to Agent 1 tasks)
     - Database schemas
     - API documentation
   - Custom instructions:
     ```
     You are Agent 1, the Backend Specialist for TherapyDiary. Focus on 
     Node.js, Express, MongoDB, JWT authentication, and API development. 
     Prioritize security and data privacy for mental health data.
     ```

   **Project 2: Frontend Development**
   - Name: "TherapyDiary - Frontend"
   - Add knowledge: Same docs + design files
   - Custom instructions:
     ```
     You are Agent 2, the Frontend Specialist. Build React Native screens 
     with calming, accessible UI for users with depression. Focus on 
     simplicity and low cognitive load.
     ```

   **Project 3: Research & Documentation**
   - Name: "TherapyDiary - Research"
   - Add knowledge: BA booklet, planning guide, competitive analysis
   - Custom instructions:
     ```
     You are Agent 3, the Research Specialist. Ensure the app follows 
     evidence-based Behavioural Activation principles. Create documentation, 
     analyze competitors, and prioritize user safety.
     ```

   **Project 4: DevOps & QA**
   - Name: "TherapyDiary - DevOps"
   - Add knowledge: R&D doc (Phase 5 focus), deployment guides
   - Custom instructions:
     ```
     You are Agent 4, the DevOps/QA Specialist. Set up DigitalOcean 
     hosting, MongoDB Atlas, GitHub Actions CI/CD, Sentry monitoring, and 
     BrowserStack testing. Ensure quality and reliability.
     ```

3. **Work in Each Project Separately**
   - Switch between projects as needed
   - Each maintains its own conversation context
   - Copy outputs to your codebase

**Pros**:
- Long context window (200k tokens)
- Excellent at understanding complex docs
- Projects maintain context
- Good at analysis and planning

**Cons**:
- Costs $20/month
- Manual orchestration required
- No direct code execution
- Separate conversations (not truly collaborative)

---

## Option 4: LangChain + OpenAI API (Advanced - For True Automation)

**Best for**: Fully autonomous multi-agent systems

### Setup Steps:

1. **Prerequisites**
   - OpenAI API account: https://platform.openai.com/
   - Python installed
   - Basic Python knowledge

2. **Install Dependencies**
   ```bash
   pip install langchain openai langgraph chromadb
   ```

3. **Create Agent System** (`agent_system.py`)
   ```python
   from langchain.agents import AgentExecutor, create_openai_functions_agent
   from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
   from langchain_openai import ChatOpenAI
   from langchain.tools import Tool
   
   # Initialize LLM
   llm = ChatOpenAI(model="gpt-4", temperature=0)
   
   # Agent 1: Backend Specialist
   backend_prompt = ChatPromptTemplate.from_messages([
       ("system", """You are Agent 1, Backend Specialist for TherapyDiary.
       You build Node.js + Express APIs, design MongoDB schemas, implement 
       JWT authentication, and ensure security. Always follow best practices."""),
       ("user", "{input}"),
       MessagesPlaceholder(variable_name="agent_scratchpad"),
   ])
   
   # Agent 2: Frontend Specialist
   frontend_prompt = ChatPromptTemplate.from_messages([
       ("system", """You are Agent 2, Frontend Specialist for TherapyDiary.
       You build React Native mobile apps with calming, accessible UI for 
       mental health. Prioritize simplicity and user experience."""),
       ("user", "{input}"),
       MessagesPlaceholder(variable_name="agent_scratchpad"),
   ])
   
   # Agent 3: Research Specialist
   research_prompt = ChatPromptTemplate.from_messages([
       ("system", """You are Agent 3, Research Specialist for TherapyDiary.
       You ensure the app follows Behavioural Activation principles, create 
       documentation, and prioritize user safety and accessibility."""),
       ("user", "{input}"),
       MessagesPlaceholder(variable_name="agent_scratchpad"),
   ])
   
   # Agent 4: DevOps/QA Specialist
   devops_prompt = ChatPromptTemplate.from_messages([
       ("system", """You are Agent 4, DevOps/QA Specialist for TherapyDiary.
       You set up DigitalOcean hosting, MongoDB Atlas, CI/CD, Sentry, and 
       BrowserStack. You ensure quality through testing and monitoring."""),
       ("user", "{input}"),
       MessagesPlaceholder(variable_name="agent_scratchpad"),
   ])
   
   # Create agents
   from langchain.agents import create_openai_functions_agent
   
   backend_agent = create_openai_functions_agent(llm, [], backend_prompt)
   frontend_agent = create_openai_functions_agent(llm, [], frontend_prompt)
   research_agent = create_openai_functions_agent(llm, [], research_prompt)
   devops_agent = create_openai_functions_agent(llm, [], devops_prompt)
   
   # Orchestrator
   def run_agents(task, phase):
       if "backend" in task.lower() or "api" in task.lower():
           return backend_agent
       elif "frontend" in task.lower() or "ui" in task.lower():
           return frontend_agent
       elif "research" in task.lower() or "documentation" in task.lower():
           return research_agent
       else:
           return devops_agent
   ```

4. **Run Agent System**
   ```bash
   python agent_system.py
   ```

**Pros**:
- Truly autonomous
- Can use tools (file system, APIs, etc.)
- Fully customizable
- Can collaborate via shared memory

**Cons**:
- Requires programming
- API costs (pay per token)
- Complex to set up
- Requires orchestration logic

---

## Option 5: AutoGen (Microsoft - Multi-Agent Framework)

**Best for**: Code-focused multi-agent collaboration

### Setup Steps:

1. **Install AutoGen**
   ```bash
   pip install pyautogen
   ```

2. **Configure Agents** (`autogen_agents.py`)
   ```python
   import autogen
   
   config_list = [
       {
           "model": "gpt-4",
           "api_key": "your-openai-api-key"
       }
   ]
   
   # Agent 1: Backend Developer
   backend_agent = autogen.AssistantAgent(
       name="Backend_Dev",
       llm_config={"config_list": config_list},
       system_message="""You are a senior Node.js backend developer building 
       the TherapyDiary API. You write Express routes, MongoDB schemas, and 
       implement secure authentication."""
   )
   
   # Agent 2: Frontend Developer
   frontend_agent = autogen.AssistantAgent(
       name="Frontend_Dev",
       llm_config={"config_list": config_list},
       system_message="""You are a React Native expert building calming, 
       accessible mobile UI for mental health app users."""
   )
   
   # Agent 3: Researcher
   researcher = autogen.AssistantAgent(
       name="Researcher",
       llm_config={"config_list": config_list},
       system_message="""You ensure Behavioural Activation best practices, 
       create documentation, and prioritize user safety."""
   )
   
   # Agent 4: DevOps/QA
   devops_agent = autogen.AssistantAgent(
       name="DevOps_QA",
       llm_config={"config_list": config_list},
       system_message="""You set up DigitalOcean, MongoDB Atlas, CI/CD, and 
       testing infrastructure."""
   )
   
   # Human proxy (you)
   user_proxy = autogen.UserProxyAgent(
       name="Product_Owner",
       human_input_mode="TERMINATE",
       max_consecutive_auto_reply=10,
       code_execution_config={"work_dir": "therapydiary"}
   )
   
   # Create group chat
   groupchat = autogen.GroupChat(
       agents=[user_proxy, backend_agent, frontend_agent, researcher, devops_agent],
       messages=[],
       max_round=50
   )
   
   manager = autogen.GroupChatManager(groupchat=groupchat, llm_config={"config_list": config_list})
   
   # Start collaboration
   user_proxy.initiate_chat(
       manager,
       message="Let's start Phase 1 of TherapyDiary development. Backend team, please design the database schema."
   )
   ```

3. **Run Multi-Agent System**
   ```bash
   python autogen_agents.py
   ```

**Pros**:
- Agents can collaborate autonomously
- Can execute code
- Built-in conversation management
- Agents can call each other

**Cons**:
- Requires programming
- API costs
- Can be unpredictable
- Needs supervision

---

## My Recommendation for You

Based on your current setup (using Claude) and skill level, I recommend:

### **Hybrid Approach: Claude Projects + GitHub Copilot**

**Phase 1-2 (Planning & Design)**: Use **Claude Projects**
- Create 4 projects as described above
- Use for architecture, planning, documentation
- Generate specs, schemas, API designs
- No cost if you already have Claude Pro

**Phase 3-5 (Development)**: Use **GitHub Copilot** 
- Free with Student Developer Pack
- Use for actual coding (Node.js, React Native)
- Copilot acts as your "pair programmer"
- You orchestrate based on Claude's plans

**Phase 6 (Testing & Launch)**: Use **BrowserStack + Sentry**
- Automated testing with BrowserStack
- Monitoring with Sentry
- Both included in Student Pack

### Implementation Plan:

1. **Week 1**: Set up Claude Projects (4 separate projects)
2. **Week 1**: Activate GitHub Copilot with student account
3. **Week 2-3**: Use Claude Projects for all planning tasks
4. **Week 3-5**: Use Copilot for all coding tasks
5. **Week 6+**: Use BrowserStack for testing

---

## Quick Start Guide

### Step 1: Set Up Claude Projects (Today)

```bash
# In Claude (this chat):
1. Go to Projects tab
2. Create "TherapyDiary - Backend"
3. Upload AI_AGENT_ONBOARDING.md, RESEARCH_AND_DEVELOPMENT.md
4. Start with Phase 1, Task 1.2 (Tech stack setup)

# Repeat for 3 more projects (Frontend, Research, DevOps)
```

### Step 2: Activate GitHub Copilot (Today)

```bash
# 1. Apply for GitHub Student Developer Pack
https://education.github.com/pack

# 2. Install VS Code
https://code.visualstudio.com/

# 3. Install GitHub Copilot extension
# 4. Sign in with your GitHub student account
# 5. Start coding!
```

### Step 3: Set Up Development Tools (Week 1)

Follow Task 1.2 and 1.4 in the R&D document:
- DigitalOcean account + $200 credit
- MongoDB Atlas + $50 credit
- Sentry account
- Doppler account
- Notion workspace
- BrowserStack account

### Step 4: Start Building (Week 2+)

Use Claude Projects for planning, Copilot for coding.

---

## Cost Breakdown

### Free (with Student Pack):
- ✅ GitHub Copilot - $0 (free)
- ✅ DigitalOcean - $0 for year ($200 credit)
- ✅ MongoDB Atlas - $0 for year ($50 credit + free tier)
- ✅ Sentry - $0 (free tier)
- ✅ Doppler - $0 (free tier)
- ✅ Notion - $0 (free for students)
- ✅ BrowserStack - $0 (free for open source)

### Paid (Optional):
- Claude Pro - $20/month (for multi-project planning)
- OR ChatGPT Plus - $20/month (for custom GPTs)
- OR OpenAI API - Pay per use (~$10-50/month for heavy use)

**Total Cost: $0-20/month** depending on if you want dedicated AI planning agents.

---

## Next Steps

1. **Right Now**: Create Claude Projects for each agent (if you have Pro)
2. **Today**: Apply for GitHub Student Developer Pack
3. **This Week**: Set up all the free tools (DigitalOcean, MongoDB, etc.)
4. **Next Week**: Start Phase 1 tasks using your agents

**Want me to help you set up the Claude Projects or write the agent prompts?** Let me know!
