# APA 0.1.0 - Project Breakdown Guide
This guide defines how Setup Agents transform Context Synthesis findings into structured task breakdowns. Following systematic high-level-to-detail methodology, it prevents template matching through strategic workflow sequencing and chat-to-file output switching. The guide ensures task breakdown precision required for Implementation Agent success while minimizing Manager Agent coordination overhead.

## 1. Context Integration & Breakdown Overview

### 1.1. Retained Context Synthesis Insights
Project decomposition transforms Context Synthesis findings into structured task breakdown using **retained insights** from discovery phase. These insights provide concrete decision anchors and must be actively integrated into task specifications:

**Technical & Scope Insights:**
- **Domain boundaries** → Inform task grouping and phase organization
- **Complexity flags** → Create appropriately granular tasks (see §3.1)
- **External dependencies** → Plan User guidance for actions outside IDE (see §3.1)
- **Investigation needs** → Add a minimal one-line Ad-Hoc Delegation step where needed in affected multi-step tasks (see §3.2, §3.3)
- **Workflow patterns** → Honor natural progression in dependencies (see §3.3)

**Process & Implementation Insights:**
- **Quality standards and validation requirements** → Convert to explicit task objectives, acceptance criteria, and validation steps
- **Implementation preferences and methodologies** → Specify as mandatory task execution approach and procedural requirements  
- **Process constraints and workflow requirements** → Embed as specific task steps, constraints, and coordination protocols
- **Coordination requirements and tracking requirements** → Structure as explicit user interaction steps and review checkpoints
- **Tool preferences and technical constraints** → Detail in task guidance as mandatory technical specifications
- **Test requirements and acceptance criteria** → Specify as separate test-writing tasks BEFORE implementation tasks, following test-first pattern

**Integration Verification:** During each phase cycle, audit that emphasized user requirements appear as explicit task components, not background assumptions.

### 1.2. Project Breakdown Sequence
The Setup Agent is to follow this systematic high-level-to-detail progression with mandatory progression gates and integration verification:

To maintain efficiency, you must execute the **entire Project Breakdown Sequence in a single response**. To prevent pattern-matching and quality degradation, you must **INTERLEAVE** your analysis:

1. **Phase Definition** (§2) → Phase sequence **in chat**
2. **Phase Cycles** (§3) – **Strict Interleaved Sequence:** For each phase, perform **complete Phase X Analysis** in chat: execute **Phase Context Integration & Task Identification** (§3.1), then **Individual Task Complete Analysis** (§3.2) for ALL tasks, then **Phase Dependency Assessment** (§3.3).
   - **Only after** completing all Phase X Analysis in chat, append Phase X contents to file following **Phase Documentation Procedure** (§3.4).
   - **Then and only then** move to Phase X+1 and repeat the complete cycle.
   - **Repeat** this strict interleaved sequence for all phases without batching or skipping file writes **unless explicitly instructed by the User**.
3. **Final Review & Plan Approval** (§4) → **Process requirement validation in file** + User approval based on file + chat contents

**Progression Gates**: Each step must complete before proceeding to next step
**Integration Verification**: Each phase cycle must validate that Context Synthesis insights are explicitly integrated into task specifications

### 1.3. Chat-to-File Workflow Pattern
Strategic context switching prevents pattern matching:

**Chat Operations**: Phase sequence, task breakdown per phase, final review decisions
**File Operations**: Document each completed phase cycle
**Context Breaks**: File writes interrupt continuous chat writing, providing fresh perspective for each subsequent phases thus avoiding pattern-matching

Structured file format (see §3.4) prevents template formation while ensuring the output is immediately ready for Manager Agent consumption.

## 2. Phase Sequence Definition

### 2.1. Phase Identification from Retained Workflow Patterns
Transform retained workflow patterns from Context Synthesis into logical project progression structure:

#### Phase Structure Determination
Use retained scope and workflow patterns to determine appropriate phase organization:

**Complexity Pattern Analysis:**
- Layered complexity flagged → Hierarchical phases with progressive dependencies
- Sequential patterns retained → Linear phases following natural workflow progression  
- Concurrent work streams noted → Parallel phases organized by domain or component boundaries
- Process requirements identified → Dedicated validation, review, or quality assurance phases when workflow constraints require them

**Start-to-Finish Logic:**
- Identify project initiation requirements from retained context
- Define continuity workflow maintaining momentum between phases
- Establish completion criteria and final deliverable boundaries
- Ensure natural project progression without forced dependencies
- Integrate process constraints and quality checkpoints into phase progression

#### Phase Boundary Assessment
- Extensive research requirements identified → Dedicated research phases when investigation blocks subsequent work
- Testing and validation requirements identified → Separate validation phases or integrated checkpoints
- Retained bottlenecks and critical path items → Natural phase boundaries at project constraints
- Simple scope understanding → Linear task progression without phase organization
- Quality standards and review requirements → Additional phase boundaries or extended phase scope for validation activities

#### Phase Scope Criteria
Evaluate phase necessity and boundaries against project requirements:
- Each phase delivers independent value toward project completion
- Phase boundaries align with retained workflow relationships and natural checkpoints
- Phase organization reduces cross-agent coordination complexity
- Phase scope supports Implementation Agent context preservation within domains
- Process requirements and quality standards support coherent phase organization and validation workflows

### 2.2. Phase Progression Logic
Transform defined project sequence in §2.1 into phased project structure:

#### Presentation Process
Present the full phase sequence with supporting rationale:
- List phases in execution order, providing justification based on retained workflow patterns: `Phase X: <Phase_Name>`
- Note phase dependencies and deliverable handoff points between phases
- Confirm that phase organization aligns with Context Synthesis insights and project requirements
- Ensure phase boundaries support natural workflow progression and minimize cross-phase coordination complexity
- Validate that process requirements and quality standards are appropriately integrated into phase structure
- Proceed to phase cycle execution (see §3) following the established sequence

#### First Chat Action
Present **in chat** phase sequence analysis before beginning phase cycles (see §3). This establishes project structure foundation for systematic task breakdown.

### 2.3. Implementation Plan Header Initialization
**MANDATORY**: Before proceeding to phase cycles (see §3), you **MUST** fill in the header of the `apa/[branch]/implementation-plan.md` file created by the `apa` CLI tool using `apa init`.

The file already contains a header template with placeholders. You must:
1. **Read the existing header** in `apa/[branch]/implementation-plan.md`
2. **Fill in all header fields**:
   - Replace `<Project Name>` with the actual project name
   - Replace `[To be filled by Setup Agent before Project Breakdown]` in **Last Modification** field with: "Plan creation by the Setup Agent."
   - Replace `[To be filled by Setup Agent before Project Breakdown]` in **Project Overview** field with a concise summary of the project
3. **Save the updated header** - This is a dedicated file edit operation that must be completed before any phase content is written

**Only after the header is complete**, proceed to phase cycles (see §3). All phase content will be appended to this file after the header.

## 3. Phase Cycle Execution

### 3.1. Phase Context Integration & Task Identification
**Context Integration Statement**: Before task identification, explicitly state **in chat** relevant retained insights for current phase: "From Context Synthesis, I retained [specific requirements/constraints/preferences]. For this phase, these influence task creation by [specific considerations or 'provide general project context but no direct task-level requirements']."

**Task Identification with Anti-Packing Guardrails**:
While identifying tasks for this phase, apply these tests for each potential task:

- **Single Focus Test**: "Can this be completed by one agent in one focused work session without context/mental mode switching?"
- **Domain Boundary Test**: "Does this involve multiple unrelated technical domains or skill sets?"  
- **Independent Value Test**: "If I split this into components, would each component deliver independent value?"
- **Single Unit of Work Deliverable Test**: "Does completion of this task result in a deliverable that can be accomplished as a single unit of work?"
- **Complexity Consistency Test**: "Does this task's complexity match others in the phase, or is it significantly more complex?"

**If any test suggests splitting, create separate tasks during identification.**

**Task Identification Process**: Transform phase objectives into focused tasks using retained Context Synthesis insights. Apply anti-packing guardrails continuously during identification. Each task should deliver independent value toward phase completion. No tasks should be heavy-packed and contain multiple deliverables and goals.

**Present Task List**: After applying guardrails, present **in chat** complete task list for phase: "Task X.1: [Name], Task X.2: [Name]..." before proceeding to individual analysis.

**Ad-Hoc Delegation Precheck:** While listing tasks, quickly flag any task requiring ad-hoc delegation based on retained insights. Use an inline marker after the task name: "(ad-hoc: <purpose>)". Keep it to five words or fewer; no reasoning here.

### 3.2. Individual Task Complete Analysis
**CRITICAL**: Analyze each task from §3.1 individually with complete reasoning before proceeding to next task. Never batch process multiple tasks. **For each identified task, complete the following systematic analysis in chat:**

```
#### **Task [X.Y]: [Task Name]**

**Scope Analysis:** 
This task accomplishes [specific goal] and requires [detailed scope analysis]. The deliverables are [clearly defined outputs or artifacts].

**Execution Assessment:**
Analyze what this task requires:
- **Agent Capabilities**: Code writing, file operations, terminal commands, IDE configuration, testing, documentation, tool-call actions
- **User Coordination**: External platforms, account authentication, repository settings, deployment configuration, design approval, feedback checkpoints
- **Mixed Requirements**: Separate agent vs user components in logical order

*State your assessment:* "This task requires [specific agent actions vs user coordination]. Evidence for agent execution: [specific IDE capabilities]. Evidence for user coordination: [external dependencies, account access needs]."

**Classification Decision:**
Evaluate the workflow structure:
- **Single-step criteria**: Cohesive work completable in one exchange, no internal dependencies, no validation points needed
- **Multi-step criteria**: Internal sequential dependencies, user confirmation needs, ad-hoc delegation needs, progressive validation requirements, complex implementation with natural breakpoints
- **Edge cases**: External platform coordination = multi-step, research needs = multi-step with ad-hoc delegation, complex technical work with breakpoints = multi-step
- **Test-first pattern**: When implementing features with acceptance criteria, create separate tasks: (1) Write tests specifying acceptance criteria, (2) Implement feature to satisfy tests, (3) Execute tests to validate implementation

*State your reasoning:* "Task [X.Y] involves [workflow description]. Based on [Context Synthesis insights, workflow factors, validation needs, technical dependencies], this requires [single/multi]-step execution because [specific reasoning]."

*For features with test requirements:* "This feature requires test validation. Creating Task [X.Y] to write tests (acceptance criteria), Task [X.Y+1] to implement (depends on X.Y), and Task [X.Y+2] to execute tests (depends on X.Y+1)."

**Content Specification:**
Determine appropriate task content:
- **Natural variation**: Base count on actual complexity, not pattern matching
- **Single-step guidelines**: Up to 4 bullets based on instruction complexity
- **Multi-step guidelines**: Up to 6 steps based on workflow dependencies  
- **Quality focus**: Content should match individual task complexity

*Justify your choice:*
- **If Single-step**: "This needs [X] bullet points because [complexity analysis]. Each bullet addresses [implementation guidance needs]."
- **If Multi-step**: "This needs [X] steps because [workflow dependency analysis]. Each step represents [natural progression]."

**Content Definition:**
- If flagged in §3.1, first add an ad-hoc delegation step: "Ad-Hoc Delegation – <purpose>" (optional ref to .claude/commands/apa.adhoc-subagent.md), then continue
- [Present actual bullets or steps with applied reasoning]

**Task [X.Y] analysis complete** ← State this before proceeding to next task
```

**Repeat this complete analysis for every task identified in §3.1.**

### 3.3. Phase Dependency Assessment
**After completing individual analysis for all phase tasks**, conduct holistic dependency review:

**Dependency Identification**: Look for retained "must do A before B" patterns from Context Synthesis for current phase. Identify genuine producer-consumer relationships between tasks analyzed in §3.2.

**Dependency Analysis**: Define dependencies based on real workflow requirements and process constraints, not artificial ones. Include process dependencies such as quality gates, validation requirements, and review checkpoints.

**Dependency List Presentation**: Present **in chat** complete dependency list with rationale using simple notation: "Task X.Y depends on Task Z.W output because [explicit reasoning]"

### 3.4. Phase Documentation Procedure
**CRITICAL WORKFLOW SEQUENCE**: Complete ALL individual task analyses from §3.2 and dependency assessment from §3.3 before any file operations.

#### File Creation Process
1. **Complete Phase Analysis in Chat First**: Present all individual task analyses and dependencies **in chat** before proceeding to file documentation
2. **File Operation Timing**: Append to `implementation-plan.md` only after complete phase cycle is presented **in chat**
3. **Single write operation**: Each phase cycle results in **exactly one** file append containing only current phase content

#### Content Translation Format
Translate completed individual analyses from §3.2-3.3 into structured file format, ensuring all reasoning insights and process requirements are preserved in task descriptions:

* **1. Document Header:** The header should already be filled in from §2.3. **DO NOT** overwrite or modify the header when writing phase content. Only append phase sections after the existing header.
* **2. Phase Sections:** Use level 2 headings: `## Phase <n>: <Name>`
* **3. Task Blocks:**
  - Use level 3 headings: `### Task <n.m> – <Title>`
  - Directly under heading, add these meta-fields:
    - **Objective:** One-sentence task goal.
    - **Output:** Concrete deliverable (e.g., "Auth module files").
    - **Guidance:** Key technical constraints or approach. Guidance for the Manager Agent to assign the task successfully.
* **4. Sub-Task Formatting:**
  - **Single-step**: Unordered list (`-`) for instructions.
  - **Multi-step**: Ordered list (`1.`, `2.`) for sequential steps.
  - **Content**: Steps/bullets derived in your Chat Analysis (§3.2) with additional detail (if needed). Preserve all individual analysis insights, process requirements, and implementation specifications from chat breakdown
  - **Ad-Hoc delegation steps:** prefix with `Ad-Hoc Delegation – <Purpose>` as a single line (optional short guide ref); no extended content in file
* **5. Dependency Format:** Add to the `Guidance` field of the Consumer Task:
  - `**Depends on: Task X.Y Output**`

## 4. Final Review & Plan Approval

### 4.1. Conceptual Plan Presentation & User Approval
Present plan overview and request User approval based on complete file and chat context:

#### Overview Summary Presentation
Present **in chat** high-level plan statistics:
- Total phases with names and task count
- Total task count, and total task count per task type
- Total dependency count
- Summary of process requirements and implementation specifications integrated

#### User Review & Approval Process
- Direct User to review complete structured plan in `implementation-plan.md`
- Reference detailed breakdown reasoning from previous chat exchanges (§2-§3)
- Confirm that Context Synthesis insights, including process requirements and quality standards, are reflected in task specifications
- Handle modification requests through targeted revisions to affected plan sections
- Iterate until explicit User approval.

#### Next Step Routing:
Once the plan is approved:
1. **If User requests Systematic Review:** Proceed to read `.apa/guides/project-breakdown-review-guide.md`.
2. **If User skips Review:** Proceed directly to **Manager Bootstrap Creation**.
  - **CRITICAL:** You must generate the Bootstrap Prompt using the **EXACT TEMPLATE** defined in your initiation prompt .claude/commands/apa.init.md.
  - **Context Recovery:** If you cannot retrieve the template word-for-word from your context, you must **READ** the .claude/commands/apa.init.md file to refresh your memory before generating the prompt. Do not approximate the template.

**End of Guide**