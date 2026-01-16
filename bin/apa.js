#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VERSION = '1.0.0';

function showHelp() {
  console.log(`
APA (Always Plan Ahead) for Claude Code

Usage:
  apa init [target-dir]    Install APA to target directory (default: current directory)
  apa --help, -h           Show this help message
  apa --version, -v        Show version

Examples:
  npx apa init             Install to current directory
  npx apa init ./my-repo   Install to specific directory
  apa init                 Install to current directory (if installed globally)
`);
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

function init(targetDir) {
  const resolvedTarget = path.resolve(targetDir);

  // Find the package root (where dot-apa and dot-claude are)
  const packageRoot = path.dirname(__dirname);
  const dotApaSource = path.join(packageRoot, 'dot-apa');
  const dotClaudeSource = path.join(packageRoot, 'dot-claude');

  // Verify source directories exist
  if (!fs.existsSync(dotApaSource)) {
    console.error(`Error: Source directory not found: ${dotApaSource}`);
    process.exit(1);
  }
  if (!fs.existsSync(dotClaudeSource)) {
    console.error(`Error: Source directory not found: ${dotClaudeSource}`);
    process.exit(1);
  }

  // Target paths
  const apaTarget = path.join(resolvedTarget, '.apa');
  const claudeTarget = path.join(resolvedTarget, '.claude');

  console.log(`Installing APA to: ${resolvedTarget}\n`);

  // Copy dot-apa/ → .apa/
  console.log('Copying .apa/ directory...');
  copyDirRecursive(dotApaSource, apaTarget);
  const apaFileCount = countFiles(apaTarget);
  console.log(`  Copied ${apaFileCount} files to .apa/`);

  // Merge dot-claude/ → .claude/
  console.log('Merging .claude/ directory...');
  const claudeExisted = fs.existsSync(claudeTarget);
  copyDirRecursive(dotClaudeSource, claudeTarget);
  const claudeFileCount = countFiles(dotClaudeSource);
  if (claudeExisted) {
    console.log(`  Merged ${claudeFileCount} files into existing .claude/`);
  } else {
    console.log(`  Created .claude/ with ${claudeFileCount} files`);
  }

  console.log(`
APA installed successfully!

Installed:
  ${apaTarget}/
  ${claudeTarget}/

You can now use APA commands in Claude Code:
  /apa.init      - Initialize a new project with APA
  /apa.plan      - Create an implementation plan
  /apa.implement - Implement a plan
  /apa.status    - Check project status
  /apa.resume    - Resume work on a project
  /apa.reassess  - Reassess current approach
`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  showHelp();
  process.exit(0);
}

if (args[0] === '--version' || args[0] === '-v') {
  console.log(`apa v${VERSION}`);
  process.exit(0);
}

if (args[0] === 'init') {
  const targetDir = args[1] || process.cwd();
  init(targetDir);
} else {
  console.error(`Unknown command: ${args[0]}`);
  console.error('Run "apa --help" for usage information.');
  process.exit(1);
}
