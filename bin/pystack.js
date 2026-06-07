#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");

function usage() {
  console.log(`PyStack v0.1

Usage:
  pystack doctor
  pystack verify
  pystack where
  pystack init   # deprecated

Examples:
  npx github:pli233/pystack doctor
  npx github:pli233/pystack verify
`);
}

function parseArgs(args) {
  return { command: args[0] || "help" };
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function check(results, condition, label, detail = "") {
  results.push({ ok: Boolean(condition), label, detail });
}

function hasFrontmatter(content) {
  return /^---\nname: .+\ndescription: .+\n---/m.test(content);
}

function commandExists(command) {
  const result = spawnSync("sh", ["-lc", `command -v ${command}`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  return result.status === 0 && result.stdout.trim().length > 0;
}

function init() {
  console.log("PyStack init is deprecated.");
  console.log("");
  console.log("PyStack no longer creates a project-local .pystack bundle.");
  console.log("Install and initialize native Superpowers, GStack, and OpenSpec first, then install PyStack skills:");
  console.log("");
  console.log("  npx skills add pli233/pystack --skill '*'");
}

function doctor() {
  console.log("PyStack doctor");
  console.log("");
  console.log("Required native setup before PyStack:");
  console.log("  1. Superpowers installed in your active agent/harness.");
  console.log("  2. GStack installed and set up for your active agent.");
  console.log("  3. OpenSpec installed and initialized in the current repository.");
  console.log("");
  console.log(`${commandExists("openspec") ? "ok " : "err"} OpenSpec CLI on PATH: openspec`);
  console.log("");
  console.log("Codex-oriented setup reference:");
  console.log("  Superpowers: use /plugins, search superpowers, install plugin.");
  console.log("  GStack: git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack && cd ~/gstack && ./setup --host codex");
  console.log("  OpenSpec: npm install -g @fission-ai/openspec@latest && openspec init");
  console.log("  PyStack: npx skills add pli233/pystack --skill '*'");
}

function verify() {
  const results = [];
  const wrappers = [
    "pystack-workflow",
    "pystack-brainstorm",
    "pystack-review",
    "pystack-openspec-change",
    "pystack-tdd",
    "pystack-qa",
    "pystack-ship",
    "pystack-archive"
  ];

  for (const skill of wrappers) {
    const relativePath = `skills/${skill}/SKILL.md`;
    const exists = fs.existsSync(path.join(root, relativePath));
    check(results, exists, `${skill} exists`, relativePath);
    if (exists) {
      check(results, hasFrontmatter(read(relativePath)), `${skill} has skill frontmatter`, relativePath);
    }
  }

  const workflowText = read("skills/pystack-workflow/SKILL.md");
  check(results, workflowText.includes("Superpowers"), "workflow checks Superpowers prerequisite");
  check(results, workflowText.includes("GStack"), "workflow checks GStack prerequisite");
  check(results, workflowText.includes("OpenSpec"), "workflow checks OpenSpec prerequisite");
  check(results, workflowText.includes("openspec init"), "workflow mentions OpenSpec initialization");
  check(results, workflowText.includes("Do not create `.pystack`"), "workflow forbids .pystack bundle");

  for (const skill of wrappers) {
    const skillText = read(`skills/${skill}/SKILL.md`);
    check(results, !skillText.includes(".pystack/skills/upstream"), `${skill} does not reference vendored upstream`);
    check(results, !skillText.includes("superpowers-brainstorming-native"), `${skill} does not reference bundled native brainstorm`);
  }

  let ok = true;
  for (const result of results) {
    console.log(`${result.ok ? "ok " : "err"} ${result.label}${result.detail ? `: ${result.detail}` : ""}`);
    ok = ok && result.ok;
  }

  console.log(`\n${ok ? "PyStack verify passed" : "PyStack verify failed"} (${results.filter((item) => item.ok).length}/${results.length})`);
  process.exitCode = ok ? 0 : 1;
}

const args = parseArgs(process.argv.slice(2));

if (args.command === "init") {
  init();
} else if (args.command === "doctor") {
  doctor();
} else if (args.command === "verify") {
  verify();
} else if (args.command === "where") {
  console.log(root);
} else {
  usage();
}
