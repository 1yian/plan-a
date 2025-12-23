---
description: Start iterative plan review with fresh context
argument-hint: [plan-file-path]
---

Start iterative plan review for the specified plan file.

**Plan file resolution**:
1. If $1 is provided, use that path
2. Otherwise, find the most recently modified file in `.claude/plans/`:
   - Use Glob to find `.claude/plans/*.md`
   - Sort by modification time (Glob returns sorted by mtime)
   - Use the first result (most recent)
3. If no plans exist, inform the user and exit

Use the plan-reviewer agent to:
1. Review the plan comprehensively
2. Spawn Explore sub-agents to verify codebase references
3. Ask clarifying questions about design decisions
4. Modify the plan directly based on answers
5. Continue iterating with fresh context until 3 consecutive clean passes

Pass these parameters to the agent:
- plan_path: The resolved path to the plan file
- clean_passes: 0 (starting fresh)
- iteration: 1
