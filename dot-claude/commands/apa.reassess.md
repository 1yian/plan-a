---
priority: 3
command_name: reassess
description: "Modify implementation plan mid-session"
---

# APA 0.1.0 - Plan Reassessment Command

This command enables mid-session modification of the implementation plan with immutability protection. Completed tasks are protected from changes while pending tasks remain fully editable.

---

## Step 1: Detect Current Branch

Execute immediately on invocation:

```bash
git branch --show-current
```

Store as `[branch]` for all path references.

---

## Step 2: Read Current State

### 2.1 Load Implementation Plan
Read `apa/[branch]/implementation-plan.md` and parse all task IDs (format: `Task X.Y`).

### 2.2 Scan Memory Directory
List all files in `apa/[branch]/memory/` matching pattern `task-*.md`.

Each Memory log file indicates a **completed task**—extract the task ID from the filename (e.g., `task-1-2.md` → `Task 1.2`).

---

## Step 3: Build Immutability Map

Categorize all tasks from the Implementation Plan:

**Immutable Tasks (CANNOT modify):**
- Any task with a corresponding Memory log file in `apa/[branch]/memory/`
- These tasks are considered completed and their definitions are frozen

**Mutable Tasks (CAN modify):**
- Any task WITHOUT a corresponding Memory log file
- These tasks are pending and open to modification

---

## Step 4: Display Reassessment Options

Present the following to the user:

```markdown
## Plan Reassessment: [branch]

**Immutable (completed):** [list task IDs - CANNOT modify]
**Mutable (pending):** [list task IDs - CAN modify]

**Options:**
1. Modify pending task details (objective, instructions, guidance)
2. Add new tasks to the plan
3. Reorder pending tasks
4. Update dependencies between pending tasks
5. Remove pending tasks from the plan

What would you like to modify?
```

If there are no mutable tasks, inform the user:
```
All tasks have been completed. The implementation plan is fully immutable.
No modifications are possible. Run /apa.status to review the completed plan.
```

---

## Step 5: Process User Modifications

### 5.1 Accept Modification Request
Gather the user's requested changes through conversation. Clarify any ambiguous requests before proceeding.

### 5.2 Validate Against Immutability Map
**Before applying any changes, perform this validation:**

1. Parse the proposed changes to identify all affected task IDs
2. Cross-reference against the immutable task list
3. **If any immutable task would be modified:**
   - Reject the change immediately
   - Display: "Cannot modify Task [X.Y] - this task has been completed and is immutable. Only pending tasks can be modified."
   - Offer to proceed with valid modifications only

### 5.3 Apply Valid Modifications
For approved changes:
1. Read current `apa/[branch]/implementation-plan.md`
2. Apply requested modifications following the existing Markdown schema
3. If tasks are renumbered:
   - Update task IDs sequentially within phases
   - Update all `Depends on: Task X.Y` references to reflect new IDs
4. Update the `Last Modification:` field in the plan header:
   ```
   Last Modification: [ISO timestamp] - Plan reassessed: [brief description of changes]
   ```
5. Write updated plan to `apa/[branch]/implementation-plan.md`

---

## Step 6: Update Metadata

Update `apa/[branch]/metadata.json`:

1. Set `lastUpdated` to current ISO 8601 timestamp
2. Add `"reassessed": true` flag
3. Preserve all other existing fields

**Example metadata update:**
```json
{
  "apaVersion": "0.1.0",
  "branch": "[branch]",
  "createdAt": "[original timestamp]",
  "lastUpdated": "[current ISO timestamp]",
  "status": "executing",
  "reassessed": true
}
```

---

## Step 7: Completion Confirmation

Display modification summary:

```
Plan Reassessment Complete
==========================
Branch: feat/[branch]
Changes applied: [summary of modifications]
Immutable tasks preserved: [count]
Modified tasks: [list task IDs that were changed]
New tasks added: [list if any]
Tasks removed: [list if any]

Plan updated. Run /apa.implement to continue execution.
```

---

## Operating Rules

- **Immutability is absolute:** Never modify tasks that have Memory logs
- Validate all changes against immutability map before applying
- Preserve Implementation Plan Markdown structure and schema
- Update all dependency references when task IDs change
- Always update metadata.json after successful reassessment
- Report any validation failures immediately with clear explanations
- Follow §4.2 Live Plan Maintenance patterns from apa.implement.md
