---
priority: 3
command_name: resume
description: "Resume APA session from saved state"
---

# APA 0.1.0 – Session Resumption Command

This command resumes an existing APA session by reconstructing context from saved state, presenting a session summary, and suggesting appropriate next actions.

---

## Step 1: Git Branch Verification

**MANDATORY**: Verify the current branch before proceeding.

Execute the following verification:

1. Run `git branch --show-current` to get the current branch name
2. Verify the branch starts with `feat/`
3. If verification fails, display this error and **STOP**:
   ```
   APA requires a feat/* branch. Please checkout your feature branch:
   git checkout feat/your-feature-name
   ```
4. If verification passes, extract the branch name by stripping the `feat/` prefix
   - Example: `feat/user-auth` → branch name is `user-auth`

Store the extracted branch name for use in subsequent steps.

---

## Step 2: Session Directory Verification

Verify the APA session workspace exists:

1. Check if `apa/[branch]/` directory exists
2. Check if `apa/[branch]/metadata.json` exists
3. If either check fails, display this error and **STOP**:
   ```
   No APA session found for branch 'feat/[branch]'.

   To start a new session, run: /apa.init
   To list existing sessions, check the apa/ directory.
   ```
4. If verification passes, proceed to context reconstruction.

---

## Step 3: Context Reconstruction Sequence

Reconstruct session context by reading all state sources in order:

### 3.1 Read Session Metadata
Read `apa/[branch]/metadata.json` and extract:
- `status`: Current session status (initialized, planning, executing, completed, partial)
- `lastUpdated`: Last activity timestamp
- `apaVersion`: APA version for compatibility check

### 3.2 Read Implementation Plan
Read `apa/[branch]/implementation-plan.md` to understand:
- Project scope and objectives
- Task structure (phases and individual tasks)
- Dependencies between tasks
- Expected outputs

If implementation plan does not exist or is empty, note: "Implementation plan not yet created."

### 3.3 Read Task Completion History
Read all Memory Log files in `apa/[branch]/memory/`:
- Use glob pattern: `apa/[branch]/memory/task-*.md`
- Read files in **ascending numerical order** (task-1-1.md before task-1-2.md, etc.)
- For each Memory Log, extract:
  - Task reference and status (Completed, Partial, Blocked, Error)
  - Key outputs and file paths created
  - Any blockers or issues flagged
  - `important_findings` and `compatibility_issues` flags

### 3.4 Build Session State Summary
Synthesize the collected information into a state summary:
- Identify last completed task from Memory Logs
- Identify next pending tasks from Implementation Plan (tasks without Memory Logs)
- Identify any blocked tasks requiring attention
- Calculate completion progress (X/Y tasks complete)

---

## Step 4: Present Session Summary

Display the reconstructed session context to the user:

```markdown
## Resuming APA Session: [branch]

**Last Activity**: [lastUpdated timestamp from metadata.json]
**Session Status**: [status from metadata.json]
**APA Version**: [apaVersion]

### Progress Overview
- **Phase**: [Current phase name] - [X/Y tasks complete]
- **Last Completed Task**: [Task ID - Brief title] ([status])
- **Next Pending Tasks**:
  - Task X.Y - [Title]
  - Task X.Z - [Title]
  - [additional pending tasks...]

### Blockers & Issues
[List any tasks with status: Blocked or Error, or "None" if no issues]

### Key Outputs
[List significant files created from completed tasks, or "No artifacts yet" if none]

### Constitution Reminder
Review `.apa/constitution.md` if you need to refresh project principles before continuing.
```

---

## Step 5: Await User Confirmation

After presenting the summary, await explicit user confirmation to proceed.

Prompt the user:
```
Session context reconstructed. Ready to continue?

Suggested next actions based on current state:
```

### Dynamic Suggestions
Based on session status, suggest appropriate next actions:

**If status is "initialized" (no plan yet):**
- `/apa.plan` - Begin project planning and create implementation plan

**If status is "planning" (plan in progress):**
- `/apa.plan` - Continue refining the implementation plan

**If status is "executing" (tasks in progress):**
- `/apa.implement` - Continue task execution
- `/apa.status` - View detailed execution status
- `/apa.reassess` - Modify plan if requirements changed

**If status is "completed":**
- `/apa.status` - Review final execution results
- `/apa.reassess` - Plan follow-up work or improvements

**If status is "partial" (blockers exist):**
- `/apa.status` - Review blocked tasks and issues
- `/apa.reassess` - Revise plan to address blockers
- `/apa.implement` - Retry execution after resolving issues

---

## Operating Rules

- Always verify branch and session existence before reading state files
- Read Memory Logs in strict ascending order for accurate history reconstruction
- Present information concisely using the specified format
- Do not proceed with any actions until user confirms
- If contradictions found between metadata and Memory Logs, note them in the summary
- Report any file read errors clearly and suggest recovery actions
