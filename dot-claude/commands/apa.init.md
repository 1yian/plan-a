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

Otherwise, offer to help set up the branch to the user.
Store the extracted branch name for use in subsequent steps.

---

## Step 2: Create Directory Structure

Create the branch-specific APA workspace:

1. Create the branch directory with Memory subdirectory:
   ```bash
   mkdir -p apa/[branch]/memory
   ```
   Replace `[branch]` with the extracted branch name from Step 1.

1a. Copy the Memory Root Template:
   ```bash
   cp .apa/memory/memory-root-template.md apa/[branch]/memory-root.md
   ```

2. Copy the Implementation Plan template:
   ```bash
   cp .apa/implementation-plan-template.md apa/[branch]/implementation-plan.md
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

## Outline

You are updating the project constitution at `apa/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `apa/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.
   - If it does not exist, copy the template from `.apa/constitution-template.md` to `apa/constitution.md` and proceed.
   
2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise guide the user if they want anything particular to input into their constitution through Q&A.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

5. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

6. Write the completed constitution back to `apa/constitution.md` (overwrite).

7. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `apa/constitution.md` file.

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
