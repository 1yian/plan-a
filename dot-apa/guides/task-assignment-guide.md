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
test_execution_required: true | false
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

## Test Execution Requirements
[Only include if test_execution_required: true]
This task requires actual test execution. You MUST:
1. Install all test dependencies (e.g., `npm install`, `pip install -r requirements.txt`)
2. Set up test environment (database, config files, environment variables)
3. Run the test command: `[specific test command]`
4. Capture the test output and exit code
5. Include test command, output, and exit code in your memory log

**CRITICAL**: This task cannot be marked `completed` without evidence of test execution. Self-reporting test success without execution evidence will result in task failure.

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
When consumer tasks depend on producer outputs ("Depends on: Task X.Y Output" in Implementation Plan Guidance), the Manager MUST provide comprehensive context to enable successful integration.

### 3.1. Core Principle: Every Subagent Starts Fresh
**CRITICAL:** Each task is executed by a fresh subagent with no memory of previous tasks. Therefore:
- **ALL dependencies require comprehensive context** - there is no "light" context option
- Assume the subagent knows nothing about what previous tasks accomplished
- Include all information needed to integrate with or build upon dependency outputs

### 3.2. Comprehensive Context Template
For EVERY task with dependencies, include this complete context structure:

```markdown
## Context from Dependencies
This task depends on: **Task X.Y - [Title]**

**Files Created/Modified by Dependency:**
- `path/to/file1.ext` - [what this file contains/does]
- `path/to/file2.ext` - [what this file contains/does]

**Key Implementation Details:**
- [Important architectural decision made]
- [Data structures or interfaces defined]
- [Patterns or conventions established]

**Integration Steps:**
1. Read `path/to/dependency/output.ext` to understand [specific aspect]
2. Use the [specific component/function/interface] from the dependency
3. Follow the [pattern/convention] established in the dependency
4. [Any additional integration requirements]

**Expected Integration Points:**
- Import/use: [specific exports, functions, or interfaces]
- Extend: [specific classes or components to build upon]
- Reference: [specific configurations or constants]
```

### 3.3. Context Creation Protocol for Manager Agents
1. **Read the dependency's Memory Log** at `apa/[branch]/memory/task-X-Y.md`
2. **Extract ALL relevant outputs:**
   - File paths created or modified
   - Key functions, classes, or interfaces exported
   - Configuration changes made
   - Patterns or conventions established
3. **Include explicit integration steps** that tell the subagent exactly how to use the dependency outputs
4. **Add file reading instructions** if the subagent needs to examine dependency files in detail

### 3.4. Clarification Protocol
If dependency context is unclear or incomplete:
1. **Re-read the dependency Memory Log** for additional details
2. **Inspect dependency artifacts directly** if Memory Log is insufficient
3. **Include clarification guidance** in the task prompt: "If the integration approach is unclear after reviewing the dependency files, report status as `blocked` with specific questions"

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
- **Complete**: All deliverables produced, requirements met, **and outputs comply with `apa/constitution.md` principles**
- **Partial**: Some progress made, specific issues identified
- **Blocked**: Cannot proceed without external input or resolution

### 5.4. Constitution Compliance
All task outputs must comply with `apa/constitution.md` principles. When reviewing task completion, verify that implementation decisions align with project constraints and principles defined in the constitution.

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