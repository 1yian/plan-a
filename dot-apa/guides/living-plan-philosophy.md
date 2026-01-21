# APA 0.1.0 - Living Plan Philosophy

This guide defines how implementation plans evolve during execution based on discoveries, particularly in brownfield/greenfield mixed environments.

Inspired by GitHub Spec-Kit's Specification-Driven Development principles, this guide ensures plans adapt to reality rather than forcing reality to match rigid plans.

## 1. Core Principle

**Plans are living documents that evolve alongside implementation, not rigid artifacts created once and followed blindly.**

From Spec-Kit:
> "Specs become living documents that evolve alongside your code, not dusty artifacts that you write once and forget."

In APA:
> "Implementation plans evolve based on execution discoveries, not waterfall documents that block adaptation."

## 2. Plan Evolution vs Reassessment

### Continuous Plan Refinement (Normal)

**What it is**: Minor updates to the plan based on discoveries during implementation.

**When to use**:
- Discovered existing system behavior in brownfield code
- Found better approach while implementing
- Clarified ambiguous requirements through exploration
- Adjusted task guidance based on actual file structure
- Updated dependencies based on real outputs

**How it works**:
- Manager Agent updates `implementation-plan.md` directly
- Documents change in plan's modification log
- Continues execution with updated plan
- **No user involvement needed**

**Example**: "Task 2.3 discovered authentication uses OAuth2, not sessions. Updated Task 2.4 to integrate with OAuth2 flow."

### Tactical Reassessment (Manager-Led)

**What it is**: Moderate adjustments requiring coordination but not full replanning.

**When to use**:
- Multiple tasks reveal pattern requiring adjustment
- Phase approach needs refinement based on discoveries
- New tasks needed within current phase scope
- Reordering tasks within phase for efficiency

**How it works**:
- Manager Agent makes adjustments autonomously
- Documents rationale in plan modification log
- May pause affected tasks temporarily
- Resumes with updated approach
- **No user involvement needed**

**Example**: "Tasks 3.1-3.3 revealed data model is more complex. Adding Task 3.4 to handle edge cases before proceeding to Phase 4."

### Strategic Reassessment (User-Invoked)

**What it is**: Major plan revision requiring user decision and replanning.

**When to use**:
- Core assumptions invalidated
- Multiple phases need restructuring
- Significant scope changes
- Fundamental approach change needed
- Trade-offs require user decision

**How it works**:
- Manager pauses affected tasks
- Creates reassessment context document
- User invokes `/apa.reassess` command
- Full replanning session occurs
- **User involvement required**

**Example**: "Discovered legacy system cannot be modified. Requires complete architectural change from 'migrate' to 'integrate via API'."

## 3. Discovery-Driven Planning

### Brownfield Discovery Pattern

In brownfield environments, implementation often reveals unknowns:

**Pattern**:
1. **Explore**: Task investigates existing system
2. **Discover**: Finds actual behavior, constraints, patterns
3. **Update Plan**: Manager refines subsequent tasks based on discoveries
4. **Continue**: Execution proceeds with updated understanding

**Example Flow**:
```
Task 1.1: Investigate existing auth system
  Discovery: Uses custom JWT implementation, not standard library
  
Manager Action: Update Task 1.2 guidance
  Before: "Integrate with standard auth library"
  After: "Work with existing custom JWT implementation in auth/jwt.js"
  
Task 1.2: Proceeds with accurate context
```

### Greenfield Exploration Pattern

In greenfield work, early implementation informs later decisions:

**Pattern**:
1. **Prototype**: Early task explores approach
2. **Validate**: Tests feasibility and performance
3. **Refine Plan**: Manager adjusts subsequent tasks based on results
4. **Scale**: Later tasks build on validated approach

**Example Flow**:
```
Task 2.1: Prototype data sync mechanism
  Discovery: Polling works but WebSocket more efficient
  
Manager Action: Update Phase 3 tasks
  Before: "Implement polling-based sync"
  After: "Implement WebSocket-based sync with fallback to polling"
  
Phase 3: Proceeds with better approach
```

## 4. Bidirectional Feedback

From Spec-Kit:
> "Production reality informs specification evolution. Metrics, incidents, and operational learnings become inputs for specification refinement."

In APA:
> "Implementation reality informs plan evolution. Discoveries, constraints, and execution learnings update the plan continuously."

### Feedback Loop

```
Plan → Implementation → Discovery → Plan Update → Continue
  ↑                                                    ↓
  └────────────────────────────────────────────────────┘
```

**Not**:
```
Plan → Implementation → Discovery → Ignore → Force original plan → Fail
```

### Examples of Bidirectional Feedback

**Performance Discovery**:
- Task discovers operation is slower than expected
- Manager updates subsequent tasks to add caching
- Plan now reflects performance reality

**Integration Discovery**:
- Task discovers API has rate limits
- Manager updates tasks to add retry logic and backoff
- Plan now reflects integration constraints

**Architecture Discovery**:
- Task discovers existing pattern that should be followed
- Manager updates tasks to maintain consistency
- Plan now reflects architectural reality

## 5. Test Scenarios as Specification

From Spec-Kit:
> "Test scenarios aren't written after code, they're part of the specification that generates both implementation and tests."

In APA:
> "Test requirements are specified upfront as acceptance criteria, not afterthoughts."

### Test-First Planning Pattern

When planning tasks:
1. **Specify acceptance criteria** as testable conditions
2. **Create test writing task** to codify criteria
3. **Create implementation task** to satisfy tests
4. **Create test execution task** to validate implementation

**Example**:
```
Task 3.1: Specify user authentication acceptance criteria
  Output: Test scenarios in tests/auth.test.js (not implemented)
  
Task 3.2: Implement user authentication
  Depends on: Task 3.1
  Acceptance: Must pass tests specified in Task 3.1
  
Task 3.3: Execute authentication tests
  Depends on: Task 3.2
  Required: Run `npm test tests/auth.test.js` and capture output
```

## 6. Plan Update Protocol

### When to Update Plan

Update the plan when:
- Discovery changes understanding of problem
- Better approach identified during implementation
- Existing system behavior clarified
- Dependencies or constraints discovered
- Task guidance needs refinement for accuracy

### How to Update Plan

**Manager Agent**:
1. Read current `apa/[branch]/implementation-plan.md`
2. Identify section to update (task guidance, dependencies, etc.)
3. Make targeted edit to affected section
4. Add entry to plan modification log:
   ```markdown
   ## Plan Modifications
   
   ### [Date] - [Phase.Task]
   **Reason**: [Discovery or finding]
   **Change**: [What was updated]
   **Impact**: [Which tasks affected]
   ```
5. Continue execution with updated plan

### What NOT to Update

Don't update the plan for:
- Normal debugging iterations
- Expected implementation variations
- Stylistic preferences
- Minor wording improvements

Only update when discoveries **materially affect** subsequent tasks.

## 7. Agile Implementation

**Key Insight**: The plan can change as implementation happens.

This is not failure - this is **learning**.

### Agile Principles in APA

**Respond to change** over following a plan:
- Discoveries update the plan
- Plan serves implementation, not vice versa
- Adaptation is expected and encouraged

**Working software** over comprehensive documentation:
- Implementation validates assumptions
- Real results inform next steps
- Plan reflects reality, not wishful thinking

**Collaboration** over rigid process:
- Manager and agents work together
- User involved for strategic decisions
- Plan evolves through collaboration

### Brownfield Agility

In brownfield environments:
- **Expect unknowns**: Existing systems have undocumented behavior
- **Plan for discovery**: Early tasks investigate, later tasks implement
- **Update continuously**: Each discovery refines understanding
- **Preserve learnings**: Document discoveries for future reference

### Greenfield Agility

In greenfield environments:
- **Prototype early**: Validate approaches before full implementation
- **Learn from results**: Early tasks inform later decisions
- **Iterate quickly**: Small tasks allow rapid feedback
- **Refine continuously**: Plan improves as understanding grows

## 8. Research Foundation

This philosophy is based on:

**GitHub Spec-Kit (2025)**: Specification-Driven Development principles
- Specifications as living documents
- Bidirectional feedback loops
- Test scenarios as specification
- Continuous refinement over one-time gates

**Agile Manifesto**: Core agile principles
- Responding to change over following a plan
- Working software over comprehensive documentation
- Collaboration over rigid process

**Lean Startup**: Build-Measure-Learn cycle
- Build (implement task)
- Measure (discover reality)
- Learn (update plan)

---

**End of Guide**
