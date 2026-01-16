# Always Plan Ahead (APA)

*Manage complex projects with a team of AI assistants, smoothly and efficiently.*

## What is APM?

**Always Plan Ahead (APA)** is fork of [APM](https://github.com/sdi2200262/agentic-project-management) that brings real-world project management principles into your AI-assisted workflows. 

It is built on addresses a fundamental challenge of LLMs: **context window limitations** by transforming Claude Code from an implementor to an orchestrator of implementation subagents and by enforcing a persistent memory system.
This frees up context usage in your Claude session, allowing for longer sessions that accomplish more at a higher quality.

## Installation

Install APM CLI globally via NPM:

```bash
npm install -g @1yian/apa
```

Or install locally in your project:

```bash
npm install @1yian/apa
```

When you run `apm init`, simply select your AI assistant from the list, and APM will automatically configure the appropriate command structure for your environment.

</details>

## Getting Started

Follow these simple steps to start using APM in your project:

1. **Navigate to your project directory** in your terminal.

2. **Run the APA initialization command in your repo:**
   ```bash
   apa init .
   ```

3. **APM automatically installs:**
   - `.apa/` directory with APM guides and initial assets
   - APM slash commands in your Claude's local command directory
   - Necessary installation meta-data

5. **Open your AI assistant chat** and enter the slash command:
   ```
   /apa.init
   ```

6. **Follow the established APM workflow:** <br/>
Setup Phase (Project Discovery & Planning) → Task Loop Phase (Plan Execution)