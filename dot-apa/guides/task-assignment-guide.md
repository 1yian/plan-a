# APA 0.1.0 - Task Assignment Guide
This guide defines how Manager Agents issue task assignments to Implementation Agents and evaluate their completion. Task assignments coordinate agent work during the Task Loop of an APA session, following the Implementation Plan.

## 1. Task Loop Overview
Manager Agent issues Task Assignment Prompt → User passes to Implementation Agent → Implementation Agent executes task and logs work → User returns log to Manager → Manager reviews and determines next action (continue, follow-up, delegate, or plan update).

## 2. Task Assignment Prompt Format
Task Assignment Prompts must correlate 1-1 with Implementation Plan tasks and include all necessary context for successful execution. Manager Agent must issue these prompts following this format:

### 2.1. Dependency Check
Before creating any Task Assignment Prompt check for task dependencies.

**Step 1: Identify Dependencies**
Check Implementation Plan task's `Guidance` field for dependency declarations:
- `"Depends on: Task X.Y Output"` = Task depends on output from another task

**Step 2: Provide Context**
For tasks with dependencies, include a "Context from Dependencies" section with relevant file locations, outputs, and integration guidance from the producer task.

### 2.2. User Explanation Requests
When Users request explanations for upcoming complex tasks, Manager Agent should include detailed explanation instructions within the `## Detailed Instructions` section of the Task Assignment Prompt.

**Explanation Timing Protocol**:
- **Single-Step Tasks**: Provide brief approach introduction BEFORE execution, detailed explanation AFTER task completion
- **Multi-Step Tasks**: Apply same pattern to each step - brief approach introduction BEFORE each step execution, detailed explanation AFTER each step completion

**Integration Approach**: Add explanation instructions as part of the task execution flow, specifying:
- **What aspects** need detailed explanation (technical approach, decision rationale, architectural impact)  
- **Explanation scope** for complex technical areas
- **Timing requirements** following the protocol above

**Implementation**: Include explanation instructions alongside normal task instructions in the `## Detailed Instructions` section. Use clear formatting to distinguish explanation requirements from execution requirements. **Only include explanation instructions when they are explicitly requested by the User.**

### 2.3. Prompt Structure with YAML Frontmatter
Include optional sections only when their front-matter boolean is true

```markdown
---
task_ref: "Task <m.n> - Title"
memory_log_path: "path/to/log/file"
execution_type: "single-step | multi-step"
dependency_context: true | false
ad_hoc_delegation: true | false
---

# APA Task Assignment: [Task Title]

## Task Reference
Implementation Plan: **Task X.Y - [Title]**

## Context from Dependencies
[Only include if dependency_context: true]
[Manager fills this section with section §3 content guidance]

## Objective
[One-sentence task goal from Implementation Plan]

## Detailed Instructions
[Based on Implementation Plan subtasks:]
- For single-step tasks: "Complete all items in one response"
- For multi-step tasks: "Complete in X exchanges, one step per response. **AWAIT USER CONFIRMATION** before proceeding to each subsequent step."
- Transform subtask bullets into actionable instructions specifying: what to do, how to approach it, where to implement, and what constraints/libraries to use
- Include context from task Objective, Output, and Guidance fields

## Expected Output
- Deliverables: [from Implementation Plan Output field]
- Success criteria: [clear completion definition]
- File locations: [specific paths for created/modified files]

## Memory Logging
Upon completion, you **MUST** log work in: `[memory_log_path]`
Follow .apa/guides/memory-log-guide.md instructions.

## Reporting Protocol
After logging, you **MUST** output a **Final Task Report** code block.
- **Format:** Use the exact template provided in your .claude/commands/apa.implement-subagent.md instructions.
- **Perspective:** Write it from the User's perspective so they can copy-paste it back to the Manager.

## Ad-Hoc Delegation
[Only include if ad_hoc_delegation: true]
[Manager fills this section with section §6 content guidance, including explicit command reference for Ad-Hoc delegation (.claude/commands/apa.adhoc-subagent.md)]
```

### 2.4. Delivery Format  
Present Task Assignment Prompts as **a single markdown code block with YAML frontmatter at the top.** This ensures smooth copy-paste workflow for users transferring prompts between Manager and Implementation Agents.

## 3. Context Dependency Integration
When consumer tasks depend on producer outputs ("Depends on: Task X.Y Output" in Implementation Plan Guidance), Manager provides context to enable successful integration.

### 3.1. Dependency Context Guidelines
Since each task is executed by a fresh subagent, always provide comprehensive context for dependencies:

**Context Approach:**
- Provide specific output references and key implementation details
- Include relevant file locations and important artifacts created
- Detail level varies based on dependency complexity
- Always include specific file paths for outputs that need to be used or extended

**Context Example:**
```markdown
## Context from Dependencies
This task builds on Task 2.3 API implementation:

**Key Outputs to Use:**
- Authentication endpoints in `src/api/auth.js` (POST /api/login, GET /api/verify)
- User validation middleware in `src/middleware/auth.js`
- Database schema updates in `migrations/003_add_user_roles.sql`

**Implementation Details:**
- JWT tokens include user role and permissions in payload
- Error handling returns standardized error objects with code/message format
- Rate limiting applied to login attempts (implemented in middleware)

**Integration Approach:**
For this task, extend the existing role-based permissions system to handle the new admin dashboard requirements.
```

### 3.2. Context Creation Guidelines for Manager Agents
- Review producer task Memory Log for key outputs and deliverables
- Create file reading and review instructions as needed
- Provide comprehensive output summary and usage guidance
- Include User clarification protocol for complex integrations

## 4. Memory Log Review
When Implementation Agent returns, **review Memory Log per .apa/guides/memory-log-guide.md section §5**. Assess task completion status, identify blockers, and verify outputs match Implementation Plan expectations. Scan the log's YAML frontmatter:
- If `important_findings: true` or `compatibility_issue: true`: Read the specific source files or outputs referenced in the log to verify the findings. **Do not proceed based on the log contents alone.**

## 5. Next Action Framework
Based on log review, determine appropriate next step:

### 5.1. Continue Workflow
- Task complete and successful → Issue **next Task Assignment Prompt** per Implementation Plan (Task Loop continues)
- Phase complete → **Create phase summary**, begin next phase

### 5.2. Follow-Up Actions
- Task needs refinement → Send correction **follow-up prompt** to same agent (if technical blockers persist, consider **Ad-Hoc delegation in the follow-up prompt**)
- Plan assumptions invalid or any other changes needed → **Update Implementation Plan**

### 5.3. Decision Criteria
- **Complete**: All deliverables produced, requirements met, **and outputs comply with `.apa/constitution.md` principles**
- **Partial**: Some progress made, specific issues identified
- **Blocked**: Cannot proceed without external input or resolution

### 5.4. Constitution Compliance
All task outputs must comply with `.apa/constitution.md` principles. When reviewing task completion, verify that implementation decisions align with project constraints and principles defined in the constitution.

## 6. Ad-Hoc Delegation Protocol
Set `ad_hoc_delegation: true` only when Implementation Plan contains explicit delegation steps for the task.

### 6.1. Manager Responsibilities  
When Implementation Plan contains explicit delegation steps, Manager Agents must:
- Extract delegation requirements from Implementation Plan step
- **Identify delegation type** (Debug, Research, or other) from the Implementation Plan delegation step
- **Include explicit guide references** for standard delegation types in the Task Assignment Prompt if possible
- Specify what to delegate and expected deliverables in prompt

**Standard Delegation Command References**:
- **Ad-Hoc Delegation**: Reference .claude/commands/apa.adhoc-subagent.md for debugging, research, or other specialized tasks
- **Custom Delegations**: Reference appropriate custom command files if available

### 6.2. Integration Requirements
- Implementation Agent creates delegation prompt and manages workflow
- Ad-Hoc agents work in a separate branch managed by the assigning Implementation Agent; they do not log into Memory
- Original agent incorporates findings and logs delegation while User deletes delegation chat session (optional)

---

**End of Guide**