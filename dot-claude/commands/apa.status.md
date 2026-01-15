---
priority: 4
command_name: status
description: "Display current APA session status (read-only)"
---

# APA 0.1.0 - Session Status Command

This command displays the current status of an APA session. It is **read-only** and does not modify any files.

---

## Step 1: Detect Current Branch

Execute immediately on invocation:

```bash
git branch --show-current
```

Store as `[full_branch]`.

**Branch name extraction:**
- If branch starts with `feat/`, strip the prefix (e.g., `feat/user-auth` → `user-auth`)
- If branch does not start with `feat/`, use the full branch name

Store the extracted name as `[branch]` for all path references.

---

## Step 2: Verify Session Exists

Check if `apa/[branch]/` directory exists.

**If directory does NOT exist:**
Display this error and **STOP**:
```
No APA session found for branch: [branch]
Expected directory: apa/[branch]/

Run /apa.init to initialize a session for this branch.
```

---

## Step 3: Read Session State

### 3.1 Load Metadata
Read `apa/[branch]/metadata.json` and extract:
- `status`: Session status (initialized | planned | executing | completed | partial)
- `apaVersion`: APA version
- `createdAt`: Session creation timestamp
- `lastUpdated`: Last update timestamp
- `reassessed`: Whether plan was reassessed (if present)

### 3.2 Load Implementation Plan
Read `apa/[branch]/implementation-plan.md` and parse:
- All task IDs (format: `Task X.Y` where X is phase number, Y is task number)
- Group tasks by phase number
- Count total tasks

**If implementation plan does not exist or is empty:**
Display status as "initialized" and suggest running `/apa.plan`.

### 3.3 Scan Memory Logs
List all files in `apa/[branch]/memory/` matching pattern `task-*.md`.

For each Memory log file found:
1. Extract task ID from filename (e.g., `task-1-2.md` → `Task 1.2`)
2. Read the file's YAML frontmatter to get the `status` field
3. Categorize:
   - `status: Completed` → Completed task
   - `status: Partial` or `status: Blocked` or `status: Error` → Blocked/Failed task

**Note:** Tasks without Memory log files are considered **pending**.

---

## Step 4: Calculate Progress

### 4.1 Task Categorization
Based on Step 3 results, categorize all tasks from the Implementation Plan:

- **Completed**: Tasks with Memory log file having `status: Completed`
- **Blocked**: Tasks with Memory log file having `status: Partial`, `Blocked`, or `Error`
- **Pending**: Tasks without Memory log files (not yet started)

### 4.2 Phase Analysis
For each phase in the Implementation Plan:
- Count completed tasks
- Count blocked tasks
- Count pending tasks

Identify the **Current Phase** as the first phase that has incomplete tasks (pending or blocked).

### 4.3 Suggested Next Action
Determine the suggested next action:
- If any tasks are **blocked**: Suggest `/apa.reassess` to address blockers
- If tasks are **pending** and none blocked: Suggest `/apa.implement` to continue execution
- If all tasks are **completed**: Display "Session complete"

---

## Step 5: Display Status

Output the status using this format:

```markdown
## APA Status: [branch]

**Session Status**: [status from metadata.json]
**APA Version**: [apaVersion]
**Created**: [createdAt]
**Last Updated**: [lastUpdated]

### Progress
**Overall**: [completed_count]/[total_count] tasks completed
**Current Phase**: Phase [X] - [phase_name if available]

### Task Breakdown by Phase

#### Phase [X]: [phase_name]
- Completed: [list task IDs or "None"]
- Pending: [list task IDs or "None"]
- Blocked: [list task IDs or "None"]

[Repeat for each phase]

### Summary
**Completed**: [list all completed task IDs]
**Pending**: [list all pending task IDs]
**Blocked**: [list all blocked task IDs with brief reason from Memory log if available]

### Suggested Next
[/apa.implement if pending tasks exist]
[/apa.reassess if blocked tasks exist]
[Session complete - all tasks finished]
```

**Formatting notes:**
- List task IDs in ascending order (e.g., Task 1.1, Task 1.2, Task 2.1)
- For blocked tasks, include the status from the Memory log (Partial/Blocked/Error)
- If reassessed flag is true in metadata, add note: "(Plan was reassessed)"

---

## Operating Rules

- **Read-only**: This command MUST NOT modify any files
- Display all available status information
- If files are missing or unreadable, report what is available and note missing components
- Always suggest appropriate next action based on current state
- Keep output concise but complete
