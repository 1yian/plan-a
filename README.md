# plan-reviewer

Iterative plan review plugin for Claude Code with parallel subagent analysis and fresh context between iterations.

## Features

- **6 parallel reviewers**: Spawns 6 specialized subagents to review different aspects simultaneously
- **Fresh context each iteration**: Each review cycle uses fresh agents with no prior context
- **Interactive Q&A**: Synthesizes findings into questions with recommended options
- **Automatic plan modification**: Spawns modifier agent to apply your decisions
- **2 clean passes**: Continues until 2 consecutive iterations find no issues

## Review Aspects

Each iteration spawns 6 specialized reviewers:

1. **Architecture** - Structural integrity, design patterns, over/under-engineering, abstractions
2. **Feasibility** - Execution reality, file verification, library compatibility, magical thinking
3. **Logic & Gaps** - Edge cases, broken workflows, devil's advocate
4. **Security** - IDOR/injection/XSS, secrets handling, authorization
5. **Operations** - Maintainability, debugging, rollout/rollback, feature flags, performance
6. **Integration** - System boundaries, API contracts, schema compatibility, third-party limits

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
Spawn 6 reviewer agents in parallel
    ↓
Spawn validation agent to filter findings
    ↓
Ask user validated questions (with Recommended options)
    ↓
Spawn modifier agent to update plan
    ↓
Check: issues found?
    ├─ Yes → next iteration (fresh 6 agents, reset clean_passes)
    └─ No → increment clean_passes
             ├─ < 3 → next iteration
             └─ = 3 → done!
```

## MCP Integration

If you have Supabase MCP configured, the Integration reviewer can verify database schemas and tables referenced in your plans.

## Architecture

The command orchestrates everything in the main Claude session:
- Main session spawns subagents (subagents can't spawn other subagents)
- 6 instances of `reviewer` agent run in parallel, each with a different persona prompt
- Reviewer agent uses `model: sonnet` with `thinking_budget: extended` for deep analysis
- Findings synthesized and presented to user
- general-purpose agent applies modifications
- Loop continues with fresh context each iteration

## Context Isolation

Each reviewer subagent receives a completely self-contained prompt with:
- Specific persona (Senior Architect, Security Engineer, etc.)
- Plan file path only

No conversation history, previous findings, or iteration context leaks into subagents.
