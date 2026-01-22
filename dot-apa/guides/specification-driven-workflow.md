# Specification-Driven Workflow in APA

This guide explains how to use APA's specification-driven workflow, adapted from GitHub Spec-Kit's methodology, to create high-quality software with clear requirements and structured planning.

---

## Overview

APA now supports an **optional specification-driven workflow** that combines:
- **Spec-Kit's specification rigor**: Structured requirements, prioritized user stories, measurable success criteria
- **APA's multi-agent orchestration**: Manager-agent coordination, adaptive planning, living documents

This workflow is **recommended for**:
- Complex features requiring detailed requirements
- Brownfield projects needing documentation of existing systems
- Projects with multiple stakeholders requiring clear specifications
- Features with unclear scope that benefit from structured analysis

For simple, well-defined features, you can skip `/apa.specify` and go directly to `/apa.plan`.

---

## The Workflow

### Traditional APA Workflow (Still Supported)

```
/apa.init → /apa.plan → /apa.implement
```

### Specification-Driven Workflow (New)

```
/apa.init → /apa.specify → /apa.plan → /apa.implement
              ↓              ↓
        specification.md  uses spec as input
```

### Full Workflow with Constitution (Recommended for Complex Projects)

```
/apa.init → /apa.constitution → /apa.specify → /apa.plan → /apa.implement
              ↓                    ↓              ↓
        constitution.md      specification.md  validates compliance
```

---

## Command Reference

### 1. `/apa.init` - Initialize Session

**Purpose**: Set up APA session directory and metadata

**Usage**:
```
/apa.init
```

**Output**:
- `apa/[branch]/metadata.json` - Session metadata
- Session directory structure

**Next Step**: `/apa.constitution` (optional) or `/apa.specify` (optional) or `/apa.plan`

---

### 2. `/apa.constitution` - Establish Project Principles (Optional)

**Purpose**: Define project principles, quality standards, and technical constraints that guide all development

**When to Use**:
- ✅ Starting new project with team
- ✅ Establishing coding standards and conventions
- ✅ Defining architectural principles
- ✅ Setting quality gates and review processes
- ⚠️ Optional for personal projects or well-established codebases

**Usage**:
```
/apa.constitution Create constitution focused on code quality, testing standards, and simplicity
```

**Output**:
- `apa/[branch]/constitution.md` - Project constitution with principles, standards, and constraints

**What It Includes**:
- **Core Principles**: Non-negotiable rules (e.g., "Test-First", "Simplicity", "Library-First")
- **Quality Standards**: Code quality, testing requirements, documentation standards
- **Technical Constraints**: Technology stack, architecture, performance, security
- **Implementation Guidelines**: Code style, file organization, naming conventions, error handling
- **Governance**: Versioning policy, amendment process, compliance review

**Next Step**: `/apa.specify` (optional) or `/apa.plan`

---

### 3. `/apa.specify` - Create Feature Specification (Optional)

**Purpose**: Create structured feature specification from natural language description

**When to Use**:
- ✅ Complex features requiring detailed requirements
- ✅ Brownfield projects needing "as-is" and "to-be" documentation
- ✅ Features with multiple user scenarios
- ✅ Projects requiring stakeholder alignment
- ⚠️ Optional for simple, well-defined features

**Usage**:
```
/apa.specify Build a user authentication system with email/password and OAuth2 support
```

**Output**:
- `apa/[branch]/specification.md` - Feature specification
- `apa/[branch]/checklists/specification-quality.md` - Quality validation checklist

**What It Includes**:
- **Purpose & Context**: Why this feature matters, current state (brownfield), desired state
- **User Scenarios & Testing**: Prioritized user stories (P1, P2, P3) with acceptance criteria
- **Requirements**: Functional requirements with identifiers (FR-001, FR-002, etc.)
- **Success Criteria**: Measurable, technology-agnostic outcomes
- **Key Entities**: Data models and relationships
- **Discovery Needs**: Questions requiring investigation (especially brownfield)
- **Notes & Constraints**: Technical, business, and dependency constraints

**Feature Types**:
- **Greenfield**: Building something completely new
- **Brownfield**: Modifying/extending existing system (includes "Current State" section)
- **Mixed**: New feature that integrates with existing system

**Next Step**: `/apa.plan` (will use specification as input)

---

### 4. `/apa.plan` - Create Implementation Plan

**Purpose**: Gather requirements and create detailed implementation plan

**Enhanced Behavior with Specification**:
- **If specification exists**: Uses spec as foundation for Context Synthesis, skips basic questions
- **If constitution exists**: Uses constitution for quality standards and constraints, skips redundant questions
- **If neither exists**: Runs full Context Synthesis as before

**Usage**:
```
/apa.plan
```

**Output**:
- `apa/[branch]/implementation-plan.md` - Detailed task breakdown
- `apa/[branch]/research.md` - Research findings (if Phase 0 included)

**What It Includes**:
- **Context Synthesis**: Requirements gathering (enhanced by specification)
- **Project Breakdown**: Phases and tasks with dependencies
- **Constitution Compliance**: Validation against project principles (if constitution exists)
- **Research Phase**: Phase 0 for investigation (if needed)

**Next Step**: `/apa.implement`

---

### 5. `/apa.implement` - Execute Implementation

**Purpose**: Execute implementation plan with Manager-Agent orchestration

**Usage**:
```
/apa.implement
```

**Behavior**: Same as before, but now:
- Tasks reference specification acceptance criteria
- Manager validates constitution compliance
- Research findings inform task execution

---

## Specification-Driven Workflow Benefits

### 1. Clarity Before Coding

**Problem**: Jumping into implementation with unclear requirements leads to rework
**Solution**: Specification defines WHAT and WHY before HOW

**Example**:
```
Without Spec: "Build authentication"
With Spec: 
  - User Story 1 (P1): Users can sign up with email/password
  - User Story 2 (P2): Users can log in with Google OAuth2
  - Success Criteria: 95% of users complete signup in under 2 minutes
```

### 2. Stakeholder Alignment

**Problem**: Different stakeholders have different expectations
**Solution**: Specification provides single source of truth for requirements

**Example**:
- Product Manager: Focuses on user stories and success criteria
- Developer: Focuses on functional requirements and constraints
- QA: Focuses on acceptance scenarios and edge cases
- All read the same specification document

### 3. Brownfield Documentation

**Problem**: Existing systems lack clear documentation
**Solution**: Specification documents "as-is" state before defining "to-be" changes

**Example**:
```markdown
## Current State (Brownfield)
System currently uses JWT authentication with 24-hour expiration.
Users can only sign up with email/password.

## Desired State
Add OAuth2 support while maintaining existing JWT authentication.
Users can link multiple auth methods to one account.
```

### 4. Measurable Success

**Problem**: No clear definition of "done" or success
**Solution**: Success criteria define measurable outcomes

**Example**:
```markdown
## Success Criteria
- SC-001: Users can complete signup in under 2 minutes
- SC-002: System handles 10,000 concurrent users
- SC-003: 95% of users successfully complete primary task on first attempt
```

### 5. Prioritized Development

**Problem**: Everything seems equally important
**Solution**: User stories prioritized (P1, P2, P3) for incremental delivery

**Example**:
```markdown
### User Story 1 - Email/Password Signup (Priority: P1)
**Why this priority**: Core functionality, required for MVP

### User Story 2 - OAuth2 Login (Priority: P2)
**Why this priority**: Improves UX but not required for launch

### User Story 3 - Social Profile Import (Priority: P3)
**Why this priority**: Nice-to-have, can be added later
```

---

## Constitution-Driven Development Benefits

### 1. Consistent Standards

**Problem**: Different parts of codebase follow different conventions
**Solution**: Constitution defines project-wide standards

**Example**:
```markdown
## Core Principles

### I. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement.
Red-Green-Refactor cycle strictly enforced.

**Validation**: Every task must include test writing before implementation
```

### 2. Architectural Alignment

**Problem**: Technical decisions drift from intended architecture
**Solution**: Constitution defines architectural principles

**Example**:
```markdown
## Technical Constraints

### Architecture Style
Microservices with event-driven communication.
Hexagonal architecture (ports and adapters).

**Validation**: All new services must follow hexagonal architecture pattern
```

### 3. Quality Gates

**Problem**: Quality standards are subjective or inconsistent
**Solution**: Constitution defines measurable quality standards

**Example**:
```markdown
## Quality Standards

### Code Quality
- All code must pass linting with zero warnings
- Cyclomatic complexity must not exceed 10 per function
- Code coverage must be at least 80% for new code
```

### 4. Justified Violations

**Problem**: Sometimes you need to violate principles, but it's not tracked
**Solution**: Constitution requires documenting and justifying violations

**Example**:
```markdown
## Constitution Compliance

| Principle | Compliance | Notes |
|-----------|------------|-------|
| Test-First | ⚠ Violation | Prototype phase, tests added in Phase 2 |
| Simplicity | ✓ Compliant | Using minimal dependencies |
```

---

## Research Phase Benefits

### 1. Explicit Investigation

**Problem**: Investigation happens ad-hoc during implementation
**Solution**: Research phase makes investigation explicit and planned

**Example**:
```markdown
## Phase 0: OAuth2 Integration Research

### Task 0.1: Analyze Current Authentication System
Understand existing auth to plan OAuth2 integration

### Task 0.2: Evaluate OAuth2 Libraries
Choose OAuth2 library for implementation

### Task 0.3: Design Migration Strategy
Plan how to migrate existing users to OAuth2
```

### 2. Documented Findings

**Problem**: Research findings lost in chat history
**Solution**: Research documented in `research.md` for future reference

**Example**:
```markdown
# Research Findings: OAuth2 Integration

## Investigation 1: Current Authentication System

### Findings
- System uses custom JWT implementation in `auth/jwt.js`
- Tokens expire after 24 hours
- No refresh token mechanism

### Recommendation
- Keep JWT for API authentication
- Add OAuth2 for initial login
- Implement refresh token mechanism
```

### 3. Informed Planning

**Problem**: Planning happens without understanding constraints
**Solution**: Research informs subsequent phase planning

**Example**:
```
Phase 0: Research discovers OAuth2 library choice and constraints
  ↓
Manager updates Phase 1 tasks with specific library and integration approach
  ↓
Phase 1: Implementation uses researched approach
```

---

## Example: Complete Workflow

### Scenario: Adding OAuth2 to Existing App

#### Step 1: Initialize Session

```
/apa.init
```

**Output**: `apa/oauth2-integration/metadata.json`

---

#### Step 2: Establish Constitution (Optional)

```
/apa.constitution Create constitution focused on security, testing, and backward compatibility
```

**Output**: `apa/oauth2-integration/constitution.md`

**Key Principles**:
- Security-first: All auth changes require security review
- Test-first: Tests before implementation
- Backward compatibility: Existing users must not be affected

---

#### Step 3: Create Specification

```
/apa.specify Add OAuth2 authentication to existing JWT-based auth system. Support Google and GitHub providers. Existing users should be able to link OAuth2 accounts.
```

**Output**: `apa/oauth2-integration/specification.md`

**Key Sections**:
- **Current State**: JWT-based auth with 24-hour tokens
- **Desired State**: OAuth2 support with account linking
- **User Story 1 (P1)**: New users can sign up with OAuth2
- **User Story 2 (P1)**: Existing users can link OAuth2 accounts
- **User Story 3 (P2)**: Users can unlink OAuth2 accounts
- **Success Criteria**: 90% of new users choose OAuth2 over email/password

---

#### Step 4: Create Implementation Plan

```
/apa.plan
```

**Context Synthesis**:
- Reads specification for requirements (skips basic questions)
- Reads constitution for standards (uses security and testing principles)
- Asks about OAuth2 provider preferences (Google and GitHub specified)
- Asks about deployment timeline and rollout strategy

**Project Breakdown**:
```markdown
## Phase 0: OAuth2 Integration Research
- Task 0.1: Analyze current auth system
- Task 0.2: Evaluate OAuth2 libraries
- Task 0.3: Design migration strategy

## Phase 1: OAuth2 Core Implementation
- Task 1.1: Set up OAuth2 library (Passport.js)
- Task 1.2: Implement Google provider
- Task 1.3: Implement GitHub provider
- Task 1.4: Add account linking logic

## Phase 2: Migration & Testing
- Task 2.1: Write integration tests
- Task 2.2: Test with existing users
- Task 2.3: Security review
- Task 2.4: Deploy to staging

## Constitution Compliance
| Principle | Compliance | Notes |
|-----------|------------|-------|
| Security-first | ✓ Compliant | Security review in Task 2.3 |
| Test-first | ✓ Compliant | Tests in Task 2.1 before deployment |
| Backward compatibility | ✓ Compliant | Existing JWT auth preserved |
```

---

#### Step 5: Execute Implementation

```
/apa.implement
```

**Manager orchestrates**:
- Phase 0: Research tasks investigate and document findings
- Manager reads `research.md` and updates Phase 1 tasks with specific library
- Phase 1: Implementation tasks reference specification acceptance criteria
- Phase 2: Testing validates specification success criteria
- Manager validates constitution compliance throughout

**Living Plan Updates**:
- Research discovers OAuth2 library choice → Manager updates Phase 1 guidance
- Testing reveals edge case → Manager adds task to handle it
- All changes logged in plan modification log

---

## When to Use Each Component

### Use `/apa.constitution` When:

- ✅ Starting new project with team
- ✅ Establishing coding standards
- ✅ Defining architectural principles
- ✅ Setting quality gates
- ✅ Working in regulated environment (compliance requirements)

### Use `/apa.specify` When:

- ✅ Complex features requiring detailed requirements
- ✅ Brownfield projects needing documentation
- ✅ Features with multiple user scenarios
- ✅ Projects requiring stakeholder alignment
- ✅ Unclear scope that benefits from structured analysis

### Use Research Phase When:

- ✅ Brownfield discovery (understanding existing systems)
- ✅ Technical decision-making (evaluating alternatives)
- ✅ Performance investigation (measuring current state)
- ✅ Integration planning (understanding third-party APIs)
- ✅ Feasibility studies (validating approach)

### Skip to `/apa.plan` When:

- ⚠️ Simple, well-defined features
- ⚠️ Personal projects without team coordination
- ⚠️ Prototypes or experiments
- ⚠️ Well-understood implementations

---

## Best Practices

### Specification Best Practices

1. **Focus on WHAT and WHY, not HOW**
   - ✅ "Users must be able to reset password via email"
   - ❌ "Implement password reset using JWT tokens and SendGrid API"

2. **Make success criteria measurable**
   - ✅ "Users can complete signup in under 2 minutes"
   - ❌ "Signup should be fast"

3. **Prioritize user stories**
   - P1: Must-have for MVP
   - P2: Important but not critical
   - P3: Nice-to-have

4. **Document brownfield context**
   - Current State: What exists now
   - Desired State: What you want to achieve
   - Preservation Criteria: What must not break

### Constitution Best Practices

1. **Make principles testable**
   - ✅ "Code coverage must be at least 80%"
   - ❌ "Code should be well-tested"

2. **Justify violations when necessary**
   - Document why violation is needed
   - Explain why alternatives were rejected
   - Track in complexity tracking table

3. **Keep it concise**
   - 3-5 principles for simple projects
   - 5-8 principles for medium projects
   - 8-12 principles for complex projects

4. **Version and evolve**
   - Use semantic versioning (MAJOR.MINOR.PATCH)
   - Document amendments in history
   - Propagate changes to dependent artifacts

### Research Best Practices

1. **Define clear questions upfront**
   - What specifically needs to be answered?
   - What decisions depend on this research?

2. **Document findings in `research.md`**
   - Don't rely on agent memory
   - Future tasks reference research findings

3. **Provide recommendations**
   - Don't just report findings
   - Suggest what to do based on discoveries

4. **Update plan based on research**
   - Use discoveries to inform implementation
   - Trigger tactical reassessment if needed

---

## Comparison with Spec-Kit

### What APA Adopts from Spec-Kit

✅ **Specification template structure**: User stories, requirements, success criteria
✅ **Constitution-driven constraints**: Project principles and quality standards
✅ **Research phase integration**: Explicit investigation before implementation
✅ **Living document philosophy**: Specifications evolve during implementation
✅ **Measurable success criteria**: Technology-agnostic, user-focused outcomes

### What APA Adds to Spec-Kit

🔧 **Multi-agent orchestration**: Manager coordinates implementation subagents
🔧 **Brownfield support**: Explicit "Current State" and "Desired State" sections
🔧 **Adaptive planning**: Discovery-driven planning with tactical reassessment
🔧 **Session-based workflow**: Persistent memory across sessions
🔧 **Optional specification**: Can skip to `/apa.plan` for simple features

### Key Difference

**Spec-Kit**: Specification-first, code generation from specs
**APA**: Specification-optional, orchestration-first, adaptive planning

APA combines Spec-Kit's specification rigor with APA's multi-agent orchestration and adaptive planning philosophy.

---

## Troubleshooting

### "Should I use `/apa.specify` or go straight to `/apa.plan`?"

**Use `/apa.specify` if**:
- Feature is complex with multiple user scenarios
- You're working in brownfield and need to document existing system
- Multiple stakeholders need to align on requirements
- Scope is unclear and benefits from structured analysis

**Skip to `/apa.plan` if**:
- Feature is simple and well-defined
- You're working alone on personal project
- Building prototype or experiment
- Requirements are obvious and unambiguous

### "My specification has [NEEDS CLARIFICATION] markers. What do I do?"

The Specification Agent will:
1. Present questions with suggested answers
2. Wait for your response
3. Update specification with your choices
4. Re-validate specification quality

You should answer all clarification questions before proceeding to `/apa.plan`.

### "Can I update the specification during implementation?"

**Yes!** Specifications are living documents (like APA's living plans):
- Manager can update specification based on discoveries
- Log changes in "Specification Evolution Log"
- Specification and plan evolve together

### "Do I need a constitution for every project?"

**No.** Constitution is optional and recommended for:
- Team projects requiring coordination
- Projects with specific quality standards
- Regulated environments with compliance requirements

For personal projects or simple features, you can skip constitution.

---

## Further Reading

- **Specification Template**: `.apa/specification-template.md`
- **Constitution Template**: `.apa/constitution-template.md`
- **Research Phase Guide**: `.apa/guides/research-phase-guide.md`
- **Living Plan Philosophy**: `.apa/guides/living-plan-philosophy.md`
- **GitHub Spec-Kit**: https://github.com/github/spec-kit

---

**Ready to start?**

```
/apa.init
/apa.constitution [optional]
/apa.specify [optional]
/apa.plan
/apa.implement
```

---

*This workflow is adapted from [GitHub Spec-Kit](https://github.com/github/spec-kit) for use with APA's multi-agent orchestration model.*
