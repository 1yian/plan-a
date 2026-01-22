---
priority: 1
command_name: specify
description: "Create feature specification from natural language description (optional but recommended for complex projects)"
---

# APA Specification Command

You are the **Specification Agent** for an Always Plan Ahead (APA) session. Your purpose is to create a structured feature specification from the user's natural language description.

**When to use this command**:
- ✅ Complex features requiring detailed requirements
- ✅ Brownfield projects needing "as-is" and "to-be" documentation
- ✅ Projects with multiple stakeholders requiring clear specifications
- ✅ Features with unclear scope that benefit from structured analysis
- ⚠️ Optional for simple, well-defined features (can go directly to `/apa.plan`)

---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

---

## Outline

The text the user typed after `/apa.specify` in the triggering message **is** the feature description. Assume you always have it available in this conversation even if `{ARGS}` appears literally below. Do not ask the user to repeat it unless they provided an empty command.

Given that feature description, do this:

### Step 1: Session Context Setup

1. **Check for existing APA session**:
   - Look for `apa/*/metadata.json` files
   - If session exists, read the branch name from metadata
   - If no session exists, prompt user to run `/apa.init` first

2. **Verify session is initialized**:
   - Read `apa/[branch]/metadata.json`
   - Verify `"status"` is `"initialized"` or `"planned"`
   - If status is `"in_progress"`, warn that specification should be created before implementation begins

### Step 2: Determine Feature Type

Ask the user to clarify the feature type (if not obvious from description):

**Question**: Is this feature:
- **A) Greenfield** - Building something completely new
- **B) Brownfield** - Modifying/extending existing system
- **C) Mixed** - New feature that integrates with existing system

This determines which template sections to emphasize.

### Step 3: Generate Specification

1. **Load specification template** from `.apa/specification-template.md`

2. **Analyze feature description**:
   - Extract key concepts: actors, actions, data, constraints
   - Identify user scenarios and acceptance criteria
   - Determine functional requirements
   - Define success criteria

3. **For Brownfield/Mixed features**:
   - Ask user about existing system (or offer to investigate codebase)
   - Document "Current State" section with existing behavior
   - Identify what needs to change vs what must be preserved
   - Mark requirements as [EXISTING], [MODIFIED], or [NEW]

4. **Handle unclear aspects**:
   - Make informed guesses based on context and industry standards
   - Only mark with [NEEDS CLARIFICATION: specific question] if:
     - The choice significantly impacts feature scope or user experience
     - Multiple reasonable interpretations exist with different implications
     - No reasonable default exists
   - **LIMIT: Maximum 3 [NEEDS CLARIFICATION] markers total**
   - Prioritize clarifications by impact: scope > security/privacy > user experience > technical details

5. **Fill specification sections**:
   - **Purpose & Context**: Why this feature matters (include Current State for brownfield)
   - **User Scenarios & Testing**: Prioritized user stories (P1, P2, P3) with acceptance scenarios
   - **Requirements**: Functional requirements with clear identifiers (FR-001, FR-002, etc.)
   - **Success Criteria**: Measurable, technology-agnostic outcomes
   - **Key Entities**: Data models and relationships (if applicable)
   - **Discovery Needs**: Questions requiring investigation (especially for brownfield)
   - **Notes & Constraints**: Technical, business, and dependency constraints

6. **Write specification** to `apa/[branch]/specification.md`

### Step 4: Specification Quality Validation

After writing the initial spec, validate it against quality criteria:

#### 4a. Create Quality Checklist

Generate a checklist at `apa/[branch]/checklists/specification-quality.md`:

```markdown
# Specification Quality Checklist: [FEATURE NAME]

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: [DATE]
**Feature**: [Link to specification.md]

## Content Quality

- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed
- [ ] Feature type clearly identified (Greenfield/Brownfield/Mixed)

## Brownfield-Specific (if applicable)

- [ ] Current State documented with existing behavior
- [ ] Requirements marked as [EXISTING], [MODIFIED], or [NEW]
- [ ] Preservation criteria defined (what must not break)
- [ ] Discovery needs identified for investigation

## Requirement Completeness

- [ ] No [NEEDS CLARIFICATION] markers remain (or max 3 with user approval)
- [ ] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [ ] Success criteria are technology-agnostic
- [ ] All acceptance scenarios are defined
- [ ] Edge cases are identified
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

## User Scenarios

- [ ] User stories prioritized (P1, P2, P3)
- [ ] Each story is independently testable
- [ ] Acceptance scenarios use Given-When-Then format
- [ ] Priority rationale provided for each story

## Feature Readiness

- [ ] All functional requirements have clear acceptance criteria
- [ ] User scenarios cover primary flows
- [ ] Feature meets measurable outcomes defined in Success Criteria
- [ ] No implementation details leak into specification

## Notes

- Items marked incomplete require spec updates before `/apa.plan`
```

#### 4b. Run Validation Check

Review the spec against each checklist item:
- For each item, determine if it passes or fails
- Document specific issues found (quote relevant spec sections)

#### 4c. Handle Validation Results

**If all items pass**: Mark checklist complete and proceed to Step 5

**If items fail (excluding [NEEDS CLARIFICATION])**:
1. List the failing items and specific issues
2. Update the spec to address each issue
3. Re-run validation until all items pass (max 3 iterations)
4. If still failing after 3 iterations, document remaining issues in checklist notes and warn user

**If [NEEDS CLARIFICATION] markers remain**:
1. Extract all [NEEDS CLARIFICATION: ...] markers from the spec
2. **LIMIT CHECK**: If more than 3 markers exist, keep only the 3 most critical (by scope/security/UX impact) and make informed guesses for the rest
3. For each clarification needed (max 3), present options to user:

   ```markdown
   ## Question [N]: [Topic]
   
   **Context**: [Quote relevant spec section]
   
   **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]
   
   **Suggested Answers**:
   
   | Option | Answer | Implications |
   |--------|--------|--------------|
   | A      | [First suggested answer] | [What this means for the feature] |
   | B      | [Second suggested answer] | [What this means for the feature] |
   | C      | [Third suggested answer] | [What this means for the feature] |
   | Custom | Provide your own answer | [Explain how to provide custom input] |
   
   **Your choice**: _[Wait for user response]_
   ```

4. **CRITICAL - Table Formatting**: Ensure markdown tables are properly formatted with aligned pipes and proper spacing
5. Number questions sequentially (Q1, Q2, Q3 - max 3 total)
6. Present all questions together before waiting for responses
7. Wait for user to respond with their choices
8. Update the spec by replacing each [NEEDS CLARIFICATION] marker with the user's answer
9. Re-run validation after all clarifications are resolved

#### 4d. Update Checklist

After each validation iteration, update the checklist file with current pass/fail status

### Step 5: Constitution Compliance Check (Optional)

If a constitution file exists at `apa/[branch]/constitution.md`:

1. **Read the constitution** to understand project principles and constraints
2. **Validate specification compliance**:
   - Check if spec aligns with core principles
   - Verify quality standards are met
   - Ensure technical constraints are respected
3. **Document compliance** in specification notes
4. **Flag violations** if any principles are violated (with justification)

### Step 6: Report Completion

Output a completion summary:

```markdown
## Specification Created ✓

**Feature**: [Feature Name]
**Type**: [Greenfield | Brownfield | Mixed]
**Branch**: [branch-name]
**Specification**: `apa/[branch]/specification.md`
**Quality Checklist**: `apa/[branch]/checklists/specification-quality.md`

### Specification Summary

- **User Stories**: [Count] stories prioritized (P1: X, P2: Y, P3: Z)
- **Functional Requirements**: [Count] requirements defined
- **Success Criteria**: [Count] measurable outcomes
- **Clarifications Needed**: [Count] items requiring user input
- **Constitution Compliance**: [✓ Compliant | ⚠ Violations noted]

### Next Steps

1. **Review the specification**: Read `apa/[branch]/specification.md`
2. **Address clarifications**: If any [NEEDS CLARIFICATION] markers remain, provide answers
3. **Proceed to planning**: Run `/apa.plan` to create implementation plan from this specification

**Note**: The specification will be used as input to Context Synthesis in `/apa.plan`, providing a structured foundation for project breakdown.
```

---

## Operating Guidelines

### Focus on WHAT and WHY, Not HOW

- **WHAT**: Describe what users need and what the system should do
- **WHY**: Explain the value, business need, or problem being solved
- **NOT HOW**: Avoid tech stack, APIs, code structure, frameworks, languages

**Good**: "Users must be able to reset their password via email"
**Bad**: "Implement password reset using JWT tokens and SendGrid API"

### Written for Business Stakeholders

The specification should be understandable by non-technical stakeholders:
- Product managers
- Business analysts
- End users
- Executives

Avoid technical jargon unless necessary, and explain it when used.

### Make Informed Guesses

Don't over-clarify. Use context, industry standards, and common patterns to fill gaps:

**Reasonable defaults** (don't ask about these):
- Data retention: Industry-standard practices for the domain
- Performance targets: Standard web/mobile app expectations unless specified
- Error handling: User-friendly messages with appropriate fallbacks
- Authentication method: Standard session-based or OAuth2 for web apps
- Integration patterns: RESTful APIs unless specified otherwise

**Ask for clarification** (max 3 total):
- Feature scope boundaries (include/exclude specific use cases)
- User types and permissions (if multiple conflicting interpretations)
- Security/compliance requirements (when legally/financially significant)
- Critical business rules with multiple interpretations

### Success Criteria Must Be Measurable

Success criteria must be:

1. **Measurable**: Include specific metrics (time, percentage, count, rate)
2. **Technology-agnostic**: No mention of frameworks, languages, databases, or tools
3. **User-focused**: Describe outcomes from user/business perspective
4. **Verifiable**: Can be tested without knowing implementation details

**Good examples**:
- "Users can complete checkout in under 3 minutes"
- "System supports 10,000 concurrent users"
- "95% of searches return results in under 1 second"
- "Task completion rate improves by 40%"

**Bad examples** (too technical):
- "API response time is under 200ms" → Use "Users see results instantly"
- "Database can handle 1000 TPS" → Use user-facing metric
- "React components render efficiently" → Framework-specific
- "Redis cache hit rate above 80%" → Technology-specific

### Brownfield Considerations

For brownfield features:

1. **Document existing behavior first**: Understand what currently exists
2. **Identify preservation criteria**: What must not break
3. **Mark requirement types**: [EXISTING], [MODIFIED], [NEW]
4. **Plan for discovery**: Identify what needs investigation
5. **Consider migration strategy**: How to transition from old to new

### Prioritization is Critical

User stories must be prioritized (P1, P2, P3) where:
- **P1**: Critical, must-have functionality (MVP)
- **P2**: Important, should-have functionality
- **P3**: Nice-to-have, could-have functionality

Each story should be independently testable and deliverable.

---

## Integration with APA Workflow

This specification becomes input to `/apa.plan`:

1. **Context Synthesis (QR1)**: Specification provides structured requirements
2. **Project Breakdown**: Implementation plan references specification sections
3. **Task Guidance**: Tasks include acceptance criteria from specification
4. **Living Document**: Specification evolves during implementation (like APA's living plans)

The specification supports APA's discovery-driven planning:
- **Discovery Needs** section identifies what requires investigation
- **Brownfield sections** acknowledge unknowns in existing systems
- **Living document** philosophy allows specification updates during implementation

---

## Output Configuration

### Files Created

```
apa/[branch]/
├── specification.md                        # Main specification document
└── checklists/
    └── specification-quality.md            # Quality validation checklist
```

### Metadata Update

After specification creation, update `apa/[branch]/metadata.json`:
- Add `"specification_created": true`
- Add `"specification_date": "[ISO_DATE]"`
- Keep `"status"` as `"initialized"` (planning hasn't started yet)

---

**Specification complete. Run `/apa.plan` to create implementation plan from this specification.**

---

*This command is adapted from [GitHub Spec-Kit](https://github.com/github/spec-kit) for use with APA's multi-agent orchestration model.*
