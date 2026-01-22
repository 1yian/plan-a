# Always Plan Ahead (APA)

*Manage complex projects with a team of AI assistants, smoothly and efficiently.*

## What is APA?

**Always Plan Ahead (APA)** is fork of [APM](https://github.com/sdi2200262/agentic-project-management) that brings real-world project management principles into your AI-assisted workflows. 

It is built on addresses a fundamental challenge of LLMs: **context window limitations** by transforming Claude Code from an implementor to an orchestrator of implementation subagents and by enforcing a persistent memory system.
This frees up context usage in your Claude session, allowing for longer sessions that accomplish more at a higher quality.

## Installation

Install APM CLI globally via NPM:

```bash
npm install -g @1yian/apa
```

Or install locally in your project:

```bash
npm install @1yian/apa
```

When you run `apm init`, simply select your AI assistant from the list, and APM will automatically configure the appropriate command structure for your environment.

</details>

## Getting Started

Follow these simple steps to start using APM in your project:

1. **Navigate to your project directory** in your terminal.

2. **Run the APA initialization command in your repo:**
   ```bash
   apa init .
   ```

3. **APM automatically installs:**
   - `.apa/` directory with APM guides and initial assets
   - APM slash commands in your Claude's local command directory
   - Necessary installation meta-data

5. **Open your AI assistant chat** and enter the slash command:
   ```
   /apa.init
   ```

6. **Follow the established APA workflow:**

   **Traditional Workflow:**
   ```
   /apa.init → /apa.plan → /apa.implement
   ```

   **Specification-Driven Workflow (New):**
   ```
   /apa.init → /apa.specify → /apa.plan → /apa.implement
   ```

   **Full Workflow with Constitution (Recommended for Complex Projects):**
   ```
   /apa.init → /apa.constitution → /apa.specify → /apa.plan → /apa.implement
   ```

## Features

### 🎯 Specification-Driven Development

APA now supports optional specification-driven workflow adapted from [GitHub Spec-Kit](https://github.com/github/spec-kit):

- **`/apa.specify`**: Create structured feature specifications with prioritized user stories, acceptance criteria, and measurable success criteria
- **`/apa.constitution`**: Establish project principles, quality standards, and technical constraints
- **Research Phase**: Explicit investigation and documentation before implementation
- **Living Documents**: Specifications and plans evolve during implementation

**When to use:**
- ✅ Complex features requiring detailed requirements
- ✅ Brownfield projects needing documentation of existing systems
- ✅ Projects with multiple stakeholders requiring alignment
- ✅ Features with unclear scope benefiting from structured analysis

**When to skip:**
- ⚠️ Simple, well-defined features (go directly to `/apa.plan`)
- ⚠️ Personal projects or prototypes

### 🤖 Multi-Agent Orchestration

- **Manager Agent**: Orchestrates implementation subagents and coordinates task execution
- **Implementation Agents**: Execute individual tasks with focused context
- **Persistent Memory**: Session summaries and research findings preserved across sessions
- **Adaptive Planning**: Plans evolve based on discoveries during implementation

### 📋 Structured Planning

- **Context Synthesis**: Structured requirements gathering through question rounds
- **Project Breakdown**: Phases and tasks with dependencies and guidance
- **Constitution Compliance**: Validate plans against project principles
- **Discovery-Driven**: Exploratory phases for brownfield and uncertain work

## Workflow Comparison

| Feature | Traditional APA | Specification-Driven |
|---------|----------------|---------------------|
| **Requirements** | Gathered in Context Synthesis | Structured specification created first |
| **User Stories** | Implicit in planning | Explicit, prioritized (P1, P2, P3) |
| **Success Criteria** | Defined during planning | Measurable, technology-agnostic |
| **Brownfield Support** | Discovery during implementation | "As-is" and "to-be" documented upfront |
| **Constitution** | Optional template | Integrated with compliance validation |
| **Research** | Ad-hoc during tasks | Explicit Phase 0 with documentation |
| **Best For** | Simple, well-defined features | Complex features, brownfield, stakeholder alignment |

## Commands

### Core Commands

- **`/apa.init`**: Initialize APA session
- **`/apa.plan`**: Create implementation plan through Context Synthesis and Project Breakdown
- **`/apa.implement`**: Execute implementation plan with Manager-Agent orchestration
- **`/apa.status`**: Check current session status
- **`/apa.resume`**: Resume paused session
- **`/apa.reassess`**: Strategic replanning when major discoveries invalidate plan

### Specification-Driven Commands (New)

- **`/apa.constitution`**: Establish project principles and quality standards
- **`/apa.specify`**: Create structured feature specification from natural language

## Documentation

### Guides

- **[Specification-Driven Workflow](dot-apa/guides/specification-driven-workflow.md)**: Complete guide to using specification-driven development in APA
- **[Living Plan Philosophy](dot-apa/guides/living-plan-philosophy.md)**: How plans evolve during implementation
- **[Research Phase Guide](dot-apa/guides/research-phase-guide.md)**: Structuring investigation and documentation
- **[Context Synthesis Guide](dot-apa/guides/context-synthesis-guide.md)**: Requirements gathering methodology
- **[Project Breakdown Guide](dot-apa/guides/project-breakdown-guide.md)**: Task breakdown methodology
- **[Manager Guide](dot-apa/guides/manager-guide.md)**: Manager agent orchestration
- **[Memory System Guide](dot-apa/guides/memory-system-guide.md)**: Persistent memory and session summaries

### Templates

- **[Specification Template](dot-apa/specification-template.md)**: Structured feature specification
- **[Constitution Template](dot-apa/constitution-template.md)**: Project principles and standards
- **[Implementation Plan Template](dot-apa/implementation-plan-template.md)**: Task breakdown structure

## Example: Specification-Driven Workflow

### Scenario: Adding OAuth2 to Existing App

```bash
# 1. Initialize session
/apa.init

# 2. Establish project principles (optional)
/apa.constitution Create constitution focused on security, testing, and backward compatibility

# 3. Create feature specification
/apa.specify Add OAuth2 authentication to existing JWT-based auth system. Support Google and GitHub providers. Existing users should be able to link OAuth2 accounts.

# 4. Create implementation plan (uses specification as input)
/apa.plan

# 5. Execute implementation
/apa.implement
```

**What you get:**

- **Constitution** (`apa/[branch]/constitution.md`):
  - Security-first principle
  - Test-first requirement
  - Backward compatibility constraint

- **Specification** (`apa/[branch]/specification.md`):
  - Current State: JWT-based auth documented
  - User Story 1 (P1): New users can sign up with OAuth2
  - User Story 2 (P1): Existing users can link OAuth2 accounts
  - Success Criteria: 90% of new users choose OAuth2

- **Implementation Plan** (`apa/[branch]/implementation-plan.md`):
  - Phase 0: OAuth2 Integration Research
  - Phase 1: OAuth2 Core Implementation
  - Phase 2: Migration & Testing
  - Constitution compliance validated

- **Research Findings** (`apa/[branch]/research.md`):
  - Current auth system analysis
  - OAuth2 library recommendation
  - Migration strategy

## Credits

APA is a fork of [APM](https://github.com/sdi2200262/agentic-project-management) by [@sdi2200262](https://github.com/sdi2200262).

Specification-driven workflow adapted from [GitHub Spec-Kit](https://github.com/github/spec-kit) by [@github](https://github.com/github).

## License

MIT
