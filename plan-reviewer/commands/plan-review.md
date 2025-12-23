---
description: Start iterative plan review with fresh context
argument-hint: [plan-file-path]
---

# Plan Review Command

You are orchestrating an iterative plan review process. Follow these steps precisely.

## Step 1: Resolve Plan Path and Create Working Copy

1. If `$1` is provided, use that as the original plan path
2. Otherwise, use Glob to find `.claude/plans/*.md` and use the first result (most recently modified)
3. If no plans exist, inform the user and stop
4. **Create a working copy in cwd**: Copy the original plan to `./{original_name}.review.md` in the current working directory (e.g., `.claude/plans/my-feature.md` → `./my-feature.review.md`)
5. All modifications will be made to the working copy, preserving the original

## Step 2: Run Review Iteration

For each iteration, spawn 6 reviewer subagents **in parallel** using the Task tool.

All 6 use the same agent (`plan-reviewer:reviewer`) with different persona prompts. This agent has `model: sonnet` and `thinking_budget: extended` for deep analysis.

**CRITICAL - Context Isolation**: Each prompt must be completely self-contained. Do NOT include any information about previous iterations, prior findings, what was fixed, or conversation history. The subagent must review the plan with zero prior assumptions.

Use these exact prompt templates (only substitute `{plan_path}` with the actual path):

```
Task 1 - Architecture Review:
  prompt: "You are a Principal Architect. Read the plan at {plan_path}. Review for STRUCTURAL INTEGRITY only.
  - Are the chosen design patterns appropriate?
  - Is the solution over-engineered or under-engineered?
  - Are we introducing technical debt or tight coupling?
  - Could this be simplified using existing abstractions?"
  subagent_type: "plan-reviewer:reviewer"

Task 2 - Feasibility Review:
  prompt: "You are a Staff Engineer. Read the plan at {plan_path}. Review for EXECUTION REALITY only.
  - Verify if referenced files, classes, and methods actually exist.
  - Are the proposed libraries compatible with the current stack?
  - Is the implementation complexity underestimated?
  - Identify any 'magical thinking' where steps are glossed over."
  subagent_type: "plan-reviewer:reviewer"

Task 3 - Logic & Gap Review:
  prompt: "You are a Lead QA Engineer. Read the plan at {plan_path}. Review for LOGIC GAPS only.
  - Play 'Devil's Advocate': How can I break this workflow?
  - What happens if inputs are null, empty, or malformed?
  - Are there missing steps in the user journey?
  - Do not focus on code style; focus on broken logic."
  subagent_type: "plan-reviewer:reviewer"

Task 4 - Security Review:
  prompt: "You are a Security Engineer. Read the plan at {plan_path}. Review for RISK only.
  - Identify IDOR, Injection, or XSS risks.
  - Critique how secrets and configuration are handled.
  - Review authorization checks (is user permission verified at every step?)."
  subagent_type: "plan-reviewer:reviewer"

Task 5 - Operations Review:
  prompt: "You are a Site Reliability Engineer (SRE). Read the plan at {plan_path}. Review for MAINTAINABILITY only.
  - How will we debug this in production? (Logs, Metrics).
  - Is there a rollout and rollback strategy?
  - Are feature flags used correctly?
  - What is the performance impact on the database?"
  subagent_type: "plan-reviewer:reviewer"

Task 6 - Integration Review:
  prompt: "You are an Integration Architect. Read the plan at {plan_path}. Review for SYSTEM BOUNDARIES only.
  - Check API contract changes (breaking vs non-breaking).
  - Review database schema changes for backward compatibility.
  - Verify third-party API usage limits or constraints."
  subagent_type: "plan-reviewer:reviewer"
```

**IMPORTANT**:
- Launch all 6 Task calls in a single message to run them in parallel
- Never add context like "the user just fixed X" or "we previously found Y"
- Each subagent sees ONLY the plan file, nothing else
- The reviewer agent handles JSON output format internally

## Step 3: Validate Findings

After all 6 agents return, spawn a validation agent to review their combined output:

```
Task - Validate Reviews:
  prompt: "Here are the findings from 6 plan reviewers:

  {all_reviewer_outputs_as_json}

  Read the plan at {plan_path}. For each issue and question raised, determine if it is valid and actionable. Filter out:
  - False positives
  - Nitpicks that don't matter
  - Issues already addressed in the plan
  - Redundant questions asking the same thing

  Output only the validated questions that deserve user attention."
  subagent_type: "plan-reviewer:reviewer"
```

## Step 4: Ask User Questions

After the validation agent returns:
1. For each validated question, mark the first option as "(Recommended)" in the label
2. Include the question's `context` field in the question text so the user understands what part of the plan is being discussed
3. Use AskUserQuestion tool to ask all validated questions at once

For each option's description, be descriptive: explain tradeoffs, benefits, and implications of choosing that option.

**The user has NOT read the plan recently.** Each question must be self-contained with enough context to understand what's being asked and why it matters.

If no validated questions, skip to Step 6 (Track Progress).

## Step 5: Modify the Plan

After user answers, spawn a plan-modifier agent with a **self-contained prompt**.

**Note**: Use the working copy path (`*.review.md`), not the original.

**CRITICAL - Context Isolation**: The modifier prompt must contain ONLY:
1. The working copy path
2. The specific modifications to make (derived from user answers)

Do NOT include conversation history, previous iterations, or why the user made these choices.

```
Task:
  prompt: "You are a Technical Writer. Read the plan at {plan_path}. Apply these modifications:
    1. [Specific change from user answer 1]
    2. [Specific change from user answer 2]
    ...
  Use Edit tool to update the plan. Keep it as the current best version (not a changelog). Do not assume any prior context. Output JSON: {modifications_made: ['mod1', ...], success: true}"
  subagent_type: "general-purpose"
```

Example good prompt:
```
"You are a Technical Writer. Read the plan at .claude/plans/feature.md. Apply these modifications:
  1. Add Testing section with unit tests and integration tests
  2. Change database approach from raw SQL to Supabase migrations
  3. Add rollback plan to Production Strategy section
Use Edit tool to update the plan. Keep it as the current best version. Do not assume any prior context. Output JSON: {modifications_made: [...], success: true}"
```

## Step 6: Track Progress

Maintain these counters (in your working memory):
- `iteration`: Current iteration number (starts at 1)
- `clean_passes`: Consecutive iterations with no issues (starts at 0)

After each iteration:
- If issues were found: reset `clean_passes = 0`
- If no issues found: increment `clean_passes += 1`

## Step 7: Continue or Complete

```
IF clean_passes < 2:
  - Report: "Iteration {iteration} complete. Clean passes: {clean_passes}/2. Starting next iteration..."
  - Increment iteration
  - Go back to Step 2 (spawn fresh 6 agents)

ELSE (clean_passes == 2):
  - Report: "Plan review complete! 2 consecutive clean passes achieved."
  - Stop
```

## Output Format

For each iteration, report:

```
## Iteration {N}

### Reviewer Findings
- Architecture: {summary}
- Feasibility: {summary}
- Logic & Gaps: {summary}
- Security: {summary}
- Operations: {summary}
- Integration: {summary}

### Validated Questions
[After validation agent filters the findings]

### Questions for User
[AskUserQuestion called here]

### Modifications Made
[After user answers]

### Status
- Issues found: {count}
- Clean passes: {clean_passes}/2
- Next: {continuing/complete}
```
