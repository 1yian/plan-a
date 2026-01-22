# APA Research Phase Guide

This guide defines how to structure research and investigation tasks within APA's implementation plans, particularly for exploratory work in brownfield environments or when technical decisions require investigation.

Inspired by GitHub Spec-Kit's research phase integration, this guide ensures investigation is explicit, documented, and feeds into subsequent planning.

---

## 1. When to Include Research Phase

### High-Value Research Scenarios

Include explicit research phase when:

- ✅ **Brownfield discovery**: Understanding existing system behavior, architecture, or constraints
- ✅ **Technical decision-making**: Evaluating libraries, frameworks, or architectural approaches
- ✅ **Performance investigation**: Measuring current system performance or capacity
- ✅ **Integration planning**: Understanding third-party APIs, services, or systems
- ✅ **Security analysis**: Assessing vulnerabilities, compliance requirements, or threat models
- ✅ **Feasibility studies**: Validating that proposed approach is technically viable

### Lower-Value Research Scenarios

Skip dedicated research phase for:

- ⚠️ **Well-understood technologies**: Standard libraries or frameworks team already uses
- ⚠️ **Simple integrations**: Basic API calls with clear documentation
- ⚠️ **Straightforward implementations**: No unknowns or technical risks
- ⚠️ **Greenfield with clear requirements**: Building from scratch with defined approach

---

## 2. Research Phase Structure

### Phase 0: Research & Discovery

When planning includes research, structure it as **Phase 0** (before main implementation):

```markdown
## Phase 0: Research & Discovery

**Objective**: Investigate [specific unknowns] to inform detailed planning of subsequent phases

**Outputs**:
- `research.md` - Research findings and recommendations
- Updated implementation plan with refined approach
- Risk assessment and mitigation strategies

### Task 0.1: [Investigation Topic]

**Objective**: [What needs to be discovered]

**Guidance**:
- Investigate [specific aspect]
- Document findings in `apa/[branch]/research.md`
- Answer key questions: [list questions]
- Provide recommendation for [decision]

**Output**: Research findings documented

**Dependencies**: None
```

### Research Task Pattern

Each research task should:

1. **Define clear questions**: What specifically needs to be answered?
2. **Specify investigation method**: Code analysis, performance testing, documentation review, prototyping?
3. **Document findings**: Write to `research.md` for future reference
4. **Provide recommendations**: What should we do based on findings?
5. **Update plan if needed**: Trigger tactical reassessment if discoveries change approach

---

## 3. Research Output: research.md

### File Location

```
apa/[branch]/research.md
```

### Template Structure

```markdown
# Research Findings: [Feature Name]

**Date**: [DATE]
**Researcher**: [Implementation Agent ID or User]
**Status**: [In Progress | Complete]

---

## Research Questions

1. [Question 1]
2. [Question 2]
3. [Question 3]

---

## Investigation 1: [Topic]

### Question
[What we needed to know]

### Method
[How we investigated - code analysis, testing, documentation review, etc.]

### Findings
[What we discovered]

### Evidence
[Code snippets, test results, performance metrics, documentation references]

### Recommendation
[What we should do based on findings]

### Impact on Plan
[How this affects implementation approach, if at all]

---

## Investigation 2: [Topic]

[Same structure as Investigation 1]

---

## Summary & Recommendations

### Key Findings
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

### Recommended Approach
[Overall recommendation based on all investigations]

### Risks Identified
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | [High/Med/Low] | [High/Med/Low] | [How to mitigate] |

### Plan Updates Required
- [ ] Update Phase [X] approach based on [finding]
- [ ] Add Task [Y] to address [discovery]
- [ ] Revise dependencies due to [constraint]

---

**Research Status**: [Complete | Requires Follow-up]
**Next Steps**: [What to do with these findings]
```

---

## 4. Research Task Types

### 4.1 Code Analysis (Brownfield)

**Purpose**: Understand existing system behavior

**Investigation Method**:
- Read relevant source files
- Trace execution paths
- Identify dependencies and integration points
- Document current behavior

**Example Task**:
```markdown
### Task 0.1: Analyze Existing Authentication System

**Objective**: Understand current auth implementation to plan integration

**Guidance**:
- Read `auth/` directory files
- Identify auth method (JWT, sessions, OAuth)
- Document token/session lifecycle
- Find integration points for new features
- Note any security concerns or technical debt

**Output**: Document findings in `research.md` under "Authentication Analysis"
```

### 4.2 Library Evaluation

**Purpose**: Choose between technical alternatives

**Investigation Method**:
- Review documentation and community support
- Compare features and performance
- Assess integration complexity
- Evaluate maintenance and security

**Example Task**:
```markdown
### Task 0.2: Evaluate WebSocket Libraries

**Objective**: Choose WebSocket library for real-time features

**Guidance**:
- Compare Socket.IO, ws, uWebSockets
- Criteria: performance, features, ease of use, maintenance
- Create comparison table in `research.md`
- Test basic prototype with top 2 candidates
- Recommend library with rationale

**Output**: Library recommendation with justification
```

### 4.3 Performance Investigation

**Purpose**: Measure current system performance or validate approach

**Investigation Method**:
- Run performance tests or benchmarks
- Measure latency, throughput, resource usage
- Identify bottlenecks
- Validate scalability

**Example Task**:
```markdown
### Task 0.3: Measure Current API Performance

**Objective**: Establish baseline performance metrics

**Guidance**:
- Use load testing tool (k6, Apache Bench, etc.)
- Test critical endpoints under load
- Measure: p50, p95, p99 latency, throughput, error rate
- Document results in `research.md`
- Identify performance bottlenecks

**Output**: Performance baseline and bottleneck analysis
```

### 4.4 Integration Research

**Purpose**: Understand third-party API or service

**Investigation Method**:
- Review API documentation
- Test authentication and basic operations
- Identify rate limits and constraints
- Document integration patterns

**Example Task**:
```markdown
### Task 0.4: Research Stripe Payment Integration

**Objective**: Understand Stripe API for payment implementation

**Guidance**:
- Review Stripe API docs for payment intents
- Test authentication with test keys
- Document webhook requirements
- Identify error handling patterns
- Note rate limits and retry strategies

**Output**: Integration approach documented in `research.md`
```

### 4.5 Feasibility Prototype

**Purpose**: Validate that proposed approach works

**Investigation Method**:
- Build minimal proof-of-concept
- Test critical assumptions
- Identify implementation challenges
- Validate performance characteristics

**Example Task**:
```markdown
### Task 0.5: Prototype Real-time Sync Mechanism

**Objective**: Validate WebSocket-based sync approach

**Guidance**:
- Build minimal WebSocket server and client
- Test connection stability and reconnection
- Measure message latency and throughput
- Identify edge cases (network issues, concurrent updates)
- Document findings and recommendations

**Output**: Prototype code and feasibility assessment
```

---

## 5. Integration with APA Workflow

### Research → Planning → Implementation

```
Phase 0: Research
  ↓ (discoveries documented in research.md)
Manager reads research.md
  ↓ (updates implementation plan if needed)
Phase 1+: Implementation
  ↓ (references research findings in task guidance)
Tasks executed with informed context
```

### Living Plan Updates from Research

When research reveals significant findings:

1. **Minor updates**: Manager updates task guidance directly
2. **Moderate changes**: Manager performs tactical reassessment
3. **Major discoveries**: User invokes `/apa.reassess` for strategic replanning

**Example**: Research discovers existing auth uses OAuth2, not sessions
- **Impact**: Moderate - changes integration approach
- **Action**: Manager updates Phase 2 tasks to integrate with OAuth2
- **Documentation**: Log change in plan modification log

---

## 6. Research Quality Standards

### Good Research Tasks

✅ **Clear questions**: Specific, answerable questions defined upfront
✅ **Appropriate method**: Investigation approach matches question type
✅ **Documented findings**: Results written to `research.md` for reference
✅ **Actionable recommendations**: Clear guidance on what to do next
✅ **Evidence-based**: Findings supported by code, tests, or documentation

### Poor Research Tasks

❌ **Vague objectives**: "Research the system" without specific questions
❌ **No documentation**: Findings only in agent memory, not persisted
❌ **No recommendations**: Discoveries without guidance on implications
❌ **Scope creep**: Research task becomes implementation task
❌ **Redundant investigation**: Re-researching what's already known

---

## 7. Research Phase Patterns

### Pattern 1: Brownfield Discovery

**Scenario**: Adding feature to existing system with unclear architecture

**Research Phase**:
```markdown
## Phase 0: System Discovery

### Task 0.1: Map Current Architecture
- Document system components and relationships
- Identify integration points for new feature
- Note technical debt or constraints

### Task 0.2: Analyze Existing Data Model
- Document current database schema
- Identify entities relevant to new feature
- Note migration requirements

### Task 0.3: Review Current API Patterns
- Document existing API conventions
- Identify consistency requirements
- Note authentication/authorization patterns
```

### Pattern 2: Technical Decision

**Scenario**: Need to choose between technical alternatives

**Research Phase**:
```markdown
## Phase 0: Technology Evaluation

### Task 0.1: Define Evaluation Criteria
- List requirements and constraints
- Define success metrics
- Identify deal-breakers

### Task 0.2: Evaluate Option A
- Test against criteria
- Document pros/cons
- Measure performance

### Task 0.3: Evaluate Option B
- Test against criteria
- Document pros/cons
- Measure performance

### Task 0.4: Make Recommendation
- Compare options against criteria
- Recommend approach with rationale
- Document trade-offs
```

### Pattern 3: Performance Investigation

**Scenario**: Need to understand current performance or validate approach

**Research Phase**:
```markdown
## Phase 0: Performance Analysis

### Task 0.1: Establish Baseline
- Measure current system performance
- Identify bottlenecks
- Document resource usage

### Task 0.2: Prototype Optimization
- Implement proposed improvement
- Measure performance impact
- Compare against baseline

### Task 0.3: Validate Scalability
- Test under load
- Identify scaling limits
- Document recommendations
```

---

## 8. Best Practices

### Do's

✅ **Plan research upfront**: Include Phase 0 when unknowns exist
✅ **Document everything**: Write findings to `research.md` for future reference
✅ **Answer specific questions**: Research should resolve concrete unknowns
✅ **Provide recommendations**: Don't just report findings, suggest actions
✅ **Update plan based on discoveries**: Use research to inform implementation
✅ **Reference research in tasks**: Link task guidance to relevant research findings

### Don'ts

❌ **Research during implementation**: Investigation should happen before detailed planning
❌ **Skip documentation**: Don't rely on agent memory, write it down
❌ **Endless research**: Set clear scope and time-box investigation
❌ **Ignore findings**: Research should influence planning and implementation
❌ **Duplicate investigation**: Check if research already exists before starting

---

## 9. Example: Complete Research Phase

### Scenario: Adding OAuth2 to Existing App

```markdown
## Phase 0: OAuth2 Integration Research

**Objective**: Investigate OAuth2 integration approach for existing authentication system

### Task 0.1: Analyze Current Authentication System

**Objective**: Understand existing auth to plan OAuth2 integration

**Guidance**:
- Read `auth/` directory to understand current implementation
- Document current auth flow (appears to be JWT-based)
- Identify integration points for OAuth2
- Note any migration requirements for existing users

**Output**: Current auth system documented in `research.md`

**Dependencies**: None

---

### Task 0.2: Evaluate OAuth2 Libraries

**Objective**: Choose OAuth2 library for implementation

**Guidance**:
- Compare Passport.js, Grant, simple-oauth2
- Criteria: ease of integration, provider support, maintenance
- Test basic OAuth2 flow with Google provider
- Document findings and recommendation in `research.md`

**Output**: Library recommendation with rationale

**Dependencies**: Task 0.1 (need to understand current auth first)

---

### Task 0.3: Design Migration Strategy

**Objective**: Plan how to migrate existing users to OAuth2

**Guidance**:
- Design approach for users with existing JWT sessions
- Plan account linking for users who sign up with OAuth2
- Document migration steps in `research.md`
- Identify risks and mitigation strategies

**Output**: Migration strategy documented

**Dependencies**: Task 0.1, Task 0.2

---

**Phase 0 Output**: `apa/[branch]/research.md` with:
- Current auth system analysis
- OAuth2 library recommendation (Passport.js)
- Migration strategy for existing users
- Updated implementation plan for Phase 1+
```

---

## 10. Research Foundation

This guide is based on:

**GitHub Spec-Kit (2025)**: Research phase integration in `/speckit.plan` workflow
- Explicit research phase before implementation
- Research agents gather technical context
- Output: `research.md` document with findings

**APA Living Plan Philosophy**: Discovery-driven planning
- Research informs adaptive planning
- Discoveries update implementation plan
- Bidirectional feedback between research and execution

**Agile Principles**: Iterative learning
- Build-Measure-Learn cycle
- Research reduces uncertainty
- Findings inform next steps

---

**End of Guide**

---

*This guide is adapted from [GitHub Spec-Kit](https://github.com/github/spec-kit) for use with APA's multi-agent orchestration model.*
