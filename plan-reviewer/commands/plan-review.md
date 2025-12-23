---
description: Start iterative plan review with fresh context
argument-hint: [plan-file-path]
---

# Plan Review Command

You are orchestrating an iterative plan review process. Follow these steps precisely.

## Step 1: Resolve Plan Path

1. If `$1` is provided, use that as the plan path
2. Otherwise, use Glob to find `.claude/plans/*.md` and use the first result (most recently modified)
3. If no plans exist, inform the user and stop

## Step 2: Read the Plan

Use Read tool to read the plan file. Understand its structure and content.

## Step 3: Run Review Iteration

For each iteration, spawn 8 reviewer subagents **in parallel** using the Task tool.

All 8 use the same agent (`plan-reviewer:reviewer`) with different persona prompts. This agent has `model: opus` and `thinking_budget: extended` for deep analysis.

**CRITICAL - Context Isolation**: Each prompt must be completely self-contained. Do NOT include any information about previous iterations, prior findings, what was fixed, or conversation history. The subagent must review the plan with zero prior assumptions.

Use these exact prompt templates (only substitute `{plan_path}` with the actual path):

```
Task 1 - Design Review:
  prompt: "You are a Senior Architect. Read the plan at {plan_path}. Review for DESIGN issues only: architecture choices, tradeoffs, alternatives not considered."
  subagent_type: "plan-reviewer:reviewer"

Task 2 - Completeness Review:
  prompt: "You are a Technical Lead. Read the plan at {plan_path}. Review for COMPLETENESS issues only: missing steps, edge cases, error handling gaps."
  subagent_type: "plan-reviewer:reviewer"

Task 3 - Feasibility Review:
  prompt: "You are a Staff Engineer. Read the plan at {plan_path}. Review for FEASIBILITY issues only: technical blockers, dependencies, implementation concerns. Verify referenced files and APIs actually exist in the codebase."
  subagent_type: "plan-reviewer:reviewer"

Task 4 - Code Smells Review:
  prompt: "You are a Code Quality Specialist. Read the plan at {plan_path}. Review for CODE SMELL issues only: does the planned design introduce code smells? Are there adjacent codebase features that should be refactored as part of this work?"
  subagent_type: "plan-reviewer:reviewer"

Task 5 - Testing Strategy Review:
  prompt: "You are a QA Architect. Read the plan at {plan_path}. Review for TESTING STRATEGY only: does a testing plan exist? Is it adequate? What test types are needed?"
  subagent_type: "plan-reviewer:reviewer"

Task 6 - Production Strategy Review:
  prompt: "You are a DevOps Lead. Read the plan at {plan_path}. Review for PRODUCTION STRATEGY only: deployment steps, rollback plan, monitoring, feature flags."
  subagent_type: "plan-reviewer:reviewer"

Task 7 - Security Review:
  prompt: "You are a Security Engineer. Read the plan at {plan_path}. Review for SECURITY issues only: potential vulnerabilities, auth concerns, data exposure risks, input validation."
  subagent_type: "plan-reviewer:reviewer"

Task 8 - API/Integration Review:
  prompt: "You are an Integration Architect. Read the plan at {plan_path}. Review for API and INTEGRATION issues only: external dependencies, API contracts, database schema accuracy. Use MCP tools if available to verify database tables."
  subagent_type: "plan-reviewer:reviewer"
```

**IMPORTANT**:
- Launch all 8 Task calls in a single message to run them in parallel
- Never add context like "the user just fixed X" or "we previously found Y"
- Each subagent sees ONLY the plan file, nothing else
- The reviewer agent handles JSON output format internally

## Step 4: Synthesize Findings

After all 8 agents return:
1. Collect all issues and questions from each agent
2. Deduplicate similar questions
3. For each question, mark the first option as "(Recommended)" in the label

## Step 5: Ask User Questions

Use AskUserQuestion tool to ask all synthesized questions at once.

For each option's description, be descriptive: explain tradeoffs, benefits, and implications of choosing that option.

If no issues/questions found, skip to Step 7.

## Step 6: Modify the Plan

After user answers, spawn a plan-modifier agent with a **self-contained prompt**.

**CRITICAL - Context Isolation**: The modifier prompt must contain ONLY:
1. The plan file path
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

## Step 7: Track Progress

Maintain these counters (in your working memory):
- `iteration`: Current iteration number (starts at 1)
- `clean_passes`: Consecutive iterations with no issues (starts at 0)

After each iteration:
- If issues were found: reset `clean_passes = 0`
- If no issues found: increment `clean_passes += 1`

## Step 8: Continue or Complete

```
IF clean_passes < 3:
  - Report: "Iteration {iteration} complete. Clean passes: {clean_passes}/3. Starting next iteration..."
  - Increment iteration
  - Go back to Step 3 (spawn fresh 8 agents)

ELSE (clean_passes == 3):
  - Report: "Plan review complete! 3 consecutive clean passes achieved."
  - Stop
```

## Output Format

For each iteration, report:

```
## Iteration {N}

### Reviewer Findings
- Design: {summary}
- Completeness: {summary}
- Feasibility: {summary}
- Code Smells: {summary}
- Testing: {summary}
- Production: {summary}
- Security: {summary}
- Integration: {summary}

### Questions for User
[AskUserQuestion called here]

### Modifications Made
[After user answers]

### Status
- Issues found: {count}
- Clean passes: {clean_passes}/3
- Next: {continuing/complete}
```
