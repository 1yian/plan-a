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

For each iteration, spawn 8 reviewer subagents **in parallel** using the Task tool. Each focuses on a different aspect:

```
Task 1 - Design Review:
  prompt: "Review the plan at {plan_path} for DESIGN issues only. Check architecture choices, tradeoffs, alternatives not considered. Return JSON: {aspect: 'design', issues: [...], questions: [{question: string, header: string (max 12 chars), options: [{label: string, description: string}]}]}"
  subagent_type: "Explore"

Task 2 - Completeness Review:
  prompt: "Review the plan at {plan_path} for COMPLETENESS issues only. Check for missing steps, edge cases, error handling gaps. Return JSON: {aspect: 'completeness', issues: [...], questions: [...]}"
  subagent_type: "Explore"

Task 3 - Feasibility Review:
  prompt: "Review the plan at {plan_path} for FEASIBILITY issues only. Check technical blockers, dependencies, implementation concerns. Verify referenced files/APIs exist. Return JSON: {aspect: 'feasibility', issues: [...], questions: [...]}"
  subagent_type: "Explore"

Task 4 - Code Smells Review:
  prompt: "Review the plan at {plan_path} for CODE SMELLS. Check if the planned design introduces code smells, or if adjacent codebase features should be addressed. Return JSON: {aspect: 'code_smells', issues: [...], questions: [...]}"
  subagent_type: "Explore"

Task 5 - Testing Strategy Review:
  prompt: "Review the plan at {plan_path} for TESTING STRATEGY. Check if testing plan exists and is adequate. If missing, suggest what should be included. Return JSON: {aspect: 'testing', issues: [...], questions: [...]}"
  subagent_type: "Explore"

Task 6 - Production Strategy Review:
  prompt: "Review the plan at {plan_path} for PRODUCTION STRATEGY. Check deployment, rollback, monitoring plans. If missing, suggest what should be included. Return JSON: {aspect: 'production', issues: [...], questions: [...]}"
  subagent_type: "Explore"

Task 7 - Security Review:
  prompt: "Review the plan at {plan_path} for SECURITY concerns. Check for potential vulnerabilities, auth issues, data exposure risks. Return JSON: {aspect: 'security', issues: [...], questions: [...]}"
  subagent_type: "Explore"

Task 8 - API/Integration Review:
  prompt: "Review the plan at {plan_path} for API and INTEGRATION concerns. Verify external dependencies, API contracts, database schema references. Use MCP tools if available to check database. Return JSON: {aspect: 'integration', issues: [...], questions: [...]}"
  subagent_type: "Explore"
```

**IMPORTANT**: Launch all 8 Task calls in a single message to run them in parallel.

## Step 4: Synthesize Findings

After all 8 agents return:
1. Collect all issues and questions from each agent
2. Deduplicate similar questions
3. Group related questions (max 4 per AskUserQuestion call)
4. For each question, mark the first option as "(Recommended)" in the label

## Step 5: Ask User Questions

Use AskUserQuestion tool to ask the synthesized questions. Format:

```json
{
  "questions": [
    {
      "question": "The full question text?",
      "header": "ShortLabel",
      "options": [
        {"label": "Option A (Recommended)", "description": "Why this is recommended"},
        {"label": "Option B", "description": "Alternative approach"}
      ],
      "multiSelect": false
    }
  ]
}
```

If no issues/questions found, skip to Step 7.

## Step 6: Modify the Plan

After user answers, spawn a plan-modifier agent:

```
Task:
  prompt: "Modify the plan at {plan_path} based on these user decisions: {user_answers}. Use Edit tool to update the plan directly. Keep the plan as the current best version (not a changelog). Return JSON: {modifications_made: [...], success: bool}"
  subagent_type: "general-purpose"
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
