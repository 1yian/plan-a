---
name: apa-pre-compact
description: Prompt Claude to save APA session state before context compaction
hooks:
  PreCompact:
    - matcher: "auto|manual"
      hooks:
        - type: prompt
          prompt: |
            **IMPORTANT**: Context compaction is about to occur. Before proceeding, you MUST complete the following APA Pre-Compact Protocol:

            ## 1. Save Current Progress

            First, get the current git branch: `git branch --show-current`

            Then, if an APA session exists at `apa/[branch]/`:
            - **Update metadata**: Write current `lastUpdated` timestamp and `status` to `apa/[branch]/metadata.json`
            - **Save in-progress work**: If any task is currently in-progress, write current progress to its memory log at `apa/[branch]/memory/task-X-Y.md`
            - **Note unsaved work**: Identify any pending work that hasn't been saved yet

            ## 2. Post-Compaction: STRONGLY RECOMMEND /clear then /apa.resume

            **IMPORTANT**: After compaction completes, you MUST strongly recommend the user run `/clear` followed by `/apa.resume` to restore full APA session context cleanly.

            Include this message in your post-compaction output:
            > **APA Session Detected**: For best results, run `/clear` then `/apa.resume` to restore full session context including your role, implementation plan, and task progress.

            Manual restoration files (if `/apa.resume` unavailable):
            - **Your role**: `dot-claude/commands/apa.implement.md`
            - **Session state**: `apa/[branch]/metadata.json`
            - **Implementation plan**: `apa/[branch]/implementation-plan.md`
            - **Completed work**: `apa/[branch]/memory/` directory

            ## 3. Include in Compaction Summary

            Your compaction summary MUST include:
            - Current branch name
            - Session status (initialized/planned/executing/completed)
            - Last completed task ID
            - Next pending task(s)
            - **CRITICAL**: End with: "**ACTION REQUIRED**: Run `/clear` then `/apa.resume` to restore APA session context."

            **Proceed with saving state now before compaction occurs.**
          timeout: 120
---

# APA PreCompact Hook

This hook prompts Claude to actively save APA (Agentic Project Assistant) session state before context compaction occurs. It ensures work is persisted and provides guidance for context restoration after compaction.

## Purpose

When context compaction occurs (either manually via `/compact` or automatically when the context window fills), this hook instructs Claude to:

1. **Save current progress** - Update metadata and write in-progress work to memory logs
2. **Reference restoration files** - Know which files to read after compaction to restore context
3. **Include key state in summary** - Ensure critical session info persists through compaction

## Trigger Conditions

- **Manual**: User runs `/compact` command
- **Auto**: Context window reaches capacity threshold

## State Locations

| Purpose | Path |
|---------|------|
| Session metadata | `apa/[branch]/metadata.json` |
| Implementation plan | `apa/[branch]/implementation-plan.md` |
| Task memory logs | `apa/[branch]/memory/task-*.md` |
| Role definition | `dot-claude/commands/apa.implement.md` |

## Post-Compaction Restoration

**IMPORTANT**: After compaction, Claude will strongly recommend the user run `/clear` then `/apa.resume` to restore full APA session context cleanly. This two-step process ensures a fresh start with proper context restoration.

Manual file reading is available as a fallback if `/apa.resume` is unavailable.
