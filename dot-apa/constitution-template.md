<!-- All APA agents must read and enforce this constitution -->

# [PROJECT_NAME] Constitution

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]

---

## Core Principles

<!--
  IMPORTANT: Principles are the non-negotiable rules that guide all development decisions.
  Each principle should be:
  - Declarative (states what MUST/MUST NOT happen)
  - Testable (can be verified in code/process)
  - Specific (avoids vague language like "should consider")
  
  Number of principles should match project complexity:
  - Simple projects: 3-5 principles
  - Medium projects: 5-8 principles
  - Complex projects: 8-12 principles
-->

### I. [PRINCIPLE_1_NAME]

[PRINCIPLE_1_DESCRIPTION]

<!--
  Example: Library-First
  Every feature starts as a standalone library. Libraries must be self-contained, 
  independently testable, and documented. Clear purpose required - no organizational-only libraries.
-->

**Rationale**: [Why this principle exists and what problems it prevents]

**Validation**: [How to verify compliance - e.g., "Every new feature must have a library with tests"]

---

### II. [PRINCIPLE_2_NAME]

[PRINCIPLE_2_DESCRIPTION]

<!--
  Example: Test-First (NON-NEGOTIABLE)
  TDD mandatory: Tests written → User approved → Tests fail → Then implement.
  Red-Green-Refactor cycle strictly enforced.
-->

**Rationale**: [Why this principle exists and what problems it prevents]

**Validation**: [How to verify compliance]

---

### III. [PRINCIPLE_3_NAME]

[PRINCIPLE_3_DESCRIPTION]

<!--
  Example: Simplicity
  Start simple, YAGNI principles. Complexity must be justified.
  Prefer boring technology over novel solutions.
-->

**Rationale**: [Why this principle exists and what problems it prevents]

**Validation**: [How to verify compliance]

---

<!--
  Add additional principles as needed following the same format:
  
  ### N. [PRINCIPLE_N_NAME]
  [PRINCIPLE_N_DESCRIPTION]
  **Rationale**: [PRINCIPLE_N_RATIONALE]
  **Validation**: [PRINCIPLE_N_VALIDATION]
-->

---

## Quality Standards

<!--
  Define the quality bar for all work produced under this constitution.
  These standards apply to all agents and all phases of development.
-->

### Code Quality

[CODE_QUALITY_STANDARDS]

<!--
  Example:
  - All code must pass linting with zero warnings
  - Cyclomatic complexity must not exceed 10 per function
  - Code coverage must be at least 80% for new code
  - No commented-out code in production branches
-->

### Testing Requirements

[TESTING_REQUIREMENTS]

<!--
  Example:
  - Unit tests required for all business logic
  - Integration tests required for API endpoints
  - End-to-end tests required for critical user journeys
  - Tests must be deterministic (no flaky tests)
  - Test execution must complete in under 5 minutes
-->

### Documentation Standards

[DOCUMENTATION_STANDARDS]

<!--
  Example:
  - All public APIs must have docstrings
  - README required for each module/package
  - Architecture decisions must be documented in ADRs
  - Code comments explain "why", not "what"
-->

### Review Process

[REVIEW_PROCESS_REQUIREMENTS]

<!--
  Example:
  - All changes require peer review before merge
  - Constitution compliance must be verified in review
  - Breaking changes require explicit approval
  - Security-sensitive changes require security review
-->

---

## Technical Constraints

<!--
  Define the technical boundaries that all agents must respect.
  These constraints ensure consistency and prevent architectural drift.
-->

### Technology Stack

**Language/Framework**: [LANGUAGE_FRAMEWORK_CONSTRAINTS]

<!--
  Example: Python 3.11+, FastAPI for APIs, React 18+ for frontend
-->

**Dependencies**: [DEPENDENCY_CONSTRAINTS]

<!--
  Example: 
  - Prefer standard library over external dependencies
  - All dependencies must be actively maintained (updated within 6 months)
  - Security vulnerabilities must be addressed within 48 hours
-->

### Architecture

**Architecture Style**: [ARCHITECTURE_CONSTRAINTS]

<!--
  Example: 
  - Microservices with event-driven communication
  - Hexagonal architecture (ports and adapters)
  - Monorepo with shared libraries
-->

**Integration Patterns**: [INTEGRATION_PATTERNS]

<!--
  Example:
  - REST APIs for synchronous communication
  - Message queues for asynchronous communication
  - GraphQL for complex data fetching
-->

### Performance

[PERFORMANCE_CONSTRAINTS]

<!--
  Example:
  - API response time p95 < 200ms
  - Page load time < 2 seconds
  - Database queries < 100ms
  - Support 10,000 concurrent users
-->

### Security

[SECURITY_CONSTRAINTS]

<!--
  Example:
  - All data encrypted at rest and in transit
  - Authentication required for all endpoints except public APIs
  - Input validation on all user inputs
  - Regular security audits and penetration testing
-->

---

## Implementation Guidelines

<!--
  Provide specific guidance for agents implementing features.
  These guidelines ensure consistency across the codebase.
-->

### Code Style

[CODE_STYLE_GUIDELINES]

<!--
  Example:
  - Follow PEP 8 for Python code
  - Use ESLint with Airbnb config for JavaScript
  - Maximum line length: 100 characters
  - Use meaningful variable names (no single-letter except loop counters)
-->

### File Organization

[FILE_ORGANIZATION_GUIDELINES]

<!--
  Example:
  src/
  ├── models/        # Data models and entities
  ├── services/      # Business logic
  ├── api/           # API endpoints
  └── utils/         # Shared utilities
  
  tests/
  ├── unit/          # Unit tests
  ├── integration/   # Integration tests
  └── e2e/           # End-to-end tests
-->

### Naming Conventions

[NAMING_CONVENTION_GUIDELINES]

<!--
  Example:
  - Classes: PascalCase (UserService)
  - Functions: snake_case (get_user_by_id)
  - Constants: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
  - Files: snake_case (user_service.py)
  - Test files: test_<module_name>.py
-->

### Error Handling

[ERROR_HANDLING_GUIDELINES]

<!--
  Example:
  - Use custom exceptions for domain errors
  - Always log errors with context
  - Return meaningful error messages to users
  - Never expose internal errors to external users
  - Implement retry logic for transient failures
-->

---

## Brownfield-Specific Guidelines *(optional)*

<!--
  Include this section if working with existing codebases.
  These guidelines help maintain consistency while evolving legacy systems.
-->

### Existing Code Preservation

[PRESERVATION_GUIDELINES]

<!--
  Example:
  - Do not modify existing APIs without deprecation period
  - Maintain backward compatibility for at least 2 major versions
  - Document all breaking changes in CHANGELOG
-->

### Migration Strategy

[MIGRATION_STRATEGY]

<!--
  Example:
  - Strangler fig pattern for replacing legacy components
  - Feature flags for gradual rollout
  - Parallel run old and new systems during transition
-->

### Technical Debt Management

[TECH_DEBT_GUIDELINES]

<!--
  Example:
  - Document all technical debt in GitHub issues with "tech-debt" label
  - Allocate 20% of sprint capacity to technical debt reduction
  - No new features until critical technical debt is addressed
-->

---

## Governance

### Versioning Policy

This constitution follows semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Backward-incompatible governance/principle removals or redefinitions
- **MINOR**: New principle/section added or materially expanded guidance
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements

### Amendment Process

1. **Proposal**: Amendments must be proposed with clear rationale
2. **Review**: [AMENDMENT_REVIEW_PROCESS]
   <!--
     Example: Reviewed by tech lead and at least 2 senior engineers
   -->
3. **Approval**: [AMENDMENT_APPROVAL_REQUIREMENTS]
   <!--
     Example: Requires unanimous approval from tech leads
   -->
4. **Implementation**: Update constitution version, dates, and propagate changes to dependent artifacts
5. **Communication**: Announce changes to all team members and update training materials

### Compliance Review

**Frequency**: [COMPLIANCE_REVIEW_FREQUENCY]
<!--
  Example: Every sprint, or before each major release
-->

**Scope**: [COMPLIANCE_REVIEW_SCOPE]
<!--
  Example: All code changes, architecture decisions, and process changes
-->

**Enforcement**: All APA agents must validate their outputs against this constitution before completion. The Planning Agent must verify constitution compliance during Project Breakdown. The Manager Agent must enforce principles during task execution.

### Constitution Violations

When a violation is necessary (rare):

1. **Document**: Clearly document why the violation is necessary
2. **Justify**: Explain why alternatives were rejected
3. **Track**: Add to complexity tracking table in implementation plan
4. **Review**: Require explicit approval from [APPROVAL_AUTHORITY]
5. **Remediate**: Create plan to remove violation in future

**Complexity Tracking Format**:

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

---

## Amendment History

| Version | Date | Summary | Changed By |
|---------|------|---------|------------|
| [CONSTITUTION_VERSION] | [RATIFICATION_DATE] | Initial constitution ratification | [AUTHOR] |

---

## Sync Impact Report

<!--
  This section is automatically generated when the constitution is updated.
  It tracks which dependent artifacts need to be updated to maintain consistency.
-->

### Last Sync: [LAST_SYNC_DATE]

**Version Change**: [OLD_VERSION] → [NEW_VERSION]

**Modified Principles**:
- [List of changed principles]

**Added Sections**:
- [List of new sections]

**Removed Sections**:
- [List of removed sections]

**Dependent Artifacts**:
- ✅ `.apa/specification-template.md` - Updated
- ✅ `.apa/implementation-plan-template.md` - Updated
- ✅ `.apa/guides/project-breakdown-guide.md` - Updated
- ⚠ [Other files requiring manual update]

**Follow-up TODOs**:
- [Any deferred items or manual updates needed]

---

**End of Constitution**

---

*This constitution template is adapted from [GitHub Spec-Kit](https://github.com/github/spec-kit) for use with APA's multi-agent orchestration model.*
