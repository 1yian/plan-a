# plan-reviewer

Iterative plan review plugin for Claude Code with parallel subagent analysis and fresh context between iterations.

## Features

- **8 parallel reviewers**: Spawns 8 specialized subagents to review different aspects simultaneously
- **Fresh context each iteration**: Each review cycle uses fresh agents with no prior context
- **Interactive Q&A**: Synthesizes findings into questions with recommended options
- **Automatic plan modification**: Spawns modifier agent to apply your decisions
- **3 clean passes**: Continues until 3 consecutive iterations find no issues

## Review Aspects

Each iteration spawns 8 specialized reviewers:

1. **Design** - Architecture choices, tradeoffs, alternatives
2. **Completeness** - Missing steps, edge cases, error handling
3. **Feasibility** - Technical blockers, dependencies, implementation concerns
4. **Code Smells** - Design issues in plan or adjacent codebase
5. **Testing** - Test strategy adequacy
6. **Production** - Deployment, rollback, monitoring plans
7. **Security** - Vulnerabilities, auth issues, data exposure
8. **Integration** - API contracts, external dependencies, database schemas

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

```
/plan-review
    ↓
Spawn 8 reviewer agents in parallel
    ↓
Collect and synthesize all findings
    ↓
Ask user questions (with Recommended options)
    ↓
Spawn modifier agent to update plan
    ↓
Check: issues found?
    ├─ Yes → next iteration (fresh 8 agents, reset clean_passes)
    └─ No → increment clean_passes
             ├─ < 3 → next iteration
             └─ = 3 → done!
```

## MCP Integration

If you have Supabase MCP configured, the Integration reviewer can verify database schemas and tables referenced in your plans.

## Architecture

The command orchestrates everything in the main Claude session:
- Main session spawns subagents (subagents can't spawn other subagents)
- 8 instances of `reviewer` agent run in parallel, each with a different persona prompt
- Reviewer agent uses `model: opus` with `thinking_budget: extended` for deep analysis
- Findings synthesized and presented to user
- general-purpose agent applies modifications
- Loop continues with fresh context each iteration

## Context Isolation

Each reviewer subagent receives a completely self-contained prompt with:
- Specific persona (Senior Architect, Security Engineer, etc.)
- Plan file path only

No conversation history, previous findings, or iteration context leaks into subagents.
