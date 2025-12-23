# plan-reviewer

Iterative plan review plugin for Claude Code with fresh context between iterations.

## Features

- Comprehensive plan review against codebase reality
- Spawns Explore sub-agents to verify file references and APIs
- **Interactive Q&A**: Asks questions with recommended options, modifies plan based on your answers
- **Addresses Testing & Production**: Asks about testing plan and production strategy if missing
- Loops until 3 consecutive clean passes (ensuring thorough review)

## Installation

```bash
/plugin marketplace add 1yian/plan-reviewer
/plugin install plan-reviewer@1yian
```

## Usage

```bash
# Review a specific plan
/plan-review .claude/plans/my-feature.md

# Review the most recent plan in .claude/plans/
/plan-review
```

## How It Works

1. **Fresh Context Loop**: Each iteration spawns a new agent via the Task tool, giving completely fresh context. The plan file persists on disk, so each agent reviews the updated plan with fresh eyes.

2. **Codebase Verification**: Explore sub-agents verify that files, APIs, and schemas referenced in your plan actually exist and match your assumptions.

3. **Interactive Q&A with Recommendations**: After identifying issues, the agent asks you questions with multiple options. One option is always marked as "(Recommended)" to guide your decision. Your answers are then incorporated directly into the plan file.

4. **Addresses Testing & Production**: If the plan is missing these sections, asks if they're needed (user can say N/A).

5. **3 Clean Passes**: The review continues until 3 consecutive iterations find no issues, ensuring thorough verification from multiple fresh perspectives.

## MCP Integration

If you have Supabase MCP configured, the agent can verify database schemas and tables referenced in your plans.
