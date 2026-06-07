#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const root = path.resolve(__dirname, "..");

function usage() {
  console.log(`PyStack v0.1

Usage:
  pystack init [--target <dir>] [--dry-run]
  pystack doctor
  pystack verify
  pystack where

Examples:
  npx @pli233/pystack init --target .
  npx @pli233/pystack doctor
  npx @pli233/pystack verify
`);
}

function copyDir(src, dest, dryRun) {
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source: ${src}`);
  }

  if (dryRun) {
    console.log(`[dry-run] copy ${src} -> ${dest}`);
    return;
  }

  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to, dryRun);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    } else if (entry.isSymbolicLink()) {
      const target = fs.readlinkSync(from);
      fs.symlinkSync(target, to);
    } else {
      console.log(`skip runtime file ${from}`);
    }
  }
}

function writeFile(dest, content, dryRun) {
  if (dryRun) {
    console.log(`[dry-run] write ${dest}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
}

function parseArgs(args) {
  const out = { command: args[0] || "help", target: process.cwd(), dryRun: false };
  for (let i = 1; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--target") {
      out.target = path.resolve(args[i + 1]);
      i += 1;
    } else if (arg === "--dry-run") {
      out.dryRun = true;
    } else if (arg === "-h" || arg === "--help") {
      out.command = "help";
    }
  }
  return out;
}

function init(target, dryRun) {
  const skillsSrc = path.join(root, "skills");
  const docsSrc = path.join(root, "docs");
  const templatesSrc = path.join(root, "templates");
  const upstreamSrc = path.join(root, "upstream");

  copyDir(skillsSrc, path.join(target, "skills"), dryRun);
  copyDir(docsSrc, path.join(target, "docs", "pystack"), dryRun);
  copyDir(templatesSrc, path.join(target, "pystack-templates"), dryRun);
  copyDir(upstreamSrc, path.join(target, "upstream"), dryRun);

  writeFile(
    path.join(target, "pystack.config.json"),
    JSON.stringify(
      {
        name: "pystack",
        version: "0.1.0",
        workflowSkill: "pystack-workflow",
        defaultFlow: [
          "pystack-brainstorm",
          "pystack-review",
          "pystack-openspec-change",
          "pystack-tdd",
          "pystack-qa",
          "pystack-ship",
          "pystack-archive"
        ],
        upstreamPreserved: ["superpowers", "openspec", "gstack"]
      },
      null,
      2
    ) + "\n",
    dryRun
  );

  console.log(`${dryRun ? "Dry run complete" : "PyStack initialized"} at ${target}`);
}

function doctor() {
  const checks = [
    ["skills/pystack-workflow/SKILL.md", "PyStack workflow skill"],
    ["skills/pystack-brainstorm/SKILL.md", "PyStack brainstorm wrapper"],
    ["skills/superpowers-brainstorming-native/SKILL.md", "Native Superpowers brainstorming"],
    ["upstream/superpowers/skills/brainstorming/SKILL.md", "Upstream Superpowers brainstorming"],
    ["upstream/openspec/bin/openspec.js", "Upstream OpenSpec CLI"],
    ["upstream/gstack/review/SKILL.md", "Upstream GStack review"],
    ["upstream/gstack/qa/SKILL.md", "Upstream GStack QA"],
    ["upstream/gstack/ship/SKILL.md", "Upstream GStack ship"]
  ];

  let ok = true;
  for (const [relativePath, label] of checks) {
    const exists = fs.existsSync(path.join(root, relativePath));
    console.log(`${exists ? "ok " : "err"} ${label}: ${relativePath}`);
    ok = ok && exists;
  }
  process.exitCode = ok ? 0 : 1;
}

function listFiles(base, current = base) {
  const files = [];
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const absolute = path.join(current, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(base, absolute));
    } else {
      files.push(path.relative(base, absolute));
    }
  }
  return files.sort();
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

function compareDirs(left, right) {
  const leftRoot = path.join(root, left);
  const rightRoot = path.join(root, right);
  const leftFiles = listFiles(leftRoot);
  const rightFiles = listFiles(rightRoot);
  if (leftFiles.join("\n") !== rightFiles.join("\n")) {
    return { ok: false, detail: "file list differs" };
  }

  for (const file of leftFiles) {
    const leftContent = fs.readFileSync(path.join(leftRoot, file));
    const rightContent = fs.readFileSync(path.join(rightRoot, file));
    if (!leftContent.equals(rightContent)) {
      return { ok: false, detail: `${file} differs` };
    }
  }

  return { ok: true, detail: `${leftFiles.length} files match` };
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

  const expectedRefs = [
    ["pystack-brainstorm", "skills/superpowers-brainstorming-native/SKILL.md"],
    ["pystack-brainstorm", "upstream/superpowers/skills/brainstorming/"],
    ["pystack-review", "upstream/gstack/autoplan/SKILL.md"],
    ["pystack-review", "upstream/gstack/review/SKILL.md"],
    ["pystack-openspec-change", "upstream/openspec/bin/openspec.js"],
    ["pystack-tdd", "upstream/superpowers/skills/test-driven-development/SKILL.md"],
    ["pystack-qa", "upstream/gstack/qa/SKILL.md"],
    ["pystack-ship", "upstream/gstack/ship/SKILL.md"],
    ["pystack-archive", "upstream/openspec/bin/openspec.js"]
  ];

  for (const [skill, referencedPath] of expectedRefs) {
    const skillText = read(`skills/${skill}/SKILL.md`);
    const exists = fs.existsSync(path.join(root, referencedPath));
    check(results, exists, `${skill} referenced upstream path exists`, referencedPath);
    check(results, skillText.includes(referencedPath), `${skill} mentions referenced path`, referencedPath);
  }

  const upstreamRepos = [
    ["superpowers", "https://github.com/obra/superpowers.git"],
    ["openspec", "https://github.com/Fission-AI/OpenSpec.git"],
    ["gstack", "https://github.com/garrytan/gstack.git"]
  ];
  const upstreamManifestPath = path.join(root, "upstream", "UPSTREAMS.json");
  const upstreamManifestExists = fs.existsSync(upstreamManifestPath);
  const upstreamManifest = upstreamManifestExists
    ? JSON.parse(fs.readFileSync(upstreamManifestPath, "utf8"))
    : {};
  check(results, upstreamManifestExists, "upstream snapshot manifest exists", "upstream/UPSTREAMS.json");

  for (const [repo, remote] of upstreamRepos) {
    const gitConfig = path.join(root, "upstream", repo, ".git", "config");
    const gitConfigExists = fs.existsSync(gitConfig);
    const manifestEntry = upstreamManifest[repo];
    const manifestMatches = Boolean(manifestEntry && manifestEntry.remote === remote && manifestEntry.commit);
    check(
      results,
      gitConfigExists || manifestMatches,
      `${repo} native GitHub upstream recorded`,
      gitConfigExists ? `upstream/${repo}/.git/config` : remote
    );
    if (gitConfigExists) {
      check(results, fs.readFileSync(gitConfig, "utf8").includes(remote), `${repo} remote is native GitHub upstream`, remote);
    }
  }

  const brainstormCompare = compareDirs(
    "upstream/superpowers/skills/brainstorming",
    "skills/superpowers-brainstorming-native"
  );
  check(
    results,
    brainstormCompare.ok,
    "native Superpowers Brainstorm copy matches upstream",
    brainstormCompare.detail
  );

  const installTarget = path.join(os.tmpdir(), `pystack-verify-${Date.now()}`);
  init(installTarget, false);
  const installedChecks = [
    "skills/pystack-workflow/SKILL.md",
    "skills/superpowers-brainstorming-native/SKILL.md",
    "upstream/superpowers/skills/brainstorming/SKILL.md",
    "upstream/openspec/bin/openspec.js",
    "upstream/gstack/qa/SKILL.md",
    "pystack.config.json"
  ];
  for (const relativePath of installedChecks) {
    check(results, fs.existsSync(path.join(installTarget, relativePath)), "installed artifact exists", relativePath);
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
  init(args.target, args.dryRun);
} else if (args.command === "doctor") {
  doctor();
} else if (args.command === "verify") {
  verify();
} else if (args.command === "where") {
  console.log(root);
} else {
  usage();
}
