---
priority: 1
command_name: init
description: "Initialize APA session for current feature branch"
---

# APA 0.1.0 – Session Initialization Command

This command initializes an APA (Always Plan Ahead) session for feature branch development. It sets up the branch-specific workspace structure, creates session metadata, and ensures the constitution is configured.

---

## Step 1: Git Branch Verification

**MANDATORY**: Verify the current branch before proceeding.

Execute the following verification:

1. Run `git branch --show-current` to get the current branch name
2. Verify the branch starts with `feat/`
3. If verification fails, display this error and **STOP**:
   ```
   APA requires a feat/* branch. Please run: git checkout -b feat/your-feature-name
   ```
4. If verification passes, extract the branch name by stripping the `feat/` prefix
   - Example: `feat/user-auth` → branch name is `user-auth`

Store the extracted branch name for use in subsequent steps.

---

## Step 2: Create Directory Structure

Create the branch-specific APA workspace:

1. Create the branch directory with Memory subdirectory:
   ```bash
   mkdir -p apa/[branch]/Memory
   ```
   Replace `[branch]` with the extracted branch name from Step 1.

2. Copy the Implementation Plan template:
   ```bash
   cp dot-apa/implementation-plan.md apa/[branch]/implementation-plan.md
   ```

3. Confirm directory structure is created successfully.

---

## Step 3: Create Session Metadata

Create `metadata.json` in `apa/[branch]/` with the following schema:

```json
{
  "apaVersion": "0.1.0",
  "branch": "[branch]",
  "createdAt": "[ISO timestamp]",
  "lastUpdated": "[ISO timestamp]",
  "status": "initialized"
}
```

Replace:
- `[branch]` with the extracted branch name
- `[ISO timestamp]` with current ISO 8601 timestamp (e.g., `2024-01-15T10:30:00Z`)

---

## Step 4: Constitution Setup

### 4.1 Check for Existing Constitution

Check if `.apa/constitution.md` exists.

### 4.2 Constitution Workflow

**If constitution does NOT exist:**
1. Inform user: "No project constitution found. Let's create one to establish project principles and standards."
2. Read the constitution template from `.apa/constitution.md` (the template version in the apa directory)
3. Guide user through filling in the template sections:
   - Project name and description
   - Core principles (minimum 2-3)
   - Quality standards
   - Technical constraints
   - Implementation guidelines
4. Create `.apa/constitution.md` with the populated content
5. Set version to `1.0.0` and ratification date to current date

**If constitution EXISTS:**
1. Inform user: "Existing constitution found at `.apa/constitution.md`."
2. Ask: "Would you like to review and update the constitution for this feature branch? (yes/no)"
3. If yes: Display current constitution and guide through any updates, increment version appropriately
4. If no: Proceed to completion

---

## Step 5: Initialization Complete

Display initialization summary:

```
APA Session Initialized Successfully
====================================
Branch: feat/[branch]
Workspace: apa/[branch]/
Constitution: [status - created/existing/updated]
Status: Ready for /apa.plan

Next step: Run /apa.plan to begin project planning.
```

---

## Operating Rules

- Always verify branch before any file operations
- Use exact paths as specified
- Create all directories with appropriate permissions
- Timestamps must be in ISO 8601 format
- Constitution is required for all APA sessions
- Report any errors immediately and stop execution
