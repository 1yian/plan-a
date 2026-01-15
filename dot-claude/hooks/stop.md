---
name: apa-stop
description: Suggest next APA actions when session ends
hooks:
  Stop:
    - hooks:
        - type: prompt
          prompt: |
            **APA Session Context Check**: Before concluding, check if an active APA session exists and provide contextual next-action suggestions.

            ## 1. Detect APA Session

            First, get the current git branch: `git branch --show-current`

            Extract branch name:
            - If branch starts with `feat/`, strip the prefix (e.g., `feat/user-auth` -> `user-auth`)
            - Otherwise use the full branch name

            Check if `apa/[branch]/` directory exists.

            **If NO APA session exists**: Skip the rest of this hook - no output needed.

            ## 2. Read Session State

            If an APA session exists, read `apa/[branch]/metadata.json` and extract:
            - `status`: Session status
            - `lastUpdated`: Last update timestamp

            ## 3. Output Next-Action Suggestions

            Based on the session status, output contextual suggestions using this format:

            ---

            ## APA Next Actions

            **Session**: [branch name]
            **Status**: [status from metadata]

            **Suggested next steps:**
            [Dynamic suggestion based on status - see rules below]
            - Run `/apa.status` to see full progress
            - Run `/apa.resume` to continue in a new session

            ---

            ## 4. Dynamic Suggestion Rules

            Select the primary suggestion based on status:

            - **If status is "executing"**: "Continue implementation with `/apa.implement`"
            - **If status is "planned"**: "Start execution with `/apa.implement`"
            - **If status is "initialized"**: "Create implementation plan with `/apa.plan`"
            - **If status is "partial" or blocked tasks exist**: "Review blockers with `/apa.status`, consider `/apa.reassess`"
            - **If status is "completed"**: "Session complete! All tasks finished."

            ## 5. Output Formatting

            - Only output the "APA Next Actions" section if an APA session exists
            - Keep suggestions concise and actionable
            - Do not block Claude from stopping - this is informational only
          timeout: 30
---

# APA Stop Hook

This hook provides contextual next-action suggestions when Claude stops responding during an APA (Agentic Project Assistant) session.

## Purpose

When Claude finishes a response, this hook checks for an active APA session and displays relevant suggestions for continuing work. This helps users:

1. **Remember session context** - See current branch and status at a glance
2. **Know what to do next** - Get contextual suggestions based on session state
3. **Resume efficiently** - Quick reference to key commands

## Trigger Conditions

- **Stop event**: Fires whenever Claude finishes responding

## Session Detection

The hook only outputs suggestions when:
- An APA session directory exists at `apa/[branch]/`
- The `metadata.json` file is readable

If no session exists, the hook produces no output.

## Dynamic Suggestions

| Session Status | Primary Suggestion |
|---------------|-------------------|
| `initialized` | Create implementation plan with `/apa.plan` |
| `planned` | Start execution with `/apa.implement` |
| `executing` | Continue implementation with `/apa.implement` |
| `partial`/blocked | Review blockers with `/apa.status`, consider `/apa.reassess` |
| `completed` | Session complete! All tasks finished. |

## Related Commands

- `/apa.status` - Full session status with task breakdown
- `/apa.resume` - Restore session context in new conversation
- `/apa.implement` - Execute implementation tasks
- `/apa.reassess` - Reassess plan when blockers occur
