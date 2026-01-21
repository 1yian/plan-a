# APA 0.1.0 - Fail-Fast Escalation Guide

This guide defines when and how Implementation Agents should escalate blockers to the Manager Agent rather than attempting partial solutions or workarounds.

Both Manager and Implementation Agents must read this guide during session initialization. Implementation Agents reference it when encountering blockers; Manager Agents use it when reviewing blocked tasks.

## 1. Core Principle

**"Do nothing and escalate early" beats "do something partial and report success"**

When blocked, agents must:
1. Detect the blocker immediately
2. Log blocker details with actionable information
3. Set status to "Blocked" (not "Partial" or "Completed")
4. Report to manager and wait for unblocking
5. **DO NOT** attempt workarounds or partial solutions

## 2. Blocker Detection Criteria

### Immediate Escalation Required

**Missing Dependencies**
- Cannot install required packages or libraries
- Package installation fails due to version conflicts
- Required system dependencies not available

**Environment Not Ready**
- Database not set up or not accessible
- Configuration files missing or incomplete
- Required services not running
- Environment variables not configured

**Insufficient Permissions**
- Cannot access required files or directories
- Cannot execute required commands
- Cannot connect to required resources (APIs, databases)

**Ambiguous Requirements**
- Task description unclear or contradictory
- Multiple valid interpretations possible
- Missing critical information needed to proceed

**Confidence Below Threshold**
- Uncertain how to proceed with critical operations
- Multiple approaches possible with unclear tradeoffs
- Risk of breaking existing functionality

### Attempt Recovery First (Then Escalate If Fails)

**Transient Errors**
- Network timeouts (retry with exponential backoff)
- Temporary service unavailability (retry up to 3 times)
- Race conditions (retry with delay)

**Minor Syntax Errors**
- Typos in generated code (fix and retry)
- Missing semicolons or brackets (fix and retry)
- Import statement errors (fix and retry)

**Known Error Patterns**
- Documented errors with clear solutions
- Common issues with established fixes
- Errors with clear resolution paths in documentation

### Never Escalate (Handle Autonomously)

**Normal Development Iteration**
- Standard debugging cycles
- Normal test failures during development
- Expected errors with clear resolution paths
- Iterative refinement of implementation

## 3. Prohibited Anti-Patterns

Based on research from Datagrid (Aug 2025) and Concentrix (Aug 2025):

❌ **"Silently skip sections"** - Completing task without implementing all requirements

❌ **"Partial completion without validation"** - Marking task complete when only partially done

❌ **"Stubbornly hold on to tasks"** - Continuing despite clear blockers to maintain "containment rate"

❌ **"Do something small to make up for it"** - Implementing workarounds or substitute solutions

❌ **"Self-report success without execution"** - Claiming completion without actually running tests or validating

## 4. Fail-Fast Protocol

When blocker detected:

```
1. STOP immediately - do not attempt workarounds
2. LOG blocker details:
   - What is blocking (specific error, missing resource, ambiguity)
   - Why it's blocking (what cannot be done without it)
   - What's needed to unblock (specific action required)
3. SET status to "Blocked" in memory log
4. REPORT to manager with actionable information
5. WAIT for manager to unblock - do not improvise
```

### Blocker Report Format

In memory log, include:

```markdown
## Issues
**Status**: Blocked

**Blocker**: <specific description>

**Impact**: Cannot proceed with <specific task step> because <reason>

**Required to Unblock**: <specific action needed>
- Example: "Install pytest package: `pip install pytest`"
- Example: "Clarify requirement: Should validation be client-side or server-side?"
- Example: "Set up database: Run migration scripts in `db/migrations/`"

**Attempted**: <what was tried, if applicable>

**Context Preserved**: <relevant state for resume>
```

## 5. Manager Response Protocol

When reviewing blocked tasks, Manager Agent should:

### 1. Review Blocker Details
- Read the blocker description and required action
- Verify the blocker is legitimate (not a recoverable error)
- Check if blocker reveals wrong agent assignment

### 2. Unblock
Choose appropriate action:

**A. Direct Unblocking** (Manager can resolve):
- Install missing dependencies
- Set up environment (database, config)
- Clarify ambiguous requirements
- Provide missing information

**B. Resume Same Agent**:
- After unblocking, resume the same agent
- Provide updated context with unblocking details
- Agent continues from where it stopped

**C. Reassign Task**:
- If blocker reveals wrong agent (e.g., needs different expertise)
- If original agent cannot proceed even after unblocking
- Assign to more appropriate agent with full context

### 3. Update Plan If Needed
If blocker reveals:
- Missing phase or task in plan
- Incorrect dependency ordering
- Environmental prerequisites not documented

Then update implementation plan before resuming.

## 6. Escalation Thresholds

### High-Impact Blockers (Escalate Immediately)
- Cannot proceed with any part of task
- Risk of breaking existing functionality if guessing
- Ambiguity affects core architecture or data model
- Missing critical information for acceptance criteria

### Medium-Impact Blockers (Attempt Recovery, Then Escalate)
- Can proceed with other parts of task
- Clear alternative approaches exist
- Temporary or transient issues
- Non-critical missing information

### Low-Impact Blockers (Handle Autonomously)
- Does not affect task completion
- Clear resolution path exists
- Standard development issues
- Well-documented error patterns

## 7. Context Preservation for Resume

When escalating, preserve:

**Work Completed**
- Files created or modified
- Code written so far
- Tests implemented
- Documentation updated

**Current State**
- What step was being executed when blocked
- What was about to be done next
- Relevant variables, configurations, or context

**Decision Trail**
- Why certain approaches were chosen
- What alternatives were considered
- What assumptions were made

**Blocker Context**
- Exact error messages or symptoms
- What was tried to resolve
- Why standard approaches didn't work

This allows Manager to unblock and resume efficiently without rework.

## 8. Research Foundation

This protocol is based on best practices from:

**Datagrid (Aug 2025)**: "Escalation triggers work best when they balance keeping agents autonomous with getting humans involved before problems become expensive."

**Concentrix (Aug 2025)**: "Escalate too often, and you lose efficiency. Escalate too late, and you lose customers."

**Partnership on AI (Sep 2025)**: "Effective automated monitoring should act as a triage system: resolving minor issues automatically while escalating critical failures immediately."

---

**End of Guide**
